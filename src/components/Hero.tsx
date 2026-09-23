"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
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
/** Le navigateur sait-il animer sur la position de défilement ? */
const SCROLL_CSS =
  typeof CSS !== "undefined" &&
  CSS.supports?.("animation-timeline: view()") === true;

/**
 * Photo de la hero, en deux versions : paysage sur ordinateur, portrait
 * sur téléphone (les cadrages larges y étaient inexploitables).
 *
 * `getImageProps` + `<picture>` : c'est la marche à suivre de cette
 * version de Next pour l'art direction (cf. la doc du composant Image,
 * section « Art direction »). Le navigateur ne télécharge QUE la version
 * retenue — deux <Image> dont on cacherait l'une en CSS les chargeraient
 * toutes les deux.
 */
function Photo({ bureau, telephone }: { bureau: string; telephone: string }) {
  const commun = { alt: "", fill: true, priority: true, sizes: "120vw" };
  const {
    props: { srcSet: srcBureau },
  } = getImageProps({ ...commun, src: bureau });
  const {
    props: { srcSet: srcTelephone, ...reste },
  } = getImageProps({ ...commun, src: telephone });

  return (
    <picture>
      {/* Même palier que le reste du site (cf. les media queries à 720). */}
      <source media="(min-width: 721px)" srcSet={srcBureau} />
      <img {...reste} srcSet={srcTelephone} alt="" />
    </picture>
  );
}

type Props = {
  /** Modifiables depuis l'espace client (voir src/lib/cms.ts) ; ce composant
   *  étant côté client (animation au scroll), le contenu lui arrive en props
   *  plutôt que d'être lu ici directement. */
  title?: string;
  subtitle?: string;
  cta?: string;
};

export function Hero({
  title = "Installations sanitaires",
  subtitle = "& salles de bain en Suisse romande",
  cta = "Demander un devis",
}: Props) {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // 0.36 : l'animation aboutit tôt (~160vh) ; la hero reste ensuite
  // épinglée et FIGÉE pendant que la section escalier monte par-dessus et
  // s'aligne. Calé avec .track de EscalierSection (voir son .module.css).
  // `false` là où le navigateur sait animer sur le scroll : c'est alors
  // le CSS qui écrit `--p` (cf. Hero.module.css), sans passer par le fil
  // principal. La boucle JS reste le repli des navigateurs plus anciens.
  // Sur téléphone la course est divisée par deux (cf. Hero.module.css,
  // « TÉLÉPHONE »). Lu au montage : la valeur ne sert qu'au repli JS.
  const span =
    typeof window !== "undefined" && matchMedia("(max-width: 720px)").matches
      ? 0.18
      : 0.36;
  useScrollProgress(trackRef, stageRef, span, !SCROLL_CSS);

  return (
    /* data-hero-track : SiteLogo s'en sert pour savoir quand la hero est
       passée et prendre le relais de SON logo (cf. SiteLogo.tsx). */
    <section ref={trackRef} className={styles.track} data-hero-track>
      <div ref={stageRef} className={styles.stage}>
        {/* Photos */}
        <div className={styles.media}>
          <Photo bureau="/hero-dark.jpg" telephone="/hero-dark-mobile.jpg" />
          <div className={styles.light}>
            <Photo
              bureau="/hero-light.jpg"
              telephone="/hero-light-mobile.jpg"
            />
          </div>
        </div>

        <div className={styles.scrim} />
        <div className={styles.veil} />

        {/* Header : le logo seul (plus de bandeau — la nav est le menu
            burger global, cf. SiteMenu). */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <Logo />
          </div>
        </header>

        {/* Titre */}
        <div
          className={`${styles.headline} absolute z-10 w-[82vw] text-right md:w-[46vw] lg:w-[42vw]`}
        >
          <h1 className="text-[1.35rem] font-semibold uppercase leading-[1.14] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.55)] md:text-[2.2vw] lg:text-[clamp(1.6rem,2vw,2.6rem)]">
            <span data-cms="hero.title">{title}</span>{" "}
            <span className={styles.sub} data-cms="hero.subtitle">
              {subtitle}
            </span>
          </h1>
        </div>

        {/* Trait titre -> CTA : se trace au scroll, monte avec le groupe */}
        <span className={styles.trait} aria-hidden="true" />

        {/* CTA — apparaît en fondu au scroll et suit la montée du titre */}
        <a className={styles.cta} href="/devis" data-page-transition data-cms="hero.cta">
          {cta}
        </a>

        {/* Indice de scroll — le trait seul, sans le mot (retiré). Purement
            décoratif : aria-hidden, il n'y a plus rien à lire. */}
        <div
          aria-hidden="true"
          className={`${styles.hint} absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center`}
        >
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
    <Link href="/" aria-label="MBA Sanit — accueil">
      <Image
        src="/logo-mba.png"
        alt="MBA Sanit"
        width={600}
        height={221}
        priority
      />
    </Link>
  );
}
