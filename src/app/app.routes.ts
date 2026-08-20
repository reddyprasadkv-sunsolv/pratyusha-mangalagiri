import { Routes } from '@angular/router';

import { PublicLayout } from './layout/public-layout/public-layout';

const publicPage = () =>
  import('./features/public-site/public-sales-page/public-sales-page').then(
    (component) => component.PublicSalesPage,
  );

const legalPage = () =>
  import('./features/legal/legal-placeholder-page/legal-placeholder-page').then(
    (component) => component.LegalPlaceholderPage,
  );

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then((adminRoutes) => adminRoutes.ADMIN_ROUTES),
  },
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: publicPage,
        data: { language: 'en' },
      },
      {
        path: 'te',
        pathMatch: 'full',
        loadComponent: publicPage,
        data: { language: 'te' },
      },
      {
        path: 'privacy-policy',
        loadComponent: legalPage,
        data: { language: 'en', policy: 'privacy-policy' },
      },
      {
        path: 'terms-and-conditions',
        loadComponent: legalPage,
        data: { language: 'en', policy: 'terms-and-conditions' },
      },
      {
        path: 'refund-cancellation-policy',
        loadComponent: legalPage,
        data: { language: 'en', policy: 'refund-cancellation-policy' },
      },
      {
        path: 'disclaimer',
        loadComponent: legalPage,
        data: { language: 'en', policy: 'disclaimer' },
      },
      {
        path: 'cookie-policy',
        loadComponent: legalPage,
        data: { language: 'en', policy: 'cookie-policy' },
      },
      {
        path: 'te/privacy-policy',
        loadComponent: legalPage,
        data: { language: 'te', policy: 'privacy-policy' },
      },
      {
        path: 'te/terms-and-conditions',
        loadComponent: legalPage,
        data: { language: 'te', policy: 'terms-and-conditions' },
      },
      {
        path: 'te/refund-cancellation-policy',
        loadComponent: legalPage,
        data: { language: 'te', policy: 'refund-cancellation-policy' },
      },
      {
        path: 'te/disclaimer',
        loadComponent: legalPage,
        data: { language: 'te', policy: 'disclaimer' },
      },
      {
        path: 'te/cookie-policy',
        loadComponent: legalPage,
        data: { language: 'te', policy: 'cookie-policy' },
      },
      {
        path: '**',
        loadComponent: () =>
          import('./features/not-found/not-found-page').then((component) => component.NotFoundPage),
      },
    ],
  },
];
