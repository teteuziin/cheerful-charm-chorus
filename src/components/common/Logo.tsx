import { cn } from "@/lib/utils";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="grid h-9 w-9 place-items-center rounded-xl gradient-primary shadow-[var(--shadow-glow)]">
        <svg viewBox="0 0 32 32" className="h-5 w-5 text-primary-foreground" fill="currentColor" aria-hidden>
          <path d="M16 4c-2 3-6 4-6 8a6 6 0 0 0 6 6 6 6 0 0 0 6-6c0-4-4-5-6-8Z" />
          <circle cx="9" cy="20" r="4" opacity=".85" />
          <circle cx="23" cy="20" r="4" opacity=".85" />
          <rect x="15" y="21" width="2" height="7" rx="1" opacity=".75" />
        </svg>
      </div>
      {showText && (
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight text-foreground">TrevoOne</div>
          <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Health OS</div>
        </div>
      )}
    </div>
  );
}
