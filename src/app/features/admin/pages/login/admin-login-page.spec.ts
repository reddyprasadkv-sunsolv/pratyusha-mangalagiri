import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AdminAuthService } from '../../../../core/supabase/admin-auth.service';
import { AdminSessionState } from '../../../../core/supabase/supabase.models';
import { DISABLED_SUPABASE_CONFIG } from '../../../../core/supabase/supabase.config';
import { SUPABASE_CONFIG } from '../../../../core/supabase/supabase.tokens';
import { AdminEnvironmentStatusService } from '../../services/admin-environment-status.service';
import { AdminLoginPage } from './admin-login-page';

describe('AdminLoginPage', () => {
  it('renders safely, disables sign-in, and makes no request while Supabase is disabled', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const fixture = await createDisabledFixture();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('Administration Login');
    expect(element.textContent).toContain(
      'Administration is not available until the approved Supabase backend is configured.',
    );
    expect((element.querySelector('button[type="submit"]') as HTMLButtonElement).disabled).toBe(
      true,
    );
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it('fails safely without exposing values when enabled configuration is incomplete', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const fixture = await createConfigurationFixture({
      enabled: true,
      url: null,
      anonKey: null,
      status: 'missing',
    });
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Administration configuration is incomplete');
    expect(text).not.toContain('anonKey');
    expect(text).not.toContain('SUPABASE_URL');
    expect(
      (fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement).disabled,
    ).toBe(true);
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it('requires an email and rejects an invalid email address', async () => {
    const { fixture } = await createReadyFixture();

    submit(fixture);
    expect(fixture.nativeElement.textContent).toContain('Email is required.');

    setInput(fixture, '#admin-email', 'not-an-email');
    submit(fixture);
    expect(fixture.nativeElement.textContent).toContain('Enter a valid email address.');
  });

  it('requires a password', async () => {
    const { fixture } = await createReadyFixture();
    setInput(fixture, '#admin-email', 'approved@example.test');

    submit(fixture);

    expect(fixture.nativeElement.textContent).toContain('Password is required.');
  });

  it('shows and hides the password without submitting the form', async () => {
    const { fixture, auth } = await createReadyFixture();
    const password = fixture.nativeElement.querySelector('#admin-password') as HTMLInputElement;
    const toggle = fixture.nativeElement.querySelector(
      'button[aria-label="Show password"]',
    ) as HTMLButtonElement;

    expect(toggle.type).toBe('button');
    toggle.click();
    fixture.detectChanges();
    expect(password.type).toBe('text');
    expect(toggle.getAttribute('aria-label')).toBe('Hide password');
    expect(auth.signIn).not.toHaveBeenCalled();

    toggle.click();
    fixture.detectChanges();
    expect(password.type).toBe('password');
  });

  it('does not log credentials and exposes no public signup control', async () => {
    const { fixture, auth } = await createReadyFixture();
    const consoleSpies = [
      vi.spyOn(console, 'log'),
      vi.spyOn(console, 'warn'),
      vi.spyOn(console, 'error'),
    ];
    setInput(fixture, '#admin-email', 'approved@example.test');
    setInput(fixture, '#admin-password', 'synthetic-test-password');

    submit(fixture);
    await fixture.whenStable();

    expect(auth.signIn).toHaveBeenCalledWith('approved@example.test', 'synthetic-test-password');
    const loggedOutput = consoleSpies.flatMap((spy) => spy.mock.calls.flat()).join(' ');
    expect(loggedOutput).not.toContain('approved@example.test');
    expect(loggedOutput).not.toContain('synthetic-test-password');
    expect(fixture.nativeElement.querySelector('[data-action="signup"]')).toBeNull();
    expect(fixture.nativeElement.textContent.toLowerCase()).not.toContain('create account');
    consoleSpies.forEach((spy) => spy.mockRestore());
  });
});

async function createDisabledFixture(): Promise<ComponentFixture<AdminLoginPage>> {
  return createConfigurationFixture(DISABLED_SUPABASE_CONFIG);
}

async function createConfigurationFixture(
  config:
    | typeof DISABLED_SUPABASE_CONFIG
    | {
        readonly enabled: true;
        readonly url: null;
        readonly anonKey: null;
        readonly status: 'missing';
      },
): Promise<ComponentFixture<AdminLoginPage>> {
  TestBed.configureTestingModule({
    imports: [AdminLoginPage],
    providers: [provideRouter([]), { provide: SUPABASE_CONFIG, useValue: config }],
  });
  const fixture = TestBed.createComponent(AdminLoginPage);
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();
  return fixture;
}

async function createReadyFixture() {
  const state = signal<AdminSessionState>({
    status: 'signed-out',
    profile: null,
    errorCode: null,
    safeMessage: null,
  });
  const auth = {
    state: state.asReadonly(),
    ensureInitialized: vi.fn().mockResolvedValue(undefined),
    signIn: vi.fn().mockResolvedValue(undefined),
  };
  const environment = {
    canSignIn: signal(true).asReadonly(),
    status: signal({
      status: 'authentication-required',
      label: 'Sign-in required',
      message: 'Sign in with an approved administrator account.',
      tone: 'neutral',
    }).asReadonly(),
  };
  TestBed.configureTestingModule({
    imports: [AdminLoginPage],
    providers: [
      provideRouter([]),
      { provide: AdminAuthService, useValue: auth },
      { provide: AdminEnvironmentStatusService, useValue: environment },
    ],
  });
  const fixture = TestBed.createComponent(AdminLoginPage);
  fixture.detectChanges();
  await fixture.whenStable();
  return { fixture, auth, state };
}

function setInput(
  fixture: ComponentFixture<AdminLoginPage>,
  selector: string,
  value: string,
): void {
  const input = fixture.nativeElement.querySelector(selector) as HTMLInputElement;
  input.value = value;
  input.dispatchEvent(new Event('input'));
  fixture.detectChanges();
}

function submit(fixture: ComponentFixture<AdminLoginPage>): void {
  const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
  form.dispatchEvent(new Event('submit'));
  fixture.detectChanges();
}
