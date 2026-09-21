"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Snap from "lenis/snap";

/**
 * Calage par section : le scroll reste libre, mais dès qu'on le relâche
 * près d'une frontière de section, il y glisse et s'arrête — d'où la
 * sensation d'accélération puis de freinage, section après section.
 *
 * MODE « PROXIMITÉ », ET PAS « OBLIGATOIRE » — c'est le point important.
 * Ce site est bâti sur des scènes épinglées qui se jouent AU FIL du
 * scroll : la hero fait 4860 px de piste, le carrousel 710vh, le panneau
 * de logos 320svh. Un calage obligatoire sauterait d'un bord à l'autre de
 * ces pistes et écraserait l'animation qu'elles contiennent — on ne
 * verrait plus ni le carrousel tourner, ni les logos traverser.
 *
 * En proximité, le milieu d'une piste n'est jamais touché : les scènes se
 * jouent normalement. Le calage n'intervient qu'à l'arrêt, et seulement
 * si on s'est arrêté assez près d'un point de repos.
 *
 * QUELS POINTS DE REPOS ?
 *
 * Par défaut : le haut de chaque section de premier niveau, SAUF celles
 * qui remontent sur la précédente (marge haute négative). Celles-là ne
 * sont pas des débuts de page, ce sont des calques posés sur la section
 * d'avant ; s'y caler donnerait un arrêt au milieu d'un recouvrement. La
 * règle se lit sur la marge calculée, elle n'a donc rien à maintenir
 * quand une section est ajoutée.
 *
 * Mais cette règle est trop grossière pour les sections chaînées, qui ont
 * de vrais points d'arrêt : la fin de leur glissement, et leur fin tout
 * court. Une section peut donc les DÉCLARER avec `data-snap`, qui prend
 * le pas sur la règle de la marge :
 *
 *   data-snap="start"      arrêt quand son haut touche le haut du cadre
 *   data-snap="end"        arrêt quand son bas touche le bas du cadre
 *   data-snap="start end"  les deux
 *
 * C'est ce qui manquait aux avis : sans repère à leur fin, un scroll un
 * peu appuyé passait par-dessus et atterrissait droit sur la FAQ.
 *
 * AUCUN repère dans le dernier écran du document : sous un tel repère il
 * ne reste pas de quoi remplir l'écran, donc tout le bas de page tombe
 * dans son rayon d'attraction et le calage y ramène sans arrêt. C'est ce
 * qui rendait le pied de page inatteignable — on y descendait, ça
 * remontait aussitôt.
 *
 * Mouvement réduit : aucun calage. Un déplacement de page qu'on n'a pas
 * demandé, c'est précisément ce qu'il faut éviter.
 */
/**
 * CALAGE NATIF, pour les écrans tactiles.
 *
 * Au doigt, un coup de pouce un peu vif emportait la page d'un trait à
 * travers plusieurs sections. Le calage Lenis (ci-dessous) ne peut pas y
 * servir : il lance une animation JavaScript qui lutte contre l'inertie du
 * système. Le calage CSS, lui, est géré par le navigateur, au niveau du
 * défilement lui-même — aucun conflit.
 *
 * `scroll-snap-stop: always` est la pièce qui compte : le défilement ne
 * peut PAS enjamber un point de calage, même lancé à pleine vitesse. Il
 * s'arrête au début de chaque section et il faut un second geste pour
 * repartir — c'est le « ralentir après chaque section » demandé.
 *
 * `proximity` et non `mandatory`, pour la même raison que sur ordinateur :
 * les scènes épinglées se jouent AU FIL du défilement, un calage
 * obligatoire les écraserait. Le milieu d'une piste n'est jamais touché.
 *
 * Mêmes repères qu'au bureau (début de chaque section de premier niveau
 * qui ne recouvre pas la précédente, ou déclarée par `data-snap`), et
 * même règle du dernier écran : aucun repère à moins d'un écran du bas,
 * sinon le pied de page devient inatteignable.
 */
