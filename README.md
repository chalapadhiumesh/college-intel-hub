# SVCE Placement Intelligence Hub — Phase 1 (UI only)

**College:** Sri Venkateswara College of Engineering (SVCE)

## Phase 1 scope

- **UI only.** All data comes from a single hardcoded TypeScript seed
  (`src/data/seedCompanies.ts`) plus the 10-level topic roadmaps in
  `src/data/skillTopics.ts`.
- **No backend.** No Supabase, no Lovable Cloud, no migrations, no tables,
  no edge functions, no Supabase client.
- **Fully public.** No login, no auth context, no protected routes, no
  logout button. Every URL is reachable directly by any visitor.
- **No college logo asset.** The hero uses a text wordmark plus a
  `SVCE · INTELLIGENCE PLATFORM` pill — there is no `public/svce.*` image
  and no `<img>` for the college anywhere.

## Stack note

The base template ships **TanStack Start v1** (TanStack Router file-based
routing, Tailwind v4). The original spec asked for Vite + React Router 6 +
Tailwind v3 — the same routes (`/`, `/company`, `/company/intelligence`,
`/company/skills`) and behavior are delivered using TanStack Router's
file-based equivalents:

| Spec route                | File                                  |
| ------------------------- | ------------------------------------- |
| `/`                       | `src/routes/index.tsx`                |
| `/company`                | `src/routes/company.tsx` (layout)     |
| `/company` index redirect | `src/routes/company.index.tsx`        |
| `/company/intelligence`   | `src/routes/company.intelligence.tsx` |
| `/company/skills`         | `src/routes/company.skills.tsx`       |

`<AppLayout>` lives in `company.tsx`, contains `<Outlet />`, and redirects
`/company` → `/company/intelligence`. If the selected company is missing
from `localStorage`, it navigates back to `/` — it never renders the 404
page. `notFoundComponent` only catches genuinely invalid URLs.

## Phase 2 (later, not yet shipped)

`src/lib/companyData.ts` already takes raw JSON shapes
(`short_json` / `full_json` / `skill_levels[]`) identical to what the
future Supabase JSONB columns will hold. Swapping Phase 1 → Phase 2 is a
one-file change: replace the `SEED_COMPANIES` lookup inside
`CompanyContext` with a TanStack Query call, and feed the rows straight
through the existing `normalizeCompanySummary` / `normalizeCompanyProfile`
/ `normalizeDashboardSkills` helpers.

## Env vars

- `VITE_LOGO_DEV_PUBLISHABLE_KEY` (optional). When set, `CompanyLogo`
  fetches from Logo.dev. Falls back to the seed `logo_url`, then to an
  initial-letter circle.
- **No** `VITE_SUPABASE_*` vars — Phase 1 has no Supabase.

## Hard guarantees

- No CTC, Stipend, or Selection-Ratio fields anywhere.
- No `/login` route, no `/dashboard` route.
- Selecting a company persists across browser refresh via the
  `selected-company` localStorage key.
