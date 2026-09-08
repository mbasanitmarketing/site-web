import Image from "next/image";
import { REALISATIONS, type Realisation } from "@/lib/pages";
import styles from "./OtherProjects.module.css";

/**
 * « Autres réalisations » en fin de page projet — une grande carte à
 * gauche, deux empilées à droite, comme sur la référence.
 *
 * On prend les suivantes dans l'ordre, en repartant du début : la liste
 * est donc toujours pleine, même sur la dernière réalisation.
 */
export function OtherProjects({ current }: { current: Realisation }) {
  const index = REALISATIONS.findIndex((r) => r.href === current.href);
  const others = [
    ...REALISATIONS.slice(index + 1),
    ...REALISATIONS.slice(0, index),
  ].slice(0, 3);

  if (others.length === 0) return null;

  return (
    <section className={styles.wrap}>
      <h2 className={styles.title}>Autres réalisations</h2>
      <div className={styles.rule} aria-hidden="true" />

      <div className={styles.grid}>
        {others.map((r, i) => (
          <a
            key={r.href}
            className={`${styles.card} ${i === 0 ? styles.lead : ""}`}
            href={r.href}
            data-page-transition
          >
            <Image
              src={r.image}
              alt={r.alt ?? ""}
              fill
              sizes={
                i === 0
                  ? "(max-width: 720px) 100vw, 62vw"
                  : "(max-width: 720px) 100vw, 34vw"
              }
            />
            <span className={styles.scrim} aria-hidden="true" />
            <span className={styles.caption}>
              <span className={styles.name}>{r.title}</span>
              <span className={styles.lieu}>Lieu : {r.lieu}</span>
            </span>
            {i === 0 && (
              <span className={styles.badge} aria-hidden="true">
                Voir le projet
              </span>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
