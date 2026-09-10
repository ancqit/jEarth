import { Component, computed, signal } from '@angular/core';
import { SORT_ITEMS } from '../../data/sort-lab';

const STREAMS = [
  { id: 'wet', label: 'Wet / organic' },
  { id: 'dry', label: 'Dry recyclable' },
  { id: 'sanitary', label: 'Sanitary' },
  { id: 'ewaste', label: 'E-waste' },
  { id: 'hazardous', label: 'Hazardous' },
  { id: 'reject', label: 'Reject / residual' },
] as const;

@Component({
  selector: 'app-sort-lab',
  templateUrl: './sort-lab.component.html',
  styleUrl: './sort-lab.component.scss',
})
export class SortLabComponent {
  readonly streams = STREAMS;
  readonly items = SORT_ITEMS;
  readonly index = signal(0);
  readonly picked = signal<string | null>(null);
  readonly score = signal(0);
  readonly answered = signal(0);

  readonly current = computed(() => this.items[this.index()]);
  readonly done = computed(() => this.index() >= this.items.length);

  choose(stream: string): void {
    if (this.picked() || this.done()) {
      return;
    }
    this.picked.set(stream);
    this.answered.update((n) => n + 1);
    if (stream === this.current().answer) {
      this.score.update((n) => n + 1);
    }
  }

  next(): void {
    this.picked.set(null);
    this.index.update((n) => n + 1);
  }

  restart(): void {
    this.index.set(0);
    this.picked.set(null);
    this.score.set(0);
    this.answered.set(0);
  }
}
