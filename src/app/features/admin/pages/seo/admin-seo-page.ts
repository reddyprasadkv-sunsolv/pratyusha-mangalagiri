import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LocaleService } from '../../../../core/i18n/locale.service';
import { SupportedLanguage } from '../../../public-site/content/public-content.model';
import { PublicContentService } from '../../../public-site/content/public-content.service';

@Component({
  selector: 'app-admin-seo-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-seo-page.html',
  styleUrl: './admin-seo-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSeoPage {
  private readonly contentService = inject(PublicContentService);
  private readonly localeService = inject(LocaleService);
  protected readonly selectedLang = signal<SupportedLanguage>('en');
  protected readonly toastMessage = signal<string | null>(null);

  protected readonly brandTagline = signal('');
  protected readonly title = signal('');
  protected readonly description = signal('');

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
    this.brandTagline.set(c.brandTagline);
    this.title.set(c.heroTitle);
    this.description.set(c.heroSupporting);
  }

  protected saveSeoChanges(): void {
    const lang = this.selectedLang();
    this.contentService.updateContent(lang, {
      brandTagline: this.brandTagline(),
      heroTitle: this.title(),
      heroSupporting: this.description(),
    });
    this.showToast('✅ SEO settings saved successfully!');
  }

  protected resetDefaults(): void {
    if (confirm(`Reset ${this.selectedLang() === 'en' ? 'English' : 'Telugu'} SEO settings back to default copy?`)) {
      this.contentService.resetToDefaults(this.selectedLang());
      this.loadContent();
      this.showToast('🔄 SEO content reset to defaults!');
    }
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
