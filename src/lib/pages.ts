/**
 * Contenu des pages intérieures.
 *
 * Source unique : les pages elles-mêmes ET les liens qui y mènent lisent
 * d'ici. C'est ce qui permet à la transition d'afficher immédiatement
 * l'image et le titre de la page d'arrivée, avant même de naviguer.
 *
 * Textes provisoires (lorem) — seuls `title` et `image` sont « vrais ».
 */
export type PageContent = {
  /** Route, sert aussi de clé. */
  href: string;
  /** Le nom repris en bas à gauche de la page d'arrivée. */
  title: string;
  /** Image plein cadre. Sert aussi de vignette au carrousel et d'image
   *  balayée par la transition : c'est la même partout, donc l'image
   *  cliquée est forcément celle de la page d'arrivée. */
  image: string;
  /** Texte alternatif, quand l'image porte du sens (carrousel). Sur la
   *  page, l'image est décorative : le titre est juste à côté. */
  alt?: string;
  /** Paragraphe sous le titre. */
  lede: string;
  /** Petit lien en capitales, sous le paragraphe. */
  cue: string;
  /** Petite ligne en capitales, en bas à droite. */
  kicker: string;
  /** Grande ligne, en bas à droite. */
  display: string;
  /** Phrase de rubrique, en tête de page de catégorie (bandeau d'intro).
   *  C'est le H1 de la page.
   *
   *  DOIT TENIR SUR UNE LIGNE, jusqu'à 360 px de large : compter ~32
   *  caractères au maximum. Aucun CSS ne peut garantir la ligne unique
   *  pour un texte quelconque — il faudrait le mesurer. La garantie vient
   *  donc d'ici. Au-delà du gabarit, la phrase passe simplement à la
   *  ligne, elle ne déborde pas.
   *
   *  Textes de travail : à valider par MBA. */
  headline?: string;
  /** Section « manifeste » sous le hero (pages de service). */
  manifesto?: Manifesto;
  /** Carrousel de réalisations en bas de page de service. `category` est
   *  le slug de la catégorie montrée, `label` le mot repris dans le titre
   *  (« Nos réalisations <label> »). Les deux sont séparés : l'entretien
   *  renvoie vers les extérieurs, et le libellé n'est pas le nom de la
   *  catégorie. */
  relatedRealisations?: { category: string; label: string };
  /** Libellé court, pour les onglets sur petit écran : les trois noms
   *  complets font 626 px et ne tiennent pas sur un téléphone. Le nom
   *  complet reste juste en dessous, en titre de page. */
  tab?: string;
};

const LEDE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.";


/**
 * Section « manifeste » sous le hero d'une page de service — d'après la
 * maquette : un petit mot à gauche, à droite une grande ligne, un chapô,
 * puis des blocs intitulé-en-gras + paragraphe, séparés par du blanc.
 */
export type Manifesto = {
  /** Petit mot dans la colonne de gauche. */
  label: string;
  /** Grande ligne. */
  headline: string;
  /** Chapô sous la grande ligne. */
  intro: string;
  /** Les blocs, dans l'ordre. */
  blocks: { title: string; body: string }[];
};

/** Une réalisation appartient à une catégorie (son slug). */
export type Realisation = PageContent & {
  category: string;
  /** Lieu, affiché sous le titre dans les grilles de projets. */
  lieu: string;
  /** Description : un paragraphe par entrée. */
  body: string[];
  /** Fiche technique, en colonnes sous la description. */
  meta: { label: string; value: string }[];
  /** Galerie « un aperçu du projet ». */
  gallery: { src: string; alt: string }[];
};

/* --- Pages de premier niveau ------------------------------------- */

export const PAGES: PageContent[] = [
  {
    href: "/services",
    title: "Services",
    image: "/services-1.jpg",
    lede: LEDE,
    cue: "Notre démarche",
    kicker: "Lorem ipsum dolor",
    display: "Sit amet",
  },
  {
    href: "/realisations",
    title: "Réalisations",
    image: "/services-2.jpg",
    lede: LEDE,
    cue: "Voir le catalogue",
    kicker: "Consectetur adipiscing",
    display: "Elit sed",
  },
  {
    href: "/equipe",
    title: "L’équipe",
    image: "/equipe.jpg",
    lede: LEDE,
    cue: "Nous rencontrer",
    kicker: "Tempor incididunt",
    display: "Ut labore",
  },
  {
    href: "/devis",
    title: "Demander un devis",
    image: "/hero-light.jpg",
    lede: LEDE,
    cue: "Nous écrire",
    kicker: "Dolore magna aliqua",
    display: "Ad minim",
  },
];

/* --- Les trois métiers, sous /services ---------------------------- */

