import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LocaleService } from '../../../../core/i18n/locale.service';
import { ProductCopy, SupportedLanguage } from '../../../public-site/content/public-content.model';
import { PublicContentService } from '../../../public-site/content/public-content.service';

@Component({
  selector: 'app-admin-content-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-content-page.html',
  styleUrl: './admin-content-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminContentPage {
  private readonly contentService = inject(PublicContentService);
  private readonly localeService = inject(LocaleService);
  protected readonly selectedLang = signal<SupportedLanguage>('en');
  protected readonly savedNotice = signal<string | null>(null);

  protected readonly heroTitle = signal('');
  protected readonly heroEmphasis = signal('');
  protected readonly heroSupporting = signal('');
  protected readonly heroBody = signal('');
  protected readonly studioLabel = signal('');

  protected readonly activeTab = signal<'hero' | 'products' | 'faqs'>('hero');

  // Products
  protected readonly products = computed(() => this.contentService.getContentFor(this.selectedLang()).products);
  protected readonly newProductName = signal('');
  protected readonly newProductSupporting = signal('');
  protected readonly newProductCta = signal('');

  // FAQs
  protected readonly faqs = computed(() => this.contentService.getContentFor(this.selectedLang()).faqs);
  protected readonly newFaqQuestion = signal('');
  protected readonly newFaqAnswer = signal('');

  constructor() {
    this.loadCurrentContent();
  }

  protected switchLang(lang: SupportedLanguage): void {
    this.selectedLang.set(lang);
    this.localeService.setLocale(lang);
    this.loadCurrentContent();
  }

  protected saveHeroChanges(): void {
    const lang = this.selectedLang();
    this.contentService.updateContent(lang, {
      heroTitle: this.heroTitle(),
      heroEmphasis: this.heroEmphasis(),
      heroSupporting: this.heroSupporting(),
      heroBody: this.heroBody(),
      studioLabel: this.studioLabel(),
    });

    this.showToast('✅ Hero copy updated successfully live!');
  }

  // --- Product Management ---
  protected updateProductField(prod: ProductCopy, field: 'nameEn' | 'nameTe' | 'supporting' | 'cta', value: string): void {
    const lang = this.selectedLang();
    const updated: ProductCopy = {
      ...prod,
      [field]: value,
    };
    this.contentService.updateProduct(lang, updated);
    this.showToast('✅ Product updated live!');
  }

  protected addProduct(): void {
    const name = this.newProductName().trim();
    if (!name) return;

    const lang = this.selectedLang();
    const idStr = `custom-product-${Date.now()}`;
    const newProd: ProductCopy = {
      id: idStr as any,
      nameEn: lang === 'en' ? name : 'New Product',
      nameTe: lang === 'te' ? name : 'కొత్త ఉత్పత్తి',
      supporting: this.newProductSupporting().trim() || 'Custom gemstone bracelet',
      body: 'Hand-crafted ritual bracelet.',
      points: ['Authentic certified crystals', 'Energized before dispatch'],
      cta: this.newProductCta().trim() || 'Enquire Now',
      imageUrl: 'assets/images/products/pyrite-bracelet-sq.webp',
      imageSrcSet: 'assets/images/products/pyrite-bracelet-sq.webp 600w',
      imageAltEn: name,
      imageAltTe: name,
      imageWidth: 600,
      imageHeight: 600,
      imageFocalX: 50,
      imageFocalY: 50,
      imageStatus: 'approved',
    };

    this.contentService.addProduct(lang, newProd);
    this.newProductName.set('');
    this.newProductSupporting.set('');
    this.newProductCta.set('');
    this.showToast('✅ New product added to catalog live!');
  }

  protected deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product from the public site?')) {
      this.contentService.deleteProduct(this.selectedLang(), productId);
      this.showToast('🗑️ Product deleted from live site!');
    }
  }

  // --- FAQ Management ---
  protected updateFaqItem(faqId: string | undefined, index: number, question: string, answer: string): void {
    const target = faqId || index;
    this.contentService.updateFaq(this.selectedLang(), target, question, answer);
    this.showToast('✅ FAQ updated live!');
  }

  protected addFaqItem(): void {
    const q = this.newFaqQuestion().trim();
    const a = this.newFaqAnswer().trim();
    if (!q || !a) return;

    this.contentService.addFaq(this.selectedLang(), q, a);
    this.newFaqQuestion.set('');
    this.newFaqAnswer.set('');
    this.showToast('✅ New FAQ added live!');
  }

  protected deleteFaqItem(faqId: string | undefined, index: number): void {
    if (confirm('Are you sure you want to delete this FAQ question?')) {
      const target = faqId || index;
      this.contentService.deleteFaq(this.selectedLang(), target);
      this.showToast('🗑️ FAQ deleted live!');
    }
  }

  protected resetDefaults(): void {
    if (confirm('Reset all overrides for this language back to default copy?')) {
      this.contentService.resetToDefaults(this.selectedLang());
      this.loadCurrentContent();
      this.showToast('🔄 Content reset to default copy!');
    }
  }

  private showToast(msg: string): void {
    this.savedNotice.set(msg);
    setTimeout(() => this.savedNotice.set(null), 3500);
  }

  private loadCurrentContent(): void {
    const current = this.contentService.getContentFor(this.selectedLang());
    this.heroTitle.set(current.heroTitle);
    this.heroEmphasis.set(current.heroEmphasis);
    this.heroSupporting.set(current.heroSupporting);
    this.heroBody.set(current.heroBody);
    this.studioLabel.set(current.studioLabel);
  }
}
