"use client";
import Link from "next/link";
import { useState } from "react";

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

// ── Étapes ────────────────────────────────────────────────────────
const STEPS = [
  { id: 0, icon: "🎯", label: "Objectifs" },
  { id: 1, icon: "❓", label: "Questionnement" },
  { id: 2, icon: "📚", label: "Notions clés" },
  { id: 3, icon: "📖", label: "Cours" },
  { id: 4, icon: "📊", label: "Données" },
  { id: 5, icon: "⚠️", label: "Erreurs" },
  { id: 6, icon: "🧠", label: "Quiz" },
  { id: 7, icon: "📝", label: "Mémo" },
];

// ── Quiz ───────────────────────────────────────────────────────────
type Question = { q: string; opts: string[]; correct: number; fb: string };
const QUESTIONS: Question[] = [
  {
    q: "Laquelle de ces activités EST comptabilisée comme production au sens économique ?",
    opts: ["Un parent prépare le repas pour sa famille","Un bénévole aide dans une association","Une boulangerie vend des croissants","Un jardinier entretient son propre jardin"],
    correct: 2,
    fb: "Seule la boulangerie réalise une production au sens économique : biens créés et vendus sur un marché. Le travail domestique et le bénévolat ne donnent pas lieu à une transaction marchande rémunérée.",
  },
  {
    q: "Un lycée public propose des cours gratuits. Quelle est la nature de cette production ?",
    opts: ["Production marchande, car elle a de la valeur","Production non marchande, fournie gratuitement","Ce n'est pas une production car il n'y a pas de profit","Production marchande indirecte"],
    correct: 1,
    fb: "La production non marchande est fournie gratuitement ou à un prix couvrant moins de 50 % des coûts. Le lycée public est financé par les prélèvements obligatoires.",
  },
  {
    q: "Une coopérative agricole qui réinvestit ses bénéfices et fonctionne démocratiquement relève de :",
    opts: ["Une entreprise privée classique","Une administration publique","L'Économie Sociale et Solidaire (ESS)","Une multinationale"],
    correct: 2,
    fb: "L'ESS regroupe les coopératives, mutuelles, associations et fondations dont le fonctionnement repose sur la solidarité et l'utilité sociale. Les bénéfices y sont réinvestis.",
  },
  {
    q: "Une entreprise a un CA de 200 000 € et des consommations intermédiaires de 80 000 €. Sa valeur ajoutée est :",
    opts: ["280 000 €","200 000 €","120 000 €","80 000 €"],
    correct: 2,
    fb: "VA = Chiffre d'affaires − Consommations intermédiaires = 200 000 − 80 000 = 120 000 €. La VA mesure la richesse réellement créée par l'entreprise.",
  },
  {
    q: "Pourquoi calcule-t-on le PIB en additionnant les valeurs ajoutées plutôt que les chiffres d'affaires ?",
    opts: ["Car les CA sont difficiles à collecter","Pour éviter de compter plusieurs fois les mêmes richesses","Car les VA sont toujours plus grandes","Par convention sans justification économique"],
    correct: 1,
    fb: "Additionner les CA provoquerait des doubles comptages : la farine apparaît dans le CA du meunier ET du boulanger. La VA évite ce problème en ne retenant que la richesse ajoutée à chaque étape.",
  },
  {
    q: "Les « Trente Glorieuses » (1945-1973) se caractérisent par :",
    opts: ["Une croissance faible d'environ 0,5 % par an","Une période de décroissance","Une forte croissance entre 4 et 7 % par an","Une stagnation du PIB mondial"],
    correct: 2,
    fb: "Les Trente Glorieuses (expression de Jean Fourastié) désignent la période 1945-1973 avec une croissance exceptionnelle de 4 à 7 % par an dans les pays développés.",
  },
  {
    q: "Lequel illustre une limite ÉCOLOGIQUE de la croissance ?",
    opts: ["Le PIB ne tient pas compte des inégalités","L'augmentation des émissions de CO₂ liée à l'activité industrielle","Le travail domestique n'est pas dans le PIB","Le PIB par habitant est une moyenne"],
    correct: 1,
    fb: "Les limites écologiques renvoient aux externalités négatives : épuisement des ressources, GES, déforestation, perte de biodiversité. Les autres propositions sont des limites sociales ou statistiques du PIB.",
  },
  {
    q: "La croissance économique est définie comme :",
    opts: ["L'augmentation du nombre d'habitants","La hausse des prix à la consommation","L'augmentation soutenue du PIB en volume sur une longue période","La réduction des inégalités grâce au développement"],
    correct: 2,
    fb: "Définition de François Perroux : « l'augmentation soutenue, pendant une ou plusieurs périodes longues, d'un indicateur de dimension — pour une nation, le produit global en termes réels ». Mesurée par le taux de variation du PIB en VOLUME.",
  },
];

