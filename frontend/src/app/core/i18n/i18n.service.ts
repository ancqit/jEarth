import { Injectable, computed, signal } from '@angular/core';
import { AppLang, LANGUAGES, TRANSLATIONS, contentLangFor } from './translations';

const STORAGE_KEY = 'junction.earth.lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<AppLang>(this.readInitial());
  /** Language for archive entries, PDFs and voice clips (Sanskrit reads the Hindi ones). */
  readonly contentLang = computed(() => contentLangFor(this.lang()));

  t(key: string, params?: Record<string, string | number>): string {
    const lang = this.lang();
    let text = TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS[contentLangFor(lang)][key] ?? TRANSLATIONS.en[key] ?? key;
    if (params) {
      for (const [name, value] of Object.entries(params)) {
        text = text.replaceAll(`{{${name}}}`, String(value));
      }
    }
    return text;
  }

  setLang(lang: AppLang): void {
    this.lang.set(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
  }

  private readInitial(): AppLang {
    let lang: AppLang = 'hi';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (LANGUAGES.some((option) => option.code === stored)) {
        lang = stored as AppLang;
      }
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
    return lang;
  }
}
