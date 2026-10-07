import { PageIntro } from "@/components/PageIntro";
import { AboutMba } from "@/components/AboutMba";
import { Footer } from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";
import { requirePage } from "@/lib/pages";
import { getEquipe, getValeurs } from "@/lib/cms";

const PAGE = requirePage("/equipe");

export const metadata = pageMetadata("/equipe", PAGE.image);

export default async function Page() {
  const [valeurs, equipe] = await Promise.all([getValeurs(), getEquipe()]);
  return (
    <>
      <PageIntro page={PAGE} />
      <AboutMba valeurs={valeurs} equipe={equipe} />
      <Footer />
    </>
  );
}
