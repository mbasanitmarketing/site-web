import styles from "./ServiceSection.module.css";
import { BackdropLines } from "./BackdropLines";

/**
 * Coquille commune à toutes les sections d'une page de service, d'après la
 * maquette : un repère collant dans une colonne étroite à gauche, le
 * contenu à droite. Il n'en reste qu'une poignée : les pages de service
 * ont été allégées (Preuves, Prix, Déroulement, Zone retirées), et les
 * avis comme la FAQ ont depuis leur propre mise en page.
 */
export function ServiceSection({
  label,
  children,
  className = "",
  arc = false,
}: {
  label: string;
  children: React.ReactNode;
  /** Marge basse supplémentaire quand le footer vient mordre dessus. */
  className?: string;
  /** Le grand cercle pâle de BackdropLines : un seul par page, sinon il se
   *  répète et perd son effet (cf. BackdropLines). Aucun des neuf appels
   *  ne l'active par défaut — chaque page-service porte déjà son arc sur
   *  ServiceManifesto ; l'accueil n'en avait aucun, HomeReviews le porte. */
  arc?: boolean;
}) {
  return (
    <section className={`${styles.wrap} ${className}`}>
      <BackdropLines arc={arc} />
      <div className={styles.grid}>
        <p className={styles.label}>{label}</p>
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
