import { NextRequest, NextResponse } from 'next/server';
import { findSubscriberByEmail } from '@/lib/storage';
import { hashIdentifier, isRateLimited } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get('x-forwarded-for');
    const remoteIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
    const clientHash = hashIdentifier(remoteIp);

    const { limited, retryAfterSeconds } = isRateLimited(clientHash);
    if (limited) {
      return NextResponse.json(
        { ok: false, message: `Rate limit reached. Try again in ${retryAfterSeconds}s.` },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || !body.email || typeof body.email !== 'string') {
      return NextResponse.json(
        { ok: false, message: 'Valid email address is required.' },
        { status: 400 }
      );
    }

    const subscriber = await findSubscriberByEmail(body.email);
    if (!subscriber) {
      return NextResponse.json(
        { ok: false, message: 'No subscription record found for this email address.' },
        { status: 404 }
      );
    }

    // Export user's stored subscription metadata (GDPR compliant export)
    const exportRecord = {
      email: subscriber.email,
      status: subscriber.status,
      consentGiven: subscriber.consentGiven,
      consentTimestamp: subscriber.consentTimestamp,
      signupTimestamp: subscriber.signupTimestamp,
      purpose: 'One-time launch notification for StartupStory community',
      dataController: 'StartupStory (startupstory.tech)',
      exportedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      ok: true,
      message: 'Subscription data exported successfully.',
      data: exportRecord,
    });
  } catch (error) {
    console.error('[Export Error]', error);
    return NextResponse.json({ ok: false, message: 'Failed to export subscriber data.' }, { status: 500 });
  }
}
