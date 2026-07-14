import { cn } from "@/lib/utils";

export function Logo({
  className,
  showText = true,
  size = "md",
  tone = "auto",
}: {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  tone?: "auto" | "light";
}) {
  const box = size === "lg" ? "h-12 w-12" : size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const icon = size === "lg" ? "h-7 w-7" : size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const name = size === "lg" ? "text-lg" : "text-base";
  const light = tone === "light";
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn("grid place-items-center rounded-2xl gradient-primary shadow-[var(--shadow-glow)]", box)}>
        <svg viewBox="0 0 32 32" className={cn(icon, "text-primary-foreground")} fill="currentColor" aria-hidden>
          <path d="M16 4c-2 3-6 4-6 8a6 6 0 0 0 6 6 6 6 0 0 0 6-6c0-4-4-5-6-8Z" />
          <circle cx="9" cy="20" r="4" opacity=".85" />
          <circle cx="23" cy="20" r="4" opacity=".85" />
          <rect x="15" y="21" width="2" height="7" rx="1" opacity=".75" />
        </svg>
      </div>
      {showText && (
        <div className="leading-tight">
          <div className={cn("font-bold tracking-tight", name, light ? "text-white" : "text-foreground")}>TrevoOne</div>
          <div className={cn("text-[10px] uppercase tracking-[0.18em]", light ? "text-white/75" : "text-muted-foreground")}>Health OS</div>
        </div>
      )}
    </div>
  );
}
