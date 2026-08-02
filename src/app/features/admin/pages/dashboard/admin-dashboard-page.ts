import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { AdminAuthService } from '../../../../core/supabase/admin-auth.service';
import { BackendStatus } from '../../components/backend-status/backend-status';

@Component({
  selector: 'app-admin-dashboard-page',
  imports: [BackendStatus],
  templateUrl: './admin-dashboard-page.html',
  styleUrl: './admin-dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardPage {
  private readonly auth = inject(AdminAuthService);
  protected readonly profile = computed(() => this.auth.state().profile);
}
