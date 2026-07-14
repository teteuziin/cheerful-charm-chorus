import { cn } from "@/lib/utils";
import type { ComponentType, ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ComponentType<{ className?: string }>;
  trend?: { value: string; positive?: boolean };
  className?: string;
}

export function StatCard({ label, value, hint, icon: Icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("surface-card p-5 flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-caption uppercase tracking-wider">{label}</span>
        {Icon && (
          <span className="grid place-items-center h-8 w-8 rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      <div className="text-3xl font-semibold tracking-tight text-foreground">{value}</div>
      <div className="flex items-center justify-between">
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
        {trend && (
          <span
            className={cn(
              "text-xs font-medium",
              trend.positive === false ? "text-destructive" : "text-success",
            )}
          >
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}

interface InfoCardProps {
  title: string;
  description?: string;
  icon?: ComponentType<{ className?: string }>;
  footer?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function InfoCard({ title, description, icon: Icon, footer, className, children }: InfoCardProps) {
  return (
    <div className={cn("surface-card p-6 flex flex-col gap-4", className)}>
      <div className="flex items-start gap-3">
        {Icon && (
          <span className="grid place-items-center h-10 w-10 shrink-0 rounded-xl bg-accent/30 text-accent-foreground">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-foreground truncate">{title}</h3>
          {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>
      {children}
      {footer && <div className="pt-2 border-t border-border/60">{footer}</div>}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  unit,
  progress,
  className,
}: {
  label: string;
  value: string | number;
  unit?: string;
  progress?: number;
  className?: string;
}) {
  return (
    <div className={cn("surface-card p-5", className)}>
      <div className="text-caption uppercase tracking-wider">{label}</div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-semibold text-foreground">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {typeof progress === "number" && (
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width]"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}

export function TimelineCard({
  time,
  title,
  description,
  status,
  className,
}: {
  time: string;
  title: string;
  description?: string;
  status?: "done" | "now" | "next";
  className?: string;
}) {
  return (
    <div className={cn("relative pl-6", className)}>
      <span
        className={cn(
          "absolute left-0 top-1.5 h-3 w-3 rounded-full border-2",
          status === "done" && "bg-primary border-primary",
          status === "now" && "bg-primary/20 border-primary animate-pulse",
          (!status || status === "next") && "bg-background border-border",
        )}
      />
      <div className="surface-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-caption">{time}</span>
          {status === "now" && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
              Agora
            </span>
          )}
        </div>
        <h4 className="mt-1 text-sm font-semibold text-foreground">{title}</h4>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}

export function JourneyCard({
  title,
  subtitle,
  progress,
  className,
}: {
  title: string;
  subtitle?: string;
  progress: number;
  className?: string;
}) {
  return (
    <div className={cn("surface-card p-5 flex items-center gap-4", className)}>
      <div className="relative h-14 w-14 shrink-0">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          <circle cx="18" cy="18" r="15.9" fill="none" className="stroke-muted" strokeWidth="3" />
          <circle
            cx="18"
            cy="18"
            r="15.9"
            fill="none"
            className="stroke-primary"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${progress}, 100`}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-xs font-semibold text-foreground">
          {progress}%
        </span>
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-semibold text-foreground truncate">{title}</h4>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

export function PulseCard({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-5",
        className,
      )}
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
      <div className="relative">
        <span className="text-caption uppercase tracking-wider">{label}</span>
        <div className="mt-2 text-2xl font-semibold text-foreground">{value}</div>
      </div>
    </div>
  );
}
