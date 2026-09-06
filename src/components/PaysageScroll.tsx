"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/lib/useScrollProgress";
import styles from "./PaysageScroll.module.css";

/** Nuances légèrement différentes : des gris identiques rendraient le
 *  défilement illisible. À remplacer par les photos. */
const SLIDES = ["#6e6e73", "#78787d", "#828287", "#74747a", "#7c7c81"];

/**
 * Section 3 — « paysage scroll ».
 *
 * Le blanc monte d'abord par-dessus la section précédente (bord plat,
 * comme sur la vidéo de référence), puis un carrousel 3D fait défiler les
 * diapos de droite à gauche pendant que la scène reste épinglée.
 *
 * Contenus provisoires : lorem ipsum et aplats gris.
 */
export function PaysageScroll() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useScrollProgress(trackRef, stageRef);

  return (
    <section ref={trackRef} className={styles.track}>
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.curtain} />

        <div className={styles.viewport}>
          <div className={styles.rail}>
            {SLIDES.map((tone, i) => (
              <div
                key={i}
                className={styles.slide}
                style={
                  { "--i": i, "--tone": tone } as React.CSSProperties
                }
              >
                <div />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.head}>
          <h2 className={styles.title}>Nos réalisations</h2>
          <p className={styles.lede}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>
      </div>
    </section>
  );
}
