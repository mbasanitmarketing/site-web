import { notFound } from "next/navigation";
import { PageIntro } from "@/components/PageIntro";
import { ServiceManifesto } from "@/components/ServiceManifesto";
import { ServiceNeeds } from "@/components/ServiceNeeds";
import { Partners } from "@/components/Partners";
import { RealisationsCarousel } from "@/components/RealisationsCarousel";
import { Faq } from "@/components/Faq";
import { ServiceContact } from "@/components/ServiceContact";
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
  if (!page) return { title: "MBA Sanit" };
  return { title: `${page.title} — MBA Sanit`, description: page.lede };
}

export default async function Page({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const page = getService(slug);
  if (!page) notFound();

  return (
    <>
      {/* Ordre de la structure demandée : introduction, besoins,
          partenaires, réalisations, questions, contact.

          Quatre sections ont été retirées à la demande de MBA :
          « Preuves », « Prix », « Déroulement » et « Zone d'intervention ».
          Les deux premières n'avaient de toute façon rien à montrer (ni
          qualifications ni fourchette de tarifs fournies) ; la zone, elle,
          n'a pas disparu — elle est passée en première question de la FAQ,
          rédigée. */}
      <PageIntro page={page} />
      {page.manifesto && <ServiceManifesto manifesto={page.manifesto} />}
      {page.service && <ServiceNeeds service={page.service} />}
      <Partners headline="Un réseau de partenaires solide" />
      {page.relatedRealisations && (
        <RealisationsCarousel
          title={`Nos réalisations ${page.relatedRealisations.label}`}
          items={realisationsOf(page.relatedRealisations.category)}
        />
      )}
      {page.service && (
        <Faq
          items={page.service.faq}
          overSticky
          lede="Zones d’intervention, chantiers, entretien : les réponses aux questions qui reviennent."
        />
      )}
      <ServiceContact />
      <Footer above="navy" />
    </>
  );
}
