import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { resolveApiBaseUrl } from './api.config';
import { SKIP_SESSION_AUTH } from './http-context';
import { SessionService } from './session.service';

const SESSION_PROTECTED_PATHS = ['/session', '/locations/', '/shops', '/products', '/orders'] as const;

function isApiRequest(url: string): boolean {
  const baseUrl = resolveApiBaseUrl();
  if (url.startsWith(baseUrl) || (baseUrl === '/api' && url.startsWith('/api/'))) {
    return true;
  }
  if (/^https?:\/\//i.test(url)) {
    return false;
  }
  return SESSION_PROTECTED_PATHS.some((segment) => url.includes(segment));
}

function isSessionCreateRequest(url: string, method: string): boolean {
  return method === 'POST' && (url.endsWith('/session') || url.includes('/session?'));
}

export const sessionInterceptor: HttpInterceptorFn = (request, next) => {
  const session = inject(SessionService);
  const token = session.accessToken();

  let outgoing = request;
  if (
    token &&
    isApiRequest(request.url) &&
    !isSessionCreateRequest(request.url, request.method) &&
    !request.context.get(SKIP_SESSION_AUTH)
  ) {
    outgoing = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(outgoing).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.status !== 401 ||
        !isApiRequest(request.url) ||
        isSessionCreateRequest(request.url, request.method) ||
        request.context.get(SKIP_SESSION_AUTH)
      ) {
        return throwError(() => error);
      }

      return session.refreshSession().pipe(
        switchMap(() => {
          const refreshed = session.accessToken();
          if (!refreshed) {
            return throwError(() => error);
          }
          return next(
            request.clone({
              setHeaders: { Authorization: `Bearer ${refreshed}` },
            }),
          );
        }),
        catchError((refreshError) => throwError(() => refreshError)),
      );
    }),
  );
};
