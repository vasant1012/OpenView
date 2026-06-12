import { useNavigate } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Tag } from "./StatusBadge";

const TYPE_ICONS = {
  Accelerator: "▲",
  Demo: "▶",
  "Prompt Library": "❝",
  Template: "▢",
  Code: "{ }",
};

export default function AssetCard({ asset, projectName }) {
  const navigate = useNavigate();
  return (
    <div
      className="group bg-white border border-slate-200 rounded-sm p-5 flex flex-col transition-all duration-200 hover:border-slate-300 hover:-translate-y-[2px]"
      data-testid={`asset-card-${asset.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-brand-600 text-white flex items-center justify-center rounded-sm font-mono text-xs">
            {TYPE_ICONS[asset.type] || "•"}
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 tracking-wider">{asset.id.toUpperCase()}</div>
            <h3 className="font-display text-base font-medium tracking-tight text-slate-900 leading-snug">
              {asset.name}
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Tag variant="accent">{asset.type}</Tag>
        <Tag variant="blue">{asset.capability}</Tag>
        <Tag>{asset.maturity}</Tag>
      </div>

      <p className="mt-4 text-sm text-slate-600 leading-relaxed line-clamp-2">
        {asset.description}
      </p>

      {projectName && (
        <div className="mt-3 text-xs text-slate-500">
          Linked to <span className="text-slate-800 font-medium">{projectName}</span>
        </div>
      )}

      <div className="mt-4 border-t border-slate-100 pt-3 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-slate-400 uppercase tracking-wider text-[9px]">Reuse</div>
            <div className="text-slate-900 font-mono font-medium">{asset.reuseScore}<span className="text-slate-400">/100</span></div>
          </div>
          <div>
            <div className="text-slate-400 uppercase tracking-wider text-[9px]">Demo</div>
            <div className={`font-medium mt-0.5 ${asset.demoAvailable ? "text-emerald-700" : "text-slate-400"}`}>
              {asset.demoAvailable ? "Available" : "—"}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => navigate(`/assets/${asset.id}`)}
          className="flex-1 h-8 text-xs font-medium border border-slate-200 hover:border-brand-600 hover:bg-brand-600 hover:text-white transition-colors rounded-sm flex items-center justify-center gap-1.5"
          data-testid={`view-asset-${asset.id}`}
        >
          View Asset <ArrowRight className="w-3 h-3" />
        </button>
        {asset.projectId && (
          <button
            onClick={() => navigate(`/projects/${asset.projectId}`)}
            className="h-8 px-3 text-xs font-medium text-slate-700 hover:text-brand-700 border border-slate-200 hover:border-brand-600 rounded-sm transition-colors flex items-center gap-1"
            data-testid={`open-project-${asset.id}`}
          >
            Project <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
