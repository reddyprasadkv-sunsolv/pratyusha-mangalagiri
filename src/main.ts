import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { parsePublicSupabaseRuntimePayload } from './app/core/supabase/supabase.config';
import { SUPABASE_CONFIG } from './app/core/supabase/supabase.tokens';

declare global {
  var __PRATYUSHA_SUPABASE_CONFIG__: unknown;
}

const browserConfig: ApplicationConfig = {
  providers: [
    {
      provide: SUPABASE_CONFIG,
      useValue: parsePublicSupabaseRuntimePayload(globalThis.__PRATYUSHA_SUPABASE_CONFIG__),
    },
  ],
};

bootstrapApplication(App, mergeApplicationConfig(appConfig, browserConfig)).catch(
  (error: unknown) => console.error(error),
);
