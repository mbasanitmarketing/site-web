import { PHONE_HREF } from "./contact";

/**
 * Contenu des pages intérieures.
 *
 * Source unique : les pages elles-mêmes ET les liens qui y mènent lisent
 * d'ici. C'est ce qui permet à la transition d'afficher immédiatement
 * l'image et le titre de la page d'arrivée, avant même de naviguer.
 *
 * Textes rédigés à partir de ce que MBA a dit de son activité (métiers,
 * clientèle, zone, vingt ans de métier). Rien d'inventé sur les dates,
 * les lieux précis, les marques ou les prix — à relire avec MBA.
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
  /** Sa cible. Renseignée, le repère devient un vrai bouton cliquable ;
   *  sans elle il reste un simple texte. */
  cueHref?: string;
  /** Petite ligne en capitales, en bas à droite. */
  kicker: string;
  /** Grande ligne, en bas à droite. */
  display: string;
  /** Ouverture sans photo : fond uni. Le calque de transition lit le MÊME
   *  objet, il ne peut donc pas balayer une image que la page n'a pas. */
  heroPlain?: boolean;
  /** Rend cette ligne en petit (~15 px) plutôt qu'en grande ligne : elle
   *  porte une zone d'intervention, pas une accroche. Le calque de
   *  transition lit le MÊME objet, les deux ne peuvent donc pas tomber sur
   *  des tailles différentes et le raccord tient. */
  displaySmall?: boolean;
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
  /** Le reste de la page de service (besoins, détail, déroulement…). */
  service?: ServiceDetail;
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


/**
 * Contenu d'une page de service, au-delà du hero et du manifeste.
 *
 * ATTENTION — tout ce contenu est PROVISOIRE et vient de moi, pas de MBA.
 * Ce sont des hypothèses de mise en page, pas des engagements : ce qui est
 * inclus ou exclu d'une prestation, le déroulement, les réponses aux
 * questions, sont à écrire avec Fred avant toute mise en ligne réelle.
 *
 * Deux champs restent VOLONTAIREMENT vides, parce qu'ils ne peuvent pas
 * être devinés sans mentir : `qualifications` (une certification est une
 * affirmation vérifiable) et le tarif dans `pricing` (aucun chiffre
 * inventé). La page les affiche comme manquants.
 */
export type ServiceDetail = {
  /** Besoins traités : les situations qui amènent à appeler. */
  needs: { title: string; body: string }[];
  /** Ce que la prestation comprend. */
  included: string[];
  /** Ce qu'elle ne comprend pas. */
  excluded: string[];
  /** RETIRÉ DE L'AFFICHAGE : la section « Preuves » a été supprimée des
   *  pages de service. Le champ reste pour mémoire — MBA doit toujours
   *  fournir ses qualifications si on veut les remontrer un jour.
   *  Vide tant que MBA n'a pas
   *  fourni la liste — on n'invente pas une certification. */
  qualifications: string[];
  /** RETIRÉ DE L'AFFICHAGE : la section « Déroulement » a été supprimée
   *  des pages de service. Champ conservé pour mémoire.
   *  Déroulement, de la demande à la réalisation. */
  steps: { title: string; body: string }[];
  /** RETIRÉ DE L'AFFICHAGE : la section « Prix » a été supprimée des
   *  pages de service. Le champ reste pour mémoire, comme
   *  `qualifications`. `tarif` n'a jamais été rempli — on n'affiche pas
   *  un chiffre plausible mais inventé, il serait pris pour un
   *  engagement. */
  pricing: { tarif: string; note: string; factors: string[] };
  /** RETIRÉ DE L'AFFICHAGE : la section « Zone d'intervention » a été
   *  supprimée. Elle n'a pas disparu du site pour autant — elle est
   *  passée en PREMIÈRE question de la FAQ, rédigée (cf. ZONE).
   *  Zone d'intervention : communes couvertes et contraintes utiles. */
  area: { communes: string[]; note: string };
  /** Questions fréquentes. */
  faq: { q: string; a: string }[];
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
    lede: "Installation sanitaire, chauffage et pompes à chaleur, entretien et dépannage : MBA Sanit conçoit, pose et suit vos installations à Genève et en Suisse romande, pour les particuliers, les régies immobilières et les entreprises.",
    cue: "Notre démarche",
    kicker: "Nos métiers",
    display: "Genève, Carouge, Grand-Lancy et tout le canton",
    displaySmall: true,
  },
  {
    href: "/realisations",
    title: "Réalisations",
    image: "/services-2.jpg",
    lede: "Salles de bain, chaufferies, douches et aménagements extérieurs : une sélection de chantiers menés par MBA Sanit à Genève et en Suisse romande, de la conception aux finitions.",
    cue: "Voir le catalogue",
    kicker: "Nos chantiers",
    display: "Sur mesure",
  },
  {
    href: "/equipe",
    title: "L’équipe",
    image: "/equipe.jpg",
    lede: "Installateurs sanitaires et chauffagistes, nous cumulons plus de vingt ans de métier. Une équipe resserrée, un interlocuteur unique, pour les villas, les régies immobilières et les entreprises de Genève et de Suisse romande.",
    cue: "Nous rencontrer",
    /* Avec une cible, le repère devient un VRAI bouton (cf. PageIntro) :
       même verre dépoli et même rectangle à 2 px que sur les pages de
       service. Sans elle, c'était un simple texte qui en avait l'air. */
    cueHref: "/devis",
    /* Pas « Suisse romande » ici : la ligne en dessous le dit déjà. */
    kicker: "Notre équipe",
    /* En colonne (mobile), ce bloc remonte en tête de page : au corps
       d'affichage il écrasait tout. Même traitement que les pages de
       service — une ligne de situation, pas un mot d'affiche. */
    display: "À vos côtés en Suisse romande",
    displaySmall: true,
  },
  {
    href: "/devis",
    title: "Demander un devis",
    /* Gardée pour les vignettes et le menu ; l'ouverture de la page, elle,
       est sans photo (heroPlain). */
    image: "/hero-light.jpg",
    heroPlain: true,
    lede: "Décrivez votre projet sanitaire ou de chauffage : MBA Sanit vous recontacte pour convenir d’une visite sur place, puis vous remet un devis détaillé.",
    cue: "Nous écrire",
    kicker: "Votre projet",
    display: "Genève et Suisse romande",
  },
];

