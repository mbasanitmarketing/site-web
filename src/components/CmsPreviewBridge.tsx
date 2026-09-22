"use client";

import { useEffect, useRef } from "react";

/**
 * Pont d'aperçu en direct avec l'espace client de l'Atelier Web Romand.
 * Monté UNIQUEMENT quand le Draft Mode de Next.js est actif (voir
 * layout.tsx) : jamais chargé pour un visiteur normal.
 *
 * Reçoit les modifications tapées dans l'éditeur (postMessage) et les
 * applique sur-le-champ aux éléments `data-cms="clé"` de la page — même
 * protocole que le CMS des templates HTML de l'agence
 * (src/lib/cms/previewScript.ts), pour que l'éditeur n'ait qu'un seul code
 * à maintenir des deux côtés.
 */

const AGENCY_ORIGIN = process.env.NEXT_PUBLIC_CMS_AGENCY_ORIGIN ?? "https://atelierwebromand.ch";

export function CmsPreviewBridge() {
  const outlineRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const setText = (el: HTMLElement, value: string) => {
      el.textContent = "";
      const lines = value.split(/\r?\n/);
      lines.forEach((line, i) => {
        if (i > 0) el.appendChild(document.createElement("br"));
        el.appendChild(document.createTextNode(line));
      });
    };

    const outline = (key: string) => {
      const target = document.querySelector<HTMLElement>(`[data-cms="${CSS.escape(key)}"]`);
      if (!target) return;
      target.scrollIntoView({ block: "center", behavior: "smooth" });

      let box = outlineRef.current;
      if (!box) {
        box = document.createElement("div");
        box.setAttribute("aria-hidden", "true");
        box.style.cssText =
          "position:fixed;z-index:2147483647;pointer-events:none;border:2px solid #b5603c;" +
          "background:rgba(181,96,60,.14);border-radius:6px;box-shadow:0 0 0 4px rgba(181,96,60,.18);transition:opacity .25s";
        document.documentElement.appendChild(box);
        outlineRef.current = box;
      }
      box.style.opacity = "1";
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      const track = () => {
        const r = target.getBoundingClientRect();
        box!.style.left = `${r.left - 4}px`;
        box!.style.top = `${r.top - 4}px`;
        box!.style.width = `${r.width + 8}px`;
        box!.style.height = `${r.height + 8}px`;
        rafRef.current = requestAnimationFrame(track);
      };
      track();
      hideTimer.current = setTimeout(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        box!.style.opacity = "0";
      }, 2600);
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== AGENCY_ORIGIN || event.data?.source !== "awr-cms") return;
      const { type, key, value } = event.data as { type: string; key: string; value?: string };
      if (type === "text" && typeof value === "string") {
        document.querySelectorAll<HTMLElement>(`[data-cms="${CSS.escape(key)}"]`).forEach((el) => setText(el, value));
      } else if (type === "focus") {
        outline(key);
      }
      // Pas d'image dans le manifeste de ce site pour l'instant (voir
      // src/lib/cms/manifests/mba-sanit.json) : "image" n'est pas géré ici.
    };

    window.addEventListener("message", onMessage);

    // Signale à l'éditeur (parent, s'il y en a un) que la page est prête à
    // recevoir le brouillon en cours.
    const ready = () =>
      window.parent?.postMessage({ source: "awr-cms-preview", type: "ready" }, AGENCY_ORIGIN);
    if (document.readyState === "complete") ready();
    else window.addEventListener("load", ready, { once: true });

    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("load", ready);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      outlineRef.current?.remove();
      outlineRef.current = null;
    };
  }, []);

  return (
    <div
      role="status"
      style={{
        position: "fixed",
        insetInline: 0,
        bottom: 0,
        zIndex: 2147483647,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "8px 16px",
        background: "#1c1815",
        color: "#faf6f0",
        fontFamily: "system-ui, sans-serif",
        fontSize: 13,
      }}
    >
      Aperçu du brouillon — non publié
      <a href="/api/draft/disable" style={{ color: "#faf6f0", textDecoration: "underline" }}>
        Quitter l&apos;aperçu
      </a>
    </div>
  );
}
