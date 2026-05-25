"use client";

import { useState, useEffect } from "react";

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

// ─── Types ────────────────────────────────────────────────────────────────────
type StepId =
  | "savoir"
  | "notions"
  | "cours"
  | "mecanismes"
  | "erreurs"
  | "quiz"
  | "sujets"
  | "methode"
  | "memo"
  | "ressources";

interface Step {
  id: StepId;
  num: number;
  label: string;
  icon: string;
  color: string; // accent colour for this step
}

// ─── Quiz data ────────────────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  {
    q: "Quelle est la distinction entre « expansion » et « croissance économique » ?",
    opts: [
      "Ce sont deux termes synonymes désignant la hausse du PIB sur une longue période",
      "L'expansion est une hausse durable de la production, la croissance est une hausse à court terme",
      "La croissance est une augmentation soutenue sur longue période ; l'expansion est une hausse conjoncturelle réversible",
      "La croissance concerne uniquement le secteur industriel, l'expansion l'ensemble de l'économie",
    ],
    correct: 2,
    fb: "La croissance économique est une augmentation soutenue sur longue période du PIB en volume. L'expansion désigne une hausse cyclique à court terme, réversible dès le retournement conjoncturel. Le programme Éduscol insiste sur cette distinction fondamentale.",
  },
  {
    q: "Le « résidu de Solow » (PGF) représente :",
    opts: [
      "La part de la croissance expliquée par les seuls facteurs travail et capital",
      "La part de la croissance inexpliquée par les facteurs travail et capital, attribuée à l'efficacité de leur combinaison",
      "Le taux de chômage structurel qui freine la croissance",
      "L'écart entre PIB nominal et PIB en volume",
    ],
    correct: 1,
    fb: "La PGF (Productivité Globale des Facteurs) est le « résidu » de la comptabilité de la croissance : ce que l'on ne peut expliquer par la quantité de travail ni de capital. Solow l'attribue au progrès technique, Abramowitz parlait de « part de notre ignorance ». Pendant les Trente Glorieuses, elle représentait ≈ 2/3 de la croissance en France.",
  },
  {
    q: "La théorie de la croissance endogène se distingue du modèle de Solow par le fait que :",
    opts: [
      "Elle considère le progrès technique comme exogène, tombant du ciel",
      "Elle nie l'importance du capital humain dans la croissance",
      "Elle montre que le progrès technique est produit par le système économique lui-même (R&D, éducation, infrastructures)",
      "Elle préconise une politique d'austérité pour stimuler la croissance",
    ],
    correct: 2,
    fb: "Chez Solow, le progrès technique est exogène : il n'est pas expliqué par le modèle. Les théoriciens de la croissance endogène (Romer 1990, Lucas 1988, Barro 1990) endogénéisent ce moteur : R&D, capital humain, capital public et apprentissage by doing génèrent des externalités positives et des rendements croissants qui auto-entretiennent la croissance.",
  },
  {
    q: "La « destruction créatrice » (Schumpeter) implique que :",
    opts: [
      "L'innovation profite à tous les agents économiques de façon simultanée et équitable",
      "Les innovations majeures arrivent en grappe et détruisent continuellement les activités vieillies tout en créant de nouvelles activités",
      "L'État doit détruire les entreprises inefficaces pour favoriser l'innovation",
      "La concurrence pure et parfaite est le seul modèle favorisant l'innovation",
    ],
    correct: 1,
    fb: "La destruction créatrice est le processus central du capitalisme selon Schumpeter. Les innovations radicales arrivent « en grappe » et bouleversent les structures existantes : elles détruisent les firmes et emplois liés aux anciennes technologies tout en créant de nouvelles activités. L'automobile contre le cheval, le streaming contre les disquaires, l'IA contre certains emplois de bureau : toujours la même mécanique.",
  },
  {
    q: "Pourquoi le brevet est-il essentiel à l'incitation à innover ?",
    opts: [
      "Il permet à l'inventeur de garder son invention secrète indéfiniment",
      "Il offre un monopole permanent sur l'innovation, garantissant des profits illimités",
      "Il octroie un monopole temporaire (20 ans) en échange de la publication de l'invention, récompensant la prise de risque",
      "Il interdit à la concurrence de développer des produits similaires même après expiration",
    ],
    correct: 2,
    fb: "Le brevet accorde un monopole temporaire (généralement 20 ans) à l'innovateur, en échange de la publication de son invention. Ce monopole lui permet de récupérer son investissement en R&D. Après expiration, l'invention tombe dans le domaine public, enrichissant le stock de connaissances collectif. Sans brevet, peu d'entreprises prendraient le risque de financer une R&D coûteuse et incertaine.",
  },
  {
    q: "Quelle est la différence entre soutenabilité forte et soutenabilité faible ?",
    opts: [
      "La soutenabilité forte pense que la croissance peut être illimitée, la soutenabilité faible veut la limiter",
      "La soutenabilité faible défend que le capital naturel peut être remplacé par d'autres formes de capital grâce au progrès technique ; la soutenabilité forte considère le capital naturel comme irremplaçable",
      "Il s'agit de deux mesures différentes du PIB",
      "La soutenabilité forte concerne les pays riches, la soutenabilité faible les pays en développement",
    ],
    correct: 1,
    fb: "La soutenabilité faible (Solow, Hartwick) pense que le capital naturel est substituable par du capital technologique ou humain. La soutenabilité forte (Daly, Georgescu-Roegen) considère le capital naturel (biodiversité, climat) comme largement irremplaçable — il faut le préserver, pas le compenser.",
  },
  {
    q: "Pourquoi le progrès technique peut-il engendrer des inégalités de revenus ?",
    opts: [
      "Il détruit uniquement les emplois qualifiés et valorise les emplois manuels",
      "Il augmente la demande de travail qualifié et substitue le capital au travail peu qualifié, creusant les écarts de salaires",
      "Il a un effet neutre sur la répartition des revenus",
      "Il bénéficie uniquement aux employés et non aux actionnaires",
    ],
    correct: 1,
    fb: "Le progrès technique est biaisé en faveur du travail qualifié (Skill-Biased Technical Change). Les innovations de produit nécessitent des profils qualifiés et augmentent leurs salaires. Les innovations de procédé (robotisation) substituent le capital au travail peu qualifié, détruisant ces emplois. Les « Superstar firms » (Autor et al. 2017) versent en outre une part croissante de leur VA aux actionnaires.",
  },
];

