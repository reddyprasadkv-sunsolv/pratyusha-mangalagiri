import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/public-site/design-system-page/design-system-page').then(
        (component) => component.DesignSystemPage,
      ),
    title: 'Pratyusha Mangalagiri — Premium bilingual design system',
  },
];
