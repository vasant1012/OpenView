import { createFileRoute } from "@tanstack/react-router";
import { MetricCard } from "@/components/openview/MetricCard";
import { SectionBlock } from "@/components/openview/SectionBlock";
import { ActivityList } from "@/components/openview/ActivityList";
import { CTAButtonGroup } from "@/components/openview/CTAButtonGroup";
import { ProjectCard } from "@/components/openview/ProjectCard";
import { PageHeader } from "@/components/openview/PageHeader";
import {
  CapabilityTagCloud,
  DomainPieChart,
  StatusBarChart,
} from "@/components/openview/charts";
import { initiatives, assets, getTopReusableInitiatives } from "@/data/openview";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import {
  HOME_META,
  HOME_HEADER,
  HOME_METRICS,
  HOME_SECTIONS,
  HOME_BADGES,
  HOME_FEATURED_LIMIT,
  HOME_TOP_REUSABLE_LIMIT,
} from "@/data/home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_META.title },
      { name: "description", content: HOME_META.description },
    ],
  }),
  component: Home,
});

function Home() {
  const totals = {
    total:      initiatives.length,
    inProgress: initiatives.filter((i) => i.status === "In Progress").length,
    completed:  initiatives.filter((i) => i.status === "Completed").length,
    production: initiatives.filter((i) => i.status === "Production").length,
    reusable:   assets.length,
    demo:       assets.filter((a) => a.demoReady).length,
  };
  const featured   = initiatives.filter((i) => i.reusable).slice(0, HOME_FEATURED_LIMIT);
  const topReusable = getTopReusableInitiatives(HOME_TOP_REUSABLE_LIMIT);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        eyebrow={HOME_HEADER.eyebrow}
        title={HOME_HEADER.title}
        description={HOME_HEADER.description}
        actions={<CTAButtonGroup />}
      />

      {/* Metric cards */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {HOME_METRICS.map((m) => (
          <MetricCard
            key={m.key}
            label={m.label}
            value={totals[m.key]}
            icon={m.icon}
            to={m.to}
            search={m.search as never}
            tone={m.tone}
          />
        ))}
      </section>

      {/* Charts row */}
      <section className="mb-8 grid gap-4 lg:grid-cols-3">
        <SectionBlock title={HOME_SECTIONS.charts[0].title} description={HOME_SECTIONS.charts[0].description}>
          <StatusBarChart />
        </SectionBlock>
        <SectionBlock title={HOME_SECTIONS.charts[1].title} description={HOME_SECTIONS.charts[1].description}>
          <DomainPieChart />
        </SectionBlock>
        <SectionBlock title={HOME_SECTIONS.charts[2].title} description={HOME_SECTIONS.charts[2].description}>
          <CapabilityTagCloud />
        </SectionBlock>
      </section>

      {/* Recent + Featured */}
      <section className="mb-8 grid gap-4 lg:grid-cols-3">
        <SectionBlock title={HOME_SECTIONS.recentUpdates.title} className="lg:col-span-1">
          <ActivityList />
        </SectionBlock>
        <SectionBlock
          title={HOME_SECTIONS.featured.title}
          description={HOME_SECTIONS.featured.description}
          className="lg:col-span-2"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </SectionBlock>
      </section>

      {/* Top reusable */}
      <SectionBlock
        title={HOME_SECTIONS.topReusable.title}
        description={HOME_SECTIONS.topReusable.description}
        className="mb-8"
      >
        <ul className="divide-y">
          {topReusable.map(({ initiative, score, demoReady }) => (
            <li key={initiative.id} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0 flex-1">
                <Link
                  to="/projects/$projectId"
                  params={{ projectId: initiative.id }}
                  className="text-sm font-semibold text-foreground hover:text-primary"
                >
                  {initiative.name}
                </Link>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                  {initiative.domain} · {initiative.capability} · {initiative.owner}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {initiative.status === "Production" && (
                  <Badge className="border-0 bg-status-success text-status-success-foreground">
                    {HOME_BADGES.productionReady}
                  </Badge>
                )}
                {score >= HOME_BADGES.highReuseScore && (
                  <Badge className="border-0 bg-reusable text-reusable-foreground">
                    {HOME_BADGES.highReuseLabel}
                  </Badge>
                )}
                {demoReady && (
                  <Badge className="border-0 bg-demo text-demo-foreground">
                    {HOME_BADGES.demoLabel}
                  </Badge>
                )}
                <span className="text-sm font-semibold text-foreground tabular-nums">{score}</span>
              </div>
            </li>
          ))}
        </ul>
      </SectionBlock>

      {/* Start here */}
      <SectionBlock
        title={HOME_SECTIONS.startHere.title}
        description={HOME_SECTIONS.startHere.description}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-xl text-sm text-muted-foreground">
            {HOME_SECTIONS.startHere.body}
          </p>
          <CTAButtonGroup />
        </div>
      </SectionBlock>
    </main>
  );
}
