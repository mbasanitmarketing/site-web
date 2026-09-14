"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/lib/useScrollProgress";
import styles from "./PrestationSteps.module.css";

/**
 * Bande d'étapes de la section « La prestation » — d'après
 * « section la prestation.mov » (apc).
 *
 * La scène s'épingle et la bande glisse de l'étape 1 à l'étape 4 au
 * scroll : pas de flèches, pas d'illustration. Chaque carte porte sa
 * pastille numérotée et son texte, qui s'allume quand la carte arrive au
 * centre et s'estompe quand elle repart.
 *
 * Toute l'animation dérive de `--p` en CSS pur : aucun re-render React
 * pendant le défilement.
 */
export function PrestationSteps({
  steps,
}: {
  steps: { title: string; body: string }[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useScrollProgress(trackRef, stageRef, 1);

  return (
    <div
      ref={trackRef}
      className={styles.track}
      /* La piste doit être assez haute pour laisser défiler les étapes
         au-delà de la première : une « longueur » par transition. */
      style={{ ["--count" as string]: steps.length }}
    >
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.viewport}>
          <div
            className={styles.rail}
            style={{ ["--last" as string]: steps.length - 1 }}
          >
            {steps.map((s, i) => (
              <article
                key={s.title}
                className={styles.card}
                style={{ ["--i" as string]: i }}
              >
                <span className={styles.badge} aria-hidden="true">
                  <span className={styles.num}>{i + 1}</span>
                </span>
                <div className={styles.body}>
                  <h3 className={styles.title}>{s.title}</h3>
                  <p className={styles.text}>{s.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
