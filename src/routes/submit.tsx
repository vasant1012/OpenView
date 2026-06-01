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
import {
  SUBMIT_META,
  SUBMIT_HEADER,
  SUBMIT_SECTIONS,
  SUBMIT_FIELDS,
  REQUIRED_FIELDS,
  SUBMIT_BUTTONS,
  STATUS_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  DOMAIN_OPTIONS,
  USE_CASE_OPTIONS,
  CAPABILITY_OPTIONS,
  DATA_TYPE_OPTIONS,
  REUSE_LEVEL_OPTIONS,
  REUSE_TYPE_OPTIONS,
  REUSE_EFFORT_OPTIONS,
  DEMO_OPTIONS,
  DEPLOYMENT_OPTIONS,
} from "@/data/submit";

const submitSearch = z.object({
  mode: fallback(z.enum(["new", "update"]), "new").default("new"),
});

export const Route = createFileRoute("/submit")({
  validateSearch: zodValidator(submitSearch),
  head: () => ({
    meta: [
      { title: SUBMIT_META.title },
      { name: "description", content: SUBMIT_META.description },
    ],
  }),
  component: SubmitPage,
});

type FormState = {
  name: string; status: string; projectType: string; domain: string; owner: string;
  problem: string; useCase: string; users: string; impact: string;
  capability: string; models: string; dataType: string;
  reusable: string; reuseType: string; reuseEffort: string; demo: string;
  assetLinks: string[]; deployment: string; architecture: string;
};

const Req = () => <span className="text-destructive">*</span>;

