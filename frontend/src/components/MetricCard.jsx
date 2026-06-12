import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MetricCard({ label, value, sublabel, trend, icon: Icon, filterKey, filterValue, accent = false }) {
  const navigate = useNavigate();
  const onClick = () => {
    if (filterKey && filterValue) {
      navigate(`/explore?${filterKey}=${encodeURIComponent(filterValue)}`);
    } else {
      navigate("/explore");
    }
  };
  return (
    <button
      onClick={onClick}
      className={`group text-left bg-white border border-slate-200 rounded-sm p-5 transition-all duration-200 hover:border-slate-300 hover:-translate-y-[1px] ${accent ? "lg:col-span-2" : ""}`}
      data-testid={`metric-card-${label.toLowerCase().replace(/\s/g, "-")}`}
    >
      <div className="flex items-start justify-between">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          {label}
        </div>
        <div className="flex items-center gap-1.5">
          {Icon && <Icon className="w-3.5 h-3.5 text-slate-400" />}
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 transition-colors" />
        </div>
      </div>
      <div className="mt-6 flex items-end gap-3">
        <div className="font-mono text-4xl font-medium tracking-tight text-slate-900 leading-none" data-testid="metric-card-value">
          {value}
        </div>
        {trend && (
          <span className="text-xs text-emerald-600 font-medium pb-1">{trend}</span>
        )}
      </div>
      {sublabel && (
        <div className="mt-2 text-xs text-slate-500">{sublabel}</div>
      )}
    </button>
  );
}
