import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AdminAuthService } from '../../../../core/supabase/admin-auth.service';
import { PublicContentService } from '../../../public-site/content/public-content.service';
import { BackendStatus } from '../../components/backend-status/backend-status';

@Component({
  selector: 'app-admin-dashboard-page',
  standalone: true,
  imports: [BackendStatus, RouterLink],
  templateUrl: './admin-dashboard-page.html',
  styleUrl: './admin-dashboard-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardPage {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly auth = inject(AdminAuthService);
  private readonly contentService = inject(PublicContentService);

  protected readonly profile = computed(() => this.auth.state().profile);
  protected readonly productsCount = computed(() => this.contentService.content().products.length);
  protected readonly faqsCount = computed(() => this.contentService.content().faqs.length);

  protected readonly leadsCount = computed(() => {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const raw = localStorage.getItem('pratyusha_submitted_leads');
        return raw ? JSON.parse(raw).length : 0;
      } catch {
        return 0;
      }
    }
    return 0;
  });
}
