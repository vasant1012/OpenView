// ─────────────────────────────────────────────────────────────────────────────
// Site-wide constants — consumed by __root.tsx, AppHeader, and any component
// that needs the application name, nav structure, or global copy.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: "OpenView",
  org: "Triogenic AI",
  title: "OpenView — Triogenic AI Initiative Hub",
  description:
    "Centralized hub to explore AI initiatives, reusable assets, and leadership insights.",
  searchPlaceholder: "Search projects, assets, owners…",
} as const;

export const NAV_LINKS = [
  { to: "/",           label: "Home" },
  { to: "/explore",    label: "Explore Initiatives" },
  { to: "/assets",     label: "Asset Library" },
  { to: "/onboarding", label: "Onboarding" },
  { to: "/leadership", label: "Leadership" },
  { to: "/submit",     label: "Submit / Update" },
] as const;

export type NavLink = (typeof NAV_LINKS)[number];
