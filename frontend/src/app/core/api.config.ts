/**
 * Same-origin `/api` is rewritten:
 * - Vercel → https://junctionback.onrender.com
 * - Local ng serve → proxy.conf.json
 *
 * Backend: https://github.com/ancqit/junctionBack
 */
export function resolveApiBaseUrl(): string {
  if (typeof window === 'undefined') {
    return 'http://localhost:8000';
  }

  const host = window.location.hostname;
  const isLocal = host === 'localhost' || host === '127.0.0.1';
  return isLocal ? '/api' : '/api';
}

export const JUNCTION_TODAY = 'https://junction.today';
export const JUNCTION_WEBSITE = 'https://junction.website';
