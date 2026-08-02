import { Injectable } from '@angular/core';

import { AdministratorRole } from '../../../core/supabase/supabase.models';
import { hasAdminCapability } from '../models/admin-capabilities';
import { AdminNavigationItem } from '../models/admin.models';

const NAVIGATION: readonly AdminNavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    route: '/admin/dashboard',
    capability: 'view-dashboard',
    enabled: true,
  },
  {
    id: 'content',
    label: 'Page Content',
    route: null,
    capability: 'manage-content',
    enabled: false,
  },
  { id: 'products', label: 'Products', route: null, capability: 'manage-products', enabled: false },
  {
    id: 'ritual',
    label: '21-Day Ritual',
    route: null,
    capability: 'manage-ritual',
    enabled: false,
  },
  { id: 'faqs', label: 'FAQs', route: null, capability: 'manage-faqs', enabled: false },
  {
    id: 'founder',
    label: 'Founder Profile',
    route: null,
    capability: 'manage-founder',
    enabled: false,
  },
  {
    id: 'testimonials',
    label: 'Testimonials',
    route: null,
    capability: 'manage-testimonials',
    enabled: false,
  },
  { id: 'contact', label: 'Contact', route: null, capability: 'manage-contact', enabled: false },
  { id: 'seo', label: 'SEO', route: null, capability: 'manage-seo', enabled: false },
  { id: 'legal', label: 'Legal Pages', route: null, capability: 'manage-legal', enabled: false },
  { id: 'media', label: 'Media', route: null, capability: 'manage-media', enabled: false },
  { id: 'leads', label: 'Leads', route: null, capability: 'manage-leads', enabled: false },
  {
    id: 'administrators',
    label: 'Administrators',
    route: null,
    capability: 'manage-administrators',
    enabled: false,
    ownerOnly: true,
  },
  {
    id: 'audit',
    label: 'Audit Log',
    route: null,
    capability: 'read-audit-log',
    enabled: false,
    ownerOnly: true,
  },
  {
    id: 'settings',
    label: 'Settings',
    route: null,
    capability: 'manage-settings',
    enabled: false,
    ownerOnly: true,
  },
];

@Injectable({ providedIn: 'root' })
export class AdminNavigationService {
  itemsFor(role: AdministratorRole): readonly AdminNavigationItem[] {
    return NAVIGATION.filter((item) => hasAdminCapability(role, item.capability));
  }
}
