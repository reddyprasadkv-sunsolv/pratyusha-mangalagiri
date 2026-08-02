import { AuthError } from '@supabase/supabase-js';

import { AdminAuthErrorCode } from './supabase.models';

export interface SafeAdminAuthError {
  readonly code: AdminAuthErrorCode;
  readonly message: string;
}

export function mapSupabaseAuthError(error: AuthError | Error | null): SafeAdminAuthError {
  if (error instanceof AuthError) {
    if (error.code === 'invalid_credentials' || error.status === 400) {
      return { code: 'invalid-credentials', message: 'The sign-in details could not be verified.' };
    }
    if (error.status === 429 || (error.status !== undefined && error.status >= 500)) {
      return { code: 'service-unavailable', message: 'Sign-in is temporarily unavailable.' };
    }
  }

  if (error instanceof TypeError) {
    return { code: 'network-error', message: 'The administration service could not be reached.' };
  }

  return { code: 'unknown', message: 'Sign-in could not be completed.' };
}