// ── Composants UI ─────────────────────────────────────────────────
function DefBox({ color, label, children }: { color: "violet"|"cyan"|"ambre"|"rose"|"vert"; label: string; children: React.ReactNode }) {
  const map = {
    violet: { bg: N.violetBg, bd: N.violetBd, lc: N.violet },
    cyan:   { bg: N.cyanBg,   bd: N.cyanBd,   lc: N.cyan   },
    ambre:  { bg: N.ambreBg,  bd: N.ambreBd,  lc: N.ambre  },
    rose:   { bg: N.roseBg,   bd: N.roseBd,   lc: N.rose   },
    vert:   { bg: N.vertBg,   bd: N.vertBd,   lc: N.vert   },
  };
  const c = map[color];
  return (
    <div style={{ background: c.bg, border: `0.5px solid ${c.bd}`, borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: c.lc, marginBottom: 5, textTransform: "uppercase" as const }}>{label}</div>
      <div style={{ fontSize: 13, color: N.text, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

function STitle({ children, color = N.violet }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 10, marginBottom: 10, marginTop: 18, fontSize: 14, fontWeight: 700, color }}>
      {children}
    </div>
  );
}

function QuizStep() {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[qi];

  const handleAnswer = (i: number) => {
    if (answered !== null) return;
    setAnswered(i);
    if (i === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (qi + 1 >= QUESTIONS.length) { setDone(true); return; }
    setQi((q) => q + 1);
    setAnswered(null);
  };

  const reset = () => { setQi(0); setScore(0); setAnswered(null); setDone(false); };

  if (done) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    const col = pct >= 70 ? N.vert : pct >= 50 ? N.ambre : N.rose;
    const msg = pct >= 70 ? "🎉 Excellent ! Tu maîtrises ce chapitre." : pct >= 50 ? "👍 Bien ! Revois les notions où tu as buté." : "📚 Reprends le Cours et les Notions avant de réessayer.";
    return (
      <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
        <div style={{ fontSize: 52, fontWeight: 800, color: col, marginBottom: 8 }}>{score}/{QUESTIONS.length}</div>
        <div style={{ fontSize: 13, color: N.muted, marginBottom: "1.5rem" }}>{msg}</div>
        <button onClick={reset} style={{ background: N.accent, color: "#fff", border: "none", padding: "0.55rem 1.4rem", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          🔄 Recommencer
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress dots */}
      <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
        {QUESTIONS.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < qi ? N.violet : i === qi ? "rgba(196,184,255,0.4)" : N.border }} />
        ))}
      </div>
      <div style={{ fontSize: 11, color: N.muted, marginBottom: 8 }}>Question {qi + 1} / {QUESTIONS.length} — Score : {score}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: N.text, lineHeight: 1.55, marginBottom: 14 }}>{q.q}</div>
      <div style={{ display: "flex", flexDirection: "column" as const, gap: 7, marginBottom: 12 }}>
        {q.opts.map((opt, i) => {
          let bg = N.bgCard;
          let bd = N.border;
          let col = N.text;
          if (answered !== null) {
            if (i === q.correct) { bg = N.vertBg; bd = N.vert; col = N.vert; }
            else if (i === answered) { bg = N.roseBg; bd = N.rose; col = N.rose; }
          }
          return (
            <button key={i} onClick={() => handleAnswer(i)} disabled={answered !== null}
              style={{ textAlign: "left" as const, padding: "11px 13px", borderRadius: 8, border: `0.5px solid ${bd}`, background: bg, color: col, fontSize: 13, cursor: answered !== null ? "not-allowed" : "pointer", lineHeight: 1.5, transition: "all 0.15s" }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered !== null && (
        <div style={{ fontSize: 12, color: N.muted, background: N.bgCardMd, border: `0.5px solid ${N.border}`, borderRadius: 8, padding: "10px 12px", marginBottom: 12, lineHeight: 1.65 }}>
          {q.fb}
        </div>
      )}
      {answered !== null && (
        <button onClick={next} style={{ background: N.accent, color: "#fff", border: "none", padding: "0.5rem 1.2rem", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          {qi === QUESTIONS.length - 1 ? "Voir mon résultat →" : "Question suivante →"}
        </button>
      )}
    </div>
  );
}

// ── Page principale ────────────────────────────────────────────────
export default function CreationRichessesPage() {
  const [step, setStep] = useState(0);

  const renderStep = () => {
    switch (step) {

      // ── 0 OBJECTIFS ──────────────────────────────────────────────
      case 0: return (
        <div>
          <DefBox color="violet" label="🔍 Prologue · Comment raisonnent les économistes ?">
            La science économique pose une question centrale : <strong style={{ color: N.violet }}>comment allouer des ressources rares entre des besoins illimités ?</strong> Les économistes formulent des hypothèses, construisent des modèles et les confrontent à des données empiriques. Ils distinguent causalité et corrélation.
          </DefBox>

          <STitle color={N.cyan}>À la fin de cette fiche, tu sauras :</STitle>
          {[
            ["Illustrer la diversité des producteurs", "(entreprises, administrations, ESS)"],
            ["Distinguer production marchande et non marchande", "(critère des 50 % des coûts)"],
            ["Expliquer la combinaison des facteurs de production", "(travail, capital, technologie, ressources naturelles)"],
            ["Calculer et interpréter", "CA, valeur ajoutée, bénéfice"],
            ["Comprendre le PIB", "= somme des valeurs ajoutées"],
            ["Expliquer la croissance économique", "= variation du PIB, tendances sur plusieurs siècles"],
            ["Identifier les limites du PIB", "(inégalités) et les limites écologiques de la croissance"],
          ].map(([titre, detail], i) => (
            <div key={i} style={{ display: "flex", gap: 10, padding: "9px 12px", background: N.bgCard, border: `0.5px solid ${N.border}`, borderRadius: 8, marginBottom: 6, alignItems: "flex-start" }}>
              <span style={{ width: 20, height: 20, borderRadius: "50%", background: N.violetBg, border: `0.5px solid ${N.violetBd}`, color: N.violet, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
              <span style={{ fontSize: 13, color: N.text, lineHeight: 1.5 }}>
                <strong>{titre}</strong>
                <span style={{ color: N.muted }}> {detail}</span>
              </span>
            </div>
          ))}

          <div style={{ marginTop: 14, background: N.ambreBg, border: `0.5px solid ${N.ambreBd}`, borderRadius: 10, padding: "10px 14px", fontSize: 12, color: N.ambre }}>
            ⏱ Temps estimé : <strong>20 minutes</strong> · Difficulté : <strong>Accessible</strong>
          </div>
        </div>
      );

      // ── 1 QUESTIONNEMENT ─────────────────────────────────────────
      case 1: return (
        <div>
          <div style={{ background: "rgba(126,238,255,0.07)", border: `0.5px solid ${N.cyanBd}`, borderRadius: 14, padding: "1.4rem", marginBottom: 14, textAlign: "center" as const }}>
            <div style={{ fontSize: 11, color: N.cyan, letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: 8 }}>Question centrale</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: N.text, lineHeight: 1.3, fontFamily: "'Syne', sans-serif" }}>
              Comment crée-t-on des richesses<br />et comment les mesure-t-on ?
            </div>
          </div>

          <STitle color={N.cyan}>Pourquoi cette question est-elle importante ?</STitle>
          <p style={{ fontSize: 13, color: N.muted, lineHeight: 1.7, marginBottom: 14 }}>
            Chaque jour, des millions d'acteurs produisent des biens et des services. Mais qu'est-ce que « créer de la richesse » exactement ? Comment comparer la production d'une boulangerie, d'un hôpital public et d'une association caritative ? Et comment mesurer la richesse d'un pays entier ?
          </p>

          <STitle color={N.violet}>La problématique en 3 temps</STitle>
          {[
            { n: "1", titre: "Qui produit et quoi ?", txt: "La production est réalisée par une diversité d'acteurs (entreprises, administrations, ESS) et peut être marchande ou non marchande.", c: N.violet },
            { n: "2", titre: "Comment mesure-t-on la richesse ?", txt: "On utilise la valeur ajoutée pour mesurer la contribution de chaque entreprise, et le PIB pour agréger la richesse d'un pays.", c: N.cyan },
            { n: "3", titre: "Quelles sont les limites de ces mesures ?", txt: "Le PIB est un indicateur global qui masque les inégalités et ne rend pas compte des dégradations environnementales.", c: N.ambre },
          ].map((item) => (
            <div key={item.n} style={{ display: "flex", gap: 12, background: N.bgCard, border: `0.5px solid ${N.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8, alignItems: "flex-start" }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: item.c, fontFamily: "'Syne', sans-serif", flexShrink: 0, marginTop: 1 }}>{item.n}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: item.c, marginBottom: 3 }}>{item.titre}</div>
                <div style={{ fontSize: 12, color: N.muted, lineHeight: 1.6 }}>{item.txt}</div>
              </div>
            </div>
          ))}
        </div>
      );

      // ── 2 NOTIONS CLÉS ───────────────────────────────────────────
      case 2: return (
        <div>
          {[
            { mot: "Production", def: "Activité socialement organisée qui consiste à créer des biens et des services contribuant à satisfaire des besoins.", color: "cyan" as const },
            { mot: "Production marchande", def: "Production vendue sur un marché à un prix couvrant plus de 50 % des coûts de production.", color: "cyan" as const },
            { mot: "Production non marchande", def: "Production fournie gratuitement ou à un prix couvrant moins de 50 % des coûts. Financée par les prélèvements obligatoires.", color: "violet" as const },
            { mot: "Économie Sociale et Solidaire (ESS)", def: "Ensemble d'organisations (coopératives, mutuelles, associations, fondations) dont le fonctionnement repose sur la solidarité, l'utilité sociale et la gouvernance démocratique.", color: "vert" as const },
            { mot: "Facteurs de production", def: "Éléments mis en œuvre dans la production : facteur travail, facteur capital (fixe et circulant), technologie et ressources naturelles.", color: "ambre" as const },
            { mot: "Capital fixe", def: "Biens de production durables utilisés lors de plusieurs cycles de production (machines, bâtiments). Utilisés pendant au moins un an.", color: "ambre" as const },
            { mot: "Capital circulant", def: "Capital technique transformé ou détruit au cours du processus de production (matières premières, énergie).", color: "ambre" as const },
            { mot: "Chiffre d'affaires (CA)", def: "Recettes totales de l'entreprise : CA = quantités vendues × prix de vente.", color: "violet" as const },
            { mot: "Valeur ajoutée (VA)", def: "Richesse réellement créée par l'entreprise : VA = CA − Consommations intermédiaires.", color: "violet" as const },
            { mot: "Bénéfice", def: "Différence positive entre les recettes totales et l'ensemble des charges (y compris les salaires, CI, impôts…).", color: "violet" as const },
            { mot: "PIB (Produit Intérieur Brut)", def: "Somme des valeurs ajoutées de toutes les unités de production résidentes. Mesure la richesse créée sur un territoire en une année.", color: "cyan" as const },
            { mot: "Croissance économique", def: "Augmentation soutenue du PIB en volume sur une longue période (définition de François Perroux).", color: "cyan" as const },
          ].map((n) => (
            <DefBox key={n.mot} color={n.color} label={n.mot}>
              {n.def}
            </DefBox>
          ))}
        </div>
      );

      // ── 3 COURS ──────────────────────────────────────────────────
      case 3: return (
        <div>
          <STitle color={N.cyan}>1. Qu'est-ce que produire ?</STitle>
          <DefBox color="cyan" label="📌 Définition INSEE">
            <strong>Produire</strong>, c'est créer des <strong>biens</strong> (matériels et stockables) ou des <strong>services</strong> (immatériels et non stockables) afin de satisfaire des besoins. L'INSEE définit la production comme « une activité exercée sous le contrôle d'une unité institutionnelle qui combine des ressources pour fabriquer des biens ou fournir des services ».
          </DefBox>
          <DefBox color="ambre" label="⚠️ Attention">
            Les <strong>activités domestiques</strong> (cuisiner chez soi, jardiner…) et le <strong>bénévolat</strong> ne sont <strong>pas</strong> comptabilisés comme production économique : ils ne donnent pas lieu à une transaction marchande rémunérée.
          </DefBox>

          <STitle color={N.cyan}>2. Production marchande vs non marchande</STitle>
          <div style={{ overflowX: "auto" as const }}>
            <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 12, marginBottom: 12 }}>
              <thead>
                <tr>
                  {["Type", "Prix de vente", "Financement", "Exemples"].map((h) => (
                    <th key={h} style={{ background: "rgba(255,255,255,0.06)", padding: "8px 10px", textAlign: "left" as const, fontWeight: 700, color: N.muted, borderBottom: `0.5px solid ${N.border}`, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Marchande", "&gt; 50 % des coûts", "Ventes", "Supermarché, restaurant, voiture"],
                  ["Non marchande", "&lt; 50 % des coûts (ou gratuit)", "Prélèvements obligatoires", "École publique, hôpital public"],
                ].map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} dangerouslySetInnerHTML={{ __html: cell }} style={{ padding: "8px 10px", borderBottom: `0.5px solid ${N.border}`, color: j === 0 ? N.cyan : N.text, fontWeight: j === 0 ? 700 : 400, fontSize: 12, lineHeight: 1.5 }} />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <STitle color={N.violet}>3. La diversité des producteurs</STitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8, marginBottom: 14 }}>
            {[
              { icon: "🏭", titre: "Entreprises", badge: "Production marchande", txt: "But lucratif. Produisent des biens et services vendus sur le marché.", c: N.cyan, bg: N.cyanBg, bd: N.cyanBd },
              { icon: "🏛️", titre: "Administrations", badge: "Production non marchande", txt: "État, collectivités, Sécu. Financées par les prélèvements. Servent l'intérêt général.", c: N.violet, bg: N.violetBg, bd: N.violetBd },
              { icon: "🤝", titre: "ESS", badge: "Utilité sociale", txt: "Associations, mutuelles, coopératives. Bénéfices réinvestis. Gouvernance démocratique.", c: N.vert, bg: N.vertBg, bd: N.vertBd },
            ].map((p) => (
              <div key={p.titre} style={{ background: p.bg, border: `0.5px solid ${p.bd}`, borderRadius: 10, padding: "12px" }}>
                <div style={{ fontSize: 18, marginBottom: 5 }}>{p.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: p.c, marginBottom: 4 }}>{p.titre}</div>
                <div style={{ fontSize: 10, color: p.c, background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "2px 7px", display: "inline-block", marginBottom: 6 }}>{p.badge}</div>
                <div style={{ fontSize: 11, color: N.muted, lineHeight: 1.5 }}>{p.txt}</div>
              </div>
            ))}
          </div>

          <STitle color={N.ambre}>4. Les facteurs de production</STitle>
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

          <STitle color={N.violet}>5. Mesurer la richesse d'une entreprise</STitle>
          {[
            { label: "Chiffre d'affaires", formula: "CA = Quantités vendues × Prix de vente", desc: "Les recettes totales. Ne mesure pas la richesse créée car il inclut les achats à d'autres entreprises.", c: N.violet },
            { label: "Valeur ajoutée", formula: "VA = CA − Consommations intermédiaires", desc: "La richesse RÉELLEMENT créée par l'entreprise. On soustrait ce qu'elle a acheté à d'autres.", c: N.cyan },
            { label: "Bénéfice", formula: "Bénéfice = Recettes totales − Total des charges", desc: "Ce qu'il reste à l'entreprise après avoir payé tous ses coûts (salaires, loyer, CI, impôts…).", c: N.vert },
          ].map((f) => (
            <div key={f.label} style={{ background: N.bgCard, border: `0.5px solid ${N.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: f.c, fontWeight: 700, marginBottom: 5, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>{f.label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: f.c, fontFamily: "monospace", marginBottom: 6, background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "6px 10px" }}>{f.formula}</div>
              <div style={{ fontSize: 12, color: N.muted, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}

          <STitle color={N.cyan}>6. Du PIB à la croissance économique</STitle>
          <DefBox color="cyan" label="PIB = Somme des valeurs ajoutées">
            On additionne les VA (et non les CA) pour <strong>éviter les doubles comptages</strong>. Si on additionnait les CA, la farine serait comptée chez le meunier ET chez le boulanger. La VA ne retient que ce que chaque entreprise a <em>réellement créé</em>.
          </DefBox>
          <DefBox color="cyan" label="Croissance = Variation du PIB en volume">
            Croissance économique (F. Perroux) = « augmentation soutenue du produit global en termes réels sur une longue période ». On calcule le taux de variation du PIB <strong>en volume</strong> (hors inflation).
          </DefBox>

          <STitle color={N.rose}>7. Les limites du PIB</STitle>
          {[
            { t: "Limite sociale", txt: "Le PIB par habitant est une MOYENNE. Il masque les inégalités de revenus. Un pays peut avoir un PIB/hab élevé et des millions de pauvres.", c: N.rose },
            { t: "Limites écologiques", txt: "La croissance génère des externalités négatives : épuisement des ressources, émissions de CO₂, déforestation, perte de biodiversité.", c: N.ambre },
            { t: "Exclut la production domestique", txt: "Le travail domestique et le bénévolat ne sont pas comptabilisés, bien qu'ils créent de la valeur.", c: N.violet },
          ].map((l) => (
            <div key={l.t} style={{ display: "flex", gap: 10, background: N.bgCard, border: `0.5px solid ${N.border}`, borderRadius: 8, padding: "10px 12px", marginBottom: 7, alignItems: "flex-start" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.c, flexShrink: 0, marginTop: 5 }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: l.c, marginBottom: 2 }}>{l.t}</div>
                <div style={{ fontSize: 12, color: N.muted, lineHeight: 1.55 }}>{l.txt}</div>
              </div>
            </div>
          ))}
        </div>
      );

      // ── 4 DONNÉES & SAVOIR-FAIRE ─────────────────────────────────
      case 4: return (
        <div>
          <DefBox color="cyan" label="📐 Savoir-faire · Calcul de la valeur ajoutée">
            <strong>Exercice :</strong> Une boulangerie réalise un chiffre d'affaires de 120 000 €. Elle a acheté 45 000 € de farine, beurre et énergie (consommations intermédiaires). Elle verse 60 000 € de salaires et loyers.<br /><br />
            <strong style={{ color: N.cyan }}>Calcule :</strong><br />
            1. La valeur ajoutée → VA = CA − CI = 120 000 − 45 000 = <strong style={{ color: N.cyan }}>75 000 €</strong><br />
            2. Le bénéfice → 120 000 − (45 000 + 60 000) = <strong style={{ color: N.cyan }}>15 000 €</strong><br />
            3. Si seule cette boulangerie existait, le PIB du pays = <strong style={{ color: N.cyan }}>75 000 €</strong>
          </DefBox>

          <STitle color={N.ambre}>📊 Données clés sur la croissance mondiale</STitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8, marginBottom: 14 }}>
            {[
              { val: "∼ 2 %", label: "Croissance mondiale/an 1850-1930", c: N.violet },
              { val: "4-7 %", label: "Trente Glorieuses 1945-1973", c: N.cyan },
              { val: "< 3 %", label: "Depuis le 1er choc pétrolier (1973)", c: N.ambre },
              { val: "-1,7 %", label: "Décroissance mondiale en 2009 (crise subprimes)", c: N.rose },
            ].map((s) => (
              <div key={s.label} style={{ background: N.bgCard, border: `0.5px solid ${N.border}`, borderRadius: 10, padding: "12px 10px", textAlign: "center" as const }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: s.c, fontFamily: "'Syne', sans-serif", marginBottom: 5 }}>{s.val}</div>
                <div style={{ fontSize: 10, color: N.muted, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <STitle color={N.violet}>📐 Savoir-faire · Taux de variation</STitle>
          <DefBox color="violet" label="Formule du taux de variation">
            Taux de variation (%) = <strong>((Valeur d'arrivée − Valeur de départ) / Valeur de départ) × 100</strong><br /><br />
            <strong>Exemple :</strong> Le PIB de la France passe de 2 200 Mds € à 2 310 Mds €.<br />
            Taux = ((2 310 − 2 200) / 2 200) × 100 = <strong style={{ color: N.violet }}>+ 5 %</strong><br />
            → La France connaît une croissance économique de 5 %.
          </DefBox>

          <STitle color={N.cyan}>📐 Savoir-faire · Lecture d'un tableau double-entrée</STitle>
          <div style={{ overflowX: "auto" as const }}>
            <table style={{ width: "100%", borderCollapse: "collapse" as const, fontSize: 12, marginBottom: 12 }}>
              <caption style={{ fontSize: 11, color: N.muted, marginBottom: 6, textAlign: "left" as const }}>Part de la valeur ajoutée selon le type de producteur en France (données fictives à titre pédagogique)</caption>
              <thead>
                <tr>
                  {["Producteur", "VA (Mds €)", "Part dans le PIB"].map((h) => (
                    <th key={h} style={{ background: "rgba(255,255,255,0.06)", padding: "8px 10px", textAlign: "left" as const, color: N.muted, borderBottom: `0.5px solid ${N.border}`, fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[["Entreprises", "1 600", "70 %"], ["Administrations publiques", "500", "22 %"], ["ESS", "90", "4 %"], ["Ménages (loyers imputés)", "95", "4 %"]].map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: "8px 10px", borderBottom: `0.5px solid ${N.border}`, color: j === 0 ? N.cyan : N.text, fontWeight: j === 0 ? 700 : 400 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DefBox color="cyan" label="Comment lire ce tableau ?">
            La ligne « Entreprises » indique que les entreprises créent 1 600 Mds € de VA, soit <strong>70 % du PIB</strong>. Pour calculer la part : (VA du secteur / PIB total) × 100.
          </DefBox>
        </div>
      );

      // ── 5 ERREURS FRÉQUENTES ─────────────────────────────────────
      case 5: return (
        <div>
          {[
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
          ].map((e, i) => (
            <div key={i} style={{ background: N.bgCard, border: `0.5px solid ${e.c}33`, borderRadius: 12, padding: "14px", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 14 }}>❌</span>
                <div style={{ fontSize: 13, fontWeight: 700, color: e.c }}>{e.erreur}</div>
              </div>
              <div style={{ fontSize: 12, color: N.text, lineHeight: 1.65, marginBottom: 8 }}>{e.explication}</div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 7, padding: "8px 10px", fontSize: 11, color: N.muted, borderLeft: `3px solid ${e.c}55` }}>
                <strong style={{ color: e.c }}>Exemple : </strong>{e.exemple}
              </div>
            </div>
          ))}
        </div>
      );

      // ── 6 QUIZ ───────────────────────────────────────────────────
      case 6: return (
        <div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: N.text, marginBottom: 4 }}>🎯 QCM — Comment crée-t-on des richesses ?</div>
            <div style={{ fontSize: 12, color: N.muted }}>{QUESTIONS.length} questions · Clique sur la bonne réponse</div>
          </div>
          <QuizStep />
        </div>
      );

      // ── 7 MÉMO ───────────────────────────────────────────────────
      case 7: return (
        <div>
          <DefBox color="cyan" label="📝 Fiche mémo — L'essentiel à retenir">
            <strong style={{ color: N.cyan }}>Produire</strong> = créer des biens (matériels) ou services (immatériels) via une activité organisée et rémunérée.
          </DefBox>

          <STitle color={N.cyan}>Les 3 types de producteurs</STitle>
          <div style={{ fontSize: 13, color: N.text, lineHeight: 1.8, background: N.bgCard, border: `0.5px solid ${N.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 12 }}>
            🏭 <strong style={{ color: N.cyan }}>Entreprises</strong> → production marchande<br />
            🏛️ <strong style={{ color: N.violet }}>Administrations</strong> → production non marchande<br />
            🤝 <strong style={{ color: N.vert }}>ESS</strong> → utilité sociale, bénéfices réinvestis
          </div>

          <STitle color={N.ambre}>Les formules à connaître</STitle>
          {[
            ["VA", "CA − Consommations intermédiaires", N.cyan],
            ["Bénéfice", "Recettes − Total des charges", N.vert],
            ["PIB", "Somme de toutes les VA du territoire", N.violet],
            ["Taux de variation", "((Arrivée − Départ) / Départ) × 100", N.ambre],
          ].map(([label, formula, c]) => (
            <div key={label as string} style={{ display: "flex", gap: 10, alignItems: "center", background: N.bgCard, border: `0.5px solid ${N.border}`, borderRadius: 8, padding: "9px 12px", marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: c as string, minWidth: 100 }}>{label as string}</span>
              <span style={{ fontSize: 12, color: N.muted, fontFamily: "monospace" }}>{formula as string}</span>
            </div>
          ))}

          <STitle color={N.rose}>Les limites à citer</STitle>
          <DefBox color="rose" label="Limites du PIB">
            1. <strong>Sociale</strong> : moyenne qui masque les inégalités<br />
            2. <strong>Écologique</strong> : ne comptabilise pas les destructions environnementales<br />
            3. <strong>Domestique</strong> : exclut le travail non rémunéré (bénévolat, tâches ménagères)
          </DefBox>

          <STitle color={N.violet}>Chronologie de la croissance mondiale</STitle>
          <div style={{ fontSize: 13, color: N.text, lineHeight: 2, background: N.bgCard, border: `0.5px solid ${N.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 14 }}>
            📅 <strong style={{ color: N.muted }}>XIXe s.</strong> → Révolution industrielle, décollage<br />
            📅 <strong style={{ color: N.muted }}>1850-1930</strong> → ~2 %/an<br />
            📅 <strong style={{ color: N.cyan }}>1945-1973</strong> → Trente Glorieuses : 4-7 %<br />
            📅 <strong style={{ color: N.ambre }}>Depuis 1973</strong> → Ralentissement &lt; 3 %<br />
            📅 <strong style={{ color: N.rose }}>2009</strong> → Décroissance (crise subprimes)
          </div>

          {/* Ressources */}
          <STitle color={N.muted}>🔗 Pour aller plus loin</STitle>
          {[
            { icon: "📹", titre: "INSEE — Vidéos PIB et croissance", url: "https://www.insee.fr/fr/information/2549709", tag: "Vidéo" },
            { icon: "🎬", titre: "Le PIB, c'est quoi ? (Explique-moi l'éco)", url: "https://www.dailymotion.com/video/x63g3pt", tag: "Vidéo courte" },
            { icon: "📖", titre: "Melchior — Fiches notions SES", url: "https://www.melchior.fr/notion/production", tag: "Définitions" },
            { icon: "🌍", titre: "Banque Mondiale — Données PIB", url: "https://donnees.banquemondiale.org/indicateur/NY.GDP.MKTP.KD.ZG", tag: "Statistiques" },
          ].map((r) => (
            <a key={r.url} href={r.url} target="_blank" rel="noreferrer"
              style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px", background: N.bgCard, border: `0.5px solid ${N.border}`, borderRadius: 8, marginBottom: 7, textDecoration: "none" }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{r.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: N.cyan, marginBottom: 3 }}>{r.titre}</div>
                <span style={{ fontSize: 10, background: N.cyanBg, color: N.cyan, border: `0.5px solid ${N.cyanBd}`, borderRadius: 10, padding: "1px 7px" }}>{r.tag}</span>
              </div>
            </a>
          ))}
        </div>
      );

      default: return null;
    }
  };

  return (
    <main style={{ fontFamily: "'Space Grotesk', sans-serif", background: N.bg, color: N.text, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        button { font: inherit; }
        .step-tab:hover { opacity: 0.8; }
        @media (max-width: 700px) {
          .step-tabs { gap: 4px !important; }
          .step-tab  { padding: 6px 4px !important; font-size: 9px !important; }
          .step-tab .tab-icon { font-size: 14px !important; }
          .page-inner { padding: 0 1rem 3rem !important; }
          .hero-inner { padding: 1.2rem 1rem 1rem !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", borderBottom: `0.5px solid ${N.border}`, maxWidth: 900, margin: "0 auto" }}>
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: N.text }}>
          Cap<span style={{ color: N.ambre }}>SES</span>
        </Link>
        <Link href="/seconde" style={{ fontSize: 12, color: N.muted, display: "flex", alignItems: "center", gap: 5 }}>
          ← Seconde
        </Link>
      </nav>

      {/* HERO */}
      <div className="hero-inner" style={{ maxWidth: 900, margin: "0 auto", padding: "1.5rem 1.5rem 1rem", borderBottom: `0.5px solid ${N.border}` }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: N.cyanBg, border: `0.5px solid ${N.cyanBd}`, color: N.cyan, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: 20, marginBottom: 10 }}>
          Q 01 · Science économique · Seconde
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 8 }}>
          Comment crée-t-on des richesses<br />
          <span style={{ color: N.cyan }}>et comment les mesure-t-on ?</span>
        </h1>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
          {["PIB", "Valeur ajoutée", "Croissance", "ESS", "Limites écologiques"].map((n) => (
            <span key={n} style={{ fontSize: 10, background: N.bgCard, border: `0.5px solid ${N.border}`, color: N.muted, borderRadius: 4, padding: "2px 7px" }}>{n}</span>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Progress bar */}
        <div style={{ height: 3, background: N.border, borderRadius: 2, margin: "0.75rem 0" }}>
          <div style={{ height: "100%", background: `linear-gradient(90deg, ${N.violet}, ${N.cyan})`, borderRadius: 2, width: `${((step + 1) / STEPS.length) * 100}%`, transition: "width 0.3s ease" }} />
        </div>

        <div className="step-tabs" style={{ display: "flex", gap: 6, overflowX: "auto" as const, paddingBottom: 4, marginBottom: 0, scrollbarWidth: "none" as const }}>
          {STEPS.map((s) => (
            <button key={s.id} className="step-tab" onClick={() => setStep(s.id)}
              style={{
                flex: "0 0 auto",
                display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 3,
                padding: "8px 10px", borderRadius: "10px 10px 0 0",
                border: `0.5px solid ${step === s.id ? N.violetBd : N.border}`,
                borderBottom: step === s.id ? `0.5px solid ${N.bg}` : `0.5px solid ${N.border}`,
                background: step === s.id ? N.violetBg : "transparent",
                color: step === s.id ? N.violet : N.muted,
                cursor: "pointer", transition: "all 0.15s", fontSize: 10, fontWeight: step === s.id ? 700 : 400,
              }}>
              <span className="tab-icon" style={{ fontSize: 16 }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="page-inner" style={{ background: N.bgCard, border: `0.5px solid ${N.violetBd}`, borderTop: "none", borderRadius: "0 0 14px 14px", padding: "1.25rem 1.5rem 2rem", minHeight: 400, marginBottom: "2rem" }}>
          {renderStep()}
        </div>

        {/* Navigation bas */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 0 2rem" }}>
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
            style={{ background: step === 0 ? "transparent" : N.bgCardMd, border: `0.5px solid ${N.border}`, color: step === 0 ? N.border : N.muted, padding: "0.5rem 1.2rem", borderRadius: 8, fontSize: 12, cursor: step === 0 ? "not-allowed" : "pointer", fontWeight: 600 }}>
            ← Précédent
          </button>
          <span style={{ fontSize: 11, color: N.muted }}>{step + 1} / {STEPS.length}</span>
          {step < STEPS.length - 1
            ? <button onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                style={{ background: N.accent, color: "#fff", border: "none", padding: "0.5rem 1.2rem", borderRadius: 8, fontSize: 12, cursor: "pointer", fontWeight: 700 }}>
                Suivant →
              </button>
            : <Link href="/seconde" style={{ background: N.cyanBg, color: N.cyan, border: `0.5px solid ${N.cyanBd}`, padding: "0.5rem 1.2rem", borderRadius: 8, fontSize: 12, fontWeight: 700 }}>
                ← Retour aux chapitres
              </Link>
          }
        </div>
      </div>
    </main>
  );
}
