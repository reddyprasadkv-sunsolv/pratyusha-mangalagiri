# Security policy

## Reporting a vulnerability

Do not disclose suspected vulnerabilities in a public issue. Contact the repository owner through a private GitHub channel and include the affected version, reproduction steps, impact, and any suggested mitigation. Do not include real customer records or live credentials in the report.

## Supported code

Security fixes are applied to the current default branch and active production release branches. This scaffold branch is pre-production and should not be deployed until application features, authentication, authorization, storage, and operational controls are reviewed.

## Engineering requirements

- Keep credentials and private configuration in ignored local or deployment environment files.
- Never expose server-only or service-role credentials to the Angular browser bundle.
- Validate, normalize, and rate-limit lead submissions on a trusted server boundary.
- Enforce authorization server-side for every administrative, content, media, lead, legal, and settings operation.
- Use secure cookies or an equivalently reviewed session mechanism for privileged access.
- Restrict uploaded file types and sizes, generate server-controlled object names, and scan content before publication.
- Keep dependencies current and review lockfile changes before merging.
- Avoid storing customer data in logs, browser storage, analytics payloads, or test fixtures.

## Secrets response

If a secret is committed or exposed, revoke and rotate it immediately, remove it from active deployments, assess access logs, and notify the repository owner. Removing the value from a later commit is not sufficient by itself.