/* Descriptions des services sur l'accueil.
 *
 * Plus longues que les titres de manifeste qui servaient jusqu'ici : ce
 * sont les seuls paragraphes de l'accueil qui décrivent vraiment le
 * métier, et ils comptent donc pour le référencement — local compris.
 *
 * Écrites à partir de ce que MBA a dit de son activité : villas, régies
 * immobilières, immeubles d'entreprises, haut de gamme et finitions,
 * vingt ans de métier, de la pose à l'entretien, Genève et la Suisse
 * romande. Rien d'inventé sur les qualifications, les marques ou les
 * délais — à relire avec MBA avant la mise en ligne.
 */
export const DESCRIPTIONS: Record<string, string> = {
  "/services/sanitaire-salles-de-bain":
    "Installation et rénovation sanitaire à Genève, Carouge, Grand-Lancy et dans tout le canton. Nous dessinons et posons des salles de bain complètes — alimentation, évacuation, appareils, robinetterie, carrelage — comme nous remplaçons un seul appareil. Un soin particulier sur les finitions, pour les villas, les régies immobilières et les immeubles d’entreprises.",
  "/services/chauffage-pompes-a-chaleur":
    "Chauffage et pompes à chaleur en Suisse romande : remplacement de chaudière, passage à la pompe à chaleur, distribution et radiateurs. Nous étudions l’installation existante avant de proposer une solution, et nous coordonnons le chantier avec la régie ou le propriétaire pour limiter les coupures.",
  "/services/entretien-depannage":
    "Entretien courant et dépannage sanitaire et chauffage sur Genève et alentour. Fuite, engorgement, panne de production d’eau chaude : nous intervenons, puis nous suivons l’installation dans la durée. Contrats d’entretien pour les régies immobilières et les propriétaires de villas.",
};

/* Les trois arguments de réassurance. Texte fourni par MBA (corrigé à la
   marge : accents et accords). Écrits UNE fois : ils servent aux
   accordéons de l'accueil et aux cartes de la page équipe — deux versions
   qui divergeraient seraient pires qu'une. */
export const VALEURS: { title: string; body: string }[] = [
  {
    title: "20 ans d’expertise",
    body: "Notre équipe, experte depuis plus de 20 ans, vous accompagne sur tous vos projets d’aménagement sanitaire les plus ambitieux.",
  },
  {
    title: "Rapidité et passion",
    body: "Nous nous engageons durablement auprès de nos clients. Nous vous accompagnons de la pose jusqu’à l’entretien. Nous sommes particulièrement adaptés aux suivis de régies et aux chantiers ambitieux.",
  },
  {
    title: "100 % de satisfaction",
    body: "Nous sommes honorés de satisfaire pleinement tous nos clients. Notre goût du détail nous a permis de travailler sur des chantiers d’exception et de satisfaire une clientèle pointilleuse.",
  },
];

