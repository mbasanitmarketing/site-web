"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useLenis } from "lenis/react";
import { slugOf, type PageContent, type Realisation } from "@/lib/pages";
import styles from "./CategoryIndex.module.css";

/** Ancre d'une réalisation. Préfixée : un id ne doit pas percuter une route. */
const anchorOf = (r: Realisation) => `r-${slugOf(r.href)}`;

/**
 * L'image de tête d'une section est TOUJOURS celle de la page d'arrivée :
 * la transition la balaie, il ne doit pas y avoir de raccord. Si la
 * galerie propose une autre vue, on la met à côté — c'est le rythme à
 * deux images de la référence.
 */
function shotsOf(r: Realisation) {
  const lead = { src: r.image, alt: r.alt ?? "" };
  const second = r.gallery.find((g) => g.src !== r.image);
  return second ? [lead, second] : [lead];
}

/**
 * Page de catégorie — d'après « realisations layout - template.mov ».
 *
 * À gauche un index collant des réalisations de la catégorie, qui suit la
 * lecture ; à droite la pile des réalisations, séparées par un filet.
 */
export function CategoryIndex({
  category,
  items,
}: {
  category: PageContent;
  items: Realisation[];
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(() =>
    items[0] ? anchorOf(items[0]) : "",
  );
  const lenis = useLenis();

  // Quelle réalisation est en cours de lecture ? Celle qui croise une
  // bande étroite au tiers haut de l'écran — pas le simple « en vue »,
  // qui allumerait deux entrées à la fois.
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const sections = Array.from(
      root.querySelectorAll<HTMLElement>("section[id]"),
    );
    if (sections.length === 0) return;

    const seen = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) seen.add(e.target);
          else seen.delete(e.target);
        }
        // plusieurs sections dans la bande : la première l'emporte
        const first = sections.find((s) => seen.has(s));
        if (first) setActive(first.id);
      },
      { rootMargin: "-28% 0px -62% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  // Le décalage vient du CSS (scroll-margin-top) : une seule source, donc
  // l'ancre ne peut pas se désynchroniser de la position collante.
  function jump(e: MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    if (lenis) lenis.scrollTo(el, { offset: -offset });
    else el.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  }

  return (
    <div className={styles.wrap}>
      {/* Bandeau d'intro : label à gauche, phrase à droite (cf. référence,
          où les deux sont au même corps). */}
      <div className={styles.intro}>
        <p className={styles.introLabel}>{category.title}</p>
        {category.headline && (
          <h2 className={styles.introHeadline}>{category.headline}</h2>
        )}
      </div>
      <div className={styles.introRule} aria-hidden="true" />

      <div className={styles.columns}>
        <aside className={styles.aside}>
          <nav aria-label={`Réalisations — ${category.title}`}>
            <ul className={styles.navList}>
              {items.map((r) => {
                const id = anchorOf(r);
                return (
                  <li key={r.href}>
                    <a
                      className={styles.navLink}
                      href={`#${id}`}
                      aria-current={active === id ? "true" : undefined}
                      onClick={(e) => jump(e, id)}
                    >
                      {r.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div>
            <p className={styles.asideNote}>
              Un projet similaire ?
              <br />
              Parlons-en.
            </p>
            <a className={styles.asideCta} href="/devis" data-page-transition>
              Demander un devis
              <span className={styles.asideArrow} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H8M17 7v9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </div>
        </aside>

        <div className={styles.content} ref={contentRef}>
          {items.map((r, i) => {
            const shots = shotsOf(r);
            const pair = shots.length > 1;
            return (
              <section key={r.href} id={anchorOf(r)} className={styles.section}>
                <h3 className={styles.sectionTitle}>{r.title}</h3>

                <div className={pair ? styles.pair : styles.single}>
                  {shots.map((s) => (
                    <span key={s.src} className={styles.shot}>
                      <Image
                        src={s.src}
                        alt={s.alt}
                        fill
                        sizes={
                          pair
                            ? "(max-width: 900px) 100vw, 26vw"
                            : "(max-width: 900px) 100vw, 52vw"
                        }
                      />
                    </span>
                  ))}
                </div>

                {r.body.map((p, j) => (
                  <p key={j} className={styles.paragraph}>
                    {p}
                  </p>
                ))}

                <a className={styles.more} href={r.href} data-page-transition>
                  Voir le projet
                </a>

                {/* Le filet sépare deux réalisations ; après la dernière,
                    c'est le footer qui prend le relais. */}
                {i < items.length - 1 && (
                  <div className={styles.rule} aria-hidden="true" />
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
