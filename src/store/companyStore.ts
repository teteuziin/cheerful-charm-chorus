import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Company } from "@/types";
import { STORAGE_KEYS } from "@/utils/constants";

interface CompanyState {
  current: Company | null;
  select: (c: Company) => void;
  clear: () => void;
}

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set) => ({
      current: null,
      select: (c) => set({ current: c }),
      clear: () => set({ current: null }),
    }),
    {
      name: STORAGE_KEYS.company,
      storage: createJSONStorage(() =>
        typeof window === "undefined"
          ? ({ getItem: () => null, setItem: () => {}, removeItem: () => {} } as Storage)
          : window.localStorage,
      ),
    },
  ),
);