function calageNatif() {
  const racine = document.documentElement;
  let marques: HTMLElement[] = [];

  const construire = () => {
    for (const s of marques) {
      s.style.removeProperty("scroll-snap-align");
      s.style.removeProperty("scroll-snap-stop");
    }
    marques = [];

    const fin = racine.scrollHeight - window.innerHeight;
    for (const s of document.querySelectorAll<HTMLElement>(
      "#page-root > section",
    )) {
      const haut = s.getBoundingClientRect().top + window.scrollY;
      if (haut >= fin - window.innerHeight) continue;
      const declare = s.dataset.snap?.trim();
      const compte =
        declare?.split(/\s+/).includes("start") ||
        (!declare && parseFloat(getComputedStyle(s).marginTop) >= 0);
      if (!compte) continue;
      s.style.setProperty("scroll-snap-align", "start");
      s.style.setProperty("scroll-snap-stop", "always");
      marques.push(s);
    }
    racine.style.setProperty("scroll-snap-type", "y proximity");
  };

  construire();
  let t = 0;
  const onResize = () => {
    clearTimeout(t);
    t = window.setTimeout(construire, 250);
  };
  window.addEventListener("resize", onResize);

  return () => {
    window.removeEventListener("resize", onResize);
    clearTimeout(t);
    racine.style.removeProperty("scroll-snap-type");
    for (const s of marques) {
      s.style.removeProperty("scroll-snap-align");
      s.style.removeProperty("scroll-snap-stop");
    }
  };
}

export function SectionSnap() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    /* PAS DE CALAGE AU DOIGT. Sur un écran tactile, le défilement est
       natif (Lenis ne touche pas au tactile) et porté par l'inertie du
       système. Le calage, lui, lance une animation de scroll en
       JavaScript 280 ms après l'arrêt : les deux se disputent la page et
       le défilement paraît saccadé. Le repère vise aussi une hauteur
       d'écran qui change quand la barre d'adresse du navigateur se
       rétracte. Sur téléphone, le scroll natif fait mieux tout seul. */
    if (matchMedia("(pointer: coarse)").matches) return calageNatif();

    const snap = new Snap(lenis, {
      type: "proximity",
      // Ne se déclenche que si on s'immobilise à moins de 40 % d'écran du
      // repère. Au-delà, on voulait clairement s'arrêter là où on est.
      distanceThreshold: "40%",
      // Le freinage : long et sans à-coup, comme la décélération du reste
      // du site (cf. SmoothScroll). Une seconde et une sortie en cubique :
      // ça ralentit franchement avant de se poser, au lieu de claquer.
      duration: 1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      debounce: 280,
    });

    let enleve: (() => void)[] = [];

    const construire = () => {
      for (const f of enleve) f();
      enleve = [];

      // Un repère situé à moins d'un écran du BAS du document est un
      // piège : sous lui il ne reste pas de quoi remplir l'écran, donc
      // tout le bas de page tombe dans son rayon d'attraction et le
      // calage y ramène sans arrêt. C'est ce qui empêchait de rester dans
      // le pied de page : le repère de la FAQ était à 370 px du bas pour
      // un seuil de 285, on ne pouvait pas s'arrêter plus bas.
      const fin =
        document.documentElement.scrollHeight - window.innerHeight;
      const utile = (haut: number) => haut < fin - window.innerHeight;

      for (const s of document.querySelectorAll<HTMLElement>(
        "#page-root > section",
      )) {
        const haut = s.getBoundingClientRect().top + window.scrollY;
        if (!utile(haut)) continue;

        const declare = s.dataset.snap?.trim();
        if (declare) {
          enleve.push(snap.addElement(s, { align: declare.split(/\s+/) }));
          continue;
        }
        // Pas de déclaration : la règle de la marge tranche.
        if (parseFloat(getComputedStyle(s).marginTop) >= 0) {
          enleve.push(snap.addElement(s, { align: "start" }));
        }
      }
    };

    construire();

    // Les hauteurs changent au redimensionnement : un repère qui était
    // utile peut se retrouver dans le dernier écran, et réciproquement.
    let t = 0;
    const onResize = () => {
      clearTimeout(t);
      t = window.setTimeout(construire, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
      for (const f of enleve) f();
      snap.destroy();
    };
    // Le DOM change entièrement d'une page à l'autre : les repères sont à
    // relever à chaque fois.
  }, [lenis, pathname]);

  return null;
}
