import { initiatives, assets, getReuseType, getReuseEffort, getUseCaseCategory } from "@/data/openview";

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export const initiativeFilterGroups = [
  { key: "status", label: "Status", options: uniq(initiatives.map((i) => i.status)) as string[] },
  { key: "type", label: "Project Type", options: uniq(initiatives.map((i) => i.type)) as string[] },
  { key: "domain", label: "Domain", options: uniq(initiatives.map((i) => i.domain)) as string[] },
  { key: "capability", label: "AI Capability", options: uniq(initiatives.map((i) => i.capability)) as string[] },
  { key: "dataType", label: "Data Type", options: uniq(initiatives.map((i) => i.dataType)) },
  { key: "maturity", label: "Maturity", options: uniq(initiatives.map((i) => i.maturity)) as string[] },
  { key: "useCase", label: "Use Case Category", options: uniq(initiatives.map((i) => getUseCaseCategory(i))) },
  { key: "reuseType", label: "Reuse Type", options: uniq(initiatives.map((i) => getReuseType(i))) },
  { key: "reuseEffort", label: "Reuse Effort", options: uniq(initiatives.map((i) => getReuseEffort(i))) },
  { key: "reusable", label: "Reusability", options: ["Reusable", "Not reusable"] },
  { key: "demo", label: "Demo Available", options: ["Yes", "No"] },
  { key: "deployment", label: "Deployment", options: uniq(initiatives.map((i) => i.deployment)) as string[] },
  { key: "owner", label: "Owner", options: uniq(initiatives.map((i) => i.owner)) },
];

export const assetFilterGroups = [
  { key: "type", label: "Asset Type", options: uniq(assets.map((a) => a.type)) as string[] },
  { key: "domain", label: "Domain", options: uniq(assets.map((a) => a.domain)) as string[] },
  { key: "capability", label: "AI Capability", options: uniq(assets.map((a) => a.capability)) as string[] },
  { key: "maturity", label: "Maturity", options: uniq(assets.map((a) => a.maturity)) as string[] },
  { key: "reuseScore", label: "Reuse Score", options: ["≥ 80", "60–79", "< 60"] },
  { key: "demo", label: "Demo Ready", options: ["Yes", "No"] },
  { key: "linkedProject", label: "Linked Project", options: uniq(assets.map((a) => a.linkedProject)) },
];