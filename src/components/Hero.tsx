"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScrollProgress } from "@/lib/useScrollProgress";
import styles from "./Hero.module.css";

/**
 * Hero « les lumières s'allument ».
 *
 * Une piste de scroll haute (.track) contient une scène épinglée (.stage).
 * On écrit la progression du scroll (0 -> 1) dans la variable CSS `--p` sur
 * la scène ; toutes les valeurs animées en dérivent dans Hero.module.css.
 * Aucun re-render React : on écrit directement sur le noeud à chaque frame.
 */
export function Hero() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // 0.36 : l'animation aboutit tôt (~160vh) ; la hero reste ensuite
  // épinglée et FIGÉE pendant que la section escalier monte par-dessus et
  // s'aligne. Calé avec .track de EscalierSection (voir son .module.css).
  useScrollProgress(trackRef, stageRef, 0.36);

  return (
    <section ref={trackRef} className={styles.track}>
      <div ref={stageRef} className={styles.stage}>
        {/* Photos */}
        <div className={styles.media}>
          <Image src="/hero-dark.png" alt="" fill priority sizes="120vw" />
          <div className={styles.light}>
            <Image src="/hero-light.jpg" alt="" fill priority sizes="120vw" />
          </div>
        </div>

        <div className={styles.scrim} />
        <div className={styles.veil} />

        {/* Bandeau dépoli : copie floutée des mêmes photos, découpée à la
            hauteur du header et calée sur le fond net. */}
        <div className={styles.band} aria-hidden>
          <div className={styles.bandInner}>
            <div className={styles.media}>
              <Image src="/hero-dark.png" alt="" fill sizes="120vw" />
              <div className={styles.light}>
                <Image src="/hero-light.jpg" alt="" fill sizes="120vw" />
              </div>
            </div>
          </div>
          <div className={styles.bandTint} />
        </div>

        {/* Header : le logo seul, comme sur les maquettes */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <Logo />
          </div>
        </header>

        {/* Titre */}
        <div
          className={`${styles.headline} absolute bottom-[42%] right-[6vw] z-10 w-[82vw] text-right md:right-[10vw] md:w-[46vw] lg:w-[42vw]`}
        >
          <h1 className="text-[1.35rem] font-semibold uppercase leading-[1.14] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.55)] md:text-[2.2vw] lg:text-[clamp(1.6rem,2vw,2.6rem)]">
            Installations sanitaires{" "}
            <span className={styles.sub}>
              &amp; salles de bain en Suisse romande
            </span>
          </h1>
        </div>

        {/* Indice de scroll */}
        <div
          className={`${styles.hint} absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/70`}
        >
          <span>Scroll</span>
          <span className="block h-8 w-px bg-linear-to-b from-white/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/**
 * Logo officiel, détouré du JPEG fourni (fond blanc retiré par clé
 * couleur + désaturation du liseré, cf. public/logo-mba.png).
 */
function Logo() {
  return (
    <Image
      src="/logo-mba.png"
      alt="MBA Sanit"
      width={600}
      height={221}
      priority
    />
  );
}
