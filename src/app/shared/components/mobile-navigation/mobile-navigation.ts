import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Locale } from '../../models/public-site.models';
import { NavigationItem } from '../../models/public-site.models';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-mobile-navigation',
  standalone: true,
  imports: [LanguageSwitcher],
  templateUrl: './mobile-navigation.html',
  styleUrl: './mobile-navigation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavigation {
  readonly open = input(false);
  readonly links = input.required<readonly NavigationItem[]>();
  readonly label = input.required<string>();
  readonly closeLabel = input.required<string>();
  readonly note = input.required<string>();
  readonly locale = input.required<Locale>();
  readonly languageLabel = input.required<string>();
  readonly englishLabel = input.required<string>();
  readonly teluguLabel = input.required<string>();
  readonly localeChange = output<Locale>();
  readonly closeMenu = output<void>();
  private readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');
  private readonly document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      const bodyStyle = this.document.body?.style;
      if (!bodyStyle) {
        return;
      }

      if (this.open()) {
        bodyStyle.overflow = 'hidden';
        queueMicrotask(() => this.closeButton()?.nativeElement.focus());
      } else {
        bodyStyle.removeProperty('overflow');
      }
    });
  }
}
