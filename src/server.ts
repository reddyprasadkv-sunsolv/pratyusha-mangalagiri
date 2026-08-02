import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

import { normalizePublicSiteUrl } from './app/core/config/public-site-url';
import { generateRobots, generateSitemap } from './app/core/seo/seo-static';

const browserDistFolder = join(import.meta.dirname, '../browser');

const environmentSiteUrl = process.env['PUBLIC_SITE_URL']?.trim();
const environmentAllowedHosts = (process.env['NG_ALLOWED_HOSTS'] ?? '')
  .split(',')
  .map((host) => host.trim())
  .filter(Boolean);
const allowedHosts = new Set(['localhost', '127.0.0.1', ...environmentAllowedHosts]);

if (environmentSiteUrl) {
  allowedHosts.add(new URL(normalizePublicSiteUrl(environmentSiteUrl)).hostname);
}

const indexingEnabled = process.env['PUBLIC_INDEXING_ENABLED']?.toLowerCase() !== 'false';

const app = express();
const angularApp = new AngularNodeAppEngine({ allowedHosts: [...allowedHosts] });

function requestPublicSiteUrl(request: express.Request): string {
  if (environmentSiteUrl) {
    return normalizePublicSiteUrl(environmentSiteUrl);
  }

  const hostname = request.hostname;
  const hostnameAllowed = [...allowedHosts].some(
    (allowedHost) =>
      allowedHost === hostname ||
      (allowedHost.startsWith('*.') && hostname.endsWith(allowedHost.slice(1))),
  );

  if (!hostnameAllowed) {
    throw new Error('Set PUBLIC_SITE_URL or add the hostname to NG_ALLOWED_HOSTS.');
  }

  return normalizePublicSiteUrl(`${request.protocol}://${request.get('host')}`);
}

app.get('/sitemap.xml', (req, res, next) => {
  try {
    res
      .type('application/xml')
      .set('Cache-Control', 'public, max-age=300')
      .send(generateSitemap(requestPublicSiteUrl(req)));
  } catch (error) {
    next(error);
  }
});

app.get('/robots.txt', (req, res, next) => {
  try {
    res
      .type('text/plain')
      .set('Cache-Control', 'public, max-age=300')
      .send(generateRobots(requestPublicSiteUrl(req), indexingEnabled));
  } catch (error) {
    next(error);
  }
});

app.use((_req, res, next) => {
  if (!indexingEnabled) {
    res.set('X-Robots-Tag', 'noindex, nofollow');
  }
  next();
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
