"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";

type Matiere = "ECO" | "SOCIO" | "RC";
type Difficulte = "Facile" | "Moyen" | "Exigeant";
type Level = "terminale" | "premiere" | "seconde";
type Mode = "decouvrir" | "reviser" | "perdu";

type Chapitre = {
  slug: string;
  titre: string;
  matiere: Matiere;
  num: string;
  difficulte: Difficulte;
  poids: string;
  notions: string[];
  temps: string;
};

const CHAPITRES: Chapitre[] = [
  {
    slug: "croissance",
    titre: "La croissance économique",
    matiere: "ECO",
    num: "CH 01",
    difficulte: "Moyen",
    poids: "★★★",
    notions: ["PIB", "Facteurs de production", "Productivité globale des facteurs"],
    temps: "20 min",
  },
  {
    slug: "commerce-international",
    titre: "Le commerce international",
    matiere: "ECO",
    num: "CH 02",
    difficulte: "Exigeant",
    poids: "★★★",
    notions: ["Avantages comparatifs", "Libre-échange", "Protectionnisme"],
    temps: "25 min",
  },
  {
    slug: "chomage",
    titre: "Le chômage",
    matiere: "ECO",
    num: "CH 03",
    difficulte: "Moyen",
    poids: "★★★★",
    notions: ["Chômage classique", "Chômage keynésien", "Politiques de l'emploi"],
    temps: "20 min",
  },
  {
    slug: "politiques-europeennes",
    titre: "Les politiques économiques européennes",
    matiere: "ECO",
    num: "CH 04",
    difficulte: "Exigeant",
    poids: "★★★",
    notions: ["Politique monétaire", "BCE", "Politique budgétaire"],
    temps: "25 min",
  },
  {
    slug: "structure-sociale",
    titre: "La structure sociale",
    matiere: "SOCIO",
    num: "CH 05",
    difficulte: "Facile",
    poids: "★★",
    notions: ["Classes sociales", "PCS", "Inégalités"],
    temps: "15 min",
  },
  {
    slug: "mobilite-sociale",
    titre: "La mobilité sociale",
    matiere: "SOCIO",
    num: "CH 06",
    difficulte: "Moyen",
    poids: "★★★",
    notions: ["Mobilité intergénérationnelle", "Fluidité sociale", "Table de mobilité"],
    temps: "20 min",
  },
  {
    slug: "travail-emploi",
    titre: "Travail, emploi, chômage",
    matiere: "SOCIO",
    num: "CH 07",
    difficulte: "Moyen",
    poids: "★★★",
    notions: ["Mutations du travail", "Précarité", "Désindustrialisation"],
    temps: "20 min",
  },
  {
    slug: "engagement-politique",
    titre: "L'engagement politique",
    matiere: "SOCIO",
    num: "CH 08",
    difficulte: "Facile",
    poids: "★★",
    notions: ["Vote", "Répertoires d'action", "Capital politique"],
    temps: "15 min",
  },
  {
    slug: "environnement",
    titre: "L'environnement, un enjeu mondial",
    matiere: "RC",
    num: "CH 09",
    difficulte: "Exigeant",
    poids: "★★★★",
    notions: ["Externalités", "Biens communs", "Politiques environnementales"],
    temps: "25 min",
  },
];

const MATIERE_COLORS: Record<Matiere, string> = {
  ECO: "#D4A017",
  SOCIO: "#7EB8FF",
  RC: "#c084fc",
};

const MATIERE_LABELS: Record<Matiere, string> = {
  ECO: "Économie",
  SOCIO: "Sociologie",
  RC: "Regards croisés",
};

const DIFFICULTE_COLORS: Record<Difficulte, string> = {
  Facile: "#4ade80",
  Moyen: "#D4A017",
  Exigeant: "#f87171",
};

const LEVELS: Level[] = ["terminale", "premiere", "seconde"];

const FILTERS: { k: Matiere | null; l: string }[] = [
  { k: null, l: "Tous" },
  { k: "ECO", l: "Économie" },
  { k: "SOCIO", l: "Sociologie" },
  { k: "RC", l: "Regards croisés" },
];

