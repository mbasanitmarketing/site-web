import styles from "./CallButton.module.css";

/** Numéro d'appel MBA Sanit. */
const PHONE_HREF = "tel:+41782172928";
const PHONE_LABEL = "+41 78 217 29 28";

/**
 * Bouton d'appel flottant — rond, anneau blanc + combiné, fixe en bas à
 * droite, permanent sur tout le site (cf. maquette « Hero section -
 * allumer le feu »). Léger fond sombre flouté pour rester lisible aussi
 * bien sur les sections claires que sur le navy.
 */
export function CallButton() {
  return (
    <a
      className={styles.call}
      href={PHONE_HREF}
      aria-label={`Appeler le ${PHONE_LABEL}`}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
