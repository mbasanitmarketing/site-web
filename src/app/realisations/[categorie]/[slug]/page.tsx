import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { ProjectDetail } from "@/components/ProjectDetail";
import { OtherProjects } from "@/components/OtherProjects";
import { Footer } from "@/components/Footer";
import { REALISATIONS, getCategory, getRealisation, slugOf } from "@/lib/pages";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, graph, pageMetadata } from "@/lib/seo";

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
      <OtherProjects current={page} />
      <Footer />
    </>
  );
}
