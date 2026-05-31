import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { PageHeader } from "@/components/openview/PageHeader";
import { SectionBlock } from "@/components/openview/SectionBlock";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";

const submitSearch = z.object({
  mode: fallback(z.enum(["new", "update"]), "new").default("new"),
});

export const Route = createFileRoute("/submit")({
  validateSearch: zodValidator(submitSearch),
  head: () => ({
    meta: [
      { title: "Submit or Update · OpenView" },
      { name: "description", content: "Submit a new AI initiative or update an existing one in OpenView." },
    ],
  }),
  component: SubmitPage,
});

type FormState = {
  name: string;
  status: string;
  projectType: string;
  domain: string;
  owner: string;
  problem: string;
  useCase: string;
  users: string;
  impact: string;
  capability: string;
  models: string;
  dataType: string;
  reusable: string;
  reuseType: string;
  reuseEffort: string;
  demo: string;
  assetLinks: string[];
  deployment: string;
  architecture: string;
};
const required: Array<{ key: keyof FormState; label: string }> = [
  { key: "name", label: "Initiative name" },
  { key: "owner", label: "Owner" },
  { key: "status", label: "Status" },
  { key: "domain", label: "Domain" },
  { key: "capability", label: "AI Capability" },
  { key: "reusable", label: "Reusability" },
];
const Req = () => <span className="text-destructive">*</span>;

