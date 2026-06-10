import { createFileRoute } from "@tanstack/react-router";
import { Activity, CheckCircle2, Layers, Library, Rocket } from "lucide-react";
import { PageHeader } from "@/components/openview/PageHeader";
import { SectionBlock } from "@/components/openview/SectionBlock";
import { MetricCard } from "@/components/openview/MetricCard";
import { StatusBarChart, DomainPieChart, CapabilityTagCloud, PortfolioFunnel, TopDomainsProduction, ReuseRateTrend } from "@/components/openview/charts";
import { ActivityList } from "@/components/openview/ActivityList";
import { initiatives, assets } from "@/data/openview";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership · OpenView" },
      { name: "description", content: "Executive view of AI portfolio health, status mix, and cross-domain reuse." },
    ],
  }),
  component: LeadershipPage,
});

function LeadershipPage() {
  const reusable = initiatives.filter((i) => i.reusable).length;
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        eyebrow="Leadership"
        title="Portfolio Snapshot"
        description="A read-only executive view of the AI initiative portfolio."
      />
      <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard label="Initiatives" value={initiatives.length} icon={Layers} to="/explore" tone="primary" />
        <MetricCard label="In Progress" value={initiatives.filter((i) => i.status === "In Progress").length} icon={Activity} to="/explore" search={{ status: ["In Progress"] }} tone="warning" />
        <MetricCard label="Completed" value={initiatives.filter((i) => i.status === "Completed").length} icon={CheckCircle2} to="/explore" search={{ status: ["Completed"] }} tone="info" />
        <MetricCard label="In Production" value={initiatives.filter((i) => i.status === "Production").length} icon={Rocket} to="/explore" search={{ status: ["Production"] }} tone="success" />
        <MetricCard label="Assets" value={assets.length} icon={Library} to="/assets" tone="reusable" />
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-3">
        <SectionBlock title="Lifecycle" description="Initiatives by status"><StatusBarChart /></SectionBlock>
        <SectionBlock title="Domain reach" description="Where AI is landing"><DomainPieChart /></SectionBlock>
        <SectionBlock title="Capability mix"><CapabilityTagCloud /></SectionBlock>
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-3">
        <SectionBlock title="Portfolio funnel" description="Idea → POC → MVP → Production" className="lg:col-span-2">
          <PortfolioFunnel />
        </SectionBlock>
        <SectionBlock title="Top domains by production" description="Where we're scaling">
          <TopDomainsProduction />
        </SectionBlock>
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-3">
        <SectionBlock title="Reuse rate trend" description="Rolling 6-quarter view" className="lg:col-span-2">
          <ReuseRateTrend />
        </SectionBlock>
        <SectionBlock title="Reuse">
          <p className="text-4xl font-semibold text-foreground">{Math.round((reusable / initiatives.length) * 100)}%</p>
          <p className="mt-1 text-sm text-muted-foreground">of initiatives produce reusable assets.</p>
        </SectionBlock>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <SectionBlock title="Recent activity" className="lg:col-span-3">
          <ActivityList />
        </SectionBlock>
      </section>
    </main>
  );
}