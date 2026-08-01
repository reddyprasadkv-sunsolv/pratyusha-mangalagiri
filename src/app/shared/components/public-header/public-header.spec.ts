import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PublicHeader } from './public-header';

describe('PublicHeader', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [PublicHeader],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('shows the language switcher and opens and closes the accessible mobile menu', () => {
    const fixture = TestBed.createComponent(PublicHeader);
    fixture.detectChanges();
    const openButton = fixture.nativeElement.querySelector('.menu-trigger') as HTMLButtonElement;

    expect(fixture.nativeElement.textContent).toContain('English');
    expect(fixture.nativeElement.textContent).toContain('తెలుగు');
    expect(openButton.getAttribute('aria-expanded')).toBe('false');

    openButton.click();
    fixture.detectChanges();
    expect(openButton.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();

    const closeButton = fixture.nativeElement.querySelector(
      '.mobile-menu__close',
    ) as HTMLButtonElement;
    closeButton.click();
    fixture.detectChanges();
    expect(openButton.getAttribute('aria-expanded')).toBe('false');
  });
});
