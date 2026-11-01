import Link from "next/link";
import { BrandLogo } from "./brand-logo";
import { TasteMobileMenu } from "./taste-mobile-menu";
import styles from "./level-navigation.module.css";

const entries = [["Accueil", "/"], ["BTS CEJM", "/bts-cejm"], ["Terminale", "/terminale"], ["Première", "/premiere"], ["Seconde", "/seconde"], ["Méthodes", "/methodes"], ["Mon espace", "/espace-eleves"]];

export function LevelNavigation({ current }: { current: string }) {
  return <header className={styles.header}>
    <nav className={styles.inner} aria-label="Navigation principale">
      <Link href="/" className={styles.brand}>
        <BrandLogo tagline />
      </Link>
      <div className={styles.links}>{entries.map(([label, href]) => <Link key={href} href={href} aria-current={current === href ? "page" : undefined}>{label}</Link>)}</div>
      <div className={styles.mobile}><TasteMobileMenu /></div>
    </nav>
  </header>;
}
