import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { catchError, of } from 'rxjs';

import { routes } from './app.routes';
import { sessionInterceptor } from './core/session.interceptor';
import { SessionService } from './core/session.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
    provideHttpClient(withInterceptors([sessionInterceptor])),
    provideAppInitializer(() => {
      const session = inject(SessionService);
      return session.ensureSession().pipe(catchError(() => of(undefined)));
    }),
  ],
};
