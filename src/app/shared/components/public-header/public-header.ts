import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { LocaleService } from '../../../core/i18n/locale.service';
import { NavigationItem } from '../../models/public-site.models';
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
  protected readonly menuOpen = signal(false);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

  protected readonly copy = computed(() => {
    const telugu = this.localeService.isTelugu();
    const links: readonly NavigationItem[] = telugu
      ? [
          { label: 'హోమ్', href: '#home' },
          { label: 'మా సేవలు', href: '#services' },
          { label: 'మా గురించి', href: '#about' },
          { label: 'ప్రశ్నలు', href: '#faq' },
        ]
      : [
          { label: 'Home', href: '#home' },
          { label: 'Services', href: '#services' },
          { label: 'About', href: '#about' },
          { label: 'FAQs', href: '#faq' },
        ];

    return {
      links,
      navLabel: telugu ? 'ప్రధాన నావిగేషన్' : 'Primary navigation',
      mobileLabel: telugu ? 'మొబైల్ నావిగేషన్' : 'Mobile navigation',
      openLabel: telugu ? 'మెనూ తెరవండి' : 'Open menu',
      closeLabel: telugu ? 'మెనూ మూసివేయండి' : 'Close menu',
      languageLabel: telugu ? 'వెబ్‌సైట్ భాషను ఎంచుకోండి' : 'Choose website language',
      cta: telugu ? 'మాట్లాడదాం' : 'Let’s talk',
      note: telugu
        ? 'మీ ఆలోచనను స్పష్టమైన, నమ్మకమైన బ్రాండ్‌గా మార్చుకుందాం.'
        : 'Let’s turn your idea into a clear, credible, and memorable brand.',
    };
  });

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
}
