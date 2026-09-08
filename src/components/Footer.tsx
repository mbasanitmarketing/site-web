import Image from "next/image";
import { GoogleReviews } from "./GoogleReviews";
import styles from "./Footer.module.css";

/**
 * Footer — calqué sur celui de likova.space (mesuré dans le DOM).
 *
 * Bloc navy compact (pas pleine hauteur). En haut : bouton « Contact »
 * (fond blanc, coin bas-droite mordu) puis le mot-marque. Au centre-droit :
 * les horaires. En bas : ligne de mentions (© / confidentialité / agence)
 * puis un fin disclaimer pleine largeur.
 *
 * Contenus provisoires (horaires, disclaimer) — à remplacer.
 */
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <a className={styles.contact} href="#contact">
          Contact
        </a>
        <Image
          className={styles.logo}
          src="/logo-mba.png"
          alt="MBA Sanit"
          width={600}
          height={227}
          sizes="(max-width: 720px) 44vw, 200px"
        />
      </div>

      <GoogleReviews className={styles.reviews} />

      <p className={styles.hours}>
        Ouvert du lundi au vendredi,
        <br />
        07&nbsp;h&nbsp;30 – 17&nbsp;h&nbsp;00
      </p>

      <div className={styles.meta}>
        <span>© 2026. MBA Sanit</span>
        <a href="#privacy">Politique de confidentialité</a>
        <a href="#mentions-legales">Mentions légales</a>
        <span className={styles.agency}>Site par Atelier Web Romand</span>
      </div>

      <p className={styles.footnote}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </footer>
  );
}
