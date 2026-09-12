/**
 * Avis Google de MBA Sanit.
 *
 * RELEVÉS À LA MAIN sur la fiche Google Business Profile le 12/09/2026 :
 *   https://www.google.com/maps/place/MBA+SANIT/
 *
 * Ce ne sont pas des textes inventés — chaque avis ci-dessous est recopié
 * mot à mot depuis la fiche publique. À l'inverse, la note et le nombre
 * d'avis affichés jusqu'ici (4,9 / 127) étaient des valeurs de travail
 * sans rapport avec la réalité : elles sont corrigées ici.
 *
 * Ces valeurs sont FIGÉES dans le code : elles ne se mettront pas à jour
 * toutes seules quand de nouveaux avis arriveront. Pour un rafraîchissement
 * automatique il faudrait brancher l'API Google Places (clé à provisionner
 * par MBA, comme pour l'envoi d'e-mails du devis).
 */

export type Review = {
  /** Nom affiché sur la fiche Google. */
  author: string;
  /** Mention sous le nom, si elle existe (« Local Guide · 23 avis »). */
  meta?: string;
  /** Note sur 5. */
  rating: number;
  /** Date de publication, au format ISO. */
  date: string;
  /** Texte, recopié tel quel. */
  body: string;
};

/** Lien vers la fiche, pour « voir tous les avis ». */
export const REVIEWS_URL =
  "https://www.google.com/maps/place/MBA+SANIT/data=!4m7!3m6!1s0x48f77338128a8b91:0x61ce18c3f660c27b!8m2!3d46.20483!4d6.143039!16s%2Fg%2F11z47smjqp!19sChIJkYuKEjhz90gRe8Jg9sMYzmE";

/** Note moyenne et nombre d'avis, relevés le 12/09/2026. */
export const RATING = 5;
export const COUNT = 1;

export const REVIEWS: Review[] = [
  {
    author: "Rosie Morville",
    meta: "Local Guide · 23 avis",
    rating: 5,
    date: "2026-09-12",
    body: "J’ai eu l’occasion de travailler avec Fred, qui fait preuve d’un professionnalisme dingue ! J’ai rarement été aussi satisfaite, tant au niveau du service que de l’amabilité.",
  },
];
