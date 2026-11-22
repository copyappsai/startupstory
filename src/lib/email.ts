/**
 * Email notification service for StartupStory pre-launch waitlist.
 * 
 * Note: Only launch notifications will be sent (no marketing newsletters).
 * If RESEND_API_KEY is configured in .env, sends a confirmation or queues the launch notification.
 * If not configured, signups are securely stored in the database and a server log notes that
 * live email delivery is awaiting RESEND_API_KEY configuration.
 */

export interface SendResult {
  sent: boolean;
  provider: 'resend' | 'unconfigured';
  messageId?: string;
  note?: string;
}

export async function sendLaunchConfirmationEmail(toEmail: string): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || 'StartupStory <notifications@startupstory.tech>';

  if (!apiKey) {
    // Resend is not configured yet - signups are still recorded safely in database
    console.info(
      `[Email Service] RESEND_API_KEY is not configured in environment. Launch notification confirmation was not sent via external provider for ${toEmail}. Signup recorded locally.`
    );
    return {
      sent: false,
      provider: 'unconfigured',
      note: 'RESEND_API_KEY is not set. Signup recorded in database; provider dispatch paused.',
    };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: "You're on the StartupStory launch list",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #0f172a; line-height: 1.6;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px;">
              <span style="display: inline-block; width: 36px; height: 36px; background-color: #0066FF; border-radius: 10px; text-align: center; line-height: 36px; color: white; font-weight: bold;">🚀</span>
              <span style="font-size: 20px; font-weight: 700; color: #0f172a; margin-left: 8px;">StartupStory</span>
            </div>
            <h1 style="font-size: 22px; font-weight: 700; color: #0f172a; margin-top: 0;">You're on the launch list!</h1>
            <p style="color: #334155; font-size: 15px;">
              Thanks for joining the StartupStory waitlist. We are building a space where founders share real journeys, honest lessons, milestones, and setbacks.
            </p>
            <p style="color: #334155; font-size: 15px;">
              You will receive exactly one notification email the moment the community opens to founders. We do not send marketing spam.
            </p>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 24px 0; font-size: 13px; color: #64748b;">
              <strong>Your consent record:</strong> Received on ${new Date().toUTCString()} for ${toEmail}. You can unsubscribe or request data deletion anytime.
            </div>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 32px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
              StartupStory · Pre-launch Community · Unsubscribe or manage your subscription anytime on our website.
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error('[Resend Error]', res.status, errBody);
      return {
        sent: false,
        provider: 'resend',
        note: `Resend API returned status ${res.status}`,
      };
    }

    const data = await res.json();
    return {
      sent: true,
      provider: 'resend',
      messageId: data.id,
    };
  } catch (err) {
    console.error('[Email Send Exception]', err);
    return {
      sent: false,
      provider: 'resend',
      note: 'Network exception communicating with Resend',
    };
  }
}
