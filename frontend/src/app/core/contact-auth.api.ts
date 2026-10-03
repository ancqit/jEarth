import { HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { SKIP_SESSION_AUTH } from './http-context';

export interface ContactAuthResponse {
  verified: boolean;
  phone_number: string;
  email: string;
  has_mpin: boolean;
  message: string;
  display_name?: string | null;
  access_token?: string | null;
  expires_in?: number | null;
}

export interface OtpRequestResponse {
  message: string;
  expires_in_seconds: number;
  session_info: string;
}

/** The same customer MPIN as junction.today: phone + MPIN, or SMS OTP to set one. */
@Injectable({ providedIn: 'root' })
export class ContactAuthApi {
  private readonly api = inject(ApiService);
  private readonly context = new HttpContext().set(SKIP_SESSION_AUTH, true);

  unlock(phoneNumber: string, mpin: string): Observable<ContactAuthResponse> {
    return this.api.post<ContactAuthResponse>(
      '/auth/catalog-contacts/mpin/unlock',
      { phone_number: phoneNumber, mpin },
      { context: this.context },
    );
  }

  /** Phone + MPIN sign-up with no email or SMS; refused (409) if the number already has an account. */
  create(phoneNumber: string, mpin: string, displayName?: string): Observable<ContactAuthResponse> {
    return this.api.post<ContactAuthResponse>(
      '/auth/catalog-contacts/mpin/create',
      { phone_number: phoneNumber, mpin, display_name: displayName || undefined },
      { context: this.context },
    );
  }

  requestOtp(phoneNumber: string, recaptchaToken: string, displayName?: string): Observable<OtpRequestResponse> {
    return this.api.post<OtpRequestResponse>(
      '/auth/catalog-otp/request',
      {
        phone_number: phoneNumber,
        display_name: displayName || undefined,
        recaptcha_token: recaptchaToken,
        client_type: 'web',
      },
      { context: this.context },
    );
  }

  setupMpin(input: {
    phoneNumber: string;
    email: string;
    otp: string;
    sessionInfo: string;
    mpin: string;
    displayName?: string;
  }): Observable<ContactAuthResponse> {
    return this.api.post<ContactAuthResponse>(
      '/auth/catalog-contacts/mpin/setup',
      {
        phone_number: input.phoneNumber,
        email: input.email,
        otp: input.otp,
        session_info: input.sessionInfo,
        mpin: input.mpin,
        display_name: input.displayName || undefined,
      },
      { context: this.context },
    );
  }
}
