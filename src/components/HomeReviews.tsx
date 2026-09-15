"use client";

import { useEffect, useRef, useState } from "react";
import { BackdropLines } from "./BackdropLines";
import {
  COUNT,
  PULL_QUOTE,
  RATING,
  REVIEWS_AFFICHES,
  REVIEWS_URL,
} from "@/lib/reviews";
import type { Review } from "@/lib/reviews";
import styles from "./HomeReviews.module.css";

/* --- Étoiles --------------------------------------------------------- */

function Stars({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span
      className={`${styles.stars} ${className}`}
      aria-label={`${n} étoiles sur 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true" data-on={i < n}>
          <path d="M12 2.6l2.9 5.88 6.49.95-4.7 4.58 1.11 6.46L12 17.98l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.95L12 2.6z" />
        </svg>
      ))}
    </span>
  );
}

/** Initiales, à la place de la photo de profil : on n'a pas les portraits
 *  des clients, et en fabriquer un serait pire qu'un rond sobre. */
function Initiales({ nom }: { nom: string }) {
  const lettres = nom
    .split(/\s+/)
    .slice(0, 2)
    .map((m) => m[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span className={styles.avatar} aria-hidden="true">
      {lettres}
    </span>
  );
}

function Carte({ r }: { r: Review }) {
  return (
    <li className={styles.card}>
      <div className={styles.cardHead}>
        <Initiales nom={r.author} />
        <div className={styles.cardWho}>
          <p className={styles.author}>{r.author}</p>
          {r.meta && <p className={styles.meta}>{r.meta}</p>}
        </div>
        {/* Texte seul, pas le « G » multicolore : reproduire une marque
            déposée de mémoire, c'est la déformer. */}
        <p className={styles.verified}>Avis Google vérifié</p>
      </div>
      <Stars n={r.rating} className={styles.cardStars} />
      <p className={styles.body}>{r.body}</p>
    </li>
  );
}

/**
 * Avis — d'après « avis mba.png » : titre centré, filet, chapô, la note
 * globale, puis la rangée d'avis ; en dessous, un bandeau navy portant
 * une citation à l'anglaise.
 *
 * DÉFILEMENT (d'après « avis animation.mov ») : la rangée dérive
 * horizontalement, toute seule et en continu, et s'arrête au survol.
 * Même mécanique que le bandeau de logos : la piste est rendue autant de
 * fois qu'il faut pour que le cadre reste couvert, et la translation vaut
 * exactement une piste — la boucle ne se voit pas.
 *
 * La fiche Google ne compte qu'UN avis : la rangée est complétée par des
 * cartes de DÉMONSTRATION, inventées, pour que le carrousel ait de quoi
 * défiler (demandé). Elles s'éteignent d'une ligne — cf. AVIS_DEMO dans
 * src/lib/reviews.ts, à retirer avant la mise en ligne.
 *
 * La rangée ne défile que si la piste remplit déjà le cadre : en dessous,
 * les cartes sont simplement centrées, immobiles.
 */
export function HomeReviews() {
  const note = RATING.toLocaleString("fr-CH");

  const viewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const [copies, setCopies] = useState(1);

  useEffect(() => {
    const viewport = viewportRef.current;
    const rail = railRef.current;
    if (!viewport || !rail) return;

    const measure = () => {
      const piste = rail.getBoundingClientRect().width;
      const cadre = viewport.getBoundingClientRect().width;
      if (piste <= 0) return;
      // Assez d'avis pour couvrir le cadre ? Sinon : une seule piste,
      // centrée, sans animation.
      setCopies(piste >= cadre ? Math.ceil(cadre / piste) + 1 : 1);
    };

    // Le ResizeObserver appelle son rappel une première fois tout seul :
    // la mesure initiale part de là (règle react-hooks/set-state-in-effect).
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(rail);
    return () => ro.disconnect();
  }, []);

  const defile = copies > 1;

  const piste = (i: number) => (
    <ul
      key={i}
      ref={i === 0 ? railRef : undefined}
      className={styles.rail}
      aria-hidden={i > 0 || undefined}
    >
      {REVIEWS_AFFICHES.map((r) => (
        <Carte key={r.author + r.date} r={r} />
      ))}
    </ul>
  );

  return (
    <section className={styles.wrap}>
      <BackdropLines arc />

      <div className={styles.head}>
        <h2 className={styles.title}>Au plus près de vous&nbsp;!</h2>
        <span className={styles.rule} aria-hidden="true" />
        <p className={styles.lede}>
          Villas, régies immobilières et immeubles d’entreprises : nous
          intervenons dans toute la Suisse romande, de la première visite au
          contrat d’entretien.
        </p>

        <a
          className={styles.rating}
          href={REVIEWS_URL}
          target="_blank"
          rel="noreferrer"
          aria-label={`Note Google : ${note} sur 5 — ${COUNT} avis`}
        >
          <Stars n={Math.round(RATING)} />
          <span className={styles.score}>{RATING}/5</span>
          <span className={styles.google}>Google</span>
        </a>
      </div>

      <div
        ref={viewportRef}
        className={`${styles.viewport} ${defile ? styles.viewportDefile : ""}`}
      >
        <div
          className={styles.marquee}
          style={
            {
              "--copies": copies,
              "--n": REVIEWS_AFFICHES.length,
            } as React.CSSProperties
          }
        >
          {Array.from({ length: copies }, (_, i) => piste(i))}
        </div>
      </div>

      {/* Bandeau navy : la citation mise en avant. Vide pour l'instant —
          cf. PULL_QUOTE dans src/lib/reviews.ts. */}
      <div className={styles.band}>
        {PULL_QUOTE ? (
          <figure className={styles.quote}>
            <blockquote className={styles.quoteText}>
              “{PULL_QUOTE.text}”
            </blockquote>
            <figcaption className={styles.quoteBy}>
              {PULL_QUOTE.role && (
                <span className={styles.quoteRole}>{PULL_QUOTE.role}</span>
              )}
              <span className={styles.quoteAuthor}>{PULL_QUOTE.author}</span>
            </figcaption>
          </figure>
        ) : (
          <figure className={`${styles.quote} ${styles.quoteEmpty}`}>
            <blockquote className={styles.quoteText}>
              “La phrase qui restera en tête.”
            </blockquote>
          </figure>
        )}
      </div>
    </section>
  );
}
