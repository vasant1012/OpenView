import { cn } from "@/lib/utils";

export function SectionBlock({
  title,
  description,
  children,
  className,
  action,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border bg-card p-6 shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <header className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}