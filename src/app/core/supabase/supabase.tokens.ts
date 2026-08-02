import { InjectionToken } from '@angular/core';

import { DISABLED_SUPABASE_CONFIG, SupabaseRuntimeConfig } from './supabase.config';

export type SupabaseSafeLogger = (message: string) => void;

export const SUPABASE_CONFIG = new InjectionToken<SupabaseRuntimeConfig>('SUPABASE_CONFIG', {
  providedIn: 'root',
  factory: () => DISABLED_SUPABASE_CONFIG,
});

export const SUPABASE_SAFE_LOGGER = new InjectionToken<SupabaseSafeLogger>('SUPABASE_SAFE_LOGGER', {
  providedIn: 'root',
  factory: () => (message: string) => console.warn(message),
});
