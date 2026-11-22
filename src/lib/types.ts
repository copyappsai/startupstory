export interface Subscriber {
  id: string;
  email: string;
  consentGiven: boolean;
  consentTimestamp: string;
  signupTimestamp: string;
  ipHash?: string;
  userAgent?: string;
  status: 'active' | 'unsubscribed';
  unsubscribedAt?: string;
}

export interface SubscribeRequest {
  email: string;
  consent: boolean;
  honeypot?: string;
}

export interface SubscribeResponse {
  ok: boolean;
  message: string;
  code?: 'success' | 'already_registered' | 'invalid_email' | 'consent_required' | 'spam_detected' | 'rate_limited' | 'server_error';
  signupTimestamp?: string;
  email?: string;
  unsubscribed?: boolean;
}

export interface ExportDataResponse {
  ok: boolean;
  message: string;
  data?: Partial<Subscriber>;
}
