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
    return [
      {
        heading: copy.footerNavigation,
        links: copy.nav,
      },
    ];
  });
}
