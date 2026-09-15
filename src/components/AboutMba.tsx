"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { EQUIPE, VALEURS } from "@/lib/pages";
import { BackdropLines } from "./BackdropLines";
import chip from "./Chip.module.css";
import styles from "./AboutMba.module.css";

/** Les trois pictogrammes des cartes, dans l'ordre de VALEURS : la durée,
 *  l'élan, le détail. Tracés au filet comme le reste des icônes du site. */
const ICONES = [
  // 20 ans : un cadran
  <>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M12 7.6V12l3 1.9" strokeLinecap="round" />
  </>,
  // rapidité : une flèche lancée
  <>
    <path d="M4 12h12" strokeLinecap="round" />
    <path d="m12.5 7.8 4.2 4.2-4.2 4.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19.4 8.6v6.8" strokeLinecap="round" />
  </>,
  // satisfaction : une coche
  <>
    <circle cx="12" cy="12" r="8.2" />
    <path d="m8.4 12.2 2.5 2.5 4.7-5" strokeLinecap="round" strokeLinejoin="round" />
  </>,
];

/**
 * « À propos » de la page équipe — d'après « layout about MBA .png » :
 * un bandeau de principes (petite étiquette, grand titre, trois cartes),
 * puis la présentation de l'équipe (même étiquette, même titre, portraits).
 *
 * La hero de la page n'est pas touchée : ce bloc vient dessous.
 *
 * Écart assumé avec la référence : elle arrondit fortement ses cartes ;
 * ici on garde le rectangle à 2 px de la charte, comme tous les autres
 * blocs du site. C'est la STRUCTURE qui est reprise, pas le style de la
 * maquette d'origine.
 *
 * ANIMATION. Le bandeau des principes s'épingle : les trois cartes
 * montent par le bas l'une après l'autre, puis la scène reste immobile le
 * temps que la section équipe vienne la recouvrir. Tout dérive de --p,
 * cf. le module CSS pour les bornes.
 */
export function AboutMba() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // span 1 : --p court sur tout l'épinglage. Les cartes occupent son
  // premier tiers (cf. le module CSS) ; les deux tiers restants sont le
  // palier pendant lequel la section équipe monte par-dessus.
  useScrollProgress(trackRef, stageRef);

  return (
    <>
      <section ref={trackRef} className={styles.track}>
        <div ref={stageRef} className={styles.stage}>
        <BackdropLines />

        <p className={chip.chip}>Nos principes</p>
        <h2 className={styles.title}>
          Vingt ans à poser, réparer et entretenir des installations en Suisse
          romande. <span className={styles.soft}>Le haut de gamme, les
          finitions, et le suivi dans la durée.</span>
        </h2>

        <ul className={styles.cards}>
          {VALEURS.map((v, i) => (
            /* --i : le rang de la carte. C'est lui qui décale son entrée,
               une après l'autre — une seule règle CSS pour les trois. */
            <li
              key={v.title}
              className={styles.card}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={styles.badge} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {ICONES[i]}
                </svg>
              </span>
              <h3 className={styles.cardTitle}>{v.title}</h3>
              <p className={styles.cardBody}>{v.body}</p>
            </li>
          ))}
        </ul>
        </div>
      </section>

      <section className={`${styles.wrap} ${styles.team}`}>
        <p className={chip.chip}>Notre équipe</p>
        <h2 className={styles.title}>
          Les mêmes visages du premier relevé à la réception du chantier.{" "}
          <span className={styles.soft}>C’est ce qui fait qu’on connaît vos
          installations.</span>
        </h2>

        <ul className={styles.people}>
          {EQUIPE.map((p) => (
            <li key={p.photo} className={styles.person}>
              <div className={styles.portrait}>
                {/* alt vide : décoratif tant qu'on n'a pas les noms — une
                    description inventée ne dirait rien de vrai. */}
                <Image
                  src={p.photo}
                  alt={p.nom ?? ""}
                  fill
                  sizes="(max-width: 900px) 46vw, 30vw"
                />
              </div>
              {p.nom && (
                <p className={styles.personName}>
                  {p.nom}
                  {p.role && <span className={styles.personRole}>{p.role}</span>}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
