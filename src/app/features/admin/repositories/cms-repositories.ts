import { AdministratorRole, ContentStatus } from '../../../core/supabase/supabase.models';

export interface CmsListOptions {
  readonly status?: ContentStatus;
  readonly search?: string;
  readonly limit?: number;
  readonly offset?: number;
}

export interface CmsReorderItem {
  readonly id: string;
  readonly displayOrder: number;
}

export abstract class EditableCmsRepository<TEntity, TCreate, TUpdate> {
  abstract list(options?: CmsListOptions): Promise<readonly TEntity[]>;
  abstract getById(id: string): Promise<TEntity | null>;
  abstract create(input: TCreate): Promise<TEntity>;
  abstract update(id: string, input: TUpdate): Promise<TEntity>;
  abstract archive(id: string): Promise<void>;
  abstract publish(id: string): Promise<TEntity>;
  abstract unpublish(id: string): Promise<TEntity>;
  abstract reorder(items: readonly CmsReorderItem[]): Promise<void>;
}

export interface BilingualContentDraft {
  readonly titleEn: string;
  readonly titleTe: string;
  readonly bodyEn: string | null;
  readonly bodyTe: string | null;
  readonly isVisible: boolean;
  readonly displayOrder: number;
}

export interface CmsContentRecord extends BilingualContentDraft {
  readonly id: string;
  readonly key: string;
  readonly status: ContentStatus;
}

export interface ProductDraft extends BilingualContentDraft {
  readonly slug: string;
  readonly imageAssetId: string | null;
  readonly price: number | null;
  readonly currency: string | null;
}

export interface ProductRecord extends ProductDraft {
  readonly id: string;
  readonly productKey: string;
  readonly status: ContentStatus;
}

export interface MediaAssetDraft {
  readonly bucketName: 'public-media' | 'private-source-assets';
  readonly objectPath: string;
  readonly mimeType: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif';
  readonly altTextEn: string | null;
  readonly altTextTe: string | null;
  readonly isPublic: boolean;
}

export interface MediaAssetRecord extends MediaAssetDraft {
  readonly id: string;
  readonly status: 'draft' | 'approved' | 'published' | 'archived';
}

export interface LeadRecord {
  readonly id: string;
  readonly fullName: string;
  readonly mobileNumber: string;
  readonly emailAddress: string | null;
  readonly city: string | null;
  readonly requirementKey: string;
  readonly preferredLanguage: 'en' | 'te';
  readonly status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed' | 'spam';
  readonly createdAt: string;
}

export interface AdministratorRecord {
  readonly userId: string;
  readonly displayName: string;
  readonly role: AdministratorRole;
  readonly isActive: boolean;
}

export interface AuditLogRecord {
  readonly id: string;
  readonly action: string;
  readonly entityTable: string;
  readonly entityId: string | null;
  readonly createdAt: string;
}

export abstract class PageSectionRepository extends EditableCmsRepository<
  CmsContentRecord,
  BilingualContentDraft,
  Partial<BilingualContentDraft>
> {}

export abstract class ProductRepository extends EditableCmsRepository<
  ProductRecord,
  ProductDraft,
  Partial<ProductDraft>
> {}

export abstract class RitualItemRepository extends EditableCmsRepository<
  CmsContentRecord,
  BilingualContentDraft,
  Partial<BilingualContentDraft>
> {}

export abstract class FaqRepository extends EditableCmsRepository<
  CmsContentRecord,
  BilingualContentDraft,
  Partial<BilingualContentDraft>
> {}

export abstract class FounderProfileRepository extends EditableCmsRepository<
  CmsContentRecord,
  BilingualContentDraft,
  Partial<BilingualContentDraft>
> {}

export abstract class TestimonialRepository extends EditableCmsRepository<
  CmsContentRecord,
  BilingualContentDraft,
  Partial<BilingualContentDraft>
> {}

export abstract class ContactSettingsRepository extends EditableCmsRepository<
  CmsContentRecord,
  BilingualContentDraft,
  Partial<BilingualContentDraft>
> {}

export abstract class SeoPageRepository extends EditableCmsRepository<
  CmsContentRecord,
  BilingualContentDraft,
  Partial<BilingualContentDraft>
> {}

export abstract class LegalPageRepository extends EditableCmsRepository<
  CmsContentRecord,
  BilingualContentDraft,
  Partial<BilingualContentDraft>
> {}

export abstract class MediaAssetRepository extends EditableCmsRepository<
  MediaAssetRecord,
  MediaAssetDraft,
  Partial<MediaAssetDraft>
> {}

export abstract class SiteSettingsRepository extends EditableCmsRepository<
  CmsContentRecord,
  BilingualContentDraft,
  Partial<BilingualContentDraft>
> {}

export abstract class LeadRepository {
  abstract list(options?: CmsListOptions): Promise<readonly LeadRecord[]>;
  abstract getById(id: string): Promise<LeadRecord | null>;
  abstract updateStatus(id: string, status: LeadRecord['status']): Promise<LeadRecord>;
  abstract archive(id: string): Promise<void>;
}

export abstract class AdministratorRepository {
  abstract list(): Promise<readonly AdministratorRecord[]>;
  abstract getById(userId: string): Promise<AdministratorRecord | null>;
  abstract create(input: AdministratorRecord): Promise<AdministratorRecord>;
  abstract update(
    userId: string,
    input: Partial<Omit<AdministratorRecord, 'userId'>>,
  ): Promise<AdministratorRecord>;
  abstract archive(userId: string): Promise<void>;
}

export abstract class AuditLogRepository {
  abstract list(options?: CmsListOptions): Promise<readonly AuditLogRecord[]>;
  abstract getById(id: string): Promise<AuditLogRecord | null>;
}
