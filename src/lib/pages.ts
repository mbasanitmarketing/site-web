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

/**
 * Les réalisations — source unique.
 *
 * Le carrousel de la section 3, la liste /realisations, les sous-liens du
 * menu et les pages /realisations/[slug] lisent tous d'ici. L'image d'une
 * diapo est donc littéralement celle de sa page : cliquer « Voir le
 * projet » amène la photo qu'on vient de voir, en hero plein cadre, et la
 * transition la balaie sans raccord.
 *
 * Photos client (1536 × 1024, 3:2). Textes encore en lorem.
 *
 * NB : « Piscine » et « Douche extérieure » apparaissent deux fois — ce
 * sont deux vues, chacune avec sa page. À fusionner si ce sont bien les
 * mêmes chantiers.
 */
export const REALISATIONS: PageContent[] = [
  {
    href: "/realisations/salle-de-bain",
    title: "Salle de bain",
    image: "/realisation-salle-de-bain.jpg",
    alt: "Salle de bain réalisée par MBA Sanit",
    lede: LEDE,
    cue: "Réalisation suivante",
    kicker: "Suisse romande",
    display: "Sur mesure",
  },
  {
    href: "/realisations/chaufferie",
    title: "Chaufferie",
    image: "/realisation-chaufferie.jpg",
    alt: "Chaufferie installée par MBA Sanit",
    lede: LEDE,
    cue: "Réalisation suivante",
    kicker: "Suisse romande",
    display: "Production",
  },
  {
    href: "/realisations/piscine",
    title: "Piscine",
    image: "/realisation-piscine-1.jpg",
    alt: "Piscine équipée par MBA Sanit",
    lede: LEDE,
    cue: "Réalisation suivante",
    kicker: "Suisse romande",
    display: "Traitement",
  },
  {
    href: "/realisations/piscine-vue-2",
    title: "Piscine",
    image: "/realisation-piscine-2.jpg",
    alt: "Piscine équipée par MBA Sanit, seconde vue",
    lede: LEDE,
    cue: "Réalisation suivante",
    kicker: "Suisse romande",
    display: "Traitement",
  },
  {
    href: "/realisations/salle-deau",
    title: "Salle d’eau",
    image: "/realisation-salle-deau.jpg",
    alt: "Salle d’eau réalisée par MBA Sanit",
    lede: LEDE,
    cue: "Réalisation suivante",
    kicker: "Suisse romande",
    display: "Aménagement",
  },
  {
    href: "/realisations/douche-exterieure",
    title: "Douche extérieure",
    image: "/realisation-douche-exterieure-1.jpg",
    alt: "Douche extérieure réalisée par MBA Sanit",
    lede: LEDE,
    cue: "Réalisation suivante",
    kicker: "Suisse romande",
    display: "Extérieur",
  },
  {
    href: "/realisations/douche-exterieure-vue-2",
    title: "Douche extérieure",
    image: "/realisation-douche-exterieure-2.jpg",
    alt: "Douche extérieure réalisée par MBA Sanit, seconde vue",
    lede: LEDE,
    cue: "Réalisation suivante",
    kicker: "Suisse romande",
    display: "Extérieur",
  },
];

const ALL = [...PAGES, ...REALISATIONS];

export function getPage(href: string): PageContent | undefined {
  return ALL.find((p) => p.href === href);
}

/** Pour les routes statiques : l'absence est un bug, pas un 404. */
export function requirePage(href: string): PageContent {
  const page = getPage(href);
  if (!page) throw new Error(`Page inconnue dans PAGES : ${href}`);
  return page;
}

export function getRealisation(slug: string): PageContent | undefined {
  return REALISATIONS.find((p) => p.href === `/realisations/${slug}`);
}
