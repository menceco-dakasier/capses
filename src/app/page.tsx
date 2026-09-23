"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  TERMINALE_CHAPTERS,
  type TerminaleChapter,
} from "../data/terminale";

type ProgressStatus = "non-commence" | "en-cours" | "valide";
type Progress = Record<string, ProgressStatus>;

const domainStyle = {
  eco: { accent: "#f59e0b", soft: "#fff3df" },
  socio: { accent: "#2563eb", soft: "#eaf3ff" },
  rc: { accent: "#8b5cf6", soft: "#f2ebff" },
};

function progressValue(status?: ProgressStatus) {
  if (status === "valide") return 100;
  if (status === "en-cours") return 50;
  return 0;
}

function chapterIcon(chapter: TerminaleChapter) {
  const icons: Record<string, string> = {
    "croissance-economique": "▥",
    "structure-sociale": "●●",
    "commerce-international": "↗",
    "politiques-europeennes": "▦",
    environnement: "◒",
    "engagement-politique": "✦",
    "mobilite-sociale": "⇅",
    chomage: "⌁",
    "mutations-travail-emploi": "▣",
  };
  return icons[chapter.slug] ?? chapter.icon;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [progress, setProgress] = useState<Progress>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("capses_progress");
      if (saved) setProgress(JSON.parse(saved));
    } catch {}
  }, []);

  const visibleChapters = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("fr");
    if (!normalized) return TERMINALE_CHAPTERS;

    return TERMINALE_CHAPTERS.filter((chapter) =>
      [
        chapter.shortTitle,
        chapter.question,
        chapter.domainLabel,
        ...chapter.notions,
      ]
        .join(" ")
        .toLocaleLowerCase("fr")
        .includes(normalized)
    );
  }, [query]);

  const validated = TERMINALE_CHAPTERS.filter(
    (chapter) => progress[chapter.slug] === "valide"
  ).length;

  const overall = Math.round(
    TERMINALE_CHAPTERS.reduce(
      (sum, chapter) => sum + progressValue(progress[chapter.slug]),
      0
    ) / TERMINALE_CHAPTERS.length
  );

  return (
    <main className="home">
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        .home {
          min-height: 100vh;
          color: #10214a;
          background:
            radial-gradient(circle at 15% 0%, rgba(96,165,250,.14), transparent 25%),
            radial-gradient(circle at 88% 2%, rgba(139,92,246,.11), transparent 22%),
            #f7faff;
          font-family: var(--font-geist-sans), Arial, sans-serif;
        }

        .shell {
          width: min(1240px, calc(100% - 34px));
          margin: 0 auto;
        }

        .header {
          position: sticky;
          top: 0;
          z-index: 40;
          background: rgba(255,255,255,.94);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid #e4ebf5;
        }

        .header-inner {
          min-height: 72px;
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #10255e;
          min-width: max-content;
        }

        .brand-logo {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          color: white;
          font-weight: 900;
          background: linear-gradient(145deg,#163e86,#4f7fd9);
          box-shadow: 0 7px 18px rgba(32,77,158,.22);
        }

        .brand-name {
          font-size: 20px;
          line-height: 1;
          font-weight: 900;
          letter-spacing: -.035em;
        }

        .brand-sub {
          margin-top: 3px;
          color: #8090a7;
          font-size: 9px;
          font-weight: 650;
        }

        .nav {
          display: flex;
          align-self: stretch;
          gap: 3px;
        }

        .nav a {
          position: relative;
          display: grid;
          place-items: center;
          text-decoration: none;
          color: #52657f;
          font-size: 12px;
          font-weight: 700;
          padding: 0 12px;
        }

        .nav a.active {
          color: #1851bd;
          background: #f2f6ff;
        }

        .nav a.active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 12px;
          right: 12px;
          height: 2px;
          border-radius: 4px;
          background: #2563eb;
        }

        .header-tools {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .search {
          width: 238px;
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f2f6fb;
          border: 1px solid #e2e9f3;
          border-radius: 12px;
          padding: 9px 12px;
        }

        .search span { color: #8190a7; }

        .search input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: #344865;
          font-size: 12px;
          font-family: inherit;
        }

        .avatar {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #284878;
          color: white;
          font-size: 11px;
          font-weight: 800;
          text-decoration: none;
        }

        .hero-wrap {
          padding: 18px 0 0;
        }

        .hero {
          min-height: 410px;
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.08fr .92fr;
          border: 1px solid #dfe7f3;
          border-radius: 20px 20px 0 0;
          background:
            linear-gradient(100deg,#ffffff 0%,#fbfdff 48%,rgba(242,248,255,.72) 65%,rgba(224,238,255,.6) 100%);
          box-shadow: 0 15px 45px rgba(43,75,122,.08);
        }

        .hero-copy {
          position: relative;
          z-index: 3;
          padding: 50px 28px 34px 52px;
        }

        .year {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 14px;
          padding: 6px 10px;
          border: 1px solid #d5e4ff;
          border-radius: 999px;
          background: #f1f6ff;
          color: #2d5fbd;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .04em;
          text-transform: uppercase;
        }

        .hero h1 {
          margin: 0;
          color: #081a4b;
          font-size: clamp(40px, 4.7vw, 64px);
          line-height: .98;
          letter-spacing: -.052em;
        }

        .hero h1 span { color: #2563eb; }

        .hero-lead {
          margin: 8px 0 0;
          color: #3e5270;
          font-size: 19px;
          font-weight: 500;
          letter-spacing: -.01em;
        }

        .hero-text {
          margin: 17px 0 24px;
          max-width: 610px;
          color: #60728a;
          font-size: 14px;
          line-height: 1.65;
        }

        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .btn {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border-radius: 10px;
          padding: 0 17px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          transition: .18s ease;
        }

        .btn-primary {
          background: #124ca9;
          color: white;
          box-shadow: 0 8px 22px rgba(18,76,169,.18);
        }

        .btn-primary:hover { background:#0d408f; transform:translateY(-1px); }

        .btn-secondary {
          border: 1px solid #dce5f1;
          background: rgba(255,255,255,.92);
          color: #294a80;
        }

        .benefits {
          margin-top: 27px;
          display: grid;
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: 14px;
          max-width: 650px;
        }

        .benefit {
          display: flex;
          gap: 10px;
          align-items: center;
          min-width: 0;
        }

        .benefit-icon {
          width: 36px;
          height: 36px;
          flex: 0 0 36px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-size: 14px;
          font-weight: 900;
        }

        .benefit strong {
          display: block;
          color: #173563;
          font-size: 11px;
          line-height: 1.25;
        }

        .benefit small {
          display: block;
          margin-top: 3px;
          color: #8794a6;
          font-size: 9px;
          line-height: 1.25;
        }

        .hero-photo {
          position: relative;
          min-height: 410px;
          overflow: hidden;
        }

        .hero-photo-image {
          object-fit: cover;
          object-position: center;
        }

        .hero-photo::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg,#fbfdff 0%,rgba(251,253,255,.15) 22%,transparent 48%);
          pointer-events: none;
        }

        .scribble {
          position: absolute;
          z-index: 2;
          top: 65px;
          left: 2%;
          color: #2363df;
          font-size: 19px;
          font-weight: 700;
          font-style: italic;
          line-height: 1.18;
          transform: rotate(-8deg);
          text-shadow: 0 1px 0 white;
        }

        .scribble::after {
          content: "";
          position: absolute;
          width: 78px;
          height: 2px;
          background: #2363df;
          left: 8px;
          bottom: -8px;
          transform: rotate(-8deg);
        }

        .photo-card {
          position: absolute;
          z-index: 3;
          right: 22px;
          width: 145px;
          border: 1px solid rgba(255,255,255,.7);
          border-radius: 13px;
          background: rgba(245,250,255,.82);
          backdrop-filter: blur(9px);
          color: #315785;
          padding: 15px;
          box-shadow: 0 12px 28px rgba(48,75,112,.10);
          font-size: 11px;
          font-weight: 750;
          line-height: 1.35;
        }

        .photo-card.top { top: 20px; }
        .photo-card.bottom {
          bottom: 35px;
          color: #315785;
          font-style: italic;
          font-weight: 650;
        }

        .program {
          border: 1px solid #dfe7f3;
          border-top: 0;
          border-radius: 0 0 20px 20px;
          background: rgba(255,255,255,.96);
          padding: 24px 28px 30px;
          box-shadow: 0 20px 46px rgba(43,75,122,.07);
        }

        .program-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 18px;
        }

        .program-head h2 {
          margin: 0 0 4px;
          color: #102653;
          font-size: 23px;
          letter-spacing: -.035em;
        }

        .program-head p {
          margin: 0;
          color: #7a899f;
          font-size: 12px;
        }

        .overall {
          min-width: 170px;
          text-align: right;
        }

        .overall-label {
          display: flex;
          justify-content: flex-end;
          gap: 7px;
          color: #687991;
          font-size: 10px;
          margin-bottom: 6px;
        }

        .overall-label strong { color:#1e5bc2; }

        .overall-track {
          height: 5px;
          overflow: hidden;
          border-radius: 999px;
          background: #eaf0f7;
        }

        .overall-fill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg,#29c58b,#377bea);
          transition: width .35s ease;
        }

        .chapter-grid {
          display: grid;
          grid-template-columns: repeat(5,minmax(0,1fr));
          gap: 12px;
        }

        .chapter-card {
          min-width: 0;
          min-height: 190px;
          display: flex;
          flex-direction: column;
          border: 1px solid #e0e8f3;
          border-radius: 12px;
          background: #fff;
          padding: 14px;
          color: inherit;
          text-decoration: none;
          transition: .18s ease;
        }

        .chapter-card:hover {
          transform: translateY(-2px);
          border-color: #b8cae9;
          box-shadow: 0 10px 24px rgba(43,75,122,.09);
        }

        .card-top {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 10px;
        }

        .number {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-size: 11px;
          font-weight: 900;
        }

        .topic-icon {
          margin-left: auto;
          font-size: 18px;
          font-weight: 900;
        }

        .chapter-card h3 {
          margin: 0 0 6px;
          color: #142d5b;
          font-size: 14px;
          line-height: 1.08;
          letter-spacing: -.02em;
        }

        .chapter-card p {
          margin: 0;
          color: #6e7f96;
          font-size: 10px;
          line-height: 1.35;
        }

        .progress-row {
          margin-top: auto;
          padding-top: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .progress-track {
          flex: 1;
          height: 6px;
          overflow: hidden;
          border-radius: 99px;
          background: #e8eff6;
        }

        .progress-fill {
          height: 100%;
          border-radius: inherit;
          transition: width .3s ease;
        }

        .progress-row span {
          color: #627590;
          font-size: 9px;
          font-weight: 700;
        }

        .goal-card {
          min-height: 190px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          border: 1px solid #f2d997;
          border-radius: 12px;
          background: linear-gradient(145deg,#fff9eb,#fff3cf);
          padding: 14px;
        }

        .goal-card .trophy {
          font-size: 25px;
          margin-bottom: 6px;
        }

        .goal-card strong {
          color:#173563;
          font-size:14px;
        }

        .goal-card p {
          margin: 6px 0 11px;
          color:#657792;
          font-size:10px;
          line-height:1.4;
        }

        .goal-card a {
          width: 100%;
          text-decoration:none;
          color:white;
          background:#103f85;
          border-radius:8px;
          padding:8px 9px;
          font-size:10px;
          font-weight:800;
        }

        .empty {
          grid-column: 1 / -1;
          padding: 28px;
          text-align: center;
          color: #718197;
          border: 1px dashed #cdd9e8;
          border-radius: 12px;
          background: #f9fbfe;
        }

        .footer {
          padding: 28px 0 38px;
          color: #8090a5;
          font-size: 11px;
          display: flex;
          justify-content: space-between;
          gap: 16px;
        }

        .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer a {
          color: #5e7391;
          text-decoration: none;
          font-weight: 700;
        }

        .footer a:hover { color: #245cbd; }

        .mobile-menu {
          display: none;
          position: relative;
        }

        .mobile-menu summary {
          list-style: none;
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border: 1px solid #dfe7f3;
          border-radius: 10px;
          background: white;
          color: #294a80;
          cursor: pointer;
          font-size: 18px;
          font-weight: 800;
        }

        .mobile-menu summary::-webkit-details-marker { display: none; }

        .mobile-menu-panel {
          position: absolute;
          z-index: 60;
          right: 0;
          top: 44px;
          width: min(280px, calc(100vw - 28px));
          display: grid;
          gap: 4px;
          padding: 8px;
          border: 1px solid #dfe7f3;
          border-radius: 14px;
          background: white;
          box-shadow: 0 18px 44px rgba(43,75,122,.16);
        }

        .mobile-menu-panel a {
          min-height: 42px;
          display: flex;
          align-items: center;
          padding: 0 12px;
          border-radius: 9px;
          color: #3f5575;
          text-decoration: none;
          font-size: 13px;
          font-weight: 750;
        }

        .mobile-menu-panel a:hover { background: #f2f6ff; color: #1e56ba; }

        .btn:focus-visible,
        .nav a:focus-visible,
        .avatar:focus-visible,
        .chapter-card:focus-visible,
        .goal-card a:focus-visible,
        .search input:focus-visible {
          outline: 3px solid rgba(37,99,235,.25);
          outline-offset: 3px;
        }

        @media (max-width: 1080px) {
          .nav a { padding: 0 8px; }
          .search { width: 195px; }
          .chapter-grid { grid-template-columns: repeat(3,minmax(0,1fr)); }
        }

        @media (max-width: 820px) {
          .nav { display:none; }
          .mobile-menu { display:block; }
          .header-inner { min-height:64px; }
          .hero {
            grid-template-columns: 1fr;
          }
          .hero-copy { padding: 38px 28px 30px; }
          .hero-photo { min-height: 350px; }
          .hero-photo::before {
            background: linear-gradient(180deg,#fbfdff 0%,rgba(251,253,255,.08) 25%,transparent 50%);
          }
          .search { width:min(38vw,220px); }
          .chapter-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
        }

        @media (max-width: 560px) {
          .shell { width:min(100% - 18px,1240px); }
          .brand-sub { display:none; }
          .header-tools { gap:6px; }
          .search { width:42px; padding:9px 11px; }
          .search input { display:none; }
          .avatar { width:32px; height:32px; }
          .hero-wrap { padding-top:9px; }
          .hero { border-radius:15px 15px 0 0; }
          .hero-copy { padding:30px 18px 25px; }
          .hero h1 { font-size:39px; }
          .hero-lead { font-size:16px; }
          .hero-text { font-size:13px; }
          .benefits { grid-template-columns:1fr; }
          .benefit small { font-size:10px; }
          .hero-photo { min-height:310px; }
          .scribble { top:38px; left:6%; font-size:16px; }
          .photo-card { right:12px; width:126px; padding:11px; font-size:10px; }
          .program { padding:20px 14px 22px; border-radius:0 0 15px 15px; }
          .program-head { align-items:flex-start; flex-direction:column; }
          .overall { width:100%; text-align:left; }
          .overall-label { justify-content:flex-start; }
          .chapter-grid { grid-template-columns:1fr; }
          .chapter-card { min-height:165px; }
          .footer { flex-direction:column; }
        }
      `}</style>

      <header className="header">
        <div className="shell header-inner">
          <Link href="/" className="brand">
            <span className="brand-logo">C</span>
            <span>
              <span className="brand-name">CAPSES</span>
              <span className="brand-sub">Réussir le bac de SES</span>
            </span>
          </Link>

          <nav className="nav" aria-label="Navigation principale">
            <Link className="active" href="/">Accueil</Link>
            <Link href="/bts-cejm">BTS CEJM</Link>
            <a href="#chapitres">Terminale</a>
            <Link href="/premiere">Première</Link>
            <Link href="/seconde">Seconde</Link>
            <Link href="/methodes">Méthodes</Link>
            <Link href="/espace-eleves">Mon espace</Link>
          </nav>

          <div className="header-tools">
            <label className="search">
              <span aria-hidden="true">⌕</span>
              <input
                aria-label="Rechercher un chapitre ou une notion"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher une notion, un chapitre..."
              />
            </label>
            <Link href="/espace-eleves" className="avatar" aria-label="Ouvrir mon espace">
              EC
            </Link>

            <details className="mobile-menu">
              <summary aria-label="Ouvrir le menu">☰</summary>
              <nav className="mobile-menu-panel" aria-label="Navigation mobile">
                <Link href="/">Accueil</Link>
                <Link href="/bts-cejm">BTS CEJM</Link>
                <a href="#chapitres">Terminale</a>
                <Link href="/premiere">Première</Link>
                <Link href="/seconde">Seconde</Link>
                <Link href="/methodes">Méthodes</Link>
                <Link href="/espace-eleves">Mon espace</Link>
              </nav>
            </details>
          </div>
        </div>
      </header>

      <div className="shell hero-wrap">
        <section className="hero">
          <div className="hero-copy">
            <div className="year">Terminale SES · 2026-2027</div>
            <h1>
              Bienvenue sur <span>CAPSES</span>
            </h1>
            <p className="hero-lead">
              La plateforme de révision en SES pour progresser toute l’année
            </p>
            <p className="hero-text">
              Des cours clairs, des schémas, des exemples, des méthodes et des
              exercices pour comprendre, mémoriser et s’entraîner efficacement.
            </p>

            <div className="actions">
              <a className="btn btn-primary" href="#chapitres">
                Commencer à réviser <span>→</span>
              </a>
              <Link className="btn btn-secondary" href="/espace-eleves">
                ◉ Voir ma progression
              </Link>
            </div>

            <div className="benefits">
              <div className="benefit">
                <span className="benefit-icon" style={{background:"#e8f2ff",color:"#2563eb"}}>▣</span>
                <span><strong>9 chapitres complets</strong><small>Tout le programme de Terminale</small></span>
              </div>
              <div className="benefit">
                <span className="benefit-icon" style={{background:"#fff1dc",color:"#ee8d18"}}>□</span>
                <span><strong>Des contenus clairs</strong><small>Cours, schémas, exemples</small></span>
              </div>
              <div className="benefit">
                <span className="benefit-icon" style={{background:"#dff9f2",color:"#0ca67d"}}>◎</span>
                <span><strong>Pour progresser vraiment</strong><small>Quiz, exercices et suivi</small></span>
              </div>
            </div>
          </div>

          <div className="hero-photo">
            <Image
              className="hero-photo-image"
              src="https://images.unsplash.com/photo-1758525861622-f4e7ac86a2d7?auto=format&fit=crop&w=1200&q=82"
              alt="Une lycéenne étudie avec ses livres et ses notes"
              fill
              sizes="(max-width: 820px) 100vw, 46vw"
              priority
            />
            <div className="scribble">
              Comprendre<br/>aujourd’hui,<br/>réussir demain
            </div>
            <div className="photo-card top">
              Des SES<br/>plus claires,<br/>plus simples,<br/>plus concrètes.
            </div>
            <div className="photo-card bottom">
              « Tout commence par une bonne méthode. »
            </div>
          </div>
        </section>

        <section className="program" id="chapitres">
          <div className="program-head">
            <div>
              <h2>Les 9 chapitres de Terminale</h2>
              <p>Explore le programme et reprends là où tu en es.</p>
            </div>
            <div className="overall">
              <div className="overall-label">
                <span>{validated} chapitre{validated > 1 ? "s" : ""} validé{validated > 1 ? "s" : ""}</span>
                <strong>{overall} %</strong>
              </div>
              <div className="overall-track">
                <div className="overall-fill" style={{width:`${overall}%`}} />
              </div>
            </div>
          </div>

          <div className="chapter-grid">
            {visibleChapters.map((chapter) => {
              const palette = domainStyle[chapter.domain];
              const value = progressValue(progress[chapter.slug]);

              return (
                <Link
                  href={`/terminale/${chapter.slug}`}
                  className="chapter-card"
                  key={chapter.slug}
                >
                  <div className="card-top">
                    <span
                      className="number"
                      style={{background:palette.soft,color:palette.accent}}
                    >
                      {chapter.order}
                    </span>
                    <span className="topic-icon" style={{color:palette.accent}}>
                      {chapterIcon(chapter)}
                    </span>
                  </div>
                  <h3>{chapter.shortTitle}</h3>
                  <p>{chapter.question}</p>
                  <div className="progress-row">
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{width:`${value}%`,background:palette.accent}}
                      />
                    </div>
                    <span>{value} %</span>
                    <span style={{color:"#1f4f9f"}}>→</span>
                  </div>
                </Link>
              );
            })}

            {query.trim() === "" && (
              <div className="goal-card">
                <div className="trophy">🏆</div>
                <strong>Ton bac, ton projet</strong>
                <p>Avec méthode et régularité, tu peux avancer à ton rythme.</p>
                <Link href="/espace-eleves">Voir mes progrès →</Link>
              </div>
            )}

            {visibleChapters.length === 0 && (
              <div className="empty">
                Aucun chapitre ou notion ne correspond à « {query} ».
              </div>
            )}
          </div>
        </section>

        <footer className="footer">
          <div>
            <strong>CAPSES · Sciences économiques et sociales</strong>
            <div style={{marginTop:4}}>Terminale 2026-2027 · Seconde disponible · Première à venir</div>
          </div>
          <div className="footer-links">
            <Link href="/methodes">Méthodes</Link>
            <Link href="/confidentialite">Confidentialité</Link>
            <Link href="/cgu">CGU</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
