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
  color: string;
}

const STEPS: Step[] = [
  { id: "savoir",     num: 1,  label: "À savoir pour le bac",   icon: "🎯", color: "#D4A017" },
  { id: "notions",    num: 2,  label: "Notions indispensables",  icon: "📐", color: "#7EB8FF" },
  { id: "cours",      num: 3,  label: "Le cours en 10 min",      icon: "⚡", color: "#5DCAA5" },
  { id: "mecanismes", num: 4,  label: "Mécanismes à maîtriser",  icon: "⚙️", color: "#AFA9EC" },
  { id: "erreurs",    num: 5,  label: "Erreurs fréquentes",      icon: "⚠️", color: "#F0997B" },
  { id: "quiz",       num: 6,  label: "Quiz",                    icon: "🧠", color: "#97C459" },
  { id: "sujets",     num: 7,  label: "Sujets probables",        icon: "📋", color: "#D4A017" },
  { id: "methode",    num: 8,  label: "Méthode appliquée",       icon: "✍️", color: "#7EB8FF" },
  { id: "memo",       num: 9,  label: "Fiche mémo PDF",          icon: "📄", color: "#5DCAA5" },
  { id: "ressources", num: 10, label: "Ressources",              icon: "🎬", color: "#7EB8FF" },
];

// ─── Quiz ──────────────────────────────────────────────────────────────────────
const QUIZ = [
  {
    q: "Qu'est-ce qu'un avantage comparatif (Ricardo) ?",
    opts: [
      "Un pays est le meilleur producteur en valeur absolue d'un bien",
      "Un pays a intérêt à se spécialiser là où son coût relatif est le plus faible, même sans avantage absolu",
      "Un pays possède plus de capital que ses partenaires commerciaux",
      "Un pays bénéficie d'un taux de change favorable",
    ],
    correct: 1,
    fb: "L'avantage comparatif (Ricardo, 1817) est le fondement du libre-échange : même un pays moins productif dans tout a intérêt à se spécialiser là où son désavantage relatif est le plus faible. L'échange est TOUJOURS mutuellement bénéfique.",
  },
  {
    q: "Que prédit le théorème Stolper-Samuelson ?",
    opts: [
      "Le commerce enrichit tous les facteurs de production de façon égale",
      "Le commerce enrichit le facteur abondant et appauvrit le facteur rare",
      "Le commerce n'a aucun effet sur la distribution des revenus",
      "Le commerce réduit les inégalités dans tous les pays",
    ],
    correct: 1,
    fb: "Stolper-Samuelson (1941) : le libre-échange enrichit le facteur abondant (capital dans les pays développés) et appauvrit le facteur rare (travail peu qualifié dans les pays développés). Cela explique pourquoi les inégalités de revenus augmentent dans les pays riches avec la mondialisation.",
  },
  {
    q: "Qu'est-ce que le commerce intrabranche (Krugman) ?",
    opts: [
      "Des échanges de produits très différents entre pays très différents",
      "Des échanges de produits similaires entre pays comparables (ex : France exporte des Peugeot, importe des BMW)",
      "Des échanges entre filiales d'une même multinationale",
      "Des échanges de matières premières uniquement",
    ],
    correct: 1,
    fb: "Le commerce intrabranche représente plus de 35 % du commerce mondial (CEPII). Krugman l'explique par les économies d'échelle (les firmes se spécialisent sur des variétés) et la différenciation des produits (les consommateurs aiment la variété). Il concerne surtout les pays développés similaires.",
  },
  {
    q: "Qu'est-ce que le modèle de Mélitz (2003) apporte aux théories du commerce ?",
    opts: [
      "Il explique que tous les pays doivent adopter le protectionnisme",
      "Il montre que toutes les firmes sont identiques et peuvent exporter",
      "Il montre que seules les firmes les plus productives exportent (les 'happy few'), car l'exportation implique des coûts supplémentaires",
      "Il prédit la convergence des salaires entre tous les pays",
    ],
    correct: 2,
    fb: "Mélitz montre que l'exportation implique des coûts supplémentaires (transport, formalités…). Seules les firmes les plus productives peuvent les assumer tout en restant rentables. En France, 9,3 % des firmes exportent ; les 2/3 des exports sont réalisés par 1 % des exportateurs (les « happy few »).",
  },
  {
    q: "Qu'est-ce que la 'courbe du sourire' (Stan Shih, 1992) illustre-t-elle ?",
    opts: [
      "La relation entre bonheur et croissance économique",
      "L'évolution des échanges mondiaux depuis 1945",
      "La répartition inégale de la valeur ajoutée sur la chaîne de valeur : forte en amont (R&D) et en aval (marketing), faible au stade de la fabrication",
      "La corrélation entre protectionnisme et inflation",
    ],
    correct: 2,
    fb: "La courbe du sourire montre que la valeur ajoutée est maximale en amont (R&D, conception) et en aval (marketing, distribution), mais minimale lors de la fabrication. Les pays développés se concentrent sur les extrémités, laissant la fabrication aux pays à bas coûts. Ex : Apple conçoit aux USA, assemble via Foxconn en Chine.",
  },
  {
    q: "Depuis les années 1990, la mondialisation a plutôt...",
    opts: [
      "Réduit les inégalités entre pays ET réduit les inégalités au sein de chaque pays",
      "Réduit les inégalités entre pays MAIS augmenté les inégalités au sein de chaque pays",
      "Augmenté les inégalités entre pays ET augmenté les inégalités au sein de chaque pays",
      "Eu aucun effet sur les inégalités",
    ],
    correct: 1,
    fb: "C'est le résultat paradoxal mis en évidence par Milanovic : la mondialisation a réduit les inégalités entre pays (émergence de la Chine, de l'Inde) mais augmenté les inégalités internes à chaque pays (recul relatif des classes moyennes dans les pays développés). La 'courbe de l'éléphant' l'illustre parfaitement.",
  },
  {
    q: "Le 'protectionnisme éducateur' (F. List) consiste à...",
    opts: [
      "Taxer les importations de produits culturels étrangers",
      "Protéger définitivement toutes les industries nationales de la concurrence étrangère",
      "Protéger temporairement les industries naissantes pour leur permettre d'atteindre la compétitivité internationale",
      "Interdire les exportations de matières premières",
    ],
    correct: 2,
    fb: "Le protectionnisme éducateur (List, XIXe s. ; Stiglitz & Greenwald, 2017) vise à protéger temporairement les industries naissantes, trop immatures pour affronter la concurrence. La protection doit être levée dès que l'industrie devient compétitive. Ex : l'Airbus européen dans les années 1970.",
  },
  {
    q: "Pourquoi mesurer le commerce en valeur ajoutée plutôt qu'en valeur brute ?",
    opts: [
      "Car la valeur brute est toujours négative pour les pays en développement",
      "Car les biens intermédiaires sont comptabilisés plusieurs fois dans les mesures brutes, ce qui surévalue le commerce réel",
      "Car la valeur ajoutée est plus facile à calculer",
      "Car l'OMC l'exige depuis 2010",
    ],
    correct: 1,
    fb: "Avec les CVM fragmentées, un composant est comptabilisé à chaque passage de frontière. Mesurer en valeur ajoutée évite ce double comptage. Ex : le déficit américain avec la Chine est deux fois moins important en valeur ajoutée qu'en valeur brute, car beaucoup de composants 'chinois' viennent en réalité d'autres pays.",
  },
];

