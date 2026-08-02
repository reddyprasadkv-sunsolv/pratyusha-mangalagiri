import { TestBed } from '@angular/core/testing';

import { AdminNavigationService } from './admin-navigation.service';

describe('AdminNavigationService', () => {
  it('hides owner-only entries from editors', () => {
    const navigation = TestBed.inject(AdminNavigationService).itemsFor('editor');

    expect(navigation.map((item) => item.id)).not.toContain('administrators');
    expect(navigation.map((item) => item.id)).not.toContain('audit');
    expect(navigation.find((item) => item.id === 'dashboard')?.enabled).toBe(true);
  });

  it('shows owner-only entries to owners but leaves future routes disabled', () => {
    const navigation = TestBed.inject(AdminNavigationService).itemsFor('owner');

    expect(navigation.map((item) => item.id)).toContain('administrators');
    expect(navigation.map((item) => item.id)).toContain('audit');
    expect(navigation.filter((item) => !item.enabled).every((item) => item.route === null)).toBe(
      true,
    );
  });
});
