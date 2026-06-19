import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, ChevronRight, Lock } from "lucide-react";
import { useCompany } from "@/contexts/CompanyContext";
import { bloomColor, proficiencyToBloom, scoreToCriticality } from "@/lib/companyData";
import { CompanyLogo } from "@/components/CompanyLogo";
import { SKILL_TOPICS } from "@/data/skillTopics";

export const Route = createFileRoute("/company/skills")({
  component: SkillIntelligence,
});

const BLOOM_LEGEND = [
  { code: "CU", label: "Remember / Understand" },
  { code: "AP", label: "Apply" },
  { code: "AS", label: "Analyze" },
  { code: "EV", label: "Evaluate" },
  { code: "CR", label: "Create" },
];

const CRIT_LEGEND = [
  { label: "Critical", desc: "Score ≥ 7 — must-have for selection", color: "#ef4444" },
  { label: "Important", desc: "Score 5–6 — strong differentiator", color: "#eab308" },
  { label: "Baseline", desc: "Score < 5 — foundational expectation", color: "#16a34a" },
];

function SkillIntelligence() {
  const { skills, summary } = useCompany();
  const [open, setOpen] = useState<Record<number, boolean>>({});

  if (!summary) {
    return <div className="p-10 text-center text-sm text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <CompanyLogo
          name={summary.name}
          websiteUrl={summary.website_url}
          fallbackUrl={summary.logo_url}
          size={44}
        />
        <h1 className="font-heading text-2xl font-bold">{summary.name} Skill Intelligence</h1>
      </div>

      {/* Bloom legend */}
      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {BLOOM_LEGEND.map((b) => (
          <div
            key={b.code}
            className="rounded-md border border-border p-2 text-xs"
            style={{ backgroundColor: `${bloomColor(b.code)}15` }}
          >
            <div className="font-bold" style={{ color: bloomColor(b.code) }}>
              {b.code}
            </div>
            <div className="text-muted-foreground">{b.label}</div>
          </div>
        ))}
      </div>

      {/* Criticality legend */}
      <div className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {CRIT_LEGEND.map((c) => (
          <div key={c.label} className="rounded-md border border-border bg-card p-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="font-heading text-sm font-semibold">{c.label}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Skill cards */}
      <div className="space-y-3">
        {skills.map((s) => {
          const bloom = proficiencyToBloom(s.required_level);
          const crit = scoreToCriticality(s.required_level);
          const color = bloomColor(bloom);
          const isOpen = !!open[s.skill_set_id];
          const topics = SKILL_TOPICS[s.skill_set_id] ?? [];
          const target = s.required_level;
          return (
            <div key={s.skill_set_id} className="rounded-xl border border-border bg-card p-4">
              <button
                onClick={() => setOpen((o) => ({ ...o, [s.skill_set_id]: !o[s.skill_set_id] }))}
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <div className="flex flex-1 items-center gap-3">
                  <span
                    className="rounded-md px-2 py-0.5 text-[11px] font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {bloom}
                  </span>
                  <div className="flex-1">
                    <div className="font-heading text-sm font-semibold">{s.skill_set_name}</div>
                    <div className="text-[11px] text-muted-foreground">
                      Criticality · <span style={{ color: CRIT_LEGEND.find((c) => c.label === crit)?.color }}>{crit}</span>
                    </div>
                  </div>
                  <div className="text-sm font-semibold tabular-nums">{s.required_level}/10</div>
                  {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </div>
              </button>

              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${(s.required_level / 10) * 100}%`, backgroundColor: color }}
                />
              </div>

              {isOpen && (
                <ol className="mt-4 space-y-1.5 border-t border-border pt-4">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const level = i + 1;
                    const locked = level > target;
                    const topic = topics[i] ?? "—";
                    return (
                      <li
                        key={level}
                        className={`flex items-start gap-3 rounded-md px-2 py-1.5 text-xs ${
                          locked ? "text-muted-foreground" : ""
                        }`}
                        style={!locked ? { backgroundColor: `${color}10` } : undefined}
                      >
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                          style={{ backgroundColor: locked ? "#cbd5e1" : color }}
                        >
                          {level}
                        </span>
                        <span className="flex-1">{topic}</span>
                        {locked && (
                          <span className="flex shrink-0 items-center gap-1 text-[10px] italic">
                            <Lock className="h-3 w-3" /> Beyond scope
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
