'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, Sparkles, Download, Trash2, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export type ModalType = 'privacy' | 'terms' | 'about' | 'how-it-works' | 'manage' | null;

interface LegalModalsProps {
  activeModal: ModalType;
  initialEmail?: string;
  onClose: () => void;
}

export default function LegalModals({ activeModal, initialEmail = '', onClose }: LegalModalsProps) {
  const [manageEmail, setManageEmail] = useState(initialEmail);
  const [manageStatus, setManageStatus] = useState<'idle' | 'loading' | 'exported' | 'deleted' | 'error'>('idle');
  const [manageMessage, setManageMessage] = useState('');
  const [exportedData, setExportedData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (initialEmail) {
      setManageEmail(initialEmail);
    }
  }, [initialEmail]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (activeModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeModal, onClose]);

  if (!activeModal) return null;

  const handleExport = async () => {
    if (!manageEmail.trim()) {
      setManageStatus('error');
      setManageMessage('Please enter your email address to export data.');
      return;
    }

    setManageStatus('loading');
    setManageMessage('');

    try {
      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: manageEmail.trim() }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setExportedData(json.data);
        setManageStatus('exported');
        setManageMessage('Subscription details retrieved successfully.');
      } else {
        setManageStatus('error');
        setManageMessage(json.message || 'No record found for this email address.');
      }
    } catch {
      setManageStatus('error');
      setManageMessage('Network error. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!manageEmail.trim()) {
      setManageStatus('error');
      setManageMessage('Please enter your email address to unsubscribe.');
      return;
    }

    if (!confirm('Are you sure you want to permanently delete your email and unsubscribe from the launch list?')) {
      return;
    }

    setManageStatus('loading');
    setManageMessage('');

    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: manageEmail.trim() }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setManageStatus('deleted');
        setManageMessage(json.message || 'Your email has been permanently removed from the launch notification list.');
        setExportedData(null);
      } else {
        setManageStatus('error');
        setManageMessage(json.message || 'Could not find this email in our records.');
      }
    } catch {
      setManageStatus('error');
      setManageMessage('Network error. Please try again.');
    }
  };

  const downloadJson = () => {
    if (!exportedData) return;
    const blob = new Blob([JSON.stringify(exportedData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `startupstory-subscription-data-${manageEmail.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#CBD5E1] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-xl text-[#53627D] hover:text-[#101B3A] hover:bg-[#F1F5F9] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1455F5] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content Switch */}
        {activeModal === 'privacy' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF1FF] text-[#1455F5] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 id="modal-title" className="text-xl font-bold text-[#101B3A]">
                  Privacy Policy
                </h3>
                <p className="text-xs text-[#53627D]">Last updated: November 2026 (Pre-launch)</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-[#53627D] leading-relaxed pt-2">
              <p>
                At <strong>StartupStory</strong>, we respect your privacy and are committed to being completely transparent about how we collect and use your data during our pre-launch phase.
              </p>

              <h4 className="font-semibold text-[#101B3A] text-base pt-2">1. Information We Collect</h4>
              <p>
                When you sign up on our pre-launch landing page, we collect:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your email address.</li>
                <li>Your explicit consent timestamp and status.</li>
                <li>Hashed client connection metadata (used solely for spam and rate limit mitigation).</li>
              </ul>

              <h4 className="font-semibold text-[#101B3A] text-base pt-2">2. How We Use Your Information</h4>
              <p>
                We use your email address exclusively for sending <strong>one notification email when StartupStory officially launches</strong>. We will never sell, rent, or share your contact information with third-party advertisers or marketers.
              </p>

              <h4 className="font-semibold text-[#101B3A] text-base pt-2">3. Data Retention &amp; Rights</h4>
              <p>
                Under GDPR, CCPA, and global privacy standards, you have the right to inspect, export, or permanently delete your stored subscription record at any time. You can do so directly using our self-service &ldquo;Manage Subscription&rdquo; tool or by contacting our team.
              </p>

              <h4 className="font-semibold text-[#101B3A] text-base pt-2">4. Contact Information</h4>
              <p className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl text-xs text-[#53627D]">
                <strong>Operator / Data Controller:</strong> [StartupStory Pre-Launch Team]<br />
                <strong>Email Contact:</strong> [privacy@startupstory.tech]<br />
                <strong>Jurisdiction:</strong> [Replace with operating jurisdiction / state / country]
              </p>
            </div>
          </div>
        )}

        {activeModal === 'terms' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF1FF] text-[#1455F5] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 id="modal-title" className="text-xl font-bold text-[#101B3A]">
                  Terms of Service
                </h3>
                <p className="text-xs text-[#53627D]">Last updated: November 2026 (Pre-launch)</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-[#53627D] leading-relaxed pt-2">
              <p>
                These Pre-Launch Terms govern your participation in the StartupStory waitlist and access to pre-launch materials.
              </p>

              <h4 className="font-semibold text-[#101B3A] text-base pt-2">1. Pre-Launch Status</h4>
              <p>
                StartupStory is currently in active development. Waitlist registration does not guarantee immediate platform access or specific features. Preview posts displayed on the site are illustrative mockups to demonstrate expected platform conversations.
              </p>

              <h4 className="font-semibold text-[#101B3A] text-base pt-2">2. Community Standards</h4>
              <p>
                Upon launch, members agree to share truthful experiences, respect fellow entrepreneurs, avoid spam or misleading self-promotion, and maintain a constructive environment for founder learning.
              </p>

              <h4 className="font-semibold text-[#101B3A] text-base pt-2">3. Limitation of Liability</h4>
              <p>
                The landing page is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind.
              </p>

              <h4 className="font-semibold text-[#101B3A] text-base pt-2">4. Starter Contact Information</h4>
              <p className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl text-xs text-[#53627D]">
                <strong>Entity:</strong> [StartupStory Community Initiative]<br />
                <strong>Support Contact:</strong> [terms@startupstory.tech]<br />
                <strong>Legal Inquiries:</strong> [legal@startupstory.tech]
              </p>
            </div>
          </div>
        )}

        {(activeModal === 'about' || activeModal === 'how-it-works') && (
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF1FF] text-[#1455F5] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 id="modal-title" className="text-xl font-bold text-[#101B3A]">
                  {activeModal === 'about' ? 'About StartupStory' : 'How StartupStory Works'}
                </h3>
                <p className="text-xs text-[#53627D]">Building for genuine founders</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[#53627D] leading-relaxed pt-2">
              <p>
                Social feeds are filled with vanity revenue screenshots, overnight success stories, and sanitized highlight reels. The reality of building a business is much messier: sudden bugs, customer churn, pricing doubts, and late-night redesigns.
              </p>
              <p>
                <strong>StartupStory</strong> is designed from the ground up to be an authentic community for founders to:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#1455F5]">1. Share Real Journeys</h4>
                  <p className="text-xs text-[#53627D]">Post your daily or weekly updates, honest experiments, and transparent numbers.</p>
                </div>
                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#1455F5]">2. Learn From Real Failures</h4>
                  <p className="text-xs text-[#53627D]">Discover why features failed and what founders did to turn things around.</p>
                </div>
                <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-1">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#1455F5]">3. Get Constructive Peer Input</h4>
                  <p className="text-xs text-[#53627D]">Ask fellow builders for feedback on landing pages, pricing models, and onboarding flows.</p>
                </div>
              </div>
              <p className="text-xs text-[#94A3B8] pt-2">
                We are finishing the pre-launch phase and preparing to invite early founders soon. Enter your email on the landing page to get your invite.
              </p>
            </div>
          </div>
        )}

        {activeModal === 'manage' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF1FF] text-[#1455F5] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 id="modal-title" className="text-xl font-bold text-[#101B3A]">
                  Manage Your Subscription
                </h3>
                <p className="text-xs text-[#53627D]">Export or delete your data anytime (GDPR &amp; Privacy compliant)</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-[#53627D] pt-2">
              <p>
                Enter your email address below to inspect your registered launch notification details, download your subscription record, or permanently delete your data.
              </p>

              <div className="space-y-2">
                <label htmlFor="manage-email-input" className="block text-xs font-semibold text-[#101B3A]">
                  Email address
                </label>
                <input
                  id="manage-email-input"
                  type="email"
                  value={manageEmail}
                  onChange={(e) => setManageEmail(e.target.value)}
                  placeholder="founder@example.com"
                  className="w-full px-4 py-2.5 bg-white border border-[#CBD5E1] rounded-xl text-sm text-[#101B3A] focus:border-[#1455F5] outline-none focus:ring-3 focus:ring-[#1455F5]/20"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleExport}
                  disabled={manageStatus === 'loading'}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#CBD5E1] hover:border-[#1455F5] hover:text-[#1455F5] text-[#101B3A] text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  {manageStatus === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#1455F5]" />
                  ) : (
                    <Download className="w-4 h-4 text-[#1455F5]" />
                  )}
                  Export my data
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={manageStatus === 'loading'}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  Permanently delete &amp; unsubscribe
                </button>
              </div>

              {/* Status messages */}
              {manageStatus === 'exported' && (
                <div className="p-3.5 bg-[#EAF1FF] border border-[#D6E4FF] rounded-xl space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#1455F5] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#1455F5]" />
                    <span>{manageMessage}</span>
                  </div>
                  {exportedData && (
                    <div className="bg-white p-3 rounded-lg border border-[#E2E8F0] font-mono text-[11px] text-[#53627D] overflow-x-auto space-y-1">
                      <div><strong>Email:</strong> {String(exportedData.email)}</div>
                      <div><strong>Consent Given:</strong> {String(exportedData.consentGiven)}</div>
                      <div><strong>Consent Timestamp:</strong> {String(exportedData.consentTimestamp)}</div>
                      <div><strong>Signup Timestamp:</strong> {String(exportedData.signupTimestamp)}</div>
                      <div><strong>Status:</strong> {String(exportedData.status)}</div>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={downloadJson}
                    className="inline-flex items-center gap-1.5 text-xs text-[#1455F5] font-semibold underline hover:no-underline pt-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download as JSON file
                  </button>
                </div>
              )}

              {manageStatus === 'deleted' && (
                <div className="p-3.5 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-xs text-green-800">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>{manageMessage}</span>
                </div>
              )}

              {manageStatus === 'error' && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{manageMessage}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal Bottom Close */}
        <div className="pt-4 border-t border-[#F1F5F9] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#101B3A] font-medium text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
