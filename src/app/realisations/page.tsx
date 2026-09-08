import { PageIntro } from "@/components/PageIntro";
import { CardGrid } from "@/components/CardGrid";
import { Footer } from "@/components/Footer";
import { CATEGORIES, requirePage } from "@/lib/pages";

const PAGE = requirePage("/realisations");

export const metadata = { title: `${PAGE.title} — MBA Sanit` };

export default function Page() {
  return (
    <>
      <PageIntro page={PAGE} />
      {/* Les trois catégories ; les réalisations sont dans chacune. */}
      <CardGrid items={CATEGORIES} cta="Voir la catégorie" />
      <Footer />
    </>
  );
}
