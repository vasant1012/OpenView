import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { useData } from "@/context/DataContext";
import SectionBlock from "@/components/SectionBlock";
import { StatusBadge } from "@/components/StatusBadge";

const CHART_COLORS = ["#2563EB", "#334155", "#94A3B8", "#CBD5E1", "#0F172A"];

export default function Leadership() {
  const { projects, assets } = useData();
  const navigate = useNavigate();

  const byDomain = useMemo(() => {
    const c = {};
    projects.forEach((p) => (c[p.domain] = (c[p.domain] || 0) + 1));
    return Object.entries(c).map(([name, value]) => ({ name, value }));
  }, [projects]);

  const capabilityRadar = useMemo(() => {
    const c = {};
    projects.forEach((p) => (c[p.capability] = (c[p.capability] || 0) + 1));
    return Object.entries(c).map(([name, value]) => ({ name, value }));
  }, [projects]);

  const reuseDistribution = useMemo(() => {
    const buckets = { "0-49": 0, "50-69": 0, "70-84": 0, "85-100": 0 };
    assets.forEach((a) => {
      const r = a.reuseScore;
      if (r < 50) buckets["0-49"]++;
      else if (r < 70) buckets["50-69"]++;
      else if (r < 85) buckets["70-84"]++;
      else buckets["85-100"]++;
    });
    return Object.entries(buckets).map(([name, value]) => ({ name, value }));
  }, [assets]);

  const inProduction = projects.filter((p) => p.status === "Production");
  const atRisk = projects.filter((p) => p.status === "Ideation" && p.reusable);

  return (
    <div className="space-y-8" data-testid="leadership-page">
      <header>
        <div className="text-[10px] uppercase tracking-[0.25em] text-blue-700 font-bold mb-2">Executive View</div>
        <h1 className="font-display text-4xl font-light tracking-tighter">Portfolio health & posture</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-2xl">
          Curated rollup for leadership cadence. Drill into any tile to inspect the underlying initiatives.
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Initiatives", value: projects.length, sub: "All statuses" },
          { label: "In Production", value: inProduction.length, sub: "Live or post-launch" },
          { label: "Reusable", value: projects.filter((p) => p.reusable).length, sub: "Available to redeploy" },
          { label: "Assets Catalogued", value: assets.length, sub: "Accelerators · Demos · Code" },
        ].map((m) => (
          <div key={m.label} className="bg-white border border-slate-200 rounded-sm p-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{m.label}</div>
            <div className="font-mono text-4xl font-medium tracking-tight mt-4">{m.value}</div>
            <div className="text-xs text-slate-500 mt-2">{m.sub}</div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionBlock title="Initiatives by Domain">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={byDomain} layout="vertical" margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <XAxis type="number" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                <YAxis dataKey="name" type="category" width={130} tick={{ fontSize: 11, fill: "#0F172A" }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 2, fontSize: 12 }} cursor={{ fill: "#F1F5F9" }} />
                <Bar dataKey="value" radius={[0, 2, 2, 0]}>
                  {byDomain.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionBlock>

        <SectionBlock title="Capability Concentration">
          <div className="h-64">
            <ResponsiveContainer>
              <RadarChart data={capabilityRadar}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fill: "#64748B" }} />
                <PolarRadiusAxis tick={{ fontSize: 10, fill: "#94A3B8" }} stroke="#CBD5E1" />
                <Radar dataKey="value" stroke="#2563EB" fill="#2563EB" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </SectionBlock>

        <SectionBlock title="Reuse Score Distribution">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={reuseDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748B" }} axisLine={{ stroke: "#E2E8F0" }} tickLine={false} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 2, fontSize: 12 }} cursor={{ fill: "#F1F5F9" }} />
                <Bar dataKey="value" fill="#0F172A" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionBlock>

        <SectionBlock title="In Production">
          {inProduction.length === 0 ? (
            <p className="text-sm text-slate-500">No initiatives currently in production.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {inProduction.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => navigate(`/projects/${p.id}`)}
                    className="w-full text-left py-3 flex items-center justify-between hover:bg-slate-50 -mx-6 px-6 transition-colors"
                    data-testid={`prod-${p.id}`}
                  >
                    <div>
                      <div className="text-sm font-medium text-slate-900">{p.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{p.domain} · {p.capability}</div>
                    </div>
                    <StatusBadge status={p.status} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </SectionBlock>
      </section>

      {atRisk.length > 0 && (
        <SectionBlock title="Watchlist" subtitle="Reusable initiatives still in ideation">
          <ul className="divide-y divide-slate-100">
            {atRisk.map((p) => (
              <li key={p.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-slate-500">{p.domain} · owner {p.owner?.name}</div>
                </div>
                <button onClick={() => navigate(`/projects/${p.id}`)} className="text-xs text-blue-700 hover:underline">Open</button>
              </li>
            ))}
          </ul>
        </SectionBlock>
      )}
    </div>
  );
}
