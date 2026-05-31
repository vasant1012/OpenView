import { Link } from "@tanstack/react-router";
import { ArrowRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import {
  StatusBadge,
  MaturityBadge,
  ReusableBadge,
  DemoBadge,
  TagBadge,
  ProjectTypeBadge,
  ReuseTypeBadge,
  ReuseEffortBadge,
} from "./badges";
import type { Initiative } from "@/data/openview";
import { getReuseType, getReuseEffort } from "@/data/openview";

export function ProjectCard({ project }: { project: Initiative }) {
  const reuseType = getReuseType(project);
  const reuseEffort = getReuseEffort(project);
  const isProduction = project.status === "Production";
  return (
      <article
      className={cn(
        "flex h-full flex-col rounded-xl border bg-card p-5 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-hover)]",
        isProduction && "border-status-success/40 ring-1 ring-status-success/20",
      )}
      >
      <header className="mb-3 flex items-start justify-between gap-3">
        <HoverCard openDelay={250}>
          <HoverCardTrigger asChild>
            <Link
              to="/projects/$projectId"
              params={{ projectId: project.id }}
              className="text-base font-semibold text-foreground hover:text-primary"
            >
              {project.name}
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 text-sm">
            <p className="font-semibold text-foreground">{project.name}</p>
            <p className="mt-1 text-xs text-muted-foreground line-clamp-3">
              {project.problem}
            </p>
            <p className="mt-2 text-xs">
              <span className="text-muted-foreground">Impact: </span>
              <span className="text-foreground">{project.impact}</span>
            </p>
            <p className="mt-1 text-xs">
              <span className="text-muted-foreground">Owner: </span>
              <span className="text-foreground">{project.owner}</span>
            </p>
          </HoverCardContent>
        </HoverCard>
        <StatusBadge status={project.status} />
      </header>
      <div className="mb-3 flex flex-wrap gap-1.5">
        <ProjectTypeBadge type={project.type} />
        <TagBadge>{project.domain}</TagBadge>
        <TagBadge>{project.capability}</TagBadge>
        {project.reusable ? <ReusableBadge /> : null}
        {project.demo ? <DemoBadge /> : null}
      </div>
      <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
        {project.description}
      </p>
      <p className="mb-4 text-xs text-muted-foreground line-clamp-2">
        <span className="font-medium text-foreground/80">Problem: </span>
        {project.problem}
      </p>
      <dl className="mb-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
        <div><dt className="text-muted-foreground">Owner</dt><dd className="font-medium text-foreground">{project.owner}</dd></div>
        <div><dt className="text-muted-foreground">Maturity</dt><dd><MaturityBadge maturity={project.maturity} /></dd></div>
        <div><dt className="text-muted-foreground">Reuse Type</dt><dd><ReuseTypeBadge type={reuseType} /></dd></div>
        <div><dt className="text-muted-foreground">Reuse Effort</dt><dd><ReuseEffortBadge effort={reuseEffort} /></dd></div>
        <div><dt className="text-muted-foreground">Deployment</dt><dd className="font-medium text-foreground">{project.deployment}</dd></div>
        <div><dt className="text-muted-foreground">Reusable</dt><dd className="font-medium text-foreground">{project.reusable ? "Yes" : "No"}</dd></div>
      </dl>
      <footer className="mt-auto flex items-center justify-between border-t pt-3">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Package className="h-3.5 w-3.5" />
          {project.assets.length} assets
        </span>
        <div className="flex gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/assets" search={{ project: project.id } as never}>Open Assets</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/projects/$projectId" params={{ projectId: project.id }}>
              View <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </footer>
    </article>
  );
}