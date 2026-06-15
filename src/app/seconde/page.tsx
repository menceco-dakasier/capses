"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";

type Matiere = "ECO" | "SOCIO" | "RC";
type Difficulte = "Accessible" | "Intermédiaire" | "Exigeant";

type Questionnement = {
  slug: string;
  num: string;
  titre: string;
  questionCle: string;
  matiere: Matiere;
  difficulte: Difficulte;
  notions: string[];
  temps: string;
  disciplines: string[];
};

const QUESTIONNEMENTS: Questionnement[] = [
  {
    slug: "creation-richesses",
    num: "Q 01",
    titre: "Comment crée-t-on des richesses ?",
    questionCle: "Comment mesurer et comprendre la production de richesses ?",
    matiere: "ECO",
    difficulte: "Accessible",
    notions: ["PIB", "Valeur ajoutée", "Croissance économique", "Limites écologiques"],
    temps: "20 min",
    disciplines: ["Économie"],
  },
  {
    slug: "formation-prix",
    num: "Q 02",
    titre: "Comment se forment les prix ?",
    questionCle: "Comment l'offre et la demande déterminent-elles les prix sur un marché ?",
    matiere: "ECO",
    difficulte: "Intermédiaire",
    notions: ["Marché", "Offre", "Demande", "Prix d'équilibre", "Taxe / Subvention"],
    temps: "25 min",
    disciplines: ["Économie"],
  },
  {
    slug: "acteurs-sociaux",
    num: "Q 03",
    titre: "Comment devenons-nous des acteurs sociaux ?",
    questionCle: "Par quels processus intégrons-nous les normes et valeurs de la société ?",
    matiere: "SOCIO",
    difficulte: "Accessible",
    notions: ["Socialisation", "Instances de socialisation", "Genre", "Milieu social"],
    temps: "20 min",
    disciplines: ["Sociologie"],
  },
  {
    slug: "vie-politique",
    num: "Q 04",
    titre: "Comment s'organise la vie politique ?",
    questionCle: "Comment se conquiert et s'exerce le pouvoir politique en démocratie ?",
    matiere: "SOCIO",
    difficulte: "Intermédiaire",
    notions: ["Institutions", "Séparation des pouvoirs", "Scrutin", "Acteurs politiques"],
    temps: "20 min",
    disciplines: ["Science politique"],
  },
  {
    slug: "diplome-emploi-salaire",
    num: "Q 05",
    titre: "Diplôme, emploi et salaire",
    questionCle: "Quelles relations entre le diplôme, l'emploi et le niveau de salaire ?",
    matiere: "RC",
    difficulte: "Exigeant",
    notions: ["Capital humain", "Chômage", "Inégalités salariales", "Capabilités"],
    temps: "25 min",
    disciplines: ["Économie", "Sociologie"],
  },
];

const MATIERE_COLORS: Record<Matiere, string> = {
  ECO:   "#7EEEFF",
  SOCIO: "#C4B8FF",
  RC:    "#FFD580",
};

const MATIERE_BG: Record<Matiere, string> = {
  ECO:   "rgba(30,80,100,0.45)",
  SOCIO: "rgba(60,50,130,0.45)",
  RC:    "rgba(100,80,20,0.45)",
};

const MATIERE_LABELS: Record<Matiere, string> = {
  ECO:   "Science économique",
  SOCIO: "Sociologie & Science politique",
  RC:    "Regards croisés",
};

const DIFFICULTE_COLORS: Record<Difficulte, string> = {
  Accessible:    "#90EE90",
  Intermédiaire: "#FFD580",
  Exigeant:      "#FFB3C6",
};

const FILTERS: { k: Matiere | null; l: string }[] = [
  { k: null,    l: "Tous" },
  { k: "ECO",   l: "Économie" },
  { k: "SOCIO", l: "Sociologie" },
  { k: "RC",    l: "Regards croisés" },
];

// Néon Soft palette
const N = {
  bg:        "#12112A",
  bgCard:    "rgba(255,255,255,0.04)",
  border:    "rgba(255,255,255,0.09)",
  text:      "#E0D9FF",
  textMuted: "rgba(224,217,255,0.45)",
  violet:    "#C4B8FF",
  cyan:      "#7EEEFF",
  ambre:     "#FFD580",
  rose:      "#FFB3C6",
  vert:      "#90EE90",
  accent:    "#6A5ACD",
};

