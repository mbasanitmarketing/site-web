/**
 * Guides pratiques de MBA Sanit.
 *
 * Source unique : la liste (/guides), chaque article (/guides/<slug>), le
 * plan du site et les données structurées lisent d'ici.
 *
 * RÈGLES D'ÉCRITURE
 * - Uniquement des repères généraux et de la prudence : jamais de prix,
 *   de délai ni de garantie qui ne soient pas validés par Fred.
 * - Aucune anecdote inventée (« la semaine dernière, chez un client… »).
 *   Un guide gagne à contenir de vrais cas : Fred peut en ajouter.
 * - Chaque guide est relu par un professionnel de MBA avant publication.
 *
 * Dans un paragraphe, `[texte](/chemin)` produit un lien.
 */

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  /** Gestes à éviter (croix). */
  | { type: "dont"; items: string[] }
  /** Cas urgents (cartes numérotées). */
  | { type: "cards"; items: string[] }
  /** À préparer (coches). */
  | { type: "checklist"; items: string[] }
  | { type: "h3"; text: string }
  | { type: "note"; label: string; text: string };

export type Guide = {
  slug: string;
  /** H1 de l'article. */
  title: string;
  /** Titre et description pour les moteurs de recherche. */
  seoTitle: string;
  description: string;
  /** Chapô sous le titre. */
  lede: string;
  /** « À retenir » : trois phrases, pour qui n'a pas le temps de tout lire. */
  summary: string[];
  /** Dates ISO. `updated` change à chaque relecture de fond. */
  date: string;
  updated: string;
  minutes: number;
  image: string;
  imageAlt: string;
  sections: { heading: string; blocks: GuideBlock[] }[];
};

