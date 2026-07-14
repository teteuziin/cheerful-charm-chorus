import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { STORAGE_KEYS } from "@/utils/constants";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "system",
      setMode: (mode) => set({ mode }),
    }),
    {
      name: STORAGE_KEYS.theme,
      storage: createJSONStorage(() =>
        typeof window === "undefined"
          ? ({ getItem: () => null, setItem: () => {}, removeItem: () => {} } as Storage)
          : window.localStorage,
      ),
    },
  ),
);
