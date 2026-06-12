const STATUS_STYLES = {
  Ideation: "bg-slate-100 text-slate-700 border-slate-200",
  "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
  Completed: "bg-brand-50 text-brand-700 border-brand-100",
  Production: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export function StatusBadge({ status, className = "" }) {
  const style = STATUS_STYLES[status] || "bg-slate-100 text-slate-700 border-slate-200";
  return (
    <span
      className={`inline-flex items-center text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 border rounded-sm ${style} ${className}`}
      data-testid={`status-badge-${status?.toLowerCase().replace(/\s/g, "-")}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-60" />
      {status}
    </span>
  );
}

export function Tag({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-slate-100 text-slate-700 border-slate-200",
    blue: "bg-brand-50 text-brand-700 border-brand-100",
    accent: "bg-brand-600 text-white border-brand-600",
    outline: "bg-white text-slate-700 border-slate-200",
  };
  return (
    <span
      className={`inline-flex items-center text-[10.5px] font-medium px-2 py-0.5 border rounded-sm ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
