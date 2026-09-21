import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Full brand book (11 sections) embedded under jEarth Style —
 * same content as /brand-book/index.html and the local preview,
 * kept inside the site chrome so Style stays one click from Earth / Guide / etc.
 */
@Component({
  selector: 'app-style-guide',
  imports: [RouterLink],
  templateUrl: './style-guide.component.html',
  styleUrl: './style-guide.component.scss',
})
export class StyleGuideComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);

  readonly frameUrl = signal<SafeResourceUrl>(
    this.sanitizer.bypassSecurityTrustResourceUrl('/brand-book/index.html'),
  );

  ngOnInit(): void {
    const apply = (fragment: string | null) => {
      // Cache-bust so hash navigations reload the iframe section.
      const stamp = Date.now();
      const href = fragment
        ? `/brand-book/index.html?v=${stamp}#${fragment}`
        : `/brand-book/index.html?v=${stamp}`;
      this.frameUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(href));
    };

    apply(this.route.snapshot.fragment);
    this.route.fragment.subscribe((fragment) => apply(fragment));
  }
}
