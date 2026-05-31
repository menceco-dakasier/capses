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

// ── COMPOSANTS INTERNES ──────────────────────────────────────────────────────

function DefBox({ variant = "blue", label, children }: { variant?: string; label: string; children: React.ReactNode }) {
  const map: Record<string, { bg: string; border: string; labelColor: string; strongColor: string }> = {
    blue:   { bg: "#0d1b2a", border: "#1e3a5f", labelColor: "#7EB8FF", strongColor: "#a8d4ff" },
    teal:   { bg: "#0a1f1c", border: "#1a3d38", labelColor: "#5DCAA5", strongColor: "#8ee0c7" },
    amber:  { bg: "#1f1600", border: "#3d2c00", labelColor: "#EF9F27", strongColor: "#f7c46a" },
    purple: { bg: "#130f21", border: "#2e235a", labelColor: "#AFA9EC", strongColor: "#cfc9f5" },
    coral:  { bg: "#1f0d08", border: "#4a1a10", labelColor: "#F0997B", strongColor: "#f5bead" },
    green:  { bg: "#0a1a0a", border: "#1a3d1a", labelColor: "#97C459", strongColor: "#b8da80" },
  };
  const c = map[variant] ?? map.blue;
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 12, padding: "14px 18px", marginBottom: 14 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: c.labelColor, textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 14, color: "#c8d8e8", lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}

function STitle({ color = "#7EB8FF", children }: { color?: string; children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 12, marginBottom: 12, marginTop: 20 }}>
      <span style={{ fontSize: 15, fontWeight: 700, color, fontFamily: "Syne, sans-serif" }}>{children}</span>
    </div>
  );
}

