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
  /** Image plein cadre. */
  image: string;
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

/** Réalisations d'exemple, pour la route /realisations/[slug]. */
export const REALISATIONS: PageContent[] = [
  {
    href: "/realisations/lorem-ipsum",
    title: "Lorem ipsum",
    image: "/services-1.jpg",
    lede: LEDE,
    cue: "Réalisation suivante",
    kicker: "Suisse romande",
    display: "Dolor sit",
  },
  {
    href: "/realisations/dolor-sit-amet",
    title: "Dolor sit amet",
    image: "/services-2.jpg",
    lede: LEDE,
    cue: "Réalisation suivante",
    kicker: "Suisse romande",
    display: "Amet elit",
  },
  {
    href: "/realisations/consectetur-elit",
    title: "Consectetur elit",
    image: "/services-3.jpg",
    lede: LEDE,
    cue: "Réalisation suivante",
    kicker: "Suisse romande",
    display: "Sed eiusmod",
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
