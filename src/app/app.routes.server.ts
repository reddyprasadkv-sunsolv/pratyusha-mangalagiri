import { RenderMode, ServerRoute } from '@angular/ssr';

const isGitHubPagesBuild = process.env['GITHUB_PAGES'] === 'true';
const publicRoutes: ServerRoute[] = isGitHubPagesBuild
  ? [
      { path: '', renderMode: RenderMode.Prerender },
      { path: 'te', renderMode: RenderMode.Prerender },
    ]
  : [
      { path: '', renderMode: RenderMode.Server },
      { path: 'te', renderMode: RenderMode.Server },
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
