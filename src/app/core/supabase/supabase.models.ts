import { SupportedLanguage } from '../../features/public-site/content/public-content.model';

export type ContentStatus = 'draft' | 'client_review' | 'approved' | 'published' | 'archived';
export type AdministratorRole = 'owner' | 'editor';

export interface ActiveAdminProfile {
  readonly userId: string;
  readonly role: AdministratorRole;
  readonly isActive: true;
}

export type AdminSessionStatus =
  'idle' | 'loading' | 'signed-out' | 'signed-in' | 'unavailable' | 'error';

export interface AdminSessionState {
  readonly status: AdminSessionStatus;
  readonly profile: ActiveAdminProfile | null;
  readonly errorCode: AdminAuthErrorCode | null;
}

export type AdminAuthErrorCode =
  'invalid-credentials' | 'inactive-admin' | 'not-authorized' | 'service-unavailable' | 'unknown';

export interface CmsPageSectionRow {
  readonly id: string;
  readonly pageKey: string;
  readonly sectionKey: string;
  readonly headingEn: string | null;
  readonly headingTe: string | null;
  readonly bodyEn: string | null;
  readonly bodyTe: string | null;
  readonly displayOrder: number;
  readonly isVisible: boolean;
  readonly status: ContentStatus;
}

export interface CmsProductRow {
  readonly id: string;
  readonly productKey: string;
  readonly slug: string;
  readonly nameEn: string;
  readonly nameTe: string;
  readonly displayOrder: number;
  readonly isVisible: boolean;
  readonly status: ContentStatus;
}

export interface CmsFaqRow {
  readonly id: string;
  readonly faqKey: string;
  readonly questionEn: string;
  readonly questionTe: string;
  readonly answerEn: string;
  readonly answerTe: string;
  readonly language: SupportedLanguage;
  readonly displayOrder: number;
  readonly status: ContentStatus;
}
