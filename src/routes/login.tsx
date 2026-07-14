import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/utils/validators";
import { useCompanyStore } from "@/store/companyStore";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/common/Logo";
import { ThemeSwitch } from "@/components/common/ThemeSwitch";
import { useEffect } from "react";

export const Route = createFileRoute("/login")({
  ssr: false,
  head: () => ({ meta: [{ title: "Entrar · TrevoOne" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const company = useCompanyStore((s) => s.current);
  const { login } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!company) navigate({ to: "/empresa", replace: true });
  }, [company, navigate]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      companyId: company?.id ?? "",
      username: "",
      password: "",
      remember: true,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitting(true);
    try {
      await login({ ...values, companyId: company?.id ?? values.companyId });
    } catch {
      toast.error("Não foi possível entrar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  });

  if (!company) return null;

  return (
    <div className="min-h-dvh grid lg:grid-cols-2 bg-background">
      {/* Left: brand panel */}
      <aside className="hidden lg:flex relative flex-col justify-between p-10 overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-glow text-primary-foreground">
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_10%,white,transparent_40%),radial-gradient(circle_at_80%_90%,white,transparent_35%)]" />
        <div className="relative">
          <Logo />
        </div>
        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight leading-tight max-w-md"
          >
            Sua saúde, sua performance, seu tempo — organizados.
          </motion.h2>
          <p className="mt-4 text-primary-foreground/80 max-w-md">
            Uma plataforma única para conectar você e sua equipe de saúde de forma premium, moderna e humana.
          </p>
        </div>
        <div className="relative text-xs text-primary-foreground/70">© {new Date().getFullYear()} TrevoOne</div>
      </aside>

      {/* Right: form */}
      <section className="flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6">
          <div className="lg:hidden"><Logo /></div>
          <div className="ml-auto"><ThemeSwitch /></div>
        </div>

        <div className="flex-1 grid place-items-center px-4 md:px-6 pb-10">
          <div className="w-full max-w-md">
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-border/60 bg-surface p-3">
              <span
                className="grid h-10 w-10 place-items-center rounded-xl text-white text-sm font-semibold"
                style={{ backgroundColor: company.color }}
              >
                {company.logoInitial}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-foreground truncate">{company.name}</div>
                <div className="text-xs text-muted-foreground truncate">{company.description}</div>
              </div>
              <Link
                to="/empresa"
                className="text-xs font-medium text-primary hover:underline shrink-0"
              >
                Trocar
              </Link>
            </div>

            <h1 className="text-h2 text-foreground">Entrar</h1>
            <p className="mt-1 text-sm text-muted-foreground">Acesse sua jornada TrevoOne.</p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="username">Usuário ou e-mail</Label>
                <Input
                  id="username"
                  autoComplete="username"
                  placeholder="voce@empresa.com"
                  {...form.register("username")}
                />
                {form.formState.errors.username && (
                  <p className="text-xs text-destructive">{form.formState.errors.username.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline"
                    onClick={() => toast.message("Recuperação de senha disponível em breve.")}
                  >
                    Esqueci minha senha
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    {...form.register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Ocultar senha" : "Mostrar senha"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground rounded-md"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
                )}
              </div>

              <label className="flex items-center gap-2 text-sm text-foreground/80">
                <Checkbox
                  checked={form.watch("remember")}
                  onCheckedChange={(v) => form.setValue("remember", Boolean(v))}
                />
                Lembrar acesso neste dispositivo
              </label>

              <Button type="submit" disabled={submitting} className="w-full h-11 text-sm font-semibold">
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Entrar
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Nesta fase de demonstração, qualquer usuário e senha são aceitos.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
