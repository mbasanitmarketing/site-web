import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { ProjectDetail } from "@/components/ProjectDetail";
import { OtherProjects } from "@/components/OtherProjects";
import { Footer } from "@/components/Footer";
import { ProjectLinks } from "@/components/SeoIntro";
import { REALISATIONS, getCategory, getRealisation, slugOf } from "@/lib/pages";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, graph, pageMetadata } from "@/lib/seo";

/* Le métier de MBA auquel se rattache chaque catégorie de réalisations. */
const SERVICE_DU_METIER: Record<string, { href: string; label: string }> = {
  "sanitaire-salles-de-bain": {
    href: "/services/sanitaire-salles-de-bain",
    label: "installation sanitaire et salle de bain",
  },
  "chauffage-pompes-a-chaleur": {
    href: "/services/chauffage-pompes-a-chaleur",
    label: "chauffage et pompe à chaleur",
  },
};

export function generateStaticParams() {
  return REALISATIONS.map((r) => ({
    categorie: r.category,
    slug: slugOf(r.href),
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/realisations/[categorie]/[slug]">) {
  const { categorie, slug } = await params;
  const page = getRealisation(categorie, slug);
  if (!page) return { title: "MBA Sanit" };
  return pageMetadata(page.href, page.image);
}

export default async function Page({
  params,
}: PageProps<"/realisations/[categorie]/[slug]">) {
  const { categorie, slug } = await params;
  const page = getRealisation(categorie, slug);
  if (!page) notFound();

  const cat = getCategory(categorie);
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbLd([
            { name: "Accueil", path: "/" },
            { name: "Réalisations", path: "/realisations" },
            ...(cat ? [{ name: cat.title, path: cat.href }] : []),
            { name: page.title, path: page.href },
          ]),
        )}
      />
      <PageIntro page={page} />
      <ProjectDetail project={page} />
      <ProjectLinks
        serviceHref={SERVICE_DU_METIER[categorie]?.href ?? "/services"}
        serviceLabel={SERVICE_DU_METIER[categorie]?.label ?? "sanitaire, chauffage et dépannage"}
      />
      <OtherProjects current={page} />
      <Footer />
    </>
  );
}