function StatGrid({ items }: { items: { num: string; label: string; color: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
      {items.map((s, i) => (
        <div key={i} style={{ background: "#111c29", borderRadius: 10, padding: "14px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: s.color, fontFamily: "Syne, sans-serif", lineHeight: 1.1, marginBottom: 4 }}>{s.num}</div>
          <div style={{ fontSize: 11, color: "#8899aa", lineHeight: 1.4 }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function CardGrid({ items }: { items: { badge: string; badgeColor: string; title: string; text: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10, marginBottom: 16 }}>
      {items.map((c, i) => (
        <div key={i} style={{ background: "#111c29", border: "1px solid #1e3048", borderRadius: 10, padding: 14 }}>
          <div style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "2px 8px", borderRadius: 20, background: c.badgeColor + "22", color: c.badgeColor, border: `1px solid ${c.badgeColor}55`, marginBottom: 8 }}>{c.badge}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#dce8f5", marginBottom: 4 }}>{c.title}</div>
          <div style={{ fontSize: 12, color: "#8899aa", lineHeight: 1.5 }}>{c.text}</div>
        </div>
      ))}
    </div>
  );
}

function NoteBox({ type = "info", children }: { type?: "info" | "warn" | "actu" | "success"; children: React.ReactNode }) {
  const map = {
    info:    { bg: "#0d1b35", border: "#1e3a6a", icon: "ℹ️" },
    warn:    { bg: "#1f1200", border: "#4a2e00", icon: "⚠️" },
    actu:    { bg: "#0a1f1c", border: "#1a3d38", icon: "📊" },
    success: { bg: "#0a1a0a", border: "#1a3d1a", icon: "✅" },
  };
  const s = map[type];
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: "12px 16px", marginBottom: 14, fontSize: 13, color: "#b0c4d8", lineHeight: 1.7 }}>
      <span style={{ marginRight: 6 }}>{s.icon}</span>{children}
    </div>
  );
}

function MecaBox({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14, marginBottom: 12 }}>
          <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: "#1e3048", border: "2px solid #5DCAA5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#5DCAA5" }}>{i + 1}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#dce8f5", marginBottom: 3 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#8899aa", lineHeight: 1.6 }}>{s.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Accordion({ items }: { items: { color: string; title: string; content: React.ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div style={{ marginBottom: 16 }}>
      {items.map((item, i) => (
        <div key={i} style={{ border: "1px solid #1e3048", borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={() => setOpen(open === i ? null : i)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", cursor: "pointer", background: "#111c29" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#dce8f5", flex: 1 }}>{item.title}</span>
            <span style={{ color: "#445566", fontSize: 11, transform: open === i ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▼</span>
          </div>
          {open === i && (
            <div style={{ padding: "4px 14px 14px", fontSize: 13, color: "#8899aa", lineHeight: 1.75 }}>{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function StepQuiz() {
  const questions = [
    {
      q: "Qu'est-ce qu'un « problème public » en sociologie politique ?",
      opts: [
        "Un problème dont l'État est directement responsable et qu'il doit résoudre seul",
        "Une situation jugée inacceptable qui, par un processus de mobilisation collective, entre dans le débat politique et justifie une action publique",
        "Un problème qui affecte l'ensemble de la population d'un pays",
        "Une question déjà inscrite dans la loi et faisant l'objet d'une réglementation",
      ],
      ans: 1,
      exp: "Un problème public n'est pas donné : il est construit. Des acteurs (ONG, experts, citoyens) doivent d'abord identifier une situation comme problématique, la cadrer, la justifier et la populariser pour qu'elle soit inscrite à l'agenda politique. Les questions environnementales ont dû suivre ce processus.",
    },
    {
      q: "Pourquoi dit-on que la stabilité climatique est un « bien commun » ?",
      opts: [
        "Parce qu'elle est financée par l'État dans tous les pays",
        "Parce qu'elle est à la fois non excluable (personne ne peut en être exclu) et rivale (les émissions des uns dégradent le climat pour tous)",
        "Parce qu'elle est gérée conjointement par l'ONU et les États membres",
        "Parce que tous les pays en bénéficient équitablement sans contribuer à sa préservation",
      ],
      ans: 1,
      exp: "Un bien commun est non excluable ET rival. La stabilité climatique est non excluable : tous les pays subissent ou bénéficient du même climat mondial. Elle est rivale : les émissions de GES d'un pays dégradent la ressource climatique pour tous. Cela génère un risque de passager clandestin et de tragédie des communs.",
    },
    {
      q: "Quel est le « paradoxe de Jevons » (effet rebond) appliqué aux politiques environnementales ?",
      opts: [
        "Plus une taxe est élevée, moins elle est acceptée socialement",
        "Les économies d'énergie réalisées grâce à une technologie plus efficace incitent à une consommation accrue, annulant partiellement les gains environnementaux",
        "Les entreprises polluantes délocalisent leur production dans des pays sans réglementation environnementale",
        "Les subventions à l'innovation sont plus efficaces que les taxes pour réduire les émissions",
      ],
      ans: 1,
      exp: "L'économiste William Jevons (1865) observa que l'amélioration de l'efficacité des machines à vapeur entraîna une hausse de la consommation de charbon, pas une baisse. Appliqué aujourd'hui : une voiture qui consomme moins de carburant par km coûte moins cher à l'usage → les conducteurs roulent davantage → les émissions totales ne baissent pas autant qu'attendu, voire augmentent.",
    },
    {
      q: "Quelle est la différence fondamentale entre le Protocole de Kyoto (1997) et l'Accord de Paris (2015) ?",
      opts: [
        "Kyoto concernait uniquement les pays européens, tandis que Paris est universel",
        "Kyoto imposait des objectifs chiffrés contraignants (top-down) aux pays développés ; Paris repose sur des contributions volontaires nationales (bottom-up / NDC)",
        "Kyoto ciblait le CO₂ uniquement, tandis que Paris couvre tous les gaz à effet de serre",
        "L'Accord de Paris est juridiquement plus contraignant que Kyoto car il inclut des sanctions financières",
      ],
      ans: 1,
      exp: "Kyoto (1997) imposait des objectifs chiffrés de réduction des émissions aux pays de l'OCDE, avec des engagements juridiquement contraignants (approche top-down). L'Accord de Paris (2015) repose sur des NDC (Nationally Determined Contributions) que chaque pays fixe lui-même de façon volontaire (approche bottom-up). Paris a permis d'inclure tous les pays mais manque de mécanisme de sanctions pour les États qui ne respectent pas leurs engagements.",
    },
    {
      q: "Le marché européen du carbone (EU ETS) fonctionne sur quel principe ?",
      opts: [
        "L'État taxe directement chaque tonne de CO₂ émise par les entreprises",
        "Les entreprises qui émettent moins que leur quota alloué peuvent vendre leurs excédents à celles qui dépassent le leur, créant un signal-prix sur les émissions",
        "Les consommateurs achètent des crédits carbone pour compenser leurs achats de produits polluants",
        "Les entreprises subventionnent elles-mêmes les projets de reforestation pour compenser leurs émissions",
      ],
      ans: 1,
      exp: "L'EU ETS est un système de plafonnement et d'échange (cap-and-trade) : un volume total d'émissions est fixé (le plafond), des quotas sont distribués ou vendus aux entreprises. Celles qui émettent moins que leur quota peuvent vendre l'excédent ; celles qui dépassent leur quota doivent acheter des quotas supplémentaires sur le marché. Le prix se forme à l'intersection de l'offre et de la demande de quotas.",
    },
    {
      q: "Qu'est-ce que le comportement de « passager clandestin » dans le contexte des accords climatiques ?",
      opts: [
        "Un pays qui signe un accord climatique sans avoir l'intention de le respecter",
        "Un pays qui profite des efforts de réduction des émissions des autres pays sans supporter lui-même les coûts de la décarbonisation",
        "Une entreprise qui contourne les normes environnementales en délocalisant sa production",
        "Un citoyen qui refuse de payer les taxes carbone tout en utilisant des transports en commun subventionnés",
      ],
      ans: 1,
      exp: "Le passager clandestin (free rider) est celui qui bénéficie d'un bien collectif sans contribuer à son financement. Dans le contexte climatique, chaque État a intérêt à laisser les autres faire les efforts coûteux (qui améliorent le climat mondial) sans s'y engager soi-même. Les USA sous Trump sont l'exemple le plus visible : retrait de l'Accord de Paris en 2017, puis à nouveau en janvier 2025.",
    },
    {
      q: "En 2024, quel seuil climatique symbolique a été franchi pour la première fois dans l'histoire des relevés ?",
      opts: [
        "La concentration de CO₂ atmosphérique a dépassé 500 parties par million (ppm)",
        "La température moyenne mondiale a dépassé +1,5 °C par rapport à l'ère préindustrielle sur l'ensemble de l'année",
        "Les émissions mondiales de GES ont atteint 60 Gt de CO₂ équivalent",
        "La fonte des glaces arctiques a atteint un niveau irréversible selon le GIEC",
      ],
      ans: 1,
      exp: "En 2024, pour la première fois, la température moyenne à la surface de la Terre a franchi le seuil de +1,5 °C par rapport à l'ère préindustrielle sur l'ensemble de l'année civile — le seuil que l'Accord de Paris s'était fixé comme limite à ne pas dépasser. Si les tendances actuelles se maintiennent, les experts onusiens prévoient un réchauffement de +3,1 °C d'ici la fin du siècle.",
    },
    {
      q: "Quelle est la principale limite de la réglementation (normes) comme instrument de politique environnementale ?",
      opts: [
        "Elle est trop coûteuse pour les pouvoirs publics à mettre en place",
        "Elle ne peut s'appliquer qu'aux entreprises et pas aux ménages",
        "Appliquée uniformément à tous les agents, elle peut être économiquement inefficace et générer un effet rebond",
        "Elle nécessite l'accord unanime des États membres de l'Union européenne",
      ],
      ans: 2,
      exp: "La réglementation est un instrument coercitif identique pour tous les agents, sans tenir compte de leurs coûts relatifs de dépollution. Un agent qui pourrait dépolluer davantage à faible coût n'est pas incité à aller au-delà du seuil fixé. De plus, elle peut générer l'effet rebond de Jevons : une voiture moins consommatrice coûte moins cher à utiliser → les conducteurs roulent plus. Enfin, elle peut être contournée (Dieselgate VW, 2015).",
    },
    {
      q: "Le mouvement des Gilets jaunes (nov. 2018) illustre principalement quel défi des politiques climatiques ?",
      opts: [
        "La difficulté technique de réduire les émissions du secteur des transports",
        "L'opposition des entreprises pétrolières aux taxes carbone",
        "La tension entre efficacité écologique et justice sociale / acceptabilité politique d'une taxe carbone sans redistribution suffisante",
        "Le comportement de passager clandestin des États membres de l'UE",
      ],
      ans: 2,
      exp: "La hausse de la Contribution Climat Énergie (CCE) en 2018 a déclenché une crise sociale majeure car elle pesait plus lourdement sur les ménages modestes (ruraux, dépendants de leur voiture) qui ne pouvaient pas se passer du carburant. Cette crise illustre le besoin de concilier les quatre critères d'une politique climatique réussie : efficacité écologique, justice sociale, conformité juridique et acceptabilité politique. Le gouvernement a gelé la taxe fin 2018.",
    },
    {
      q: "Selon les données récentes, quel secteur français n'a enregistré aucune réduction nette de ses émissions de GES entre 1990 et 2024 ?",
      opts: [
        "L'industrie manufacturière",
        "Le résidentiel et le tertiaire",
        "Les transports",
        "L'agriculture",
      ],
      ans: 2,
      exp: "Le secteur des transports est le seul secteur français qui n'a pas connu de réduction nette de ses émissions entre 1990 et 2024, malgré les progrès technologiques (véhicules plus efficaces). L'effet rebond (plus de km parcourus, étalement urbain, croissance du trafic aérien) a annulé les gains d'efficacité. Il représente aujourd'hui le premier secteur émetteur en France.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  function selectOpt(i: number) {
    if (answered) return;
    setAnswered(true);
    setSelected(i);
    if (i === questions[current].ans) setScore((s) => s + 1);
  }

  function next() {
    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setAnswered(false);
      setSelected(null);
    }
  }

  function restart() {
    setCurrent(0); setScore(0); setAnswered(false); setSelected(null); setDone(false);
  }

  const q = questions[current];
  const pct = Math.round((score / questions.length) * 100);
  const emoji = pct >= 90 ? "🏆" : pct >= 70 ? "👍" : pct >= 50 ? "📚" : "💪";
  const msg = pct >= 90 ? "Excellent ! Tu maîtrises parfaitement ce chapitre. Prêt(e) pour le bac !" : pct >= 70 ? "Très bien ! Quelques points à revoir mais tu as l'essentiel." : pct >= 50 ? "Pas mal, mais relis les onglets Instruments et Négociations !" : "Courage ! Reprends les notions depuis le début, surtout les biens communs et les instruments.";

  if (done) return (
    <div style={{ textAlign: "center", padding: "2rem 0" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>{emoji}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: "#5DCAA5", fontFamily: "Syne, sans-serif", marginBottom: 8 }}>{score} / {questions.length} — {pct} %</div>
      <div style={{ fontSize: 14, color: "#8899aa", marginBottom: 24 }}>{msg}</div>
      <button onClick={restart} style={{ background: "#5DCAA5", color: "#0d1b2a", border: "none", borderRadius: 8, padding: "10px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>🔄 Recommencer</button>
    </div>
  );

  return (
    <div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#dce8f5", marginBottom: 14, lineHeight: 1.5 }}>{q.q}</div>
      <div style={{ display: "grid", gap: 8, marginBottom: 14 }}>
        {q.opts.map((opt, i) => {
          let bg = "#111c29", border = "#1e3048", color = "#b0c4d8";
          if (answered) {
            if (i === q.ans) { bg = "#0a1f0a"; border = "#1a5a1a"; color = "#5DCAA5"; }
            else if (i === selected) { bg = "#1f0a0a"; border = "#5a1a1a"; color = "#F0997B"; }
          }
          return (
            <button key={i} onClick={() => selectOpt(i)} disabled={answered} style={{ textAlign: "left", padding: "12px 14px", border: `1px solid ${border}`, borderRadius: 8, background: bg, color, fontSize: 13, cursor: answered ? "default" : "pointer", transition: "all .15s" }}>{opt}</button>
          );
        })}
      </div>
      {answered && (
        <div style={{ background: "#1a1200", border: "1px solid #3d2c00", borderRadius: 8, padding: "12px 14px", fontSize: 13, color: "#c8a84a", lineHeight: 1.7, marginBottom: 14 }}>
          {selected === q.ans ? "✅ " : "❌ "}{q.exp}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "#445566" }}>Question {current + 1} / {questions.length}</span>
        {answered && (
          <button onClick={next} style={{ background: "#5DCAA5", color: "#0d1b2a", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            {current + 1 < questions.length ? "Question suivante →" : "Voir mes résultats"}
          </button>
        )}
      </div>
    </div>
  );
}

// ── DONNÉES ──────────────────────────────────────────────────────────────────

const STEPS = [
  { id: "savoir",      label: "À savoir pour le bac",      icon: "🎯", color: "#D4A017" },
  { id: "notions",     label: "Notions indispensables",     icon: "📐", color: "#7EB8FF" },
  { id: "cours",       label: "Le cours en 10 min",         icon: "⚡", color: "#5DCAA5" },
  { id: "mecanismes",  label: "Mécanismes à maîtriser",     icon: "⚙️", color: "#AFA9EC" },
  { id: "erreurs",     label: "Erreurs fréquentes",         icon: "⚠️", color: "#F0997B" },
  { id: "quiz",        label: "Quiz",                       icon: "🧠", color: "#97C459" },
  { id: "sujets",      label: "Sujets probables",           icon: "📋", color: "#D4A017" },
  { id: "methode",     label: "Méthode appliquée",          icon: "✍️", color: "#7EB8FF" },
  { id: "memo",        label: "Fiche mémo PDF",             icon: "📄", color: "#5DCAA5" },
  { id: "ressources",  label: "Ressources",                 icon: "🎬", color: "#7EB8FF" },
];

// ── PAGE PRINCIPALE ──────────────────────────────────────────────────────────

export default function EnvironnementPage() {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const [memoChecks, setMemoChecks] = useState<Record<string, boolean>>({});

  function goTo(i: number) {
    setStep(i);
    setVisited((v) => new Set([...v, i]));
    window.scrollTo(0, 0);
  }

  const activeStep = STEPS[step];

  // ── CONTENU DES ÉTAPES ────────────────────────────────────────────────────

  function renderContent() {
    switch (step) {

      // ── 1. SAVOIR ────────────────────────────────────────────────────────
      case 0:
        return (
          <div>
            <STitle color="#D4A017">Objectifs de l'étape — ce que tu dois savoir faire</STitle>
            <CardGrid items={[
              { badge: "Analyser", badgeColor: "#D4A017", title: "Construire un problème public", text: "Expliquer pourquoi l'environnement est devenu un problème public et décrire le processus de mise à l'agenda politique." },
              { badge: "Distinguer", badgeColor: "#7EB8FF", title: "Les défaillances de marché", text: "Identifier externalités négatives, biens communs, passager clandestin et expliquer pourquoi le marché ne peut les corriger seul." },
              { badge: "Comparer", badgeColor: "#5DCAA5", title: "Les quatre instruments", text: "Expliquer la logique, les avantages et les limites de la réglementation, la taxe carbone, le marché de quotas et la subvention à l'innovation verte." },
              { badge: "Mobiliser", badgeColor: "#AFA9EC", title: "Les auteurs clés", text: "Pigou (externalités/taxe), Coase (droits de propriété/quotas), Hardin (tragédie des communs), Ostrom (gestion collective), Jevons (effet rebond)." },
              { badge: "Maîtriser", badgeColor: "#F0997B", title: "Les accords internationaux", text: "Distinguer Kyoto (top-down contraignant) de Paris (bottom-up/NDC volontaires) et analyser le problème du passager clandestin à l'échelle mondiale." },
              { badge: "Actualiser", badgeColor: "#97C459", title: "Les données récentes", text: "+1,5 °C franchi en 2024, 53 Gt d'émissions mondiales en 2023, -32 % en France depuis 1990, EU ETS ~70 €/t CO₂ en 2024, MACF 2023-2026." },
            ]} />
            <STitle color="#D4A017">Auteurs à mobiliser</STitle>
            <CardGrid items={[
              { badge: "Pigou (1920)", badgeColor: "#7EB8FF", title: "Taxe pigouvienne", text: "La taxe égale au coût social de la pollution internalise les externalités négatives → fondement théorique de la taxe carbone." },
              { badge: "Coase (1960)", badgeColor: "#5DCAA5", title: "Théorème de Coase", text: "Si droits de propriété bien définis et coûts de transaction nuls, le marché résout les externalités → fondement théorique de l'EU ETS." },
              { badge: "Hardin (1968)", badgeColor: "#F0997B", title: "Tragédie des communs", text: "Sans régulation, la ressource commune est surexploitée → justifie une régulation publique internationale du climat." },
              { badge: "Ostrom (Nobel 2009)", badgeColor: "#AFA9EC", title: "Gestion collective", text: "Les communautés peuvent gérer les biens communs sans État ni marché → inspire l'approche bottom-up de l'Accord de Paris." },
            ]} />
            <NoteBox type="actu">
              <strong>Actualité 2024-2025 :</strong> La température mondiale a dépassé +1,5 °C pour la première fois en 2024 (Copernicus/ECMWF). Les émissions mondiales atteignent 53 Gt CO₂eq en 2023, un record. Trump a retiré les États-Unis de l'Accord de Paris en janvier 2025 (2e retrait). Le MACF entre en application progressive jusqu'en 2026.
            </NoteBox>
            <StatGrid items={[
              { num: "+1,5 °C", label: "Seuil franchi en 2024 (temp. mondiale / ère préindustrielle)", color: "#F0997B" },
              { num: "53 Gt", label: "Émissions mondiales de GES en 2023 (record historique)", color: "#EF9F27" },
              { num: "-32 %", label: "Réduction des émissions en France depuis 1990 (2024)", color: "#97C459" },
              { num: "8,2 t", label: "Empreinte carbone par habitant en France (2024)", color: "#7EB8FF" },
              { num: "~70 €", label: "Prix de la tonne de CO₂ sur l'EU ETS (2024-2025)", color: "#5DCAA5" },
              { num: "62 %", label: "Objectif de réduction EU ETS pour 2030 (vs 2005)", color: "#AFA9EC" },
            ]} />
          </div>
        );

      // ── 2. NOTIONS ───────────────────────────────────────────────────────
      case 1:
        return (
          <div>
            <DefBox variant="blue" label="Problème public">
              Une situation jugée inacceptable qui, par un processus de <strong>mobilisation collective</strong>, sort des préoccupations privées pour entrer dans l'espace du débat politique et justifier une <strong>intervention publique</strong>. Les questions environnementales ont dû être construites comme telles par une multitude d'acteurs (ONG, scientifiques, citoyens, médias).
            </DefBox>
            <DefBox variant="teal" label="Externalité négative">
              Coût imposé à des tiers <strong>sans compensation par le mécanisme des prix</strong>. Le coût privé supporté par le pollueur est inférieur au coût social subi par la collectivité. Ex : la combustion d'un litre de gazole génère des coûts sociaux (santé, réchauffement) non répercutés dans son prix. C'est la principale <strong>défaillance de marché</strong> justifiant l'action publique environnementale.
            </DefBox>
            <DefBox variant="amber" label="Bien commun">
              Bien <strong>non excluable</strong> (impossible d'en exclure quiconque) et <strong>rival</strong> (la consommation par un agent en prive les autres). La stabilité climatique est un bien commun mondial : chaque pays est affecté par le réchauffement (non-excluabilité), mais les émissions des uns dégradent le climat pour tous (rivalité).
            </DefBox>
            <DefBox variant="coral" label="Passager clandestin (free rider)">
              Acteur qui profite des bénéfices d'une action collective <strong>sans en supporter les coûts</strong>. En matière climatique, chaque pays a intérêt à laisser les autres faire les efforts coûteux (décarbonisation) tout en bénéficiant du climat stabilisé. Résultat : une logique de <strong>dilemme du prisonnier</strong> peut aboutir à ce que personne n'agisse suffisamment.
            </DefBox>
            <DefBox variant="purple" label="Tragédie des communs (Hardin, 1968)">
              Sans régulation, chaque acteur a intérêt à maximiser son utilisation de la ressource commune, conduisant à sa <strong>surexploitation et à sa destruction</strong>. La stabilité climatique est menacée par cette logique à l'échelle mondiale. Hardin préconisait la privatisation ou la régulation étatique ; Ostrom montrera qu'une gestion collective négociée est aussi possible.
            </DefBox>
            <DefBox variant="green" label="Taxe pigouvienne (Pigou, 1920)">
              Taxe égale au <strong>coût social marginal de la pollution</strong>, permettant d'internaliser les externalités négatives. Elle corrige le signal-prix défaillant du marché. En pratique : la taxe carbone (ou CCE en France). Limite : difficile à calibrer précisément ; risque d'iniquité sociale.
            </DefBox>
            <DefBox variant="blue" label="Marché des quotas d'émission / droits à polluer (EU ETS)">
              Système de <strong>plafonnement et d'échange</strong> (cap-and-trade) inspiré du théorème de Coase. Un volume total d'émissions est fixé ; des quotas sont alloués ou vendus aux entreprises qui peuvent les échanger. Prix fixé par l'offre et la demande. Avantage : certitude sur le volume total d'émissions. Limite : prix volatile, parfois trop bas.
            </DefBox>
            <DefBox variant="teal" label="Effet rebond / Paradoxe de Jevons (1865)">
              Les économies réalisées grâce à une technologie plus efficace <strong>incitent à une consommation accrue</strong>, annulant partiellement les gains environnementaux. Ex : les voitures consomment moins par km → les automobilistes roulent davantage → les émissions totales stagnent. Limite majeure de la réglementation et de l'efficacité énergétique sans signal-prix.
            </DefBox>
            <DefBox variant="amber" label="NDC (Nationally Determined Contributions)">
              Contributions nationales déterminées que chaque pays fixe <strong>lui-même de façon volontaire</strong> dans le cadre de l'Accord de Paris (2015). Approche bottom-up par opposition au top-down de Kyoto. Avantage : participation universelle. Limite : absence de mécanisme de sanction externe → risque persistant de passager clandestin.
            </DefBox>
            <DefBox variant="purple" label="MACF (Mécanisme d'Ajustement Carbone aux Frontières)">
              Dispositif européen entré en phase transitoire en 2023, déployé progressivement jusqu'en 2026. Oblige les importateurs de certains produits à forte intensité carbone (acier, ciment, aluminium, engrais) à payer pour les émissions incorporées, au même prix que les producteurs européens sous l'EU ETS. Objectif : éviter les <strong>fuites carbone</strong> (délocalisations de production vers des pays moins contraignants).
            </DefBox>
          </div>
        );

      // ── 3. COURS ─────────────────────────────────────────────────────────
      case 2:
        return (
          <div>
            <STitle color="#5DCAA5">I. La construction sociale du problème environnemental</STitle>
            <p style={{ fontSize: 14, color: "#8899aa", lineHeight: 1.75, marginBottom: 14 }}>
              L'environnement n'est pas naturellement un problème public. Il a dû être <strong style={{ color: "#dce8f5" }}>construit</strong> comme tel par une multitude d'acteurs au fil de cinq étapes : identification du problème (Club de Rome, 1972), cadrage scientifique (rapports GIEC depuis 1990), justification (registres émotionnel, scientifique et démocratique), popularisation (médias, mouvements comme Fridays for Future), puis mise en politique publique (lois, COP).
            </p>
            <CardGrid items={[
              { badge: "Experts", badgeColor: "#7EB8FF", title: "GIEC & ONU", text: "Consensus scientifique (6e rapport 2021-22). Le GIEC transforme les données en argument d'action publique légitime." },
              { badge: "ONG", badgeColor: "#5DCAA5", title: "Greenpeace, WWF…", text: "~40 000 associations dans le monde. Boycotts, actions juridiques, campagnes médiatiques. Rôle d'alerte et de pression." },
              { badge: "Citoyens", badgeColor: "#97C459", title: "Mouvements sociaux", text: "ZAD, Gilets verts, Fridays for Future, Convention citoyenne pour le climat (150 citoyens, 2019). Amplification de l'agenda." },
              { badge: "Entreprises", badgeColor: "#F0997B", title: "RSE & lobbying", text: "Stratégie double : RSE et labels verts d'un côté, lobbying pour ralentir les réglementations de l'autre (Dieselgate 2015, glyphosate)." },
            ]} />

            <STitle color="#5DCAA5">II. Les défaillances de marché justifiant l'intervention publique</STitle>
            <Accordion items={[
              {
                color: "#F0997B",
                title: "Externalités négatives : le marché sous-évalue la pollution",
                content: (
                  <span>
                    Lorsqu'une entreprise pollue, elle impose un <strong>coût social</strong> (santé, réchauffement, perte de biodiversité) qui ne figure pas dans son coût privé. Le marché produit donc <strong>trop de pollution</strong> et sous-investit dans la dépollution. La solution : corriger le signal-prix via une taxe (Pigou) ou un marché de quotas (Coase).
                    <div style={{ marginTop: 8, background: "#0d1b2a", borderRadius: 6, padding: "8px 10px", borderLeft: "3px solid #1e3048", fontSize: 12, color: "#8899aa" }}>
                      💡 Un plein de gazole coûte ~80 € en coût privé mais génère des coûts sociaux estimés à plusieurs centaines d'euros par le CEPII (santé, climat, air).
                    </div>
                  </span>
                ),
              },
              {
                color: "#7EB8FF",
                title: "Biens communs : non-excluabilité et rivalité",
                content: (
                  <span>
                    La stabilité climatique est un <strong>bien commun mondial</strong> : personne ne peut en être exclu, mais les émissions de GES d'un pays dégradent la ressource pour tous. Cette double caractéristique génère logiquement le comportement de passager clandestin : chaque État préfère que les autres supportent les coûts de la décarbonisation. Résultat : sans coordination internationale, on aboutit à la <strong>tragédie des communs</strong> (Hardin, 1968).
                  </span>
                ),
              },
              {
                color: "#AFA9EC",
                title: "La solution d'Ostrom : la gouvernance collective",
                content: (
                  <span>
                    Elinor Ostrom (Prix Nobel 2009) montre que ni l'État (contrainte top-down) ni le marché (privatisation) ne sont les seules solutions à la tragédie des communs. Les <strong>communautés peuvent définir elles-mêmes des règles collectives négociées</strong> pour gérer les biens communs de façon durable. C'est cette approche qui inspire l'Accord de Paris (bottom-up / NDC volontaires).
                  </span>
                ),
              },
            ]} />

            <STitle color="#5DCAA5">III. Les quatre instruments de politique environnementale</STitle>
            <Accordion items={[
              {
                color: "#1565C0",
                title: "📋 Réglementation (normes d'émission, de procédé, de produit, de qualité)",
                content: (
                  <span>
                    <strong>Principe :</strong> coercition directe (obligations/interdictions). Rapide et peu coûteuse à mettre en place. Ex : interdiction des sacs plastiques (2017), norme Euro 7 sur les véhicules.<br /><br />
                    <strong>Limites :</strong> inéquitable (même règle pour tous), risque d'effet rebond (Jevons), contournements possibles (Dieselgate VW, 2015), nécessite un contrôle coûteux.
                  </span>
                ),
              },
              {
                color: "#E65100",
                title: "💶 Taxe carbone (taxe pigouvienne / CCE)",
                content: (
                  <span>
                    <strong>Principe :</strong> internaliser les externalités en modifiant le signal-prix. Chaque agent réduit ses émissions si son coût de réduction est inférieur à la taxe. Peut générer un <strong>double dividende</strong> : environnemental + recettes fiscales redistribuables.<br /><br />
                    <strong>En France :</strong> CCE introduite en 2014 (7 €/t), montée à 44,60 € en 2018 → gelée après le mouvement des Gilets jaunes. Illustre la tension entre efficacité écologique et acceptabilité politique.
                  </span>
                ),
              },
              {
                color: "#00695C",
                title: "📈 Marché des quotas d'émission (EU ETS / cap-and-trade)",
                content: (
                  <span>
                    <strong>Principe :</strong> les pouvoirs publics fixent un plafond d'émissions et distribuent des quotas échangeables. Les entreprises efficaces vendent ; les moins efficaces achètent. Le prix signal se forme sur le marché.<br /><br />
                    <strong>EU ETS :</strong> créé en 2005, couvre ~40% des émissions UE. Prix : ~5 €/t (2005) → ~100 €/t (2023) → ~65-75 €/t (2024-25). Réforme Fit for 55 : objectif -62% pour 2030. Complété par le MACF pour éviter les fuites carbone.
                  </span>
                ),
              },
              {
                color: "#6A1B9A",
                title: "🌱 Subvention à l'innovation verte",
                content: (
                  <span>
                    <strong>Principe :</strong> internaliser les <em>externalités positives</em> de l'innovation propre. Les entreprises sous-investissent dans l'innovation car elles n'en captent pas tous les bénéfices sociaux.<br /><br />
                    <strong>Exemples :</strong> bonus véhicule électrique, MaPrimRénov' (rénovation thermique), PIA (France), programme LIFE (UE), crédit impôt recherche vert.
                    <br /><br />
                    <strong>Limite :</strong> coûteuse pour les finances publiques, ne pénalise pas les comportements polluants.
                  </span>
                ),
              },
            ]} />

            <STitle color="#5DCAA5">IV. La coordination internationale et ses limites</STitle>
            <p style={{ fontSize: 14, color: "#8899aa", lineHeight: 1.75, marginBottom: 14 }}>
              La nature planétaire du problème exige une coordination internationale, rendue difficile par le comportement de passager clandestin. L'histoire des accords climatiques témoigne d'une évolution de l'approche <strong style={{ color: "#dce8f5" }}>top-down contraignante</strong> (Kyoto, 1997, pour les seuls pays OCDE) vers une approche <strong style={{ color: "#dce8f5" }}>bottom-up volontaire</strong> (Accord de Paris, 2015, NDC pour tous les pays). Résultat : participation universelle, mais insuffisance des engagements — le réchauffement actuel conduit vers +3,1 °C d'ici la fin du siècle sans renforcement majeur.
            </p>
            <NoteBox type="actu">
              <strong>Actualité 2025 :</strong> En janvier 2025, Trump a signé le retrait des États-Unis de l'Accord de Paris (2e retrait après 2017). À la COP30 (Belém, novembre 2025), l'UE a soumis une NDC actualisée visant -55 % d'émissions d'ici 2030. Le MACF s'applique progressivement jusqu'en 2026.
            </NoteBox>
          </div>
        );

      // ── 4. MÉCANISMES ────────────────────────────────────────────────────
      case 3:
        return (
          <div>
            <STitle color="#AFA9EC">Mécanisme 1 — La taxe carbone (Pigou)</STitle>
            <MecaBox steps={[
              { title: "Situation initiale", text: "Le marché fixe un prix du carburant qui reflète uniquement le coût privé (production, distribution). Les externalités négatives (pollution, réchauffement) ne sont pas intégrées dans le prix → surproduction de pollution." },
              { title: "Introduction de la taxe pigouvienne", text: "L'État ajoute une taxe égale au coût social marginal de la pollution (ex : 44,60 €/t CO₂ en France en 2018). Le prix payé par le consommateur augmente et intègre désormais le coût social." },
              { title: "Ajustement des agents économiques", text: "Les ménages et entreprises réduisent leur consommation de biens polluants (substitution vers des alternatives moins carbonées). Les producteurs ont une incitation à innover pour réduire leur empreinte carbone et donc la taxe payée." },
              { title: "Double dividende possible", text: "Les recettes fiscales générées peuvent être (a) redistribuées aux ménages modestes (compensation sociale), (b) investies dans la transition écologique ou (c) utilisées pour baisser d'autres prélèvements (dividende fiscal)." },
              { title: "Limite : acceptabilité sociale", text: "Si la taxe pèse disproportionnellement sur les ménages modestes sans mécanisme de redistribution suffisant → crise politique. Les Gilets jaunes (nov. 2018) ont conduit le gouvernement Macron à geler la CCE." },
            ]} />

            <STitle color="#AFA9EC">Mécanisme 2 — L'EU ETS (marché de quotas, cap-and-trade)</STitle>
            <MecaBox steps={[
              { title: "Fixation du plafond (cap)", text: "Les pouvoirs publics (Commission européenne) fixent un volume total d'émissions autorisées pour les secteurs couverts (industrie lourde, aviation, centrales). Ce plafond baisse chaque année." },
              { title: "Attribution des quotas", text: "Des quotas (1 quota = 1 tonne CO₂) sont distribués aux entreprises : gratuits initialement, de plus en plus vendus aux enchères (phase 4, 2021-2030). Chaque entreprise ne peut émettre que ce que ses quotas autorisent." },
              { title: "Échange sur le marché (trade)", text: "Les entreprises qui émettent moins que leurs quotas peuvent vendre l'excédent ; celles qui dépassent doivent en acheter. Le prix se forme à l'intersection de l'offre et de la demande : ~70 €/t CO₂ en 2024-2025." },
              { title: "Signal-prix et efficacité économique", text: "Chaque entreprise réduit ses émissions si son coût de réduction est inférieur au prix du quota. L'abattement se concentre là où il est le moins coûteux → efficacité économique (contrairement à la norme uniforme)." },
              { title: "Limite : fuites carbone et MACF", text: "Les entreprises exposées à la concurrence internationale peuvent délocaliser leur production vers des pays sans contrainte carbone (fuites carbone). D'où la création du MACF (2023-2026) : les importateurs paient pour les émissions incorporées de leurs produits." },
            ]} />

            <STitle color="#AFA9EC">Mécanisme 3 — La tragédie des communs à l'échelle mondiale</STitle>
            <MecaBox steps={[
              { title: "La ressource commune : la capacité d'absorption de CO₂ de l'atmosphère", text: "L'atmosphère est un bien commun mondial non excluable et rival. Chaque tonne de CO₂ émise dégrade la ressource pour tous." },
              { title: "La logique du passager clandestin", text: "Pour chaque pays : les coûts de la décarbonisation sont immédiats et nationaux ; les bénéfices (climat stabilisé) sont différés et mondiaux. Chaque pays a donc intérêt à laisser les autres agir = dilemme du prisonnier à l'échelle internationale." },
              { title: "Résultat sans coordination : la tragédie", text: "Si tous les pays raisonnent ainsi, personne ne réduit suffisamment ses émissions → le réchauffement s'emballe → tous les pays en pâtissent. C'est exactement la logique que Hardin (1968) avait théorisée sur le pré communal surpâturé." },
              { title: "Solution 1 (Kyoto) : contrainte top-down", text: "Protocole de Kyoto (1997) : objectifs chiffrés contraignants pour les pays de l'OCDE. Limites : USA non-ratifié, Canada retiré, pays émergents exemptés → couverture insuffisante." },
              { title: "Solution 2 (Paris) : coordination bottom-up (Ostrom)", text: "Accord de Paris (2015) : NDC volontaires pour tous les pays. Couverture universelle mais pas de mécanisme de sanctions → risque persistant de passager clandestin. USA sous Trump = illustration directe (2017, 2025)." },
            ]} />

            <NoteBox type="actu">
              <strong>Chiffres à retenir :</strong> L'EU ETS a contribué à une réduction de ~47% des émissions des secteurs couverts depuis 2005 (Commission européenne). Mais en 2024, l'UE n'avait réalisé qu'environ 30% de la réduction nécessaire pour atteindre l'objectif 2030.
            </NoteBox>
          </div>
        );

      // ── 5. ERREURS ───────────────────────────────────────────────────────
      case 4:
        return (
          <div>
            {[
              {
                wrong: "La taxe carbone et le marché de quotas sont la même chose.",
                right: "Ce sont deux instruments distincts. La taxe fixe un prix (le volume d'émissions s'ajuste librement). Le marché de quotas fixe un volume d'émissions (le prix s'ajuste sur le marché). L'un donne la certitude sur le prix, l'autre sur la quantité.",
              },
              {
                wrong: "L'Accord de Paris impose des obligations contraignantes à tous les pays.",
                right: "L'Accord de Paris repose sur des NDC (Contributions Nationales Déterminées) entièrement volontaires, sans mécanisme de sanction externe. C'est précisément sa limite : aucun pays ne peut être contraint au respect de ses engagements.",
              },
              {
                wrong: "Un bien commun est un bien gratuit ou mis à disposition de tous par l'État.",
                right: "Un bien commun (au sens économique) est un bien non excluable ET rival. La stabilité climatique est un bien commun mondial — pas parce qu'elle est gratuite, mais parce que personne ne peut en être exclu et que les émissions des uns la dégradent pour tous.",
              },
              {
                wrong: "Plus une technologie est efficace énergétiquement, moins on consomme d'énergie au total.",
                right: "C'est l'erreur que corrige le paradoxe de Jevons (effet rebond) : une voiture plus efficace coûte moins cher à l'usage → les automobilistes roulent davantage → les émissions totales ne baissent pas autant qu'attendu, voire augmentent.",
              },
              {
                wrong: "Le GIEC est l'organisation qui négocie les accords climatiques.",
                right: "Le GIEC (Groupe d'experts intergouvernemental sur l'évolution du climat) est un organisme scientifique qui évalue les connaissances sur le changement climatique. Les négociations climatiques se déroulent dans le cadre de la CCNUCC (Convention-cadre des Nations unies sur les changements climatiques) lors des COP.",
              },
              {
                wrong: "La réglementation est l'instrument le plus efficace économiquement car elle s'applique à tous.",
                right: "L'application uniforme de la réglementation est précisément sa faiblesse économique : elle ne tient pas compte des coûts différenciés de dépollution selon les agents. La taxe et le marché de quotas sont plus efficaces économiquement car ils concentrent l'effort là où le coût marginal de dépollution est le plus faible.",
              },
              {
                wrong: "Elinor Ostrom montre que les biens communs doivent être privatisés pour éviter la tragédie.",
                right: "Ostrom démontre au contraire qu'une troisième voie existe entre privatisation et régulation étatique : la gestion collective négociée par les communautés elles-mêmes, à travers des règles co-construites et auto-appliquées. C'est le sens de son Prix Nobel 2009.",
              },
            ].map((e, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ background: "#1f0a0a", border: "1px solid #4a1a1a", borderRadius: "10px 10px 0 0", padding: "10px 14px", fontSize: 13, color: "#F0997B" }}>
                  ❌ <strong>Erreur fréquente :</strong> {e.wrong}
                </div>
                <div style={{ background: "#0a1f0a", border: "1px solid #1a4a1a", borderTop: "none", borderRadius: "0 0 10px 10px", padding: "10px 14px", fontSize: 13, color: "#5DCAA5" }}>
                  ✅ <strong>Correct :</strong> {e.right}
                </div>
              </div>
            ))}
          </div>
        );

      // ── 6. QUIZ ──────────────────────────────────────────────────────────
      case 5:
        return <StepQuiz />;

      // ── 7. SUJETS ────────────────────────────────────────────────────────
      case 6:
        return (
          <div>
            <NoteBox type="warn">
              <strong>Rappel programme :</strong> Le chapitre "Regards croisés" peut donner lieu à une <strong>dissertation</strong> ou à des <strong>exercices EC (EC1, EC2, EC3)</strong>. L'examinateur attend une maîtrise des instruments ET de la coordination internationale.
            </NoteBox>
            <STitle color="#D4A017">Sujets de dissertation probables</STitle>
            <CardGrid items={[
              {
                badge: "Dissertation",
                badgeColor: "#D4A017",
                title: "Les politiques environnementales peuvent-elles réconcilier efficacité économique et justice sociale ?",
                text: "Plan suggéré : I. Les instruments économiques (taxe, quotas) sont efficaces mais inégalitaires → II. Les limites de marché appellent des mécanismes de redistribution → III. La combinaison des instruments et la gouvernance multi-niveaux comme voie de réconciliation.",
              },
              {
                badge: "Dissertation",
                badgeColor: "#D4A017",
                title: "La coordination internationale est-elle suffisante pour répondre aux défis environnementaux ?",
                text: "Plan suggéré : I. Les accords internationaux ont permis des avancées réelles (Kyoto, Paris) → II. Le comportement de passager clandestin mine leur efficacité → III. Les solutions : contrainte, gouvernance locale (Ostrom), instruments économiques complémentaires.",
              },
              {
                badge: "Dissertation",
                badgeColor: "#EF9F27",
                title: "Dans quelle mesure les instruments de marché (taxe carbone, marché de quotas) permettent-ils de répondre aux défaillances de marché liées à l'environnement ?",
                text: "Plan suggéré : I. La taxe et le marché de quotas corrigent efficacement le signal-prix défaillant → II. Leurs limites propres (acceptabilité, volatilité, fuites carbone) → III. La nécessaire combinaison avec la réglementation, la subvention et la coordination internationale.",
              },
            ]} />
            <STitle color="#D4A017">Sujets d'exercice EC probables</STitle>
            <CardGrid items={[
              {
                badge: "EC2",
                badgeColor: "#7EB8FF",
                title: "À l'aide d'un exemple, vous montrerez que le comportement de passager clandestin constitue un obstacle aux politiques environnementales.",
                text: "Mobiliser : définition du passager clandestin, bien commun, tragédie des communs (Hardin). Exemple : retrait des USA de l'Accord de Paris (2017/2025), ou comportement des pays émergents dans Kyoto.",
              },
              {
                badge: "EC2",
                badgeColor: "#7EB8FF",
                title: "À l'aide d'un exemple, vous illustrerez les avantages et les limites du marché des droits à polluer comme instrument de politique environnementale.",
                text: "Mobiliser : EU ETS, théorème de Coase, signal-prix, efficacité économique, prix du carbone (5 → 100 → 70 €/t), MACF, fuites carbone.",
              },
              {
                badge: "EC3",
                badgeColor: "#5DCAA5",
                title: "À l'aide du document et de vos connaissances, vous montrerez comment les pouvoirs publics peuvent corriger les externalités négatives liées à la pollution.",
                text: "Mobiliser systématiquement : définition externalité négative, coût social vs privé, les 4 instruments (réglementation, taxe, quotas, subvention), exemples précis pour chacun.",
              },
            ]} />
          </div>
        );

      // ── 8. MÉTHODE ───────────────────────────────────────────────────────
      case 7:
        return (
          <div>
            <STitle color="#7EB8FF">Méthode — Réussir l'EC2 sur l'environnement</STitle>
            <NoteBox type="info">
              L'EC2 demande d'<strong>illustrer un mécanisme</strong> à l'aide d'un exemple précis et de connaissances. Elle est notée sur 4 points. L'erreur la plus fréquente : donner l'exemple sans expliquer le mécanisme, ou expliquer le mécanisme sans ancrer sur un exemple réel.
            </NoteBox>
            <MecaBox steps={[
              { title: "Lire attentivement la consigne", text: "Identifier le mécanisme à illustrer (ex : passager clandestin, externalité, effet rebond), le type d'instrument ou d'acteur demandé, et si la consigne impose un exemple particulier ou laisse le choix." },
              { title: "Définir le concept central en une phrase", text: "Ex : « Le passager clandestin est un acteur qui profite des bénéfices d'une action collective sans en supporter les coûts. » Jamais de réponse sans définition préalable." },
              { title: "Ancrer sur un exemple précis et daté", text: "Ne pas rester vague : « un pays », « une entreprise ». Nommer : les États-Unis sous Trump (retrait de Paris 2017/2025), les Gilets jaunes (nov. 2018), le Dieselgate VW (2015), l'EU ETS (prix ~70 €/t CO₂ en 2024-25)." },
              { title: "Expliquer le mécanisme économique ou sociologique à l'œuvre", text: "Montrer pourquoi l'exemple illustre le concept : coût/bénéfice, signal-prix, incitation, dilemme du prisonnier, non-excluabilité, rivalité. Utiliser le vocabulaire du cours." },
              { title: "Conclure par la limite ou la portée", text: "EC2 de qualité : toujours nuancer. Ex : le marché de quotas est efficace économiquement MAIS le prix est volatile et les fuites carbone persistent sans MACF." },
            ]} />
            <STitle color="#7EB8FF">Méthode — Réussir la dissertation sur l'environnement</STitle>
            <MecaBox steps={[
              { title: "Analyser le sujet et problématiser", text: "Identifier la tension ou le paradoxe central : Ex. — Efficacité des instruments vs acceptabilité sociale ; coordination mondiale nécessaire vs comportement de passager clandestin. La problématique doit rendre compte de cette tension." },
              { title: "Construire un plan dialectique en 2 ou 3 parties", text: "Éviter le plan catalogue (un instrument par partie). Préférer : I. Pourquoi le marché échoue → II. Les instruments publics répondent à ces défaillances → III. Limites et nécessité d'une gouvernance multi-niveaux." },
              { title: "Mobiliser les auteurs comme des arguments, pas des citations", text: "Ex : « Pigou (1920) montre que la taxe pigouvienne permet d'internaliser les coûts sociaux de la pollution. En France, la CCE illustre... mais les Gilets jaunes (2018) en révèlent les limites d'acceptabilité. »" },
              { title: "Actualiser avec des données chiffrées pertinentes", text: "+1,5 °C en 2024, 53 Gt GES mondiales en 2023, -32 % en France, EU ETS ~70 €/t, MACF 2023-2026, COP30 Belém 2025. Jamais de chiffre sans source implicite (CITEPA, Commission européenne, Copernicus)." },
            ]} />
          </div>
        );

      // ── 9. MÉMO ──────────────────────────────────────────────────────────
      case 8: {
        const sections = [
          {
            title: "Problème public & acteurs",
            color: "#D4A017",
            items: [
              "Je sais définir un problème public et les 5 étapes de sa mise à l'agenda",
              "Je peux citer au moins 4 types d'acteurs environnementaux (experts, ONG, citoyens, entreprises)",
              "Je connais la tension coopération / conflit entre acteurs",
              "Je sais ce qu'est une relation de lobbying et ses limites",
            ],
          },
          {
            title: "Défaillances de marché",
            color: "#7EB8FF",
            items: [
              "Je sais définir une externalité négative et distinguer coût privé / coût social",
              "Je sais définir un bien commun (non excluable + rival) et l'illustrer avec le climat",
              "Je sais expliquer le comportement de passager clandestin",
              "Je connais la tragédie des communs (Hardin, 1968) et la réponse d'Ostrom",
            ],
          },
          {
            title: "Les quatre instruments",
            color: "#5DCAA5",
            items: [
              "Je sais expliquer la logique de chacun des 4 instruments (réglementation, taxe, quotas, subvention)",
              "Je connais au moins 2 avantages et 2 limites de chaque instrument",
              "Je sais distinguer taxe pigouvienne (prix fixé) et marché de quotas (volume fixé)",
              "Je connais l'effet rebond (Jevons) et sais l'appliquer à un exemple concret",
            ],
          },
          {
            title: "Accords internationaux",
            color: "#AFA9EC",
            items: [
              "Je sais distinguer l'approche top-down (Kyoto) de l'approche bottom-up (Paris / NDC)",
              "Je connais les grandes dates : 1988 (GIEC), 1992 (Rio), 1997 (Kyoto), 2015 (Paris), 2025 (COP30)",
              "Je sais expliquer pourquoi le passager clandestin mine les accords climatiques",
              "Je connais le MACF et son objectif d'éviter les fuites carbone",
            ],
          },
          {
            title: "Chiffres clés à mobiliser",
            color: "#97C459",
            items: [
              "+1,5 °C : seuil franchi en 2024 pour la première fois (Copernicus)",
              "53 Gt CO₂eq : émissions mondiales en 2023 (record)",
              "-32 % : réduction des émissions françaises depuis 1990 (CITEPA, 2024)",
              "~70 €/t CO₂ : prix de l'EU ETS en 2024-2025 ; objectif -62 % d'ici 2030",
            ],
          },
        ];

        return (
          <div>
            <NoteBox type="info">Coche chaque point au fur et à mesure de ta révision. La checklist se remet à zéro si tu recharges la page.</NoteBox>
            {sections.map((sec, si) => (
              <div key={si} style={{ marginBottom: 20 }}>
                <STitle color={sec.color}>{sec.title}</STitle>
                {sec.items.map((item, ii) => {
                  const key = `${si}-${ii}`;
                  const checked = !!memoChecks[key];
                  return (
                    <div key={ii} onClick={() => setMemoChecks((m) => ({ ...m, [key]: !checked }))} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 14px", borderRadius: 8, marginBottom: 6, background: checked ? "#0a1f0a" : "#111c29", border: `1px solid ${checked ? "#1a5a1a" : "#1e3048"}`, cursor: "pointer" }}>
                      <div style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 4, border: `2px solid ${checked ? "#5DCAA5" : "#334455"}`, background: checked ? "#5DCAA5" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                        {checked && <span style={{ color: "#0d1b2a", fontSize: 12, fontWeight: 800 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 13, color: checked ? "#5DCAA5" : "#8899aa", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        );
      }

      // ── 10. RESSOURCES ───────────────────────────────────────────────────
      case 9:
        return (
          <div>
            <NoteBox type="info">Les ressources vidéo et interactives sont en cours de préparation. Elles seront disponibles prochainement sur CapSES.</NoteBox>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
              {[
                { icon: "🎬", title: "Vidéo cours — Externalités & instruments", text: "Cours animé sur les quatre instruments de politique environnementale." },
                { icon: "📊", title: "Vidéo — EU ETS & marché carbone", text: "Fonctionnement et évolution du prix du carbone européen." },
                { icon: "🌍", title: "Vidéo — Accords climatiques", text: "De Rio à Paris : chronologie et enjeux des négociations internationales." },
                { icon: "✍️", title: "Corrigé dissertation guidé", text: "Correction détaillée d'un sujet type bac sur les politiques environnementales." },
              ].map((r, i) => (
                <div key={i} style={{ background: "#111c29", border: "1px solid #1e3048", borderRadius: 10, padding: 20, opacity: 0.6, textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{r.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#dce8f5", marginBottom: 6 }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: "#8899aa", lineHeight: 1.5, marginBottom: 12 }}>{r.text}</div>
                  <div style={{ display: "inline-block", fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "#1e3048", color: "#445566" }}>Bientôt disponible</div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  // ── LAYOUT ────────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: "100vh", background: "#0d1b2a", color: "#dce8f5", fontFamily: "Space Grotesk, sans-serif" }}>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, height: 56, background: "#0a1520", borderBottom: "1px solid #1e3048", display: "flex", alignItems: "center", padding: "0 24px", gap: 8 }}>
        <a href="/" style={{ color: "#D4A017", fontWeight: 800, fontSize: 16, fontFamily: "Syne, sans-serif", textDecoration: "none" }}>CapSES</a>
        <span style={{ color: "#334455", fontSize: 13 }}>›</span>
        <span style={{ color: "#8899aa", fontSize: 13 }}>Terminale</span>
        <span style={{ color: "#334455", fontSize: 13 }}>›</span>
        <span style={{ color: "#b0c4d8", fontSize: 13, fontWeight: 600 }}>Environnement</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 12, color: "#5DCAA5", fontWeight: 700, background: "#0a2020", border: "1px solid #1a4a3a", borderRadius: 20, padding: "3px 12px", animation: "pulse 2s infinite" }}>
            {step + 1}/{STEPS.length}
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #1a3a1a 0%, #2a5a2a 40%, #1a4a3a 80%, #0a2a2a 100%)", padding: isMobile ? "32px 20px" : "48px 40px", textAlign: "center" }}>
        <div style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", padding: "4px 14px", borderRadius: 20, background: "rgba(93,202,165,0.15)", color: "#5DCAA5", border: "1px solid rgba(93,202,165,0.3)", marginBottom: 16, textTransform: "uppercase" }}>
          Économie · Terminale SES
        </div>
        <h1 style={{ fontSize: isMobile ? 20 : 26, fontWeight: 800, fontFamily: "Syne, sans-serif", color: "#fff", lineHeight: 1.35, marginBottom: 12, maxWidth: 720, margin: "0 auto 12px" }}>
          Comment les politiques publiques peuvent-elles répondre aux défaillances du marché liées à l'environnement ?
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Programme Éduscol 2020 · 10 étapes · Actualisé 2025</p>
      </div>

      {/* ONGLETS */}
      <div style={{ background: "#0a1520", borderBottom: "1px solid #1e3048", overflowX: "auto" }}>
        <div style={{ display: "flex", minWidth: "max-content", padding: "0 16px" }}>
          {STEPS.map((s, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ flexShrink: 0, padding: "12px 14px", fontSize: 12, fontWeight: step === i ? 700 : 400, color: step === i ? s.color : "#445566", background: "none", border: "none", borderBottom: `2px solid ${step === i ? s.color : "transparent"}`, cursor: "pointer", whiteSpace: "nowrap", transition: "all .15s" }}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* LAYOUT GRID */}
      <div style={{ display: "flex", maxWidth: 1200, margin: "0 auto", padding: isMobile ? "20px 16px" : "32px 32px" }}>

        {/* SIDEBAR */}
        {!isMobile && (
          <div style={{ width: 240, flexShrink: 0, marginRight: 32, position: "sticky", top: 56, height: "calc(100vh - 56px)", overflowY: "auto" }}>
            <div style={{ background: "#0a1520", borderRadius: 12, border: "1px solid #1e3048", padding: 16 }}>
              {STEPS.map((s, i) => (
                <div key={i} onClick={() => goTo(i)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, marginBottom: 4, cursor: "pointer", background: step === i ? "#111c29" : "transparent", border: `1px solid ${step === i ? "#1e3048" : "transparent"}` }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: visited.has(i) && step !== i ? "#0a2a1a" : step === i ? s.color + "22" : "#1e3048", border: `2px solid ${step === i ? s.color : visited.has(i) ? "#5DCAA5" : "#334455"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: step === i ? s.color : visited.has(i) ? "#5DCAA5" : "#445566", flexShrink: 0 }}>
                    {visited.has(i) && step !== i ? "✓" : i + 1}
                  </div>
                  <span style={{ fontSize: 12, color: step === i ? s.color : "#8899aa", fontWeight: step === i ? 700 : 400, lineHeight: 1.3 }}>{s.label}</span>
                </div>
              ))}
              <div style={{ marginTop: 12, background: "#1e3048", borderRadius: 6, height: 6, overflow: "hidden" }}>
                <div style={{ width: `${((step + 1) / STEPS.length) * 100}%`, height: "100%", background: "linear-gradient(90deg, #5DCAA5, #7EB8FF)", borderRadius: 6, transition: "width .4s" }} />
              </div>
              <div style={{ fontSize: 11, color: "#445566", textAlign: "center", marginTop: 6 }}>{step + 1}/{STEPS.length} étapes</div>
            </div>
          </div>
        )}

        {/* MAIN */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* EN-TÊTE DE SECTION */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 24 }}>{activeStep.icon}</span>
            <span style={{ fontSize: isMobile ? 18 : 22, fontWeight: 800, fontFamily: "Syne, sans-serif", color: activeStep.color }}>{activeStep.label}</span>
            <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: activeStep.color + "22", color: activeStep.color, border: `1px solid ${activeStep.color}55` }}>{step + 1}/10</span>
          </div>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${activeStep.color}, transparent)`, borderRadius: 2, marginBottom: 24 }} />

          {/* CONTENU */}
          {renderContent()}

          {/* NAV BAS */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 24, borderTop: "1px solid #1e3048" }}>
            <button onClick={() => step > 0 && goTo(step - 1)} disabled={step === 0} style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid #1e3048", background: step === 0 ? "#0a1520" : "#111c29", color: step === 0 ? "#334455" : "#b0c4d8", fontSize: 13, fontWeight: 600, cursor: step === 0 ? "default" : "pointer" }}>
              ← Étape précédente
            </button>
            <button onClick={() => step < STEPS.length - 1 && goTo(step + 1)} disabled={step === STEPS.length - 1} style={{ padding: "10px 20px", borderRadius: 8, border: "none", background: step === STEPS.length - 1 ? "#1e3048" : activeStep.color, color: step === STEPS.length - 1 ? "#445566" : "#0d1b2a", fontSize: 13, fontWeight: 700, cursor: step === STEPS.length - 1 ? "default" : "pointer" }}>
              Étape suivante →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@400;600;700&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.6} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0a1520; }
        ::-webkit-scrollbar-thumb { background: #1e3048; border-radius: 3px; }
      `}</style>
    </div>
  );
}
