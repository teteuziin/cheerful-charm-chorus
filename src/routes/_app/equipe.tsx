import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { InfoCard } from "@/components/common/Cards";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Stethoscope, Dumbbell, Apple, Users } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";

export const Route = createFileRoute("/_app/equipe")({
  head: () => ({ meta: [{ title: "Minha Equipe · TrevoOne" }] }),
  component: EquipePage,
});

const team = [
  { name: "Dra. Ana Ribeiro", role: "Médica", tag: "Clínica", icon: Stethoscope, initials: "AR" },
  { name: "Marcos Lima", role: "Personal Trainer", tag: "Performance", icon: Dumbbell, initials: "ML" },
  { name: "Julia Souza", role: "Nutricionista", tag: "Nutrição", icon: Apple, initials: "JS" },
];

function EquipePage() {
  return (
    <>
      <PageHeader
        title="Minha Equipe"
        description="Os profissionais que acompanham sua jornada."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m) => {
          const Icon = m.icon;
          return (
            <InfoCard
              key={m.name}
              title={m.name}
              description={m.role}
              icon={Icon}
              footer={
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                    {m.tag}
                  </Badge>
                  <button className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
                    <MessageCircle className="h-3.5 w-3.5" /> Enviar mensagem
                  </button>
                </div>
              }
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {m.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs text-muted-foreground">
                  Disponível para conversas assíncronas.
                </div>
              </div>
            </InfoCard>
          );
        })}
      </div>

      <div className="mt-8">
        <EmptyState
          icon={Users}
          title="Chat e agendamentos em breve"
          description="A comunicação com sua equipe será liberada nos próximos módulos."
        />
      </div>
    </>
  );
}
