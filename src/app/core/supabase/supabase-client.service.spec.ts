import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DISABLED_SUPABASE_CONFIG, SupabaseRuntimeConfig } from './supabase.config';
import { SupabaseClientService } from './supabase-client.service';
import { SUPABASE_CONFIG, SUPABASE_SAFE_LOGGER } from './supabase.tokens';

describe('SupabaseClientService', () => {
  it('does not create a client or make a request while disabled', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    configure(DISABLED_SUPABASE_CONFIG);

    const service = TestBed.inject(SupabaseClientService);

    expect(service.client).toBeNull();
    expect(service.available).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it('warns safely and falls back when enabled configuration is invalid', () => {
    const logger = vi.fn();
    configure({ enabled: true, url: null, anonKey: null, status: 'missing' }, logger);

    const service = TestBed.inject(SupabaseClientService);
    expect(service.client).toBeNull();
    expect(service.client).toBeNull();
    expect(logger).toHaveBeenCalledOnce();
    expect(logger.mock.calls[0]?.[0]).not.toContain('key');
  });

  it('reuses one client instance', () => {
    configure({
      enabled: true,
      url: 'https://project.example.test',
      anonKey: 'public-anon-test-value',
      status: 'ready',
    });

    const service = TestBed.inject(SupabaseClientService);
    expect(service.client).toBe(service.client);
  });

  it('creates an SSR-safe client without browser storage', () => {
    configure(
      {
        enabled: true,
        url: 'https://project.example.test',
        anonKey: 'public-anon-test-value',
        status: 'ready',
      },
      vi.fn(),
      'server',
    );

    expect(() => TestBed.inject(SupabaseClientService).client).not.toThrow();
  });

  function configure(
    config: SupabaseRuntimeConfig,
    logger = vi.fn(),
    platformId = 'browser',
  ): void {
    TestBed.configureTestingModule({
      providers: [
        { provide: SUPABASE_CONFIG, useValue: config },
        { provide: SUPABASE_SAFE_LOGGER, useValue: logger },
        { provide: PLATFORM_ID, useValue: platformId },
      ],
    });
  }
});
