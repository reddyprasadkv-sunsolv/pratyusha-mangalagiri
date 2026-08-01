import { FaqItem, NavigationItem } from '../../../shared/models/public-site.models';

export type SupportedLanguage = 'en' | 'te';

export interface BilingualText {
  readonly en: string;
  readonly te: string;
}

export interface NumberedContent {
  readonly number: string;
  readonly title: string;
  readonly text: string;
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
  readonly heroLine1: string;
  readonly heroEmphasis1: string;
  readonly heroLine2: string;
  readonly heroEmphasis2: string;
  readonly heroLede: string;
  readonly heroPrimary: string;
  readonly heroSecondary: string;
  readonly heroAlt: string;
  readonly heroNoteTitle: string;
  readonly heroNote: string;
  readonly trustLabel: string;
  readonly trustItems: readonly NumberedContent[];
  readonly problemEyebrow: string;
  readonly problemTitle: string;
  readonly problemEmphasis: string;
  readonly problemIntro: string;
  readonly problems: readonly string[];
  readonly problemBridge: string;
  readonly problemBridgeStrong: string;
  readonly solutionEyebrow: string;
  readonly solutionTitle: string;
  readonly solutionEmphasis: string;
  readonly solutionBody: string;
  readonly solutionQuote: string;
  readonly servicesEyebrow: string;
  readonly servicesTitle: string;
  readonly servicesEmphasis: string;
  readonly servicesIntro: string;
  readonly services: readonly NumberedContent[];
  readonly benefitEyebrow: string;
  readonly benefitTitle: string;
  readonly benefitEmphasis: string;
  readonly benefitIntro: string;
  readonly benefits: readonly NumberedContent[];
  readonly processEyebrow: string;
  readonly processTitle: string;
  readonly processEmphasis: string;
  readonly process: readonly NumberedContent[];
  readonly aboutEyebrow: string;
  readonly aboutTitle: string;
  readonly aboutEmphasis: string;
  readonly aboutBody1: string;
  readonly aboutBody2: string;
  readonly aboutValues: readonly string[];
  readonly aboutBadge: string;
  readonly testimonialsEyebrow: string;
  readonly testimonialsTitle: string;
  readonly testimonialsEmphasis: string;
  readonly testimonialsPending: string;
  readonly faqEyebrow: string;
  readonly faqTitle: string;
  readonly faqEmphasis: string;
  readonly faqPrompt: string;
  readonly faqLink: string;
  readonly faqs: readonly FaqItem[];
  readonly conversionEyebrow: string;
  readonly conversionTitle: string;
  readonly conversionEmphasis: string;
  readonly conversionBody: string;
  readonly conversionCta: string;
  readonly contactEyebrow: string;
  readonly contactTitle: string;
  readonly contactEmphasis: string;
  readonly contactBody: string;
  readonly locationLabel: string;
  readonly location: string;
  readonly contactNote: string;
  readonly form: EnquiryFormCopy;
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
