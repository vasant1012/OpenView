import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaturityBadge, TagBadge, DemoBadge, ReuseTypeBadge } from "./badges";
import type { Asset } from "@/data/openview";
import { getInitiative, getAssetReuseType, getAssetHowToUse } from "@/data/openview";

export function AssetCard({ asset }: { asset: Asset }) {
  const linked = getInitiative(asset.linkedProject);
  const reuseType = getAssetReuseType(asset);
  const howToUse = getAssetHowToUse(asset);
  return (
    <article className="flex h-full flex-col rounded-xl border bg-card p-5 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-hover)]">
      <header className="mb-3 flex items-start justify-between gap-3">
        <Link
          to="/assets/$assetId"
          params={{ assetId: asset.id }}
          className="text-base font-semibold text-foreground hover:text-primary"
        >
          {asset.name}
        </Link>
        <MaturityBadge maturity={asset.maturity} />
      </header>
      <div className="mb-3 flex flex-wrap gap-1.5">
        <TagBadge>{asset.type}</TagBadge>
        <TagBadge>{asset.capability}</TagBadge>
        <ReuseTypeBadge type={reuseType} />
        {asset.demoReady ? <DemoBadge /> : null}
      </div>
      {linked ? (
        <div className="mb-3 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs">
          <p className="text-muted-foreground">Linked initiative</p>
          <Link
            to="/projects/$projectId"
            params={{ projectId: linked.id }}
            className="font-semibold text-primary hover:underline"
          >
            {linked.name}
          </Link>
        </div>
      ) : null}
      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
        {asset.description}
      </p>
      <p className="mb-4 rounded-md bg-muted/40 px-3 py-2 text-xs text-foreground/80">
        <span className="font-semibold">How to use: </span>
        {howToUse}
      </p>
      <dl className="mb-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
        <div><dt className="text-muted-foreground">Reuse score</dt><dd className="font-medium text-foreground">{asset.reuseScore}</dd></div>
        <div><dt className="text-muted-foreground">Demo ready</dt><dd className="font-medium text-foreground">{asset.demoReady ? "Yes" : "No"}</dd></div>
        <div><dt className="text-muted-foreground">Maturity</dt><dd className="font-medium text-foreground">{asset.maturity}</dd></div><div><dt className="text-muted-foreground">Reuse Type</dt><dd><ReuseTypeBadge type={reuseType} /></dd></div>
        <div><dt className="text-muted-foreground">Demo</dt><dd className="font-medium text-foreground">{asset.demoReady ? "Ready" : "—"}</dd></div>
        <div className="col-span-2"><dt className="text-muted-foreground">Stack</dt><dd className="font-medium text-foreground">{asset.stack.join(", ")}</dd></div>
      </dl>
      <footer className="mt-auto flex items-center justify-end gap-2 border-t pt-3">
        {linked ? (
          <Button asChild variant="ghost" size="sm">
            <Link to="/projects/$projectId" params={{ projectId: linked.id }}>Open Project</Link>
          </Button>
        ) : null}
        <Button asChild size="sm">
          <Link to="/assets/$assetId" params={{ assetId: asset.id }}>
            View <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      </footer>
    </article>
  );
}