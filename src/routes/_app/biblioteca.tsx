import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, PlayCircle, FileText, Headphones } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SearchInput } from "@/components/common/SearchInput";
import { InfoCard } from "@/components/common/Cards";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { EmptyState } from "@/components/common/EmptyState";

export const Route = createFileRoute("/_app/biblioteca")({
  head: () => ({ meta: [{ title: "Biblioteca · TrevoOne" }] }),
  component: BibliotecaPage,
});

const content = [
  { title: "Guia rápido de hidratação", type: "Artigo", icon: FileText },
  { title: "Aquecimento de 5 minutos", type: "Vídeo", icon: PlayCircle },
  { title: "Meditação matinal", type: "Áudio", icon: Headphones },
  { title: "Nutrição para energia", type: "Artigo", icon: FileText },
];

function BibliotecaPage() {
  const [q, setQ] = useState("");
  const filtered = content.filter((c) => c.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHeader
        title="Biblioteca"
        description="Conteúdos curados pela sua equipe para apoiar sua jornada."
      />

      <div className="max-w-md">
        <SearchInput placeholder="Buscar conteúdo" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="todos">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="artigos">Artigos</TabsTrigger>
            <TabsTrigger value="videos">Vídeos</TabsTrigger>
            <TabsTrigger value="audios">Áudios</TabsTrigger>
          </TabsList>

          <TabsContent value="todos" className="mt-6">
            {filtered.length === 0 ? (
              <EmptyState icon={BookOpen} title="Nada por aqui" description="Ajuste sua busca." />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((c) => (
                  <InfoCard key={c.title} title={c.title} description={c.type} icon={c.icon}>
                    <div className="text-xs text-muted-foreground">Conteúdo demonstrativo.</div>
                  </InfoCard>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="artigos" className="mt-6">
            <EmptyState icon={FileText} title="Em breve" description="Artigos serão publicados aqui." />
          </TabsContent>
          <TabsContent value="videos" className="mt-6">
            <EmptyState icon={PlayCircle} title="Em breve" description="Vídeos serão publicados aqui." />
          </TabsContent>
          <TabsContent value="audios" className="mt-6">
            <EmptyState icon={Headphones} title="Em breve" description="Áudios serão publicados aqui." />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
