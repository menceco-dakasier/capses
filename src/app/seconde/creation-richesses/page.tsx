"use client";

import React, { useState, useEffect } from "react";

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

// ── Palette Néon Soft ──────────────────────────────────────────────
const N = {
  bg:        "#12112A",
  bgCard:    "rgba(255,255,255,0.04)",
  bgCardMd:  "rgba(255,255,255,0.07)",
  border:    "rgba(255,255,255,0.09)",
  text:      "#E0D9FF",
  muted:     "rgba(224,217,255,0.45)",
  violet:    "#C4B8FF",
  violetBg:  "rgba(106,90,205,0.15)",
  violetBd:  "rgba(106,90,205,0.35)",
  cyan:      "#7EEEFF",
  cyanBg:    "rgba(30,80,100,0.35)",
  cyanBd:    "rgba(126,238,255,0.3)",
  ambre:     "#FFD580",
  ambreBg:   "rgba(100,80,20,0.35)",
  ambreBd:   "rgba(255,213,128,0.3)",
  rose:      "#FFB3C6",
  roseBg:    "rgba(130,30,60,0.3)",
  roseBd:    "rgba(255,179,198,0.3)",
  vert:      "#90EE90",
  vertBg:    "rgba(20,80,20,0.3)",
  vertBd:    "rgba(144,238,144,0.3)",
  accent:    "#6A5ACD",
};

// ── Types ────────────────────────────────────────────────────────
type StepId =
  | "objectifs"
  | "questionnement"
  | "notions"
  | "cours"
  | "donnees"
  | "erreurs"
  | "quiz"
  | "memo";

interface Step {
  id: StepId;
  num: number;
  label: string;
  icon: string;
  color: string;
}

const STEPS: Step[] = [
  { id: "objectifs",      num: 1, label: "Objectifs",              icon: "🎯", color: N.violet },
  { id: "questionnement", num: 2, label: "Questionnement",         icon: "❓", color: N.cyan },
  { id: "notions",        num: 3, label: "Notions clés",           icon: "📚", color: N.ambre },
  { id: "cours",          num: 4, label: "Cours",                  icon: "📖", color: N.rose },
  { id: "donnees",        num: 5, label: "Données & savoir-faire", icon: "📊", color: N.vert },
  { id: "erreurs",        num: 6, label: "Erreurs fréquentes",     icon: "⚠️", color: N.violet },
  { id: "quiz",           num: 7, label: "Quiz",                   icon: "🧠", color: N.cyan },
  { id: "memo",           num: 8, label: "Fiche mémo",             icon: "📝", color: N.ambre },
];

// ── Quiz data ────────────────────────────────────────────────────
const QUIZ_QUESTIONS = [
  {
    q: "Laquelle de ces activités EST comptabilisée comme production au sens économique ?",
    opts: ["Un parent prépare le repas pour sa famille", "Un bénévole aide dans une association", "Une boulangerie vend des croissants", "Un jardinier entretient son propre jardin"],
    correct: 2,
    fb: "Seule la boulangerie réalise une production au sens économique : biens créés et vendus sur un marché. Le travail domestique et le bénévolat ne donnent pas lieu à une transaction marchande rémunérée.",
  },
  {
    q: "Un lycée public propose des cours gratuits. Quelle est la nature de cette production ?",
    opts: ["Production marchande, car elle a de la valeur", "Production non marchande, fournie gratuitement", "Ce n'est pas une production car il n'y a pas de profit", "Production marchande indirecte"],
    correct: 1,
    fb: "La production non marchande est fournie gratuitement ou à un prix couvrant moins de 50 % des coûts. Le lycée public est financé par les prélèvements obligatoires.",
  },
  {
    q: "Une coopérative agricole qui réinvestit ses bénéfices et fonctionne démocratiquement relève de :",
    opts: ["Une entreprise privée classique", "Une administration publique", "L'Économie Sociale et Solidaire (ESS)", "Une multinationale"],
    correct: 2,
    fb: "L'ESS regroupe les coopératives, mutuelles, associations et fondations dont le fonctionnement repose sur la solidarité et l'utilité sociale. Les bénéfices y sont réinvestis.",
  },
  {
    q: "Une entreprise a un CA de 200 000 € et des consommations intermédiaires de 80 000 €. Sa valeur ajoutée est :",
    opts: ["280 000 €", "200 000 €", "120 000 €", "80 000 €"],
    correct: 2,
    fb: "VA = Chiffre d'affaires − Consommations intermédiaires = 200 000 − 80 000 = 120 000 €. La VA mesure la richesse réellement créée par l'entreprise.",
  },
  {
    q: "Pourquoi calcule-t-on le PIB en additionnant les valeurs ajoutées plutôt que les chiffres d'affaires ?",
    opts: ["Car les CA sont difficiles à collecter", "Pour éviter de compter plusieurs fois les mêmes richesses", "Car les VA sont toujours plus grandes", "Par convention sans justification économique"],
    correct: 1,
    fb: "Additionner les CA provoquerait des doubles comptages : la farine apparaît dans le CA du meunier ET du boulanger. La VA évite ce problème en ne retenant que la richesse ajoutée à chaque étape.",
  },
  {
    q: "Les « Trente Glorieuses » (1945-1973) se caractérisent par :",
    opts: ["Une croissance faible d'environ 0,5 % par an", "Une période de décroissance", "Une forte croissance entre 4 et 7 % par an", "Une stagnation du PIB mondial"],
    correct: 2,
    fb: "Les Trente Glorieuses (expression de Jean Fourastié) désignent la période 1945-1973 avec une croissance exceptionnelle de 4 à 7 % par an dans les pays développés.",
  },
  {
    q: "Lequel illustre une limite ÉCOLOGIQUE de la croissance ?",
    opts: ["Le PIB ne tient pas compte des inégalités", "L'augmentation des émissions de CO₂ liée à l'activité industrielle", "Le travail domestique n'est pas dans le PIB", "Le PIB par habitant est une moyenne"],
    correct: 1,
    fb: "Les limites écologiques renvoient aux externalités négatives : épuisement des ressources, GES, déforestation, perte de biodiversité. Les autres propositions sont des limites sociales ou statistiques du PIB.",
  },
  {
    q: "La croissance économique est définie comme :",
    opts: ["L'augmentation du nombre d'habitants", "La hausse des prix à la consommation", "L'augmentation soutenue du PIB en volume sur une longue période", "La réduction des inégalités grâce au développement"],
    correct: 2,
    fb: "Définition de François Perroux : « l'augmentation soutenue, pendant une ou plusieurs périodes longues, d'un indicateur de dimension — pour une nation, le produit global en termes réels ». Mesurée par le taux de variation du PIB en VOLUME.",
  },
];

