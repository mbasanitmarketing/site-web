import { draftMode } from "next/headers";
import { ADRESSE, EMAIL, HORAIRES, PHONE_LABEL } from "./contact";
import { EQUIPE, FAQ_ITEMS, VALEURS } from "./pages";

/**
 * Contenu modifiable depuis l'espace client de l'Atelier Web Romand
 * (atelierwebromand.ch/espace-client/mba-sanit), pour ce site.
 *
 * Le principe : les valeurs de src/lib/contact.ts restent les valeurs PAR
 * DÉFAUT (le site continue de fonctionner à l'identique si l'agence est
 * injoignable, ou tant que rien n'a été modifié) ; ce module va chercher les
 * valeurs éventuellement modifiées et publiées, et les substitue.
 *
 * Deux jeux de variables d'environnement (à définir sur le projet Vercel de
 * CE site, pas sur celui de l'agence) :
 *   CMS_CONTENT_URL     https://atelierwebromand.ch/api/sites/mba-sanit/content
 *   CMS_PREVIEW_SECRET  jeton affiché sur la fiche de ce site dans l'admin
 *                        de l'agence — permet de voir le BROUILLON en
 *                        aperçu (Draft Mode), sans lui le site ne lit que le
 *                        contenu PUBLIÉ.
 * Sans ces variables, getContactContent() renvoie simplement les valeurs de
 * contact.ts : le site fonctionne, seulement pas encore éditable.
 */

type TextOverride = { fr?: string; en?: string };
type CollectionOverride = Record<string, string>[];
type Overrides = Record<string, TextOverride | { url: string; alt?: string } | CollectionOverride | undefined>;

async function fetchOverrides(): Promise<Overrides> {
  const url = process.env.CMS_CONTENT_URL;
  if (!url) return {};

  const { isEnabled: preview } = await draftMode();
  const secret = process.env.CMS_PREVIEW_SECRET;

  try {
    const res = await fetch(url, {
      headers: preview && secret ? { Authorization: `Bearer ${secret}` } : undefined,
      // Aperçu : jamais de cache, on veut le tout dernier brouillon tapé.
      // Publié : revalidation courte, comme le reste du dispositif CMS.
      ...(preview ? { cache: "no-store" as const } : { next: { revalidate: 15 } }),
    });
    if (!res.ok) return {};
    const data = (await res.json()) as { content?: Overrides };
    return data.content ?? {};
  } catch {
    // L'agence est injoignable : le site continue avec ses valeurs par
    // défaut plutôt que de planter une page entière pour un fil de contact.
    return {};
  }
}

function text(overrides: Overrides, key: string, fallback: string): string {
  const value = overrides[key];
  if (value && typeof value === "object" && !Array.isArray(value) && "fr" in value && typeof value.fr === "string" && value.fr.trim()) {
    return value.fr;
  }
  return fallback;
}

/** Élément d'une "collection" (voir docs/CMS-CLIENT.md) : chaîne vide = pas encore saisi, on retombe sur le repli. */
function pick(value: string | undefined, fallback: string): string {
  return value && value.trim() ? value : fallback;
}

function collectionOf(overrides: Overrides, key: string): CollectionOverride | null {
  const value = overrides[key];
  return Array.isArray(value) ? value : null;
}

export type ContactContent = {
  phoneLabel: string;
  phoneHref: string;
  whatsappHref: string;
  email: string;
  street: string;
  city: string;
  hoursDays: string;
  hoursTime: string;
  hoursClosed: string;
};

/** Coordonnées et horaires, valeurs publiées (ou par défaut) fusionnées. Appeler depuis un Server Component. */
export async function getContactContent(): Promise<ContactContent> {
  const overrides = await fetchOverrides();

  const phoneLabel = text(overrides, "contact.phone", PHONE_LABEL);
  const digits = phoneLabel.replace(/\D/g, "");
  // Même règle que contact.ts : indicatif suisse si le numéro commence par un zéro.
  const e164 = phoneLabel.trim().startsWith("+") ? `+${digits}` : digits.startsWith("41") ? `+${digits}` : `+41${digits.replace(/^0/, "")}`;

  return {
    phoneLabel,
    phoneHref: `tel:${e164}`,
    whatsappHref: `https://wa.me/${e164.replace("+", "")}`,
    email: EMAIL,
    street: text(overrides, "contact.street", ADRESSE.rue),
    city: text(overrides, "contact.city", ADRESSE.npaVille),
    hoursDays: text(overrides, "contact.hoursDays", HORAIRES.jours),
    hoursTime: text(overrides, "contact.hoursTime", HORAIRES.heures),
    hoursClosed: text(overrides, "contact.hoursClosed", HORAIRES.fermeture),
  };
}

