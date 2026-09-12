import { ServiceSection } from "./ServiceSection";
import { GoogleReviews } from "./GoogleReviews";
import { COUNT, RATING, REVIEWS, REVIEWS_URL } from "@/lib/reviews";
import shell from "./ServiceSection.module.css";
import styles from "./HomeSections.module.css";

/* --- Avis ----------------------------------------------------------- */

function Stars({ n }: { n: number }) {
  return (
    <span className={styles.stars} aria-label={`${n} étoiles sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true" data-on={i < n}>
          <path d="M12 2.6l2.9 5.88 6.49.95-4.7 4.58 1.11 6.46L12 17.98l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.95L12 2.6z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Avis Google, recopiés de la fiche publique (cf. src/lib/reviews.ts).
 * Aucun témoignage n'est écrit ici : s'il n'y en a qu'un sur la fiche, la
 * section n'en montre qu'un.
 */
export function HomeReviews() {
  const note = RATING.toLocaleString("fr-CH");

  return (
    <ServiceSection label="Avis">
      <h2 className={shell.headline}>Ce que disent nos clients.</h2>

      <p className={styles.aggregate}>
        <GoogleReviews />
      </p>

      <ul className={styles.cards}>
        {REVIEWS.map((r) => (
          <li key={r.author + r.date} className={styles.card}>
            <Stars n={r.rating} />
            <p className={styles.body}>{r.body}</p>
            <p className={styles.author}>
              {r.author}
              {r.meta && <span className={styles.meta}>{r.meta}</span>}
            </p>
          </li>
        ))}
      </ul>

      <a
        className={styles.link}
        href={REVIEWS_URL}
        target="_blank"
        rel="noreferrer"
      >
        {COUNT > 1 ? `Voir les ${COUNT} avis sur Google` : "Voir sur Google"}
      </a>

      {COUNT < 3 && (
        <p className={shell.missing}>
          La fiche Google ne compte pour l’instant que {COUNT} avis, noté{" "}
          {note} sur 5. La section s’étoffera d’elle-même dès que MBA en
          recueillera d’autres — mais il faut alors repasser ici : les avis
          sont figés dans le code, ils ne se mettent pas à jour tout seuls.
        </p>
      )}
    </ServiceSection>
  );
}

/* --- Questions fréquentes -------------------------------------------- */

/** Trame provisoire : questions et réponses à écrire avec MBA. */
const FAQ = [
  {
    q: "Dans quelles communes intervenez-vous ?",
    a: "Genève, Carouge, Grand-Lancy et tout le canton. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    q: "Sous quel délai puis-je obtenir un devis ?",
    a: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  },
  {
    q: "Le devis est-il payant ?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    q: "Intervenez-vous pour de petites réparations ?",
    a: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export function HomeFaq() {
  return (
    <ServiceSection label="Questions fréquentes" className={styles.last}>
      <h2 className={shell.headline}>Ce qu’on nous demande le plus.</h2>
      {/* <details> natif : l'accordéon marche sans JavaScript et le clavier
          le pilote déjà. */}
      <div className={styles.faq}>
        {FAQ.map((f) => (
          <details key={f.q} className={styles.item}>
            <summary className={styles.question}>{f.q}</summary>
            <p className={styles.answer}>{f.a}</p>
          </details>
        ))}
      </div>
    </ServiceSection>
  );
}
