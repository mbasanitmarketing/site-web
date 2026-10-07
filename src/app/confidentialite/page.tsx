import { Footer } from "@/components/Footer";
import { getContactContent } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import titre from "@/components/Heading.module.css";
import styles from "../mentions-legales/page.module.css";

export const metadata = pageMetadata("/confidentialite");

/* Même gabarit que les mentions légales. Le texte décrit ce que fait
   réellement le site : formulaire de devis envoyé par e-mail, mesure
   d'audience Google Analytics UNIQUEMENT après consentement, hébergement
   Vercel. Si l'un de ces éléments change, ce texte doit changer avec. */
export default async function Page() {
  const { street, city, phoneLabel, phoneHref, email } = await getContactContent();

  return (
    <>
      <main className={styles.page}>
        <h1 className={`${styles.title} ${titre.h2}`}>Politique de confidentialité</h1>

        <section className={styles.block}>
          <p>
            Cette page explique quelles données personnelles MBA Sanit traite
            quand vous utilisez ce site ou nous contactez, pourquoi, et comment
            exercer vos droits, conformément à la loi fédérale sur la
            protection des données (LPD). Dernière mise à jour : octobre 2026.
          </p>
        </section>

        <section className={styles.block}>
          <h2>Responsable du traitement</h2>
          <p>
            MBA Sanit SARL
            <br />
            {street}, {city}, Suisse
            <br />
            E-mail : <a href={`mailto:${email}`}>{email}</a>
            <br />
            Téléphone : <a href={phoneHref}>{phoneLabel}</a>
          </p>
        </section>

        <section className={styles.block}>
          <h2>Les données que nous traitons</h2>
          <p>
            <strong>Demande de devis ou de contact.</strong> Si vous remplissez
            le formulaire de devis, nous recevons votre nom, votre adresse
            e-mail, votre numéro de téléphone, le type de projet et votre
            message. Elles servent uniquement à vous répondre, à convenir d’une
            visite et à établir un devis. Le message est envoyé à notre adresse
            e-mail par un prestataire d’envoi d’e-mails (Resend).
          </p>
          <p>
            <strong>Appel, WhatsApp, e-mail.</strong> Si vous nous écrivez ou
            nous appelez, nous conservons les informations que vous nous
            donnez pour traiter votre demande.
          </p>
          <p>
            <strong>Mesure d’audience (uniquement avec votre accord).</strong>{" "}
            Si vous acceptez les cookies, nous utilisons Google Analytics pour
            savoir quelles pages sont consultées, combien de temps, depuis quel
            type d’appareil et d’où (de façon approximative) arrivent les
            visiteurs. Cela nous aide à améliorer le site. Aucune donnée de
            mesure n’est collectée si vous refusez.
          </p>
          <p>
            <strong>Données techniques.</strong> Notre hébergeur (Vercel)
            traite l’adresse IP et les journaux de connexion nécessaires pour
            afficher le site et le protéger.
          </p>
        </section>

        <section className={styles.block}>
          <h2>Cookies et stockage dans votre navigateur</h2>
          <p>
            Nous ne déposons aucun cookie de mesure avant que vous ayez cliqué
            sur « Accepter » dans la bannière. Votre choix est mémorisé dans
            votre navigateur et vous pouvez le modifier à tout moment avec
            « Gérer les cookies » en bas de chaque page. Si vous acceptez,
            Google Analytics dépose des cookies de mesure (dont « _ga »,
            valables jusqu’à deux ans). Si vous refusez ou changez d’avis, la
            mesure s’arrête et ces cookies sont supprimés.
          </p>
        </section>

        <section className={styles.block}>
          <h2>Destinataires et transferts à l’étranger</h2>
          <p>
            Nos prestataires techniques peuvent traiter vos données pour notre
            compte : Vercel Inc. (hébergement), Resend (envoi des e-mails du
            formulaire) et Google (mesure d’audience, avec votre accord). Ces
            prestataires peuvent se trouver aux États-Unis ou ailleurs en
            dehors de la Suisse ; ces transferts reposent sur les garanties
            prévues par la loi (par exemple des clauses contractuelles types
            ou la certification du prestataire au cadre de protection des
            données applicable). Nous ne vendons pas vos données.
          </p>
        </section>

        <section className={styles.block}>
          <h2>Durée de conservation</h2>
          <p>
            Les demandes de devis sont conservées le temps nécessaire à leur
            traitement et au suivi du chantier, puis supprimées ou archivées
            selon nos obligations légales. Les données de mesure d’audience
            sont conservées pour la durée limitée définie dans les réglages
            de Google Analytics.
          </p>
        </section>

        <section className={styles.block}>
          <h2>Vos droits</h2>
          <p>
            Vous pouvez demander l’accès à vos données, leur rectification,
            leur suppression, ou vous opposer à un traitement, et demander à
            les recevoir sous une forme courante. Écrivez-nous à{" "}
            <a href={`mailto:${email}`}>{email}</a> : nous répondons dans les
            30 jours. Vous pouvez aussi vous adresser au Préposé fédéral à la
            protection des données et à la transparence (PFPDT).
          </p>
        </section>

        <section className={styles.block}>
          <h2>Modifications</h2>
          <p>
            Nous pouvons adapter cette politique, par exemple si nous ajoutons
            un outil. La version en vigueur est toujours celle de cette page.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
