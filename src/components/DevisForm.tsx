"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/pages";
import styles from "./DevisForm.module.css";

type State = "idle" | "sending" | "sent" | "error";

/**
 * Formulaire de demande de devis. Envoyé à contact@mbasanit.ch via la
 * route /api/devis (le destinataire est côté serveur, jamais dans le
 * HTML : autrement l'adresse serait moissonnée par les robots).
 */
export function DevisForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    setError("");

    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(new FormData(form).entries()),
        ),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Erreur ${res.status}`);
      }
      form.reset();
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setState("error");
    }
  }

  return (
    <section className={styles.wrap} id="formulaire">
      <div className={styles.head}>
        <h2 className={styles.title}>Demander un devis</h2>
        <p className={styles.lede}>
          Décrivez votre projet, nous revenons vers vous rapidement.
        </p>
      </div>

      <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
        <label className={styles.field}>
          <span className={styles.label}>Nom et prénom</span>
          <input
            className={styles.input}
            name="nom"
            type="text"
            required
            autoComplete="name"
            maxLength={120}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>E-mail</span>
          <input
            className={styles.input}
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={160}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Téléphone</span>
          <input
            className={styles.input}
            name="telephone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Type de projet</span>
          <select className={styles.input} name="projet" defaultValue="">
            <option value="">— Choisir —</option>
            {SERVICES.map((s) => (
              <option key={s.href} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Autre">Autre</option>
          </select>
        </label>

        <label className={`${styles.field} ${styles.wide}`}>
          <span className={styles.label}>Votre projet</span>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            name="message"
            required
            rows={6}
            maxLength={4000}
          />
        </label>

        {/* Piège à robots : invisible et hors tabulation. Rempli = rejeté. */}
        <input
          className={styles.honeypot}
          type="text"
          name="societe"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className={styles.actions}>
          <button
            className={styles.submit}
            type="submit"
            disabled={state === "sending"}
          >
            {state === "sending" ? "Envoi…" : "Envoyer la demande"}
          </button>

          <p className={styles.status} role="status" aria-live="polite">
            {state === "sent" &&
              "Merci, votre demande est partie. Nous vous répondons vite."}
            {state === "error" && `L’envoi a échoué : ${error}`}
          </p>
        </div>
      </form>
    </section>
  );
}
