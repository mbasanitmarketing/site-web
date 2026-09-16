import { PageIntro } from "@/components/PageIntro";
import { AboutMba } from "@/components/AboutMba";
import { Footer } from "@/components/Footer";
import { requirePage } from "@/lib/pages";

const PAGE = requirePage("/equipe");

export const metadata = {
  title: `${PAGE.title} — MBA Sanit`,
  description: PAGE.lede,
};

export default function Page() {
  return (
    <>
      <PageIntro page={PAGE} />
      <AboutMba />
      <Footer />
    </>
  );
}
