import Link from "next/link";

const entries = [["Accueil", "/"], ["BTS CEJM", "/bts-cejm"], ["Terminale", "/terminale"], ["Première", "/premiere"], ["Seconde", "/seconde"], ["Méthodes", "/methodes"], ["Mon espace", "/espace-eleves"]];

export function TasteMobileMenu() {
  return <details className="taste-menu"><summary>Menu</summary><nav aria-label="Navigation mobile">{entries.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav></details>;
}
