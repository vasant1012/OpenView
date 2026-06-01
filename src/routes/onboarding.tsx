import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/openview/PageHeader";
import { SectionBlock } from "@/components/openview/SectionBlock";
import { Button } from "@/components/ui/button";
import { getTopReusableInitiatives } from "@/data/openview";
import { StatusBadge, TagBadge } from "@/components/openview/badges";
import {
  ONBOARDING_META,
  ONBOARDING_HEADER,
  ONBOARDING_STEPS,
  ROLE_PATHS,
  ONBOARDING_SECTIONS,
} from "@/data/onboarding";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: ONBOARDING_META.title },
      { name: "description", content: ONBOARDING_META.description },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const top5 = getTopReusableInitiatives(ONBOARDING_SECTIONS.topProjects.limit);

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <PageHeader
        eyebrow={ONBOARDING_HEADER.eyebrow}
        title={ONBOARDING_HEADER.title}
        description={ONBOARDING_HEADER.description}
      />

      {/* Role paths */}
      <SectionBlock
        title={ONBOARDING_SECTIONS.rolePaths.title}
        description={ONBOARDING_SECTIONS.rolePaths.description}
        className="mb-6"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {ROLE_PATHS.map((r) => (
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

      {/* Step cards */}
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {ONBOARDING_STEPS.map((s) => (
          <SectionBlock key={s.title} title={s.title}>
            <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <s.icon className="h-5 w-5" />
            </span>
            <p className="text-sm text-muted-foreground">{s.body}</p>
          </SectionBlock>
        ))}
      </div>

      {/* Top projects */}
      <SectionBlock
        title={ONBOARDING_SECTIONS.topProjects.title}
        description={ONBOARDING_SECTIONS.topProjects.description}
        className="mb-6"
      >
        <ol className="divide-y">
          {top5.map(({ initiative, score }, idx) => (
            <li key={initiative.id} className="flex items-center justify-between gap-3 py-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {idx + 1}
                </span>
                <div className="min-w-0">
                  <Link
                    to="/projects/$projectId"
                    params={{ projectId: initiative.id }}
                    className="text-sm font-semibold text-foreground hover:text-primary"
                  >
                    {initiative.name}
                  </Link>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {initiative.domain} · {initiative.capability}
                  </p>
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

      {/* Next step CTA */}
      <SectionBlock title={ONBOARDING_SECTIONS.nextStep.title}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">{ONBOARDING_SECTIONS.nextStep.body}</p>
          <Button asChild>
            <Link to={ONBOARDING_SECTIONS.nextStep.cta.to}>
              {ONBOARDING_SECTIONS.nextStep.cta.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </SectionBlock>
    </main>
  );
}