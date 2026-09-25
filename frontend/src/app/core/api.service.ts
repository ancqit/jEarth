import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resolveApiBaseUrl } from './api.config';

export interface ApiRequestOptions {
  context?: HttpContext;
  headers?: Record<string, string>;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = resolveApiBaseUrl();

  get<T>(path: string, params?: Record<string, string>, options?: ApiRequestOptions): Observable<T> {
    return this.http.get<T>(this.url(path), {
      params: new HttpParams({ fromObject: params ?? {} }),
      context: options?.context,
      headers: options?.headers ? new HttpHeaders(options.headers) : undefined,
    });
  }

  post<T>(path: string, body: unknown, options?: ApiRequestOptions): Observable<T> {
    return this.http.post<T>(this.url(path), body, {
      context: options?.context,
      headers: options?.headers ? new HttpHeaders(options.headers) : undefined,
    });
  }

  patch<T>(path: string, body: unknown, options?: ApiRequestOptions): Observable<T> {
    return this.http.patch<T>(this.url(path), body, {
      context: options?.context,
      headers: options?.headers ? new HttpHeaders(options.headers) : undefined,
    });
  }

  private url(path: string): string {
    return `${this.baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  }
}
