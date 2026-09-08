import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { REALISATIONS, getRealisation } from "@/lib/pages";

export function generateStaticParams() {
  return REALISATIONS.map((r) => ({ slug: r.href.split("/").pop() as string }));
}

export default async function Page({
  params,
}: PageProps<"/realisations/[slug]">) {
  const { slug } = await params;
  const page = getRealisation(slug);
  if (!page) notFound();

  return <PageIntro page={page} />;
}
