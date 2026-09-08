import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { Footer } from "@/components/Footer";
import { REALISATIONS, getRealisation, slugOf } from "@/lib/pages";

export function generateStaticParams() {
  return REALISATIONS.map((r) => ({
    categorie: r.category,
    slug: slugOf(r.href),
  }));
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
      <Footer />
    </>
  );
}
