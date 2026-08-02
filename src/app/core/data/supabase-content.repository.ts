import { inject, Injectable } from '@angular/core';

import {
  PublicPageCopy,
  SupportedLanguage,
} from '../../features/public-site/content/public-content.model';
import { SupabaseClientService } from '../supabase/supabase-client.service';
import { ContentRepository } from './content-repository';
import { LocalContentRepository } from './local-content.repository';

@Injectable({ providedIn: 'root' })
export class SupabaseContentRepository implements ContentRepository {
  private readonly local = inject(LocalContentRepository);
  private readonly supabase = inject(SupabaseClientService);

  load(language: SupportedLanguage): Promise<PublicPageCopy> {
    // Step 5 deliberately does not activate live CMS reads. Touching availability validates
    // configuration and preserves a safe local fallback without issuing a database request.
    void this.supabase.available;
    return this.local.load(language);
  }
}
