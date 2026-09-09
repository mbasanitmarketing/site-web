import Image from "next/image";
import { CATEGORIES, HERO_BAND, type PageContent } from "@/lib/pages";
import styles from "./PageIntro.module.css";

/**
 * Ouverture des pages intérieures. Deux gabarits :
 *
 * — Photo plein cadre (« Animation nouvelle page site MBA ») : en bas à
 *   gauche le nom repris du lien cliqué, puis un paragraphe et un petit
 *   lien ; en bas à droite une petite ligne et une grande ligne.
 *
 * — Bandeau + bannière (« realisations layout - template.mov »), pour les
 *   pages listées dans HERO_BAND : la photo ne touche pas le haut de la
 *   page. Un bandeau clair la précède, nom à gauche et phrase de rubrique
 *   à droite, au même corps ; la photo suit, pleine largeur.
 *
 * Dans les deux cas le titre n'a PAS d'animation d'entrée sur la vraie
 * page : le calque de transition l'a déjà fait apparaître au même endroit,
 * il doit être en place au raccord. Le gabarit se déduit du href, jamais
 * d'une prop — le calque rend ce même composant, les deux ne peuvent donc
 * pas tomber sur des positions différentes.
 */
export function PageIntro({
  page,
  titleOnly = false,
}: {
  page: PageContent;
  /** Variante utilisée par le calque de transition : seul le titre est
   *  visible, le reste garde sa place (visibility) pour que rien ne bouge
   *  au raccord avec la vraie page. */
  titleOnly?: boolean;
}) {
  const only = titleOnly ? styles.titleOnly : "";

  if (HERO_BAND.has(page.href)) {
    return (
      <section className={`${styles.intro} ${styles.band} ${only}`}>
        {/* Onglets de catégorie. De VRAIS liens vers les trois URL, pas un
            état de composant : chaque catégorie garde sa page indexable,
            son titre et son H1, et les trois se maillent entre elles.
            Comme le reste, la liste vient du href — le calque de
            transition rend ce composant et doit tomber au même endroit. */}
        <nav className={styles.bandTabs} aria-label="Catégories de réalisations">
          <ul className={styles.tabList}>
            {CATEGORIES.map((c) => (
              <li key={c.href}>
                <a
                  className={styles.tab}
                  href={c.href}
                  aria-current={c.href === page.href ? "page" : undefined}
                  data-page-transition
                >
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.bandText}>
          <h1 className={styles.bandTitle}>{page.title}</h1>
          {page.headline && (
            <p className={styles.bandHeadline}>{page.headline}</p>
          )}
        </div>
        <div className={styles.banner}>
          <Image
            className={styles.image}
            src={page.image}
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.intro} ${only}`}>
      <Image
        className={styles.image}
        src={page.image}
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <div className={styles.scrim} />

      <div className={styles.left}>
        <h1 className={styles.title}>{page.title}</h1>
        <p className={styles.lede}>{page.lede}</p>
        <span className={styles.cue}>{page.cue}</span>
      </div>

      <div className={styles.right}>
        <p className={styles.kicker}>{page.kicker}</p>
        <p className={styles.display}>{page.display}</p>
      </div>
    </section>
  );
}
