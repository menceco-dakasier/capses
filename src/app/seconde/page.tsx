import Link from "next/link";
import { TasteMobileMenu } from "../taste-mobile-menu";

const CHAPITRES = [
  {
    numero: "Chapitre 1",
    titre: "Découvrir les SES",
    type: "Vidéo courte",
    description:
      "Pourquoi ton smartphone intéresse les SES ? Une vidéo légère pour comprendre les regards de l’économiste, du sociologue et du politiste.",
    duree: "3 min",
    statut: "Vidéo à intégrer",
    href: "/seconde/decouvrir-les-ses",
    accent: "#2563eb",
    emoji: "🎬",
  },
  {
    numero: "Chapitre 2",
    titre: "Comment crée-t-on des richesses et comment les mesure-t-on ?",
    type: "Chapitre complet",
    description:
      "Production, producteurs, valeur ajoutée, PIB, croissance, inégalités et limites écologiques.",
    duree: "9 h",
    statut: "À mettre à jour",
    href: "/seconde/creation-richesses",
    accent: "#0f766e",
    emoji: "🏭",
  },
  {
    numero: "Chapitre 3",
    titre: "Comment se forment les prix sur un marché ?",
    type: "Chapitre complet",
    description:
      "Marché, offre, demande, prix d’équilibre, chocs, taxe et subvention.",
    duree: "8 séances",
    statut: "À mettre à jour",
    href: "/seconde/formation-prix",
    accent: "#7c3aed",
    emoji: "📈",
  },
];

