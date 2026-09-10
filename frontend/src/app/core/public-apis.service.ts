import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { SKIP_SESSION_AUTH } from './http-context';

const skipAuth = () => new HttpContext().set(SKIP_SESSION_AUTH, true);

export interface RestCountry {
  name: { common: string };
  capital?: string[];
  population: number;
  area: number;
  flags: { svg: string; png: string; alt?: string };
  latlng: [number, number];
  maps: { googleMaps: string };
}

export interface WikiSummary {
  title: string;
  extract: string;
  content_urls?: { desktop?: { page: string } };
  thumbnail?: { source: string };
}

export interface WorldBankPoint {
  year: string;
  value: number | null;
}

export interface GithubRepo {
  id: number;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
}

export interface InatPhoto {
  id: number;
  url: string;
  taxon: string;
  place: string;
  observed: string;
  page: string;
}

export interface WeatherNow {
  temperature: number;
  humidity: number;
  precipitation: number;
  pm25: number | null;
  fruitingHint: string;
}

export interface RecyclingNode {
  id: number;
  lat: number;
  lon: number;
  name: string;
  materials: string;
}

export interface HeroLive {
  flag?: string;
  capital?: string;
  population?: number;
  area?: number;
  mapUrl?: string;
  co2?: string;
  wiki?: string;
  wikiUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class PublicApisService {
  private readonly http = inject(HttpClient);

  country(name: string): Observable<RestCountry | null> {
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`;
    return this.http
      .get<RestCountry[]>(url, {
        context: skipAuth(),
        params: new HttpParams().set('fullText', 'true').set('fields', 'name,capital,population,area,flags,latlng,maps'),
      })
      .pipe(
        map((rows) => rows[0] ?? null),
        catchError(() =>
          this.http
            .get<RestCountry[]>(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`, {
              context: skipAuth(),
              params: new HttpParams().set('fields', 'name,capital,population,area,flags,latlng,maps'),
            })
            .pipe(
              map((rows) => rows[0] ?? null),
              catchError(() => of(null)),
            ),
        ),
      );
  }

  wiki(title: string): Observable<WikiSummary | null> {
    return this.http
      .get<WikiSummary>(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`, {
        context: skipAuth(),
      })
      .pipe(catchError(() => of(null)));
  }

  worldBankLatest(iso3: string, indicator: string): Observable<WorldBankPoint | null> {
    const url = `https://api.worldbank.org/v2/country/${iso3}/indicator/${indicator}`;
    return this.http
      .get<unknown>(url, {
        context: skipAuth(),
        params: new HttpParams().set('format', 'json').set('per_page', '60').set('mrnev', '1'),
      })
      .pipe(
        map((raw) => parseWorldBank(raw)),
        catchError(() => of(null)),
      );
  }

  githubRepos(query: string): Observable<GithubRepo[]> {
    return this.http
      .get<{ items: GithubRepo[] }>('https://api.github.com/search/repositories', {
        context: skipAuth(),
        params: new HttpParams()
          .set('q', query)
          .set('sort', 'stars')
          .set('order', 'desc')
          .set('per_page', '6'),
      })
      .pipe(
        map((body) => body.items ?? []),
        catchError(() => of([])),
      );
  }

  inatMushrooms(taxon: string): Observable<InatPhoto[]> {
    return this.http
      .get<{ results: InatObservation[] }>('https://api.inaturalist.org/v1/observations', {
        context: skipAuth(),
        params: new HttpParams()
          .set('taxon_name', taxon)
          .set('photos', 'true')
          .set('quality_grade', 'research')
          .set('order_by', 'observed_on')
          .set('order', 'desc')
          .set('per_page', '8'),
      })
      .pipe(
        map((body) =>
          (body.results ?? [])
            .map((row) => {
              const photo = row.photos?.[0]?.url?.replace('square', 'medium');
              if (!photo) {
                return null;
              }
              return {
                id: row.id,
                url: photo,
                taxon: row.taxon?.preferred_common_name || row.taxon?.name || taxon,
                place: row.place_guess || 'Unknown place',
                observed: row.observed_on || '',
                page: row.uri || `https://www.inaturalist.org/observations/${row.id}`,
              } satisfies InatPhoto;
            })
            .filter((row): row is InatPhoto => row !== null),
        ),
        catchError(() => of([])),
      );
  }

  gbifCount(scientificName: string): Observable<number | null> {
    return this.http
      .get<{ count: number }>('https://api.gbif.org/v1/occurrence/search', {
        context: skipAuth(),
        params: new HttpParams().set('scientificName', scientificName).set('limit', '0'),
      })
      .pipe(
        map((body) => body.count ?? null),
        catchError(() => of(null)),
      );
  }

  climate(lat: number, lon: number): Observable<WeatherNow | null> {
    const weather$ = this.http.get<OpenMeteoWeather>('https://api.open-meteo.com/v1/forecast', {
      context: skipAuth(),
      params: new HttpParams()
        .set('latitude', String(lat))
        .set('longitude', String(lon))
        .set('current', 'temperature_2m,relative_humidity_2m,precipitation'),
    });
    const air$ = this.http
      .get<OpenMeteoAir>('https://air-quality-api.open-meteo.com/v1/air-quality', {
        context: skipAuth(),
        params: new HttpParams().set('latitude', String(lat)).set('longitude', String(lon)).set('current', 'pm2_5'),
      })
      .pipe(catchError(() => of(null)));

    return forkJoin({ weather: weather$, air: air$ }).pipe(
      map(({ weather, air }) => {
        const temperature = weather.current?.temperature_2m;
        const humidity = weather.current?.relative_humidity_2m;
        const precipitation = weather.current?.precipitation ?? 0;
        if (temperature == null || humidity == null) {
          return null;
        }
        return {
          temperature,
          humidity,
          precipitation,
          pm25: air?.current?.pm2_5 ?? null,
          fruitingHint: fruitingHint(temperature, humidity),
        };
      }),
      catchError(() => of(null)),
    );
  }

  recyclingNearby(lat: number, lon: number): Observable<RecyclingNode[]> {
    const query = `[out:json][timeout:25];(node["amenity"="recycling"](around:4000,${lat},${lon}););out 25;`;
    return this.http
      .get<{ elements: OverpassNode[] }>('https://overpass-api.de/api/interpreter', {
        context: skipAuth(),
        params: new HttpParams().set('data', query),
      })
      .pipe(
        map((body) =>
          (body.elements ?? [])
            .filter((el) => el.lat != null && el.lon != null)
            .map((el) => ({
              id: el.id,
              lat: el.lat,
              lon: el.lon,
              name: el.tags?.['name'] || el.tags?.['operator'] || 'Recycling point',
              materials: recyclingMaterials(el.tags ?? {}),
            })),
        ),
        catchError(() => of([])),
      );
  }

  heroLive(queryName: string, iso3: string, wikiTitle: string): Observable<HeroLive> {
    return forkJoin({
      country: this.country(queryName),
      wiki: this.wiki(wikiTitle),
      co2: this.worldBankLatest(iso3, 'EN.ATM.CO2E.PC'),
    }).pipe(
      map(({ country, wiki, co2 }) => ({
        flag: country?.flags.svg || country?.flags.png,
        capital: country?.capital?.[0],
        population: country?.population,
        area: country?.area,
        mapUrl: country?.maps.googleMaps,
        co2: co2?.value != null ? `${co2.value.toFixed(1)} t CO₂/person (${co2.year})` : undefined,
        wiki: wiki?.extract,
        wikiUrl: wiki?.content_urls?.desktop?.page,
      })),
      catchError(() => of({})),
    );
  }
}

