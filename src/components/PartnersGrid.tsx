"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PARTNERS } from "@/lib/pages";
import { useScrollProgress } from "@/lib/useScrollProgress";
import styles from "./PartnersGrid.module.css";
import { BackdropLines } from "./BackdropLines";

/** Photos glissées DANS la trame, à la place de certaines cases : une en
 *  haut à gauche, une en bas à droite, et une derrière le bloc central.
 *  C'est ce que montre la maquette — des images qui occupent exactement
 *  une case, pas un fond qui déborde. Les index sont ceux des cases dans
 *  l'ordre du DOM ; « center » est le bloc du titre.
 *
 *  Ce sont des photos de chantier MBA, pas des images d'illustration. */
const PHOTOS: Record<number | "center", string> = {
  0: "/realisation-chaufferie.jpg",
  7: "/realisation-salle-de-bain.jpg",
  center: "/realisation-salle-deau.jpg",
};

/** Cases de la grille : 6 colonnes × 2 rangées, moins le bloc central de
 *  2 × 2 occupé par le titre — soit 8 logos pour remplir la trame.
 *
 *  La trame faisait 4 rangées (20 logos) : MBA n'en aura pas autant, une
 *  grille aux trois quarts vide aurait surtout montré des trous. Les
 *  rangées du haut et du bas sont retirées ; le bloc central occupe donc
 *  toute la hauteur (cf. `.center` dans le module CSS). */
const SLOTS = 8;

/**
 * Bandeau de logos en grille, avec un trou au centre qui porte le titre
 * et le bouton.
 *
 * Il n'arrive PAS par le bas : à la fin du carrousel, le panneau glisse
 * par-dessus la scène depuis la DROITE. Même mécanique que l'escalier et
 * le rideau blanc, qui montent par le bas par-dessus la section
 * précédente — seulement sur l'axe horizontal.
 *
 * La chronologie est chaînée à celle du carrousel (cf. le calcul dans le
 * module CSS) : son --p atteint 1 au scroll 980, puis il reste épinglé
 * sans bouger jusqu'à 1070 — c'est pendant ce palier que ce panneau
 * traverse l'écran. Si l'un des deux change de hauteur, les deux calculs
 * sont à refaire.
 *
 * Les logos s'illuminent au fur et à mesure de cette traversée, en
 * balayage droite -> gauche : chaque case s'allume quand elle entre dans
 * le cadre. Son retard vient de sa position RÉELLE mesurée, pas d'une
 * formule sur son index — le trou central fait sauter une case sur deux
 * et le nombre de colonnes change à 1100 px.
 *
 * Tant que MBA n'a pas fourni les fichiers, la grille montre des
 * emplacements : un logo inventé affirmerait un partenariat qui n'existe
 * peut-être pas. Ils reçoivent le même balayage que de vrais logos, pour
 * que l'effet se juge dès maintenant.
 */
export function PartnersGrid() {
  const items = PARTNERS.slice(0, SLOTS);
  const vides = SLOTS - items.length;

  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [delays, setDelays] = useState<number[]>([]);

  // span 0.409 : la traversée dure toujours 90svh — (320 - 100) x 0.409 —
  // donc le panneau est en place au scroll 1070, comme avant. Ce qui
  // change, c'est l'après : la scène reste épinglée et figée 130svh de
  // plus, le temps que la section des avis glisse par-dessus.
  useScrollProgress(trackRef, stageRef, 0.409);

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
      // 0 = tout à droite (entre en premier dans le cadre, s'allume en
      // premier), 1 = tout à gauche (en dernier).
      setDelays(lefts.map((l) => 1 - (l - min) / span));
    };

    // Le ResizeObserver appelle son rappel une première fois tout seul,
    // de façon asynchrone : la mesure initiale part de là plutôt que du
    // corps de l'effet (règle react-hooks/set-state-in-effect), et les
    // paliers responsive la refont d'eux-mêmes.
    const ro = new ResizeObserver(measure);
    ro.observe(grid);
    return () => ro.disconnect();
  }, []);

  return (
    <section ref={trackRef} className={styles.track}>
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.panel}>
          {/* Les cellules de la grille sont opaques (même #f5f5f4 que le
              fond) : la trame ne peut donc se voir que dans les
              gouttières autour du bloc. */}
          <BackdropLines />

          <div ref={gridRef} className={styles.grid}>
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

            {Array.from({ length: vides }, (_, i) => {
              const rang = items.length + i;
              const photo = PHOTOS[rang];
              return (
                <div
                  key={`vide-${i}`}
                  className={`${styles.cell} ${
                    photo ? styles.photoCell : styles.slot
                  }`}
                  style={{ ["--d" as string]: delays[rang] ?? 0 }}
                >
                  {photo ? (
                    /* alt vide : décorative. La photo ne dit rien que le
                       titre de la section ne dise déjà. */
                    <Image
                      src={photo}
                      alt=""
                      fill
                      sizes="(max-width: 720px) 50vw, 18vw"
                    />
                  ) : (
                    <span className={styles.slotLabel}>Logo</span>
                  )}
                </div>
              );
            })}

            {/* Le trou : il se place explicitement au centre de la trame,
                donc il ne dépend pas de l'ordre des cases autour. */}
            <div className={styles.center}>
              {/* Photo en fond du bloc du titre. Très atténuée : le titre
                  est du texte sombre sur clair, une photo à pleine force
                  dessous le rendrait illisible. */}
              <div className={styles.centerPhoto} aria-hidden="true">
                <Image
                  src={PHOTOS.center}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 100vw, 34vw"
                />
              </div>
              <h2 className={styles.title}>Un réseau de partenaires solides</h2>
              <a className={styles.cta} href="/devis" data-page-transition>
                Demander un devis
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
