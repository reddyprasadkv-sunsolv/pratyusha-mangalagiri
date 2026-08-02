import { computed, Injectable, signal } from '@angular/core';

import { AdminNotification } from '../models/admin.models';

@Injectable({ providedIn: 'root' })
export class AdminNotificationService {
  private readonly notificationsState = signal<readonly AdminNotification[]>([]);
  private nextId = 1;

  readonly notifications = this.notificationsState.asReadonly();
  readonly hasNotifications = computed(() => this.notificationsState().length > 0);

  add(variant: AdminNotification['variant'], message: string, dismissible = true): number {
    const id = this.nextId++;
    this.notificationsState.update((items) => [...items, { id, variant, message, dismissible }]);
    return id;
  }

  dismiss(id: number): void {
    this.notificationsState.update((items) => items.filter((item) => item.id !== id));
  }

  clear(): void {
    this.notificationsState.set([]);
  }
}
