import { COUNT, RATING, REVIEWS_URL } from "@/lib/reviews";
import styles from "./GoogleReviews.module.css";

/**
 * Note Google — l'étoile + la note + le nombre d'avis.
 *
 * Les valeurs viennent de src/lib/reviews.ts, relevées sur la vraie fiche.
 * Avant, 4,9 et 127 étaient écrits en dur ici : deux chiffres faux, et
 * affichés en ligne.
 */

export function GoogleReviews({ className = "" }: { className?: string }) {
  // « 5,0 » et non « 5 » : c'est la forme affichée par Google.
  const note = RATING.toLocaleString("fr-CH", { minimumFractionDigits: 1 });

  return (
    <a
      className={`${styles.reviews} ${className}`}
      href={REVIEWS_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={`Note Google : ${note} sur 5 — ${COUNT} avis`}
    >
      <svg className={styles.star} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.6l2.9 5.88 6.49.95-4.7 4.58 1.11 6.46L12 17.98l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.95L12 2.6z" />
      </svg>
      <span className={styles.note}>{note}</span>
      <span className={styles.count}>({COUNT} avis Google)</span>
    </a>
  );
}
