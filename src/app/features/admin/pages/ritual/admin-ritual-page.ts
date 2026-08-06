import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { SupportedLanguage } from '../../../public-site/content/public-content.model';
import { PublicContentService } from '../../../public-site/content/public-content.service';

@Component({
  selector: 'app-admin-ritual-page',
  standalone: true,
  templateUrl: './admin-ritual-page.html',
  styleUrl: './admin-ritual-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRitualPage {
  private readonly contentService = inject(PublicContentService);
  protected readonly selectedLang = signal<SupportedLanguage>('en');
  protected readonly toastMessage = signal<string | null>(null);

  protected readonly ritual = computed(() => {
    const r = this.contentService.content().ritual;
    return {
      eyebrow: r.eyebrow,
      title: r.title,
      supporting: r.supporting,
      body: r.body,
      note: this.contentService.content().ritualNote,
    };
  });

  protected switchLang(lang: SupportedLanguage): void {
    this.selectedLang.set(lang);
  }

  protected updateRitualSection(field: 'eyebrow' | 'title' | 'supporting' | 'body', value: string): void {
    const current = this.contentService.content().ritual;
    const updated = { ...current, [field]: value };
    this.contentService.updateContent(this.selectedLang(), { ritual: updated });
    this.showToast('✅ 21-Day Ritual copy updated live!');
  }

  protected updateRitualNote(value: string): void {
    this.contentService.updateContent(this.selectedLang(), { ritualNote: value });
    this.showToast('✅ Ritual Note updated live!');
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
