import { AdminSessionStatus, AdministratorRole } from '../../../core/supabase/supabase.models';

export type AdminCapability =
  | 'view-dashboard'
  | 'manage-content'
  | 'manage-products'
  | 'manage-ritual'
  | 'manage-faqs'
  | 'manage-founder'
  | 'manage-testimonials'
  | 'manage-contact'
  | 'manage-seo'
  | 'manage-legal'
  | 'manage-media'
  | 'manage-leads'
  | 'manage-administrators'
  | 'read-audit-log'
  | 'manage-settings';

export type AdminBackendStatus =
  | 'not-configured'
  | 'configuration-incomplete'
  | 'ready'
  | 'connecting'
  | 'connected'
  | 'authentication-required'
  | 'access-denied'
  | 'error';

export interface AdminBackendStatusView {
  readonly status: AdminBackendStatus;
  readonly label: string;
  readonly message: string;
  readonly tone: 'neutral' | 'success' | 'warning' | 'error';
}

export interface AdminNavigationItem {
  readonly id: string;
  readonly label: string;
  readonly route: string | null;
  readonly capability: AdminCapability;
  readonly enabled: boolean;
  readonly ownerOnly?: boolean;
}

export interface AdminNotification {
  readonly id: number;
  readonly variant: 'success' | 'warning' | 'error' | 'information';
  readonly message: string;
  readonly dismissible: boolean;
}

export interface AdminGuardState {
  readonly status: AdminSessionStatus;
  readonly role: AdministratorRole | null;
  readonly isActive: boolean;
}
