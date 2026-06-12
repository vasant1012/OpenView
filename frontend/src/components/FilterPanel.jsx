import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { X } from "lucide-react";

export default function FilterPanel({ groups, selected, onToggle, onClear }) {
  const totalActive = Object.values(selected).reduce(
    (acc, set) => acc + (set?.size || 0),
    0
  );

  return (
    <aside className="bg-white border border-slate-200 rounded-sm" data-testid="filter-panel">
      <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-700">
          Filters
        </div>
        {totalActive > 0 && (
          <button
            onClick={onClear}
            className="text-[11px] text-slate-500 hover:text-slate-900 flex items-center gap-1"
            data-testid="filter-clear-all"
          >
            <X className="w-3 h-3" /> Clear {totalActive}
          </button>
        )}
      </div>
      <Accordion type="multiple" defaultValue={groups.map((g) => g.key)} className="px-2">
        {groups.map((g) => (
          <AccordionItem key={g.key} value={g.key} className="border-b border-slate-100 last:border-b-0">
            <AccordionTrigger className="px-3 py-3 text-xs font-medium uppercase tracking-wider text-slate-700 hover:no-underline">
              <span className="flex items-center gap-2">
                {g.label}
                {selected[g.key]?.size > 0 && (
                  <span className="bg-blue-600 text-white text-[9px] font-mono px-1.5 rounded-sm">
                    {selected[g.key].size}
                  </span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-3">
              <div className="space-y-2">
                {g.options.map((opt) => {
                  const id = `${g.key}-${opt}`;
                  const checked = selected[g.key]?.has(opt) || false;
                  return (
                    <label
                      key={opt}
                      htmlFor={id}
                      className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer hover:text-slate-900"
                    >
                      <Checkbox
                        id={id}
                        checked={checked}
                        onCheckedChange={() => onToggle(g.key, opt)}
                        data-testid={`filter-${g.key}-${opt.toLowerCase().replace(/\s/g, "-")}`}
                        className="rounded-sm data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                      <span className="leading-none">{opt}</span>
                    </label>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
}
