import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-cookie-notice',
  standalone: true,
  templateUrl: './cookie-notice.html',
  styleUrl: './cookie-notice.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieNotice {
  readonly title = input.required<string>();
  readonly body = input.required<string>();
  readonly acceptLabel = input.required<string>();
  readonly settingsLabel = input.required<string>();
  readonly accept = output<void>();
  readonly openSettings = output<void>();
}
