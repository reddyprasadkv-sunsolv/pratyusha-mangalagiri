import { Routes } from '@angular/router';

import {
  activeAdminGuard,
  adminAuthGuard,
  adminLoginRedirectGuard,
  adminNoindexGuard,
  editorOrOwnerGuard,
} from './guards/admin.guards';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'login',
    canActivate: [adminNoindexGuard, adminLoginRedirectGuard],
    data: { title: 'Administration Login' },
    loadComponent: () =>
      import('./pages/login/admin-login-page').then((component) => component.AdminLoginPage),
  },
  {
    path: '',
    canActivate: [adminNoindexGuard, adminAuthGuard, activeAdminGuard, editorOrOwnerGuard],
    data: { title: 'Administration' },
    loadComponent: () =>
      import('./layout/admin-shell/admin-shell').then((component) => component.AdminShell),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        canActivate: [adminNoindexGuard],
        data: { title: 'Dashboard' },
        loadComponent: () =>
          import('./pages/dashboard/admin-dashboard-page').then(
            (component) => component.AdminDashboardPage,
          ),
      },
      {
        path: 'leads',
        canActivate: [adminNoindexGuard],
        data: { title: 'Enquiries & Leads CRM' },
        loadComponent: () =>
          import('./pages/leads/admin-leads-page').then(
            (component) => component.AdminLeadsPage,
          ),
      },
      {
        path: 'content',
        canActivate: [adminNoindexGuard],
        data: { title: 'Page Content CRM' },
        loadComponent: () =>
          import('./pages/content/admin-content-page').then(
            (component) => component.AdminContentPage,
          ),
      },
      {
        path: 'products',
        canActivate: [adminNoindexGuard],
        data: { title: 'Products Catalog CRM' },
        loadComponent: () =>
          import('./pages/products/admin-products-page').then(
            (component) => component.AdminProductsPage,
          ),
      },
      {
        path: 'faqs',
        canActivate: [adminNoindexGuard],
        data: { title: 'FAQs Accordion Manager' },
        loadComponent: () =>
          import('./pages/faqs/admin-faqs-page').then(
            (component) => component.AdminFaqsPage,
          ),
      },
      {
        path: 'ritual',
        canActivate: [adminNoindexGuard],
        data: { title: '21-Day Ritual Manager' },
        loadComponent: () =>
          import('./pages/ritual/admin-ritual-page').then(
            (component) => component.AdminRitualPage,
          ),
      },
      {
        path: 'founder',
        canActivate: [adminNoindexGuard],
        data: { title: 'Founder Profile Manager' },
        loadComponent: () =>
          import('./pages/founder/admin-founder-page').then(
            (component) => component.AdminFounderPage,
          ),
      },
      {
        path: 'testimonials',
        canActivate: [adminNoindexGuard],
        data: { title: 'Testimonials CRM' },
        loadComponent: () =>
          import('./pages/testimonials/admin-testimonials-page').then(
            (component) => component.AdminTestimonialsPage,
          ),
      },
      {
        path: 'contact',
        canActivate: [adminNoindexGuard],
        data: { title: 'Contact & Location Manager' },
        loadComponent: () =>
          import('./pages/contact/admin-contact-page').then(
            (component) => component.AdminContactPage,
          ),
      },
      {
        path: 'seo',
        canActivate: [adminNoindexGuard],
        data: { title: 'SEO & Meta Tags Manager' },
        loadComponent: () =>
          import('./pages/seo/admin-seo-page').then(
            (component) => component.AdminSeoPage,
          ),
      },
      {
        path: 'legal',
        canActivate: [adminNoindexGuard],
        data: { title: 'Legal Pages Manager' },
        loadComponent: () =>
          import('./pages/legal/admin-legal-page').then(
            (component) => component.AdminLegalPage,
          ),
      },
      {
        path: 'media',
        canActivate: [adminNoindexGuard],
        data: { title: 'Media Asset Library' },
        loadComponent: () =>
          import('./pages/media/admin-media-page').then(
            (component) => component.AdminMediaPage,
          ),
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
