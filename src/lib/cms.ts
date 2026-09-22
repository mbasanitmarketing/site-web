import { draftMode } from "next/headers";
import { ADRESSE, EMAIL, HORAIRES, PHONE_LABEL } from "./contact";

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
type Overrides = Record<string, TextOverride | { url: string; alt?: string } | undefined>;

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
  if (value && typeof value === "object" && "fr" in value && typeof value.fr === "string" && value.fr.trim()) {
    return value.fr;
  }
  return fallback;
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