/* Portraits découpés dans la photo d'équipe (public/equipe.jpg) : les
   trois hommes, de gauche à droite.
 
   FRED est CERTAIN : c'est celui du milieu, MBA l'a dit explicitement.
 
   Greg à gauche et Yoan à droite : confirmé par MBA, l'ordre n'est donc
   pas celui dans lequel les prénoms ont été donnés. On met un prénom sur
   le visage de quelqu'un — d'où la question posée plutôt qu'une
   supposition. Un `nom` laissé vide n'affiche aucune légende, c'est le
   repli sûr. */
export const EQUIPE: {
  photo: string;
  nom?: string;
  role?: string;
  /** Deux lignes sous le portrait. */
  texte?: string;
}[] = [
  /* ATTENTION — les RÔLES ci-dessous sont des PROPOSITIONS, pas des faits :
     MBA n'a donné que les prénoms et la place de chacun sur la photo. Fred
     est bien l'interlocuteur (il nous l'a dit) ; la spécialité prêtée à
     Greg et à Yoan est à confirmer ou à remplacer par Fred avant la mise
     en ligne. Un champ vide n'affiche rien, c'est le repli sûr. */
  {
    photo: "/equipe-portrait-1.jpg",
    nom: "Greg",
    role: "Installations sanitaires",
    texte:
      "Sur le chantier au quotidien : alimentations, évacuations et pose des appareils, jusqu’aux finitions.",
  },
  {
    photo: "/equipe-portrait-2.jpg",
    nom: "Fred",
    role: "Votre interlocuteur",
    texte:
      "Il vient sur place, prend les mesures, établit le devis et suit le chantier jusqu’à la réception.",
  },
  {
    photo: "/equipe-portrait-3.jpg",
    nom: "Yoan",
    role: "Chauffage et eau chaude",
    texte:
      "Chaudières, pompes à chaleur et production d’eau chaude : de l’étude de l’existant à la mise en service.",
  },
];

/* --- Les trois métiers, sous /services ---------------------------- */

/* Sections « manifeste » : un chapô propre à chaque métier, puis les
   quatre étapes d'un chantier. Les étapes décrivent la méthode que MBA
   décrit lui-même (visite, devis, chantier, suivi jusqu'à l'entretien) —
   aucun délai ni aucune garantie chiffrée. */
const manifesto = (
  headline: string,
  intro: string,
  objet: string,
): Manifesto => ({
  label: "La prestation",
  headline,
  intro,
  blocks: [
    {
      title: "Le rendez-vous et le relevé",
      body: `Nous nous déplaçons pour voir l’existant, prendre les mesures et comprendre vos attentes. C’est sur place que se décident les bons choix pour ${objet} : accès, raccordements, contraintes du bâtiment.`,
    },
    {
      title: "Le devis détaillé",
      body: "Vous recevez un devis poste par poste : fournitures, main-d’œuvre et options clairement séparées. Nous prenons le temps d’en discuter avec vous, ou avec votre régie, avant de fixer le calendrier.",
    },
    {
      title: "Le chantier",
      body: "Un interlocuteur unique suit les travaux du premier au dernier jour. Nous coordonnons les autres corps de métier, protégeons les lieux et limitons les coupures d’eau et de chauffage, y compris en logement occupé.",
    },
    {
      title: "La réception et le suivi",
      body: "Mise en service, contrôle et explications à la remise des clés. Nous restons ensuite votre contact pour l’entretien et le dépannage : nous connaissons déjà l’installation quand il faut intervenir.",
    },
  ],
});

/* RETIRÉ DE L'AFFICHAGE (section « Déroulement ») : gardé pour mémoire. */
const ETAPES = [
  { title: "Premier contact", body: "Par téléphone ou par le formulaire de devis." },
  { title: "Visite sur place", body: "Relevé de l’existant et des contraintes." },
  { title: "Devis détaillé", body: "Poste par poste, options séparées." },
  { title: "Réalisation", body: "Un interlocuteur unique sur le chantier." },
  { title: "Réception", body: "Mise en service, contrôle et suivi." },
];

const FACTEURS = [
  "Nature et état de l\u2019installation existante",
  "Surface et nombre de points concernés",
  "Choix des appareils et des finitions",
  "Accès au chantier",
];

