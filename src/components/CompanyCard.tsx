import { memo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, MapPin, TrendingDown, TrendingUp, Users } from "lucide-react";
import { useCompany } from "@/contexts/CompanyContext";
import { categoryColor, isNullish, type CompanySummary } from "@/lib/companyData";
import { CompanyLogo } from "@/components/CompanyLogo";

const NA = <span className="italic text-muted-foreground">not publicly available</span>;

function v(value: string, render: (s: string) => React.ReactNode) {
  return isNullish(value) ? NA : render(value);
}

interface Props {
  company: CompanySummary;
}

function CompanyCardBase({ company }: Props) {
  const navigate = useNavigate();
  const { selectCompanyById } = useCompany();
  const growthDown = company.yoy_growth_rate.trim().startsWith("-");

  const onClick = () => {
    selectCompanyById(company.company_id);
    navigate({ to: "/company/intelligence" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex flex-col items-stretch gap-3 rounded-xl border border-border bg-card p-4 text-left transition hover:border-[color:var(--dream)] hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
    >
      <div className="flex items-start justify-between gap-3">
        <CompanyLogo
          name={company.name}
          websiteUrl={company.website_url}
          fallbackUrl={company.logo_url}
          size={48}
        />
        <span
          className="rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white"
          style={{ backgroundColor: categoryColor(company.company_type) }}
        >
          {company.company_type || "—"}
        </span>
      </div>

      <div>
        <h3 className="font-heading text-base font-semibold text-foreground leading-tight">
          {company.name}
        </h3>
        <p className="text-xs text-muted-foreground">{company.short_name}</p>
      </div>

      <ul className="space-y-1.5 text-xs text-foreground/80">
        <li className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
          {v(company.headquarters_address, (s) => <span>{s}</span>)}
        </li>
        <li className="flex items-center gap-2">
          <Users className="h-3.5 w-3.5 text-muted-foreground" />
          {v(company.employee_size, (s) => <span>{s}</span>)}
        </li>
        <li className="flex items-center gap-2">
          {growthDown ? (
            <TrendingDown className="h-3.5 w-3.5 text-destructive" />
          ) : (
            <TrendingUp className="h-3.5 w-3.5 text-[color:var(--standard)]" />
          )}
          {v(company.yoy_growth_rate, (s) => (
            <span className={growthDown ? "text-destructive" : ""}>{s} YoY</span>
          ))}
        </li>
      </ul>

      <ArrowRight className="absolute bottom-3 right-3 h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground" />
    </button>
  );
}

export const CompanyCard = memo(CompanyCardBase);
