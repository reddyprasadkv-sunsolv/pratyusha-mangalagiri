import { FUTURE_LEGAL_ROUTES, generateRobots, generateSitemap } from './seo-static';

describe('static SEO endpoints', () => {
  it('publishes only the two approved public routes with reciprocal hreflang', () => {
    const sitemap = generateSitemap('https://example.com');

    expect(sitemap.match(/<url>/g)).toHaveLength(2);
    expect(sitemap).toContain('<loc>https://example.com/</loc>');
    expect(sitemap).toContain('<loc>https://example.com/te</loc>');
    expect(sitemap).toContain('hreflang="en"');
    expect(sitemap).toContain('hreflang="te"');
    expect(sitemap).toContain('hreflang="x-default"');
    expect(sitemap).not.toContain('/admin');
    FUTURE_LEGAL_ROUTES.forEach((route) => expect(sitemap).not.toContain(route));
  });

  it('allows public rendering, does not block Telugu, and references the sitemap', () => {
    const robots = generateRobots('https://example.com', true);

    expect(robots).toContain('Allow: /');
    expect(robots).not.toContain('Disallow: /te');
    expect(robots).toContain('Disallow: /admin');
    expect(robots).toContain('Sitemap: https://example.com/sitemap.xml');
  });

  it('supports an environment-wide preview noindex policy', () => {
    expect(generateRobots('https://preview.example.com', false)).toContain('Disallow: /');
  });
});
