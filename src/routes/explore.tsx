import { useMemo, useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/openview/PageHeader";
import { FilterPanel } from "@/components/openview/FilterPanel";
import { ProjectCard } from "@/components/openview/ProjectCard";
import { initiativeFilterGroups } from "@/components/openview/filterUtils";
import {
  initiatives,
  getReuseType,
  getReuseEffort,
  getUseCaseCategory,
} from "@/data/openview";

const arr = fallback(z.array(z.string()), []).default([]);
const exploreSearch = z.object({
  q: fallback(z.string(), "").default(""),
  sort: fallback(
    z.enum(["recent", "relevance", "reusability", "maturity", "updated"]),
    "recent",
  ).default("recent"),
  status: arr,
  type: arr,
  domain: arr,
  capability: arr,
  dataType: arr,
  maturity: arr,
  useCase: arr,
  reuseType: arr,
  reuseEffort: arr,
  reusable: arr,
  demo: arr,
  deployment: arr,
  owner: arr,
});

export const Route = createFileRoute("/explore")({
  validateSearch: zodValidator(exploreSearch),
  head: () => ({
    meta: [
      { title: "Explore Initiatives · OpenView" },
      { name: "description", content: "Search and filter the full catalog of AI initiatives across domains, capabilities, and maturity." },
    ],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/explore" });
  const [query, setQuery] = useState(search.q);

  useEffect(() => setQuery(search.q), [search.q]);

  const values: Record<string, string[]> = {
    status: search.status,
    type: search.type,
    domain: search.domain,
    capability: search.capability,
    dataType: search.dataType,
    maturity: search.maturity,
    useCase: search.useCase,
    reuseType: search.reuseType,
    reuseEffort: search.reuseEffort,
    reusable: search.reusable,
    demo: search.demo,
    deployment: search.deployment,
    owner: search.owner,
  };

  const setFilter = (key: string, next: string[]) => {
    navigate({ search: (prev: any) => ({ ...prev, [key]: next }) });
  };
  const resetFilters = () => {
    navigate({
      search: (prev: any) => ({
        ...prev,
        status: [], type: [], domain: [], capability: [], dataType: [],
        useCase: [], reuseType: [], reuseEffort: [],
        maturity: [], reusable: [], demo: [], deployment: [], owner: [],
      }),
    });
  };

  const results = useMemo(() => {
    const match = (arr: string[], v: string) => arr.length === 0 || arr.includes(v);
    const q = search.q.trim().toLowerCase();
    let list = initiatives.filter((i) => {
      if (!match(values.status, i.status)) return false;
      if (!match(values.type, i.type)) return false;
      if (!match(values.domain, i.domain)) return false;
      if (!match(values.capability, i.capability)) return false;
      if (!match(values.dataType, i.dataType)) return false;
      if (!match(values.maturity, i.maturity)) return false;
      if (!match(values.deployment, i.deployment)) return false;
      if (!match(values.owner, i.owner)) return false;
      if (!match(values.useCase, getUseCaseCategory(i))) return false;
      if (!match(values.reuseType, getReuseType(i))) return false;
      if (!match(values.reuseEffort, getReuseEffort(i))) return false;
      if (values.reusable.length) {
        const wanted = values.reusable.includes("Reusable");
        const wantedNot = values.reusable.includes("Not reusable");
        if (!((wanted && i.reusable) || (wantedNot && !i.reusable))) return false;
      }
      if (values.demo.length) {
        const yes = values.demo.includes("Yes");
        const no = values.demo.includes("No");
        if (!((yes && i.demo) || (no && !i.demo))) return false;
      }
      if (q) {
        const hay = `${i.name} ${i.description} ${i.problem} ${i.owner} ${i.capability} ${i.domain}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (search.sort === "reusability") {
      list = [...list].sort((a, b) => Number(b.reusable) - Number(a.reusable));
    } else if (search.sort === "maturity") {
      const order: Record<string, number> = { Production: 5, Pilot: 4, MVP: 3, POC: 2, Concept: 1 };
      list = [...list].sort((a, b) => (order[b.maturity] ?? 0) - (order[a.maturity] ?? 0));
    } else if (search.sort === "updated") {
      list = [...list].sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
    } else if (search.sort === "relevance" && q) {
      list = [...list].sort((a, b) => (b.name.toLowerCase().includes(q) ? 1 : 0) - (a.name.toLowerCase().includes(q) ? 1 : 0));
    }
    return list;
  }, [search, values]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <PageHeader
        eyebrow="Explore"
        title="Initiative Explorer"
        description={`${results.length} initiatives match your filters.`}
      />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <FilterPanel
          groups={initiativeFilterGroups}
          values={values}
          onChange={setFilter}
          onReset={resetFilters}
        />
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border bg-card p-3 shadow-[var(--shadow-card)]">
            <form
              className="relative flex-1 min-w-[220px]"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ search: (prev: any) => ({ ...prev, q: query }) });
              }}
            >
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search initiatives…"
                className="pl-9"
              />
            </form>
            <Select
              value={search.sort}
              onValueChange={(v) => navigate({ search: (prev: any) => ({ ...prev, sort: v as never }) })}
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most recent</SelectItem>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="reusability">Reusability</SelectItem>
                <SelectItem value="maturity">Maturity</SelectItem>
                <SelectItem value="updated">Recently updated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {results.length === 0 ? (
            <div className="rounded-xl border bg-card p-10 text-center text-sm text-muted-foreground shadow-[var(--shadow-card)]">
              No initiatives match these filters. Try resetting.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {results.map((p: any) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}