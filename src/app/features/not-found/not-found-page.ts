import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, startWith } from 'rxjs';

import { LocaleService } from '../../core/i18n/locale.service';
import { SeoService } from '../../core/seo/seo.service';
import { SupportedLanguage } from '../public-site/content/public-content.model';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {
  private readonly router = inject(Router);
  private readonly localeService = inject(LocaleService);
  private readonly seoService = inject(SeoService);
  protected readonly language = signal<SupportedLanguage>('en');
  protected readonly copy = computed(() =>
    this.language() === 'te'
      ? {
          eyebrow: '404 · పేజీ కనబడలేదు',
          title: 'మీరు వెతుకుతున్న పేజీ ఇక్కడ లేదు.',
          body: 'లింక్ మారి ఉండవచ్చు లేదా పేజీ ఇంకా ప్రచురించబడకపోవచ్చు.',
          action: 'హోమ్ పేజీకి వెళ్లండి',
        }
      : {
          eyebrow: '404 · PAGE NOT FOUND',
          title: 'The page you are looking for is not here.',
          body: 'The link may have changed, or the page may not have been published yet.',
          action: 'Return to the homepage',
        },
  );

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.applyLanguageFromUrl(this.router.url));
  }

  private applyLanguageFromUrl(url: string): void {
    const language: SupportedLanguage = url === '/te' || url.startsWith('/te/') ? 'te' : 'en';
    this.language.set(language);
    this.localeService.setLanguageFromRoute(language);
    this.seoService.applyNotFound(language);
  }
}
