"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";

type Matiere = "ECO" | "SOCIO" | "RC";

type Chapitre = {
  slug: string;
  titre: string;
  matiere: Matiere;
  label: string;
  intro: string;
  notions: string[];
  duree: string;
};

const CHAPITRES: Chapitre[] = [
  {
    slug: "croissance-economique",
    titre: "La croissance économique",
    matiere: "ECO",
    label: "Économie",
    intro: "Comprendre les sources de la croissance et ses limites.",
    notions: ["PIB", "Productivité", "Institutions"],
    duree: "20 min",
  },
  {
    slug: "commerce-international",
    titre: "Le commerce international",
    matiere: "ECO",
    label: "Économie",
    intro: "Comprendre le libre-échange, les avantages comparatifs et le protectionnisme.",
    notions: ["Libre-échange", "Avantage comparatif", "Protectionnisme"],
    duree: "25 min",
  },
  {
    slug: "chomage",
    titre: "Le chômage",
    matiere: "ECO",
    label: "Économie",
    intro: "Comprendre les causes du chômage et les politiques de lutte.",
    notions: ["Chômage classique", "Chômage keynésien", "Politiques de l’emploi"],
    duree: "20 min",
  },
  {
    slug: "politiques-economiques-europeennes",
    titre: "Les politiques économiques européennes",
    matiere: "ECO",
    label: "Économie",
    intro: "Comprendre les contraintes et objectifs des politiques économiques européennes.",
    notions: ["BCE", "Politique monétaire", "Politique budgétaire"],
    duree: "25 min",
  },
  {
    slug: "structure-sociale",
    titre: "La structure sociale",
    matiere: "SOCIO",
    label: "Sociologie",
    intro: "Comprendre comment la société française est structurée et hiérarchisée.",
    notions: ["PCS", "Classes sociales", "Inégalités"],
    duree: "15 min",
  },
  {
    slug: "mobilite-sociale",
    titre: "La mobilité sociale",
    matiere: "SOCIO",
    label: "Sociologie",
    intro: "Comprendre les formes de mobilité sociale et leurs déterminants.",
    notions: ["Mobilité", "Fluidité sociale", "Déclassement"],
    duree: "20 min",
  },
  {
    slug: "travail-emploi",
    titre: "Travail, emploi, chômage",
    matiere: "SOCIO",
    label: "Sociologie",
    intro: "Comprendre les mutations du travail et de l’emploi.",
    notions: ["Emploi", "Précarité", "Organisation du travail"],
    duree: "20 min",
  },
  {
    slug: "engagement-politique",
    titre: "L’engagement politique",
    matiere: "SOCIO",
    label: "Sociologie",
    intro: "Comprendre les formes et les transformations de l’engagement politique.",
    notions: ["Vote", "Militantisme", "Action collective"],
    duree: "15 min",
  },
  {
    slug: "environnement",
    titre: "L’environnement, un enjeu mondial",
    matiere: "RC",
    label: "Regards croisés",
    intro: "Comprendre les instruments des politiques environnementales.",
    notions: ["Externalités", "Biens communs", "Taxation"],
    duree: "25 min",
  },
];

