"use client";

import Image from "next/image";
import { useRef } from "react";
import { REALISATIONS } from "@/lib/pages";
import { useScrollProgress } from "@/lib/useScrollProgress";
import titre from "./Heading.module.css";
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

                  {/* Le serpent doré : un seul arc qui fait le tour de
                      l'image, avec quelques particules dans son sillage.
                      Pas de SVG ici — cf. le module CSS, les tirets d'un
                      tracé SVG se comptent en pixels d'écran dès qu'on
                      fige l'épaisseur du trait, ce qui émiettait la ligne
                      en centaines de pointillés. */}
                  <div className={styles.slideOutline} aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((k) => (
                      <span
                        key={k}
                        className={styles.spark}
                        style={{ "--k": k } as React.CSSProperties}
                      />
                    ))}
                  </div>
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
        {/* Le titre est un ENFANT DIRECT du bandeau, pas imbriqué dans la
            colonne de droite : sur mobile tout s'empile dans l'ordre du
            DOM, et le titre se retrouvait coincé ENTRE les deux
            descriptions. Ici il vient en premier, et c'est la grille qui
            le renvoie à droite sur grand écran. */}
        <div className={styles.head}>
          <h2 className={`${styles.title} ${titre.h2}`}>Nos réalisations</h2>

          <p className={`${styles.lede} ${styles.ledeLeft}`}>
            Nous réalisons vos projets sanitaires en Suisse romande, et nous
            vous accompagnons de la réflexion et de la mise en œuvre jusqu’au
            dépannage et aux contrats d’entretien.
          </p>

          <p className={`${styles.lede} ${styles.ledeRight}`}>
            Notre spécialité ? Le haut de gamme et les excellentes finitions,
            pour villas, régies immobilières et immeubles d’entreprises.
          </p>
        </div>
      </div>
    </section>
  );
}
