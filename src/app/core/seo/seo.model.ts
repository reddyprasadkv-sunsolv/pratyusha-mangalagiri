import { SupportedLanguage } from '../../features/public-site/content/public-content.model';

export interface BilingualSeoText {
  readonly en: string;
  readonly te: string;
}

export interface BilingualSeoContent {
  readonly title: BilingualSeoText;
  readonly description: BilingualSeoText;
  readonly ogTitle: BilingualSeoText;
  readonly ogDescription: BilingualSeoText;
  readonly ogImageUrl: string | null;
  readonly ogImageAlt: BilingualSeoText;
  readonly canonicalPath: BilingualSeoText;
  readonly robots: string;
  readonly isIndexable: boolean;
  readonly isPublished: boolean;
  readonly approvalStatus: 'CLIENT REVIEW DRAFT';
}

export interface SupabaseSeoFields {
  readonly meta_title_en: string;
  readonly meta_title_te: string;
  readonly meta_description_en: string;
  readonly meta_description_te: string;
  readonly og_title_en: string;
  readonly og_title_te: string;
  readonly og_description_en: string;
  readonly og_description_te: string;
  readonly og_image_url: string | null;
  readonly og_image_alt_en: string;
  readonly og_image_alt_te: string;
  readonly canonical_path_en: string;
  readonly canonical_path_te: string;
  readonly robots_directive: string;
  readonly is_indexable: boolean;
  readonly is_published: boolean;
}

export interface SeoFaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface SeoPageConfiguration {
  readonly language: SupportedLanguage;
  readonly title: string;
  readonly description: string;
  readonly canonicalPath: string | null;
  readonly robots: string;
  readonly ogTitle: string;
  readonly ogDescription: string;
  readonly ogImageUrl: string | null;
  readonly ogImageAlt: string;
  readonly alternatePaths: Readonly<Record<'en' | 'te' | 'x-default', string>> | null;
  readonly faqs: readonly SeoFaqItem[];
}
