import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { Locale } from '../../models/public-site.models';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcher {
  readonly locale = input.required<Locale>();
  readonly label = input('Choose language');
  readonly localeChange = output<Locale>();

  protected select(locale: Locale): void {
    if (locale !== this.locale()) {
      this.localeChange.emit(locale);
    }
  }
}
