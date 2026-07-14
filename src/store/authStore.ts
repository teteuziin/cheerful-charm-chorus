import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthSession } from "@/types";
import { STORAGE_KEYS } from "@/utils/constants";

interface AuthState {
  session: AuthSession | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isReady: boolean;
  setSession: (session: AuthSession) => void;
  clear: () => void;
  markReady: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      refreshToken: null,
      isAuthenticated: false,
      isReady: false,
      setSession: (session) =>
        set({ session, refreshToken: session.refreshToken, isAuthenticated: true }),
      clear: () => set({ session: null, refreshToken: null, isAuthenticated: false }),
      markReady: () => set({ isReady: true }),
    }),
    {
      name: STORAGE_KEYS.auth,
      storage: createJSONStorage(() =>
        typeof window === "undefined"
          ? ({ getItem: () => null, setItem: () => {}, removeItem: () => {} } as Storage)
          : window.localStorage,
      ),
      partialize: (s) => ({ session: s.session, refreshToken: s.refreshToken, isAuthenticated: s.isAuthenticated }),
      onRehydrateStorage: () => (state) => {
        state?.markReady();
      },
    },
  ),
);
