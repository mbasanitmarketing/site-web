import { Faq } from "./Faq";
import { ZONE } from "@/lib/pages";

/* --- Questions fréquentes -------------------------------------------- */

/** Trame provisoire : questions et réponses à écrire avec MBA. */
const FAQ = [
  /* La zone d'intervention est écrite une seule fois (cf. ZONE dans
     src/lib/pages.ts) et sert ici comme sur les pages de service : deux
     réponses qui divergeraient sur les communes couvertes, ce serait pire
     que pas de réponse du tout. */
  ZONE,
  {
    q: "Sous quel délai puis-je obtenir un devis ?",
    a: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  },
  {
    q: "Le devis est-il payant ?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    q: "Intervenez-vous pour de petites réparations ?",
    a: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export function HomeFaq() {
  return (
    <Faq
      items={FAQ}
      lede="Ce qu’on nous demande le plus souvent, avant un premier rendez-vous."
    />
  );
}

