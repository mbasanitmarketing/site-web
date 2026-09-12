import type { Manifesto } from "@/lib/pages";
import styles from "./ServiceManifesto.module.css";

/**
 * Section « manifeste » sous le hero d'une page de service, d'après la
 * maquette : un petit mot dans une colonne étroite à gauche, à droite une
 * grande ligne, un chapô, puis des blocs intitulé-en-gras + paragraphe.
 *
 * Rien ne sépare les blocs que du blanc — pas de filet, contrairement aux
 * pages de réalisation.
 */
export function ServiceManifesto({ manifesto }: { manifesto: Manifesto }) {
  return (
    <section className={styles.wrap}>
      <div className={styles.grid}>
        <p className={styles.label}>{manifesto.label}</p>

        <div>
          {/* h2 : le h1 de la page est le titre porté par le hero. */}
          <h2 className={styles.headline}>{manifesto.headline}</h2>
          <p className={styles.intro}>{manifesto.intro}</p>

          {manifesto.blocks.map((b) => (
            <div key={b.title} className={styles.block}>
              <h3 className={styles.blockTitle}>{b.title}</h3>
              <p className={styles.blockBody}>{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
