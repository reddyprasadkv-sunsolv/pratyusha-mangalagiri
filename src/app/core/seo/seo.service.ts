import { DOCUMENT } from '@angular/common';
import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { FaqItem } from '../../shared/models/public-site.models';
import { PUBLIC_SITE_URL, joinPublicUrl } from '../config/public-site-url';
import { HOME_SEO_CONTENT, SEO_SITE_NAME } from './home-seo.data';
import { SeoPageConfiguration } from './seo.model';

const MANAGED_ATTRIBUTE = 'data-seo-managed';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly siteUrl = inject(PUBLIC_SITE_URL);
  private readonly renderer: Renderer2 = inject(RendererFactory2).createRenderer(null, null);

  applyHomepage(language: 'en' | 'te', faqs: readonly FaqItem[]): void {
    const alternatePaths = {
      en: HOME_SEO_CONTENT.canonicalPath.en,
      te: HOME_SEO_CONTENT.canonicalPath.te,
      'x-default': HOME_SEO_CONTENT.canonicalPath.en,
    } as const;

    this.apply({
      language,
      title: HOME_SEO_CONTENT.title[language],
      description: HOME_SEO_CONTENT.description[language],
      canonicalPath: HOME_SEO_CONTENT.canonicalPath[language],
      robots:
        HOME_SEO_CONTENT.isIndexable && HOME_SEO_CONTENT.isPublished
          ? HOME_SEO_CONTENT.robots
          : 'noindex, nofollow',
      ogTitle: HOME_SEO_CONTENT.ogTitle[language],
      ogDescription: HOME_SEO_CONTENT.ogDescription[language],
      ogImageUrl: HOME_SEO_CONTENT.ogImageUrl,
      ogImageAlt: HOME_SEO_CONTENT.ogImageAlt[language],
      alternatePaths,
      faqs,
    });
  }

  applyNotFound(language: 'en' | 'te'): void {
    const isTelugu = language === 'te';
    this.apply({
      language,
      title: isTelugu ? 'పేజీ కనబడలేదు | Pratyusha' : 'Page Not Found | Pratyusha',
      description: isTelugu
        ? 'మీరు వెతుకుతున్న పేజీ కనబడలేదు. Pratyusha క్రిస్టల్ బ్రేస్‌లెట్ హోమ్ పేజీకి తిరిగి వెళ్లండి.'
        : 'The page you requested could not be found. Return to the Pratyusha crystal bracelet homepage.',
      canonicalPath: null,
      robots: 'noindex, nofollow',
      ogTitle: isTelugu ? 'పేజీ కనబడలేదు' : 'Page Not Found',
      ogDescription: isTelugu
        ? 'మీరు వెతుకుతున్న పేజీ కనబడలేదు.'
        : 'The page you requested could not be found.',
      ogImageUrl: null,
      ogImageAlt: '',
      alternatePaths: null,
      faqs: [],
    });
  }

  applyAdminPage(pageTitle: string): void {
    this.removeManagedElements();
    this.title.setTitle(`${pageTitle} | Pratyusha Administration`);
    this.document.documentElement.lang = 'en';
    this.addNamedMeta(
      'description',
      'Secure administration access for authorised Pratyusha content administrators.',
    );
    this.addNamedMeta('robots', 'noindex, nofollow');
  }

  private apply(configuration: SeoPageConfiguration): void {
    this.removeManagedElements();
    this.title.setTitle(configuration.title);
    this.document.documentElement.lang = configuration.language;

    this.addNamedMeta('description', configuration.description);
    this.addNamedMeta('robots', configuration.robots);

    const canonicalUrl = configuration.canonicalPath
      ? joinPublicUrl(this.siteUrl, configuration.canonicalPath)
      : null;

    if (canonicalUrl) {
      this.addLink('canonical', canonicalUrl);
    }

    if (configuration.alternatePaths) {
      for (const [language, path] of Object.entries(configuration.alternatePaths)) {
        this.addLink('alternate', joinPublicUrl(this.siteUrl, path), language);
      }
    }

    this.addPropertyMeta('og:type', 'website');
    this.addPropertyMeta('og:title', configuration.ogTitle);
    this.addPropertyMeta('og:description', configuration.ogDescription);
    this.addPropertyMeta('og:site_name', SEO_SITE_NAME);
    this.addPropertyMeta('og:locale', configuration.language === 'te' ? 'te_IN' : 'en_IN');
    this.addPropertyMeta(
      'og:locale:alternate',
      configuration.language === 'te' ? 'en_IN' : 'te_IN',
    );

    if (canonicalUrl) {
      this.addPropertyMeta('og:url', canonicalUrl);
    }

    const absoluteImageUrl = configuration.ogImageUrl
      ? joinPublicUrl(this.siteUrl, configuration.ogImageUrl)
      : null;

    if (absoluteImageUrl) {
      this.addPropertyMeta('og:image', absoluteImageUrl);
      this.addPropertyMeta('og:image:alt', configuration.ogImageAlt);
    }

    this.addNamedMeta('twitter:card', 'summary_large_image');
    this.addNamedMeta('twitter:title', configuration.ogTitle);
    this.addNamedMeta('twitter:description', configuration.ogDescription);

    if (absoluteImageUrl) {
      this.addNamedMeta('twitter:image', absoluteImageUrl);
      this.addNamedMeta('twitter:image:alt', configuration.ogImageAlt);
    }

    if (canonicalUrl) {
      this.addStructuredData(
        this.homeStructuredData(configuration, canonicalUrl, configuration.faqs),
      );
    }
  }

  private homeStructuredData(
    configuration: SeoPageConfiguration,
    canonicalUrl: string,
    faqs: readonly FaqItem[],
  ): Readonly<Record<string, unknown>> {
    const websiteUrl = joinPublicUrl(this.siteUrl, '/');
    const graph: Record<string, unknown>[] = [
      {
        '@type': 'WebSite',
        '@id': `${websiteUrl}#website`,
        url: websiteUrl,
        name: SEO_SITE_NAME,
        inLanguage: ['en', 'te'],
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: configuration.title,
        description: configuration.description,
        inLanguage: configuration.language,
        isPartOf: { '@id': `${websiteUrl}#website` },
      },
    ];

    if (faqs.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      });
    }

    return { '@context': 'https://schema.org', '@graph': graph };
  }

  private addNamedMeta(name: string, content: string): void {
    this.meta.addTag({ name, content, [MANAGED_ATTRIBUTE]: 'true' });
  }

  private addPropertyMeta(property: string, content: string): void {
    this.meta.addTag({ property, content, [MANAGED_ATTRIBUTE]: 'true' });
  }

  private addLink(rel: string, href: string, hreflang?: string): void {
    const link = this.renderer.createElement('link') as HTMLLinkElement;
    this.renderer.setAttribute(link, 'rel', rel);
    this.renderer.setAttribute(link, 'href', href);
    this.renderer.setAttribute(link, MANAGED_ATTRIBUTE, 'true');
    if (hreflang) {
      this.renderer.setAttribute(link, 'hreflang', hreflang);
    }
    this.renderer.appendChild(this.document.head, link);
  }

  private addStructuredData(data: Readonly<Record<string, unknown>>): void {
    const script = this.renderer.createElement('script') as HTMLScriptElement;
    this.renderer.setAttribute(script, 'type', 'application/ld+json');
    this.renderer.setAttribute(script, MANAGED_ATTRIBUTE, 'true');
    this.renderer.appendChild(script, this.renderer.createText(JSON.stringify(data)));
    this.renderer.appendChild(this.document.head, script);
  }

  private removeManagedElements(): void {
    const managedElements = this.document.head.querySelectorAll(`[${MANAGED_ATTRIBUTE}="true"]`);
    for (const element of Array.from(managedElements)) {
      this.renderer.removeChild(this.document.head, element);
    }
  }
}