export const GUIDES: Guide[] = [
  {
    slug: "plus-d-eau-chaude",
    title: "Plus d’eau chaude : que faire avant d’appeler ?",
    seoTitle: "Plus d’eau chaude : que faire avant d’appeler ? | MBA Sanit",
    description:
      "Plus d’eau chaude chez vous ? Les vérifications à faire soi-même, ce qu’il ne faut surtout pas faire, et quand appeler un dépanneur à Genève.",
    lede: "Vous ouvrez le robinet, l’eau reste froide. Avant de vous inquiéter, quelques vérifications prennent cinq minutes et règlent parfois le problème. Voici dans quel ordre les faire, ce qu’il vaut mieux ne pas toucher, et à quel moment il est temps de nous appeler.",
    summary: [
      "Un seul robinet sans eau chaude : pensez d’abord au mitigeur. Partout : c’est la production d’eau chaude.",
      "Boiler : le disjoncteur se remet une seule fois. S’il saute encore, n’insistez pas.",
      "Fuite visible ou odeur de brûlé : n’attendez pas. Odeur de gaz : sortez d’abord, puis appelez le 118.",
    ],
    date: "2026-10-07",
    updated: "2026-10-07",
    minutes: 5,
    image: "/realisation-chaufferie.jpg",
    imageAlt:
      "Chaufferie avec pompe à chaleur, ballon d’eau chaude et conduites isolées",
    sections: [
      {
        heading: "D’abord, comprendre ce qui manque",
        blocks: [
          {
            type: "p",
            text: "Deux questions simples, et on sait déjà dans quelle direction chercher.",
          },
          {
            type: "p",
            text: "L’eau chaude manque-t-elle à un seul endroit, par exemple à la douche, alors que le lavabo de la cuisine va bien ? Dans ce cas, le souci vient en général du mitigeur ou de sa cartouche, pas de la production d’eau chaude. Si elle manque partout, c’est la production qui est en cause.",
          },
          {
            type: "p",
            text: "Et l’eau froide, elle coule normalement ? Si non, ce n’est plus une affaire d’eau chaude : regardez plutôt du côté d’une coupure d’eau ou d’une vanne fermée.",
          },
        ],
      },
      {
        heading: "Selon votre installation, ce que vous pouvez vérifier",
        blocks: [
          { type: "h3", text: "Chauffe-eau électrique (le boiler)" },
          {
            type: "p",
            text: "Allez voir le tableau électrique. Le disjoncteur ou le fusible du boiler a-t-il sauté ? Vous pouvez le remettre une fois. S’il saute de nouveau, n’insistez pas : il y a une raison, souvent une résistance en défaut ou une fuite, et recommencer ne fait qu’aggraver les choses.",
          },
          {
            type: "p",
            text: "Autre piège : beaucoup de boilers chauffent surtout la nuit, au tarif réduit. Après plusieurs douches de suite, se retrouver sans eau chaude le soir peut être normal. Il faut alors attendre la prochaine chauffe.",
          },
          { type: "h3", text: "Chaudière ou pompe à chaleur avec ballon" },
          {
            type: "ul",
            items: [
              "Regardez l’écran de l’appareil. Un code d’erreur s’affiche ? Notez-le ou prenez-le en photo : c’est l’information la plus utile pour un dépanneur.",
              "Chaudière à mazout : vérifiez le niveau de la cuve. Une cuve vide arrive plus souvent qu’on ne l’imagine.",
              "Jetez un œil au manomètre du circuit de chauffage. Si l’aiguille est tombée très bas, l’appareil peut se mettre en sécurité. Ne remplissez pas le circuit si vous ne savez pas comment faire : un mauvais geste crée plus de problèmes qu’il n’en règle.",
              "Regardez la température réglée sur le ballon. L’eau chaude sanitaire est en général stockée autour de 60 °C, pour limiter le risque de légionelles. Évitez de la baisser pour économiser, et ne la montez pas non plus : au robinet, le risque de brûlure augmente.",
            ],
          },
          { type: "h3", text: "Une eau seulement tiède" },
          {
            type: "p",
            text: "Une eau jamais vraiment chaude vient souvent d’un mitigeur thermostatique entartré, ou d’un ballon qui n’atteint plus sa température. Dans les deux cas, cela se diagnostique sur place : inutile de démonter quoi que ce soit en attendant.",
          },
        ],
      },
      {
        heading: "Ce qu’il vaut mieux ne pas faire",
        blocks: [
          {
            type: "dont",
            items: [
              "Ouvrir le capot d’un chauffe-eau resté sous tension.",
              "Démonter ou bloquer le groupe de sécurité, la petite soupape sur l’arrivée d’eau froide. Qu’il goutte un peu pendant la chauffe est normal ; qu’il coule en continu ne l’est pas.",
              "Vidanger un boiler électrique sans avoir coupé le courant : la résistance peut griller à vide.",
              "Court-circuiter un thermostat ou un dispositif de sécurité pour « faire repartir » l’appareil.",
            ],
          },
          {
            type: "note",
            label: "Sécurité",
            text: "Odeur de gaz : n’allumez rien, n’actionnez aucun interrupteur, ouvrez les fenêtres, sortez, puis appelez les pompiers (118) ou le service de dépannage de votre fournisseur de gaz.",
          },
        ],
      },
      {
        heading: "Quand appeler sans attendre",
        blocks: [
          {
            type: "cards",
            items: [
              "Une fuite visible autour du chauffe-eau ou de la chaudière. Si vous pouvez le faire sans danger, coupez l’alimentation électrique de l’appareil et fermez l’arrivée d’eau froide.",
              "Une odeur de brûlé.",
              "Un disjoncteur qui saute à répétition.",
              "Des bruits inhabituels : claquements, sifflements.",
              "Une eau trouble ou rougeâtre.",
              "Le même code d’erreur qui revient après chaque remise en route.",
            ],
          },
          {
            type: "p",
            text: "Si vous êtes locataire, prévenez aussi votre régie ou votre propriétaire : en principe, un défaut doit leur être signalé, et c’est souvent eux qui décident de l’intervention. Nous travaillons régulièrement avec des régies immobilières. Si vous nous appelez directement, précisez simplement qui réglera la facture, cela évite les malentendus.",
          },
        ],
      },
      {
        heading: "Ce qu’on vous demandera au téléphone",
        blocks: [
          {
            type: "p",
            text: "Un peu de préparation fait gagner du temps à tout le monde :",
          },
          {
            type: "checklist",
            items: [
              "Le type d’appareil : chauffe-eau électrique, chaudière à mazout ou à gaz, pompe à chaleur. Sa marque et son âge approximatif, si vous les connaissez.",
              "Depuis quand c’est arrivé, et si c’était d’un coup ou petit à petit.",
              "Le code d’erreur affiché, s’il y en a un.",
              "Ce que vous avez déjà essayé, par exemple remettre le disjoncteur.",
              "Où se trouve l’appareil et comment y accéder : clé de la cave, code de la porte, voisin présent ou non.",
            ],
          },
          {
            type: "p",
            text: "Rien de tout cela n’est obligatoire. Si vous ne savez pas, dites-le simplement : on regardera sur place.",
          },
        ],
      },
      {
        heading: "Comment nous intervenons",
        blocks: [
          {
            type: "p",
            text: "Nous venons sur place, nous établissons le diagnostic et nous remettons la production d’eau chaude en état de fonctionner, sur nos installations comme sur celles que nous reprenons. Nous intervenons à Genève et dans les communes alentour, du lundi au vendredi, de 7 h à 17 h.",
          },
        ],
      },
      {
        heading: "Éviter que ça recommence",
        blocks: [
          {
            type: "p",
            text: "Une panne d’eau chaude se prépare souvent des mois à l’avance : tartre qui s’accumule, organes de sécurité qui fatiguent, réglages qui dérivent. Un entretien régulier (détartrage, contrôle de la production de chaleur et d’eau chaude, vérification des organes de sécurité) revient en général moins cher qu’un dépannage. Nous proposons des [contrats d’entretien](/services/entretien-depannage) aux régies immobilières et aux propriétaires de villas.",
          },
          {
            type: "p",
            text: "Ce guide donne des repères généraux. Chaque installation est différente : en cas de doute, ne bricolez pas et appelez-nous.",
          },
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/** Identifiant d'ancre d'une section (sommaire, liens directs). */
export function idOf(heading: string): string {
  return heading
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Typographie française : espace insécable avant « : ; ? ! » et à
 *  l'intérieur des guillemets, pour qu'un signe ne tombe jamais seul en
 *  début de ligne. */
export function typo(s: string): string {
  return s
    .replace(/ ([:;?!»])/g, "\u00a0$1")
    .replace(/(«) /g, "$1\u00a0");
}
