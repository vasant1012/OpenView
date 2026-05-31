import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface FilterGroupDef {
  key: string;
  label: string;
  options: string[];
}

export function FilterPanel({
  groups,
  values,
  onChange,
  onReset,
}: {
  groups: FilterGroupDef[];
  values: Record<string, string[]>;
  onChange: (key: string, next: string[]) => void;
  onReset: () => void;
}) {
  return (
    <aside className="sticky top-20 h-fit w-full rounded-xl border bg-card shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between border-b px-5 py-3">
        <h3 className="text-sm font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>
      <ScrollArea className="max-h-[70vh]">
        <div className="space-y-5 p-5">
          {groups.map((g) => (
            <div key={g.key}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {g.label}
              </p>
              <div className="space-y-1.5">
                {g.options.map((opt) => {
                  const selected = values[g.key]?.includes(opt) ?? false;
                  const id = `${g.key}-${opt}`;
                  return (
                    <label
                      key={opt}
                      htmlFor={id}
                      className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-sm text-foreground hover:bg-accent/40"
                    >
                      <Checkbox
                        id={id}
                        checked={selected}
                        onCheckedChange={(c) => {
                          const current = values[g.key] ?? [];
                          onChange(
                            g.key,
                            c ? [...current, opt] : current.filter((v) => v !== opt),
                          );
                        }}
                      />
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}