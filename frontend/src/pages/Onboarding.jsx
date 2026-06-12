import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Compass, Layers, Plus } from "lucide-react";
import SectionBlock from "@/components/SectionBlock";

const STEPS = [
  { n: "01", title: "Orient yourself", body: "OpenView aggregates every AI initiative across our org — POCs, MVPs, and shipped products. Each is tagged with status, maturity, and reusability signals." },
  { n: "02", title: "Find what's reusable", body: "Use the Asset Library to discover accelerators, demos, prompt packs and templates. Each asset is scored 0-100 for reuse leverage." },
  { n: "03", title: "Explore initiatives", body: "Filter the Explore view by domain, capability, data type, or deployment. Click any KPI on the home dashboard to scope instantly." },
  { n: "04", title: "Submit your work", body: "Use the Submit form to add a new initiative or update an existing one. Aim for a one-paragraph problem statement and a measurable impact." },
  { n: "05", title: "Engage leadership", body: "The Leadership view rolls up portfolio health, capability concentration, and reuse posture." },
];

export default function Onboarding() {
  const navigate = useNavigate();
  return (
    <div className="space-y-8" data-testid="onboarding-page">
      <header className="bg-grid relative border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-transparent dark:from-slate-950 dark:via-slate-950/95 dark:to-transparent" />
        <div className="relative px-8 py-10 max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.25em] text-brand-700 dark:text-brand-400 font-bold mb-3">Start Here</div>
          <h1 className="font-display text-4xl sm:text-5xl font-light tracking-tighter leading-tight">
            A 5-minute tour of OpenView.
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 dark:text-slate-500 leading-relaxed">
            Whether you are a contributor, reviewer or leader, this guide gets you productive
            without reading a wiki.
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-4">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-6 flex gap-6">
              <div className="font-mono text-3xl font-medium text-brand-600 dark:text-brand-400 leading-none shrink-0 w-12">{s.n}</div>
              <div>
                <h3 className="font-display text-xl font-medium text-slate-900 dark:text-slate-100">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 dark:text-slate-500 leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <aside className="space-y-4">
          <SectionBlock title="Next Steps">
            <div className="space-y-3">
              <button
                onClick={() => navigate("/explore")}
                className="w-full text-left p-3 border border-slate-200 dark:border-slate-800 rounded-sm hover:border-brand-600 transition-colors group flex items-center justify-between"
                data-testid="onboarding-explore"
              >
                <span className="flex items-center gap-2 text-sm font-medium"><Compass className="w-4 h-4 text-brand-600" /> Explore Initiatives</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-brand-700 dark:text-brand-400" />
              </button>
              <button
                onClick={() => navigate("/assets")}
                className="w-full text-left p-3 border border-slate-200 dark:border-slate-800 rounded-sm hover:border-brand-600 transition-colors group flex items-center justify-between"
                data-testid="onboarding-assets"
              >
                <span className="flex items-center gap-2 text-sm font-medium"><Layers className="w-4 h-4 text-brand-600" /> Browse Assets</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-brand-700 dark:text-brand-400" />
              </button>
              <button
                onClick={() => navigate("/submit")}
                className="w-full text-left p-3 border border-slate-200 dark:border-slate-800 rounded-sm hover:border-brand-600 transition-colors group flex items-center justify-between"
                data-testid="onboarding-submit"
              >
                <span className="flex items-center gap-2 text-sm font-medium"><Plus className="w-4 h-4 text-brand-600" /> Submit Initiative</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-brand-700 dark:text-brand-400" />
              </button>
            </div>
          </SectionBlock>

          <SectionBlock title="Resources">
            <ul className="space-y-2 text-sm">
              {["Submission guidelines", "Reusability scoring rubric", "Maturity definitions", "Leadership cadence"].map((d) => (
                <li key={d}>
                  <a href="#" className="text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:text-brand-400 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5" /> {d}
                  </a>
                </li>
              ))}
            </ul>
          </SectionBlock>
        </aside>
      </section>
    </div>
  );
}
