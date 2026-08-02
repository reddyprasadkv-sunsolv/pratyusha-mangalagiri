import { FaqItem, NavigationItem } from '../../../shared/models/public-site.models';

export type SupportedLanguage = 'en' | 'te';

export interface NumberedContent {
  readonly number: string;
  readonly title: string;
  readonly text: string;
}

export interface SectionCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly supporting: string;
  readonly body: string;
  readonly bullets: readonly string[];
}

export interface ProductMedia {
  readonly imageUrl: string;
  readonly imageSrcSet: string;
  readonly imageAltEn: string;
  readonly imageAltTe: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
  readonly imageFocalX: number;
  readonly imageFocalY: number;
  readonly imageStatus: 'approved';
}

export interface ProductCopy extends ProductMedia {
  readonly id: 'success' | 'evil-eye' | 'money-magnet' | 'pyrite';
  readonly nameEn: string;
  readonly nameTe: string;
  readonly supporting: string;
  readonly body: string;
  readonly points: readonly string[];
  readonly cta: string;
}

export interface EnquiryFormCopy {
  readonly heading: string;
  readonly name: string;
  readonly namePlaceholder: string;
  readonly mobile: string;
  readonly mobilePlaceholder: string;
  readonly email: string;
  readonly emailPlaceholder: string;
  readonly city: string;
  readonly cityPlaceholder: string;
  readonly requirement: string;
  readonly requirementPlaceholder: string;
  readonly requirementOptions: readonly (readonly [string, string])[];
  readonly message: string;
  readonly messagePlaceholder: string;
  readonly consent: string;
  readonly submit: string;
  readonly optional: string;
  readonly privacy: string;
  readonly required: string;
  readonly mobileInvalid: string;
  readonly emailInvalid: string;
  readonly maxLength: string;
  readonly developmentNotice: string;
}

export interface PublicPageCopy {
  readonly locale: SupportedLanguage;
  readonly brandTagline: string;
  readonly announcement: string;
  readonly announcementCta: string;
  readonly announcementClose: string;
  readonly navLabel: string;
  readonly mobileNavLabel: string;
  readonly nav: readonly NavigationItem[];
  readonly headerCta: string;
  readonly openMenu: string;
  readonly closeMenu: string;
  readonly mobileNote: string;
  readonly languageLabel: string;
  readonly englishSwitchLabel: string;
  readonly teluguSwitchLabel: string;
  readonly studioLabel: string;
  readonly heroTitle: string;
  readonly heroEmphasis: string;
  readonly heroSupporting: string;
  readonly heroBody: string;
  readonly heroPrimary: string;
  readonly heroSecondary: string;
  readonly differentiatorTitle: string;
  readonly differentiatorSupporting: string;
  readonly differentiatorBody: string;
  readonly differentiators: readonly string[];
  readonly challenge: SectionCopy;
  readonly support: SectionCopy;
  readonly collection: SectionCopy;
  readonly products: readonly ProductCopy[];
  readonly ritual: SectionCopy;
  readonly ritualNote: string;
  readonly audience: SectionCopy;
  readonly experienceDifference: SectionCopy;
  readonly processEyebrow: string;
  readonly processTitle: string;
  readonly processSupporting: string;
  readonly process: readonly NumberedContent[];
  readonly aboutEyebrow: string;
  readonly aboutTitle: string;
  readonly aboutSupporting: string;
  readonly aboutBody: string;
  readonly aboutBadge: string;
  readonly founderAlt: string;
  readonly faqEyebrow: string;
  readonly faqTitle: string;
  readonly faqSupporting: string;
  readonly faqPrompt: string;
  readonly faqLink: string;
  readonly faqs: readonly FaqItem[];
  readonly disclaimerTitle: string;
  readonly disclaimerBody: string;
  readonly conversionEyebrow: string;
  readonly conversionTitle: string;
  readonly conversionBody: string;
  readonly conversionCta: string;
  readonly contactEyebrow: string;
  readonly contactTitle: string;
  readonly contactSupporting: string;
  readonly contactBody: string;
  readonly contactNote: string;
  readonly form: EnquiryFormCopy;
  readonly imageFallback: string;
  readonly footerStatement: string;
  readonly footerNavigation: string;
  readonly footerLegal: string;
  readonly footerRights: string;
  readonly backToTop: string;
  readonly skipLink: string;
  readonly cookieTitle: string;
  readonly cookieBody: string;
  readonly cookieAccept: string;
  readonly cookieSettings: string;
}
