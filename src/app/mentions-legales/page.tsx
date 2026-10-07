import { Footer } from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";
import { getContactContent } from "@/lib/cms";
import titre from "@/components/Heading.module.css";
import styles from "./page.module.css";

export const metadata = pageMetadata("/mentions-legales");

/* Pas d'ouverture photo (PageIntro) : une page de texte, qui arrive
   directement en haut. Les coordonnées viennent de la même source que le
   pied de page, donc elles ne peuvent pas diverger. */
export default async function Page() {
  const { street, city, phoneLabel, phoneHref, email } = await getContactContent();

  return (
    <>
      <main className={styles.page}>
        <h1 className={`${styles.title} ${titre.h2}`}>Mentions légales</h1>

        <section className={styles.block}>
          <h2>Éditeur du site</h2>
          <p>
            MBA Sanit SARL
            <br />
            {street}
            <br />
            {city}, Suisse
          </p>
          <p>
            Téléphone : <a href={phoneHref}>{phoneLabel}</a>
            <br />
            E-mail : <a href={`mailto:${email}`}>{email}</a>
          </p>
        </section>

        <section className={styles.block}>
          <h2>Conception et réalisation</h2>
          <p>
            Site conçu et réalisé par l’
            <a href="https://www.atelierwebromand.ch" target="_blank" rel="noreferrer">
              Atelier Web Romand
            </a>
            .
          </p>
        </section>

        <section className={styles.block}>
          <h2>Hébergement</h2>
          <p>
            Vercel Inc.
            <br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
            <br />
            <a href="https://vercel.com" target="_blank" rel="noreferrer">
              vercel.com
            </a>
          </p>
        </section>

        <section className={styles.block}>
          <h2>Propriété intellectuelle</h2>
          <p>
            Les textes, photographies, logos et éléments graphiques de ce site
            sont la propriété de MBA Sanit ou utilisés avec l’accord de leurs
            titulaires. Toute reproduction, représentation ou réutilisation,
            totale ou partielle, sans autorisation écrite préalable, est
            interdite. Les logos des entreprises partenaires restent la
            propriété de leurs détenteurs respectifs.
          </p>
        </section>

        <section className={styles.block} id="donnees">
          <h2>Protection des données</h2>
          <p>
            Les informations que vous nous transmettez par le formulaire de
            devis, par téléphone ou par e-mail (nom, coordonnées, description de
            votre projet) servent uniquement à répondre à votre demande et à
            assurer le suivi de votre dossier. Elles ne sont ni vendues ni
            cédées à des tiers à des fins commerciales.
          </p>
          <p>
            Avec votre accord uniquement, nous utilisons Google Analytics
            (Google LLC, États-Unis) pour mesurer la fréquentation du site :
            pages consultées, durée de visite, provenance approximative. Cet
            outil dépose des cookies sur votre appareil et transmet ces
            données à Google. Aucun cookie de mesure n’est déposé avant votre
            consentement ; vous pouvez le refuser, ou revenir sur votre choix
            à tout moment via « Gérer les cookies » en bas de page. Le détail figure
            dans notre{" "}
            <a href="/confidentialite">politique de confidentialité</a>.
          </p>
          <p>
            Conformément à la loi fédérale sur la protection des données
            (LPD), vous pouvez demander l’accès à vos données, leur
            rectification ou leur suppression en nous écrivant à{" "}
            <a href={`mailto:${email}`}>{email}</a>.
          </p>
        </section>

        <section className={styles.block}>
          <h2>Responsabilité et liens externes</h2>
          <p>
            Nous veillons à l’exactitude des informations publiées, sans
            pouvoir en garantir l’exhaustivité ni l’actualisation permanente.
            Ce site renvoie vers des sites tiers (entreprises partenaires,
            fiche Google) dont nous ne contrôlons pas le contenu et dont nous
            déclinons la responsabilité.
          </p>
        </section>

        <section className={styles.block}>
          <h2>Droit applicable</h2>
          <p>Le présent site et ses mentions légales sont soumis au droit suisse.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
