import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, GitCompareArrows, MessageSquarePlus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionBlock } from "@/components/openview/SectionBlock";
import { PageHeader } from "@/components/openview/PageHeader";
import {
  StatusBadge,
  MaturityBadge,
  TagBadge,
  ReusableBadge,
  DemoBadge,
  ProjectTypeBadge,
  ReuseTypeBadge,
  ReuseEffortBadge,
  ReuseLevelBadge,
} from "@/components/openview/badges";
import {
  getInitiative,
  initiatives,
  assets,
  getReuseType,
  getReuseEffort,
  getReuseLevel,
  getReuseSummary,
  getUseCaseCategory,
  getClientScenarios,
  getIndustryApplicability,
} from "@/data/openview";

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = getInitiative(params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.project.name ?? "Project"} · OpenView` },
      { name: "description", content: loaderData?.project.description ?? "AI initiative detail." },
    ],
  }),
  component: ProjectDetail,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold">Project not found</h1>
      <p className="mt-2 text-muted-foreground">It may have moved or been archived.</p>
      <Button asChild className="mt-6"><Link to="/explore">Back to Explorer</Link></Button>
    </main>
  ),
});

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm text-foreground">{children}</dd>
    </div>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  const linkedAssets = assets.filter((a) => project.assets.includes(a.id));
  const similar = initiatives.filter((i) => project.similar.includes(i.id));

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <Link to="/explore" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Explorer
      </Link>
      <PageHeader
        eyebrow="Initiative"
        title={project.name}
        description={project.description}
        actions={
          <>
            <Button asChild>
              <Link to="/assets" search={{ project: project.id } as never}>
                <Package className="mr-2 h-4 w-4" /> View Assets
              </Link>
            </Button>
            <Button variant="secondary"><GitCompareArrows className="mr-2 h-4 w-4" /> Compare</Button>
            <Button variant="ghost"><MessageSquarePlus className="mr-2 h-4 w-4" /> Suggest Update</Button>
          </>
        }
      />

      <div className="mb-6 flex flex-wrap gap-2">
        <StatusBadge status={project.status} />
        <MaturityBadge maturity={project.maturity} />
        <TagBadge>{project.domain}</TagBadge>
        <TagBadge>{project.capability}</TagBadge>
        <ProjectTypeBadge type={project.type} />
        {project.reusable ? <ReusableBadge /> : null}
        {project.demo ? <DemoBadge /> : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionBlock title="Overview">
          <dl className="grid gap-4 sm:grid-cols-2">
            <Field label="Owner">{project.owner}</Field>
            <Field label="Last updated">{project.updatedAt}</Field>
            <Field label="Contributors">{project.contributors.length ? project.contributors.join(", ") : "—"}</Field>
            <Field label="Deployment">{project.deployment}</Field>
          </dl>
        </SectionBlock>

        <SectionBlock title="Business context">
          <dl className="grid gap-4">
            <Field label="Problem">{project.problem}</Field>
            <Field label="Users">{project.users}</Field>
            <Field label="Impact / KPIs">{project.impact}</Field>
          </dl>
        </SectionBlock>

        <SectionBlock title="AI & data">
          <dl className="grid gap-4 sm:grid-cols-2">
            <Field label="AI capability">{project.capability}</Field>
            <Field label="Data type">{project.dataType}</Field>
            <Field label="Models / frameworks">
              <div className="flex flex-wrap gap-1.5">{project.models.map((m: string) => <TagBadge key={m}>{m}</TagBadge>)}</div>
            </Field>
          </dl>
        </SectionBlock>

        <SectionBlock title="Delivery & architecture">
          <dl className="grid gap-4">
            <Field label="Integrations">
              <div className="flex flex-wrap gap-1.5">{project.integrations.map((m: string) => <TagBadge key={m}>{m}</TagBadge>)}</div>
            </Field>
            <Field label="Architecture summary">{project.architecture}</Field>
          </dl>
        </SectionBlock>

        <SectionBlock title="Reusability details" className="lg:col-span-2">
          <div className="mb-4 flex flex-wrap gap-2">
            <ReuseLevelBadge level={getReuseLevel(project)} />
            <ReuseTypeBadge type={getReuseType(project)} />
            <ReuseEffortBadge effort={getReuseEffort(project)} />
            {project.demo ? <DemoBadge /> : null}
          </div>
           <dl className="mb-4 grid gap-4 sm:grid-cols-2">
            <Field label="What can be reused">{getReuseSummary(project)}</Field>
            <Field label="Reusable assets">{project.assets.length}</Field>
          </dl>
          {linkedAssets.length === 0 ? (
            <p className="text-sm text-muted-foreground">No reusable assets linked yet.</p>
          ) : (
            <ul className="grid gap-2 sm:grid-cols-2">
              {linkedAssets.map((a) => (
                <li key={a.id}>
                  <Link
                    to="/assets/$assetId"
                    params={{ assetId: a.id }}
                    className="flex items-center justify-between rounded-lg border bg-surface px-4 py-3 text-sm hover:border-primary"
                  >
                    <span>
                      <span className="font-medium text-foreground">{a.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{a.type}</span>
                    </span>
                    <span className="text-xs text-muted-foreground">Reuse {a.reuseScore}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </SectionBlock>

        <SectionBlock title="Use case & opportunity mapping" className="lg:col-span-2">
          <dl className="grid gap-4 sm:grid-cols-3">
            <Field label="Use case category">
              <TagBadge>{getUseCaseCategory(project)}</TagBadge>
            </Field>
            <Field label="Suitable client scenarios">{getClientScenarios(project)}</Field>
            <Field label="Industry applicability">{getIndustryApplicability(project)}</Field>
          </dl>
        </SectionBlock>

        <SectionBlock title="Insights">
          <dl className="grid gap-4">
            <Field label="Maturity"><MaturityBadge maturity={project.maturity} /></Field>
            <Field label="Lessons learned">{project.lessons}</Field>
            <Field label="Risks">{project.risks}</Field>
          </dl>
        </SectionBlock>

        <SectionBlock title="Similar projects" className="lg:col-span-2">
          {similar.length === 0 ? (
            <p className="text-sm text-muted-foreground">No similar initiatives yet.</p>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {similar.map((s) => (
                <Link
                  key={s.id}
                  to="/projects/$projectId"
                  params={{ projectId: s.id }}
                  className="min-w-[260px] flex-shrink-0 rounded-lg border bg-surface p-4 transition hover:border-primary hover:shadow-[var(--shadow-hover)]"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{s.name}</span>
                    <StatusBadge status={s.status} />
                  </div>
                  <p className="mb-2 text-xs text-muted-foreground line-clamp-2">{s.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    <TagBadge>{s.domain}</TagBadge>
                    <TagBadge>{s.capability}</TagBadge>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <p className="mt-4 mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Tags</p>
          <div className="flex flex-wrap gap-1.5">
            <TagBadge>{project.domain}</TagBadge>
            <TagBadge>{project.capability}</TagBadge>
            <TagBadge>{project.dataType}</TagBadge>
            <TagBadge>{project.deployment}</TagBadge>
          </div>
        </SectionBlock>
      </div>
    </main>
  );
}