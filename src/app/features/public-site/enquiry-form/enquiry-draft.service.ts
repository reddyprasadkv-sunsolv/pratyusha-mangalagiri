import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const INDIAN_MOBILE_PATTERN = /^[6-9]\d{9}$/;
const NON_WHITESPACE_PATTERN = /\S/;

@Injectable({ providedIn: 'root' })
export class EnquiryDraftService {
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
}
