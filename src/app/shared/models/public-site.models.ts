export type Locale = 'en' | 'te';

export interface NavigationItem {
  readonly label: string;
  readonly href: string;
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface FooterLinkGroup {
  readonly heading: string;
  readonly links: readonly NavigationItem[];
}
