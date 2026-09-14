import styles from "./BackdropLines.module.css";

/**
 * Trame de fond des sections claires — d'après la référence : un filet en
 * haut, une verticale pointillée aux deux tiers, et un grand arc très pâle.
 *
 * Empilées, les verticales de sections successives tombent au même endroit
 * et se lisent comme une seule ligne courant sur toute la page. L'arc, lui,
 * ne s'active que sur une section par page — répété, il ferait le contraire
 * de ce qu'on cherche.
 *
 * Purement décoratif : aucun contenu, `aria-hidden`, et sans prise au
 * pointeur. Le conteneur doit porter `position: relative` et
 * `isolation: isolate` pour que la trame passe derrière le texte sans
 * qu'on ait à repositionner chaque enfant.
 */
export function BackdropLines({ arc = false }: { arc?: boolean }) {
  return (
    <div className={styles.lines} aria-hidden="true">
      <span className={styles.rule} />
      <span className={styles.dash} />
      {arc && <span className={styles.arc} />}
    </div>
  );
}
