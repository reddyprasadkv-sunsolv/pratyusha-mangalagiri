import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { SupportedLanguage } from '../../../public-site/content/public-content.model';
import { PublicContentService } from '../../../public-site/content/public-content.service';

@Component({
  selector: 'app-admin-ritual-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-ritual-page.html',
  styleUrl: './admin-ritual-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRitualPage {
  private readonly contentService = inject(PublicContentService);

  protected readonly selectedLang = signal<SupportedLanguage>('en');
  protected readonly toastMessage = signal<string | null>(null);

  protected readonly eyebrow = signal('');
  protected readonly title = signal('');
  protected readonly supporting = signal('');
  protected readonly body = signal('');
  protected readonly note = signal('');

  constructor() {
    this.loadContent();
  }

  protected switchLang(lang: SupportedLanguage): void {
    this.selectedLang.set(lang);
    this.loadContent();
  }

  protected loadContent(): void {
    const c = this.contentService.getContentFor(this.selectedLang());
    const r = c.ritual;
    this.eyebrow.set(r.eyebrow);
    this.title.set(r.title);
    this.supporting.set(r.supporting);
    this.body.set(r.body);
    this.note.set(c.ritualNote);
  }

  protected saveRitualChanges(): void {
    const lang = this.selectedLang();
    const currentRitual = this.contentService.getContentFor(lang).ritual;
    const updatedRitual = {
      ...currentRitual,
      eyebrow: this.eyebrow(),
      title: this.title(),
      supporting: this.supporting(),
      body: this.body(),
    };
    this.contentService.updateContent(lang, {
      ritual: updatedRitual,
      ritualNote: this.note(),
    });
    this.showToast('✅ 21-Day Ritual changes saved successfully!');
  }

  protected resetDefaults(): void {
    if (confirm(`Reset ${this.selectedLang() === 'en' ? 'English' : 'Telugu'} ritual settings back to default copy?`)) {
      this.contentService.resetToDefaults(this.selectedLang());
      this.loadContent();
      this.showToast('🔄 Ritual content reset to defaults!');
    }
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
