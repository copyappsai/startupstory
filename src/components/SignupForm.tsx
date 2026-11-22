'use client';

import React, { useState, useId } from 'react';
import { Mail, CheckCircle2, AlertCircle, Info, Loader2 } from 'lucide-react';
import { SubscribeResponse } from '@/lib/types';

interface SignupFormProps {
  idPrefix?: string;
  className?: string;
  onOpenPrivacy?: () => void;
  onOpenManage?: (email: string) => void;
}

export default function SignupForm({
  idPrefix = 'hero',
  className = '',
  onOpenPrivacy,
  onOpenManage,
}: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'duplicate' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [signupDate, setSignupDate] = useState('');

  const emailInputId = useId();
  const consentId = useId();
  const honeypotId = useId();

  const validateEmailFormat = (val: string): boolean => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return re.test(val.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }

    if (!validateEmailFormat(email)) {
      setStatus('error');
      setMessage('Please enter a valid, complete email address (e.g. founder@domain.com).');
      return;
    }

    if (!consent) {
      setStatus('error');
      setMessage('Please check the box to agree to receive our launch notification.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          consent: true,
          honeypot: honeypot,
        }),
      });

      const data: SubscribeResponse = await res.json();

      if (data.code === 'already_registered') {
        setStatus('duplicate');
        setMessage(data.message || "You're already on our launch list! We'll notify you as soon as StartupStory goes live.");
        setSubmittedEmail(email.trim());
        return;
      }

      if (res.ok && data.ok) {
        setStatus('success');
        setMessage(data.message || "You're all set! We'll notify you when StartupStory launches.");
        setSubmittedEmail(email.trim());
        setSignupDate(data.signupTimestamp ? new Date(data.signupTimestamp).toLocaleDateString() : new Date().toLocaleDateString());
        setEmail('');
        setConsent(false);
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong. Please check your email and try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Unable to connect to the server. Please check your internet connection and try again.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setMessage('');
    setEmail('');
    setConsent(false);
  };

  return (
    <div className={`w-full ${className}`}>
      {status === 'success' ? (
        <div 
          className="rounded-2xl bg-white border border-[#BFDBFE] p-5 shadow-sm space-y-3 animate-in fade-in zoom-in-95 duration-200"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#0066FF] mt-0.5 shrink-0" />
            <div className="space-y-1">
              <h4 className="font-semibold text-[#0F172A] text-sm sm:text-base">
                You&apos;re on the launch list!
              </h4>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                We recorded your request for <strong className="text-[#0F172A]">{submittedEmail}</strong> on {signupDate}. You will receive exactly one notification when StartupStory goes live.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#F1F5F9] flex flex-wrap items-center justify-between gap-2 text-xs">
            {onOpenManage && (
              <button
                type="button"
                onClick={() => onOpenManage(submittedEmail)}
                className="text-[#0066FF] hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] rounded px-1"
              >
                Manage or export your subscription data
              </button>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="text-[#64748B] hover:text-[#0F172A] transition-colors ml-auto font-medium"
            >
              Add another email
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-3">
          {/* Honeypot field for spam prevention */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor={honeypotId}>Do not fill this field</label>
            <input
              id={honeypotId}
              type="text"
              name="hp_company_url"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {/* Form Controls: Input + Button */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:items-center">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94A3B8]">
                <Mail className="w-5 h-5" aria-hidden="true" />
              </div>
              <input
                id={emailInputId}
                type="email"
                required
                autoComplete="email"
                disabled={status === 'loading'}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error' || status === 'duplicate') setStatus('idle');
                }}
                placeholder="Enter your email address"
                aria-label="Email address for launch notification"
                aria-describedby={`${idPrefix}-disclaimer ${idPrefix}-status-message`}
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#CBD5E1] hover:border-[#94A3B8] focus:border-[#0066FF] rounded-xl text-sm sm:text-base text-[#0F172A] placeholder-[#94A3B8] shadow-xs outline-none focus:ring-4 focus:ring-[#0066FF]/15 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0045B5] text-white font-medium text-sm sm:text-base rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed shrink-0 focus-visible:ring-4 focus-visible:ring-[#0066FF]/30"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : (
                'Notify me at launch'
              )}
            </button>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-2.5 pt-0.5">
            <div className="flex items-center h-5">
              <input
                id={consentId}
                name="consent"
                type="checkbox"
                required
                checked={consent}
                disabled={status === 'loading'}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (status === 'error' && e.target.checked) setStatus('idle');
                }}
                className="w-4 h-4 text-[#0066FF] bg-white border-[#CBD5E1] rounded focus:ring-[#0066FF] focus:ring-2 cursor-pointer transition-colors"
              />
            </div>
            <label
              htmlFor={consentId}
              className="text-xs sm:text-[13px] text-[#475569] select-none leading-snug cursor-pointer"
            >
              I agree to receive an email when StartupStory launches.{' '}
              {onOpenPrivacy && (
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-[#0066FF] hover:underline underline-offset-2 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] rounded px-0.5"
                >
                  Privacy Policy
                </button>
              )}
            </label>
          </div>

          {/* Privacy Reassurance Note */}
          <div
            id={`${idPrefix}-disclaimer`}
            className="text-[12px] text-[#64748B] flex items-center gap-1.5"
          >
            <span>Only launch updates. Unsubscribe anytime.</span>
          </div>

          {/* Duplicate Email State Notice */}
          {status === 'duplicate' && (
            <div
              id={`${idPrefix}-status-message`}
              role="status"
              className="rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] p-3 text-xs sm:text-sm text-[#1E40AF] flex items-start gap-2.5 animate-in fade-in duration-200"
            >
              <Info className="w-4 h-4 text-[#0066FF] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium">{message}</p>
                {onOpenManage && (
                  <button
                    type="button"
                    onClick={() => onOpenManage(submittedEmail)}
                    className="text-[#0066FF] font-semibold underline hover:no-underline"
                  >
                    View or export your saved details
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Error State Notice */}
          {status === 'error' && (
            <div
              id={`${idPrefix}-status-message`}
              role="alert"
              className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs sm:text-sm text-red-700 flex items-start gap-2.5 animate-in fade-in duration-200"
            >
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <p className="font-medium">{message}</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
