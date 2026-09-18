import { COUNT, RATING, REVIEWS_URL } from "@/lib/reviews";
import styles from "./GoogleBadge.module.css";

/**
 * Pastille d'avis Google, fixe en bas à gauche — le pendant du bouton
 * WhatsApp, qui occupe le coin droit (cf. « badge google avis » demandé).
 *
 * Les chiffres viennent de la VRAIE fiche : 5,0 sur 1 avis (src/lib/
 * reviews.ts). La maquette de référence en montrait 4,9 sur 152 — ce sont
 * ceux d'un autre commerce, on ne les recopie pas.
 *
 * Pas de « G » multicolore : reproduire une marque déposée de mémoire,
 * c'est la déformer. Le mot « Google » écrit, cinq étoiles et la note
 * disent la même chose, sans rien contrefaire.
 */
export function GoogleBadge() {
  const note = RATING.toLocaleString("fr-CH", { minimumFractionDigits: 1 });
  const pleines = Math.round(RATING);

  return (
    <a
      className={styles.badge}
      href={REVIEWS_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={`Avis Google : ${note} sur 5 — ${COUNT} avis. Voir la fiche.`}
    >
      <span className={styles.marque}>
        Avis
        <br />
        Google
      </span>
      <span className={styles.note}>{note}</span>
      <span className={styles.etoiles} aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} viewBox="0 0 24 24" data-on={i < pleines}>
            <path d="M12 2.6l2.9 5.88 6.49.95-4.7 4.58 1.11 6.46L12 17.98l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.95L12 2.6z" />
          </svg>
        ))}
      </span>
      <span className={styles.compte}>
        {COUNT} avis
      </span>
    </a>
  );
}
