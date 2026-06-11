"use client";
import { useState, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface ChapterData {
  slug: string;
  label: string;
  color: string;
  emoji: string;
}

interface Progress {
  [slug: string]: "non-commence" | "en-cours" | "valide";
}

interface Scores {
  [slug: string]: number | null;
}

// ── Données chapitres ──────────────────────────────────────────────────────
const CHAPTERS: ChapterData[] = [
  { slug: "croissance-economique",    label: "Croissance économique",               color: "#5DCAA5", emoji: "📈" },
  { slug: "commerce-international",   label: "Commerce international",              color: "#7EB8FF", emoji: "🌍" },
  { slug: "chomage",                  label: "Chômage",                             color: "#F0997B", emoji: "📊" },
  { slug: "politiques-europeennes",   label: "Politiques économiques européennes",  color: "#AFA9EC", emoji: "🇪🇺" },
  { slug: "structure-sociale",        label: "Structure sociale",                   color: "#D4A017", emoji: "🏛️" },
  { slug: "mobilite-sociale",         label: "Mobilité sociale",                    color: "#EF9F27", emoji: "🪜" },
  { slug: "mutations-travail-emploi", label: "Mutations du travail et de l'emploi", color: "#97C459", emoji: "⚙️" },
  { slug: "engagement-politique",     label: "Engagement politique",                color: "#F0997B", emoji: "🗳️" },
  { slug: "environnement",            label: "Action publique environnement",       color: "#5DCAA5", emoji: "🌱" },
];

const STATUS_LABELS = {
  "non-commence": "Non commencé",
  "en-cours":     "En cours",
  "valide":       "Validé ✓",
};

const STATUS_NEXT: Record<string, "non-commence" | "en-cours" | "valide"> = {
  "non-commence": "en-cours",
  "en-cours":     "valide",
  "valide":       "non-commence",
};

const STATUS_COLORS: Record<string, string> = {
  "non-commence": "#2a3a4a",
  "en-cours":     "#EF9F27",
  "valide":       "#5DCAA5",
};

const STATUS_TEXT: Record<string, string> = {
  "non-commence": "#7a8a9a",
  "en-cours":     "#0d1b2a",
  "valide":       "#0d1b2a",
};

// ── Hook mobile ───────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ── Countdown bac ─────────────────────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const [diff, setDiff] = useState(0);
  useEffect(() => {
    const update = () => setDiff(Math.max(0, targetDate.getTime() - Date.now()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  const days    = Math.floor(diff / 86400000);
  const hours   = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

// ── Composant principal ───────────────────────────────────────────────────
export default function EspaceEleves() {
  const isMobile = useIsMobile();
  const BAC_DATE = new Date("2026-06-16T08:00:00");
  const countdown = useCountdown(BAC_DATE);

  const [progress, setProgress]         = useState<Progress>({});
  const [scores, setScores]             = useState<Scores>({});
  const [editingScore, setEditingScore] = useState<string | null>(null);
  const [scoreInput, setScoreInput]     = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetDone, setResetDone]       = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem("capses_progress");
      const s = localStorage.getItem("capses_scores");
      if (p) setProgress(JSON.parse(p));
      if (s) setScores(JSON.parse(s));
    } catch {}
  }, []);

  const saveProgress = (next: Progress) => {
    setProgress(next);
    localStorage.setItem("capses_progress", JSON.stringify(next));
  };

  const saveScores = (next: Scores) => {
    setScores(next);
    localStorage.setItem("capses_scores", JSON.stringify(next));
  };

  const cycleStatus = (slug: string) => {
    const current = progress[slug] || "non-commence";
    saveProgress({ ...progress, [slug]: STATUS_NEXT[current] });
  };

  const submitScore = (slug: string) => {
    const val = parseFloat(scoreInput.replace(",", "."));
    if (!isNaN(val) && val >= 0 && val <= 10) {
      saveScores({ ...scores, [slug]: Math.round(val * 10) / 10 });
    }
    setEditingScore(null);
    setScoreInput("");
  };

  const handleReset = () => {
    saveProgress({});
    saveScores({});
    setShowResetConfirm(false);
    setResetDone(true);
    setTimeout(() => setResetDone(false), 2000);
  };

  const valides  = CHAPTERS.filter(c => progress[c.slug] === "valide").length;
  const enCours  = CHAPTERS.filter(c => progress[c.slug] === "en-cours").length;
  const pct      = Math.round((valides / CHAPTERS.length) * 100);
  const scoredChapters = CHAPTERS.filter(c => scores[c.slug] != null);
  const avgScore = scoredChapters.length
    ? scoredChapters.reduce((sum, c) => sum + (scores[c.slug] || 0), 0) / scoredChapters.length
    : null;

  const bacPasse = countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0;

  return (
    <div style={{ minHeight: "100vh", background: "#0d1b2a", fontFamily: "'Space Grotesk', sans-serif", color: "#e8edf2" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d1b2a; }
        ::-webkit-scrollbar-thumb { background: #2a3a4a; border-radius: 3px; }
        .ch-card { transition: transform 0.2s, border-color 0.3s; }
        .ch-card:hover { transform: translateY(-2px); }
        .score-cell { transition: color 0.2s; }
        .score-cell:hover { color: #7EB8FF; cursor: pointer; }
        .status-btn { transition: filter 0.2s; }
        .status-btn:hover { filter: brightness(1.15); }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
      `}</style>

      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        height: 56, display: "flex", alignItems: "center",
        padding: "0 24px", gap: 16,
        background: "rgba(13,27,42,0.95)", borderBottom: "1px solid #1e3048",
        backdropFilter: "blur(8px)",
      }}>
        <a href="/" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: "#D4A017", textDecoration: "none" }}>CapSES</a>
        <span style={{ color: "#3a5068", fontSize: 14 }}>/</span>
        <span style={{ color: "#e8edf2", fontSize: 14, fontWeight: 500 }}>Espace élèves</span>
      </nav>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "24px 16px 60px" : "40px 24px 80px" }}>

        {/* En-tête */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ color: "#5DCAA5", fontWeight: 600, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>
            Terminale SES · Bac 2026
          </p>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? 28 : 38, lineHeight: 1.1, marginBottom: 20 }}>
            Mon espace de révision
          </h1>

          {/* Countdown */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: bacPasse ? "#5DCAA5" : "#1a2f44",
            border: `1px solid ${bacPasse ? "#5DCAA5" : "#2a4a64"}`,
            borderRadius: 12, padding: "12px 20px",
          }}>
            {bacPasse ? (
              <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: "#0d1b2a" }}>
                🎓 Le bac est passé — bravo !
              </span>
            ) : (
              <>
                <span style={{ fontSize: 18, marginRight: 4 }}>⏳</span>
                <span style={{ fontSize: 13, color: "#7a9ab8", marginRight: 12 }}>Bac SES dans</span>
                {[
                  { val: countdown.days,    unit: "j" },
                  { val: countdown.hours,   unit: "h" },
                  { val: countdown.minutes, unit: "min" },
                  { val: countdown.seconds, unit: "s" },
                ].map(({ val, unit }) => (
                  <div key={unit} style={{ textAlign: "center", minWidth: 36 }}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22, color: "#D4A017", lineHeight: 1 }}>
                      {String(val).padStart(2, "0")}
                    </div>
                    <div style={{ fontSize: 10, color: "#5a7a94", textTransform: "uppercase", letterSpacing: 1 }}>{unit}</div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Stats globales */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: 12, marginBottom: 40,
        }}>
          {[
            { label: "Chapitres validés",  value: `${valides} / 9`, color: "#5DCAA5" },
            { label: "En cours",           value: enCours,          color: "#EF9F27" },
            { label: "Progression",        value: `${pct} %`,       color: "#7EB8FF" },
            { label: "Score moyen quiz",   value: avgScore != null ? `${avgScore.toFixed(1)} / 10` : "—", color: "#AFA9EC" },
          ].map(s => (
            <div key={s.label} style={{
              background: "#111f30", border: "1px solid #1e3048",
              borderRadius: 12, padding: "16px 20px",
            }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 26, color: s.color }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: "#5a7a94", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Barre de progression */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: "#7a9ab8" }}>
            <span>Progression globale</span>
            <span style={{ color: "#5DCAA5", fontWeight: 600 }}>{pct} %</span>
          </div>
          <div style={{ height: 8, background: "#1a2f44", borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${pct}%`,
              background: "linear-gradient(90deg, #5DCAA5, #7EB8FF)",
              borderRadius: 4, transition: "width 0.5s ease",
            }} />
          </div>
        </div>

        {/* Chapitres */}
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 8, color: "#e8edf2" }}>
          📚 Mes chapitres
        </h2>
        <p style={{ fontSize: 12, color: "#5a7a94", marginBottom: 18 }}>
          Clique sur le statut pour le faire avancer · Clique sur le score pour le modifier
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 48 }}>
          {CHAPTERS.map(ch => {
            const status    = progress[ch.slug] || "non-commence";
            const score     = scores[ch.slug];
            const isEditing = editingScore === ch.slug;

            return (
              <div key={ch.slug} className="ch-card" style={{
                background: "#111f30",
                border: `1px solid ${status === "valide" ? ch.color + "55" : "#1e3048"}`,
                borderRadius: 12, padding: "14px 18px",
                display: "flex", alignItems: "center", gap: isMobile ? 10 : 16,
              }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{ch.emoji}</span>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <a href={`/terminale/${ch.slug}`} style={{
                    fontWeight: 600, fontSize: isMobile ? 13 : 15,
                    color: "#e8edf2", textDecoration: "none",
                    display: "block",
                    overflow: "hidden", textOverflow: "ellipsis",
                    whiteSpace: isMobile ? "normal" : "nowrap",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = ch.color)}
                    onMouseLeave={e => (e.currentTarget.style.color = "#e8edf2")}
                  >
                    {ch.label}
                  </a>
                </div>

                {/* Score */}
                <div style={{ flexShrink: 0, minWidth: isMobile ? 52 : 80, textAlign: "center" }}>
                  {isEditing ? (
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      <input
                        type="number" min="0" max="10" step="0.5"
                        value={scoreInput}
                        onChange={e => setScoreInput(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === "Enter") submitScore(ch.slug);
                          if (e.key === "Escape") setEditingScore(null);
                        }}
                        autoFocus
                        style={{
                          width: 48, background: "#1a2f44", border: "1px solid #7EB8FF",
                          borderRadius: 6, padding: "4px 6px", color: "#e8edf2",
                          fontSize: 13, fontFamily: "'Space Grotesk',sans-serif", outline: "none",
                        }}
                      />
                      <button onClick={() => submitScore(ch.slug)} style={{
                        background: "#7EB8FF", border: "none", borderRadius: 4,
                        padding: "4px 8px", color: "#0d1b2a", fontWeight: 700,
                        fontSize: 11, cursor: "pointer",
                      }}>OK</button>
                    </div>
                  ) : (
                    <div
                      className="score-cell"
                      onClick={() => { setEditingScore(ch.slug); setScoreInput(score != null ? String(score) : ""); }}
                      title="Cliquer pour saisir le score"
                      style={{ fontSize: 13, color: score != null ? "#AFA9EC" : "#3a5068" }}
                    >
                      {score != null ? `${score} / 10` : "—"}
                    </div>
                  )}
                </div>

                {/* Bouton statut */}
                <button
                  className="status-btn"
                  onClick={() => cycleStatus(ch.slug)}
                  style={{
                    flexShrink: 0,
                    background: STATUS_COLORS[status],
                    color: STATUS_TEXT[status],
                    border: "none", borderRadius: 8,
                    padding: isMobile ? "6px 10px" : "7px 14px",
                    fontSize: isMobile ? 11 : 12, fontWeight: 600,
                    cursor: "pointer", whiteSpace: "nowrap",
                    fontFamily: "'Space Grotesk',sans-serif",
                  }}
                >
                  {STATUS_LABELS[status]}
                </button>
              </div>
            );
          })}
        </div>

        {/* Tableau scores */}
        {scoredChapters.length > 0 && (
          <>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 16 }}>
              🎯 Scores aux quiz
            </h2>
            <div style={{
              background: "#111f30", border: "1px solid #1e3048",
              borderRadius: 14, overflow: "hidden", marginBottom: 40,
            }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #1e3048" }}>
                    {["Chapitre", "Score", "Niveau"].map(h => (
                      <th key={h} style={{
                        padding: "12px 18px",
                        textAlign: h === "Chapitre" ? "left" : "center",
                        fontSize: 11, color: "#5a7a94", fontWeight: 600,
                        letterSpacing: 1, textTransform: "uppercase",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scoredChapters.map((ch, i) => {
                    const s = scores[ch.slug]!;
                    const niveau = s >= 8 ? { label: "Excellent",    color: "#5DCAA5" }
                      :           s >= 6 ? { label: "Bien",          color: "#7EB8FF" }
                      :           s >= 4 ? { label: "À revoir",      color: "#EF9F27" }
                      :                   { label: "Insuffisant",    color: "#F0997B" };
                    return (
                      <tr key={ch.slug} style={{ borderBottom: i < scoredChapters.length - 1 ? "1px solid #1a2f44" : "none" }}>
                        <td style={{ padding: "12px 18px", fontSize: 14 }}>
                          <span style={{ marginRight: 8 }}>{ch.emoji}</span>
                          {isMobile ? ch.label.split(" ").slice(0, 2).join(" ") + "…" : ch.label}
                        </td>
                        <td style={{ padding: "12px 18px", textAlign: "center" }}>
                          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 18, color: niveau.color }}>{s}</span>
                          <span style={{ color: "#3a5068", fontSize: 13 }}> / 10</span>
                        </td>
                        <td style={{ padding: "12px 18px", textAlign: "center" }}>
                          <span style={{
                            background: niveau.color + "22", color: niveau.color,
                            borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 600,
                          }}>{niveau.label}</span>
                        </td>
                      </tr>
                    );
                  })}
                  {avgScore != null && (
                    <tr style={{ borderTop: "2px solid #1e3048", background: "#0d1b2a" }}>
                      <td style={{ padding: "12px 18px", fontSize: 13, color: "#7a9ab8", fontWeight: 600 }}>Moyenne</td>
                      <td style={{ padding: "12px 18px", textAlign: "center" }}>
                        <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20, color: "#AFA9EC" }}>
                          {avgScore.toFixed(1)}
                        </span>
                        <span style={{ color: "#3a5068", fontSize: 13 }}> / 10</span>
                      </td>
                      <td />
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Reset */}
        <div style={{ borderTop: "1px solid #1e3048", paddingTop: 32, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              style={{
                background: "transparent", border: "1px solid #2a3a4a",
                color: "#5a7a94", borderRadius: 8, padding: "8px 18px",
                fontSize: 13, cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#F0997B"; e.currentTarget.style.color = "#F0997B"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a3a4a"; e.currentTarget.style.color = "#5a7a94"; }}
            >
              🗑️ Réinitialiser ma progression
            </button>
          ) : (
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, color: "#F0997B" }}>Supprimer toute la progression ?</span>
              <button onClick={handleReset} style={{
                background: "#F0997B", border: "none", borderRadius: 8,
                padding: "8px 16px", fontSize: 13, fontWeight: 700,
                color: "#0d1b2a", cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif",
              }}>Confirmer</button>
              <button onClick={() => setShowResetConfirm(false)} style={{
                background: "transparent", border: "1px solid #2a3a4a",
                color: "#7a9ab8", borderRadius: 8, padding: "8px 16px",
                fontSize: 13, cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif",
              }}>Annuler</button>
            </div>
          )}
          {resetDone && <span style={{ fontSize: 13, color: "#5DCAA5" }}>✓ Progression effacée</span>}
        </div>

      </div>
    </div>
  );
}
