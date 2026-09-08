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
};

const LEDE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.";


/** Une réalisation appartient à une catégorie (son slug). */
export type Realisation = PageContent & { category: string };

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
  },
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
  },
];

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
