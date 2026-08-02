import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AdminEnvironmentStatusService } from '../../services/admin-environment-status.service';

@Component({
  selector: 'app-admin-backend-status',
  imports: [],
  templateUrl: './backend-status.html',
  styleUrl: './backend-status.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackendStatus {
  protected readonly backend = inject(AdminEnvironmentStatusService).status;
}
