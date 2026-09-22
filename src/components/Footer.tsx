import Image from "next/image";
import { GoogleReviews } from "./GoogleReviews";
import { getContactContent } from "@/lib/cms";
import { PAGES } from "@/lib/pages";
import styles from "./Footer.module.css";

/**
 * Footer — calqué sur celui de likova.space (mesuré dans le DOM).
 *
 * Bloc navy compact (pas pleine hauteur). En haut : le mot-marque seul —
 * le bouton « Contact » a été retiré (demandé). C'était le SEUL point
 * WhatsApp du site, il n'en reste aucun. Au centre-droit :
 * les horaires. En bas : ligne de mentions (© / confidentialité / agence)
 * puis un fin disclaimer pleine largeur.
 *
 * Contenus provisoires (horaires, disclaimer) — à remplacer.
 *
 * Le bord haut est DÉCOUPÉ (un retrait sur toute la largeur, une encoche
 * plus profonde dans le coin droit). Ce qui apparaît dans ces découpes,
 * c'est ce qu'il y a DERRIÈRE le footer — et c'était le fond de page,
 * presque noir, d'où la bande noire au-dessus du footer sur toutes les
 * pages intérieures. D'où l'enveloppe `.shell`, qui porte la couleur du
 * bloc précédent : claire par défaut, navy quand le bloc d'au-dessus l'est
 * (formulaire de devis, section contact des pages de service).
 *
 * `overlap` : remonte le footer de la profondeur de son encoche, pour que
 * la section précédente apparaisse dans les zones découpées. Réservé à
 * l'accueil ; ailleurs il mordrait sur les textes du bas de PageIntro.
 */
/* Liens du pied de page : l'accueil, puis les pages de premier niveau
   lues dans PAGES — la même source que le menu et la transition, donc une
   page ajoutée là apparaît ici sans rien toucher. Pour le référencement,
   c'est aussi un maillage interne présent sur CHAQUE page. */
const LIENS = [
  { href: "/", label: "Accueil" },
  ...PAGES.map((p) => ({ href: p.href, label: p.title })),
];

export async function Footer({
  overlap = false,
  above = "light",
}: {
  overlap?: boolean;
  /** Couleur du bloc qui précède le footer. Elle remplit les découpes de
   *  son bord haut — sans elle, c'est le fond de page (presque noir) qui
   *  y apparaissait. */
  above?: "light" | "navy";
}) {
  const { street, city, hoursDays, hoursTime, hoursClosed } = await getContactContent();
  return (
    <div
      className={`${styles.shell} ${above === "navy" ? styles.shellNavy : ""} ${
        overlap ? styles.overlap : ""
      }`}
    >
      <footer className={styles.footer}>
      <div className={styles.top}>
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

      {/* Horaires relevées sur la fiche Google (cf. src/lib/contact.ts, valeurs
          par défaut) : l'heure d'ouverture affichée jusqu'ici, 07 h 30, était
          fausse. Modifiable depuis l'espace client (src/lib/cms.ts) — chaque
          information dans son propre <span> pour l'aperçu en direct. */}
      <address className={styles.hours}>
        <span data-cms="contact.street">{street}</span>
        <br />
        <span data-cms="contact.city">{city}</span>
        <br />
        <br />
        <span data-cms="contact.hoursDays">{hoursDays}</span>, <span data-cms="contact.hoursTime">{hoursTime}</span>
        <br />
        <span data-cms="contact.hoursClosed">{hoursClosed}</span>
      </address>

      {/* Pages principales du site (demandé). */}
      <nav className={styles.pages} aria-label="Pages du site">
        <ul>
          {LIENS.map((l) => (
            <li key={l.href}>
              <a href={l.href} data-page-transition>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.meta}>
        <span>© 2026. MBA Sanit</span>
        <a href="#privacy">Politique de confidentialité</a>
        <a href="#mentions-legales">Mentions légales</a>
        <a
          className={styles.agency}
          href="https://www.atelierwebromand.ch"
          target="_blank"
          rel="noreferrer"
        >
          Site réalisé avec soin par l’Atelier Web Romand
        </a>
      </div>

      <p className={styles.footnote}>
        MBA Sanit, installateur sanitaire et chauffagiste à Genève :
        installation et rénovation de salles de bain, chauffage et pompes à
        chaleur, douches et aménagements extérieurs, entretien et dépannage,
        pour les particuliers, les régies immobilières et les entreprises de
        Genève et de Suisse romande.
      </p>
      </footer>
    </div>
  );
}
