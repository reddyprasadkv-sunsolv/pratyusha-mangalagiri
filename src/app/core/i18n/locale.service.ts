import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';

import { SupportedLanguage } from '../../features/public-site/content/public-content.model';

export const SITE_LANGUAGE_STORAGE_KEY = 'site_language';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly activeLanguage = signal<SupportedLanguage>(this.restoreLanguage());

  readonly language = this.activeLanguage.asReadonly();
  readonly locale = this.language;
  readonly isTelugu = computed(() => this.activeLanguage() === 'te');

  constructor() {
    this.updateDocumentLanguage(this.activeLanguage());
  }

  setLanguageFromRoute(language: SupportedLanguage): void {
    this.applyLanguage(language, true);
  }

  setLocale(language: SupportedLanguage): void {
    void this.switchLanguage(language);
  }

  async switchLanguage(language: SupportedLanguage): Promise<void> {
    if (!this.isSupportedLanguage(language)) {
      return;
    }

    const scrollPosition = this.isBrowser() ? window.scrollY : 0;
    this.applyLanguage(language, true);
    const mappedUrl = this.mapEquivalentUrl(this.router.url, language);

    if (mappedUrl !== this.router.url) {
      await this.router.navigateByUrl(mappedUrl);
    }

    if (this.isBrowser() && scrollPosition > 0) {
      requestAnimationFrame(() => window.scrollTo({ top: scrollPosition, behavior: 'instant' }));
    }
  }

  mapEquivalentUrl(url: string, language: SupportedLanguage): string {
    const [pathAndQuery, fragment = ''] = (url || '/').split('#', 2);
    const [path = '/', query = ''] = pathAndQuery.split('?', 2);
    const segments = path.split('/').filter(Boolean);
    const withoutLanguage = segments[0] === 'te' ? segments.slice(1) : segments;
    const mappedSegments = language === 'te' ? ['te', ...withoutLanguage] : withoutLanguage;
    const mappedPath = mappedSegments.length > 0 ? `/${mappedSegments.join('/')}` : '/';
    return `${mappedPath}${query ? `?${query}` : ''}${fragment ? `#${fragment}` : ''}`;
  }

  private applyLanguage(language: SupportedLanguage, persist: boolean): void {
    this.activeLanguage.set(language);
    this.updateDocumentLanguage(language);

    if (persist && this.isBrowser()) {
      localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, language);
    }
  }

  private restoreLanguage(): SupportedLanguage {
    if (!this.isBrowser()) {
      return 'en';
    }

    const stored = localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY);
    return this.isSupportedLanguage(stored) ? stored : 'en';
  }

  private isSupportedLanguage(value: unknown): value is SupportedLanguage {
    return value === 'en' || value === 'te';
  }

  private updateDocumentLanguage(language: SupportedLanguage): void {
    this.document.documentElement.lang = language;
    const body = this.document.body;
    if (body?.dataset) {
      body.dataset['locale'] = language;
    }
  }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
