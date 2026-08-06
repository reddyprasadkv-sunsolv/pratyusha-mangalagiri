import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SupportedLanguage } from '../../../public-site/content/public-content.model';
import { PublicContentService } from '../../../public-site/content/public-content.service';

@Component({
  selector: 'app-admin-content-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-content-page.html',
  styleUrl: './admin-content-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminContentPage {
  private readonly contentService = inject(PublicContentService);
  protected readonly selectedLang = signal<SupportedLanguage>('en');
  protected readonly savedNotice = signal(false);

  protected readonly heroTitle = signal('');
  protected readonly heroEmphasis = signal('');
  protected readonly heroSupporting = signal('');
  protected readonly heroBody = signal('');
  protected readonly studioLabel = signal('');

  constructor() {
    this.loadCurrentContent();
  }

  protected switchLang(lang: SupportedLanguage): void {
    this.selectedLang.set(lang);
    this.loadCurrentContent();
  }

  protected saveChanges(): void {
    const lang = this.selectedLang();
    this.contentService.updateContent(lang, {
      heroTitle: this.heroTitle(),
      heroEmphasis: this.heroEmphasis(),
      heroSupporting: this.heroSupporting(),
      heroBody: this.heroBody(),
      studioLabel: this.studioLabel(),
    });

    this.savedNotice.set(true);
    setTimeout(() => this.savedNotice.set(false), 3500);
  }

  private loadCurrentContent(): void {
    const current = this.contentService.content();
    this.heroTitle.set(current.heroTitle);
    this.heroEmphasis.set(current.heroEmphasis);
    this.heroSupporting.set(current.heroSupporting);
    this.heroBody.set(current.heroBody);
    this.studioLabel.set(current.studioLabel);
  }
}
