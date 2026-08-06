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
  protected readonly newProductImageUrl = signal('');

  protected switchLang(lang: SupportedLanguage): void {
    this.selectedLang.set(lang);
  }

  protected updateProduct(prod: ProductCopy, field: keyof ProductCopy, value: string): void {
    const updated: ProductCopy = { ...prod, [field]: value };
    this.contentService.updateProduct(this.selectedLang(), updated);
    this.showToast('✅ Product updated live!');
  }

  protected onUploadProductPhoto(prod: ProductCopy, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          const updated: ProductCopy = {
            ...prod,
            imageUrl: dataUrl,
            imageSrcSet: `${dataUrl} 600w`,
          };
          this.contentService.updateProduct(this.selectedLang(), updated);
          this.showToast(`📸 Photo changed for ${prod.nameEn}`);
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  protected onUploadNewProductPhoto(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          this.newProductImageUrl.set(dataUrl);
          this.showToast('📸 New photo loaded for product creation');
        }
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  protected addProduct(): void {
    const name = this.newProductName().trim();
    if (!name) return;

    const lang = this.selectedLang();
    const photoUrl = this.newProductImageUrl() || 'assets/images/products/pyrite-bracelet-sq.webp';
    const newProd: ProductCopy = {
      id: `product-${Date.now()}` as any,
      nameEn: lang === 'en' ? name : 'New Product',
      nameTe: lang === 'te' ? name : 'కొత్త ఉత్పత్తి',
      supporting: this.newProductSupporting().trim() || 'Hand-crafted crystal bracelet',
      body: 'Energized ritual crystal bracelet for positive vibes.',
      points: ['Authentic certified gemstones', 'Personalized activation ritual'],
      cta: this.newProductCta().trim() || 'Enquire Now',
      imageUrl: photoUrl,
      imageSrcSet: `${photoUrl} 600w`,
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
    this.newProductImageUrl.set('');
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
