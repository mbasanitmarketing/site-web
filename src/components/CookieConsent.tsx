"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import styles from "./CookieConsent.module.css";

/**
 * Bannière de cookies + chargement de Google Analytics.
 *
 * Rien n'est chargé ni déposé avant un « Accepter » explicite : le script
 * Google n'est même pas demandé au navigateur tant que le visiteur n'a pas
 * accepté. « Refuser » et « Accepter » ont le même poids visuel. Le choix
 * est gardé dans le navigateur (localStorage) et peut être rouvert depuis
 * le pied de page (CookieSettingsButton).
 */

const KEY = "mba-cookie-consent";
const listeners = new Set<() => void>();
let reopen = false;

const emit = () => listeners.forEach((l) => l());

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

/** « granted|0 », « denied|1 », « unset|0 »… (chaîne : snapshot stable). */
function snapshot() {
  let choice = "unset";
  try {
    const v = localStorage.getItem(KEY);
    if (v === "granted" || v === "denied") choice = v;
  } catch {
    /* navigation privée stricte : on retombe sur « pas de choix » */
  }
  return `${choice}|${reopen ? 1 : 0}`;
}

function choose(value: "granted" | "denied") {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* ignoré : le choix vaudra pour cette page seulement */
  }
  reopen = false;
  if (value === "denied") stopTracking();
  emit();
}

/** Coupe l'envoi de données et efface les cookies _ga déjà posés. */
function stopTracking() {
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  const host = location.hostname;
  const bare = host.replace(/^www\./, "");
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (!name.startsWith("_ga")) return;
    for (const domain of [host, `.${bare}`]) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    }
  });
}

export function CookieConsent() {
  const snap = useSyncExternalStore(subscribe, snapshot, () => "ssr|0");

  if (!GA_MEASUREMENT_ID || snap === "ssr|0") return null;

  const [choice, open] = snap.split("|");
  const granted = choice === "granted";
  const showBanner = choice === "unset" || open === "1";

  return (
    <>
      {granted && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
          </Script>
        </>
      )}

      {showBanner && (
        <section className={styles.banner} role="dialog" aria-label="Cookies et mesure d’audience">
          <p className={styles.text}>
            Nous utilisons Google Analytics pour comprendre comment le site est
            utilisé et l’améliorer. Aucun cookie de mesure n’est déposé sans
            votre accord.{" "}
            <a href="/mentions-legales#donnees">En savoir plus</a>
          </p>
          <div className={styles.actions}>
            <button type="button" className={styles.btn} onClick={() => choose("denied")}>
              Refuser
            </button>
            <button type="button" className={styles.btn} onClick={() => choose("granted")}>
              Accepter
            </button>
          </div>
        </section>
      )}
    </>
  );
}

/** Lien du pied de page : rouvre la bannière pour changer d'avis. */
export function CookieSettingsButton({ className }: { className?: string }) {
  if (!GA_MEASUREMENT_ID) return null;
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        reopen = true;
        emit();
      }}
    >
      Gérer les cookies
    </button>
  );
}
