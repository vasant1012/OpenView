export type Status = "Idea" | "In Progress" | "Completed" | "Production";
export type Maturity = "Concept" | "POC" | "MVP" | "Pilot" | "Production";
export type Domain =
  | "Banking"
  | "Healthcare"
  | "Retail"
  | "Manufacturing"
  | "Insurance"
  | "Telecom";
export type AICapability =
  | "NLP"
  | "Computer Vision"
  | "Generative AI"
  | "Forecasting"
  | "Recommender"
  | "Speech";
export type ProjectType = "POC" | "MVP" | "Product" | "Internal Tool";
export type Deployment = "Cloud" | "On-Prem" | "Hybrid" | "Edge";
export type ReuseType = "Code" | "Prompt" | "Architecture" | "End-to-end";
export type ReuseEffort = "Low" | "Medium" | "High";
export type ReuseLevel = "Yes" | "No" | "Partial";
export type UseCaseCategory =
  | "Automation"
  | "Insights"
  | "Customer Experience"
  | "Risk & Compliance"
  | "Operations"
  | "Productivity";

export interface Initiative {
  id: string;
  name: string;
  status: Status;
  type: ProjectType;
  domain: Domain;
  capability: AICapability;
  dataType: string;
  maturity: Maturity;
  reusable: boolean;
  demo: boolean;
  deployment: Deployment;
  owner: string;
  contributors: string[];
  updatedAt: string;
  description: string;
  problem: string;
  users: string;
  impact: string;
  models: string[];
  integrations: string[];
  architecture: string;
  lessons: string;
  risks: string;
  similar: string[];
  assets: string[];
  reuseType?: ReuseType;
  reuseEffort?: ReuseEffort;
  reuseLevel?: ReuseLevel;
  reuseSummary?: string;
  useCaseCategory?: UseCaseCategory;
  clientScenarios?: string;
  industryApplicability?: string;
}

export type AssetType =
  | "Accelerator"
  | "Demo"
  | "Prompt Library"
  | "Template"
  | "Code";

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  capability: AICapability;
  maturity: Maturity;
  domain: Domain;
  linkedProject: string;
  description: string;
  reuseScore: number;
  demoReady: boolean;
  stack: string[];
  docs: string[];
  constraints: string;
  related: string[];
  reuseType?: ReuseType;
  howToUse?: string;
  whenToUse?: string;
  integrationEffort?: ReuseEffort;
  dependencies?: string;
  limitations?: string;
  security?: string;
}

