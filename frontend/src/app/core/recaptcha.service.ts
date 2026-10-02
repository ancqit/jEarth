import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { resolveApiBaseUrl } from './api.config';

declare global {
  interface Window {
    grecaptcha?: {
      ready(callback: () => void): void;
      render(
        container: HTMLElement,
        parameters: {
          sitekey: string;
          size: 'invisible';
          callback: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
        },
      ): number;
      execute(widgetId: number): void;
      reset(widgetId?: number): void;
    };
  }
}

interface RecaptchaParamsResponse {
  recaptcha_site_key: string;
}

const EXECUTE_TIMEOUT_MS = 12_000;

/**
 * Invisible reCAPTCHA for GCP Identity Platform phone SMS.
 * warmUp() loads site key + script + widget only — never execute without a user tap
 * (prefetch tokens hang on mobile and left Send OTP stuck with no timeout).
 */
@Injectable({ providedIn: 'root' })
export class RecaptchaService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = resolveApiBaseUrl();
  private scriptPromise?: Promise<void>;
  private siteKeyPromise?: Promise<string>;
  private widgetPromise?: Promise<number>;
  private widgetId?: number;
  private container?: HTMLDivElement;
  private pending?: {
    resolve: (token: string) => void;
    reject: (error: Error) => void;
  };
  private hasExecuted = false;
  private executeChain: Promise<unknown> = Promise.resolve();

  warmUp(): void {
    void this.ensureReady().catch(() => {
      /* non-fatal; getToken() retries on tap */
    });
  }

  async getToken(): Promise<string> {
    const run = this.executeChain.then(() => this.executeWithRetry());
    this.executeChain = run.then(
      () => undefined,
      () => undefined,
    );
    return run;
  }

  private async executeWithRetry(): Promise<string> {
    try {
      return await this.executeOnce();
    } catch (first) {
      await new Promise((r) => setTimeout(r, 300));
      try {
        return await this.executeOnce();
      } catch {
        throw first instanceof Error ? first : new Error('reCAPTCHA verification failed');
      }
    }
  }

  private async executeOnce(): Promise<string> {
    const siteKey = await this.ensureReady();
    return this.execute(siteKey);
  }

  private async ensureReady(): Promise<string> {
    const siteKey = await this.getSiteKey();
    await this.loadScript();
    await this.ensureWidget(siteKey);
    return siteKey;
  }

  private getSiteKey(): Promise<string> {
    this.siteKeyPromise ??= firstValueFrom(
      this.http.get<RecaptchaParamsResponse>(`${this.baseUrl}/auth/recaptcha-params`),
    ).then((res) => {
      if (!res.recaptcha_site_key) {
        throw new Error('GCP did not return a reCAPTCHA site key');
      }
      return res.recaptcha_site_key;
    });
    return this.siteKeyPromise;
  }

  private loadScript(): Promise<void> {
    this.scriptPromise ??= new Promise<void>((resolve, reject) => {
      if (window.grecaptcha) {
        resolve();
        return;
      }

      const existing = document.querySelector<HTMLScriptElement>('script[data-junction-recaptcha]');
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Failed to load reCAPTCHA')), {
          once: true,
        });
        return;
      }

      const script = document.createElement('script');
      // Native WKWebView / Capacitor: prefer recaptcha.net (same as frontweb APK).
      const native =
        typeof window !== 'undefined' &&
        (window as Window & { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor
          ?.isNativePlatform?.() === true;
      script.src = native
        ? 'https://www.recaptcha.net/recaptcha/api.js?render=explicit'
        : 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.dataset['junctionRecaptcha'] = 'true';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load reCAPTCHA'));
      document.head.appendChild(script);
    });
    return this.scriptPromise;
  }

  private ensureWidget(siteKey: string): Promise<number> {
    if (this.widgetId !== undefined) {
      return Promise.resolve(this.widgetId);
    }
    this.widgetPromise ??= new Promise<number>((resolve, reject) => {
      const grecaptcha = window.grecaptcha;
      if (!grecaptcha) {
        reject(new Error('reCAPTCHA failed to initialize'));
        return;
      }
      grecaptcha.ready(() => {
        try {
          this.container = document.createElement('div');
          this.container.setAttribute('aria-hidden', 'true');
          this.container.style.cssText =
            'position:absolute;width:1px;height:1px;left:-9999px;top:0;overflow:hidden;';
          document.body.appendChild(this.container);
          this.widgetId = grecaptcha.render(this.container, {
            sitekey: siteKey,
            size: 'invisible',
            callback: (token: string) => {
              this.pending?.resolve(token);
              this.pending = undefined;
            },
            'error-callback': () => {
              this.pending?.reject(new Error('reCAPTCHA verification failed'));
              this.pending = undefined;
            },
            'expired-callback': () => {
              this.pending?.reject(new Error('reCAPTCHA expired. Please try again.'));
              this.pending = undefined;
            },
          });
          resolve(this.widgetId);
        } catch (error) {
          this.widgetPromise = undefined;
          reject(error instanceof Error ? error : new Error('Unable to start reCAPTCHA'));
        }
      });
    });
    return this.widgetPromise;
  }

  private async execute(siteKey: string): Promise<string> {
    const widgetId = await this.ensureWidget(siteKey);
    const grecaptcha = window.grecaptcha;
    if (!grecaptcha) {
      throw new Error('reCAPTCHA failed to initialize');
    }

    return new Promise<string>((resolve, reject) => {
      if (this.pending) {
        this.pending.reject(new Error('Another verification is in progress'));
        this.pending = undefined;
      }

      const timer = window.setTimeout(() => {
        if (!this.pending) {
          return;
        }
        this.pending = undefined;
        try {
          grecaptcha.reset(widgetId);
        } catch {
          /* ignore */
        }
        reject(new Error('Verification timed out. Please try again.'));
      }, EXECUTE_TIMEOUT_MS);

      this.pending = {
        resolve: (token: string) => {
          window.clearTimeout(timer);
          resolve(token);
        },
        reject: (error: Error) => {
          window.clearTimeout(timer);
          reject(error);
        },
      };

      try {
        if (this.hasExecuted) {
          grecaptcha.reset(widgetId);
        }
        this.hasExecuted = true;
        grecaptcha.execute(widgetId);
      } catch (error) {
        window.clearTimeout(timer);
        this.pending = undefined;
        reject(error instanceof Error ? error : new Error('Unable to start reCAPTCHA'));
      }
    });
  }
}
