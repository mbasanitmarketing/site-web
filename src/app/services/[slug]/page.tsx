import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { Footer } from "@/components/Footer";
import { SERVICES, getService, slugOf } from "@/lib/pages";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: slugOf(s.href) }));
}

export default async function Page({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const page = getService(slug);
  if (!page) notFound();

  return (
    <>
      <PageIntro page={page} />
      <Footer />
    </>
  );
}
