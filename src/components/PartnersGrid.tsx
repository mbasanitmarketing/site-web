import Image from "next/image";
import { PARTNERS } from "@/lib/pages";
import styles from "./PartnersGrid.module.css";
import { BackdropLines } from "./BackdropLines";

/** Cases de la grille : 6 colonnes × 4 rangées, moins le bloc central de
 *  2 × 2 occupé par le titre — soit 20 logos pour remplir la trame. */
const SLOTS = 20;

/**
 * Bandeau de logos en grille, avec un trou au centre qui porte le titre
 * et le bouton.
 *
 * Tant que MBA n'a pas fourni les fichiers, la grille montre des
 * emplacements : un logo inventé affirmerait un partenariat qui n'existe
 * peut-être pas.
 */
export function PartnersGrid() {
  const items = PARTNERS.slice(0, SLOTS);
  const vides = SLOTS - items.length;

  return (
    <section className={styles.wrap}>
      {/* Les cellules de la grille sont opaques (même #f5f5f4 que le
          fond) : la trame ne peut donc se voir que dans les gouttières
          autour du bloc — mêmes filet et pointillé que le reste du
          site, pas d'arc ici, ce format dense laisserait trop peu de
          place pour qu'il se lise. */}
      <BackdropLines />
      <div className={styles.grid}>
        {items.map((p) => (
          <div key={p.name} className={styles.cell}>
            <Image
              className={styles.logo}
              src={p.logo}
              alt={p.name}
              width={190}
              height={64}
            />
          </div>
        ))}

        {Array.from({ length: vides }, (_, i) => (
          <div key={`vide-${i}`} className={`${styles.cell} ${styles.slot}`}>
            <span className={styles.slotLabel}>Logo</span>
          </div>
        ))}

        {/* Le trou : il se place explicitement au centre de la trame, donc
            il ne dépend pas de l'ordre des cases autour. */}
        <div className={styles.center}>
          <h2 className={styles.title}>Un réseau de partenaires solides</h2>
          <a className={styles.cta} href="/devis" data-page-transition>
            Demander un devis
          </a>
        </div>
      </div>
    </section>
  );
}
