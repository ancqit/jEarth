import { Injectable, computed, signal } from '@angular/core';
import { ContactAuthResponse } from './contact-auth.api';

const STORAGE_KEY = 'junction.earth.contact';

interface StoredContact {
  token: string;
  phone: string;
  name: string | null;
  expiresAt: number;
}

/**
 * Customer unlocked with the Junction MPIN. Kept apart from the guest session:
 * its token travels in `X-Junction-Contact`, never in `Authorization`.
 */
@Injectable({ providedIn: 'root' })
export class ContactSessionService {
  private readonly contact = signal<StoredContact | null>(this.read());

  readonly token = computed(() => this.contact()?.token ?? null);
  readonly phone = computed(() => this.contact()?.phone ?? null);
  readonly name = computed(() => this.contact()?.name ?? null);
  readonly unlocked = computed(() => this.token() !== null);

  /** Last phone used, so the unlock form is prefilled after logout or expiry. */
  readonly lastPhone = signal(this.readLastPhone());

  readonly promptOpen = signal(false);
  readonly promptReason = signal<'unlock' | 'expired'>('unlock');
  private afterUnlock: (() => void) | null = null;

  requestUnlock(after?: () => void, reason: 'unlock' | 'expired' = 'unlock'): void {
    this.afterUnlock = after ?? null;
    this.promptReason.set(reason);
    this.promptOpen.set(true);
  }

  dismissPrompt(): void {
    this.afterUnlock = null;
    this.promptOpen.set(false);
  }

  signIn(res: ContactAuthResponse): void {
    if (!res.access_token) {
      throw new Error('Unlock is not available right now. Please try again later.');
    }
    const stored: StoredContact = {
      token: res.access_token,
      phone: res.phone_number,
      name: res.display_name?.trim() || null,
      expiresAt: Date.now() + (res.expires_in ?? 12 * 3600) * 1000,
    };
    this.contact.set(stored);
    this.lastPhone.set(stored.phone);
    this.write(stored);
    this.promptOpen.set(false);
    const after = this.afterUnlock;
    this.afterUnlock = null;
    after?.();
  }

  logout(): void {
    this.contact.set(null);
    this.write(null);
  }

  /** Called when the API rejects the token (expired, or MPIN reset elsewhere). */
  expire(after?: () => void): void {
    this.logout();
    this.requestUnlock(after, 'expired');
  }

  private read(): StoredContact | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw) as StoredContact;
      if (!parsed?.token || !parsed.expiresAt || parsed.expiresAt <= Date.now()) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }

  private readLastPhone(): string {
    try {
      return localStorage.getItem(`${STORAGE_KEY}.phone`) ?? '';
    } catch {
      return '';
    }
  }

  private write(value: StoredContact | null): void {
    try {
      if (value) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
        localStorage.setItem(`${STORAGE_KEY}.phone`, value.phone);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* private mode: session lasts for this tab only */
    }
  }
}
