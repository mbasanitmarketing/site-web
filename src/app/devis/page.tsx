import { DevisForm } from "@/components/DevisForm";
import { Footer } from "@/components/Footer";
import { requirePage } from "@/lib/pages";

const PAGE = requirePage("/devis");

export const metadata = { title: `${PAGE.title} — MBA Sanit` };

/* Pas d'ouverture (PageIntro) ici : le formulaire est l'unique raison de
   venir sur cette page, il arrive donc directement en haut. C'est lui qui
   porte le H1 (prop `atTop`). /devis est listée dans NO_INTRO pour que le
   calque de transition ne fasse pas apparaître un titre qui n'existe plus
   sur la page d'arrivée. */
export default function Page() {
  return (
    <>
      <DevisForm atTop />
      <Footer above="navy" />
    </>
  );
}
