import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  Activity, CheckCircle2, Cpu, Layers, PlayCircle, Rocket, Plus, Search,
  Pencil, BookOpen, ArrowRight, Clock,
} from "lucide-react";
import { useData } from "@/context/DataContext";
import MetricCard from "@/components/MetricCard";
import ProjectCard from "@/components/ProjectCard";
import SectionBlock from "@/components/SectionBlock";
import CTAButtonGroup from "@/components/CTAButtonGroup";

const CHART_COLORS = ["#2563EB", "#334155", "#94A3B8", "#CBD5E1", "#0F172A", "#3B82F6", "#64748B", "#1E40AF"];

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function Home() {
  const { projects, assets, updates } = useData();
  const navigate = useNavigate();

  const metrics = useMemo(() => {
    const inProgress = projects.filter((p) => p.status === "In Progress").length;
    const completed = projects.filter((p) => p.status === "Completed").length;
    const production = projects.filter((p) => p.status === "Production").length;
    const reusable = projects.filter((p) => p.reusable).length;
    const demo = projects.filter((p) => p.demoAvailable).length;
    return { total: projects.length, inProgress, completed, production, reusable, demo };
  }, [projects]);

  const statusData = useMemo(() => {
    const counts = {};
    projects.forEach((p) => (counts[p.status] = (counts[p.status] || 0) + 1));
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [projects]);

  const domainData = useMemo(() => {
    const counts = {};
    projects.forEach((p) => (counts[p.domain] = (counts[p.domain] || 0) + 1));
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [projects]);

  const capabilityCloud = useMemo(() => {
    const counts = {};
    projects.forEach((p) => (counts[p.capability] = (counts[p.capability] || 0) + 1));
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [projects]);

  const featured = projects.filter((p) => p.reusable).slice(0, 6);

  const assetCountBy = useMemo(() => {
    const map = {};
    assets.forEach((a) => (map[a.projectId] = (map[a.projectId] || 0) + 1));
    return map;
  }, [assets]);

  return (
    <div className="space-y-10" data-testid="home-page">
      {/* Hero */}
      <div className="bg-grid relative border border-slate-200 rounded-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-transparent" />
        <div className="relative px-8 py-10 lg:py-14 max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.25em] text-blue-700 font-bold mb-3">
            Internal AI Portfolio · Live
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter text-slate-900 leading-[1.05]">
            One window into every<br />
            <span className="text-blue-600 font-medium">AI initiative</span> we ship.
          </h1>
          <p className="mt-5 text-base text-slate-600 leading-relaxed max-w-xl">
            Tavant AI OpenView is the centralized hub for our POCs, MVPs and products —
            discover reusable assets, track maturity, and accelerate the next build.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/explore")}
              className="bg-slate-900 text-white text-sm font-medium px-5 h-10 rounded-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
              data-testid="hero-explore-button"
            >
              Explore Initiatives <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/submit")}
              className="bg-white text-slate-900 text-sm font-medium px-5 h-10 rounded-sm border border-slate-300 hover:border-slate-900 transition-colors"
              data-testid="hero-submit-button"
            >
              Submit Initiative
            </button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <section data-testid="kpi-section">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-2xl font-medium tracking-tight">Portfolio at a glance</h2>
          <span className="text-xs text-slate-500 font-mono">Updated 4m ago</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <MetricCard label="Total Initiatives" value={metrics.total} sublabel="Across 8 domains" icon={Activity} />
          <MetricCard label="In Progress" value={metrics.inProgress} trend="+3 this wk" icon={Cpu} filterKey="status" filterValue="In Progress" />
          <MetricCard label="Completed" value={metrics.completed} icon={CheckCircle2} filterKey="status" filterValue="Completed" />
          <MetricCard label="Production" value={metrics.production} trend="live" icon={Rocket} filterKey="status" filterValue="Production" />
          <MetricCard label="Reusable Assets" value={assets.length} icon={Layers} />
          <MetricCard label="Demo Ready" value={metrics.demo} icon={PlayCircle} filterKey="demo" filterValue="true" />
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionBlock title="Status Distribution" subtitle="Where the portfolio stands">
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748B" }} tickLine={false} axisLine={{ stroke: "#E2E8F0" }} />
                <YAxis tick={{ fontSize: 11, fill: "#64748B" }} tickLine={false} axisLine={{ stroke: "#E2E8F0" }} />
                <Tooltip
                  cursor={{ fill: "#F1F5F9" }}
                  contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 2, fontSize: 12 }}
                />
                <Bar dataKey="value" fill="#2563EB" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionBlock>

        <SectionBlock title="Domain Mix" subtitle="Initiative coverage by domain">
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={domainData} dataKey="value" nameKey="name" innerRadius={42} outerRadius={70} paddingAngle={2}>
                  {domainData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 2, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionBlock>

        <SectionBlock title="AI Capabilities" subtitle="Where the work is concentrated">
          <div className="flex flex-wrap gap-2">
            {capabilityCloud.map((c) => {
              const size = 11 + Math.min(c.count, 5) * 2;
              const opacity = 0.4 + Math.min(c.count, 5) * 0.12;
              return (
                <button
                  key={c.name}
                  onClick={() => navigate(`/explore?capability=${encodeURIComponent(c.name)}`)}
                  style={{ fontSize: `${size}px`, color: `rgba(15,23,42,${opacity})` }}
                  className="font-display font-medium hover:text-blue-700 transition-colors px-1"
                  data-testid={`tag-${c.name.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {c.name}
                  <span className="text-[10px] text-slate-400 font-mono ml-1 align-top">{c.count}</span>
                </button>
              );
            })}
          </div>
        </SectionBlock>
      </section>

      {/* Quick actions + Updates */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <h2 className="font-display text-2xl font-medium tracking-tight mb-4">Quick actions</h2>
          <CTAButtonGroup
            actions={[
              { label: "Submit Initiative", description: "Add a new POC, MVP, or product", icon: Plus, to: "/submit", primary: true },
              { label: "Update Initiative", description: "Refresh status and metadata", icon: Pencil, to: "/explore" },
              { label: "Explore Projects", description: "Browse the full portfolio", icon: Search, to: "/explore" },
              { label: "Browse Assets", description: "Find reusable accelerators", icon: Layers, to: "/assets" },
            ]}
          />
        </div>
        <SectionBlock title="Recent Updates" subtitle="Latest activity">
          <ul className="space-y-3" data-testid="activity-list">
            {updates.slice(0, 6).map((u) => (
              <li key={u.id} className="text-sm group">
                <button
                  onClick={() => u.projectId && navigate(`/projects/${u.projectId}`)}
                  className="w-full text-left flex items-start gap-3 group-hover:text-slate-900"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-slate-900 text-sm font-medium truncate">{u.project}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>{u.type}</span><span>·</span><span>{u.detail}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" /> {timeAgo(u.ts)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </SectionBlock>
      </section>

      {/* Featured */}
      <section data-testid="featured-section">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight">Featured reusable initiatives</h2>
            <p className="text-sm text-slate-500 mt-1">High-leverage builds ready for new engagements</p>
          </div>
          <button
            onClick={() => navigate("/explore?reusable=true")}
            className="text-sm text-blue-700 hover:text-blue-800 flex items-center gap-1"
            data-testid="see-all-featured"
          >
            See all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} assetsCount={assetCountBy[p.id] || 0} />
          ))}
        </div>
      </section>

      {/* Onboarding block */}
      <section
        className="relative border border-slate-200 rounded-sm overflow-hidden bg-slate-900 text-white"
        data-testid="onboarding-block"
      >
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.pexels.com/photos/17483870/pexels-photo-17483870.png)" }}
        />
        <div className="relative px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.25em] text-blue-300 font-bold mb-3">
              Start Here
            </div>
            <h3 className="font-display text-3xl font-light tracking-tight leading-tight">
              New to the platform? Get oriented in 5 minutes.
            </h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-xl">
              A guided walkthrough of how initiatives, assets and reusability scores work,
              plus the submission flow and review standards.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigate("/onboarding")}
              className="bg-white text-slate-900 text-sm font-medium px-5 h-10 rounded-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              data-testid="onboarding-start-button"
            >
              <BookOpen className="w-4 h-4" /> Start the guide
            </button>
            <button
              onClick={() => navigate("/leadership")}
              className="border border-white/30 text-white text-sm font-medium px-5 h-10 rounded-sm hover:bg-white/10 transition-colors"
              data-testid="leadership-view-button"
            >
              Leadership view
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
