import {
  Component,
  ElementRef,
  HostListener,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { I18nService } from '../../core/i18n/i18n.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LANGUAGES } from '../../core/i18n/translations';

/** Header language chip; opens a popup with a slider across English, Hindi and Sanskrit. */
@Component({
  selector: 'app-lang-switch',
  imports: [TranslatePipe],
  templateUrl: './lang-switch.component.html',
  styleUrl: './lang-switch.component.scss',
})
export class LangSwitchComponent {
  readonly i18n = inject(I18nService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  private readonly trigger = viewChild<ElementRef<HTMLButtonElement>>('trigger');
  private readonly range = viewChild<ElementRef<HTMLInputElement>>('range');
  private readonly pop = viewChild<ElementRef<HTMLElement>>('pop');

  readonly languages = LANGUAGES;
  readonly open = signal(false);
  /** Pixels the popup is nudged so it stays on screen when the header wraps on phones. */
  readonly shift = signal(0);
  readonly index = computed(() =>
    Math.max(
      0,
      this.languages.findIndex((option) => option.code === this.i18n.lang()),
    ),
  );
  readonly current = computed(() => this.languages[this.index()]);

  toggle(): void {
    if (this.open()) {
      this.close();
      return;
    }
    this.shift.set(0);
    this.open.set(true);
    afterNextRender(
      () => {
        this.keepOnScreen();
        this.range()?.nativeElement.focus();
      },
      { injector: this.injector },
    );
  }

  private keepOnScreen(): void {
    const rect = this.pop()?.nativeElement.getBoundingClientRect();
    if (!rect) {
      return;
    }
    const margin = 8;
    const maxRight = document.documentElement.clientWidth - margin;
    if (rect.left < margin) {
      this.shift.set(margin - rect.left);
    } else if (rect.right > maxRight) {
      this.shift.set(maxRight - rect.right);
    }
  }

  onSlide(event: Event): void {
    const option = this.languages[Number((event.target as HTMLInputElement).value)];
    if (option && option.code !== this.i18n.lang()) {
      this.i18n.setLang(option.code);
    }
  }

  close(refocus = false): void {
    this.open.set(false);
    if (refocus) {
      this.trigger()?.nativeElement.focus();
    }
  }

  @HostListener('document:pointerdown', ['$event'])
  onOutside(event: PointerEvent): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  @HostListener('keydown.escape')
  onEscape(): void {
    if (this.open()) {
      this.close(true);
    }
  }
}
