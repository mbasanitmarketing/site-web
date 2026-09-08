import { PageIntro } from "@/components/PageIntro";
import { requirePage } from "@/lib/pages";

const PAGE = requirePage("/services");

export const metadata = { title: `${PAGE.title} — MBA Sanit` };

export default function Page() {
  return <PageIntro page={PAGE} />;
}
