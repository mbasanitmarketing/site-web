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
import titre from "./Heading.module.css";
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

/**
 * Une carte. Deux états, comme sur la maquette :
 *
 *   repliée   — bleu clair, initiales + nom + étoiles, rien d'autre ;
 *   ouverte   — blanche, avec la mention vérifiée et le texte de l'avis.
 *
 * S'ouvre celle qui est la plus proche du MILIEU du cadre — elle se
 * referme en s'éloignant (cf. « avis animation.mov »). Le survol prend le
 * pas dessus tant que la souris est sur une carte ; dès qu'elle en sort,
 * la règle du milieu reprend la main. Le pilotage est dans HomeReviews.
 *
 * Le texte se replie par `grid-template-rows: 0fr -> 1fr` : ça s'anime,
 * contrairement à `height: auto`, et ça n'oblige pas à connaître la
 * hauteur du texte à l'avance.
 */
function Carte({ r }: { r: Review }) {
  return (
    <li className={styles.card}>
      <div className={styles.cardHead}>
        <Initiales nom={r.author} />
        <div className={styles.cardWho}>
          <p className={styles.author}>{r.author}</p>
          {r.meta && <p className={styles.meta}>{r.meta}</p>}
        </div>
      </div>
      <Stars n={r.rating} className={styles.cardStars} />
      <div className={styles.fold}>
        <div className={styles.foldInner}>
          {/* Texte seul, pas le « G » multicolore : reproduire une marque
              déposée de mémoire, c'est la déformer. */}
          <p className={styles.verified}>Avis Google vérifié</p>
          <p className={styles.body}>{r.body}</p>
        </div>
      </div>
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
 * Le DÉFILEMENT, lui, est continu et ne dépend d'aucun geste : pas
 * d'arrêt au survol, il se déclenchait au moindre mouvement de souris.
 * Seule l'OUVERTURE des cartes réagit au curseur.
 */
export function HomeReviews() {
  const note = RATING.toLocaleString("fr-CH");

  const viewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const viewport = viewportRef.current;
    const rail = railRef.current;
    if (!viewport || !rail) return;

    const measure = () => {
      const piste = rail.getBoundingClientRect().width;
      const cadre = viewport.getBoundingClientRect().width;
      if (piste <= 0) return;
      // (copies - 1) pistes doivent couvrir le cadre quand la translation
      // est à son maximum, sinon il reste une bande vide à chaque tour.
      // Jamais moins de deux : il en faut une qui prenne la place de
      // l'autre.
      setCopies(Math.max(2, Math.ceil(cadre / piste) + 1));
    };

    // Le ResizeObserver appelle son rappel une première fois tout seul :
    // la mesure initiale part de là (règle react-hooks/set-state-in-effect).
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(rail);
    return () => ro.disconnect();
  }, []);

  // La carte la plus proche du milieu du cadre s'ouvre ; les autres se
  // replient. C'est ce que fait la vidéo de référence.
  //
  // Une boucle rAF, et PAS un IntersectionObserver pour savoir si la
  // section est à l'écran : la sortie anticipée se lit très bien sur le
  // rectangle du cadre, qu'il faut lire de toute façon. Un observateur de
  // plus, c'est une pièce mobile de plus pour la même information.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    // Relevée une fois : la liste ne change qu'avec `copies`, qui relance
    // cet effet. L'interroger à chaque image coûtait une recherche dans le
    // DOM soixante fois par seconde, pour un résultat identique.
    const cartes = Array.from(viewport.querySelectorAll<HTMLElement>("li"));
    let ouverte: HTMLElement | null = null;
    // Carte sous le curseur. Elle prend le pas sur celle du milieu tant
    // que la souris est dessus ; dès qu'elle en sort, la boucle rend la
    // main à la règle normale, sans rien avoir à défaire.
    let survolee: HTMLElement | null = null;

    const entre = (e: PointerEvent) => {
      survolee = (e.target as HTMLElement).closest("li");
    };
    const sort = (e: PointerEvent) => {
      const vers = e.relatedTarget as Node | null;
      if (!vers || !viewport.contains(vers)) survolee = null;
      else survolee = (vers as HTMLElement).closest?.("li") ?? null;
    };
    viewport.addEventListener("pointerover", entre);
    viewport.addEventListener("pointerout", sort);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const cadre = viewport.getBoundingClientRect();

      // Section hors de l'écran : on s'arrête là. Une lecture de
      // rectangle par image, c'est le prix déjà payé par le reste du site
      // (cf. useScrollProgress).
      if (cadre.bottom < 0 || cadre.top > innerHeight) {
        if (ouverte) {
          ouverte.removeAttribute("data-open");
          ouverte = null;
        }
        return;
      }

      const milieu = cadre.left + cadre.width / 2;

      let meilleure: HTMLElement | null = null;
      let ecart = Infinity;
      for (const c of cartes) {
        const b = c.getBoundingClientRect();
        // Hors cadre : jamais candidate, sinon une carte d'une copie
        // voisine, invisible, volerait l'ouverture à celle du milieu.
        if (b.right < cadre.left || b.left > cadre.right) continue;
        const d = Math.abs(b.left + b.width / 2 - milieu);
        if (d < ecart) {
          ecart = d;
          meilleure = c;
        }
      }

      // Le survol l'emporte : c'est un geste explicite, il passe devant
      // la règle du milieu.
      if (survolee) meilleure = survolee;

      if (meilleure !== ouverte) {
        ouverte?.removeAttribute("data-open");
        meilleure?.setAttribute("data-open", "true");
        ouverte = meilleure;
      }
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      viewport.removeEventListener("pointerover", entre);
      viewport.removeEventListener("pointerout", sort);
      ouverte?.removeAttribute("data-open");
    };
  }, [copies]);

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
    /* Un seul arrêt déclaré (cf. SectionSnap) : « start », quand la scène
       a fini de glisser sur les logos. Le maintien, lui, ne vient plus du
       calage mais de l'épinglage ci-dessous — un point de calage posait le
       scroll au bon endroit, rien ne l'y retenait. */
    <section className={styles.track} data-snap="start">
      {/* La scène s'ÉPINGLE dès qu'elle recouvre l'écran et reste immobile
          le temps du palier, puis la page reprend son cours. En colonne
          flex : le bandeau du titre et celui du bas gardent leur taille,
          c'est la rangée d'avis qui absorbe le reste — la scène fait donc
          exactement un écran, sur n'importe quelle hauteur. */}
      <div className={styles.stage}>
        <BackdropLines arc />

        <div className={styles.head}>
          <h2 className={`${styles.title} ${titre.h2}`}>Au plus près de vous&nbsp;!</h2>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.lede}>
            Villas, régies immobilières et immeubles d’entreprises : nous
            intervenons dans toute la Suisse romande, de la première visite
            au contrat d’entretien.
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

        <div ref={viewportRef} className={styles.viewport}>
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
              {/* Pas de signature fournie : on n'affiche pas de ligne
                  vide, et surtout pas un nom inventé. */}
              {(PULL_QUOTE.author || PULL_QUOTE.role) && (
                <figcaption className={styles.quoteBy}>
                  {PULL_QUOTE.role && (
                    <span className={styles.quoteRole}>{PULL_QUOTE.role}</span>
                  )}
                  {PULL_QUOTE.author && (
                    <span className={styles.quoteAuthor}>
                      {PULL_QUOTE.author}
                    </span>
                  )}
                </figcaption>
              )}
            </figure>
          ) : (
            <figure className={`${styles.quote} ${styles.quoteEmpty}`}>
              <blockquote className={styles.quoteText}>
                “La phrase qui restera en tête.”
              </blockquote>
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
