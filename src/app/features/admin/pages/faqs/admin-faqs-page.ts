import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SupportedLanguage } from '../../../public-site/content/public-content.model';
import { PublicContentService } from '../../../public-site/content/public-content.service';

@Component({
  selector: 'app-admin-faqs-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-faqs-page.html',
  styleUrl: './admin-faqs-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminFaqsPage {
  private readonly contentService = inject(PublicContentService);
  protected readonly selectedLang = signal<SupportedLanguage>('en');
  protected readonly toastMessage = signal<string | null>(null);

  protected readonly faqs = computed(() => this.contentService.content().faqs);
  protected readonly newQuestion = signal('');
  protected readonly newAnswer = signal('');

  protected switchLang(lang: SupportedLanguage): void {
    this.selectedLang.set(lang);
  }

  protected updateFaq(faqId: string | undefined, index: number, question: string, answer: string): void {
    const target = faqId || index;
    this.contentService.updateFaq(this.selectedLang(), target, question, answer);
    this.showToast('✅ FAQ updated live!');
  }

  protected addFaq(): void {
    const q = this.newQuestion().trim();
    const a = this.newAnswer().trim();
    if (!q || !a) return;

    this.contentService.addFaq(this.selectedLang(), q, a);
    this.newQuestion.set('');
    this.newAnswer.set('');
    this.showToast('✅ New FAQ question added live!');
  }

  protected deleteFaq(faqId: string | undefined, index: number): void {
    if (confirm('Delete this FAQ item?')) {
      const target = faqId || index;
      this.contentService.deleteFaq(this.selectedLang(), target);
      this.showToast('🗑️ FAQ deleted live!');
    }
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