function SubmitPage() {
  const { mode } = Route.useSearch();
  const [form, setForm] = useState<FormState>({
    name: "", status: "", projectType: "", domain: "", owner: "",
    problem: "", useCase: "", users: "", impact: "",
    capability: "", models: "", dataType: "",
    reusable: "", reuseType: "", reuseEffort: "", demo: "", assetLinks: [""],
    deployment: "", architecture: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    for (const r of required) if (!String(form[r.key]).trim()) next[r.key] = `${r.label} is required`;
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error(`Please complete ${Object.keys(next).length} required field${Object.keys(next).length === 1 ? "" : "s"}.`);
      return;
    }
    toast.success(mode === "update" ? "Changes saved." : "Initiative submitted for review.");
  };
  const errClass = (k: keyof FormState) =>
    errors[k] ? "border-destructive ring-1 ring-destructive/40" : "";
  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      <PageHeader
        eyebrow="Contribute"
        title={mode === "update" ? "Update an Initiative" : "Submit a New Initiative"}
        description="Provide structured information so OpenView can categorize, recommend, and surface your work."
      />
      <form className="space-y-4" onSubmit={submit} noValidate>
        <SectionBlock title="Basics">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Initiative name <Req /></Label>
              <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Claims Triage Copilot" className={`mt-1 ${errClass("name")}`} />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <Label>Owner <Req /></Label>
              <Input value={form.owner} onChange={(e) => set("owner", e.target.value)} placeholder="Full name" className={`mt-1 ${errClass("owner")}`} />
              {errors.owner && <p className="mt-1 text-xs text-destructive">{errors.owner}</p>}
            </div>
            <div>
              <Label>Status <Req /></Label>
              <Select value={form.status} onValueChange={(v) => set("status", v)}>
                <SelectTrigger className={`mt-1 ${errClass("status")}`}><SelectValue placeholder="Select…" /></SelectTrigger>
                <SelectContent>
                  {["Idea","In Progress","Completed","Production"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            {errors.status && <p className="mt-1 text-xs text-destructive">{errors.status}</p>}
            </div>
            <div>
              <Label>Project Type</Label>
              <Select value={form.projectType} onValueChange={(v) => set("projectType", v)}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select…" /></SelectTrigger>
                <SelectContent>
                  {["POC","MVP","Accelerator","Product"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Domain <Req /></Label>
              <Select value={form.domain} onValueChange={(v) => set("domain", v)}>
                <SelectTrigger className={`mt-1 ${errClass("domain")}`}><SelectValue placeholder="Select…" /></SelectTrigger>
                <SelectContent>
                  {["Banking","Healthcare","Retail","Manufacturing","Insurance","Telecom"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.domain && <p className="mt-1 text-xs text-destructive">{errors.domain}</p>}
            </div>
          </div>
        </SectionBlock>

        <SectionBlock title="Business context">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="problem">Problem statement</Label>
              <Textarea id="problem" value={form.problem} onChange={(e) => set("problem", e.target.value)} placeholder="What problem does this solve?" className="mt-1" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Use case category</Label>
                <Select value={form.useCase} onValueChange={(v) => set("useCase", v)}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select…" /></SelectTrigger>
                  <SelectContent>
                    {["Automation","Insights","Customer Experience","Risk & Compliance","Operations","Productivity"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Target users</Label>
                <Input value={form.users} onChange={(e) => set("users", e.target.value)} placeholder="e.g. Claims adjusters" className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="impact">Impact / KPIs</Label>
              <Textarea id="impact" value={form.impact} onChange={(e) => set("impact", e.target.value)} placeholder="Measured or target impact" className="mt-1" />
            </div>
          </div>
        </SectionBlock>

        <SectionBlock title="AI & data">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>AI capability <Req /></Label>
              <Select value={form.capability} onValueChange={(v) => set("capability", v)}>
                <SelectTrigger className={`mt-1 ${errClass("capability")}`}><SelectValue placeholder="Select…" /></SelectTrigger>
                <SelectContent>
                  {["NLP","Computer Vision","Generative AI","Forecasting","Recommender","Speech"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.capability && <p className="mt-1 text-xs text-destructive">{errors.capability}</p>}
            </div>
            <div>
              <Label htmlFor="models">Models / frameworks</Label>
              <Input id="models" value={form.models} onChange={(e) => set("models", e.target.value)} placeholder="e.g. GPT-4o, LangGraph" className="mt-1" />
            </div>
            <div className="sm:col-span-2">
              <Label>Data type</Label>
              <Select value={form.dataType} onValueChange={(v) => set("dataType", v)}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select…" /></SelectTrigger>
                <SelectContent>
                  {["Tabular","Documents","Images","Audio","Time Series","Logs","Multimodal"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </SectionBlock>
        <SectionBlock title="Reusability">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Reusable? <Req /></Label>
              <Select value={form.reusable} onValueChange={(v) => set("reusable", v)}>
                <SelectTrigger className={`mt-1 ${errClass("reusable")}`}><SelectValue placeholder="Select…" /></SelectTrigger>
                <SelectContent>
                  {["Yes","No","Partial"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.reusable && <p className="mt-1 text-xs text-destructive">{errors.reusable}</p>}
            </div>
            <div>
              <Label>Reuse type</Label>
              <Select value={form.reuseType} onValueChange={(v) => set("reuseType", v)}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select…" /></SelectTrigger>
                <SelectContent>
                  {["Code","Prompt","Architecture","End-to-end"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Reuse effort</Label>
              <Select value={form.reuseEffort} onValueChange={(v) => set("reuseEffort", v)}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select…" /></SelectTrigger>
                <SelectContent>
                  {["Low","Medium","High"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Demo available</Label>
              <Select value={form.demo} onValueChange={(v) => set("demo", v)}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select…" /></SelectTrigger>
                <SelectContent>
                  {["Yes","No"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label>Asset links</Label>
              <div className="mt-1 space-y-2">
                {form.assetLinks.map((link, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={link}
                      onChange={(e) => {
                        const next = [...form.assetLinks];
                        next[idx] = e.target.value;
                        set("assetLinks", next);
                      }}
                      placeholder="https://… or asset id"
                    />
                    {form.assetLinks.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => set("assetLinks", form.assetLinks.filter((_, i) => i !== idx))}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => set("assetLinks", [...form.assetLinks, ""])}>
                  <Plus className="mr-1 h-3.5 w-3.5" /> Add asset link
                </Button>
              </div>
            </div>
          </div>
        </SectionBlock>
        <SectionBlock title="Delivery & architecture">
          <div className="grid gap-4">
            <div>
              <Label>Deployment type</Label>
              <Select value={form.deployment} onValueChange={(v) => set("deployment", v)}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select…" /></SelectTrigger>
                <SelectContent>
                  {["Cloud","On-Prem","Hybrid","Edge"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Architecture summary</Label>
              <Textarea value={form.architecture} onChange={(e) => set("architecture", e.target.value)} placeholder="High-level architecture, key components, data flow…" className="mt-1" />
            </div>
          </div>
        </SectionBlock>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" type="reset">Cancel</Button>
          <Button type="submit">{mode === "update" ? "Save changes" : "Submit initiative"}</Button>
        </div>
      </form>
    </main>
  );
}