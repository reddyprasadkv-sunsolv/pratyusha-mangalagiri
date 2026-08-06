import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MediaAsset, PublicContentService } from '../../../public-site/content/public-content.service';

@Component({
  selector: 'app-admin-media-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-media-page.html',
  styleUrl: './admin-media-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminMediaPage {
  private readonly contentService = inject(PublicContentService);

  protected readonly toastMessage = signal<string | null>(null);
  protected readonly mediaAssets = this.contentService.mediaAssets;

  protected readonly isAdding = signal(false);
  protected readonly newMediaName = signal('');
  protected readonly newMediaType = signal('Product Image');
  protected readonly newMediaUrl = signal('');

  protected readonly editingId = signal<string | null>(null);

  protected onUploadNewFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          this.newMediaUrl.set(result);
          if (!this.newMediaName()) {
            this.newMediaName.set(file.name.replace(/\.[^/.]+$/, ''));
          }
        }
      };
      reader.readAsDataURL(file);
    }
  }

  protected submitNewMedia(): void {
    if (!this.newMediaUrl() || !this.newMediaName()) return;

    this.contentService.addMediaAsset({
      name: this.newMediaName().trim(),
      url: this.newMediaUrl(),
      type: this.newMediaType(),
    });

    this.showToast('✅ Photo added to library successfully');
    this.resetAddForm();
  }

  protected onChangePhoto(asset: MediaAsset, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          this.contentService.updateMediaAsset(asset.id, { url: result });
          this.showToast(`📸 Photo updated for "${asset.name}"`);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  protected startEditing(asset: MediaAsset): void {
    this.editingId.set(asset.id);
  }

  protected saveEditing(asset: MediaAsset, newName: string, newType: string): void {
    this.contentService.updateMediaAsset(asset.id, { name: newName.trim(), type: newType });
    this.editingId.set(null);
    this.showToast(`✏️ Updated metadata for "${newName}"`);
  }

  protected cancelEditing(): void {
    this.editingId.set(null);
  }

  protected deleteMedia(asset: MediaAsset): void {
    if (confirm(`Are you sure you want to delete "${asset.name}" from media library?`)) {
      this.contentService.deleteMediaAsset(asset.id);
      this.showToast(`🗑️ Deleted "${asset.name}"`);
    }
  }

  protected copyPath(url: string): void {
    navigator.clipboard?.writeText(url);
    this.showToast(`📋 Path copied to clipboard`);
  }

  private resetAddForm(): void {
    this.isAdding.set(false);
    this.newMediaName.set('');
    this.newMediaType.set('Product Image');
    this.newMediaUrl.set('');
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
