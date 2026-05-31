import { Link } from "@tanstack/react-router";
import { activity } from "@/data/openview";

export function ActivityList() {
  return (
    <ul className="divide-y">
      {activity.map((item) => (
        <li key={item.id} className="flex items-center justify-between py-3 text-sm">
          <div className="min-w-0">
            <Link
              to="/projects/$projectId"
              params={{ projectId: item.projectId }}
              className="font-medium text-foreground hover:text-primary"
            >
              {item.project}
            </Link>
            <p className="text-xs text-muted-foreground">
              {item.type} · {item.who}
            </p>
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">{item.when}</span>
        </li>
      ))}
    </ul>
  );
}