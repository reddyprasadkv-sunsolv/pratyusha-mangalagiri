import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-admin-media-page',
  standalone: true,
  templateUrl: './admin-media-page.html',
  styleUrl: './admin-media-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminMediaPage {
  protected readonly toastMessage = signal<string | null>(null);

  protected readonly mediaAssets = signal([
    { name: 'Pratyusha Portrait', url: 'assets/images/people/client-traditional-saree.webp', type: 'Hero Portrait' },
    { name: 'Pyrite Crystal Bracelet', url: 'assets/images/products/pyrite-bracelet.webp', type: 'Product Image' },
    { name: 'Money Magnet Bracelet', url: 'assets/images/products/money-magnet-bracelet.webp', type: 'Product Image' },
    { name: 'Evil Eye Protection', url: 'assets/images/products/evil-eye-protection-bracelet.webp', type: 'Product Image' },
    { name: 'Success Combination', url: 'assets/images/products/success-bracelet.webp', type: 'Product Image' },
  ]);

  protected copyPath(url: string): void {
    navigator.clipboard?.writeText(url);
    this.toastMessage.set(`📋 Path copied: ${url}`);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
