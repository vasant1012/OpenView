import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ExternalLink, PlayCircle, Download } from "lucide-react";
import { useData } from "@/context/DataContext";
import SectionBlock from "@/components/SectionBlock";
import { Tag } from "@/components/StatusBadge";

export default function AssetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { assets, projects } = useData();
  const asset = assets.find((a) => a.id === id);
  const project = projects.find((p) => p.id === asset?.projectId);
  const related = assets
    .filter((a) => a.id !== id && (a.type === asset?.type || a.capability === asset?.capability))
    .slice(0, 4);

  if (!asset) {
    return (
      <div className="text-center py-20" data-testid="asset-not-found">
        <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500">Asset not found.</p>
        <button onClick={() => navigate("/assets")} className="mt-4 text-brand-700 dark:text-brand-400">Back to library</button>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid={`asset-detail-${id}`}>
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 dark:text-slate-100 flex items-center gap-1"
        data-testid="asset-back-button"
      ><ChevronLeft className="w-4 h-4" /> Back</button>

      <header className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm p-8">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 tracking-wider mb-2">{asset.id.toUpperCase()}</div>
            <h1 className="font-display text-4xl font-light tracking-tighter leading-tight">{asset.name}</h1>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400 dark:text-slate-500 leading-relaxed">{asset.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag variant="accent">{asset.type}</Tag>
              <Tag variant="blue">{asset.capability}</Tag>
              <Tag>{asset.maturity}</Tag>
              {project && (
                <Link to={`/projects/${project.id}`} className="text-xs text-brand-700 dark:text-brand-400 hover:underline ml-1">
                  ↳ {project.name}
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 min-w-[200px]">
            <button
              className="bg-brand-600 text-white text-sm font-medium px-4 h-10 rounded-sm hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
              data-testid="open-asset-cta"
            >
              <PlayCircle className="w-4 h-4" /> {asset.demoAvailable ? "Open Demo" : "Open Asset"}
            </button>
            <button
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm font-medium px-4 h-10 rounded-sm border border-slate-300 dark:border-slate-700 hover:border-brand-600 transition-colors flex items-center justify-center gap-2"
              data-testid="download-asset-cta"
            >
              <Download className="w-4 h-4" /> Download bundle
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          <SectionBlock title="Overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <Field label="Type" value={asset.type} />
              <Field label="Linked Project" value={project?.name || "—"} />
              <Field label="Last Updated" value={new Date(asset.updatedAt).toLocaleDateString()} />
            </div>
          </SectionBlock>

          <SectionBlock title="Reusability">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm items-end">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold mb-2">Reuse Score</div>
                <div className="font-mono text-4xl font-medium tracking-tight text-slate-900 dark:text-slate-100">
                  {asset.reuseScore}<span className="text-slate-400 dark:text-slate-500 text-lg">/100</span>
                </div>
                <div className="mt-2 h-1 bg-slate-100 dark:bg-slate-800 rounded-sm overflow-hidden">
                  <div className="h-full bg-brand-600" style={{ width: `${asset.reuseScore}%` }} />
                </div>
              </div>
              <Field label="Demo" value={asset.demoAvailable ? "Available" : "Not available"} />
              <Field label="Maturity" value={asset.maturity} />
            </div>
          </SectionBlock>

          <SectionBlock title="Technical Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold mb-2">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {asset.techStack.map((t) => <Tag key={t} variant="outline">{t}</Tag>)}
                </div>
              </div>
              <Field label="AI Capability" value={asset.capability} />
              <Field label="Domain" value={asset.domain} />
              <Field label="Project ID" value={asset.projectId || "—"} />
            </div>
          </SectionBlock>

          <SectionBlock title="Documentation">
            <ul className="space-y-2">
              {asset.docs.map((d) => (
                <li key={d}>
                  <a href="#" className="text-sm text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:text-brand-400 flex items-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5" /> {d}
                  </a>
                </li>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock title="Constraints">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{asset.constraints}</p>
          </SectionBlock>
        </div>

        <aside className="space-y-6">
          <SectionBlock title="Related Assets">
            <div className="space-y-3">
              {related.length === 0 && <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500">No related assets.</p>}
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/assets/${r.id}`}
                  className="block group"
                  data-testid={`related-asset-${r.id}`}
                >
                  <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500">{r.type.toUpperCase()}</div>
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-brand-700 dark:text-brand-400">{r.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 line-clamp-1">{r.description}</div>
                </Link>
              ))}
            </div>
          </SectionBlock>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-bold mb-1">{label}</div>
      <div className="text-slate-900 dark:text-slate-100 font-medium">{value || "—"}</div>
    </div>
  );
}
