import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

import { AdminAuthService } from './admin-auth.service';
import { SupabaseClientService } from './supabase-client.service';

describe('AdminAuthService', () => {
  it.each(['owner', 'editor'] as const)(
    'authorises a valid session with an active %s profile',
    async (role) => {
      const fixture = configure({ role, isActive: true });

      const service = TestBed.inject(AdminAuthService);
      await service.ensureInitialized();

      expect(service.state().status).toBe('authenticated');
      expect(service.state().profile).toEqual({
        userId: 'approved-user',
        displayName: 'Approved Administrator',
        role,
        isActive: true,
      });
      expect(fixture.client.rpc).toHaveBeenCalledWith('current_admin_profile');
    },
  );

  it('denies and signs out a user without an active administrator profile', async () => {
    const fixture = configure({ profileMissing: true });
    const service = TestBed.inject(AdminAuthService);

    await service.ensureInitialized();

    expect(service.state().status).toBe('unauthorized');
    expect(service.state().profile).toBeNull();
    expect(fixture.client.auth.signOut).toHaveBeenCalledWith({ scope: 'local' });
  });

  it('denies an inactive administrator payload', async () => {
    configure({ isActive: false });
    const service = TestBed.inject(AdminAuthService);

    await service.ensureInitialized();

    expect(service.state().status).toBe('unauthorized');
    expect(service.state().profile).toBeNull();
  });

  it('marks an authenticated session expired and clears protected state', async () => {
    const fixture = configure({ role: 'owner', isActive: true });
    const service = TestBed.inject(AdminAuthService);
    await service.ensureInitialized();
    expect(service.state().profile).not.toBeNull();

    fixture.emit('SIGNED_OUT', null);
    await new Promise<void>((resolve) => queueMicrotask(() => resolve()));

    expect(service.state().status).toBe('expired');
    expect(service.state().profile).toBeNull();
    expect(service.state().safeMessage).toContain('session has expired');
  });

  it('clears protected state even if provider sign-out fails', async () => {
    const fixture = configure({ role: 'editor', isActive: true, signOutFails: true });
    const service = TestBed.inject(AdminAuthService);
    await service.ensureInitialized();

    await expect(service.signOut()).resolves.toBe(false);
    expect(service.state().status).toBe('signed-out');
    expect(service.state().profile).toBeNull();
    expect(fixture.client.auth.signOut).toHaveBeenCalled();
  });

  it('maps a restore network failure without exposing the provider error', async () => {
    configure({ restoreThrows: true });
    const service = TestBed.inject(AdminAuthService);

    await expect(service.ensureInitialized()).resolves.toBeUndefined();
    expect(service.state()).toMatchObject({
      status: 'error',
      errorCode: 'network-error',
      safeMessage: 'The administration service could not be reached.',
      profile: null,
    });
  });

  it('denies access and clears profile state when provider sign-out throws', async () => {
    configure({ profileMissing: true, signOutThrows: true });
    const service = TestBed.inject(AdminAuthService);

    await expect(service.ensureInitialized()).resolves.toBeUndefined();
    expect(service.state().status).toBe('unauthorized');
    expect(service.state().profile).toBeNull();
  });
});

interface AuthFixtureOptions {
  readonly role?: 'owner' | 'editor';
  readonly isActive?: boolean;
  readonly profileMissing?: boolean;
  readonly signOutFails?: boolean;
  readonly signOutThrows?: boolean;
  readonly restoreThrows?: boolean;
}

function configure(options: AuthFixtureOptions = {}) {
  const session = { user: { id: 'approved-user' } } as Session;
  let authCallback: ((event: AuthChangeEvent, session: Session | null) => void) | null = null;
  const client = {
    auth: {
      getSession: options.restoreThrows
        ? vi.fn().mockRejectedValue(new TypeError('private provider network detail'))
        : vi.fn().mockResolvedValue({ data: { session }, error: null }),
      signInWithPassword: vi.fn().mockResolvedValue({ data: { session }, error: null }),
      signOut: options.signOutThrows
        ? vi.fn().mockRejectedValue(new TypeError('private provider network detail'))
        : vi.fn().mockResolvedValue({
            error: options.signOutFails ? new Error('provider failure') : null,
          }),
      onAuthStateChange: vi.fn(
        (callback: (event: AuthChangeEvent, currentSession: Session | null) => void) => {
          authCallback = callback;
          return { data: { subscription: { unsubscribe: vi.fn() } } };
        },
      ),
    },
    rpc: vi.fn().mockResolvedValue({
      data: options.profileMissing
        ? []
        : [
            {
              user_id: 'approved-user',
              display_name: 'Approved Administrator',
              role: options.role ?? 'editor',
              is_active: options.isActive ?? true,
            },
          ],
      error: null,
    }),
  };
  const supabase = {
    enabled: true,
    configurationStatus: 'ready',
    client,
  };

  TestBed.configureTestingModule({
    providers: [
      { provide: PLATFORM_ID, useValue: 'browser' },
      { provide: SupabaseClientService, useValue: supabase },
    ],
  });

  return {
    client,
    emit(event: AuthChangeEvent, currentSession: Session | null): void {
      if (!authCallback) {
        throw new Error('Auth callback was not registered.');
      }
      authCallback(event, currentSession);
    },
  };
}
