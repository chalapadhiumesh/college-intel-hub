// Pure normalizers. Phase 1 reads from seed JSON shapes; Phase 2 can pipe
// Supabase rows in untouched.

export interface CompanySummary {
  company_id: number;
  name: string;
  short_name: string;
  logo_url: string;
  category: string;
  company_type: string;
  incorporation_year: number | string;
  employee_size: string;
  headquarters_address: string;
  operating_countries: string;
  office_locations: string;
  yoy_growth_rate: string;
  website_url: string;
}

export type CompanyProfile = Record<string, any> & { name: string };

export interface DashboardSkill {
  skill_set_id: number;
  skill_set_name: string;
  required_level: number;
  required_proficiency: string;
  difficulty: "EXPERT" | "ADVANCED" | "PRO" | "BEGINNER";
}

export const asString = (v: unknown): string => {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  try {
    return JSON.stringify(v);
  } catch {
    return "";
  }
};

export const asRecord = (v: unknown): Record<string, any> =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, any>) : {};

const NULLISH = new Set(["", "na", "n/a", "none", "-", "null", "undefined"]);
export const isNullish = (v: unknown): boolean => {
  if (v === null || v === undefined) return true;
  const s = asString(v).trim().toLowerCase();
  return NULLISH.has(s);
};

export const splitItems = (v: unknown): string[] => {
  const s = asString(v);
  if (!s) return [];
  return s
    .split(/\r?\n|;|•|·|\|/)
    .map((x) => x.trim())
    .filter((x) => x.length > 0);
};

export const titleCaseFromCode = (code: string): string =>
  code
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export const scoreToDifficulty = (
  score: number,
): "EXPERT" | "ADVANCED" | "PRO" | "BEGINNER" => {
  if (score >= 8) return "EXPERT";
  if (score >= 6) return "ADVANCED";
  if (score >= 4) return "PRO";
  return "BEGINNER";
};

export const proficiencyToBloom = (
  level: number,
): "CU" | "AP" | "AS" | "EV" | "CR" => {
  if (level <= 2) return "CU";
  if (level <= 4) return "AP";
  if (level <= 6) return "AS";
  if (level <= 8) return "EV";
  return "CR";
};

export const scoreToCriticality = (
  score: number,
): "Critical" | "Important" | "Baseline" => {
  if (score >= 7) return "Critical";
  if (score >= 5) return "Important";
  return "Baseline";
};

export const normalizeCompanySummary = (
  short_json: Record<string, any>,
  company_id?: number,
): CompanySummary => {
  const j = asRecord(short_json);
  return {
    company_id: company_id ?? Number(j.company_id ?? 0),
    name: asString(j.name),
    short_name: asString(j.short_name ?? j.name),
    logo_url: asString(j.logo_url),
    category: asString(j.category),
    company_type: asString(j.company_type),
    incorporation_year: j.incorporation_year ?? "",
    employee_size: asString(j.employee_size),
    headquarters_address: asString(j.headquarters_address),
    operating_countries: asString(j.operating_countries),
    office_locations: asString(j.office_locations),
    yoy_growth_rate: asString(j.yoy_growth_rate),
    website_url: asString(j.website_url),
  };
};

export const normalizeCompanyProfile = (
  full_json: Record<string, any>,
  short_json: Record<string, any>,
): CompanyProfile => {
  return { ...asRecord(short_json), ...asRecord(full_json) } as CompanyProfile;
};

export const normalizeDashboardSkills = (
  skillLevels: Array<{
    skill_set_id: number;
    skill_set_name: string;
    required_level: number;
    required_proficiency: string;
  }>,
): DashboardSkill[] =>
  [...(skillLevels ?? [])]
    .sort((a, b) => b.required_level - a.required_level)
    .map((s) => ({
      ...s,
      difficulty: scoreToDifficulty(s.required_level),
    }));

export const categoryColor = (type: string): string => {
  const t = type.trim().toLowerCase();
  if (t === "super dream") return "#7c3aed";
  if (t === "dream") return "#2563eb";
  if (t === "standard") return "#16a34a";
  if (t === "regular") return "#d97706";
  return "#64748b";
};

export const bloomColor = (b: string): string =>
  ({ CU: "#3b82f6", AP: "#22c55e", AS: "#eab308", EV: "#ef4444", CR: "#a855f7" }[b] ?? "#3b82f6");
