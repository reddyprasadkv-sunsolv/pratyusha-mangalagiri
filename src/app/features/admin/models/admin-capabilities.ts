import { AdministratorRole } from '../../../core/supabase/supabase.models';
import { AdminCapability } from './admin.models';

const EDITOR_CAPABILITIES: readonly AdminCapability[] = [
  'view-dashboard',
  'manage-content',
  'manage-products',
  'manage-ritual',
  'manage-faqs',
  'manage-founder',
  'manage-testimonials',
  'manage-contact',
  'manage-seo',
  'manage-legal',
  'manage-media',
  'manage-leads',
];

const OWNER_CAPABILITIES: readonly AdminCapability[] = [
  ...EDITOR_CAPABILITIES,
  'manage-administrators',
  'read-audit-log',
  'manage-settings',
];

export function capabilitiesForRole(role: AdministratorRole): readonly AdminCapability[] {
  return role === 'owner' ? OWNER_CAPABILITIES : EDITOR_CAPABILITIES;
}

export function hasAdminCapability(role: AdministratorRole, capability: AdminCapability): boolean {
  return capabilitiesForRole(role).includes(capability);
}