export type HeroContent = { title: string; subtitle: string; cta: string };

/** Titre, sous-titre et bouton du hero de la page d'accueil. */
export async function getHeroContent(): Promise<HeroContent> {
  const overrides = await fetchOverrides();
  return {
    title: text(overrides, "hero.title", "Installations sanitaires"),
    subtitle: text(overrides, "hero.subtitle", "& salles de bain en Suisse romande"),
    cta: text(overrides, "hero.cta", "Demander un devis"),
  };
}

export type ValeurItem = { title: string; body: string };

/** Les trois arguments de réassurance (page d'accueil et page équipe). */
export async function getValeurs(): Promise<ValeurItem[]> {
  const overrides = await fetchOverrides();
  const items = collectionOf(overrides, "valeurs");
  if (!items) return VALEURS;
  return items.map((item, i) => ({
    title: pick(item.title, VALEURS[i]?.title ?? ""),
    body: pick(item.body, VALEURS[i]?.body ?? ""),
  }));
}

export type EquipeItem = { photo: string; nom: string; role: string; texte: string };

/**
 * Les trois portraits de l'équipe. La photo reste celle du fichier d'origine
 * (voir EQUIPE dans pages.ts) : elle n'est pas modifiable depuis l'espace
 * client (pas d'envoi de photo par élément de collection pour l'instant), un
 * effectif à taille fixe côté manifeste CMS le garantit.
 */
export async function getEquipe(): Promise<EquipeItem[]> {
  const overrides = await fetchOverrides();
  const items = collectionOf(overrides, "equipe");
  return EQUIPE.map((person, i) => ({
    photo: person.photo,
    nom: pick(items?.[i]?.nom, person.nom ?? ""),
    role: pick(items?.[i]?.role, person.role ?? ""),
    texte: pick(items?.[i]?.texte, person.texte ?? ""),
  }));
}

export type FaqOverrideItem = { q: string; a: string };

/** Questions fréquentes, partagées par la page d'accueil et les trois pages de prestation. */
export async function getFaqItems(): Promise<FaqOverrideItem[]> {
  const overrides = await fetchOverrides();
  const items = collectionOf(overrides, "faq");
  if (!items || items.length === 0) return FAQ_ITEMS;
  return items.map((item, i) => ({
    q: pick(item.q, FAQ_ITEMS[i]?.q ?? ""),
    a: pick(item.a, FAQ_ITEMS[i]?.a ?? ""),
  }));
}

export type ServiceOverride = { headline: string; intro: string; needs: { title: string; body: string }[] };

/**
 * Présentation et besoins d'une page de service (`slug` = segment d'URL,
 * ex. "sanitaire-salles-de-bain" — identique au préfixe de clé du manifeste
 * CMS `services.<slug>.*`). `fallback` : valeurs d'origine de pages.ts.
 */
export async function getServiceOverride(
  slug: string,
  fallback: ServiceOverride,
): Promise<ServiceOverride> {
  const overrides = await fetchOverrides();
  const prefix = `services.${slug}.`;
  const needsOverride = collectionOf(overrides, `${prefix}needs`);
  return {
    headline: text(overrides, `${prefix}headline`, fallback.headline),
    intro: text(overrides, `${prefix}intro`, fallback.intro),
    needs: needsOverride
      ? needsOverride.map((item, i) => ({
          title: pick(item.title, fallback.needs[i]?.title ?? ""),
          body: pick(item.body, fallback.needs[i]?.body ?? ""),
        }))
      : fallback.needs,
  };
}
