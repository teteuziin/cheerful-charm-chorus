import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Splash } from "@/components/common/Splash";
import { useAuthStore } from "@/store/authStore";
import { useCompanyStore } from "@/store/companyStore";

export const Route = createFileRoute("/")({
  ssr: false,
  component: SplashRoute,
});

function SplashRoute() {
  const navigate = useNavigate();
  const isReady = useAuthStore((s) => s.isReady);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const company = useCompanyStore((s) => s.current);

  useEffect(() => {
    if (!isReady) return;
    const t = setTimeout(() => {
      if (isAuthenticated) return navigate({ to: "/today", replace: true });
      if (company) return navigate({ to: "/login", replace: true });
      navigate({ to: "/empresa", replace: true });
    }, 1000);
    return () => clearTimeout(t);
  }, [isReady, isAuthenticated, company, navigate]);

  return <Splash />;
}
