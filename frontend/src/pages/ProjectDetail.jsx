import { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ChevronLeft, Pencil, Layers, GitCompare, Lightbulb, ArrowRight,
  ShieldAlert, Users, Calendar,
} from "lucide-react";
import { useData } from "@/context/DataContext";
import SectionBlock from "@/components/SectionBlock";
import { StatusBadge, Tag } from "@/components/StatusBadge";

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects, assets } = useData();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  const linkedAssets = useMemo(
    () => assets.filter((a) => a.projectId === id),
    [assets, id]
  );
  const team = useMemo(() => {
    if (!project) return [];
    return [
      { ...project.owner, role: "Owner" },
      ...(project.contributors || []).map((c) => ({ ...c, role: "Contributor" })),
    ].filter((m) => m && m.name);
  }, [project]);
  const similar = useMemo(() => {
    if (!project) return [];
    return projects
      .filter((p) => p.id !== id && (p.domain === project.domain || p.capability === project.capability))
      .slice(0, 4);
  }, [projects, project, id]);

  if (!project) {
    return (
      <div className="text-center py-20" data-testid="project-not-found">
        <p className="text-slate-500">Initiative not found.</p>
        <button onClick={() => navigate("/explore")} className="mt-4 text-brand-700">Back to Explore</button>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid={`project-detail-${id}`}>
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1"
        data-testid="back-button"
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>

      {/* Header */}
      <header className="bg-white border border-slate-200 rounded-sm p-8">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <div className="text-[10px] font-mono text-slate-400 tracking-wider mb-2">{project.id.toUpperCase()}</div>
            <h1 className="font-display text-4xl font-light tracking-tighter leading-tight">{project.name}</h1>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <StatusBadge status={project.status} />
              <Tag variant="blue">{project.domain}</Tag>
              <Tag>{project.capability}</Tag>
              <Tag variant="outline">{project.type}</Tag>
              <Tag variant="outline">{project.maturity}</Tag>
            </div>
          </div>
          <div className="flex flex-col gap-2 min-w-[200px]">
            <button
              onClick={() => navigate(`/assets?project=${project.id}`)}
              className="bg-brand-600 text-white text-sm font-medium px-4 h-10 rounded-sm hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
              data-testid="view-assets-cta"
            >
              <Layers className="w-4 h-4" /> View Assets ({linkedAssets.length})
            </button>
            <button
              onClick={() => navigate(`/submit/${project.id}`)}
              className="bg-white text-slate-900 text-sm font-medium px-4 h-10 rounded-sm border border-slate-300 hover:border-brand-600 transition-colors flex items-center justify-center gap-2"
              data-testid="suggest-update-cta"
            >
              <Pencil className="w-4 h-4" /> Suggest Update
            </button>
            <button
              onClick={() => navigate(`/explore?capability=${encodeURIComponent(project.capability)}`)}
              className="bg-white text-slate-700 text-sm font-medium px-4 h-10 rounded-sm border border-slate-200 hover:border-brand-600 hover:text-slate-900 transition-colors flex items-center justify-center gap-2"
              data-testid="compare-cta"
            >
              <GitCompare className="w-4 h-4" /> Compare similar
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Left column */}
        <div className="space-y-6">
          <SectionBlock title="Overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <Field label="Owner" value={project.owner?.name} />
              <Field label="Contributors" value={project.contributors?.map((c) => c.name).join(", ")} />
              <Field label="Last Updated" value={new Date(project.updatedAt).toLocaleDateString()} />
            </div>
          </SectionBlock>

          <SectionBlock title="Business Context">
            <div className="space-y-4 text-sm">
              <Field label="Problem" value={project.problem} block />
              <Field label="Users" value={`${project.domain} stakeholders, operators, leadership`} block />
              <Field label="Impact / KPIs" value={project.impact} block />
            </div>
          </SectionBlock>

          <SectionBlock title="AI & Data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <Field label="AI Capability" value={project.capability} />
              <Field label="Data Type" value={project.dataType} />
              <div className="md:col-span-2">
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-2">Models / Frameworks</div>
                <div className="flex flex-wrap gap-2">
                  {project.models?.map((m) => <Tag key={m} variant="outline">{m}</Tag>)}
                </div>
              </div>
            </div>
          </SectionBlock>

          <SectionBlock title="Delivery & Architecture">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <Field label="Deployment" value={project.deployment} />
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-2">Integrations</div>
                <div className="flex flex-wrap gap-2">
                  {project.integrations?.map((m) => <Tag key={m}>{m}</Tag>)}
                </div>
              </div>
              <Field label="Architecture Summary" value={project.architecture} block />
            </div>
          </SectionBlock>

          <SectionBlock title="Reusability & Assets">
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Field label="Reusable" value={project.reusable ? "Yes" : "No"} />
                <Field label="Reuse Type" value={project.reuseType || "—"} />
                <Field label="Demo" value={project.demoAvailable ? "Available" : "—"} />
              </div>
              {linkedAssets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {linkedAssets.map((a) => (
                    <Link
                      key={a.id}
                      to={`/assets/${a.id}`}
                      className="border border-slate-200 rounded-sm p-4 hover:border-brand-600 transition-colors group"
                      data-testid={`linked-asset-${a.id}`}
                    >
                      <div className="text-[10px] font-mono text-slate-400">{a.type.toUpperCase()}</div>
                      <div className="font-medium text-slate-900 group-hover:text-brand-700">{a.name}</div>
                      <div className="text-xs text-slate-500 mt-1 line-clamp-2">{a.description}</div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No linked assets yet.</p>
              )}
            </div>
          </SectionBlock>

          <SectionBlock title="Insights">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-2 flex items-center gap-1.5">
                  <Lightbulb className="w-3 h-3" /> Lessons learned
                </div>
                <p className="text-slate-700 leading-relaxed">{project.lessons}</p>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-2 flex items-center gap-1.5">
                  <ShieldAlert className="w-3 h-3" /> Risks
                </div>
                <p className="text-slate-700 leading-relaxed">{project.risks}</p>
              </div>
            </div>
          </SectionBlock>
        </div>

        {/* Right rail */}
        <aside className="space-y-6">
          <SectionBlock title="Status & Maturity">
            <div className="space-y-4 text-sm">
              <Field label="Status" value={<StatusBadge status={project.status} />} />
              <Field label="Maturity" value={project.maturity} />
              <Field label="Type" value={project.type} />
              <Field label="Deployment" value={project.deployment} />
            </div>
          </SectionBlock>

          <SectionBlock title="Team">
            <div className="space-y-3">
              {team.map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-600 text-white text-[10px] font-medium flex items-center justify-center">
                    {m.initials}
                  </div>
                  <div className="text-sm">
                    <div className="text-slate-900 font-medium">{m.name}</div>
                    <div className="text-xs text-slate-500">{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock title="Discovery">
            <div className="space-y-2 text-sm">
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">Similar Projects</div>
              {similar.length === 0 ? (
                <p className="text-xs text-slate-500">No similar initiatives yet.</p>
              ) : similar.map((p) => (
                <Link
                  key={p.id}
                  to={`/projects/${p.id}`}
                  className="flex items-center justify-between text-sm text-slate-700 hover:text-brand-700 group"
                  data-testid={`similar-${p.id}`}
                >
                  <span className="truncate">{p.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
              <div className="pt-3 border-t border-slate-100">
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-2">Client Opportunities</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  3 active opportunities in {project.domain} could leverage this initiative.
                </p>
              </div>
            </div>
          </SectionBlock>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, value, block = false }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">{label}</div>
      {block ? (
        <p className="text-slate-700 leading-relaxed">{value || "—"}</p>
      ) : (
        <div className="text-slate-900 font-medium">{value || "—"}</div>
      )}
    </div>
  );
}
