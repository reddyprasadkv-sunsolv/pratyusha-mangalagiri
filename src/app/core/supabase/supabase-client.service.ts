import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { SUPABASE_CONFIG, SUPABASE_SAFE_LOGGER } from './supabase.tokens';

@Injectable({ providedIn: 'root' })
export class SupabaseClientService {
  private readonly config = inject(SUPABASE_CONFIG);
  private readonly logger = inject(SUPABASE_SAFE_LOGGER);
  private readonly platformId = inject(PLATFORM_ID);
  private clientInstance: SupabaseClient | null | undefined;
  private warned = false;

  get client(): SupabaseClient | null {
    if (this.clientInstance !== undefined) {
      return this.clientInstance;
    }

    if (!this.config.enabled) {
      this.clientInstance = null;
      return null;
    }

    if (this.config.status !== 'ready' || !this.config.url || !this.config.anonKey) {
      this.warnConfiguration();
      this.clientInstance = null;
      return null;
    }

    const browser = isPlatformBrowser(this.platformId);
    this.clientInstance = createClient(this.config.url, this.config.anonKey, {
      auth: {
        persistSession: browser,
        autoRefreshToken: browser,
        detectSessionInUrl: browser,
      },
    });
    return this.clientInstance;
  }

  get available(): boolean {
    return this.client !== null;
  }

  private warnConfiguration(): void {
    if (!this.warned) {
      this.logger(
        'Supabase is enabled but its public configuration is unavailable; using local content.',
      );
      this.warned = true;
    }
  }
}
