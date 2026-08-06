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
    const diffs = this.contentService.content().differentiators;
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
    const current = [...this.contentService.content().differentiators];
    current[index] = value;
    this.contentService.updateContent(this.selectedLang(), { differentiators: current });
    this.showToast('✅ Testimonial review updated live!');
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
