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
        data: { title: 'Bilingual Content CRM' },
        loadComponent: () =>
          import('./pages/content/admin-content-page').then(
            (component) => component.AdminContentPage,
          ),
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
