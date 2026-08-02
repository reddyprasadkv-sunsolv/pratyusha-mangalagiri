import { Provider } from '@angular/core';

import { ContentRepository } from './content-repository';
import { LocalContentRepository } from './local-content.repository';

export const CONTENT_REPOSITORY_PROVIDER: Provider = {
  provide: ContentRepository,
  useExisting: LocalContentRepository,
};
