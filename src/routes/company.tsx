import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useCompany } from "@/contexts/CompanyContext";

export const Route = createFileRoute("/company")({
  component: AppLayout,
});

function AppLayout() {
  const navigate = useNavigate();
  const { selection, ready } = useCompany();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!ready) return;
    if (!selection) {
      navigate({ to: "/" });
      return;
    }
    if (pathname === "/company" || pathname === "/company/") {
      navigate({ to: "/company/intelligence", replace: true });
    }
  }, [ready, selection, pathname, navigate]);

  if (!ready) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-12 items-center gap-2 border-b border-border bg-white px-3">
            <SidebarTrigger />
            <nav className="text-xs text-muted-foreground">
              <span>Companies</span>
              {selection?.companyName && (
                <>
                  <span className="mx-1.5">/</span>
                  <span className="font-medium text-foreground">{selection.companyName}</span>
                </>
              )}
            </nav>
          </header>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
