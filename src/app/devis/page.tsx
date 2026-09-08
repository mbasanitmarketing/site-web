import { PageIntro } from "@/components/PageIntro";
import { DevisForm } from "@/components/DevisForm";
import { Footer } from "@/components/Footer";
import { requirePage } from "@/lib/pages";

const PAGE = requirePage("/devis");

export const metadata = { title: `${PAGE.title} — MBA Sanit` };

export default function Page() {
  return (
    <>
      <PageIntro page={PAGE} />
      <DevisForm />
      <Footer />
    </>
  );
}
