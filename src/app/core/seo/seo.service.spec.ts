import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { PUBLIC_CONTENT } from '../../features/public-site/content/public-content.data';
import { PUBLIC_SITE_URL } from '../config/public-site-url';
import { HOME_SEO_CONTENT } from './home-seo.data';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let document: Document;
  let service: SeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: PUBLIC_SITE_URL, useValue: 'https://example.com' }],
    });
    document = TestBed.inject(DOCUMENT);
    service = TestBed.inject(SeoService);
    document.head.querySelectorAll('[data-seo-managed="true"]').forEach((node) => node.remove());
  });

  it('sets the reviewed English title, description, canonical, language, and social metadata', () => {
    service.applyHomepage('en', PUBLIC_CONTENT.en.faqs);

    expect(document.title).toBe(HOME_SEO_CONTENT.title.en);
    expect(meta('description')).toBe(HOME_SEO_CONTENT.description.en);
    expect(link('canonical')?.href).toBe('https://example.com/');
    expect(document.documentElement.lang).toBe('en');
    expect(propertyMeta('og:locale')).toBe('en_IN');
    expect(propertyMeta('og:locale:alternate')).toBe('te_IN');
    expect(meta('twitter:card')).toBe('summary_large_image');
    expect(meta('twitter:title')).toBe(HOME_SEO_CONTENT.ogTitle.en);
  });

  it('sets the reviewed Telugu title, description, canonical, language, and social metadata', () => {
    service.applyHomepage('te', PUBLIC_CONTENT.te.faqs);

    expect(document.title).toBe(HOME_SEO_CONTENT.title.te);
    expect(meta('description')).toBe(HOME_SEO_CONTENT.description.te);
    expect(link('canonical')?.href).toBe('https://example.com/te');
    expect(document.documentElement.lang).toBe('te');
    expect(propertyMeta('og:locale')).toBe('te_IN');
    expect(propertyMeta('og:locale:alternate')).toBe('en_IN');
    expect(meta('twitter:description')).toBe(HOME_SEO_CONTENT.ogDescription.te);
  });

  it('adds reciprocal English, Telugu, and x-default hreflang links', () => {
    service.applyHomepage('en', PUBLIC_CONTENT.en.faqs);

    expect(hreflang('en')?.href).toBe('https://example.com/');
    expect(hreflang('te')?.href).toBe('https://example.com/te');
    expect(hreflang('x-default')?.href).toBe('https://example.com/');
  });

  it('replaces managed metadata without creating canonical or hreflang duplicates', () => {
    service.applyHomepage('en', PUBLIC_CONTENT.en.faqs);
    service.applyHomepage('te', PUBLIC_CONTENT.te.faqs);
    service.applyHomepage('en', PUBLIC_CONTENT.en.faqs);

    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('link[rel="alternate"][hreflang]')).toHaveLength(3);
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
  });

  it('emits valid WebSite, WebPage, and visible FAQ structured data only', () => {
    service.applyHomepage('en', PUBLIC_CONTENT.en.faqs);
    const schema = structuredData();
    const graph = schema['@graph'] as readonly Record<string, unknown>[];
    const faq = graph.find((entry) => entry['@type'] === 'FAQPage');
    const entities = faq?.['mainEntity'] as readonly Record<string, unknown>[];

    expect(graph.map((entry) => entry['@type'])).toEqual(['WebSite', 'WebPage', 'FAQPage']);
    expect(entities.map((entry) => entry['name'])).toEqual(
      PUBLIC_CONTENT.en.faqs.map((item) => item.question),
    );

    const serialized = JSON.stringify(schema).toLowerCase();
    expect(serialized).not.toContain('testimonial');
    expect(serialized).not.toContain('crystal healer');
    expect(serialized).not.toContain('price');
    expect(serialized).not.toContain('client input required');
    expect(serialized).not.toContain('abundance & wealth');
    expect(serialized).not.toContain('appointment');
    expect(serialized).not.toContain('pdf');
  });

  it('omits unapproved Open Graph and Twitter image tags', () => {
    service.applyHomepage('en', PUBLIC_CONTENT.en.faqs);

    expect(propertyMeta('og:image')).toBeNull();
    expect(meta('twitter:image')).toBeNull();
  });

  it('sets noindex and removes canonical, hreflang, and schema on a 404 page', () => {
    service.applyHomepage('en', PUBLIC_CONTENT.en.faqs);
    service.applyNotFound('en');

    expect(meta('robots')).toBe('noindex, nofollow');
    expect(link('canonical')).toBeNull();
    expect(document.head.querySelectorAll('link[rel="alternate"][hreflang]')).toHaveLength(0);
    expect(document.head.querySelector('script[type="application/ld+json"]')).toBeNull();
  });

  it('isolates admin noindex metadata and restores complete public metadata afterwards', () => {
    service.applyHomepage('en', PUBLIC_CONTENT.en.faqs);
    service.applyAdminPage('Administration Login');

    expect(meta('robots')).toBe('noindex, nofollow');
    expect(link('canonical')).toBeNull();
    expect(propertyMeta('og:title')).toBeNull();
    expect(document.head.querySelector('script[type="application/ld+json"]')).toBeNull();

    service.applyHomepage('te', PUBLIC_CONTENT.te.faqs);
    expect(meta('robots')).toBe('index, follow');
    expect(link('canonical')?.href).toBe('https://example.com/te');
    expect(propertyMeta('og:title')).toBe(HOME_SEO_CONTENT.ogTitle.te);
    expect(document.head.querySelector('script[type="application/ld+json"]')).not.toBeNull();
  });

  function meta(name: string): string | null {
    return document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)?.content ?? null;
  }

  function propertyMeta(property: string): string | null {
    return (
      document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)?.content ?? null
    );
  }

  function link(rel: string): HTMLLinkElement | null {
    return document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  }

  function hreflang(language: string): HTMLLinkElement | null {
    return document.head.querySelector<HTMLLinkElement>(
      `link[rel="alternate"][hreflang="${language}"]`,
    );
  }

  function structuredData(): Record<string, unknown> {
    const text = document.head.querySelector('script[type="application/ld+json"]')?.textContent;
    expect(text).toBeTruthy();
    return JSON.parse(text ?? '{}') as Record<string, unknown>;
  }
});
