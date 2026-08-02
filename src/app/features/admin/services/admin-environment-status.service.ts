import { computed, inject, Injectable } from '@angular/core';

import { AdminAuthService } from '../../../core/supabase/admin-auth.service';
import { SupabaseClientService } from '../../../core/supabase/supabase-client.service';
import { AdminBackendStatusView } from '../models/admin.models';

@Injectable({ providedIn: 'root' })
export class AdminEnvironmentStatusService {
  private readonly auth = inject(AdminAuthService);
  private readonly supabase = inject(SupabaseClientService);

  readonly status = computed<AdminBackendStatusView>(() => {
    if (!this.supabase.enabled) {
      return {
        status: 'not-configured',
        label: 'Not configured',
        message: 'Administration requires the approved Supabase backend configuration.',
        tone: 'warning',
      };
    }

    if (this.supabase.configurationStatus !== 'ready') {
      return {
        status: 'configuration-incomplete',
        label: 'Configuration incomplete',
        message: 'Administration configuration is incomplete. Contact the site administrator.',
        tone: 'error',
      };
    }

    const authStatus = this.auth.state().status;
    if (authStatus === 'checking' || authStatus === 'authenticating') {
      return {
        status: 'connecting',
        label: 'Connecting',
        message: 'Securely checking the administration session.',
        tone: 'neutral',
      };
    }
    if (authStatus === 'authenticated') {
      return {
        status: 'connected',
        label: 'Connected',
        message: 'The authenticated administration session is active.',
        tone: 'success',
      };
    }
    if (authStatus === 'unauthorized') {
      return {
        status: 'access-denied',
        label: 'Access denied',
        message: 'This account does not have active administration access.',
        tone: 'error',
      };
    }
    if (authStatus === 'error') {
      return {
        status: 'error',
        label: 'Unavailable',
        message: 'The administration service is temporarily unavailable.',
        tone: 'error',
      };
    }

    return {
      status:
        authStatus === 'signed-out' || authStatus === 'expired'
          ? 'authentication-required'
          : 'ready',
      label: authStatus === 'signed-out' || authStatus === 'expired' ? 'Sign-in required' : 'Ready',
      message:
        authStatus === 'signed-out' || authStatus === 'expired'
          ? 'Sign in with an approved administrator account.'
          : 'The administration backend is ready for authentication.',
      tone: 'neutral',
    };
  });

  readonly canSignIn = computed(
    () => this.supabase.enabled && this.supabase.configurationStatus === 'ready',
  );
}
