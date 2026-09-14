import type { Manifesto } from "@/lib/pages";
import styles from "./ServiceManifesto.module.css";
import { BackdropLines } from "./BackdropLines";
import { PrestationSteps } from "./PrestationSteps";

/**
 * Section « manifeste » sous le hero d'une page de service, d'après la
 * maquette : un petit mot dans une colonne étroite à gauche, à droite une
 * grande ligne, un chapô, puis la bande des quatre étapes.
 */
export function ServiceManifesto({ manifesto }: { manifesto: Manifesto }) {
  return (
    <section className={styles.wrap}>
      <BackdropLines arc />
      <div className={styles.grid}>
        <p className={styles.label}>{manifesto.label}</p>

        <div>
          {/* h2 : le h1 de la page est le titre porté par le hero. */}
          <h2 className={styles.headline}>{manifesto.headline}</h2>
          <p className={styles.intro}>{manifesto.intro}</p>

          {/* Les blocs sont devenus une bande d'étapes qui défile au
              scroll. Elle est DANS la colonne de droite : le repère de
              gauche, collant dans sa case de grille, reste donc visible à
              côté pendant tout le défilement. */}
          <PrestationSteps steps={manifesto.blocks} />
        </div>
      </div>
    </section>
  );
}
