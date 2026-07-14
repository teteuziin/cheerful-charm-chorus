import { cn } from "@/lib/utils";
import logoUrl from "@/assets/logo.png";

export function Logo({
  className,
  showText = true,
  size = "md",
  tone = "auto",
}: {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "auto" | "light";
}) {
  const box =
    size === "xl" ? "h-20 w-20" : size === "lg" ? "h-14 w-14" : size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const name = size === "xl" ? "text-xl" : size === "lg" ? "text-lg" : "text-base";
  const light = tone === "light";
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src={logoUrl}
        alt="TrevoOne"
        className={cn("shrink-0 object-contain", box)}
        draggable={false}
      />
      {showText && (
        <div className="leading-tight">
          <div className={cn("font-bold tracking-tight", name, light ? "text-white" : "text-foreground")}>
            TrevoOne
          </div>
          <div
            className={cn(
              "text-[10px] uppercase tracking-[0.18em]",
              light ? "text-white/75" : "text-muted-foreground",
            )}
          >
            HEALTH OS
          </div>
        </div>
      )}
    </div>
  );
}
