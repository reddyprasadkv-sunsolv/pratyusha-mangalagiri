import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { LocaleService } from '../../../core/i18n/locale.service';
import { SupportedLanguage } from '../../public-site/content/public-content.model';

type PolicyKey =
  | 'privacy-policy'
  | 'terms-and-conditions'
  | 'refund-cancellation-policy'
  | 'disclaimer'
  | 'cookie-policy';

const POLICY_TITLES: Readonly<Record<PolicyKey, Readonly<Record<SupportedLanguage, string>>>> = {
  'privacy-policy': { en: 'Privacy Policy', te: 'గోప్యతా విధానం' },
  'terms-and-conditions': { en: 'Terms & Conditions', te: 'నిబంధనలు మరియు షరతులు' },
  'refund-cancellation-policy': {
    en: 'Refund & Cancellation Policy',
    te: 'రిఫండ్ మరియు రద్దు విధానం',
  },
  disclaimer: { en: 'Disclaimer', te: 'నిరాకరణ ప్రకటన' },
  'cookie-policy': { en: 'Cookie Policy', te: 'కుకీ విధానం' },
};

@Component({
  selector: 'app-legal-placeholder-page',
  standalone: true,
  templateUrl: './legal-placeholder-page.html',
  styleUrl: './legal-placeholder-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegalPlaceholderPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly localeService = inject(LocaleService);
  private readonly policy = signal<PolicyKey>('privacy-policy');

  protected readonly title = computed(
    () => POLICY_TITLES[this.policy()][this.localeService.language()],
  );
  protected readonly copy = computed(() =>
    this.localeService.isTelugu()
      ? {
          eyebrow: 'చట్టపరమైన సమాచారం',
          notice: 'ఈ పేజీ క్లయింట్ మరియు న్యాయ సమీక్ష కోసం డ్రాఫ్ట్ స్థితిలో ఉంది.',
          home: 'హోమ్‌కు తిరిగి వెళ్లండి',
        }
      : {
          eyebrow: 'LEGAL INFORMATION',
          notice: 'This page remains in draft status for client and legal review.',
          home: 'Return to home',
        },
  );

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const language: SupportedLanguage = params.get('language') === 'te' ? 'te' : 'en';
      const policy = params.get('policy') as PolicyKey | null;
      this.localeService.setLanguageFromRoute(language);
      if (policy && policy in POLICY_TITLES) {
        this.policy.set(policy);
      }
    });
  }
}
