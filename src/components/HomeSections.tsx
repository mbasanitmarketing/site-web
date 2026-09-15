import { Faq } from "./Faq";
import { FAQ_ITEMS } from "@/lib/pages";

/* --- Questions fréquentes -------------------------------------------- */

/**
 * Mêmes questions que sur les pages de service : elles sont écrites une
 * seule fois (FAQ_ITEMS, dans src/lib/pages.ts). Deux FAQ qui
 * divergeraient sur les mêmes questions seraient pires qu'une seule.
 */
export function HomeFaq() {
  return (
    <Faq
      items={FAQ_ITEMS}
      lede="Ce qu’on nous demande le plus souvent, avant un premier rendez-vous."
    />
  );
}
