/**
 * Coordonnées de MBA Sanit — SOURCE UNIQUE.
 *
 * Le numéro était recopié dans quatre fichiers (bouton d'appel, menu,
 * section contact des pages de service, et le bouton du hero) : au
 * premier changement, trois d'entre eux se seraient retrouvés faux. Tout
 * ce qui affiche ou compose un numéro doit passer par ici.
 */

/** Forme affichée, telle qu'on l'écrit en Suisse. */
export const PHONE_LABEL = "+41 78 235 05 78";

/** Forme internationale sans séparateur, pour les liens. */
const PHONE_E164 = "+41782350578";

/** Lien d'appel. */
export const PHONE_HREF = `tel:${PHONE_E164}`;

/** Lien WhatsApp. wa.me veut le numéro sans « + » ni espace. */
export const WHATSAPP_HREF = `https://wa.me/${PHONE_E164.replace("+", "")}`;

/** Adresse e-mail de contact affichée sur le site. */
export const EMAIL = "contact@mbasanit.ch";

/** Adresse postale, fournie par MBA le 22/09/2026. */
export const ADRESSE = {
  rue: "Route de Jussy 35",
  npaVille: "1226 Thônex",
};

/**
 * Horaires d'ouverture.
 *
 * RELEVÉES À LA MAIN sur la fiche Google Business Profile le 15/09/2026,
 * comme la note et les avis (cf. src/lib/reviews.ts) :
 *   lundi à vendredi  07:00 - 17:00
 *   samedi, dimanche  fermé
 *
 * Le site affichait « 07 h 30 – 17 h 00 » : l'heure d'ouverture était
 * fausse. Ces valeurs sont FIGÉES dans le code — si MBA change ses
 * horaires sur Google, il faut repasser ici.
 */
export const HORAIRES = {
  jours: "Du lundi au vendredi",
  heures: "07 h 00 – 17 h 00",
  fermeture: "Samedi et dimanche fermé",
};