/* Trame des sections « manifeste ». Les intitulés sont structurels — ils
   ne promettent rien de précis — et les paragraphes sont du lorem : seule
   la mise en page est arrêtée. Tout ce texte est à écrire par MBA. */
const manifesto = (headline: string): Manifesto => ({
  label: "La prestation",
  headline,
  intro: LEDE,
  blocks: [
    { title: "Ce que comprend la prestation", body: BODY_A },
    { title: "Comment nous procédons", body: BODY_B },
    { title: "Après l’intervention", body: BODY_A },
  ],
});

const BODY_A =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const BODY_B =
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const SERVICES: PageContent[] = [
  {
    href: "/services/sanitaire-salles-de-bain",
    title: "Sanitaire & salles de bain",
    image: "/realisation-salle-de-bain.jpg",
    alt: "Salle de bain réalisée par MBA Sanit",
    lede: LEDE,
    cue: "Demander un devis",
    kicker: "Suisse romande",
    display: "Sur mesure",
    manifesto: manifesto(
      "De la pose d’un sanitaire à la salle de bain complète.",
    ),
    relatedRealisations: { category: "sanitaire-salles-de-bain", label: "sanitaire" },
  },
  {
    href: "/services/chauffage-pompes-a-chaleur",
    title: "Chauffage & pompes à chaleur",
    image: "/realisation-chaufferie.jpg",
    alt: "Chaufferie installée par MBA Sanit",
    lede: LEDE,
    cue: "Demander un devis",
    kicker: "Suisse romande",
    display: "Production",
    manifesto: manifesto(
      "Du remplacement d’une chaudière à la pompe à chaleur.",
    ),
    relatedRealisations: { category: "chauffage-pompes-a-chaleur", label: "chauffage" },
  },
  {
    href: "/services/entretien-depannage",
    title: "Entretien & dépannage",
    image: "/realisation-salle-deau.jpg",
    alt: "Salle d’eau réalisée par MBA Sanit",
    lede: LEDE,
    cue: "Nous appeler",
    kicker: "Suisse romande",
    display: "Réactivité",
    manifesto: manifesto(
      "De l’entretien courant au dépannage.",
    ),
    relatedRealisations: { category: "piscines-exterieurs", label: "extérieurs" },
  },
];

/* --- Les trois catégories de réalisations ------------------------- */

/** L'image d'une catégorie est celle de sa première réalisation. */
export const CATEGORIES: PageContent[] = [
  {
    href: "/realisations/sanitaire-salles-de-bain",
    title: "Sanitaire & salles de bain",
    image: "/realisation-salle-de-bain.jpg",
    alt: "Salle de bain réalisée par MBA Sanit",
    lede: LEDE,
    cue: "Voir les réalisations",
    kicker: "Suisse romande",
    display: "Sur mesure",
    headline: "Salles de bain et salles d’eau.",
    tab: "Sanitaire",
  },
  {
    href: "/realisations/chauffage-pompes-a-chaleur",
    title: "Chauffage & pompes à chaleur",
    image: "/realisation-chaufferie.jpg",
    alt: "Chaufferie installée par MBA Sanit",
    lede: LEDE,
    cue: "Voir les réalisations",
    kicker: "Suisse romande",
    display: "Production",
    headline: "Chaufferies et pompes à chaleur.",
    tab: "Chauffage",
  },
  {
    href: "/realisations/piscines-exterieurs",
    title: "Piscines et extérieurs",
    image: "/realisation-piscine-1.jpg",
    alt: "Piscine équipée par MBA Sanit",
    lede: LEDE,
    cue: "Voir les réalisations",
    kicker: "Suisse romande",
    display: "Extérieur",
    headline: "Piscines et douches extérieures.",
    tab: "Piscines",
  },
];

/**
 * Pages dont l'ouverture est un bandeau suivi d'une bannière, et non une
 * photo plein cadre (cf. « realisations layout - template.mov » : la photo
 * ne touche pas le haut de la page, un bandeau clair la précède avec le
 * nom à gauche et la phrase de rubrique à droite).
 *
 * PageIntro lit cette liste, et le calque de transition rend le MÊME
 * composant : les deux ne peuvent donc pas diverger. S'ils divergeaient,
 * le titre sauterait au raccord — c'est tout ce que la transition doit
 * éviter. Pour l'appliquer à tout le site, remplacer par ALL.
 */
export const HERO_BAND: ReadonlySet<string> = new Set(
  CATEGORIES.map((c) => c.href),
);

/* Contenus provisoires des fiches projet. Le vrai texte, l'année, le lieu
   et les prestations sont à remplir projet par projet. */
const BODY = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
];

