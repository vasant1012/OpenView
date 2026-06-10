
# OpenView — Plan

A modular, enterprise-grade UI for exploring AI initiatives and reusable assets. Built with the project's stack (TanStack Start + React + TS + Tailwind + shadcn/ui), styled to feel like a clean Material/enterprise system. All data is placeholder (in-memory) so screens are fully interactive without a backend.

## Tech & conventions
- Routing: TanStack Start file routes under `src/routes/` (the project uses TanStack, not Next.js — equivalent file-based routing).
- UI primitives: shadcn/ui + Tailwind, semantic tokens in `src/styles.css` (no hardcoded colors).
- Charts: Recharts (already in shadcn chart wrapper).
- State: local component state + URL search params (via `zodValidator`) for filters so links/KPIs deep-link into filtered views.
- Mock data: `src/data/initiatives.ts`, `src/data/assets.ts`, `src/data/activity.ts`.

## Routes
```
src/routes/
  __root.tsx                 # global shell: header + nav + outlet
  index.tsx                  # Home dashboard
  explore.tsx                # Explore Initiatives (filters via search params)
  projects.$projectId.tsx    # Project Detail
  assets.tsx                 # Asset Library (tabs + filters)
  assets.$assetId.tsx        # Asset Detail
  onboarding.tsx             # Onboarding landing
  leadership.tsx             # Leadership view (KPIs + charts, read-only)
  submit.tsx                 # Submit / Update form (static UI)
```

## Reusable components (`src/components/openview/`)
- Layout: `AppHeader`, `GlobalSearch`, `NavMenu`, `SectionBlock`, `PageHeader`
- Cards: `MetricCard`, `ProjectCard`, `AssetCard`
- Controls: `FilterPanel`, `FilterGroup`, `SortSelect`, `CTAButtonGroup`, `TabsBar`
- Display: `Badge` wrappers (`StatusBadge`, `MaturityBadge`, `ReusableBadge`, `DemoBadge`), `TagCloud`, `ActivityList`, `DetailLayout`
- Charts: `StatusBarChart`, `DomainPieChart`

## Screen specs

**Home (`/`)**
1. KPI grid of `MetricCard` (Total, In Progress, Completed, Production, Reusable Assets, Demo Ready). Each links to `/explore?status=...` or `/assets?demo=true`.
2. Overview: status bar chart + domain pie + AI-capability tag cloud.
3. `ActivityList` of recent updates.
4. Featured reusable initiatives — horizontal scroll of `ProjectCard`.
5. `CTAButtonGroup`: Submit / Update / Explore / Browse Assets.
6. Onboarding block linking to `/onboarding`.

**Explore (`/explore`)**
- Left `FilterPanel` (multi-select: Status, Type, Domain, AI Capability, Data Type, Maturity, Reusability, Demo, Deployment, Owner).
- Top: search input + `SortSelect` (Recent / Relevance / Reusability).
- Right: responsive grid of `ProjectCard`.
- Filters & search synced to URL search params; KPI cards from Home navigate here with prefilled filters.

**Project Detail (`/projects/$projectId`)**
- `DetailLayout` with `SectionBlock`s: Header, Overview, Business Context, AI & Data, Delivery & Architecture, Reusability & Assets, Insights, Discovery.
- CTAs: View Assets (→ `/assets?project=<id>`), Compare, Suggest Update.

**Asset Library (`/assets`)**
- `TabsBar`: All / Accelerators / Demos / Prompt Libraries / Templates / Code.
- `FilterPanel` (Asset Type, Domain, AI Capability, Maturity, Reuse Score, Demo Ready, Linked Project).
- Grid of `AssetCard`. Honors `?project=<id>` from Project Detail.

**Asset Detail (`/assets/$assetId`)**
- Sections: Header, Overview, Reusability, Technical Details, Documentation Links, Constraints, Related Assets.

**Onboarding, Leadership, Submit** — light scaffold pages using the same components so the IA is complete; Submit is a static multi-section form (no persistence).

## Design system
- Extend `src/styles.css` with enterprise tokens: surfaces, soft shadows, badge color tokens (status green/amber/gray, maturity blue, reusable accent). All via `oklch` semantic vars — no inline colors in components.
- Card-based layout, generous spacing, rounded-lg, subtle borders, hover lift.

## SEO / metadata
- Per-route `head()` with unique title + description for Home, Explore, Asset Library, Onboarding, Leadership, Submit, and dynamic detail pages.

## Out of scope (placeholder only)
- Auth / role-based views, real backend, AI recommendations, analytics ingestion. The UI is structured so these slot in later (Lovable Cloud) without refactoring components.

## Deliverable
A fully navigable, filterable, responsive OpenView UI with realistic mock data across all listed screens and reusable components ready to scale.
