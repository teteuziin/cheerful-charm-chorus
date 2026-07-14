import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, Eye, EyeOff, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/utils/validators";
import { useCompanyStore } from "@/store/companyStore";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/common/Logo";
import { ThemeSwitch } from "@/components/common/ThemeSwitch";

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
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    setSubmitError(null);
    try {
      await login({ ...values, companyId: company?.id ?? values.companyId });
    } catch {
      setSubmitError("Credenciais inválidas ou serviço indisponível. Tente novamente.");
      toast.error("Não foi possível entrar.");
    } finally {
      setSubmitting(false);
    }
  });

  if (!company) return null;
  const grad = company.gradient ?? [company.color, company.color];

  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-background lg:grid lg:grid-cols-[1fr_1.05fr]">
      {/* Hero — compacto */}
      <aside
        className="relative overflow-hidden text-white px-6 md:px-8 lg:px-12 pt-[calc(env(safe-area-inset-top)+1rem)] pb-8 lg:min-h-dvh lg:flex lg:flex-col lg:justify-between"
        style={{ backgroundImage: `linear-gradient(135deg, ${grad[0]} 0%, ${grad[1]} 100%)` }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_15%_10%,white,transparent_40%),radial-gradient(circle_at_85%_85%,white,transparent_45%)]"
        />
        <div className="relative flex items-center justify-between">
          <Logo size="lg" tone="light" />
          <div className="lg:hidden">
            <ThemeSwitch />
          </div>
        </div>

        <div className="relative mt-5 lg:mt-0 max-w-lg">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]"
          >
            <Sparkles className="h-3.5 w-3.5" /> Sua jornada continua
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05]"
          >
            Bem-vindo novamente <span className="inline-block">👋</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-sm md:text-base text-white/90 max-w-md"
          >
            Continue sua jornada de evolução — uma plataforma feita para conectar você e sua equipe de saúde.
          </motion.p>

          <div className="hidden lg:flex mt-6 items-center gap-3 text-sm text-white/85">
            <ShieldCheck className="h-4 w-4" />
            Acesso seguro e criptografado
          </div>
        </div>

        <div className="hidden lg:block relative text-xs text-white/70 mt-4">
          © {new Date().getFullYear()} TrevoOne
        </div>
      </aside>

      {/* Form */}
      <section className="relative flex flex-col pb-[env(safe-area-inset-bottom)]">
        <div className="hidden lg:flex items-center justify-end px-6 md:px-10 py-5">
          <ThemeSwitch />
        </div>

        <div className="flex-1 grid place-items-center px-4 md:px-6 py-8 lg:py-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            {/* Company chip */}
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-border/60 bg-surface p-3">
              <span
                className="grid h-11 w-11 place-items-center rounded-xl text-white text-sm font-bold shrink-0 shadow-[var(--shadow-soft)]"
                style={{ backgroundImage: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})` }}
              >
                {company.logoInitial}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-foreground truncate">{company.name}</div>
                <div className="text-xs text-muted-foreground truncate">{company.category}</div>
              </div>
              <Link
                to="/empresa"
                className="text-xs font-semibold text-primary hover:underline shrink-0"
              >
                Trocar
              </Link>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">Entrar</h2>
            <p className="mt-1 text-sm text-muted-foreground">Acesse sua jornada TrevoOne.</p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="username">Usuário ou e-mail</Label>
                <Input
                  id="username"
                  autoComplete="username"
                  inputMode="email"
                  placeholder="voce@empresa.com"
                  className="h-11"
                  {...form.register("username")}
                  aria-invalid={!!form.formState.errors.username}
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
                    className="text-xs font-medium text-primary hover:underline"
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
                    className="h-11 pr-11"
                    {...form.register("password")}
                    aria-invalid={!!form.formState.errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Ocultar senha" : "Mostrar senha"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground rounded-md"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
                )}
              </div>

              <label className="flex items-center gap-2 text-sm text-foreground/80 select-none">
                <Checkbox
                  checked={form.watch("remember")}
                  onCheckedChange={(v) => form.setValue("remember", Boolean(v))}
                />
                Lembrar acesso neste dispositivo
              </label>

              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive"
                >
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{submitError}</span>
                </motion.div>
              )}

              <motion.div whileTap={{ scale: 0.99 }}>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="group w-full h-12 rounded-full text-sm font-semibold shadow-[var(--shadow-glow)]"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando…
                    </>
                  ) : (
                    <>
                      Entrar na Jornada
                      <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </Button>
              </motion.div>

              <p className="text-center text-xs text-muted-foreground">
                Nesta fase de demonstração, qualquer usuário e senha são aceitos.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