const meta = (categorie: string) => [
  { label: "Catégorie", value: categorie },
  { label: "Année", value: "À définir" },
  { label: "Lieu", value: "À définir" },
  { label: "Prestations", value: "Lorem ipsum, dolor sit amet" },
];

/* --- Les réalisations, rangées par catégorie ---------------------- */

/**
 * Photos client (1536 × 1024, 3:2). Le `href` est imbriqué sous sa
 * catégorie : c'est ce qui évite que catégories et réalisations se
 * disputent le même segment d'URL.
 *
 * NB : « Piscine » et « Douche extérieure » apparaissent deux fois — ce
 * sont deux vues, chacune avec sa page. À fusionner si ce sont bien les
 * mêmes chantiers.
 */
export const REALISATIONS: Realisation[] = [
  {
    category: "sanitaire-salles-de-bain",
    href: "/realisations/sanitaire-salles-de-bain/salle-de-bain",
    title: "Salle de bain",
    image: "/realisation-salle-de-bain.jpg",
    alt: "Salle de bain réalisée par MBA Sanit",
    lede: LEDE,
    cue: "Réalisation suivante",
    kicker: "Suisse romande",
    display: "Sur mesure",
 
    lieu: "Suisse romande",
    body: BODY,
    meta: meta("Sanitaire & salles de bain"),
    gallery: [
      { src: "/realisation-salle-de-bain.jpg", alt: "Salle de bain réalisée par MBA Sanit" },
      { src: "/realisation-salle-deau.jpg", alt: "Salle d’eau réalisée par MBA Sanit" },
    ],
  },
  {
    category: "sanitaire-salles-de-bain",
    href: "/realisations/sanitaire-salles-de-bain/salle-deau",
    title: "Salle d’eau",
    image: "/realisation-salle-deau.jpg",
    alt: "Salle d’eau réalisée par MBA Sanit",
    lede: LEDE,
    cue: "Réalisation suivante",
    kicker: "Suisse romande",
    display: "Aménagement",
 
    lieu: "Suisse romande",
    body: BODY,
    meta: meta("Sanitaire & salles de bain"),
    gallery: [
      { src: "/realisation-salle-de-bain.jpg", alt: "Salle de bain réalisée par MBA Sanit" },
      { src: "/realisation-salle-deau.jpg", alt: "Salle d’eau réalisée par MBA Sanit" },
    ],
  },
  {
    category: "chauffage-pompes-a-chaleur",
    href: "/realisations/chauffage-pompes-a-chaleur/chaufferie",
    title: "Chaufferie",
    image: "/realisation-chaufferie.jpg",
    alt: "Chaufferie installée par MBA Sanit",
    lede: LEDE,
    cue: "Réalisation suivante",
    kicker: "Suisse romande",
    display: "Production",
 
    lieu: "Suisse romande",
    body: BODY,
    meta: meta("Chauffage & pompes à chaleur"),
    gallery: [
      { src: "/realisation-chaufferie.jpg", alt: "Chaufferie installée par MBA Sanit" },
    ],
  },
  {
    category: "piscines-exterieurs",
    href: "/realisations/piscines-exterieurs/piscine",
    title: "Piscine",
    image: "/realisation-piscine-1.jpg",
    alt: "Piscine équipée par MBA Sanit",
    lede: LEDE,
    cue: "Réalisation suivante",
    kicker: "Suisse romande",
    display: "Traitement",
 
    lieu: "Suisse romande",
    body: BODY,
    meta: meta("Piscines et extérieurs"),
    gallery: [
      { src: "/realisation-piscine-1.jpg", alt: "Piscine équipée par MBA Sanit" },
      { src: "/realisation-piscine-2.jpg", alt: "Piscine équipée par MBA Sanit, seconde vue" },
      { src: "/realisation-douche-exterieure-1.jpg", alt: "Douche extérieure réalisée par MBA Sanit" },
      { src: "/realisation-douche-exterieure-2.jpg", alt: "Douche extérieure réalisée par MBA Sanit, seconde vue" },
    ],
  },
  {
    category: "piscines-exterieurs",
    href: "/realisations/piscines-exterieurs/piscine-vue-2",
    title: "Piscine",
    image: "/realisation-piscine-2.jpg",
    alt: "Piscine équipée par MBA Sanit, seconde vue",
    lede: LEDE,
    cue: "Réalisation suivante",
    kicker: "Suisse romande",
    display: "Traitement",
 
    lieu: "Suisse romande",
    body: BODY,
    meta: meta("Piscines et extérieurs"),
    gallery: [
      { src: "/realisation-piscine-1.jpg", alt: "Piscine équipée par MBA Sanit" },
      { src: "/realisation-piscine-2.jpg", alt: "Piscine équipée par MBA Sanit, seconde vue" },
      { src: "/realisation-douche-exterieure-1.jpg", alt: "Douche extérieure réalisée par MBA Sanit" },
      { src: "/realisation-douche-exterieure-2.jpg", alt: "Douche extérieure réalisée par MBA Sanit, seconde vue" },
    ],
  },
  {
    category: "piscines-exterieurs",
    href: "/realisations/piscines-exterieurs/douche-exterieure",
    title: "Douche extérieure",
    image: "/realisation-douche-exterieure-1.jpg",
    alt: "Douche extérieure réalisée par MBA Sanit",
    lede: LEDE,
    cue: "Réalisation suivante",
    kicker: "Suisse romande",
    display: "Extérieur",
 
    lieu: "Suisse romande",
    body: BODY,
    meta: meta("Piscines et extérieurs"),
    gallery: [
      { src: "/realisation-piscine-1.jpg", alt: "Piscine équipée par MBA Sanit" },
      { src: "/realisation-piscine-2.jpg", alt: "Piscine équipée par MBA Sanit, seconde vue" },
      { src: "/realisation-douche-exterieure-1.jpg", alt: "Douche extérieure réalisée par MBA Sanit" },
      { src: "/realisation-douche-exterieure-2.jpg", alt: "Douche extérieure réalisée par MBA Sanit, seconde vue" },
    ],
  },
  {
    category: "piscines-exterieurs",
    href: "/realisations/piscines-exterieurs/douche-exterieure-vue-2",
    title: "Douche extérieure",
    image: "/realisation-douche-exterieure-2.jpg",
    alt: "Douche extérieure réalisée par MBA Sanit, seconde vue",
    lede: LEDE,
    cue: "Réalisation suivante",
    kicker: "Suisse romande",
    display: "Extérieur",
 
    lieu: "Suisse romande",
    body: BODY,
    meta: meta("Piscines et extérieurs"),
    gallery: [
      { src: "/realisation-piscine-1.jpg", alt: "Piscine équipée par MBA Sanit" },
      { src: "/realisation-piscine-2.jpg", alt: "Piscine équipée par MBA Sanit, seconde vue" },
      { src: "/realisation-douche-exterieure-1.jpg", alt: "Douche extérieure réalisée par MBA Sanit" },
      { src: "/realisation-douche-exterieure-2.jpg", alt: "Douche extérieure réalisée par MBA Sanit, seconde vue" },
    ],
  },
];

