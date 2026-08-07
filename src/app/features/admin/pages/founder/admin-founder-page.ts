import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { SupportedLanguage } from '../../../public-site/content/public-content.model';
import { PublicContentService, translateDesignationToTelugu } from '../../../public-site/content/public-content.service';

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
    const lang = this.selectedLang();
    const c = this.contentService.getContentFor(lang);
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
    const lang = this.selectedLang();
    this.contentService.updateContent(lang, { [field]: value });

    if (field === 'aboutBadge') {
      if (lang === 'en') {
        const teBadge = translateDesignationToTelugu(value);
        this.contentService.updateContent('te', { aboutBadge: teBadge });
      }
    }
  }

  protected autoTranslateDesignation(): void {
    const currentEnBadge = this.contentService.getContentFor('en').aboutBadge;
    const translatedTeBadge = translateDesignationToTelugu(currentEnBadge);
    this.contentService.updateContent('te', { aboutBadge: translatedTeBadge });
    this.showToast(`✨ Auto-converted designation "${currentEnBadge}" -> "${translatedTeBadge}" in Telugu!`);
  }

  protected saveFounderProfile(): void {
    const lang = this.selectedLang();
    const current = this.founder();
    if (lang === 'en' && current.badge) {
      const teBadge = translateDesignationToTelugu(current.badge);
      this.contentService.updateContent('te', { aboutBadge: teBadge });
    }
    this.showToast('✅ Founder profile saved successfully!');
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
