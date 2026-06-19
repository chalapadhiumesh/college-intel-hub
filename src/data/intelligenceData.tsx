import {
  Building2, Eye, Crown, DollarSign, Globe, Package, Cpu, Handshake, Swords,
  Target, Leaf, Heart, Newspaper, BarChart3, ShieldCheck, MapPin, ShieldAlert,
  GraduationCap, Star, Wallet, Globe2, Phone,
  type LucideIcon,
} from "lucide-react";

export type FieldType = "text" | "paragraph" | "list" | "url" | "video" | "rating" | "auto";

export interface FieldDef {
  key: string;
  label: string;
  type?: FieldType;
}

export interface SectionDef {
  id: string;
  title: string;
  icon: LucideIcon;
  fields: FieldDef[];
}

export function buildIntelligenceSections(_profile?: Record<string, any>): SectionDef[] {
  return [
    {
      id: "identity", title: "Company Identity", icon: Building2,
      fields: [
        { key: "name", label: "Legal Name" },
        { key: "short_name", label: "Short Name" },
        { key: "category", label: "Category" },
        { key: "nature_of_company", label: "Nature" },
        { key: "incorporation_year", label: "Founded" },
      ],
    },
    {
      id: "overview", title: "Overview & Vision", icon: Eye,
      fields: [
        { key: "overview_text", label: "Overview", type: "paragraph" },
        { key: "vision_statement", label: "Vision", type: "paragraph" },
        { key: "mission_statement", label: "Mission", type: "paragraph" },
        { key: "core_values", label: "Core Values", type: "list" },
        { key: "history_timeline", label: "History", type: "list" },
      ],
    },
    {
      id: "leadership", title: "Leadership", icon: Crown,
      fields: [
        { key: "ceo_name", label: "CEO" },
        { key: "ceo_linkedin_url", label: "CEO LinkedIn", type: "url" },
        { key: "key_leaders", label: "Key Leaders", type: "list" },
        { key: "board_members", label: "Board Members", type: "list" },
        { key: "warm_intro_pathways", label: "Warm Intro Pathways", type: "list" },
        { key: "decision_maker_access", label: "Decision Maker Access" },
      ],
    },
    {
      id: "financials", title: "Funding & Financials", icon: DollarSign,
      fields: [
        { key: "annual_revenue", label: "Annual Revenue" },
        { key: "annual_profit", label: "Annual Profit" },
        { key: "revenue_mix", label: "Revenue Mix", type: "list" },
        { key: "valuation", label: "Valuation" },
        { key: "yoy_growth_rate", label: "YoY Growth" },
        { key: "profitability_status", label: "Profitability" },
        { key: "key_investors", label: "Key Investors", type: "list" },
        { key: "recent_funding_rounds", label: "Recent Funding" },
        { key: "total_capital_raised", label: "Capital Raised" },
      ],
    },
    {
      id: "presence", title: "Global Presence", icon: Globe,
      fields: [
        { key: "headquarters_address", label: "Headquarters" },
        { key: "operating_countries", label: "Operating Countries", type: "list" },
        { key: "office_count", label: "Office Count" },
        { key: "office_locations", label: "Offices", type: "list" },
        { key: "employee_size", label: "Employees" },
      ],
    },
    {
      id: "products", title: "Products & Services", icon: Package,
      fields: [
        { key: "offerings_description", label: "Offerings", type: "list" },
        { key: "focus_sectors", label: "Focus Sectors", type: "list" },
        { key: "pain_points_addressed", label: "Pain Points Addressed", type: "list" },
        { key: "product_pipeline", label: "Product Pipeline", type: "list" },
        { key: "case_studies", label: "Case Studies", type: "list" },
      ],
    },
    {
      id: "tech", title: "Technology Stack", icon: Cpu,
      fields: [
        { key: "tech_stack", label: "Stack", type: "list" },
        { key: "ai_ml_adoption_level", label: "AI / ML Adoption" },
        { key: "intellectual_property", label: "IP", type: "list" },
        { key: "r_and_d_investment", label: "R&D Spend" },
        { key: "cybersecurity_posture", label: "Cybersecurity" },
        { key: "tech_adoption_rating", label: "Tech Adoption" },
        { key: "innovation_roadmap", label: "Innovation Roadmap", type: "list" },
      ],
    },
    {
      id: "partnerships", title: "Partnerships & Ecosystem", icon: Handshake,
      fields: [
        { key: "technology_partners", label: "Technology Partners", type: "list" },
        { key: "partnership_ecosystem", label: "Ecosystem", type: "list" },
        { key: "industry_associations", label: "Industry Associations", type: "list" },
      ],
    },
    {
      id: "competition", title: "Competitive Landscape", icon: Swords,
      fields: [
        { key: "key_competitors", label: "Key Competitors", type: "list" },
        { key: "benchmark_vs_peers", label: "Benchmark vs Peers", type: "list" },
        { key: "competitive_advantages", label: "Advantages", type: "list" },
        { key: "weaknesses_gaps", label: "Weaknesses / Gaps", type: "list" },
        { key: "unique_differentiators", label: "Differentiators", type: "list" },
      ],
    },
    {
      id: "market", title: "Market Opportunity", icon: Target,
      fields: [
        { key: "tam", label: "TAM" },
        { key: "sam", label: "SAM" },
        { key: "som", label: "SOM" },
        { key: "market_share_percentage", label: "Market Share" },
        { key: "future_projections", label: "Future Projections" },
        { key: "strategic_priorities", label: "Strategic Priorities", type: "list" },
      ],
    },
    {
      id: "value", title: "Core Value Proposition & ESG", icon: Leaf,
      fields: [
        { key: "core_value_proposition", label: "Value Proposition", type: "list" },
        { key: "esg_ratings", label: "ESG Ratings", type: "list" },
        { key: "sustainability_csr", label: "Sustainability / CSR", type: "list" },
        { key: "carbon_footprint", label: "Carbon Footprint" },
        { key: "ethical_sourcing", label: "Ethical Sourcing", type: "list" },
      ],
    },
    {
      id: "culture", title: "Culture & Work Life", icon: Heart,
      fields: [
        { key: "work_culture_summary", label: "Culture Summary", type: "list" },
        { key: "manager_quality", label: "Manager Quality" },
        { key: "psychological_safety", label: "Psychological Safety" },
        { key: "feedback_culture", label: "Feedback Culture", type: "list" },
        { key: "diversity_inclusion_score", label: "Diversity & Inclusion", type: "list" },
        { key: "ethical_standards", label: "Ethical Standards" },
        { key: "burnout_risk", label: "Burnout Risk" },
        { key: "mission_clarity", label: "Mission Clarity" },
      ],
    },
    {
      id: "news", title: "Recent News & Milestones", icon: Newspaper,
      fields: [
        { key: "recent_news", label: "Recent News", type: "list" },
        { key: "awards_recognitions", label: "Awards", type: "list" },
        { key: "event_participation", label: "Events", type: "list" },
      ],
    },
    {
      id: "sales", title: "Sales & Customer Metrics", icon: BarChart3,
      fields: [
        { key: "top_customers", label: "Top Customers", type: "list" },
        { key: "customer_concentration_risk", label: "Concentration Risk" },
        { key: "sales_motion", label: "Sales Motion" },
        { key: "go_to_market_strategy", label: "GTM Strategy", type: "list" },
        { key: "customer_lifetime_value", label: "Customer LTV" },
        { key: "churn_rate", label: "Churn" },
        { key: "net_promoter_score", label: "NPS" },
        { key: "customer_testimonials", label: "Testimonials", type: "list" },
      ],
    },
    {
      id: "risk", title: "Risk & Compliance", icon: ShieldCheck,
      fields: [
        { key: "regulatory_status", label: "Regulatory Status", type: "list" },
        { key: "legal_issues", label: "Legal Issues" },
        { key: "supply_chain_dependencies", label: "Supply Chain", type: "list" },
        { key: "geopolitical_risks", label: "Geopolitical Risks", type: "list" },
        { key: "macro_risks", label: "Macro Risks", type: "list" },
        { key: "layoff_history", label: "Layoff History" },
      ],
    },
    {
      id: "location", title: "Work Location & Commute", icon: MapPin,
      fields: [
        { key: "remote_policy_details", label: "Remote Policy" },
        { key: "typical_hours", label: "Typical Hours" },
        { key: "overtime_expectations", label: "Overtime" },
        { key: "weekend_work", label: "Weekend Work" },
        { key: "flexibility_level", label: "Flexibility", type: "list" },
        { key: "location_centrality", label: "Location" },
        { key: "public_transport_access", label: "Transport", type: "list" },
        { key: "cab_policy", label: "Cab Policy", type: "list" },
        { key: "airport_commute_time", label: "Airport Commute" },
        { key: "office_zone_type", label: "Zone Type" },
      ],
    },
    {
      id: "safety", title: "Safety & Wellbeing", icon: ShieldAlert,
      fields: [
        { key: "area_safety", label: "Area Safety", type: "list" },
        { key: "safety_policies", label: "Safety Policies", type: "list" },
        { key: "infrastructure_safety", label: "Infrastructure Safety", type: "list" },
        { key: "emergency_preparedness", label: "Emergency Preparedness", type: "list" },
        { key: "health_support", label: "Health Support", type: "list" },
        { key: "leave_policy", label: "Leave Policy", type: "list" },
      ],
    },
    {
      id: "growth", title: "Career Growth & Learning", icon: GraduationCap,
      fields: [
        { key: "training_spend", label: "Training Spend" },
        { key: "onboarding_quality", label: "Onboarding" },
        { key: "learning_culture", label: "Learning Culture", type: "list" },
        { key: "mentorship_availability", label: "Mentorship", type: "list" },
        { key: "internal_mobility", label: "Internal Mobility" },
        { key: "promotion_clarity", label: "Promotions" },
        { key: "tools_access", label: "Tools", type: "list" },
        { key: "role_clarity", label: "Role Clarity" },
        { key: "cross_functional_exposure", label: "Cross-functional Exposure", type: "list" },
        { key: "exit_opportunities", label: "Exit Opportunities", type: "list" },
        { key: "skill_relevance", label: "Skill Relevance" },
        { key: "global_exposure", label: "Global Exposure", type: "list" },
      ],
    },
    {
      id: "brand", title: "Brand & Reputation", icon: Star,
      fields: [
        { key: "brand_sentiment_score", label: "Brand Sentiment" },
        { key: "brand_value", label: "Brand Value" },
        { key: "external_recognition", label: "External Recognition" },
        { key: "client_quality", label: "Client Quality", type: "list" },
        { key: "network_strength", label: "Network Strength", type: "list" },
      ],
    },
    {
      id: "comp", title: "Compensation & Benefits", icon: Wallet,
      fields: [
        { key: "fixed_vs_variable_pay", label: "Fixed vs Variable" },
        { key: "bonus_predictability", label: "Bonus Predictability" },
        { key: "esops_incentives", label: "ESOPs / Incentives", type: "list" },
        { key: "family_health_insurance", label: "Family Insurance", type: "list" },
        { key: "relocation_support", label: "Relocation", type: "list" },
        { key: "lifestyle_benefits", label: "Lifestyle Benefits", type: "list" },
      ],
    },
    {
      id: "digital", title: "Digital Presence & Ratings", icon: Globe2,
      fields: [
        { key: "website_url", label: "Website", type: "url" },
        { key: "linkedin_url", label: "LinkedIn", type: "url" },
        { key: "twitter_handle", label: "Twitter" },
        { key: "facebook_url", label: "Facebook", type: "url" },
        { key: "instagram_url", label: "Instagram", type: "url" },
        { key: "website_quality", label: "Website Quality" },
        { key: "website_traffic_rank", label: "Traffic Rank", type: "list" },
        { key: "social_media_followers", label: "Social Followers" },
        { key: "glassdoor_rating", label: "Glassdoor", type: "rating" },
        { key: "indeed_rating", label: "Indeed", type: "rating" },
        { key: "google_rating", label: "Google", type: "rating" },
        { key: "marketing_video_url", label: "Marketing Video", type: "video" },
      ],
    },
    {
      id: "contact", title: "Contact Information", icon: Phone,
      fields: [
        { key: "primary_contact_email", label: "Primary Email" },
        { key: "primary_phone_number", label: "Primary Phone" },
        { key: "contact_person_name", label: "Contact Person" },
        { key: "contact_person_title", label: "Title" },
        { key: "contact_person_email", label: "Contact Email" },
        { key: "contact_person_phone", label: "Contact Phone" },
      ],
    },
  ];
}
