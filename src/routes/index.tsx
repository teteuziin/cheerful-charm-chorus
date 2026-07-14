import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Splash } from "@/components/common/Splash";
import { useAuthStore } from "@/store/authStore";
import { useCompanyStore } from "@/store/companyStore";
import { companies, hasSingleCompany, defaultCompany } from "@/config/companies";

export const Route = createFileRoute("/")({
  ssr: false,
  component: SplashRoute,
});

function SplashRoute() {
  const navigate = useNavigate();
  const isReady = useAuthStore((s) => s.isReady);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const company = useCompanyStore((s) => s.current);
  const select = useCompanyStore((s) => s.select);

  useEffect(() => {
    if (!isReady) return;
    // Auto-seleciona quando existe apenas uma empresa cadastrada
    if (!company && hasSingleCompany) select(defaultCompany);
    const t = setTimeout(() => {
      if (isAuthenticated) return navigate({ to: "/today", replace: true });
      if (company || hasSingleCompany) return navigate({ to: "/login", replace: true });
      if (companies.length > 1) return navigate({ to: "/empresa", replace: true });
      navigate({ to: "/login", replace: true });
    }, 1000);
    return () => clearTimeout(t);
  }, [isReady, isAuthenticated, company, select, navigate]);

  return <Splash />;
}
