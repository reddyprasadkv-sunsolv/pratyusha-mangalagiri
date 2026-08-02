import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PublicContentService } from '../content/public-content.service';
import { FormField } from '../../../shared/components/form-field/form-field';
import { UiButton } from '../../../shared/components/ui-button/ui-button';
import { EnquiryDraftService } from './enquiry-draft.service';

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
  private readonly draftService = inject(EnquiryDraftService);
  protected readonly copy = computed(() => this.contentService.content().form);
  protected readonly developmentMessage = signal<string | null>(null);

  readonly form = this.draftService.form;

  protected submitPreview(): void {
    this.developmentMessage.set(null);
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

    if (this.form.invalid) {
      return;
    }

    this.developmentMessage.set(this.copy().developmentNotice);
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
