import { Routes } from '@angular/router';

import { PublicLayout } from './layout/public-layout/public-layout';

const publicPage = () =>
  import('./features/public-site/public-sales-page/public-sales-page').then(
    (component) => component.PublicSalesPage,
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
        path: '**',
        loadComponent: () =>
          import('./features/not-found/not-found-page').then((component) => component.NotFoundPage),
      },
    ],
  },
];
