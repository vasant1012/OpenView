import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ChevronLeft, Save, RotateCcw } from "lucide-react";
import { useData } from "@/context/DataContext";
import SectionBlock from "@/components/SectionBlock";
import {
  STATUSES, PROJECT_TYPES, DOMAINS, AI_CAPABILITIES,
  DATA_TYPES, MATURITY, DEPLOYMENT,
} from "@/data/mockData";

const empty = {
  name: "",
  status: "Ideation",
  type: "POC",
  domain: "Internal Tools",
  capability: "Generative AI",
  description: "",
  problem: "",
  impact: "",
  models: "",
  integrations: "",
  architecture: "",
  dataType: "Text",
  deployment: "Cloud",
  reusable: false,
  reuseType: "",
  demoAvailable: false,
  maturity: "Experimental",
  lessons: "",
  risks: "",
  ownerName: "",
};

export default function Submit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, upsertProject, resetData } = useData();
  const [form, setForm] = useState(empty);
  const isEdit = !!id;

  // eslint-disable-next-line
  useEffect(() => {
    if (id) {
      const p = projects.find((x) => x.id === id);
      if (p) {
        // eslint-disable-next-line
        setForm({
          ...empty,
          ...p,
          models: (p.models || []).join(", "),
          integrations: (p.integrations || []).join(", "),
          ownerName: p.owner?.name || "",
        });
      }
    }
  }, [id, projects]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Initiative name is required");
      return;
    }
    if (!form.description.trim()) {
      toast.error("Short description is required");
      return;
    }
    const initials = form.ownerName
      .split(" ")
      .map((s) => s[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "—";

    const payload = {
      ...form,
      id: id || `proj-${Date.now()}`,
      models: form.models.split(",").map((s) => s.trim()).filter(Boolean),
      integrations: form.integrations.split(",").map((s) => s.trim()).filter(Boolean),
      owner: { name: form.ownerName || "Unassigned", initials },
      contributors: [],
      tags: [form.domain, form.capability, form.type],
    };

    upsertProject(payload);
    toast.success(isEdit ? "Initiative updated" : "Initiative submitted");
    navigate(`/projects/${payload.id}`);
  };

  return (
    <div className="space-y-6 max-w-4xl" data-testid="submit-page">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1"
        data-testid="submit-back"
      ><ChevronLeft className="w-4 h-4" /> Back</button>

      <header>
        <div className="text-[10px] uppercase tracking-[0.25em] text-brand-700 font-bold mb-2">
          {isEdit ? "Edit Initiative" : "New Initiative"}
        </div>
        <h1 className="font-display text-4xl font-light tracking-tighter">
          {isEdit ? form.name || "Update initiative" : "Submit a new initiative"}
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-2xl">
          The more context you provide, the easier it is to find and reuse. Most fields are optional.
        </p>
      </header>

      <form onSubmit={onSubmit} className="space-y-6">
        <SectionBlock title="Basics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Initiative Name *">
              <input value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} data-testid="form-name" required />
            </Field>
            <Field label="Owner">
              <input value={form.ownerName} onChange={(e) => set("ownerName", e.target.value)} className={inputCls} data-testid="form-owner" />
            </Field>
            <Field label="Status">
              <Select value={form.status} onChange={(v) => set("status", v)} options={STATUSES} testId="form-status" />
            </Field>
            <Field label="Type">
              <Select value={form.type} onChange={(v) => set("type", v)} options={PROJECT_TYPES} testId="form-type" />
            </Field>
            <Field label="Domain">
              <Select value={form.domain} onChange={(v) => set("domain", v)} options={DOMAINS} testId="form-domain" />
            </Field>
            <Field label="AI Capability">
              <Select value={form.capability} onChange={(v) => set("capability", v)} options={AI_CAPABILITIES} testId="form-capability" />
            </Field>
            <Field label="Short description *" full>
              <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} className={textareaCls} data-testid="form-description" required />
            </Field>
          </div>
        </SectionBlock>

        <SectionBlock title="Business Context">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Problem" full>
              <textarea value={form.problem} onChange={(e) => set("problem", e.target.value)} rows={2} className={textareaCls} data-testid="form-problem" />
            </Field>
            <Field label="Impact / KPIs" full>
              <textarea value={form.impact} onChange={(e) => set("impact", e.target.value)} rows={2} className={textareaCls} data-testid="form-impact" />
            </Field>
          </div>
        </SectionBlock>

        <SectionBlock title="AI & Delivery">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Data Type">
              <Select value={form.dataType} onChange={(v) => set("dataType", v)} options={DATA_TYPES} testId="form-data-type" />
            </Field>
            <Field label="Deployment">
              <Select value={form.deployment} onChange={(v) => set("deployment", v)} options={DEPLOYMENT} testId="form-deployment" />
            </Field>
            <Field label="Maturity">
              <Select value={form.maturity} onChange={(v) => set("maturity", v)} options={MATURITY} testId="form-maturity" />
            </Field>
            <Field label="Reuse Type (if reusable)">
              <input value={form.reuseType} onChange={(e) => set("reuseType", e.target.value)} className={inputCls} data-testid="form-reuse-type" />
            </Field>
            <Field label="Models / Frameworks (comma separated)" full>
              <input value={form.models} onChange={(e) => set("models", e.target.value)} className={inputCls} data-testid="form-models" />
            </Field>
            <Field label="Integrations (comma separated)" full>
              <input value={form.integrations} onChange={(e) => set("integrations", e.target.value)} className={inputCls} data-testid="form-integrations" />
            </Field>
            <Field label="Architecture Summary" full>
              <textarea value={form.architecture} onChange={(e) => set("architecture", e.target.value)} rows={2} className={textareaCls} data-testid="form-architecture" />
            </Field>
          </div>
        </SectionBlock>

        <SectionBlock title="Reusability & Insights">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Reusable">
              <label className="flex items-center gap-3 text-sm cursor-pointer h-10">
                <input
                  type="checkbox"
                  checked={form.reusable}
                  onChange={(e) => set("reusable", e.target.checked)}
                  className="w-4 h-4 accent-brand-600"
                  data-testid="form-reusable"
                />
                Mark this initiative as reusable
              </label>
            </Field>
            <Field label="Demo Available">
              <label className="flex items-center gap-3 text-sm cursor-pointer h-10">
                <input
                  type="checkbox"
                  checked={form.demoAvailable}
                  onChange={(e) => set("demoAvailable", e.target.checked)}
                  className="w-4 h-4 accent-brand-600"
                  data-testid="form-demo"
                />
                A demo is currently available
              </label>
            </Field>
            <Field label="Lessons Learned" full>
              <textarea value={form.lessons} onChange={(e) => set("lessons", e.target.value)} rows={2} className={textareaCls} data-testid="form-lessons" />
            </Field>
            <Field label="Risks" full>
              <textarea value={form.risks} onChange={(e) => set("risks", e.target.value)} rows={2} className={textareaCls} data-testid="form-risks" />
            </Field>
          </div>
        </SectionBlock>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => {
              resetData();
              toast.success("Demo data reset");
            }}
            className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1.5"
            data-testid="reset-data"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset demo data
          </button>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="h-10 px-4 text-sm border border-slate-200 rounded-sm hover:border-slate-400 text-slate-700"
              data-testid="form-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 px-5 text-sm font-medium bg-brand-600 text-white rounded-sm hover:bg-brand-700 transition-colors flex items-center gap-2"
              data-testid="form-submit"
            >
              <Save className="w-4 h-4" /> {isEdit ? "Save changes" : "Submit initiative"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const inputCls = "w-full h-10 px-3 text-sm border border-slate-200 rounded-sm bg-white focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15";
const textareaCls = "w-full px-3 py-2 text-sm border border-slate-200 rounded-sm bg-white focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15 leading-relaxed";

function Field({ label, children, full = false }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-1.5">{label}</div>
      {children}
    </div>
  );
}

function Select({ value, onChange, options, testId }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputCls + " bg-white"}
      data-testid={testId}
    >
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}
