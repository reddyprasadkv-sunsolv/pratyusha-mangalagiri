import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { UiButton } from '../ui-button/ui-button';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [UiButton],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaSection {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly body = input.required<string>();
  readonly action = input.required<string>();
  readonly href = input('#contact');
}
