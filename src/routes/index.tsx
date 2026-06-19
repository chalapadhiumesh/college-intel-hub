import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { COLLEGE_NAME, COLLEGE_SHORT, SEED_COMPANIES } from "@/data/seedCompanies";
import { normalizeCompanySummary } from "@/lib/companyData";
import { CompanyCard } from "@/components/CompanyCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${COLLEGE_NAME} Companies Research & Placement Analytics Portal` },
      {
        name: "description",
        content: `${COLLEGE_NAME} Placement Intelligence Hub — research recruiting companies and the skills that win offers.`,
      },
      { property: "og:title", content: `${COLLEGE_NAME} Placement Intelligence Hub` },
      {
        property: "og:description",
        content: "Research companies and master the skills they hire for.",
      },
    ],
  }),
  component: Index,
});

const FILTERS = ["All", "Super Dream", "Dream", "Standard", "Regular"] as const;
type Filter = (typeof FILTERS)[number];

const FILTER_HEX: Record<Filter, string> = {
  All: "#0f172a",
  "Super Dream": "#7c3aed",
  Dream: "#2563eb",
  Standard: "#16a34a",
  Regular: "#d97706",
};

function Index() {
  const companies = useMemo(
    () => SEED_COMPANIES.map((c) => normalizeCompanySummary(c.short_json, c.company_id)),
    [],
  );

  const [rawSearch, setRawSearch] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    const t = setTimeout(() => setSearch(rawSearch.trim().toLowerCase()), 200);
    return () => clearTimeout(t);
  }, [rawSearch]);

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      if (filter !== "All" && c.company_type.toLowerCase() !== filter.toLowerCase()) return false;
      if (search && !`${c.name} ${c.short_name}`.toLowerCase().includes(search)) return false;
      return true;
    });
  }, [companies, filter, search]);

  const counts = useMemo<Record<Filter, number>>(() => {
    const base: Record<Filter, number> = { All: companies.length, "Super Dream": 0, Dream: 0, Standard: 0, Regular: 0 };
    for (const c of companies) {
      const k = (c.company_type || "").trim();
      if (k in base) (base as any)[k] += 1;
    }
    return base;
  }, [companies]);

  const reset = () => {
    setRawSearch("");
    setFilter("All");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="border-b border-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <span className="inline-block rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {COLLEGE_SHORT} · Intelligence Platform
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {COLLEGE_NAME} Companies Research & Placement Analytics Portal
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Your strategic edge for campus placements.
          </p>
          <div className="relative mt-6 max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={rawSearch}
              onChange={(e) => setRawSearch(e.target.value)}
              placeholder="Search companies…"
              className="pl-9 pr-9"
              aria-label="Search companies"
            />
            {rawSearch && (
              <button
                type="button"
                onClick={() => setRawSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="rounded-full border px-3 py-1.5 text-xs font-medium transition"
                style={{
                  borderColor: active ? FILTER_HEX[f] : "var(--border)",
                  backgroundColor: active ? FILTER_HEX[f] : "white",
                  color: active ? "white" : "var(--foreground)",
                }}
              >
                {f}{" "}
                <span className={active ? "opacity-90" : "text-muted-foreground"}>
                  · {counts[f]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-border p-10 text-center">
            <p className="text-sm text-muted-foreground">No companies match your filters.</p>
            <Button onClick={reset} variant="outline" className="mt-4">
              Reset filters
            </Button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((c) => (
              <CompanyCard key={c.company_id} company={c} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
