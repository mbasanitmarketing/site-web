import { BackdropLines } from "./BackdropLines";
import styles from "./Faq.module.css";

export type FaqItem = { q: string; a: string };

/**
 * Questions fréquentes — d'après « FAQ - MBA.png ».
 *
 * Deux colonnes : à gauche le titre, sa phrase, et un encart bleu qui
 * renvoie au formulaire ; à droite la liste, séparée de filets d'un
 * pixel. La première question est ouverte, comme sur la maquette.
 *
 * `<details>` natif : l'accordéon marche sans JavaScript, le clavier le
 * pilote déjà, et le contenu des réponses reste dans la page pour un
 * moteur de recherche même replié.
 *
 * Même composant pour l'accueil et les pages de service : c'est la même
 * section, seules les questions changent.
 */
export function Faq({
  items,
  lede,
  className = "",
}: {
  items: FaqItem[];
  /** Phrase sous le titre. Elle dépend de la page. */
  lede: string;
  className?: string;
}) {
  return (
    <section className={`${styles.wrap} ${className}`}>
      <BackdropLines />

      <div className={styles.grid}>
        <div className={styles.left}>
          <h2 className={styles.title}>Questions fréquentes</h2>
          <p className={styles.lede}>{lede}</p>

          <div className={styles.card}>
            <div>
              <p className={styles.cardTitle}>Une demande particulière&nbsp;?</p>
              <p className={styles.cardSub}>Contactez notre équipe&nbsp;!</p>
            </div>
            <a className={styles.cardCta} href="/devis" data-page-transition>
              Vers le formulaire
            </a>
          </div>
        </div>

        <div className={styles.list}>
          {items.map((f, i) => (
            <details key={f.q} className={styles.item} open={i === 0}>
              <summary className={styles.question}>
                <span>{f.q}</span>
                {/* Deux barres : un « + » qui pivote en croix à
                    l'ouverture. Le signe dit l'état, pas la couleur. */}
                <span className={styles.icon} aria-hidden="true" />
              </summary>
              <p className={styles.answer}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
