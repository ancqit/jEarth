import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { I18nService } from './i18n/i18n.service';

const WELCOME_MS = 2500;
const VOICE_VOLUME = 0.7;
/** Quick back-and-forth tab switching should not make jEarth talk every time. */
const VOICE_COOLDOWN_MS = 60_000;

type Clip = 'goodnight' | 'welcome';

/** Tab title and voice say good night while the tab is hidden and welcome the visitor back. */
@Injectable({ providedIn: 'root' })
export class TabPresenceService {
  private readonly document = inject(DOCUMENT);
  private readonly i18n = inject(I18nService);
  private awakeTitle = '';
  private welcomeTimer?: ReturnType<typeof setTimeout>;
  private readonly clips = new Map<string, HTMLAudioElement>();
  private readonly lastPlayed: Record<Clip, number> = { goodnight: 0, welcome: 0 };

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
    this.play('goodnight');
  }

  private wake(): void {
    if (!this.awakeTitle) {
      return;
    }
    this.document.title = this.i18n.t('tab.welcome');
    this.play('welcome');
    this.welcomeTimer = setTimeout(() => (this.document.title = this.awakeTitle), WELCOME_MS);
  }

  /** Browsers refuse audio until the visitor has interacted with the page; stay silent then. */
  private play(clip: Clip): void {
    const now = Date.now();
    if (now - this.lastPlayed[clip] < VOICE_COOLDOWN_MS) {
      return;
    }
    for (const audio of this.clips.values()) {
      audio.pause();
    }
    const audio = this.clip(`/sounds/${clip}-${this.i18n.contentLang()}.mp3`);
    audio.currentTime = 0;
    audio
      .play()
      .then(() => (this.lastPlayed[clip] = now))
      .catch(() => undefined);
  }

  private clip(src: string): HTMLAudioElement {
    let audio = this.clips.get(src);
    if (!audio) {
      audio = new Audio(src);
      audio.preload = 'auto';
      audio.volume = VOICE_VOLUME;
      this.clips.set(src, audio);
    }
    return audio;
  }
}
