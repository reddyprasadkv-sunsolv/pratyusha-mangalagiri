import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { LocaleService } from '../../../core/i18n/locale.service';
import { ContentCard } from '../../../shared/components/content-card/content-card';
import { CtaSection } from '../../../shared/components/cta-section/cta-section';
import { FaqAccordion } from '../../../shared/components/faq-accordion/faq-accordion';
import { ImageCard } from '../../../shared/components/image-card/image-card';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { UiButton } from '../../../shared/components/ui-button/ui-button';
import { PublicContentService } from '../content/public-content.service';
import { SupportedLanguage } from '../content/public-content.model';
import { EnquiryForm } from '../enquiry-form/enquiry-form';

@Component({
  selector: 'app-public-sales-page',
  standalone: true,
  imports: [
    ContentCard,
    CtaSection,
    EnquiryForm,
    FaqAccordion,
    ImageCard,
    SectionHeading,
    UiButton,
  ],
  templateUrl: './public-sales-page.html',
  styleUrl: './public-sales-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicSalesPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly localeService = inject(LocaleService);
  protected readonly contentService = inject(PublicContentService);
  protected readonly content = computed(() => this.contentService.content());

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const language: SupportedLanguage = params.get('language') === 'te' ? 'te' : 'en';
      this.localeService.setLanguageFromRoute(language);
    });
  }
}
