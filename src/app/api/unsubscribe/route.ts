import { NextRequest, NextResponse } from 'next/server';
import { deleteSubscriberPermanently } from '@/lib/storage';
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

    const removed = await deleteSubscriberPermanently(body.email);
    if (!removed) {
      return NextResponse.json(
        { ok: false, message: 'This email address is not in our subscription records.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: 'Your email and consent records have been permanently deleted from our launch list.',
    });
  } catch (error) {
    console.error('[Unsubscribe Error]', error);
    return NextResponse.json({ ok: false, message: 'Failed to process unsubscribe request.' }, { status: 500 });
  }
}
