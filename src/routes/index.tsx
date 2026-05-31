import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  CheckCircle2,
  Layers,
  Library,
  PlayCircle,
  Rocket,
} from "lucide-react";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home · OpenView" },
      { name: "description", content: "Triogenic AI OpenView — your hub for AI initiatives, reusable assets, and team activity." },
    ],
  }),
  component: Home,
});

function Home() {
  const totals = {
    total: initiatives.length,
    inProgress: initiatives.filter((i) => i.status === "In Progress").length,
    completed: initiatives.filter((i) => i.status === "Completed").length,
    production: initiatives.filter((i) => i.status === "Production").length,
    reusable: assets.length,
    demo: assets.filter((a) => a.demoReady).length,
  };
  const featured = initiatives.filter((i) => i.reusable).slice(0, 6);
  const topReusable = getTopReusableInitiatives(4);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        eyebrow="Home"
        title="OpenView Dashboard"
        description="A single window into every AI initiative, reusable asset, and update across the organization."
        actions={<CTAButtonGroup />}
      />

      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <MetricCard label="Total Initiatives" value={totals.total} icon={Layers} to="/explore" tone="primary" />
        <MetricCard label="In Progress" value={totals.inProgress} icon={Activity} to="/explore" search={{ status: ["In Progress"] }} tone="warning" />
        <MetricCard label="Completed" value={totals.completed} icon={CheckCircle2} to="/explore" search={{ status: ["Completed"] }} tone="info" />
        <MetricCard label="Production" value={totals.production} icon={Rocket} to="/explore" search={{ status: ["Production"] }} tone="success" />
        <MetricCard label="Reusable Assets" value={totals.reusable} icon={Library} to="/assets" tone="reusable" />
        <MetricCard label="Demo Ready" value={totals.demo} icon={PlayCircle} to="/assets" search={{ demo: ["Yes"] }} tone="info" />
      </section>

      <section className="mb-8 grid gap-4 lg:grid-cols-3">
        <SectionBlock title="Status distribution" description="Initiatives by lifecycle stage">
          <StatusBarChart />
        </SectionBlock>
        <SectionBlock title="Domain mix" description="Where AI investment is landing">
          <DomainPieChart />
        </SectionBlock>
        <SectionBlock title="AI capabilities" description="What we're shipping with">
          <CapabilityTagCloud />
        </SectionBlock>
      </section>

      <section className="mb-8 grid gap-4 lg:grid-cols-3">
        <SectionBlock title="Recent updates" className="lg:col-span-1">
          <ActivityList />
        </SectionBlock>
        <SectionBlock title="Featured reusable initiatives" description="Battle-tested across multiple teams" className="lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </SectionBlock>
      </section>

      <SectionBlock
        title="Top reusable initiatives"
        description="Ranked by average asset reuse score and demo availability."
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
                {initiative.status === "Production" ? (
                  <Badge className="border-0 bg-status-success text-status-success-foreground">
                    Production Ready
                  </Badge>
                ) : null}
                {score >= 80 ? (
                  <Badge className="border-0 bg-reusable text-reusable-foreground">
                    High Reuse Potential
                  </Badge>
                ) : null}
                {demoReady ? (
                  <Badge className="border-0 bg-demo text-demo-foreground">▶ Demo</Badge>
                ) : null}
                <span className="text-sm font-semibold text-foreground tabular-nums">{score}</span>
              </div>
            </li>
          ))}
        </ul>
      </SectionBlock>

      <SectionBlock title="Start here" description="New to OpenView? Take the 5-minute tour to learn how initiatives, assets, and contributors connect.">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-xl text-sm text-muted-foreground">
            Onboarding walks you through submitting an initiative, tagging it for discovery, and linking reusable assets so other teams can build on your work.
          </p>
          <CTAButtonGroup />
        </div>
      </SectionBlock>
    </main>
  );
}
