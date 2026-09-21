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

/* =====================================================================
   AVIS DE DÉMONSTRATION — À RETIRER AVANT LA MISE EN LIGNE

   Ces avis sont INVENTÉS. Ils ne viennent d'aucun client et d'aucune
   fiche Google. Ils sont là parce que la fiche n'en compte qu'un seul et
   que le carrousel de l'accueil n'a rien à faire défiler avec une carte
   unique — demandé explicitement.

   Publier des témoignages fabriqués sur le site d'une entreprise, c'est
   affirmer des choses fausses sur son travail. C'est acceptable le temps
   de la maquette, pas au-delà.

   POUR LES ÉTEINDRE : passer AVIS_DEMO à false, ci-dessous. Une ligne.
   La section retombe alors sur les avis réels, centrés et immobiles.

   Les noms sont volontairement réduits à un prénom et une initiale : ils
   ne désignent personne.
   ===================================================================== */

export const AVIS_DEMO = true;

const DEMO: Review[] = [
  {
    author: "Sophie M.",
    meta: "Avis de démonstration",
    rating: 5,
    date: "2026-08-28",
    body: "Salle de bain refaite entièrement, du démontage aux finitions. Chantier propre, délais tenus, et un vrai souci du détail sur les raccords.",
  },
  {
    author: "Laurent B.",
    meta: "Avis de démonstration",
    rating: 5,
    date: "2026-08-12",
    body: "Remplacement de la chaudière dans un immeuble de six appartements. Coordination impeccable avec la régie, aucune coupure imprévue.",
  },
  {
    author: "Régie C.",
    meta: "Avis de démonstration",
    rating: 5,
    date: "2026-07-30",
    body: "Nous leur confions l\u2019entretien de plusieurs immeubles depuis des années. Réactifs sur les dépannages, et toujours joignables.",
  },
  {
    author: "Nadia P.",
    meta: "Avis de démonstration",
    rating: 5,
    date: "2026-07-09",
    body: "Douche extérieure installée dans le jardin. Conseil juste dès la visite, finitions soignées, résultat exactement comme imaginé.",
  },
  {
    author: "Thomas G.",
    meta: "Avis de démonstration",
    rating: 5,
    date: "2026-06-21",
    body: "Fuite un dimanche soir, intervention le lendemain matin. Diagnostic clair, réparation nette, facture sans surprise.",
  },
];

/** Ce que la section affiche : les avis réels d'abord, puis — tant que
 *  AVIS_DEMO est vrai — les cartes de démonstration. */
export const REVIEWS_AFFICHES: Review[] = AVIS_DEMO
  ? [...REVIEWS, ...DEMO]
  : REVIEWS;

/**
 * Citation mise en avant sous les avis.
 *
 * VOLONTAIREMENT VIDE. Ce n'est pas un avis Google de plus : c'est une
 * phrase choisie, mise en grand. Je ne l'écris pas moi-même — une phrase
 * inventée puis attribuée à un client ou à MBA serait un faux témoignage.
 *
 * Tant que c'est `null`, la section réserve la place et le dit. Pour la
 * remplir, remplacer par :
 *
 *   export const PULL_QUOTE: PullQuote | null = {
 *     text: "…",
 *     author: "Frédéric …",
 *     role: "Fondateur, MBA Sanit",
 *   };
 *
 * Une phrase de Fred sur sa façon de travailler marcherait très bien ici,
 * comme un avis client particulièrement parlant.
 */
export type PullQuote = {
  text: string;
  /** Signature. Facultative : sans elle, la phrase est affichée seule,
   *  ce qui vaut mieux qu'un nom inventé. */
  author?: string;
  /** Fonction ou contexte, sous le nom. Facultatif. */
  role?: string;
};

/* Phrase fournie par MBA le 21/09/2026, recopiée mot à mot, signée « D.S. »
   sur leur indication (initiales seules : c'est celles qu'ils nous ont
   données, on n'en déduit pas un nom complet). Une fonction pourra être
   ajoutée en `role` si MBA en donne une. */
export const PULL_QUOTE: PullQuote | null = {
  author: "D.S.",
  text:
    "Les travaux ont été réalisés avec beaucoup de rigueur et de soins, dans " +
    "le respect des normes en vigueur et avec une qualité d’exécution " +
    "irréprochable.",
};
