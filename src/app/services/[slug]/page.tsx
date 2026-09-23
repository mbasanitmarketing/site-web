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
import { getFaqItems, getServiceOverride } from "@/lib/cms";

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

  // Présentation et besoins : modifiables depuis l'espace client. `slug` est
  // aussi le préfixe de clé du manifeste CMS (`services.<slug>.*`).
  const [override, faqItems] = await Promise.all([
    page.manifesto && page.service
      ? getServiceOverride(slug, { headline: page.manifesto.headline, intro: page.manifesto.intro, needs: page.service.needs })
      : null,
    getFaqItems(),
  ]);
  const manifesto = page.manifesto && override ? { ...page.manifesto, headline: override.headline, intro: override.intro } : page.manifesto;
  const service = page.service && override ? { ...page.service, needs: override.needs } : page.service;

  return (
    <>
      {/* Ordre : introduction, prestation, réalisations, partenaires,
          besoins, questions, contact.

          Quatre sections ont été retirées à la demande de MBA :
          « Preuves », « Prix », « Déroulement » et « Zone d'intervention ».
          Les deux premières n'avaient de toute façon rien à montrer (ni
          qualifications ni fourchette de tarifs fournies) ; la zone, elle,
          n'a pas disparu — elle est passée en première question de la FAQ,
          rédigée. */}
      <PageIntro page={page} />
      {manifesto && <ServiceManifesto manifesto={manifesto} cmsKey={`services.${slug}`} />}
      {/* Les réalisations montent juste après « La prestation » : on voit
          le travail avant de lire le reste. Elles ne sont donc plus
          collées à la FAQ — celle-ci ne glisse plus par-dessus, faute
          d'une section épinglée devant elle (cf. `overSticky`, retiré). */}
      {page.relatedRealisations && (
        <RealisationsCarousel
          title={`Nos réalisations ${page.relatedRealisations.label}`}
          items={realisationsOf(page.relatedRealisations.category)}
        />
      )}
      <Partners headline="Un réseau de partenaires solide" />
      {service && <ServiceNeeds service={service} cmsKey={`services.${slug}`} />}
      {service && (
        <Faq
          items={faqItems}
          lede="Zones d’intervention, chantiers, entretien : les réponses aux questions qui reviennent."
        />
      )}
      <ServiceContact />
      <Footer above="navy" />
    </>
  );
}
