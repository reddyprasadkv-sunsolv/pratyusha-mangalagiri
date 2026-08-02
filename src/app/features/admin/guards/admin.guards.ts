import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { SeoService } from '../../../core/seo/seo.service';
import { AdminAuthService } from '../../../core/supabase/admin-auth.service';
import { safeAdminReturnUrl } from '../utilities/safe-return-url';

export const adminNoindexGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  inject(SeoService).applyAdminPage(readAdminTitle(route));
  return true;
};

export const adminAuthGuard: CanActivateFn = async (
  _route: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot,
) => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);
  await auth.ensureInitialized();

  return auth.state().status === 'authenticated'
    ? true
    : router.createUrlTree(['/admin/login'], {
        queryParams: { returnUrl: safeAdminReturnUrl(routerState.url) },
      });
};

export const activeAdminGuard: CanActivateFn = async () => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);
  await auth.ensureInitialized();
  const profile = auth.state().profile;

  return profile?.isActive === true
    ? true
    : router.createUrlTree(['/admin/login'], { queryParams: { denied: '1' } });
};

export const ownerGuard: CanActivateFn = async () => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);
  await auth.ensureInitialized();

  return auth.state().profile?.role === 'owner'
    ? true
    : router.createUrlTree(['/admin/dashboard'], { queryParams: { denied: 'owner' } });
};

export const editorOrOwnerGuard: CanActivateFn = async () => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);
  await auth.ensureInitialized();
  const role = auth.state().profile?.role;

  return role === 'owner' || role === 'editor'
    ? true
    : router.createUrlTree(['/admin/login'], { queryParams: { denied: '1' } });
};

export const adminLoginRedirectGuard: CanActivateFn = async () => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);
  await auth.ensureInitialized();

  return auth.state().status === 'authenticated'
    ? router.createUrlTree(['/admin/dashboard'])
    : true;
};

function readAdminTitle(route: ActivatedRouteSnapshot): string {
  return typeof route.data['title'] === 'string' ? route.data['title'] : 'Administration';
}
