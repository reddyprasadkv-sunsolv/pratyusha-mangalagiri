import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { SupportedLanguage } from '../../../public-site/content/public-content.model';
import { PublicContentService } from '../../../public-site/content/public-content.service';

@Component({
  selector: 'app-admin-founder-page',
  standalone: true,
  templateUrl: './admin-founder-page.html',
  styleUrl: './admin-founder-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFounderPage {
  private readonly contentService = inject(PublicContentService);
  protected readonly selectedLang = signal<SupportedLanguage>('en');
  protected readonly toastMessage = signal<string | null>(null);

  protected readonly founder = computed(() => {
    const c = this.contentService.content();
    return {
      title: c.aboutTitle,
      eyebrow: c.aboutEyebrow,
      supporting: c.aboutSupporting,
      body: c.aboutBody,
      badge: c.aboutBadge,
      founderAlt: c.founderAlt,
    };
  });

  protected switchLang(lang: SupportedLanguage): void {
    this.selectedLang.set(lang);
  }

  protected updateFounderField(field: 'aboutTitle' | 'aboutEyebrow' | 'aboutSupporting' | 'aboutBody' | 'aboutBadge' | 'founderAlt', value: string): void {
    this.contentService.updateContent(this.selectedLang(), { [field]: value });
    this.showToast('✅ Founder profile updated live!');
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
