import { PageIntro } from "@/components/PageIntro";
import { requirePage } from "@/lib/pages";

const PAGE = requirePage("/devis");

export const metadata = { title: `${PAGE.title} — MBA Sanit` };

export default function Page() {
  return <PageIntro page={PAGE} />;
}
