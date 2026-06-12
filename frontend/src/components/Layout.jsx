import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Search, Sparkles, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataContext";
import SettingsMenu from "@/components/SettingsMenu";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/assets", label: "Asset Library" },
  { to: "/onboarding", label: "Onboarding" },
  { to: "/leadership", label: "Leadership" },
];

export default function Layout({ children }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { projects, assets } = useData();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setOpen(false);
    // eslint-disable-next-line
    setQuery("");
  }, [location.pathname]);

  const submit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
  };

  const results = query.trim()
    ? {
        projects: projects
          .filter((p) =>
            (p.name + p.description + p.domain + p.capability)
              .toLowerCase()
              .includes(query.toLowerCase())
          )
          .slice(0, 4),
        assets: assets
          .filter((a) =>
            (a.name + a.description + a.type + a.capability)
              .toLowerCase()
              .includes(query.toLowerCase())
          )
          .slice(0, 4),
      }
    : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100" data-testid="app-root">
      <header
        className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
        data-testid="app-header"
      >
        <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center gap-8">
          <NavLink
            to="/"
            className="flex items-center gap-2 group"
            data-testid="logo-link"
          >
            <div className="w-8 h-8 bg-brand-600 text-white flex items-center justify-center rounded-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm font-semibold tracking-tight">
                Tavant <span className="text-brand-600 dark:text-brand-400">AI</span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 dark:text-slate-500 -mt-0.5">
                OpenView
              </div>
            </div>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1" data-testid="main-nav">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `text-sm px-3 py-1.5 rounded-sm transition-colors ${
                    isActive
                      ? "text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800"
                      : "text-slate-600 dark:text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/40 dark:bg-slate-950"
                  }`
                }
                data-testid={`nav-${n.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <form
            onSubmit={submit}
            className="flex-1 max-w-md relative"
            data-testid="global-search-form"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
                placeholder="Search initiatives, assets, capabilities…"
                className="w-full h-9 pl-9 pr-3 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-sm focus:border-brand-600 focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-600/15"
                data-testid="global-search-input"
              />
            </div>
            {open && results && (results.projects.length + results.assets.length > 0) && (
              <div
                className="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden z-50"
                data-testid="global-search-results"
              >
                {results.projects.length > 0 && (
                  <div className="border-b border-slate-100 dark:border-slate-800/60">
                    <div className="px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-950">
                      Initiatives
                    </div>
                    {results.projects.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onMouseDown={() => navigate(`/projects/${p.id}`)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/40 dark:bg-slate-950 flex items-center justify-between"
                        data-testid={`search-project-${p.id}`}
                      >
                        <span className="truncate">{p.name}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 ml-3">{p.capability}</span>
                      </button>
                    ))}
                  </div>
                )}
                {results.assets.length > 0 && (
                  <div>
                    <div className="px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-950">
                      Assets
                    </div>
                    {results.assets.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onMouseDown={() => navigate(`/assets/${a.id}`)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/40 dark:bg-slate-950 flex items-center justify-between"
                        data-testid={`search-asset-${a.id}`}
                      >
                        <span className="truncate">{a.name}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 ml-3">{a.type}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </form>

          <SettingsMenu />
          <Button
            onClick={() => navigate("/submit")}
            className="bg-brand-600 hover:bg-brand-700 text-white rounded-sm h-9"
            data-testid="header-submit-button"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Submit
          </Button>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-8">{children}</main>

      <footer className="border-t border-slate-200 dark:border-slate-800 mt-16 py-6 px-6 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 flex items-center justify-between max-w-[1440px] mx-auto">
        <span>© {new Date().getFullYear()} Tavant AI OpenView · Internal Preview</span>
        <span className="font-mono">v1.0.0</span>
      </footer>
    </div>
  );
}