// ── Composants UI réutilisables ─────────────────────────────────

function DefBox({
  label,
  children,
  color = "violet",
}: {
  label: string;
  children: React.ReactNode;
  color?: "violet" | "cyan" | "ambre" | "rose" | "vert";
}) {
  const palettes = {
    violet: { bg: N.violetBg, border: N.violetBd, labelCol: N.violet },
    cyan:   { bg: N.cyanBg,   border: N.cyanBd,   labelCol: N.cyan },
    ambre:  { bg: N.ambreBg,  border: N.ambreBd,  labelCol: N.ambre },
    rose:   { bg: N.roseBg,   border: N.roseBd,   labelCol: N.rose },
    vert:   { bg: N.vertBg,   border: N.vertBd,   labelCol: N.vert },
  };
  const p = palettes[color];
  return (
    <div style={{ background: p.bg, border: `1px solid ${p.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: "1rem" }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: p.labelCol, marginBottom: 6, textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" }}>
        {label}
      </div>
      <div style={{ fontSize: 14, color: N.text, lineHeight: 1.7, fontFamily: "'Space Grotesk', sans-serif" }}>
        {children}
      </div>
    </div>
  );
}

function SectionTitle({ children, color = N.violet }: { children: React.ReactNode; color?: string }) {
  return (
    <div
      style={{
        fontSize: 14,
        fontWeight: 700,
        color,
        borderLeft: `3px solid ${color}`,
        paddingLeft: 10,
        margin: "1.5rem 0 0.75rem",
        fontFamily: "'Space Grotesk', sans-serif",
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
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 8, marginBottom: "1rem" }}>
      {stats.map((s, i) => (
        <div key={i} style={{ background: N.bgCard, border: `1px solid ${N.border}`, borderRadius: 10, padding: "14px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: 6, fontFamily: "'Syne', sans-serif" }}>
            {s.num}
          </div>
          <div style={{ fontSize: 11, color: N.muted, lineHeight: 1.4, fontFamily: "'Space Grotesk', sans-serif" }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function CardGrid({ cards }: { cards: { icon?: string; badge: string; title: string; text: string; badgeColor: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: "1rem" }}>
      {cards.map((c, i) => (
        <div key={i} style={{ background: N.bgCard, border: `1px solid ${N.border}`, borderRadius: 10, padding: 14 }}>
          {c.icon && <div style={{ fontSize: 18, marginBottom: 6 }}>{c.icon}</div>}
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
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {c.badge}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: N.text, marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif" }}>
            {c.title}
          </div>
          <div style={{ fontSize: 12, color: N.muted, lineHeight: 1.5, fontFamily: "'Space Grotesk', sans-serif" }}>
            {c.text}
          </div>
        </div>
      ))}
    </div>
  );
}

function FormulaBox({ formula, note }: { formula: string; note?: string }) {
  return (
    <div style={{ background: N.ambreBg, border: `1px solid ${N.ambreBd}`, borderRadius: 10, padding: 14, textAlign: "center", marginBottom: "1rem" }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: N.ambre, fontFamily: "'Space Grotesk', sans-serif" }}>
        {formula}
      </div>
      {note && (
        <div style={{ fontSize: 12, color: N.muted, marginTop: 5, fontFamily: "'Space Grotesk', sans-serif" }}>
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
        background: isWarn ? N.roseBg : N.violetBg,
        border: `1px solid ${isWarn ? N.roseBd : N.violetBd}`,
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 13,
        color: isWarn ? N.rose : N.violet,
        marginBottom: "1rem",
        lineHeight: 1.6,
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {children}
    </div>
  );
}

// ── STEP CONTENTS ────────────────────────────────────────────────

function StepObjectifs() {
  return (
    <div>
      <DefBox color="violet" label="🔍 Prologue · Comment raisonnent les économistes ?">
        La science économique pose une question centrale : <strong style={{ color: N.violet }}>comment allouer des ressources rares entre des besoins illimités ?</strong> Les économistes formulent des hypothèses, construisent des modèles et les confrontent à des données empiriques. Ils distinguent causalité et corrélation.
      </DefBox>

      <SectionTitle color={N.cyan}>À la fin de cette fiche, tu sauras :</SectionTitle>
      {[
        ["Illustrer la diversité des producteurs", "(entreprises, administrations, ESS)"],
        ["Distinguer production marchande et non marchande", "(critère des 50 % des coûts)"],
        ["Expliquer la combinaison des facteurs de production", "(travail, capital, technologie, ressources naturelles)"],
        ["Calculer et interpréter", "CA, valeur ajoutée, bénéfice"],
        ["Comprendre le PIB", "= somme des valeurs ajoutées"],
        ["Expliquer la croissance économique", "= variation du PIB, tendances sur plusieurs siècles"],
        ["Identifier les limites du PIB", "(inégalités) et les limites écologiques de la croissance"],
      ].map(([titre, detail], i) => (
        <div key={i} style={{ display: "flex", gap: 10, padding: "9px 12px", background: N.bgCard, border: `1px solid ${N.border}`, borderRadius: 8, marginBottom: 6, alignItems: "flex-start" }}>
          <span style={{ width: 20, height: 20, borderRadius: "50%", background: N.violetBg, border: `1px solid ${N.violetBd}`, color: N.violet, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
            {i + 1}
          </span>
          <span style={{ fontSize: 13, color: N.text, lineHeight: 1.5, fontFamily: "'Space Grotesk', sans-serif" }}>
            <strong>{titre}</strong>
            <span style={{ color: N.muted }}> {detail}</span>
          </span>
        </div>
      ))}

      <div style={{ marginTop: 14, background: N.ambreBg, border: `1px solid ${N.ambreBd}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, color: N.ambre, fontFamily: "'Space Grotesk', sans-serif" }}>
        ⏱ Temps estimé : <strong>20 minutes</strong> · Difficulté : <strong>Accessible</strong>
      </div>
    </div>
  );
}

