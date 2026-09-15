import type { ServiceDetail } from "@/lib/pages";
import { PHONE_HREF, PHONE_LABEL } from "@/lib/contact";
import { ServiceSection } from "./ServiceSection";
import shell from "./ServiceSection.module.css";
import styles from "./ServiceParts.module.css";


/* --- 2. Besoins traités : voir ServiceNeeds.tsx, sa propre scène ---- */

/* --- 3. Questions fréquentes ---------------------------------------- */

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

/* --- 4. Contact ------------------------------------------------------ */

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
