import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';

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
  readonly localeChange = output<Locale>();
  readonly closeMenu = output<void>();
  private readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');

  constructor() {
    effect(() => {
      if (this.open()) {
        queueMicrotask(() => this.closeButton()?.nativeElement.focus());
      }
    });
  }
}