const MATIERE_COLORS: Record<Matiere, string> = {
  ECO: "#2563eb",
  SOCIO: "#0f766e",
  RC: "#7c3aed",
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [filtre, setFiltre] = useState<Matiere | "ALL">("ALL");
  const [progression, setProgression] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("capses_progression");
    if (saved) setProgression(Number(saved));
  }, []);

  const chapitresFiltres = useMemo(() => {
    return CHAPITRES.filter((chapitre) => {
      const matchFiltre = filtre === "ALL" || chapitre.matiere === filtre;
      const texte = `${chapitre.titre} ${chapitre.label} ${chapitre.notions.join(" ")}`.toLowerCase();
      const matchRecherche = texte.includes(query.toLowerCase());
      return matchFiltre && matchRecherche;
    });
  }, [query, filtre]);

  return (
    <main className="page">
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

        button,
        input {
          font-family: inherit;
        }

        .page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(37, 99, 235, 0.12), transparent 32%),
            linear-gradient(180deg, #f8fbff 0%, #eef4fb 100%);
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
          width: min(1500px, calc(100% - 48px));
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

        .search-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search {
          width: 290px;
          border: 1px solid #d6e2f0;
          background: #f8fbff;
          border-radius: 16px;
          padding: 14px 16px;
          color: #10234d;
          outline: none;
          font-size: 14px;
        }

        .search:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.08);
        }

        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #173b73;
          color: white;
          display: grid;
          place-items: center;
          font-weight: 900;
        }

        .container {
          width: min(1400px, calc(100% - 48px));
          margin: 0 auto;
        }

        .hero-card {
          margin-top: 26px;
          background: white;
          border: 1px solid #dbe7f5;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(15, 35, 77, 0.10);
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          min-height: 560px;
        }

        .hero-left {
          padding: 70px 58px 46px;
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
          margin-bottom: 26px;
        }

        .hero-title {
          margin: 0;
          font-size: clamp(54px, 6vw, 84px);
          letter-spacing: -0.07em;
          line-height: 0.95;
          color: #07194f;
          font-weight: 900;
        }

        .hero-title span {
          color: #2563eb;
          display: block;
        }

        .hero-subtitle {
          margin: 24px 0 0;
          font-size: 24px;
          line-height: 1.35;
          color: #334b72;
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .hero-text {
          max-width: 620px;
          margin: 22px 0 0;
          font-size: 17px;
          line-height: 1.75;
          color: #60708e;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          margin-top: 34px;
          flex-wrap: wrap;
        }

        .btn-primary,
        .btn-secondary {
          border-radius: 14px;
          padding: 16px 22px;
          font-weight: 900;
          font-size: 16px;
          transition: 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
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

        .proofs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
          margin-top: 46px;
        }

        .proof {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .proof-icon {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-weight: 900;
        }

        .proof strong {
          display: block;
          color: #173b73;
          font-size: 15px;
          margin-bottom: 4px;
        }

        .proof span {
          color: #64748b;
          font-size: 12px;
        }

        .hero-right {
          position: relative;
          min-height: 560px;
          background:
            linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0)),
            linear-gradient(135deg, #dcecff 0%, #f4f8ff 42%, #d9e8f7 100%);
          overflow: hidden;
        }

        .student-scene {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 0;
        }

        .student-card {
          width: min(420px, 80%);
          height: 470px;
          border-radius: 190px 190px 0 0;
          background:
            radial-gradient(circle at 48% 24%, #f6d3bd 0 10%, transparent 10.5%),
            linear-gradient(155deg, #2f7ee6 0 22%, #8b5cf6 22% 42%, #14b8a6 42% 65%, #f97316 65% 100%);
          opacity: 0.92;
          box-shadow: inset 0 0 0 18px rgba(255,255,255,0.25), 0 30px 80px rgba(15, 35, 77, 0.15);
          position: relative;
        }

        .student-card::before {
          content: "";
          position: absolute;
          width: 190px;
          height: 120px;
          border-radius: 50%;
          background: #101828;
          top: 52px;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0.88;
        }

        .student-card::after {
          content: "";
          position: absolute;
          left: 40px;
          right: 40px;
          bottom: 0;
          height: 150px;
          background: rgba(255,255,255,0.72);
          border-radius: 28px 28px 0 0;
        }

        .handwriting {
          position: absolute;
          top: 78px;
          left: 34px;
          color: #2563eb;
          font-size: 28px;
          font-weight: 900;
          font-style: italic;
          line-height: 1.05;
          transform: rotate(-6deg);
          letter-spacing: -0.05em;
        }

        .handwriting::after {
          content: "";
          display: block;
          width: 118px;
          height: 4px;
          background: #2563eb;
          border-radius: 999px;
          margin-top: 8px;
          transform: rotate(-7deg);
        }

        .floating {
          position: absolute;
          background: rgba(255,255,255,0.86);
          border: 1px solid rgba(195, 211, 232, 0.8);
          backdrop-filter: blur(12px);
          border-radius: 18px;
          box-shadow: 0 18px 38px rgba(15, 35, 77, 0.12);
          color: #24496f;
          font-weight: 900;
          line-height: 1.3;
        }

        .floating.top {
          top: 34px;
          right: 34px;
          padding: 20px 22px;
          font-size: 15px;
        }

        .floating.bottom {
          right: 34px;
          bottom: 44px;
          padding: 18px 22px;
          font-size: 15px;
          font-style: italic;
        }

        .section {
          margin-top: 34px;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 24px;
          align-items: start;
          padding-bottom: 60px;
        }

        .sidebar {
          background: white;
          border: 1px solid #dbe7f5;
          border-radius: 24px;
          padding: 22px;
          box-shadow: 0 18px 45px rgba(15, 35, 77, 0.06);
          position: sticky;
          top: 110px;
        }

        .sidebar h2 {
          margin: 0 0 14px;
          font-size: 18px;
          color: #07194f;
        }

        .filter-btn {
          width: 100%;
          border: 1px solid #dbe7f5;
          background: #f8fbff;
          color: #50617f;
          padding: 13px 14px;
          border-radius: 14px;
          font-weight: 900;
          cursor: pointer;
          text-align: left;
          margin-top: 8px;
        }

        .filter-btn.active {
          background: #2563eb;
          color: white;
          border-color: #2563eb;
        }

        .progress-box {
          margin-top: 22px;
          background: #f1f6ff;
          border-radius: 18px;
          padding: 18px;
        }

        .progress-box strong {
          display: block;
          color: #173b73;
          margin-bottom: 8px;
        }

        .progress-bar {
          height: 8px;
          border-radius: 999px;
          background: #dbe7f5;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          width: var(--progress);
          background: linear-gradient(90deg, #2563eb, #06b6d4);
        }

        .chapters {
          background: white;
          border: 1px solid #dbe7f5;
          border-radius: 24px;
          padding: 26px;
          box-shadow: 0 18px 45px rgba(15, 35, 77, 0.06);
        }

        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 20px;
          margin-bottom: 20px;
        }

        .section-title h2 {
          margin: 0;
          font-size: 30px;
          letter-spacing: -0.05em;
          color: #07194f;
        }

        .section-title p {
          margin: 6px 0 0;
          color: #64748b;
          font-size: 15px;
        }

        .chapters-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .chapter-card {
          border: 1px solid #dbe7f5;
          border-radius: 22px;
          padding: 20px;
          background: #ffffff;
          min-height: 245px;
          display: flex;
          flex-direction: column;
          transition: 0.2s ease;
        }

        .chapter-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 42px rgba(15, 35, 77, 0.10);
          border-color: #b8cff4;
        }

        .chapter-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
        }

        .chip {
          border-radius: 999px;
          padding: 7px 10px;
          font-size: 11px;
          font-weight: 900;
          background: #eef5ff;
        }

        .duration {
          color: #64748b;
          font-size: 12px;
          font-weight: 800;
        }

        .chapter-card h3 {
          margin: 0;
          color: #07194f;
          font-size: 18px;
          letter-spacing: -0.04em;
          line-height: 1.2;
        }

        .chapter-card p {
          color: #64748b;
          line-height: 1.55;
          font-size: 14px;
          margin: 12px 0 14px;
        }

        .notions {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 18px;
        }

        .notion {
          background: #f1f5f9;
          color: #42526d;
          padding: 5px 8px;
          border-radius: 9px;
          font-size: 11px;
          font-weight: 700;
        }

        .chapter-link {
          margin-top: auto;
          color: white;
          background: #173b73;
          border-radius: 12px;
          padding: 12px 14px;
          font-weight: 900;
          text-align: center;
          transition: 0.2s ease;
        }

        .chapter-link:hover {
          background: #2563eb;
        }

        @media (max-width: 1150px) {
          .links {
            display: none;
          }

          .hero-card {
            grid-template-columns: 1fr;
          }

          .hero-right {
            min-height: 420px;
          }

          .section {
            grid-template-columns: 1fr;
          }

          .sidebar {
            position: static;
          }

          .chapters-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 720px) {
          .nav {
            width: calc(100% - 24px);
          }

          .search-wrap {
            display: none;
          }

          .hero-left {
            padding: 42px 26px;
          }

          .proofs,
          .chapters-grid {
            grid-template-columns: 1fr;
          }

          .hero-title {
            font-size: 52px;
          }

          .section {
            margin-top: 20px;
          }
        }
      `}</style>

      <header className="header">
        <nav className="nav">
          <Link href="/" className="brand">
            <span className="logo">C</span>
            <span>
              <span className="brand-title">CAPSES</span>
              <span className="brand-subtitle">Réussir le bac de SES</span>
            </span>
          </Link>

          <div className="links">
            <Link href="/" className="nav-link active">Accueil</Link>
            <Link href="/bts-cejm" className="nav-link">BTS CEJM</Link>
            <Link href="#chapitres" className="nav-link">Terminale</Link>
            <Link href="/premiere" className="nav-link">Première</Link>
            <Link href="/seconde" className="nav-link">Seconde</Link>
            <Link href="/methodologie" className="nav-link">Méthodes</Link>
            <Link href="/espace-eleves" className="nav-link">Mon espace</Link>
          </div>

          <div className="search-wrap">
            <input
              className="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher une notion, un chapitre..."
            />
            <div className="avatar">EC</div>
          </div>
        </nav>
      </header>

      <div className="container">
        <section className="hero-card">
          <div className="hero-left">
            <div className="badge">TERMINALE SES · 2026-2027</div>

            <h1 className="hero-title">
              Bienvenue sur
              <span>CAPSES</span>
            </h1>

            <p className="hero-subtitle">
              La plateforme de révision en SES pour progresser toute l’année
            </p>

            <p className="hero-text">
              Des cours clairs, des schémas, des exemples, des méthodes et des exercices
              pour comprendre, mémoriser et s’entraîner efficacement.
            </p>

            <div className="hero-actions">
              <a href="#chapitres" className="btn-primary">
                Commencer à réviser <span>→</span>
              </a>
              <Link href="/espace-eleves" className="btn-secondary">
                ◎ Voir ma progression
              </Link>
            </div>

            <div className="proofs">
              <div className="proof">
                <span className="proof-icon" style={{ background: "#eaf2ff", color: "#2563eb" }}>□</span>
                <div>
                  <strong>9 chapitres complets</strong>
                  <span>Tout le programme de Terminale</span>
                </div>
              </div>

              <div className="proof">
                <span className="proof-icon" style={{ background: "#fff1d8", color: "#f59e0b" }}>□</span>
                <div>
                  <strong>Des contenus clairs</strong>
                  <span>Cours, schémas, exemples</span>
                </div>
              </div>

              <div className="proof">
                <span className="proof-icon" style={{ background: "#dcfce7", color: "#059669" }}>◎</span>
                <div>
                  <strong>Pour progresser vraiment</strong>
                  <span>Quiz, exercices et suivi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="handwriting">
              Comprendre<br />
              aujourd’hui,<br />
              réussir demain
            </div>

            <div className="floating top">
              Des SES<br />
              plus claires,<br />
              plus simples,<br />
              plus concrètes.
            </div>

            <div className="floating bottom">
              « Tout commence<br />
              par une bonne<br />
              méthode. »
            </div>

            <div className="student-scene">
              <div className="student-card" />
            </div>
          </div>
        </section>

        <section id="chapitres" className="section">
          <aside className="sidebar">
            <h2>Terminale SES</h2>

            <button
              className={filtre === "ALL" ? "filter-btn active" : "filter-btn"}
              onClick={() => setFiltre("ALL")}
            >
              Tous les chapitres
            </button>

            <button
              className={filtre === "ECO" ? "filter-btn active" : "filter-btn"}
              onClick={() => setFiltre("ECO")}
            >
              Économie
            </button>

            <button
              className={filtre === "SOCIO" ? "filter-btn active" : "filter-btn"}
              onClick={() => setFiltre("SOCIO")}
            >
              Sociologie
            </button>

            <button
              className={filtre === "RC" ? "filter-btn active" : "filter-btn"}
              onClick={() => setFiltre("RC")}
            >
              Regards croisés
            </button>

            <div className="progress-box">
              <strong>Progression</strong>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ "--progress": `${progression}%` } as CSSProperties}
                />
              </div>
              <p style={{ margin: "8px 0 0", color: "#64748b", fontSize: 13 }}>
                {progression}% du parcours terminé
              </p>
            </div>
          </aside>

          <section className="chapters">
            <div className="section-title">
              <div>
                <h2>Les chapitres de Terminale</h2>
                <p>Choisis un chapitre pour commencer ou reprendre ta révision.</p>
              </div>
              <p>{chapitresFiltres.length} résultat(s)</p>
            </div>

            <div className="chapters-grid">
              {chapitresFiltres.map((chapitre) => (
                <article key={chapitre.slug} className="chapter-card">
                  <div className="chapter-top">
                    <span
                      className="chip"
                      style={{
                        color: MATIERE_COLORS[chapitre.matiere],
                        background: `${MATIERE_COLORS[chapitre.matiere]}14`,
                      }}
                    >
                      {chapitre.label}
                    </span>
                    <span className="duration">{chapitre.duree}</span>
                  </div>

                  <h3>{chapitre.titre}</h3>
                  <p>{chapitre.intro}</p>

                  <div className="notions">
                    {chapitre.notions.map((notion) => (
                      <span key={notion} className="notion">
                        {notion}
                      </span>
                    ))}
                  </div>

                  <Link href={`/terminale/${chapitre.slug}`} className="chapter-link">
                    Ouvrir le chapitre
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}