interface InatObservation {
  id: number;
  uri?: string;
  observed_on?: string;
  place_guess?: string;
  taxon?: { name?: string; preferred_common_name?: string };
  photos?: { url?: string }[];
}

interface OpenMeteoWeather {
  current?: { temperature_2m?: number; relative_humidity_2m?: number; precipitation?: number };
}

interface OpenMeteoAir {
  current?: { pm2_5?: number };
}

interface OverpassNode {
  id: number;
  lat: number;
  lon: number;
  tags?: Record<string, string>;
}

function parseWorldBank(raw: unknown): WorldBankPoint | null {
  if (!Array.isArray(raw) || raw.length < 2 || !Array.isArray(raw[1])) {
    return null;
  }
  const row = (raw[1] as { date?: string; value?: number | null }[]).find((item) => item.value != null);
  if (!row?.date) {
    return null;
  }
  return { year: row.date, value: row.value ?? null };
}

function fruitingHint(temp: number, humidity: number): string {
  const tempOk = temp >= 16 && temp <= 28;
  const humOk = humidity >= 70;
  if (tempOk && humOk) {
    return 'Oyster weather: cool-warm and humid enough to pin. The harvest aisle should be busy.';
  }
  if (temp > 30) {
    return 'Too hot for button mushrooms; oysters may stall unless the room is shaded. We may unlist buttons.';
  }
  if (humidity < 55) {
    return 'Air is dry. Fruiting rooms need mist in the air, not a soaked crop.';
  }
  return 'Marginal fruiting weather. Watch the cameras for pins before you expect a full harvest list.';
}

function recyclingMaterials(tags: Record<string, string>): string {
  const keys = Object.keys(tags)
    .filter((key) => key.startsWith('recycling:') && tags[key] === 'yes')
    .map((key) => key.replace('recycling:', ''));
  return keys.length ? keys.join(', ') : 'Check the lid / local rules';
}
