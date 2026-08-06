import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const INDIAN_MOBILE_PATTERN = /^[6-9]\d{9}$/;
const NON_WHITESPACE_PATTERN = /\S/;
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
    const rawValue = this.form.getRawValue();
    const lead: SubmittedLead = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
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

    if (isPlatformBrowser(this.platformId)) {
      try {
        const existingRaw = localStorage.getItem(STORAGE_KEY);
        const existing: SubmittedLead[] = existingRaw ? JSON.parse(existingRaw) : [];
        existing.unshift(lead);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
        window.dispatchEvent(new CustomEvent('pratyusha:lead-submitted', { detail: lead }));
      } catch (err) {
        console.warn('Failed to save lead to localStorage', err);
      }
    }

    return lead;
  }
}
