import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-legal-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-legal-page.html',
  styleUrl: './admin-legal-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLegalPage {
  protected readonly toastMessage = signal<string | null>(null);

  protected readonly privacyPolicy = signal(
    'Pratyusha Mangalagiri values customer privacy. All consultations and order details are strictly confidential.',
  );
  protected readonly termsOfService = signal(
    'By booking a consultation or purchasing crystal bracelets, you agree to our studio terms.',
  );
  protected readonly refundPolicy = signal(
    'Custom activated crystal bracelets are non-refundable once activated in sacred ritual.',
  );

  protected saveLegal(): void {
    this.showToast('✅ Legal policies updated live!');
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
