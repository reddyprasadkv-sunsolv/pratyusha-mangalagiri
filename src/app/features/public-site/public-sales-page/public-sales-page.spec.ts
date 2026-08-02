import { routes } from '../../../app.routes';
import { PUBLIC_CONTENT } from '../content/public-content.data';

describe('Public crystal sales page configuration', () => {
  it('contains reviewed English and Telugu homepage content', () => {
    expect(PUBLIC_CONTENT.en.heroTitle).toBe('Transform Your Energy.');
    expect(PUBLIC_CONTENT.te.heroTitle).toBe('మీ ఎనర్జీని మార్చుకోండి.');
    expect(PUBLIC_CONTENT.en.form.name).toBe('Full Name');
    expect(PUBLIC_CONTENT.te.form.name).toBe('పూర్తి పేరు');
  });

  it('publishes only the approved English and Telugu home routes', () => {
    const publicRoutes = routes.find((route) => route.path === '')?.children ?? [];

    expect(publicRoutes.map((route) => route.path)).toEqual(['', 'te', '**']);
    expect(publicRoutes[0].data?.['language']).toBe('en');
    expect(publicRoutes[1].data?.['language']).toBe('te');
    expect(publicRoutes.some((route) => route.path?.includes('privacy-policy'))).toBe(false);
  });

  it('publishes exactly the four approved products in the approved order', () => {
    expect(PUBLIC_CONTENT.en.products.map((product) => product.id)).toEqual([
      'success',
      'evil-eye',
      'money-magnet',
      'pyrite',
    ]);
    expect(PUBLIC_CONTENT.te.products).toHaveLength(4);
  });

  it('maps each approved product to its correct public image', () => {
    const [success, evilEye, moneyMagnet, pyrite] = PUBLIC_CONTENT.en.products;

    expect(success.imageUrl.endsWith('/success-bracelet.webp')).toBe(true);
    expect(evilEye.imageUrl.endsWith('/evil-eye-protection-bracelet.webp')).toBe(true);
    expect(moneyMagnet.imageUrl.endsWith('/money-magnet-bracelet.webp')).toBe(true);
    expect(pyrite.imageUrl.endsWith('/pyrite-bracelet.webp')).toBe(true);
    expect(pyrite.imageUrl).not.toContain('clusters');
  });

  it('keeps media fields configurable for later integration', () => {
    for (const product of PUBLIC_CONTENT.en.products) {
      expect(product.imageWidth).toBeGreaterThanOrEqual(650);
      expect(product.imageHeight).toBe(product.imageWidth);
      expect(product.imageFocalX).toBe(50);
      expect(product.imageFocalY).toBe(50);
      expect(product.imageStatus).toBe('approved');
      expect(product.imageSrcSet).toContain('640w');
    }
  });

  it('provides the required claim-neutral English and Telugu alt text', () => {
    expect(PUBLIC_CONTENT.en.products.map((product) => product.imageAltEn)).toEqual([
      'Multicoloured crystal Success Bracelet displayed in a hand',
      'Blue, black and white crystal Evil Eye Protection Bracelet displayed in a hand',
      'Mixed crystal Money Magnet Bracelet with yellow and dark beads',
      'Metallic gold-tone Pyrite Bracelet displayed in a hand',
    ]);
    expect(PUBLIC_CONTENT.te.products[0].imageAltTe).toBe(
      'చేతిలో చూపించిన వివిధ రంగుల క్రిస్టల్ సక్సెస్ బ్రేస్‌లెట్',
    );
  });

  it('does not expose future products, internal markers, testimonials, or credentials', () => {
    const serialized = JSON.stringify(PUBLIC_CONTENT).toLowerCase();

    expect(serialized).not.toContain('tiger’s eye');
    expect(serialized).not.toContain("tiger's eye");
    expect(serialized).not.toContain('pyrite clusters');
    expect(serialized).not.toContain('amethyst bracelet');
    expect(serialized).not.toContain('rose quartz bracelet');
    expect(serialized).not.toContain('orthoceras');
    expect(serialized).not.toContain('[client input required');
    expect(serialized).not.toContain('testimonial');
    expect(serialized).not.toContain('crystal healer');
  });

  it('uses the approved saree portrait and renders matched wellness disclaimers', () => {
    expect(PUBLIC_CONTENT.en.founderAlt).toContain('traditional pink saree');
    expect(PUBLIC_CONTENT.te.founderAlt).toContain('గులాబీ రంగు చీరలో');
    expect(PUBLIC_CONTENT.en.disclaimerBody).toContain('not medical treatments');
    expect(PUBLIC_CONTENT.te.disclaimerBody).toContain('వైద్య చికిత్సలు కావు');
  });

  it('offers only approved products and safe guidance choices in the form', () => {
    expect(PUBLIC_CONTENT.en.form.requirementOptions.map(([value]) => value)).toEqual([
      'success',
      'evil-eye',
      'money-magnet',
      'pyrite',
      'guidance',
      'ritual',
    ]);
  });

  it('exposes no appointment, payment, backend submission, or PDF functionality', () => {
    const serialized = JSON.stringify(PUBLIC_CONTENT).toLowerCase();

    expect(serialized).not.toContain('appointment booking');
    expect(serialized).not.toContain('payment gateway');
    expect(serialized).not.toContain('pdf download');
    expect(PUBLIC_CONTENT.en.form.developmentNotice).toContain('not sent or stored');
  });
});
