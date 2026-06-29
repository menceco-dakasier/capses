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
    q: "Comment définit-on un marché en économie ?",
    opts: ["Un lieu obligatoirement physique où l'on vend des produits", "Un lieu de rencontre, réel ou fictif, entre une offre et une demande qui aboutit à un prix", "Une administration qui fixe les prix", "Un endroit réservé aux grandes entreprises"],
    correct: 1,
    fb: "Un marché est le lieu réel ou fictif de rencontre entre l'offre et la demande, donnant naissance à un flux d'échanges et à la fixation d'un prix. Il peut être matérialisé (un magasin) ou dématérialisé (la Bourse, un site internet).",
  },
  {
    q: "Selon la loi de la demande, lorsque le prix d'un bien augmente (toutes choses égales par ailleurs) :",
    opts: ["La quantité demandée augmente", "La quantité demandée diminue", "La quantité demandée reste stable", "La quantité offerte diminue"],
    correct: 1,
    fb: "La demande est une fonction décroissante du prix : plus le prix augmente, moins les consommateurs sont prêts à acheter, toutes choses égales par ailleurs (revenu, goûts inchangés).",
  },
  {
    q: "Selon la loi de l'offre, lorsque le prix d'un bien augmente :",
    opts: ["La quantité offerte diminue", "La quantité offerte augmente", "Seule la qualité du produit change", "La quantité offerte reste stable"],
    correct: 1,
    fb: "L'offre est une fonction croissante du prix : un prix plus élevé permet à davantage de producteurs de réaliser un profit et incite les producteurs déjà présents à produire plus.",
  },
  {
    q: "Le prix d'équilibre est :",
    opts: ["Le prix fixé par l'État", "Le prix le plus bas observé sur le marché", "Le seul prix où la quantité offerte égale exactement la quantité demandée", "Le prix moyen sur une année"],
    correct: 2,
    fb: "Le prix d'équilibre est le prix unique auquel l'offre rencontre exactement la demande : tous les vendeurs disposés à vendre à ce prix vendent, et tous les acheteurs disposés à acheter à ce prix achètent.",
  },
  {
    q: "Si le prix du marché est supérieur au prix d'équilibre, on observe :",
    opts: ["Une pénurie, qui fait monter le prix", "Un excédent (offre > demande), qui fait baisser le prix", "Aucun changement", "Une hausse de la demande"],
    correct: 1,
    fb: "Au-dessus du prix d'équilibre, l'offre dépasse la demande : il y a un excédent. Une partie de la production ne trouve pas d'acheteur, ce qui pousse les prix à la baisse, jusqu'au retour à l'équilibre.",
  },
  {
    q: "Une catastrophe naturelle qui détruit des capacités de production est un exemple de :",
    opts: ["Choc de demande positif", "Choc d'offre positif", "Choc d'offre négatif", "Choc de demande négatif"],
    correct: 2,
    fb: "C'est un choc d'offre négatif : la capacité à produire diminue, la courbe d'offre se déplace vers la gauche. Le nouveau prix d'équilibre est plus élevé et la quantité d'équilibre plus faible.",
  },
  {
    q: "Quel est l'effet d'une taxe instaurée sur le producteur ?",
    opts: ["L'offre se déplace vers la droite, le prix baisse", "L'offre se déplace vers la gauche, le prix payé par l'acheteur augmente et les quantités échangées diminuent", "Seul le bénéfice de l'entreprise diminue, sans effet sur le prix", "La demande augmente automatiquement"],
    correct: 1,
    fb: "Une taxe sur le producteur représente un coût supplémentaire : pour chaque prix, il offre moins. La courbe d'offre se déplace vers la gauche, ce qui fait monter le prix payé par l'acheteur et diminuer les quantités échangées.",
  },
  {
    q: "Quel est l'effet d'une subvention instaurée pour le producteur ?",
    opts: ["L'offre se déplace vers la gauche, le prix augmente", "L'offre se déplace vers la droite, les quantités échangées augmentent et le prix d'équilibre diminue", "Aucun effet sur le marché", "La demande se déplace vers la gauche"],
    correct: 1,
    fb: "Une subvention au producteur agit comme un coût en moins : il peut offrir plus à chaque prix. La courbe d'offre se déplace vers la droite, ce qui fait augmenter les quantités échangées et diminuer le prix d'équilibre.",
  },
  {
    q: "Pourquoi dit-on que le marché a un caractère « auto-régulateur » ?",
    opts: ["Parce que l'État fixe systématiquement le prix d'équilibre", "Parce que les variations de prix en cas d'excédent ou de pénurie ramènent automatiquement le marché vers l'équilibre", "Parce que l'offre et la demande sont toujours égales par définition", "Parce que les prix ne varient jamais"],
    correct: 1,
    fb: "Lorsqu'il y a un excédent, les prix baissent ; lorsqu'il y a une pénurie, les prix augmentent. Ce mécanisme ramène en permanence le marché vers son prix d'équilibre, sans intervention extérieure : c'est le caractère auto-régulateur du marché concurrentiel.",
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

function Accordion({ items }: { items: { title: string; content: string; dotColor: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div style={{ marginBottom: "1rem" }}>
      {items.map((item, i) => (
        <div key={i} style={{ border: `1px solid ${N.border}`, borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
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
              color: N.text,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: item.dotColor, flexShrink: 0, display: "inline-block" }} />
            {item.title}
            <span style={{ marginLeft: "auto", color: N.muted, transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
          </button>
          {open === i && (
            <div style={{ padding: "4px 14px 14px", fontSize: 13, color: N.muted, lineHeight: 1.7, fontFamily: "'Space Grotesk', sans-serif" }}>
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── STEP CONTENTS ────────────────────────────────────────────────

function StepObjectifs() {
  return (
    <div>
      <DefBox color="violet" label="🔍 Prologue · Un modèle simple pour expliquer la réalité">
        Les économistes simplifient la réalité pour mieux la comprendre. Pour expliquer comment se fixe le prix d'un très grand nombre de biens (pétrole, blé, forfaits téléphoniques…), ils construisent un <strong style={{ color: N.violet }}>modèle simple</strong> : la demande décroît avec le prix, l'offre croît avec le prix. Ce n'est pas une description parfaite de la réalité, mais un outil pour isoler les variables déterminantes.
      </DefBox>

      <SectionTitle color={N.cyan}>À la fin de cette fiche, tu sauras :</SectionTitle>
      {[
        ["Illustrer la notion de marché", "par des exemples variés (biens, services, échelle, support)"],
        ["Expliquer le modèle simple de l'offre et de la demande", "(demande décroissante, offre croissante) et l'illustrer"],
        ["Représenter graphiquement", "des courbes d'offre et de demande pour identifier le prix et la quantité d'équilibre"],
        ["Expliquer le mécanisme d'ajustement", "du marché en cas d'excédent ou de pénurie"],
        ["Analyser un choc d'offre ou de demande", "et ses effets sur le prix et la quantité d'équilibre"],
        ["Comprendre les effets d'une taxe ou d'une subvention", "à l'aide d'un exemple, sur le producteur et sur l'acheteur"],
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
        ⏱ Temps estimé : <strong>25 minutes</strong> · Difficulté : <strong>Intermédiaire</strong>
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
          Comment se forment les prix<br />sur un marché ?
        </div>
      </div>

      <SectionTitle color={N.cyan}>Pourquoi cette question est-elle importante ?</SectionTitle>
      <p style={{ fontSize: 13, color: N.muted, lineHeight: 1.7, marginBottom: 14, fontFamily: "'Space Grotesk', sans-serif" }}>
        Le prix du pétrole, d'une baguette ou d'un billet de train varie constamment. Comprendre pourquoi nécessite un outil simple : le modèle de l'offre et de la demande. Il permet d'expliquer la fixation des prix d'un très grand nombre de biens et services, et d'anticiper l'effet d'événements extérieurs (catastrophe, taxe, mode) sur ces prix.
      </p>

      <SectionTitle color={N.violet}>La problématique en 3 temps</SectionTitle>
      {[
        { n: "1", titre: "Qu'est-ce qu'un marché et comment le modéliser ?", txt: "Un marché est un lieu de rencontre entre une offre et une demande. Pour le représenter, on simplifie : la demande décroît avec le prix, l'offre croît avec le prix.", c: N.violet },
        { n: "2", titre: "Comment se fixe et s'ajuste le prix ?", txt: "Le prix d'équilibre se fixe à l'intersection des courbes. En cas d'excédent ou de pénurie, le marché s'ajuste automatiquement.", c: N.cyan },
        { n: "3", titre: "Quels sont les effets d'une intervention extérieure ?", txt: "Un choc, une taxe ou une subvention déplace les courbes et modifie le prix et la quantité d'équilibre.", c: N.ambre },
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
  const notions: { mot: string; def: React.ReactNode; color: "violet" | "cyan" | "ambre" | "rose" | "vert" }[] = [
    { mot: "Marché", def: "Lieu de rencontre, réel ou fictif, entre une offre et une demande, donnant naissance à un flux d'échanges et à la fixation d'un prix.", color: "violet" },
    { mot: "Demande", def: "Quantité de biens ou services que les consommateurs peuvent et souhaitent acheter à un niveau de prix donné. Fonction décroissante du prix.", color: "rose" },
    { mot: "Offre", def: "Quantité de biens ou services que les producteurs peuvent et souhaitent vendre à un niveau de prix donné. Fonction croissante du prix.", color: "cyan" },
    { mot: "Prix d'équilibre", def: "Le seul prix auquel la quantité offerte est exactement égale à la quantité demandée : toute offre trouve sa demande.", color: "cyan" },
    { mot: "Quantité d'équilibre", def: "La quantité effectivement échangée sur le marché lorsque le prix est au niveau du prix d'équilibre.", color: "cyan" },
    { mot: "Excédent (offre excédentaire)", def: "À un prix donné, la quantité offerte est supérieure à la quantité demandée. Une partie de la production ne trouve pas d'acheteur : les prix tendent à baisser.", color: "ambre" },
    { mot: "Pénurie (demande excédentaire)", def: "À un prix donné, la quantité demandée est supérieure à la quantité offerte. Tous les besoins ne sont pas satisfaits : les prix tendent à augmenter.", color: "ambre" },
    { mot: "Choc (d'offre ou de demande)", def: "Perturbation exogène qui améliore ou détériore l'offre et/ou la demande, déplaçant la courbe correspondante et modifiant le prix et la quantité d'équilibre.", color: "violet" },
    { mot: "Taxe", def: "Prélèvement obligatoire réalisé par l'État, qui renchérit les coûts (côté producteur) ou réduit le pouvoir d'achat (côté acheteur), ce qui réduit les quantités échangées.", color: "rose" },
    { mot: "Subvention", def: "Somme versée par l'État sans contrepartie, qui soutient la production ou la consommation et augmente les quantités échangées.", color: "vert" },
    { mot: "Concurrence pure et parfaite (CPP)", def: "Modèle théorique simplifié reposant sur 5 hypothèses (atomicité, homogénéité, transparence, libre entrée/sortie, libre circulation des facteurs). Notion approfondie en 1re ; à connaître seulement de nom en 2de.", color: "violet" },
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
      <SectionTitle color={N.cyan}>1. Qu'est-ce qu'un marché ?</SectionTitle>
      <DefBox color="cyan" label="📌 Définition">
        Un <strong>marché</strong> est un lieu de rencontre, <strong>réel ou fictif</strong>, entre une offre et une demande, qui aboutit à la formation d'un prix. L'<strong>offre</strong> est la quantité de biens ou services que les producteurs peuvent et souhaitent vendre à un niveau de prix donné. La <strong>demande</strong> est la quantité que les consommateurs peuvent et souhaitent acheter à ce même niveau de prix.
      </DefBox>

      <SectionTitle color={N.violet}>2. La diversité des marchés</SectionTitle>
      <CardGrid
        cards={[
          { icon: "📏", badge: "Échelle", title: "Grande ou petite taille", text: "Le marché de Rungis (national) vs le marché de Lavaur (local). L'échelle peut être locale, nationale ou mondiale.", badgeColor: N.cyan },
          { icon: "📦", badge: "Nature", title: "Biens ou services", text: "Le marché du pétrole échange un bien ; le marché de la coiffure échange un service.", badgeColor: N.rose },
          { icon: "💻", badge: "Support", title: "Matérialisé ou dématérialisé", text: "Un hypermarché est matérialisé. La Bourse ou les achats en ligne sont dématérialisés.", badgeColor: N.violet },
        ]}
      />

      <SectionTitle color={N.ambre}>
        3. Les structures de marché <span style={{ fontSize: 11, fontWeight: 400, color: N.muted, textTransform: "none" }}>(contexte — approfondi en 1re)</span>
      </SectionTitle>
      <DefBox color="ambre" label="Concurrence, monopole, oligopole">
        La structure d'un marché dépend du <strong>nombre d'offreurs et de demandeurs</strong>. En <strong>concurrence</strong>, ils sont nombreux des deux côtés et nul ne peut influencer le prix seul : c'est le modèle de référence étudié en 2de. En situation de <strong>monopole</strong> (un seul offreur) ou d'<strong>oligopole</strong> (quelques offreurs), un ou plusieurs producteurs peuvent influencer le prix.
      </DefBox>
      <NoteBox>
        💡 Le programme de 2de ne demande pas de connaître en détail ces structures de marché : retiens seulement qu'elles existent. Leur étude approfondie arrive en 1re.
      </NoteBox>

      <SectionTitle color={N.cyan}>4. Le modèle simple : une demande qui baisse, une offre qui monte</SectionTitle>
      <DefBox color="rose" label="📌 Loi de la demande">
        Toutes choses égales par ailleurs, <strong style={{ color: N.rose }}>quand le prix augmente, la quantité demandée diminue</strong> (et inversement). La demande est une <strong style={{ color: N.rose }}>fonction décroissante</strong> du prix.
      </DefBox>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead><tr><th>Prix de la baguette</th><th>Quantité demandée / mois</th></tr></thead>
          <tbody>
            <tr><td>1 €</td><td>15 baguettes</td></tr>
            <tr><td>2 €</td><td>8 baguettes</td></tr>
            <tr><td>5 €</td><td>4 baguettes</td></tr>
          </tbody>
        </table>
      </div>
      <DefBox color="cyan" label="📌 Loi de l'offre">
        Toutes choses égales par ailleurs, <strong style={{ color: N.cyan }}>quand le prix augmente, la quantité offerte augmente</strong> (et inversement). L'offre est une <strong style={{ color: N.cyan }}>fonction croissante</strong> du prix : un prix plus élevé permet à plus de producteurs de réaliser un profit.
      </DefBox>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead><tr><th>Prix du cornet de glace</th><th>Quantité offerte</th></tr></thead>
          <tbody>
            <tr><td>0,5 €</td><td>0 cornet (pas de profit possible)</td></tr>
            <tr><td>1 €</td><td>5 cornets</td></tr>
            <tr><td>2 €</td><td>10 cornets</td></tr>
          </tbody>
        </table>
      </div>

      <SectionTitle color={N.violet}>5. La formation du prix d'équilibre</SectionTitle>
      <div style={{ background: N.bgCard, border: `1px solid ${N.border}`, borderRadius: 12, padding: "1rem", marginBottom: "1rem" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: N.muted, textAlign: "center", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'Space Grotesk', sans-serif" }}>
          Rencontre de l'offre et de la demande
        </div>
        <svg viewBox="0 0 320 220" style={{ width: "100%", maxWidth: 320, display: "block", margin: "0 auto" }}>
          <line x1="40" y1="10" x2="40" y2="200" stroke={N.border} strokeWidth={1.5} />
          <line x1="40" y1="200" x2="300" y2="200" stroke={N.border} strokeWidth={1.5} />
          <text x="14" y="14" fontSize="9" fill={N.muted}>Prix</text>
          <text x="270" y="214" fontSize="9" fill={N.muted}>Quantités</text>
          <line x1="40" y1="38" x2="292" y2="200" stroke={N.rose} strokeWidth={2.2} />
          <line x1="40" y1="182" x2="264" y2="38" stroke={N.cyan} strokeWidth={2.2} />
          <line x1="152" y1="110" x2="152" y2="200" stroke={N.muted} strokeWidth={1} strokeDasharray="3,3" />
          <line x1="40" y1="110" x2="152" y2="110" stroke={N.muted} strokeWidth={1} strokeDasharray="3,3" />
          <circle cx="152" cy="110" r="5" fill={N.vert} />
          <text x="158" y="106" fontSize="10" fontWeight="700" fill={N.vert}>E</text>
          <text x="14" y="114" fontSize="9" fill={N.muted}>Pe=5</text>
          <text x="138" y="213" fontSize="9" fill={N.muted}>Qe=8</text>
          <text x="262" y="195" fontSize="10" fontWeight="700" fill={N.rose}>Demande</text>
          <text x="200" y="55" fontSize="10" fontWeight="700" fill={N.cyan}>Offre</text>
        </svg>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 8, fontSize: 11, fontFamily: "'Space Grotesk', sans-serif" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5, color: N.muted }}><span style={{ width: 14, height: 3, borderRadius: 2, background: N.cyan, display: "inline-block" }} />Offre (croissante)</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5, color: N.muted }}><span style={{ width: 14, height: 3, borderRadius: 2, background: N.rose, display: "inline-block" }} />Demande (décroissante)</span>
        </div>
        <div style={{ fontSize: 11, color: N.muted, textAlign: "center", marginTop: 6, fontFamily: "'Space Grotesk', sans-serif" }}>
          Le point E (Pe = 5 €, Qe = 8) est le seul prix où l'offre rencontre exactement la demande.
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead><tr><th>Prix</th><th>Qté demandée</th><th>Qté offerte</th><th>Situation</th></tr></thead>
          <tbody>
            <tr><td>3 €</td><td>12</td><td>4</td><td>Pénurie (demande &gt; offre)</td></tr>
            <tr className="eq-row"><td>5 €</td><td>8</td><td>8</td><td>Équilibre</td></tr>
            <tr><td>7 €</td><td>4</td><td>12</td><td>Excédent (offre &gt; demande)</td></tr>
          </tbody>
        </table>
      </div>
      <DefBox color="vert" label="📌 Le marché s'autorégule">
        Si le prix est <strong style={{ color: N.vert }}>au-dessus</strong> de Pe, il y a <strong style={{ color: N.vert }}>excédent</strong> (offre &gt; demande) : les prix <strong style={{ color: N.vert }}>baissent</strong> pour revenir à l'équilibre. Si le prix est <strong style={{ color: N.vert }}>en-dessous</strong> de Pe, il y a <strong style={{ color: N.vert }}>pénurie</strong> (demande &gt; offre) : les prix <strong style={{ color: N.vert }}>augmentent</strong>. Le marché a un caractère <strong style={{ color: N.vert }}>auto-régulateur</strong> : il converge en permanence vers Pe.
      </DefBox>

      <SectionTitle color={N.rose}>6. Les chocs d'offre et de demande</SectionTitle>
      <Accordion
        items={[
          {
            title: "Choc d'offre négatif",
            dotColor: N.rose,
            content: "Une perturbation <strong>exogène</strong> détruit des ressources productives : la courbe d'offre se déplace vers la <strong>gauche</strong>. La demande étant inchangée, le nouveau prix d'équilibre est <strong>supérieur</strong> et la quantité d'équilibre <strong>inférieure</strong>.<br><br>📌 Exemple : une catastrophe naturelle détruit des récoltes → moins de blé disponible à chaque prix → le prix du pain augmente.",
          },
          {
            title: "Choc d'offre positif",
            dotColor: N.vert,
            content: "La capacité à produire <strong>augmente</strong> : la courbe d'offre se déplace vers la <strong>droite</strong>. Le nouveau prix d'équilibre est <strong>inférieur</strong> et la quantité d'équilibre <strong>supérieure</strong>.<br><br>📌 Exemple : une baisse du prix des matières premières permet de produire davantage à moindre coût.",
          },
          {
            title: "Choc de demande négatif",
            dotColor: N.rose,
            content: "La demande des ménages <strong>diminue</strong> : la courbe de demande se déplace vers la <strong>gauche</strong>. L'offre étant inchangée, le nouveau prix d'équilibre est <strong>inférieur</strong> et la quantité d'équilibre <strong>inférieure</strong>.<br><br>📌 Exemple : une information négative sur un produit (rappel sanitaire) fait fuir les consommateurs.",
          },
          {
            title: "Choc de demande positif",
            dotColor: N.cyan,
            content: "La demande des ménages <strong>augmente</strong> : la courbe de demande se déplace vers la <strong>droite</strong>. L'offre étant inchangée, le nouveau prix d'équilibre est <strong>supérieur</strong> et la quantité d'équilibre <strong>supérieure</strong>.<br><br>📌 Exemple : une mode soudaine (un produit devient « tendance ») fait grimper la demande et le prix.",
          },
        ]}
      />

      <SectionTitle color={N.ambre}>7. Les effets d'une taxe</SectionTitle>
      <DefBox color="ambre" label="📌 Définition">
        Une <strong>taxe</strong> est un prélèvement obligatoire réalisé par l'État, souvent pour orienter les comportements (ex. l'éco-taxe sur l'essence).
      </DefBox>
      <CardGrid
        cards={[
          { badge: "Taxe sur le producteur", title: "L'offre se déplace à gauche", text: "Pour chaque prix, l'offreur propose moins (coût supplémentaire). Résultat : quantités ↓, prix payé par l'acheteur ↑. L'écart entre prix payé et prix perçu, c'est la taxe.", badgeColor: N.rose },
          { badge: "Taxe sur l'acheteur", title: "La demande se déplace à gauche", text: "L'acheteur achète moins à chaque prix. Résultat : quantités ↓, prix d'équilibre ↓. Dans les deux cas, la taxe est in fine partagée entre acheteurs et vendeurs.", badgeColor: N.rose },
        ]}
      />

      <SectionTitle color={N.vert}>8. Les effets d'une subvention</SectionTitle>
      <DefBox color="vert" label="📌 Définition">
        Une <strong>subvention</strong> est une somme versée par l'État, sans contrepartie, pour soutenir une activité (investissement des entreprises, consommation des ménages).
      </DefBox>
      <CardGrid
        cards={[
          { badge: "Subvention au producteur", title: "L'offre se déplace à droite", text: "L'offreur propose plus à chaque prix (aide perçue). Résultat : quantités ↑, prix d'équilibre ↓.", badgeColor: N.vert },
          { badge: "Subvention à l'acheteur", title: "La demande se déplace à droite", text: "L'acheteur achète plus à chaque prix. Résultat : quantités ↑, prix d'équilibre ↑.", badgeColor: N.vert },
        ]}
      />
    </div>
  );
}

function StepDonnees() {
  return (
    <div>
      <DefBox color="cyan" label="📐 Savoir-faire · Identifier différents marchés">
        <strong>Exercice :</strong> classe ces marchés — le marché de Rungis, le marché du pétrole, la Bourse de Paris, un marché de quartier le dimanche matin, une plateforme de billets de train en ligne, le marché de la coiffure dans ta ville.<br /><br />
        <strong style={{ color: N.cyan }}>Pour chacun, précise :</strong> bien ou service ? échelle locale/nationale/mondiale ? matérialisé ou dématérialisé ?<br /><br />
        <em style={{ color: N.muted }}>Exemple de correction : le marché du pétrole échange un <strong style={{ color: N.cyan }}>bien</strong>, à l'échelle <strong style={{ color: N.cyan }}>mondiale</strong>, et fonctionne de façon largement <strong style={{ color: N.cyan }}>dématérialisée</strong> (cotations).</em>
      </DefBox>

      <SectionTitle color={N.violet}>📐 Savoir-faire · Construire et lire un graphique offre-demande</SectionTitle>
      <DefBox color="violet" label="Le marché des smoothies">
        <strong>Données :</strong><br />
        Prix 2 € → demande : 14 — offre : 2<br />
        Prix 4 € → demande : 10 — offre : 6<br />
        Prix 6 € → demande : 6 — offre : 10<br />
        Prix 8 € → demande : 2 — offre : 14<br /><br />
        <strong style={{ color: N.violet }}>1.</strong> Place ces points sur un graphique (prix en ordonnée, quantités en abscisse) et trace les courbes.<br />
        <strong style={{ color: N.violet }}>2.</strong> À quel prix les courbes se coupent-elles ?<br />
        <strong style={{ color: N.violet }}>3.</strong> Que se passe-t-il à 8 € ? Et à 2 € ?<br /><br />
        <strong style={{ color: N.violet }}>Correction :</strong> le prix d'équilibre est d'environ <strong style={{ color: N.violet }}>5 €</strong>, pour une quantité d'équilibre de <strong style={{ color: N.violet }}>8</strong>. À 8 €, il y a un <strong style={{ color: N.violet }}>excédent</strong> (12 de plus offerts que demandés) qui pousse le prix à baisser. À 2 €, il y a une <strong style={{ color: N.violet }}>pénurie</strong> qui pousse le prix à monter.
      </DefBox>

      <SectionTitle color={N.ambre}>📐 Savoir-faire · Analyser l'effet d'une taxe</SectionTitle>
      <DefBox color="ambre" label="L'éco-taxe sur l'essence">
        Pour réduire la consommation d'essence, l'État envisage une éco-taxe versée par les distributeurs de carburant à chaque litre vendu. Cette taxe représente un coût supplémentaire pour les distributeurs, qui répercutent en partie cette hausse sur le prix payé par les automobilistes.<br /><br />
        <strong style={{ color: N.ambre }}>1.</strong> Cette taxe est-elle instaurée pour le producteur ou pour l'acheteur ?<br />
        <strong style={{ color: N.ambre }}>2.</strong> Dans quel sens se déplace la courbe d'offre ? Pourquoi ?<br />
        <strong style={{ color: N.ambre }}>3.</strong> Quel est l'effet attendu sur le prix payé et sur les quantités échangées ?<br /><br />
        <strong style={{ color: N.ambre }}>Correction :</strong> la taxe est instaurée pour le <strong style={{ color: N.ambre }}>producteur</strong> (le distributeur). L'offre se déplace vers la <strong style={{ color: N.ambre }}>gauche</strong> (coût supplémentaire par litre). Résultat : le prix payé à la pompe <strong style={{ color: N.ambre }}>augmente</strong> et les quantités d'essence consommées <strong style={{ color: N.ambre }}>diminuent</strong> — ce qui correspond à l'objectif recherché.
      </DefBox>
    </div>
  );
}

function StepErreurs() {
  const errors = [
    {
      erreur: "Confondre « déplacement de la courbe » et « mouvement le long de la courbe »",
      explication: "Une variation du PRIX fait bouger le point le long d'une courbe inchangée (mouvement le long de la courbe). Un choc EXOGÈNE (catastrophe, mode, technologie) déplace la courbe elle-même vers la gauche ou la droite. Ce sont deux mécanismes différents.",
      exemple: "Si le prix du blé augmente, on se déplace le long de la courbe d'offre existante. Si une sécheresse détruit les récoltes, c'est la courbe d'offre elle-même qui se déplace vers la gauche.",
      c: N.rose,
    },
    {
      erreur: "Confondre « offre/demande » et « quantité offerte/demandée »",
      explication: "L'offre et la demande sont des fonctions (des courbes entières). La quantité offerte/demandée est une valeur précise, associée à UN niveau de prix donné. On ne dit pas « l'offre est de 10 » mais « la quantité offerte est de 10 au prix de 2 € ».",
      exemple: "Dire « la demande a augmenté » signifie que la courbe entière s'est déplacée, pas qu'un seul point a changé.",
      c: N.ambre,
    },
    {
      erreur: "Croire qu'une taxe n'est payée que par celui sur qui elle est officiellement instaurée",
      explication: "Que la taxe soit prélevée auprès du producteur ou de l'acheteur, son coût est en réalité PARTAGÉ entre les deux : le prix payé par l'acheteur augmente, le prix perçu par le vendeur diminue. La répartition dépend de la sensibilité de l'offre et de la demande au prix.",
      exemple: "Une taxe sur les carburants prélevée auprès des distributeurs se traduit malgré tout par une hausse du prix à la pompe payé par les automobilistes.",
      c: N.rose,
    },
    {
      erreur: "Confondre excédent et pénurie",
      explication: "L'EXCÉDENT (offre > demande) survient quand le prix est AU-DESSUS du prix d'équilibre, et fait BAISSER les prix. La PÉNURIE (demande > offre) survient quand le prix est EN-DESSOUS du prix d'équilibre, et fait AUGMENTER les prix.",
      exemple: "À un prix de 7 € (au-dessus de Pe=5€), l'offre (12) dépasse la demande (4) : c'est un excédent, pas une pénurie.",
      c: N.ambre,
    },
    {
      erreur: "Oublier l'hypothèse « toutes choses égales par ailleurs »",
      explication: "Les lois de l'offre et de la demande ne sont valables QUE si les autres déterminants (revenu, goûts, prix des autres biens, technologie) restent constants. Si plusieurs facteurs changent en même temps, l'effet sur le prix n'est plus aussi simple à prévoir.",
      exemple: "Si le prix du pétrole baisse EN MÊME TEMPS qu'une vague de froid augmente la demande de chauffage, il faut analyser les deux effets séparément avant de conclure sur le prix final.",
      c: N.violet,
    },
    {
      erreur: "Penser que la concurrence pure et parfaite décrit la réalité de tous les marchés",
      explication: "La CPP est un MODÈLE THÉORIQUE simplifié (atomicité, homogénéité, transparence…), pas une description fidèle de chaque marché réel. De nombreux marchés sont en situation de monopole ou d'oligopole, étudiés en détail en 1re.",
      exemple: "Le marché de l'électricité ou des télécoms compte peu d'offreurs (oligopole) : les hypothèses de la CPP ne s'y vérifient pas.",
      c: N.violet,
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
      <DefBox color="cyan" label="📝 Fiche mémo — L'essentiel à retenir">
        Un <strong style={{ color: N.cyan }}>marché</strong> est un lieu de rencontre entre une offre et une demande qui aboutit à un prix. La demande <strong style={{ color: N.cyan }}>baisse</strong> quand le prix monte, l'offre <strong style={{ color: N.cyan }}>monte</strong> quand le prix monte.
      </DefBox>

      <SectionTitle color={N.cyan}>L'équilibre en un coup d'œil</SectionTitle>
      <div style={{ fontSize: 13, color: N.text, lineHeight: 1.8, background: N.bgCard, border: `1px solid ${N.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>
        📈 <strong style={{ color: N.cyan }}>Au-dessus de Pe</strong> → excédent → le prix baisse<br />
        📉 <strong style={{ color: N.ambre }}>En-dessous de Pe</strong> → pénurie → le prix monte<br />
        ✅ <strong style={{ color: N.vert }}>À Pe</strong> → équilibre stable
      </div>

      <SectionTitle color={N.ambre}>Effets sur le prix et la quantité d'équilibre</SectionTitle>
      {[
        ["Choc d'offre négatif", "Prix ↑ · Quantité ↓", N.rose],
        ["Choc d'offre positif", "Prix ↓ · Quantité ↑", N.vert],
        ["Choc de demande négatif", "Prix ↓ · Quantité ↓", N.rose],
        ["Choc de demande positif", "Prix ↑ · Quantité ↑", N.cyan],
        ["Taxe (producteur ou acheteur)", "Prix payé ↑ · Quantité ↓", N.ambre],
        ["Subvention (producteur ou acheteur)", "Quantité ↑ · effet mixte sur le prix", N.vert],
      ].map(([label, effect, c]) => (
        <div key={label} style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between", background: N.bgCard, border: `1px solid ${N.border}`, borderRadius: 8, padding: "9px 12px", marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: c, fontFamily: "'Space Grotesk', sans-serif" }}>{label}</span>
          <span style={{ fontSize: 11, color: N.muted, fontFamily: "'Space Grotesk', sans-serif" }}>{effect}</span>
        </div>
      ))}

      <SectionTitle color={N.violet}>À retenir absolument</SectionTitle>
      <DefBox color="violet" label="Les 2 réflexes clés">
        1. <strong>Choc</strong> = la courbe entière se déplace (gauche ou droite). <strong>Variation de prix</strong> = on bouge le long d'une courbe inchangée.<br />
        2. Une taxe ou une subvention est toujours <strong>partagée</strong> entre acheteurs et vendeurs, quel que soit celui sur qui elle est officiellement instaurée.
      </DefBox>

      {/* Ressources */}
      <SectionTitle color={N.muted}>🔗 Pour aller plus loin</SectionTitle>
      {[
        { icon: "📊", titre: "INSEE — Évolution du cours du pétrole", url: "https://www.insee.fr/fr/statistiques/4125310", tag: "Statistiques" },
        { icon: "🎬", titre: "Académie de Lyon — Identifier différents marchés", url: "http://ses.enseigne.ac-lyon.fr/spip/spip.php?article75&lang=fr", tag: "Vidéo" },
        { icon: "🏠", titre: "Académie de Nantes — Le marché de l'immobilier", url: "https://www.pedagogie.ac-nantes.fr/html/peda/sceco/marchimmob/debut.html", tag: "Vidéo + activité" },
        { icon: "🎮", titre: "Académie de Strasbourg — Jeu sérieux sur les marchés", url: "https://www.ac-strasbourg.fr/pedagogie/ses/ressources-pedagogiques/seconde/projet-jeuserieux-marche/", tag: "Jeu pédagogique" },
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
export default function FormationPrixPage() {
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
        tr.eq-row td { background: ${N.vertBg}; color: ${N.vert}; font-weight: 600; }

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
        <span style={{ fontSize: 13, color: N.text, fontFamily: "'Space Grotesk', sans-serif" }}>Formation des prix</span>
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
            Q 03 · Science économique · Seconde
          </div>
          <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, fontFamily: "'Syne', sans-serif", color: N.text, margin: 0, lineHeight: 1.2, marginBottom: 8 }}>
            Comment se forment les prix<br />
            <span style={{ color: N.cyan }}>sur un marché ?</span>
          </h1>
          <div style={{ fontSize: 13, color: N.muted, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 10 }}>
            Programme Éduscol 2019 · 8 étapes de révision
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Offre", "Demande", "Prix d'équilibre", "Taxe", "Subvention"].map((tg) => (
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
