import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { SEED_PROJECTS, SEED_ASSETS, SEED_UPDATES } from "@/data/mockData";

const DataContext = createContext(null);
const STORAGE_KEY = "tavant-openview-v1";

function loadStored() {
  try {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        projects: parsed.projects || SEED_PROJECTS,
        assets: parsed.assets || SEED_ASSETS,
        updates: parsed.updates || SEED_UPDATES,
      };
    }
  } catch (e) {
    console.error("OpenView: failed to read stored data", e);
  }
  return { projects: SEED_PROJECTS, assets: SEED_ASSETS, updates: SEED_UPDATES };
}

export function DataProvider({ children }) {
  const initial = loadStored();
  const [projects, setProjects] = useState(initial.projects);
  const [assets, setAssets] = useState(initial.assets);
  const [updates, setUpdates] = useState(initial.updates);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ projects, assets, updates })
      );
    } catch (e) {
      console.error("OpenView: failed to persist data", e);
    }
  }, [projects, assets, updates]);

  const upsertProject = (project) => {
    setProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === project.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...project, updatedAt: new Date().toISOString() };
        return next;
      }
      return [
        {
          ...project,
          id: project.id || `proj-${Date.now()}`,
          updatedAt: new Date().toISOString(),
        },
        ...prev,
      ];
    });
    setUpdates((prev) =>
      [
        {
          id: `u-${Date.now()}`,
          projectId: project.id,
          project: project.name,
          type: "Submitted",
          detail: "Initiative created or updated",
          ts: Date.now(),
        },
        ...prev,
      ].slice(0, 30)
    );
  };

  const resetData = () => {
    setProjects(SEED_PROJECTS);
    setAssets(SEED_ASSETS);
    setUpdates(SEED_UPDATES);
  };

  const value = useMemo(
    () => ({ projects, assets, updates, upsertProject, resetData }),
    [projects, assets, updates]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
};
