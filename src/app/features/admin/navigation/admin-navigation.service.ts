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
    route: '/admin/content',
    capability: 'manage-content',
    enabled: true,
  },
  { id: 'products', label: 'Products', route: '/admin/products', capability: 'manage-products', enabled: true },
  {
    id: 'ritual',
    label: '21-Day Ritual',
    route: '/admin/ritual',
    capability: 'manage-ritual',
    enabled: true,
  },
  { id: 'faqs', label: 'FAQs', route: '/admin/faqs', capability: 'manage-faqs', enabled: true },
  {
    id: 'founder',
    label: 'Founder Profile',
    route: '/admin/founder',
    capability: 'manage-founder',
    enabled: true,
  },
  {
    id: 'testimonials',
    label: 'Testimonials',
    route: '/admin/testimonials',
    capability: 'manage-testimonials',
    enabled: true,
  },
  { id: 'contact', label: 'Contact', route: '/admin/contact', capability: 'manage-contact', enabled: true },
  { id: 'seo', label: 'SEO', route: '/admin/seo', capability: 'manage-seo', enabled: true },
  { id: 'legal', label: 'Legal Pages', route: '/admin/legal', capability: 'manage-legal', enabled: true },
  { id: 'media', label: 'Media', route: '/admin/media', capability: 'manage-media', enabled: true },
  { id: 'leads', label: 'Leads & Enquiries', route: '/admin/leads', capability: 'manage-leads', enabled: true },
  {
    id: 'administrators',
    label: 'Administrators',
    route: '/admin/dashboard',
    capability: 'manage-administrators',
    enabled: true,
    ownerOnly: true,
  },
  {
    id: 'audit',
    label: 'Audit Log',
    route: '/admin/dashboard',
    capability: 'read-audit-log',
    enabled: true,
    ownerOnly: true,
  },
  {
    id: 'settings',
    label: 'Settings',
    route: '/admin/dashboard',
    capability: 'manage-settings',
    enabled: true,
    ownerOnly: true,
  },
];

@Injectable({ providedIn: 'root' })
export class AdminNavigationService {
  itemsFor(role: AdministratorRole): readonly AdminNavigationItem[] {
    return NAVIGATION.filter((item) => hasAdminCapability(role, item.capability));
  }
}
