import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { ProjectDetail } from "@/components/ProjectDetail";
import { OtherProjects } from "@/components/OtherProjects";
import { Footer } from "@/components/Footer";
import { REALISATIONS, getRealisation, slugOf } from "@/lib/pages";

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
  return { title: page ? `${page.title} — MBA Sanit` : "MBA Sanit" };
}

export default async function Page({
  params,
}: PageProps<"/realisations/[categorie]/[slug]">) {
  const { categorie, slug } = await params;
  const page = getRealisation(categorie, slug);
  if (!page) notFound();

  return (
    <>
      <PageIntro page={page} />
      <ProjectDetail project={page} />
      <OtherProjects current={page} />
      <Footer />
    </>
  );
}
