"use client";

import React, { useState, useEffect } from "react";

// ─── Hook mobile ────────────────────────────────────────────────
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

// ─── Composants réutilisables ────────────────────────────────────
function STitle({ children, color = "#7EB8FF" }: { children: React.ReactNode; color?: string }) {
  return (
    <h3
      style={{
        fontSize: 13,
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        color,
        borderLeft: `3px solid ${color}`,
        paddingLeft: 10,
        margin: "20px 0 10px",
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      }}
    >
      {children}
    </h3>
  );
}

function DefBox({
  label,
  children,
  color = "#7EB8FF",
  bg = "rgba(126,184,255,0.08)",
}: {
  label: string;
  children: React.ReactNode;
  color?: string;
  bg?: string;
}) {
  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${color}40`,
        borderRadius: 10,
        padding: "14px 16px",
        marginBottom: 12,
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          letterSpacing: "0.1em",
          color,
          marginBottom: 6,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "#cbd5e1",
          lineHeight: 1.7,
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function StatGrid({ stats }: { stats: { num: string; label: string; color?: string }[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, 1fr)`,
        gap: 8,
        marginBottom: 16,
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: "14px 10px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              fontFamily: "'Syne', sans-serif",
              color: s.color || "#D4A017",
              lineHeight: 1,
              marginBottom: 6,
            }}
          >
            {s.num}
          </div>
          <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.4, fontFamily: "'Space Grotesk', sans-serif" }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function CardGrid({ cards }: { cards: { badge: string; title: string; text: string; color?: string }[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 10,
        marginBottom: 16,
      }}
    >
      {cards.map((c, i) => (
        <div
          key={i}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: 14,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "2px 8px",
              borderRadius: 20,
              background: `${c.color || "#7EB8FF"}18`,
              color: c.color || "#7EB8FF",
              border: `1px solid ${c.color || "#7EB8FF"}40`,
              display: "inline-block",
              marginBottom: 8,
            }}
          >
            {c.badge}
          </span>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif" }}>
            {c.title}
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5, fontFamily: "'Space Grotesk', sans-serif" }}>
            {c.text}
          </div>
        </div>
      ))}
    </div>
  );
}

function NoteBox({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warn" | "success" | "actu" }) {
  const configs = {
    info: { bg: "rgba(126,184,255,0.08)", border: "#7EB8FF40", color: "#7EB8FF" },
    warn: { bg: "rgba(239,68,68,0.08)", border: "#ef444440", color: "#f87171" },
    success: { bg: "rgba(93,202,165,0.08)", border: "#5DCAA540", color: "#5DCAA5" },
    actu: { bg: "rgba(212,160,23,0.08)", border: "#D4A01740", color: "#D4A017" },
  };
  const c = configs[type];
  return (
    <div
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 12,
        fontFamily: "'Space Grotesk', sans-serif",
        color: "#cbd5e1",
        marginBottom: 14,
        lineHeight: 1.7,
      }}
    >
      {children}
    </div>
  );
}

function MecaBox({ title, steps }: { title: string; steps: { text: React.ReactNode; color?: string }[] }) {
  const colors = ["#7EB8FF", "#D4A017", "#f87171", "#5DCAA5", "#a78bfa"];
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: "1rem 1.2rem",
        marginBottom: 16,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 14,
          textAlign: "center",
        }}
      >
        {title}
      </div>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
          <div
            style={{
              background: s.color || colors[i % colors.length],
              color: "#0d1b2a",
              borderRadius: "50%",
              width: 22,
              height: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              flexShrink: 0,
              marginTop: 1,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {i + 1}
          </div>
          <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6, fontFamily: "'Space Grotesk', sans-serif" }}>
            {s.text}
          </div>
        </div>
      ))}
    </div>
  );
}

