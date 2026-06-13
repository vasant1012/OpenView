# Tavant AI OpenView — PRD

## Original Problem Statement
Create a modern, modular, enterprise-grade web application UI called "Tavant AI OpenView" — a centralized hub to explore AI initiatives (POCs, MVPs, products), discover reusable assets, provide leadership visibility, and enable onboarding/collaboration. Hybrid of Airtable + Notion + internal AI portfolio dashboard.

## User Choices (Feb 2026)
- Data: Frontend-only with in-memory mock data (localStorage persistence)
- Submit/Update Initiative: Fully functional CRUD
- Auth: None (public demo)
- Design: Distinctive enterprise look (chose Swiss / high-contrast archetype)
- Charts: Recharts, professional

## Architecture
- Single-page React app (no backend used)
- React 19 + react-router-dom v7 routing
- Tailwind + shadcn/ui components (Accordion, Checkbox, Tabs)
- Recharts for Bar/Pie/Radar
- Sonner toaster
- DataContext (`/app/frontend/src/context/DataContext.jsx`) holds projects/assets/updates; persists to `localStorage` key `tavant-openview-v1`.
- Seed: 12 projects, 16 assets across 8 domains (`/app/frontend/src/data/mockData.js`)

## Routes
- `/` Home dashboard (hero, 6 KPIs, charts, recent updates, featured, onboarding block)
- `/explore` Explore Initiatives (left FilterPanel, search, sort, grid/list)
- `/projects/:id` Project Detail (Overview, Business Context, AI & Data, Delivery, Reusability, Insights, Discovery)
- `/assets` Asset Library (tabs by type, filter panel)
- `/assets/:id` Asset Detail
- `/onboarding` 5-step onboarding
- `/leadership` Executive view (KPI rollup, domain/capability/reuse charts, production list, watchlist)
- `/submit`, `/submit/:id` Submit / Update Initiative (4-section form)

## Reusable Components
MetricCard, ProjectCard, AssetCard, StatusBadge, Tag, FilterPanel, SectionBlock, CTAButtonGroup, Layout

## Implemented (Feb 12, 2026 — v1.0.0)
- All 8 routes built and tested end-to-end (100% pass)
- 6 clickable KPI cards with deep-link filters
- Bar/Pie/Radar Recharts visualizations
- AI capability tag cloud with dynamic sizing
- Global search (header) returning projects + assets
- State-driven filter panels (URL-hydrated on Explore)
- Tabs-driven Asset Library
- Functional Submit + Edit form with toast and validation
- localStorage persistence with reset
- Swiss / high-contrast design: Outfit + IBM Plex Sans + JetBrains Mono, blue-600 accent, sharp rounded-sm borders

## P1 — Deferred Backlog
- Bulk import / CSV upload for initiatives
- Saved filter presets (per-user)
- Project comparison view (side-by-side)
- Asset upload (real file storage)

## P2 — Future
- Role-based views (admin/leadership/contributor) with real auth
- AI-powered "similar initiatives" recommendations using embeddings
- Realtime activity feed via websocket
- Slack/Teams notifications on new submissions
- Analytics dashboards (engagement, contribution leaderboard)

## Next Actions (post-finish)
- Optional: Recharts ResponsiveContainer min-height polish to silence console warnings
- Add seed projects in additional domains if portfolio expands
