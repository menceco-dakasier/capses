"use client";

import Link from "next/link";
import styles from "./level-browser.module.css";

export function LevelFilters({ level, options, selected, onSelect }: {
  level: string;
  options: { id: string; label: string }[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return <>
    <nav className={styles.filters} aria-label={`Chapitres de ${level}`}>
      <h2>{level} SES</h2>
      {[{ id: "ALL", label: "Tous les chapitres" }, ...options].map(({id,label}) => <button type="button" key={id} aria-pressed={selected === id} onClick={() => onSelect(id)}>{label}</button>)}
    </nav>
    <Link href="/espace-eleves" className={styles.space}>Ouvrir Mon espace →</Link>
  </>;
}
