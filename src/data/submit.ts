// ─────────────────────────────────────────────────────────────────────────────
// Submit / Update form data — field definitions, select options, section labels,
// validation config. The submit route imports from here; nothing is hardcoded.
// ─────────────────────────────────────────────────────────────────────────────

// ── Page meta ────────────────────────────────────────────────────────────────
export const SUBMIT_META = {
  title: "Submit or Update · OpenView",
  description: "Submit a new AI initiative or update an existing one in OpenView.",
} as const;

// ── Page header ───────────────────────────────────────────────────────────────
export const SUBMIT_HEADER = {
  eyebrow: "Contribute",
  description:
    "Provide structured information so OpenView can categorize, recommend, and surface your work.",
  titleNew: "Submit a New Initiative",
  titleUpdate: "Update an Initiative",
} as const;

// ── Select options ────────────────────────────────────────────────────────────
export const STATUS_OPTIONS        = ["Idea", "In Progress", "Completed", "Production"] as const;
export const PROJECT_TYPE_OPTIONS  = ["POC", "MVP", "Accelerator", "Product"] as const;
export const DOMAIN_OPTIONS        = ["Banking", "Healthcare", "Retail", "Manufacturing", "Insurance", "Telecom"] as const;
export const USE_CASE_OPTIONS      = ["Automation", "Insights", "Customer Experience", "Risk & Compliance", "Operations", "Productivity"] as const;
export const CAPABILITY_OPTIONS    = ["NLP", "Computer Vision", "Generative AI", "Forecasting", "Recommender", "Speech"] as const;
export const DATA_TYPE_OPTIONS     = ["Tabular", "Documents", "Images", "Audio", "Time Series", "Logs", "Multimodal"] as const;
export const REUSE_LEVEL_OPTIONS   = ["Yes", "No", "Partial"] as const;
export const REUSE_TYPE_OPTIONS    = ["Code", "Prompt", "Architecture", "End-to-end"] as const;
export const REUSE_EFFORT_OPTIONS  = ["Low", "Medium", "High"] as const;
export const DEMO_OPTIONS          = ["Yes", "No"] as const;
export const DEPLOYMENT_OPTIONS    = ["Cloud", "On-Prem", "Hybrid", "Edge"] as const;

// ── Section labels ────────────────────────────────────────────────────────────
export const SUBMIT_SECTIONS = {
  basics:       "Basics",
  business:     "Business context",
  aiData:       "AI & data",
  reusability:  "Reusability",
  delivery:     "Delivery & architecture",
} as const;

// ── Field labels ──────────────────────────────────────────────────────────────
export const SUBMIT_FIELDS = {
  name:         { label: "Initiative name",    placeholder: "e.g. Claims Triage Copilot" },
  owner:        { label: "Owner",              placeholder: "Full name" },
  status:       { label: "Status" },
  projectType:  { label: "Project Type" },
  domain:       { label: "Domain" },
  problem:      { label: "Problem statement",  placeholder: "What problem does this solve?" },
  useCase:      { label: "Use case category" },
  users:        { label: "Target users",       placeholder: "e.g. Claims adjusters" },
  impact:       { label: "Impact / KPIs",      placeholder: "Measured or target impact" },
  capability:   { label: "AI capability" },
  models:       { label: "Models / frameworks",placeholder: "e.g. GPT-4o, LangGraph" },
  dataType:     { label: "Data type" },
  reusable:     { label: "Reusable?" },
  reuseType:    { label: "Reuse type" },
  reuseEffort:  { label: "Reuse effort" },
  demo:         { label: "Demo available" },
  assetLinks:   { label: "Asset links",        placeholder: "https://… or asset id" },
  deployment:   { label: "Deployment type" },
  architecture: { label: "Architecture summary", placeholder: "High-level architecture, key components, data flow…" },
} as const;

// ── Required fields for validation ───────────────────────────────────────────
export const REQUIRED_FIELDS = [
  { key: "name"       as const, label: SUBMIT_FIELDS.name.label },
  { key: "owner"      as const, label: SUBMIT_FIELDS.owner.label },
  { key: "status"     as const, label: SUBMIT_FIELDS.status.label },
  { key: "domain"     as const, label: SUBMIT_FIELDS.domain.label },
  { key: "capability" as const, label: SUBMIT_FIELDS.capability.label },
  { key: "reusable"   as const, label: SUBMIT_FIELDS.reusable.label },
];

// ── Form button labels ─────────────────────────────────────────────────────────
export const SUBMIT_BUTTONS = {
  cancel: "Cancel",
  submitNew: "Submit initiative",
  submitUpdate: "Save changes",
  addAssetLink: "+ Add asset link",
} as const;
