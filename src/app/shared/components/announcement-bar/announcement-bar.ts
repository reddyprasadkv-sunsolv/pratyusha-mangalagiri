import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-announcement-bar',
  standalone: true,
  templateUrl: './announcement-bar.html',
  styleUrl: './announcement-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementBar {
  readonly message = input.required<string>();
  readonly actionLabel = input.required<string>();
  readonly actionHref = input('#contact');
  readonly closeLabel = input('Close announcement');
  readonly dismissible = input(false);
  readonly dismiss = output<void>();
}
