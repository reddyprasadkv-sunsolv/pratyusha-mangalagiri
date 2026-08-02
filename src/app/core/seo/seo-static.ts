import { joinPublicUrl, normalizePublicSiteUrl } from '../config/public-site-url';

export const INDEXABLE_PUBLIC_ROUTES = ['/', '/te'] as const;

export const FUTURE_LEGAL_ROUTES = [
  '/privacy-policy',
  '/terms-and-conditions',
  '/refund-cancellation-policy',
  '/disclaimer',
  '/cookie-policy',
  '/te/privacy-policy',
  '/te/terms-and-conditions',
  '/te/refund-cancellation-policy',
  '/te/disclaimer',
  '/te/cookie-policy',
] as const;

export function generateSitemap(siteUrl: string): string {
  const normalizedSiteUrl = normalizePublicSiteUrl(siteUrl);
  const englishUrl = joinPublicUrl(normalizedSiteUrl, '/');
  const teluguUrl = joinPublicUrl(normalizedSiteUrl, '/te');

  const entry = (location: string) => `  <url>
    <loc>${escapeXml(location)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(englishUrl)}" />
    <xhtml:link rel="alternate" hreflang="te" href="${escapeXml(teluguUrl)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(englishUrl)}" />
  </url>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entry(englishUrl)}
${entry(teluguUrl)}
</urlset>
`;
}

export function generateRobots(siteUrl: string, indexingEnabled = true): string {
  const sitemapUrl = joinPublicUrl(siteUrl, '/sitemap.xml');
  const rules = indexingEnabled
    ? ['Allow: /', 'Disallow: /admin', 'Disallow: /preview', 'Disallow: /api/internal']
    : ['Disallow: /'];

  return `User-agent: *
${rules.join('\n')}

Sitemap: ${sitemapUrl}
`;
}

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}
