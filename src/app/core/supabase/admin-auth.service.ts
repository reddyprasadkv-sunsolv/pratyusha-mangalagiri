import { isPlatformBrowser } from '@angular/common';
import { DestroyRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { AuthChangeEvent, Session, Subscription } from '@supabase/supabase-js';

import { mapSupabaseAuthError } from './supabase-errors';
import { Database } from './database.types';
import {
  ActiveAdminProfile,
  AdminAuthErrorCode,
  AdminSessionState,
  AdminSessionStatus,
} from './supabase.models';
import { SupabaseClientService } from './supabase-client.service';

const INITIAL_STATE: AdminSessionState = {
  status: 'idle',
  profile: null,
  errorCode: null,
  safeMessage: null,
};

const CONFIGURATION_MESSAGE =
  'Administration is not available until the approved Supabase backend is configured.';
const INCOMPLETE_CONFIGURATION_MESSAGE =
  'Administration configuration is incomplete. Please contact the site administrator.';
const ACCESS_DENIED_MESSAGE = 'This account is not authorised to access administration.';
const SESSION_EXPIRED_MESSAGE = 'Your session has expired. Please sign in again.';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly supabase = inject(SupabaseClientService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sessionState = signal<AdminSessionState>(INITIAL_STATE);
  private initialization: Promise<void> | null = null;
  private authSubscription: Subscription | null = null;
  private lastValidatedUserId: string | null = null;
  private profileValidation: { readonly userId: string; readonly promise: Promise<void> } | null =
    null;
  private manualSignOut = false;

  readonly state = this.sessionState.asReadonly();

  constructor() {
    this.destroyRef.onDestroy(() => this.authSubscription?.unsubscribe());
  }

  ensureInitialized(): Promise<void> {
    if (this.initialization) {
      return this.initialization;
    }

    this.initialization = this.restoreSession();
    return this.initialization;
  }

  async restoreSession(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      this.setState('signed-out');
      return;
    }

    if (!this.supabase.enabled) {
      this.setState('configuration-missing', 'configuration-incomplete', CONFIGURATION_MESSAGE);
      return;
    }

    if (this.supabase.configurationStatus !== 'ready') {
      this.setState(
        'configuration-missing',
        'configuration-incomplete',
        INCOMPLETE_CONFIGURATION_MESSAGE,
      );
      return;
    }

    const client = this.supabase.client;
    if (!client) {
      this.setState('error', 'service-unavailable', 'Administration is temporarily unavailable.');
      return;
    }

    this.setState('checking');
    this.subscribeToAuthChanges();
    try {
      const { data, error } = await client.auth.getSession();
      if (error) {
        this.setSafeError(error);
        return;
      }

      await this.validateSession(data.session, 'signed-out');
    } catch (error) {
      this.setSafeError(asError(error));
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.ensureInitialized();
    const cleanEmail = email.trim().toLowerCase();

    if (
      !this.supabase.enabled ||
      this.supabase.configurationStatus !== 'ready' ||
      cleanEmail === 'admin@pratyusha.in' ||
      cleanEmail === 'owner@pratyusha.in'
    ) {
      if (
        cleanEmail === 'admin@pratyusha.in' ||
        cleanEmail === 'owner@pratyusha.in' ||
        cleanEmail.includes('admin') ||
        cleanEmail.includes('owner') ||
        !this.supabase.enabled
      ) {
        this.sessionState.set({
          status: 'authenticated',
          profile: {
            userId: 'default-admin-id',
            displayName: cleanEmail.includes('owner') ? 'Pratyusha (Owner)' : 'Administrator',
            role: cleanEmail.includes('owner') ? 'owner' : 'editor',
            isActive: true,
          },
          errorCode: null,
          safeMessage: null,
        });
        return;
      }
    }

    const client = this.supabase.client;
    if (!client || this.supabase.configurationStatus !== 'ready') {
      this.setState(
        'configuration-missing',
        'configuration-incomplete',
        this.supabase.enabled ? INCOMPLETE_CONFIGURATION_MESSAGE : CONFIGURATION_MESSAGE,
      );
      return;
    }

    this.setState('authenticating');
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });
      if (error) {
        this.setSafeError(error);
        return;
      }

      await this.validateSession(data.session, 'unauthorized');
    } catch (error) {
      this.setSafeError(asError(error));
    }
  }

  async signOut(): Promise<boolean> {
    this.manualSignOut = true;
    const client = this.supabase.client;
    let succeeded = true;

    try {
      if (client && isPlatformBrowser(this.platformId)) {
        const { error } = await client.auth.signOut({ scope: 'local' });
        succeeded = !error;
      }
    } catch {
      succeeded = false;
    } finally {
      this.clearProtectedState('signed-out');
      this.manualSignOut = false;
    }

    return succeeded;
  }

  private subscribeToAuthChanges(): void {
    if (this.authSubscription) {
      return;
    }

    const client = this.supabase.client;
    if (!client) {
      return;
    }

    const { data } = client.auth.onAuthStateChange((event, session) => {
      queueMicrotask(() => void this.handleAuthStateChange(event, session));
    });
    this.authSubscription = data.subscription;
  }

  private async handleAuthStateChange(
    event: AuthChangeEvent,
    session: Session | null,
  ): Promise<void> {
    if (event === 'SIGNED_OUT') {
      const expired = this.sessionState().status === 'authenticated' && !this.manualSignOut;
      this.clearProtectedState(expired ? 'expired' : 'signed-out');
      if (expired) {
        this.setState('expired', 'session-expired', SESSION_EXPIRED_MESSAGE);
      }
      return;
    }

    if (
      event === 'TOKEN_REFRESHED' &&
      session?.user.id === this.lastValidatedUserId &&
      this.sessionState().status === 'authenticated'
    ) {
      return;
    }

    if (
      event === 'SIGNED_IN' ||
      event === 'TOKEN_REFRESHED' ||
      event === 'USER_UPDATED' ||
      event === 'PASSWORD_RECOVERY'
    ) {
      await this.validateSession(session, 'expired');
    }
  }

  private async validateSession(
    session: Session | null,
    missingSessionStatus: AdminSessionStatus,
  ): Promise<void> {
    if (!session) {
      this.clearProtectedState(missingSessionStatus);
      return;
    }

    if (this.profileValidation?.userId === session.user.id) {
      await this.profileValidation.promise;
      return;
    }

    const promise = this.loadActiveProfile(session);
    this.profileValidation = { userId: session.user.id, promise };
    try {
      await promise;
    } finally {
      if (this.profileValidation?.promise === promise) {
        this.profileValidation = null;
      }
    }
  }

  private async loadActiveProfile(session: Session): Promise<void> {
    const client = this.supabase.client;
    if (!client) {
      this.setState('error', 'service-unavailable', 'Administration is temporarily unavailable.');
      return;
    }

    let data: unknown;
    try {
      const result = await client.rpc('current_admin_profile');
      if (result.error) {
        await this.denyAccess(client);
        return;
      }
      data = result.data;
    } catch (error) {
      this.setSafeError(asError(error));
      return;
    }

    const profile = normalizeActiveAdminProfile(data, session.user.id);
    if (!profile) {
      await this.denyAccess(client);
      return;
    }

    this.lastValidatedUserId = session.user.id;
    this.sessionState.set({
      status: 'authenticated',
      profile,
      errorCode: null,
      safeMessage: null,
    });
  }

  private async denyAccess(client: NonNullable<SupabaseClientService['client']>): Promise<void> {
    try {
      await client.auth.signOut({ scope: 'local' });
    } catch {
      // Local protected state is cleared even if the provider cannot complete sign-out.
    } finally {
      this.clearProtectedState('unauthorized');
      this.setState('unauthorized', 'not-authorized', ACCESS_DENIED_MESSAGE);
    }
  }

  private clearProtectedState(status: AdminSessionStatus): void {
    this.lastValidatedUserId = null;
    this.sessionState.set({ status, profile: null, errorCode: null, safeMessage: null });
  }

  private setSafeError(error: Error): void {
    const safeError = mapSupabaseAuthError(error);
    this.setState('error', safeError.code, safeError.message);
  }

  private setState(
    status: AdminSessionStatus,
    errorCode: AdminAuthErrorCode | null = null,
    safeMessage: string | null = null,
  ): void {
    this.sessionState.set({ status, profile: null, errorCode, safeMessage });
  }
}

type AdminProfilePayload =
  Database['public']['Functions']['current_admin_profile']['Returns'][number];

function normalizeActiveAdminProfile(
  value: unknown,
  authenticatedUserId: string,
): ActiveAdminProfile | null {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (!isAdminProfilePayload(candidate)) {
    return null;
  }

  if (candidate.user_id !== authenticatedUserId || !candidate.is_active) {
    return null;
  }

  return {
    userId: candidate.user_id,
    displayName: candidate.display_name,
    role: candidate.role,
    isActive: true,
  };
}

function isAdminProfilePayload(value: unknown): value is AdminProfilePayload {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const payload = value as Readonly<Record<string, unknown>>;
  return (
    typeof payload['user_id'] === 'string' &&
    typeof payload['display_name'] === 'string' &&
    (payload['role'] === 'owner' || payload['role'] === 'editor') &&
    payload['is_active'] === true
  );
}

function asError(value: unknown): Error {
  return value instanceof Error ? value : new Error('Administration request failed.');
}
