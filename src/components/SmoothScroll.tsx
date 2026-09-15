"use client";

import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import "lenis/dist/lenis.css";
import { SectionSnap } from "./SectionSnap";

/**
 * Scroll virtuel.
 *
 * Lenis lisse le scroll natif au lieu de le remplacer : `scrollY` et les
 * événements `scroll` restent véridiques. Les sections épinglées (`sticky`)
 * et `useScrollProgress` continuent donc de fonctionner sans adaptation —
 * contrairement aux scrollers qui translatent le contenu, où tout casse.
 *
 * Deux réglages, un par famille de page :
 *
 * — l'accueil garde le réglage d'origine (lerp 0.085) : ses sections
 *   épinglées (Hero, EscalierSection, PaysageScroll) ont été calées sur
 *   cette réponse au scroll, la changer déréglerait leur chorégraphie ;
 * — toutes les autres pages passent à un lerp plus bas, d'après « smooth
 *   scroll animation.mov » : la vidéo montre une décélération longue et
 *   progressive après un « flick » (~0,6 à 1 s pour revenir à zéro, sans
 *   à-coup), nettement plus lente que le réglage actuel. Mesure prise par
 *   corrélation d'image sur la vidéo — approximative par nature (artefacts
 *   de compression), mais la tendance est nette. lerp 0.065 vise ce
 *   ressenti (constante de temps ~245 ms à 60 fps, stabilisation en 3-4
 *   constantes ≈ 0,7-1 s).
 *
 * `lenis/react` recrée l'instance quand `options` change de valeur (elle
 * compare par JSON.stringify) : passer d'une famille à l'autre reconstruit
 * Lenis, mais ça arrive sous le calque opaque de la transition de page —
 * invisible pour l'utilisateur.
 */
const HOME_OPTIONS = { lerp: 0.085, wheelMultiplier: 0.9 };
const REST_OPTIONS = { lerp: 0.065, wheelMultiplier: 0.9 };

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const options = pathname === "/" ? HOME_OPTIONS : REST_OPTIONS;

  return (
    <ReactLenis root options={options}>
      {/* Doit être DANS le fournisseur : il lit l'instance par contexte. */}
      <SectionSnap />
      {children}
    </ReactLenis>
  );
}
