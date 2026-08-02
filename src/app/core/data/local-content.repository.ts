import { Injectable } from '@angular/core';

import { PUBLIC_CONTENT } from '../../features/public-site/content/public-content.data';
import {
  PublicPageCopy,
  SupportedLanguage,
} from '../../features/public-site/content/public-content.model';
import { ContentRepository } from './content-repository';

@Injectable({ providedIn: 'root' })
export class LocalContentRepository implements ContentRepository {
  load(language: SupportedLanguage): Promise<PublicPageCopy> {
    return Promise.resolve(PUBLIC_CONTENT[language]);
  }
}