// ─── Step config ──────────────────────────────────────────────────────────────
const STEPS: Step[] = [
  { id: "savoir", num: 1, label: "À savoir pour le bac", icon: "🎯", color: "#D4A017" },
  { id: "notions", num: 2, label: "Notions indispensables", icon: "📐", color: "#7EB8FF" },
  { id: "cours", num: 3, label: "Le cours en 10 min", icon: "⚡", color: "#5DCAA5" },
  { id: "mecanismes", num: 4, label: "Mécanismes à maîtriser", icon: "⚙️", color: "#AFA9EC" },
  { id: "erreurs", num: 5, label: "Erreurs fréquentes", icon: "⚠️", color: "#F0997B" },
  { id: "quiz", num: 6, label: "Quiz", icon: "🧠", color: "#97C459" },
  { id: "sujets", num: 7, label: "Sujets probables", icon: "📋", color: "#D4A017" },
  { id: "methode", num: 8, label: "Méthode appliquée", icon: "✍️", color: "#7EB8FF" },
  { id: "memo", num: 9, label: "Fiche mémo PDF", icon: "📄", color: "#5DCAA5" },
  { id: "ressources", num: 10, label: "Ressources", icon: "🎬", color: "#7EB8FF" },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function DefBox({
  label,
  children,
  color = "teal",
}: {
  label: string;
  children: React.ReactNode;
  color?: "teal" | "amber" | "purple" | "coral" | "blue" | "green";
}) {
  const palettes = {
    teal:   { bg: "#0a2a22", border: "#0F6E56", labelCol: "#5DCAA5" },
    amber:  { bg: "#2a1d09", border: "#EF9F27", labelCol: "#EF9F27" },
    purple: { bg: "#1a1940", border: "#AFA9EC", labelCol: "#AFA9EC" },
    coral:  { bg: "#2a1209", border: "#F0997B", labelCol: "#F0997B" },
    blue:   { bg: "#091e2a", border: "#7EB8FF", labelCol: "#7EB8FF" },
    green:  { bg: "#0d2209", border: "#97C459", labelCol: "#97C459" },
  };
  const p = palettes[color];
  return (
    <div
      style={{
        background: p.bg,
        border: `1px solid ${p.border}`,
        borderRadius: 10,
        padding: "14px 16px",
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: p.labelCol,
          marginBottom: 6,
          textTransform: "uppercase",
          fontFamily: "Space Grotesk, sans-serif",
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 14, color: "#d0cfc8", lineHeight: 1.7, fontFamily: "Space Grotesk, sans-serif" }}>
        {children}
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 14,
        fontWeight: 700,
        color: "#7EB8FF",
        borderLeft: "3px solid #7EB8FF",
        paddingLeft: 10,
        margin: "1.5rem 0 0.75rem",
        fontFamily: "Space Grotesk, sans-serif",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

function StatGrid({ stats }: { stats: { num: string; label: string; color: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: "1rem" }}>
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
          <div style={{ fontSize: 24, fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: 6, fontFamily: "Syne, sans-serif" }}>
            {s.num}
          </div>
          <div style={{ fontSize: 11, color: "#8a8880", lineHeight: 1.4, fontFamily: "Space Grotesk, sans-serif" }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function CardGrid({ cards }: { cards: { badge: string; title: string; text: string; badgeColor: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: "1rem" }}>
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
          <div
            style={{
              display: "inline-block",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.06em",
              padding: "2px 8px",
              borderRadius: 20,
              background: `${c.badgeColor}22`,
              color: c.badgeColor,
              border: `1px solid ${c.badgeColor}44`,
              marginBottom: 8,
              fontFamily: "Space Grotesk, sans-serif",
            }}
          >
            {c.badge}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#e8e6df", marginBottom: 4, fontFamily: "Space Grotesk, sans-serif" }}>
            {c.title}
          </div>
          <div style={{ fontSize: 12, color: "#8a8880", lineHeight: 1.5, fontFamily: "Space Grotesk, sans-serif" }}>
            {c.text}
          </div>
        </div>
      ))}
    </div>
  );
}

function FormulaBox({ formula, note }: { formula: string; note?: string }) {
  return (
    <div
      style={{
        background: "#2a1d09",
        border: "1px solid #EF9F27",
        borderRadius: 10,
        padding: 14,
        textAlign: "center",
        marginBottom: "1rem",
      }}
    >
      <div style={{ fontSize: 15, fontWeight: 700, color: "#EF9F27", fontFamily: "Space Grotesk, sans-serif" }}>
        {formula}
      </div>
      {note && (
        <div style={{ fontSize: 12, color: "#8a8880", marginTop: 5, fontFamily: "Space Grotesk, sans-serif" }}>
          {note}
        </div>
      )}
    </div>
  );
}

function NoteBox({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warn" }) {
  const isWarn = type === "warn";
  return (
    <div
      style={{
        background: isWarn ? "#2a1209" : "#1a1940",
        border: `1px solid ${isWarn ? "#F0997B" : "#AFA9EC"}`,
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 13,
        color: isWarn ? "#F0997B" : "#AFA9EC",
        marginBottom: "1rem",
        lineHeight: 1.6,
        fontFamily: "Space Grotesk, sans-serif",
      }}
    >
      {children}
    </div>
  );
}

function Accordion({ items }: { items: { title: string; content: string; dotColor: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div style={{ marginBottom: "1rem" }}>
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
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              padding: "12px 14px",
              background: open === i ? "rgba(255,255,255,0.06)" : "transparent",
              border: "none",
              color: "#e8e6df",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "Space Grotesk, sans-serif",
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: item.dotColor, flexShrink: 0, display: "inline-block" }} />
            {item.title}
            <span style={{ marginLeft: "auto", color: "#5a5955", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
          </button>
          {open === i && (
            <div style={{ padding: "4px 14px 14px", fontSize: 13, color: "#8a8880", lineHeight: 1.7, fontFamily: "Space Grotesk, sans-serif" }}>
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function AuthorGrid({ authors }: { authors: { name: string; dates: string; concept: string; text: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginBottom: "1rem" }}>
      {authors.map((a, i) => (
        <div
          key={i}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: 14,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700, color: "#7EB8FF", marginBottom: 2, fontFamily: "Space Grotesk, sans-serif" }}>{a.name}</div>
          <div style={{ fontSize: 11, color: "#5a5955", marginBottom: 5, fontFamily: "Space Grotesk, sans-serif" }}>{a.dates}</div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: "#5DCAA5", textTransform: "uppercase", marginBottom: 6, fontFamily: "Space Grotesk, sans-serif" }}>{a.concept}</div>
          <div style={{ fontSize: 12, color: "#8a8880", lineHeight: 1.5, fontFamily: "Space Grotesk, sans-serif" }}>{a.text}</div>
        </div>
      ))}
    </div>
  );
}

// ─── STEP CONTENTS ──────────────────────────────────────────────────────────────

function StepSavoir() {
  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontSize: 14, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: "1rem" }}>
          Ce que le jury attend sur ce chapitre au baccalauréat.
        </div>
      </div>

      <SectionTitle>Les 4 questions essentielles du programme</SectionTitle>
      <CardGrid cards={[
        { badge: "Question 1", title: "Mesurer la croissance", text: "Distinguer expansion et croissance. Maîtriser le PIB en volume. Connaître les limites du PIB et les indicateurs alternatifs (IDH).", badgeColor: "#D4A017" },
        { badge: "Question 2", title: "Les sources de la croissance", text: "Facteurs L et K, PGF (résidu de Solow), croissance endogène (Romer, Lucas, Barro, Arrow). Schéma des gains de productivité.", badgeColor: "#7EB8FF" },
        { badge: "Question 3", title: "Progrès technique & innovation", text: "Distinction invention/innovation. Typologies Schumpeter. Destruction créatrice. Rôle des institutions, brevets, État.", badgeColor: "#5DCAA5" },
        { badge: "Question 4", title: "Défis de la croissance", text: "Inégalités (SBTC, Superstar firms). Limites écologiques (externalités, biens communs). Développement durable, soutenabilité forte/faible.", badgeColor: "#AFA9EC" },
      ]} />

      <SectionTitle>Auteurs & notions à citer impérativement</SectionTitle>
      <div style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.3)", borderRadius: 10, padding: "14px 16px", marginBottom: "1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
          {[
            "Solow (1957) — résidu / PGF",
            "Schumpeter (1942) — destruction créatrice",
            "Romer (1990) — R&D endogène",
            "Lucas (1988) — capital humain",
            "Barro (1990) — capital public",
            "North (1990) — institutions",
            "Brundtland (1987) — développement durable",
            "Autor et al. (2017) — Superstar firms",
            "Maddison (1991) — comptabilité croissance",
            "Aghion & Howitt (1992) — croissance schumpétérienne",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "#d0cfc8" }}>
              <span style={{ color: "#D4A017", flexShrink: 0 }}>→</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      <SectionTitle>Données chiffrées indispensables</SectionTitle>
      <StatGrid stats={[
        { num: "+4,9 %", label: "PGF/an France — Trente Glorieuses (1950–73)", color: "#5DCAA5" },
        { num: "~0,4 %", label: "PGF/an France — 2005–2019 (stagnation)", color: "#F0997B" },
        { num: "40 %", label: "Emplois mondiaux potentiellement affectés par l'IA (FMI, 2024)", color: "#D4A017" },
      ]} />
      <div style={{ fontSize: 11, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", marginBottom: "1rem" }}>
        📊 Sources : Bergeaud, Cette & Lecat (2017) · FMI (2024) · INSEE
      </div>
    </div>
  );
}

