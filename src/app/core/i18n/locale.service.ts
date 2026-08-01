import { DOCUMENT } from '@angular/common';
import { computed, inject, Injectable, signal } from '@angular/core';

import { Locale } from '../../shared/models/public-site.models';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly document = inject(DOCUMENT);
  private readonly activeLocale = signal<Locale>('en');

  readonly locale = this.activeLocale.asReadonly();
  readonly isTelugu = computed(() => this.activeLocale() === 'te');

  setLocale(locale: Locale): void {
    this.activeLocale.set(locale);
    this.document.documentElement.lang = locale;
    this.document.body.dataset['locale'] = locale;
  }
}
