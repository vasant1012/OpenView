import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Users, Sparkles, Database, Presentation, Building2 } from "lucide-react";
import { PageHeader } from "@/components/openview/PageHeader";
import { SectionBlock } from "@/components/openview/SectionBlock";
import { Button } from "@/components/ui/button";
import { getTopReusableInitiatives } from "@/data/openview";
import { StatusBadge, TagBadge } from "@/components/openview/badges";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Onboarding · OpenView" },
      { name: "description", content: "Get oriented to OpenView — how to submit, discover, and reuse AI initiatives." },
    ],
  }),
  component: OnboardingPage,
});

const steps = [
  { icon: BookOpen, title: "Learn the model", body: "Initiatives, assets, and contributors are the three core objects. Everything links back to them." },
  { icon: Sparkles, title: "Submit your initiative", body: "Use the Submit form to register a POC, MVP, or production product. Tag it for discovery." },
  { icon: Users, title: "Connect with the community", body: "Browse the Asset Library to find reusable accelerators before you build from scratch." },
];

const rolePaths = [
  {
    icon: Database,
    role: "Data Scientist",
    items: [
      { label: "Explore reusable assets", to: "/assets", search: {} },
      { label: "Find similar projects", to: "/explore", search: { sort: "reusability" } },
    ],
    accent: "bg-primary/10 text-primary",
  },
  {
    icon: Presentation,
    role: "Pre-sales",
    items: [
      { label: "Demo-ready initiatives", to: "/assets", search: { demo: ["Yes"] } },
      { label: "Use case mapping", to: "/explore", search: {} },
    ],
    accent: "bg-demo/30 text-demo-foreground",
  },
  {
    icon: Building2,
    role: "Architect",
    items: [
      { label: "Architecture-heavy projects", to: "/explore", search: { reuseType: ["Architecture"] } },
      { label: "Deployment patterns", to: "/explore", search: {} },
    ],
    accent: "bg-reusable/30 text-reusable-foreground",
  },
] as const;

function OnboardingPage() {
  const top5 = getTopReusableInitiatives(5);
  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <PageHeader
        eyebrow="Onboarding"
        title="Start here"
        description="A 5-minute tour of OpenView for new contributors, owners, and leaders."
      />

      <SectionBlock title="Role-based start paths" description="Jump straight to what matters for you." className="mb-6">
        <div className="grid gap-4 md:grid-cols-3">
          {rolePaths.map((r) => (
            <div key={r.role} className="rounded-lg border bg-surface p-4">
              <span className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${r.accent}`}>
                <r.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-foreground">{r.role} Path</h3>
              <ul className="mt-2 space-y-1.5">
                {r.items.map((it) => (
                  <li key={it.label}>
                    <Link to={it.to} search={it.search as never} className="text-sm text-primary hover:underline">
                      → {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionBlock>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <SectionBlock key={s.title} title={s.title}>
            <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <s.icon className="h-5 w-5" />
            </span>
            <p className="text-sm text-muted-foreground">{s.body}</p>
          </SectionBlock>
        ))}
      </div>

      <SectionBlock title="Top 5 projects to explore" description="Start with these to see how reuse works in practice." className="mb-6">
        <ol className="divide-y">
          {top5.map(({ initiative, score }, idx) => (
            <li key={initiative.id} className="flex items-center justify-between gap-3 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{idx + 1}</span>
                <div className="min-w-0">
                  <Link to="/projects/$projectId" params={{ projectId: initiative.id }} className="text-sm font-semibold text-foreground hover:text-primary">
                    {initiative.name}
                  </Link>
                  <p className="mt-0.5 text-xs text-muted-foreground">{initiative.domain} · {initiative.capability}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={initiative.status} />
                <TagBadge>Reuse {score}</TagBadge>
              </div>
            </li>
          ))}
        </ol>
      </SectionBlock>

      <SectionBlock title="Recommended next step">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">Explore live initiatives and see how teams structure submissions.</p>
          <Button asChild>
            <Link to="/explore">Open Explorer <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </SectionBlock>
    </main>
  );
}