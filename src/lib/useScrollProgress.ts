"use client";

import { useEffect, type RefObject } from "react";

/**
 * Écrit la progression du scroll (0 -> 1) dans la variable CSS `--p` sur la
 * scène épinglée, pendant que la piste défile derrière elle.
 *
 * `span` permet de faire aboutir l'animation avant la fin de l'épinglage :
 * à 0.67, `--p` atteint 1 aux deux tiers du trajet et la scène reste
 * ensuite épinglée sans bouger.
 *
 * Aucun re-render React : on écrit directement sur le nœud.
 *
 * TOUTES les sections partagent une seule boucle, et chaque image se
 * déroule en deux temps : on lit d'abord toutes les positions, on écrit
 * ensuite tous les `--p`. Auparavant chaque section lisait puis écrivait
 * dans son coin : l'écriture invalidait la mise en page, la lecture
 * suivante forçait un recalcul, et l'accueil en payait trois par image.
 * Les hauteurs, elles, ne bougent qu'au redimensionnement : on les mesure
 * là, plus à chaque image.
 */
type Entry = {
  track: HTMLElement;
  stage: HTMLElement;
  span: number;
  travel: number;
};

const entries = new Set<Entry>();
let raf = 0;

function measure(e: Entry) {
  e.travel = (e.track.offsetHeight - e.stage.offsetHeight) * e.span;
}

function frame() {
  raf = 0;
  // 1. lectures groupées
  const tops: number[] = [];
  for (const e of entries) tops.push(e.track.getBoundingClientRect().top);
  // 2. écritures groupées
  let i = 0;
  for (const e of entries) {
    const p =
      e.travel > 0 ? Math.min(1, Math.max(0, -tops[i] / e.travel)) : 0;
    e.stage.style.setProperty("--p", p.toFixed(4));
    i++;
  }
}

function schedule() {
  if (!raf) raf = requestAnimationFrame(frame);
}

function onResize() {
  for (const e of entries) measure(e);
  schedule();
}

function listen() {
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", onResize);
}

function unlisten() {
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", onResize);
  if (raf) cancelAnimationFrame(raf);
  raf = 0;
}

export function useScrollProgress(
  trackRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLElement | null>,
  span = 1,
) {
  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const entry: Entry = { track, stage, span, travel: 0 };
    measure(entry);
    if (entries.size === 0) listen();
    entries.add(entry);
    schedule();

    return () => {
      entries.delete(entry);
      if (entries.size === 0) unlisten();
    };
  }, [trackRef, stageRef, span]);
}
