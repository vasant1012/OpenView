import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useData } from "@/context/DataContext";
import FilterPanel from "@/components/FilterPanel";
import AssetCard from "@/components/AssetCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ASSET_TYPES, DOMAINS, AI_CAPABILITIES, MATURITY } from "@/data/mockData";

const GROUPS = [
  { key: "domain", label: "Domain", options: DOMAINS },
  { key: "capability", label: "AI Capability", options: AI_CAPABILITIES },
  { key: "maturity", label: "Maturity", options: MATURITY },
  { key: "reuseScore", label: "Reuse Score", options: ["80+", "60-79", "Below 60"] },
  { key: "demo", label: "Demo Ready", options: ["Yes", "No"] },
];

const emptySel = () => Object.fromEntries(GROUPS.map((g) => [g.key, new Set()]));

export default function Assets() {
  const { assets, projects } = useData();
  const [params, setParams] = useSearchParams();
  const [tab, setTab] = useState("All");
  const [selected, setSelected] = useState(emptySel());
  const [query, setQuery] = useState("");
  const linkedProject = params.get("project");

  useEffect(() => {
    if (linkedProject) {
      // eslint-disable-next-line
      setQuery("");
    }
  }, [linkedProject]);

  const projectMap = useMemo(
    () => Object.fromEntries(projects.map((p) => [p.id, p.name])),
    [projects]
  );

  const toggle = (key, opt) => {
    setSelected((prev) => {
      const next = { ...prev };
      const s = new Set(next[key]);
      s.has(opt) ? s.delete(opt) : s.add(opt);
      next[key] = s;
      return next;
    });
  };

  const filtered = useMemo(() => {
    return assets.filter((a) => {
      if (tab !== "All" && a.type !== tab) return false;
      if (linkedProject && a.projectId !== linkedProject) return false;
      if (query.trim() && !`${a.name} ${a.description}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (selected.domain.size && !selected.domain.has(a.domain)) return false;
      if (selected.capability.size && !selected.capability.has(a.capability)) return false;
      if (selected.maturity.size && !selected.maturity.has(a.maturity)) return false;
      if (selected.demo.size) {
        const yes = selected.demo.has("Yes"); const no = selected.demo.has("No");
        if (yes && !no && !a.demoAvailable) return false;
        if (!yes && no && a.demoAvailable) return false;
      }
      if (selected.reuseScore.size) {
        const fits = [...selected.reuseScore].some((b) =>
          (b === "80+" && a.reuseScore >= 80) ||
          (b === "60-79" && a.reuseScore >= 60 && a.reuseScore < 80) ||
          (b === "Below 60" && a.reuseScore < 60)
        );
        if (!fits) return false;
      }
      return true;
    });
  }, [assets, selected, query, tab, linkedProject]);

  return (
    <div className="space-y-6" data-testid="assets-page">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-4xl font-light tracking-tighter">Asset Library</h1>
          <p className="text-sm text-slate-500 mt-1">
            {filtered.length} of {assets.length} assets
            {linkedProject && (
              <> · linked to <span className="font-medium text-slate-700">{projectMap[linkedProject]}</span>
                <button
                  onClick={() => setParams({})}
                  className="text-brand-700 ml-2 hover:underline"
                  data-testid="clear-project-filter"
                >Clear</button>
              </>
            )}
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assets…"
            className="h-9 pl-9 pr-3 w-72 text-sm border border-slate-200 rounded-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15 bg-white"
            data-testid="assets-search-input"
          />
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-slate-100 rounded-sm">
          {["All", ...ASSET_TYPES].map((t) => (
            <TabsTrigger
              key={t}
              value={t}
              className="rounded-sm data-[state=active]:bg-white data-[state=active]:text-slate-900 text-xs"
              data-testid={`tab-${t.toLowerCase().replace(/\s/g, "-")}`}
            >
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <FilterPanel
          groups={GROUPS}
          selected={selected}
          onToggle={toggle}
          onClear={() => setSelected(emptySel())}
        />
        <div data-testid="assets-results">
          {filtered.length === 0 ? (
            <div className="border border-dashed border-slate-300 bg-white rounded-sm p-16 text-center">
              <div className="font-display text-xl">No assets match</div>
              <p className="text-sm text-slate-500 mt-1">Adjust filters or change tab.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((a) => (
                <AssetCard key={a.id} asset={a} projectName={projectMap[a.projectId]} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
