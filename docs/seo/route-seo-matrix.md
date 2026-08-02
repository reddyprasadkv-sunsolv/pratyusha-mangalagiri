# Step 4 Route SEO Matrix

| Route           | Language                       | Render mode                  | Indexable | Title status            | Description status            | Canonical              | Hreflang                | Structured data                         | Sitemap status | Approval status     |
| --------------- | ------------------------------ | ---------------------------- | --------- | ----------------------- | ----------------------------- | ---------------------- | ----------------------- | --------------------------------------- | -------------- | ------------------- |
| `/`             | English (`en`)                 | Request-time SSR + hydration | Yes       | Reviewed draft applied  | Reviewed draft applied        | Self-referencing `/`   | `en`, `te`, `x-default` | `WebSite`, `WebPage`, visible `FAQPage` | Included       | CLIENT REVIEW DRAFT |
| `/te`           | Telugu (`te`)                  | Request-time SSR + hydration | Yes       | Reviewed draft applied  | Reviewed draft applied        | Self-referencing `/te` | `en`, `te`, `x-default` | `WebSite`, `WebPage`, visible `FAQPage` | Included       | CLIENT REVIEW DRAFT |
| Any other route | URL-derived English/Telugu 404 | Request-time SSR + hydration | No        | Bilingual utility title | Bilingual utility description | None                   | None                    | None                                    | Excluded       | Not applicable      |

The future English and Telugu legal paths are intentionally absent from both the Angular public route table and sitemap. They must not be activated until approved policy content exists.
