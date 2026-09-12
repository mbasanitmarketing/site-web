import Image from "next/image";
import { PARTNERS, PARTNER_SLOTS } from "@/lib/pages";
import styles from "./Partners.module.css";

/**
 * Bandeau de logos, d'après la maquette : un petit repère en capitales à
 * gauche, la grande ligne à droite, puis les logos sur toute la largeur,
 * répartis et alignés sur leur milieu.
 *
 * Tant que MBA n'a pas fourni les fichiers, on montre des emplacements :
 * un logo inventé affirmerait un partenariat qui n'existe peut-être pas.
 */
export function Partners({ headline }: { headline: string }) {
  return (
    <section className={styles.wrap}>
      <div className={styles.grid}>
        <p className={styles.label}>
          Nos partenaires <span aria-hidden="true">→</span>
        </p>
        <h2 className={styles.headline}>{headline}</h2>
      </div>

      {PARTNERS.length > 0 ? (
        <ul className={styles.row}>
          {PARTNERS.map((p) => (
            <li key={p.name} className={styles.item}>
              <Image
                className={styles.logo}
                src={p.logo}
                alt={p.name}
                width={190}
                height={64}
              />
            </li>
          ))}
        </ul>
      ) : (
        <ul className={styles.row} aria-label="Logos à fournir">
          {Array.from({ length: PARTNER_SLOTS }, (_, i) => (
            <li key={i} className={`${styles.item} ${styles.slot}`}>
              Logo
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
