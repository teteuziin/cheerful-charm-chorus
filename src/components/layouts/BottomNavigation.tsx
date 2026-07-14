import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
            <li key={item.to} className="relative">
              <Link
                to={item.to}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1 py-2.5 min-h-[58px] text-[10.5px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                {active && (
                  <motion.span
                    layoutId="bottom-nav-active"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    aria-hidden
                    className="absolute inset-x-3 top-0 h-[3px] rounded-full bg-primary shadow-[0_0_12px_var(--primary-glow)]"
                  />
                )}
                <motion.span
                  animate={{ scale: active ? 1.1 : 1, y: active ? -1 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  className={cn(
                    "grid place-items-center h-8 w-8 rounded-xl",
                    active && "bg-primary/10",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </motion.span>
                <span className="truncate max-w-[68px] leading-none">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
