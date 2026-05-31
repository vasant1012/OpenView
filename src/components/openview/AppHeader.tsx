import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ModeToggle";

const nav = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore Initiatives" },
  { to: "/assets", label: "Asset Library" },
  { to: "/onboarding", label: "Onboarding" },
  { to: "/leadership", label: "Leadership" },
  { to: "/submit", label: "Submit / Update" },
] as const;

export function AppHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Triogenic AI</span>
            <span className="text-sm font-semibold text-foreground">OpenView</span>
          </span>
        </Link>
        <form
          className="relative flex-1 max-w-xl mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const q = String(data.get("q") ?? "").trim();
            navigate({ to: "/explore", search: { q } as never });
          }}
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            name="q"
            placeholder="Search projects, assets, owners…"
            className="pl-9 bg-surface"
          />
        </form>
        <div className="hidden lg:flex items-center gap-3">
          <nav className="flex items-center gap-1">
            {nav.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <ModeToggle />
        </div>
      </div>
      <nav className="lg:hidden border-t">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2">
          {nav.map((n) => {
            const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-xs font-medium",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50",
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}