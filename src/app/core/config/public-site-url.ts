import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

export function normalizePublicSiteUrl(value: string): string {
  const url = new URL(value);

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('PUBLIC_SITE_URL must use http or https.');
  }

  if (url.username || url.password || url.search || url.hash) {
    throw new Error(
      'PUBLIC_SITE_URL must not contain credentials, query parameters, or a fragment.',
    );
  }

  return `${url.origin}${url.pathname.replace(/\/+$/, '')}`;
}

export function joinPublicUrl(siteUrl: string, path: string): string {
  const normalizedSiteUrl = normalizePublicSiteUrl(siteUrl);
  const normalizedPath = path === '/' ? '' : path.replace(/^\/+|\/+$/g, '');
  return new URL(normalizedPath, `${normalizedSiteUrl}/`).toString();
}

function documentSiteUrl(): string {
  const document = inject(DOCUMENT);
  const baseUrl = document.baseURI;

  if (!baseUrl || baseUrl === 'null' || baseUrl === 'about:blank') {
    const envUrl = process.env['PUBLIC_SITE_URL'];
    if (envUrl && (envUrl.startsWith('http://') || envUrl.startsWith('https://'))) {
      return normalizePublicSiteUrl(envUrl);
    }
    return 'https://localhost';
  }

  try {
    return normalizePublicSiteUrl(baseUrl);
  } catch {
    const envUrl = process.env['PUBLIC_SITE_URL'];
    if (envUrl && (envUrl.startsWith('http://') || envUrl.startsWith('https://'))) {
      return normalizePublicSiteUrl(envUrl);
    }
    return 'https://localhost';
  }
}

export const PUBLIC_SITE_URL = new InjectionToken<string>('PUBLIC_SITE_URL', {
  providedIn: 'root',
  factory: documentSiteUrl,
});
