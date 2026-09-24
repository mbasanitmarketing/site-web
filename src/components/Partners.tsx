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
  // Fonction de `i` (le rang de la copie), pas une liste figée : les
  // logos sont maintenant de vrais liens, et seule la première copie doit
  // rester atteignable au clavier (cf. `piste` plus bas — les autres sont
  // dupliquées pour boucher le cadre, `aria-hidden` seul ne les retire
  // pas du parcours Tab dans tous les navigateurs).
  const buildItems = (i: number) =>
    PARTNERS.length > 0
      ? PARTNERS.map((p) => ({
          key: p.name,
          node: <Logo p={p} tabIndex={i > 0 ? -1 : undefined} />,
        }))
      : Array.from({ length: PARTNER_SLOTS }, (_, j) => ({
          key: `slot-${j}`,
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
      {buildItems(i).map((it) => (
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
              "--n":
                PARTNERS.length > 0 ? PARTNERS.length : PARTNER_SLOTS,
            } as React.CSSProperties
          }
        >
          {Array.from({ length: copies }, (_, i) => piste(i))}
        </div>
      </div>
    </section>
  );
}

/**
 * Chaque logo repose sur sa propre pastille : gris effacé, coins adoucis
 * — le traitement standard des bandeaux de partenaires (demandé). Les
 * logos sont en niveaux de gris au repos et retrouvent leur couleur au
 * survol, pour qu'un bandeau de trois marques différentes (Stoppa en
 * rouge/gris, AD Concepts en noir, PJP en bleu/vert) ne jure pas.
 *
 * Chaque pastille est un lien vers le site du partenaire (demandé) : un
 * site externe, donc `target="_blank"` + `rel="noreferrer"`, jamais
 * `data-page-transition` (réservé aux routes internes). Les copies (piste
 * dupliquée pour la boucle du marquee) restent atteignables au clavier —
 * `tabIndex` : -1 sur les copies dupliquées (cf. `buildItems`), pour que
 * Tab ne fasse pas défiler trois fois le même lien avant d'atteindre la
 * section suivante. */
function Logo({
  p,
  tabIndex,
}: {
  p: { name: string; logo: string; url: string };
  tabIndex?: number;
}) {
  return (
    <a
      className={styles.tile}
      href={p.url}
      target="_blank"
      rel="noreferrer"
      tabIndex={tabIndex}
      aria-label={`${p.name} — voir le site (nouvel onglet)`}
    >
      <Image
        className={styles.logo}
        src={p.logo}
        alt={p.name}
        width={190}
        height={64}
      />
    </a>
  );
}
