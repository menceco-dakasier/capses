"use client";

import { useEffect, useRef, useState } from "react";

const CHAPITRES = [
  // ECO
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
  // SOCIO
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
  // REGARDS CROISÉS
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

const MATIERE_COLORS: Record<string, string> = {
  ECO: "#D4A017",
  SOCIO: "#7EB8FF",
  RC: "#c084fc",
};

const MATIERE_LABELS: Record<string, string> = {
  ECO: "Économie",
  SOCIO: "Sociologie",
  RC: "Regards croisés",
};

const DIFFICULTE_COLORS: Record<string, string> = {
  Facile: "#4ade80",
  Moyen: "#D4A017",
  Exigeant: "#f87171",
};

type Level = "terminale" | "premiere" | "seconde";
type Mode = "decouvrir" | "reviser" | "perdu";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [level, setLevel] = useState<Level>("terminale");
  const [mode, setMode] = useState<Mode | null>(null);
  const [countdown, setCountdown] = useState({ d: "--", h: "--", m: "--" });
  const [filterMatiere, setFilterMatiere] = useState<string | null>(null);

  // Compte à rebours
  useEffect(() => {
    const update = () => {
      const target = new Date("2026-06-18T08:00:00");
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setCountdown({
        d: String(Math.floor(diff / 86400000)).padStart(2, "0"),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, "0"),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0"),
      });
    };
    update();
    const t = setInterval(update, 30000);
    return () => clearInterval(t);
  }, []);

  // Animation canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const GOLD = "#D4A017";
    const BLUE = "#7EB8FF";
    const LGOLD = "#e8c84a";

    const bills = Array.from({ length: 18 }, () => {
      const w = 54 + Math.random() * 30;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        w, h: w * 0.47,
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
      for (let i = 0; i <= 80; i++) {
        y += (Math.random() - 0.48) * 0.025;
        y = Math.max(0.05, Math.min(0.95, y));
        pts.push(y);
      }
      return {
        pts, offset: 0,
        speed: 0.12 + Math.random() * 0.15,
        color: c === 0 ? GOLD : c === 1 ? BLUE : "rgba(232,237,245,0.2)",
        alpha: 0.15 + Math.random() * 0.12,
        thick: 1 + Math.random(),
      };
    });

    const symList = ["€", "$", "£", "%", "↑", "↗", "≈", "∑", "Δ"];
    const syms = Array.from({ length: 14 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 10 + Math.random() * 14,
      speedY: -(0.2 + Math.random() * 0.3),
      speedX: (Math.random() - 0.5) * 0.2,
      alpha: 0.08 + Math.random() * 0.14,
      sym: symList[Math.floor(Math.random() * symList.length)],
      color: Math.random() > 0.5 ? GOLD : BLUE,
    }));

    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Courbes
      curves.forEach((c) => {
        c.offset += c.speed;
        if (c.offset > 10) c.offset = 0;
        ctx.save();
        ctx.globalAlpha = c.alpha;
        ctx.strokeStyle = c.color;
        ctx.lineWidth = c.thick;
        ctx.beginPath();
        c.pts.forEach((pt, i) => {
          const xi = (i / (c.pts.length - 1)) * canvas.width;
          const yi = pt * canvas.height * 0.45 + canvas.height * 0.1;
          i === 0 ? ctx.moveTo(xi, yi) : ctx.lineTo(xi, yi);
        });
        ctx.stroke();
        ctx.restore();
      });

      // Billets
      bills.forEach((b) => {
        b.y += b.speedY;
        b.x += b.speedX;
        b.rot += b.rotSpeed;
        if (b.y > canvas.height + 60) { b.y = -60; b.x = Math.random() * canvas.width; }
        if (b.x < -80) b.x = canvas.width + 80;
        if (b.x > canvas.width + 80) b.x = -80;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        ctx.globalAlpha = b.alpha;
        const hw = b.w / 2, hh = b.h / 2;
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 0.8;
        ctx.strokeRect(-hw, -hh, b.w, b.h);
        ctx.strokeRect(-hw + 2.5, -hh + 2.5, b.w - 5, b.h - 5);
        ctx.fillStyle = b.color;
        ctx.font = `bold ${b.h * 0.55}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("€", 0, 0);
        ctx.font = `${b.h * 0.28}px monospace`;
        ctx.fillText(b.val, -hw + 8, -hh + 6);
        ctx.fillText(b.val, hw - 8, hh - 6);
        ctx.restore();
      });

      // Symboles
      syms.forEach((s) => {
        s.y += s.speedY;
        s.x += s.speedX;
        if (s.y < -30) { s.y = canvas.height + 30; s.x = Math.random() * canvas.width; }
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
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const chapitresFiltres = filterMatiere
    ? CHAPITRES.filter((c) => c.matiere === filterMatiere)
    : CHAPITRES;

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: "#0d1b2a", color: "#e8edf5", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Grotesk:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        .hover-gold:hover { color: #D4A017 !important; }
        .card-chapitre:hover { border-color: rgba(212,160,23,0.4) !important; background: rgba(212,160,23,0.05) !important; }
        .btn-mode:hover { opacity: 0.85; }
        .level-btn:hover { opacity: 0.8; }
        .nav-link:hover { color: #D4A017; }
      `}</style>

      {/* Canvas background */}
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.5 }} />
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse 90% 70% at 50% 40%, rgba(13,27,42,0.1) 0%, rgba(13,27,42,0.88) 65%, #0d1b2a 100%)", zIndex: 1, pointerEvents: "none" }} />

      {/* NAV */}
      <nav style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.4rem 2.5rem", borderBottom: "0.5px solid rgba(255,255,255,0.07)", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>
          Cap<span style={{ color: "#D4A017" }}>SES</span>
        </div>
        <div style={{ display: "flex", gap: "1.8rem", alignItems: "center" }}>
          {["Chapitres", "Méthodo", "Glossaire"].map((l) => (
            <a key={l} href="#" className="nav-link" style={{ fontSize: 13, color: "rgba(232,237,245,0.45)", letterSpacing: "0.02em", transition: "color 0.2s" }}>{l}</a>
          ))}
          <a href="/espace-eleves" style={{ background: "#D4A017", color: "#0d1b2a", padding: "0.45rem 1.1rem", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
            Espace élèves
          </a>
        </div>
      </nav>

      {/* LEVEL SWITCHER */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "center", padding: "1.5rem 0 0" }}>
        {(["terminale", "premiere", "seconde"] as Level[]).map((l, i) => (
          <button key={l} onClick={() => setLevel(l)} className="level-btn"
            style={{
              fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase",
              padding: "0.5rem 1.4rem",
              border: "0.5px solid rgba(255,255,255,0.12)",
              borderRadius: i === 0 ? "20px 0 0 20px" : i === 2 ? "0 20px 20px 0" : 0,
              background: level === l ? "#D4A017" : "transparent",
              color: level === l ? "#0d1b2a" : "rgba(232,237,245,0.35)",
              cursor: "pointer", transition: "all 0.2s",
              opacity: l !== "terminale" ? 0.7 : 1,
            }}>
            {l.charAt(0).toUpperCase() + l.slice(1)}
            {l !== "terminale" && <span style={{ fontSize: 9, display: "block", color: "rgba(232,237,245,0.4)", fontWeight: 400, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.05em" }}>Bientôt</span>}
          </button>
        ))}
      </div>

      {/* CONTENU TERMINALE */}
      {level === "terminale" && (
        <>
          {/* HERO */}
          <section style={{ position: "relative", zIndex: 5, padding: "4rem 2.5rem 2rem", maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(212,160,23,0.1)", border: "0.5px solid rgba(212,160,23,0.3)", color: "#D4A017", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 20, marginBottom: "1.5rem" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4A017", animation: "pulse 2s infinite", display: "inline-block" }} />
                Terminale SES · BAC 2026
              </div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
                Les SES<br />
                <span style={{ color: "#D4A017" }}>sans</span>{" "}
                <span style={{ color: "#7EB8FF" }}>stress.</span>
              </h1>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(232,237,245,0.5)", fontWeight: 300, marginBottom: "2rem", maxWidth: 380 }}>
                Fiches interactives, QCM et méthodo bac — tout ce qu&apos;il faut pour cartonner en juin. Par ton prof de SES.
              </p>
              {/* 3 ENTRÉES ÉLÈVE */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {([
                  { key: "decouvrir", icon: "📖", label: "Je découvre le cours", desc: "Fiches claires, vidéos courtes, notions", color: "#D4A017" },
                  { key: "reviser", icon: "🎯", label: "Je révise pour le bac", desc: "Quiz, sujets, plans, méthode EC/dissert", color: "#7EB8FF" },
                  { key: "perdu", icon: "🧭", label: "Je suis perdu, je commence où ?", desc: "Parcours guidé + recommandations", color: "#c084fc" },
                ] as { key: Mode; icon: string; label: string; desc: string; color: string }[]).map((m) => (
                  <button key={m.key} className="btn-mode" onClick={() => setMode(mode === m.key ? null : m.key)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12,
                      background: mode === m.key ? `rgba(${m.color === "#D4A017" ? "212,160,23" : m.color === "#7EB8FF" ? "126,184,255" : "192,132,252"},0.12)` : "rgba(255,255,255,0.03)",
                      border: `0.5px solid ${mode === m.key ? m.color : "rgba(255,255,255,0.08)"}`,
                      borderRadius: 12, padding: "0.85rem 1rem", cursor: "pointer",
                      textAlign: "left", transition: "all 0.2s",
                    }}>
                    <span style={{ fontSize: 20 }}>{m.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: mode === m.key ? m.color : "#e8edf5", letterSpacing: "-0.01em" }}>{m.label}</div>
                      <div style={{ fontSize: 11, color: "rgba(232,237,245,0.35)", marginTop: 2 }}>{m.desc}</div>
                    </div>
                    <span style={{ marginLeft: "auto", color: m.color, fontSize: 16 }}>→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* COUNTDOWN */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: "1.25rem 1.5rem" }}>
                <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(232,237,245,0.3)", marginBottom: "0.75rem" }}>Compte à rebours · Épreuve de SES</p>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
                  {[{ val: countdown.d, label: "Jours" }, { val: countdown.h, label: "Heures" }, { val: countdown.m, label: "Min" }].map((u, i) => (
                    <>
                      {i > 0 && <span key={`sep-${i}`} style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 700, color: "#D4A017", alignSelf: "flex-start", paddingTop: 2 }}>:</span>}
                      <div key={u.label} style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 38, fontWeight: 700, color: "#e8edf5", display: "block", letterSpacing: "-0.04em", lineHeight: 1 }}>{u.val}</span>
                        <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(232,237,245,0.3)", marginTop: 4, display: "block" }}>{u.label}</span>
                      </div>
                    </>
                  ))}
                </div>
                <p style={{ fontSize: 11, color: "rgba(232,237,245,0.25)", marginTop: 8, letterSpacing: "0.04em" }}>Mercredi 18 juin 2026 · 8h00</p>
                <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 2, height: 3, marginTop: "1rem" }}>
                  <div style={{ background: "linear-gradient(90deg,#D4A017,#7EB8FF)", height: 3, borderRadius: 2, width: "0%" }} />
                </div>
                <p style={{ fontSize: 12, color: "rgba(232,237,245,0.3)", marginTop: 6 }}>0 / 9 chapitres révisés</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.75rem" }}>
                {[{ n: "9", l: "Chapitres" }, { n: "ECO", l: "4 chapitres", c: "#D4A017" }, { n: "SOCIO", l: "4 chapitres", c: "#7EB8FF" }].map((s) => (
                  <div key={s.l} style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "0.9rem 1rem", textAlign: "center" }}>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, color: s.c || "#e8edf5", display: "block", letterSpacing: "-0.02em" }}>{s.n}</span>
                    <span style={{ fontSize: 10, color: "rgba(232,237,245,0.3)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginTop: 4 }}>{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CHAPITRES */}
          <section style={{ position: "relative", zIndex: 5, maxWidth: 1100, margin: "0 auto", padding: "1rem 2.5rem 4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }}>Les 9 chapitres du programme</span>
              <div style={{ display: "flex", gap: 8 }}>
                {[{ k: null, l: "Tous" }, { k: "ECO", l: "Économie" }, { k: "SOCIO", l: "Sociologie" }, { k: "RC", l: "Regards croisés" }].map((f) => (
                  <button key={String(f.k)} onClick={() => setFilterMatiere(f.k)}
                    style={{
                      fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20, cursor: "pointer", transition: "all 0.2s",
                      background: filterMatiere === f.k ? "#D4A017" : "rgba(255,255,255,0.05)",
                      color: filterMatiere === f.k ? "#0d1b2a" : "rgba(232,237,245,0.45)",
                      border: `0.5px solid ${filterMatiere === f.k ? "#D4A017" : "rgba(255,255,255,0.1)"}`,
                    }}>{f.l}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              {chapitresFiltres.map((ch) => (
                <div key={ch.slug} className="card-chapitre"
                  style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "1.25rem", cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: MATIERE_COLORS[ch.matiere], textTransform: "uppercase" }}>{ch.num} · {MATIERE_LABELS[ch.matiere]}</span>
                    <span style={{ fontSize: 10, color: DIFFICULTE_COLORS[ch.difficulte], fontWeight: 600 }}>{ch.difficulte}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#e8edf5", marginBottom: 8, lineHeight: 1.25, letterSpacing: "-0.01em" }}>{ch.titre}</h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
                    {ch.notions.map((n) => (
                      <span key={n} style={{ fontSize: 10, background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "2px 7px", color: "rgba(232,237,245,0.5)" }}>{n}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <a href={`/terminale/${ch.slug}`} style={{ flex: 1, background: "#D4A017", color: "#0d1b2a", padding: "0.45rem 0", borderRadius: 8, fontSize: 12, fontWeight: 700, textAlign: "center", letterSpacing: "0.02em" }}>
                      Commencer
                    </a>
                    <a href={`/terminale/${ch.slug}?mode=rapide`} style={{ flex: 1, background: "rgba(255,255,255,0.05)", color: "rgba(232,237,245,0.6)", padding: "0.45rem 0", borderRadius: 8, fontSize: 12, fontWeight: 600, textAlign: "center", border: "0.5px solid rgba(255,255,255,0.1)" }}>
                      ⚡ {ch.temps}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* BIENTÔT */}
      {level !== "terminale" && (
        <div style={{ position: "relative", zIndex: 5, maxWidth: 1100, margin: "0 auto", padding: "4rem 2.5rem", textAlign: "center" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(212,160,23,0.2)", borderRadius: 20, padding: "3rem", display: "inline-block", minWidth: 340 }}>
            <div style={{ fontSize: 48, marginBottom: "1rem" }}>🚧</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: "#e8edf5", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
              {level.charAt(0).toUpperCase() + level.slice(1)} SES
            </h2>
            <p style={{ fontSize: 14, color: "rgba(232,237,245,0.4)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Le contenu {level} arrive très bientôt.<br />Fiches, QCM et méthodo adaptés au programme.
            </p>
            <span style={{ display: "inline-block", background: "rgba(212,160,23,0.1)", border: "0.5px solid rgba(212,160,23,0.3)", color: "#D4A017", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 16px", borderRadius: 20 }}>
              Rentrée 2026
            </span>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 5, borderTop: "0.5px solid rgba(255,255,255,0.07)", padding: "1.5rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 800 }}>
          Cap<span style={{ color: "#D4A017" }}>SES</span>
        </div>
        <p style={{ fontSize: 11, color: "rgba(232,237,245,0.2)" }}>Terminale · Première · Seconde</p>
        <p style={{ fontSize: 11, color: "rgba(232,237,245,0.2)" }}>Par un prof de SES pour ses élèves</p>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
}
