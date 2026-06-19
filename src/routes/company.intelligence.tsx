import { createFileRoute } from "@tanstack/react-router";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Linkedin } from "lucide-react";
import { useCompany } from "@/contexts/CompanyContext";
import { buildIntelligenceSections, type FieldDef } from "@/data/intelligenceData";
import { asString, isNullish, splitItems } from "@/lib/companyData";
import { CompanyLogo } from "@/components/CompanyLogo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/company/intelligence")({
  component: CompanyIntelligence,
});

const NA = (
  <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] italic text-muted-foreground">
    Not Available
  </span>
);

function detectType(value: string): "url" | "video" | "auto" {
  if (/^https?:\/\//i.test(value)) {
    if (/(youtube\.com|youtu\.be|vimeo\.com)/i.test(value)) return "video";
    return "url";
  }
  return "auto";
}

function renderValue(field: FieldDef, raw: unknown) {
  if (isNullish(raw)) return NA;
  const s = asString(raw);
  const type = field.type ?? "auto";

  if (type === "url" || (type === "auto" && detectType(s) === "url")) {
    return (
      <a
        href={s}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[color:var(--dream)] hover:underline"
      >
        {s} <ExternalLink className="h-3 w-3" />
      </a>
    );
  }
  if (type === "video" || (type === "auto" && detectType(s) === "video")) {
    return (
      <a href={s} target="_blank" rel="noopener noreferrer" className="text-[color:var(--dream)] hover:underline">
        Watch ↗
      </a>
    );
  }
  if (type === "rating") {
    return <span className="font-medium">{s}</span>;
  }
  if (type === "list") {
    const items = splitItems(s);
    if (items.length <= 1) return <span>{s}</span>;
    return (
      <div className="flex flex-wrap gap-1.5">
        {items.map((it, i) => (
          <span key={i} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
            {it}
          </span>
        ))}
      </div>
    );
  }
  if (type === "paragraph") {
    return <p className="text-sm leading-relaxed">{s}</p>;
  }
  // auto split heuristics
  if (/[;,]/.test(s) && splitItems(s.replace(/,/g, ";")).length > 2) {
    const items = splitItems(s.replace(/,/g, ";"));
    return (
      <div className="flex flex-wrap gap-1.5">
        {items.map((it, i) => (
          <span key={i} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
            {it}
          </span>
        ))}
      </div>
    );
  }
  return <span>{s}</span>;
}

const FieldRow = memo(function FieldRow({ field, value }: { field: FieldDef; value: unknown }) {
  return (
    <div className="flex flex-col gap-1 border-t border-border py-3 sm:flex-row sm:gap-4">
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:w-1/3">
        {field.label}
      </div>
      <div className="text-sm text-foreground sm:w-2/3">{renderValue(field, value)}</div>
    </div>
  );
});

function CompanyIntelligence() {
  const { profile, summary } = useCompany();
  const sections = useMemo(() => buildIntelligenceSections(profile ?? undefined), [profile]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isScrollingRef = useRef(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (isScrollingRef.current) return;
      const top = window.scrollY + 200;
      for (let i = sectionRefs.current.length - 1; i >= 0; i--) {
        const el = sectionRefs.current[i];
        if (el && el.offsetTop <= top) {
          setActiveIdx(i);
          return;
        }
      }
      setActiveIdx(0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tab = tabRefs.current[activeIdx];
    if (tab) tab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIdx]);

  const scrollToSection = (idx: number) => {
    const el = sectionRefs.current[idx];
    if (!el) return;
    isScrollingRef.current = true;
    setActiveIdx(idx);
    window.scrollTo({ top: el.offsetTop - 140, behavior: "smooth" });
    window.setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  };

  if (!profile || !summary) {
    return (
      <div className="p-10 text-center text-sm text-muted-foreground">Loading company…</div>
    );
  }

  return (
    <div className="bg-background">
      {/* Info bar */}
      <div className="sticky top-12 z-20 border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <CompanyLogo
              name={summary.name}
              websiteUrl={summary.website_url}
              fallbackUrl={summary.logo_url}
              size={40}
            />
            <div>
              <div className="font-heading text-base font-semibold leading-none">
                {summary.name}
              </div>
              <span className="mt-1 inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                {summary.category || "Industry"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {profile.website_url && !isNullish(profile.website_url) && (
              <Button asChild size="sm" variant="outline">
                <a href={profile.website_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1 h-3.5 w-3.5" /> Website
                </a>
              </Button>
            )}
            {profile.linkedin_url && !isNullish(profile.linkedin_url) && (
              <Button asChild size="sm" variant="outline">
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-1 h-3.5 w-3.5" /> LinkedIn
                </a>
              </Button>
            )}
          </div>
        </div>
        {/* Tab bar */}
        <div className="border-t border-border">
          <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 py-2">
            {sections.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                onClick={() => scrollToSection(i)}
                className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  activeIdx === i
                    ? "bg-[color:var(--sidebar-accent)] text-[color:var(--sidebar-accent-foreground)]"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        {sections.map((section, i) => {
          const Icon = section.icon;
          const populated = section.fields.filter((f) => !isNullish(profile[f.key])).length;
          return (
            <section
              key={section.id}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
            >
              <header className="mb-2 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[color:var(--sidebar-accent)] text-[color:var(--sidebar-accent-foreground)]">
                  <Icon className="h-4 w-4" />
                </div>
                <h2 className="font-heading text-lg font-semibold">{section.title}</h2>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  {populated}/{section.fields.length}
                </span>
              </header>
              <div>
                {section.fields.map((f) => (
                  <FieldRow key={f.key} field={f} value={profile[f.key]} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
