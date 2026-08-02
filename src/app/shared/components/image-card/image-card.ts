import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './image-card.html',
  styleUrl: './image-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCard {
  readonly src = input.required<string>();
  readonly alt = input.required<string>();
  readonly caption = input<string | null>(null);
  readonly badge = input<string | null>(null);
  readonly priority = input(false);
  readonly width = input(1086);
  readonly height = input(1448);
}
