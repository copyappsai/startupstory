import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/storage';
import { hashIdentifier, isRateLimited } from '@/lib/rate-limit';
import { sendLaunchConfirmationEmail } from '@/lib/email';
import { SubscribeResponse } from '@/lib/types';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(req: NextRequest) {
  try {
    // 1. IP identification & Rate Limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const remoteIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';
    const clientHash = hashIdentifier(remoteIp);
    const userAgent = req.headers.get('user-agent') || 'unknown';

    const { limited, retryAfterSeconds } = isRateLimited(clientHash);
    if (limited) {
      return NextResponse.json<SubscribeResponse>(
        {
          ok: false,
          code: 'rate_limited',
          message: `Too many attempts. Please try again in ${retryAfterSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    // 2. Parse payload
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json<SubscribeResponse>(
        {
          ok: false,
          code: 'invalid_email',
          message: 'Invalid request payload.',
        },
        { status: 400 }
      );
    }

    const { email, consent, honeypot } = body;

    // 3. Honeypot spam check
    if (honeypot && String(honeypot).trim().length > 0) {
      // Silently discard or return generic rejection for bots
      return NextResponse.json<SubscribeResponse>(
        {
          ok: false,
          code: 'spam_detected',
          message: 'Spam submission detected.',
        },
        { status: 400 }
      );
    }

    // 4. Email validation
    if (!email || typeof email !== 'string') {
      return NextResponse.json<SubscribeResponse>(
        {
          ok: false,
          code: 'invalid_email',
          message: 'Please enter a valid email address.',
        },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedEmail.length < 5 || trimmedEmail.length > 254 || !EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json<SubscribeResponse>(
        {
          ok: false,
          code: 'invalid_email',
          message: 'Please provide a valid, correctly formatted email address.',
        },
        { status: 400 }
      );
    }

    // 5. Consent requirement check
    if (consent !== true) {
      return NextResponse.json<SubscribeResponse>(
        {
          ok: false,
          code: 'consent_required',
          message: 'Please confirm agreement to receive the launch notification email.',
        },
        { status: 400 }
      );
    }

    // 6. Record in database
    const result = await addSubscriber({
      email: trimmedEmail,
      consentGiven: true,
      ipHash: clientHash,
      userAgent,
    });

    if (result.status === 'already_registered') {
      return NextResponse.json<SubscribeResponse>(
        {
          ok: false,
          code: 'already_registered',
          message: "You're already on our launch list! We'll notify you as soon as StartupStory goes live.",
          signupTimestamp: result.subscriber.signupTimestamp,
        },
        { status: 200 }
      );
    }

    // 7. Optional Resend notification trigger
    // Runs asynchronously; does not block user response
    sendLaunchConfirmationEmail(trimmedEmail).catch(err => {
      console.error('[Launch Notification Dispatch Error]', err);
    });

    return NextResponse.json<SubscribeResponse>(
      {
        ok: true,
        code: 'success',
        message: "You're all set! We'll email you the day StartupStory officially launches.",
        signupTimestamp: result.subscriber.signupTimestamp,
        email: result.subscriber.email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[Subscribe API Error]', error);
    return NextResponse.json<SubscribeResponse>(
      {
        ok: false,
        code: 'server_error',
        message: 'Something went wrong while processing your request. Please try again.',
      },
      { status: 500 }
    );
  }
}
