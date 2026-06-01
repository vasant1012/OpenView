// ─────────────────────────────────────────────────────────────────────────────
// Onboarding page data — step cards, role paths, section copy, and CTA text.
// The onboarding route imports from here; no content is hardcoded in JSX.
// ─────────────────────────────────────────────────────────────────────────────
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Database,
  Presentation,
  Sparkles,
  Users,
} from "lucide-react";

// ── Page meta ────────────────────────────────────────────────────────────────
export const ONBOARDING_META = {
  title: "Onboarding · OpenView",
  description:
    "Get oriented to OpenView — how to submit, discover, and reuse AI initiatives.",
} as const;

// ── Page header ───────────────────────────────────────────────────────────────
export const ONBOARDING_HEADER = {
  eyebrow: "Onboarding",
  title: "Start here",
  description: "A 5-minute tour of OpenView for new contributors, owners, and leaders.",
} as const;

// ── Core steps ────────────────────────────────────────────────────────────────
export interface OnboardingStep {
  icon: LucideIcon;
  title: string;
  body: string;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    icon: BookOpen,
    title: "Learn the model",
    body: "Initiatives, assets, and contributors are the three core objects. Everything links back to them.",
  },
  {
    icon: Sparkles,
    title: "Submit your initiative",
    body: "Use the Submit form to register a POC, MVP, or production product. Tag it for discovery.",
  },
  {
    icon: Users,
    title: "Connect with the community",
    body: "Browse the Asset Library to find reusable accelerators before you build from scratch.",
  },
];

// ── Role-based paths ──────────────────────────────────────────────────────────
export interface RolePath {
  icon: LucideIcon;
  role: string;
  accent: string;
  items: ReadonlyArray<{ label: string; to: string; search: Record<string, unknown> }>;
}

export const ROLE_PATHS: RolePath[] = [
  {
    icon: Database,
    role: "Data Scientist",
    accent: "bg-primary/10 text-primary",
    items: [
      { label: "Explore reusable assets", to: "/assets",  search: {} },
      { label: "Find similar projects",   to: "/explore", search: { sort: "reusability" } },
    ],
  },
  {
    icon: Presentation,
    role: "Pre-sales",
    accent: "bg-demo/30 text-demo-foreground",
    items: [
      { label: "Demo-ready initiatives", to: "/assets",  search: { demo: ["Yes"] } },
      { label: "Use case mapping",       to: "/explore", search: {} },
    ],
  },
  {
    icon: Building2,
    role: "Architect",
    accent: "bg-reusable/30 text-reusable-foreground",
    items: [
      { label: "Architecture-heavy projects", to: "/explore", search: { reuseType: ["Architecture"] } },
      { label: "Deployment patterns",         to: "/explore", search: {} },
    ],
  },
];

// ── Sections ──────────────────────────────────────────────────────────────────
export const ONBOARDING_SECTIONS = {
  rolePaths: {
    title: "Role-based start paths",
    description: "Jump straight to what matters for you.",
  },
  topProjects: {
    title: "Top 5 projects to explore",
    description: "Start with these to see how reuse works in practice.",
    limit: 5,
  },
  nextStep: {
    title: "Recommended next step",
    body: "Explore live initiatives and see how teams structure submissions.",
    cta: { label: "Open Explorer", icon: ArrowRight, to: "/explore" },
  },
} as const;
