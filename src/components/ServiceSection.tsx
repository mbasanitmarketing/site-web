import styles from "./ServiceSection.module.css";

/**
 * Coquille commune à toutes les sections d'une page de service, d'après la
 * maquette : un repère collant dans une colonne étroite à gauche, le
 * contenu à droite. Sept sections la partagent — d'où l'extraction.
 */
export function ServiceSection({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  /** Marge basse supplémentaire quand le footer vient mordre dessus. */
  className?: string;
}) {
  return (
    <section className={`${styles.wrap} ${className}`}>
      <div className={styles.grid}>
        <p className={styles.label}>{label}</p>
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