/* Les six questions qui accompagnent celle des zones (ZONE), soit sept en
   tout.
 
   Chaque réponse ne dit QUE ce que MBA nous a dit de son activité :
   vingt ans de métier, villas / régies / immeubles d'entreprises, haut de
   gamme et finitions, de la pose au dépannage et aux contrats
   d'entretien, Genève et la Suisse romande, grands chantiers vaudois.
 
   J'ai volontairement écarté les questions dont la réponse serait un
   chiffre que personne ne m'a donné — délai de devis, prix, garanties.
   Une fourchette plausible mais inventée serait lue comme un engagement.
   Si MBA veut ces questions-là, il faut ses chiffres d'abord. */
const QUESTIONS = [
  {
    q: "Quels types de chantiers réalisez-vous ?",
    a:
      "De la pose d’un appareil isolé à la salle de bain complète, du remplacement " +
      "d’une chaudière au passage à la pompe à chaleur. Notre spécialité, c’est le " +
      "haut de gamme et les finitions soignées : villas, régies immobilières et " +
      "immeubles d’entreprises.",
  },
  {
    q: "Travaillez-vous avec les régies immobilières ?",
    a:
      "Oui, c’est une part importante de notre activité. Nous sommes habitués aux " +
      "suivis de régie : coordination des accès, intervention en logement occupé, " +
      "et un interlocuteur unique du premier relevé à la réception du chantier.",
  },
  {
    q: "Intervenez-vous après l’installation, en cas de panne ?",
    a:
      "Oui. Nous ne nous arrêtons pas à la pose : fuite, engorgement, panne de " +
      "production d’eau chaude, nous revenons sur les installations que nous avons " +
      "posées comme sur celles que nous reprenons.",
  },
  {
    q: "Proposez-vous des contrats d’entretien ?",
    a:
      "Oui, pour les régies immobilières comme pour les propriétaires. L’entretien " +
      "régulier d’une installation sanitaire ou de chauffage coûte bien moins cher " +
      "que la panne qu’il évite, et nous connaissons alors déjà les lieux quand il " +
      "faut intervenir vite.",
  },
  {
    q: "Depuis combien de temps exercez-vous ?",
    a:
      "Notre équipe a plus de vingt ans de métier. C’est ce qui nous permet de " +
      "prendre des chantiers ambitieux et d’intervenir sur des installations très " +
      "différentes les unes des autres.",
  },
  {
    q: "Comment se passe une première prise de contact ?",
    a:
      "Par téléphone ou par le formulaire, comme vous préférez. Nous convenons " +
      "ensuite d’une visite sur place : c’est le seul moyen de prendre les mesures, " +
      "de voir l’existant et de vous proposer quelque chose de juste.",
  },
];

/* La zone d'intervention avait sa propre section ; elle a été retirée et
   repasse ici, en tête de FAQ. Elle y est mieux : c'est une question que
   les gens posent, et une réponse rédigée pèse plus, pour un moteur,
   qu'une liste de communes détachée. Contenu dicté par MBA. */
export const ZONE = {
  q: "Quelles sont vos zones d’intervention ?",
  a:
    "Nous intervenons avant tout au centre du canton de Genève : la Ville de Genève, " +
    "Carouge, Lancy, Onex, Vernier, Chêne-Bougeries, Thônex et Plan-les-Ouates. " +
    "C’est là que nous sommes le plus rapides à nous déplacer, aussi bien pour une " +
    "installation complète que pour un dépannage. " +
    "Nous nous déplaçons aussi sans difficulté plus loin dans le canton — Meyrin, " +
    "Versoix, Bernex, Veyrier, Collonge-Bellerive, Satigny, Bellevue ou " +
    "Perly-Certoux : n’hésitez pas à nous appeler même si votre commune n’est pas " +
    "citée ici. " +
    "Enfin, pour les grands chantiers, nous intervenons également dans le canton de " +
    "Vaud.",
};

/** Les sept questions, dans l'ordre d'affichage. Une seule liste pour
 *  l'accueil et les pages de service : deux FAQ qui divergeraient sur les
 *  mêmes questions seraient pires qu'une seule. */
export const FAQ_ITEMS = [ZONE, ...QUESTIONS];

const COMMUNES = [
  "Genève",
  "Carouge",
  "Grand-Lancy",
  "Petit-Lancy",
  "Onex",
  "Vernier",
  "Meyrin",
  "Chêne-Bougeries",
  "Thônex",
  "Plan-les-Ouates",
];

