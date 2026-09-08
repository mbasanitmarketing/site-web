import Image from "next/image";
import type { PageContent } from "@/lib/pages";
import styles from "./CardGrid.module.css";

/**
 * Grille de vignettes cliquables — sert aux catégories sur /realisations
 * et aux réalisations sur une page de catégorie.
 *
 * Les vignettes portent `data-page-transition` : l'image cliquée est
 * celle de la page d'arrivée (même entrée dans src/lib/pages.ts), donc
 * la transition la balaie sans raccord.
 */
export function CardGrid({
  items,
  cta,
}: {
  items: PageContent[];
  cta: string;
}) {
  return (
    <section className={styles.grid}>
      {items.map((item) => (
        <a
          key={item.href}
          className={styles.card}
          href={item.href}
          data-page-transition
        >
          <span className={styles.media}>
            <Image
              src={item.image}
              alt={item.alt ?? ""}
              fill
              sizes="(max-width: 720px) 100vw, 33vw"
            />
          </span>
          <span className={styles.name}>{item.title}</span>
          <span className={styles.cta}>{cta}</span>
        </a>
      ))}
    </section>
  );
}
