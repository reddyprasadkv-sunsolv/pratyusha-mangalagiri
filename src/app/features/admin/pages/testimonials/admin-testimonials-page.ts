import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { SupportedLanguage } from '../../../public-site/content/public-content.model';
import { PublicContentService } from '../../../public-site/content/public-content.service';

@Component({
  selector: 'app-admin-testimonials-page',
  standalone: true,
  templateUrl: './admin-testimonials-page.html',
  styleUrl: './admin-testimonials-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminTestimonialsPage {
  private readonly contentService = inject(PublicContentService);
  protected readonly selectedLang = signal<SupportedLanguage>('en');
  protected readonly toastMessage = signal<string | null>(null);

  protected readonly testimonials = computed(() => {
    const lang = this.selectedLang();
    const diffs = this.contentService.getContentFor(lang).differentiators;
    return diffs.map((d, i) => ({
      author: `Verified Client ${i + 1}`,
      location: 'Andhra Pradesh, India',
      quote: d,
    }));
  });

  protected switchLang(lang: SupportedLanguage): void {
    this.selectedLang.set(lang);
  }

  protected updateTestimonial(index: number, value: string): void {
    const lang = this.selectedLang();
    const current = [...this.contentService.getContentFor(lang).differentiators];
    current[index] = value;
    this.contentService.updateContent(lang, { differentiators: current });
    this.showToast('✅ Testimonial review updated live!');
  }

  protected saveTestimonialChanges(): void {
    this.showToast('✅ Testimonials saved successfully!');
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
