import { Link } from "@tanstack/react-router";
import { Plus, RefreshCw, Compass, Library } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  { to: "/submit", label: "Submit Initiative", icon: Plus, variant: "default" as const },
  { to: "/submit", label: "Update Initiative", icon: RefreshCw, variant: "secondary" as const, search: { mode: "update" } },
  { to: "/explore", label: "Explore Projects", icon: Compass, variant: "secondary" as const },
  { to: "/assets", label: "Browse Assets", icon: Library, variant: "secondary" as const },
];

export function CTAButtonGroup() {
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((a) => (
        <Button key={a.label} asChild variant={a.variant}>
          <Link to={a.to} search={(a.search ?? {}) as never}>
            <a.icon className="mr-2 h-4 w-4" />
            {a.label}
          </Link>
        </Button>
      ))}
    </div>
  );
}