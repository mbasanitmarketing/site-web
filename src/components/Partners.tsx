import Image from "next/image";
import { PARTNERS, PARTNER_SLOTS } from "@/lib/pages";
import styles from "./Partners.module.css";

/**
 * Bandeau « nos partenaires », d'après la maquette : un petit repère en
 * capitales à gauche, la grande ligne à droite, puis les logos.
 *
 * Les logos DÉFILENT (marquee), avec un dégradé de flou aux deux bords
 * pour qu'ils n'apparaissent et ne disparaissent pas d'un coup.
 *
 * La piste est rendue DEUX FOIS, l'une derrière l'autre : l'animation
 * translate de -50 %, donc au moment où elle revient à 0 la seconde
 * copie occupe exactement la place qu'occupait la première. La boucle
 * est invisible — c'est ce qui évite le saut d'un marquee naïf. La copie
 * est `aria-hidden` : un lecteur d'écran ne doit pas lire la liste deux
 * fois.
 *
 * Tant que MBA n'a pas fourni les fichiers, on montre des emplacements :
 * un logo inventé affirmerait un partenariat qui n'existe peut-être pas.
 */
export function Partners({ headline }: { headline: string }) {
  const items =
    PARTNERS.length > 0
      ? PARTNERS.map((p) => ({ key: p.name, node: <Logo p={p} /> }))
      : Array.from({ length: PARTNER_SLOTS }, (_, i) => ({
          key: `slot-${i}`,
          node: <span className={styles.slot}>Logo</span>,
        }));

  const piste = (hidden: boolean) => (
    <ul
      className={styles.row}
      aria-hidden={hidden || undefined}
      aria-label={
        hidden ? undefined : PARTNERS.length > 0 ? undefined : "Logos à fournir"
      }
    >
      {items.map((it) => (
        <li key={it.key} className={styles.item}>
          {it.node}
        </li>
      ))}
    </ul>
  );

  return (
    <section className={styles.wrap}>
      <div className={styles.grid}>
        <p className={styles.label}>
          Nos partenaires <span aria-hidden="true">→</span>
        </p>
        <h2 className={styles.headline}>{headline}</h2>
      </div>

      {/* Le masque porte le flou des bords ; la piste, le défilement. Deux
          éléments plutôt qu'un : un `mask-image` sur l'élément animé se
          déplacerait avec lui. */}
      <div className={styles.viewport}>
        {/* --n : la durée suit le nombre de logos, pour que la VITESSE
            apparente ne change pas quand la piste s'allonge. */}
        <div
          className={styles.marquee}
          style={{ "--n": items.length } as React.CSSProperties}
        >
          {piste(false)}
          {piste(true)}
        </div>
      </div>
    </section>
  );
}

function Logo({ p }: { p: { name: string; logo: string } }) {
  return (
    <Image
      className={styles.logo}
      src={p.logo}
      alt={p.name}
      width={190}
      height={64}
    />
  );
}
