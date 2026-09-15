import Image from "next/image";
import { PHONE_HREF } from "@/lib/contact";
import styles from "./ServiceContact.module.css";

/**
 * Contact — d'après « Contact-section-mba.png » : fond navy, deux filets
 * verticaux laiton, un panneau bleu clair à gauche et une photo encadrée
 * à droite qui se chevauchent.
 *
 * L'enveloppe renvoie au FORMULAIRE, pas à un `mailto:`. L'adresse de
 * contact est gardée côté serveur (cf. src/app/api/devis/route.ts) : la
 * poser en clair dans le HTML la ferait moissonner par les robots.
 */
export function ServiceContact() {
  return (
    <section className={styles.wrap}>
      <div className={styles.rules} aria-hidden="true" />

      <div className={styles.grid}>
        <div className={styles.panel}>
          <h2 className={styles.title}>Parlons de votre projet&nbsp;!</h2>
          <p className={styles.body}>
            Nous nous tenons à disposition du lundi au vendredi pour vous
            répondre en moins de 2&nbsp;h par e-mail.
          </p>

          <div className={styles.actions}>
            <a
              className={`${styles.button} ${styles.iconButton}`}
              href="/devis"
              data-page-transition
              aria-label="Nous écrire — aller au formulaire"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M3 6.5h18v11H3z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="m3.6 7 8.4 6 8.4-6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a className={styles.button} href={PHONE_HREF}>
              Appeler l’équipe
            </a>
          </div>
        </div>

        <div className={styles.media}>
          <div className={styles.frame}>
            <Image
              src="/realisation-chaufferie.jpg"
              alt="Chaufferie installée par MBA Sanit"
              fill
              sizes="(max-width: 900px) 100vw, 47vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