// ─── Sub-components (identiques au chapitre croissance) ─────────────────────
function DefBox({ label, children, color = "teal" }: { label: string; children: React.ReactNode; color?: "teal" | "amber" | "purple" | "coral" | "blue" | "green" }) {
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
    <div style={{ background: p.bg, border: `1px solid ${p.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: "1rem" }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: p.labelCol, marginBottom: 6, textTransform: "uppercase" as const, fontFamily: "Space Grotesk, sans-serif" }}>{label}</div>
      <div style={{ fontSize: 14, color: "#d0cfc8", lineHeight: 1.7, fontFamily: "Space Grotesk, sans-serif" }}>{children}</div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 14, fontWeight: 700, color: "#7EB8FF", borderLeft: "3px solid #7EB8FF", paddingLeft: 10, margin: "1.5rem 0 0.75rem", fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{children}</div>;
}

function StatGrid({ stats }: { stats: { num: string; label: string; color: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: "1rem" }}>
      {stats.map((s, i) => (
        <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px 10px", textAlign: "center" as const }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: 6, fontFamily: "Syne, sans-serif" }}>{s.num}</div>
          <div style={{ fontSize: 11, color: "#8a8880", lineHeight: 1.4, fontFamily: "Space Grotesk, sans-serif" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function CardGrid({ cards }: { cards: { badge: string; title: string; text: string; badgeColor: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: "1rem" }}>
      {cards.map((c, i) => (
        <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 14 }}>
          <div style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", padding: "2px 8px", borderRadius: 20, background: `${c.badgeColor}22`, color: c.badgeColor, border: `1px solid ${c.badgeColor}44`, marginBottom: 8, fontFamily: "Space Grotesk, sans-serif" }}>{c.badge}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#e8e6df", marginBottom: 4, fontFamily: "Space Grotesk, sans-serif" }}>{c.title}</div>
          <div style={{ fontSize: 12, color: "#8a8880", lineHeight: 1.5, fontFamily: "Space Grotesk, sans-serif" }}>{c.text}</div>
        </div>
      ))}
    </div>
  );
}

function NoteBox({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warn" | "actu" }) {
  const styles = {
    info:  { bg: "#1a1940", border: "#AFA9EC", color: "#AFA9EC" },
    warn:  { bg: "#2a1209", border: "#F0997B", color: "#F0997B" },
    actu:  { bg: "#2a1d09", border: "#EF9F27", color: "#EF9F27" },
  };
  const s = styles[type];
  return <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: s.color, marginBottom: "1rem", lineHeight: 1.6, fontFamily: "Space Grotesk, sans-serif" }}>{children}</div>;
}

function Accordion({ items }: { items: { title: string; content: React.ReactNode; dotColor: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div style={{ marginBottom: "1rem" }}>
      {items.map((item, i) => (
        <div key={i} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 14px", background: open === i ? "rgba(255,255,255,0.06)" : "transparent", border: "none", color: "#e8e6df", fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left" as const, fontFamily: "Space Grotesk, sans-serif" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: item.dotColor, flexShrink: 0, display: "inline-block" }} />
            {item.title}
            <span style={{ marginLeft: "auto", color: "#5a5955", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
          </button>
          {open === i && <div style={{ padding: "4px 14px 14px", fontSize: 13, color: "#8a8880", lineHeight: 1.7, fontFamily: "Space Grotesk, sans-serif" }}>{item.content}</div>}
        </div>
      ))}
    </div>
  );
}

function CompareTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: "1rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "Space Grotesk, sans-serif" }}>
        <thead>
          <tr>{headers.map((h, i) => <th key={i} style={{ background: "rgba(255,255,255,0.06)", padding: "9px 12px", textAlign: "left" as const, fontWeight: 600, color: "#8a8880", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => <td key={j} style={{ padding: "9px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)", color: j === 0 ? "#7EB8FF" : "#d0cfc8", fontWeight: j === 0 ? 600 : 400, verticalAlign: "top", lineHeight: 1.5 }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── SmileCurve SVG ───────────────────────────────────────────────────────────
function SmileCurve() {
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "1.2rem", marginBottom: "1rem" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#7EB8FF", textAlign: "center" as const, marginBottom: 10, fontFamily: "Space Grotesk, sans-serif" }}>La « courbe du sourire » (Stan Shih, 1992) — où se crée la valeur ?</div>
      <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 500, display: "block", margin: "0 auto" }}>
        <path d="M50,40 Q125,170 250,160 Q375,170 450,40" fill="none" stroke="#7EB8FF" strokeWidth="3"/>
        <line x1="30" y1="180" x2="480" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        <line x1="30" y1="10" x2="30" y2="185" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        <text x="8" y="45" fontSize="9" fill="#8a8880" fontFamily="sans-serif">Valeur</text>
        <text x="8" y="56" fontSize="9" fill="#8a8880" fontFamily="sans-serif">ajoutée</text>
        <text x="50" y="195" fontSize="9" fill="#8a8880" fontFamily="sans-serif">R&D / Conception</text>
        <text x="200" y="195" fontSize="9" fill="#8a8880" fontFamily="sans-serif">Fabrication</text>
        <text x="350" y="195" fontSize="9" fill="#8a8880" fontFamily="sans-serif">Marketing / Vente</text>
        <circle cx="85" cy="55" r="6" fill="#7EB8FF"/>
        <circle cx="250" cy="162" r="6" fill="#F0997B"/>
        <circle cx="415" cy="55" r="6" fill="#7EB8FF"/>
        <text x="55" y="38" fontSize="9" fill="#7EB8FF" fontFamily="sans-serif" fontWeight="bold">Forte VA</text>
        <text x="195" y="148" fontSize="9" fill="#F0997B" fontFamily="sans-serif" fontWeight="bold">Faible VA</text>
        <text x="370" y="38" fontSize="9" fill="#7EB8FF" fontFamily="sans-serif" fontWeight="bold">Forte VA</text>
        <text x="40" y="75" fontSize="10" fontFamily="sans-serif">🇺🇸 🇩🇪 🇫🇷</text>
        <text x="215" y="178" fontSize="10" fontFamily="sans-serif">🇨🇳 🇻🇳</text>
        <text x="375" y="75" fontSize="10" fontFamily="sans-serif">🇺🇸 🇩🇪 🇫🇷</text>
      </svg>
      <div style={{ fontSize: 12, color: "#8a8880", textAlign: "center" as const, marginTop: 6, fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.5 }}>
        Les pays développés captent la valeur en <strong style={{ color: "#7EB8FF" }}>amont</strong> (R&D, design) et en <strong style={{ color: "#7EB8FF" }}>aval</strong> (marketing). La fabrication, à faible VA, est réalisée dans les pays à bas coûts. Ex : Apple conçoit aux États-Unis, assemble en Chine via Foxconn.
      </div>
    </div>
  );
}

// ─── STEPS ───────────────────────────────────────────────────────────────────

function StepSavoir() {
  return (
    <div>
      <div style={{ fontSize: 14, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: "1rem" }}>Ce que le jury attend sur ce chapitre au baccalauréat.</div>

      <SectionTitle>Points clés du programme</SectionTitle>
      <CardGrid cards={[
        { badge: "Objectif 1", title: "Fondements du commerce", text: "Avantages absolus (Smith) vs comparatifs (Ricardo). Gains à l'échange. HOS : dotations factorielles. Paradoxe de Leontief.", badgeColor: "#D4A017" },
        { badge: "Objectif 2", title: "Nouvelles théories", text: "Commerce intrabranche (Krugman) : économies d'échelle + différenciation. Firmes hétérogènes (Mélitz) : 'happy few'.", badgeColor: "#7EB8FF" },
        { badge: "Objectif 3", title: "FMN & CVM", text: "IDE verticaux vs horizontaux. DIPP. Courbe du sourire (Shih). Mesure en valeur ajoutée. France 1re destination IDE en Europe.", badgeColor: "#5DCAA5" },
        { badge: "Objectif 4", title: "Effets & débats", text: "Baisse des prix (4 canaux). Inégalités entre/dans les pays (Milanovic, courbe éléphant). Libre-échange vs protectionnisme (List, guerre commerciale 2025).", badgeColor: "#AFA9EC" },
      ]} />

      <SectionTitle>Auteurs & notions à citer impérativement</SectionTitle>
      <div style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.3)", borderRadius: 10, padding: "14px 16px", marginBottom: "1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
          {[
            "Smith (1776) — avantages absolus",
            "Ricardo (1817) — avantages comparatifs",
            "HOS — dotations factorielles",
            "Leontief (1953) — paradoxe",
            "Krugman (Nobel 2008) — commerce intrabranche",
            "Mélitz (2003) — firmes hétérogènes",
            "Stan Shih (1992) — courbe du sourire",
            "Milanovic — courbe de l'éléphant",
            "List — protectionnisme éducateur",
            "Stolper-Samuelson — inégalités facteurs",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "#d0cfc8" }}>
              <span style={{ color: "#D4A017", flexShrink: 0 }}>→</span>{item}
            </div>
          ))}
        </div>
      </div>

      <SectionTitle>Données chiffrées indispensables</SectionTitle>
      <StatGrid stats={[
        { num: "34 650 Md$", label: "Commerce mondial marchandises + services (OMC, 2025)", color: "#7EB8FF" },
        { num: "35 %", label: "Part du commerce intrabranche dans le commerce mondial (CEPII)", color: "#5DCAA5" },
        { num: "9,3 %", label: "Part des firmes françaises qui exportent (INSEE) — les 'happy few'", color: "#D4A017" },
      ]} />
      <StatGrid stats={[
        { num: ">50 %", label: "Des échanges mondiaux assurés par les FMN", color: "#AFA9EC" },
        { num: "61 %", label: "Part des services dans la VA exportée française (INSEE) — vs 16 % en valeur brute", color: "#F0997B" },
        { num: "145 %", label: "Droits de douane Trump sur produits chinois (avril 2025)", color: "#EF9F27" },
      ]} />
      <div style={{ fontSize: 11, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", marginBottom: "1rem" }}>
        📊 Sources : OMC · CEPII · INSEE · BLS
      </div>

      <NoteBox type="actu">
        🔴 <strong>Actualité bac 2026 — Guerre commerciale :</strong> Le 2 avril 2025 («&nbsp;Jour de la Libération&nbsp;»), les États-Unis ont imposé des droits de douane de 10 % minimum sur toutes les importations, jusqu'à 145 % sur les produits chinois. Le taux moyen américain est passé de 2 % à ~24 %, son plus haut depuis 1930. Illustration parfaite du débat libre-échange / protectionnisme au programme.
      </NoteBox>
    </div>
  );
}

function StepNotions() {
  return (
    <div>
      <SectionTitle>Définitions fondamentales</SectionTitle>
      <DefBox label="Commerce international" color="blue">
        Ensemble des <strong style={{ color: "#7EB8FF" }}>échanges de biens et services entre pays</strong>. Se mesure par la valeur des exportations ou, plus précisément, en <strong style={{ color: "#7EB8FF" }}>valeur ajoutée</strong> pour éviter les doubles comptages liés aux chaînes de valeur mondiales.
      </DefBox>
      <DefBox label="Avantage absolu (Smith, 1776)" color="teal">
        Un pays dispose d'un avantage absolu s'il produit un bien avec <strong style={{ color: "#5DCAA5" }}>moins de ressources qu'un autre pays</strong> en valeur absolue. Smith : chaque pays se spécialise là où il est le plus productif.
      </DefBox>
      <DefBox label="Avantage comparatif (Ricardo, 1817)" color="amber">
        Un pays a intérêt à se spécialiser dans la production où son <strong style={{ color: "#EF9F27" }}>coût relatif est le plus faible</strong>, même sans avantage absolu. L'échange est <strong style={{ color: "#EF9F27" }}>TOUJOURS mutuellement bénéfique</strong>.
      </DefBox>
      <DefBox label="Théorème HOS (Heckscher, Ohlin, Samuelson)" color="purple">
        Les avantages comparatifs s'expliquent par les <strong style={{ color: "#AFA9EC" }}>dotations en facteurs de production</strong>.<br /><br />
        <strong style={{ color: "#AFA9EC" }}>Théorème H-O :</strong> Un pays exporte le bien qui utilise intensivement son facteur <strong style={{ color: "#AFA9EC" }}>relativement abondant</strong>. Ex : la Chine (travail abondant) exporte des produits intensifs en travail ; l'Allemagne (capital qualifié) exporte des machines.<br /><br />
        <strong style={{ color: "#AFA9EC" }}>Stolper-Samuelson :</strong> Le libre-échange <strong style={{ color: "#AFA9EC" }}>enrichit le facteur abondant</strong> et appauvrit le facteur rare → dans les pays développés, le travail peu qualifié est perdant, ce qui explique la hausse des inégalités internes.
      </DefBox>
      <DefBox label="Commerce intrabranche vs interbranche" color="coral">
        <strong style={{ color: "#AFA9EC" }}>Interbranche :</strong> échanges de produits différents (la France exporte du vin, importe des textiles). Expliqué par Ricardo et HOS.<br /><br />
        <strong style={{ color: "#AFA9EC" }}>Intrabranche :</strong> échanges de produits similaires entre pays comparables (France exporte des Peugeot, importe des BMW). +35 % du commerce mondial. Expliqué par Krugman.
      </DefBox>

      <SectionTitle>Firmes et mondialisation</SectionTitle>
      <DefBox label="FMN — Firme Multinationale" color="blue">
        Entreprise possédant des <strong style={{ color: "#7EB8FF" }}>filiales dans plusieurs pays</strong>. ~60 000 FMN dans le monde contrôlent +500 000 filiales et assurent plus de 50 % des échanges mondiaux.
      </DefBox>
      <DefBox label="DIPP — Décomposition Internationale du Processus de Production" color="teal">
        Les différentes étapes de production (conception, fabrication, marketing) sont réalisées dans <strong style={{ color: "#5DCAA5" }}>plusieurs pays différents</strong>, chacun exploitant ses avantages comparatifs. Les biens intermédiaires représentaient <strong style={{ color: "#5DCAA5" }}>40 % des exportations mondiales</strong> (OMC, 2016).
      </DefBox>
      <DefBox label="Chaîne de valeur mondiale (CVM)" color="green">
        Ensemble des étapes de production d'un bien ou service, <strong style={{ color: "#97C459" }}>réparties entre plusieurs pays</strong>, chacun se spécialisant dans l'étape où il dispose d'un avantage comparatif.<br /><br />
        La <strong style={{ color: "#97C459" }}>courbe du sourire</strong> (Stan Shih, 1992) illustre la répartition inégale de la valeur ajoutée : <strong style={{ color: "#97C459" }}>forte en amont</strong> (R&D, conception) et <strong style={{ color: "#97C459" }}>en aval</strong> (marketing, distribution), mais <strong style={{ color: "#97C459" }}>faible au stade de la fabrication</strong> → les pays développés se concentrent sur les extrémités, les pays à bas coûts sur la fabrication.<br /><br />
        Ex : l'iPhone est conçu en Californie, ses composants viennent du Japon, de Corée, de Taïwan — il est assemblé par Foxconn en Chine. Un produit « <strong style={{ color: "#97C459" }}>Made in Monde</strong> ».
      </DefBox>
      <DefBox label="Libre-échange vs Protectionnisme" color="coral">
        <strong style={{ color: "#F0997B" }}>Libre-échange :</strong> élimination de tous les obstacles aux échanges (droits de douane, quotas, normes).<br /><br />
        <strong style={{ color: "#F0997B" }}>Protectionnisme :</strong> barrières tarifaires ou non-tarifaires pour protéger la production nationale. Peut être éducateur (List), défensif ou stratégique.
      </DefBox>

      <SectionTitle>Mesure du commerce</SectionTitle>
      <NoteBox type="warn">
        ⚠️ <strong>Pourquoi mesurer en valeur ajoutée ?</strong> Avec les CVM fragmentées, un composant est comptabilisé à chaque passage de frontière (double comptage). En France, si les services représentent 16 % des exports en valeur brute, ils génèrent <strong>61 % de la VA exportée</strong> (INSEE). Le déficit américain avec la Chine est deux fois moins important en VA qu'en valeur brute.
      </NoteBox>
    </div>
  );
}

function StepCours() {
  return (
    <div>
      <SectionTitle>1. Pourquoi les pays échangent-ils ? Les théories traditionnelles</SectionTitle>
      <Accordion items={[
        {
          title: "Adam Smith — Avantages absolus (1776)",
          dotColor: "#5DCAA5",
          content: (
            <div>
              <strong style={{ color: "#e8e6df" }}>Idée :</strong> Chaque pays se spécialise là où il est le <strong style={{ color: "#5DCAA5" }}>plus productif en termes absolus</strong>. Le commerce est à somme positive.<br /><br />
              <strong style={{ color: "#e8e6df" }}>Limite :</strong> Que faire si un pays n'a <em>aucun</em> avantage absolu ? Il ne pourrait pas participer aux échanges. → Ricardo va résoudre ce problème.<br /><br />
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "8px 10px", borderLeft: "3px solid #5DCAA5", marginTop: 8, fontSize: 12 }}>
                🎯 La France produit le vin mieux que l'Angleterre ; l'Angleterre produit les textiles mieux que la France → chacun se spécialise, les deux y gagnent.
              </div>
            </div>
          ),
        },
        {
          title: "David Ricardo — Avantages comparatifs (1817)",
          dotColor: "#EF9F27",
          content: (
            <div>
              <strong style={{ color: "#e8e6df" }}>Idée centrale :</strong> Même si un pays est moins productif dans <em>tout</em>, il a toujours intérêt à se spécialiser là où son <strong style={{ color: "#EF9F27" }}>désavantage relatif est le plus faible</strong>. L'échange est TOUJOURS bénéfique.<br /><br />
              <strong style={{ color: "#e8e6df" }}>Mécanisme :</strong> On compare les <em>ratios</em> de productivité, pas les niveaux absolus.<br /><br />
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "8px 10px", borderLeft: "3px solid #EF9F27", marginTop: 8, fontSize: 12 }}>
                🎯 Le Portugal est meilleur dans les deux productions (vin et drap). Pourtant, il se spécialise dans le vin (avantage relatif plus fort), l'Angleterre dans le drap. Les deux y gagnent.
              </div>
            </div>
          ),
        },
        {
          title: "Théorème HOS — Dotations factorielles (Heckscher, Ohlin, Samuelson)",
          dotColor: "#AFA9EC",
          content: (
            <div>
              <strong style={{ color: "#e8e6df" }}>Question :</strong> D'où viennent les avantages comparatifs ? → Des <strong style={{ color: "#AFA9EC" }}>dotations en facteurs de production</strong>.<br /><br />
              <strong style={{ color: "#e8e6df" }}>Théorème H-O :</strong> Un pays exporte le bien qui utilise intensivement son facteur relativement abondant.<br /><br />
              <strong style={{ color: "#e8e6df" }}>Stolper-Samuelson :</strong> Le commerce enrichit le facteur abondant et appauvrit le facteur rare → explique la hausse des inégalités dans les pays développés.<br /><br />
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "8px 10px", borderLeft: "3px solid #AFA9EC", marginTop: 8, fontSize: 12 }}>
                🎯 La Chine (main-d'œuvre abondante) exporte des produits intensifs en travail. L'Allemagne (capital qualifié abondant) exporte des machines et voitures haut de gamme.
              </div>
            </div>
          ),
        },
        {
          title: "Paradoxe de Leontief (1953) — Les dotations technologiques",
          dotColor: "#F0997B",
          content: (
            <div>
              <strong style={{ color: "#e8e6df" }}>Le paradoxe :</strong> Leontief observe que les États-Unis (pays riche en capital) exportent des biens <em>intensifs en travail</em> — contrairement à ce que prédit HOS.<br /><br />
              <strong style={{ color: "#e8e6df" }}>Explication :</strong> HOS suppose des technologies identiques partout. Or les nations ont des <strong style={{ color: "#F0997B" }}>dotations technologiques différentes</strong>. En corrigeant par la productivité, le paradoxe disparaît.<br /><br />
              <strong style={{ color: "#e8e6df" }}>Leçon :</strong> Les avantages comparatifs naissent aussi du capital humain et de la R&D.
            </div>
          ),
        },
      ]} />

      <SectionTitle>2. Nouvelles théories — Le commerce entre pays similaires</SectionTitle>
      <NoteBox>
        💡 <strong>Limite des théories traditionnelles :</strong> Elles n'expliquent pas pourquoi la France et l'Allemagne s'échangent des voitures. Le commerce intrabranche représente pourtant +35 % du commerce mondial.
      </NoteBox>
      <Accordion items={[
        {
          title: "Paul Krugman — Économies d'échelle et différenciation (Nobel 2008)",
          dotColor: "#7EB8FF",
          content: (
            <div>
              <strong style={{ color: "#e8e6df" }}>Deux moteurs du commerce intrabranche :</strong><br /><br />
              <strong style={{ color: "#7EB8FF" }}>1. Économies d'échelle :</strong> en accédant au marché mondial, les firmes produisent plus, leurs coûts unitaires baissent → spécialisation sur des variétés.<br /><br />
              <strong style={{ color: "#7EB8FF" }}>2. Différenciation des produits :</strong> les consommateurs aiment la variété → les pays échangent des versions différentes du même produit.<br /><br />
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "8px 10px", borderLeft: "3px solid #7EB8FF", marginTop: 8, fontSize: 12 }}>
                🎯 <strong>Horizontale :</strong> Renault Clio vs VW Polo — même gamme, styles différents. <strong>Verticale :</strong> Peugeot 208 vs Ferrari — même catégorie (voiture), qualité très différente.
              </div>
            </div>
          ),
        },
        {
          title: "Marc Mélitz — Firmes hétérogènes (2003)",
          dotColor: "#97C459",
          content: (
            <div>
              <strong style={{ color: "#e8e6df" }}>Idée :</strong> Toutes les firmes ne sont pas identiques. Certaines sont très productives, d'autres moins.<br /><br />
              <strong style={{ color: "#97C459" }}>Mécanisme :</strong> Exporter coûte cher (transport, formalités). Seules les firmes les <strong style={{ color: "#97C459" }}>plus productives</strong> — les « happy few » — peuvent supporter ces coûts et exporter rentablement.<br /><br />
              <strong style={{ color: "#e8e6df" }}>Conséquence macro :</strong> L'ouverture commerciale réalloue vers les firmes les plus productives → la productivité moyenne augmente.<br /><br />
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "8px 10px", borderLeft: "3px solid #97C459", marginTop: 8, fontSize: 12 }}>
                🎯 En France, 9,3 % des entreprises exportent. Les 2/3 des exports sont réalisés par 1 % des exportateurs : LVMH, Airbus, TotalEnergies, Hermès.
              </div>
            </div>
          ),
        },
      ]} />

      <SectionTitle>3. FMN, CVM et courbe du sourire</SectionTitle>
      <SmileCurve />
      <CardGrid cards={[
        { badge: "IDE Verticaux", title: "Fragmentation de la chaîne", text: "Chaque étape localisée dans le pays au meilleur avantage comparatif. Ex : Apple conçoit en Californie, assemble via Foxconn à Taïwan.", badgeColor: "#7EB8FF" },
        { badge: "IDE Horizontaux", title: "Proximité des marchés", text: "Réplication de la production dans plusieurs pays. Ex : Renault produit en France, Roumanie (Dacia), Chine, Amérique du Sud.", badgeColor: "#5DCAA5" },
        { badge: "Externalisation", title: "Sous-traitance internationale", text: "La firme confie des étapes à des entreprises indépendantes. Ex : Nike conçoit aux USA, fabrication sous-traitée en Indonésie.", badgeColor: "#AFA9EC" },
      ]} />
    </div>
  );
}

function StepMecanismes() {
  return (
    <div>
      <SectionTitle>Mécanisme 1 — Les 4 canaux de baisse des prix</SectionTitle>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "1.2rem", marginBottom: "1rem" }}>
        {[
          { num: "1", label: "Spécialisation selon les avantages comparatifs", text: "Meilleure allocation des ressources → coûts de production plus faibles", color: "#5DCAA5" },
          { num: "2", label: "Économies d'échelle internes", text: "Les firmes accèdent au marché mondial → produisent plus → coût unitaire baisse", color: "#7EB8FF" },
          { num: "3", label: "Économies d'agglomération (Marshall, 1920)", text: "Concentration de firmes → externalités positives. Ex : Silicon Valley, cluster aéronautique de Toulouse", color: "#AFA9EC" },
          { num: "4", label: "Pression concurrentielle", text: "La concurrence internationale pousse à innover et réduire les coûts → gains de productivité", color: "#D4A017" },
        ].map((c, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: "#0d1b2a", flexShrink: 0 }}>{c.num}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: c.color, fontFamily: "Space Grotesk, sans-serif", marginBottom: 2 }}>{c.label}</div>
              <div style={{ fontSize: 12, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif" }}>{c.text}</div>
            </div>
          </div>
        ))}
        <div style={{ fontSize: 12, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", marginTop: 8 }}>
          🎯 Un jean Levi's serait 3× plus cher s'il était fabriqué entièrement aux États-Unis.
        </div>
      </div>

      <SectionTitle>Mécanisme 2 — Commerce et inégalités (la courbe de l'éléphant)</SectionTitle>
      <CardGrid cards={[
        { badge: "Entre pays → ↓ inégalités", title: "Rattrapage des émergents", text: "Les pays émergents (Chine, Inde) s'intègrent dans les CVM et connaissent un rattrapage. Milanovic : les revenus du 8e décile chinois ont rejoint ceux du 2e décile américain en 20 ans.", badgeColor: "#5DCAA5" },
        { badge: "Dans les pays → ↑ inégalités", title: "Stagnation des classes moyennes", text: "Stolper-Samuelson : baisse demande travail non qualifié dans pays développés. Feenstra & Hanson : délocalisation tâches intensives en travail peu qualifié. Effet superstar (Rosen, 1981).", badgeColor: "#F0997B" },
      ]} />
      <NoteBox type="actu">
        📊 <strong>Courbe de l'éléphant (Milanovic, 2019) :</strong> entre 1988 et 2011, les classes moyennes des émergents ont vu leurs revenus bondir (+75 %), mais les classes moyennes des pays développés ont stagné (le « ventre » de l'éléphant). Ce phénomène alimente le vote populiste et le protectionnisme.
      </NoteBox>

      <SectionTitle>Mécanisme 3 — Libre-échange vs Protectionnisme</SectionTitle>
      <CompareTable
        headers={["Critère", "🟢 Libre-échange", "🔴 Protectionnisme"]}
        rows={[
          ["Prix", "Baisse (concurrence, écon. d'échelle)", "Hausse (produits importés plus chers)"],
          ["Variété", "Plus grande diversité pour les consommateurs", "Réduite (moins de concurrence)"],
          ["Emploi", "Réallocation vers les firmes productives", "Protection temporaire secteurs en déclin"],
          ["Inégalités", "Réduction entre pays / hausse dans les pays", "Peut atténuer certaines inégalités internes"],
          ["Innovation", "Concurrence stimule l'innovation", "Risque d'industrie protégée moins innovante"],
          ["Limites", "Perdants de la mondialisation, environnement", "Guerre commerciale, lobbying, CVM"],
        ]}
      />

      <SectionTitle>Mécanisme 4 — Les institutions du libre-échange</SectionTitle>
      <Accordion items={[
        { title: "1947 — GATT (General Agreement on Tariffs and Trade)", dotColor: "#7EB8FF", content: <div>Accord multilatéral visant à réduire les droits de douane. Clauses clés : <strong style={{ color: "#e8e6df" }}>« nation la plus favorisée »</strong>, <strong style={{ color: "#e8e6df" }}>« égalité de traitement »</strong>. A permis une réduction spectaculaire des barrières tarifaires.</div> },
        { title: "1995 — OMC (Organisation Mondiale du Commerce)", dotColor: "#5DCAA5", content: <div>Succède au GATT. Intègre un <strong style={{ color: "#e8e6df" }}>Organe de Règlement des Différends (ORD)</strong> pour arbitrer les conflits commerciaux. 166 membres en 2024. Mise sous pression par le protectionnisme américain de 2025.</div> },
        { title: "1957 → aujourd'hui — Union Européenne", dotColor: "#D4A017", content: <div>Zone de libre-échange et <strong style={{ color: "#e8e6df" }}>union douanière</strong> (tarif extérieur commun). Marché unique de 450 millions de consommateurs. Principal exemple de régionalisation commerciale réussie.</div> },
        { title: "2025 — Guerre commerciale Trump", dotColor: "#F0997B", content: <div>145 % de droits de douane sur les produits chinois. Taux moyen américain : ~24 % (plus haut depuis 1930). <strong style={{ color: "#e8e6df" }}>Illustration parfaite de l'absurdité du protectionnisme dans un monde de CVM :</strong> taxer les imports = taxer sa propre industrie. Tesla importe des batteries chinoises...</div> },
      ]} />
    </div>
  );
}

function StepErreurs() {
  const errors = [
    { wrong: "« Avantage absolu et avantage comparatif, c'est la même chose »", right: "L'avantage absolu (Smith) = meilleur coût en valeur absolue. L'avantage comparatif (Ricardo) = meilleur coût relatif. Ricardo montre qu'un pays sans aucun avantage absolu peut quand même gagner à l'échange.", color: "#F0997B" },
    { wrong: "« Le commerce intrabranche, c'est le commerce au sein d'une même branche française »", right: "Le commerce intrabranche désigne des échanges ENTRE PAYS de produits similaires. La France exporte des Peugeot et importe des BMW = commerce intrabranche automobile.", color: "#EF9F27" },
    { wrong: "« La courbe du sourire montre que le commerce rend heureux »", right: "La courbe du sourire (Stan Shih, 1992) représente la répartition de la VA sur la chaîne de valeur : forte en amont (R&D) et en aval (marketing), faible au stade de la fabrication.", color: "#AFA9EC" },
    { wrong: "« La mondialisation réduit toutes les inégalités »", right: "La mondialisation réduit les inégalités ENTRE pays (rattrapage des émergents) mais augmente les inégalités AU SEIN de chaque pays (stagnation des classes moyennes des pays développés). C'est le résultat paradoxal de Milanovic.", color: "#7EB8FF" },
    { wrong: "« Le protectionnisme éducateur, c'est protéger toutes les industries pour toujours »", right: "Le protectionnisme éducateur (List) est TEMPORAIRE : il protège les industries naissantes le temps qu'elles deviennent compétitives. La protection doit être levée ensuite, sinon elle devient néfaste.", color: "#97C459" },
    { wrong: "« Les FMN assurent tout le commerce mondial »", right: "Les FMN assurent plus de 50 % des échanges mondiaux — pas la totalité. 30 % du commerce mondial est intra-firme (entre filiales d'un même groupe), ce qui est distinct du commerce inter-firmes.", color: "#5DCAA5" },
  ];
  return (
    <div>
      <div style={{ fontSize: 14, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: "1.5rem" }}>Les confusions les plus fréquentes relevées dans les copies de bac.</div>
      {errors.map((e, i) => (
        <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px 16px", marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>✗</span>
            <div style={{ fontSize: 13, color: "#F0997B", fontFamily: "Space Grotesk, sans-serif", fontStyle: "italic" }}>{e.wrong}</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <span style={{ fontSize: 16, flexShrink: 0, color: e.color }}>✓</span>
            <div style={{ fontSize: 13, color: "#d0cfc8", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.6 }}>{e.right}</div>
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
    if (idx === QUIZ[qi].correct) setScore((s) => s + 1);
  }
  function next() {
    if (qi + 1 >= QUIZ.length) setDone(true);
    else { setQi((q) => q + 1); setAnswered(false); setChosen(null); }
  }
  function reset() { setQi(0); setScore(0); setAnswered(false); setChosen(null); setDone(false); }

  if (done) {
    const pct = Math.round((score / QUIZ.length) * 100);
    const col = pct >= 75 ? "#97C459" : pct >= 50 ? "#EF9F27" : "#F0997B";
    const msg = pct >= 75 ? "🎉 Excellent ! Tu maîtrises bien le commerce international." : pct >= 50 ? "👍 Bon début — revois les théories de Krugman et Mélitz." : "📚 Reprends les étapes Cours et Mécanismes avant de réessayer.";
    return (
      <div style={{ textAlign: "center" as const, padding: "3rem 1rem" }}>
        <div style={{ fontSize: 56, fontWeight: 700, color: col, fontFamily: "Syne, sans-serif", marginBottom: 12 }}>{score}/{QUIZ.length}</div>
        <div style={{ fontSize: 15, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: "2rem" }}>{msg}</div>
        <button onClick={reset} style={{ background: "#D4A017", color: "#0d1b2a", border: "none", borderRadius: 8, padding: "10px 24px", fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Recommencer</button>
      </div>
    );
  }

  const q = QUIZ[qi];
  return (
    <div>
      <div style={{ fontSize: 12, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", marginBottom: 12 }}>Question {qi + 1} sur {QUIZ.length} · Score : {score}/{qi}</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: "#e8e6df", fontFamily: "Space Grotesk, sans-serif", marginBottom: 16, lineHeight: 1.5 }}>{q.q}</div>
      <div style={{ display: "grid", gap: 8, marginBottom: "1rem" }}>
        {q.opts.map((opt, i) => {
          let bg = "rgba(255,255,255,0.04)", border = "rgba(255,255,255,0.08)", color = "#d0cfc8";
          if (answered) {
            if (i === q.correct) { bg = "rgba(151,196,89,0.15)"; border = "#97C459"; color = "#97C459"; }
            else if (i === chosen) { bg = "rgba(240,153,123,0.15)"; border = "#F0997B"; color = "#F0997B"; }
          }
          return (
            <button key={i} onClick={() => answer(i)} disabled={answered} style={{ textAlign: "left" as const, padding: "12px 14px", border: `1px solid ${border}`, borderRadius: 8, background: bg, color, fontFamily: "Space Grotesk, sans-serif", fontSize: 13, cursor: answered ? "default" : "pointer", transition: "all 0.15s" }}>{opt}</button>
          );
        })}
      </div>
      {answered && <div style={{ background: "#2a1d09", border: "1px solid #EF9F27", borderRadius: 8, padding: "12px 14px", fontSize: 13, color: "#EF9F27", lineHeight: 1.7, fontFamily: "Space Grotesk, sans-serif", marginBottom: "1rem" }}>{q.fb}</div>}
      {answered && <div style={{ textAlign: "right" as const }}><button onClick={next} style={{ background: "#D4A017", color: "#0d1b2a", border: "none", borderRadius: 8, padding: "9px 20px", fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{qi === QUIZ.length - 1 ? "Voir mon résultat" : "Question suivante →"}</button></div>}
    </div>
  );
}

function StepSujets() {
  const sujets = [
    { type: "Dissertation", title: "Le libre-échange est-il toujours bénéfique ?", hint: "Thèse : gains à l'échange (Ricardo, Krugman, baisse des prix). Antithèse : perdants (Stolper-Samuelson, classes moyennes). Synthèse : institutions nécessaires + protectionnisme éducateur légitime.", color: "#7EB8FF" },
    { type: "Dissertation", title: "Dans quelle mesure l'internationalisation de la production modifie-t-elle les échanges mondiaux ?", hint: "Thèse : DIPP, CVM, FMN, IDE. Antithèse : mesure en VA, commerce intra-firme. Synthèse : nouveau capitalisme mondial inégalement réparti (courbe du sourire).", color: "#5DCAA5" },
    { type: "EC3", title: "À l'aide du dossier documentaire, vous montrerez que le commerce international est source de gains mais aussi d'inégalités.", hint: "Axe 1 : gains (baisse des prix, variété, productivité). Axe 2 : inégalités (Stolper-Samuelson, courbe éléphant). Attentes : 2 axes avec chiffres.", color: "#EF9F27" },
    { type: "EC3", title: "Vous analyserez les fondements et les limites du protectionnisme dans le contexte économique actuel.", hint: "Protectionnisme éducateur (List), stratégique (Brander & Spencer), défensif. Limites : guerre commerciale, CVM, lobbying. Actualité 2025 (Trump) incontournable.", color: "#AFA9EC" },
    { type: "EC2 — Mobilisation", title: "À l'aide de vos connaissances, expliquez pourquoi les firmes les plus productives sont les seules à exporter (Mélitz).", hint: "Définition firmes hétérogènes, coûts à l'exportation, sélection des 'happy few', conséquence macro (↑ productivité moyenne). 6–8 lignes.", color: "#97C459" },
    { type: "EC2 — Mobilisation", title: "Présentez les deux théories qui expliquent le commerce intrabranche.", hint: "Krugman (écon. d'échelle + différenciation horizontale/verticale) + Mélitz (firmes hétérogènes). Exemples automobiles.", color: "#F0997B" },
  ];
  return (
    <div>
      <div style={{ fontSize: 14, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: "1.5rem" }}>Sujets tombés ou très probables d'après l'analyse du programme et des annales.</div>
      {sujets.map((s, i) => (
        <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}44`, borderLeft: `3px solid ${s.color}`, borderRadius: 10, padding: "14px 16px", marginBottom: "0.75rem" }}>
          <div style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: s.color, marginBottom: 6, fontFamily: "Space Grotesk, sans-serif", textTransform: "uppercase" as const }}>{s.type}</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#e8e6df", fontFamily: "Space Grotesk, sans-serif", marginBottom: 8, lineHeight: 1.4 }}>{s.title}</div>
          <div style={{ fontSize: 12, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.5 }}>💡 {s.hint}</div>
        </div>
      ))}
    </div>
  );
}

