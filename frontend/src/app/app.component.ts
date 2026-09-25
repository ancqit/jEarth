import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { I18nService } from './core/i18n/i18n.service';
import { TranslatePipe } from './core/i18n/translate.pipe';

/** jEarth is two desks: waste search (+ guide tools) and mushroom farm. */
export type EarthDesk = 'waste' | 'grow' | 'style';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly year = new Date().getFullYear();
  readonly i18n = inject(I18nService);

  private readonly router = inject(Router);
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  private readonly path = computed(() => {
    return (this.url() || '').split('?')[0].split('#')[0] || '/';
  });

  /** Style book fills the viewport under the site header — hide site footer for room. */
  readonly styleBookOpen = computed(() => {
    const path = this.path();
    return path === '/style' || path === '/style/' || path.startsWith('/style/');
  });

  readonly desk = computed<EarthDesk>(() => {
    const path = this.path();
    if (path === '/mushrooms' || path.startsWith('/mushrooms/')) {
      return 'grow';
    }
    if (path === '/style' || path.startsWith('/style/')) {
      return 'style';
    }
    return 'waste';
  });

  readonly brandSubKey = computed(() => {
    const desk = this.desk();
    if (desk === 'grow') {
      return 'brand.grow';
    }
    if (desk === 'style') {
      return 'brand.style';
    }
    return 'brand.waste';
  });

  readonly footerKey = computed(() => {
    const desk = this.desk();
    if (desk === 'grow') {
      return 'footer.grow';
    }
    if (desk === 'style') {
      return 'footer.style';
    }
    return 'footer.waste';
  });
}
