import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LocaleService } from '../../../../core/i18n/locale.service';
import { SupportedLanguage } from '../../../public-site/content/public-content.model';
import { PublicContentService } from '../../../public-site/content/public-content.service';

@Component({
  selector: 'app-admin-contact-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-contact-page.html',
  styleUrl: './admin-contact-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminContactPage {
  private readonly contentService = inject(PublicContentService);
  private readonly localeService = inject(LocaleService);
  protected readonly selectedLang = signal<SupportedLanguage>('en');
  protected readonly toastMessage = signal<string | null>(null);

  protected readonly title = signal('');
  protected readonly supporting = signal('');
  protected readonly body = signal('');
  protected readonly note = signal('');

  protected readonly phone = signal('+91 70759 86432');
  protected readonly whatsapp = signal('+91 70759 86432');
  protected readonly email = signal('pratyushamangalagiri@gmail.com');

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
    this.title.set(c.contactTitle);
    this.supporting.set(c.contactSupporting);
    this.body.set(c.contactBody);
    this.note.set(c.contactNote);
  }

  protected saveContactChanges(): void {
    const lang = this.selectedLang();
    this.contentService.updateContent(lang, {
      contactTitle: this.title(),
      contactSupporting: this.supporting(),
      contactBody: this.body(),
      contactNote: this.note(),
    });
    this.showToast('✅ Contact information saved successfully!');
  }

  protected resetDefaults(): void {
    if (confirm(`Reset ${this.selectedLang() === 'en' ? 'English' : 'Telugu'} contact settings back to default copy?`)) {
      this.contentService.resetToDefaults(this.selectedLang());
      this.loadContent();
      this.showToast('🔄 Contact settings reset to defaults!');
    }
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
