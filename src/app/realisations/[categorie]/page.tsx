import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { CardGrid } from "@/components/CardGrid";
import { Footer } from "@/components/Footer";
import { CATEGORIES, getCategory, realisationsOf, slugOf } from "@/lib/pages";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ categorie: slugOf(c.href) }));
}

export default async function Page({
  params,
}: PageProps<"/realisations/[categorie]">) {
  const { categorie } = await params;
  const page = getCategory(categorie);
  if (!page) notFound();

  return (
    <>
      <PageIntro page={page} />
      {/* Vignettes des réalisations de la catégorie */}
      <CardGrid items={realisationsOf(categorie)} cta="Voir la réalisation" />
      <Footer />
    </>
  );
}
