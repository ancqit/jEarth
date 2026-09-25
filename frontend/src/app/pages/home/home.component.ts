import { Component, DestroyRef, computed, effect, inject, signal, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { WasteArchiveApi, WasteSearchHit } from '../../core/waste-archive.api';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly i18n = inject(I18nService);
  private readonly wasteApi = inject(WasteArchiveApi);
  private readonly destroyRef = inject(DestroyRef);
  private readonly query$ = new Subject<string>();

  readonly query = signal('');
  readonly loading = signal(false);
  readonly results = signal<WasteSearchHit[]>([]);
  readonly searched = computed(() => this.query().trim().length > 0);

  constructor() {
    this.query$
      .pipe(
        debounceTime(280),
        distinctUntilChanged(),
        tap((q) => {
          this.query.set(q);
          if (!q.trim()) {
            this.results.set([]);
            this.loading.set(false);
          } else {
            this.loading.set(true);
          }
        }),
        switchMap((q) => {
          const trimmed = q.trim();
          if (!trimmed) {
            return of([] as WasteSearchHit[]);
          }
          return this.wasteApi.search(trimmed, this.i18n.lang());
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (hits) => {
          this.results.set(hits);
          this.loading.set(false);
        },
        error: () => {
          this.results.set([]);
          this.loading.set(false);
        },
      });

    effect(() => {
      this.i18n.lang();
      const q = untracked(() => this.query().trim());
      if (!q) {
        return;
      }
      untracked(() => this.loading.set(true));
      this.wasteApi.search(q, this.i18n.lang()).subscribe({
        next: (hits) => {
          this.results.set(hits);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
    });
  }

  onSearch(event: Event): void {
    this.query$.next((event.target as HTMLInputElement).value);
  }

  clearSearch(): void {
    this.query.set('');
    this.query$.next('');
    this.results.set([]);
    this.loading.set(false);
  }

  streamKey(hit: WasteSearchHit): string {
    return `stream.${hit.stream}`;
  }
}
