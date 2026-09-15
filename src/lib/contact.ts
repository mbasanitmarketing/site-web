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

/** Adresse de contact affichée sur le site. */
export const EMAIL = "contact@mbasanit.ch";
