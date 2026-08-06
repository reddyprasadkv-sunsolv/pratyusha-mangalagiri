import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LocaleService } from '../../../core/i18n/locale.service';
import { FormField } from '../../../shared/components/form-field/form-field';
import { UiButton } from '../../../shared/components/ui-button/ui-button';
import { PublicContentService } from '../content/public-content.service';
import { EnquiryDraftService, SubmittedLead } from './enquiry-draft.service';

@Component({
  selector: 'app-enquiry-form',
  standalone: true,
  imports: [FormField, ReactiveFormsModule, UiButton],
  templateUrl: './enquiry-form.html',
  styleUrl: './enquiry-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnquiryForm {
  private readonly contentService = inject(PublicContentService);
  private readonly localeService = inject(LocaleService);
  private readonly draftService = inject(EnquiryDraftService);
  protected readonly copy = computed(() => this.contentService.content().form);
  protected readonly isSubmitting = signal(false);
  protected readonly successLead = signal<SubmittedLead | null>(null);

  readonly form = this.draftService.form;

  protected async submitPreview(): Promise<void> {
    this.successLead.set(null);
    this.form.patchValue(
      {
        name: this.form.controls.name.value.trim(),
        mobile: this.form.controls.mobile.value.trim(),
        email: this.form.controls.email.value.trim(),
        city: this.form.controls.city.value.trim(),
        message: this.form.controls.message.value.trim(),
      },
      { emitEvent: false },
    );
    this.form.markAllAsTouched();

    if (this.form.invalid || this.isSubmitting()) {
      return;
    }

    try {
      this.isSubmitting.set(true);
      const lead = await this.draftService.saveEnquiry(this.localeService.language());
      this.successLead.set(lead);
      this.form.reset();
    } finally {
      this.isSubmitting.set(false);
    }
  }

  protected get whatsappUrlForSubmittedLead(): string {
    const lead = this.successLead();
    if (!lead) return 'https://wa.me/917075986432';

    const text = `Hello Pratyusha,\n\nName: ${lead.fullName}\nMobile: ${lead.mobileNumber}\nCity: ${lead.city || 'N/A'}\nRequirement: ${lead.requirementKey}\nMessage: ${lead.message || 'N/A'}`;
    return `https://wa.me/917075986432?text=${encodeURIComponent(text)}`;
  }

  protected errorFor(controlName: keyof EnquiryForm['form']['controls']): string | null {
    const control = this.form.controls[controlName];
    if (!control.touched || !control.errors) {
      return null;
    }

    if (control.errors['maxlength']) {
      return this.copy().maxLength;
    }
    if (controlName === 'mobile' && control.errors['pattern']) {
      return this.copy().mobileInvalid;
    }
    if (controlName === 'email' && control.errors['email']) {
      return this.copy().emailInvalid;
    }
    return this.copy().required;
  }
}
