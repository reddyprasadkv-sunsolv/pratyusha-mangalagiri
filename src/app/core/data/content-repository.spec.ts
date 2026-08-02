import { TestBed } from '@angular/core/testing';

import { PUBLIC_CONTENT } from '../../features/public-site/content/public-content.data';
import { DISABLED_SUPABASE_CONFIG } from '../supabase/supabase.config';
import { SUPABASE_CONFIG, SUPABASE_SAFE_LOGGER } from '../supabase/supabase.tokens';
import { LocalContentRepository } from './local-content.repository';
import { SupabaseContentRepository } from './supabase-content.repository';

describe('content repositories', () => {
  it('keeps reviewed local English and Telugu content available', async () => {
    TestBed.configureTestingModule({});
    const repository = TestBed.inject(LocalContentRepository);

    await expect(repository.load('en')).resolves.toBe(PUBLIC_CONTENT.en);
    await expect(repository.load('te')).resolves.toBe(PUBLIC_CONTENT.te);
  });

  it('uses local content while Supabase is disabled', async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: SUPABASE_CONFIG, useValue: DISABLED_SUPABASE_CONFIG }],
    });
    const repository = TestBed.inject(SupabaseContentRepository);

    await expect(repository.load('en')).resolves.toBe(PUBLIC_CONTENT.en);
  });

  it('uses local content safely when enabled configuration is missing', async () => {
    const logger = vi.fn();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SUPABASE_CONFIG,
          useValue: { enabled: true, url: null, anonKey: null, status: 'missing' },
        },
        { provide: SUPABASE_SAFE_LOGGER, useValue: logger },
      ],
    });
    const repository = TestBed.inject(SupabaseContentRepository);

    await expect(repository.load('te')).resolves.toBe(PUBLIC_CONTENT.te);
    expect(logger).toHaveBeenCalledOnce();
  });
});
