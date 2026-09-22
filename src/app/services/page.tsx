import { PageIntro } from "@/components/PageIntro";
import { CardGrid } from "@/components/CardGrid";
import { Footer } from "@/components/Footer";
import { SERVICES, requirePage } from "@/lib/pages";

const PAGE = requirePage("/services");

export const metadata = {
  title: `${PAGE.title} — MBA Sanit`,
  description: PAGE.lede,
};

export default function Page() {
  return (
    <>
      <PageIntro page={PAGE} />
      {/* Même patron que /realisations : une vignette par service, la
          photo et le titre qui mènent à sa page. */}
      <CardGrid items={SERVICES} cta="Découvrir le service" />
      <Footer />
    </>
  );
}
