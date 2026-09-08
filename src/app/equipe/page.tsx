import { PageIntro } from "@/components/PageIntro";
import { Footer } from "@/components/Footer";
import { requirePage } from "@/lib/pages";

const PAGE = requirePage("/equipe");

export const metadata = { title: `${PAGE.title} — MBA Sanit` };

export default function Page() {
  return (
    <>
      <PageIntro page={PAGE} />
      <Footer />
    </>
  );
}
