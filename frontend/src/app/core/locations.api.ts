import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { ApiService } from './api.service';
import { SessionService } from './session.service';

interface CityListResponse {
  cities: string[];
}

interface LocalityListResponse {
  city: string;
  localities: string[];
}

/** Junction city/locality catalog — same /locations API as today / monster. */
@Injectable({ providedIn: 'root' })
export class LocationsApi {
  private readonly api = inject(ApiService);
  private readonly session = inject(SessionService);

  cities(): Observable<string[]> {
    return this.session.ensureSession().pipe(
      switchMap(() => this.api.get<CityListResponse | string[]>('/locations/cities')),
      map((response) => (Array.isArray(response) ? response : (response?.cities ?? []))),
      catchError(() => of([])),
    );
  }

  localities(city: string): Observable<string[]> {
    const trimmed = city.trim();
    if (!trimmed) {
      return of([]);
    }
    return this.session.ensureSession().pipe(
      switchMap(() =>
        this.api.get<LocalityListResponse | string[]>('/locations/localities', { city: trimmed }),
      ),
      map((response) => (Array.isArray(response) ? response : (response?.localities ?? []))),
      catchError(() => of([])),
    );
  }
}