function StepNotions() {
  return (
    <div>
      <SectionTitle>Définitions fondamentales</SectionTitle>

      <DefBox label="Croissance économique" color="teal">
        <strong style={{ color: "#5DCAA5" }}>Augmentation soutenue sur une longue période de la production de biens et services</strong> dans un pays. Elle se distingue de l'<strong style={{ color: "#5DCAA5" }}>expansion</strong> (hausse à court terme, réversible). Elle se mesure par le <strong style={{ color: "#5DCAA5" }}>taux de variation du PIB en volume</strong> (PIB en valeur déflaté par un indice des prix).
      </DefBox>

      <DefBox label="PIB — Produit Intérieur Brut" color="amber">
        Somme des <strong style={{ color: "#EF9F27" }}>valeurs ajoutées</strong> créées sur le territoire national sur une période donnée + impôts sur les produits − subventions sur les produits.
        <br /><br />
        <strong style={{ color: "#EF9F27" }}>PIB = somme des VA = somme des revenus = somme des dépenses</strong>
        <br /><br />
        On préfère le PIB <strong style={{ color: "#EF9F27" }}>en volume</strong> (à prix constants) pour mesurer l'augmentation réelle de la production, sans l'effet des prix.
      </DefBox>

      <DefBox label="Valeur ajoutée (VA)" color="purple">
        Richesse créée par une organisation productive.
        <br />
        <strong style={{ color: "#AFA9EC" }}>VA = Chiffre d'affaires − Consommations intermédiaires</strong>
      </DefBox>

      <SectionTitle>L'équilibre macroéconomique</SectionTitle>
      <FormulaBox
        formula="PIB + M = C + I + ΔStock + X"
        note="Ressources = Emplois  |  M = importations · X = exportations · C = consommation · I = investissement"
      />

      <SectionTitle>Ce que le PIB ne mesure pas</SectionTitle>
      <NoteBox type="warn">
        ⚠️ Le PIB n'intègre pas le <strong>travail domestique</strong>, ne prend pas en compte les <strong>dégradations environnementales</strong>, ni l'utilité sociale des services. Une catastrophe peut <strong>augmenter</strong> le PIB (réparations). C'est une mesure de production, <strong>pas de bien-être</strong>.
      </NoteBox>
      <NoteBox>
        💡 <strong>Indicateurs alternatifs :</strong> l'IDH (PNUD) intègre espérance de vie, éducation et revenu. L'OCDE propose le « Vivre mieux ». En France, la loi Sas-Duron (2015) oblige le rapport budgétaire à intégrer des indicateurs de bien-être et de soutenabilité.
      </NoteBox>

      <SectionTitle>Croissance extensive vs intensive</SectionTitle>
      <CardGrid cards={[
        {
          badge: "Croissance extensive",
          title: "Augmentation des facteurs",
          text: "Hausse quantitative de L et K. PGF peu active. Ex : URSS années 1950 — mobilisation massive de main-d'œuvre. Ne dure que le temps de l'accroissement des facteurs.",
          badgeColor: "#EF9F27",
        },
        {
          badge: "Croissance intensive",
          title: "Efficacité des facteurs",
          text: "Gains de productivité, PGF. Production par tête en hausse. Ex : France des Trente Glorieuses (1945–1973) — la PGF contribuait à environ 2/3 de la croissance.",
          badgeColor: "#5DCAA5",
        },
      ]} />

      <SectionTitle>Le développement : une notion plus large</SectionTitle>
      <DefBox label="Développement" color="green">
        Ensemble de <strong style={{ color: "#97C459" }}>transformations économiques, sociales, culturelles, politiques et techniques</strong> qui accompagnent la croissance et en sont parfois la condition. La croissance finance le développement, qui crée les conditions d'une croissance future (cercle vertueux). <strong style={{ color: "#97C459" }}>La croissance n'existe pas hors du développement.</strong>
      </DefBox>
    </div>
  );
}

