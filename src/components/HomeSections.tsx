import { ServiceSection } from "./ServiceSection";
import { GoogleReviews } from "./GoogleReviews";
import { COUNT, PULL_QUOTE, REVIEWS, REVIEWS_URL } from "@/lib/reviews";
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
  return (
    <ServiceSection label="Avis" arc>
      <h2 className={shell.headline}>Ce que disent nos clients.</h2>

      <p className={styles.aggregate}>
        <GoogleReviews />
      </p>

      {/* Les avis courent à l'HORIZONTALE : une piste qui se fait glisser
          au doigt plutôt qu'une grille qui s'empile. Avec un seul avis
          elle tient sur une carte, avec dix elle défile — sans que la
          section ne s'allonge. */}
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

      {/* Sous les avis, la place d'une belle citation. Je ne l'écris pas :
          une phrase inventée puis signée d'un client serait un faux
          témoignage. Cf. PULL_QUOTE dans src/lib/reviews.ts.

          Tant qu'elle est vide, la place est tenue par une ligne grisée,
          SANS légende : les notes de chantier n'ont rien à faire sur la
          page publique (retirées à la demande). */}
      {PULL_QUOTE ? (
        <figure className={styles.quote}>
          <blockquote className={styles.quoteText}>
            {PULL_QUOTE.text}
          </blockquote>
          <figcaption className={styles.quoteBy}>
            {PULL_QUOTE.author}
            {PULL_QUOTE.role && (
              <span className={styles.quoteRole}>{PULL_QUOTE.role}</span>
            )}
          </figcaption>
        </figure>
      ) : (
        <figure className={`${styles.quote} ${styles.quoteEmpty}`}>
          <blockquote className={styles.quoteText}>
            La phrase qui restera en tête.
          </blockquote>
        </figure>
      )}

      <a
        className={styles.link}
        href={REVIEWS_URL}
        target="_blank"
        rel="noreferrer"
      >
        {COUNT > 1 ? `Voir les ${COUNT} avis sur Google` : "Voir sur Google"}
      </a>
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
