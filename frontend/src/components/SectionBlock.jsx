export default function SectionBlock({ title, subtitle, children, action, dense = false }) {
  return (
    <section className="bg-white border border-slate-200 rounded-sm" data-testid={`section-${title?.toLowerCase().replace(/\s/g, "-")}`}>
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">{title}</div>
          {subtitle && <div className="text-sm text-slate-700 mt-0.5">{subtitle}</div>}
        </div>
        {action}
      </div>
      <div className={dense ? "p-0" : "p-6"}>{children}</div>
    </section>
  );
}
