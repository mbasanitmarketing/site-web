import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { CardGrid } from "@/components/CardGrid";
import { Footer } from "@/components/Footer";
import { SeoIntro } from "@/components/SeoIntro";
import { pageMetadata } from "@/lib/seo";
import { SERVICES, requirePage } from "@/lib/pages";

const PAGE = requirePage("/services");

export const metadata = pageMetadata("/services", PAGE.image);

export default function Page() {
  return (
    <>
      <PageIntro page={PAGE} />
      {/* Même patron que /realisations : une vignette par service, la
          photo et le titre qui mènent à sa page. */}
      <CardGrid items={SERVICES} cta="Découvrir le service" />
      <SeoIntro
        title="Nos services de sanitaire, de chauffage et de dépannage à Genève"
        intro="MBA Sanit intervient auprès des particuliers, des régies immobilières et des entreprises de Genève et de Suisse romande. De la pose d’un appareil à la salle de bain complète, du remplacement d’une chaudière au passage à la pompe à chaleur, de l’entretien régulier au dépannage : un interlocuteur unique suit votre projet du premier relevé à la réception, puis reste votre contact pour l’entretien."
        items={[
          {
            title: "Installation sanitaire et salles de bain",
            text: "Rénovation complète d’une salle de bain, remplacement d’un appareil, reprise d’une installation vétuste : alimentations, évacuations, appareils et robinetterie, avec un soin particulier pour les finitions.",
            href: "/services/sanitaire-salles-de-bain",
            cta: "Installation sanitaire et salle de bain à Genève",
          },
          {
            title: "Chauffage et pompes à chaleur",
            text: "Remplacement de chaudière, passage à la pompe à chaleur, radiateurs et distribution : nous étudions l’installation existante avant de proposer une solution.",
            href: "/services/chauffage-pompes-a-chaleur",
            cta: "Chauffage et pompe à chaleur à Genève",
          },
          {
            title: "Entretien et dépannage",
            text: "Plus d’eau chaude, chauffage en panne, fuite, canalisation bouchée : nous établissons le diagnostic sur place, puis proposons un contrat d’entretien aux régies et aux propriétaires.",
            href: "/services/entretien-depannage",
            cta: "Dépannage sanitaire et chauffage à Genève",
          },
        ]}
        outro={
          <>
            Nous réalisons aussi des douches extérieures et des aménagements de
            jardin :{" "}
            <Link href="/realisations/douches-amenagements-exterieurs" data-page-transition>
              voir nos douches extérieures
            </Link>
            .
          </>
        }
      />
      <Footer />
    </>
  );
}
