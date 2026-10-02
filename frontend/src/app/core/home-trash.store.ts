import { HttpContext, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal, untracked } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { ApiService } from './api.service';
import { ContactSessionService } from './contact-session.service';
import { SKIP_SESSION_AUTH } from './http-context';
import { AppLang } from './i18n/translations';

export interface HomeTrashItem {
  entry_id: string;
  title_en: string;
  title_hi: string;
  stream: string;
  dispose_en: string[];
  dispose_hi: string[];
  snippet_en: string;
  snippet_hi: string;
  sources: { url: string; title: string }[];
  origin?: string | null;
  added_at: string;
}

interface HomeTrashList {
  items: HomeTrashItem[];
  count: number;
  max_items: number;
}

/** The signed-in customer's Home trash bucket. Loads on unlock, clears on logout. */
@Injectable({ providedIn: 'root' })
export class HomeTrashStore {
  private readonly api = inject(ApiService);
  private readonly session = inject(ContactSessionService);
  private readonly context = new HttpContext().set(SKIP_SESSION_AUTH, true);

  readonly items = signal<HomeTrashItem[]>([]);
  readonly loading = signal(false);
  readonly loaded = signal(false);
  readonly busyIds = signal<ReadonlySet<string>>(new Set());
  readonly error = signal<string | null>(null);
  readonly ids = computed(() => new Set(this.items().map((item) => item.entry_id)));
  readonly count = computed(() => this.items().length);

  constructor() {
    effect(() => {
      const token = this.session.token();
      untracked(() => {
        if (token) {
          this.load(true);
        } else {
          this.items.set([]);
          this.loaded.set(false);
        }
      });
    });
  }

  has(entryId: string): boolean {
    return this.ids().has(entryId);
  }

  isBusy(entryId: string): boolean {
    return this.busyIds().has(entryId);
  }

  /** `background` loads (on unlock / page open) lock quietly on 401 instead of prompting. */
  load(background = false): void {
    if (!this.session.unlocked()) {
      return;
    }
    this.loading.set(true);
    this.api.get<HomeTrashList>('/earth/home-trash', undefined, this.options())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          this.items.set(res.items);
          this.loaded.set(true);
          this.error.set(null);
        },
        error: (err: unknown) => {
          if (background && err instanceof HttpErrorResponse && err.status === 401) {
            this.session.logout();
            return;
          }
          this.fail(err, () => this.load());
        },
      });
  }

  /** Add an archive entry; asks for the MPIN first when locked and resumes after. */
  add(entryId: string): void {
    if (!this.session.unlocked()) {
      this.session.requestUnlock(() => this.add(entryId));
      return;
    }
    if (this.has(entryId) || this.isBusy(entryId)) {
      return;
    }
    this.setBusy(entryId, true);
    this.api.post<HomeTrashItem>('/earth/home-trash', { entry_id: entryId }, this.options())
      .pipe(finalize(() => this.setBusy(entryId, false)))
      .subscribe({
        next: (item) => {
          this.items.update((items) => [item, ...items.filter((i) => i.entry_id !== item.entry_id)]);
          this.error.set(null);
        },
        error: (err: unknown) => this.fail(err, () => this.add(entryId)),
      });
  }

  remove(entryId: string): void {
    this.setBusy(entryId, true);
    this.api.delete<void>(`/earth/home-trash/${encodeURIComponent(entryId)}`, this.options())
      .pipe(finalize(() => this.setBusy(entryId, false)))
      .subscribe({
        next: () => this.items.update((items) => items.filter((i) => i.entry_id !== entryId)),
        error: (err: unknown) => this.fail(err),
      });
  }

  empty(): void {
    this.loading.set(true);
    this.api.delete<void>('/earth/home-trash', this.options())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.items.set([]),
        error: (err: unknown) => this.fail(err),
      });
  }

  downloadPdf(lang: AppLang): Observable<Blob> {
    return this.api.getBlob('/earth/home-trash/pdf', { lang }, this.options());
  }

  saveBlob(blob: Blob): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `junction-home-trash-${new Date().toISOString().slice(0, 10)}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /** Turns a 401 into "unlock again" and retries the action once unlocked. */
  fail(err: unknown, retry?: () => void): void {
    if (err instanceof HttpErrorResponse && err.status === 401) {
      this.session.expire(retry);
      return;
    }
    const detail = err instanceof HttpErrorResponse ? err.error?.detail : null;
    this.error.set(typeof detail === 'string' && detail.trim() ? detail.trim() : 'network');
  }

  private options() {
    return {
      context: this.context,
      headers: { 'X-Junction-Contact': this.session.token() ?? '' },
    };
  }

  private setBusy(entryId: string, busy: boolean): void {
    this.busyIds.update((ids) => {
      const next = new Set(ids);
      if (busy) {
        next.add(entryId);
      } else {
        next.delete(entryId);
      }
      return next;
    });
  }
}