/* --- Partenaires --------------------------------------------------- */

/**
 * Logos des partenaires.
 *
 * VIDE tant que MBA ne les a pas fournis. On ne met pas de marques
 * inventées sur le site d'un client : afficher un logo, c'est affirmer un
 * partenariat commercial. Tant que la liste est vide, la section montre
 * des emplacements — la mise en page se juge, rien n'est affirmé.
 *
 * Pour les brancher : déposer les fichiers dans /public, puis
 *   { name: "Nom du fabricant", logo: "/partenaire-xxx.svg" }
 * SVG monochrome de préférence, ou PNG sur fond transparent.
 */
export const PARTNERS: { name: string; logo: string }[] = [];

/** Nombre d'emplacements montrés tant que PARTNERS est vide. */
export const PARTNER_SLOTS = 6;

/* --- Accès ------------------------------------------------------- */

const ALL: PageContent[] = [
  ...PAGES,
  ...SERVICES,
  ...CATEGORIES,
  ...REALISATIONS,
];

export function getPage(href: string): PageContent | undefined {
  return ALL.find((p) => p.href === href);
}

/** Pour les routes statiques : l'absence est un bug, pas un 404. */
export function requirePage(href: string): PageContent {
  const page = getPage(href);
  if (!page) throw new Error(`Page inconnue dans PAGES : ${href}`);
  return page;
}

/** Le dernier segment d'une route, qui sert de paramètre dynamique. */
export function slugOf(href: string): string {
  return href.split("/").filter(Boolean).pop() as string;
}

export function getCategory(slug: string): PageContent | undefined {
  return CATEGORIES.find((c) => slugOf(c.href) === slug);
}

export function getService(slug: string): PageContent | undefined {
  return SERVICES.find((s) => slugOf(s.href) === slug);
}

/** Les réalisations d'une catégorie, dans l'ordre de déclaration. */
export function realisationsOf(categorySlug: string): Realisation[] {
  return REALISATIONS.filter((r) => r.category === categorySlug);
}

export function getRealisation(
  categorySlug: string,
  slug: string,
): Realisation | undefined {
  return REALISATIONS.find(
    (r) => r.category === categorySlug && slugOf(r.href) === slug,
  );
}
