import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { toast } from "sonner";
import { authApi, type LoginPayload } from "@/services/api/auth";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import { useCompanyStore } from "@/store/companyStore";

export function useAuth() {
  const navigate = useNavigate();

  const setSession = useAuthStore((s) => s.setSession);
  const clear = useAuthStore((s) => s.clear);

  const setProfile = useUserStore((s) => s.setProfile);

  const clearCompany = useCompanyStore((s) => s.clear);

  const login = useCallback(
    async (payload: LoginPayload) => {
      try {
        const session = await authApi.login(payload);

        setSession(session);
        setProfile(session.user);

        toast.success(`Bem-vindo, ${session.user.name}!`);

        navigate({ to: "/today" });
      } catch (error: any) {
        console.error("Erro ao realizar login:", error);

        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Usuário ou senha inválidos.";

        toast.error(message);

        throw error;
      }
    },
    [navigate, setSession, setProfile]
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.warn("Erro ao efetuar logout:", error);
    }

    clear();
    setProfile(null);
    clearCompany();

    toast.success("Sessão encerrada.");

    navigate({ to: "/empresa" });
  }, [clear, clearCompany, navigate, setProfile]);

  return {
    login,
    logout,
  };
}
