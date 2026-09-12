import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LocaleService } from '../../../core/i18n/locale.service';
import { ENQUIRY_ENDPOINT } from './enquiry-draft.service';
import { EnquiryForm } from './enquiry-form';

describe('EnquiryForm', () => {
  beforeEach(async () => {
    localStorage.clear();
    (window as Window & { dataLayer?: unknown[] }).dataLayer = [];
    vi.stubGlobal(
      'fetch',
      vi.fn(async (_url: string, init: RequestInit) => ({
        ok: true,
        json: async () => ({ ok: true, id: JSON.parse(init.body as string).id }),
      })),
    );
    await TestBed.configureTestingModule({
      imports: [EnquiryForm],
      providers: [
        provideRouter([]),
        { provide: ENQUIRY_ENDPOINT, useValue: 'https://script.google.com/macros/s/test/exec' },
      ],
    }).compileComponents();
  });

  afterEach(() => vi.unstubAllGlobals());

  it('changes labels without losing values or consent', () => {
    const fixture = TestBed.createComponent(EnquiryForm);
    const localeService = TestBed.inject(LocaleService);
    fixture.detectChanges();
    fixture.componentInstance.form.patchValue({
      name: 'Pratyusha',
      mobile: '9876543210',
      requirement: 'success',
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

    form.controls.city.setValue('   ');
    form.controls.message.setValue('   ');
    expect(form.controls.city.invalid).toBe(true);
    expect(form.controls.message.invalid).toBe(true);
  });

  it('trims text values and saves lead to storage on submit', async () => {
    const fixture = TestBed.createComponent(EnquiryForm);
    fixture.detectChanges();
    fixture.componentInstance.form.patchValue({
      name: '  Pratyusha  ',
      mobile: ' 9876543210 ',
      email: ' name@example.com ',
      city: ' Hyderabad ',
      requirement: 'success',
      message: ' Please share details. ',
      consent: true,
    });

    const formElement = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    formElement.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    fixture.detectChanges();

    const storedRaw = localStorage.getItem('pratyusha_submitted_leads');
    expect(storedRaw).not.toBeNull();
    const stored = JSON.parse(storedRaw!);
    expect(stored[0].fullName).toBe('Pratyusha');
    expect(stored[0].city).toBe('Hyderabad');
    expect(fixture.nativeElement.textContent).toContain('Your enquiry has been saved successfully');
  });

  it('waits for server confirmation and fires exactly one event', async () => {
    let confirm!: (value: unknown) => void;
    vi.mocked(fetch).mockImplementationOnce(async (_url, init) => {
      await new Promise((resolve) => {
        confirm = resolve;
      });
      return {
        ok: true,
        json: async () => ({ ok: true, id: JSON.parse(init!.body as string).id }),
      } as Response;
    });
    const fixture = TestBed.createComponent(EnquiryForm);
    fixture.detectChanges();
    fixture.componentInstance.form.patchValue({
      name: 'Test',
      mobile: '9876543210',
      requirement: 'success',
      consent: true,
    });
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    form.dispatchEvent(new Event('submit'));
    expect(fetch).toHaveBeenCalledTimes(1);
    expect((window as Window & { dataLayer?: unknown[] }).dataLayer).toEqual([]);
    expect(localStorage.getItem('pratyusha_submitted_leads')).toBeNull();
    confirm(undefined);
    await fixture.whenStable();
    expect((window as Window & { dataLayer?: unknown[] }).dataLayer).toEqual([
      { event: 'crystal_enquiry_success' },
    ]);
  });

  it.each(['rejected', 'wrong-id', 'network'])(
    'does not report success for %s saves',
    async (failure) => {
      vi.mocked(fetch).mockImplementationOnce(async () => {
        if (failure === 'network') throw new Error('Network failure');
        return {
          ok: true,
          json: async () => ({ ok: failure === 'wrong-id', id: 'wrong-id' }),
        } as Response;
      });
      const fixture = TestBed.createComponent(EnquiryForm);
      fixture.detectChanges();
      fixture.componentInstance.form.patchValue({
        name: 'Test',
        mobile: '9876543210',
        requirement: 'success',
        consent: true,
      });
      fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
      await fixture.whenStable();
      fixture.detectChanges();
      expect((window as Window & { dataLayer?: unknown[] }).dataLayer).toEqual([]);
      expect(localStorage.getItem('pratyusha_submitted_leads')).toBeNull();
      expect(fixture.componentInstance.form.controls.name.value).toBe('Test');
      expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain(
        'could not confirm',
      );
    },
  );

  it('does not expose a real submission endpoint or log personal data', () => {
    const fixture = TestBed.createComponent(EnquiryForm);
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;

    expect(form.getAttribute('action')).toBeNull();
    expect(form.getAttribute('method')).toBeNull();
  });
});
