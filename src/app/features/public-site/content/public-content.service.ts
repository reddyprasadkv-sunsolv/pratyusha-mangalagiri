import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

import { LocaleService } from '../../../core/i18n/locale.service';
import { PUBLIC_CONTENT } from './public-content.data';
import { PublicPageCopy, SupportedLanguage } from './public-content.model';

const CONTENT_STORAGE_KEY = 'pratyusha_custom_content';

@Injectable({ providedIn: 'root' })
export class PublicContentService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly localeService = inject(LocaleService);
  private readonly overrides = signal<Record<string, Partial<PublicPageCopy>>>(this.loadSavedOverrides());

  readonly content = computed(() => {
    const lang = this.localeService.language();
    const base = PUBLIC_CONTENT[lang];
    const custom = this.overrides()[lang];
    return custom ? { ...base, ...custom } : base;
  });

  updateContent(lang: SupportedLanguage, updates: Partial<PublicPageCopy>): void {
    this.overrides.update((current) => {
      const updatedLang = { ...(current[lang] ?? {}), ...updates };
      const next = { ...current, [lang]: updatedLang };
      if (isPlatformBrowser(this.platformId)) {
        try {
          localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(next));
        } catch (err) {
          console.warn('Failed to save content override', err);
        }
      }
      return next;
    });
  }

  private loadSavedOverrides(): Record<string, Partial<PublicPageCopy>> {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const raw = localStorage.getItem(CONTENT_STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
      } catch {
        return {};
      }
    }
    return {};
  }
}
