# Step 6B Readiness

## Ready foundations

- Client-rendered `/admin` route boundary with noindex protection
- Email/password authentication, restoration, auth-state subscription, and sign-out
- Active profile validation with owner/editor roles
- Fail-closed guards and safe internal return URLs
- Responsive shell, navigation, backend status, notifications, and dashboard
- Capability mapping for editor and owner
- Strongly typed repository contracts for page sections, products, ritual items, FAQs, founder profiles, testimonials, contacts, SEO, legal pages, media, leads, administrators, audit logs, and settings
- Existing database RLS, publication validation, Storage controls, and local public-content fallback
- Approved Mumbai project with matched five-migration history and clean database lint
- 30/30 live pgTAP assertions and generated remote TypeScript types
- Browser-safe runtime configuration verified in configured and disabled modes
- Supported first-owner invitation sent with a matching active `owner` profile
- First-owner invitation confirmed and initial Supabase Auth sign-in recorded

## Modules to implement next

Step 6B may implement approved editors one module at a time. It must not turn disabled navigation entries into links until each route, repository implementation, form validation, RLS verification, accessibility, audit behaviour, and automated test set is complete.

## Pending live verification

- Private password establishment or recovery for Angular email/password login
- Live owner login, profile RPC, dashboard, refresh restoration, sign-out, and back-navigation validation
- Approved content/contact/legal/testimonial/credential inputs as applicable
- Agreed audit-writing and cache-invalidation strategy

## Required live testing

Use isolated non-production fixtures to verify owner, editor, inactive administrator, authenticated non-admin, session expiry, RLS reads/writes, Storage rules, and profile changes. Never weaken guards, seed a fake production owner, or use production customer data for tests.

Public content must remain local until a separate approved live-content switching step. Lead insertion, email delivery, appointments, payments, and PDFs remain outside Step 6B unless separately authorised.

## Readiness decision

**STEP 6B READY FOR LIVE OWNER VERIFICATION.** The approved project, migrations, RLS, Storage, pgTAP suite, generated types, runtime configuration, confirmed Auth invitation, and matching active owner profile pass the readiness criteria. Complete the password-based Angular login and live owner session checks before relying on owner-only CMS operations.
