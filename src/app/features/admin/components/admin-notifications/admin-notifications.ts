import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AdminNotificationService } from '../../services/admin-notification.service';

@Component({
  selector: 'app-admin-notifications',
  imports: [],
  templateUrl: './admin-notifications.html',
  styleUrl: './admin-notifications.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminNotifications {
  protected readonly notifications = inject(AdminNotificationService);
}