export const initiatives: Initiative[] = [
  {
    id: "claims-triage",
    name: "Claims Triage Copilot",
    status: "Production",
    type: "Product",
    domain: "Insurance",
    capability: "Generative AI",
    dataType: "Documents",
    maturity: "Production",
    reusable: true,
    demo: true,
    deployment: "Cloud",
    owner: "Priya Menon",
    contributors: ["A. Kumar", "L. Zhao", "M. Singh"],
    updatedAt: "2 days ago",
    description:
      "LLM-powered triage assistant that classifies and summarizes inbound insurance claims.",
    problem:
      "Adjusters spend 40% of their day reading unstructured claim documents before action.",
    users: "Claims adjusters, supervisors, fraud analysts.",
    impact: "Cuts triage time by 62%, lifts SLA adherence to 94%.",
    models: ["GPT-4o", "RAG", "LangGraph"],
    integrations: ["Guidewire", "Snowflake", "ServiceNow"],
    architecture:
      "Event-driven pipeline: doc ingest → OCR → embedding store → RAG agent → reviewer UI.",
    lessons:
      "Human-in-the-loop review gates were critical to land regulatory approval.",
    risks: "Model drift on new policy templates; mitigated via weekly evals.",
    similar: ["fraud-graph", "underwriting-assist"],
    assets: ["acc-claims", "demo-claims", "prompt-claims"],
  },
  {
    id: "fraud-graph",
    name: "Fraud Graph Analyzer",
    status: "In Progress",
    type: "MVP",
    domain: "Banking",
    capability: "Forecasting",
    dataType: "Tabular",
    maturity: "MVP",
    reusable: true,
    demo: false,
    deployment: "Hybrid",
    owner: "Daniel Cho",
    contributors: ["R. Patel", "S. Iyer"],
    updatedAt: "5 hours ago",
    description:
      "Graph-neural-network fraud ring detection across transactional and KYC data.",
    problem: "Rule-based fraud engines miss organized multi-account schemes.",
    users: "Fraud operations, AML analysts.",
    impact: "+38% true-positive uplift in pilot.",
    models: ["GraphSAGE", "XGBoost"],
    integrations: ["Kafka", "Neo4j"],
    architecture: "Streaming features → GNN scoring → analyst review queue.",
    lessons: "Feature freshness matters more than model depth.",
    risks: "Label scarcity in new geographies.",
    similar: ["claims-triage"],
    assets: ["acc-graph", "tmpl-fraud"],
  },
  {
    id: "shelf-vision",
    name: "Shelf Vision Analytics",
    status: "Completed",
    type: "Product",
    domain: "Retail",
    capability: "Computer Vision",
    dataType: "Images",
    maturity: "Production",
    reusable: true,
    demo: true,
    deployment: "Edge",
    owner: "Mei Tanaka",
    contributors: ["J. Alvarez"],
    updatedAt: "1 week ago",
    description: "On-device CV for planogram compliance and stockout detection.",
    problem: "Field reps audit shelves manually, sample <5% of stores weekly.",
    users: "Field merchandisers, category managers.",
    impact: "Coverage from 5% to 100%; OOS down 22%.",
    models: ["YOLOv8", "CLIP"],
    integrations: ["SAP Retail", "Looker"],
    architecture: "Edge inference + nightly sync to cloud warehouse.",
    lessons: "Lighting variance dominated error budget.",
    risks: "Device fleet management overhead.",
    similar: ["doc-extractor"],
    assets: ["demo-shelf", "code-shelf"],
  },
  {
    id: "doc-extractor",
    name: "Universal Document Extractor",
    status: "Production",
    type: "Product",
    domain: "Banking",
    capability: "NLP",
    dataType: "Documents",
    maturity: "Production",
    reusable: true,
    demo: true,
    deployment: "Cloud",
    owner: "Hannah Becker",
    contributors: ["P. Rao", "K. Williams"],
    updatedAt: "3 days ago",
    description: "Schema-flexible IDP service for KYC, statements, and contracts.",
    problem: "Each new doc type required 6–8 weeks of model work.",
    users: "Onboarding ops, lending ops.",
    impact: "Onboarding handle-time down 47%.",
    models: ["LayoutLMv3", "GPT-4o"],
    integrations: ["S3", "Salesforce"],
    architecture: "Doc API → layout model → LLM normalization → schema validator.",
    lessons: "Schema-as-prompt beat fine-tuning for long-tail templates.",
    risks: "Cost per page on high-volume tenants.",
    similar: ["claims-triage"],
    assets: ["acc-idp", "prompt-idp", "tmpl-idp"],
  },
  {
    id: "voice-care",
    name: "VoiceCare Triage",
    status: "In Progress",
    type: "MVP",
    domain: "Healthcare",
    capability: "Speech",
    dataType: "Audio",
    maturity: "Pilot",
    reusable: false,
    demo: true,
    deployment: "Cloud",
    owner: "Dr. Ana Ruiz",
    contributors: ["T. Brooks"],
    updatedAt: "Yesterday",
    description: "Speech-to-intent triage for nurse hotlines.",
    problem: "Avg call duration 9 min, 30% are routing-only.",
    users: "Triage nurses, call-center supervisors.",
    impact: "Routing-only calls deflected by 71% in pilot.",
    models: ["Whisper-large", "Llama-3"],
    integrations: ["Twilio", "Epic"],
    architecture: "Streaming ASR → intent → routing handoff.",
    lessons: "Clinician trust required explicit confidence display.",
    risks: "HIPAA audit cadence.",
    similar: ["claims-triage"],
    assets: ["demo-voice"],
  },
  {
    id: "demand-forecast",
    name: "Demand Forecast Studio",
    status: "Completed",
    type: "Product",
    domain: "Manufacturing",
    capability: "Forecasting",
    dataType: "Time Series",
    maturity: "Production",
    reusable: true,
    demo: false,
    deployment: "Cloud",
    owner: "Lucas Field",
    contributors: ["N. Park"],
    updatedAt: "4 days ago",
    description: "Hierarchical forecasting with reconciliation and what-if scans.",
    problem: "Planners maintained 12 disconnected Excel models.",
    users: "Supply planners, finance.",
    impact: "Forecast MAPE −18%, planning cycle 5d → 1d.",
    models: ["Prophet", "Temporal Fusion Transformer"],
    integrations: ["SAP IBP", "Snowflake"],
    architecture: "Feature store → ensemble → reconciliation → scenario UI.",
    lessons: "Reconciliation was the real value, not the model.",
    risks: "Cold-start for new SKUs.",
    similar: ["fraud-graph"],
    assets: ["acc-forecast", "tmpl-forecast"],
  },
  {
    id: "underwriting-assist",
    name: "Underwriting Assist",
    status: "Idea",
    type: "POC",
    domain: "Insurance",
    capability: "Generative AI",
    dataType: "Documents",
    maturity: "Concept",
    reusable: false,
    demo: false,
    deployment: "Cloud",
    owner: "Priya Menon",
    contributors: [],
    updatedAt: "Just now",
    description: "Copilot for commercial underwriters to draft risk memos.",
    problem: "Memo prep takes 4–6 hours per submission.",
    users: "Underwriters, brokers.",
    impact: "Target 60% draft time reduction.",
    models: ["Claude 3.5", "RAG"],
    integrations: ["Duck Creek"],
    architecture: "TBD — discovery phase.",
    lessons: "—",
    risks: "Data access from carrier partners.",
    similar: ["claims-triage"],
    assets: [],
  },
  {
    id: "net-copilot",
    name: "Network Ops Copilot",
    status: "In Progress",
    type: "Product",
    domain: "Telecom",
    capability: "Generative AI",
    dataType: "Logs",
    maturity: "Pilot",
    reusable: true,
    demo: true,
    deployment: "Hybrid",
    owner: "Omar Haddad",
    contributors: ["F. Chen", "V. Singh"],
    updatedAt: "6 hours ago",
    description: "Conversational copilot for L1/L2 network operations.",
    problem: "MTTR dominated by runbook lookup time.",
    users: "NOC engineers.",
    impact: "MTTR −34% in pilot region.",
    models: ["GPT-4o", "RAG"],
    integrations: ["Splunk", "ServiceNow"],
    architecture: "Log RAG + tool-using agent + audit trail.",
    lessons: "Tool-call grounding was essential to avoid hallucinated commands.",
    risks: "Action gating policy across regions.",
    similar: ["doc-extractor"],
    assets: ["acc-noc", "demo-noc"],
  },
];

