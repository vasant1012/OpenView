import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { initiatives } from "@/data/openview";
import { getFunnelCounts, getTopDomainsByProduction } from "@/data/openview";

const palette = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--primary)",
];

export function StatusBarChart() {
  const counts = initiatives.reduce<Record<string, number>>((acc, i) => {
    acc[i.status] = (acc[i.status] ?? 0) + 1;
    return acc;
  }, {});
  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
        <Bar dataKey="value" fill="var(--primary)" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DomainPieChart() {
  const counts = initiatives.reduce<Record<string, number>>((acc, i) => {
    acc[i.domain] = (acc[i.domain] ?? 0) + 1;
    return acc;
  }, {});
  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2}>
          {data.map((_, i) => (
            <Cell key={i} fill={palette[i % palette.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export function CapabilityTagCloud() {
  const counts = initiatives.reduce<Record<string, number>>((acc, i) => {
    acc[i.capability] = (acc[i.capability] ?? 0) + 1;
    return acc;
  }, {});
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, v]) => v));
  return (
    <div className="flex flex-wrap items-center gap-2">
      {entries.map(([name, n]) => {
        const scale = 0.8 + (n / max) * 0.6;
        return (
          <span
            key={name}
            className="rounded-full bg-accent px-3 py-1 font-medium text-accent-foreground"
            style={{ fontSize: `${scale}rem` }}
          >
            {name}
            <span className="ml-1 text-xs text-muted-foreground">{n}</span>
          </span>
        );
      })}
    </div>
  );
}

export function PortfolioFunnel() {
  const data = getFunnelCounts();
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="space-y-3">
      {data.map((stage) => {
        const width = Math.max(8, (stage.count / max) * 100);
        return (
          <div key={stage.label} className="flex items-center gap-3">
            <span className="w-20 text-xs font-medium text-muted-foreground">{stage.label}</span>
            <div className="relative flex-1 h-7 rounded-md bg-muted/50 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all"
                style={{ width: `${width}%` }}
              />
              <span className="absolute inset-0 flex items-center px-2 text-xs font-semibold text-foreground">
                {stage.count}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export function TopDomainsProduction() {
  const data = getTopDomainsByProduction();
  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground">No production initiatives yet.</p>;
  }
  const max = Math.max(...data.map((d) => d.count));
  return (
    <ul className="space-y-2">
      {data.map((d) => (
        <li key={d.domain} className="flex items-center gap-3">
          <span className="w-24 text-xs text-muted-foreground">{d.domain}</span>
          <div className="flex-1 h-2 rounded-full bg-muted/60 overflow-hidden">
            <div className="h-full bg-status-success" style={{ width: `${(d.count / max) * 100}%` }} />
          </div>
          <span className="text-xs font-semibold tabular-nums text-foreground">{d.count}</span>
        </li>
      ))}
    </ul>
  );
}
export function ReuseRateTrend() {
  // Placeholder series — rolling reuse rate over 6 quarters
  const series = [22, 28, 34, 41, 47, 54];
  const max = Math.max(...series);
  const labels = ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2"];
  return (
    <div>
      <div className="flex items-end gap-2 h-32">
        {series.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end">
            <div
              className="w-full rounded-t bg-gradient-to-t from-reusable/60 to-reusable"
              style={{ height: `${(v / max) * 100}%` }}
            />
            <span className="mt-1 text-[10px] text-muted-foreground">{labels[i]}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Reuse rate trend (placeholder) — last reading <span className="font-semibold text-foreground">{series.at(-1)}%</span>.
      </p>
    </div>
  );
}