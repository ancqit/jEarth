import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ContactSessionService } from '../../core/contact-session.service';
import { HomeTrashItem, HomeTrashStore } from '../../core/home-trash.store';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

const STREAM_ORDER = ['wet', 'dry', 'sanitary', 'ewaste', 'hazardous', 'construction', 'reject'];

interface StreamGroup {
  stream: string;
  items: HomeTrashItem[];
}

@Component({
  selector: 'app-home-trash',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './home-trash.component.html',
  styleUrl: './home-trash.component.scss',
})
export class HomeTrashComponent {
  readonly i18n = inject(I18nService);
  readonly session = inject(ContactSessionService);
  readonly store = inject(HomeTrashStore);

  readonly downloading = signal(false);
  readonly confirmEmpty = signal(false);

  readonly groups = computed<StreamGroup[]>(() => {
    const byStream = new Map<string, HomeTrashItem[]>();
    for (const item of this.store.items()) {
      const stream = STREAM_ORDER.includes(item.stream) ? item.stream : 'reject';
      byStream.set(stream, [...(byStream.get(stream) ?? []), item]);
    }
    return STREAM_ORDER.filter((s) => byStream.has(s)).map((stream) => ({
      stream,
      items: byStream.get(stream)!,
    }));
  });

  readonly streamCount = computed(() => this.groups().length);

  unlock(): void {
    this.session.requestUnlock();
  }

  title(item: HomeTrashItem): string {
    return this.i18n.contentLang() === 'hi' ? item.title_hi : item.title_en;
  }

  otherTitle(item: HomeTrashItem): string {
    const other = this.i18n.contentLang() === 'hi' ? item.title_en : item.title_hi;
    return other && other !== this.title(item) ? other : '';
  }

  steps(item: HomeTrashItem): string[] {
    const steps = this.i18n.contentLang() === 'hi' ? item.dispose_hi : item.dispose_en;
    return steps.length ? steps : item.dispose_en;
  }

  scrollTo(stream: string): void {
    document.getElementById(`stream-${stream}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  download(): void {
    if (this.downloading()) {
      return;
    }
    this.downloading.set(true);
    this.store
      .downloadPdf(this.i18n.contentLang())
      .pipe(finalize(() => this.downloading.set(false)))
      .subscribe({
        next: (blob) => this.store.saveBlob(blob),
        error: (err: unknown) => this.store.fail(err, () => this.download()),
      });
  }

  empty(): void {
    this.confirmEmpty.set(false);
    this.store.empty();
  }

  logout(): void {
    this.session.logout();
  }
}
