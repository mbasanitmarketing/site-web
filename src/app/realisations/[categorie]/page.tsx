import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { CategoryCarousel } from "@/components/CategoryCarousel";
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
  if (!page) return { title: "MBA Sanit" };
  return { title: `${page.title} — MBA Sanit`, description: page.lede };
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
      {/* Les réalisations sur une rangée qui défile, avec flèches. */}
      <CategoryCarousel items={realisationsOf(categorie)} />
      <Footer />
    </>
  );
}
