import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { Router } from '@angular/router';
import { ContactSessionService } from '../../core/contact-session.service';
import { HomeTrashStore } from '../../core/home-trash.store';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

/** Desktop-style Home trash can: empty or filled, always in reach; opening it asks for the MPIN. */
@Component({
  selector: 'app-trash-bin',
  imports: [TranslatePipe],
  templateUrl: './trash-bin.component.html',
  styleUrl: './trash-bin.component.scss',
})
export class TrashBinComponent {
  private readonly router = inject(Router);
  private readonly i18n = inject(I18nService);
  readonly session = inject(ContactSessionService);
  readonly store = inject(HomeTrashStore);

  readonly filled = computed(() => this.store.count() > 0);
  readonly bump = signal(false);
  readonly label = computed(() => {
    if (!this.session.unlocked()) {
      return this.i18n.t('trash.binLocked');
    }
    const count = this.store.count();
    return count ? this.i18n.t('trash.binCount', { count }) : this.i18n.t('trash.binEmpty');
  });

  private lastCount = 0;
  private wasLoaded = false;
  private bumpTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    effect(() => {
      const count = this.store.count();
      const loaded = this.store.loaded();
      untracked(() => {
        const dropped = this.wasLoaded && loaded && count > this.lastCount;
        this.wasLoaded = loaded;
        if (dropped) {
          clearTimeout(this.bumpTimer);
          this.bump.set(true);
          this.bumpTimer = setTimeout(() => this.bump.set(false), 650);
        }
        this.lastCount = count;
      });
    });
  }

  open(): void {
    const go = () => void this.router.navigate(['/home-trash']);
    if (this.session.unlocked()) {
      go();
    } else {
      this.session.requestUnlock(go);
    }
  }
}
