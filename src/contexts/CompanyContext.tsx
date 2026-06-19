import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { SEED_COMPANIES } from "@/data/seedCompanies";
import {
  normalizeCompanyProfile,
  normalizeCompanySummary,
  normalizeDashboardSkills,
  type CompanyProfile,
  type CompanySummary,
  type DashboardSkill,
} from "@/lib/companyData";

const STORAGE_KEY = "selected-company";

interface StoredSelection {
  companyId: number;
  companyName: string;
  logoUrl: string;
}

interface CompanyContextValue {
  selection: StoredSelection | null;
  summary: CompanySummary | null;
  profile: CompanyProfile | null;
  skills: DashboardSkill[];
  selectCompanyById: (id: number) => void;
  clearSelection: () => void;
  ready: boolean;
}

const CompanyContext = createContext<CompanyContextValue | undefined>(undefined);

function loadFromStorage(): StoredSelection | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.companyId === "number") return parsed as StoredSelection;
  } catch {
    /* ignore */
  }
  return null;
}

function buildFromSelection(sel: StoredSelection | null) {
  if (!sel) return { summary: null, profile: null, skills: [] as DashboardSkill[] };
  const found = SEED_COMPANIES.find((c) => c.company_id === sel.companyId);
  if (!found) return { summary: null, profile: null, skills: [] as DashboardSkill[] };
  return {
    summary: normalizeCompanySummary(found.short_json, found.company_id),
    profile: normalizeCompanyProfile(found.full_json, found.short_json),
    skills: normalizeDashboardSkills(found.skill_levels),
  };
}

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<StoredSelection | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSelection(loadFromStorage());
    setReady(true);
  }, []);

  const { summary, profile, skills } = buildFromSelection(selection);

  const selectCompanyById = (id: number) => {
    const found = SEED_COMPANIES.find((c) => c.company_id === id);
    if (!found) return;
    const next: StoredSelection = {
      companyId: found.company_id,
      companyName: String(found.short_json.name ?? ""),
      logoUrl: String(found.short_json.logo_url ?? ""),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSelection(next);
  };

  const clearSelection = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setSelection(null);
  };

  return (
    <CompanyContext.Provider
      value={{ selection, summary, profile, skills, selectCompanyById, clearSelection, ready }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const ctx = useContext(CompanyContext);
  if (!ctx) throw new Error("useCompany must be used inside CompanyProvider");
  return ctx;
}
