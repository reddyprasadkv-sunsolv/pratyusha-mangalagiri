import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-content-card',
  standalone: true,
  templateUrl: './content-card.html',
  styleUrl: './content-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentCard {
  readonly number = input<string | null>(null);
  readonly title = input.required<string>();
  readonly body = input.required<string>();
  readonly tag = input<string | null>(null);
}
