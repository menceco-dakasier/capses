"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DOMAIN_LABELS,
  TERMINALE_CHAPTERS,
  type TerminaleDomain,
} from "../data/terminale";

type Filter = "all" | TerminaleDomain;

const DOMAIN_COLORS: Record<TerminaleDomain, string> = {
  eco: "#f59e0b",
  socio: "#2563eb",
  rc: "#8b5cf6",
};

const DOMAIN_BACKGROUNDS: Record<TerminaleDomain, string> = {
  eco: "#fff7ed",
  socio: "#eff6ff",
  rc: "#f5f3ff",
};

export default function Home() {
  const [filter, setFilter] = useState<Filter>("all");

  const chapters = useMemo(
    () =>
      filter === "all"
        ? TERMINALE_CHAPTERS
        : TERMINALE_CHAPTERS.filter((chapter) => chapter.domain === filter),
    [filter]
  );

  return (
    <main className="capses-home">
      <style>{`
        .capses-home {
          min-height: 100vh;
          background:
            radial-gradient(circle at 82% 12%, rgba(37,99,235,.09), transparent 28%),
            radial-gradient(circle at 18% 18%, rgba(139,92,246,.07), transparent 26%),
            #f8fbff;
          color: #10214a;
          font-family: var(--font-geist-sans), Arial, sans-serif;
        }

        .home-shell {
          width: min(1180px, calc(100% - 32px));
          margin: 0 auto;
        }

        .topbar {
          position: sticky;
          top: 0;
          z-index: 30;
          background: rgba(255,255,255,.92);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid #e6ecf5;
        }

        .topbar-inner {
          min-height: 72px;
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 11px;
          text-decoration: none;
          color: #0b1d4d;
          font-weight: 850;
          font-size: 21px;
          letter-spacing: -.03em;
        }

        .brand-mark {
          width: 36px;
          height: 36px;
          border-radius: 11px;
          display: grid;
          place-items: center;
          background: linear-gradient(145deg, #0f2d68, #2563eb);
          color: white;
          box-shadow: 0 8px 18px rgba(37,99,235,.2);
        }

        .nav {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .nav a {
          text-decoration: none;
          color: #53627d;
          font-size: 14px;
          font-weight: 650;
          padding: 9px 12px;
          border-radius: 10px;
        }

        .nav a:hover {
          background: #eef4ff;
          color: #174cb7;
        }

        .top-actions {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .student-link {
          text-decoration: none;
          border: 1px solid #d8e2f0;
          color: #20417b;
          padding: 9px 14px;
          border-radius: 11px;
          font-size: 13px;
          font-weight: 700;
          background: white;
        }

        .hero {
          padding: 58px 0 28px;
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 46px;
          align-items: center;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #cfe0ff;
          background: #eef5ff;
          color: #2158c5;
          border-radius: 999px;
          padding: 7px 12px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .02em;
          margin-bottom: 20px;
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(42px, 6vw, 70px);
          line-height: .98;
          letter-spacing: -.055em;
          max-width: 690px;
          color: #081a48;
        }

        .hero h1 span {
          color: #2563eb;
        }

        .hero-copy {
          margin: 20px 0 26px;
          font-size: 17px;
          line-height: 1.65;
          color: #5a6982;
          max-width: 620px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .primary-button,
        .secondary-button {
          text-decoration: none;
          border-radius: 12px;
          padding: 12px 17px;
          font-size: 14px;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .primary-button {
          background: #0f47aa;
          color: white;
          box-shadow: 0 10px 24px rgba(15,71,170,.2);
        }

        .secondary-button {
          background: white;
          color: #20417b;
          border: 1px solid #dbe5f2;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 32px;
        }

        .hero-stat {
          background: rgba(255,255,255,.8);
          border: 1px solid #e1e9f4;
          border-radius: 14px;
          padding: 14px;
        }

        .hero-stat strong {
          display: block;
          font-size: 14px;
          color: #17366d;
          margin-bottom: 4px;
        }

        .hero-stat span {
          font-size: 12px;
          color: #74829a;
        }

        .hero-visual {
          position: relative;
          min-height: 440px;
          border-radius: 30px;
          overflow: hidden;
          border: 1px solid #dce6f4;
          background:
            linear-gradient(145deg, rgba(255,255,255,.92), rgba(236,244,255,.82)),
            #f4f8ff;
          box-shadow: 0 30px 70px rgba(46,73,120,.14);
        }

        .hero-visual::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 80% 25%, rgba(37,99,235,.18), transparent 25%),
            radial-gradient(circle at 20% 74%, rgba(16,185,129,.12), transparent 23%);
        }

        .visual-card {
          position: absolute;
          background: rgba(255,255,255,.92);
          border: 1px solid #dce7f6;
          box-shadow: 0 18px 36px rgba(66,92,134,.12);
          border-radius: 18px;
        }

        .visual-main {
          left: 9%;
          top: 12%;
          width: 70%;
          padding: 24px;
        }

        .visual-main .mini-label {
          color: #2563eb;
          font-size: 11px;
          font-weight: 850;
          text-transform: uppercase;
          letter-spacing: .08em;
        }

        .visual-main h3 {
          font-size: 28px;
          line-height: 1.08;
          margin: 10px 0 8px;
          letter-spacing: -.035em;
        }

        .visual-main p {
          margin: 0;
          font-size: 13px;
          line-height: 1.55;
          color: #6b7890;
        }

        .chart-bars {
          display: flex;
          align-items: end;
          gap: 8px;
          height: 110px;
          margin-top: 22px;
          padding: 15px;
          border-radius: 14px;
          background: #f4f8ff;
        }

        .chart-bars i {
          flex: 1;
          border-radius: 6px 6px 3px 3px;
          background: linear-gradient(#5b8ef2, #1d4ed8);
        }

        .quote-card {
          right: 6%;
          bottom: 9%;
          width: 50%;
          padding: 18px;
          transform: rotate(-2deg);
        }

        .quote-card strong {
          display: block;
          color: #1b4db7;
          font-size: 17px;
          line-height: 1.35;
        }

        .guyane-card {
          right: 5%;
          top: 10%;
          padding: 11px 14px;
          font-size: 12px;
          font-weight: 800;
          color: #08765b;
          background: #edfff9;
          border-color: #c7f3e4;
        }

        .section {
          padding: 40px 0 72px;
        }

        .section-head {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: end;
          margin-bottom: 22px;
        }

        .section-head h2 {
          margin: 0 0 5px;
          font-size: 28px;
          letter-spacing: -.035em;
          color: #0d2254;
        }

        .section-head p {
          margin: 0;
          color: #728099;
          font-size: 14px;
        }

        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .filter-button {
          border: 1px solid #dce5f2;
          background: white;
          color: #5e6f89;
          border-radius: 999px;
          padding: 8px 13px;
          font-size: 12px;
          font-weight: 750;
          cursor: pointer;
        }

        .filter-button.active {
          border-color: #1f5cd5;
          color: white;
          background: #1f5cd5;
        }

        .chapter-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .chapter-card {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          min-height: 258px;
          border: 1px solid #e0e8f3;
          background: white;
          border-radius: 18px;
          padding: 18px;
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
        }

        .chapter-card:hover {
          transform: translateY(-3px);
          border-color: #b9cdef;
          box-shadow: 0 18px 38px rgba(49,78,127,.1);
        }

        .chapter-top {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
          margin-bottom: 18px;
        }

        .chapter-number {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          font-size: 13px;
          font-weight: 850;
        }

        .domain-pill {
          font-size: 10px;
          font-weight: 850;
          text-transform: uppercase;
          letter-spacing: .06em;
        }

        .chapter-card h3 {
          margin: 0 0 8px;
          font-size: 19px;
          line-height: 1.15;
          letter-spacing: -.025em;
          color: #0e2354;
        }

        .chapter-question {
          margin: 0 0 16px;
          font-size: 13px;
          line-height: 1.5;
          color: #697991;
          min-height: 58px;
        }

        .notions {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .notion {
          border: 1px solid #e4eaf3;
          color: #64738a;
          background: #f9fbfd;
          border-radius: 7px;
          padding: 4px 7px;
          font-size: 10px;
          font-weight: 650;
        }

        .chapter-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          border-top: 1px solid #edf1f6;
          margin-top: auto;
          padding-top: 14px;
          font-size: 12px;
          color: #8290a4;
        }

        .chapter-footer strong {
          color: #2159c5;
        }

        .approach {
          margin-top: 28px;
          border-radius: 22px;
          border: 1px solid #dfe8f5;
          background: linear-gradient(125deg, #f1f7ff, #ffffff 55%, #f5f3ff);
          padding: 28px;
          display: grid;
          grid-template-columns: .8fr 1.2fr;
          gap: 26px;
          align-items: center;
        }

        .approach h3 {
          margin: 0 0 8px;
          font-size: 25px;
          color: #102453;
        }

        .approach p {
          margin: 0;
          color: #6a7890;
          line-height: 1.6;
          font-size: 14px;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .step {
          background: white;
          border: 1px solid #e0e7f2;
          border-radius: 14px;
          padding: 15px;
        }

        .step b {
          display: block;
          color: #1b51b8;
          font-size: 13px;
          margin-bottom: 5px;
        }

        .step span {
          color: #7a879b;
          font-size: 11px;
          line-height: 1.45;
        }

        .footer {
          border-top: 1px solid #e3e9f2;
          background: white;
          padding: 24px 0;
        }

        .footer-inner {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          color: #7a879c;
          font-size: 12px;
        }

        @media (max-width: 900px) {
          .nav { display: none; }
          .hero {
            grid-template-columns: 1fr;
            padding-top: 38px;
          }
          .hero-visual { min-height: 350px; }
          .chapter-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
          .approach { grid-template-columns: 1fr; }
        }

        @media (max-width: 620px) {
          .home-shell { width: min(100% - 22px, 1180px); }
          .topbar-inner { min-height: 64px; gap: 12px; }
          .student-link { display: none; }
          .hero h1 { font-size: 44px; }
          .hero-copy { font-size: 15px; }
          .hero-stats { grid-template-columns: 1fr; }
          .hero-visual { min-height: 310px; border-radius: 20px; }
          .visual-main { width: 84%; left: 8%; top: 10%; padding: 18px; }
          .visual-main h3 { font-size: 23px; }
          .quote-card { width: 67%; right: 7%; bottom: 7%; }
          .guyane-card { display: none; }
          .section-head { align-items: start; flex-direction: column; }
          .chapter-grid { grid-template-columns: 1fr; }
          .chapter-card { min-height: 230px; }
          .steps { grid-template-columns: 1fr; }
          .footer-inner { flex-direction: column; }
        }
      `}</style>

      <header className="topbar">
        <div className="home-shell topbar-inner">
          <Link className="brand" href="/">
            <span className="brand-mark">C</span>
            <span>CAPSES</span>
          </Link>

          <nav className="nav" aria-label="Navigation principale">
            <a href="#chapitres">Chapitres</a>
            <Link href="/espace-eleves">Suivi</Link>
            <a href="#methode">Méthode</a>
          </nav>

          <div className="top-actions">
            <Link className="student-link" href="/espace-eleves">
              Mon espace
            </Link>
          </div>
        </div>
      </header>

      <div className="home-shell">
        <section className="hero">
          <div>
            <div className="eyebrow">Terminale SES · Année 2026-2027</div>
            <h1>
              Comprendre les SES.
              <br />
              <span>Progresser avec méthode.</span>
            </h1>
            <p className="hero-copy">
              CAPSES rassemble les cours, notions essentielles, mécanismes,
              méthodes du bac, quiz et exercices dans un parcours clair, pensé
              pour réviser efficacement tout au long de l’année.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#chapitres">
                Commencer à réviser <span>→</span>
              </a>
              <Link className="secondary-button" href="/espace-eleves">
                Voir ma progression
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <strong>9 chapitres</strong>
                <span>Tout le programme de Terminale</span>
              </div>
              <div className="hero-stat">
                <strong>Parcours guidés</strong>
                <span>Cours, notions, quiz et méthode</span>
              </div>
              <div className="hero-stat">
                <strong>Objectif bac</strong>
                <span>Apprendre, comprendre, s’entraîner</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-label="Aperçu du parcours de révision CAPSES">
            <div className="visual-card visual-main">
              <span className="mini-label">Ton parcours CAPSES</span>
              <h3>Une progression visible, chapitre après chapitre.</h3>
              <p>
                Repère ce qui est acquis, ce qu’il faut revoir et passe
                facilement du cours à l’entraînement.
              </p>
              <div className="chart-bars" aria-hidden="true">
                <i style={{ height: "33%" }} />
                <i style={{ height: "52%" }} />
                <i style={{ height: "44%" }} />
                <i style={{ height: "72%" }} />
                <i style={{ height: "88%" }} />
              </div>
            </div>
            <div className="visual-card guyane-card">Pensé aussi pour les élèves de Guyane</div>
            <div className="visual-card quote-card">
              <strong>« Comprendre aujourd’hui, réussir demain. »</strong>
            </div>
          </div>
        </section>

        <section className="section" id="chapitres">
          <div className="section-head">
            <div>
              <h2>Les 9 chapitres de Terminale</h2>
              <p>Ordre de progression 2026-2027.</p>
            </div>

            <div className="filters" aria-label="Filtrer les chapitres">
              {(Object.keys(DOMAIN_LABELS) as Filter[]).map((key) => (
                <button
                  key={key}
                  className={`filter-button ${filter === key ? "active" : ""}`}
                  onClick={() => setFilter(key)}
                >
                  {DOMAIN_LABELS[key]}
                </button>
              ))}
            </div>
          </div>

          <div className="chapter-grid">
            {chapters.map((chapter) => {
              const color = DOMAIN_COLORS[chapter.domain];
              const background = DOMAIN_BACKGROUNDS[chapter.domain];

              return (
                <Link
                  className="chapter-card"
                  href={`/terminale/${chapter.slug}`}
                  key={chapter.slug}
                >
                  <div className="chapter-top">
                    <span
                      className="chapter-number"
                      style={{ background, color }}
                    >
                      {chapter.order}
                    </span>
                    <span className="domain-pill" style={{ color }}>
                      {chapter.domainLabel}
                    </span>
                  </div>

                  <h3>{chapter.shortTitle}</h3>
                  <p className="chapter-question">{chapter.question}</p>

                  <div className="notions">
                    {chapter.notions.map((notion) => (
                      <span className="notion" key={notion}>
                        {notion}
                      </span>
                    ))}
                  </div>

                  <div className="chapter-footer">
                    <span>Révision rapide · {chapter.quickTime}</span>
                    <strong>Ouvrir →</strong>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="approach" id="methode">
            <div>
              <h3>Une méthode simple pour travailler régulièrement</h3>
              <p>
                Chaque chapitre garde son contenu pédagogique actuel, mais le
                parcours devient plus lisible : comprendre d’abord, mémoriser
                les notions, puis s’entraîner au format du bac.
              </p>
            </div>
            <div className="steps">
              <div className="step">
                <b>1 · Comprendre</b>
                <span>Cours synthétique et mécanismes essentiels.</span>
              </div>
              <div className="step">
                <b>2 · Mémoriser</b>
                <span>Notions, repères et erreurs fréquentes.</span>
              </div>
              <div className="step">
                <b>3 · S’entraîner</b>
                <span>Quiz, exercices et méthode du baccalauréat.</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="home-shell footer-inner">
          <strong>CAPSES · Sciences économiques et sociales</strong>
          <span>Terminale · Seconde · Première à venir</span>
        </div>
      </footer>
    </main>
  );
}
