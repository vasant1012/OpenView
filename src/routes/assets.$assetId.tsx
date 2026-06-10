import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/openview/PageHeader";
import { SectionBlock } from "@/components/openview/SectionBlock";
import { MaturityBadge, TagBadge, DemoBadge, ReuseTypeBadge, ReuseEffortBadge } from "@/components/openview/badges";
import {
  getAsset,
  getInitiative,
  assets,
  getAssetReuseType,
  getAssetHowToUse,
  getAssetWhenToUse,
  getAssetIntegrationEffort,
  getAssetDependencies,
  getAssetLimitations,
  getAssetSecurity,
} from "@/data/openview";

export const Route = createFileRoute("/assets/$assetId")({
  loader: ({ params }) => {
    const asset = getAsset(params.assetId);
    if (!asset) throw notFound();
    return { asset };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.asset.name ?? "Asset"} · OpenView` },
      { name: "description", content: loaderData?.asset.description ?? "Reusable AI asset." },
    ],
  }),
  component: AssetDetail,
  notFoundComponent: () => (
    <main className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold">Asset not found</h1>
      <Button asChild className="mt-6"><Link to="/assets">Back to Library</Link></Button>
    </main>
  ),
});

function AssetDetail() {
  const { asset } = Route.useLoaderData();
  const linked = getInitiative(asset.linkedProject);
  const related = assets.filter((a) => asset.related.includes(a.id));

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <Link to="/assets" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Library
      </Link>
      <PageHeader
        eyebrow="Asset"
        title={asset.name}
        description={asset.description}
        actions={linked ? (
          <Button asChild>
            <Link to="/projects/$projectId" params={{ projectId: linked.id }}>Open Project</Link>
          </Button>
        ) : null}
      />
      <div className="mb-6 flex flex-wrap gap-2">
        <TagBadge>{asset.type}</TagBadge>
        <MaturityBadge maturity={asset.maturity} />
        <TagBadge>{asset.capability}</TagBadge>
        <TagBadge>{asset.domain}</TagBadge>
        <ReuseTypeBadge type={getAssetReuseType(asset)} />
        <ReuseEffortBadge effort={getAssetIntegrationEffort(asset)} />
        {asset.demoReady ? <DemoBadge /> : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionBlock title="Overview">
          <p className="text-sm text-muted-foreground">{asset.description}</p>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
            <div><dt className="text-xs uppercase text-muted-foreground">Linked project</dt><dd>{linked?.name ?? "—"}</dd></div>
            <div><dt className="text-xs uppercase text-muted-foreground">Domain</dt><dd>{asset.domain}</dd></div>
          </dl>
        </SectionBlock>

        <SectionBlock title="Reusability">
          <dl className="grid gap-3 text-sm">
            <div><dt className="text-xs uppercase text-muted-foreground">Reuse score</dt><dd className="text-2xl font-semibold text-foreground">{asset.reuseScore}</dd></div>
            <div><dt className="text-xs uppercase text-muted-foreground">Demo</dt><dd>{asset.demoReady ? "Demo ready" : "Not yet"}</dd></div>
          </dl>
        </SectionBlock>

        <SectionBlock title="Technical details">
          <p className="mb-2 text-xs uppercase text-muted-foreground">Tech stack</p>
          <div className="flex flex-wrap gap-1.5">
            {asset.stack.map((s: string) => <TagBadge key={s}>{s}</TagBadge>)}
          </div>
        </SectionBlock>

        <SectionBlock title="Documentation links">
          <ul className="space-y-2">
            {asset.docs.map((d: string) => (
              <li key={d}>
                <a href="#" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                  {d} <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </SectionBlock>

        <SectionBlock title="Usage guidance" className="lg:col-span-2">
          <dl className="grid gap-4 sm:grid-cols-3 text-sm">
            <div>
              <dt className="text-xs uppercase text-muted-foreground">How to use</dt>
              <dd className="mt-1 text-foreground">{getAssetHowToUse(asset)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-muted-foreground">When to use</dt>
              <dd className="mt-1 text-foreground">{getAssetWhenToUse(asset)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-muted-foreground">Integration effort</dt>
              <dd className="mt-1"><ReuseEffortBadge effort={getAssetIntegrationEffort(asset)} /></dd>
            </div>
            <div className="sm:col-span-3">
              <dt className="text-xs uppercase text-muted-foreground">Dependencies</dt>
              <dd className="mt-1 text-foreground">{getAssetDependencies(asset)}</dd>
            </div>
          </dl>
        </SectionBlock>

        <SectionBlock title="Reuse constraints" className="lg:col-span-2">
          <dl className="grid gap-4 sm:grid-cols-2 text-sm">
            <div>
              <dt className="text-xs uppercase text-muted-foreground">Limitations</dt>
              <dd className="mt-1 text-foreground">{getAssetLimitations(asset)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase text-muted-foreground">Security considerations</dt>
              <dd className="mt-1 text-foreground">{getAssetSecurity(asset)}</dd>
            </div>
          </dl>
        </SectionBlock>

        <SectionBlock title="Related assets" className="lg:col-span-2">
          {related.length === 0 ? (
            <p className="text-sm text-muted-foreground">No related assets yet.</p>
          ) : (
            <ul className="grid gap-2 sm:grid-cols-2">
              {related.map((a) => (
                <li key={a.id}>
                  <Link to="/assets/$assetId" params={{ assetId: a.id }} className="flex items-center justify-between rounded-lg border bg-surface px-4 py-3 text-sm hover:border-primary">
                    <span><span className="font-medium text-foreground">{a.name}</span> <span className="ml-2 text-xs text-muted-foreground">{a.type}</span></span>
                    <span className="text-xs text-muted-foreground">Reuse {a.reuseScore}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </SectionBlock>
      </div>
    </main>
  );
}