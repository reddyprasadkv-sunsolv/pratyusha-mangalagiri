import { mapSupabaseAuthError } from './supabase-errors';

describe('mapSupabaseAuthError', () => {
  it('does not expose provider messages or sensitive details', () => {
    const mapped = mapSupabaseAuthError(new Error('credential=value; internal stack detail'));

    expect(mapped).toEqual({ code: 'unknown', message: 'Sign-in could not be completed.' });
    expect(mapped.message).not.toContain('credential');
    expect(mapped.message).not.toContain('value');
  });
});
