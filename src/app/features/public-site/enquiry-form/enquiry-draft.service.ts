import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const INDIAN_MOBILE_PATTERN = /^[6-9]\d{9}$/;
const NON_WHITESPACE_PATTERN = /\S/;
export const ENQUIRY_ENDPOINT = new InjectionToken<string>('ENQUIRY_ENDPOINT', {
  providedIn: 'root',
  factory: () =>
    typeof window === 'undefined'
      ? ''
      : ((window as Window & { enquiryEndpoint?: string }).enquiryEndpoint ?? ''),
});

const STORAGE_KEY = 'pratyusha_submitted_leads';

export interface SubmittedLead {
  readonly id: string;
  readonly fullName: string;
  readonly mobileNumber: string;
  readonly emailAddress: string;
  readonly city: string;
  readonly requirementKey: string;
  readonly preferredLanguage: 'en' | 'te';
  readonly message: string;
  readonly consentGiven: boolean;
  readonly submittedAt: string;
}

@Injectable({ providedIn: 'root' })
export class EnquiryDraftService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly endpoint = inject(ENQUIRY_ENDPOINT);
  private pendingLead: SubmittedLead | null = null;

  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(NON_WHITESPACE_PATTERN),
        Validators.maxLength(80),
      ],
    }),
    mobile: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(INDIAN_MOBILE_PATTERN)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.email, Validators.maxLength(120)],
    }),
    city: new FormControl('', {
      nonNullable: true,
      validators: [Validators.pattern(NON_WHITESPACE_PATTERN), Validators.maxLength(80)],
    }),
    requirement: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.pattern(NON_WHITESPACE_PATTERN), Validators.maxLength(1000)],
    }),
    consent: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });

  async saveEnquiry(language: 'en' | 'te'): Promise<SubmittedLead> {
    if (!isPlatformBrowser(this.platformId) || !this.endpoint || this.form.invalid) {
      throw new Error('Enquiry submission is unavailable.');
    }
    const rawValue = this.form.getRawValue();
    const lead: SubmittedLead = {
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()),
      fullName: rawValue.name.trim(),
      mobileNumber: rawValue.mobile.trim(),
      emailAddress: rawValue.email.trim(),
      city: rawValue.city.trim(),
      requirementKey: rawValue.requirement,
      preferredLanguage: language,
      message: rawValue.message.trim(),
      consentGiven: rawValue.consent,
      submittedAt: new Date().toISOString(),
    };

    // Reuse the request ID after an ambiguous network failure to avoid duplicate rows.
    const fingerprint = (value: SubmittedLead) =>
      JSON.stringify({ ...value, id: '', submittedAt: '' });
    const submitted =
      this.pendingLead && fingerprint(this.pendingLead) === fingerprint(lead)
        ? this.pendingLead
        : lead;
    this.pendingLead = submitted;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(submitted),
        credentials: 'omit',
        redirect: 'follow',
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Enquiry save failed.');
      const result: unknown = await response.json();
      if (
        !result ||
        typeof result !== 'object' ||
        !('ok' in result) ||
        result.ok !== true ||
        !('id' in result) ||
        result.id !== submitted.id
      ) {
        throw new Error('The server did not confirm the enquiry save.');
      }
    } finally {
      clearTimeout(timeout);
    }
    this.pendingLead = null;

    // Keep the existing browser CRM cache only after the authoritative Sheets save.
    {
      try {
        const existingRaw = localStorage.getItem(STORAGE_KEY);
        const existing: SubmittedLead[] = existingRaw ? JSON.parse(existingRaw) : [];
        existing.unshift(submitted);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
        window.dispatchEvent(new CustomEvent('pratyusha:lead-submitted', { detail: submitted }));
      } catch {
        // A browser cache failure must not invalidate a confirmed server save.
      }
    }

    return submitted;
  }
}