function StepMethode() {
  return (
    <div>
      <SectionTitle>Méthode EC2 — Mobilisation des connaissances</SectionTitle>
      <NoteBox>💡 L'exercice EC2 mobilisation demande d'expliquer un mécanisme en 6–8 lignes, sans document. Définition → mécanisme → exemple chiffré → nuance.</NoteBox>
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#D4A017", fontFamily: "Space Grotesk, sans-serif", marginBottom: 10 }}>Sujet-type : « Expliquez l'avantage comparatif de Ricardo »</div>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "16px", fontFamily: "Space Grotesk, sans-serif" }}>
          {[
            { step: "① Définir le concept", color: "#7EB8FF", text: "L'avantage comparatif, théorisé par David Ricardo dans Des principes de l'économie politique et de l'impôt (1817), désigne la situation où un pays a intérêt à se spécialiser dans la production pour laquelle son coût relatif est le plus faible, même s'il est moins productif que ses partenaires dans tous les secteurs." },
            { step: "② Expliquer le mécanisme", color: "#5DCAA5", text: "Contrairement à Smith qui raisonnait en avantages absolus, Ricardo compare des ratios de productivité. Si le Portugal produit 80 unités de vin et 90 unités de drap avec un travailleur, contre 120 et 100 pour l'Angleterre, le Portugal est plus efficace dans les deux. Pourtant, il se spécialise dans le vin (son avantage relatif le plus fort), l'Angleterre dans le drap (son désavantage relatif le plus faible). Les deux y gagnent." },
            { step: "③ Illustrer avec un exemple actuel", color: "#EF9F27", text: "Le Bangladesh se spécialise dans le textile, non pas parce qu'il est le plus productif, mais parce que son désavantage relatif y est le plus faible face à des pays comme la France. En 2025, le secteur textile-habillement représente 84 % de ses exportations (OMC). La France, elle, se spécialise dans l'aéronautique, le luxe et l'agroalimentaire — ses avantages relatifs." },
            { step: "④ Nuancer", color: "#AFA9EC", text: "Le modèle de Ricardo suppose un facteur unique (travail) et des avantages comparatifs stables. Or, la Corée du Sud illustre que ceux-ci peuvent évoluer grâce à l'investissement en R&D et en capital humain — passant du textile (1967) à l'électronique de pointe (2025)." },
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
          { num: "I", title: "Les fondements théoriques du commerce international", color: "#7EB8FF", sous: ["A. Les théories traditionnelles : avantages comparatifs (Ricardo) et dotations factorielles (HOS)", "B. Les nouvelles théories : économies d'échelle et commerce intrabranche (Krugman)", "C. Les firmes hétérogènes : les 'happy few' de l'exportation (Mélitz)"] },
          { num: "II", title: "Les effets ambivalents de la mondialisation", color: "#F0997B", sous: ["A. Des gains à l'échange : baisse des prix, variété, gains de productivité", "B. Des inégalités croissantes au sein des pays (Stolper-Samuelson, courbe de l'éléphant)", "C. Des transformations profondes de la production (DIPP, CVM, courbe du sourire)"] },
          { num: "III", title: "Le débat libre-échange vs protectionnisme", color: "#97C459", sous: ["A. Les justifications économiques du protectionnisme (List, Brander & Spencer)", "B. Les limites du protectionnisme dans un monde de CVM fragmentées", "C. Le rôle des institutions internationales (OMC) et régionales (UE)"] },
        ].map((part, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${part.color}44`, borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: part.color, fontFamily: "Space Grotesk, sans-serif", marginBottom: 8 }}>{part.num}. {part.title}</div>
            {part.sous.map((s, j) => <div key={j} style={{ fontSize: 12, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: 4, paddingLeft: 12 }}>{["A", "B", "C"][j]}. {s}</div>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepMemo() {
  return (
    <div style={{ textAlign: "center" as const, padding: "2rem 0" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: "#e8e6df", fontFamily: "Syne, sans-serif", marginBottom: 8 }}>Fiche mémo PDF</div>
      <div style={{ fontSize: 14, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", maxWidth: 380, margin: "0 auto 2rem" }}>La synthèse condensée du chapitre en une page A4, à imprimer avant le bac.</div>
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "1.5rem", maxWidth: 400, margin: "0 auto 1.5rem", textAlign: "left" as const }}>
        <div style={{ fontSize: 12, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", marginBottom: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>Contenu de la fiche</div>
        {["Toutes les définitions clés (Ricardo, HOS, Krugman, Mélitz)", "La courbe du sourire (Shih, 1992) — schéma", "Tableau libre-échange vs protectionnisme", "Auteurs et notions incontournables", "Données chiffrées (OMC, INSEE, CEPII)", "Actualité 2025 — guerre commerciale Trump"].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "#d0cfc8", fontFamily: "Space Grotesk, sans-serif", marginBottom: 6 }}>
            <span style={{ color: "#5DCAA5" }}>✓</span>{item}
          </div>
        ))}
      </div>
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 28px", display: "inline-block", color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", fontSize: 14 }}>
        📥 Fiche mémo PDF — bientôt disponible
      </div>
      <div style={{ fontSize: 12, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", marginTop: 10 }}>En cours de production</div>
    </div>
  );
}

function StepRessources() {
  return (
    <div>
      <div style={{ fontSize: 14, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: "1.5rem" }}>Ressources complémentaires pour approfondir et mémoriser le chapitre.</div>
      {/* VIDÉO */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#7EB8FF", fontFamily: "Space Grotesk, sans-serif", textTransform: "uppercase" as const, marginBottom: 8 }}>
          🎬 Cours vidéo — Commerce international
        </div>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(126,184,255,0.2)" }}>
          <iframe
            src="https://www.youtube.com/embed/d-ta5OFfNT0"
            title="Cours vidéo — Commerce international — CapSES"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {[
          { icon: "🗺️", label: "Carte mentale", desc: "La vidéo de révision sur le commerce international sera disponible prochainement.", color: "#7EB8FF" },
          { icon: "🗺️", label: "Carte mentale", desc: "Visualise toutes les connexions entre les théories du chapitre.", color: "#D4A017" },
          { icon: "📊", label: "Infographie", desc: "La courbe du sourire, la courbe de l'éléphant et les CVM en un coup d'œil.", color: "#5DCAA5" },
          { icon: "📝", label: "Synthèse NotebookLM", desc: "La synthèse magistrale générée par IA à partir du cours complet.", color: "#AFA9EC" },
        ].map((r, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${r.color}33`, borderRadius: 12, padding: "1.25rem", textAlign: "center" as const, opacity: 0.6 }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>{r.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: r.color, fontFamily: "Space Grotesk, sans-serif", marginBottom: 6 }}>{r.label}</div>
            <div style={{ fontSize: 12, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.5, marginBottom: 10 }}>{r.desc}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" as const, background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "3px 10px", display: "inline-block" }}>Bientôt disponible</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderStep(id: StepId) {
  switch (id) {
    case "savoir":     return <StepSavoir />;
    case "notions":    return <StepNotions />;
    case "cours":      return <StepCours />;
    case "mecanismes": return <StepMecanismes />;
    case "erreurs":    return <StepErreurs />;
    case "quiz":       return <StepQuiz />;
    case "sujets":     return <StepSujets />;
    case "methode":    return <StepMethode />;
    case "memo":       return <StepMemo />;
    case "ressources": return <StepRessources />;
  }
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function CommerceInternationalPage() {
  const [active, setActive] = useState<StepId>("savoir");
  const isMobile = useIsMobile();
  const currentStep = STEPS.find((s) => s.id === active)!;

  return (
    <div style={{ minHeight: "100vh", background: "#0d1b2a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

        strong { font-weight: 600; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .hide-sb { -ms-overflow-style:none; scrollbar-width:none; }
        .hide-sb::-webkit-scrollbar { display:none; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(13,27,42,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 1.5rem", height: 56, display: "flex", alignItems: "center", gap: 16 }}>
        <a href="/" style={{ fontSize: 18, fontWeight: 800, fontFamily: "Syne, sans-serif", color: "#D4A017", textDecoration: "none" }}>CapSES</a>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
        <span style={{ fontSize: 13, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif" }}>Terminale</span>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
        <span style={{ fontSize: 13, color: "#d0cfc8", fontFamily: "Space Grotesk, sans-serif" }}>Commerce international</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#D4A017", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 11, color: "#D4A017", fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}>{STEPS.findIndex((s) => s.id === active) + 1}/{STEPS.length}</span>
        </div>
      </nav>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #0a2236 0%, #0d1b2a 60%, #0a1a2a 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "2rem 1.5rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle, rgba(126,184,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", padding: "3px 10px", borderRadius: 20, background: "rgba(126,184,255,0.15)", color: "#7EB8FF", border: "1px solid rgba(126,184,255,0.3)", marginBottom: 10, fontFamily: "Space Grotesk, sans-serif", textTransform: "uppercase" as const }}>Économie · Terminale SES</div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, fontFamily: "Syne, sans-serif", color: "#f0ece0", margin: 0, lineHeight: 1.2, marginBottom: 8 }}>
            Quels sont les fondements du commerce international<br />et de l'internationalisation de la production ?
          </h1>
          <div style={{ fontSize: 13, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif" }}>Programme Éduscol 2020 · 10 étapes de révision · Actualisé 2025</div>
        </div>
      </div>

      {/* MOBILE TABS */}
      <div className="hide-sb" style={{ display: "flex", overflowX: "auto", gap: 6, padding: "0.75rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
        {STEPS.map((s) => (
          <button key={s.id} onClick={() => setActive(s.id)} style={{ flexShrink: 0, padding: "6px 12px", borderRadius: 8, border: `1px solid ${active === s.id ? s.color : "rgba(255,255,255,0.08)"}`, background: active === s.id ? `${s.color}22` : "transparent", color: active === s.id ? s.color : "#5a5955", fontSize: 12, fontWeight: active === s.id ? 700 : 400, cursor: "pointer", fontFamily: "Space Grotesk, sans-serif", whiteSpace: "nowrap" as const }}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* LAYOUT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "240px 1fr", minHeight: "calc(100vh - 200px)" }}>
        {/* SIDEBAR */}
        <aside style={{ display: isMobile ? "none" : "block", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "1.5rem 1rem", position: "sticky", top: 56, height: "calc(100vh - 56px)", overflowY: "auto" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", textTransform: "uppercase" as const, marginBottom: 12 }}>Étapes du chapitre</div>
          {STEPS.map((s) => {
            const isActive = active === s.id;
            const done = STEPS.findIndex((x) => x.id === s.id) < STEPS.findIndex((x) => x.id === active);
            return (
              <button key={s.id} onClick={() => setActive(s.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${isActive ? s.color + "44" : "transparent"}`, background: isActive ? `${s.color}15` : "transparent", color: isActive ? s.color : done ? "#5DCAA5" : "#5a5955", fontSize: 13, fontWeight: isActive ? 700 : 400, cursor: "pointer", textAlign: "left" as const, fontFamily: "Space Grotesk, sans-serif", marginBottom: 2, transition: "all 0.15s" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: isActive ? s.color : done ? "rgba(93,202,165,0.2)" : "rgba(255,255,255,0.05)", border: `1px solid ${isActive ? s.color : done ? "#5DCAA5" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: isActive ? "#0d1b2a" : done ? "#5DCAA5" : "#5a5955", flexShrink: 0 }}>
                  {done && !isActive ? "✓" : s.num}
                </div>
                <span style={{ lineHeight: 1.3 }}>{s.label}</span>
              </button>
            );
          })}
          <div style={{ marginTop: "1.5rem", padding: "0 4px" }}>
            <div style={{ fontSize: 11, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", marginBottom: 6 }}>Progression</div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", background: "linear-gradient(90deg, #5DCAA5, #D4A017)", borderRadius: 2, width: `${((STEPS.findIndex((s) => s.id === active) + 1) / STEPS.length) * 100}%`, transition: "width 0.4s ease" }} />
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <main style={{ padding: isMobile ? "1rem 1rem 3rem" : "2rem 2rem 4rem", minWidth: 0 }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <span style={{ fontSize: 24 }}>{currentStep.icon}</span>
              <h2 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 700, fontFamily: "Syne, sans-serif", color: currentStep.color, margin: 0 }}>{currentStep.label}</h2>
              <div style={{ marginLeft: "auto", fontSize: 11, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 6, padding: "2px 8px" }}>{currentStep.num} / 10</div>
            </div>
            <div style={{ height: 2, background: `linear-gradient(90deg, ${currentStep.color}44, transparent)` }} />
          </div>

          {renderStep(active)}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            {STEPS.findIndex((s) => s.id === active) > 0 ? (
              <button onClick={() => { const idx = STEPS.findIndex((s) => s.id === active); setActive(STEPS[idx - 1].id); window.scrollTo(0, 0); }} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "9px 18px", color: "#d0cfc8", fontFamily: "Space Grotesk, sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>← Étape précédente</button>
            ) : <div />}
            {STEPS.findIndex((s) => s.id === active) < STEPS.length - 1 && (
              <button onClick={() => { const idx = STEPS.findIndex((s) => s.id === active); setActive(STEPS[idx + 1].id); window.scrollTo(0, 0); }} style={{ background: currentStep.color, border: "none", borderRadius: 8, padding: "9px 18px", color: "#0d1b2a", fontFamily: "Space Grotesk, sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Étape suivante →</button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
