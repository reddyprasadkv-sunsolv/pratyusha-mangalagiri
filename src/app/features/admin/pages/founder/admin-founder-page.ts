import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LocaleService } from '../../../../core/i18n/locale.service';
import { SupportedLanguage } from '../../../public-site/content/public-content.model';
import { PublicContentService, translateDesignationToTelugu } from '../../../public-site/content/public-content.service';

@Component({
  selector: 'app-admin-founder-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-founder-page.html',
  styleUrl: './admin-founder-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFounderPage {
  private readonly contentService = inject(PublicContentService);
  private readonly localeService = inject(LocaleService);
  protected readonly selectedLang = signal<SupportedLanguage>('en');
  protected readonly toastMessage = signal<string | null>(null);

  protected readonly aboutTitle = signal('');
  protected readonly aboutEyebrow = signal('');
  protected readonly aboutSupporting = signal('');
  protected readonly aboutBody = signal('');
  protected readonly aboutBadge = signal('');
  protected readonly founderAlt = signal('');

  constructor() {
    this.loadContent();
  }

  protected switchLang(lang: SupportedLanguage): void {
    this.selectedLang.set(lang);
    this.localeService.setLocale(lang);
    this.loadContent();
  }

  protected loadContent(): void {
    const c = this.contentService.getContentFor(this.selectedLang());
    this.aboutTitle.set(c.aboutTitle);
    this.aboutEyebrow.set(c.aboutEyebrow);
    this.aboutSupporting.set(c.aboutSupporting);
    this.aboutBody.set(c.aboutBody);
    this.aboutBadge.set(c.aboutBadge);
    this.founderAlt.set(c.founderAlt);
  }

  protected saveFounderProfile(): void {
    const lang = this.selectedLang();
    this.contentService.updateContent(lang, {
      aboutTitle: this.aboutTitle(),
      aboutEyebrow: this.aboutEyebrow(),
      aboutSupporting: this.aboutSupporting(),
      aboutBody: this.aboutBody(),
      aboutBadge: this.aboutBadge(),
      founderAlt: this.founderAlt(),
    });

    if (lang === 'en' && this.aboutBadge()) {
      const teBadge = translateDesignationToTelugu(this.aboutBadge());
      this.contentService.updateContent('te', { aboutBadge: teBadge });
    }
    this.showToast('✅ Founder profile saved successfully!');
  }

  protected resetDefaults(): void {
    if (confirm(`Reset all ${this.selectedLang() === 'en' ? 'English' : 'Telugu'} founder settings back to default copy?`)) {
      this.contentService.resetToDefaults(this.selectedLang());
      this.loadContent();
      this.showToast('🔄 Founder profile reset to default copy!');
    }
  }

  protected autoTranslateDesignation(): void {
    const currentEnBadge = this.contentService.getContentFor('en').aboutBadge;
    const translatedTeBadge = translateDesignationToTelugu(currentEnBadge);
    this.contentService.updateContent('te', { aboutBadge: translatedTeBadge });
    if (this.selectedLang() === 'te') {
      this.aboutBadge.set(translatedTeBadge);
    }
    this.showToast(`✨ Auto-converted designation "${currentEnBadge}" -> "${translatedTeBadge}" in Telugu!`);
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
