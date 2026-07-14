import { createFileRoute, redirect } from "@tanstack/react-router";

// Rota antiga — mantida como alias e redireciona para /today.
export const Route = createFileRoute("/_app/hoje")({
  beforeLoad: () => {
    throw redirect({ to: "/today", replace: true });
  },
});
