import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

import { FaqItem } from '../../../shared/models/public-site.models';
import { LocaleService } from '../../../core/i18n/locale.service';
import { PUBLIC_CONTENT } from './public-content.data';
import { ProductCopy, PublicPageCopy, SupportedLanguage } from './public-content.model';

const CONTENT_STORAGE_KEY = 'pratyusha_custom_content';

@Injectable({ providedIn: 'root' })
export class PublicContentService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly localeService = inject(LocaleService);
  private readonly overrides = signal<Record<string, Partial<PublicPageCopy>>>(this.loadSavedOverrides());

  readonly content = computed(() => {
    const lang = this.localeService.language();
    const base = PUBLIC_CONTENT[lang];
    const custom = this.overrides()[lang];
    return custom ? { ...base, ...custom } : base;
  });

  updateContent(lang: SupportedLanguage, updates: Partial<PublicPageCopy>): void {
    this.overrides.update((current) => {
      const updatedLang = { ...(current[lang] ?? {}), ...updates };
      const next = { ...current, [lang]: updatedLang };
      this.persistOverrides(next);
      return next;
    });
  }

  // --- Product CRUD ---
  updateProduct(lang: SupportedLanguage, updatedProduct: ProductCopy): void {
    const currentProducts = [...this.content().products];
    const index = currentProducts.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      currentProducts[index] = updatedProduct;
    } else {
      currentProducts.push(updatedProduct);
    }
    this.updateContent(lang, { products: currentProducts });
  }

  addProduct(lang: SupportedLanguage, newProduct: ProductCopy): void {
    const currentProducts = [...this.content().products, newProduct];
    this.updateContent(lang, { products: currentProducts });
  }

  deleteProduct(lang: SupportedLanguage, productId: string): void {
    const currentProducts = this.content().products.filter((p) => p.id !== productId);
    this.updateContent(lang, { products: currentProducts });
  }

  // --- FAQ CRUD ---
  updateFaq(lang: SupportedLanguage, indexOrId: number | string, question: string, answer: string): void {
    const currentFaqs = this.content().faqs.map((f, i) =>
      (f.id === indexOrId || String(i) === String(indexOrId)) ? { ...f, question, answer } : f,
    );
    this.updateContent(lang, { faqs: currentFaqs });
  }

  addFaq(lang: SupportedLanguage, question: string, answer: string): void {
    const newFaq: FaqItem = {
      id: `faq-${Date.now()}`,
      question,
      answer,
    };
    const currentFaqs = [...this.content().faqs, newFaq];
    this.updateContent(lang, { faqs: currentFaqs });
  }

  deleteFaq(lang: SupportedLanguage, indexOrId: number | string): void {
    const currentFaqs = this.content().faqs.filter((f, i) => f.id !== indexOrId && String(i) !== String(indexOrId));
    this.updateContent(lang, { faqs: currentFaqs });
  }

  // --- Reset to default data ---
  resetToDefaults(lang: SupportedLanguage): void {
    this.overrides.update((current) => {
      const next = { ...current };
      delete next[lang];
      this.persistOverrides(next);
      return next;
    });
  }

  private persistOverrides(data: Record<string, Partial<PublicPageCopy>>): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(data));
      } catch (err) {
        console.warn('Failed to save content overrides', err);
      }
    }
  }

  private loadSavedOverrides(): Record<string, Partial<PublicPageCopy>> {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const raw = localStorage.getItem(CONTENT_STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
      } catch {
        return {};
      }
    }
    return {};
  }
}
