import Image from "next/image";
import Link from "next/link";
import { TasteMobileMenu } from "./taste-mobile-menu";
import styles from "./level-navigation.module.css";

const entries = [["Accueil", "/"], ["BTS CEJM", "/bts-cejm"], ["Terminale", "/terminale"], ["Première", "/premiere"], ["Seconde", "/seconde"], ["Méthodes", "/methodes"], ["Mon espace", "/espace-eleves"]];

export function LevelNavigation({ current }: { current: string }) {
  return <header className={styles.header}>
    <nav className={styles.inner} aria-label="Navigation principale">
      <Link href="/" className={styles.brand}>
        <Image src="/brand/capses-logo.svg" alt="" width={40} height={40} />
        <span><strong>CAPSES</strong><small>Comprendre · apprendre · progresser</small></span>
      </Link>
      <div className={styles.links}>{entries.map(([label, href]) => <Link key={href} href={href} aria-current={current === href ? "page" : undefined}>{label}</Link>)}</div>
      <div className={styles.mobile}><TasteMobileMenu /></div>
    </nav>
  </header>;
}
