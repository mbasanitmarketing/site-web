import styles from "./GoogleReviews.module.css";

/**
 * Note Google — l'étoile + la note + le nombre d'avis.
 *
 * Valeurs PROVISOIRES : à brancher sur la vraie fiche d'établissement
 * (Google Business Profile) le moment venu.
 */
const RATING = 4.9;
const COUNT = 127;
const REVIEWS_URL = "#avis";

export function GoogleReviews({ className = "" }: { className?: string }) {
  const note = RATING.toLocaleString("fr-CH");

  return (
    <a
      className={`${styles.reviews} ${className}`}
      href={REVIEWS_URL}
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
