import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

import { FaqItem } from '../../../shared/models/public-site.models';
import { LocaleService } from '../../../core/i18n/locale.service';
import { PUBLIC_CONTENT } from './public-content.data';
import { ProductCopy, PublicPageCopy, SupportedLanguage } from './public-content.model';

const CONTENT_STORAGE_KEY = 'pratyusha_custom_content';
const MEDIA_STORAGE_KEY = 'pratyusha_custom_media';

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: string;
  updatedAt?: string;
}

const DEFAULT_MEDIA_ASSETS: MediaAsset[] = [
  { id: 'm1', name: 'Pratyusha Portrait', url: 'assets/images/people/client-traditional-saree.webp', type: 'Hero Portrait' },
  { id: 'm2', name: 'Pyrite Crystal Bracelet', url: 'assets/images/products/pyrite-bracelet.webp', type: 'Product Image' },
  { id: 'm3', name: 'Money Magnet Bracelet', url: 'assets/images/products/money-magnet-bracelet.webp', type: 'Product Image' },
  { id: 'm4', name: 'Evil Eye Protection', url: 'assets/images/products/evil-eye-protection-bracelet.webp', type: 'Product Image' },
  { id: 'm5', name: 'Success Combination', url: 'assets/images/products/success-bracelet.webp', type: 'Product Image' },
];

@Injectable({ providedIn: 'root' })
export class PublicContentService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly localeService = inject(LocaleService);

  private readonly overrides = signal<Record<string, Partial<PublicPageCopy>>>(this.loadSavedOverrides());
  readonly mediaAssets = signal<MediaAsset[]>(this.loadSavedMedia());

  readonly content = computed(() => {
    const lang = this.localeService.language();
    return this.getContentFor(lang);
  });

  getContentFor(lang: SupportedLanguage): PublicPageCopy {
    const base = PUBLIC_CONTENT[lang];
    const custom = this.overrides()[lang];
    if (!custom) return base;

    // Clean up stale overrides where Telugu key was saved with English default text
    const cleanedCustom = { ...custom };
    if (lang === 'te') {
      const enBase = PUBLIC_CONTENT['en'];
      for (const key of Object.keys(cleanedCustom) as (keyof PublicPageCopy)[]) {
        const val = cleanedCustom[key];
        if (typeof val === 'string' && val === (enBase as any)[key]) {
          delete cleanedCustom[key];
        }
      }
    }

    return { ...base, ...cleanedCustom };
  }

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
    const currentProducts = [...this.getContentFor(lang).products];
    const index = currentProducts.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      currentProducts[index] = updatedProduct;
    } else {
      currentProducts.push(updatedProduct);
    }
    this.updateContent(lang, { products: currentProducts });
  }

  addProduct(lang: SupportedLanguage, newProduct: ProductCopy): void {
    const currentProducts = [...this.getContentFor(lang).products, newProduct];
    this.updateContent(lang, { products: currentProducts });
  }

  deleteProduct(lang: SupportedLanguage, productId: string): void {
    const currentProducts = this.getContentFor(lang).products.filter((p) => p.id !== productId);
    this.updateContent(lang, { products: currentProducts });
  }

  // --- FAQ CRUD ---
  updateFaq(lang: SupportedLanguage, indexOrId: number | string, question: string, answer: string): void {
    const currentFaqs = this.getContentFor(lang).faqs.map((f, i) =>
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
    const currentFaqs = [...this.getContentFor(lang).faqs, newFaq];
    this.updateContent(lang, { faqs: currentFaqs });
  }

  deleteFaq(lang: SupportedLanguage, indexOrId: number | string): void {
    const currentFaqs = this.getContentFor(lang).faqs.filter((f, i) => f.id !== indexOrId && String(i) !== String(indexOrId));
    this.updateContent(lang, { faqs: currentFaqs });
  }

  // --- Media Asset Management ---
  addMediaAsset(asset: Omit<MediaAsset, 'id'>): MediaAsset {
    const newAsset: MediaAsset = {
      ...asset,
      id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      updatedAt: new Date().toISOString(),
    };
    this.mediaAssets.update((list) => {
      const next = [newAsset, ...list];
      this.persistMedia(next);
      return next;
    });
    return newAsset;
  }

  updateMediaAsset(id: string, updates: Partial<MediaAsset>): void {
    this.mediaAssets.update((list) => {
      const next = list.map((item) =>
        item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item,
      );
      this.persistMedia(next);
      return next;
    });
  }

  deleteMediaAsset(id: string): void {
    this.mediaAssets.update((list) => {
      const next = list.filter((item) => item.id !== id);
      this.persistMedia(next);
      return next;
    });
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

  private persistMedia(assets: MediaAsset[]): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(assets));
      } catch (err) {
        console.warn('Failed to save media assets', err);
      }
    }
  }

  private loadSavedMedia(): MediaAsset[] {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const raw = localStorage.getItem(MEDIA_STORAGE_KEY);
        return raw ? JSON.parse(raw) : DEFAULT_MEDIA_ASSETS;
      } catch {
        return DEFAULT_MEDIA_ASSETS;
      }
    }
    return DEFAULT_MEDIA_ASSETS;
  }
}

export function translateDesignationToTelugu(enText: string): string {
  if (!enText) return 'స్థాపకురాలు';
  const trimmed = enText.trim();
  const lower = trimmed.toLowerCase();

  const exactMap: Record<string, string> = {
    founder: 'స్థాపకురాలు',
    'co-founder': 'సహ-స్థాపకురాలు',
    cofounder: 'సహ-స్థాపకురాలు',
    'personal guidance': 'వ్యక్తిగత మార్గదర్శనం',
    'founder & crystal practitioner': 'స్థాపకురాలు & క్రిస్టల్ ప్రాక్టీషనర్',
    'founder & practitioner': 'స్థాపకురాలు & ప్రాక్టీషనర్',
    'founder & guide': 'స్థాపకురాలు & గైడ్',
    'founder & ceo': 'స్థాపకురాలు & సీఈఓ',
    ceo: 'సీఈఓ',
    director: 'డైరెక్టర్',
    practitioner: 'ప్రాక్టీషనర్',
  };

  if (exactMap[lower]) {
    return exactMap[lower];
  }

  let result = trimmed;
  result = result.replace(/\bfounder\b/gi, 'స్థాపకురాలు');
  result = result.replace(/\bco-founder\b/gi, 'సహ-స్థాపకురాలు');
  result = result.replace(/\bpersonal guidance\b/gi, 'వ్యక్తిగత మార్గదర్శనం');
  result = result.replace(/\bpractitioner\b/gi, 'ప్రాక్టీషనర్');
  result = result.replace(/\bceo\b/gi, 'సీఈఓ');
  result = result.replace(/\bdirector\b/gi, 'డైరెక్టర్');
  return result;
}

