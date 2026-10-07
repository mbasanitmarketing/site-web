import Image from "next/image";
import { notFound } from "next/navigation";
import { BackdropLines } from "@/components/BackdropLines";
import { Footer } from "@/components/Footer";
import { GuideToc } from "@/components/GuideToc";
import { JsonLd } from "@/components/JsonLd";
import { ServiceContact } from "@/components/ServiceContact";
import { getContactContent } from "@/lib/cms";
import { GUIDES, getGuide, idOf, typo, type GuideBlock } from "@/lib/guides";
import { articleLd, breadcrumbLd, buildMetadata, graph } from "@/lib/seo";
import chip from "@/components/Chip.module.css";
import styles from "../guides.module.css";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return { title: "Guide introuvable | MBA Sanit" };
  return buildMetadata(`/guides/${g.slug}`, g.seoTitle, g.description, g.image);
}

/** `[texte](/chemin)` devient un lien ; le reste est du texte brut. */
function Texte({ text }: { text: string }) {
  const parts = typo(text).split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((p, i) => {
        const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return m ? (
          <a key={i} href={m[2]}>
            {m[1]}
          </a>
        ) : (
          p
        );
      })}
    </>
  );
}

function Liste({ items, className }: { items: string[]; className: string }) {
  return (
    <ul className={className}>
      {items.map((it, i) => (
        <li key={i}>
          <Texte text={it} />
        </li>
      ))}
    </ul>
  );
}

function Bloc({ b }: { b: GuideBlock }) {
  switch (b.type) {
    case "p":
      return (
        <p>
          <Texte text={b.text} />
        </p>
      );
    case "h3":
      return <h3>{typo(b.text)}</h3>;
    case "note":
      return (
        <div className={styles.note}>
          <span className={styles.noteLabel}>{typo(b.label)}</span>
          <p>
            <Texte text={b.text} />
          </p>
        </div>
      );
    case "ul":
      return <Liste items={b.items} className={styles.ul} />;
    case "dont":
      return <Liste items={b.items} className={styles.dont} />;
    case "checklist":
      return <Liste items={b.items} className={styles.check} />;
    case "cards":
      return <Liste items={b.items} className={styles.cards} />;
  }
}

const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août",
  "septembre", "octobre", "novembre", "décembre",
];
function dateFr(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MOIS[m - 1]} ${y}`;
}

export default async function Page({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const path = `/guides/${g.slug}`;
  const { phoneLabel, phoneHref } = await getContactContent();
  const toc = g.sections.map((s) => ({ id: idOf(s.heading), title: s.heading }));

  return (
    <>
      <JsonLd
        data={graph(
          articleLd({ path, title: g.title, description: g.description, image: g.image, date: g.date, updated: g.updated }),
          breadcrumbLd([
            { name: "Accueil", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: g.title, path },
          ]),
        )}
      />

      <header className={styles.head}>
        <BackdropLines arc />
        <div className={styles.headGrid}>
          <div>
            <p className={styles.meta}>
              <span className={chip.chip}>Guide pratique</span>
              <span>Mis à jour le {dateFr(g.updated)}</span>
              <span>{g.minutes} min de lecture</span>
            </p>
            <h1 className={styles.h1}>{typo(g.title)}</h1>
          </div>
          <p className={styles.lede}>{typo(g.lede)}</p>
        </div>
      </header>

      <div className={styles.banner}>
        <Image src={g.image} alt={g.imageAlt} fill sizes="100vw" priority />
      </div>

      <main className={styles.body}>
        <div className={styles.grid}>
          <aside className={styles.stick}>
            <GuideToc items={toc} />
            <div className={styles.call}>
              <p>
                <strong>Une panne en ce moment ?</strong>
                Décrivez-nous la situation, nous venons sur place.
              </p>
              <a className={styles.btn} href={phoneHref}>
                Appeler
              </a>
            </div>
          </aside>

          <article className={styles.article}>
            <section className={styles.retenir} aria-label="À retenir">
              <p className={styles.retenirLabel}>À retenir</p>
              <ol>
                {g.summary.map((t) => (
                  <li key={t}>{typo(t)}</li>
                ))}
              </ol>
            </section>

            {g.sections.map((s, i) => (
              <section key={s.heading} id={idOf(s.heading)} className={styles.section}>
                <span className={styles.num} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2>{typo(s.heading)}</h2>
                {s.blocks.map((b, k) => (
                  <Bloc key={k} b={b} />
                ))}
              </section>
            ))}

            <footer className={styles.sign}>
              <Image src="/logo-mba.png" alt="MBA Sanit" width={600} height={221} sizes="90px" />
              <p>
                Guide rédigé par l’équipe de MBA Sanit, installateurs sanitaires
                et chauffagistes à Genève. Appelez le{" "}
                <a href={phoneHref}>{phoneLabel}</a> pour un dépannage.
              </p>
            </footer>
          </article>
        </div>
      </main>

      <ServiceContact />
      <Footer above="navy" />
    </>
  );
}
