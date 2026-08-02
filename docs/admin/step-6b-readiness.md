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

## Modules to implement next

Step 6B may implement approved editors one module at a time. It must not turn disabled navigation entries into links until each route, repository implementation, form validation, RLS verification, accessibility, audit behaviour, and automated test set is complete.

## Missing external dependencies

- Approved project link and applied migrations
- Successful local/CI pgTAP execution and generated `database.types.ts`
- Approved first-owner identity
- Verified public runtime configuration delivery
- Approved content/contact/legal/testimonial/credential inputs as applicable
- Agreed audit-writing and cache-invalidation strategy

## Required live testing

Use isolated non-production fixtures to verify owner, editor, inactive administrator, authenticated non-admin, session expiry, RLS reads/writes, Storage rules, and profile changes. Never weaken guards, seed a fake production owner, or use production customer data for tests.

Public content must remain local until a separate approved live-content switching step. Lead insertion, email delivery, appointments, payments, and PDFs remain outside Step 6B unless separately authorised.
