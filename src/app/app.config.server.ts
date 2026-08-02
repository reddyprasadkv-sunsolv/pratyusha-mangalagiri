import { ApplicationConfig, inject, mergeApplicationConfig, REQUEST } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { normalizePublicSiteUrl, PUBLIC_SITE_URL } from './core/config/public-site-url';

function serverPublicSiteUrl(): string {
  const configuredUrl = process.env['PUBLIC_SITE_URL']?.trim();
  if (configuredUrl) {
    return normalizePublicSiteUrl(configuredUrl);
  }

  const request = inject(REQUEST, { optional: true });
  if (request) {
    return normalizePublicSiteUrl(new URL(request.url).origin);
  }

  throw new Error('Set PUBLIC_SITE_URL when rendering without an HTTP request.');
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    { provide: PUBLIC_SITE_URL, useFactory: serverPublicSiteUrl },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
