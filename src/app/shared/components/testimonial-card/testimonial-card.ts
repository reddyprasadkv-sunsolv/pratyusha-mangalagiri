import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  templateUrl: './testimonial-card.html',
  styleUrl: './testimonial-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialCard {
  readonly quote = input.required<string>();
  readonly name = input.required<string>();
  readonly role = input.required<string>();
  readonly sampleLabel = input<string | null>(null);
}
