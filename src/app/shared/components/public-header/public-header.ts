import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { LocaleService } from '../../../core/i18n/locale.service';
import { PublicContentService } from '../../../features/public-site/content/public-content.service';
import { DesktopNavigation } from '../desktop-navigation/desktop-navigation';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { MobileNavigation } from '../mobile-navigation/mobile-navigation';
import { UiButton } from '../ui-button/ui-button';

@Component({
  selector: 'app-public-header',
  standalone: true,
  imports: [DesktopNavigation, LanguageSwitcher, MobileNavigation, UiButton],
  templateUrl: './public-header.html',
  styleUrl: './public-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicHeader {
  protected readonly localeService = inject(LocaleService);
  protected readonly contentService = inject(PublicContentService);
  protected readonly content = this.contentService.content;
  protected readonly menuOpen = signal(false);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

  @HostListener('document:keydown.escape')
  protected closeOnEscape(): void {
    if (this.menuOpen()) {
      this.closeMenu();
    }
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
    queueMicrotask(() => this.menuButton()?.nativeElement.focus());
  }

  protected changeLanguage(language: 'en' | 'te'): void {
    this.closeMenuWithoutFocus();
    void this.localeService.switchLanguage(language);
  }

  private closeMenuWithoutFocus(): void {
    this.menuOpen.set(false);
  }
}