function StepQuestionnement() {
  return (
    <div>
      <div style={{ background: "rgba(126,238,255,0.07)", border: `1px solid ${N.cyanBd}`, borderRadius: 14, padding: "1.4rem", marginBottom: 14, textAlign: "center" }}>
        <div style={{ fontSize: 11, color: N.cyan, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>
          Question centrale
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: N.text, lineHeight: 1.3, fontFamily: "'Syne', sans-serif" }}>
          Comment crée-t-on des richesses<br />et comment les mesure-t-on ?
        </div>
      </div>

      <SectionTitle color={N.cyan}>Pourquoi cette question est-elle importante ?</SectionTitle>
      <p style={{ fontSize: 13, color: N.muted, lineHeight: 1.7, marginBottom: 14, fontFamily: "'Space Grotesk', sans-serif" }}>
        Chaque jour, des millions d'acteurs produisent des biens et des services. Mais qu'est-ce que « créer de la richesse » exactement ? Comment comparer la production d'une boulangerie, d'un hôpital public et d'une association caritative ? Et comment mesurer la richesse d'un pays entier ?
      </p>

      <SectionTitle color={N.violet}>La problématique en 3 temps</SectionTitle>
      {[
        { n: "1", titre: "Qui produit et quoi ?", txt: "La production est réalisée par une diversité d'acteurs (entreprises, administrations, ESS) et peut être marchande ou non marchande.", c: N.violet },
        { n: "2", titre: "Comment mesure-t-on la richesse ?", txt: "On utilise la valeur ajoutée pour mesurer la contribution de chaque entreprise, et le PIB pour agréger la richesse d'un pays.", c: N.cyan },
        { n: "3", titre: "Quelles sont les limites de ces mesures ?", txt: "Le PIB est un indicateur global qui masque les inégalités et ne rend pas compte des dégradations environnementales.", c: N.ambre },
      ].map((item) => (
        <div key={item.n} style={{ display: "flex", gap: 12, background: N.bgCard, border: `1px solid ${N.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8, alignItems: "flex-start" }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: item.c, fontFamily: "'Syne', sans-serif", flexShrink: 0, marginTop: 1 }}>{item.n}</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: item.c, marginBottom: 3, fontFamily: "'Space Grotesk', sans-serif" }}>{item.titre}</div>
            <div style={{ fontSize: 12, color: N.muted, lineHeight: 1.6, fontFamily: "'Space Grotesk', sans-serif" }}>{item.txt}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StepNotions() {
  const notions: { mot: string; def: string; color: "violet" | "cyan" | "ambre" | "rose" | "vert" }[] = [
    { mot: "Production", def: "Activité socialement organisée qui consiste à créer des biens et des services contribuant à satisfaire des besoins.", color: "cyan" },
    { mot: "Production marchande", def: "Production vendue sur un marché à un prix couvrant plus de 50 % des coûts de production.", color: "cyan" },
    { mot: "Production non marchande", def: "Production fournie gratuitement ou à un prix couvrant moins de 50 % des coûts. Financée par les prélèvements obligatoires.", color: "violet" },
    { mot: "Économie Sociale et Solidaire (ESS)", def: "Ensemble d'organisations (coopératives, mutuelles, associations, fondations) dont le fonctionnement repose sur la solidarité, l'utilité sociale et la gouvernance démocratique.", color: "vert" },
    { mot: "Facteurs de production", def: "Éléments mis en œuvre dans la production : facteur travail, facteur capital (fixe et circulant), technologie et ressources naturelles.", color: "ambre" },
    { mot: "Capital fixe", def: "Biens de production durables utilisés lors de plusieurs cycles de production (machines, bâtiments). Utilisés pendant au moins un an.", color: "ambre" },
    { mot: "Capital circulant", def: "Capital technique transformé ou détruit au cours du processus de production (matières premières, énergie).", color: "ambre" },
    { mot: "Chiffre d'affaires (CA)", def: "Recettes totales de l'entreprise : CA = quantités vendues × prix de vente.", color: "violet" },
    { mot: "Valeur ajoutée (VA)", def: "Richesse réellement créée par l'entreprise : VA = CA − Consommations intermédiaires.", color: "violet" },
    { mot: "Bénéfice", def: "Différence positive entre les recettes totales et l'ensemble des charges (y compris les salaires, CI, impôts…).", color: "violet" },
    { mot: "PIB (Produit Intérieur Brut)", def: "Somme des valeurs ajoutées de toutes les unités de production résidentes. Mesure la richesse créée sur un territoire en une année.", color: "cyan" },
    { mot: "Croissance économique", def: "Augmentation soutenue du PIB en volume sur une longue période (définition de François Perroux).", color: "cyan" },
  ];
  return (
    <div>
      {notions.map((n) => (
        <DefBox key={n.mot} color={n.color} label={n.mot}>
          {n.def}
        </DefBox>
      ))}
    </div>
  );
}

function StepCours() {
  return (
    <div>
      <SectionTitle color={N.cyan}>1. Qu'est-ce que produire ?</SectionTitle>
      <DefBox color="cyan" label="📌 Définition INSEE">
        <strong>Produire</strong>, c'est créer des <strong>biens</strong> (matériels et stockables) ou des <strong>services</strong> (immatériels et non stockables) afin de satisfaire des besoins. L'INSEE définit la production comme « une activité exercée sous le contrôle d'une unité institutionnelle qui combine des ressources pour fabriquer des biens ou fournir des services ».
      </DefBox>
      <NoteBox type="warn">
        ⚠️ Les <strong>activités domestiques</strong> (cuisiner chez soi, jardiner…) et le <strong>bénévolat</strong> ne sont <strong>pas</strong> comptabilisés comme production économique : ils ne donnent pas lieu à une transaction marchande rémunérée.
      </NoteBox>

      <SectionTitle color={N.cyan}>2. Production marchande vs non marchande</SectionTitle>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Prix de vente</th>
              <th>Financement</th>
              <th>Exemples</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Marchande</td>
              <td>&gt; 50 % des coûts</td>
              <td>Ventes</td>
              <td>Supermarché, restaurant, voiture</td>
            </tr>
            <tr>
              <td>Non marchande</td>
              <td>&lt; 50 % des coûts (ou gratuit)</td>
              <td>Prélèvements obligatoires</td>
              <td>École publique, hôpital public</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionTitle color={N.violet}>3. La diversité des producteurs</SectionTitle>
      <CardGrid
        cards={[
          { icon: "🏭", badge: "Production marchande", title: "Entreprises", text: "But lucratif. Produisent des biens et services vendus sur le marché.", badgeColor: N.cyan },
          { icon: "🏛️", badge: "Production non marchande", title: "Administrations", text: "État, collectivités, Sécu. Financées par les prélèvements. Servent l'intérêt général.", badgeColor: N.violet },
          { icon: "🤝", badge: "Utilité sociale", title: "ESS", text: "Associations, mutuelles, coopératives. Bénéfices réinvestis. Gouvernance démocratique.", badgeColor: N.vert },
        ]}
      />

      <SectionTitle color={N.ambre}>4. Les facteurs de production</SectionTitle>
      <DefBox color="ambre" label="La combinaison productive">
        Pour produire, on combine : <br />
        • <strong style={{ color: N.ambre }}>Travail</strong> — l'ensemble des personnes qui participent à la production<br />
        • <strong style={{ color: N.ambre }}>Capital fixe</strong> — biens durables (machines, bâtiments) utilisés sur plusieurs cycles<br />
        • <strong style={{ color: N.ambre }}>Capital circulant</strong> — matières premières transformées ou détruites lors de la production<br />
        • <strong style={{ color: N.ambre }}>Technologie</strong> — innovations améliorant l'utilisation des facteurs<br />
        • <strong style={{ color: N.ambre }}>Ressources naturelles</strong> — eau, énergie, matières premières naturelles
      </DefBox>
      <DefBox color="violet" label="Complémentaires ou substituables ?">
        Les facteurs peuvent être <strong>complémentaires</strong> (augmenter l'un nécessite d'augmenter l'autre) ou <strong>substituables</strong> (on peut remplacer l'un par l'autre — ex : un robot remplace des ouvriers).
      </DefBox>

      <SectionTitle color={N.violet}>5. Mesurer la richesse d'une entreprise</SectionTitle>
      {[
        { label: "Chiffre d'affaires", formula: "CA = Quantités vendues × Prix de vente", desc: "Les recettes totales. Ne mesure pas la richesse créée car il inclut les achats à d'autres entreprises.", c: N.violet },
        { label: "Valeur ajoutée", formula: "VA = CA − Consommations intermédiaires", desc: "La richesse RÉELLEMENT créée par l'entreprise. On soustrait ce qu'elle a acheté à d'autres.", c: N.cyan },
        { label: "Bénéfice", formula: "Bénéfice = Recettes totales − Total des charges", desc: "Ce qu'il reste à l'entreprise après avoir payé tous ses coûts (salaires, loyer, CI, impôts…).", c: N.vert },
      ].map((f) => (
        <div key={f.label} style={{ background: N.bgCard, border: `1px solid ${N.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: f.c, fontWeight: 700, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Space Grotesk', sans-serif" }}>{f.label}</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: f.c, fontFamily: "monospace", marginBottom: 6, background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "6px 10px" }}>{f.formula}</div>
          <div style={{ fontSize: 12, color: N.muted, lineHeight: 1.6, fontFamily: "'Space Grotesk', sans-serif" }}>{f.desc}</div>
        </div>
      ))}

      <SectionTitle color={N.cyan}>6. Du PIB à la croissance économique</SectionTitle>
      <DefBox color="cyan" label="PIB = Somme des valeurs ajoutées">
        On additionne les VA (et non les CA) pour <strong>éviter les doubles comptages</strong>. Si on additionnait les CA, la farine serait comptée chez le meunier ET chez le boulanger. La VA ne retient que ce que chaque entreprise a <em>réellement créé</em>.
      </DefBox>
      <DefBox color="cyan" label="Croissance = Variation du PIB en volume">
        Croissance économique (F. Perroux) = « augmentation soutenue du produit global en termes réels sur une longue période ». On calcule le taux de variation du PIB <strong>en volume</strong> (hors inflation).
      </DefBox>

      <SectionTitle color={N.rose}>7. Les limites du PIB</SectionTitle>
      {[
        { t: "Limite sociale", txt: "Le PIB par habitant est une MOYENNE. Il masque les inégalités de revenus. Un pays peut avoir un PIB/hab élevé et des millions de pauvres.", c: N.rose },
        { t: "Limites écologiques", txt: "La croissance génère des externalités négatives : épuisement des ressources, émissions de CO₂, déforestation, perte de biodiversité.", c: N.ambre },
        { t: "Exclut la production domestique", txt: "Le travail domestique et le bénévolat ne sont pas comptabilisés, bien qu'ils créent de la valeur.", c: N.violet },
      ].map((l) => (
        <div key={l.t} style={{ display: "flex", gap: 10, background: N.bgCard, border: `1px solid ${N.border}`, borderRadius: 8, padding: "10px 12px", marginBottom: 7, alignItems: "flex-start" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.c, flexShrink: 0, marginTop: 5 }} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: l.c, marginBottom: 2, fontFamily: "'Space Grotesk', sans-serif" }}>{l.t}</div>
            <div style={{ fontSize: 12, color: N.muted, lineHeight: 1.55, fontFamily: "'Space Grotesk', sans-serif" }}>{l.txt}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StepDonnees() {
  return (
    <div>
      <DefBox color="cyan" label="📐 Savoir-faire · Calcul de la valeur ajoutée">
        <strong>Exercice :</strong> Une boulangerie réalise un chiffre d'affaires de 120 000 €. Elle a acheté 45 000 € de farine, beurre et énergie (consommations intermédiaires). Elle verse 60 000 € de salaires et loyers.<br /><br />
        <strong style={{ color: N.cyan }}>Calcule :</strong><br />
        1. La valeur ajoutée → VA = CA − CI = 120 000 − 45 000 = <strong style={{ color: N.cyan }}>75 000 €</strong><br />
        2. Le bénéfice → 120 000 − (45 000 + 60 000) = <strong style={{ color: N.cyan }}>15 000 €</strong><br />
        3. Si seule cette boulangerie existait, le PIB du pays = <strong style={{ color: N.cyan }}>75 000 €</strong>
      </DefBox>

      <SectionTitle color={N.ambre}>📊 Données clés sur la croissance mondiale</SectionTitle>
      <StatGrid
        stats={[
          { num: "∼ 2 %", label: "Croissance mondiale/an 1850-1930", color: N.violet },
          { num: "4-7 %", label: "Trente Glorieuses 1945-1973", color: N.cyan },
          { num: "< 3 %", label: "Depuis le 1er choc pétrolier (1973)", color: N.ambre },
          { num: "-1,7 %", label: "Décroissance mondiale en 2009 (crise subprimes)", color: N.rose },
        ]}
      />

      <SectionTitle color={N.violet}>📐 Savoir-faire · Taux de variation</SectionTitle>
      <FormulaBox formula="Taux de variation (%) = ((Arrivée − Départ) / Départ) × 100" />
      <DefBox color="violet" label="Exemple appliqué">
        Le PIB de la France passe de 2 200 Mds € à 2 310 Mds €.<br />
        Taux = ((2 310 − 2 200) / 2 200) × 100 = <strong style={{ color: N.violet }}>+ 5 %</strong><br />
        → La France connaît une croissance économique de 5 %.
      </DefBox>

      <SectionTitle color={N.cyan}>📐 Savoir-faire · Lecture d'un tableau double-entrée</SectionTitle>
      <div style={{ overflowX: "auto" }}>
        <table>
          <caption style={{ fontSize: 11, color: N.muted, marginBottom: 6, textAlign: "left", fontFamily: "'Space Grotesk', sans-serif" }}>
            Part de la valeur ajoutée selon le type de producteur en France (données fictives à titre pédagogique)
          </caption>
          <thead>
            <tr>
              <th>Producteur</th>
              <th>VA (Mds €)</th>
              <th>Part dans le PIB</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Entreprises</td><td>1 600</td><td>70 %</td></tr>
            <tr><td>Administrations publiques</td><td>500</td><td>22 %</td></tr>
            <tr><td>ESS</td><td>90</td><td>4 %</td></tr>
            <tr><td>Ménages (loyers imputés)</td><td>95</td><td>4 %</td></tr>
          </tbody>
        </table>
      </div>
      <DefBox color="cyan" label="Comment lire ce tableau ?">
        La ligne « Entreprises » indique que les entreprises créent 1 600 Mds € de VA, soit <strong>70 % du PIB</strong>. Pour calculer la part : (VA du secteur / PIB total) × 100.
      </DefBox>
    </div>
  );
}

function StepErreurs() {
  const errors = [
    {
      erreur: "Confondre CA et valeur ajoutée",
      explication: "Le CA inclut les achats faits à d'autres entreprises (consommations intermédiaires). La VA les soustrait : elle mesure uniquement ce que l'entreprise a RÉELLEMENT créé.",
      exemple: "Une boulangerie a un CA de 120 000 € mais a acheté 45 000 € de farine. Sa VA est de 75 000 €, pas 120 000 €.",
      c: N.rose,
    },
    {
      erreur: "Penser que le bénévolat = production économique",
      explication: "Pour l'INSEE, la production doit donner lieu à une transaction marchande rémunérée. Le bénévolat crée de la valeur sociale, mais n'est PAS comptabilisé dans le PIB.",
      exemple: "Un médecin bénévole dans une ONG ne contribue pas au PIB lors de ce travail, même s'il soigne des malades.",
      c: N.ambre,
    },
    {
      erreur: "Additionner les CA pour calculer le PIB",
      explication: "On additionnerait plusieurs fois les mêmes richesses (double comptage). On additionne les VALEURS AJOUTÉES pour éviter ce problème.",
      exemple: "La farine est dans le CA du meunier ET dans le CA du boulanger. Additionner les VA évite ce double comptage.",
      c: N.rose,
    },
    {
      erreur: "Confondre PIB et PIB par habitant",
      explication: "Le PIB est la richesse totale créée. Le PIB/habitant = PIB ÷ population, c'est une MOYENNE du niveau de vie. Un pays peut avoir un grand PIB et un faible PIB/habitant (grande population).",
      exemple: "L'Inde a un PIB très élevé (3e mondial) mais un PIB/habitant faible car sa population dépasse 1,4 milliard.",
      c: N.violet,
    },
    {
      erreur: "Confondre croissance et développement",
      explication: "La croissance = augmentation du PIB (indicateur quantitatif). Le développement est plus large : il inclut les conditions de vie, l'éducation, la santé. Un pays peut croître sans se développer.",
      exemple: "Un pays peut avoir une forte croissance grâce à l'extraction pétrolière sans améliorer l'éducation ou la santé.",
      c: N.ambre,
    },
    {
      erreur: "Penser que PIB = bien-être",
      explication: "Le PIB mesure la richesse produite, pas le bien-être. Il ne tient pas compte des inégalités, de l'environnement, du temps libre, de la sécurité ou du bonheur.",
      exemple: "Après une catastrophe naturelle, la reconstruction fait augmenter le PIB, mais la population est moins bien lotie qu'avant.",
      c: N.rose,
    },
  ];

  return (
    <div>
      <div style={{ fontSize: 13, color: N.muted, fontFamily: "'Space Grotesk', sans-serif", marginBottom: "1.25rem" }}>
        Les confusions les plus fréquentes à éviter sur ce chapitre.
      </div>
      {errors.map((e, i) => (
        <div key={i} style={{ background: N.bgCard, border: `1px solid ${e.c}55`, borderRadius: 10, padding: "14px 16px", marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 14, flexShrink: 0 }}>❌</span>
            <div style={{ fontSize: 13, color: e.c, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{e.erreur}</div>
          </div>
          <div style={{ fontSize: 12, color: N.text, lineHeight: 1.65, marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>{e.explication}</div>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 7, padding: "8px 10px", fontSize: 11, color: N.muted, borderLeft: `3px solid ${e.c}88`, fontFamily: "'Space Grotesk', sans-serif" }}>
            <strong style={{ color: e.c }}>Exemple : </strong>{e.exemple}
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
    const col = pct >= 75 ? N.vert : pct >= 50 ? N.ambre : N.rose;
    const msg =
      pct >= 75
        ? "🎉 Excellent ! Tu maîtrises bien ce chapitre."
        : pct >= 50
        ? "👍 Bien ! Revois les notions où tu as buté."
        : "📚 Reprends le Cours et les Notions avant de réessayer.";
    return (
      <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
        <div style={{ fontSize: 52, fontWeight: 700, color: col, fontFamily: "'Syne', sans-serif", marginBottom: 12 }}>
          {score}/{QUIZ_QUESTIONS.length}
        </div>
        <div style={{ fontSize: 14, color: N.muted, fontFamily: "'Space Grotesk', sans-serif", marginBottom: "2rem" }}>{msg}</div>
        <button
          onClick={reset}
          style={{ background: N.accent, color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
        >
          🔄 Recommencer
        </button>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[qi];
  return (
    <div>
      <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
        {QUIZ_QUESTIONS.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < qi ? N.violet : i === qi ? "rgba(196,184,255,0.4)" : N.border }} />
        ))}
      </div>
      <div style={{ fontSize: 12, color: N.muted, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 12 }}>
        Question {qi + 1} sur {QUIZ_QUESTIONS.length} · Score : {score}/{qi}
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: N.text, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 16, lineHeight: 1.5 }}>
        {q.q}
      </div>
      <div style={{ display: "grid", gap: 8, marginBottom: "1rem" }}>
        {q.opts.map((opt, i) => {
          let bg = N.bgCard;
          let border = N.border;
          let color = N.text;
          if (answered) {
            if (i === q.correct) { bg = N.vertBg; border = N.vert; color = N.vert; }
            else if (i === chosen) { bg = N.roseBg; border = N.rose; color = N.rose; }
          }
          return (
            <button
              key={i}
              onClick={() => answer(i)}
              disabled={answered}
              style={{ textAlign: "left", padding: "12px 14px", border: `1px solid ${border}`, borderRadius: 8, background: bg, color, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, cursor: answered ? "default" : "pointer", transition: "all 0.15s", lineHeight: 1.5 }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {answered && (
        <div style={{ background: N.ambreBg, border: `1px solid ${N.ambreBd}`, borderRadius: 8, padding: "12px 14px", fontSize: 13, color: N.ambre, lineHeight: 1.7, fontFamily: "'Space Grotesk', sans-serif", marginBottom: "1rem" }}>
          {q.fb}
        </div>
      )}
      {answered && (
        <div style={{ textAlign: "right" }}>
          <button
            onClick={next}
            style={{ background: N.accent, color: "#fff", border: "none", borderRadius: 8, padding: "9px 20px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
          >
            {qi === QUIZ_QUESTIONS.length - 1 ? "Voir mon résultat" : "Question suivante →"}
          </button>
        </div>
      )}
    </div>
  );
}

function StepMemo() {
  return (
    <div>
      {/* VIDÉO */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: N.cyan, fontFamily: "'Space Grotesk', sans-serif", textTransform: "uppercase", marginBottom: 8 }}>
          🎬 Cours vidéo — Création de richesses
        </div>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, borderRadius: 12, overflow: "hidden", border: `1px solid ${N.cyanBd}` }}>
          <iframe
            src="https://www.youtube.com/embed/BeiRUMIN8Rk"
            title="Cours vidéo — Comment crée-t-on des richesses ? — CapSES"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </div>

      <DefBox color="cyan" label="📝 Fiche mémo — L'essentiel à retenir">
        <strong style={{ color: N.cyan }}>Produire</strong> = créer des biens (matériels) ou services (immatériels) via une activité organisée et rémunérée.
      </DefBox>

      <SectionTitle color={N.cyan}>Les 3 types de producteurs</SectionTitle>
      <div style={{ fontSize: 13, color: N.text, lineHeight: 1.8, background: N.bgCard, border: `1px solid ${N.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>
        🏭 <strong style={{ color: N.cyan }}>Entreprises</strong> → production marchande<br />
        🏛️ <strong style={{ color: N.violet }}>Administrations</strong> → production non marchande<br />
        🤝 <strong style={{ color: N.vert }}>ESS</strong> → utilité sociale, bénéfices réinvestis
      </div>

      <SectionTitle color={N.ambre}>Les formules à connaître</SectionTitle>
      {[
        ["VA", "CA − Consommations intermédiaires", N.cyan],
        ["Bénéfice", "Recettes − Total des charges", N.vert],
        ["PIB", "Somme de toutes les VA du territoire", N.violet],
        ["Taux de variation", "((Arrivée − Départ) / Départ) × 100", N.ambre],
      ].map(([label, formula, c]) => (
        <div key={label} style={{ display: "flex", gap: 10, alignItems: "center", background: N.bgCard, border: `1px solid ${N.border}`, borderRadius: 8, padding: "9px 12px", marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: c, minWidth: 100, fontFamily: "'Space Grotesk', sans-serif" }}>{label}</span>
          <span style={{ fontSize: 12, color: N.muted, fontFamily: "monospace" }}>{formula}</span>
        </div>
      ))}

      <SectionTitle color={N.rose}>Les limites à citer</SectionTitle>
      <DefBox color="rose" label="Limites du PIB">
        1. <strong>Sociale</strong> : moyenne qui masque les inégalités<br />
        2. <strong>Écologique</strong> : ne comptabilise pas les destructions environnementales<br />
        3. <strong>Domestique</strong> : exclut le travail non rémunéré (bénévolat, tâches ménagères)
      </DefBox>

      <SectionTitle color={N.violet}>Chronologie de la croissance mondiale</SectionTitle>
      <div style={{ fontSize: 13, color: N.text, lineHeight: 2, background: N.bgCard, border: `1px solid ${N.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 14, fontFamily: "'Space Grotesk', sans-serif" }}>
        📅 <strong style={{ color: N.muted }}>XIXe s.</strong> → Révolution industrielle, décollage<br />
        📅 <strong style={{ color: N.muted }}>1850-1930</strong> → ~2 %/an<br />
        📅 <strong style={{ color: N.cyan }}>1945-1973</strong> → Trente Glorieuses : 4-7 %<br />
        📅 <strong style={{ color: N.ambre }}>Depuis 1973</strong> → Ralentissement &lt; 3 %<br />
        📅 <strong style={{ color: N.rose }}>2009</strong> → Décroissance (crise subprimes)
      </div>

      {/* Ressources */}
      <SectionTitle color={N.muted}>🔗 Pour aller plus loin</SectionTitle>
      {[
        { icon: "📹", titre: "INSEE — Vidéos PIB et croissance", url: "https://www.insee.fr/fr/information/2549709", tag: "Vidéo" },
        { icon: "🎬", titre: "Le PIB, c'est quoi ? (Explique-moi l'éco)", url: "https://www.dailymotion.com/video/x63g3pt", tag: "Vidéo courte" },
        { icon: "📖", titre: "Melchior — Fiches notions SES", url: "https://www.melchior.fr/notion/production", tag: "Définitions" },
        { icon: "🌍", titre: "Banque Mondiale — Données PIB", url: "https://donnees.banquemondiale.org/indicateur/NY.GDP.MKTP.KD.ZG", tag: "Statistiques" },
      ].map((r) => (
        <a
          key={r.url}
          href={r.url}
          target="_blank"
          rel="noreferrer"
          style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px", background: N.bgCard, border: `1px solid ${N.border}`, borderRadius: 8, marginBottom: 7, textDecoration: "none" }}
        >
          <span style={{ fontSize: 18, flexShrink: 0 }}>{r.icon}</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: N.cyan, marginBottom: 3, fontFamily: "'Space Grotesk', sans-serif" }}>{r.titre}</div>
            <span style={{ fontSize: 10, background: N.cyanBg, color: N.cyan, border: `1px solid ${N.cyanBd}`, borderRadius: 10, padding: "1px 7px", fontFamily: "'Space Grotesk', sans-serif" }}>{r.tag}</span>
          </div>
        </a>
      ))}
    </div>
  );
}

// ── STEP RENDERER ───────────────────────────────────────────────
function renderStep(id: StepId) {
  switch (id) {
    case "objectifs":      return <StepObjectifs />;
    case "questionnement": return <StepQuestionnement />;
    case "notions":        return <StepNotions />;
    case "cours":          return <StepCours />;
    case "donnees":        return <StepDonnees />;
    case "erreurs":        return <StepErreurs />;
    case "quiz":           return <StepQuiz />;
    case "memo":           return <StepMemo />;
  }
}

// ── PAGE PRINCIPALE ──────────────────────────────────────────────
export default function CreationRichessesPage() {
  const [active, setActive] = useState<StepId>("objectifs");
  const isMobile = useIsMobile();

  const currentStep = STEPS.find((s) => s.id === active)!;
  const activeIdx = STEPS.findIndex((s) => s.id === active);

  return (
    <div style={{ minHeight: "100vh", background: N.bg, fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* Google Fonts + reset */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        a { text-decoration: none; }
        button { font: inherit; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        @media (min-width: 900px) { .mobile-tabs { display: none !important; } }

        strong { font-weight: 600; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 1rem; }
        th { background: rgba(255,255,255,0.06); padding: 9px 12px; text-align: left; font-weight: 600; color: ${N.muted}; border-bottom: 1px solid ${N.border}; font-family: 'Space Grotesk', sans-serif; font-size: 11px; }
        td { padding: 9px 12px; border-bottom: 1px solid ${N.border}; color: ${N.text}; vertical-align: top; line-height: 1.5; font-family: 'Space Grotesk', sans-serif; font-size: 12px; }
        td:first-child { color: ${N.cyan}; font-weight: 600; }
        tr:last-child td { border-bottom: none; }

        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>

      {/* TOP NAV */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(18,17,42,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${N.border}`,
          padding: "0 1.5rem",
          height: 56,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <a href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: N.text, letterSpacing: "0.02em" }}>
          Cap<span style={{ color: N.ambre }}>SES</span>
        </a>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
        <a href="/seconde" style={{ fontSize: 13, color: N.muted, fontFamily: "'Space Grotesk', sans-serif" }}>Seconde</a>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
        <span style={{ fontSize: 13, color: N.text, fontFamily: "'Space Grotesk', sans-serif" }}>Création de richesses</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: N.cyan, animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 11, color: N.cyan, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
            {activeIdx + 1}/{STEPS.length}
          </span>
        </div>
      </nav>

      {/* CHAPTER HEADER */}
      <div
        style={{
          background: "linear-gradient(135deg, #1b1750 0%, #12112A 60%, #1a0f2e 100%)",
          borderBottom: `1px solid ${N.border}`,
          padding: "2rem 1.5rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle, rgba(196,184,255,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", padding: "3px 10px", borderRadius: 20, background: N.cyanBg, color: N.cyan, border: `1px solid ${N.cyanBd}`, marginBottom: 10, textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" }}>
            Q 01 · Science économique · Seconde
          </div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, fontFamily: "'Syne', sans-serif", color: N.text, margin: 0, lineHeight: 1.2, marginBottom: 8 }}>
            Comment crée-t-on des richesses<br />
            <span style={{ color: N.cyan }}>et comment les mesure-t-on ?</span>
          </h1>
          <div style={{ fontSize: 13, color: N.muted, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 10 }}>
            Programme Éduscol 2019 · 8 étapes de révision
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["PIB", "Valeur ajoutée", "Croissance", "ESS", "Limites écologiques"].map((tg) => (
              <span key={tg} style={{ fontSize: 10, background: N.bgCard, border: `1px solid ${N.border}`, color: N.muted, borderRadius: 4, padding: "2px 7px", fontFamily: "'Space Grotesk', sans-serif" }}>{tg}</span>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE STEP SELECTOR */}
      <div className="mobile-tabs hide-scrollbar" style={{ display: "flex", overflowX: "auto", gap: 6, padding: "0.75rem 1rem", borderBottom: `1px solid ${N.border}`, background: "rgba(0,0,0,0.2)" }}>
        {STEPS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            style={{
              flexShrink: 0,
              padding: "6px 12px",
              borderRadius: 8,
              border: `1px solid ${active === s.id ? s.color : N.border}`,
              background: active === s.id ? `${s.color}22` : "transparent",
              color: active === s.id ? s.color : N.muted,
              fontSize: 12,
              fontWeight: active === s.id ? 700 : 400,
              cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* MAIN LAYOUT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "240px 1fr", gap: 0, minHeight: "calc(100vh - 200px)" }}>
        {/* SIDEBAR */}
        <aside
          style={{
            display: isMobile ? "none" : "block",
            borderRight: `1px solid ${N.border}`,
            padding: "1.5rem 1rem",
            position: "sticky",
            top: 56,
            height: "calc(100vh - 56px)",
            overflowY: "auto",
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: N.muted, textTransform: "uppercase", marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>
            Étapes du chapitre
          </div>
          {STEPS.map((s) => {
            const isActive = active === s.id;
            const isDone = STEPS.findIndex((x) => x.id === s.id) < activeIdx;
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
                  color: isActive ? s.color : isDone ? N.vert : N.muted,
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 400,
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "'Space Grotesk', sans-serif",
                  marginBottom: 2,
                  transition: "all 0.15s",
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: isActive ? s.color : isDone ? N.vertBg : "rgba(255,255,255,0.05)",
                    border: `1px solid ${isActive ? s.color : isDone ? N.vert : "rgba(255,255,255,0.1)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isDone && !isActive ? 11 : 10,
                    fontWeight: 700,
                    color: isActive ? N.bg : isDone ? N.vert : N.muted,
                    flexShrink: 0,
                  }}
                >
                  {isDone && !isActive ? "✓" : s.num}
                </div>
                <span style={{ lineHeight: 1.3 }}>{s.label}</span>
              </button>
            );
          })}

          {/* Progress bar */}
          <div style={{ marginTop: "1.5rem", padding: "0 4px" }}>
            <div style={{ fontSize: 11, color: N.muted, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 6 }}>
              Progression
            </div>
            <div style={{ height: 4, background: N.border, borderRadius: 2, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  background: `linear-gradient(90deg, ${N.violet}, ${N.cyan})`,
                  borderRadius: 2,
                  width: `${((activeIdx + 1) / STEPS.length) * 100}%`,
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
              <h2 style={{ fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 700, fontFamily: "'Syne', sans-serif", color: currentStep.color, margin: 0 }}>
                {currentStep.label}
              </h2>
              <div style={{ marginLeft: "auto", fontSize: 11, color: N.muted, fontFamily: "'Space Grotesk', sans-serif", background: N.bgCard, border: `1px solid ${N.border}`, borderRadius: 6, padding: "2px 8px" }}>
                {currentStep.num} / {STEPS.length}
              </div>
            </div>
            <div style={{ height: 2, background: `linear-gradient(90deg, ${currentStep.color}44, transparent)` }} />
          </div>

          {/* Step content */}
          {renderStep(active)}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", paddingTop: "1.5rem", borderTop: `1px solid ${N.border}` }}>
            {activeIdx > 0 ? (
              <button
                onClick={() => { setActive(STEPS[activeIdx - 1].id); window.scrollTo(0, 0); }}
                style={{ background: N.bgCardMd, border: `1px solid ${N.border}`, borderRadius: 8, padding: "9px 18px", color: N.text, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              >
                ← Étape précédente
              </button>
            ) : <div />}
            {activeIdx < STEPS.length - 1 ? (
              <button
                onClick={() => { setActive(STEPS[activeIdx + 1].id); window.scrollTo(0, 0); }}
                style={{ background: currentStep.color, border: "none", borderRadius: 8, padding: "9px 18px", color: N.bg, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >
                Étape suivante →
              </button>
            ) : (
              <a
                href="/seconde"
                style={{ background: N.cyanBg, color: N.cyan, border: `1px solid ${N.cyanBd}`, borderRadius: 8, padding: "9px 18px", fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700 }}
              >
                ← Retour aux chapitres
              </a>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
