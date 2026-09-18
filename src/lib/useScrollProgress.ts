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
  /** Dernière valeur écrite, pour ne pas la réécrire à l'identique. */
  dernier: string;
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
    i++;
    // Écrire une propriété personnalisée sur la scène invalide le style de
    // TOUTE sa descendance : le navigateur recalcule chaque enfant qui en
    // hérite. Hors de l'écran, la valeur reste collée à 0 ou à 1 — on la
    // réécrivait quand même, soixante fois par seconde, pour rien. Trois
    // décimales suffisent (un millième de la course) et augmentent le
    // nombre d'images où rien ne change.
    const valeur = p.toFixed(3);
    if (valeur === e.dernier) continue;
    e.dernier = valeur;
    e.stage.style.setProperty("--p", valeur);
  }
}

function schedule() {
  if (!raf) raf = requestAnimationFrame(frame);
}

function onResize() {
  for (const e of entries) measure(e);
  schedule();
}

/* Les écouteurs sont posés UNE FOIS et ne sont plus retirés.
 *
 * Par précaution, pas pour corriger un bug observé : ils étaient attachés
 * au premier abonné et retirés dès qu'il n'en restait aucun. Tant que la
 * hero s'abonnait, le compte ne tombait jamais à zéro en cours de page ;
 * depuis qu'elle est animée en CSS, il peut y passer. Si un montage et un
 * démontage s'y entrelaçaient (React en double-montage, ou une navigation
 * client), l'écouteur pouvait se retrouver détaché alors qu'une scène
 * vient de s'abonner — et toute la page resterait figée.
 *
 * Deux écouteurs passifs pour la vie de l'onglet, c'est un coût nul ; la
 * boucle, elle, ne tourne que s'il y a des scènes à mettre à jour. */
let ecoute = false;

function listen() {
  if (ecoute) return;
  ecoute = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", onResize);
}

export function useScrollProgress(
  trackRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLElement | null>,
  span = 1,
  /** `false` quand la scène écrit `--p` elle-même en CSS (animation liée
   *  au scroll) : la boucle JS n'aurait plus qu'à lutter contre elle. */
  actif = true,
) {
  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage || !actif) return;

    const entry: Entry = { track, stage, span, travel: 0, dernier: "" };
    measure(entry);
    listen();
    entries.add(entry);
    schedule();

    return () => {
      entries.delete(entry);
    };
  }, [trackRef, stageRef, span, actif]);
}
