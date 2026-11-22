import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { Subscriber } from './types';

const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DATA_DIR = isServerless ? path.join('/tmp', 'startupstory_data') : path.join(process.cwd(), 'data');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');
const BUNDLED_FILE = path.join(process.cwd(), 'data', 'subscribers.json');

async function ensureDataFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(SUBSCRIBERS_FILE);
    } catch {
      // If we are in serverless and a bundled file exists, copy it to /tmp
      if (isServerless) {
        try {
          const bundledContent = await fs.readFile(BUNDLED_FILE, 'utf-8');
          await fs.writeFile(SUBSCRIBERS_FILE, bundledContent, 'utf-8');
          return;
        } catch {
          // Bundled file not accessible or empty, initialize fresh
        }
      }
      // File does not exist, initialize empty array
      await fs.writeFile(SUBSCRIBERS_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Error ensuring data file:', error);
    throw error;
  }
}

export async function getSubscribers(): Promise<Subscriber[]> {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(SUBSCRIBERS_FILE, 'utf-8');
    return JSON.parse(raw) as Subscriber[];
  } catch (error) {
    console.error('Failed to parse subscribers file, resetting to empty array:', error);
    return [];
  }
}

export async function findSubscriberByEmail(email: string): Promise<Subscriber | undefined> {
  const normalized = email.trim().toLowerCase();
  const subscribers = await getSubscribers();
  return subscribers.find(s => s.email.toLowerCase() === normalized);
}

export async function addSubscriber(params: {
  email: string;
  consentGiven: boolean;
  ipHash?: string;
  userAgent?: string;
}): Promise<{ status: 'created' | 'already_registered'; subscriber: Subscriber }> {
  await ensureDataFile();
  const normalizedEmail = params.email.trim().toLowerCase();
  const subscribers = await getSubscribers();

  const existingIndex = subscribers.findIndex(s => s.email.toLowerCase() === normalizedEmail);

  if (existingIndex !== -1) {
    const existing = subscribers[existingIndex];
    if (existing.status === 'unsubscribed') {
      // Re-activate subscription
      existing.status = 'active';
      existing.consentGiven = true;
      existing.consentTimestamp = new Date().toISOString();
      existing.signupTimestamp = new Date().toISOString();
      existing.unsubscribedAt = undefined;
      await writeSubscribers(subscribers);
      return { status: 'created', subscriber: existing };
    }
    return { status: 'already_registered', subscriber: existing };
  }

  const now = new Date().toISOString();
  const newSubscriber: Subscriber = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    consentGiven: params.consentGiven,
    consentTimestamp: now,
    signupTimestamp: now,
    ipHash: params.ipHash,
    userAgent: params.userAgent,
    status: 'active',
  };

  subscribers.push(newSubscriber);
  await writeSubscribers(subscribers);

  return { status: 'created', subscriber: newSubscriber };
}

export async function removeSubscriber(email: string): Promise<boolean> {
  await ensureDataFile();
  const normalizedEmail = email.trim().toLowerCase();
  const subscribers = await getSubscribers();
  const sub = subscribers.find(s => s.email.toLowerCase() === normalizedEmail);

  if (!sub) return false;

  sub.status = 'unsubscribed';
  sub.unsubscribedAt = new Date().toISOString();
  await writeSubscribers(subscribers);
  return true;
}

export async function deleteSubscriberPermanently(email: string): Promise<boolean> {
  await ensureDataFile();
  const normalizedEmail = email.trim().toLowerCase();
  const subscribers = await getSubscribers();
  const initialLength = subscribers.length;
  const filtered = subscribers.filter(s => s.email.toLowerCase() !== normalizedEmail);

  if (filtered.length === initialLength) {
    return false;
  }

  await writeSubscribers(filtered);
  return true;
}

async function writeSubscribers(subscribers: Subscriber[]): Promise<void> {
  const tempPath = `${SUBSCRIBERS_FILE}.${Date.now()}.tmp`;
  await fs.writeFile(tempPath, JSON.stringify(subscribers, null, 2), 'utf-8');
  await fs.rename(tempPath, SUBSCRIBERS_FILE);
}