function SelectField({ options, value, onChange, className }: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`mt-1 ${className ?? ""}`}>
        <SelectValue placeholder="Select…" />
      </SelectTrigger>
      <SelectContent>
        {options.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

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
    for (const r of REQUIRED_FIELDS) if (!String(form[r.key]).trim()) next[r.key] = `${r.label} is required`;
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
        eyebrow={SUBMIT_HEADER.eyebrow}
        title={mode === "update" ? SUBMIT_HEADER.titleUpdate : SUBMIT_HEADER.titleNew}
        description={SUBMIT_HEADER.description}
      />
      <form className="space-y-4" onSubmit={submit} noValidate>

        {/* ── Basics ─────────────────────────────────────────────────────── */}
        <SectionBlock title={SUBMIT_SECTIONS.basics}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="name">{SUBMIT_FIELDS.name.label} <Req /></Label>
              <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)}
                placeholder={SUBMIT_FIELDS.name.placeholder} className={`mt-1 ${errClass("name")}`} />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <Label>{SUBMIT_FIELDS.owner.label} <Req /></Label>
              <Input value={form.owner} onChange={(e) => set("owner", e.target.value)}
                placeholder={SUBMIT_FIELDS.owner.placeholder} className={`mt-1 ${errClass("owner")}`} />
              {errors.owner && <p className="mt-1 text-xs text-destructive">{errors.owner}</p>}
            </div>
            <div>
              <Label>{SUBMIT_FIELDS.status.label} <Req /></Label>
              <SelectField options={STATUS_OPTIONS} value={form.status}
                onChange={(v) => set("status", v)} className={errClass("status")} />
              {errors.status && <p className="mt-1 text-xs text-destructive">{errors.status}</p>}
            </div>
            <div>
              <Label>{SUBMIT_FIELDS.projectType.label}</Label>
              <SelectField options={PROJECT_TYPE_OPTIONS} value={form.projectType}
                onChange={(v) => set("projectType", v)} />
            </div>
            <div>
              <Label>{SUBMIT_FIELDS.domain.label} <Req /></Label>
              <SelectField options={DOMAIN_OPTIONS} value={form.domain}
                onChange={(v) => set("domain", v)} className={errClass("domain")} />
              {errors.domain && <p className="mt-1 text-xs text-destructive">{errors.domain}</p>}
            </div>
          </div>
        </SectionBlock>

        {/* ── Business context ────────────────────────────────────────────── */}
        <SectionBlock title={SUBMIT_SECTIONS.business}>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="problem">{SUBMIT_FIELDS.problem.label}</Label>
              <Textarea id="problem" value={form.problem} onChange={(e) => set("problem", e.target.value)}
                placeholder={SUBMIT_FIELDS.problem.placeholder} className="mt-1" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>{SUBMIT_FIELDS.useCase.label}</Label>
                <SelectField options={USE_CASE_OPTIONS} value={form.useCase}
                  onChange={(v) => set("useCase", v)} />
              </div>
              <div>
                <Label>{SUBMIT_FIELDS.users.label}</Label>
                <Input value={form.users} onChange={(e) => set("users", e.target.value)}
                  placeholder={SUBMIT_FIELDS.users.placeholder} className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="impact">{SUBMIT_FIELDS.impact.label}</Label>
              <Textarea id="impact" value={form.impact} onChange={(e) => set("impact", e.target.value)}
                placeholder={SUBMIT_FIELDS.impact.placeholder} className="mt-1" />
            </div>
          </div>
        </SectionBlock>

        {/* ── AI & data ───────────────────────────────────────────────────── */}
        <SectionBlock title={SUBMIT_SECTIONS.aiData}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>{SUBMIT_FIELDS.capability.label} <Req /></Label>
              <SelectField options={CAPABILITY_OPTIONS} value={form.capability}
                onChange={(v) => set("capability", v)} className={errClass("capability")} />
              {errors.capability && <p className="mt-1 text-xs text-destructive">{errors.capability}</p>}
            </div>
            <div>
              <Label htmlFor="models">{SUBMIT_FIELDS.models.label}</Label>
              <Input id="models" value={form.models} onChange={(e) => set("models", e.target.value)}
                placeholder={SUBMIT_FIELDS.models.placeholder} className="mt-1" />
            </div>
            <div className="sm:col-span-2">
              <Label>{SUBMIT_FIELDS.dataType.label}</Label>
              <SelectField options={DATA_TYPE_OPTIONS} value={form.dataType}
                onChange={(v) => set("dataType", v)} />
            </div>
          </div>
        </SectionBlock>

        {/* ── Reusability ─────────────────────────────────────────────────── */}
        <SectionBlock title={SUBMIT_SECTIONS.reusability}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>{SUBMIT_FIELDS.reusable.label} <Req /></Label>
              <SelectField options={REUSE_LEVEL_OPTIONS} value={form.reusable}
                onChange={(v) => set("reusable", v)} className={errClass("reusable")} />
              {errors.reusable && <p className="mt-1 text-xs text-destructive">{errors.reusable}</p>}
            </div>
            <div>
              <Label>{SUBMIT_FIELDS.reuseType.label}</Label>
              <SelectField options={REUSE_TYPE_OPTIONS} value={form.reuseType}
                onChange={(v) => set("reuseType", v)} />
            </div>
            <div>
              <Label>{SUBMIT_FIELDS.reuseEffort.label}</Label>
              <SelectField options={REUSE_EFFORT_OPTIONS} value={form.reuseEffort}
                onChange={(v) => set("reuseEffort", v)} />
            </div>
            <div>
              <Label>{SUBMIT_FIELDS.demo.label}</Label>
              <SelectField options={DEMO_OPTIONS} value={form.demo}
                onChange={(v) => set("demo", v)} />
            </div>
            <div className="sm:col-span-2">
              <Label>{SUBMIT_FIELDS.assetLinks.label}</Label>
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
                      placeholder={SUBMIT_FIELDS.assetLinks.placeholder}
                    />
                    {form.assetLinks.length > 1 && (
                      <Button type="button" variant="ghost" size="icon"
                        onClick={() => set("assetLinks", form.assetLinks.filter((_, i) => i !== idx))}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm"
                  onClick={() => set("assetLinks", [...form.assetLinks, ""])}>
                  <Plus className="mr-1 h-3.5 w-3.5" /> {SUBMIT_BUTTONS.addAssetLink}
                </Button>
              </div>
            </div>
          </div>
        </SectionBlock>

        {/* ── Delivery & architecture ─────────────────────────────────────── */}
        <SectionBlock title={SUBMIT_SECTIONS.delivery}>
          <div className="grid gap-4">
            <div>
              <Label>{SUBMIT_FIELDS.deployment.label}</Label>
              <SelectField options={DEPLOYMENT_OPTIONS} value={form.deployment}
                onChange={(v) => set("deployment", v)} />
            </div>
            <div>
              <Label>{SUBMIT_FIELDS.architecture.label}</Label>
              <Textarea value={form.architecture} onChange={(e) => set("architecture", e.target.value)}
                placeholder={SUBMIT_FIELDS.architecture.placeholder} className="mt-1" />
            </div>
          </div>
        </SectionBlock>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" type="reset">{SUBMIT_BUTTONS.cancel}</Button>
          <Button type="submit">
            {mode === "update" ? SUBMIT_BUTTONS.submitUpdate : SUBMIT_BUTTONS.submitNew}
          </Button>
        </div>
      </form>
    </main>
  );
}