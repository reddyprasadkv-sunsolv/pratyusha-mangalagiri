import { TestBed } from '@angular/core/testing';

import { LanguageSwitcher } from './language-switcher';

describe('LanguageSwitcher', () => {
  it('exposes the active locale and emits a keyboard-accessible language change', async () => {
    await TestBed.configureTestingModule({ imports: [LanguageSwitcher] }).compileComponents();
    const fixture = TestBed.createComponent(LanguageSwitcher);
    fixture.componentRef.setInput('locale', 'en');
    fixture.detectChanges();
    const emitted: string[] = [];
    fixture.componentInstance.localeChange.subscribe((locale) => emitted.push(locale));

    const buttons = fixture.nativeElement.querySelectorAll(
      'button',
    ) as NodeListOf<HTMLButtonElement>;
    expect(buttons[0].getAttribute('aria-pressed')).toBe('true');

    buttons[1].click();

    expect(emitted).toEqual(['te']);
  });
});
