import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type {
  Status,
  Maturity,
  ProjectType,
  ReuseType,
  ReuseEffort,
  ReuseLevel,
} from "@/data/openview";

const statusStyle: Record<Status, string> = {
  Idea: "bg-status-neutral text-status-neutral-foreground",
  "In Progress": "bg-status-warning text-status-warning-foreground",
  Completed: "bg-status-info text-status-info-foreground",
  Production:
    "bg-status-success text-status-success-foreground ring-2 ring-status-success/40",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge className={cn("border-0 font-medium", statusStyle[status])}>
      {status}
    </Badge>
  );
}

const maturityTooltip: Record<Maturity, string> = {
  Concept: "Early idea, no implementation yet.",
  POC: "Proof of concept — validates feasibility.",
  MVP: "Minimum viable product, limited audience.",
  Pilot: "Live with a limited cohort of real users.",
  Production: "Operating at scale with SLAs.",
};

export function MaturityBadge({ maturity }: { maturity: Maturity }) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className="border-0 bg-maturity text-maturity-foreground font-medium cursor-help">
            {maturity}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>{maturityTooltip[maturity]}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ReusableBadge() {
  return (
    <Badge className="border-0 bg-reusable text-reusable-foreground font-semibold ring-2 ring-reusable/50">
      ♻ Reusable
    </Badge>
  );
}

export function DemoBadge() {
  return (
    <Badge className="border-0 bg-demo text-demo-foreground font-semibold ring-2 ring-demo/50">
      ▶ Demo
    </Badge>
  );
}

export function TagBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="outline" className="font-normal text-muted-foreground">
      {children}
    </Badge>
  );
}

const projectTypeStyle: Record<ProjectType, string> = {
  POC: "bg-status-neutral text-status-neutral-foreground",
  MVP: "bg-status-warning text-status-warning-foreground",
  Product: "bg-status-success text-status-success-foreground",
  "Internal Tool": "bg-status-info text-status-info-foreground",
};

export function ProjectTypeBadge({ type }: { type: ProjectType }) {
  return (
    <Badge className={cn("border-0 font-medium", projectTypeStyle[type])}>
      {type}
    </Badge>
  );
}

const reuseTypeTooltip: Record<ReuseType, string> = {
  Code: "Library, SDK, or model artifact you can import directly.",
  Prompt: "Curated prompts, system messages, and evaluation sets.",
  Architecture: "Reference architecture, pipelines, and templates.",
  "End-to-end": "Full accelerator including UI, model, and integrations.",
};

export function ReuseTypeBadge({ type }: { type: ReuseType }) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className="cursor-help border-reusable/40 bg-reusable/10 text-reusable-foreground font-medium"
          >
            {type}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>{reuseTypeTooltip[type]}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

const effortStyle: Record<ReuseEffort, string> = {
  Low: "bg-status-success/20 text-status-success-foreground",
  Medium: "bg-status-warning/30 text-status-warning-foreground",
  High: "bg-destructive/15 text-destructive",
};
const effortTooltip: Record<ReuseEffort, string> = {
  Low: "Plug-and-play; minimal integration work.",
  Medium: "A few weeks of integration and configuration.",
  High: "Significant rework or new infra required.",
};

export function ReuseEffortBadge({ effort }: { effort: ReuseEffort }) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            className={cn("cursor-help border-0 font-medium", effortStyle[effort])}
          >
            Effort: {effort}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>{effortTooltip[effort]}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function ReuseLevelBadge({ level }: { level: ReuseLevel }) {
  const map: Record<ReuseLevel, string> = {
    Yes: "bg-reusable text-reusable-foreground",
    Partial: "bg-status-warning text-status-warning-foreground",
    No: "bg-status-neutral text-status-neutral-foreground",
  };
  return (
    <Badge className={cn("border-0 font-medium", map[level])}>
      Reuse: {level}
    </Badge>
  );
}