import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { I18nService } from './i18n/i18n.service';

const WELCOME_MS = 2500;
const CHIME_NOTES_HZ = [784, 1046.5];
const CHIME_GAIN = 0.06;

/** Tab title sleeps while the tab is hidden and greets the visitor (with a soft chime) on return. */
@Injectable({ providedIn: 'root' })
export class TabPresenceService {
  private readonly document = inject(DOCUMENT);
  private readonly i18n = inject(I18nService);
  private awakeTitle = '';
  private welcomeTimer?: ReturnType<typeof setTimeout>;
  private audio?: AudioContext;

  start(): void {
    this.document.addEventListener('visibilitychange', () => this.onVisibilityChange());
  }

  private onVisibilityChange(): void {
    if (this.document.hidden) {
      this.sleep();
    } else {
      this.wake();
    }
  }

  private sleep(): void {
    clearTimeout(this.welcomeTimer);
    const current = this.document.title;
    if (current !== this.i18n.t('tab.welcome') && current !== this.i18n.t('tab.sleeping')) {
      this.awakeTitle = current;
    }
    this.document.title = this.i18n.t('tab.sleeping');
  }

  private wake(): void {
    if (!this.awakeTitle) {
      return;
    }
    this.document.title = this.i18n.t('tab.welcome');
    this.chime();
    this.welcomeTimer = setTimeout(() => (this.document.title = this.awakeTitle), WELCOME_MS);
  }

  /** Browsers only allow audio after the visitor has interacted with the page; stay silent otherwise. */
  private chime(): void {
    const activation = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation;
    if (activation && !activation.hasBeenActive) {
      return;
    }
    try {
      this.audio ??= new AudioContext();
      const ctx = this.audio;
      void ctx.resume().then(() => {
        const start = ctx.currentTime + 0.02;
        CHIME_NOTES_HZ.forEach((hz, index) => this.note(ctx, hz, start + index * 0.14));
      });
    } catch {
      /* audio unavailable */
    }
  }

  private note(ctx: AudioContext, hz: number, at: number): void {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = hz;
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(CHIME_GAIN, at + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.7);
    osc.connect(gain).connect(ctx.destination);
    osc.start(at);
    osc.stop(at + 0.72);
  }
}
