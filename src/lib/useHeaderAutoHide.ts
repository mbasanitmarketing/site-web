"use client";

import { useEffect } from "react";

/** Au-dessus de ce seuil on ne masque jamais : en haut de page, le header
 *  reste toujours là. */
const TOP_ZONE = 90;
/** Sous ce déplacement on ignore : rebond iOS, ancrage, micro-tremblements. */
const DEADZONE = 6;

/**
 * Comportement classique d'un header : il se retire vers le haut quand on
 * descend, il revient dès qu'on remonte.
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

    const update = () => {
      const y = window.scrollY;
      const diff = y - last;
      if (Math.abs(diff) < DEADZONE) return;
      last = y;

      if (y <= TOP_ZONE || diff < 0) root.removeAttribute("data-header-hidden");
      else root.setAttribute("data-header-hidden", "");
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      root.removeAttribute("data-header-hidden");
    };
  }, [disabled]);
}
