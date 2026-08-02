import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AdminAuthService } from '../../../../core/supabase/admin-auth.service';
import { AdminNotifications } from '../../components/admin-notifications/admin-notifications';
import { BackendStatus } from '../../components/backend-status/backend-status';
import { AdminNavigationService } from '../../navigation/admin-navigation.service';
import { AdminNotificationService } from '../../services/admin-notification.service';
import { AdminProtectedCacheService } from '../../services/admin-protected-cache.service';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, BackendStatus, AdminNotifications],
  templateUrl: './admin-shell.html',
  styleUrl: './admin-shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminShell {
  private readonly auth = inject(AdminAuthService);
  private readonly navigationService = inject(AdminNavigationService);
  private readonly notifications = inject(AdminNotificationService);
  private readonly cache = inject(AdminProtectedCacheService);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild('drawerTrigger') private drawerTrigger?: ElementRef<HTMLButtonElement>;
  @ViewChild('drawerPanel') private drawerPanel?: ElementRef<HTMLElement>;

  protected readonly profile = computed(() => this.auth.state().profile);
  protected readonly navigation = computed(() => {
    const role = this.profile()?.role;
    return role ? this.navigationService.itemsFor(role) : [];
  });
  protected readonly drawerOpen = signal(false);
  protected readonly isDesktop = signal(false);

  constructor() {
    const mediaQuery = this.document.defaultView?.matchMedia('(min-width: 64rem)');
    if (mediaQuery) {
      this.isDesktop.set(mediaQuery.matches);
      const updateDesktopState = (event: MediaQueryListEvent) => this.isDesktop.set(event.matches);
      mediaQuery.addEventListener('change', updateDesktopState);
      this.destroyRef.onDestroy(() => mediaQuery.removeEventListener('change', updateDesktopState));
    }
  }

  protected openDrawer(): void {
    this.drawerOpen.set(true);
    queueMicrotask(() => this.drawerPanel?.nativeElement.focus());
  }

  protected closeDrawer(restoreFocus = true): void {
    this.drawerOpen.set(false);
    if (restoreFocus) {
      queueMicrotask(() => this.drawerTrigger?.nativeElement.focus());
    }
  }

  protected onDrawerKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeDrawer();
    }
  }

  protected async signOut(): Promise<void> {
    const succeeded = await this.auth.signOut();
    this.cache.clear();
    this.notifications.clear();
    this.notifications.add(
      succeeded ? 'success' : 'warning',
      succeeded
        ? 'You have been signed out securely.'
        : 'Your local administration session was cleared. The provider could not be reached.',
    );
    await this.router.navigate(['/admin/login'], {
      queryParams: { signedOut: '1' },
      replaceUrl: true,
    });
  }
}