function Accordion({ items }: { items: { title: string; color: string; content: React.ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div style={{ marginBottom: 16 }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 8,
            marginBottom: 8,
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 14px",
              background: open === i ? "rgba(255,255,255,0.05)" : "transparent",
              border: "none",
              cursor: "pointer",
              color: "#e2e8f0",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              textAlign: "left",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: item.color,
                flexShrink: 0,
              }}
            />
            {item.title}
            <span style={{ marginLeft: "auto", color: "#64748b", fontSize: 11, transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
          </button>
          {open === i && (
            <div
              style={{
                padding: "4px 14px 14px",
                fontSize: 13,
                color: "#94a3b8",
                lineHeight: 1.7,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Données Quiz ────────────────────────────────────────────────
const quizQuestions = [
  {
    q: "Que mesure le rapport interdécile D9/D1 ?",
    opts: [
      "La part du revenu détenue par les 10 % les plus riches",
      "Le rapport entre le niveau de vie plancher des 10 % les plus riches et le niveau de vie plafond des 10 % les plus pauvres",
      "La différence entre le revenu médian et le revenu moyen",
      "Le pourcentage de la population vivant sous le seuil de pauvreté",
    ],
    ans: 1,
    exp: "Le rapport interdécile D9/D1 compare le niveau de vie minimum des 10 % les plus aisés (D9) au niveau de vie maximum des 10 % les plus modestes (D1). En 2023, le rapport entre les revenus moyens des 10 % les plus riches et 10 % les plus pauvres atteint 7,3 — niveau record depuis 30 ans en France.",
  },
  {
    q: "Un indice de Gini de 0,297 (France, 2023) signifie que :",
    opts: [
      "29,7 % de la population vit sous le seuil de pauvreté",
      "Les 30 % les plus riches détiennent 70 % des revenus",
      "Les inégalités de revenus sont à un niveau proche de leur pic historique — plus proches de 0 (égalité parfaite) que de 1 (inégalité totale)",
      "La France est le pays le plus inégalitaire d'Europe",
    ],
    ans: 2,
    exp: "L'indice de Gini varie entre 0 (égalité parfaite) et 1 (inégalité absolue). À 0,297, la France est dans une situation intermédiaire — plus égalitaire que les États-Unis (≈ 0,39), moins que les pays nordiques (≈ 0,25). Ce niveau signale une remontée préoccupante des inégalités.",
  },
  {
    q: "Quelle est la définition des PCS (Professions et Catégories Socioprofessionnelles) ?",
    opts: [
      "Un classement des individus selon leur seul niveau de revenu annuel",
      "Une classification de l'INSEE regroupant des actifs présentant une homogénéité sociale selon le statut d'emploi, le secteur, le niveau hiérarchique et la qualification",
      "Un indicateur statistique qui mesure les inégalités de patrimoine",
      "Un système de classification fondé uniquement sur le niveau de diplôme obtenu",
    ],
    ans: 1,
    exp: "Les PCS, créées par l'INSEE en 1954 et révisées en 1982, regroupent les actifs en 8 grandes catégories selon 4 critères : le statut d'emploi (salarié/indépendant), le secteur d'activité, le niveau hiérarchique et la qualification de l'emploi.",
  },
  {
    q: "Selon Karl Marx, qu'est-ce qui différencie une « classe en soi » d'une « classe pour soi » ?",
    opts: [
      "La classe en soi est riche, la classe pour soi est pauvre",
      "La classe pour soi est définie objectivement par la place dans la production, la classe en soi par le prestige",
      "La classe en soi repose sur un critère objectif (place dans la production), la classe pour soi y ajoute la conscience de classe et la lutte collective",
      "La classe en soi disparaît dans le capitalisme avancé, la classe pour soi persiste",
    ],
    ans: 2,
    exp: "Pour Marx : la CLASSE EN SOI = critère objectif (partager la même place dans les rapports de production). La CLASSE POUR SOI = classe en soi + conscience de classe + lutte collective (grèves, syndicats). Sans conscience ni lutte, il n'y a pas de classe sociale au sens plein du terme.",
  },
  {
    q: "En quoi l'analyse de Max Weber est-elle dite « pluridimensionnelle » ?",
    opts: [
      "Il identifie des centaines de petites classes sociales là où Marx n'en voit que deux",
      "Il analyse la stratification selon trois ordres distincts : l'ordre économique (classes), l'ordre social (prestige) et l'ordre politique (partis/pouvoir)",
      "Il considère que seul le niveau de diplôme détermine la position sociale",
      "Il pense que les inégalités économiques, de prestige et de pouvoir se superposent toujours parfaitement",
    ],
    ans: 1,
    exp: "Weber distingue trois ordres de hiérarchisation qui ne se superposent pas nécessairement : 1) Classes sociales (richesse), 2) Groupes de statut (prestige/honneur social), 3) Partis (pouvoir politique). Un artiste peut avoir du prestige sans richesse ; un politique peut avoir du pouvoir sans fortune. Vision nominaliste et multidimensionnelle.",
  },
  {
    q: "Qu'est-ce que la « polarisation des emplois » ?",
    opts: [
      "La concentration géographique des emplois dans les grandes métropoles",
      "La hausse simultanée des emplois très qualifiés ET des emplois peu qualifiés de service, au détriment des emplois de qualification intermédiaire, sous l'effet de l'automatisation",
      "La division des actifs entre secteur public et secteur privé",
      "La hausse du chômage dans les secteurs industriels en déclin",
    ],
    ans: 1,
    exp: "La polarisation des emplois désigne le fait que l'automatisation touche surtout les emplois moyennement qualifiés (tâches répétitives et codifiables). La structure des emplois « se creuse » au milieu : hausse des emplois très qualifiés (cadres, ingénieurs) ET des emplois peu qualifiés de service (aide à domicile, restauration, livraison).",
  },
  {
    q: "En 2024, selon l'INSEE, quel est l'écart salarial entre femmes et hommes dans le secteur privé, tous temps de travail confondus ?",
    opts: [
      "Environ 4 % de moins pour les femmes",
      "Environ 14 % de moins pour les femmes",
      "Environ 21,8 % de moins pour les femmes",
      "Environ 35 % de moins pour les femmes",
    ],
    ans: 2,
    exp: "En 2024, tous temps de travail confondus, les femmes gagnent en moyenne 21,8 % de moins que les hommes. À temps de travail identique (EQTP), l'écart tombe à 14 %. À même poste chez le même employeur, l'écart se réduit à 3,6 %. À ce rythme, l'égalité salariale ne serait atteinte que dans ~54 ans.",
  },
  {
    q: "Qu'est-ce que la thèse de la « moyennisation » proposée par Henri Mendras (1988) ?",
    opts: [
      "La thèse selon laquelle les classes moyennes disparaissent au profit des extrêmes",
      "La thèse selon laquelle la société française se structure autour d'une vaste classe moyenne, réduisant les positions extrêmes et homogénéisant les modes de vie",
      "La thèse selon laquelle le revenu médian remplace le revenu moyen comme indicateur de référence",
      "La thèse selon laquelle la mobilité sociale ascendante est impossible pour les classes populaires",
    ],
    ans: 1,
    exp: "Henri Mendras (La Seconde Révolution française, 1988) propose que les Trente Glorieuses ont engendré une vaste classe moyenne. Il représente la société en TOUPIE (large au centre, étroite aux extrémités), contrairement au modèle marxiste en SABLIER. Cette thèse est aujourd'hui très contestée : depuis les années 1990, les inégalités ont recommencé à croître (Chauvel, Piketty).",
  },
  {
    q: "Qu'est-ce que l'« intersectionnalité » en sociologie ?",
    opts: [
      "L'étude des intersections entre espaces urbains défavorisés",
      "Le fait que les rapports de genre, de classe, d'âge, d'origine… sont imbriqués et se renforcent mutuellement pour produire des inégalités cumulatives",
      "La méthode statistique croisant les données de revenus et de patrimoine",
      "La théorie selon laquelle les classes sociales se divisent en sous-groupes de plus en plus nombreux",
    ],
    ans: 1,
    exp: "L'intersectionnalité (L. Bereni) désigne le fait que les rapports de genre sont toujours imbriqués dans d'autres rapports de pouvoir. Exemple : une femme ouvrière subit à la fois les inégalités de genre ET de classe (double peine). Il faut donc articuler les analyses de classe et de genre, pas les opposer.",
  },
  {
    q: "Qu'est-ce que la « salarisation » de l'emploi ?",
    opts: [
      "L'augmentation générale des salaires depuis 1950",
      "L'accroissement de la part des emplois salariés parmi l'ensemble des emplois, au détriment des indépendants",
      "La généralisation du temps partiel dans le secteur tertiaire",
      "La mise en place de grilles de salaires dans la fonction publique",
    ],
    ans: 1,
    exp: "La salarisation désigne l'augmentation de la part des emplois salariés dans l'ensemble des emplois. La part des indépendants passe de 27 % (début années 1960) à 11 % (2014). Causes : concentration économique, déclin de l'artisanat, meilleure protection du statut salarié. Nuance : rebond depuis 2015 avec les auto-entrepreneurs et plateformes (12 % en 2016).",
  },
];

// ─── Composant Quiz ──────────────────────────────────────────────
function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const q = quizQuestions[current];

  function selectOpt(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.ans) setScore((s) => s + 1);
  }

  function next() {
    if (current + 1 >= quizQuestions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  function restart() {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  if (finished) {
    const pct = Math.round((score / quizQuestions.length) * 100);
    const emoji = pct >= 90 ? "🏆" : pct >= 70 ? "👍" : pct >= 50 ? "📚" : "💪";
    const msg =
      pct >= 90
        ? "Excellent ! Tu maîtrises parfaitement ce chapitre."
        : pct >= 70
        ? "Très bien ! Quelques points à revoir, mais tu as l'essentiel."
        : pct >= 50
        ? "Pas mal, mais relis les sections Théories et Débat !"
        : "Courage ! Reprends les notions fondamentales depuis le début.";
    return (
      <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>{emoji}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#D4A017", fontFamily: "'Syne', sans-serif", marginBottom: 8 }}>
          {score} / {quizQuestions.length} — {pct} %
        </div>
        <div style={{ fontSize: 14, color: "#94a3b8", marginBottom: 24, fontFamily: "'Space Grotesk', sans-serif" }}>{msg}</div>
        <button
          onClick={restart}
          style={{
            background: "#D4A017",
            color: "#0d1b2a",
            border: "none",
            borderRadius: 8,
            padding: "10px 22px",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          🔁 Recommencer le quiz
        </button>
      </div>
    );
  }

  return (
    <div>
      <NoteBox type="success">
        <strong>🧠 Objectif 4 — Quiz de révision</strong> · {quizQuestions.length} questions pour tester tes connaissances sur la structure sociale.
      </NoteBox>
      <div style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0", marginBottom: 14, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.5 }}>
        {q.q}
      </div>
      <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
        {q.opts.map((opt, i) => {
          let bg = "rgba(255,255,255,0.04)";
          let border = "rgba(255,255,255,0.1)";
          let color = "#cbd5e1";
          if (selected !== null) {
            if (i === q.ans) { bg = "rgba(93,202,165,0.12)"; border = "#5DCAA5"; color = "#5DCAA5"; }
            else if (i === selected) { bg = "rgba(248,113,113,0.12)"; border = "#f87171"; color = "#f87171"; }
          }
          return (
            <button
              key={i}
              onClick={() => selectOpt(i)}
              disabled={selected !== null}
              style={{
                textAlign: "left",
                padding: "12px 14px",
                border: `1px solid ${border}`,
                borderRadius: 8,
                background: bg,
                color,
                fontSize: 13,
                cursor: selected !== null ? "default" : "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                lineHeight: 1.5,
                transition: "all 0.15s",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div
          style={{
            background: "rgba(212,160,23,0.08)",
            border: "1px solid #D4A01740",
            borderRadius: 8,
            padding: "12px 14px",
            fontSize: 13,
            color: "#cbd5e1",
            lineHeight: 1.7,
            marginBottom: 16,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {selected === q.ans ? "✅ " : "❌ "}
          {q.exp}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "#64748b", fontFamily: "'Space Grotesk', sans-serif" }}>
          Question {current + 1} / {quizQuestions.length}
        </span>
        {selected !== null && (
          <button
            onClick={next}
            style={{
              background: "#7EB8FF",
              color: "#0d1b2a",
              border: "none",
              borderRadius: 8,
              padding: "9px 18px",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {current + 1 < quizQuestions.length ? "Question suivante →" : "Voir mes résultats"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Onglets config ──────────────────────────────────────────────
const TABS = [
  { id: "savoir", label: "À savoir", icon: "📌" },
  { id: "notions", label: "Notions", icon: "📖" },
  { id: "cours", label: "Cours", icon: "🎓" },
  { id: "mecanismes", label: "Mécanismes", icon: "⚙️" },
  { id: "erreurs", label: "Erreurs", icon: "⚠️" },
  { id: "quiz", label: "Quiz", icon: "🧠" },
  { id: "sujets", label: "Sujets", icon: "📝" },
  { id: "methode", label: "Méthode", icon: "🗺️" },
  { id: "memo", label: "Mémo", icon: "📄" },
  { id: "ressources", label: "Ressources", icon: "🔗" },
];

// ─── Page principale ─────────────────────────────────────────────
export default function StructureSocialePage() {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("savoir");

  const bg = "#0d1b2a";
  const gold = "#D4A017";
  const blue = "#7EB8FF";
  const teal = "#5DCAA5";
  const red = "#f87171";
  const purple = "#a78bfa";

  return (
    <div style={{ background: bg, minHeight: "100vh", fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* ── Header ───────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(135deg, #0C2340 0%, #1a1040 60%, #0a2a20 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: isMobile ? "1.5rem 1rem" : "2rem 2rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: 10,
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "0.12em",
            padding: "3px 12px",
            borderRadius: 20,
            background: "rgba(212,160,23,0.15)",
            color: gold,
            border: "1px solid rgba(212,160,23,0.3)",
            marginBottom: 12,
            textTransform: "uppercase",
          }}
        >
          TERMINALE SES · SOCIOLOGIE
        </div>
        <h1
          style={{
            fontSize: isMobile ? 20 : 26,
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            color: "#f1f5f9",
            marginBottom: 8,
            lineHeight: 1.3,
          }}
        >
          Comment est structurée la société française actuelle ?
        </h1>
        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>
          Fiche de révision · Programme Éduscol · Actualisée 2025
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          {["🗂️ PCS & Inégalités", "📈 Évolutions structurelles", "⚖️ Marx & Weber", "👥 Classes sociales", "♀♂ Genre & Intersectionnalité"].map((pill) => (
            <span
              key={pill}
              style={{
                fontSize: 11,
                padding: "3px 10px",
                borderRadius: 20,
                background: "rgba(255,255,255,0.06)",
                color: "#94a3b8",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* ── Tabs ─────────────────────────────────────────────── */}
      {!isMobile && (
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.2)",
            overflowX: "auto",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                minWidth: 80,
                padding: "12px 8px",
                fontSize: 12,
                background: "none",
                border: "none",
                borderBottom: activeTab === tab.id ? `2px solid ${gold}` : "2px solid transparent",
                color: activeTab === tab.id ? gold : "#64748b",
                fontWeight: activeTab === tab.id ? 700 : 400,
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                whiteSpace: "nowrap",
                transition: "color 0.15s",
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Mobile tab select */}
      {isMobile && (
        <div style={{ padding: "12px 1rem", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}>
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              color: "#e2e8f0",
              fontSize: 13,
              padding: "8px 12px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {TABS.map((tab) => (
              <option key={tab.id} value={tab.id} style={{ background: "#0d1b2a" }}>
                {tab.icon} {tab.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* ── Content ──────────────────────────────────────────── */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "1.2rem 1rem" : "1.5rem 2rem" }}>

        {/* ═══ À SAVOIR ═══ */}
        {activeTab === "savoir" && (
          <div>
            <NoteBox type="actu">
              <strong style={{ color: gold }}>🔴 Chiffres clés 2023-2024 (INSEE) :</strong> En 2023, le niveau de vie moyen des 10 % les plus riches est{" "}
              <strong style={{ color: gold }}>7,3 fois</strong> plus élevé que celui des 10 % les plus pauvres — niveau record depuis 30 ans. Le taux de pauvreté atteint{" "}
              <strong style={{ color: gold }}>15,4 %</strong>, son plus haut niveau depuis 1996. L'indice de Gini remonte à{" "}
              <strong style={{ color: gold }}>0,297</strong>, proche du pic de 2011 (0,298).
            </NoteBox>

            <StatGrid
              stats={[
                { num: "7,3×", label: "Rapport de revenus D10/D1 en 2023 (record 30 ans)", color: red },
                { num: "15,4 %", label: "Taux de pauvreté en 2023 — plus haut depuis 1996", color: gold },
                { num: "0,297", label: "Indice de Gini France 2023 — proche du pic historique", color: blue },
              ]}
            />

            <STitle color={gold}>Points clés du programme</STitle>
            <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
              {[
                { num: "Objectif 1", txt: "Savoir définir et distinguer stratification sociale, structure sociale et espace social", color: blue },
                { num: "Objectif 2", txt: "Expliquer les PCS et les 4 grandes évolutions de la structure sociale française depuis 1950 (salarisation, tertiarisation, féminisation, polarisation)", color: teal },
                { num: "Objectif 3", txt: "Comparer les théories de Marx, Weber et Bourdieu sur les classes sociales ; maîtriser les notions de classe en soi / classe pour soi, réalisme / nominalisme", color: gold },
                { num: "Objectif 4", txt: "Argumenter sur la pertinence des classes sociales en mobilisant des données contemporaines (Gilets jaunes, inégalités de patrimoine, intersectionnalité)", color: purple },
              ].map((obj, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 12,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 10,
                    padding: "12px 14px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: obj.color,
                      background: `${obj.color}18`,
                      border: `1px solid ${obj.color}40`,
                      borderRadius: 20,
                      padding: "3px 10px",
                      whiteSpace: "nowrap",
                      alignSelf: "flex-start",
                      flexShrink: 0,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {obj.num}
                  </span>
                  <span style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.6 }}>{obj.txt}</span>
                </div>
              ))}
            </div>

            <STitle color={blue}>Auteurs incontournables du programme</STitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8 }}>
              {[
                { name: "Karl Marx", dates: "1818–1883", concept: "Classes en soi / pour soi · Lutte des classes", color: red },
                { name: "Max Weber", dates: "1864–1920", concept: "Stratification pluridimensionnelle · Groupes de statut", color: purple },
                { name: "Pierre Bourdieu", dates: "1930–2002", concept: "Espace social · Capitaux · Habitus", color: teal },
                { name: "Henri Mendras", dates: "1927–2003", concept: "Moyennisation · La toupie sociale", color: gold },
                { name: "Thomas Piketty", dates: "1971–", concept: "Inégalités de patrimoine · Capital et Idéologie", color: blue },
                { name: "Louis Chauvel", dates: "1967–", concept: "Retour des classes sociales · Distances inter-classes", color: teal },
              ].map((a, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${a.color}30`,
                    borderRadius: 10,
                    padding: 12,
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: a.color, marginBottom: 2 }}>{a.name}</div>
                  <div style={{ fontSize: 10, color: "#64748b", marginBottom: 6 }}>{a.dates}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{a.concept}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ NOTIONS ═══ */}
        {activeTab === "notions" && (
          <div>
            <STitle color={blue}>Notions fondamentales</STitle>
            <DefBox label="Stratification sociale / Structure sociale" color={blue} bg="rgba(126,184,255,0.07)">
              Découpage des sociétés humaines en <strong style={{ color: blue }}>catégories hiérarchisées</strong>, présentant une certaine homogénéité, résultant des inégalités de richesse, de pouvoir, de prestige ou de connaissance (Serge Paugam). Ces deux notions sont synonymes.
            </DefBox>
            <DefBox label="Espace social (Bourdieu)" color={purple} bg="rgba(167,139,250,0.07)">
              Métaphore pour décrire la société comme un <strong style={{ color: purple }}>ensemble de positions distinctes et coexistantes</strong>, définies par des relations de proximité ou d'éloignement. Deux dimensions principales : le <strong style={{ color: purple }}>capital économique</strong> (revenus + patrimoine) et le <strong style={{ color: purple }}>capital culturel</strong> (diplôme, savoirs, savoir-faire).
            </DefBox>
            <DefBox label="PCS — Professions et Catégories Socioprofessionnelles" color={gold} bg="rgba(212,160,23,0.07)">
              Classification de l'INSEE (créée en 1954, révisée en 1982) regroupant les actifs selon des critères d'<strong style={{ color: gold }}>homogénéité sociale</strong> : statut d'emploi (salarié/indépendant), secteur d'activité, niveau hiérarchique et qualification. <br /><br />
              <strong style={{ color: gold }}>Les 8 groupes agrégés :</strong> Agriculteurs · Artisans/Commerçants/Chefs d'entreprise · Cadres et CPIS · Professions intermédiaires · Employés · Ouvriers · Retraités · Autres inactifs.
            </DefBox>
            <DefBox label="Salarisation" color={teal} bg="rgba(93,202,165,0.07)">
              Augmentation de la <strong style={{ color: teal }}>part des emplois salariés</strong> parmi l'ensemble des emplois, au détriment du travail indépendant. La part des indépendants passe de 27 % (années 1960) à 11 % (2014). Rebond depuis 2015 avec les plateformes numériques (12 % en 2016).
            </DefBox>
            <DefBox label="Tertiarisation" color={blue} bg="rgba(126,184,255,0.07)">
              Progression de la part des <strong style={{ color: blue }}>emplois dans le secteur des services</strong> au détriment de l'industrie et de l'agriculture. En 1962, le tertiaire représentait 40 % de l'emploi ; en 2016, plus des trois quarts.
            </DefBox>
            <DefBox label="Polarisation des emplois" color={red} bg="rgba(248,113,113,0.07)">
              Hausse simultanée des emplois très qualifiés ET des emplois peu qualifiés de service, <strong style={{ color: red }}>au détriment des emplois de qualification intermédiaire</strong>, sous l'effet de l'automatisation. La structure des emplois « se creuse » au milieu.
            </DefBox>
            <DefBox label="Classe en soi / Classe pour soi (Marx)" color={red} bg="rgba(248,113,113,0.07)">
              <strong style={{ color: red }}>Classe en soi :</strong> critère objectif — similitude de situation dans les rapports de production (vision réaliste).<br />
              <strong style={{ color: red }}>Classe pour soi :</strong> classe en soi + conscience de classe + lutte collective (grèves, syndicats, partis). La lutte des classes est le moteur de l'histoire.
            </DefBox>
            <DefBox label="Réalisme / Nominalisme" color={purple} bg="rgba(167,139,250,0.07)">
              <strong style={{ color: purple }}>Réaliste (Marx) :</strong> la classe sociale existe objectivement dans la réalité, indépendamment de la conscience de ses membres.<br />
              <strong style={{ color: purple }}>Nominaliste (Weber) :</strong> les classes sont des catégories construites par l'analyste. Elles n'ont pas forcément de conscience d'elles-mêmes.
            </DefBox>
            <DefBox label="Moyennisation (Mendras, 1988)" color={gold} bg="rgba(212,160,23,0.07)">
              Thèse selon laquelle les Trente Glorieuses ont engendré une vaste classe moyenne. Mendras représente la société en <strong style={{ color: gold }}>toupie</strong> (large au centre) plutôt qu'en sablier (large aux extrêmes). Thèse aujourd'hui fortement contestée (remontée des inégalités depuis les années 1990).
            </DefBox>
            <DefBox label="Intersectionnalité (Bereni)" color={teal} bg="rgba(93,202,165,0.07)">
              Concept désignant le fait que les rapports de genre, de classe, d'âge et d'origine sont <strong style={{ color: teal }}>imbriqués et se renforcent mutuellement</strong> pour produire des inégalités cumulatives. Être femme ET appartenir à une classe populaire constitue une « double peine ».
            </DefBox>
          </div>
        )}

        {/* ═══ COURS ═══ */}
        {activeTab === "cours" && (
          <div>
            <STitle color={blue}>1. Les facteurs de la structure sociale</STitle>

            <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.7, marginBottom: 14 }}>
              La société française est structurée selon plusieurs axes d'inégalités qui se croisent et s'articulent. L'axe socio-économique reste central (PCS, diplôme, revenus, patrimoine), mais le genre, l'âge, la composition du ménage et le lieu de résidence jouent également un rôle structurant.
            </p>

            <STitle color={gold}>Le diplôme, vecteur clé de la position sociale</STitle>
            <CardGrid cards={[
              { badge: "Diplôme ↗ PCS", title: "Corrélation positive", text: "Plus le niveau de diplôme est élevé, plus la PCS atteinte est élevée. En 1980, 1 travailleur sur 2 était sans diplôme. En 2014, 8 sur 10 sont diplômés.", color: blue },
              { badge: "Cadres vs Ouvriers", title: "Taux de chômage révélateur", text: "En 2019, le taux de chômage était de 3,9 % chez les cadres contre 12,4 % chez les ouvriers. La PCS reste un puissant déterminant du risque de chômage.", color: gold },
              { badge: "Promotions internes", title: "Ascension limitée", text: "Les promotions internes (ouvrier → cadre) sont rares en France. Sans diplôme, il est très difficile d'accéder à une PCS élevée.", color: red },
            ]} />

            <STitle color={teal}>Les autres facteurs de structuration</STitle>
            <Accordion items={[
              {
                title: "♀♂ Le sexe et le genre",
                color: purple,
                content: (
                  <div>
                    <strong style={{ color: "#e2e8f0" }}>Ségrégation verticale et horizontale :</strong> Les femmes occupent moins souvent des postes de cadres (16,8 % vs 21,6 % des hommes). Elles sont plus représentées dans les métiers dits « féminins » (soin, éducation, commerce) moins rémunérés.
                    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 6, padding: "8px 10px", marginTop: 10, borderLeft: "3px solid rgba(255,255,255,0.1)" }}>
                      <strong style={{ color: "#e2e8f0" }}>Écarts salariaux 2024 (INSEE) :</strong>
                      <ul style={{ margin: "8px 0 0 20px", fontSize: 12, color: "#94a3b8" }}>
                        <li>Tous temps de travail confondus : les femmes gagnent <strong style={{ color: red }}>21,8 % de moins</strong></li>
                        <li>À temps identique (EQTP) : écart de <strong style={{ color: gold }}>14 %</strong></li>
                        <li>À même poste chez le même employeur : <strong style={{ color: teal }}>3,6 %</strong> (discrimination directe)</li>
                        <li>À ce rythme, l'égalité ne serait atteinte que dans <strong style={{ color: red }}>54 ans</strong></li>
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                title: "🎂 La position dans le cycle de vie (âge)",
                color: gold,
                content: (
                  <div>
                    L'âge n'est pas qu'une donnée biologique : c'est un <strong style={{ color: "#e2e8f0" }}>fait social</strong>. <strong style={{ color: "#e2e8f0" }}>Avant 25 ans :</strong> forte proportion d'ouvriers non qualifiés, d'intérimaires, de CDD. <strong style={{ color: "#e2e8f0" }}>25–49 ans :</strong> stabilisation professionnelle. <strong style={{ color: "#e2e8f0" }}>Après 50 ans :</strong> risque de chômage long pour les seniors. En 2019, les intérimaires sont majoritairement de jeunes hommes occupant des postes d'ouvriers non qualifiés.
                  </div>
                ),
              },
              {
                title: "🏠 La composition du ménage",
                color: teal,
                content: (
                  <div>
                    À revenu égal, un couple sans enfant a un niveau de vie plus élevé qu'un couple avec enfants. Les <strong style={{ color: "#e2e8f0" }}>familles monoparentales</strong> (majoritairement dirigées par des femmes : 11,8 % vs 2,7 % des hommes en 2019) sont particulièrement exposées au risque de pauvreté.
                  </div>
                ),
              },
              {
                title: "📍 Le lieu de résidence",
                color: blue,
                content: (
                  <div>
                    Le lieu de résidence est à la fois un <strong style={{ color: "#e2e8f0" }}>reflet</strong> de la position sociale et un <strong style={{ color: "#e2e8f0" }}>facteur</strong> de différenciation. Les espaces ont une valeur économique et symbolique inégale. Dans les campagnes en déclin (B. Coquard, 2019), la bonne réputation locale devient une ressource rare et précieuse, tandis qu'une mauvaise adresse peut stigmatiser.
                  </div>
                ),
              },
            ]} />

            <STitle color={purple}>2. Les théories des classes sociales</STitle>

            <DefBox label="Karl Marx (1818-1883) — Vision réaliste" color={red} bg="rgba(248,113,113,0.07)">
              Les classes sociales sont définies par la <strong style={{ color: red }}>place dans les rapports de production</strong>. Deux grandes classes s'opposent : les <strong style={{ color: red }}>capitalistes</strong> (possèdent les moyens de production → profits) et les <strong style={{ color: red }}>prolétaires</strong> (vendent leur force de travail → salaires). Rapport d'<strong style={{ color: red }}>exploitation</strong> : les capitalistes s'approprient la plus-value créée par le travail des prolétaires.
            </DefBox>

            <DefBox label="Max Weber (1864-1920) — Vision nominaliste pluridimensionnelle" color={purple} bg="rgba(167,139,250,0.07)">
              Weber identifie <strong style={{ color: purple }}>3 ordres</strong> distincts et non forcément superposés :<br />
              · <strong style={{ color: purple }}>Ordre économique</strong> : classes sociales (richesse = revenus + patrimoine)<br />
              · <strong style={{ color: purple }}>Ordre social</strong> : groupes de statut (prestige, honneur)<br />
              · <strong style={{ color: purple }}>Ordre politique</strong> : partis (pouvoir politique)<br />
              Un artiste peut avoir du prestige sans richesse ; un politicien peut avoir du pouvoir sans fortune.
            </DefBox>

            <DefBox label="Pierre Bourdieu (1930-2002) — Capitaux et espace social" color={teal} bg="rgba(93,202,165,0.07)">
              Bourdieu modélise la société comme un espace à deux dimensions :<br />
              · <strong style={{ color: teal }}>Capital économique</strong> : revenus et patrimoine<br />
              · <strong style={{ color: teal }}>Capital culturel</strong> : diplômes, compétences, savoirs (incorporé, objectivé, institutionnalisé)<br />
              · <strong style={{ color: teal }}>Capital social</strong> : réseau de relations mobilisables<br />
              La bourgeoisie cumule ces trois formes de capital héritées sur plusieurs générations et constitue une classe <em>en soi</em> ET une classe <em>pour soi</em>.
            </DefBox>

            <STitle color={gold}>3. Le débat sur la pertinence des classes sociales</STitle>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div style={{ background: "rgba(93,202,165,0.07)", border: "1px solid rgba(93,202,165,0.2)", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: teal, marginBottom: 10 }}>✅ Arguments pour la persistance</div>
                <ul style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.7, paddingLeft: 16 }}>
                  <li>Rapport D10/D1 = 7,3 en 2023 (record 30 ans)</li>
                  <li>Les 10 % les plus riches détiennent ~45 % du patrimoine total</li>
                  <li>Pinçon-Charlot : la grande bourgeoisie forme une <em>classe pour soi</em></li>
                  <li>Piketty : les inégalités retrouvent des niveaux de la Belle Époque</li>
                  <li>Gilets Jaunes (2018) : retour de la conscience de classe (Peugny)</li>
                </ul>
              </div>
              <div style={{ background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 10, padding: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: red, marginBottom: 10 }}>⚠️ Arguments pour un affaiblissement</div>
                <ul style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.7, paddingLeft: 16 }}>
                  <li>Thèse de la moyennisation (Mendras, 1988)</li>
                  <li>Diffusion de la propriété et homogénéisation de la consommation</li>
                  <li>Massification scolaire et « culture moyenne »</li>
                  <li>Déclin du PCF et des syndicats depuis les années 1980</li>
                  <li>Individualisation du travail → affaiblissement des collectifs</li>
                </ul>
              </div>
            </div>

            <NoteBox type="actu">
              <strong style={{ color: gold }}>🟡 Les Gilets Jaunes (2018–2020) :</strong> Ce mouvement illustre le retour des classes sociales. Fonctionnaires de catégorie C, aides-soignantes, techniciens, employés, caissières partagent un sentiment d'avenir bouché et de mépris de classe. Camille Peugny constate : « les classes sociales redeviennent visibles, ce qui veut dire qu'elles n'avaient jamais disparu. » On retrouve les 3 dimensions marxistes : similitude de situation (<em>classe en soi</em>), conscience de classe, mobilisation (<em>classe pour soi</em>).
            </NoteBox>
          </div>
        )}

        {/* ═══ MÉCANISMES ═══ */}
        {activeTab === "mecanismes" && (
          <div>
            <STitle color={blue}>Mesurer les inégalités économiques</STitle>
            <MecaBox
              title="Les outils de mesure des inégalités"
              steps={[
                { text: <><strong style={{ color: blue }}>Les quantiles :</strong> déciles (tranches de 10 %), quintiles (20 %), quartiles (25 %), centiles (1 %). Le 1er décile (D1) = seuil en dessous duquel se situent les 10 % les plus pauvres. Le 9e décile (D9) = seuil au-dessus duquel se situent les 10 % les plus riches.</> },
                { text: <><strong style={{ color: gold }}>Rapport interdécile D9/D1 :</strong> mesure l'écart entre riches et pauvres. En 2023, le rapport entre revenus moyens des D10 et D1 atteint 7,3 (record !). Lecture : « Le niveau de vie moyen des 10 % les plus aisés est 7,3 fois plus élevé que celui des 10 % les plus modestes. »</> },
                { text: <><strong style={{ color: red }}>Courbe de Lorenz :</strong> représentation graphique de la concentration des revenus. Plus la courbe s'écarte de la diagonale d'équi-répartition, plus les inégalités sont fortes. En France, les inégalités de <strong>patrimoine</strong> sont bien plus grandes que les inégalités de revenus.</> },
                { text: <><strong style={{ color: teal }}>Indice de Gini</strong> = surface A / surface (A+B) dans la courbe de Lorenz. Varie entre 0 (égalité parfaite) et 1 (inégalité totale). En 2023 : Gini = 0,297 en France — proche du pic historique. Plus élevé à Hong Kong (0,539). Plus faible dans les pays nordiques (≈ 0,25).</> },
              ]}
            />

            <STitle color={gold}>De la « classe en soi » à la « classe pour soi » chez Marx</STitle>
            <MecaBox
              title="Le passage à la conscience et à la lutte des classes"
              steps={[
                { text: <><strong style={{ color: blue }}>Classe en soi :</strong> critère objectif — similitude de situation dans les rapports de production (même source de revenu, même rapport aux moyens de production). C'est une approche réaliste : la classe existe indépendamment de la conscience qu'en ont ses membres.</> },
                { text: <><strong style={{ color: gold }}>Conscience de classe :</strong> prise de conscience de sa situation commune et de ses intérêts distincts de l'autre classe. Sans conscience, pas de mobilisation collective possible.</> },
                { text: <><strong style={{ color: teal }}>Classe pour soi :</strong> classe en soi + conscience de classe + <strong>lutte des classes</strong> (action collective : grèves, syndicats, partis ouvriers). Pour Marx, la lutte des classes est le moteur de l'histoire.</> },
              ]}
            />

            <STitle color={purple}>Pourquoi les emplois moyennement qualifiés disparaissent-ils ?</STitle>
            <MecaBox
              title="Le mécanisme de polarisation des emplois"
              steps={[
                { text: <><strong style={{ color: blue }}>Progrès technique et automatisation :</strong> les robots et logiciels remplacent les tâches répétitives et codifiables (ligne d'assemblage, comptabilité de base…), qui sont précisément les emplois de qualification intermédiaire.</> },
                { text: <><strong style={{ color: gold }}>Montée des emplois très qualifiés :</strong> le progrès technique nécessite des travailleurs capables d'utiliser des outils complexes → hausse de la demande de cadres, ingénieurs, professions intellectuelles supérieures.</> },
                { text: <><strong style={{ color: red }}>Montée des emplois peu qualifiés de service :</strong> l'enrichissement d'une partie de la population crée de la demande pour des services aux personnes (nounous, aides à domicile, livreurs, caissiers). Ces emplois sont non délocalisables et résistants à l'automatisation car basés sur la relation humaine.</> },
                { text: <><strong style={{ color: teal }}>Résultat — la polarisation :</strong> la structure des emplois se « creuse » au milieu → augmentation des cadres ET des emplois précaires peu qualifiés, stagnation des emplois intermédiaires. Cela renforce les inégalités inter-classes.</> },
              ]}
            />

            <STitle color={teal}>Évolution des PCS depuis 1950</STitle>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 16 }}>
                <thead>
                  <tr>
                    {["PCS", "Tendance", "Cause(s) principale(s)"].map((h) => (
                      <th key={h} style={{ background: "rgba(255,255,255,0.04)", padding: "9px 12px", textAlign: "left", fontWeight: 600, color: "#64748b", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Agriculteurs", "↘ forte baisse", "Salarisation + Tertiarisation + concentration des exploitations"],
                    ["Artisans, commerçants", "↘ baisse", "Salarisation (grande distribution) + concurrence"],
                    ["Cadres & CPIS", "↗ forte hausse", "Tertiarisation + élévation du niveau de qualification + salarisation"],
                    ["Professions intermédiaires", "↗ hausse", "Tertiarisation + élévation du niveau de qualification"],
                    ["Employés", "↗ hausse", "Tertiarisation + féminisation de l'emploi"],
                    ["Ouvriers", "↘ baisse", "Tertiarisation + automatisation + délocalisation"],
                  ].map(([pcs, tend, cause], i) => (
                    <tr key={i}>
                      <td style={{ padding: "9px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: blue, fontWeight: 600 }}>{pcs}</td>
                      <td style={{ padding: "9px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: tend.includes("↗") ? teal : red }}>{tend}</td>
                      <td style={{ padding: "9px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#94a3b8" }}>{cause}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <NoteBox type="actu">
              <strong style={{ color: gold }}>🔴 Actualité 2025 — L'ubérisation :</strong> La montée du travail indépendant via les plateformes (Uber, Deliveroo…) questionne les catégories statistiques. Ces travailleurs sont souvent comptés comme « indépendants » mais vivent dans des conditions proches du salariat précaire, sans protection sociale robuste. Robert Castel parlerait de <strong>« précariat »</strong> — un groupe soumis à une forte individualisation du travail et à une grande incertitude.
            </NoteBox>
          </div>
        )}

        {/* ═══ ERREURS ═══ */}
        {activeTab === "erreurs" && (
          <div>
            <STitle color={red}>Erreurs classiques à éviter au bac</STitle>

            {[
              {
                erreur: "Confondre « réaliste » et « nominaliste »",
                correct: "Réaliste (Marx) = la classe existe objectivement dans la réalité. Nominaliste (Weber) = les classes sont des catégories construites par l'analyste. Mémo : Marx est RÉAListe car il croit en une RÉALité des classes.",
              },
              {
                erreur: "Dire que Marx n'a pas conscience des inégalités multiples",
                correct: "Marx reconnaît la complexité mais les subordonne toutes à la lutte des classes économiques. Weber critique précisément ce réductionnisme économique en ajoutant prestige et pouvoir.",
              },
              {
                erreur: "Confondre D9/D1 et le rapport entre revenus moyens",
                correct: "D9/D1 = rapport entre le niveau de vie minimum des 10 % les plus aisés et le niveau de vie maximum des 10 % les plus pauvres. En 2023 ce rapport = 3,4. Le rapport entre REVENUS MOYENS des déciles extrêmes = 7,3 (chiffre souvent cité).",
              },
              {
                erreur: "Confondre « salaire à temps égal » et « tous temps confondus »",
                correct: "L'écart salarial femmes-hommes est de 21,8 % tous temps confondus (inclut le temps partiel) et de 14 % à temps de travail identique (EQTP). Les deux mesures sont utiles et complémentaires. Ne pas les mélanger dans une copie.",
              },
              {
                erreur: "Présenter la moyennisation de Mendras comme toujours valide",
                correct: "La thèse de Mendras (1988) est aujourd'hui très contestée. Depuis les années 1990, les inégalités économiques ont recommencé à croître (Chauvel, Piketty). On ne peut pas utiliser cette thèse sans la nuancer ou la contester.",
              },
              {
                erreur: "Oublier la distinction intra-classes / inter-classes dans le débat sur les classes",
                correct: "Pour qu'une catégorie ait une consistance sociologique, il faut : (1) des distances INTER-classes suffisantes (les classes s'éloignent les unes des autres) ET (2) des distances INTRA-classes suffisamment faibles (homogénéité interne). Noiriel parle de « classe ouvrière en éclats » pour l'hétérogénéité interne.",
              },
              {
                erreur: "Penser que l'intersectionnalité contredit l'analyse de classe",
                correct: "Au contraire, l'intersectionnalité renforce l'analyse de classe en montrant que les inégalités de genre, d'origine et d'âge se cumulent avec les inégalités de classe. Ce n'est pas parce qu'il existe de multiples facteurs que la classe perd sa pertinence.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 12,
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <div style={{ background: "rgba(248,113,113,0.08)", padding: "10px 14px", borderBottom: "1px solid rgba(248,113,113,0.15)" }}>
                  <span style={{ fontSize: 11, color: red, fontWeight: 700, marginRight: 8 }}>❌ ERREUR {i + 1}</span>
                  <span style={{ fontSize: 13, color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif" }}>{item.erreur}</span>
                </div>
                <div style={{ padding: "10px 14px", background: "rgba(93,202,165,0.05)" }}>
                  <span style={{ fontSize: 11, color: teal, fontWeight: 700, marginRight: 8 }}>✅ CORRECT :</span>
                  <span style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6, fontFamily: "'Space Grotesk', sans-serif" }}>{item.correct}</span>
                </div>
              </div>
            ))}

            <STitle color={gold}>Point méthode — Lire un décile correctement</STitle>
            <NoteBox type="info">
              <strong style={{ color: blue }}>⚠️ Modèle de phrase :</strong><br />
              « En France, en 2023, les 10 % les plus aisés ont un niveau de vie <em>au moins</em> 3,4 fois plus élevé que le niveau de vie maximum des 10 % les plus modestes (rapport interdécile D9/D1). »<br /><br />
              <strong style={{ color: blue }}>Les 3 données à connaître :</strong><br />
              · D9/D1 ≈ 3,4 (rapport entre seuils)<br />
              · Rapport revenus moyens D10/D1 = 7,3 (rapport entre moyennes)<br />
              · Inégalités de patrimoine : les 10 % les plus riches détiennent ~50 % du patrimoine total
            </NoteBox>
          </div>
        )}

        {/* ═══ QUIZ ═══ */}
        {activeTab === "quiz" && <Quiz />}

        {/* ═══ SUJETS ═══ */}
        {activeTab === "sujets" && (
          <div>
            <STitle color={gold}>Sujets bac tombés et types de sujets</STitle>
            <NoteBox type="actu">
              <strong style={{ color: gold }}>⚡ Ce chapitre est très souvent mobilisé en dissertation</strong> dans les sujets combinant structure sociale + mobilité sociale ou structure sociale + inégalités. Il peut aussi apparaître en EC2/EC3.
            </NoteBox>

            {[
              {
                type: "Dissertation",
                sujet: "Les classes sociales sont-elles encore pertinentes pour analyser la société française actuelle ?",
                plan: "I. Les classes sociales conservent une réalité structurante (inégalités économiques persistantes, grande bourgeoisie comme classe pour soi, Gilets Jaunes) / II. Des transformations qui nuancent leur pertinence (moyennisation, affaiblissement des collectifs ouvriers, individualisation) / III. Des outils complémentaires nécessaires (intersectionnalité, genre, lieu de résidence)",
              },
              {
                type: "Dissertation",
                sujet: "Dans quelle mesure la structure sociale française a-t-elle évolué depuis les années 1950 ?",
                plan: "I. Des mutations structurelles profondes (salarisation, tertiarisation, féminisation, élévation des qualifications) / II. Des inégalités qui persistent et se renouvellent (polarisation des emplois, précariat, inégalités de genre) / III. Le débat sur la moyennisation : de la toupie au sablier ?",
              },
              {
                type: "EC3",
                sujet: "À l'aide de vos connaissances et du dossier documentaire, vous montrerez que les inégalités économiques restent structurantes en France.",
                plan: "Définir structure sociale et inégalités → données D9/D1, Gini, patrimoine → PCS comme révélateur d'inégalités (chômage, espérance de vie) → débat moyennisation vs retour des classes → conclusion nuancée",
              },
              {
                type: "EC2 Calcul",
                sujet: "Calculez et interprétez le rapport interdécile D9/D1 à partir du tableau de données sur les niveaux de vie.",
                plan: "Calcul : D9 ÷ D1 = X / Lecture : « Le niveau de vie plancher des 10 % les plus aisés est X fois plus élevé que le niveau de vie plafond des 10 % les plus modestes » / Interprétation : comparaison dans le temps ou dans l'espace, lien avec les politiques redistributives",
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10,
                  padding: 14,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: s.type === "Dissertation" ? gold : s.type === "EC3" ? teal : blue,
                    background: s.type === "Dissertation" ? "rgba(212,160,23,0.1)" : s.type === "EC3" ? "rgba(93,202,165,0.1)" : "rgba(126,184,255,0.1)",
                    border: `1px solid ${s.type === "Dissertation" ? gold : s.type === "EC3" ? teal : blue}40`,
                    borderRadius: 20,
                    padding: "2px 10px",
                    display: "inline-block",
                    marginBottom: 8,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {s.type}
                </span>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", marginBottom: 8, lineHeight: 1.5, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {s.sujet}
                </div>
                <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, fontFamily: "'Space Grotesk', sans-serif" }}>
                  <strong style={{ color: "#94a3b8" }}>Piste de plan :</strong> {s.plan}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ═══ MÉTHODE ═══ */}
        {activeTab === "methode" && (
          <div>
            <STitle color={teal}>Méthode — Dissertation sur les classes sociales</STitle>
            <MecaBox
              title="Étapes pour réussir une dissertation sur ce chapitre"
              steps={[
                { text: <><strong style={{ color: blue }}>Analyser le sujet :</strong> identifier les mots-clés (classes sociales ? structure sociale ? inégalités ?), le verbe directeur (montrer, discuter, dans quelle mesure), et les limites (France actuelle, depuis 1950…).</> },
                { text: <><strong style={{ color: gold }}>Problématiser :</strong> formuler une tension entre deux réponses plausibles. Ex : « Les classes sociales semblent s'être atténuées (moyennisation), mais les données récentes montrent leur retour en force. »</> },
                { text: <><strong style={{ color: red }}>Construire le plan :</strong> en dissertation de SES, le plan dialectique (thèse / antithèse / synthèse) est souvent attendu. Éviter le plan catalogue sans tension. Chaque partie doit répondre partiellement à la problématique.</> },
                { text: <><strong style={{ color: teal }}>Mobiliser des auteurs :</strong> au moins 3 auteurs différents avec leurs théories (Marx, Weber, Bourdieu minimum). Citer l'ouvrage de référence quand c'est possible (La Distinction, Capital et Idéologie…).</> },
                { text: <><strong style={{ color: purple }}>Utiliser des données chiffrées :</strong> D9/D1, indice de Gini, taux de chômage par PCS, écart salarial femmes-hommes, évolution des PCS depuis 1950. Les données sans lecture ni interprétation ne valent rien.</> },
                { text: <><strong style={{ color: blue }}>Conclure en répondant à la problématique :</strong> résumer les apports de chaque partie, proposer une synthèse nuancée, éventuellement ouvrir sur un enjeu connexe (mobilité sociale, politiques de redistribution).</> },
              ]}
            />

            <STitle color={gold}>Méthode — EC2 : lecture d'un indicateur d'inégalités</STitle>
            <NoteBox type="info">
              <strong style={{ color: blue }}>Structure d'une réponse EC2 parfaite :</strong><br /><br />
              <strong>1. Identifier et définir l'indicateur</strong> (rapport interdécile, indice de Gini, courbe de Lorenz)<br />
              <strong>2. Lire la valeur</strong> avec une phrase-type complète (sujet + verbe + chiffre + unité + date)<br />
              <strong>3. Interpréter</strong> : que nous dit ce chiffre sur la réalité sociale ? (compression des inégalités ? aggravation ?)<br />
              <strong>4. Nuancer si possible</strong> : comparer avec d'autres pays ou d'autres années<br /><br />
              <strong style={{ color: red }}>⚠️ Erreur fréquente :</strong> lire un décile sans unité ni sujet grammatical, ou confondre D9/D1 (rapport entre seuils) et le rapport entre revenus moyens.
            </NoteBox>

            <STitle color={purple}>Schéma de synthèse — L'espace social de Bourdieu</STitle>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "1.2rem", textAlign: "center" }}>
              <div style={{ background: blue, color: "#0d1b2a", borderRadius: 10, padding: "10px 16px", fontWeight: 700, fontSize: 13, maxWidth: 340, margin: "0 auto 12px", fontFamily: "'Space Grotesk', sans-serif" }}>
                CADRES & CPIS — Revenu élevé · Diplôme élevé
              </div>
              <div style={{ fontSize: 18, color: "#64748b", margin: "4px 0" }}>↕ Distance maximale</div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 4, flexWrap: "wrap" }}>
                <div style={{ background: "rgba(212,160,23,0.15)", border: `1px solid ${gold}40`, borderRadius: 8, padding: "8px 12px", fontSize: 12, color: gold, flex: 1, minWidth: 120, fontFamily: "'Space Grotesk', sans-serif" }}>Artisans, agriculteurs<br /><small>Revenu moyen · Diplôme faible</small></div>
                <div style={{ background: "rgba(167,139,250,0.15)", border: `1px solid ${purple}40`, borderRadius: 8, padding: "8px 12px", fontSize: 12, color: purple, flex: 1, minWidth: 120, fontFamily: "'Space Grotesk', sans-serif" }}>Prof. intermédiaires<br /><small>Revenu moyen · Diplôme élevé</small></div>
              </div>
              <div style={{ fontSize: 18, color: "#64748b", margin: "4px 0" }}>↕</div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                <div style={{ background: "rgba(248,113,113,0.15)", border: `1px solid ${red}40`, borderRadius: 8, padding: "8px 12px", fontSize: 12, color: red, flex: 1, minWidth: 120, fontFamily: "'Space Grotesk', sans-serif" }}>OUVRIERS<br /><small>Revenu faible · Diplôme faible</small></div>
                <div style={{ background: "rgba(93,202,165,0.15)", border: `1px solid ${teal}40`, borderRadius: 8, padding: "8px 12px", fontSize: 12, color: teal, flex: 1, minWidth: 120, fontFamily: "'Space Grotesk', sans-serif" }}>EMPLOYÉS<br /><small>Revenu faible · Diplôme moyen</small></div>
              </div>
              <p style={{ fontSize: 11, color: "#64748b", marginTop: 10, fontFamily: "'Space Grotesk', sans-serif" }}>Les PCS les plus proches : ouvriers & employés · Les plus éloignées : cadres ↔ ouvriers/employés</p>
            </div>
          </div>
        )}

        {/* ═══ MÉMO ═══ */}
        {activeTab === "memo" && (
          <div>
            <STitle color={gold}>Mémo synthétique — Structure sociale</STitle>
            <NoteBox type="info">
              <strong style={{ color: blue }}>📄 Mémo PDF</strong> — Ce chapitre ne dispose pas encore d'un mémo PDF téléchargeable. En attendant, retrouve ci-dessous les éléments essentiels à mémoriser avant le bac.
            </NoteBox>

            <STitle color={blue}>Les 4 évolutions depuis 1950 (à retenir absolument)</STitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 16 }}>
              {[
                { num: "1", title: "Salarisation", text: "Indépendants : 27 % → 11 % (2014). Rebond via plateformes (12 % en 2016).", color: blue },
                { num: "2", title: "Tertiarisation", text: "Tertiaire : 40 % (1962) → 75 % (2016). Industrie : 12,4 % en 2017.", color: teal },
                { num: "3", title: "Féminisation", text: "Taux activité femmes : 68,2 % en 2019. 9 femmes sur 10 dans le tertiaire.", color: purple },
                { num: "4", title: "Polarisation", text: "Cadres : 4,7 % (1962) → 17,8 % (2016). + emplois peu qualifiés de service.", color: gold },
              ].map((item) => (
                <div key={item.num} style={{ background: `${item.color}10`, border: `1px solid ${item.color}30`, borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: item.color, fontFamily: "'Syne', sans-serif" }}>{item.num}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0", margin: "4px 0", fontFamily: "'Space Grotesk', sans-serif" }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.5, fontFamily: "'Space Grotesk', sans-serif" }}>{item.text}</div>
                </div>
              ))}
            </div>

            <STitle color={purple}>Comparaison Marx / Weber — Tableau mémo</STitle>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 16 }}>
                <thead>
                  <tr>
                    {["Critère", "Karl Marx", "Max Weber"].map((h) => (
                      <th key={h} style={{ background: "rgba(255,255,255,0.04)", padding: "9px 12px", textAlign: "left", fontWeight: 600, color: "#64748b", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Critère objectif", "Place dans les rapports de production", "Niveau de richesse (revenus + patrimoine)"],
                    ["Nombre de classes", "2 (capitalistes / prolétaires)", "Indéterminé, multiples"],
                    ["Conscience de classe", "Nécessaire (vision réaliste)", "Pas nécessaire (vision nominaliste)"],
                    ["Dimensions de l'inégalité", "Économique (lutte des classes)", "Économique + Prestige + Pouvoir"],
                    ["Moteur de l'histoire", "Lutte des classes", "Pluralité de facteurs"],
                    ["Issue prévisible", "Polarisation → révolution", "Pas de polarisation inévitable"],
                  ].map(([crit, marx, weber], i) => (
                    <tr key={i}>
                      <td style={{ padding: "9px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#94a3b8", fontWeight: 600 }}>{crit}</td>
                      <td style={{ padding: "9px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: red }}>{marx}</td>
                      <td style={{ padding: "9px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)", color: purple }}>{weber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <STitle color={gold}>Chiffres à retenir pour le bac</STitle>
            <StatGrid
              stats={[
                { num: "7,3×", label: "Rapport revenus D10/D1 en France (2023)", color: red },
                { num: "0,297", label: "Indice de Gini France (2023)", color: gold },
                { num: "21,8 %", label: "Écart salarial femmes-hommes tous temps confondus (2024)", color: purple },
                { num: "17,8 %", label: "Part des cadres (CPIS) en 2016 — contre 4,7 % en 1962", color: blue },
                { num: "~50 %", label: "Part du patrimoine détenu par les 10 % les plus riches", color: teal },
                { num: "54 ans", label: "Estimation pour atteindre l'égalité salariale au rythme actuel", color: red },
              ]}
            />
          </div>
        )}

        {/* ═══ RESSOURCES ═══ */}
        {activeTab === "ressources" && (
          <div>
            <STitle color={blue}>Ressources pour aller plus loin</STitle>

            <STitle color={gold}>Auteurs et ouvrages de référence</STitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginBottom: 20 }}>
              {[
                { name: "Karl Marx", dates: "1818–1883", concept: "Classes sociales · Plus-value · Lutte des classes", detail: "Fondateur du matérialisme historique. Distingue classe en soi (critère objectif) de la classe pour soi (conscience + lutte). Vision réaliste.", color: red },
                { name: "Max Weber", dates: "1864–1920", concept: "Stratification pluridimensionnelle", detail: "3 ordres : économique (classes), social (prestige), politique (partis). La conscience de classe n'est pas nécessaire. Vision nominaliste.", color: purple },
                { name: "Pierre Bourdieu", dates: "1930–2002", concept: "La Distinction (1979)", detail: "Espace social à 2 dimensions (capital économique / culturel). Capital social comme réseau mobilisable. Habitus = dispositions incorporées.", color: teal },
                { name: "Henri Mendras", dates: "1927–2003", concept: "La Seconde Révolution française (1988)", detail: "Thèse de la moyennisation : société en toupie. Aujourd'hui contestée par la remontée des inégalités depuis les années 1990.", color: gold },
                { name: "Thomas Piketty", dates: "1971–", concept: "Capital et Idéologie (2019)", detail: "Quand le rendement du capital (r) dépasse la croissance (g), le patrimoine se concentre. Les inégalités retrouvent des niveaux historiques.", color: blue },
                { name: "Louis Chauvel", dates: "1967–", concept: "Retour des classes sociales (2004)", detail: "Les distances inter-classes ont recommencé à croître depuis les années 1990, après la phase de convergence des Trente Glorieuses.", color: teal },
                { name: "Robert Castel", dates: "1933–2013", concept: "Métamorphoses de la question sociale", detail: "Le précariat : groupe soumis à l'individualisation du travail et à l'incertitude. Le statut de salarié comme « propriété sociale ».", color: gold },
                { name: "Camille Peugny", dates: "1977–", concept: "Gilets Jaunes & classes sociales", detail: "Les Gilets Jaunes montrent que les classes sociales n'ont jamais vraiment disparu : similitude de situation + conscience + mobilisation.", color: blue },
                { name: "Pinçon & Pinçon-Charlot", dates: "1942– / 1937–", concept: "Sociologie de la bourgeoisie", detail: "Études ethnographiques de la grande bourgeoisie : entre-soi résidentiel, stratégies matrimoniales, cumul intergénérationnel des capitaux.", color: red },
                { name: "Erving Goffman", dates: "1922–1982", concept: "La compétence sociale de l'œil", detail: "Notre capacité à catégoriser socialement les individus en un coup d'œil (vêtements, langage, posture) est acquise par la socialisation.", color: purple },
              ].map((a, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${a.color}25`, borderRadius: 10, padding: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: a.color, marginBottom: 2, fontFamily: "'Space Grotesk', sans-serif" }}>{a.name}</div>
                  <div style={{ fontSize: 10, color: "#64748b", marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif" }}>{a.dates}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 6, fontFamily: "'Space Grotesk', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>{a.concept}</div>
                  <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5, fontFamily: "'Space Grotesk', sans-serif" }}>{a.detail}</div>
                </div>
              ))}
            </div>

            <STitle color={teal}>Sources statistiques officielles</STitle>
            <div style={{ display: "grid", gap: 8 }}>
              {[
                { org: "INSEE", desc: "Niveaux de vie et inégalités — rapport D9/D1, indice de Gini, taux de pauvreté", url: "https://www.insee.fr/fr/statistiques/serie/001641607" },
                { org: "INSEE", desc: "Emploi selon la PCS — évolution depuis 1962", url: "https://www.insee.fr/fr/statistiques/fichier/2122502/FPORSOC15k_F1_pcs.pdf" },
                { org: "INSEE", desc: "Écarts salariaux femmes-hommes 2024", url: "https://www.insee.fr/fr/statistiques/1854289" },
                { org: "DARES", desc: "Évolution de l'emploi salarié et indépendant", url: "https://dares.travail-emploi.gouv.fr" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 8,
                    padding: "10px 14px",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ fontSize: 10, fontWeight: 700, color: blue, background: "rgba(126,184,255,0.1)", border: "1px solid rgba(126,184,255,0.2)", borderRadius: 6, padding: "2px 8px", flexShrink: 0, fontFamily: "'Space Grotesk', sans-serif" }}>{s.org}</span>
                  <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: "'Space Grotesk', sans-serif" }}>{s.desc}</span>
                  <span style={{ marginLeft: "auto", color: "#64748b", fontSize: 12 }}>→</span>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
