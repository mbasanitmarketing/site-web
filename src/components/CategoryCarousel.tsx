"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Realisation } from "@/lib/pages";
import { BackdropLines } from "./BackdropLines";
import styles from "./CategoryCarousel.module.css";

/** Vitesse de dérive, en px/s : celle des avis, à l'œil. */
const VITESSE = 42;
/** Rapidité avec laquelle un coup de flèche est absorbé (1/s). */
const RAIDEUR = 5;

function Fleche({ sens }: { sens: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={sens === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Page de catégorie : les réalisations sur UNE rangée qui défile seule,
 * comme les avis de l'accueil, avec deux flèches pour aller plus vite.
 *
 * Le défilement est piloté en JS et non par une animation CSS : c'est ce
 * qui permet à une flèche d'ajouter une carte d'avance en douceur, sans
 * saut, pendant que la dérive continue. Chaque clic s'ajoute à une
 * distance « en attente », absorbée image par image avec un amorti
 * exponentiel — plusieurs clics rapides s'additionnent.
 *
 * Même principe de boucle que les avis : la piste est rendue autant de
 * fois qu'il faut pour couvrir le cadre, et le décalage est ramené modulo
 * la largeur d'UNE piste — le raccord ne se voit pas.
 */
export function CategoryCarousel({ items }: { items: Realisation[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const attente = useRef(0);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const viewport = viewportRef.current;
    const rail = railRef.current;
    if (!viewport || !rail) return;
    const measure = () => {
      const piste = rail.getBoundingClientRect().width;
      const cadre = viewport.getBoundingClientRect().width;
      if (piste <= 0) return;
      setCopies(Math.max(2, Math.ceil(cadre / piste) + 1));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(rail);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const marquee = marqueeRef.current;
    const rail = railRef.current;
    if (!viewport || !marquee || !rail) return;

    // Sans animation souhaitée : pas de dérive, mais les flèches restent.
    const derive = matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : VITESSE;

    let raf = 0;
    let avant = performance.now();
    let decalage = 0;

    const frame = (maintenant: number) => {
      raf = requestAnimationFrame(frame);
      // Onglet en arrière-plan : rAF s'arrête, on ne rattrape pas l'écart.
      const dt = Math.min((maintenant - avant) / 1000, 0.05);
      avant = maintenant;

      const cadre = viewport.getBoundingClientRect();
      if (cadre.bottom < 0 || cadre.top > innerHeight) return;

      const pas = attente.current * (1 - Math.exp(-RAIDEUR * dt));
      attente.current -= pas;
      decalage += derive * dt + pas;

      const piste = rail.offsetWidth;
      if (piste > 0) decalage = ((decalage % piste) + piste) % piste;
      marquee.style.transform = `translate3d(${-decalage}px,0,0)`;
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [copies]);

  // Une flèche = une carte d'avance (largeur + écart), dans son sens.
  function pousse(sens: 1 | -1) {
    const carte = railRef.current?.querySelector("li");
    if (!carte) return;
    const ecart = parseFloat(getComputedStyle(railRef.current!).columnGap) || 0;
    attente.current += sens * (carte.getBoundingClientRect().width + ecart);
  }

  const piste = (i: number) => (
    <ul
      key={i}
      ref={i === 0 ? railRef : undefined}
      className={styles.rail}
      aria-hidden={i > 0 || undefined}
    >
      {items.map((r) => (
        <li key={r.href} className={styles.card}>
          {/* Les copies ne sont là que pour l'œil : hors du parcours
              clavier, sinon chaque projet serait atteint trois fois. */}
          <a
            className={styles.link}
            href={r.href}
            data-page-transition
            tabIndex={i > 0 ? -1 : undefined}
          >
            <span className={styles.shot}>
              <Image
                src={r.image}
                alt={i > 0 ? "" : (r.alt ?? "")}
                fill
                // Peu de photos, et elles arrivent de côté : le chargement
                // paresseux les laissait grises en entrant dans le cadre.
                loading="eager"
                sizes="(max-width: 720px) 78vw, 30vw"
              />
            </span>
            <span className={styles.meta}>
              <span className={styles.title}>{r.title}</span>
              <span className={styles.lieu}>{r.lieu}</span>
            </span>
            <span className={styles.more}>Voir le projet</span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <section className={styles.wrap} aria-label="Réalisations">
      <BackdropLines arc />

      <div className={styles.stage}>
        <div ref={viewportRef} className={styles.viewport}>
          <div ref={marqueeRef} className={styles.marquee}>
            {Array.from({ length: copies }, (_, i) => piste(i))}
          </div>
        </div>

        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => pousse(-1)}
            aria-label="Réalisation précédente"
          >
            <Fleche sens="prev" />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => pousse(1)}
            aria-label="Réalisation suivante"
          >
            <Fleche sens="next" />
          </button>
        </div>
      </div>

      <div className={styles.cta}>
        <p className={styles.note}>Un projet similaire ? Parlons-en.</p>
        <a className={styles.button} href="/devis" data-page-transition>
          Demander un devis
        </a>
      </div>
    </section>
  );
}
