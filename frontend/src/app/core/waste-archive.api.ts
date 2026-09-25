import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiService } from './api.service';
import { searchWasteArchive, WasteArchiveEntry } from '../data/waste-archive';

export interface WasteSearchSource {
  url: string;
  title: string;
}

export interface WasteSearchHit {
  id: string;
  title: string;
  stream: string;
  snippet: string;
  dispose: string[];
  sources: WasteSearchSource[];
  score?: number | null;
}

export interface WasteSearchResponse {
  query: string;
  lang: string;
  results: WasteSearchHit[];
}

@Injectable({ providedIn: 'root' })
export class WasteArchiveApi {
  private readonly api = inject(ApiService);

  search(query: string, lang: 'hi' | 'en'): Observable<WasteSearchHit[]> {
    const q = query.trim();
    if (!q) {
      return of([]);
    }
    return this.api
      .get<WasteSearchResponse>('/earth/waste/search', { q, lang, limit: '12' })
      .pipe(
        map((res) => res.results ?? []),
        catchError(() => of(this.localFallback(q, lang))),
      );
  }

  /** Offline / API-down fallback using the bundled seed archive. */
  private localFallback(query: string, lang: 'hi' | 'en'): WasteSearchHit[] {
    return searchWasteArchive(query).map((entry: WasteArchiveEntry) => ({
      id: entry.id,
      title: lang === 'hi' ? entry.nameHi : entry.nameEn,
      stream: entry.stream,
      snippet: (lang === 'hi' ? entry.disposeHi : entry.disposeEn).join(' '),
      dispose: lang === 'hi' ? entry.disposeHi : entry.disposeEn,
      sources: [],
      score: null,
    }));
  }
}
