import Image from "next/image";
import Link from "next/link";
import { BackdropLines } from "@/components/BackdropLines";
import { Footer } from "@/components/Footer";
import { GUIDES, typo } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";
import chip from "@/components/Chip.module.css";
import styles from "./guides.module.css";

export const metadata = pageMetadata("/guides");

export default function Page() {
  return (
    <>
      <header className={styles.head}>
        <BackdropLines arc />
        <div className={styles.headGrid}>
          <div>
            <p className={styles.meta}>
              <span className={chip.chip}>Guides</span>
            </p>
            <h1 className={styles.h1}>Guides pratiques</h1>
          </div>
          <p className={styles.lede}>
            Une panne, une fuite, un doute sur votre chauffage : les bons
            réflexes et les vérifications simples, expliqués par les
            installateurs de MBA Sanit.
          </p>
        </div>
      </header>

      <section className={styles.list} aria-label="Les guides">
        {GUIDES.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className={styles.feature}>
            <span className={styles.featureMedia}>
              <Image
                src={g.image}
                alt={g.imageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                priority
              />
            </span>
            <span>
              <span className={styles.featureMeta}>
                Guide pratique · {g.minutes} min de lecture
              </span>
              <h2 className={styles.featureTitle}>{typo(g.title)}</h2>
              <span className={styles.featureText}>{typo(g.description)}</span>
              <span className={`${styles.btn} ${styles.btnLight}`}>Lire le guide</span>
            </span>
          </Link>
        ))}
      </section>

      <Footer above="navy" />
    </>
  );
}
