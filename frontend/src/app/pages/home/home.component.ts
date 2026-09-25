import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { searchWasteArchive, WasteArchiveEntry } from '../../data/waste-archive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly i18n = inject(I18nService);

  readonly query = signal('');
  readonly results = computed(() => searchWasteArchive(this.query()));

  onSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  clearSearch(): void {
    this.query.set('');
  }

  nameOf(entry: WasteArchiveEntry): string {
    return this.i18n.lang() === 'hi' ? entry.nameHi : entry.nameEn;
  }

  disposeOf(entry: WasteArchiveEntry): string[] {
    return this.i18n.lang() === 'hi' ? entry.disposeHi : entry.disposeEn;
  }

  streamKey(entry: WasteArchiveEntry): string {
    return `stream.${entry.stream}`;
  }
}
