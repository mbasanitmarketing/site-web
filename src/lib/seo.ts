import type { Metadata } from "next";
import { ADRESSE, EMAIL } from "./contact";
import type { PageContent } from "./pages";

/**
 * Référencement : adresse officielle, titres et descriptions de chaque
 * page, données structurées (JSON-LD).
 *
 * Les titres affichés dans l'interface (menu, bandeaux, transitions) sont
 * ceux de PageContent ; ceux-ci sont uniquement pour Google, les onglets
 * et les aperçus de lien. Limites visées : titre 60 caractères, description
 * 155.
 */

export const SITE_URL = "https://www.mbasanit.ch";
export const SITE_NAME = "MBA Sanit";
export const OG_IMAGE = "/og-default.png";
export const ORG_ID = `${SITE_URL}/#entreprise`;
const SITE_ID = `${SITE_URL}/#site`;

export const SEO: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Installateur sanitaire et chauffagiste à Genève | MBA Sanit",
    description:
      "Salles de bain, chauffage, pompes à chaleur, dépannage et entretien à Genève. MBA Sanit : 25 ans de métier, devis après visite sur place.",
  },
  "/services": {
    title: "Services sanitaire, chauffage, dépannage Genève | MBA Sanit",
    description:
      "Installation sanitaire, chauffage, pompes à chaleur, entretien et dépannage à Genève et en Suisse romande, pour particuliers, régies et entreprises.",
  },
  "/services/sanitaire-salles-de-bain": {
    title: "Installation sanitaire et salle de bain à Genève | MBA Sanit",
    description:
      "Rénovation de salle de bain, installation sanitaire, remplacement d’appareils et réparation de fuites à Genève. Devis après visite sur place.",
  },
  "/services/chauffage-pompes-a-chaleur": {
    title: "Chauffage et pompe à chaleur à Genève | MBA Sanit",
    description:
      "Remplacement de chaudière, passage à la pompe à chaleur, radiateurs et eau chaude à Genève et en Suisse romande. Étude de l’existant, devis détaillé.",
  },
  "/services/entretien-depannage": {
    title: "Dépannage sanitaire et chauffage à Genève | MBA Sanit",
    description:
      "Fuite, plus d’eau chaude, chauffage en panne, canalisation bouchée : dépannage à Genève, puis contrat d’entretien pour régies et villas.",
  },
  "/realisations": {
    title: "Réalisations salles de bain, chauffage, douches | MBA Sanit",
    description:
      "Salles de bain, chaufferies, pompes à chaleur, douches extérieures : une sélection de chantiers de MBA Sanit à Genève et en Suisse romande.",
  },
  "/realisations/sanitaire-salles-de-bain": {
    title: "Réalisations salles de bain et salles d’eau | MBA Sanit",
    description:
      "Rénovations complètes de salles de bain et de salles d’eau à Genève : carrelage, douche, meuble vasque et robinetterie, jusqu’aux finitions.",
  },
  "/realisations/chauffage-pompes-a-chaleur": {
    title: "Réalisations chaufferies et pompes à chaleur | MBA Sanit",
    description:
      "Chaufferies et pompes à chaleur installées par MBA Sanit : production de chaleur, eau chaude sanitaire et distribution reprise proprement.",
  },
  "/realisations/douches-amenagements-exterieurs": {
    title: "Douches extérieures et aménagements jardin | MBA Sanit",
    description:
      "Douches extérieures en pierre ou en bois, fontaines et aménagements de jardin réalisés à Genève et en Suisse romande.",
  },
  "/realisations/sanitaire-salles-de-bain/salle-de-bain": {
    title: "Salle de bain carrelage vert et meuble bois | MBA Sanit",
    description:
      "Salle de bain au carrelage vert profond, meuble vasque en bois et miroir encastré : une rénovation complète pensée jusqu’aux finitions.",
  },
  "/realisations/sanitaire-salles-de-bain/salle-deau": {
    title: "Salle d’eau, douche à l’italienne et terrazzo | MBA Sanit",
    description:
      "Salle d’eau avec douche à l’italienne vitrée, faïence bleue et sol en terrazzo : des lignes nettes et un entretien facile.",
  },
  "/realisations/chauffage-pompes-a-chaleur/chaufferie": {
    title: "Chaufferie avec pompe à chaleur et ballon | MBA Sanit",
    description:
      "Chaufferie moderne avec pompe à chaleur, ballon d’eau chaude et distribution entièrement reprise, conduites isolées et lisibles.",
  },
  "/realisations/douches-amenagements-exterieurs/douche-exterieure-pierre": {
    title: "Douche extérieure en pierre naturelle et inox | MBA Sanit",
    description:
      "Douche extérieure en pierre naturelle et inox, intégrée au jardin : alimentation et évacuation pensées pour durer dehors.",
  },
  "/realisations/douches-amenagements-exterieurs/douche-exterieure-bois": {
    title: "Douche extérieure habillée de bois | MBA Sanit",
    description:
      "Douche extérieure habillée de bois pour profiter du jardin : un aménagement simple, robuste et facile à entretenir.",
  },
  "/equipe": {
    title: "L’équipe MBA Sanit, sanitaire et chauffage à Genève",
    description:
      "Greg, Fred et Yoan : installateurs sanitaires et chauffagistes à Genève, 25 ans de métier, un interlocuteur unique du devis à l’entretien.",
  },
  "/devis": {
    title: "Devis sanitaire ou chauffage à Genève | MBA Sanit",
    description:
      "Décrivez votre projet sanitaire ou de chauffage : MBA Sanit vous recontacte pour convenir d’une visite sur place, puis vous remet un devis détaillé.",
  },
  "/mentions-legales": {
    title: "Mentions légales | MBA Sanit",
    description:
      "Mentions légales du site de MBA Sanit, installateur sanitaire et chauffagiste à Genève : éditeur, hébergement, propriété intellectuelle et données.",
  },
  "/confidentialite": {
    title: "Politique de confidentialité | MBA Sanit",
    description:
      "Comment MBA Sanit traite vos données : formulaire de devis, mesure d’audience avec votre accord, vos droits et comment les exercer.",
  },
};

