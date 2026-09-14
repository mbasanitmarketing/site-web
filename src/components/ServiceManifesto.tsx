"use client";

import { useRef } from "react";
import type { Manifesto } from "@/lib/pages";
import { useScrollProgress } from "@/lib/useScrollProgress";
import styles from "./ServiceManifesto.module.css";
import { BackdropLines } from "./BackdropLines";
import { PrestationSteps } from "./PrestationSteps";

/**
 * Section « La prestation » — un repère à gauche, à droite la grande
 * ligne, le chapô, puis la bande des quatre étapes.
 *
 * TOUTE la section s'épingle, titre et chapô compris : la piste part
 * au-dessus d'eux. Épingler seulement la bande les faisait sortir de
 * l'écran, et on perdait le contexte pendant le défilement des étapes.
 */
export function ServiceManifesto({ manifesto }: { manifesto: Manifesto }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useScrollProgress(trackRef, stageRef, 1);

  return (
    <section className={styles.wrap}>
      <BackdropLines arc />

      <div
        ref={trackRef}
        className={styles.track}
        style={{ ["--count" as string]: manifesto.blocks.length }}
      >
        <div ref={stageRef} className={styles.stage}>
          <div className={styles.grid}>
            <p className={styles.label}>{manifesto.label}</p>

            <div>
              {/* h2 : le h1 de la page est le titre porté par le hero. */}
              <h2 className={styles.headline}>{manifesto.headline}</h2>
              <p className={styles.intro}>{manifesto.intro}</p>
              <PrestationSteps steps={manifesto.blocks} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
