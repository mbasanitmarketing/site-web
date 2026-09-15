import { ServiceSection } from "./ServiceSection";
import shell from "./ServiceSection.module.css";
import styles from "./HomeSections.module.css";

/* --- Questions fréquentes -------------------------------------------- */

/** Trame provisoire : questions et réponses à écrire avec MBA. */
const FAQ = [
  {
    q: "Dans quelles communes intervenez-vous ?",
    a: "Genève, Carouge, Grand-Lancy et tout le canton. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    q: "Sous quel délai puis-je obtenir un devis ?",
    a: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  },
  {
    q: "Le devis est-il payant ?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    q: "Intervenez-vous pour de petites réparations ?",
    a: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export function HomeFaq() {
  return (
    <ServiceSection label="Questions fréquentes" className={styles.last}>
      <h2 className={shell.headline}>Ce qu’on nous demande le plus.</h2>
      {/* <details> natif : l'accordéon marche sans JavaScript et le clavier
          le pilote déjà. */}
      <div className={styles.faq}>
        {FAQ.map((f) => (
          <details key={f.q} className={styles.item}>
            <summary className={styles.question}>{f.q}</summary>
            <p className={styles.answer}>{f.a}</p>
          </details>
        ))}
      </div>
    </ServiceSection>
  );
}
