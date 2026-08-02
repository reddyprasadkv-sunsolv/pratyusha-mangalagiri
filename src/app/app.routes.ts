import { Routes } from '@angular/router';

const publicPage = () =>
  import('./features/public-site/public-sales-page/public-sales-page').then(
    (component) => component.PublicSalesPage,
  );

export const routes: Routes = [
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
];
