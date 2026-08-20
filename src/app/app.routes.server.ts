import { RenderMode, ServerRoute } from '@angular/ssr';

const isGitHubPagesBuild = process.env['GITHUB_PAGES'] === 'true';
const publicRoutes: ServerRoute[] = isGitHubPagesBuild
  ? [
      { path: '', renderMode: RenderMode.Prerender },
      { path: 'te', renderMode: RenderMode.Prerender },
      { path: 'privacy-policy', renderMode: RenderMode.Prerender },
      { path: 'terms-and-conditions', renderMode: RenderMode.Prerender },
      { path: 'refund-cancellation-policy', renderMode: RenderMode.Prerender },
      { path: 'disclaimer', renderMode: RenderMode.Prerender },
      { path: 'cookie-policy', renderMode: RenderMode.Prerender },
      { path: 'te/privacy-policy', renderMode: RenderMode.Prerender },
      { path: 'te/terms-and-conditions', renderMode: RenderMode.Prerender },
      { path: 'te/refund-cancellation-policy', renderMode: RenderMode.Prerender },
      { path: 'te/disclaimer', renderMode: RenderMode.Prerender },
      { path: 'te/cookie-policy', renderMode: RenderMode.Prerender },
    ]
  : [
      { path: '', renderMode: RenderMode.Server },
      { path: 'te', renderMode: RenderMode.Server },
      { path: 'privacy-policy', renderMode: RenderMode.Server },
      { path: 'terms-and-conditions', renderMode: RenderMode.Server },
      { path: 'refund-cancellation-policy', renderMode: RenderMode.Server },
      { path: 'disclaimer', renderMode: RenderMode.Server },
      { path: 'cookie-policy', renderMode: RenderMode.Server },
      { path: 'te/privacy-policy', renderMode: RenderMode.Server },
      { path: 'te/terms-and-conditions', renderMode: RenderMode.Server },
      { path: 'te/refund-cancellation-policy', renderMode: RenderMode.Server },
      { path: 'te/disclaimer', renderMode: RenderMode.Server },
      { path: 'te/cookie-policy', renderMode: RenderMode.Server },
    ];
const fallbackRoute: ServerRoute = isGitHubPagesBuild
  ? {
      path: '**',
      renderMode: RenderMode.Client,
    }
  : {
      path: '**',
      renderMode: RenderMode.Server,
      status: 404,
      headers: { 'X-Robots-Tag': 'noindex, nofollow' },
    };

export const serverRoutes: ServerRoute[] = [
  {
    path: 'admin',
    renderMode: RenderMode.Client,
    headers: { 'X-Robots-Tag': 'noindex, nofollow' },
  },
  {
    path: 'admin/**',
    renderMode: RenderMode.Client,
    headers: { 'X-Robots-Tag': 'noindex, nofollow' },
  },
  ...publicRoutes,
  fallbackRoute,
];
