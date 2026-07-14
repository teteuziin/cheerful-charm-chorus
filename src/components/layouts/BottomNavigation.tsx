import { Link, useRouterState } from "@tanstack/react-router";
import { navItems } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function BottomNavigation() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border/60 bg-surface/95 backdrop-blur-xl safe-area-inset-bottom"
      aria-label="Navegação principal"
    >
      <ul className="grid grid-cols-5">
        {navItems.map((item) => {
          const active = pathname === item.to || pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 min-h-[56px] text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className={cn("h-5 w-5", active && "scale-110")} />
                <span className="truncate max-w-[64px]">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
