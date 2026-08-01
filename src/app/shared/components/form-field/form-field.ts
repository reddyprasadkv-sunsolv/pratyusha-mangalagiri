import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-form-field',
  standalone: true,
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormField {
  readonly label = input.required<string>();
  readonly controlId = input.required<string>();
  readonly optionalLabel = input<string | null>(null);
  readonly hint = input<string | null>(null);
  readonly error = input<string | null>(null);
}
