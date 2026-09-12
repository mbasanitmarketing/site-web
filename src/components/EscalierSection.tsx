"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { SERVICES } from "@/lib/pages";
import styles from "./EscalierSection.module.css";

/**
 * Section « escalier » (détail des temps dans le .module.css) :
 *
 *   1 le panneau bleu monte du bas et s'arrête à 90% de l'écran ;
 *   2 défilé des 3 images à droite + changement de texte à gauche ;
 *   3 alignement : le panneau finit de monter, décrochement à plat ;
 *     à ce moment-là, la rangée de 3 accordéons apparaît en bas.
 *
 * Contenu : les trois métiers viennent de src/lib/pages.ts ; les
 * accordéons du bas sont encore en lorem, à remplacer.
 */

/**
 * Les trois métiers, lus dans la source unique — le menu et les pages de
 * service lisent la même. L'image est celle du service, donc celle du hero
 * de la page d'arrivée : la transition la balaie sans raccord.
 */
const ITEMS = SERVICES.map((s) => ({
  href: s.href,
  src: s.image,
  alt: s.alt ?? "",
  heading: s.title,
  sub: s.manifesto?.headline ?? s.lede,
}));

const ACCORDIONS: { title: string; body: string }[] = [
  {
    title: "Lorem ipsum",
    body: "Lorem ipsum dolor sit amet consectetur. Leo commodo mi fames sed ut justo.",
  },
  {
    title: "Lorem ipsum",
    body: "Praesent commodo cursus magna vel scelerisque nisl consectetur et rhoncus.",
  },
  {
    title: "Lorem ipsum",
    body: "Vestibulum id ligula porta felis euismod semper. Donec sed odio dui nullam.",
  },
];

export function EscalierSection() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // span 0.63 : --p atteint 1 (panneau aligné) avant la fin de
  // l'épinglage ; le reste est un palier figé. Calé avec .track (voir
  // .module.css) et avec la hero.
  useScrollProgress(trackRef, stageRef, 0.63);

  // Accordéons : un seul ouvert à la fois ; le premier ouvert au chargement.
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) =>
    setOpenIndex((cur) => (cur === i ? null : i));

  return (
    <section ref={trackRef} className={styles.track}>
      <div ref={stageRef} className={styles.stage}>
        {/* le panneau bleu : monte du bas, s'arrête à 90%, puis s'aligne */}
        <div className={styles.panel}>
          <p className={styles.eyebrow}>Services</p>

          {/* texte de gauche */}
          <div className={styles.copy}>
            {ITEMS.map((it) => (
              <div key={it.href} className={styles.copyItem}>
                <p className={styles.heading}>{it.heading}</p>
                <p className={styles.sub}>{it.sub}</p>
                <a className={styles.cta} href={it.href} data-page-transition>
                  Découvrir le service
                </a>
              </div>
            ))}
          </div>

          {/* fenêtre d'images : les slides montent l'une sur l'autre */}
          <div className={styles.viewport}>
            {ITEMS.map((it) => (
              <div key={it.href} className={styles.slide}>
                <Image
                  src={it.src}
                  alt={it.alt}
                  fill
                  sizes="(max-width: 720px) 92vw, 40vw"
                />
              </div>
            ))}
          </div>

          {/* rangée d'accordéons — apparaît quand le panneau est aligné */}
          <div className={styles.accordions}>
            {ACCORDIONS.map((a, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className={styles.accordion}>
                  <button
                    type="button"
                    className={styles.accHead}
                    aria-expanded={isOpen}
                    onClick={() => toggle(i)}
                  >
                    <span className={styles.accIcon} aria-hidden>
                      <svg viewBox="0 0 24 24" width="12" height="12">
                        <path
                          d="M4 12h16"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                        {!isOpen && (
                          <path
                            d="M12 4v16"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                          />
                        )}
                      </svg>
                    </span>
                    <span className={styles.accTitle}>{a.title}</span>
                  </button>
                  <div
                    className={`${styles.accBody} ${
                      isOpen ? styles.accBodyOpen : ""
                    }`}
                  >
                    <p>{a.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
