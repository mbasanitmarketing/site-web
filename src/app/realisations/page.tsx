import Image from "next/image";
import { PageIntro } from "@/components/PageIntro";
import { REALISATIONS, requirePage } from "@/lib/pages";
import styles from "./realisations.module.css";

const PAGE = requirePage("/realisations");

export const metadata = { title: `${PAGE.title} — MBA Sanit` };

export default function Page() {
  return (
    <>
      <PageIntro page={PAGE} />

      {/* Liste provisoire : juste de quoi tester le cas « Voir la
          réalisation ». Le reste de la page reste à définir. */}
      <section className={styles.list}>
        {REALISATIONS.map((r) => (
          <a
            key={r.href}
            className={styles.card}
            href={r.href}
            data-page-transition
          >
            <span className={styles.media}>
              <Image src={r.image} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" />
            </span>
            <span className={styles.name}>{r.title}</span>
            <span className={styles.cta}>Voir la réalisation</span>
          </a>
        ))}
      </section>
    </>
  );
}
