import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Session } from '@supabase/supabase-js';

import { mapSupabaseAuthError } from './supabase-errors';
import { AdminSessionState, AdministratorRole } from './supabase.models';
import { SupabaseClientService } from './supabase-client.service';

const INITIAL_STATE: AdminSessionState = {
  status: 'idle',
  profile: null,
  errorCode: null,
};

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly supabase = inject(SupabaseClientService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly sessionState = signal<AdminSessionState>(INITIAL_STATE);

  readonly state = this.sessionState.asReadonly();

  async restoreSession(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      this.sessionState.set({ status: 'signed-out', profile: null, errorCode: null });
      return;
    }

    const client = this.supabase.client;
    if (!client) {
      this.sessionState.set({ status: 'unavailable', profile: null, errorCode: null });
      return;
    }

    this.sessionState.set({ status: 'loading', profile: null, errorCode: null });
    const { data, error } = await client.auth.getSession();
    if (error) {
      this.setSafeError(error);
      return;
    }
    await this.loadRole(data.session);
  }

  async signIn(email: string, password: string): Promise<void> {
    const client = this.supabase.client;
    if (!client || !isPlatformBrowser(this.platformId)) {
      this.sessionState.set({
        status: 'unavailable',
        profile: null,
        errorCode: 'service-unavailable',
      });
      return;
    }

    this.sessionState.set({ status: 'loading', profile: null, errorCode: null });
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
      this.setSafeError(error);
      return;
    }
    await this.loadRole(data.session);
  }

  async signOut(): Promise<void> {
    const client = this.supabase.client;
    if (client && isPlatformBrowser(this.platformId)) {
      await client.auth.signOut({ scope: 'local' });
    }
    this.sessionState.set({ status: 'signed-out', profile: null, errorCode: null });
  }

  private async loadRole(session: Session | null): Promise<void> {
    if (!session) {
      this.sessionState.set({ status: 'signed-out', profile: null, errorCode: null });
      return;
    }

    const client = this.supabase.client;
    if (!client) {
      this.sessionState.set({ status: 'unavailable', profile: null, errorCode: null });
      return;
    }

    const { data, error } = await client.rpc('current_admin_role');
    const role = normalizeAdministratorRole(data as unknown);
    if (error || !role) {
      await client.auth.signOut({ scope: 'local' });
      this.sessionState.set({ status: 'error', profile: null, errorCode: 'not-authorized' });
      return;
    }

    this.sessionState.set({
      status: 'signed-in',
      profile: { userId: session.user.id, role, isActive: true },
      errorCode: null,
    });
  }

  private setSafeError(error: Error): void {
    const safeError = mapSupabaseAuthError(error);
    this.sessionState.set({ status: 'error', profile: null, errorCode: safeError.code });
  }
}

function normalizeAdministratorRole(value: unknown): AdministratorRole | null {
  return value === 'owner' || value === 'editor' ? value : null;
}
