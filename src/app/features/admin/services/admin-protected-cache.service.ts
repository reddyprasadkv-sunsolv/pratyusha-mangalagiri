import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AdminProtectedCacheService {
  private readonly revisionState = signal(0);
  readonly revision = this.revisionState.asReadonly();

  clear(): void {
    this.revisionState.update((revision) => revision + 1);
  }
}
