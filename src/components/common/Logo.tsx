import { cn } from "@/lib/utils";

/**
 * TrevoOne — Marca oficial
 * Símbolo: 4 pétalas squircle rotacionadas 45° formando um trevo geométrico.
 * Usa currentColor → funciona em verde, branco, preto ou monocromático.
 */
export function LogoMark({
  className,
  title = "TrevoOne",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={cn("shrink-0", className)}
    >
      <g transform="rotate(45 48 48)" fill="currentColor">
        <rect x="23" y="23" width="22" height="22" rx="7" />
        <rect x="51" y="23" width="22" height="22" rx="7" />
        <rect x="23" y="51" width="22" height="22" rx="7" />
        <rect x="51" y="51" width="22" height="22" rx="7" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  showText = true,
  size = "md",
  tone = "auto",
  orientation = "horizontal",
}: {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "auto" | "light" | "dark";
  orientation?: "horizontal" | "vertical";
}) {
  const box =
    size === "xl" ? "h-20 w-20" : size === "lg" ? "h-14 w-14" : size === "sm" ? "h-9 w-9" : "h-11 w-11";
  const name = size === "xl" ? "text-2xl" : size === "lg" ? "text-lg" : "text-base";
  const sub = size === "xl" ? "text-[11px]" : "text-[10px]";

  const markColor =
    tone === "light" ? "text-white" : tone === "dark" ? "text-[#0D2F23]" : "text-primary";
  const nameColor = tone === "light" ? "text-white" : "text-foreground";
  const subColor = tone === "light" ? "text-white/75" : "text-muted-foreground";

  const vertical = orientation === "vertical";

  return (
    <div
      className={cn(
        "flex items-center",
        vertical ? "flex-col gap-2 text-center" : "gap-3",
        className,
      )}
    >
      <LogoMark className={cn(box, markColor)} />
      {showText && (
        <div className="leading-tight">
          <div className={cn("font-bold tracking-tight", name, nameColor)}>TrevoOne</div>
          <div className={cn("uppercase tracking-[0.22em]", sub, subColor)}>HEALTH OS</div>
        </div>
      )}
    </div>
  );
}