export const assets: Asset[] = [
  {
    id: "acc-claims",
    name: "Claims RAG Accelerator",
    type: "Accelerator",
    capability: "Generative AI",
    maturity: "Production",
    domain: "Insurance",
    linkedProject: "claims-triage",
    description: "End-to-end RAG accelerator tuned for insurance claim docs.",
    reuseScore: 92,
    demoReady: true,
    stack: ["Python", "LangGraph", "pgvector"],
    docs: ["Architecture", "Runbook"],
    constraints: "Requires private LLM endpoint.",
    related: ["prompt-claims", "demo-claims"],
  },
  {
    id: "demo-claims",
    name: "Claims Copilot Demo",
    type: "Demo",
    capability: "Generative AI",
    maturity: "Pilot",
    domain: "Insurance",
    linkedProject: "claims-triage",
    description: "Click-through demo with synthetic claim packets.",
    reuseScore: 70,
    demoReady: true,
    stack: ["Next.js"],
    docs: ["Demo script"],
    constraints: "Synthetic data only.",
    related: ["acc-claims"],
  },
  {
    id: "prompt-claims",
    name: "Claims Prompt Library",
    type: "Prompt Library",
    capability: "Generative AI",
    maturity: "MVP",
    domain: "Insurance",
    linkedProject: "claims-triage",
    description: "Curated prompts for triage, summarization, fraud flags.",
    reuseScore: 85,
    demoReady: false,
    stack: ["YAML"],
    docs: ["Prompt guide"],
    constraints: "Tested on GPT-4 family only.",
    related: ["acc-claims"],
  },
  {
    id: "acc-graph",
    name: "Fraud Graph Toolkit",
    type: "Accelerator",
    capability: "Forecasting",
    maturity: "MVP",
    domain: "Banking",
    linkedProject: "fraud-graph",
    description: "GNN scaffolding with Neo4j adapters and eval harness.",
    reuseScore: 78,
    demoReady: false,
    stack: ["PyTorch Geometric", "Neo4j"],
    docs: ["Setup", "Eval guide"],
    constraints: "GPU recommended.",
    related: ["tmpl-fraud"],
  },
  {
    id: "tmpl-fraud",
    name: "Fraud Eval Template",
    type: "Template",
    capability: "Forecasting",
    maturity: "POC",
    domain: "Banking",
    linkedProject: "fraud-graph",
    description: "Notebook template for fraud model evaluation.",
    reuseScore: 60,
    demoReady: false,
    stack: ["Jupyter"],
    docs: ["README"],
    constraints: "—",
    related: ["acc-graph"],
  },
  {
    id: "demo-shelf",
    name: "Shelf Vision Demo",
    type: "Demo",
    capability: "Computer Vision",
    maturity: "Production",
    domain: "Retail",
    linkedProject: "shelf-vision",
    description: "Interactive shelf-image annotator with planogram overlay.",
    reuseScore: 75,
    demoReady: true,
    stack: ["React", "ONNX"],
    docs: ["Run locally"],
    constraints: "Sample images included.",
    related: ["code-shelf"],
  },
  {
    id: "code-shelf",
    name: "Shelf Inference SDK",
    type: "Code",
    capability: "Computer Vision",
    maturity: "Production",
    domain: "Retail",
    linkedProject: "shelf-vision",
    description: "Edge SDK wrapping YOLO + CLIP heads.",
    reuseScore: 88,
    demoReady: false,
    stack: ["C++", "Python"],
    docs: ["API", "Benchmarks"],
    constraints: "ARM64 + CUDA optional.",
    related: ["demo-shelf"],
  },
  {
    id: "acc-idp",
    name: "IDP Accelerator",
    type: "Accelerator",
    capability: "NLP",
    maturity: "Production",
    domain: "Banking",
    linkedProject: "doc-extractor",
    description: "Schema-first document extraction service.",
    reuseScore: 95,
    demoReady: true,
    stack: ["FastAPI", "LayoutLM"],
    docs: ["Architecture", "Tenant onboarding"],
    constraints: "Tenant isolation required.",
    related: ["prompt-idp", "tmpl-idp"],
  },
  {
    id: "prompt-idp",
    name: "IDP Prompt Pack",
    type: "Prompt Library",
    capability: "NLP",
    maturity: "MVP",
    domain: "Banking",
    linkedProject: "doc-extractor",
    description: "Prompt templates for 30+ document types.",
    reuseScore: 82,
    demoReady: false,
    stack: ["JSON"],
    docs: ["Index"],
    constraints: "—",
    related: ["acc-idp"],
  },
  {
    id: "tmpl-idp",
    name: "IDP Schema Template",
    type: "Template",
    capability: "NLP",
    maturity: "MVP",
    domain: "Banking",
    linkedProject: "doc-extractor",
    description: "Reusable JSON-schema templates for KYC, statements.",
    reuseScore: 68,
    demoReady: false,
    stack: ["JSON Schema"],
    docs: ["Schema guide"],
    constraints: "—",
    related: ["acc-idp"],
  },
  {
    id: "demo-voice",
    name: "VoiceCare Demo",
    type: "Demo",
    capability: "Speech",
    maturity: "Pilot",
    domain: "Healthcare",
    linkedProject: "voice-care",
    description: "Recorded triage flows with redacted audio.",
    reuseScore: 55,
    demoReady: true,
    stack: ["Next.js"],
    docs: ["Walkthrough"],
    constraints: "PHI-free samples only.",
    related: [],
  },
  {
    id: "acc-forecast",
    name: "Forecast Studio Core",
    type: "Accelerator",
    capability: "Forecasting",
    maturity: "Production",
    domain: "Manufacturing",
    linkedProject: "demand-forecast",
    description: "Hierarchical forecasting + reconciliation engine.",
    reuseScore: 90,
    demoReady: false,
    stack: ["Python", "Ray"],
    docs: ["Architecture"],
    constraints: "Needs feature store.",
    related: ["tmpl-forecast"],
  },
  {
    id: "tmpl-forecast",
    name: "Scenario Template Pack",
    type: "Template",
    capability: "Forecasting",
    maturity: "MVP",
    domain: "Manufacturing",
    linkedProject: "demand-forecast",
    description: "Pre-built what-if scenarios for S&OP.",
    reuseScore: 72,
    demoReady: false,
    stack: ["YAML"],
    docs: ["Guide"],
    constraints: "—",
    related: ["acc-forecast"],
  },
  {
    id: "acc-noc",
    name: "NOC Copilot Toolkit",
    type: "Accelerator",
    capability: "Generative AI",
    maturity: "Pilot",
    domain: "Telecom",
    linkedProject: "net-copilot",
    description: "Agent toolkit with log-RAG, runbook tools, audit.",
    reuseScore: 80,
    demoReady: true,
    stack: ["Python", "LangGraph"],
    docs: ["Architecture", "Tool guide"],
    constraints: "Requires log access.",
    related: ["demo-noc"],
  },
  {
    id: "demo-noc",
    name: "NOC Copilot Demo",
    type: "Demo",
    capability: "Generative AI",
    maturity: "MVP",
    domain: "Telecom",
    linkedProject: "net-copilot",
    description: "Scripted incident walkthroughs.",
    reuseScore: 65,
    demoReady: true,
    stack: ["React"],
    docs: ["Demo script"],
    constraints: "Synthetic logs only.",
    related: ["acc-noc"],
  },
];

