import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { CategoryIndex } from "@/components/CategoryIndex";
import { Footer } from "@/components/Footer";
import { CATEGORIES, getCategory, realisationsOf, slugOf } from "@/lib/pages";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ categorie: slugOf(c.href) }));
}

/* Sans ça, les trois catégories héritaient du titre du layout : même
   <title> pour les trois dans les résultats de recherche. */
export async function generateMetadata({
  params,
}: PageProps<"/realisations/[categorie]">) {
  const { categorie } = await params;
  const page = getCategory(categorie);
  return { title: page ? `${page.title} — MBA Sanit` : "MBA Sanit" };
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
      {/* Index collant + pile des réalisations (cf. « realisations
          layout - template.mov ») */}
      <CategoryIndex category={page} items={realisationsOf(categorie)} />
      <Footer />
    </>
  );
}
