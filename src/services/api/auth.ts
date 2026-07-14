import type { AuthSession, User } from "@/types";
import { http } from "./http";

export interface LoginPayload {
  companyId: string;
  username: string;
  password: string;
  remember?: boolean;
}

/**
 * API oficial de autenticação do TrevoOne.
 * Todas as autenticações devem ser realizadas
 * exclusivamente pelo backend.
 */
export const authApi = {
  /**
   * Login
   */
  login: async (payload: LoginPayload): Promise<AuthSession> => {
    return await http.post<AuthSession>("/auth/login", payload, {
      auth: false,
    });
  },

  /**
   * Logout
   */
  logout: async (): Promise<void> => {
    return await http.post<void>("/auth/logout");
  },

  /**
   * Usuário autenticado
   */
  me: async (): Promise<User> => {
    return await http.get<User>("/auth/me");
  },

  /**
   * Recuperação de senha
   */
  forgotPassword: async (email: string): Promise<void> => {
    return await http.post<void>(
      "/auth/forgot-password",
      { email },
      {
        auth: false,
      }
    );
  },
};

export default authApi;