export const activity = [
  { id: 1, project: "Fraud Graph Analyzer", projectId: "fraud-graph", type: "Updated", who: "Daniel Cho", when: "5 hours ago" },
  { id: 2, project: "Network Ops Copilot", projectId: "net-copilot", type: "New asset", who: "Omar Haddad", when: "6 hours ago" },
  { id: 3, project: "VoiceCare Triage", projectId: "voice-care", type: "Status: Pilot", who: "Dr. Ana Ruiz", when: "Yesterday" },
  { id: 4, project: "Claims Triage Copilot", projectId: "claims-triage", type: "Demo added", who: "Priya Menon", when: "2 days ago" },
  { id: 5, project: "Universal Document Extractor", projectId: "doc-extractor", type: "Owner change", who: "Hannah Becker", when: "3 days ago" },
  { id: 6, project: "Demand Forecast Studio", projectId: "demand-forecast", type: "Updated", who: "Lucas Field", when: "4 days ago" },
];

export function getInitiative(id: string) {
  return initiatives.find((i) => i.id === id);
}
export function getAsset(id: string) {
  return assets.find((a) => a.id === id);
}

// ---------- Derived metadata (used when explicit fields are absent) ----------

const capabilityToReuseType: Record<AICapability, ReuseType> = {
  "Generative AI": "Prompt",
  NLP: "End-to-end",
  "Computer Vision": "Code",
  Forecasting: "Architecture",
  Recommender: "Architecture",
  Speech: "Code",
};

