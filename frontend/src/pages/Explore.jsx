import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { useData } from "@/context/DataContext";
import FilterPanel from "@/components/FilterPanel";
import ProjectCard from "@/components/ProjectCard";
import {
  STATUSES, PROJECT_TYPES, DOMAINS, AI_CAPABILITIES,
  DATA_TYPES, MATURITY, DEPLOYMENT,
} from "@/data/mockData";

const GROUPS = [
  { key: "status", label: "Status", options: STATUSES },
  { key: "type", label: "Project Type", options: PROJECT_TYPES },
  { key: "domain", label: "Domain", options: DOMAINS },
  { key: "capability", label: "AI Capability", options: AI_CAPABILITIES },
  { key: "dataType", label: "Data Type", options: DATA_TYPES },
  { key: "maturity", label: "Maturity", options: MATURITY },
  { key: "reusable", label: "Reusability", options: ["Reusable", "Not Reusable"] },
  { key: "demo", label: "Demo Available", options: ["Yes", "No"] },
  { key: "deployment", label: "Deployment", options: DEPLOYMENT },
];

const emptySel = () => Object.fromEntries(GROUPS.map((g) => [g.key, new Set()]));

export default function Explore() {
  const { projects, assets } = useData();
  const [params, setParams] = useSearchParams();
  const [selected, setSelected] = useState(emptySel());
  const [query, setQuery] = useState(params.get("q") || "");
  const [sort, setSort] = useState("recent");
  const [view, setView] = useState("grid");

  // Hydrate from URL once
  useEffect(() => {
    const next = emptySel();
    const q = params.get("q") || "";
    // eslint-disable-next-line
    setQuery(q);
    GROUPS.forEach((g) => {
      const v = params.get(g.key);
      if (v) next[g.key].add(v);
    });
    // shorthand: reusable=true
    if (params.get("reusable") === "true") next.reusable.add("Reusable");
    if (params.get("demo") === "true") next.demo.add("Yes");
    // eslint-disable-next-line
    setSelected(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (key, opt) => {
    setSelected((prev) => {
      const next = { ...prev };
      const s = new Set(next[key]);
      s.has(opt) ? s.delete(opt) : s.add(opt);
      next[key] = s;
      return next;
    });
  };

  const clearAll = () => setSelected(emptySel());

  const assetCountBy = useMemo(() => {
    const m = {};
    assets.forEach((a) => (m[a.projectId] = (m[a.projectId] || 0) + 1));
    return m;
  }, [assets]);

  const filtered = useMemo(() => {
    let list = projects.filter((p) => {
      if (query.trim()) {
        const q = query.toLowerCase();
        if (!`${p.name} ${p.description} ${p.domain} ${p.capability} ${p.problem || ""}`
          .toLowerCase().includes(q)) return false;
      }
      if (selected.status.size && !selected.status.has(p.status)) return false;
      if (selected.type.size && !selected.type.has(p.type)) return false;
      if (selected.domain.size && !selected.domain.has(p.domain)) return false;
      if (selected.capability.size && !selected.capability.has(p.capability)) return false;
      if (selected.dataType.size && !selected.dataType.has(p.dataType)) return false;
      if (selected.maturity.size && !selected.maturity.has(p.maturity)) return false;
      if (selected.deployment.size && !selected.deployment.has(p.deployment)) return false;
      if (selected.reusable.size) {
        const want = selected.reusable.has("Reusable");
        const wantNo = selected.reusable.has("Not Reusable");
        if (want && !wantNo && !p.reusable) return false;
        if (!want && wantNo && p.reusable) return false;
      }
      if (selected.demo.size) {
        const yes = selected.demo.has("Yes");
        const no = selected.demo.has("No");
        if (yes && !no && !p.demoAvailable) return false;
        if (!yes && no && p.demoAvailable) return false;
      }
      return true;
    });

    if (sort === "recent") {
      list = [...list].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    } else if (sort === "reusability") {
      list = [...list].sort((a, b) => (assetCountBy[b.id] || 0) - (assetCountBy[a.id] || 0));
    }
    return list;
  }, [projects, selected, query, sort, assetCountBy]);

  return (
    <div className="space-y-6" data-testid="explore-page">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-4xl font-light tracking-tighter">Explore Initiatives</h1>
          <p className="text-sm text-slate-500 mt-1">{filtered.length} of {projects.length} initiatives</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                const sp = new URLSearchParams(params);
                if (e.target.value) sp.set("q", e.target.value); else sp.delete("q");
                setParams(sp, { replace: true });
              }}
              placeholder="Search by name, problem, domain…"
              className="h-9 pl-9 pr-3 w-72 text-sm border border-slate-200 rounded-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 bg-white"
              data-testid="explore-search-input"
            />
          </div>
          <div className="flex items-center border border-slate-200 rounded-sm bg-white h-9">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 ml-3" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-full bg-transparent px-2 text-sm text-slate-700 focus:outline-none"
              data-testid="sort-select"
            >
              <option value="recent">Most recent</option>
              <option value="relevance">Relevance</option>
              <option value="reusability">Reusability</option>
            </select>
          </div>
          <div className="flex items-center border border-slate-200 rounded-sm bg-white h-9">
            <button
              onClick={() => setView("grid")}
              className={`h-full px-2 ${view === "grid" ? "text-slate-900" : "text-slate-400"}`}
              data-testid="view-grid"
              title="Grid"
            ><LayoutGrid className="w-4 h-4" /></button>
            <button
              onClick={() => setView("list")}
              className={`h-full px-2 border-l border-slate-200 ${view === "list" ? "text-slate-900" : "text-slate-400"}`}
              data-testid="view-list"
              title="List"
            ><List className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <FilterPanel groups={GROUPS} selected={selected} onToggle={toggle} onClear={clearAll} />
        <div data-testid="results-container">
          {filtered.length === 0 ? (
            <div className="border border-dashed border-slate-300 bg-white rounded-sm p-16 text-center">
              <div className="font-display text-xl text-slate-900">No initiatives match</div>
              <p className="text-sm text-slate-500 mt-1">Try clearing some filters or searching differently.</p>
              <button
                onClick={clearAll}
                className="mt-4 text-sm text-blue-700 hover:text-blue-800"
                data-testid="empty-clear"
              >Clear all filters</button>
            </div>
          ) : (
            <div className={view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              : "flex flex-col gap-3"
            }>
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} assetsCount={assetCountBy[p.id] || 0} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
