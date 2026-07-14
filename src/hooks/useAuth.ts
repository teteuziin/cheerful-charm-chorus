import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { toast } from "sonner";
import { mockLogin, type LoginPayload } from "@/services/api/auth";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { useCompanyStore } from "@/store/companyStore";
import { hasSingleCompany, defaultCompany } from "@/config/companies";

export function useAuth() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const clear = useAuthStore((s) => s.clear);
  const setProfile = useUserStore((s) => s.setProfile);
  const clearCompany = useCompanyStore((s) => s.clear);
  const selectCompany = useCompanyStore((s) => s.select);

  const login = useCallback(
    async (payload: LoginPayload) => {
      const session = await mockLogin(payload);
      setSession(session);
      setProfile(session.user);
      toast.success(`Bem-vindo, ${session.user.name}!`);
      navigate({ to: "/today" });
    },
    [navigate, setSession, setProfile],
  );

  const logout = useCallback(() => {
    clear();
    setProfile(null);
    if (hasSingleCompany) {
      selectCompany(defaultCompany);
      toast.message("Sessão encerrada");
      navigate({ to: "/login" });
    } else {
      clearCompany();
      toast.message("Sessão encerrada");
      navigate({ to: "/empresa" });
    }
  }, [clear, clearCompany, selectCompany, navigate, setProfile]);

  return { login, logout };
}
