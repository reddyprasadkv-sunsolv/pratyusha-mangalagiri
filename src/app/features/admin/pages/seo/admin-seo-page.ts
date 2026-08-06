import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { SupportedLanguage } from '../../../public-site/content/public-content.model';
import { PublicContentService } from '../../../public-site/content/public-content.service';

@Component({
  selector: 'app-admin-seo-page',
  standalone: true,
  templateUrl: './admin-seo-page.html',
  styleUrl: './admin-seo-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSeoPage {
  private readonly contentService = inject(PublicContentService);
  protected readonly selectedLang = signal<SupportedLanguage>('en');
  protected readonly toastMessage = signal<string | null>(null);

  protected readonly seo = computed(() => {
    const c = this.contentService.content();
    return {
      title: c.heroTitle,
      description: c.heroSupporting,
      brandTagline: c.brandTagline,
    };
  });

  protected switchLang(lang: SupportedLanguage): void {
    this.selectedLang.set(lang);
  }

  protected updateSeoField(field: 'heroTitle' | 'heroSupporting' | 'brandTagline', value: string): void {
    this.contentService.updateContent(this.selectedLang(), { [field]: value });
    this.showToast('✅ SEO Meta Tags updated live!');
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
