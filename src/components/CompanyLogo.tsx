import { useState } from "react";

interface Props {
  name: string;
  websiteUrl?: string;
  fallbackUrl?: string;
  size?: number;
  className?: string;
}

function domainFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function CompanyLogo({ name, websiteUrl, fallbackUrl, size = 48, className = "" }: Props) {
  const key = (import.meta as any).env?.VITE_LOGO_DEV_PUBLISHABLE_KEY as string | undefined;
  const domain = websiteUrl ? domainFromUrl(websiteUrl) : null;
  const logoDev = key && domain ? `https://img.logo.dev/${domain}?token=${key}&size=${size * 2}` : null;

  const sources = [logoDev, fallbackUrl].filter(Boolean) as string[];
  const [idx, setIdx] = useState(0);
  const src = sources[idx];

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center rounded-md bg-muted text-muted-foreground font-heading font-semibold ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
        aria-label={name}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      className={`rounded-md object-contain bg-white ${className}`}
      style={{ width: size, height: size }}
      onError={() => setIdx((i) => i + 1)}
    />
  );
}
