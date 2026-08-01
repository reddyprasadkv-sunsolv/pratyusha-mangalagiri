import { IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [NgOptimizedImage],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: ({ src, width }: ImageLoaderConfig): string => {
        if (!src.endsWith('/client-traditional-saree.webp') || !width) {
          return src;
        }
        if (width <= 360) {
          return '/images/client-traditional-saree-360.jpg';
        }
        if (width <= 720) {
          return '/images/client-traditional-saree-720.jpg';
        }
        return src;
      },
    },
  ],
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
}
