import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { BottomNavigation } from "./BottomNavigation";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh w-full flex bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 min-w-0 pb-20 lg:pb-8">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-6 md:py-10">
            {children}
          </div>
        </main>
      </div>
      <BottomNavigation />
    </div>
  );
}
