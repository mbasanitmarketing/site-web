import Image from "next/image";
import styles from "./CallFred.module.css";

/** Même numéro que le bouton d'appel flottant. */
const PHONE_HREF = "tel:+41782172928";
const PHONE_LABEL = "+41 78 217 29 28";

/**
 * « Appeler Fred » — barre flottante, MOBILE UNIQUEMENT, posée à gauche
 * du bouton d'appel (d'après la maquette envoyée : un bandeau translucide
 * avec le texte, puis le portrait collé au bout, à la hauteur des boutons
 * carrés).
 *
 * Seul cet élément-là est repris de la maquette : les carrés « mail » et
 * « téléphone » existent déjà sur le site (CallButton), les redoubler
 * n'aurait fait qu'encombrer le bas de l'écran.
 *
 * Le portrait est découpé dans la photo d'équipe (public/equipe.jpg,
 * l'homme du milieu) — cf. public/fred.jpg. Une vraie photo de Fred,
 * cadrée pour ça, serait meilleure : celle-ci est un recadrage.
 */
export function CallFred() {
  return (
    <a
      className={styles.fred}
      href={PHONE_HREF}
      aria-label={`Appeler Fred au ${PHONE_LABEL}`}
    >
      <span className={styles.text}>Appeler Fred</span>
      {/* alt vide : le libellé du lien dit déjà tout, la photo n'ajoute
          rien pour qui ne la voit pas. */}
      <Image
        className={styles.photo}
        src="/fred.jpg"
        alt=""
        width={260}
        height={260}
      />
    </a>
  );
}
