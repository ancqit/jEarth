import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, from, switchMap } from 'rxjs';
import { ContactAuthApi, ContactAuthResponse } from '../../core/contact-auth.api';
import { ContactSessionService } from '../../core/contact-session.service';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { RecaptchaService } from '../../core/recaptcha.service';

type Phase = 'mpin' | 'create' | 'details' | 'otp' | 'set_mpin';

const PHONE = /^[+]?[\d\s-]{8,15}$/;
const MPIN = /^\d{4,6}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Junction customer unlock: phone + MPIN; new numbers set one directly; forgot-MPIN resets by SMS. */
@Component({
  selector: 'app-mpin-modal',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './mpin-modal.component.html',
  styleUrl: './mpin-modal.component.scss',
})
export class MpinModalComponent {
  private readonly api = inject(ContactAuthApi);
  private readonly recaptcha = inject(RecaptchaService);
  private readonly i18n = inject(I18nService);
  readonly session = inject(ContactSessionService);

  readonly phase = signal<Phase>('mpin');
  readonly busy = signal(false);
  readonly error = signal<string | null>(null);
  readonly hint = signal<string | null>(null);

  readonly phone = signal(this.session.lastPhone());
  readonly mpin = signal('');
  readonly email = signal('');
  readonly name = signal('');
  readonly otp = signal('');
  readonly newMpin = signal('');
  readonly confirmMpin = signal('');
  private sessionInfo: string | null = null;

  close(): void {
    this.session.dismissPrompt();
  }

  unlock(): void {
    const phone = this.phone().trim();
    if (!PHONE.test(phone)) {
      return this.fail('mpin.errPhone');
    }
    if (!MPIN.test(this.mpin().trim())) {
      return this.fail('mpin.errMpin');
    }
    this.start();
    this.api
      .unlock(phone, this.mpin().trim())
      .pipe(finalize(() => this.busy.set(false)))
      .subscribe({
        next: (res) => this.finish(res),
        error: (err: unknown) => this.error.set(this.readError(err, 'mpin.errWrong')),
      });
  }

  startCreate(): void {
    this.error.set(null);
    this.hint.set(null);
    this.newMpin.set('');
    this.confirmMpin.set('');
    this.phase.set('create');
  }

  create(): void {
    const phone = this.phone().trim();
    const mpin = this.newMpin().trim();
    if (!PHONE.test(phone)) {
      return this.fail('mpin.errPhone');
    }
    if (!MPIN.test(mpin)) {
      return this.fail('mpin.errMpin');
    }
    if (mpin !== this.confirmMpin().trim()) {
      return this.fail('mpin.errMatch');
    }
    this.start();
    this.api
      .create(phone, mpin, this.name().trim() || undefined)
      .pipe(finalize(() => this.busy.set(false)))
      .subscribe({
        next: (res) => this.finish(res),
        error: (err: unknown) => {
          if (err instanceof HttpErrorResponse && err.status === 409) {
            this.mpin.set('');
            this.phase.set('mpin');
            this.error.set(this.i18n.t('mpin.errTaken'));
            return;
          }
          this.error.set(this.readError(err, 'mpin.errSave'));
        },
      });
  }

  startSetup(): void {
    this.error.set(null);
    this.hint.set(null);
    this.phase.set('details');
    this.recaptcha.warmUp();
  }

  backToMpin(): void {
    this.error.set(null);
    this.hint.set(null);
    this.phase.set('mpin');
  }

  sendOtp(): void {
    const phone = this.phone().trim();
    if (!PHONE.test(phone)) {
      return this.fail('mpin.errPhone');
    }
    if (!EMAIL.test(this.email().trim())) {
      return this.fail('mpin.errEmail');
    }
    this.start();
    this.hint.set(this.i18n.t('mpin.checking'));
    from(this.recaptcha.getToken())
      .pipe(
        switchMap((token) => this.api.requestOtp(phone, token, this.name().trim() || undefined)),
        finalize(() => this.busy.set(false)),
      )
      .subscribe({
        next: (res) => {
          this.sessionInfo = res.session_info;
          this.otp.set('');
          this.hint.set(this.i18n.t('mpin.otpSent'));
          this.phase.set('otp');
        },
        error: (err: unknown) => {
          this.hint.set(null);
          this.error.set(this.readError(err, 'mpin.errSend'));
        },
      });
  }

  confirmOtp(): void {
    if (!/^\d{6}$/.test(this.otp().trim())) {
      return this.fail('mpin.errOtp');
    }
    this.error.set(null);
    this.hint.set(null);
    this.newMpin.set('');
    this.confirmMpin.set('');
    this.phase.set('set_mpin');
  }

  saveMpin(): void {
    const mpin = this.newMpin().trim();
    if (!MPIN.test(mpin)) {
      return this.fail('mpin.errMpin');
    }
    if (mpin !== this.confirmMpin().trim()) {
      return this.fail('mpin.errMatch');
    }
    if (!this.sessionInfo) {
      this.phase.set('details');
      return this.fail('mpin.errOtp');
    }
    this.start();
    this.api
      .setupMpin({
        phoneNumber: this.phone().trim(),
        email: this.email().trim(),
        otp: this.otp().trim(),
        sessionInfo: this.sessionInfo,
        mpin,
        displayName: this.name().trim() || undefined,
      })
      .pipe(finalize(() => this.busy.set(false)))
      .subscribe({
        next: (res) => this.finish(res),
        error: (err: unknown) => {
          this.error.set(this.readError(err, 'mpin.errSave'));
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.phase.set('otp');
          }
        },
      });
  }

  private start(): void {
    this.busy.set(true);
    this.error.set(null);
  }

  private finish(res: ContactAuthResponse): void {
    try {
      this.session.signIn(res);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : this.i18n.t('mpin.errSave'));
    }
  }

  private fail(key: string): void {
    this.error.set(this.i18n.t(key));
  }

  private readError(err: unknown, fallbackKey: string): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401 && fallbackKey === 'mpin.errWrong') {
        return this.i18n.t('mpin.errWrong');
      }
      if (err.status === 429) {
        return this.i18n.t('mpin.errLocked');
      }
      const detail = err.error?.detail;
      if (typeof detail === 'string' && detail.trim()) {
        return detail.trim();
      }
      if (Array.isArray(detail) && detail[0]?.msg) {
        return String(detail[0].msg);
      }
    } else if (err instanceof Error && err.message.trim()) {
      return err.message.trim();
    }
    return this.i18n.t(fallbackKey);
  }
}
