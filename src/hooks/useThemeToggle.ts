import { useThemeStore, type ThemeMode } from "@/store/themeStore";

export function useThemeToggle() {
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);
  const cycle = () => {
    const order: ThemeMode[] = ["light", "dark", "system"];
    setMode(order[(order.indexOf(mode) + 1) % order.length]);
  };
  return { mode, setMode, cycle };
}
