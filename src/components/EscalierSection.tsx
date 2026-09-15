"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { DESCRIPTIONS, SERVICES, VALEURS } from "@/lib/pages";
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
 * accordéons du bas portent la réassurance (texte MBA).
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
  sub: DESCRIPTIONS[s.href] ?? s.manifesto?.headline ?? s.lede,
}));

/* Réassurance : écrite une seule fois, cf. VALEURS dans pages.ts. */
const ACCORDIONS = VALEURS;

export function EscalierSection() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // span 0.443 : --p atteint 1 (panneau aligné) avant la fin de
  // l'épinglage ; le reste est un palier figé, pendant lequel les
  // accordéons s'ouvrent. Calé avec .track (voir .module.css) et avec la
  // hero. 0.443 x 540vh donne la même montée que 0.63 x 380vh : la piste
  // s'est allongée, la montée non.
  useScrollProgress(trackRef, stageRef, 0.443);

  // Accordéons : un seul ouvert à la fois ; le premier ouvert au chargement.
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) =>
    setOpenIndex((cur) => (cur === i ? null : i));

  /* Ouverture AU SCROLL, pas seulement au clic.
   *
   * La scène reste épinglée après que le panneau s'est aligné (--p atteint
   * 1 à 63 % du trajet, cf. le span ci-dessus) : il reste ensuite 37 % de
   * palier, la scène immobile. C'est ce palier qu'on occupe — les trois
   * accordéons s'ouvrent l'un après l'autre, puis la page reprend.
   *
   * On recalcule ici la progression sur le trajet ENTIER, sans le span :
   * `useScrollProgress` bloque son --p à 1 dès 63 %, il ne dirait plus
   * rien de ce qui se passe pendant le palier.
   *
   *   0 -> 0.443   le panneau monte et s'aligne (rien à faire ici)
   *   0.46 -> 0.72   les trois accordéons, un tiers de la plage chacun
   *   0.72 -> 1      un temps mort, le troisième ouvert, avant la suite
   *
   * La borne haute compte autant que la basse : le rideau blanc du
   * carrousel commence à recouvrir cette scène bien avant la fin de la
   * piste. Passé ce point, un accordéon qui s'ouvre s'ouvre DERRIÈRE le
   * rideau — c'est ce qui se passait, et ça donnait l'impression que
   * rien ne marchait. La phase doit finir avant.
   *
   * Le clic continue de marcher : il pose l'index tout de suite, et le
   * scroll suivant reprend la main. Mouvement réduit : rien de tout ça,
   * le clic seul.
   */
  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const DEBUT = 0.46;
    const FIN = 0.72;

    let raf = 0;
    // Mesurée au redimensionnement seulement : une lecture de hauteur par
    // image forcerait un recalcul de mise en page (cf. useScrollProgress).
    let travel = track.offsetHeight - stage.offsetHeight;

    const frame = () => {
      raf = 0;
      if (travel <= 0) return;
      const p = -track.getBoundingClientRect().top / travel;
      if (p < DEBUT) return;
      const t = Math.min(1, (p - DEBUT) / (FIN - DEBUT));
      const i = Math.min(2, Math.floor(t * 3));
      setOpenIndex((cur) => (cur === i ? cur : i));
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onResize = () => {
      travel = track.offsetHeight - stage.offsetHeight;
      schedule();
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    schedule();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={trackRef} className={styles.track}>
      <div ref={stageRef} className={styles.stage}>
        {/* le panneau bleu : monte du bas, s'arrête à 90%, puis s'aligne */}
        <div className={styles.panel}>
          {/* Un vrai titre de section, pas un <p> stylé : c'est le seul
              niveau de plan entre le H1 de la hero et les noms de service
              en dessous. Rien ne change à l'écran. */}
          <h2 className={styles.eyebrow}>Services</h2>

          {/* texte de gauche */}
          <div className={styles.copy}>
            {ITEMS.map((it) => (
              <div key={it.href} className={styles.copyItem}>
                {/* h3 : chaque service est une subdivision de la section
                    ci-dessus, et c'est le libellé qui décrit la page vers
                    laquelle le bouton mène. */}
                <h3 className={styles.heading}>{it.heading}</h3>
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
