import { useNavigate } from "react-router-dom";
import { ArrowRight, Layers, Sparkles, PlayCircle } from "lucide-react";
import { StatusBadge, Tag } from "./StatusBadge";

export default function ProjectCard({ project, assetsCount = 0 }) {
  const navigate = useNavigate();
  const initials = project.owner?.initials || "—";

  return (
    <div
      className="group bg-white border border-slate-200 rounded-sm p-5 flex flex-col transition-all duration-200 hover:border-slate-300 hover:-translate-y-[2px]"
      data-testid={`project-card-${project.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] font-mono text-slate-400 tracking-wider">{project.id.toUpperCase()}</div>
          <h3 className="font-display text-lg font-medium tracking-tight text-slate-900 leading-snug mt-1 line-clamp-2">
            {project.name}
          </h3>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Tag variant="blue">{project.domain}</Tag>
        <Tag>{project.capability}</Tag>
        <Tag variant="outline">{project.type}</Tag>
      </div>

      <p className="mt-4 text-sm text-slate-600 leading-relaxed line-clamp-3">
        {project.description}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-3 text-[11px] border-t border-slate-100 pt-4">
        <div>
          <div className="text-slate-400 uppercase tracking-wider text-[9px]">Maturity</div>
          <div className="text-slate-700 font-medium mt-0.5">{project.maturity}</div>
        </div>
        <div>
          <div className="text-slate-400 uppercase tracking-wider text-[9px]">Deploy</div>
          <div className="text-slate-700 font-medium mt-0.5">{project.deployment}</div>
        </div>
        <div>
          <div className="text-slate-400 uppercase tracking-wider text-[9px]">Reusable</div>
          <div className="text-slate-700 font-medium mt-0.5">{project.reusable ? "Yes" : "No"}</div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-brand-600 text-white text-[10px] font-medium flex items-center justify-center">
            {initials}
          </div>
          <div className="text-xs">
            <div className="text-slate-700 font-medium">{project.owner?.name}</div>
            <div className="text-slate-400 text-[10px]">Owner</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {project.demoAvailable && (
            <span title="Demo available" className="text-brand-600"><PlayCircle className="w-4 h-4" /></span>
          )}
          {project.reusable && (
            <span title="Reusable" className="text-emerald-600"><Sparkles className="w-4 h-4" /></span>
          )}
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            {assetsCount}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => navigate(`/projects/${project.id}`)}
          className="flex-1 h-8 text-xs font-medium border border-slate-200 hover:border-brand-600 hover:bg-brand-600 hover:text-white transition-colors rounded-sm flex items-center justify-center gap-1.5"
          data-testid={`view-details-${project.id}`}
        >
          View Details <ArrowRight className="w-3 h-3" />
        </button>
        <button
          onClick={() => navigate(`/assets?project=${project.id}`)}
          className="h-8 px-3 text-xs font-medium text-slate-700 hover:text-brand-700 border border-slate-200 hover:border-brand-600 rounded-sm transition-colors"
          data-testid={`open-assets-${project.id}`}
        >
          Open Assets
        </button>
      </div>
    </div>
  );
}
