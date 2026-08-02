export type SupabaseConfigurationStatus = 'disabled' | 'ready' | 'missing' | 'invalid-url';

export interface SupabaseRuntimeConfig {
  readonly enabled: boolean;
  readonly url: string | null;
  readonly anonKey: string | null;
  readonly status: SupabaseConfigurationStatus;
}

export type SupabaseEnvironment = Readonly<Record<string, string | undefined>>;

export const DISABLED_SUPABASE_CONFIG: SupabaseRuntimeConfig = {
  enabled: false,
  url: null,
  anonKey: null,
  status: 'disabled',
};

export function resolveSupabaseConfig(environment: SupabaseEnvironment): SupabaseRuntimeConfig {
  if (environment['SUPABASE_ENABLED']?.trim().toLowerCase() !== 'true') {
    return DISABLED_SUPABASE_CONFIG;
  }

  const url = environment['SUPABASE_URL']?.trim() || null;
  const anonKey = environment['SUPABASE_ANON_KEY']?.trim() || null;
  if (!url || !anonKey) {
    return { enabled: true, url, anonKey, status: 'missing' };
  }

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') {
      return { enabled: true, url: null, anonKey: null, status: 'invalid-url' };
    }
    return {
      enabled: true,
      url: parsedUrl.origin,
      anonKey,
      status: 'ready',
    };
  } catch {
    return { enabled: true, url: null, anonKey: null, status: 'invalid-url' };
  }
}
