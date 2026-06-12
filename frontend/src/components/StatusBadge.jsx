const STATUS_STYLES = {
  Ideation: "bg-slate-100 text-slate-700 border-slate-200",
  "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
  Completed: "bg-blue-50 text-blue-700 border-blue-200",
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
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    accent: "bg-slate-900 text-white border-slate-900",
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
