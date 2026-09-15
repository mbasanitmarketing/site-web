"use client";

import { useEffect } from "react";

/** Au-dessus de ce seuil on ne masque jamais : en haut de page, le header
 *  reste toujours là. */
const TOP_ZONE = 90;
/** Sous ce déplacement on ignore : rebond iOS, ancrage, micro-tremblements. */
const DEADZONE = 6;
/** Bande du haut où la souris fait revenir le header. Elle couvre
 *  largement le burger et le logo (0 -> 60 px) : on veut qu'il revienne
 *  quand on MONTE VERS eux, pas seulement quand on est dessus. */
const HOVER_ZONE = 120;

/**
 * Comportement classique d'un header : il se retire vers le haut quand on
 * descend, il revient dès qu'on remonte.
 *
 * Il revient AUSSI quand la souris s'approche du haut de l'écran, même
 * sans scroller : aller chercher le menu là où il devrait être et ne rien
 * trouver n'a aucun sens. Tant que la souris reste dans la bande, le
 * header est maintenu — y compris si on continue de descendre.
 *
 * Seulement à la souris : `pointermove` est filtré sur `pointerType`. Au
 * doigt, chaque geste est déjà un scroll, et un header qui réapparaît à
 * chaque contact serait une gêne.
 *
 * L'état est écrit sur `<html>` (`data-header-hidden`) plutôt que dans le
 * state React : le burger et le logo y réagissent en CSS pur, sans
 * re-render à chaque frame de scroll. Un seul composant doit appeler ce
 * hook (SiteMenu, monté partout).
 *
 * `disabled` sert à figer le header visible — typiquement quand le menu
 * est ouvert, puisque le burger devient le bouton de fermeture.
 */
export function useHeaderAutoHide(disabled = false) {
  useEffect(() => {
    const root = document.documentElement;
    if (disabled) {
      root.removeAttribute("data-header-hidden");
      return;
    }

    let last = window.scrollY;
    // Souris dans la bande du haut : le header est retenu visible, quoi
    // que fasse le scroll.
    let survole = false;

    const update = () => {
      const y = window.scrollY;
      const diff = y - last;
      if (Math.abs(diff) < DEADZONE) return;
      last = y;

      if (survole || y <= TOP_ZONE || diff < 0) {
        root.removeAttribute("data-header-hidden");
      } else {
        root.setAttribute("data-header-hidden", "");
      }
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const dans = e.clientY <= HOVER_ZONE;
      if (dans === survole) return;
      survole = dans;
      if (dans) root.removeAttribute("data-header-hidden");
      // En sortant de la bande, on ne masque pas d'autorité : c'est au
      // prochain geste de scroll vers le bas de le faire. Masquer ici
      // ferait disparaître le header sous le curseur qui s'en éloigne.
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("pointermove", onPointer);
      root.removeAttribute("data-header-hidden");
    };
  }, [disabled]);
}
