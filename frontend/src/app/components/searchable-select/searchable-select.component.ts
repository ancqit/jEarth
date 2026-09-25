import { Component, computed, input, output, signal } from '@angular/core';

export interface SearchableOption {
  value: string;
  label: string;
}

/** Style-guide searchable select (forest / gold / paper). */
@Component({
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrl: './searchable-select.component.scss',
})
export class SearchableSelectComponent {
  readonly options = input<SearchableOption[]>([]);
  readonly value = input<string | null>(null);
  readonly placeholder = input('Search…');
  readonly allLabel = input('All');
  readonly ariaLabel = input('Filter');
  readonly allowClear = input(true);
  readonly valueChange = output<string | null>();

  readonly open = signal(false);
  readonly query = signal('');

  readonly selectedLabel = computed(() => {
    const current = this.value();
    if (!current) {
      return this.allLabel();
    }
    return this.options().find((option) => option.value === current)?.label ?? current;
  });

  readonly filteredOptions = computed(() => {
    const q = this.query().trim().toLowerCase();
    const rows = this.options();
    if (!q) {
      return rows;
    }
    return rows.filter(
      (option) =>
        option.label.toLowerCase().includes(q) || option.value.toLowerCase().includes(q),
    );
  });

  toggle(): void {
    this.open.update((wasOpen) => !wasOpen);
    if (!this.open()) {
      this.query.set('');
    }
  }

  close(): void {
    this.open.set(false);
    this.query.set('');
  }

  pick(value: string | null): void {
    this.valueChange.emit(value);
    this.close();
  }

  onQueryInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }
}
