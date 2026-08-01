import { ChangeDetectionStrategy, Component, input } from '@angular/core';

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
}
