import { Injectable } from '@angular/core';

import { AdminAuthErrorCode } from '../../../core/supabase/supabase.models';

const SAFE_MESSAGES: Readonly<Record<AdminAuthErrorCode, string>> = {
  'invalid-credentials': 'The sign-in details could not be verified.',
  'inactive-admin': 'This administrator account is inactive.',
  'not-authorized': 'This account is not authorised to access administration.',
  'session-expired': 'Your session has expired. Please sign in again.',
  'service-unavailable': 'Administration is temporarily unavailable.',
  'configuration-incomplete': 'Administration configuration is incomplete.',
  'network-error': 'The administration service could not be reached.',
  'validation-error': 'Review the highlighted fields and try again.',
  unknown: 'The requested administration action could not be completed.',
};

@Injectable({ providedIn: 'root' })
export class AdminErrorService {
  messageFor(code: AdminAuthErrorCode | null): string {
    return code ? SAFE_MESSAGES[code] : SAFE_MESSAGES['unknown'];
  }
}
