import { PageIntro } from "@/components/PageIntro";
import { CardGrid } from "@/components/CardGrid";
import { Footer } from "@/components/Footer";
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
      <Footer />
    </>
  );
}
