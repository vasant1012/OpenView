import { useMemo, useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/openview/PageHeader";
import { FilterPanel } from "@/components/openview/FilterPanel";
import { AssetCard } from "@/components/openview/AssetCard";
import { assetFilterGroups } from "@/components/openview/filterUtils";
import { assets, initiatives } from "@/data/openview";
import { cn } from "@/lib/utils";

const arr = fallback(z.array(z.string()), []).default([]);
const assetSearch = z.object({
  q: fallback(z.string(), "").default(""),
  tab: fallback(z.string(), "All").default("All"),
  project: fallback(z.string(), "").default(""),
  type: arr,
  domain: arr,
  capability: arr,
  maturity: arr,
  reuseScore: arr,
  demo: arr,
  linkedProject: arr,
});

const tabs = ["All", "Accelerator", "Demo", "Prompt Library", "Template", "Code"];

export const Route = createFileRoute("/assets")({
  validateSearch: zodValidator(assetSearch),
  head: () => ({
    meta: [
      { title: "Asset Library · OpenView" },
      { name: "description", content: "Discover reusable AI accelerators, demos, prompts, templates, and code across teams." },
    ],
  }),
  component: AssetsPage,
});

function AssetsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/assets" });
  const [query, setQuery] = useState(search.q);
  useEffect(() => setQuery(search.q), [search.q]);

  const values: Record<string, string[]> = {
    type: search.type,
    domain: search.domain,
    capability: search.capability,
    maturity: search.maturity,
    reuseScore: search.reuseScore,
    demo: search.demo,
    linkedProject: search.linkedProject,
  };

  const setFilter = (key: string, next: string[]) =>
    navigate({ search: (prev: any) => ({ ...prev, [key]: next }) });
  const resetFilters = () =>
    navigate({ search: (prev: any) => ({ ...prev, type: [], domain: [], capability: [], maturity: [], reuseScore: [], demo: [], linkedProject: [] }) });

  const projectLabel = (id: string) => initiatives.find((i) => i.id === id)?.name ?? id;

  const results = useMemo(() => {
    const match = (arr: string[], v: string) => arr.length === 0 || arr.includes(v);
    const q = search.q.trim().toLowerCase();
    return assets.filter((a) => {
      if (search.tab !== "All" && a.type !== search.tab) return false;
      if (search.project && a.linkedProject !== search.project) return false;
      if (!match(values.type, a.type)) return false;
      if (!match(values.domain, a.domain)) return false;
      if (!match(values.capability, a.capability)) return false;
      if (!match(values.maturity, a.maturity)) return false;
      if (!match(values.linkedProject, a.linkedProject)) return false;
      if (values.demo.length) {
        const yes = values.demo.includes("Yes");
        const no = values.demo.includes("No");
        if (!((yes && a.demoReady) || (no && !a.demoReady))) return false;
      }
      if (values.reuseScore.length) {
        const inBucket =
          (values.reuseScore.includes("≥ 80") && a.reuseScore >= 80) ||
          (values.reuseScore.includes("60–79") && a.reuseScore >= 60 && a.reuseScore < 80) ||
          (values.reuseScore.includes("< 60") && a.reuseScore < 60);
        if (!inBucket) return false;
      }
      if (q) {
        const hay = `${a.name} ${a.description} ${a.type} ${a.capability} ${a.stack.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [search, values]);

  // Surface the linked-project filter chip
  const projectChip = search.project ? projectLabel(search.project) : "";

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        eyebrow="Asset Library"
        title="Reusable AI Assets"
        description={`${results.length} assets available${projectChip ? ` for ${projectChip}` : ""}.`}
        actions={
          projectChip ? (
            <button
              onClick={() => navigate({ search: (p: any) => ({ ...p, project: "" }) })}
              className="rounded-md border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear project filter: {projectChip} ×
            </button>
          ) : null
        }
      />

      <div className="mb-4 flex flex-wrap gap-1 rounded-xl border bg-card p-1 shadow-[var(--shadow-card)]">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => navigate({ search: (p: any) => ({ ...p, tab: t }) })}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition",
              search.tab === t
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent/60",
            )}
          >
            {t === "All" ? "All" : `${t}s`}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <FilterPanel groups={assetFilterGroups} values={values} onChange={setFilter} onReset={resetFilters} />
        <div>
          <form
            className="relative mb-4"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ search: (prev: any) => ({ ...prev, q: query }) });
            }}
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search assets…" className="pl-9 bg-card" />
          </form>
          {results.length === 0 ? (
            <div className="rounded-xl border bg-card p-10 text-center text-sm text-muted-foreground shadow-[var(--shadow-card)]">
              No assets match these filters.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {results.map((a) => (
                <AssetCard key={a.id} asset={a} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}