# Application structure

This scaffold reserves feature boundaries without implementing product UI in Step 1.

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

Feature implementation begins only after this scaffold is approved.
