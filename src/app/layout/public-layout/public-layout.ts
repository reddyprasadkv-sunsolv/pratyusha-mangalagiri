import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { LocaleService } from '../../core/i18n/locale.service';
import { PublicContentService } from '../../features/public-site/content/public-content.service';
import { AnnouncementBar } from '../../shared/components/announcement-bar/announcement-bar';
import { CookieNotice } from '../../shared/components/cookie-notice/cookie-notice';
import { PublicFooter } from '../../shared/components/public-footer/public-footer';
import { PublicHeader } from '../../shared/components/public-header/public-header';
import { FooterLinkGroup } from '../../shared/models/public-site.models';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [AnnouncementBar, CookieNotice, PublicFooter, PublicHeader],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLayout {
  protected readonly localeService = inject(LocaleService);
  protected readonly contentService = inject(PublicContentService);
  protected readonly content = this.contentService.content;
  protected readonly showCookieNotice = signal(true);
  protected readonly showAnnouncement = signal(true);

  protected readonly footerGroups = computed<readonly FooterLinkGroup[]>(() => {
    const copy = this.content();
    const prefix = this.localeService.isTelugu() ? '/te' : '';
    return [
      {
        heading: copy.footerNavigation,
        links: copy.nav,
      },
      {
        heading: copy.footerLegal,
        links: this.localeService.isTelugu()
          ? [
              { label: 'గోప్యతా విధానం', href: `${prefix}/privacy-policy` },
              { label: 'నిబంధనలు & షరతులు', href: `${prefix}/terms-and-conditions` },
              { label: 'రిఫండ్ విధానం', href: `${prefix}/refund-cancellation-policy` },
              { label: 'నిరాకరణ', href: `${prefix}/disclaimer` },
              { label: 'కుకీ విధానం', href: `${prefix}/cookie-policy` },
            ]
          : [
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms & Conditions', href: '/terms-and-conditions' },
              { label: 'Refund Policy', href: '/refund-cancellation-policy' },
              { label: 'Disclaimer', href: '/disclaimer' },
              { label: 'Cookie Policy', href: '/cookie-policy' },
            ],
      },
    ];
  });
}
