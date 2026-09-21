"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Remet la page tout en haut à chaque CHANGEMENT DE PAGE.
 *
 * Sans ça, on comptait sur trois mécanismes qui ne se parlent pas : Next
 * (qui ne remonte que si le haut de la nouvelle page est hors de l'écran),
 * le navigateur (qui restaure ou rabote la position quand la page est plus
 * courte que la précédente) et Lenis (qui garde sa PROPRE mémoire de la
 * position et peut la rejouer). Sur téléphone, selon l'ordre dans lequel
 * ils passaient, on arrivait « parfois » en bas de la nouvelle page, dans
 * le pied de page — typiquement en cliquant un lien depuis le bas d'une
 * longue page vers une page plus courte, comme le devis.
 *
 * On ne s'en remet plus à eux : à chaque changement de chemin, position à
 * zéro, dans le navigateur ET dans la mémoire de Lenis, avant l'affichage.
 *
 * EXCEPTION : retour arrière / avance du navigateur. Là, on revient où
 * l'on était, c'est ce qu'on attend d'un bouton « précédent ».
 *
 * Les ancres (#mentions-legales…) ne changent pas le chemin : elles ne sont
 * pas concernées.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();
  // Lue par référence : l'instance Lenis est recréée d'une famille de
  // pages à l'autre, et l'avoir en dépendance relancerait ce retour en
  // haut SANS navigation (au chargement, par exemple).
  const lenisRef = useRef(lenis);
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);
  const premier = useRef(true);
  const historique = useRef(false);

  // Un retour arrière précède toujours le changement de chemin : on le note.
  useEffect(() => {
    const onPop = () => {
      historique.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useLayoutEffect(() => {
    // Premier rendu : on arrive sur la page, rien à remettre.
    if (premier.current) {
      premier.current = false;
      return;
    }
    if (historique.current) {
      historique.current = false;
      return;
    }

    const haut = () => {
      // `force` : même si Lenis est en pause (menu ouvert, transition).
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    };
    haut();
    // Une seconde fois à l'image suivante : Next pose sa propre position
    // dans le même cycle, et la page peut encore changer de hauteur
    // (images, polices) — le zéro doit être le dernier mot.
    const id = requestAnimationFrame(haut);
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
