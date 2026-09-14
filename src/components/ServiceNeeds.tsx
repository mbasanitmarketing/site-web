"use client";

import Image from "next/image";
import { useRef } from "react";
import type { ServiceDetail } from "@/lib/pages";
import { useScrollProgress } from "@/lib/useScrollProgress";
import styles from "./ServiceNeeds.module.css";

/**
 * « À votre écoute » — d'après « image et textes zoom animation.mov »
 * (halston / metrik.studio).
 *
 * La scène s'épingle et tout dérive de --p (cf. le module CSS pour les
 * bornes exactes de chaque fenêtre) :
 *
 *   0    -> 0.55  l'image grandit d'un petit rectangle centré au plein
 *                 cadre, recouvrant peu à peu le grand mot posé derrière
 *   0.48 -> 0.62  le titre et le bouton apparaissent sur l'image
 *   0.66 -> 0.92  le panneau des trois cas remonte par le bas, puis reste
 *                 épinglé en place jusqu'à la fin de la piste
 *
 * Sur la référence c'est le footer qui remonte ; ici ce sont les trois
 * situations, côte à côte.
 *
 * La photo est celle de l'équipe : c'est la seule du fonds qui parle de
 * gens plutôt que de chantier, et la section parle d'écoute. Elle sert
 * aussi de hero à /equipe — une photo dédiée serait mieux.
 */
export function ServiceNeeds({ service }: { service: ServiceDetail }) {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useScrollProgress(trackRef, stageRef);

  return (
    <section ref={trackRef} className={styles.track}>
      <div ref={stageRef} className={styles.stage}>
        {/* Posé DERRIÈRE l'image : c'est elle qui le recouvre en
            grandissant, pas un fondu. */}
        <p className={styles.word} aria-hidden="true">
          À votre écoute
        </p>

        <div className={styles.media}>
          <Image
            src="/equipe.jpg"
            alt=""
            fill
            sizes="100vw"
            className={styles.image}
          />
          <div className={styles.onImage}>
            <h2 className={styles.headline}>
              Les situations qui amènent à appeler.
            </h2>
            <a className={styles.cta} href="/devis" data-page-transition>
              Demander un devis
            </a>
          </div>
        </div>

        {/* Les trois cas, côte à côte, montés par le bas. */}
        <div className={styles.panel}>
          <ul className={styles.cases}>
            {service.needs.map((n) => (
              <li key={n.title} className={styles.case}>
                <h3 className={styles.caseTitle}>{n.title}</h3>
                <p className={styles.caseBody}>{n.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
