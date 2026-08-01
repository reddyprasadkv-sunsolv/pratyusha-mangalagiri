import { computed, inject, Injectable } from '@angular/core';

import { LocaleService } from '../../../core/i18n/locale.service';
import { PUBLIC_CONTENT } from './public-content.data';

@Injectable({ providedIn: 'root' })
export class PublicContentService {
  private readonly localeService = inject(LocaleService);

  readonly content = computed(() => PUBLIC_CONTENT[this.localeService.language()]);
}
