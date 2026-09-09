"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getPage, HERO_BAND, type PageContent } from "@/lib/pages";
import { PageIntro } from "./PageIntro";
import styles from "./PageTransition.module.css";

/** Durée du balayage avant de naviguer réellement. */
const SWEEP_MS = 620;
/** Fondu de retrait du calque, une fois la vraie page montée. */
const FADE_MS = 280;

/**
 * Transition de page — d'après « Animation nouvelle page site MBA ».
 *
 * 1. clic sur un lien de contenu (`data-page-transition`) : la page
 *    courante s'assombrit (cf. `#page-root` dans globals.css) ;
 * 2. un calque balaie l'image de la page d'arrivée depuis la droite, avec
 *    le nom de la page qui apparaît en bas à gauche ;
 * 3. on navigue sous le calque, puis il s'efface : le titre est déjà à sa
 *    place sur la vraie page, et le reste des textes arrive en décalé.
 *
 * Les liens utilitaires (mentions légales, `tel:`, externes) ne sont pas
 * marqués et naviguent normalement. Clic milieu / cmd-clic passent aussi.
 */
export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const [page, setPage] = useState<PageContent | null>(null);
  const [out, setOut] = useState(false);
  const awaiting = useRef<string | null>(null);

  // Interception des clics.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const el = e.target instanceof Element ? e.target : null;
      const a = el?.closest("a[data-page-transition]");
      if (!(a instanceof HTMLAnchorElement)) return;
      if (a.target && a.target !== "_self") return;

      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      const next = getPage(url.pathname);
      if (!next) return; // route inconnue : navigation normale

      e.preventDefault();
      setPage((cur) => cur ?? next); // un clic pendant la transition ne relance rien
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Assombrit la page qu'on quitte, tant que le calque n'est pas en retrait.
  useEffect(() => {
    const root = document.documentElement;
    if (page && !out) root.setAttribute("data-leaving", "");
    else root.removeAttribute("data-leaving");
    return () => root.removeAttribute("data-leaving");
  }, [page, out]);

  // Le balayage terminé, on navigue pour de vrai.
  useEffect(() => {
    if (!page) return;
    const id = setTimeout(() => {
      awaiting.current = page.href;
      router.push(page.href);
    }, SWEEP_MS);
    return () => clearTimeout(id);
  }, [page, router]);

  // La nouvelle page est montée : on retire le calque en fondu.
  useEffect(() => {
    if (!page || awaiting.current !== pathname) return;
    awaiting.current = null;
    setOut(true);
    const id = setTimeout(() => {
      setPage(null);
      setOut(false);
    }, FADE_MS);
    return () => clearTimeout(id);
  }, [pathname, page]);

  if (!page) return null;

  return (
    <div
      className={`${styles.overlay} ${
        HERO_BAND.has(page.href) ? styles.overlayBand : ""
      } ${out ? styles.overlayOut : ""}`}
      aria-hidden="true"
    >
      <PageIntro page={page} titleOnly />
    </div>
  );
}
