"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScrollProgress } from "@/lib/useScrollProgress";
import styles from "./PaysageScroll.module.css";

/**
 * Les 7 photos client. Toutes en 1536 × 1024, soit exactement le 3:2 des
 * diapos — aucun recadrage.
 *
 * Les liens pointent tous sur l'index : les pages par réalisation
 * n'existent pas encore pour ces projets-là (les trois routes actuelles
 * portent du lorem). À recâbler quand elles seront écrites.
 *
 * Le nombre de diapos est libre : la géométrie se déduit de --count dans
 * le module CSS (à tenir à jour : ici 7 diapos = 6 intervalles).
 */
const SLIDES = [
  {
    image: "/realisation-salle-de-bain.jpg",
    title: "Salle de bain",
    alt: "Salle de bain réalisée par MBA Sanit",
    href: "/realisations",
  },
  {
    image: "/realisation-chaufferie.jpg",
    title: "Chaufferie",
    alt: "Chaufferie installée par MBA Sanit",
    href: "/realisations",
  },
  {
    image: "/realisation-piscine-1.jpg",
    title: "Piscine",
    alt: "Piscine équipée par MBA Sanit",
    href: "/realisations",
  },
  {
    image: "/realisation-piscine-2.jpg",
    title: "Piscine",
    alt: "Piscine équipée par MBA Sanit, seconde vue",
    href: "/realisations",
  },
  {
    image: "/realisation-salle-deau.jpg",
    title: "Salle d’eau",
    alt: "Salle d’eau réalisée par MBA Sanit",
    href: "/realisations",
  },
  {
    image: "/realisation-douche-exterieure-1.jpg",
    title: "Douche extérieure",
    alt: "Douche extérieure réalisée par MBA Sanit",
    href: "/realisations",
  },
  {
    image: "/realisation-douche-exterieure-2.jpg",
    title: "Douche extérieure",
    alt: "Douche extérieure réalisée par MBA Sanit, seconde vue",
    href: "/realisations",
  },
];

/**
 * Section 3 — « paysage scroll ».
 *
 * Le blanc monte d'abord par-dessus la section précédente (bord plat,
 * comme sur la vidéo de référence), puis un carrousel 3D fait défiler les
 * diapos de droite à gauche pendant que la scène reste épinglée.
 *
 * Photos client en place ; le chapô est encore en lorem.
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
            {SLIDES.map((s, i) => (
              <div
                key={s.image}
                className={styles.slide}
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className={styles.slideMedia}>
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 720px) 74vw, min(46vw, 760px)"
                  />
                </div>
                <p className={styles.slideTitle}>{s.title}</p>
                <a
                  className={styles.slideCta}
                  href={s.href}
                  data-page-transition
                >
                  Voir le projet
                </a>
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