function StepCours() {
  return (
    <div>
      <SectionTitle>1. Les deux sources classiques de croissance</SectionTitle>
      <CardGrid cards={[
        { badge: "Facteur Travail (L)", title: "La main-d'œuvre", text: "Nombre d'actifs × heures travaillées. Qualification, baisse du chômage, hausse de la population active augmentent la contribution du travail à la croissance.", badgeColor: "#5DCAA5" },
        { badge: "Facteur Capital (K)", title: "Biens de production durables", text: "Machines, équipements, bâtiments. Investissement de capacité (nouvelle usine) ou de productivité (robotisation).", badgeColor: "#EF9F27" },
        { badge: "PGF — Résidu de Solow", title: "Productivité Globale des Facteurs", text: "Part inexpliquée par L et K seuls. Reflète l'efficacité de leur combinaison = progrès technique + organisation + formation. « Part de notre ignorance » (Abramowitz).", badgeColor: "#AFA9EC" },
      ]} />

      <FormulaBox
        formula="Croissance du PIB = contribution de L + contribution de K + PGF (résidu)"
        note="La PGF représentait ≈ 2/3 de la croissance pendant les Trente Glorieuses en France"
      />

      <SectionTitle>2. Le schéma des gains de productivité</SectionTitle>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "1.2rem", marginBottom: "1rem" }}>
        {[
          { label: "📈 Gains de productivité", color: "#5DCAA5", items: [] },
          { label: "↓ Baisse des coûts unitaires", color: "#8a8880", items: [] },
          { label: "", color: "", items: ["Hausse des profits", "Hausse des salaires", "Baisse des prix"] },
          { label: "", color: "", items: ["Hausse des recettes de l'État", "Hausse du pouvoir d'achat", "Hausse de la compétitivité"] },
          { label: "", color: "", items: ["Hausse de l'investissement", "Hausse de la consommation", "Hausse des exportations"] },
        ].map((row, i) =>
          row.items.length > 0 ? (
            <div key={i} style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 6, flexWrap: "wrap" }}>
              {row.items.map((item, j) => (
                <div key={j} style={{ flex: 1, minWidth: 90, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(126,184,255,0.2)", borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 600, color: "#7EB8FF", textAlign: "center", fontFamily: "Space Grotesk, sans-serif" }}>
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <div key={i} style={{ textAlign: "center", fontSize: 13, color: row.color, fontWeight: row.label.startsWith("📈") ? 700 : 400, marginBottom: 6, fontFamily: "Space Grotesk, sans-serif" }}>
              {row.label}
            </div>
          )
        )}
        <div style={{ textAlign: "center", background: "#0F6E56", color: "#fff", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, fontFamily: "Space Grotesk, sans-serif" }}>
          ↑ Hausse de la demande globale → Augmentation de la production
        </div>
      </div>

      <SectionTitle>3. La croissance endogène</SectionTitle>
      <DefBox label="Théorie de la croissance endogène (années 1980–90)" color="blue">
        Contrairement à Solow (progrès technique <strong style={{ color: "#7EB8FF" }}>exogène</strong>), Romer, Lucas, Barro envisagent le progrès technique comme <strong style={{ color: "#7EB8FF" }}>résultat ET cause</strong> de la croissance. Quatre moteurs génèrent des <strong style={{ color: "#7EB8FF" }}>externalités positives</strong> et des <strong style={{ color: "#7EB8FF" }}>rendements croissants</strong>.
      </DefBox>
      <CardGrid cards={[
        { badge: "Capital humain — Lucas 1988", title: "Éducation & formation", text: "Externalités positives : les travailleurs qualifiés augmentent aussi la productivité de ceux qui les entourent.", badgeColor: "#5DCAA5" },
        { badge: "Recherche & Innovation — Romer 1990", title: "R&D", text: "Les idées sont non-rivales : leur diffusion génère des externalités positives pour toute l'économie.", badgeColor: "#EF9F27" },
        { badge: "Capital public — Barro 1990", title: "Infrastructures", text: "Routes, réseaux numériques, hôpitaux. Externalités positives : la fibre optique booste la productivité des entreprises.", badgeColor: "#AFA9EC" },
        { badge: "Apprentissage — Arrow 1962", title: "Learning by doing", text: "La productivité s'améliore avec l'expérience accumulée. Chaque unité produite génère de l'apprentissage.", badgeColor: "#97C459" },
      ]} />

      <NoteBox>
        💡 <strong>La croissance est cumulative :</strong> les pays « bien partis » investissent davantage en R&D et formation, générant plus d'innovations, plus de croissance, plus de ressources pour investir… Les écarts entre pays tendent à se creuser.
      </NoteBox>
    </div>
  );
}

function StepMecanismes() {
  return (
    <div>
      <SectionTitle>Mécanisme 1 — Destruction créatrice (Schumpeter)</SectionTitle>
      <DefBox label="Destruction créatrice (Schumpeter, 1942)" color="amber">
        Processus inhérent au capitalisme par lequel les <strong style={{ color: "#EF9F27" }}>innovations majeures</strong> arrivent « en grappe », révolutionnant la structure économique : elles <strong style={{ color: "#EF9F27" }}>détruisent continuellement les activités vieillies</strong> et <strong style={{ color: "#EF9F27" }}>créent continuellement des activités neuves</strong>. Schumpeter appelle cela la « respiration du capitalisme ».
      </DefBox>

      <SectionTitle>Exemples contemporains</SectionTitle>
      <Accordion items={[
        {
          title: "🚗 Automobile : du thermique à l'électrique",
          dotColor: "#F0997B",
          content: "L'essor des <strong>voitures électriques</strong> (Tesla, Volkswagen ID., Renault Mégane E-Tech) détruit progressivement les emplois liés aux moteurs thermiques. En France, <strong>100 000 emplois</strong> sont estimés menacés dans la filière auto d'ici 2035. Mais de nouveaux emplois émergent : ingénieurs batteries, techniciens bornes, experts logiciels embarqués.<br><br>📌 Renault a transformé son usine de Douai en «ElectriCity», la plus grande usine de VE d'Europe du Nord (2022).",
        },
        {
          title: "🤖 Intelligence artificielle et emploi",
          dotColor: "#EF9F27",
          content: "Les <strong>modèles d'IA générative</strong> (ChatGPT, Gemini, Mistral) menacent des emplois de qualification intermédiaire : rédacteurs, traducteurs, assistants juridiques. Selon le FMI (2024), <strong>40 % des emplois mondiaux</strong> pourraient être affectés. Mais de nouveaux métiers apparaissent : prompt engineer, AI trainer, spécialiste en éthique de l'IA.<br><br>📌 Goldman Sachs (2023) estimait que l'IA pourrait remplacer l'équivalent de 300 millions d'emplois à temps plein, tout en créant une hausse du PIB mondial de +7 %.",
        },
        {
          title: "📱 Streaming vs commerce physique",
          dotColor: "#5DCAA5",
          content: "Netflix, Spotify, Amazon ont détruit les modèles économiques des <strong>vidéoclubs</strong> (Blockbuster faillite 2010), des <strong>disquaires</strong> et de nombreux commerces physiques. En France, la fermeture de 60 % des librairies indépendantes entre 2000 et 2020 illustre cette dynamique.<br><br>📌 Le luddisme (XIXe s.) comme les taxis contre Uber illustrent les résistances historiques à la destruction créatrice.",
        },
      ]} />

      <SectionTitle>Mécanisme 2 — Institutions et innovation</SectionTitle>
      <DefBox label="Institutions (North, 1990)" color="blue">
        Ensemble de <strong style={{ color: "#7EB8FF" }}>règles formelles et informelles</strong> et de moyens pour les faire respecter. Elles encadrent les interactions et créent un environnement <strong style={{ color: "#7EB8FF" }}>stable et prévisible</strong>, condition nécessaire à l'investissement et à l'innovation.
      </DefBox>
      <CardGrid cards={[
        { badge: "Droits de propriété", title: "Sécurité juridique", text: "Garantissent que le propriétaire d'un bien ou d'une idée ne sera pas spolié. Condition de l'échange marchand.", badgeColor: "#5DCAA5" },
        { badge: "Le brevet", title: "Incitation à innover", text: "Monopole temporaire (20 ans). Récompense la prise de risque. Oblige à rendre l'invention publique → enrichit le stock de connaissances collectif.", badgeColor: "#EF9F27" },
        { badge: "Régulation concurrence", title: "Moteur d'innovation", text: "ADLC en France, DG COMP en Europe. Surveillance des ententes et abus de position dominante. La concurrence pousse à innover.", badgeColor: "#AFA9EC" },
        { badge: "Politiques R&D", title: "Financement public", text: "CIR (Crédit d'impôt recherche), pôles de compétitivité, CNRS, France 2030 (54 Md€ investis).", badgeColor: "#97C459" },
      ]} />

      <SectionTitle>Mécanisme 3 — Défis écologiques</SectionTitle>
      <DefBox label="Externalité négative de pollution" color="coral">
        Lorsqu'une activité économique <strong style={{ color: "#F0997B" }}>dégrade l'environnement</strong> et diminue le bien-être d'autres agents <strong style={{ color: "#F0997B" }}>sans compensation monétaire</strong>. Le marché est défaillant : il n'incite pas les agents à limiter la pollution (comportement de <strong style={{ color: "#F0997B" }}>passager clandestin / freerider</strong>).
      </DefBox>
      <DefBox label="Développement durable — Brundtland (1987)" color="green">
        « Un développement qui répond aux besoins du présent <strong style={{ color: "#97C459" }}>sans compromettre la capacité des générations futures</strong> à répondre aux leurs. »
      </DefBox>
      <CardGrid cards={[
        { badge: "Soutenabilité forte", title: "Capital naturel irremplaçable", text: "Non substituable. On ne peut pas remplacer une forêt amazonienne par du capital technologique. Exige une forte limitation de la production.", badgeColor: "#5DCAA5" },
        { badge: "Soutenabilité faible", title: "Capital naturel substituable", text: "Le progrès technique peut remplacer le capital naturel. La croissance finance les innovations nécessaires. Ex : robot pollinisateur.", badgeColor: "#EF9F27" },
      ]} />
    </div>
  );
}

function StepErreurs() {
  const errors = [
    {
      wrong: "« La croissance et le développement, c'est la même chose »",
      right: "La croissance est une mesure quantitative (PIB). Le développement est une transformation qualitative multidimensionnelle. La croissance peut exister sans développement (pétromonarchies), et le développement sans forte croissance.",
      color: "#F0997B",
    },
    {
      wrong: "« La PGF, c'est la productivité du travail »",
      right: "La productivité du travail = PIB / nombre d'heures travaillées. La PGF (résidu de Solow) est ce qui reste quand on retire les contributions de L ET K. Ce sont deux concepts différents.",
      color: "#EF9F27",
    },
    {
      wrong: "« La destruction créatrice, c'est l'État qui détruit les entreprises inefficaces »",
      right: "C'est le marché via l'innovation qui opère cette destruction. Ce sont les entrepreneurs innovateurs qui rendent obsolètes les activités existantes, pas une politique publique.",
      color: "#AFA9EC",
    },
    {
      wrong: "« La soutenabilité forte = croissance forte »",
      right: "Fort ≠ intensif. La soutenabilité forte signifie que le capital naturel est irremplaçable (non substituable). C'est la position la plus restrictive sur la croissance (vers la décroissance).",
      color: "#7EB8FF",
    },
    {
      wrong: "« Le brevet empêche définitivement la copie »",
      right: "Le brevet est temporaire (20 ans). Après expiration, l'invention tombe dans le domaine public. C'est l'équilibre entre incitation à innover et diffusion du progrès.",
      color: "#97C459",
    },
    {
      wrong: "« La croissance endogène, c'est la croissance interne d'une entreprise »",
      right: "Rien à voir avec la stratégie d'entreprise. La croissance endogène (Romer, Lucas) signifie que le progrès technique est produit par le système économique lui-même (R&D, éducation).",
      color: "#5DCAA5",
    },
  ];

  return (
    <div>
      <div style={{ fontSize: 14, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: "1.5rem" }}>
        Les confusions les plus fréquentes relevées dans les copies de bac.
      </div>
      {errors.map((e, i) => (
        <div
          key={i}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: "14px 16px",
            marginBottom: "0.75rem",
          }}
        >
          <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>✗</span>
            <div style={{ fontSize: 13, color: "#F0997B", fontFamily: "Space Grotesk, sans-serif", fontStyle: "italic" }}>
              {e.wrong}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <span style={{ fontSize: 16, flexShrink: 0, color: e.color }}>✓</span>
            <div style={{ fontSize: 13, color: "#d0cfc8", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.6 }}>
              {e.right}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StepQuiz() {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  function answer(idx: number) {
    if (answered) return;
    setAnswered(true);
    setChosen(idx);
    if (idx === QUIZ_QUESTIONS[qi].correct) setScore((s) => s + 1);
  }

  function next() {
    if (qi + 1 >= QUIZ_QUESTIONS.length) {
      setDone(true);
    } else {
      setQi((q) => q + 1);
      setAnswered(false);
      setChosen(null);
    }
  }

  function reset() {
    setQi(0);
    setScore(0);
    setAnswered(false);
    setChosen(null);
    setDone(false);
  }

  if (done) {
    const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    const col = pct >= 75 ? "#97C459" : pct >= 50 ? "#EF9F27" : "#F0997B";
    const msg =
      pct >= 75
        ? "🎉 Excellent ! Tu maîtrises bien la croissance économique."
        : pct >= 50
        ? "👍 Bon début — revois les concepts de PGF et de croissance endogène."
        : "📚 Reprends les étapes Cours et Mécanismes avant de réessayer.";
    return (
      <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
        <div style={{ fontSize: 56, fontWeight: 700, color: col, fontFamily: "Syne, sans-serif", marginBottom: 12 }}>
          {score}/{QUIZ_QUESTIONS.length}
        </div>
        <div style={{ fontSize: 15, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: "2rem" }}>{msg}</div>
        <button
          onClick={reset}
          style={{
            background: "#D4A017",
            color: "#0d1b2a",
            border: "none",
            borderRadius: 8,
            padding: "10px 24px",
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Recommencer
        </button>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[qi];
  return (
    <div>
      <div style={{ fontSize: 12, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", marginBottom: 12 }}>
        Question {qi + 1} sur {QUIZ_QUESTIONS.length} · Score : {score}/{qi}
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: "#e8e6df", fontFamily: "Space Grotesk, sans-serif", marginBottom: 16, lineHeight: 1.5 }}>
        {q.q}
      </div>
      <div style={{ display: "grid", gap: 8, marginBottom: "1rem" }}>
        {q.opts.map((opt, i) => {
          let bg = "rgba(255,255,255,0.04)";
          let border = "rgba(255,255,255,0.08)";
          let color = "#d0cfc8";
          if (answered) {
            if (i === q.correct) { bg = "rgba(151,196,89,0.15)"; border = "#97C459"; color = "#97C459"; }
            else if (i === chosen) { bg = "rgba(240,153,123,0.15)"; border = "#F0997B"; color = "#F0997B"; }
          }
          return (
            <button
              key={i}
              onClick={() => answer(i)}
              disabled={answered}
              style={{
                textAlign: "left",
                padding: "12px 14px",
                border: `1px solid ${border}`,
                borderRadius: 8,
                background: bg,
                color,
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: 13,
                cursor: answered ? "default" : "pointer",
                transition: "all 0.15s",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={{ background: "#2a1d09", border: "1px solid #EF9F27", borderRadius: 8, padding: "12px 14px", fontSize: 13, color: "#EF9F27", lineHeight: 1.7, fontFamily: "Space Grotesk, sans-serif", marginBottom: "1rem" }}>
          {q.fb}
        </div>
      )}
      {answered && (
        <div style={{ textAlign: "right" }}>
          <button
            onClick={next}
            style={{
              background: "#D4A017",
              color: "#0d1b2a",
              border: "none",
              borderRadius: 8,
              padding: "9px 20px",
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {qi === QUIZ_QUESTIONS.length - 1 ? "Voir mon résultat" : "Question suivante →"}
          </button>
        </div>
      )}
    </div>
  );
}

function StepSujets() {
  const sujets = [
    {
      type: "Dissertation",
      title: "Le progrès technique est-il la principale source de croissance économique ?",
      hint: "Thèse : Oui via PGF, croissance endogène, Solow. Antithèse : facteurs L et K aussi, institutions. Synthèse : PT endogène, conditions institutionnelles nécessaires.",
      color: "#7EB8FF",
    },
    {
      type: "Dissertation",
      title: "Dans quelle mesure la croissance économique est-elle compatible avec la préservation de l'environnement ?",
      hint: "Thèse : incompatibilité (externalités, ressources limitées). Antithèse : innovations vertes, taxe carbone, décorrélation croissance/émissions. Synthèse : condition = politiques publiques fortes.",
      color: "#5DCAA5",
    },
    {
      type: "EC3",
      title: "À l'aide du dossier documentaire et de vos connaissances, vous montrerez que le progrès technique génère des transformations profondes de la structure économique.",
      hint: "Destruction créatrice (Schumpeter), exemples IA/automobile. Attentes : 2 axes avec arguments et illustrations chiffrées.",
      color: "#EF9F27",
    },
    {
      type: "EC3",
      title: "Vous analyserez les politiques permettant de concilier croissance et développement durable.",
      hint: "Taxe carbone, EU ETS, réglementation, aides R&D verte. Attentes : distinguer instruments de marché vs régulation.",
      color: "#AFA9EC",
    },
    {
      type: "EC2 — Mobilisation",
      title: "À l'aide de vos connaissances, expliquez le mécanisme de la destruction créatrice.",
      hint: "Définition, exemples contemporains (IA, auto électrique, streaming). 6–8 lignes attendues.",
      color: "#97C459",
    },
    {
      type: "EC2 — Mobilisation",
      title: "Présentez les quatre moteurs de la croissance endogène.",
      hint: "R&D (Romer), capital humain (Lucas), capital public (Barro), learning by doing (Arrow). Externalités positives.",
      color: "#F0997B",
    },
  ];

  return (
    <div>
      <div style={{ fontSize: 14, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: "1.5rem" }}>
        Sujets tombés ou très probables d'après l'analyse du programme et des annales.
      </div>
      {sujets.map((s, i) => (
        <div
          key={i}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${s.color}44`,
            borderLeft: `3px solid ${s.color}`,
            borderRadius: 10,
            padding: "14px 16px",
            marginBottom: "0.75rem",
          }}
        >
          <div style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: s.color, marginBottom: 6, fontFamily: "Space Grotesk, sans-serif", textTransform: "uppercase" }}>
            {s.type}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e8e6df", fontFamily: "Space Grotesk, sans-serif", marginBottom: 8, lineHeight: 1.4 }}>
            {s.title}
          </div>
          <div style={{ fontSize: 12, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.5 }}>
            💡 {s.hint}
          </div>
        </div>
      ))}
    </div>
  );
}

function StepMethode() {
  return (
    <div>
      <SectionTitle>Méthode EC2 — Mobilisation des connaissances</SectionTitle>
      <NoteBox>
        💡 L'exercice EC2 mobilisation demande d'expliquer un mécanisme en 6–8 lignes, sans document. Clarté, définition, causalité, exemple chiffré.
      </NoteBox>

      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#D4A017", fontFamily: "Space Grotesk, sans-serif", marginBottom: 10 }}>
          Sujet-type : « Expliquez le mécanisme de la destruction créatrice »
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: "16px",
            fontFamily: "Space Grotesk, sans-serif",
          }}
        >
          {[
            { step: "① Définir le concept", color: "#7EB8FF", text: "La destruction créatrice, théorisée par Joseph Schumpeter dans Capitalisme, socialisme et démocratie (1942), est le processus par lequel les innovations majeures — arrivant « en grappe » — détruisent continuellement les activités économiques vieillies tout en créant de nouvelles activités." },
            { step: "② Expliquer le mécanisme", color: "#5DCAA5", text: "Lorsqu'un entrepreneur innove radicalement, il bouleverse les conditions de la concurrence : les firmes incapables de s'adapter voient leurs parts de marché s'effondrer et disparaissent (destruction), tandis que de nouveaux secteurs, emplois et débouchés émergent autour de l'innovation (création)." },
            { step: "③ Illustrer avec un exemple actuel et chiffré", color: "#EF9F27", text: "L'essor des voitures électriques illustre ce phénomène : la filière automobile thermique française voit 100 000 emplois menacés d'ici 2035, tandis qu'émergent de nouveaux métiers (ingénieurs batteries, techniciens bornes). L'intelligence artificielle générative (ChatGPT, Gemini) affecterait, selon le FMI (2024), 40 % des emplois mondiaux — en en détruisant certains, en en transformant d'autres." },
            { step: "④ Nuancer si possible", color: "#AFA9EC", text: "Ce processus, indispensable à la dynamique capitaliste à long terme, est cependant douloureux à court terme pour les travailleurs des secteurs en déclin, ce qui explique les résistances historiques (luddisme, taxis contre Uber)." },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: item.color, letterSpacing: "0.06em", marginBottom: 4 }}>{item.step}</div>
              <div style={{ fontSize: 13, color: "#d0cfc8", lineHeight: 1.7 }}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      <SectionTitle>Méthode Dissertation — Plan type</SectionTitle>
      <div style={{ display: "grid", gap: 8 }}>
        {[
          { num: "I", title: "Le progrès technique, principal moteur endogène de la croissance", color: "#7EB8FF", sous: ["A. Le résidu de Solow : la PGF comme moteur résiduel", "B. La croissance endogène : PT produit par le système économique", "C. La destruction créatrice : renouvellement permanent des structures"] },
          { num: "II", title: "Les défis et limites de la croissance", color: "#F0997B", sous: ["A. Inégalités : le progrès technique biaisé vers le travail qualifié", "B. Limites écologiques : externalités négatives et ressources limitées", "C. Deux visions du développement durable : soutenabilité forte vs faible"] },
          { num: "III", title: "Politiques économiques et conditions institutionnelles", color: "#97C459", sous: ["A. Rôle des institutions (North) : brevets, droits de propriété, concurrence", "B. Financement public de la R&D et du capital humain", "C. Politiques environnementales : taxe carbone, marchés de permis d'émission"] },
        ].map((part, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${part.color}44`, borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: part.color, fontFamily: "Space Grotesk, sans-serif", marginBottom: 8 }}>
              {part.num}. {part.title}
            </div>
            {part.sous.map((s, j) => (
              <div key={j} style={{ fontSize: 12, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: 4, paddingLeft: 12 }}>
                {["A", "B", "C"][j]}. {s}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepMemo() {
  return (
    <div style={{ textAlign: "center", padding: "2rem 0" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#e8e6df", fontFamily: "Syne, sans-serif", marginBottom: 8 }}>
        Fiche mémo PDF
      </div>
      <div style={{ fontSize: 14, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: "2rem", maxWidth: 380, margin: "0 auto 2rem" }}>
        La synthèse condensée du chapitre en une page A4, à imprimer avant le bac.
      </div>
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "1.5rem", maxWidth: 400, margin: "0 auto 1.5rem", textAlign: "left" }}>
        <div style={{ fontSize: 12, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", marginBottom: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Contenu de la fiche
        </div>
        {[
          "Toutes les définitions à maîtriser",
          "La formule PIB et l'équation macroéconomique",
          "Schéma des gains de productivité",
          "Les 4 moteurs de la croissance endogène",
          "Tableau auteurs / notions-clés",
          "Données chiffrées indispensables",
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "#d0cfc8", fontFamily: "Space Grotesk, sans-serif", marginBottom: 6 }}>
            <span style={{ color: "#5DCAA5" }}>✓</span>
            {item}
          </div>
        ))}
      </div>
      <a
        href="/memos/memo_croissance_economique.pdf"
        download="CapSES_Memo_Croissance_Economique.pdf"
        style={{
          display: "inline-block",
          background: "#D4A017",
          color: "#0d1b2a",
          textDecoration: "none",
          borderRadius: 10,
          padding: "12px 28px",
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 700,
          fontSize: 15,
          cursor: "pointer",
        }}
      >
        📥 Télécharger la fiche mémo PDF
      </a>
      <div style={{ fontSize: 12, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", marginTop: 10 }}>
        Format A4 · Impression recto · Sources : Maddison, Solow, FMI
      </div>
    </div>
  );
}

function StepRessources() {
  return (
    <div>
      <div style={{ fontSize: 14, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: "1.5rem" }}>
        Ressources complémentaires pour approfondir et mémoriser le chapitre.
      </div>

      {/* VIDÉO */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#7EB8FF", fontFamily: "Space Grotesk, sans-serif", textTransform: "uppercase", marginBottom: 8 }}>
          🎬 Cours vidéo — Croissance économique
        </div>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(126,184,255,0.2)" }}>
          <iframe
            src="https://www.youtube.com/embed/Iddiy-BpFfg"
            title="Cours vidéo — Croissance économique — CapSES"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </div>

      {/* GRILLE 3 ressources bientôt */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {[
          { icon: "🗺️", label: "Carte mentale", desc: "Visualise toutes les connexions entre les notions du chapitre.", color: "#D4A017" },
          { icon: "📊", label: "Infographie", desc: "Le schéma des gains de productivité et les 4 moteurs en un coup d'œil.", color: "#5DCAA5" },
          { icon: "📝", label: "Synthèse NotebookLM", desc: "La synthèse magistrale générée par IA à partir du cours complet.", color: "#AFA9EC" },
        ].map((r, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${r.color}33`,
              borderRadius: 12,
              padding: "1.25rem",
              textAlign: "center",
              opacity: 0.6,
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 10 }}>{r.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: r.color, fontFamily: "Space Grotesk, sans-serif", marginBottom: 6 }}>
              {r.label}
            </div>
            <div style={{ fontSize: 12, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.5, marginBottom: 10 }}>
              {r.desc}
            </div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "3px 10px", display: "inline-block" }}>
              Bientôt disponible
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── STEP RENDERER ─────────────────────────────────────────────────────────────
function renderStep(id: StepId) {
  switch (id) {
    case "savoir":    return <StepSavoir />;
    case "notions":   return <StepNotions />;
    case "cours":     return <StepCours />;
    case "mecanismes": return <StepMecanismes />;
    case "erreurs":   return <StepErreurs />;
    case "quiz":      return <StepQuiz />;
    case "sujets":    return <StepSujets />;
    case "methode":   return <StepMethode />;
    case "memo":      return <StepMemo />;
    case "ressources": return <StepRessources />;
  }
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function CroissanceEconomiquePage() {
  const [active, setActive] = useState<StepId>("savoir");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const currentStep = STEPS.find((s) => s.id === active)!;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d1b2a",
        fontFamily: "Space Grotesk, sans-serif",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

        strong { font-weight: 600; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 1rem; }
        th { background: rgba(255,255,255,0.05); padding: 9px 12px; text-align: left; font-weight: 600; color: #8a8880; border-bottom: 1px solid rgba(255,255,255,0.08); font-family: Space Grotesk, sans-serif; }
        td { padding: 9px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); color: #d0cfc8; vertical-align: top; line-height: 1.5; font-family: Space Grotesk, sans-serif; }
        td:first-child { color: #7EB8FF; font-weight: 600; }
        tr:last-child td { border-bottom: none; }
      `}</style>

      {/* TOP NAV */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(13,27,42,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "0 1.5rem",
          height: 56,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <a
          href="/"
          style={{
            fontSize: 18,
            fontWeight: 800,
            fontFamily: "Syne, sans-serif",
            color: "#D4A017",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          CapSES
        </a>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
        <span style={{ fontSize: 13, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif" }}>Terminale</span>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
        <span style={{ fontSize: 13, color: "#d0cfc8", fontFamily: "Space Grotesk, sans-serif" }}>Croissance économique</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#D4A017", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 11, color: "#D4A017", fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}>
            {STEPS.findIndex((s) => s.id === active) + 1}/{STEPS.length}
          </span>
        </div>
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      </nav>

      {/* CHAPTER HEADER */}
      <div
        style={{
          background: "linear-gradient(135deg, #0a2236 0%, #0d1b2a 60%, #0a1f1a 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "2rem 1.5rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle, rgba(212,160,23,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", padding: "3px 10px", borderRadius: 20, background: "rgba(93,202,165,0.15)", color: "#5DCAA5", border: "1px solid rgba(93,202,165,0.3)", marginBottom: 10, fontFamily: "Space Grotesk, sans-serif", textTransform: "uppercase" }}>
            Économie · Terminale SES
          </div>
          <h1
            style={{
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: 800,
              fontFamily: "Syne, sans-serif",
              color: "#f0ece0",
              margin: 0,
              lineHeight: 1.2,
              marginBottom: 8,
            }}
          >
            Quelles sont les sources et les défis<br />de la croissance économique ?
          </h1>
          <div style={{ fontSize: 13, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif" }}>
            Programme Éduscol 2020 · 9 étapes de révision
          </div>
        </div>
      </div>

      {/* MOBILE STEP SELECTOR */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: 6,
          padding: "0.75rem 1rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.2)",
        }}
        className="hide-scrollbar"
      >
        <style>{`.hide-scrollbar { -ms-overflow-style:none; scrollbar-width:none; } .hide-scrollbar::-webkit-scrollbar { display:none; } @media(min-width:900px){ .mobile-tabs { display:none !important; } }`}</style>
        {STEPS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            style={{
              flexShrink: 0,
              padding: "6px 12px",
              borderRadius: 8,
              border: `1px solid ${active === s.id ? s.color : "rgba(255,255,255,0.08)"}`,
              background: active === s.id ? `${s.color}22` : "transparent",
              color: active === s.id ? s.color : "#5a5955",
              fontSize: 12,
              fontWeight: active === s.id ? 700 : 400,
              cursor: "pointer",
              fontFamily: "Space Grotesk, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* MAIN LAYOUT */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "240px 1fr",
          gap: 0,
          minHeight: "calc(100vh - 200px)",
        }}
      >
        {/* SIDEBAR */}
        <aside
          style={{
            display: isMobile ? "none" : "block",
            borderRight: "1px solid rgba(255,255,255,0.06)",
            padding: "1.5rem 1rem",
            position: "sticky",
            top: 56,
            height: "calc(100vh - 56px)",
            overflowY: "auto",
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", textTransform: "uppercase", marginBottom: 12 }}>
            Étapes du chapitre
          </div>
          {STEPS.map((s) => {
            const isActive = active === s.id;
            const idx = STEPS.findIndex((x) => x.id === active);
            const done = STEPS.findIndex((x) => x.id === s.id) < idx;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: `1px solid ${isActive ? s.color + "44" : "transparent"}`,
                  background: isActive ? `${s.color}15` : "transparent",
                  color: isActive ? s.color : done ? "#5DCAA5" : "#5a5955",
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 400,
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "Space Grotesk, sans-serif",
                  marginBottom: 2,
                  transition: "all 0.15s",
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: isActive ? s.color : done ? "rgba(93,202,165,0.2)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${isActive ? s.color : done ? "#5DCAA5" : "rgba(255,255,255,0.1)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: done && !isActive ? 11 : 10,
                    fontWeight: 700,
                    color: isActive ? "#0d1b2a" : done ? "#5DCAA5" : "#5a5955",
                    flexShrink: 0,
                  }}
                >
                  {done && !isActive ? "✓" : s.num}
                </div>
                <span style={{ lineHeight: 1.3 }}>{s.label}</span>
              </button>
            );
          })}

          {/* Progress bar */}
          <div style={{ marginTop: "1.5rem", padding: "0 4px" }}>
            <div style={{ fontSize: 11, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", marginBottom: 6 }}>
              Progression
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #5DCAA5, #D4A017)",
                  borderRadius: 2,
                  width: `${((STEPS.findIndex((s) => s.id === active) + 1) / STEPS.length) * 100}%`,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <main style={{ padding: isMobile ? "1rem 1rem 3rem" : "2rem 2rem 4rem", minWidth: 0 }}>
          {/* Step header */}
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <span style={{ fontSize: 24 }}>{currentStep.icon}</span>
              <h2
                style={{
                  fontSize: "clamp(18px, 3vw, 24px)",
                  fontWeight: 700,
                  fontFamily: "Syne, sans-serif",
                  color: currentStep.color,
                  margin: 0,
                }}
              >
                {currentStep.label}
              </h2>
              <div
                style={{
                  marginLeft: "auto",
                  fontSize: 11,
                  color: "#5a5955",
                  fontFamily: "Space Grotesk, sans-serif",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 6,
                  padding: "2px 8px",
                }}
              >
                {currentStep.num} / 9
              </div>
            </div>
            <div style={{ height: 2, background: `linear-gradient(90deg, ${currentStep.color}44, transparent)` }} />
          </div>

          {/* Step content */}
          {renderStep(active)}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {STEPS.findIndex((s) => s.id === active) > 0 ? (
              <button
                onClick={() => {
                  const idx = STEPS.findIndex((s) => s.id === active);
                  setActive(STEPS[idx - 1].id);
                  window.scrollTo(0, 0);
                }}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: "9px 18px",
                  color: "#d0cfc8",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                ← Étape précédente
              </button>
            ) : <div />}
            {STEPS.findIndex((s) => s.id === active) < STEPS.length - 1 && (
              <button
                onClick={() => {
                  const idx = STEPS.findIndex((s) => s.id === active);
                  setActive(STEPS[idx + 1].id);
                  window.scrollTo(0, 0);
                }}
                style={{
                  background: currentStep.color,
                  border: "none",
                  borderRadius: 8,
                  padding: "9px 18px",
                  color: "#0d1b2a",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Étape suivante →
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
