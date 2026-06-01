// ─────────────────────────────────────────────────────────────────────────────
// Home / Dashboard page data — all copy, metric card definitions, and section
// labels live here. The index route imports from this file; it never hardcodes
// strings in JSX.
// ─────────────────────────────────────────────────────────────────────────────
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  CheckCircle2,
  Layers,
  Library,
  PlayCircle,
  Rocket,
} from "lucide-react";

// ── Page meta ────────────────────────────────────────────────────────────────
export const HOME_META = {
  title: "Home · OpenView",
  description:
    "Triogenic AI OpenView — your hub for AI initiatives, reusable assets, and team activity.",
} as const;

// ── Page header ───────────────────────────────────────────────────────────────
export const HOME_HEADER = {
  eyebrow: "Home",
  title: "OpenView Dashboard",
  description:
    "A single window into every AI initiative, reusable asset, and update across the organization.",
} as const;

// ── Metric cards ─────────────────────────────────────────────────────────────
export type MetricTone = "primary" | "warning" | "info" | "success" | "reusable";

export interface MetricCardDef {
  key: "total" | "inProgress" | "completed" | "production" | "reusable" | "demo";
  label: string;
  icon: LucideIcon;
  to: string;
  search?: Record<string, unknown>;
  tone: MetricTone;
}

export const HOME_METRICS: MetricCardDef[] = [
  { key: "total",      label: "Total Initiatives", icon: Layers,      to: "/explore",                                      tone: "primary"  },
  { key: "inProgress", label: "In Progress",        icon: Activity,    to: "/explore", search: { status: ["In Progress"] }, tone: "warning"  },
  { key: "completed",  label: "Completed",           icon: CheckCircle2,to: "/explore", search: { status: ["Completed"]   }, tone: "info"     },
  { key: "production", label: "Production",          icon: Rocket,      to: "/explore", search: { status: ["Production"]  }, tone: "success"  },
  { key: "reusable",   label: "Reusable Assets",     icon: Library,     to: "/assets",                                      tone: "reusable" },
  { key: "demo",       label: "Demo Ready",          icon: PlayCircle,  to: "/assets",  search: { demo: ["Yes"]           }, tone: "info"     },
];

// ── Section titles ────────────────────────────────────────────────────────────
export const HOME_SECTIONS = {
  charts: [
    { title: "Status distribution", description: "Initiatives by lifecycle stage" },
    { title: "Domain mix",          description: "Where AI investment is landing"  },
    { title: "AI capabilities",     description: "What we're shipping with"        },
  ],
  recentUpdates:  { title: "Recent updates" },
  featured:       { title: "Featured reusable initiatives", description: "Battle-tested across multiple teams" },
  topReusable:    { title: "Top reusable initiatives",      description: "Ranked by average asset reuse score and demo availability." },
  startHere:      {
    title: "Start here",
    description: "New to OpenView? Take the 5-minute tour to learn how initiatives, assets, and contributors connect.",
    body: "Onboarding walks you through submitting an initiative, tagging it for discovery, and linking reusable assets so other teams can build on your work.",
  },
} as const;

// ── Badge labels ──────────────────────────────────────────────────────────────
export const HOME_BADGES = {
  productionReady:   "Production Ready",
  highReuseScore:    80,           // minimum score to show "High Reuse Potential"
  highReuseLabel:    "High Reuse Potential",
  demoLabel:         "▶ Demo",
} as const;

// ── Featured slice ────────────────────────────────────────────────────────────
export const HOME_FEATURED_LIMIT = 6;
export const HOME_TOP_REUSABLE_LIMIT = 4;
