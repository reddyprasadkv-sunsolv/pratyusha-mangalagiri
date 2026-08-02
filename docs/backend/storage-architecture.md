# Supabase Storage Architecture

Both buckets are created private-by-default. Public delivery is allowed through an RLS SELECT policy only after a matching `media_assets` row is approved, published, and marked public. This prevents a merely uploaded draft from becoming reachable through an unrestricted public-bucket URL.

| Bucket                  |  Limit | Formats               | Read policy                                                         | Write policy             |
| ----------------------- | -----: | --------------------- | ------------------------------------------------------------------- | ------------------------ |
| `public-media`          |  5 MiB | JPEG, PNG, WebP, AVIF | Anonymous/authenticated only for matching published public metadata | Active editor/owner only |
| `private-source-assets` | 10 MiB | JPEG, PNG, WebP, AVIF | Active editor/owner only                                            | Active editor/owner only |

SVG, HTML, executables, PDF, and unknown MIME types are excluded at both bucket and metadata-schema levels. No source poster is uploaded automatically.

## Public folder structure

- `products/`
- `founder/`
- `seo/`
- `legal/`
- `general/`

Storage policies validate the file extension and folder. Bucket MIME/size configuration provides a second enforcement layer. Application code must create/update the matching metadata record as draft, complete review, transition it to approved, and only then publish it. Deleting or replacing published media must account for referencing rows before removing the object.

Private source material must never be converted into a public URL without a separate approved derivative and media record. The existing repository posters remain outside Supabase and outside Angular's public bundle.
