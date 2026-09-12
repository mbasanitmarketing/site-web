import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { ServiceManifesto } from "@/components/ServiceManifesto";
import { Partners } from "@/components/Partners";
import { RealisationsCarousel } from "@/components/RealisationsCarousel";
import {
  ServiceNeeds,
  ServiceScope,
  ServiceProof,
  ServiceSteps,
  ServicePricing,
  ServiceArea,
  ServiceFaq,
  ServiceContact,
} from "@/components/ServiceParts";
import { Footer } from "@/components/Footer";
import { SERVICES, getService, realisationsOf, slugOf } from "@/lib/pages";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: slugOf(s.href) }));
}

/* Sans ça, les trois métiers héritaient du titre du layout : même <title>
   pour les trois dans les résultats de recherche. */
export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const page = getService(slug);
  return { title: page ? `${page.title} — MBA Sanit` : "MBA Sanit" };
}

export default async function Page({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const page = getService(slug);
  if (!page) notFound();

  return (
    <>
      {/* Ordre de la structure demandée : introduction, besoins, détail,
          preuves, déroulement, prix, zone, questions, contact. */}
      <PageIntro page={page} />
      {page.manifesto && <ServiceManifesto manifesto={page.manifesto} />}
      {page.service && <ServiceNeeds service={page.service} />}
      {page.service && <ServiceScope service={page.service} />}
      {page.service && <ServiceProof service={page.service} />}
      <Partners headline="Les marques avec lesquelles nous travaillons." />
      {page.relatedRealisations && (
        <RealisationsCarousel
          title={`Nos réalisations ${page.relatedRealisations.label}`}
          items={realisationsOf(page.relatedRealisations.category)}
        />
      )}
      {page.service && <ServiceSteps service={page.service} />}
      {page.service && <ServicePricing service={page.service} />}
      {page.service && <ServiceArea service={page.service} />}
      {page.service && <ServiceFaq service={page.service} />}
      <ServiceContact />
      <Footer />
    </>
  );
}
