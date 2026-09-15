"use client";

import Image from "next/image";
import { useRef } from "react";
import { REALISATIONS } from "@/lib/pages";
import { useScrollProgress } from "@/lib/useScrollProgress";
import styles from "./PaysageScroll.module.css";

/**
 * Section 3 — « paysage scroll ».
 *
 * Le blanc monte d'abord par-dessus la section précédente (bord plat,
 * comme sur la vidéo de référence), puis un carrousel 3D fait défiler les
 * diapos de droite à gauche pendant que la scène reste épinglée.
 *
 * Photos client et chapô en place.
 */
export function PaysageScroll() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // span 0.852 : --p atteint 1 au scroll 980 (dernière réalisation),
  // puis la scène reste épinglée jusqu'à 1070 sans bouger — le palier
  // pendant lequel le panneau partenaires glisse par-dessus.
  useScrollProgress(trackRef, stageRef, 0.852);

  return (
    <section ref={trackRef} className={styles.track}>
      {/* --count = nombre d'intervalles. Posé ici plutôt qu'en dur dans le
          CSS : la géométrie du cylindre suit le nombre de réalisations,
          elle ne peut pas se désynchroniser en ajoutant une photo. */}
      <div
        ref={stageRef}
        className={styles.stage}
        style={
          { "--count": REALISATIONS.length - 1 } as React.CSSProperties
        }
      >
        <div className={styles.curtain} />

        {/* Trame de fond : le filet et le pointillé restent fixes, comme
            partout ailleurs sur le site ; les deux anneaux, eux, tournent
            avec le scroll — la section a déjà un mouvement circulaire
            (le rail), ça leur donne un écho plutôt qu'une redite. Posés
            ici, entre le rideau et la scène 3D : ils peignent par-dessus
            le blanc et sous les diapos, sans toucher au z-index de la
            page (cf. passation § 5). */}
        <div className={styles.decor} aria-hidden="true">
          <span className={styles.rule} />
          <span className={styles.dash} />
          <span className={styles.ringOuter} />
          <span className={styles.ringInner} />
        </div>

        <div className={styles.viewport}>
          <div className={styles.rail}>
            {REALISATIONS.map((r, i) => (
              <div
                key={r.href}
                className={styles.slide}
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className={styles.slideMedia}>
                  <Image
                    src={r.image}
                    alt={r.alt ?? ""}
                    fill
                    sizes="(max-width: 720px) 74vw, min(46vw, 760px)"
                  />
                </div>
                <p className={styles.slideTitle}>{r.title}</p>
                <a
                  className={styles.slideCta}
                  href={r.href}
                  data-page-transition
                >
                  Voir le projet
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Deux blocs de part et d'autre du haut, d'après « les réalisations
            version 2.png » : le pavé unique sous le titre pesait trop. Le
            texte est coupé en deux, une moitié à gauche, l'autre sous le
            titre à droite. */}
        <div className={styles.head}>
          <p className={`${styles.lede} ${styles.ledeLeft}`}>
            Nous réalisons vos projets sanitaires en Suisse romande, et nous
            vous accompagnons de la réflexion et de la mise en œuvre jusqu’au
            dépannage et aux contrats d’entretien.
          </p>

          <div className={styles.headRight}>
            <h2 className={styles.title}>Nos réalisations</h2>
            <p className={styles.lede}>
              Notre spécialité ? Le haut de gamme et les excellentes finitions,
              pour villas, régies immobilières et immeubles d’entreprises.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
