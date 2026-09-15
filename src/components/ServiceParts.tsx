import type { ServiceDetail } from "@/lib/pages";
import { PHONE_HREF, PHONE_LABEL } from "@/lib/contact";
import { ServiceSection } from "./ServiceSection";
import shell from "./ServiceSection.module.css";
import styles from "./ServiceParts.module.css";


/* --- 2. Besoins traités : voir ServiceNeeds.tsx, sa propre scène ---- */

/* --- 3. Déroulement ------------------------------------------------- */

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

/* --- 4. Zone d'intervention ----------------------------------------- */

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

/* --- 5. Questions fréquentes ---------------------------------------- */

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

/* --- 6. Contact ------------------------------------------------------ */

export function ServiceContact() {
  return (
    <ServiceSection label="Contact">
      <h2 className={shell.headline}>Parlons de votre projet.</h2>
      <div className={styles.actions}>
        <a className={styles.button} href="/devis" data-page-transition>
          Demander un devis
        </a>
        <a className={styles.button} href={PHONE_HREF}>
          {PHONE_LABEL}
        </a>
      </div>
    </ServiceSection>
  );
}