export default function SecondePage() {
  return (
    <main className="page" data-taste="level">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, system-ui, sans-serif;
          background: #f4f7fb;
          color: #10234d;
        }

        a {
          text-decoration: none;
        }

        .page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(37, 99, 235, 0.13), transparent 34%),
            linear-gradient(180deg, #f8fbff 0%, #eef4fb 100%);
          padding-bottom: 70px;
        }

        .header {
          height: 86px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid #dbe7f5;
          display: flex;
          align-items: center;
          justify-content: center;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .nav {
          width: min(1400px, calc(100% - 48px));
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #10234d;
        }

        .logo {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: linear-gradient(135deg, #1d4ed8, #3767d6);
          color: white;
          display: grid;
          place-items: center;
          font-weight: 900;
          box-shadow: 0 14px 28px rgba(29, 78, 216, 0.25);
        }

        .brand-title {
          font-size: 24px;
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .brand-subtitle {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          letter-spacing: -0.02em;
          margin-top: 2px;
        }

        .links {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 100%;
        }

        .nav-link {
          color: #50617f;
          font-size: 15px;
          font-weight: 800;
          padding: 33px 18px 29px;
          border-bottom: 3px solid transparent;
          transition: 0.2s ease;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #2563eb;
          background: #eef4ff;
          border-bottom-color: #2563eb;
        }

        .container {
          width: min(1200px, calc(100% - 48px));
          margin: 0 auto;
        }

        .hero {
          margin-top: 30px;
          background: white;
          border: 1px solid #dbe7f5;
          border-radius: 32px;
          box-shadow: 0 24px 80px rgba(15, 35, 77, 0.10);
          padding: 54px;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 38px;
          align-items: center;
          overflow: hidden;
          position: relative;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          border: 1px solid #c7dcff;
          background: #eef5ff;
          color: #2563eb;
          font-weight: 900;
          font-size: 13px;
          letter-spacing: 0.03em;
          padding: 12px 16px;
          border-radius: 999px;
          margin-bottom: 24px;
        }

        h1 {
          margin: 0;
          font-size: clamp(48px, 6vw, 76px);
          letter-spacing: -0.07em;
          line-height: 0.95;
          color: #07194f;
          font-weight: 900;
        }

        h1 span {
          display: block;
          color: #2563eb;
        }

        .hero-text {
          margin: 24px 0 0;
          max-width: 690px;
          color: #60708e;
          font-size: 18px;
          line-height: 1.75;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 32px;
        }

        .btn-primary,
        .btn-secondary {
          border-radius: 15px;
          padding: 16px 22px;
          font-weight: 900;
          font-size: 16px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: 0.2s ease;
        }

        .btn-primary {
          background: #1d4ed8;
          color: white;
          box-shadow: 0 18px 34px rgba(29, 78, 216, 0.24);
        }

        .btn-secondary {
          background: white;
          color: #173b73;
          border: 1px solid #d6e2f0;
        }

        .btn-primary:hover,
        .btn-secondary:hover {
          transform: translateY(-2px);
        }

        .visual {
          min-height: 360px;
          background:
            radial-gradient(circle at 30% 25%, rgba(37,99,235,0.20), transparent 28%),
            linear-gradient(135deg, #dcecff 0%, #f4f8ff 48%, #e6f0fb 100%);
          border-radius: 28px;
          position: relative;
          overflow: hidden;
          border: 1px solid #dbe7f5;
        }

        .phone {
          position: absolute;
          width: 155px;
          height: 275px;
          border-radius: 34px;
          background: #07194f;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(-8deg);
          box-shadow: 0 24px 50px rgba(15,35,77,0.25);
          padding: 13px;
        }

        .phone-screen {
          height: 100%;
          border-radius: 24px;
          background: linear-gradient(180deg, #eaf2ff, #ffffff);
          padding: 18px 12px;
        }

        .phone-line {
          height: 10px;
          border-radius: 999px;
          background: #bfdbfe;
          margin-bottom: 12px;
        }

        .phone-line.small {
          width: 70%;
          background: #dbeafe;
        }

        .float-card {
          position: absolute;
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(195, 211, 232, 0.8);
          backdrop-filter: blur(12px);
          border-radius: 18px;
          padding: 16px 18px;
          box-shadow: 0 18px 38px rgba(15, 35, 77, 0.12);
          color: #24496f;
          font-weight: 900;
          line-height: 1.3;
          font-size: 14px;
        }

        .float-card.one {
          left: 28px;
          top: 34px;
        }

        .float-card.two {
          right: 30px;
          top: 78px;
        }

        .float-card.three {
          right: 48px;
          bottom: 42px;
        }

        .section {
          margin-top: 34px;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 24px;
          align-items: start;
        }

        .sidebar {
          background: white;
          border: 1px solid #dbe7f5;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 18px 45px rgba(15, 35, 77, 0.06);
          position: sticky;
          top: 110px;
        }

        .sidebar h2 {
          margin: 0 0 12px;
          color: #07194f;
          font-size: 20px;
          letter-spacing: -0.04em;
        }

        .sidebar p {
          margin: 0;
          color: #64748b;
          line-height: 1.65;
          font-size: 14px;
        }

        .method-card {
          margin-top: 18px;
          background: #f1f6ff;
          border-radius: 18px;
          padding: 18px;
        }

        .method-card strong {
          display: block;
          color: #173b73;
          margin-bottom: 8px;
        }

        .method-card ul {
          margin: 0;
          padding-left: 18px;
          color: #64748b;
          line-height: 1.7;
          font-size: 14px;
        }

        .chapters {
          background: white;
          border: 1px solid #dbe7f5;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 18px 45px rgba(15, 35, 77, 0.06);
        }

        .section-title {
          margin-bottom: 24px;
        }

        .section-title h2 {
          margin: 0;
          font-size: 32px;
          letter-spacing: -0.06em;
          color: #07194f;
        }

        .section-title p {
          margin: 8px 0 0;
          color: #64748b;
          line-height: 1.6;
        }

        .chapters-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .chapter-card {
          border: 1px solid #dbe7f5;
          border-radius: 24px;
          padding: 22px;
          background: #ffffff;
          min-height: 330px;
          display: flex;
          flex-direction: column;
          transition: 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .chapter-card::before {
          content: "";
          position: absolute;
          inset: 0 0 auto 0;
          height: 5px;
          background: var(--accent);
        }

        .chapter-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 42px rgba(15, 35, 77, 0.10);
          border-color: #b8cff4;
        }

        .chapter-emoji {
          width: 54px;
          height: 54px;
          border-radius: 18px;
          display: grid;
          place-items: center;
          font-size: 28px;
          background: #f1f6ff;
          margin-bottom: 18px;
        }

        .chapter-meta {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
          align-items: center;
        }

        .chapter-number {
          color: var(--accent);
          font-weight: 900;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .chapter-duration {
          color: #64748b;
          font-size: 12px;
          font-weight: 800;
        }

        .chapter-card h3 {
          margin: 0;
          color: #07194f;
          font-size: 21px;
          letter-spacing: -0.05em;
          line-height: 1.18;
        }

        .chapter-type {
          display: inline-flex;
          width: fit-content;
          margin-top: 14px;
          border-radius: 999px;
          padding: 7px 10px;
          font-size: 12px;
          font-weight: 900;
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 12%, white);
        }

        .chapter-card p {
          color: #64748b;
          line-height: 1.62;
          font-size: 14px;
          margin: 14px 0 18px;
        }

        .status {
          color: #50617f;
          background: #f1f5f9;
          padding: 9px 11px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 14px;
        }

        .chapter-link {
          margin-top: auto;
          color: white;
          background: #173b73;
          border-radius: 13px;
          padding: 13px 14px;
          font-weight: 900;
          text-align: center;
          transition: 0.2s ease;
        }

        .chapter-link:hover {
          background: #2563eb;
        }

        @media (max-width: 1100px) {
          .links {
            display: none;
          }

          .hero {
            grid-template-columns: 1fr;
          }

          .section {
            grid-template-columns: 1fr;
          }

          .sidebar {
            position: static;
          }

          .chapters-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 700px) {
          .container,
          .nav {
            width: calc(100% - 24px);
          }

          .hero {
            padding: 30px 24px;
          }

          .visual {
            min-height: 300px;
          }

          .float-card {
            display: none;
          }
        }
      `}</style>

      <header className="header">
        <nav className="nav">
          <Link href="/" className="brand">
            <span className="logo">C</span>
            <span>
              <span className="brand-title">CAPSES</span>
              <span className="brand-subtitle">Comprendre les SES</span>
            </span>
          </Link>

          <div className="links">
            <Link href="/" className="nav-link">Accueil</Link>
            <Link href="/bts-cejm" className="nav-link">BTS CEJM</Link>
            <Link href="/terminale" className="nav-link">Terminale</Link>
            <Link href="/premiere" className="nav-link">Première</Link>
            <Link href="/seconde" className="nav-link active">Seconde</Link>
            <Link href="/methodes" className="nav-link">Méthodes</Link>
            <Link href="/espace-eleves" className="nav-link">Mon espace</Link>
          </div>
          <TasteMobileMenu />
        </nav>
      </header>

      <div className="container">
        <section className="hero">
          <div>
            <div className="badge">SECONDE SES · PARCOURS D’ENTRÉE</div>

            <h1>
              Découvrir
              <span>les SES</span>
            </h1>

            <p className="hero-text">
              En Seconde, les SES servent à comprendre le monde réel : les entreprises,
              les prix, les richesses, les règles, les comportements et les choix collectifs.
              On part du quotidien pour construire les notions.
            </p>

            <div className="hero-actions">
              <a href="#chapitres" className="btn-primary">
                Voir les chapitres <span>→</span>
              </a>
              <Link href="/methodes" className="btn-secondary">
                Découvrir la méthode
              </Link>
            </div>
          </div>

          <div className="visual">
            <div className="float-card one">Économiste<br />Prix · production</div>
            <div className="float-card two">Sociologue<br />Groupes · normes</div>
            <div className="float-card three">Politiste<br />Règles · pouvoir</div>

            <div className="phone">
              <div className="phone-screen">
                <div className="phone-line" />
                <div className="phone-line small" />
                <div className="phone-line" />
                <div className="phone-line small" />
              </div>
            </div>
          </div>
        </section>

        <section id="chapitres" className="section">
          <aside className="sidebar">
            <h2>Organisation</h2>
            <p>
              Le chapitre 1 est une vidéo d’introduction légère. Les chapitres 2 et 3 sont
              des chapitres complets, alignés sur le format CapSES.
            </p>

            <div className="method-card">
              <strong>Format CapSES</strong>
              <ul>
                <li>cours clair ;</li>
                <li>vidéo courte ;</li>
                <li>notions essentielles ;</li>
                <li>quiz et entraînements ;</li>
                <li>fiche mémo.</li>
              </ul>
            </div>
          </aside>

          <section className="chapters">
            <div className="section-title">
              <h2>Les premiers chapitres de Seconde</h2>
              <p>
                Une entrée progressive : comprendre les SES, puis travailler sur la création
                de richesses et la formation des prix.
              </p>
            </div>

            <div className="chapters-grid">
              {CHAPITRES.map((chapitre) => (
                <article
                  key={chapitre.titre}
                  className="chapter-card"
                  style={{ "--accent": chapitre.accent } as React.CSSProperties}
                >
                  <div className="chapter-emoji">{chapitre.emoji}</div>

                  <div className="chapter-meta">
                    <span className="chapter-number">{chapitre.numero}</span>
                    <span className="chapter-duration">{chapitre.duree}</span>
                  </div>

                  <h3>{chapitre.titre}</h3>

                  <span className="chapter-type">{chapitre.type}</span>

                  <p>{chapitre.description}</p>

                  <div className="status">{chapitre.statut}</div>

                  {chapitre.statut === "Vidéo à intégrer" ? <span className="chapter-link" aria-disabled="true">Vidéo à venir</span> : <Link href={chapitre.href} className="chapter-link">Ouvrir</Link>}
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}