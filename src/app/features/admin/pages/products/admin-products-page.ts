import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProductCopy, SupportedLanguage } from '../../../public-site/content/public-content.model';
import { PublicContentService } from '../../../public-site/content/public-content.service';

@Component({
  selector: 'app-admin-products-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-products-page.html',
  styleUrl: './admin-products-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProductsPage {
  private readonly contentService = inject(PublicContentService);
  protected readonly selectedLang = signal<SupportedLanguage>('en');
  protected readonly toastMessage = signal<string | null>(null);

  protected readonly products = computed(() => this.contentService.content().products);
  protected readonly newProductName = signal('');
  protected readonly newProductSupporting = signal('');
  protected readonly newProductCta = signal('');

  protected switchLang(lang: SupportedLanguage): void {
    this.selectedLang.set(lang);
  }

  protected updateProduct(prod: ProductCopy, field: 'nameEn' | 'nameTe' | 'supporting' | 'cta', value: string): void {
    const updated: ProductCopy = { ...prod, [field]: value };
    this.contentService.updateProduct(this.selectedLang(), updated);
    this.showToast('✅ Product updated live!');
  }

  protected addProduct(): void {
    const name = this.newProductName().trim();
    if (!name) return;

    const lang = this.selectedLang();
    const newProd: ProductCopy = {
      id: `product-${Date.now()}` as any,
      nameEn: lang === 'en' ? name : 'New Product',
      nameTe: lang === 'te' ? name : 'కొత్త ఉత్పత్తి',
      supporting: this.newProductSupporting().trim() || 'Hand-crafted crystal bracelet',
      body: 'Energized ritual crystal bracelet for positive vibes.',
      points: ['Authentic certified gemstones', 'Personalized activation ritual'],
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
    this.showToast('✅ Product added to live catalog!');
  }

  protected deleteProduct(id: string): void {
    if (confirm('Delete this product from the live catalog?')) {
      this.contentService.deleteProduct(this.selectedLang(), id);
      this.showToast('🗑️ Product deleted live!');
    }
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
