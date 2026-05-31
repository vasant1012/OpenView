import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  icon: Icon,
  to,
  search,
  tone = "primary",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  to: string;
  search?: Record<string, unknown>;
  tone?: "primary" | "success" | "info" | "warning" | "reusable";
}) {
  const toneClasses: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    success: "bg-status-success/20 text-status-success-foreground",
    info: "bg-status-info/20 text-status-info-foreground",
    warning: "bg-status-warning/30 text-status-warning-foreground",
    reusable: "bg-reusable/20 text-reusable-foreground",
  };
  return (
    <Link
      to={to}
      search={search as never}
      className="group block rounded-xl border bg-card p-5 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
        </div>
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            toneClasses[tone],
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}