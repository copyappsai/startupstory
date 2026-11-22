import crypto from 'crypto';

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory rate limiting store for API protection
const rateLimitStore = new Map<string, RateLimitRecord>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 15; // Max 15 requests per window per IP

export function hashIdentifier(input: string): string {
  const salt = process.env.RATE_LIMIT_SALT || 'startupstory-salt-2026';
  return crypto.createHash('sha256').update(input + salt).digest('hex').slice(0, 16);
}

export function isRateLimited(identifier: string): { limited: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // Clean up old entries periodically
  if (rateLimitStore.size > 2000) {
    for (const [key, val] of rateLimitStore.entries()) {
      if (val.resetAt < now) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!record || record.resetAt < now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });
    return { limited: false, retryAfterSeconds: 0 };
  }

  if (record.count >= MAX_REQUESTS) {
    const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);
    return { limited: true, retryAfterSeconds };
  }

  record.count += 1;
  return { limited: false, retryAfterSeconds: 0 };
}
