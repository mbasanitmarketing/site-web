import Image from "next/image";
import type { PageContent } from "@/lib/pages";
import styles from "./PageIntro.module.css";

/**
 * Gabarit des pages intérieures — d'après la vidéo « Animation nouvelle
 * page site MBA ».
 *
 * Image plein cadre ; en bas à gauche le nom repris du lien cliqué, puis
 * un paragraphe et un petit lien en capitales ; en bas à droite une petite
 * ligne en capitales et une grande ligne.
 *
 * Le titre n'a PAS d'animation d'entrée : le calque de transition l'a déjà
 * fait apparaître au même endroit, il doit être en place au raccord. Le
 * reste arrive en décalé.
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
  return (
    <section
      className={`${styles.intro} ${titleOnly ? styles.titleOnly : ""}`}
    >
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
