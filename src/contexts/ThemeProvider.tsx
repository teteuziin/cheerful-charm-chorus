import { useEffect } from "react";
import type { ReactNode } from "react";
import { useThemeStore } from "@/store/themeStore";

function apply(mode: "light" | "dark" | "system") {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const dark =
    mode === "dark" ||
    (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mode = useThemeStore((s) => s.mode);

  useEffect(() => {
    apply(mode);
    if (mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const l = () => apply("system");
    mq.addEventListener("change", l);
    return () => mq.removeEventListener("change", l);
  }, [mode]);

  return <>{children}</>;
}
