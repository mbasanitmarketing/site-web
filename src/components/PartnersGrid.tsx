"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PARTNERS } from "@/lib/pages";
import styles from "./PartnersGrid.module.css";
import { BackdropLines } from "./BackdropLines";

/** Cases de la grille : 6 colonnes × 4 rangées, moins le bloc central de
 *  2 × 2 occupé par le titre — soit 20 logos pour remplir la trame. */
const SLOTS = 20;

/**
 * Bandeau de logos en grille, avec un trou au centre qui porte le titre
 * et le bouton.
 *
 * Un seul geste : au scroll, la grille entre par la droite, et pendant
 * qu'elle glisse chaque logo s'illumine à son tour, en balayage
 * droite -> gauche — le même sens que l'arrivée. Se joue une fois, à
 * l'arrivée dans l'écran (pas lié en continu au scroll, contrairement au
 * carrousel 3D juste au-dessus).
 *
 * Le délai de chaque case vient de sa position RÉELLE à l'écran (mesurée
 * après montage), pas d'une formule sur son index : la grille saute une
 * case sur deux à cause du trou central, et le nombre de colonnes change
 * à 1100 et 720 px. Une formule à la main se serait déreglée à chaque
 * palier ; la mesure, elle, reste juste partout.
 *
 * Tant que MBA n'a pas fourni les fichiers, la grille montre des
 * emplacements : un logo inventé affirmerait un partenariat qui n'existe
 * peut-être pas. Les emplacements reçoivent le même balayage que de
 * vrais logos, pour que l'effet se juge dès maintenant.
 */
export function PartnersGrid() {
  const items = PARTNERS.slice(0, SLOTS);
  const vides = SLOTS - items.length;

  const gridRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [ready, setReady] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const measure = () => {
      const cells = [...grid.querySelectorAll<HTMLElement>(`.${styles.cell}`)];
      if (cells.length === 0) return;
      const lefts = cells.map((c) => c.getBoundingClientRect().left);
      const min = Math.min(...lefts);
      const max = Math.max(...lefts);
      const span = max - min || 1;
      // 0 = tout à droite (s'allume en premier, sans retard), 1 = tout
      // à gauche (s'allume en dernier) : le sens du balayage suit celui
      // de l'arrivée de la grille.
      setDelays(lefts.map((l) => 1 - (l - min) / span));
    };

    window.addEventListener("resize", measure);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Un seul observateur pour tout décider. Son premier appel arrive
    // toujours de façon asynchrone — même quand la grille est DÉJÀ dans
    // l'écran au montage — ce qui permet de mesurer et de fixer l'état
    // depuis ce rappel plutôt qu'en direct dans le corps de l'effet.
    const io = new IntersectionObserver(
      ([entry]) => {
        measure();
        setReady(true);
        if (reduced || entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(grid);

    return () => {
      window.removeEventListener("resize", measure);
      io.disconnect();
    };
  }, []);

  // Avant que l'observateur ne tranche (SSR, tout premier rendu), la
  // grille est visible telle quelle : rien ne dépend du JavaScript pour
  // être vu.
  const pending = ready && !revealed;

  return (
    <section className={styles.wrap}>
      {/* Les cellules de la grille sont opaques (même #f5f5f4 que le
          fond) : la trame ne peut donc se voir que dans les gouttières
          autour du bloc — mêmes filet et pointillé que le reste du
          site, pas d'arc ici, ce format dense laisserait trop peu de
          place pour qu'il se lise. */}
      <BackdropLines />
      <div
        ref={gridRef}
        className={`${styles.grid} ${pending ? styles.pending : ""}`}
      >
        {items.map((p, i) => (
          <div
            key={p.name}
            className={styles.cell}
            style={{ ["--d" as string]: delays[i] ?? 0 }}
          >
            <Image
              className={styles.logo}
              src={p.logo}
              alt={p.name}
              width={190}
              height={64}
            />
          </div>
        ))}

        {Array.from({ length: vides }, (_, i) => (
          <div
            key={`vide-${i}`}
            className={`${styles.cell} ${styles.slot}`}
            style={{ ["--d" as string]: delays[items.length + i] ?? 0 }}
          >
            <span className={styles.slotLabel}>Logo</span>
          </div>
        ))}

        {/* Le trou : il se place explicitement au centre de la trame, donc
            il ne dépend pas de l'ordre des cases autour. */}
        <div className={styles.center}>
          <h2 className={styles.title}>Un réseau de partenaires solides</h2>
          <a className={styles.cta} href="/devis" data-page-transition>
            Demander un devis
          </a>
        </div>
      </div>
    </section>
  );
}
