import { Route, Routes, UrlSegment } from '@angular/router';

export function publicHomeMatcher(
  segments: UrlSegment[],
): ReturnType<NonNullable<Route['matcher']>> {
  if (segments.length === 0) {
    return { consumed: [], posParams: { language: new UrlSegment('en', {}) } };
  }

  if (segments.length === 1 && segments[0].path === 'te') {
    return { consumed: segments, posParams: { language: segments[0] } };
  }

  return null;
}

const legalPaths = new Set([
  'privacy-policy',
  'terms-and-conditions',
  'refund-cancellation-policy',
  'disclaimer',
  'cookie-policy',
]);

export function publicLegalMatcher(
  segments: UrlSegment[],
): ReturnType<NonNullable<Route['matcher']>> {
  const isTelugu = segments[0]?.path === 'te';
  const policy = segments[isTelugu ? 1 : 0];
  const expectedLength = isTelugu ? 2 : 1;

  if (segments.length !== expectedLength || !policy || !legalPaths.has(policy.path)) {
    return null;
  }

  return {
    consumed: segments,
    posParams: {
      language: isTelugu ? segments[0] : new UrlSegment('en', {}),
      policy,
    },
  };
}

export const routes: Routes = [
  {
    matcher: publicHomeMatcher,
    loadComponent: () =>
      import('./features/public-site/public-sales-page/public-sales-page').then(
        (component) => component.PublicSalesPage,
      ),
    title: 'Pratyusha Mangalagiri — Clarity, Presence & Growth',
  },
  {
    matcher: publicLegalMatcher,
    loadComponent: () =>
      import('./features/legal/legal-placeholder-page/legal-placeholder-page').then(
        (component) => component.LegalPlaceholderPage,
      ),
    title: 'Pratyusha Mangalagiri — Legal information',
  },
];
