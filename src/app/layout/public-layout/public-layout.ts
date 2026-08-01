import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { LocaleService } from '../../core/i18n/locale.service';
import { FooterLinkGroup } from '../../shared/models/public-site.models';
import { AnnouncementBar } from '../../shared/components/announcement-bar/announcement-bar';
import { CookieNotice } from '../../shared/components/cookie-notice/cookie-notice';
import { PublicFooter } from '../../shared/components/public-footer/public-footer';
import { PublicHeader } from '../../shared/components/public-header/public-header';

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
  protected readonly showCookieNotice = signal(true);

  protected readonly copy = computed(() => {
    const telugu = this.localeService.isTelugu();
    const groups: readonly FooterLinkGroup[] = telugu
      ? [
          {
            heading: 'నావిగేషన్',
            links: [
              { label: 'మా సేవలు', href: '#services' },
              { label: 'మా గురించి', href: '#about' },
              { label: 'ప్రశ్నలు', href: '#faq' },
            ],
          },
          {
            heading: 'చట్టపరమైనవి',
            links: [
              { label: 'గోప్యతా విధానం', href: '#legal' },
              { label: 'కుకీ విధానం', href: '#legal' },
              { label: 'నిబంధనలు', href: '#legal' },
            ],
          },
        ]
      : [
          {
            heading: 'Navigation',
            links: [
              { label: 'Services', href: '#services' },
              { label: 'About', href: '#about' },
              { label: 'FAQs', href: '#faq' },
            ],
          },
          {
            heading: 'Legal',
            links: [
              { label: 'Privacy Policy', href: '#legal' },
              { label: 'Cookie Policy', href: '#legal' },
              { label: 'Terms', href: '#legal' },
            ],
          },
        ];

    return {
      announcement: telugu
        ? 'మీ వ్యాపారం గురించి శ్రద్ధతో కూడిన తొలి సంభాషణ'
        : 'A thoughtful first conversation about your business',
      announcementAction: telugu ? 'సంభాషణ ప్రారంభించండి' : 'Start a conversation',
      skipLink: telugu ? 'ప్రధాన కంటెంట్‌కు వెళ్లండి' : 'Skip to main content',
      footerStatement: telugu
        ? 'మీ ఆలోచనకు స్పష్టత. మీ బ్రాండ్‌కు ప్రత్యేకత. మీ వ్యాపారానికి ఎదుగుదల.'
        : 'Clarity for your idea. Distinction for your brand. Growth for your business.',
      footerNote: telugu ? 'అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.' : 'All rights reserved.',
      backToTop: telugu ? 'పేజీ పైకి వెళ్లండి' : 'Back to top',
      cookieTitle: telugu ? 'మీ గోప్యత ముఖ్యం' : 'Your privacy matters',
      cookieBody: telugu
        ? 'సైట్ సక్రమంగా పనిచేయడానికి అవసరమైన కుకీలను మాత్రమే ఉపయోగిస్తాం. ఇది ప్రివ్యూ షెల్.'
        : 'We use only essential cookies for a reliable experience. This is a preview shell.',
      cookieAccept: telugu ? 'అంగీకరించండి' : 'Accept',
      cookieSettings: telugu ? 'ఎంపికలు' : 'Preferences',
      groups,
    };
  });
}
