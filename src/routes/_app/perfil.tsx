import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LogOut, Mail, Shield, User as UserIcon } from "lucide-react";
import { PageHeader, SectionHeader } from "@/components/common/PageHeader";
import { InfoCard } from "@/components/common/Cards";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/store/userStore";
import { useCompanyStore } from "@/store/companyStore";
import { useAuth } from "@/hooks/useAuth";
import { formatters } from "@/utils/formatters";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

export const Route = createFileRoute("/_app/perfil")({
  head: () => ({ meta: [{ title: "Perfil · TrevoOne" }] }),
  component: PerfilPage,
});

function PerfilPage() {
  const user = useUserStore((s) => s.profile);
  const company = useCompanyStore((s) => s.current);
  const { logout } = useAuth();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <PageHeader title="Perfil" description="Suas informações e preferências." />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1 surface-card p-6 flex flex-col items-center text-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
              {user ? formatters.initials(user.name) : "?"}
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-lg font-semibold text-foreground">{user?.name}</h2>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
          {company && (
            <div className="mt-4 flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: company.color }} />
              {company.name}
            </div>
          )}
          <Button
            variant="outline"
            className="mt-6 w-full"
            onClick={() => setConfirmOpen(true)}
          >
            <LogOut className="mr-2 h-4 w-4" /> Sair da conta
          </Button>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <InfoCard title="Informações da conta" icon={UserIcon}>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-caption">Nome</dt>
                <dd className="mt-0.5 text-foreground">{user?.name}</dd>
              </div>
              <div>
                <dt className="text-caption">E-mail</dt>
                <dd className="mt-0.5 text-foreground truncate">{user?.email}</dd>
              </div>
              <div>
                <dt className="text-caption">Papel</dt>
                <dd className="mt-0.5 text-foreground capitalize">{user?.role}</dd>
              </div>
              <div>
                <dt className="text-caption">Empresa</dt>
                <dd className="mt-0.5 text-foreground">{company?.name}</dd>
              </div>
            </dl>
          </InfoCard>

          <InfoCard title="Preferências" icon={Shield}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Notificações por e-mail</Label>
                  <p className="text-xs text-muted-foreground">Receba lembretes da sua jornada.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Modo compacto</Label>
                  <p className="text-xs text-muted-foreground">Interface com mais densidade.</p>
                </div>
                <Switch />
              </div>
            </div>
          </InfoCard>

          <SectionHeader title="Contato" description="Precisando de ajuda?" />
          <InfoCard title="Suporte TrevoOne" description="Fale com nosso time" icon={Mail}>
            <div className="text-sm text-muted-foreground">suporte@trevoone.app</div>
          </InfoCard>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Sair da sua conta?"
        description="Você precisará entrar novamente para acessar sua jornada."
        confirmLabel="Sair"
        onConfirm={logout}
        destructive
      />
    </>
  );
}
