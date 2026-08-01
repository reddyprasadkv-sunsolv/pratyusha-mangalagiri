import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

import { FaqItem } from '../../models/public-site.models';

let accordionInstance = 0;

@Component({
  selector: 'app-faq-accordion',
  standalone: true,
  templateUrl: './faq-accordion.html',
  styleUrl: './faq-accordion.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqAccordion {
  readonly items = input.required<readonly FaqItem[]>();
  protected readonly openIndex = signal<number | null>(0);
  protected readonly instanceId = `faq-${++accordionInstance}`;

  protected toggle(index: number): void {
    this.openIndex.update((current) => (current === index ? null : index));
  }
}
