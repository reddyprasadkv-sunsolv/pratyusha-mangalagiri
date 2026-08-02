import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { routes } from '../../app.routes';
import { LocaleService, SITE_LANGUAGE_STORAGE_KEY } from './locale.service';

describe('LocaleService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });

  it('defaults safely to English', () => {
    const service = TestBed.inject(LocaleService);
    const document = TestBed.inject(DOCUMENT);

    expect(service.language()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('switches to Telugu, persists the preference, and updates html lang', async () => {
    const service = TestBed.inject(LocaleService);
    const document = TestBed.inject(DOCUMENT);

    await service.switchLanguage('te');

    expect(service.language()).toBe('te');
    expect(localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY)).toBe('te');
    expect(document.documentElement.lang).toBe('te');
  });

  it('keeps the route authoritative when a stored preference conflicts', () => {
    localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, 'te');

    const service = TestBed.inject(LocaleService);

    expect(service.language()).toBe('en');
    service.setLanguageFromRoute('te');
    expect(service.language()).toBe('te');
  });

  it('falls back safely when the stored preference is invalid', () => {
    localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, 'unsupported');

    const service = TestBed.inject(LocaleService);

    expect(service.language()).toBe('en');
  });

  it('restores English and maps equivalent English and Telugu paths', async () => {
    const service = TestBed.inject(LocaleService);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/te/privacy-policy?source=test#details');

    expect(service.mapEquivalentUrl(router.url, 'en')).toBe('/privacy-policy?source=test#details');
    expect(service.mapEquivalentUrl('/terms-and-conditions', 'te')).toBe(
      '/te/terms-and-conditions',
    );

    await service.switchLanguage('en');
    expect(service.language()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });
});
