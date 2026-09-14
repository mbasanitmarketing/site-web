import styles from "./PrestationSteps.module.css";

/**
 * La bande d'étapes de « La prestation » — d'après
 * « section la prestation.mov » (apc).
 *
 * Purement présentationnel : la piste, l'épinglage et l'écriture de `--p`
 * appartiennent à la section (ServiceManifesto), qui épingle aussi le
 * titre et le chapô. Ici tout dérive de `--p` en CSS, sans re-render.
 *
 * Pas de flèches, pas d'illustration : le scroll est la seule commande, et
 * le texte de l'étape occupe la carte.
 */
export function PrestationSteps({
  steps,
}: {
  steps: { title: string; body: string }[];
}) {
  return (
    <div className={styles.viewport}>
      <div className={styles.rail} style={{ ["--last" as string]: steps.length - 1 }}>
        {steps.map((s, i) => (
          <article key={s.title} className={styles.card} style={{ ["--i" as string]: i }}>
            <span className={styles.badge} aria-hidden="true">
              <span className={styles.num}>{i + 1}</span>
            </span>
            <div className={styles.body}>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.text}>{s.body}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
