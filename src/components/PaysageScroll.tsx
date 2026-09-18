"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
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

  /* GLISSEMENT AU DOIGT.
   *
   * La rotation du cylindre est une fonction de la position de défilement,
   * et rien d'autre. Faire tourner le carrousel au doigt revient donc à
   * FAIRE DÉFILER LA PAGE de la distance correspondante : les deux
   * commandes restent d'accord, et le reste de la scène (le blanc qui
   * monte, le texte, le panneau qui suit) avance avec.
   *
   * La conversion se calcule sur la géométrie réelle : la rotation
   * complète occupe 80 % de la course d'épinglage (cf. --turn dans le
   * module CSS), répartie sur `count` intervalles. Un glissement de 45 %
   * de la largeur d'écran avance donc d'une diapo.
   *
   * `touch-action: pan-y` (CSS) laisse le défilement vertical au
   * navigateur et ne nous réserve que l'horizontal : on ne vole jamais un
   * geste de lecture normal.
   */
  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    if (!matchMedia("(pointer: coarse)").matches) return;

    const count = Math.max(1, REALISATIONS.length - 1);
    let x0 = 0;
    let y0 = 0;
    let horizontal = false;
    let actif = false;

    const debut = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      actif = true;
      horizontal = false;
      x0 = e.clientX;
      y0 = e.clientY;
    };

    const bouge = (e: PointerEvent) => {
      if (!actif || e.pointerType !== "touch") return;
      const dx = e.clientX - x0;
      const dy = e.clientY - y0;
      // Tant que le geste n'est pas franchement horizontal, on ne touche
      // à rien : c'est peut-être un scroll vertical qui commence.
      if (!horizontal) {
        if (Math.abs(dx) < 12 || Math.abs(dx) <= Math.abs(dy)) return;
        horizontal = true;
      }
      x0 = e.clientX;
      y0 = e.clientY;

      const course = (track.offsetHeight - stage.offsetHeight) * 0.852 * 0.8;
      const parDiapo = course / count;
      const delta = (-dx / (innerWidth * 0.45)) * parDiapo;
      scrollTo({ top: scrollY + delta });
    };

    const fin = () => {
      actif = false;
      horizontal = false;
    };

    stage.addEventListener("pointerdown", debut, { passive: true });
    stage.addEventListener("pointermove", bouge, { passive: true });
    stage.addEventListener("pointerup", fin, { passive: true });
    stage.addEventListener("pointercancel", fin, { passive: true });
    return () => {
      stage.removeEventListener("pointerdown", debut);
      stage.removeEventListener("pointermove", bouge);
      stage.removeEventListener("pointerup", fin);
      stage.removeEventListener("pointercancel", fin);
    };
  }, []);

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
