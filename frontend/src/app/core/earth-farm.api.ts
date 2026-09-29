import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { ApiService } from './api.service';
import { SessionService } from './session.service';

export interface EarthGrower {
  id: string;
  name: string;
  area: string;
  city?: string | null;
  locality?: string | null;
  crop_name: string;
  cycle_stage: string;
  cycle_day: number;
  units_available: number;
  unit_price: number;
  currency: string;
  notes: string;
  active: boolean;
}

export interface EarthApartment {
  id: string;
  name: string;
  area: string;
  city?: string | null;
  locality?: string | null;
  address: string;
  active: boolean;
}

export interface FarmSearchResponse {
  area: string;
  growers: EarthGrower[];
  apartments: EarthApartment[];
}

export type GrowerWrite = Partial<EarthGrower> & {
  name: string;
  area: string;
};

export type ApartmentWrite = Partial<EarthApartment> & {
  name: string;
  area: string;
};

@Injectable({ providedIn: 'root' })
export class EarthFarmApi {
  private readonly api = inject(ApiService);
  private readonly session = inject(SessionService);

  search(area: string): Observable<FarmSearchResponse> {
    const q = area.trim();
    if (!q) {
      return of({ area: '', growers: [], apartments: [] });
    }
    return this.session.ensureSession().pipe(
      switchMap(() => this.api.get<FarmSearchResponse>('/earth/farm/search', { area: q })),
      catchError(() => of({ area: q, growers: [], apartments: [] })),
    );
  }

  createGrower(body: GrowerWrite, adminToken: string): Observable<EarthGrower> {
    return this.api.post<EarthGrower>('/earth/farm/admin/growers', body, {
      headers: { Authorization: `Bearer ${adminToken.trim()}` },
    });
  }

  createApartment(body: ApartmentWrite, adminToken: string): Observable<EarthApartment> {
    return this.api.post<EarthApartment>('/earth/farm/admin/apartments', body, {
      headers: { Authorization: `Bearer ${adminToken.trim()}` },
    });
  }
}
