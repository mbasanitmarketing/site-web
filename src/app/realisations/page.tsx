import { PageIntro } from "@/components/PageIntro";
import { CardGrid } from "@/components/CardGrid";
import { Footer } from "@/components/Footer";
import { SeoIntro } from "@/components/SeoIntro";
import { pageMetadata } from "@/lib/seo";
import { CATEGORIES, requirePage } from "@/lib/pages";

const PAGE = requirePage("/realisations");

export const metadata = pageMetadata("/realisations", PAGE.image);

export default function Page() {
  return (
    <>
      <PageIntro page={PAGE} />
      {/* Les trois catégories ; les réalisations sont dans chacune. */}
      <CardGrid items={CATEGORIES} cta="Voir la catégorie" />
      <SeoIntro
        title="Nos réalisations de salles de bain, de chauffage et de douches extérieures"
        intro="Voici une sélection de chantiers menés par MBA Sanit à Genève et en Suisse romande : salles de bain et salles d’eau rénovées, chaufferies équipées de pompes à chaleur, douches extérieures en pierre ou en bois. Chaque fiche présente le projet, ses grandes lignes et une galerie de photos."
        items={[
          {
            title: "Salles de bain et salles d’eau",
            text: "Rénovations complètes et installations sanitaires sur mesure : carrelage, douche, meuble vasque et robinetterie, jusqu’aux finitions.",
            href: "/realisations/sanitaire-salles-de-bain",
            cta: "Voir les salles de bain et salles d’eau",
          },
          {
            title: "Chaufferies et pompes à chaleur",
            text: "Production de chaleur, eau chaude sanitaire et distribution : des chaufferies lisibles, faciles à contrôler et à entretenir.",
            href: "/realisations/chauffage-pompes-a-chaleur",
            cta: "Voir les chaufferies et pompes à chaleur",
          },
          {
            title: "Douches et aménagements extérieurs",
            text: "Douches extérieures en pierre ou en bois, fontaines et aménagements de jardin, pensés pour durer dehors.",
            href: "/realisations/douches-amenagements-exterieurs",
            cta: "Voir les douches et aménagements extérieurs",
          },
        ]}
      />
      <Footer />
    </>
  );
}
