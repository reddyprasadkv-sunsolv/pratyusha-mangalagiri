import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary';

@Component({
  selector: 'app-ui-button',
  standalone: true,
  templateUrl: './ui-button.html',
  styleUrl: './ui-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButton {
  readonly label = input.required<string>();
  readonly variant = input<ButtonVariant>('primary');
  readonly href = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
}
