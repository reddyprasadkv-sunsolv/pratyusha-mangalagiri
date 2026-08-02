import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AdminAuthService } from '../../../core/supabase/admin-auth.service';
import { AdminSessionState } from '../../../core/supabase/supabase.models';
import {
  adminAuthGuard,
  adminLoginRedirectGuard,
  editorOrOwnerGuard,
  ownerGuard,
} from './admin.guards';

describe('administrator guards', () => {
  it('allows an active owner through owner and editor-or-owner guards', async () => {
    configure(authenticatedState('owner'));

    await expect(runGuard(ownerGuard, '/admin/administrators')).resolves.toBe(true);
    await expect(runGuard(editorOrOwnerGuard, '/admin/dashboard')).resolves.toBe(true);
  });

  it('allows an editor through editor-or-owner and denies owner-only access', async () => {
    configure(authenticatedState('editor'));

    await expect(runGuard(editorOrOwnerGuard, '/admin/dashboard')).resolves.toBe(true);
    const result = await runGuard(ownerGuard, '/admin/administrators');
    expect(
      TestBed.inject(Router).serializeUrl(result as ReturnType<Router['createUrlTree']>),
    ).toContain('/admin/dashboard?denied=owner');
  });

  it('redirects signed-out direct access to the login with an internal return URL', async () => {
    configure(state('signed-out'));

    const result = await runGuard(adminAuthGuard, '/admin/dashboard');
    expect(TestBed.inject(Router).serializeUrl(result as ReturnType<Router['createUrlTree']>)).toBe(
      '/admin/login?returnUrl=%2Fadmin%2Fdashboard',
    );
  });

  it('redirects an authorised administrator away from login', async () => {
    configure(authenticatedState('owner'));

    const result = await runGuard(adminLoginRedirectGuard, '/admin/login');
    expect(TestBed.inject(Router).serializeUrl(result as ReturnType<Router['createUrlTree']>)).toBe(
      '/admin/dashboard',
    );
  });
});

function configure(initialState: AdminSessionState): void {
  const stateSignal = signal(initialState);
  TestBed.configureTestingModule({
    providers: [
      provideRouter([]),
      {
        provide: AdminAuthService,
        useValue: {
          state: stateSignal.asReadonly(),
          ensureInitialized: vi.fn().mockResolvedValue(undefined),
        },
      },
    ],
  });
}

async function runGuard(guard: typeof ownerGuard, url: string): Promise<unknown> {
  return TestBed.runInInjectionContext(() =>
    guard(new ActivatedRouteSnapshot(), { url } as RouterStateSnapshot),
  );
}

function authenticatedState(role: 'owner' | 'editor'): AdminSessionState {
  return {
    status: 'authenticated',
    profile: {
      userId: 'synthetic-user',
      displayName: 'Approved Administrator',
      role,
      isActive: true,
    },
    errorCode: null,
    safeMessage: null,
  };
}

function state(status: AdminSessionState['status']): AdminSessionState {
  return { status, profile: null, errorCode: null, safeMessage: null };
}
