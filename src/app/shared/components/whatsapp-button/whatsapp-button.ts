import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsappButton {
  readonly phoneNumber = input('917075986432');
  readonly displayPhone = input('+91 70759 86432');
  readonly message = input('Hello Pratyusha, I would like to inquire about your crystal bracelets and guidance.');

  get whatsappUrl(): string {
    const encoded = encodeURIComponent(this.message());
    return `https://wa.me/${this.phoneNumber()}?text=${encoded}`;
  }
}