const maturityToEffort: Record<Maturity, ReuseEffort> = {
  Concept: "High",
  POC: "High",
  MVP: "Medium",
  Pilot: "Medium",
  Production: "Low",
};

const domainToUseCase: Record<Domain, UseCaseCategory> = {
  Banking: "Risk & Compliance",
  Insurance: "Risk & Compliance",
  Healthcare: "Customer Experience",
  Retail: "Insights",
  Manufacturing: "Operations",
  Telecom: "Operations",
};

export function getReuseType(i: Initiative): ReuseType {
  return i.reuseType ?? capabilityToReuseType[i.capability];
}
export function getReuseEffort(i: Initiative): ReuseEffort {
  return i.reuseEffort ?? maturityToEffort[i.maturity];
}
export function getReuseLevel(i: Initiative): ReuseLevel {
  if (i.reuseLevel) return i.reuseLevel;
  if (i.reusable) return "Yes";
  if (i.assets.length > 0) return "Partial";
  return "No";
}
export function getReuseSummary(i: Initiative): string {
  if (i.reuseSummary) return i.reuseSummary;
  const rt = getReuseType(i);
  switch (rt) {
    case "Prompt":
      return "Prompt library and evaluation harness can be lifted into similar GenAI workflows.";
    case "Code":
      return "Inference SDK and model artifacts can be re-deployed with light integration work.";
    case "Architecture":
      return "Reference architecture, feature pipelines, and runbooks are reusable across teams.";
    case "End-to-end":
      return "Full accelerator including ingestion, model, and UI can be re-skinned for similar domains.";
  }
}
export function getUseCaseCategory(i: Initiative): UseCaseCategory {
  return i.useCaseCategory ?? domainToUseCase[i.domain];
}
export function getClientScenarios(i: Initiative): string {
  return (
    i.clientScenarios ??
    `${i.domain} clients modernizing ${i.capability.toLowerCase()} workflows for ${i.users.toLowerCase()}`
  );
}
export function getIndustryApplicability(i: Initiative): string {
  return (
    i.industryApplicability ??
    `${i.domain} primarily; patterns transfer to adjacent regulated industries.`
  );
}