const service = (needs: { title: string; body: string }[]): ServiceDetail => ({
  needs,
  included: [
    "Déplacement et prise de mesures",
    "Fourniture du matériel",
    "Pose et raccordement",
    "Mise en service",
    "Évacuation des déchets de chantier",
  ],
  excluded: [
    "Travaux de maçonnerie",
    "Carrelage et finitions",
    "Électricité hors raccordement",
  ],
  /* Vide : une qualification est une affirmation vérifiable, elle ne
     s\u2019invente pas. À remplir avec les vraies (CFC, agréments,
     assurances, partenariats fabricants…). */
  qualifications: [],
  steps: ETAPES,
  pricing: {
    /* Aucun chiffre inventé : la page affiche « à définir ». */
    tarif: "",
    note: "Chaque installation est différente : le prix se fixe après la visite.",
    factors: FACTEURS,
  },
  area: { communes: COMMUNES, note: ZONE.a },
  faq: FAQ_ITEMS,
});

export const SERVICES: PageContent[] = [
  {
    href: "/services/sanitaire-salles-de-bain",
    title: "Sanitaire & salles de bain",
    image: "/realisation-salle-de-bain.jpg",
    alt: "Salle de bain réalisée par MBA Sanit",
    lede: "Installation sanitaire et rénovation de salles de bain à Genève : alimentation, évacuation, appareils et robinetterie, posés avec un soin particulier pour les finitions.",
    cue: "Demander un devis",
    cueHref: "/devis",
    kicker: "Suisse romande",
    display: "Genève, Carouge, Grand-Lancy et tout le canton",
    displaySmall: true,
    manifesto: manifesto(
      "De la pose d’un sanitaire à la salle de bain complète.",
      "Salle de bain, salle d’eau, WC ou cuisine : nous prenons en charge l’installation sanitaire de A à Z — alimentation en eau, évacuations, pose des appareils et de la robinetterie — pour les villas, les appartements et les immeubles de Genève et de Suisse romande.",
      "votre salle de bain",
    ),
    relatedRealisations: { category: "sanitaire-salles-de-bain", label: "sanitaire" },
    service: service([
      {
        title: "Rénovation complète d’une salle de bain",
        body: "Dépose de l’ancienne installation, reprise des alimentations et des évacuations, pose de la douche ou de la baignoire, du meuble vasque, du WC et de la robinetterie. Nous coordonnons les autres métiers pour vous livrer une pièce finie.",
      },
      {
        title: "Remplacement d’un appareil sanitaire",
        body: "WC suspendu, lavabo, receveur de douche, mitigeur ou chauffe-eau : nous remplaçons un seul élément proprement, en l’adaptant aux raccordements existants et sans toucher au reste de la pièce.",
      },
      {
        title: "Installation vétuste ou fuite",
        body: "Tuyauterie ancienne, pression faible, traces d’humidité ou fuite déclarée : nous localisons l’origine, réparons ce qui doit l’être et vous conseillons sur ce qu’il vaut mieux remplacer avant la prochaine panne.",
      },
    ]),
  },
  {
    href: "/services/chauffage-pompes-a-chaleur",
    title: "Chauffage & pompes à chaleur",
    image: "/realisation-chaufferie.jpg",
    alt: "Chaufferie installée par MBA Sanit",
    lede: "Chauffage et pompes à chaleur à Genève et en Suisse romande : remplacement de chaudière, passage à la pompe à chaleur, production d’eau chaude, distribution et radiateurs.",
    cue: "Demander un devis",
    cueHref: "/devis",
    kicker: "Suisse romande",
    display: "Genève, Carouge, Grand-Lancy et tout le canton",
    displaySmall: true,
    manifesto: manifesto(
      "Du remplacement d’une chaudière à la pompe à chaleur.",
      "Nous étudions votre installation de chauffage existante avant de proposer une solution : remplacement de la chaudière, passage à une pompe à chaleur, modernisation de la chaufferie ou de la distribution. Pour les villas comme pour les immeubles gérés par une régie.",
      "votre chauffage",
    ),
    relatedRealisations: { category: "chauffage-pompes-a-chaleur", label: "chauffage" },
    service: service([
      {
        title: "Remplacement d’une chaudière",
        body: "Chaudière en fin de vie, pannes à répétition ou consommation trop élevée : nous dimensionnons le nouvel équipement, déposons l’ancien et remettons l’installation en service en limitant la coupure de chauffage.",
      },
      {
        title: "Passage à la pompe à chaleur",
        body: "Remplacer le mazout ou le gaz par une pompe à chaleur demande d’examiner le bâtiment, les émetteurs et la production d’eau chaude. Nous vous aidons à choisir une solution adaptée, puis nous l’installons et la mettons en service.",
      },
      {
        title: "Distribution et radiateurs",
        body: "Radiateurs froids, circuits déséquilibrés, vannes bloquées : nous remplaçons les radiateurs, reprenons les conduites et équilibrons le réseau pour une chaleur homogène dans toutes les pièces.",
      },
    ]),
  },
  {
    href: "/services/entretien-depannage",
    title: "Entretien & dépannage",
    image: "/realisation-salle-deau.jpg",
    alt: "Salle d’eau réalisée par MBA Sanit",
    lede: "Entretien et dépannage sanitaire et chauffage à Genève : fuites, engorgements, pannes d’eau chaude, et contrats d’entretien pour les régies immobilières et les propriétaires.",
    cue: "Nous appeler",
    cueHref: PHONE_HREF,
    kicker: "Suisse romande",
    display: "Genève, Carouge, Grand-Lancy et tout le canton",
    displaySmall: true,
    manifesto: manifesto(
      "De l’entretien courant au dépannage.",
      "Une installation bien entretenue tombe moins souvent en panne et dure plus longtemps. Nous assurons l’entretien régulier de vos équipements sanitaires et de chauffage, et nous intervenons en dépannage à Genève et alentour, sur nos installations comme sur celles que nous reprenons.",
      "votre intervention",
    ),
    relatedRealisations: { category: "douches-amenagements-exterieurs", label: "extérieurs" },
    service: service([
      {
        title: "Entretien périodique",
        body: "Contrôle de la production de chaleur et d’eau chaude, détartrage, vérification des organes de sécurité et de la robinetterie. Des contrats d’entretien sont proposés aux régies immobilières et aux propriétaires de villas.",
      },
      {
        title: "Panne ou fuite",
        body: "Plus d’eau chaude, chauffage à l’arrêt, fuite ou canalisation bouchée : appelez-nous, nous établissons le diagnostic sur place et remettons l’installation en état de fonctionner.",
      },
      {
        title: "Petites réparations",
        body: "Chasse d’eau qui coule, robinet qui goutte, siphon à changer, mitigeur à remplacer : les petites interventions comptent aussi, et elles évitent souvent une réparation plus lourde.",
      },
    ]),
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
    lede: "Salles de bain et salles d’eau réalisées par MBA Sanit à Genève et en Suisse romande : rénovations complètes et installations sanitaires sur mesure.",
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
    lede: "Chaufferies et pompes à chaleur installées par MBA Sanit : production de chaleur, eau chaude sanitaire et distribution, à Genève et en Suisse romande.",
    cue: "Voir les réalisations",
    kicker: "Suisse romande",
    display: "Production",
    headline: "Chaufferies et pompes à chaleur.",
    tab: "Chauffage",
  },
  {
    /* MBA ne construit pas de bassins : douches extérieures, fontaines et
       aménagements. L'ancienne catégorie et son slug ont été renommés. */
    href: "/realisations/douches-amenagements-exterieurs",
    title: "Douches et aménagements extérieurs",
    image: "/realisation-douche-exterieure-1.jpg",
    alt: "Douche extérieure en pierre réalisée par MBA Sanit",
    lede: "Douches extérieures, fontaines et aménagements de jardin réalisés par MBA Sanit à Genève et en Suisse romande.",
    cue: "Voir les réalisations",
    kicker: "Suisse romande",
    display: "Extérieur",
    headline: "Douches, fontaines et aménagements extérieurs.",
    tab: "Extérieurs",
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


/* Fiches projet. Les textes décrivent ce que montrent les photos et le
   travail que ce type de chantier demande ; ni l'année ni la commune ne
   sont affirmées — MBA ne les a pas données. L'« Année » et le « Lieu »
   « À définir » ont été retirés de la fiche : ils faisaient site pas fini.
   À ajouter projet par projet dès que MBA les fournit. */
const meta = (categorie: string, prestations: string) => [
  { label: "Catégorie", value: categorie },
  { label: "Zone", value: "Genève et Suisse romande" },
  { label: "Prestations", value: prestations },
];

/* --- Les réalisations, rangées par catégorie ---------------------- */

/**
 * Photos client (1536 × 1024, 3:2). Le `href` est imbriqué sous sa
 * catégorie : c'est ce qui évite que catégories et réalisations se
 * disputent le même segment d'URL.
 *
 * NB : les deux entrées de bassin ont été SUPPRIMÉES — ce n'est pas le
 * métier de MBA. Les deux douches extérieures restantes sont bien deux
 * chantiers différents (l'une en pierre au bord d'un lac, l'autre en bois
 * sous la pluie) : chacune a son titre et sa page, ce ne sont plus des
 * doublons. Les titres décrivent ce qu'on VOIT sur la photo — à remplacer
 * par les vrais intitulés dès que MBA les donne.
 *
 * Il manque une réalisation de FONTAINE : MBA en fait, aucune photo n'a
 * été fournie.
 */
export const REALISATIONS: Realisation[] = [
  {
    category: "sanitaire-salles-de-bain",
    href: "/realisations/sanitaire-salles-de-bain/salle-de-bain",
    title: "Salle de bain",
    image: "/realisation-salle-de-bain.jpg",
    alt: "Salle de bain réalisée par MBA Sanit",
    lede: "Une salle de bain au carrelage vert profond, meuble vasque en bois et miroir encastré : une rénovation complète pensée jusqu’aux finitions.",
    /* Pas de repère sur une fiche projet : « Réalisation suivante »
       annonçait un lien qui n’existe pas ici. */
    cue: "",
    kicker: "Suisse romande",
    display: "Sur mesure",
    /* Ligne normale (15 px) : sur une fiche projet, l’affiche géante
       écrasait le nom du projet juste à côté. */
    displaySmall: true,
 
    lieu: "Suisse romande",
    body: [
      "Cette salle de bain a été entièrement repensée : dépose de l’ancienne installation, reprise des alimentations et des évacuations, puis pose d’un meuble vasque suspendu en bois, d’un WC et de la robinetterie. Le carrelage vert profond et le bois clair donnent à la pièce une atmosphère chaleureuse.",
      "Sur ce type de rénovation, tout se joue dans les détails : alignement des appareils sur le calepinage du carrelage, raccordements invisibles, niches et miroir intégrés. C’est ce soin des finitions que nos clients viennent chercher, qu’il s’agisse d’une villa ou d’un appartement en immeuble.",
    ],
    meta: meta("Sanitaire & salles de bain", "Rénovation complète, alimentation et évacuation, pose des appareils et de la robinetterie"),
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
    lede: "Une salle d’eau avec douche à l’italienne vitrée, faïence bleue et sol en terrazzo : des lignes nettes et un entretien facile.",
    /* Pas de repère sur une fiche projet : « Réalisation suivante »
       annonçait un lien qui n’existe pas ici. */
    cue: "",
    kicker: "Suisse romande",
    display: "Aménagement",
    /* Ligne normale (15 px) : sur une fiche projet, l’affiche géante
       écrasait le nom du projet juste à côté. */
    displaySmall: true,
 
    lieu: "Suisse romande",
    body: [
      "La douche à l’italienne occupe toute la largeur de la pièce : receveur de plain-pied, caniveau d’évacuation linéaire, paroi vitrée fixe et colonne de douche avec pomme de tête. Une niche carrelée intégrée à la paroi évite tout accessoire rapporté.",
      "Le WC suspendu, avec son bâti-support caché dans le coffrage, libère le sol et simplifie le nettoyage. Faïence bleue posée à la verticale et terrazzo au sol : une salle d’eau sobre, pensée pour durer.",
    ],
    meta: meta("Sanitaire & salles de bain", "Douche à l’italienne, évacuation linéaire, WC suspendu, robinetterie"),
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
    lede: "Une chaufferie moderne avec pompe à chaleur, ballon d’eau chaude et distribution entièrement reprise.",
    /* Pas de repère sur une fiche projet : « Réalisation suivante »
       annonçait un lien qui n’existe pas ici. */
    cue: "",
    kicker: "Suisse romande",
    display: "Production",
    /* Ligne normale (15 px) : sur une fiche projet, l’affiche géante
       écrasait le nom du projet juste à côté. */
    displaySmall: true,
 
    lieu: "Suisse romande",
    body: [
      "Dans cette chaufferie, la production de chaleur a été renouvelée autour d’une pompe à chaleur, associée à un ballon pour l’eau chaude sanitaire. Les conduites isolées, les vannes et les circulateurs ont été reposés de façon lisible, pour faciliter l’entretien.",
      "Une chaufferie bien organisée se contrôle rapidement et se dépanne plus vite. C’est aussi ce qui permet d’assurer ensuite un entretien régulier, dans les villas comme dans les immeubles gérés par une régie.",
    ],
    meta: meta("Chauffage & pompes à chaleur", "Pompe à chaleur, production d’eau chaude, distribution et mise en service"),
    gallery: [
      { src: "/realisation-chaufferie.jpg", alt: "Chaufferie installée par MBA Sanit" },
    ],
  },
  {
    category: "douches-amenagements-exterieurs",
    href: "/realisations/douches-amenagements-exterieurs/douche-exterieure-pierre",
    title: "Douche extérieure en pierre",
    image: "/realisation-douche-exterieure-1.jpg",
    alt: "Douche extérieure en pierre réalisée par MBA Sanit",
    lede: "Une douche extérieure en pierre naturelle et inox, intégrée au jardin : alimentation et évacuation pensées pour durer dehors.",
    /* Pas de repère sur une fiche projet : « Réalisation suivante »
       annonçait un lien qui n’existe pas ici. */
    cue: "",
    kicker: "Suisse romande",
    display: "Extérieur",
    /* Ligne normale (15 px) : sur une fiche projet, l’affiche géante
       écrasait le nom du projet juste à côté. */
    displaySmall: true,
 
    lieu: "Suisse romande",
    body: [
      "Une colonne de douche en inox se détache d’une paroi en pierre naturelle, sur un sol dallé équipé d’un caniveau d’évacuation. L’alimentation en eau et les raccordements sont conçus pour résister aux intempéries et au gel, avec une vidange prévue pour l’hiver.",
      "Douches de jardin, fontaines et points d’eau extérieurs demandent les mêmes exigences qu’une salle de bain, avec en plus les contraintes du dehors : pente, drainage, matériaux et protection des conduites.",
    ],
    meta: meta("Douches et aménagements extérieurs", "Douche extérieure, alimentation eau chaude et froide, évacuation, mise hors gel"),
    gallery: [
      { src: "/realisation-douche-exterieure-1.jpg", alt: "Douche extérieure en pierre réalisée par MBA Sanit" },
      { src: "/realisation-douche-exterieure-2.jpg", alt: "Douche extérieure en bois réalisée par MBA Sanit" },
    ],
  },
  {
    category: "douches-amenagements-exterieurs",
    href: "/realisations/douches-amenagements-exterieurs/douche-exterieure-bois",
    title: "Douche extérieure en bois",
    image: "/realisation-douche-exterieure-2.jpg",
    alt: "Douche extérieure en bois réalisée par MBA Sanit",
    lede: "Une douche extérieure habillée de bois, pour profiter du jardin : un aménagement simple, robuste et facile à entretenir.",
    /* Pas de repère sur une fiche projet : « Réalisation suivante »
       annonçait un lien qui n’existe pas ici. */
    cue: "",
    kicker: "Suisse romande",
    display: "Extérieur",
    /* Ligne normale (15 px) : sur une fiche projet, l’affiche géante
       écrasait le nom du projet juste à côté. */
    displaySmall: true,
 
    lieu: "Suisse romande",
    body: [
      "Cette douche extérieure associe une paroi en bois brut à une colonne de douche en inox, sur un receveur en pierre sombre. Les raccordements sont dissimulés derrière la paroi et l’eau est évacuée proprement, sans détremper le jardin autour.",
      "Nous réalisons ce type d’aménagement pour les jardins et les terrasses de villas à Genève et en Suisse romande, avec une attention particulière à l’hivernage de l’installation.",
    ],
    meta: meta("Douches et aménagements extérieurs", "Douche extérieure, raccordements, évacuation, mise hors gel"),
    gallery: [
      { src: "/realisation-douche-exterieure-1.jpg", alt: "Douche extérieure en pierre réalisée par MBA Sanit" },
      { src: "/realisation-douche-exterieure-2.jpg", alt: "Douche extérieure en bois réalisée par MBA Sanit" },
    ],
  },
];

/** Pages dont l'ouverture est une BANNIÈRE basse, et non une photo plein
 *  écran : les fiches projet. La photo y est déjà reprise juste en
 *  dessous, dans la galerie — la montrer en grand une première fois ne
 *  servait qu'à retarder la lecture. Déclaré ici pour que le calque de
 *  transition (qui rend le même composant) tombe au même endroit. */
export const HERO_COURT: ReadonlySet<string> = new Set(
  REALISATIONS.map((r) => r.href),
);

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
/** Pages sans ouverture (PageIntro) : leur contenu commence directement
 *  en haut. Le calque de transition ne doit donc PAS y faire apparaître
 *  un titre — il ne trouverait rien en face au raccord. Il se contente du
 *  balayage, sur le fond de la page d'arrivée. */
export const NO_INTRO = new Set<string>(["/devis"]);

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
