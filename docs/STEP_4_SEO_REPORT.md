# Step 4 — Angular SSR and Bilingual Technical SEO Report

## Scope and baseline

- Repository: `reddyprasadkv-sunsolv/pratyusha-mangalagiri`
- Branch: `feature/angular-premium-sales-page`
- Verified baseline: `6001b9f38c87066e3ba8d2a4e5e775cfc21ced55`
- Implementation date: 2 August 2026
- Content status: CLIENT REVIEW DRAFT
- Scope exclusions retained: no Supabase, backend administration, email, payments, appointments, PDF features, React runtime, pull request, merge, or deployment.

The pre-change response findings were recorded before implementation in `docs/seo/initial-ssr-findings.md`.

## Rendering strategy

The public English route (`/`), Telugu route (`/te`), and unknown routes use Angular request-time server rendering through `RenderMode.Server`. Client hydration with event replay remains enabled. No route is statically prerendered and no draft/admin/preview content is emitted at build time.

The locale starts from the requested route on both server and browser. Browser storage is written only after a user action or route application and is accessed through `DOCUMENT.defaultView` behind platform checks. This removes the earlier stored-locale versus requested-URL hydration risk. The in-memory enquiry draft service preserves entered form values across `/` ↔ `/te` component recreation without persisting personal data to browser storage.

## Public routes and indexability

- `/`: public English homepage, indexable.
- `/te`: public Telugu homepage, indexable.
- `/sitemap.xml`: runtime XML sitemap endpoint.
- `/robots.txt`: runtime crawler-policy endpoint.
- Any other page route: real HTTP 404, accessible bilingual content, `noindex, nofollow`, no canonical, no alternate links, and no JSON-LD.

Draft legal paths are not public routes, footer links, or sitemap entries. Admin and preview routes are not added.

## English metadata

- Title: `Crystal Bracelets with 21-Day Guidance | Pratyusha`
- Description: reviewed English CLIENT REVIEW DRAFT from the content approval documents.
- Canonical path: `/`
- HTML language: `en`
- Open Graph locale: `en_IN`; alternate: `te_IN`
- Twitter/X card: `summary_large_image`

## Telugu metadata

- Title: `21-Day మార్గదర్శనంతో క్రిస్టల్ బ్రేస్‌లెట్లు | Pratyusha`
- Description: reviewed Telugu CLIENT REVIEW DRAFT from the content approval documents.
- Canonical path: `/te`
- HTML language: `te`
- Open Graph locale: `te_IN`; alternate: `en_IN`
- Twitter/X card: `summary_large_image`

English and Telugu values are independently authored fields; they are never mixed or auto-translated at runtime.

## Canonical and hreflang mappings

Absolute URLs are built from the validated `PUBLIC_SITE_URL` server value. Both public pages emit exactly one self-referencing canonical and these reciprocal alternate links:

- `hreflang="en"` → `/`
- `hreflang="te"` → `/te`
- `hreflang="x-default"` → `/`

Managed metadata is removed before navigation updates, preventing duplicate canonical, alternate, description, social, or JSON-LD elements.

## Open Graph and Twitter/X status

Both languages emit reviewed title and description fields, URL, type, site name, primary locale, alternate locale, and Twitter/X card/title/description. No Twitter/X handle is published because none is approved.

No approved 1200×630 social-sharing image is present. Therefore `og:image`, `og:image:alt`, `twitter:image`, and `twitter:image:alt` are intentionally omitted. The portrait, source posters, and generated collage are not substituted because their dimensions/content or claim treatment are not approved for social metadata.

## Structured data

Each public page emits one JSON-LD `@graph` containing:

- `WebSite`
- language-specific `WebPage`
- `FAQPage`, built directly from the three FAQs visibly rendered in that language

The schema intentionally excludes `Person`, `Organization`, `Product`, `Offer`, `Review`, `AggregateRating`, credentials, testimonials, prices, availability, commerce details, and unapproved contact information. FAQ questions hidden from the UI are not emitted.

## Sitemap and robots

`/sitemap.xml` is generated without an extra runtime dependency. It includes exactly `/` and `/te`, reciprocal `en`/`te`/`x-default` alternates, and no fabricated `lastmod`. It excludes admin, preview, unknown, and draft legal routes.

The production indexing policy allows public resources, does not block `/te`, identifies the sitemap, and disallows `/admin`, `/preview`, and `/api/internal`. When `PUBLIC_INDEXING_ENABLED=false`, `robots.txt` disallows crawling and Angular page responses receive `X-Robots-Tag: noindex, nofollow`.

