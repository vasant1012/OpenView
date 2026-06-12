import { useNavigate } from "react-router-dom";

export default function CTAButtonGroup({ actions }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3" data-testid="cta-button-group">
      {actions.map((a) => (
        <button
          key={a.label}
          onClick={() => navigate(a.to)}
          className={`group text-left p-5 border rounded-sm transition-all duration-200 hover:-translate-y-[1px] ${
            a.primary
              ? "bg-slate-900 text-white border-slate-900 hover:bg-blue-700 hover:border-blue-700"
              : "bg-white text-slate-900 border-slate-200 hover:border-slate-900"
          }`}
          data-testid={`cta-${a.label.toLowerCase().replace(/\s/g, "-")}`}
        >
          <div className="flex items-center gap-2">
            <a.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{a.label}</span>
          </div>
          <div className={`text-xs mt-2 ${a.primary ? "text-slate-300" : "text-slate-500"}`}>
            {a.description}
          </div>
        </button>
      ))}
    </div>
  );
}
