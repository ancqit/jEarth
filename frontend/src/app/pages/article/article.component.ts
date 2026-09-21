import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { articleBySlug, GUIDE_ARTICLES } from '../../data/catalog';
import { styleArticleBySlug, STYLE_ARTICLES } from '../../data/style-guide';

@Component({
  selector: 'app-article',
  imports: [RouterLink],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('slug') ?? '' },
  );

  /** `guide` | `style` from route data. */
  private readonly book = toSignal(
    this.route.data.pipe(map((data) => (data['book'] as string) || 'guide')),
    { initialValue: (this.route.snapshot.data['book'] as string) || 'guide' },
  );

  readonly article = computed(() => {
    const slug = this.slug();
    return this.book() === 'style' ? styleArticleBySlug(slug) : articleBySlug(slug);
  });

  readonly indexLink = computed(() => (this.book() === 'style' ? '/style' : '/guide'));
  readonly indexLabel = computed(() =>
    this.book() === 'style' ? 'Return to the style guide.' : 'Return to the index.',
  );

  readonly others = computed(() => {
    const slug = this.slug();
    const list = this.book() === 'style' ? STYLE_ARTICLES : GUIDE_ARTICLES;
    return list.filter((item) => item.slug !== slug).slice(0, 4);
  });

  readonly chapterBase = computed(() => (this.book() === 'style' ? '/style' : '/guide'));
}
