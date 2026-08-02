import {
  PublicPageCopy,
  SupportedLanguage,
} from '../../features/public-site/content/public-content.model';

export abstract class ContentRepository {
  abstract load(language: SupportedLanguage): Promise<PublicPageCopy>;
}
