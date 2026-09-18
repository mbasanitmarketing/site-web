"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Realisation } from "@/lib/pages";
import titre from "./Heading.module.css";
import styles from "./RealisationsCarousel.module.css";

/**
 * Carrousel de réalisations en bas de page de service.
 *
 * Défilement horizontal natif avec accroche : le geste tactile marche
 * seul, les flèches ne sont qu'un confort au pointeur. Elles n'existent
 * que si la rangée déborde vraiment — une catégorie d'une seule
 * réalisation n'affiche donc pas de flèches inertes.
 *
 * Chaque vignette montre l'image de la page d'arrivée : la transition la
 * balaie, il ne doit pas y avoir de raccord.
 */
export function RealisationsCarousel({
  title,
  items,
}: {
  title: string;
  items: Realisation[];
}) {
  const railRef = useRef<HTMLUListElement>(null);
  const [overflow, setOverflow] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setOverflow(max > 1);
    setAtStart(rail.scrollLeft <= 1);
    setAtEnd(rail.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    update();
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, items]);

  function page(dir: 1 | -1) {
    const rail = railRef.current;
    if (!rail) return;
    // une « page » = la largeur visible, moins un chevauchement pour
    // qu'on comprenne qu'on continue la même série
    rail.scrollBy({ left: dir * rail.clientWidth * 0.85, behavior: "smooth" });
  }

  if (items.length === 0) return null;

  return (
    /* Piste + scène collante : la scène reste ÉPINGLÉE pendant que la FAQ
       monte par-dessus et la recouvre (cf. le module CSS pour le calcul,
       et Faq.tsx pour la remontée). */
    <section className={styles.track}>
      <div className={styles.stage}>
      <div className={styles.head}>
        <h2 className={`${styles.title} ${titre.h2}`}>{title}</h2>

        {overflow && (
          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => page(-1)}
              disabled={atStart}
              aria-label="Réalisation précédente"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20 12H6M12 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => page(1)}
              disabled={atEnd}
              aria-label="Réalisation suivante"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 12h14M12 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* --n : le nombre réel de projets. Le CSS s'en sert pour ne jamais
          découper la rangée en plus de parts qu'il n'y a d'images. */}
      <ul
        className={styles.rail}
        ref={railRef}
        style={{ "--n": items.length } as React.CSSProperties}
      >
        {items.map((r) => (
          <li key={r.href} className={styles.slide}>
            <a className={styles.card} href={r.href} data-page-transition>
              <span className={styles.media}>
                <Image
                  src={r.image}
                  alt={r.alt ?? ""}
                  fill
                  sizes="(max-width: 720px) 86vw, 46vw"
                />
              </span>
              <span className={styles.name}>{r.title}</span>
              <span className={styles.cue}>Voir le projet</span>
            </a>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}
