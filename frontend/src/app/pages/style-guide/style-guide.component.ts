import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * `/style` is the visual brand book (11 sections). On Vercel a rewrite serves
 * `/brand-book/index.html`; this component is the local/fallback redirect so
 * hashes like `#color`, `#type`, `#agents` land on the same page as
 * http://127.0.0.1:8765/preview/index.html.
 */
@Component({
  selector: 'app-style-guide',
  template: `<p class="lede">Opening the Junction brand book…</p>`,
  styles: [
    `
      .lede {
        margin: 2rem 0;
        color: var(--mute, #6b7c72);
      }
    `,
  ],
})
export class StyleGuideComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    const fragment = this.route.snapshot.fragment;
    const target = fragment
      ? `/brand-book/index.html#${fragment}`
      : '/brand-book/index.html';
    window.location.replace(target);
  }
}
