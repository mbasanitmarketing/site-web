"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PARTNERS, PARTNER_SLOTS } from "@/lib/pages";
import chip from "./Chip.module.css";
import titre from "./Heading.module.css";
import styles from "./Partners.module.css";

/**
 * Bandeau « nos partenaires », d'après la maquette : un petit repère en
 * capitales à gauche, la grande ligne à droite, puis les logos.
 *
 * Les logos DÉFILENT (marquee), avec un dégradé de flou aux deux bords
 * pour qu'ils n'apparaissent et ne disparaissent pas d'un coup.
 *
 * COMBIEN DE COPIES ? C'est tout le sujet. La piste est rendue plusieurs
 * fois et la translation vaut exactement UNE piste : au moment où elle
 * revient à zéro, la copie suivante occupe la place de la précédente, la
 * boucle est donc invisible. Mais pour qu'il n'y ait jamais de trou, il
 * faut que les copies RESTANTES couvrent encore l'écran quand la
 * translation est à son maximum — autrement dit (copies - 1) pistes
 * doivent être au moins aussi larges que le cadre.
 *
 * Deux copies ne suffisent pas : avec six emplacements la piste fait
 * ~1380 px, moins qu'un écran de 1440 — il restait une bande vide au bord
 * droit à chaque tour (c'est ce qui se voyait). Le compte ne peut pas
 * être écrit en dur : il dépend de la largeur des logos, du nombre de
 * logos et de la taille de l'écran. Il est donc MESURÉ.
 *
 * Tant que MBA n'a pas fourni les fichiers, on montre des emplacements :
 * un logo inventé affirmerait un partenariat qui n'existe peut-être pas.
 */
export function Partners({ headline }: { headline: string }) {
  const items =
    PARTNERS.length > 0
      ? PARTNERS.map((p) => ({ key: p.name, node: <Logo p={p} /> }))
      : Array.from({ length: PARTNER_SLOTS }, (_, i) => ({
          key: `slot-${i}`,
          node: <span className={styles.slot}>Logo</span>,
        }));

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  // 2 au premier rendu (serveur comme client : pas d'écart d'hydratation),
  // puis recalculé dès la première mesure.
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const viewport = viewportRef.current;
    const row = rowRef.current;
    if (!viewport || !row) return;

    const measure = () => {
      const piste = row.getBoundingClientRect().width;
      const cadre = viewport.getBoundingClientRect().width;
      if (piste <= 0) return;
      // (copies - 1) pistes doivent couvrir le cadre, et jamais moins de
      // deux copies (il en faut une qui prenne la place de l'autre).
      setCopies(Math.max(2, Math.ceil(cadre / piste) + 1));
    };

    // Le ResizeObserver appelle son rappel une première fois tout seul :
    // la mesure initiale part de là plutôt que du corps de l'effet (règle
    // react-hooks/set-state-in-effect), et les changements de largeur la
    // refont d'eux-mêmes.
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(row);
    return () => ro.disconnect();
  }, []);

  const piste = (i: number) => (
    // Seule la première est lue : les copies ne sont là que pour boucher
    // le cadre, un lecteur d'écran ne doit pas lire la liste n fois.
    <ul
      key={i}
      ref={i === 0 ? rowRef : undefined}
      className={styles.row}
      aria-hidden={i > 0 || undefined}
      aria-label={
        i === 0 && PARTNERS.length === 0 ? "Logos à fournir" : undefined
      }
    >
      {items.map((it) => (
        <li key={it.key} className={styles.item}>
          {it.node}
        </li>
      ))}
    </ul>
  );

  /* ENTRÉE DE LA SECTION.
   *
   * Un observateur d'intersection pose `data-vu` quand la section arrive
   * à l'écran, et le CSS enchaîne trois transitions (repère, grande
   * ligne, bandeau qui s'ouvre). Et PAS une animation liée au scroll
   * (`animation-timeline`) comme ailleurs sur le site : Safari sur iPhone
   * ne la connaît que depuis iOS 26, et sur un téléphone plus ancien il
   * ne se passait alors rien du tout. Les transitions, elles, marchent
   * partout.
   *
   * Une seule fois : on cesse d'observer dès que c'est joué — une entrée
   * qui se rejoue à chaque passage devient un tic. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.dataset.vu = "true";
      return;
    }
    /* On ARME l'animation seulement ici, une fois le script en marche :
       tant que `data-anim` n'est pas posé, le contenu est visible. Sans
       ça, un observateur qui ne se déclencherait jamais (script bloqué,
       navigateur exotique) laisserait la section vide pour toujours. */
    section.dataset.anim = "true";

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        section.dataset.vu = "true";
        io.disconnect();
      },
      // Se déclenche quand un bon quart de la section est entré : pas dès
      // le premier pixel, sinon tout est fini avant d'être lisible.
      { threshold: 0.25 },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.wrap}>
      <div className={styles.grid}>
        <p className={`${styles.label} ${chip.chip} ${chip.onBlue}`}>Nos partenaires</p>
        <h2 className={`${styles.headline} ${titre.h2}`}>{headline}</h2>
      </div>

      {/* Le masque porte le flou des bords ; la piste, le défilement. Deux
          éléments plutôt qu'un : un `mask-image` sur l'élément animé se
          déplacerait avec lui. */}
      <div ref={viewportRef} className={styles.viewport}>
        {/* --copies : la translation vaut 100 % / copies, soit exactement
            une piste. --n : la durée suit le nombre de logos, pour que la
            VITESSE apparente ne change pas quand la piste s'allonge. */}
        <div
          className={styles.marquee}
          style={
            {
              "--copies": copies,
              "--n": items.length,
            } as React.CSSProperties
          }
        >
          {Array.from({ length: copies }, (_, i) => piste(i))}
        </div>
      </div>
    </section>
  );
}

function Logo({ p }: { p: { name: string; logo: string } }) {
  return (
    <Image
      className={styles.logo}
      src={p.logo}
      alt={p.name}
      width={190}
      height={64}
    />
  );
}
