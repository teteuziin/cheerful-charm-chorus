import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppShell } from "@/components/layouts/AppShell";
import { useAuthStore } from "@/store/authStore";
import { useCompanyStore } from "@/store/companyStore";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  ssr: false,
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const state = useAuthStore.getState();
    const company = useCompanyStore.getState().current;
    if (!state.isAuthenticated) {
      throw redirect({ to: company ? "/login" : "/empresa" });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  // Client-side safety net in case rehydration lags.
  const isReady = useAuthStore((s) => s.isReady);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const company = useCompanyStore((s) => s.current);
  const navigate = useNavigate();

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      navigate({ to: company ? "/login" : "/empresa", replace: true });
    }
  }, [isReady, isAuthenticated, company, navigate]);

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
