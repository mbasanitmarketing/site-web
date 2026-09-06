"use client";

import { useEffect, type RefObject } from "react";

/**
 * Écrit la progression du scroll (0 -> 1) dans la variable CSS `--p` sur la
 * scène épinglée, pendant que la piste défile derrière elle.
 *
 * `span` permet de faire aboutir l'animation avant la fin de l'épinglage :
 * à 0.67, `--p` atteint 1 aux deux tiers du trajet et la scène reste
 * ensuite épinglée sans bouger. Ce palier sert à laisser une section
 * suivante monter par-dessus une scène finie mais toujours visible.
 *
 * Aucun re-render React : on écrit directement sur le nœud à chaque frame.
 * Les événements `scroll` sont déjà alignés sur la frame, donc pas besoin de
 * passer par requestAnimationFrame.
 */
export function useScrollProgress(
  trackRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLElement | null>,
  span = 1,
) {
  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const update = () => {
      const rect = track.getBoundingClientRect();
      // Distance réellement parcourue pendant que la scène est épinglée.
      const travel = (rect.height - stage.offsetHeight) * span;
      const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      stage.style.setProperty("--p", p.toFixed(4));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [trackRef, stageRef, span]);
}
