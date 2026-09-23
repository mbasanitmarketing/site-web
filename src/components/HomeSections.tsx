import { Faq } from "./Faq";
import { getFaqItems } from "@/lib/cms";

/* --- Questions fréquentes -------------------------------------------- */

/**
 * Mêmes questions que sur les pages de service : une seule source
 * (getFaqItems, dans src/lib/cms.ts, repli sur FAQ_ITEMS de pages.ts). Deux
 * FAQ qui divergeraient sur les mêmes questions seraient pires qu'une seule.
 */
export async function HomeFaq() {
  const items = await getFaqItems();
  return (
    <Faq
      items={items}
      lede="Ce qu’on nous demande le plus souvent, avant un premier rendez-vous."
    />
  );
}
