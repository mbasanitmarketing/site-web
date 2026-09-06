"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useScrollProgress } from "@/lib/useScrollProgress";
import styles from "./EscalierSection.module.css";

/**
 * Section « escalier » (détail des temps dans le .module.css) :
 *
 *   1 le panneau bleu monte du bas et s'arrête à 90% de l'écran ;
 *   2 défilé des 3 images à droite + changement de texte à gauche ;
 *   3 alignement : le panneau finit de monter, décrochement à plat ;
 *     à ce moment-là, la rangée de 3 accordéons apparaît en bas.
 *
 * Contenu : photos client + textes en lorem ipsum, à remplacer.
 */

type Item = {
  src: string;
  alt: string;
  heading: string;
  sub: string;
};

const ITEMS: Item[] = [
  {
    src: "/services-1.jpg",
    alt: "Salle de bain sur mesure, douche à l'italienne et faïence à motifs",
    heading: "Lorem ipsum dolor sit amet consectetur.",
    sub: "Lectus fusce vitae vehicula est amet.",
  },
  {
    src: "/services-2.jpg",
    alt: "Chaufferie : production de chaleur et distribution",
    heading: "Praesent commodo cursus magna vel scelerisque.",
    sub: "Vestibulum id ligula porta felis euismod semper.",
  },
  {
    src: "/services-3.jpg",
    alt: "Salle de bain contemporaine, pierre foncée et WC suspendu",
    heading: "Nullam quis risus eget urna mollis ornare.",
    sub: "Donec id elit non mi porta gravida at eget metus.",
  },
];

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
              <div key={it.src} className={styles.copyItem}>
                <p className={styles.heading}>{it.heading}</p>
                <p className={styles.sub}>{it.sub}</p>
              </div>
            ))}
          </div>

          {/* fenêtre d'images : les slides montent l'une sur l'autre */}
          <div className={styles.viewport}>
            {ITEMS.map((it) => (
              <div key={it.src} className={styles.slide}>
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
