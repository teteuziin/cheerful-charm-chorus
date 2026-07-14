import { Bell, ChevronDown, LogOut, Menu, Settings } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeSwitch } from "@/components/common/ThemeSwitch";
import { useUserStore } from "@/store/userStore";
import { useCompanyStore } from "@/store/companyStore";
import { useNotificationStore } from "@/store/notificationStore";
import { useAuth } from "@/hooks/useAuth";
import { formatters } from "@/utils/formatters";
import { Logo } from "@/components/common/Logo";
import { Link, useRouterState } from "@tanstack/react-router";
import { navItems } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Topbar() {
  const user = useUserStore((s) => s.profile);
  const company = useCompanyStore((s) => s.current);
  const notifications = useNotificationStore((s) => s.items);
  const unread = useNotificationStore((s) => s.unreadCount);
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const { logout } = useAuth();
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <header className="h-16 shrink-0 border-b border-border/60 bg-surface/80 backdrop-blur-xl sticky top-0 z-30">
      <div className="h-full px-4 md:px-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-full" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="p-4 border-b border-border/60"><Logo /></div>
              <nav className="p-3">
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const active = pathname === item.to;
                    const Icon = item.icon;
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
                            active
                              ? "bg-primary/10 text-primary"
                              : "text-foreground/70 hover:bg-accent/40",
                          )}
                        >
                          <Icon className="h-4.5 w-4.5" />
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>

          {company && (
            <div className="hidden md:flex items-center gap-2 min-w-0">
              <span
                className="grid place-items-center h-8 w-8 rounded-lg text-xs font-semibold text-white shrink-0"
                style={{ backgroundColor: company.color }}
              >
                {company.logoInitial}
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground truncate">{company.name}</div>
                <div className="text-[11px] text-muted-foreground truncate">{company.description}</div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <ThemeSwitch />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full relative" aria-label="Notificações">
                <Bell className="h-4 w-4" />
                {unread > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
                <div className="text-sm font-semibold">Notificações</div>
                <button
                  onClick={markAllRead}
                  className="text-xs text-primary hover:underline"
                >
                  Marcar todas
                </button>
              </div>
              <ul className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <li key={n.id} className="px-4 py-3 border-b border-border/40 last:border-0">
                    <div className="flex items-start gap-3">
                      {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-foreground">{n.title}</div>
                        {n.body && <div className="text-xs text-muted-foreground mt-0.5">{n.body}</div>}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-1 flex items-center gap-2 rounded-full pl-1 pr-2 py-1 hover:bg-accent/40 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatarUrl} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {user ? formatters.initials(user.name) : "?"}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden md:inline" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {user && (
                <>
                  <DropdownMenuLabel>
                    <div className="text-sm font-semibold">{user.name}</div>
                    <div className="text-xs font-normal text-muted-foreground truncate">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem asChild>
                <Link to="/perfil"><Settings className="mr-2 h-4 w-4" /> Meu perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={logout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" /> Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
