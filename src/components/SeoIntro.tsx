import titre from "./Heading.module.css";
import styles from "./SeoIntro.module.css";

/**
 * Bloc de texte des pages d'index (/services, /realisations) : une
 * introduction et une courte présentation de chaque rubrique, avec un lien
 * dont le libellé dit où il mène. Ces pages n'avaient que leur titre et
 * des vignettes : rien à lire pour un moteur de recherche.
 */
export function SeoIntro({
  title,
  intro,
  items,
  outro,
}: {
  title: string;
  intro: string;
  items: { title: string; text: string; href: string; cta: string }[];
  /** Phrase finale, facultative (HTML déjà échappé par React). */
  outro?: React.ReactNode;
}) {
  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <h2 className={`${styles.title} ${titre.h2}`}>{title}</h2>
        <p className={styles.intro}>{intro}</p>
        <div className={styles.grid}>
          {items.map((it) => (
            <article key={it.href} className={styles.item}>
              <h3>{it.title}</h3>
              <p>{it.text}</p>
              <a href={it.href} data-page-transition>
                {it.cta}
              </a>
            </article>
          ))}
        </div>
        {outro && <p className={styles.outro}>{outro}</p>}
      </div>
    </section>
  );
}

/** Pied d'une fiche projet : renvoie vers le métier concerné et le devis. */
export function ProjectLinks({
  serviceHref,
  serviceLabel,
}: {
  serviceHref: string;
  serviceLabel: string;
}) {
  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <p className={styles.outro}>
          Ce projet relève de notre savoir-faire en{" "}
          <a href={serviceHref} data-page-transition>
            {serviceLabel}
          </a>
          . Vous avez un projet similaire à Genève ou en Suisse romande ?{" "}
          <a href="/devis" data-page-transition>
            Demandez un devis
          </a>{" "}
          : nous venons voir l’existant sur place.
        </p>
      </div>
    </section>
  );
}

/** Renvoi vers un guide pratique, sur une page de service. */
export function GuideLink({ href, label }: { href: string; label: string }) {
  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>
        <p className={styles.outro}>
          <strong>Une panne en ce moment ?</strong> Avant de nous appeler,
          quelques vérifications simples peuvent aider : lisez notre guide{" "}
          <a href={href}>{label}</a>
        </p>
      </div>
    </section>
  );
}
