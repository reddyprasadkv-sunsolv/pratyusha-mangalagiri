# Supabase Setup and Safe Migration Procedure

## Current status

This repository is not linked to a Supabase project. No project was created or guessed, and no remote migration was applied.

## Prerequisites

- Node.js version pinned by the repository
- Supabase CLI installed from an approved official method
- Docker-compatible local container runtime
- An explicitly approved Supabase project reference for any remote operation
- Protected secret storage for CLI tokens/passwords

## Local workflow

From the repository root:

```bash
supabase start
supabase db reset --local
supabase db lint --local --level error
supabase test db --local
supabase gen types typescript --local --schema public > src/app/core/supabase/database.types.ts
```

`db reset --local` is destructive only to the disposable local stack. Never add `--linked` for production. Review the generated types before committing and regenerate them after every schema migration.

## Approved remote linking and migration

Only after the project owner supplies and confirms the exact project reference:

```bash
supabase login
supabase link --project-ref <approved-project-ref>
supabase migration list
supabase db push --dry-run
supabase db push
supabase db lint --linked --level error
supabase test db --linked
```

Before `db push`, compare migration history and inspect the dry-run for destructive operations or schema drift. Confirm the remote PostgreSQL major version and update `db.major_version` from the safe local default only when that project reports a different version. Do not include seed data on a production push. Never run `db reset --linked`, force replacement, or guessed-project commands.

## First-owner bootstrap

1. Create the owner account through the approved Supabase Auth administrator workflow—not public sign-up.
2. Obtain its UUID securely without copying email/password into repository files.
3. Through a controlled SQL operation performed by an authorized operator, insert `admin_profiles(user_id, display_name, role, is_active)` with the approved UUID, `owner`, and `true`.
4. Verify `current_admin_role()` returns owner only for that signed-in user.
5. Confirm a normal authenticated user and an editor cannot insert/update `admin_profiles`.
6. Remove temporary operational database access and retain only the normal owner workflow.

The migration deliberately provides no anonymous/self-bootstrap function and seeds no administrator.

## Type generation

No `database.types.ts` is committed yet because neither a local Supabase stack nor an approved linked project is available. Do not hand-author an incomplete substitute. Application-facing interfaces under `core/supabase` cover only the current foundation. Generate authoritative types with the local command above after migrations pass.

## Rollback guidance

Do not edit an already-applied migration or drop production data. Create a new forward migration that reverses the specific safe change. For a failed, unapplied local migration, correct it and rerun the disposable local reset. Back up and assess affected production data before any remote corrective migration.

## Production safety checklist

- Exact repository and branch confirmed
- Exact approved project reference confirmed
- Migration history and dry-run reviewed
- Backup/recovery plan confirmed
- RLS and grants verified for all 15 tables
- pgTAP and database lint pass
- Storage upload/read policies verified
- No anonymous lead insert or admin self-promotion
- No secrets, PII fixtures, source posters, or PDF support in the push
- First owner identity explicitly approved
