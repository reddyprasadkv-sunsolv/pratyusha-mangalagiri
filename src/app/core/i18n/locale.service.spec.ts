import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { LocaleService } from './locale.service';

describe('LocaleService', () => {
  it('updates the document language and active locale', () => {
    const service = TestBed.inject(LocaleService);
    const document = TestBed.inject(DOCUMENT);

    service.setLocale('te');

    expect(service.locale()).toBe('te');
    expect(document.documentElement.lang).toBe('te');
    expect(document.body.dataset['locale']).toBe('te');
  });
});
