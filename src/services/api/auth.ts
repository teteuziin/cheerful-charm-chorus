import type { AuthSession, User } from "@/types";
import { http } from "./http";

export interface LoginPayload {
  companyId: string;
  username: string;
  password: string;
  remember?: boolean;
}

// Endpoints reais (Laravel) — não conectados nesta fase.
export const authApi = {
  login: (payload: LoginPayload) =>
    http.post<AuthSession>("/auth/login", payload, { auth: false }),
  logout: () => http.post<void>("/auth/logout"),
  me: () => http.get<User>("/auth/me"),
  forgotPassword: (email: string) =>
    http.post<void>("/auth/forgot-password", { email }, { auth: false }),
};

// Mock utilizado nesta fase (sem backend). Aceita qualquer credencial válida.
export async function mockLogin(payload: LoginPayload): Promise<AuthSession> {
  await new Promise((r) => setTimeout(r, 700));
  const user: User = {
    id: "user_demo",
    name: payload.username.split("@")[0] || "Usuário TrevoOne",
    email: payload.username.includes("@") ? payload.username : `${payload.username}@trevoone.app`,
    role: "student",
    companyId: payload.companyId,
    avatarUrl: undefined,
  };
  return {
    token: "mock.jwt.token",
    refreshToken: "mock.refresh.token",
    user,
    expiresAt: Date.now() + 60 * 60 * 1000,
  };
}
