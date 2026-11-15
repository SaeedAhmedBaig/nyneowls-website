# Nyne Owls

The Nyne Owls website is built with Next.js, TypeScript, Tailwind CSS and Supabase.

## Project structure

- `app/` contains the Next.js App Router entrypoints, route metadata, API routes and sitemap.
- `frontend/` contains page implementations, shared UI components, content and browser-safe utilities.
- `backend/` contains server-only blog and email services, data access and server actions.
- `supabase/migrations/` contains database schema changes applied to the hosted Supabase project.
- `public/` contains static assets served by Next.js.

The site remains one Next.js application and one Vercel deployment. `app/` stays at the
repository root because it is the framework's route entrypoint; it delegates page rendering
to `frontend/` and server work to `backend/`.

## Local development

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Journal CMS setup

The public journal is available at `/blog`; authorised editors sign in at `/admin/login`.
Posts, drafts and citations are stored in Supabase. The admin interface supports creating,
editing, publishing, unpublishing and deleting articles, plus tags, cover-image URLs,
search metadata, rich text and numbered source citations.

1. Create a Supabase project on its free plan.
2. In the Supabase SQL Editor, run `supabase/migrations/20261115000000_create_blog.sql`.
3. Create and verify an editor account in Supabase Authentication. Keep public sign-ups disabled.
4. Copy `.env.example` to `.env.local` and fill in the project URL, anon key, service-role key
   and a comma-separated `BLOG_ADMIN_EMAILS` allowlist. The allowlist must include the editor
   account's email. Never expose or commit `SUPABASE_SERVICE_ROLE_KEY`.
5. Restart the Next.js server. Add the same variables to the production hosting environment
   before deploying.

The anon key is used only for public reads, and row-level security limits those reads to
published posts and their citations. Draft and write operations run on the server after the
authenticated user's email is checked against `BLOG_ADMIN_EMAILS`.

The service-role key is a high-privilege secret. Store it only in local/server environment
settings. If it is ever exposed, rotate it in Supabase immediately.

## Validation

```powershell
npm run lint
npm run build
```