/** Métadonnées d'une page : titre, description, adresse officielle
 *  (canonical) et aperçus de partage. `image` : chemin d'une photo du
 *  site ; sans elle, l'image de partage par défaut. */
export function pageMetadata(path: string, image?: string): Metadata {
  const seo = SEO[path];
  if (!seo) throw new Error(`Pas de métadonnées SEO pour ${path} (src/lib/seo.ts)`);
  const img = image ?? OG_IMAGE;
  const images = image
    ? [{ url: img }]
    : [{ url: img, width: 1200, height: 630, alt: "MBA Sanit, installateur sanitaire et chauffagiste à Genève" }];
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_CH",
      siteName: SITE_NAME,
      url: path,
      title: seo.title,
      description: seo.description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [img],
    },
  };
}

/* --- Données structurées (JSON-LD) -------------------------------- */

const COMMUNES = [
  "Genève", "Carouge", "Lancy", "Onex", "Vernier", "Chêne-Bougeries", "Thônex",
  "Plan-les-Ouates", "Meyrin", "Versoix", "Bernex", "Veyrier",
  "Collonge-Bellerive", "Satigny", "Bellevue", "Perly-Certoux",
];

/** Assemble plusieurs entités dans un seul bloc. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** L'entreprise. Pas de note ni d'avis : Google ignore ceux qu'une
 *  entreprise publie sur son propre site. Pas de coordonnées GPS ni de
 *  date de création tant qu'elles ne sont pas confirmées. */
export function businessLd() {
  const [npa, ...ville] = ADRESSE.npaVille.split(" ");
  return {
    "@type": ["Plumber", "HVACBusiness"],
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Installateur sanitaire et chauffagiste à Genève : salles de bain, chauffage et pompes à chaleur, douches extérieures, entretien et dépannage pour particuliers, régies immobilières et entreprises.",
    telephone: "+41782350578",
    email: EMAIL,
    logo: `${SITE_URL}/logo-mba.png`,
    image: `${SITE_URL}${OG_IMAGE}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADRESSE.rue,
      postalCode: npa,
      addressLocality: ville.join(" "),
      addressRegion: "GE",
      addressCountry: "CH",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
    areaServed: [
      ...COMMUNES.map((name) => ({ "@type": "City", name })),
      { "@type": "AdministrativeArea", name: "Canton de Genève" },
      { "@type": "AdministrativeArea", name: "Canton de Vaud" },
    ],
    knowsAbout: [
      "Installation sanitaire",
      "Rénovation de salle de bain",
      "Chauffage",
      "Pompe à chaleur",
      "Dépannage sanitaire et chauffage",
      "Entretien de chaudière",
      "Douche extérieure",
    ],
  };
}

export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "fr-CH",
    publisher: { "@id": ORG_ID },
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function serviceLd(page: PageContent) {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}${page.href}#service`,
    name: page.title,
    url: `${SITE_URL}${page.href}`,
    description: SEO[page.href]?.description ?? page.lede,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "AdministrativeArea", name: "Canton de Genève" },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
