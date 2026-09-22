import { getContactContent } from "@/lib/cms";
import styles from "./CallButton.module.css";

/**
 * Bouton flottant WhatsApp — rectangulaire, filet blanc, fixe en bas à
 * droite, permanent sur tout le site (cf. maquette « Hero section -
 * allumer le feu »). Léger fond sombre flouté pour rester lisible aussi
 * bien sur les sections claires que sur le navy.
 *
 * Il ouvrait le composeur téléphonique ; il ouvre maintenant WhatsApp,
 * seul point WhatsApp du site depuis le retrait du bouton « Contact » du
 * pied de page. L'icône change avec lui : garder un combiné pour ouvrir
 * une messagerie aurait promis un appel.
 *
 * Le numéro reste joignable en direct ailleurs — dans le menu et dans la
 * section contact des pages de service.
 *
 * Numéro lu depuis l'espace client (src/lib/cms.ts) : pas de texte visible
 * ici (juste l'icône), donc pas de `data-cms` — l'aperçu en direct ne
 * s'applique qu'au menu et au pied de page, qui affichent le numéro en toutes
 * lettres. Une modification publiée s'y répercute normalement au rechargement.
 */
export async function CallButton() {
  const { phoneLabel, whatsappHref } = await getContactContent();
  return (
    <a
      className={styles.call}
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label={`Écrire sur WhatsApp au ${phoneLabel}`}
    >
      {/* Bulle de message avec un combiné : la forme qu'on reconnaît,
          tracée au filet comme le reste des icônes du site. */}
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20.5 11.7c0 4.4-3.7 8-8.3 8a8.5 8.5 0 0 1-3.9-.95L3.5 20.2l1.5-4.5a7.8 7.8 0 0 1-1.1-4c0-4.42 3.7-8 8.3-8s8.3 3.58 8.3 8z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M9.3 8.3c.25-.05.5 0 .62.22l.72 1.35c.12.22.08.5-.1.67l-.5.5a.4.4 0 0 0-.7.47c.3.6 1.2 1.5 1.8 1.8a.4.4 0 0 0 .47-.07l.5-.5c.17-.18.45-.22.67-.1l1.35.72c.22.12.27.37.22.62-.15.75-.85 1.3-1.62 1.25-2.4-.15-4.75-2.5-4.9-4.9-.05-.77.5-1.47 1.25-1.62z"
          fill="currentColor"
        />
      </svg>
    </a>
  );
}
