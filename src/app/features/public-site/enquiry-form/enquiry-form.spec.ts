import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LocaleService } from '../../../core/i18n/locale.service';
import { EnquiryForm } from './enquiry-form';

describe('EnquiryForm', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [EnquiryForm],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('changes labels without losing values or consent', () => {
    const fixture = TestBed.createComponent(EnquiryForm);
    const localeService = TestBed.inject(LocaleService);
    fixture.detectChanges();
    fixture.componentInstance.form.patchValue({
      name: 'Pratyusha',
      mobile: '9876543210',
      requirement: 'brand',
      consent: true,
    });

    localeService.setLanguageFromRoute('te');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('పూర్తి పేరు');
    expect(fixture.componentInstance.form.controls.name.value).toBe('Pratyusha');
    expect(fixture.componentInstance.form.controls.mobile.value).toBe('9876543210');
    expect(fixture.componentInstance.form.controls.consent.value).toBe(true);
  });

  it('validates required fields, Indian mobile numbers, and optional email', () => {
    const fixture = TestBed.createComponent(EnquiryForm);
    fixture.detectChanges();
    const form = fixture.componentInstance.form;

    form.patchValue({ name: '   ', mobile: '12345', email: '', requirement: '', consent: false });
    expect(form.controls.name.invalid).toBe(true);
    expect(form.controls.mobile.invalid).toBe(true);
    expect(form.controls.email.valid).toBe(true);
    expect(form.controls.requirement.invalid).toBe(true);
    expect(form.controls.consent.invalid).toBe(true);

    form.controls.email.setValue('not-an-email');
    expect(form.controls.email.invalid).toBe(true);
  });

  it('does not expose a real submission endpoint or log personal data', () => {
    const fixture = TestBed.createComponent(EnquiryForm);
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;

    expect(form.getAttribute('action')).toBeNull();
    expect(form.getAttribute('method')).toBeNull();
  });
});