export default function SecondePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [filterMatiere, setFilterMatiere] = useState<Matiere | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 850);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Canvas animation — symboles sociaux néon
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const symList = ["€", "%", "↑", "≈", "∑", "Δ", "σ", "π", "≠", "∝", "⊕", "★"];
    const colorList = [N.violet, N.cyan, N.ambre, N.rose, N.vert];

    const dots = Array.from({ length: 22 }, () => ({
      x: Math.random() * 1000,
      y: Math.random() * 800,
      r: 1 + Math.random() * 2,
      speedY: -(0.15 + Math.random() * 0.25),
      speedX: (Math.random() - 0.5) * 0.15,
      alpha: 0.07 + Math.random() * 0.12,
      color: colorList[Math.floor(Math.random() * colorList.length)],
    }));

    const syms = Array.from({ length: 16 }, () => ({
      x: Math.random() * 1000,
      y: Math.random() * 800,
      size: 11 + Math.random() * 13,
      speedY: -(0.18 + Math.random() * 0.22),
      speedX: (Math.random() - 0.5) * 0.12,
      alpha: 0.06 + Math.random() * 0.1,
      sym: symList[Math.floor(Math.random() * symList.length)],
      color: colorList[Math.floor(Math.random() * colorList.length)],
    }));

    // Soft wave lines
    const waves = Array.from({ length: 3 }, (_, i) => {
      const pts: number[] = [];
      let y = 0.2 + Math.random() * 0.6;
      for (let j = 0; j <= 80; j++) {
        y += (Math.random() - 0.48) * 0.02;
        y = Math.max(0.05, Math.min(0.95, y));
        pts.push(y);
      }
      return {
        pts,
        speed: 0.1 + Math.random() * 0.12,
        offset: Math.random() * 10,
        color: [N.violet, N.cyan, N.ambre][i],
        alpha: 0.08 + Math.random() * 0.07,
        thick: 0.8 + Math.random() * 0.8,
      };
    });

    let raf = 0;
    const animate = () => {
      ctx.clearRect(0, 0, W(), H());

      // Waves
      waves.forEach((w) => {
        w.offset += w.speed;
        if (w.offset > 10) w.offset = 0;
        ctx.save();
        ctx.globalAlpha = w.alpha;
        ctx.strokeStyle = w.color;
        ctx.lineWidth = w.thick;
        ctx.beginPath();
        w.pts.forEach((pt, i) => {
          const xi = (i / (w.pts.length - 1)) * W();
          const yi = pt * H() * 0.5 + H() * 0.1;
          i === 0 ? ctx.moveTo(xi, yi) : ctx.lineTo(xi, yi);
        });
        ctx.stroke();
        ctx.restore();
      });

      // Dots
      dots.forEach((d) => {
        d.y += d.speedY;
        d.x += d.speedX;
        if (d.y < -10) { d.y = H() + 10; d.x = Math.random() * W(); }
        ctx.save();
        ctx.globalAlpha = d.alpha;
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Symbols
      syms.forEach((s) => {
        s.y += s.speedY;
        s.x += s.speedX;
        if (s.y < -20) { s.y = H() + 20; s.x = Math.random() * W(); }
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.font = `${s.size}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.sym, s.x, s.y);
        ctx.restore();
      });

      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const filtered = filterMatiere
    ? QUESTIONNEMENTS.filter((q) => q.matiere === filterMatiere)
    : QUESTIONNEMENTS;

  return (
    <main
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        background: N.bg,
        color: N.text,
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        a { text-decoration: none; }
        button { font: inherit; }

        .card-q:hover {
          border-color: rgba(196,184,255,0.4) !important;
          background: rgba(106,90,205,0.08) !important;
          transform: translateY(-2px);
        }
        .card-q { transition: all 0.22s ease; }
        .btn-filter:hover { opacity: 0.82; }
        .nav-link:hover { color: ${N.violet} !important; }

        @keyframes pulse-neon {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px ${N.violet}; }
          50%       { opacity: 0.4; box-shadow: 0 0 2px ${N.violet}; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }

        @media (max-width: 850px) {
          .hero-seconde  { flex-direction: column !important; gap: 2rem !important; padding: 2rem 1.25rem 1.5rem !important; }
          .grid-questions { grid-template-columns: 1fr !important; }
          .nav-inner { flex-direction: column; gap: 0.75rem; }
          .footer-inner { flex-direction: column; gap: 0.5rem; text-align: center; }
          .section-questions { padding: 1rem 1.25rem 3rem !important; }
          .filters-row { gap: 6px !important; }
        }
      `}</style>

      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.55, pointerEvents: "none" }}
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "radial-gradient(ellipse 90% 70% at 50% 40%, rgba(18,17,42,0.05) 0%, rgba(18,17,42,0.85) 65%, #12112A 100%)",
        }}
      />

      {/* ── NAV ── */}
      <nav
        className="nav-inner"
        style={{
          position: "relative", zIndex: 10,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "1.4rem 2.5rem",
          borderBottom: `0.5px solid ${N.border}`,
          maxWidth: 1100, margin: "0 auto",
        }}
      >
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: N.text }}>
          Cap<span style={{ color: N.ambre }}>SES</span>
        </Link>

        <div style={{ display: "flex", gap: "1.8rem", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          <a className="nav-link" href="#questionnements" style={{ fontSize: 13, color: N.textMuted, letterSpacing: "0.02em", transition: "color 0.2s" }}>
            Chapitres
          </a>
          <Link className="nav-link" href="/methodo" style={{ fontSize: 13, color: N.textMuted, letterSpacing: "0.02em", transition: "color 0.2s" }}>
            Méthodo
          </Link>
          <Link className="nav-link" href="/glossaire" style={{ fontSize: 13, color: N.textMuted, letterSpacing: "0.02em", transition: "color 0.2s" }}>
            Glossaire
          </Link>
          <Link href="/espace-eleves" style={{ background: N.accent, color: "#fff", padding: "0.45rem 1.1rem", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
            Espace élèves
          </Link>
        </div>
      </nav>

      {/* ── LEVEL SWITCHER ── */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "center", padding: "1.5rem 0 0" }}>
        {(["terminale", "premiere", "seconde"] as const).map((lvl, i) => (
          <Link
            key={lvl}
            href={lvl === "terminale" ? "/" : lvl === "seconde" ? "/seconde" : "#"}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 12, fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase" as const,
              padding: "0.5rem 1.4rem",
              border: `0.5px solid ${N.border}`,
              borderRadius: i === 0 ? "20px 0 0 20px" : i === 2 ? "0 20px 20px 0" : "0",
              background: lvl === "seconde" ? N.accent : "transparent",
              color: lvl === "seconde" ? "#fff" : N.textMuted,
              cursor: "pointer",
              transition: "all 0.2s",
              display: "inline-block",
            }}
          >
            {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
            {lvl !== "seconde" && (
              <span style={{ fontSize: 9, display: "block", color: N.textMuted, fontWeight: 400 }}>
                {lvl === "terminale" ? "Bac 2026" : "Bientôt"}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* ── HERO ── */}
      <section
        className="hero-seconde"
        style={{
          position: "relative", zIndex: 5,
          maxWidth: 1100, margin: "0 auto",
          padding: "4rem 2.5rem 2rem",
          display: "flex", gap: "3rem", alignItems: "flex-start",
        }}
      >
        {/* Left — pitch */}
        <div style={{ flex: "1 1 0", minWidth: 0 }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(106,90,205,0.15)",
            border: `0.5px solid rgba(106,90,205,0.45)`,
            color: N.violet,
            fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const,
            padding: "5px 12px", borderRadius: 20, marginBottom: "1.5rem",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: N.violet, animation: "pulse-neon 2.2s infinite", display: "inline-block" }} />
            Seconde SES · Programme 2025-2026
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(36px, 5.5vw, 50px)",
            fontWeight: 800, lineHeight: 1.05,
            letterSpacing: "-0.03em", margin: "0 0 1rem",
          }}>
            Découvrir les<br />
            <span style={{ color: N.cyan }}>sciences</span>{" "}
            <span style={{ color: N.violet }}>sociales.</span>
          </h1>

          <p style={{ fontSize: 15, lineHeight: 1.7, color: N.textMuted, fontWeight: 300, marginBottom: "2rem", maxWidth: 400 }}>
            5 grands questionnements — économie, sociologie, science politique. Des fiches claires, des quiz et des données pour vraiment comprendre.
          </p>

          {/* Disciplines intro pill cards */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
            {[
              { label: "Science économique", color: N.cyan,   bg: "rgba(30,80,100,0.3)",   icon: "📈" },
              { label: "Sociologie",          color: N.violet, bg: "rgba(60,50,130,0.3)",   icon: "🧑‍🤝‍🧑" },
              { label: "Science politique",   color: N.ambre,  bg: "rgba(100,80,20,0.3)",   icon: "🏛️" },
            ].map((d) => (
              <span key={d.label} style={{
                fontSize: 12, fontWeight: 600,
                background: d.bg, border: `0.5px solid ${d.color}33`,
                color: d.color, padding: "5px 12px", borderRadius: 20,
                display: "inline-flex", alignItems: "center", gap: 5,
              }}>
                <span aria-hidden="true">{d.icon}</span> {d.label}
              </span>
            ))}
          </div>
        </div>

        {/* Right — stats + intro disciplines */}
        <div style={{ flex: "0 0 320px", minWidth: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Stats mini grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.75rem" }}>
            {[
              { n: "5",  l: "Questionnements", c: N.violet },
              { n: "8",  l: "Étapes / fiche",  c: N.cyan   },
              { n: "3",  l: "Disciplines",      c: N.ambre  },
            ].map((item) => (
              <div key={item.l} style={{
                background: N.bgCard, border: `0.5px solid ${N.border}`,
                borderRadius: 10, padding: "0.9rem 0.75rem", textAlign: "center",
              }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: item.c, display: "block", letterSpacing: "-0.02em" }}>
                  {item.n}
                </span>
                <span style={{ fontSize: 10, color: N.textMuted, textTransform: "uppercase" as const, letterSpacing: "0.08em", display: "block", marginTop: 4 }}>
                  {item.l}
                </span>
              </div>
            ))}
          </div>

          {/* Intro disciplinaire card */}
          <div style={{
            background: "rgba(106,90,205,0.1)",
            border: `0.5px solid rgba(106,90,205,0.3)`,
            borderRadius: 14, padding: "1.25rem 1.5rem",
          }}>
            <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: N.textMuted, margin: "0 0 0.75rem" }}>
              Prologue · Comment raisonnent-ils ?
            </p>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: N.textMuted, margin: 0 }}>
              Chaque fiche commence par rappeler <span style={{ color: N.violet, fontWeight: 600 }}>la question centrale</span> de la discipline concernée — économie, sociologie ou science politique — et comment les chercheurs la traitent.
            </p>
            <div style={{ marginTop: "0.9rem", display: "flex", flexDirection: "column", gap: 5 }}>
              {[
                { d: "Économie",         q: "Comment allouer des ressources rares ?", c: N.cyan   },
                { d: "Sociologie",       q: "Comment fait-on société ?",               c: N.violet },
                { d: "Science politique",q: "Comment s'exerce le pouvoir ?",           c: N.ambre  },
              ].map((row) => (
                <div key={row.d} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: row.c, marginTop: 6, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: N.textMuted }}>
                    <span style={{ color: row.c, fontWeight: 600 }}>{row.d} — </span>{row.q}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUESTIONNEMENTS ── */}
      <section
        id="questionnements"
        className="section-questions"
        style={{ position: "relative", zIndex: 5, maxWidth: 1100, margin: "0 auto", padding: "1rem 2.5rem 4rem" }}
      >
        {/* Header + filtres */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap" as const, gap: 12 }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: 0, color: N.text }}>
            Les 5 questionnements du programme
          </h2>
          <div className="filters-row" style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
            {FILTERS.map((f) => {
              const active = filterMatiere === f.k;
              return (
                <button
                  key={f.k ?? "all"}
                  type="button"
                  className="btn-filter"
                  onClick={() => setFilterMatiere(f.k)}
                  aria-pressed={active}
                  style={{
                    fontSize: 11, fontWeight: 600,
                    padding: "4px 12px", borderRadius: 20, cursor: "pointer",
                    transition: "all 0.2s",
                    background: active ? N.accent : N.bgCard,
                    color:      active ? "#fff"   : N.textMuted,
                    border:     `0.5px solid ${active ? N.accent : N.border}`,
                  }}
                >
                  {f.l}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards grid */}
        <div
          className="grid-questions"
          style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}
        >
          {filtered.map((q) => (
            <article
              key={q.slug}
              className="card-q"
              style={{
                background: N.bgCard,
                border: `0.5px solid ${N.border}`,
                borderRadius: 16, padding: "1.4rem",
              }}
            >
              {/* Top row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 8 }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                  color: MATIERE_COLORS[q.matiere], textTransform: "uppercase" as const,
                }}>
                  {q.num} · {MATIERE_LABELS[q.matiere]}
                </span>
                <span style={{ fontSize: 10, color: DIFFICULTE_COLORS[q.difficulte], fontWeight: 600 }}>
                  {q.difficulte}
                </span>
              </div>

              {/* Titre */}
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 15, fontWeight: 700,
                color: N.text, margin: "0 0 5px",
                lineHeight: 1.25, letterSpacing: "-0.01em",
              }}>
                {q.titre}
              </h3>

              {/* Question clé */}
              <p style={{ fontSize: 12, color: N.textMuted, margin: "0 0 12px", lineHeight: 1.55, fontStyle: "italic" as const }}>
                {q.questionCle}
              </p>

              {/* Disciplines badges */}
              <div style={{ display: "flex", gap: 5, marginBottom: 10, flexWrap: "wrap" as const }}>
                {q.disciplines.map((disc) => (
                  <span key={disc} style={{
                    fontSize: 10, padding: "2px 8px", borderRadius: 20,
                    background: MATIERE_BG[q.matiere],
                    color: MATIERE_COLORS[q.matiere],
                    border: `0.5px solid ${MATIERE_COLORS[q.matiere]}33`,
                    fontWeight: 600,
                  }}>
                    {disc}
                  </span>
                ))}
              </div>

              {/* Notions */}
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 4, marginBottom: 14 }}>
                {q.notions.map((n) => (
                  <span key={n} style={{
                    fontSize: 10, background: N.bgCard,
                    border: `0.5px solid ${N.border}`,
                    borderRadius: 4, padding: "2px 7px",
                    color: N.textMuted,
                  }}>
                    {n}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Link
                  href={`/seconde/${q.slug}`}
                  style={{
                    flex: 1, background: N.accent, color: "#fff",
                    padding: "0.5rem 0", borderRadius: 10,
                    fontSize: 12, fontWeight: 700, textAlign: "center" as const,
                    letterSpacing: "0.02em",
                  }}
                >
                  Commencer
                </Link>
                <span style={{
                  flex: 1, background: N.bgCard,
                  color: N.textMuted, padding: "0.5rem 0", borderRadius: 10,
                  fontSize: 12, fontWeight: 500, textAlign: "center" as const,
                  border: `0.5px solid ${N.border}`,
                }}>
                  ⏱ {q.temps}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Savoir-faire quantitatifs banner */}
        <div style={{
          marginTop: "2rem",
          background: "rgba(126,238,255,0.06)",
          border: `0.5px solid rgba(126,238,255,0.25)`,
          borderRadius: 14, padding: "1.25rem 1.5rem",
          display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" as const,
        }}>
          <div style={{ flexShrink: 0 }}>
            <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: N.cyan, margin: "0 0 4px" }}>
              Savoir-faire quantitatifs
            </p>
            <p style={{ fontSize: 13, fontWeight: 700, color: N.text, margin: 0, fontFamily: "'Syne', sans-serif" }}>
              Intégrés dans chaque fiche
            </p>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" as const, alignItems: "center" }}>
            {["Proportion & %", "Taux de variation", "Coefficient multiplicateur", "Indice simple", "Moyenne", "Médiane", "Tableau double-entrée", "Séries chronologiques"].map((sf) => (
              <span key={sf} style={{
                fontSize: 11, padding: "3px 10px", borderRadius: 20,
                background: "rgba(126,238,255,0.08)",
                border: `0.5px solid rgba(126,238,255,0.2)`,
                color: N.cyan, fontWeight: 500,
              }}>
                {sf}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="footer-inner"
        style={{
          position: "relative", zIndex: 5,
          borderTop: `0.5px solid ${N.border}`,
          padding: "1.5rem 2.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          maxWidth: 1100, margin: "0 auto",
        }}
      >
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 800, color: N.text }}>
          Cap<span style={{ color: N.ambre }}>SES</span>
        </Link>
        <p style={{ fontSize: 11, color: N.textMuted, margin: 0 }}>Terminale · Première · Seconde</p>
        <p style={{ fontSize: 11, color: N.textMuted, margin: 0 }}>Par un prof de SES pour ses élèves</p>
      </footer>
    </main>
  );
}
