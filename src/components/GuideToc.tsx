"use client";

import { useEffect, useState } from "react";
import styles from "./GuideToc.module.css";

/**
 * Sommaire collant d'un guide. La section en cours de lecture est
 * soulignée : on sait toujours où on en est dans l'article.
 */
export function GuideToc({
  items,
}: {
  items: { id: string; title: string }[];
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    // Bande de lecture : le haut de l'écran, en dessous du repère fixe.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-18% 0px -72% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className={styles.toc} aria-label="Dans ce guide">
      <p className={styles.label}>Dans ce guide</p>
      <ol>
        {items.map((it, i) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={it.id === active ? styles.on : undefined}
              aria-current={it.id === active ? "true" : undefined}
            >
              <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
              {it.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
