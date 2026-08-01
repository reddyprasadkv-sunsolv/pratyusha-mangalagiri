import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeading {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly emphasis = input<string | null>(null);
  readonly description = input<string | null>(null);
  readonly align = input<'start' | 'center'>('start');
}
