import type { ServiceDetail } from "@/lib/pages";
import { ServiceSection } from "./ServiceSection";
import shell from "./ServiceSection.module.css";
import styles from "./ServiceParts.module.css";

const PHONE = "+41 78 217 29 28";
const PHONE_HREF = "tel:+41782172928";

/** Suite de blocs intitulé + paragraphe, la trame du manifeste. */
function Blocks({ items }: { items: { title: string; body: string }[] }) {
  return (
    <>
      {items.map((b) => (
        <div key={b.title} className={shell.block}>
          <h3 className={shell.blockTitle}>{b.title}</h3>
          <p className={shell.blockBody}>{b.body}</p>
        </div>
      ))}
    </>
  );
}

/* --- 2. Besoins traités -------------------------------------------- */

export function ServiceNeeds({ service }: { service: ServiceDetail }) {
  return (
    <ServiceSection label="Besoins traités">
      <h2 className={shell.headline}>Les situations qui amènent à appeler.</h2>
      <Blocks items={service.needs} />
    </ServiceSection>
  );
}

/* --- 3. Détail de la prestation ------------------------------------ */

export function ServiceScope({ service }: { service: ServiceDetail }) {
  return (
    <ServiceSection label="Détail de la prestation">
      <h2 className={shell.headline}>Ce qui est compris, et ce qui ne l’est pas.</h2>

      <div className={shell.block}>
        <h3 className={shell.blockTitle}>Compris dans la prestation</h3>
        <ul className={shell.list}>
          {service.included.map((x) => (
            <li key={x} className={shell.listItem}>
              {x}
            </li>
          ))}
        </ul>
      </div>

      <div className={shell.block}>
        <h3 className={shell.blockTitle}>Non compris</h3>
        <ul className={shell.list}>
          {service.excluded.map((x) => (
            <li key={x} className={`${shell.listItem} ${shell.listItemOut}`}>
              {x}
            </li>
          ))}
        </ul>
      </div>
    </ServiceSection>
  );
}

/* --- 4. Preuves : qualifications ----------------------------------- */

export function ServiceProof({ service }: { service: ServiceDetail }) {
  return (
    <ServiceSection label="Preuves">
      <h2 className={shell.headline}>Qualifications et références.</h2>
      {service.qualifications.length > 0 ? (
        <ul className={shell.list}>
          {service.qualifications.map((q) => (
            <li key={q} className={shell.listItem}>
              {q}
            </li>
          ))}
        </ul>
      ) : (
        <p className={shell.missing}>
          Qualifications à fournir par MBA — CFC, agréments, assurances,
          partenariats fabricants. Rien n’est affiché ici tant que la liste
          n’est pas vérifiable.
        </p>
      )}
    </ServiceSection>
  );
}

/* --- 5. Déroulement ------------------------------------------------- */

export function ServiceSteps({ service }: { service: ServiceDetail }) {
  return (
    <ServiceSection label="Déroulement">
      <h2 className={shell.headline}>De la demande à la réception.</h2>
      <ol className={styles.steps}>
        {service.steps.map((s, i) => (
          <li key={s.title} className={styles.step}>
            <span className={styles.stepNum} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>
              <span className={styles.stepTitle}>{s.title}</span>
              <span className={styles.stepBody}>{s.body}</span>
            </span>
          </li>
        ))}
      </ol>
    </ServiceSection>
  );
}

/* --- 6. Prix -------------------------------------------------------- */

export function ServicePricing({ service }: { service: ServiceDetail }) {
  return (
    <ServiceSection label="Prix">
      <h2 className={shell.headline}>
        {service.pricing.tarif || "Tarif à définir avec MBA."}
      </h2>

      {!service.pricing.tarif && (
        <p className={shell.missing}>
          Aucune fourchette n’est affichée tant que MBA n’en a pas donné une :
          un prix plausible mais inventé serait pris pour un engagement.
        </p>
      )}

      <p className={shell.intro}>{service.pricing.note}</p>

      <div className={shell.block}>
        <h3 className={shell.blockTitle}>Ce qui fait varier le devis</h3>
        <ul className={shell.list}>
          {service.pricing.factors.map((x) => (
            <li key={x} className={shell.listItem}>
              {x}
            </li>
          ))}
        </ul>
      </div>
    </ServiceSection>
  );
}

/* --- 7. Zone d'intervention ----------------------------------------- */

export function ServiceArea({ service }: { service: ServiceDetail }) {
  return (
    <ServiceSection label="Zone d’intervention">
      <h2 className={shell.headline}>Genève et tout le canton.</h2>
      <ul className={styles.communes}>
        {service.area.communes.map((c) => (
          <li key={c} className={styles.commune}>
            {c}
          </li>
        ))}
      </ul>
      <p className={shell.intro}>{service.area.note}</p>
    </ServiceSection>
  );
}

/* --- 8. Questions fréquentes ---------------------------------------- */

export function ServiceFaq({ service }: { service: ServiceDetail }) {
  return (
    <ServiceSection label="Questions fréquentes">
      <h2 className={shell.headline}>Ce qu’on nous demande le plus.</h2>
      {/* <details> natif : l'accordéon fonctionne sans JavaScript et le
          clavier le pilote déjà. */}
      <div className={styles.faq}>
        {service.faq.map((f) => (
          <details key={f.q} className={styles.item}>
            <summary className={styles.question}>{f.q}</summary>
            <p className={styles.answer}>{f.a}</p>
          </details>
        ))}
      </div>
    </ServiceSection>
  );
}

/* --- 9. Contact ------------------------------------------------------ */

export function ServiceContact() {
  return (
    <ServiceSection label="Contact">
      <h2 className={shell.headline}>Parlons de votre projet.</h2>
      <div className={styles.actions}>
        <a className={styles.button} href="/devis" data-page-transition>
          Demander un devis
        </a>
        <a className={styles.button} href={PHONE_HREF}>
          {PHONE}
        </a>
      </div>
    </ServiceSection>
  );
}