const MODES: { key: Mode; icon: string; label: string; desc: string; color: string; rgb: string }[] = [
  {
    key: "decouvrir",
    icon: "📖",
    label: "Je découvre le cours",
    desc: "Fiches claires, vidéos courtes, notions",
    color: "#D4A017",
    rgb: "212,160,23",
  },
  {
    key: "reviser",
    icon: "🎯",
    label: "Je révise pour le bac",
    desc: "Quiz, sujets, plans, méthode EC/dissert",
    color: "#7EB8FF",
    rgb: "126,184,255",
  },
  {
    key: "perdu",
    icon: "🧭",
    label: "Je suis perdu, je commence où ?",
    desc: "Parcours guidé + recommandations",
    color: "#c084fc",
    rgb: "192,132,252",
  },
];

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [level, setLevel] = useState<Level>("terminale");
  const [mode, setMode] = useState<Mode | null>(null);
  const [countdown, setCountdown] = useState({ d: "--", h: "--", m: "--" });
  const [filterMatiere, setFilterMatiere] = useState<Matiere | null>(null);

  useEffect(() => {
    const update = () => {
      // Heure de Guyane française : UTC-3, sans changement d'heure.
      // Date indiquée : mardi 16 juin 2026 à 8h00 en Guyane.
      const target = new Date("2026-06-16T08:00:00-03:00");
      const diff = target.getTime() - Date.now();

      if (diff <= 0) {
        setCountdown({ d: "00", h: "00", m: "00" });
        return;
      }

      setCountdown({
        d: String(Math.floor(diff / 86_400_000)).padStart(2, "0"),
        h: String(Math.floor((diff % 86_400_000) / 3_600_000)).padStart(2, "0"),
        m: String(Math.floor((diff % 3_600_000) / 60_000)).padStart(2, "0"),
      });
    };

    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const width = () => canvas.offsetWidth;
    const height = () => canvas.offsetHeight;

    const GOLD = "#D4A017";
    const BLUE = "#7EB8FF";
    const LGOLD = "#e8c84a";

    const bills = Array.from({ length: 18 }, () => {
      const w = 54 + Math.random() * 30;
      return {
        x: Math.random() * width(),
        y: Math.random() * height(),
        w,
        h: w * 0.47,
        speedY: 0.5 + Math.random() * 0.7,
        speedX: (Math.random() - 0.5) * 0.4,
        rot: (Math.random() - 0.5) * 0.4,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        alpha: 0.13 + Math.random() * 0.18,
        color: Math.random() > 0.5 ? GOLD : LGOLD,
        val: ["50", "20", "100", "200"][Math.floor(Math.random() * 4)],
      };
    });

    const curves = Array.from({ length: 3 }, (_, c) => {
      const pts: number[] = [];
      let y = 0.3 + Math.random() * 0.4;

      for (let i = 0; i <= 80; i += 1) {
        y += (Math.random() - 0.48) * 0.025;
        y = Math.max(0.05, Math.min(0.95, y));
        pts.push(y);
      }

      return {
        pts,
        offset: 0,
        speed: 0.12 + Math.random() * 0.15,
        color: c === 0 ? GOLD : c === 1 ? BLUE : "rgba(232,237,245,0.2)",
        alpha: 0.15 + Math.random() * 0.12,
        thick: 1 + Math.random(),
      };
    });

    const symList = ["€", "$", "£", "%", "↑", "↗", "≈", "∑", "Δ"];
    const syms = Array.from({ length: 14 }, () => ({
      x: Math.random() * width(),
      y: Math.random() * height(),
      size: 10 + Math.random() * 14,
      speedY: -(0.2 + Math.random() * 0.3),
      speedX: (Math.random() - 0.5) * 0.2,
      alpha: 0.08 + Math.random() * 0.14,
      sym: symList[Math.floor(Math.random() * symList.length)],
      color: Math.random() > 0.5 ? GOLD : BLUE,
    }));

    let raf = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width(), height());

      curves.forEach((curve) => {
        curve.offset += curve.speed;
        if (curve.offset > 10) curve.offset = 0;

        ctx.save();
        ctx.globalAlpha = curve.alpha;
        ctx.strokeStyle = curve.color;
        ctx.lineWidth = curve.thick;
        ctx.beginPath();

        curve.pts.forEach((pt, i) => {
          const xi = (i / (curve.pts.length - 1)) * width();
          const yi = pt * height() * 0.45 + height() * 0.1;
          if (i === 0) ctx.moveTo(xi, yi);
          else ctx.lineTo(xi, yi);
        });

        ctx.stroke();
        ctx.restore();
      });

      bills.forEach((bill) => {
        bill.y += bill.speedY;
        bill.x += bill.speedX;
        bill.rot += bill.rotSpeed;

        if (bill.y > height() + 60) {
          bill.y = -60;
          bill.x = Math.random() * width();
        }
        if (bill.x < -80) bill.x = width() + 80;
        if (bill.x > width() + 80) bill.x = -80;

        ctx.save();
        ctx.translate(bill.x, bill.y);
        ctx.rotate(bill.rot);
        ctx.globalAlpha = bill.alpha;

        const halfWidth = bill.w / 2;
        const halfHeight = bill.h / 2;

        ctx.strokeStyle = bill.color;
        ctx.lineWidth = 0.8;
        ctx.strokeRect(-halfWidth, -halfHeight, bill.w, bill.h);
        ctx.strokeRect(-halfWidth + 2.5, -halfHeight + 2.5, bill.w - 5, bill.h - 5);

        ctx.fillStyle = bill.color;
        ctx.font = `bold ${bill.h * 0.55}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("€", 0, 0);

        ctx.font = `${bill.h * 0.28}px monospace`;
        ctx.fillText(bill.val, -halfWidth + 8, -halfHeight + 6);
        ctx.fillText(bill.val, halfWidth - 8, halfHeight - 6);
        ctx.restore();
      });

      syms.forEach((symbol) => {
        symbol.y += symbol.speedY;
        symbol.x += symbol.speedX;

        if (symbol.y < -30) {
          symbol.y = height() + 30;
          symbol.x = Math.random() * width();
        }

        ctx.save();
        ctx.globalAlpha = symbol.alpha;
        ctx.fillStyle = symbol.color;
        ctx.font = `${symbol.size}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(symbol.sym, symbol.x, symbol.y);
        ctx.restore();
      });

      raf = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const chapitresFiltres = filterMatiere
    ? CHAPITRES.filter((chapitre) => chapitre.matiere === filterMatiere)
    : CHAPITRES;

  return (
    <main
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        background: "#0d1b2a",
        color: "#e8edf5",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        a { text-decoration: none; }
        button { font: inherit; }
        .card-chapitre:hover { border-color: rgba(212,160,23,0.4) !important; background: rgba(212,160,23,0.05) !important; transform: translateY(-2px); }
        .btn-mode:hover, .level-btn:hover { opacity: 0.85; }
        .nav-link:hover { color: #D4A017 !important; }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        @media (max-width: 850px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .chapters-grid { grid-template-columns: 1fr !important; }
          .nav-inner { flex-direction: column; gap: 1rem; }
          .footer-inner { flex-direction: column; gap: .5rem; text-align: center; }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 70% at 50% 40%, rgba(13,27,42,0.1) 0%, rgba(13,27,42,0.88) 65%, #0d1b2a 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <nav
        className="nav-inner"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.4rem 2.5rem",
          borderBottom: "0.5px solid rgba(255,255,255,0.07)",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#e8edf5",
          }}
        >
          Cap<span style={{ color: "#D4A017" }}>SES</span>
        </Link>

        <div style={{ display: "flex", gap: "1.8rem", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
          <a className="nav-link" href="#chapitres" style={{ fontSize: 13, color: "rgba(232,237,245,0.45)", letterSpacing: "0.02em", transition: "color 0.2s" }}>
            Chapitres
          </a>
          <Link className="nav-link" href="/methodologie" style={{ fontSize: 13, color: "rgba(232,237,245,0.45)", letterSpacing: "0.02em", transition: "color 0.2s" }}>
            Méthodo
          </Link>
          <Link className="nav-link" href="/glossaire" style={{ fontSize: 13, color: "rgba(232,237,245,0.45)", letterSpacing: "0.02em", transition: "color 0.2s" }}>
            Glossaire
          </Link>
          <Link href="/espace-eleves" style={{ background: "#D4A017", color: "#0d1b2a", padding: "0.45rem 1.1rem", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
            Espace élèves
          </Link>
        </div>
      </nav>

      <div style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "center", padding: "1.5rem 0 0" }}>
        {LEVELS.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => setLevel(item)}
            className="level-btn"
            aria-pressed={level === item}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "0.5rem 1.4rem",
              border: "0.5px solid rgba(255,255,255,0.12)",
              borderRadius: index === 0 ? "20px 0 0 20px" : index === 2 ? "0 20px 20px 0" : 0,
              background: level === item ? "#D4A017" : "transparent",
              color: level === item ? "#0d1b2a" : "rgba(232,237,245,0.35)",
              cursor: "pointer",
              transition: "all 0.2s",
              opacity: item !== "terminale" ? 0.7 : 1,
            }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
            {item !== "terminale" && (
              <span
                style={{
                  fontSize: 9,
                  display: "block",
                  color: level === item ? "rgba(13,27,42,0.65)" : "rgba(232,237,245,0.4)",
                  fontWeight: 400,
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                Bientôt
              </span>
            )}
          </button>
        ))}
      </div>

      {level === "terminale" && (
        <>
          <section
            className="hero-grid"
            style={{
              position: "relative",
              zIndex: 5,
              padding: "4rem 2.5rem 2rem",
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(212,160,23,0.1)",
                  border: "0.5px solid rgba(212,160,23,0.3)",
                  color: "#D4A017",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "5px 12px",
                  borderRadius: 20,
                  marginBottom: "1.5rem",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4A017", animation: "pulse 2s infinite", display: "inline-block" }} />
                Terminale SES · BAC 2026
              </div>

              <h1
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "clamp(40px, 6vw, 52px)",
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  margin: "0 0 1rem",
                }}
              >
                Les SES<br />
                <span style={{ color: "#D4A017" }}>sans</span>{" "}
                <span style={{ color: "#7EB8FF" }}>stress.</span>
              </h1>

              <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(232,237,245,0.5)", fontWeight: 300, marginBottom: "2rem", maxWidth: 380 }}>
                Fiches interactives, QCM et méthodo bac — tout ce qu&apos;il faut pour progresser en juin. Par ton prof de SES.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {MODES.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className="btn-mode"
                    onClick={() => setMode(mode === item.key ? null : item.key)}
                    aria-pressed={mode === item.key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      background: mode === item.key ? `rgba(${item.rgb},0.12)` : "rgba(255,255,255,0.03)",
                      border: `0.5px solid ${mode === item.key ? item.color : "rgba(255,255,255,0.08)"}`,
                      borderRadius: 12,
                      padding: "0.85rem 1rem",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s",
                    }}
                  >
                    <span style={{ fontSize: 20 }} aria-hidden="true">{item.icon}</span>
                    <span>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: mode === item.key ? item.color : "#e8edf5", letterSpacing: "-0.01em", display: "block" }}>
                        {item.label}
                      </span>
                      <span style={{ fontSize: 11, color: "rgba(232,237,245,0.35)", marginTop: 2, display: "block" }}>{item.desc}</span>
                    </span>
                    <span style={{ marginLeft: "auto", color: item.color, fontSize: 16 }} aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: "1.25rem 1.5rem" }}>
                <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(232,237,245,0.3)", margin: "0 0 0.75rem" }}>
                  Compte à rebours · Épreuve de SES
                </p>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
                  {[
                    { val: countdown.d, label: "Jours" },
                    { val: countdown.h, label: "Heures" },
                    { val: countdown.m, label: "Min" },
                  ].map((item, index) => (
                    <Fragment key={item.label}>
                      {index > 0 && (
                        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 700, color: "#D4A017", alignSelf: "flex-start", paddingTop: 2 }} aria-hidden="true">
                          :
                        </span>
                      )}
                      <div style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 38, fontWeight: 700, color: "#e8edf5", display: "block", letterSpacing: "-0.04em", lineHeight: 1 }}>
                          {item.val}
                        </span>
                        <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,237,245,0.3)", marginTop: 4, display: "block" }}>
                          {item.label}
                        </span>
                      </div>
                    </Fragment>
                  ))}
                </div>
                <p style={{ fontSize: 11, color: "rgba(232,237,245,0.25)", marginTop: 8, marginBottom: 0, letterSpacing: "0.04em" }}>
                  Mardi 16 juin 2026 · 8h00, heure de Guyane
                </p>
                <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 2, height: 3, marginTop: "1rem" }}>
                  <div style={{ background: "linear-gradient(90deg,#D4A017,#7EB8FF)", height: 3, borderRadius: 2, width: "0%" }} />
                </div>
                <p style={{ fontSize: 12, color: "rgba(232,237,245,0.3)", marginTop: 6, marginBottom: 0 }}>0 / 9 chapitres révisés</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.75rem" }}>
                {[
                  { n: "9", l: "Chapitres" },
                  { n: "ECO", l: "4 chapitres", c: "#D4A017" },
                  { n: "SOCIO", l: "4 chapitres", c: "#7EB8FF" },
                ].map((item) => (
                  <div key={item.l} style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "0.9rem 1rem", textAlign: "center" }}>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: item.c || "#e8edf5", display: "block", letterSpacing: "-0.02em" }}>
                      {item.n}
                    </span>
                    <span style={{ fontSize: 10, color: "rgba(232,237,245,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginTop: 4 }}>
                      {item.l}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="chapitres" style={{ position: "relative", zIndex: 5, maxWidth: 1100, margin: "0 auto", padding: "1rem 2.5rem 4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>
                Les 9 chapitres du programme
              </h2>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {FILTERS.map((filter) => (
                  <button
                    key={filter.k ?? "all"}
                    type="button"
                    onClick={() => setFilterMatiere(filter.k)}
                    aria-pressed={filterMatiere === filter.k}
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "4px 12px",
                      borderRadius: 20,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      background: filterMatiere === filter.k ? "#D4A017" : "rgba(255,255,255,0.05)",
                      color: filterMatiere === filter.k ? "#0d1b2a" : "rgba(232,237,245,0.45)",
                      border: `0.5px solid ${filterMatiere === filter.k ? "#D4A017" : "rgba(255,255,255,0.1)"}`,
                    }}
                  >
                    {filter.l}
                  </button>
                ))}
              </div>
            </div>

            <div className="chapters-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              {chapitresFiltres.map((chapitre) => (
                <article
                  key={chapitre.slug}
                  className="card-chapitre"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "0.5px solid rgba(255,255,255,0.08)",
                    borderRadius: 14,
                    padding: "1.25rem",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, gap: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: MATIERE_COLORS[chapitre.matiere], textTransform: "uppercase" }}>
                      {chapitre.num} · {MATIERE_LABELS[chapitre.matiere]}
                    </span>
                    <span style={{ fontSize: 10, color: DIFFICULTE_COLORS[chapitre.difficulte], fontWeight: 600 }}>{chapitre.difficulte}</span>
                  </div>

                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#e8edf5", margin: "0 0 8px", lineHeight: 1.25, letterSpacing: "-0.01em" }}>
                    {chapitre.titre}
                  </h3>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
                    {chapitre.notions.map((notion) => (
                      <span key={notion} style={{ fontSize: 10, background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "2px 7px", color: "rgba(232,237,245,0.5)" }}>
                        {notion}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <Link
                      href={`/terminale/chapitres/${chapitre.slug}`}
                      style={{ flex: 1, background: "#D4A017", color: "#0d1b2a", padding: "0.45rem 0", borderRadius: 8, fontSize: 12, fontWeight: 700, textAlign: "center", letterSpacing: "0.02em" }}
                    >
                      Commencer
                    </Link>
                    <Link
                      href={`/terminale/chapitres/${chapitre.slug}?mode=rapide`}
                      style={{ flex: 1, background: "rgba(255,255,255,0.05)", color: "rgba(232,237,245,0.6)", padding: "0.45rem 0", borderRadius: 8, fontSize: 12, fontWeight: 600, textAlign: "center", border: "0.5px solid rgba(255,255,255,0.1)" }}
                    >
                      ⚡ {chapitre.temps}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      {level !== "terminale" && (
        <section style={{ position: "relative", zIndex: 5, maxWidth: 1100, margin: "0 auto", padding: "4rem 2.5rem", textAlign: "center" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(212,160,23,0.2)", borderRadius: 20, padding: "3rem", display: "inline-block", minWidth: 340 }}>
            <div style={{ fontSize: 48, marginBottom: "1rem" }} aria-hidden="true">🚧</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "#e8edf5", margin: "0 0 0.5rem", letterSpacing: "-0.02em" }}>
              {level.charAt(0).toUpperCase() + level.slice(1)} SES
            </h2>
            <p style={{ fontSize: 14, color: "rgba(232,237,245,0.4)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Le contenu {level} arrive très bientôt.<br />Fiches, QCM et méthodo adaptés au programme.
            </p>
            <span style={{ display: "inline-block", background: "rgba(212,160,23,0.1)", border: "0.5px solid rgba(212,160,23,0.3)", color: "#D4A017", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 20 }}>
              Rentrée 2026
            </span>
          </div>
        </section>
      )}

      <footer
        className="footer-inner"
        style={{
          position: "relative",
          zIndex: 5,
          borderTop: "0.5px solid rgba(255,255,255,0.07)",
          padding: "1.5rem 2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 800, color: "#e8edf5" }}>
          Cap<span style={{ color: "#D4A017" }}>SES</span>
        </Link>
        <p style={{ fontSize: 11, color: "rgba(232,237,245,0.2)", margin: 0 }}>Terminale · Première · Seconde</p>
        <p style={{ fontSize: 11, color: "rgba(232,237,245,0.2)", margin: 0 }}>Par un prof de SES pour ses élèves</p>
      </footer>
    </main>
  );
}