## 404 handling

The wildcard Angular route loads a lightweight bilingual not-found component. Angular SSR returns HTTP 404 and `X-Robots-Tag: noindex, nofollow`; the rendered document also contains a `noindex, nofollow` meta directive. It has a single H1, useful explanatory text, and a language-appropriate link to the public homepage.

## SSR, hydration, and semantic validation

Production SSR response-body checks confirm both `/` and `/te` include a title, description, canonical, three alternate links, Open Graph/Twitter metadata, JSON-LD, one visible H1, correct `html lang`, and page content before hydration. Playwright detected no page errors, visible application error, hydration warning, or NG05xx warning. Client-side language navigation updates metadata without duplicates and retains the enquiry draft.

The page retains its existing landmarks, header/navigation, one H1, ordered H2/H3 content, accessible mobile menu, FAQ accordion, skip link, visible focus states, and language switcher. The 404 adds a single accessible H1. No unnecessary visual redesign was introduced.

## Performance findings

- Request-time SSR returns useful public HTML without waiting for JavaScript.
- The SEO layer uses Angular platform services and small local functions; no SEO or sitemap dependency was installed.
- Production browser initial bundle: approximately 359.62 kB raw / 94.21 kB estimated transfer during validation.
- The existing public-page component stylesheet remains 11.78 kB and triggers the configured 8 kB warning threshold, but stays below the 12 kB build error threshold.
- Google Fonts CSS inlining requires network access during production builds, as it did before Step 4.

## Environment configuration

| Variable                  | Required deployment use                                                                                  | Secret? |
| ------------------------- | -------------------------------------------------------------------------------------------------------- | ------- |
| `PUBLIC_SITE_URL`         | Approved absolute public origin for canonical, alternate, social URL, schema, sitemap, and robots output | No      |
| `PUBLIC_INDEXING_ENABLED` | `true` for approved production indexing; `false` for preview/staging                                     | No      |
| `NG_ALLOWED_HOSTS`        | Optional comma-separated additional SSR hosts                                                            | No      |

The source contains no localhost production metadata. When no public URL is configured for an HTTP request, the server accepts only an allowlisted request host before deriving its origin.

## Future legal-route activation procedure

1. Obtain final client/legal approval for each complete English and Telugu policy.
2. Add explicit Angular routes and SSR route policies; do not use placeholders.
3. Add self-canonical and reciprocal language mappings for each real equivalent pair.
4. Add approved footer links.
5. Add only published, indexable policy routes to the sitemap.
6. Add route, SSR response, `html lang`, canonical, alternate, accessibility, and 404 regression tests.
7. Update `docs/seo/route-seo-matrix.md` and obtain a final indexing review.

## Future Supabase SEO-field mapping

The typed local model is ready to map later to these separate fields without adding Supabase in Step 4:

`meta_title_en`, `meta_title_te`, `meta_description_en`, `meta_description_te`, `og_title_en`, `og_title_te`, `og_description_en`, `og_description_te`, `og_image_url`, `og_image_alt_en`, `og_image_alt_te`, `canonical_path_en`, `canonical_path_te`, `robots_directive`, `is_indexable`, and `is_published`.

Database access, RLS, preview/publish workflows, cache invalidation, and administrative validation remain future work.

## Validation results

- Clean dependency installation: passed; npm reported three moderate transitive advisories, with no forced dependency change made.
- Prettier format check: passed.
- ESLint: passed with no disabled rules or warnings.
- TypeScript: passed for application, unit-test, and E2E configurations.
- Vitest: 9 files, 33 tests passed.
- Playwright: 27 tests passed against the production SSR server.
- Production SSR build: passed with the existing stylesheet budget warning documented above.

The production build, server-response inspection, and browser suite were run after the form-draft SSR/navigation fix. Formatting, lint, type-check, and Vitest were rerun immediately before the commit review.

## Missing approved inputs and known limitations

- Final production public domain / `PUBLIC_SITE_URL` deployment value.
- Approved 1200×630 Open Graph/Twitter image and bilingual image alt approval.
- Final approval of English and Telugu SEO text currently labelled CLIENT REVIEW DRAFT.
- Approved legal policy content and route publication decision.
- Approved public contact information, professional description/credentials, testimonials, prices, availability, shipping, payment, and 21-day delivery details remain unavailable and therefore absent.
- Sitemap and robots are served by the production Express SSR entry; Angular's development server is not used to validate those production endpoints.
