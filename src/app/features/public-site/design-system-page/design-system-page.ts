import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { LocaleService } from '../../../core/i18n/locale.service';
import { ContentCard } from '../../../shared/components/content-card/content-card';
import { CtaSection } from '../../../shared/components/cta-section/cta-section';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { ErrorState } from '../../../shared/components/error-state/error-state';
import { FaqAccordion } from '../../../shared/components/faq-accordion/faq-accordion';
import { FormField } from '../../../shared/components/form-field/form-field';
import { ImageCard } from '../../../shared/components/image-card/image-card';
import { LoadingState } from '../../../shared/components/loading-state/loading-state';
import { SectionHeading } from '../../../shared/components/section-heading/section-heading';
import { TestimonialCard } from '../../../shared/components/testimonial-card/testimonial-card';
import { UiButton } from '../../../shared/components/ui-button/ui-button';
import { designSystemContent } from './design-system.content';

@Component({
  selector: 'app-design-system-page',
  standalone: true,
  imports: [
    ContentCard,
    CtaSection,
    EmptyState,
    ErrorState,
    FaqAccordion,
    FormField,
    ImageCard,
    LoadingState,
    SectionHeading,
    TestimonialCard,
    UiButton,
  ],
  templateUrl: './design-system-page.html',
  styleUrl: './design-system-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignSystemPage {
  protected readonly localeService = inject(LocaleService);
  protected readonly content = computed(() => designSystemContent[this.localeService.locale()]);
  protected readonly colors = [
    ['Plum', '#4B2238'],
    ['Deep plum', '#2D1222'],
    ['Muted gold', '#B89456'],
    ['Ivory', '#F8F3EA'],
    ['Paper', '#FFFDF8'],
    ['Ink', '#251A1F'],
  ] as const;
}
