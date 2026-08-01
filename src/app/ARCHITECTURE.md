# Application structure

The application keeps reusable design primitives separate from public feature composition.

- `core/`: application-wide services, guards, interceptors, and configuration
- `shared/`: reusable presentation components, directives, pipes, and utilities
- `layout/`: public and administrative shells
- `features/public-site/`: bilingual public sales experience
- `features/admin/`: protected administrative shell
- `features/content/`: bilingual content models and content workflows
- `features/media/`: media library and asset metadata
- `features/leads/`: lead capture and lead administration
- `features/legal/`: bilingual legal routes and content
- `features/settings/`: site, integration, and account settings

The Step 2 public preview is implemented under `features/public-site/design-system-page`. Shared components remain input-driven and backend-independent so future public, legal, and administrative pages can reuse them.
