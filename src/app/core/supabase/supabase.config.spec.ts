import {
  DISABLED_SUPABASE_CONFIG,
  parsePublicSupabaseRuntimePayload,
  resolveSupabaseConfig,
  toPublicSupabaseRuntimePayload,
} from './supabase.config';

describe('resolveSupabaseConfig', () => {
  it('defaults to disabled and requires no Supabase values', () => {
    expect(resolveSupabaseConfig({})).toEqual({
      enabled: false,
      url: null,
      anonKey: null,
      status: 'disabled',
    });
  });

  it('rejects missing enabled configuration without exposing a value', () => {
    const config = resolveSupabaseConfig({ SUPABASE_ENABLED: 'true' });

    expect(config.status).toBe('missing');
    expect(config.url).toBeNull();
    expect(config.anonKey).toBeNull();
  });

  it('rejects malformed and unsafe URL protocols', () => {
    expect(
      resolveSupabaseConfig({
        SUPABASE_ENABLED: 'true',
        SUPABASE_URL: 'not-a-url',
        SUPABASE_ANON_KEY: 'public-key',
      }).status,
    ).toBe('invalid-url');
    expect(
      resolveSupabaseConfig({
        SUPABASE_ENABLED: 'true',
        SUPABASE_URL: 'file:///tmp/config',
        SUPABASE_ANON_KEY: 'public-key',
      }).status,
    ).toBe('invalid-url');
  });

  it('accepts an explicit public HTTP or HTTPS endpoint', () => {
    expect(
      resolveSupabaseConfig({
        SUPABASE_ENABLED: 'true',
        SUPABASE_URL: 'https://project.example.test/path',
        SUPABASE_ANON_KEY: 'public-key',
      }),
    ).toEqual({
      enabled: true,
      url: 'https://project.example.test',
      anonKey: 'public-key',
      status: 'ready',
    });
  });
});

describe('public Supabase runtime payload', () => {
  it('accepts only a complete enabled browser configuration', () => {
    const config = parsePublicSupabaseRuntimePayload({
      enabled: true,
      url: 'https://project.example.test',
      anonKey: 'public-key',
    });

    expect(config.status).toBe('ready');
    expect(toPublicSupabaseRuntimePayload(config)).toEqual({
      enabled: true,
      url: 'https://project.example.test',
      anonKey: 'public-key',
    });
  });

  it('fails closed for malformed or incomplete endpoint data', () => {
    expect(parsePublicSupabaseRuntimePayload(null)).toBe(DISABLED_SUPABASE_CONFIG);
    expect(parsePublicSupabaseRuntimePayload({ enabled: true })).toMatchObject({
      enabled: true,
      status: 'missing',
    });
    expect(
      parsePublicSupabaseRuntimePayload({
        enabled: 'true',
        url: 'https://project.example.test',
        anonKey: 'public-key',
      }),
    ).toBe(DISABLED_SUPABASE_CONFIG);
  });
});