const assetTypeToReuseType: Record<AssetType, ReuseType> = {
  Accelerator: "End-to-end",
  Demo: "End-to-end",
  "Prompt Library": "Prompt",
  Template: "Architecture",
  Code: "Code",
};

export function getAssetReuseType(a: Asset): ReuseType {
  return a.reuseType ?? assetTypeToReuseType[a.type];
}
export function getAssetIntegrationEffort(a: Asset): ReuseEffort {
  if (a.integrationEffort) return a.integrationEffort;
  if (a.reuseScore >= 85) return "Low";
  if (a.reuseScore >= 65) return "Medium";
  return "High";
}
export function getAssetHowToUse(a: Asset): string {
  return (
    a.howToUse ??
    `Drop-in ${a.type.toLowerCase()} for ${a.capability} workloads on ${a.stack[0] ?? "your stack"}.`
  );
}
export function getAssetWhenToUse(a: Asset): string {
  return (
    a.whenToUse ??
    `Use when starting a new ${a.capability} initiative in ${a.domain} and you need a vetted baseline.`
  );
}
export function getAssetDependencies(a: Asset): string {
  return a.dependencies ?? a.stack.join(", ");
}
export function getAssetLimitations(a: Asset): string {
  return a.limitations ?? a.constraints;
}
export function getAssetSecurity(a: Asset): string {
  return (
    a.security ??
    "Review tenant isolation, data residency, and PII handling before production rollout."
  );
}

// ---------- Aggregations ----------

export function getFunnelCounts() {
  const stages: Array<{ label: string; key: Maturity[] | Status[] }> = [
    { label: "Idea", key: ["Idea"] as Status[] },
    { label: "POC", key: ["Concept", "POC"] as Maturity[] },
    { label: "MVP", key: ["MVP", "Pilot"] as Maturity[] },
    { label: "Production", key: ["Production"] as Maturity[] },
  ];
  return stages.map((s, idx) => {
    const count =
      idx === 0
        ? initiatives.filter((i) => i.status === "Idea").length
        : initiatives.filter((i) => (s.key as Maturity[]).includes(i.maturity)).length;
    return { label: s.label, count };
  });
}

export function getTopDomainsByProduction() {
  const counts = initiatives
    .filter((i) => i.maturity === "Production" || i.status === "Production")
    .reduce<Record<string, number>>((acc, i) => {
      acc[i.domain] = (acc[i.domain] ?? 0) + 1;
      return acc;
    }, {});
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([domain, count]) => ({ domain, count }));
}

export function getTopReusableInitiatives(limit = 4) {
  return [...initiatives]
    .filter((i) => i.reusable)
    .map((i) => {
      const linked = assets.filter((a) => i.assets.includes(a.id));
      const score = linked.length
        ? Math.round(linked.reduce((s, a) => s + a.reuseScore, 0) / linked.length)
        : 0;
      return { initiative: i, score, demoReady: linked.some((a) => a.demoReady) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}