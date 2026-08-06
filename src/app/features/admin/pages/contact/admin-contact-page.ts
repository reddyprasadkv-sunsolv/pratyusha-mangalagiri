import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  protected readonly selectedLang = signal<SupportedLanguage>('en');
  protected readonly toastMessage = signal<string | null>(null);

  protected readonly contact = computed(() => {
    const c = this.contentService.content();
    return {
      title: c.contactTitle,
      supporting: c.contactSupporting,
      body: c.contactBody,
      note: c.contactNote,
      phone: '+91 70759 86432',
      whatsapp: '+91 70759 86432',
      email: 'pratyushamangalagiri@gmail.com',
    };
  });

  protected switchLang(lang: SupportedLanguage): void {
    this.selectedLang.set(lang);
  }

  protected updateContactField(field: 'contactTitle' | 'contactSupporting' | 'contactBody' | 'contactNote', value: string): void {
    this.contentService.updateContent(this.selectedLang(), { [field]: value });
    this.showToast('✅ Contact information updated live!');
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
