"use client";

import Image from "next/image";
import { useRef } from "react";
import type { ServiceDetail } from "@/lib/pages";
import { useScrollProgress } from "@/lib/useScrollProgress";
import titre from "./Heading.module.css";
import styles from "./ServiceNeeds.module.css";

/**
 * « À votre écoute » — d'après « image et textes zoom animation.mov »
 * (halston / metrik.studio), avec un écart voulu : le titre est posé en
 * clair dans son propre bandeau au-dessus de l'image, pas caché derrière
 * elle comme sur la référence.
 *
 * La scène s'épingle et le reste dérive de --p (cf. le module CSS pour
 * les bornes exactes de chaque fenêtre) :
 *
 *   0    -> 0.42  l'image grandit jusqu'au plein cadre de sa zone
 *   0.36 -> 0.48  le titre et le bouton apparaissent sur l'image
 *   0.54 -> 0.80  le panneau des trois cas remonte par le bas, puis reste
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
        {/* Dans son propre bandeau, au-dessus de l'image — pas caché
            derrière elle. */}
        {/* Les lignes dorées qui tombent pendant que l'image grandit.
            Décoratives : rien à lire, rien à cliquer. */}
        <div className={styles.rain} aria-hidden="true" />

        <h2 className={`${styles.label} ${titre.h2}`}>MBA, toute une équipe à votre écoute</h2>

        <div className={styles.media}>
          <Image
            src="/equipe.jpg"
            alt=""
            fill
            sizes="100vw"
            className={styles.image}
          />
          <div className={styles.onImage}>
            {/* Sous-titre de la section, dont « MBA, toute une équipe à votre écoute » est le h2. */}
            <h3 className={`${styles.headline} ${titre.h2} ${titre.onDark}`}>
              Les situations qui amènent à appeler.
            </h3>
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
                <h4 className={styles.caseTitle}>{n.title}</h4>
                <p className={styles.caseBody}>{n.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
