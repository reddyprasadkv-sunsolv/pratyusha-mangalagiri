import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  effect,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AdminAuthService } from '../../../../core/supabase/admin-auth.service';
import { AdminNotifications } from '../../components/admin-notifications/admin-notifications';
import { BackendStatus } from '../../components/backend-status/backend-status';
import { AdminEnvironmentStatusService } from '../../services/admin-environment-status.service';
import { AdminErrorService } from '../../services/admin-error.service';
import { AdminNotificationService } from '../../services/admin-notification.service';
import { safeAdminReturnUrl } from '../../utilities/safe-return-url';

@Component({
  selector: 'app-admin-login-page',
  imports: [ReactiveFormsModule, BackendStatus, AdminNotifications],
  templateUrl: './admin-login-page.html',
  styleUrl: './admin-login-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLoginPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(AdminAuthService);
  private readonly errors = inject(AdminErrorService);
  private readonly notifications = inject(AdminNotificationService);
  private readonly environment = inject(AdminEnvironmentStatusService);

  @ViewChild('emailInput') private emailInput?: ElementRef<HTMLInputElement>;
  @ViewChild('formError') private formError?: ElementRef<HTMLElement>;

  protected readonly showPassword = signal(false);
  protected readonly canSignIn = this.environment.canSignIn;
  protected readonly authState = this.auth.state;
  protected readonly isSubmitting = computed(() => this.auth.state().status === 'authenticating');
  protected readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    password: ['', [Validators.required, Validators.maxLength(256)]],
  });
  constructor() {
    effect(() => {
      if (this.canSignIn()) {
        this.loginForm.enable({ emitEvent: false });
      } else {
        this.loginForm.disable({ emitEvent: false });
      }
    });
    void this.auth.ensureInitialized();
  }

  protected togglePasswordVisibility(): void {
    this.showPassword.update((visible) => !visible);
  }

  protected async submit(): Promise<void> {
    if (!this.canSignIn() || this.isSubmitting()) {
      return;
    }

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.emailInput?.nativeElement.focus();
      return;
    }

    const credentials = this.loginForm.getRawValue();
    await this.auth.signIn(credentials.email, credentials.password);
    const state = this.auth.state();
    if (state.status === 'authenticated') {
      this.loginForm.reset();
      this.notifications.add('success', 'Sign-in completed securely.');
      const returnUrl = safeAdminReturnUrl(this.route.snapshot.queryParamMap.get('returnUrl'));
      await this.router.navigateByUrl(returnUrl, { replaceUrl: true });
      return;
    }

    this.notifications.add('error', state.safeMessage ?? this.errors.messageFor(state.errorCode));
    queueMicrotask(() => this.formError?.nativeElement.focus());
  }

  protected emailError(): string | null {
    const control = this.loginForm.controls.email;
    if (!control.touched || !control.errors) {
      return null;
    }
    if (control.hasError('required')) {
      return 'Email is required.';
    }
    if (control.hasError('email')) {
      return 'Enter a valid email address.';
    }
    return 'Email must be 254 characters or fewer.';
  }

  protected passwordError(): string | null {
    const control = this.loginForm.controls.password;
    if (!control.touched || !control.errors) {
      return null;
    }
    if (control.hasError('required')) {
      return 'Password is required.';
    }
    return 'Password must be 256 characters or fewer.';
  }
}
