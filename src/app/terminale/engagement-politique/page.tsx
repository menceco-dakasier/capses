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

const COLORS = {
  gold: "#D4A017",
  blue: "#7EB8FF",
  teal: "#5DCAA5",
  coral: "#F0997B",
  purple: "#AFA9EC",
  green: "#97C459",
  amber: "#EF9F27",
  bg: "#0d1b2a",
};

type DefBoxVariant = "blue" | "teal" | "amber" | "purple" | "coral" | "green";
function DefBox({ label, children, variant = "blue" }: { label: string; children: React.ReactNode; variant?: DefBoxVariant }) {
  const map: Record<DefBoxVariant, { bg: string; border: string; labelColor: string }> = {
    blue:   { bg: "rgba(126,184,255,0.08)", border: "rgba(126,184,255,0.3)", labelColor: COLORS.blue },
    teal:   { bg: "rgba(93,202,165,0.08)",  border: "rgba(93,202,165,0.3)",  labelColor: COLORS.teal },
    amber:  { bg: "rgba(239,159,39,0.08)",  border: "rgba(239,159,39,0.3)",  labelColor: COLORS.amber },
    purple: { bg: "rgba(175,169,236,0.08)", border: "rgba(175,169,236,0.3)", labelColor: COLORS.purple },
    coral:  { bg: "rgba(240,153,123,0.08)", border: "rgba(240,153,123,0.3)", labelColor: COLORS.coral },
    green:  { bg: "rgba(151,196,89,0.08)",  border: "rgba(151,196,89,0.3)",  labelColor: COLORS.green },
  };
  const s = map[variant];
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 12 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: s.labelColor, marginBottom: 6, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 14, color: "#c8d8e8", lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

function STitle({ children, color = COLORS.blue }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ fontSize: 15, fontWeight: 700, color, borderLeft: `3px solid ${color}`, paddingLeft: 10, margin: "20px 0 10px", fontFamily: "Space Grotesk, sans-serif" }}>
      {children}
    </div>
  );
}

function StatGrid({ stats }: { stats: { num: string; label: string; color: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
      {stats.map((s, i) => (
        <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "14px 10px", textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: "Syne, sans-serif", lineHeight: 1, marginBottom: 5 }}>{s.num}</div>
          <div style={{ fontSize: 11, color: "#8899aa", lineHeight: 1.4, fontFamily: "Space Grotesk, sans-serif" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function CardGrid({ cards }: { cards: { badge: string; badgeColor: string; title: string; text: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10, marginBottom: 14 }}>
      {cards.map((c, i) => (
        <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", padding: "2px 8px", borderRadius: 20, display: "inline-block", marginBottom: 8, background: `${c.badgeColor}22`, color: c.badgeColor, border: `1px solid ${c.badgeColor}44` }}>{c.badge}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#e0eaf4", marginBottom: 4, fontFamily: "Space Grotesk, sans-serif" }}>{c.title}</div>
          <div style={{ fontSize: 12, color: "#8899aa", lineHeight: 1.5, fontFamily: "Space Grotesk, sans-serif" }}>{c.text}</div>
        </div>
      ))}
    </div>
  );
}

function NoteBox({ type, children }: { type: "info" | "warn" | "actu" | "success"; children: React.ReactNode }) {
  const map = {
    info:    { bg: "rgba(126,184,255,0.08)", border: "rgba(126,184,255,0.3)", icon: "ℹ️" },
    warn:    { bg: "rgba(240,153,123,0.08)", border: "rgba(240,153,123,0.3)", icon: "⚠️" },
    actu:    { bg: "rgba(239,159,39,0.08)",  border: "rgba(239,159,39,0.3)",  icon: "📊" },
    success: { bg: "rgba(93,202,165,0.08)",  border: "rgba(93,202,165,0.3)",  icon: "✅" },
  };
  const s = map[type];
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: "12px 16px", marginBottom: 14, fontSize: 13, color: "#c8d8e8", lineHeight: 1.6, fontFamily: "Space Grotesk, sans-serif" }}>
      {s.icon} {children}
    </div>
  );
}

function MecaBox({ steps }: { steps: { title: string; text: string; color: string }[] }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: 14, marginBottom: 12 }}>
          <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: "50%", background: `${s.color}22`, border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: s.color, fontFamily: "Syne, sans-serif" }}>{i + 1}</div>
          <div style={{ flex: 1, paddingTop: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: s.color, marginBottom: 3, fontFamily: "Space Grotesk, sans-serif" }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#8899aa", lineHeight: 1.6, fontFamily: "Space Grotesk, sans-serif" }}>{s.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Accordion({ items }: { items: { title: string; color: string; content: React.ReactNode }[] }) {
  const [open, setOpen] = useState<number>(0);
  return (
    <div style={{ marginBottom: 14 }}>
      {items.map((item, i) => (
        <div key={i} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
          <div onClick={() => setOpen(open === i ? -1 : i)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", cursor: "pointer", background: open === i ? "rgba(255,255,255,0.04)" : "transparent", fontFamily: "Space Grotesk, sans-serif", fontSize: 13, fontWeight: 600, color: "#e0eaf4" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
            <span style={{ flex: 1 }}>{item.title}</span>
            <span style={{ color: "#556677", fontSize: 11, transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
          </div>
          {open === i && (
            <div style={{ padding: "4px 14px 14px 34px", fontSize: 13, color: "#8899aa", lineHeight: 1.7, fontFamily: "Space Grotesk, sans-serif" }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

type QuizQuestion = { q: string; opts: string[]; ans: number; exp: string };
function StepQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const q = questions[current];

  function select(i: number) {
    if (answered !== null) return;
    setAnswered(i);
    if (i === q.ans) setScore(s => s + 1);
  }

  function next() {
    if (current + 1 >= questions.length) { setDone(true); return; }
    setCurrent(c => c + 1);
    setAnswered(null);
  }

  function restart() { setCurrent(0); setScore(0); setAnswered(null); setDone(false); }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 90 ? "🏆" : pct >= 70 ? "👍" : pct >= 50 ? "📚" : "💪";
    const msg = pct >= 90 ? "Excellent ! Tu maîtrises parfaitement ce chapitre." : pct >= 70 ? "Très bien ! Quelques points à revoir mais tu as l'essentiel." : pct >= 50 ? "Pas mal, mais relis les étapes Paradoxe collectif et Transformations !" : "Courage ! Reprends les définitions depuis le début, notamment Olson et Gaxie.";
    return (
      <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
        <div style={{ fontSize: 48 }}>{emoji}</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.purple, fontFamily: "Syne, sans-serif", margin: "10px 0 6px" }}>{score} / {questions.length} — {pct} %</div>
        <div style={{ fontSize: 14, color: "#8899aa", maxWidth: 360, margin: "0 auto 20px", lineHeight: 1.6, fontFamily: "Space Grotesk, sans-serif" }}>{msg}</div>
        <button onClick={restart} style={{ background: COLORS.purple, color: "#0d1b2a", border: "none", borderRadius: 8, padding: "10px 22px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Space Grotesk, sans-serif" }}>↺ Recommencer</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ fontSize: 11, color: "#556677", marginBottom: 8, fontFamily: "Space Grotesk, sans-serif" }}>Question {current + 1} / {questions.length}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#e0eaf4", marginBottom: 14, fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.5 }}>{q.q}</div>
      <div style={{ display: "grid", gap: 8, marginBottom: 14 }}>
        {q.opts.map((o, i) => {
          let bg = "rgba(255,255,255,0.04)";
          let border = "rgba(255,255,255,0.08)";
          let color = "#c8d8e8";
          if (answered !== null) {
            if (i === q.ans) { bg = "rgba(93,202,165,0.15)"; border = COLORS.teal; color = COLORS.teal; }
            else if (i === answered) { bg = "rgba(240,153,123,0.15)"; border = COLORS.coral; color = COLORS.coral; }
          }
          return (
            <button key={i} onClick={() => select(i)} disabled={answered !== null} style={{ textAlign: "left", padding: "12px 14px", border: `1px solid ${border}`, borderRadius: 8, background: bg, fontSize: 13, color, cursor: answered !== null ? "default" : "pointer", transition: "all 0.12s", fontFamily: "Space Grotesk, sans-serif" }}>
              {o}
            </button>
          );
        })}
      </div>
      {answered !== null && (
        <div style={{ background: "rgba(239,159,39,0.1)", border: `1px solid rgba(239,159,39,0.3)`, borderRadius: 8, padding: "12px 14px", fontSize: 13, color: "#c8a84a", lineHeight: 1.7, marginBottom: 14, fontFamily: "Space Grotesk, sans-serif" }}>
          {answered === q.ans ? "✅ " : "❌ "}{q.exp}
        </div>
      )}
      {answered !== null && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={next} style={{ background: COLORS.purple, color: "#0d1b2a", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Space Grotesk, sans-serif" }}>
            {current + 1 < questions.length ? "Question suivante →" : "Voir mes résultats"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── STEPS ──────────────────────────────────────────────────────────────────
const STEPS = [
  { id: "savoir",     label: "À savoir pour le bac",    icon: "🎯", color: COLORS.gold },
  { id: "notions",    label: "Notions indispensables",   icon: "📐", color: COLORS.blue },
  { id: "cours",      label: "Le cours en 10 min",       icon: "⚡", color: COLORS.teal },
  { id: "mecanismes", label: "Mécanismes à maîtriser",   icon: "⚙️", color: COLORS.purple },
  { id: "erreurs",    label: "Erreurs fréquentes",       icon: "⚠️", color: COLORS.coral },
  { id: "quiz",       label: "Quiz",                     icon: "🧠", color: COLORS.green },
  { id: "sujets",     label: "Sujets probables",         icon: "📋", color: COLORS.gold },
  { id: "methode",    label: "Méthode appliquée",        icon: "✍️", color: COLORS.blue },
  { id: "memo",       label: "Fiche mémo PDF",           icon: "📄", color: COLORS.teal },
  { id: "ressources", label: "Ressources",               icon: "🎬", color: COLORS.blue },
];

// ── CONTENT ────────────────────────────────────────────────────────────────

function StepSavoir() {
  return (
    <div>
      <CardGrid cards={[
        { badge: "Objectif 1", badgeColor: COLORS.gold, title: "Identifier les formes d'engagement", text: "Distinguer vote, militantisme, engagement associatif, consommation engagée. Savoir qu'elles peuvent être individuelles ou collectives." },
        { badge: "Objectif 2", badgeColor: COLORS.gold, title: "Expliquer le paradoxe d'Olson", text: "Comprendre pourquoi l'action collective est improbable et connaître les 3 mécanismes qui permettent de la surmonter." },
        { badge: "Objectif 3", badgeColor: COLORS.gold, title: "Analyser les inégalités d'engagement", text: "Mobiliser CSP/diplôme, effet d'âge vs génération, genre. Utiliser les données INSEE et DJEPVA." },
        { badge: "Objectif 4", badgeColor: COLORS.gold, title: "Expliquer les transformations", text: "Distinguer conflits du travail classiques et NMS. Maîtriser le répertoire d'action collective de Tilly." },
      ]} />
      <CardGrid cards={[
        { badge: "Mancur Olson", badgeColor: COLORS.purple, title: "Logique de l'action collective (1966)", text: "Paradoxe de l'action collective, passager clandestin, incitations sélectives." },
        { badge: "Daniel Gaxie", badgeColor: COLORS.purple, title: "Rétributions du militantisme (1977)", text: "Rétributions symboliques : prestige, liens sociaux, sens. Complète Olson." },
        { badge: "Charles Tilly", badgeColor: COLORS.purple, title: "Répertoire d'action collective (1984)", text: "Évolution historique : local-patronné → national-autonome → transnational." },
        { badge: "Alain Touraine", badgeColor: COLORS.purple, title: "Nouveaux Mouvements Sociaux (1984)", text: "NMS post-matérialistes (féminisme, écologie) succèdent aux conflits du travail." },
        { badge: "Ronald Inglehart", badgeColor: COLORS.blue, title: "Post-matérialisme (1993)", text: "La prospérité déplace les conflits vers des enjeux identitaires et de reconnaissance." },
        { badge: "S. Dubuisson-Quellier", badgeColor: COLORS.teal, title: "La consommation engagée (2018)", text: "Boycott/buycott : derrière l'apparent individualisme, d'importants mécanismes collectifs." },
      ]} />
      <NoteBox type="actu">
        <strong>Données clés 2024-2025 :</strong> 41 % des 15-30 ans signent des pétitions en ligne (Baromètre DJEPVA 2024) · 56,9 % des cadres vs 32,6 % des ouvriers adhèrent à une association (INSEE 2016) · 68 % d'abstention des 18-30 ans aux législatives 2022 · 13 journées de mobilisation contre la réforme des retraites 2023 (record depuis 1995)
      </NoteBox>
      <StatGrid stats={[
        { num: "41 %", label: "des 15-30 ans signent des pétitions en ligne (DJEPVA 2024)", color: COLORS.purple },
        { num: "1,28 M", label: "manifestants le 7 mars 2023 (retraites) selon le ministère de l'Intérieur", color: COLORS.coral },
        { num: "5,5×", label: "plus de chances d'adhérer à une asso de défense de droits pour un diplômé du supérieur", color: COLORS.teal },
      ]} />
    </div>
  );
}

function StepNotions() {
  return (
    <div>
      <DefBox label="Engagement politique" variant="purple">
        Toute forme d'action <strong>motivée par des valeurs politiques</strong> visant à exercer une influence sur les détenteurs du pouvoir ou sur la vie en société. Va bien au-delà du vote : militantisme, engagement associatif, consommation engagée, participation à des manifestations.
      </DefBox>
      <DefBox label="Militantisme" variant="blue">
        Engagement <strong>actif et durable</strong> dans une organisation (parti, syndicat, association) pour défendre une cause. Se distingue de la simple adhésion par la participation régulière aux réunions, actions et tracts. Peut modifier les comportements dans d'autres sphères de vie.
      </DefBox>
      <DefBox label="Engagement associatif" variant="teal">
        Adhésion à et action au sein d'une association. N'est <strong>politique</strong> que si l'objectif est d'influencer les détenteurs du pouvoir. Ex : les Restos du cœur qui font campagne pour le logement ≠ simple distribution alimentaire.
      </DefBox>
      <DefBox label="Consommation engagée" variant="amber">
        Utilisation des actes d'achat (boycott, buycott) comme levier politique pour transformer les marchés. Sophie Dubuisson-Quellier (2018) montre que derrière l'apparente dimension individuelle existent d'importants <strong>mécanismes collectifs</strong>.
      </DefBox>
      <DefBox label="Paradoxe de l'action collective (Olson, 1966)" variant="coral">
        À l'échelle individuelle, la stratégie rationnelle est d'être <strong>passager clandestin</strong> (profiter des résultats sans participer). Mais si tout le monde raisonne ainsi, aucune mobilisation n'émerge — paradoxe entre rationalité individuelle et rationalité collective.
      </DefBox>
      <DefBox label="Passager clandestin" variant="coral">
        Individu qui profite des résultats d'une action collective (<strong>bien public non exclusif</strong>) sans y avoir participé. Logique coût-bénéfice : si la réforme est abrogée sans moi, j'en bénéficie quand même ; si elle n'est pas abrogée, j'ai évité des coûts inutiles.
      </DefBox>
      <DefBox label="Incitations sélectives (Olson)" variant="blue">
        Récompenses ou sanctions <strong>réservées aux seuls participants</strong>, qui rendent la mobilisation individuellement rationnelle. Ex : caisse de grève, protection syndicale, stigmatisation des non-grévistes par les collègues.
      </DefBox>
      <DefBox label="Rétributions symboliques (Gaxie, 1977)" variant="purple">
        Satisfactions <strong>non matérielles</strong> issues de l'engagement : prestige, liens d'amitié, sentiment de donner un sens à sa vie, construction d'un capital social. Complètent les incitations sélectives pour expliquer pourquoi on milite.
      </DefBox>
      <DefBox label="Compétence politique" variant="teal">
        Connaissance du fonctionnement politique <strong>et</strong> sentiment d'être légitime à s'exprimer. Inégalement distribuée selon le diplôme et la position sociale. Concept clé pour expliquer les inégalités de participation.
      </DefBox>
      <DefBox label="Répertoire d'action collective (Tilly, 1984)" variant="amber">
        Ensemble des <strong>moyens d'action disponibles</strong> à une époque donnée pour les acteurs contestataires, par analogie avec un répertoire musical. Évolue historiquement : du charivari local à la grève nationale, puis aux actions transnationales spectaculaires.
      </DefBox>
      <DefBox label="Nouveaux Mouvements Sociaux — NMS (Touraine, 1984)" variant="green">
        Mouvements à revendications <strong>post-matérialistes</strong> (Inglehart) : féminisme, écologie, droits culturels, LGBTQI+. Portés par de nouveaux acteurs (étudiant·es, femmes, minorités). Succèdent aux conflits du travail classiques sans les éliminer.
      </DefBox>
      <DefBox label="Structure des opportunités politiques (McAdam, Kriesi)" variant="blue">
        Ensemble des facteurs contextuels — ouverture du système politique, stabilité des alliances, division des élites, répression — qui <strong>favorisent ou découragent</strong> l'émergence d'actions collectives, indépendamment des ressources du groupe contestataire.
      </DefBox>
    </div>
  );
}

function StepCours() {
  return (
    <div>
      <STitle color={COLORS.teal}>I. Les formes de l'engagement politique</STitle>
      <CardGrid cards={[
        { badge: "INDIVIDUEL", badgeColor: COLORS.blue, title: "🗳️ Le vote", text: "Forme minimale d'engagement. Devient un véritable engagement si pratiqué régulièrement avec fidélité et attentes fortes. 40 % des Français le jugent le plus efficace (vs 29 % des 18-30 ans)." },
        { badge: "COLLECTIF", badgeColor: COLORS.coral, title: "✊ Le militantisme", text: "Engagement actif dans une organisation (parti, syndicat, asso). Le militant participe aux réunions, tracts, actions — au-delà de la simple adhésion." },
        { badge: "COLLECTIF", badgeColor: COLORS.teal, title: "🤝 L'engagement associatif", text: "N'est politique que si l'objectif est d'influencer le pouvoir. 40,8 % des Français de 16+ adhèrent à une association (INSEE 2016)." },
        { badge: "INDIVIDUEL", badgeColor: COLORS.amber, title: "🛒 Consommation engagée", text: "Boycott/buycott comme levier politique. Dubuisson-Quellier (2018) : derrière l'individualisme apparent, des mécanismes collectifs importants." },
      ]} />
      <STitle color={COLORS.teal}>II. Pourquoi l'action collective est improbable (Olson)</STitle>
      <DefBox label="Le paradoxe" variant="coral">
        Si chacun raisonne coûts/bénéfices → <strong>passager clandestin</strong>. Si tout le monde le fait → zéro mobilisation. Pourtant, les grèves et manifestations existent. Comment ?
      </DefBox>
      <Accordion items={[
        { title: "1. Incitations sélectives (Olson)", color: COLORS.purple, content: <span>Récompenses réservées aux participants : <strong>caisse de grève</strong> qui compense les jours non travaillés, protection juridique syndicale, stigmatisation des non-grévistes. Rend l'engagement individuellement rationnel.</span> },
        { title: "2. Rétributions symboliques (Gaxie, 1977)", color: COLORS.blue, content: <span>Satisfactions non matérielles : prestige, camaraderie, sens de sa vie, liens d'amitié. Le désengagement s'explique souvent par la <strong>dévaluation de ces rétributions</strong>, pas par des désaccords idéologiques.</span> },
        { title: "3. Structure des opportunités politiques (McAdam, Kriesi)", color: COLORS.teal, content: <span>Le contexte politique facilite ou entrave la mobilisation : <strong>ouverture du système</strong>, divisions des élites, répression. Ex : la réforme des retraites 2023 face à un gouvernement minoritaire ayant eu recours au 49-3.</span> },
      ]} />
      <STitle color={COLORS.teal}>III. L'engagement est socialement inégal</STitle>
      <NoteBox type="info">
        <strong>Compétence politique (Gaxie) :</strong> Les cadres et diplômés se sentent plus légitimes à s'engager. 56,9 % des cadres adhèrent à une association vs 32,6 % des ouvriers (INSEE 2016). L'<strong>effet d'âge</strong> (radicalité liée à la jeunesse) et l'<strong>effet de génération</strong> (marque durable d'un contexte historique) expliquent les comportements des jeunes.
      </NoteBox>
      <STitle color={COLORS.teal}>IV. Les transformations de l'action collective</STitle>
      <NoteBox type="actu">
        <strong>Conflits du travail → NMS :</strong> Le mouvement ouvrier du XIXe-XXe siècle portait des revendications <strong>matérialistes</strong>. Depuis les années 1970, les NMS (Touraine) portent des revendications <strong>post-matérialistes</strong> (féminisme, écologie, droits culturels). Mais le mouvement contre les retraites 2023 montre la <strong>persistance des conflits du travail</strong>.
      </NoteBox>
      <NoteBox type="info">
        <strong>Répertoire d'action (Tilly) :</strong> Local-patronné (1650-1850) → National-autonome (grève, manifestation, 1850-auj.) → Transnational-spectaculaire (depuis 1980). Tendances récentes : recul de la grève, maintien de la manifestation, essor de l'action numérique et symbolique.
      </NoteBox>
    </div>
  );
}

function StepMecanismes() {
  return (
    <div>
      <STitle color={COLORS.purple}>Mécanisme 1 — Le paradoxe de l'action collective et ses solutions</STitle>
      <MecaBox steps={[
        { title: "Étape 1 — La situation de bien public", color: COLORS.purple, text: "Le résultat de l'action collective (ex : abrogation d'une réforme) est un bien non exclusif : tout le monde en profite, participants ou non." },
        { title: "Étape 2 — La logique du passager clandestin", color: COLORS.coral, text: "Raisonnement coût-bénéfice individuel : si les autres se mobilisent, j'en profite sans coût. Si personne ne se mobilise, ma contribution n'aurait rien changé. → Stratégie dominante : ne pas participer." },
        { title: "Étape 3 — Le paradoxe", color: COLORS.amber, text: "Si tous raisonnent ainsi, aucune mobilisation n'émerge — alors que collectivement, elle bénéficierait à tous. Rationalité individuelle vs rationalité collective." },
        { title: "Étape 4 — Les incitations sélectives (Olson)", color: COLORS.blue, text: "Solution 1 : récompenses/sanctions réservées aux seuls participants (caisse de grève, protection syndicale, stigmatisation des non-grévistes). Rendent la mobilisation individuellement rationnelle." },
        { title: "Étape 5 — Les rétributions symboliques (Gaxie)", color: COLORS.teal, text: "Solution 2 : satisfactions non matérielles (prestige, amitié, sens). Albert Hirschman (1983) ajoute que le bénéfice inclut le plaisir de l'action elle-même — pas seulement le résultat escompté." },
        { title: "Étape 6 — La structure des opportunités politiques", color: COLORS.green, text: "Solution 3 : un contexte favorable (gouvernement minoritaire, division des élites, répression faible, opinion publique favorable) réduit les coûts et augmente l'espérance de succès." },
      ]} />
      <STitle color={COLORS.purple}>Mécanisme 2 — L'évolution du répertoire d'action (Tilly)</STitle>
      <DefBox label="Tableau synthétique" variant="blue">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "Space Grotesk, sans-serif" }}>
            <thead>
              <tr>
                {["Modèle","Période","Acteurs","Type d'action"].map(h => (
                  <th key={h} style={{ padding: "8px 10px", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#7EB8FF", fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Local-patronné", "1650–1850", "Notables (prêtres, nobles)", "Charivari, émeutes, révoltes anti-taxes — souvent violentes"],
                ["National-autonome", "1850 – auj.", "Partis, syndicats, groupes organisés", "Grève, manifestation — organisées et rationalisées"],
                ["Transnational-spectaculaire", "Depuis 1980", "Réseaux informels, ONG, collectifs", "Actions symboliques pour les médias, désobéissance civile, cyber-activisme"],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: "8px 10px", color: j === 0 ? "#AFA9EC" : "#8899aa", verticalAlign: "top", lineHeight: 1.5 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DefBox>
      <STitle color={COLORS.purple}>Mécanisme 3 — NMS vs conflits du travail</STitle>
      <MecaBox steps={[
        { title: "Conflits du travail classiques (XIXe–XXe s.)", color: COLORS.teal, text: "Portés par le mouvement ouvrier et les syndicats. Revendications matérialistes : salaire, durée du travail, protection sociale. Aboutissements : congés payés (1936), Sécu (1945), SMIC (1970)." },
        { title: "Nouveaux Mouvements Sociaux (Touraine, 1984)", color: COLORS.purple, text: "Revendications post-matérialistes (Inglehart) : reconnaissance identitaire, droits culturels, environnement. Nouveaux acteurs : étudiant·es, femmes, minorités sexuelles, activistes climatiques." },
        { title: "Luttes minoritaires contemporaines", color: COLORS.coral, text: "LGBTQI+, antiracisme, sans-papiers, féminisme #MeToo, Black Lives Matter (2020). Cherchent une reconnaissance identitaire et une extension des droits." },
        { title: "Persistance des conflits du travail", color: COLORS.amber, text: "La réforme des retraites 2023 (13 journées, 1,28 M manifestants le 7 mars selon la police) montre que les conflits du travail n'ont pas disparu — nuançant la thèse post-matérialiste d'Inglehart." },
      ]} />
      <NoteBox type="actu">
        <strong>Structure des opportunités politiques (retraites 2023) :</strong> gouvernement minoritaire + recours au 49-3 perçu comme déni démocratique + intersyndicale unie (8 syndicats) + opinion publique majoritairement hostile → contexte favorable à la mobilisation malgré le paradoxe d'Olson.
      </NoteBox>
    </div>
  );
}

function StepErreurs() {
  const items: [string, string][] = [
    ["L'abstention = dépolitisation", "L'abstention peut être un acte politique délibéré (protestation, désaffiliation). En 2024, 41 % des jeunes signaient des pétitions en ligne. L'abstention coexiste avec d'autres formes d'engagement."],
    ["Engagement politique = vote", "L'engagement politique englobe militantisme, engagement associatif, consommation engagée, manifestations, pétitions, cyber-activisme… Le vote est une forme parmi d'autres."],
    ["Incitations sélectives = rétributions symboliques", "Les incitations sélectives (Olson) sont des avantages MATÉRIELS réservés aux participants. Les rétributions symboliques (Gaxie) sont des satisfactions NON MATÉRIELLES (prestige, amitié, sens). Ne pas confondre les deux auteurs."],
    ["Les NMS ont remplacé les conflits du travail", "Les NMS s'y ajoutent mais ne les éliminent pas. La mobilisation des retraites 2023 montre la persistance des conflits du travail. Parler de 'diversification' plutôt que de 'substitution'."],
    ["Effet d'âge = effet de génération", "Effet d'âge : comportement propre à toute jeunesse (radicalité, instabilité). Effet de génération : marque durable d'un contexte historique (Mai 68, Covid/Climat). Un même phénomène peut résulter des deux."],
    ["Les catégories populaires ne s'engagent jamais", "Des 'mobilisations improbables' (Mathieu, Collovald) existent : Gilets Jaunes (2018), retraites (2023). Les inégalités sont des tendances statistiques, pas des déterminismes absolus."],
    ["La structure des opportunités = ressources du groupe", "La SOP désigne des facteurs CONTEXTUELS (régime politique, alliances, répression) qui sont externes au groupe. Les ressources (argent, membres, expertise) sont internes. Ce sont deux variables distinctes."],
  ];
  return (
    <div>
      {items.map(([err, ok], i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <div style={{ background: "rgba(240,153,123,0.1)", border: "1px solid rgba(240,153,123,0.3)", borderRadius: "8px 8px 0 0", padding: "10px 14px", fontSize: 13, color: COLORS.coral, fontFamily: "Space Grotesk, sans-serif" }}>❌ {err}</div>
          <div style={{ background: "rgba(93,202,165,0.1)", border: "1px solid rgba(93,202,165,0.3)", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "10px 14px", fontSize: 13, color: COLORS.teal, fontFamily: "Space Grotesk, sans-serif" }}>✅ {ok}</div>
        </div>
      ))}
    </div>
  );
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: "Quelle est la définition correcte de l'engagement politique ?",
    opts: ["Le fait d'aller voter à chaque élection", "Toute forme d'action motivée par des valeurs politiques visant à exercer une influence sur les détenteurs du pouvoir", "L'adhésion à un parti politique ou à un syndicat", "La participation active aux manifestations de rue"],
    ans: 1,
    exp: "L'engagement politique va bien au-delà du vote. Il désigne toute action motivée par des valeurs politiques dans le but d'exercer une influence — qu'il s'agisse du vote, du militantisme, de l'engagement associatif, ou même de la consommation engagée.",
  },
  {
    q: "Qu'est-ce que le 'paradoxe de l'action collective' selon Mancur Olson ?",
    opts: ["Les individus préfèrent l'action individuelle à l'action syndicale", "À l'échelle individuelle, personne n'a intérêt à se mobiliser, mais collectivement tout le monde a intérêt à la réussite de la mobilisation", "Les groupes les plus mobilisés sont toujours les plus favorisés socialement", "La grève est plus efficace que la manifestation pour obtenir des résultats"],
    ans: 1,
    exp: "Olson montre que si chacun raisonne individuellement, la stratégie rationnelle est d'être 'passager clandestin' : profiter des résultats sans payer les coûts. Si tout le monde raisonne ainsi, aucune action collective n'émerge — d'où le paradoxe.",
  },
  {
    q: "Lors de la mobilisation contre la réforme des retraites le 7 mars 2023, combien de manifestants ont été recensés selon le ministère de l'Intérieur ?",
    opts: ["320 000 manifestants", "680 000 manifestants", "1,28 million de manifestants", "3,5 millions de manifestants"],
    ans: 2,
    exp: "Le 7 mars 2023 a été la journée record du mouvement : 1,28 million de manifestants selon le ministère de l'Intérieur (3,5 millions selon les syndicats). Ce chiffre dépasse le précédent record national de manifestations contre une réforme des retraites datant de 1995.",
  },
  {
    q: "Quelle est la différence entre 'incitations sélectives' et 'rétributions symboliques' ?",
    opts: ["Les incitations sélectives concernent les grands groupes, les rétributions symboliques les petits groupes", "Les incitations sélectives sont des récompenses matérielles réservées aux participants ; les rétributions symboliques sont des satisfactions non matérielles issues de l'engagement", "Les incitations sélectives sont théorisées par Gaxie, les rétributions symboliques par Olson", "Ce sont deux noms pour désigner le même phénomène"],
    ans: 1,
    exp: "Mancur Olson théorise les incitations sélectives : avantages matériels réservés aux membres participants (caisse de grève, protection juridique). Daniel Gaxie (1977) complète en montrant que les militants retirent aussi des rétributions symboliques non matérielles : prestige, liens d'amitié, sentiment de donner un sens à sa vie.",
  },
  {
    q: "Quelle variable sociodémographique explique le mieux l'inégal engagement politique entre CSP ?",
    opts: ["L'accès au numérique et aux réseaux sociaux", "La 'compétence politique' : la connaissance du fonctionnement politique et le sentiment d'être légitime à s'exprimer, inégalement distribuée selon le diplôme", "L'âge moyen des membres de la CSP", "Le niveau de satisfaction dans le travail"],
    ans: 1,
    exp: "La notion de 'compétence politique' (Gaxie) désigne à la fois la connaissance des règles du jeu politique et le sentiment d'être autorisé à s'y exprimer. Elle est fortement corrélée au diplôme et à la position sociale : les cadres se sentent plus légitimes que les ouvriers à s'engager politiquement.",
  },
  {
    q: "Quelle est la différence entre un 'effet d'âge' et un 'effet de génération' ?",
    opts: ["L'effet d'âge concerne les présidentielles, l'effet de génération les législatives", "L'effet d'âge suppose que les comportements des jeunes sont propres à toute jeunesse ; l'effet de génération suppose que des événements historiques marquent durablement une cohorte", "L'effet d'âge explique l'abstention, l'effet de génération le vote radical", "Ce sont deux termes équivalents"],
    ans: 1,
    exp: "L'effet d'âge explique des comportements récurrents quelle que soit la génération (radicalité, liée à la position sociale incertaine des jeunes). L'effet de génération explique des spécificités durables : la génération Mai 68 a voté plus à gauche toute sa vie ; la génération actuelle est marquée par l'urgence climatique et la méfiance institutionnelle.",
  },
  {
    q: "Selon l'INSEE (2016), quel est le taux d'adhésion à une association chez les cadres vs les ouvriers ?",
    opts: ["45 % (cadres) vs 38 % (ouvriers)", "56,9 % (cadres) vs 32,6 % (ouvriers)", "72 % (cadres) vs 25 % (ouvriers)", "40 % (cadres) vs 40 % (ouvriers) — pas de différence notable"],
    ans: 1,
    exp: "Selon l'INSEE (2016), 56,9 % des cadres et professions intellectuelles supérieures adhèrent à une association, contre 32,6 % des ouvriers. L'écart est encore plus marqué pour les associations à vocation politique directe.",
  },
  {
    q: "Qu'est-ce que le 'répertoire d'action collective' selon Charles Tilly ?",
    opts: ["La liste des syndicats reconnus par l'État", "L'ensemble des moyens d'action disponibles à une époque donnée pour les acteurs contestataires", "Les procédures légales permettant aux syndicats d'organiser des grèves", "Le programme électoral d'un mouvement social"],
    ans: 1,
    exp: "Charles Tilly (1984) emprunte la métaphore musicale : comme un répertoire musical, le répertoire d'action collective est l'ensemble des modes d'action disponibles et connus des acteurs à une époque. Il évolue historiquement : du charivari local (avant 1850) à la grève et manifestation nationale (1850-auj.) puis aux actions transnationales spectaculaires (depuis 1980).",
  },
  {
    q: "Parmi les propositions suivantes, laquelle correspond à un 'Nouveau Mouvement Social' (NMS) tel que théorisé par Alain Touraine ?",
    opts: ["La grève des mineurs pour une hausse de salaire en 1963", "La manifestation féministe #NousToutes pour la lutte contre les violences sexistes en 2018", "La mobilisation de la CGT contre la réforme des retraites de 2010", "La grève générale interprofessionnelle de 1936"],
    ans: 1,
    exp: "Les NMS (Touraine, 1984) se distinguent des conflits du travail traditionnels par leurs revendications post-matérialistes (reconnaissance identitaire, droits culturels) et leurs nouveaux acteurs (femmes, minorités…). La manifestation #NousToutes est un exemple typique : revendication féministe, portée par un collectif informel, médiatisée, internationale.",
  },
  {
    q: "Selon le Baromètre DJEPVA 2024, quelle est la principale forme de participation citoyenne des 15-30 ans en France ?",
    opts: ["Le vote aux élections municipales", "La participation à des manifestations syndicales", "La signature de pétitions ou prise de position sur Internet (41 % des jeunes)", "L'adhésion à un parti politique ou un syndicat"],
    ans: 2,
    exp: "En 2024, la principale forme de participation des jeunes (15-30 ans) reste la signature de pétitions ou la prise de position en ligne : 41 % (+3 points vs 2023). C'est l'illustration de l'essor de l'engagement numérique comme forme d'engagement politique à faibles coûts d'entrée.",
  },
];

function StepQuizWrapper() {
  return <StepQuiz questions={QUIZ_QUESTIONS} />;
}

function StepSujets() {
  return (
    <div>
      <NoteBox type="warn">
        <strong>Sujets les plus probables au bac :</strong> L'engagement politique se prête aussi bien à la dissertation qu'à l'EC2/EC3. Les angles privilégiés : paradoxe d'Olson, inégalités d'engagement, transformation des répertoires/acteurs.
      </NoteBox>
      <STitle color={COLORS.gold}>Dissertations possibles</STitle>
      <CardGrid cards={[
        { badge: "Dissertation", badgeColor: COLORS.gold, title: "Comment expliquer le comportement électoral ?", text: "Plan suggéré — I. Variables sociodémographiques (CSP, diplôme, âge, genre) · II. Effets de socialisation et compétence politique · III. Transformations récentes (abstention, vote radical, effet de génération)" },
        { badge: "Dissertation", badgeColor: COLORS.gold, title: "Les formes de l'engagement politique se sont-elles transformées ?", text: "Plan suggéré — I. Déclin relatif des formes classiques (grève, vote partisan) · II. Essor des NMS et des répertoires spectaculaires · III. Nuance : persistance des conflits du travail (retraites 2023)" },
        { badge: "Dissertation", badgeColor: COLORS.gold, title: "L'engagement politique est-il toujours le fait des classes favorisées ?", text: "Plan suggéré — I. Oui : compétence politique, CSP/diplôme, représentation · II. Nuances : mobilisations improbables (Gilets Jaunes), engagements numériques des jeunes · III. Nouvelles formes d'engagement populaire" },
      ]} />
      <STitle color={COLORS.blue}>Exercices Composés possibles</STitle>
      <CardGrid cards={[
        { badge: "EC2", badgeColor: COLORS.blue, title: "Le paradoxe de l'action collective (Olson)", text: "Question type : 'En vous appuyant sur le document et vos connaissances, montrez comment les acteurs surmontent le paradoxe de l'action collective.'" },
        { badge: "EC2", badgeColor: COLORS.blue, title: "Inégalités d'engagement selon la CSP", text: "Question type : 'À l'aide du document et de vos connaissances, expliquez pourquoi les catégories populaires participent moins à la vie politique.'" },
        { badge: "EC3", badgeColor: COLORS.teal, title: "Comment le contexte politique influence-t-il les mobilisations ?", text: "Mobiliser : structure des opportunités politiques, exemples retraites 2023, Gilets Jaunes. Opposer aux explications par les ressources internes des groupes." },
      ]} />
    </div>
  );
}

function StepMethode() {
  return (
    <div>
      <STitle color={COLORS.blue}>Méthode EC2 — Étapes appliquées</STitle>
      <MecaBox steps={[
        { title: "Étape 1 — Lire et annoter le document", color: COLORS.blue, text: "Identifier la source, la date, les données clés. Repérer l'idée directrice : que montre le document ? Entourer les chiffres importants et leur unité." },
        { title: "Étape 2 — Rédiger une phrase d'introduction", color: COLORS.purple, text: "Présenter le document (nature, source, date), puis annoncer l'idée centrale en une phrase. Ex : 'Ce graphique de l'INSEE (2016) montre que l'adhésion associative est fortement liée à la CSP.'" },
        { title: "Étape 3 — Exploiter les données chiffrées", color: COLORS.teal, text: "Citer les données précises avec leur unité. Calculer un écart ou un ratio pour mettre en évidence la tendance. Ex : 'Les cadres adhèrent 1,74× plus que les ouvriers (56,9 % vs 32,6 %).'" },
        { title: "Étape 4 — Apporter des connaissances", color: COLORS.amber, text: "Mobiliser au moins 1 mécanisme théorique et 1 auteur. Ex : 'Cela s'explique par la compétence politique (Gaxie) : les diplômés se sentent plus légitimes à s'engager…'" },
        { title: "Étape 5 — Rédiger la conclusion", color: COLORS.coral, text: "Reformuler la thèse du document en 1-2 phrases. Ouvrir éventuellement sur une nuance ou un prolongement (mobilisations improbables, nouvelles formes d'engagement)." },
      ]} />
      <NoteBox type="info">
        <strong>Méthode EC3 — Dissertation :</strong> Toujours problématiser en tension. Ex : 'Si les inégalités d'engagement persistent (I), les transformations récentes tendent à les recomposer (II), sans les éliminer (III).' Éviter le catalogue : chaque argument doit être expliqué et illustré par une donnée ou un auteur.
      </NoteBox>
      <STitle color={COLORS.blue}>Phrases-clés à maîtriser</STitle>
      <Accordion items={[
        { title: "Formuler le paradoxe d'Olson", color: COLORS.purple, content: <span>"Selon Mancur Olson (1966), à l'échelle individuelle, la stratégie rationnelle est d'être passager clandestin : profiter des résultats d'une action collective sans y participer. Mais si chacun adopte cette stratégie, aucune mobilisation n'émerge — c'est le paradoxe de l'action collective."</span> },
        { title: "Distinguer incitations sélectives et rétributions symboliques", color: COLORS.blue, content: <span>"Olson propose de surmonter ce paradoxe par des incitations sélectives : avantages matériels réservés aux seuls participants (caisse de grève, protection syndicale). Gaxie (1977) complète en montrant que l'engagement génère aussi des rétributions symboliques non matérielles : prestige, liens d'amitié, sentiment de donner un sens à sa vie."</span> },
        { title: "Utiliser la structure des opportunités politiques", color: COLORS.teal, content: <span>"La notion de structure des opportunités politiques permet d'expliquer pourquoi certaines mobilisations réussissent indépendamment des ressources du groupe : un contexte favorable (gouvernement affaibli, élites divisées, répression limitée) réduit les coûts et augmente l'espérance de succès."</span> },
        { title: "Nuancer la thèse post-matérialiste", color: COLORS.coral, content: <span>"Si les Nouveaux Mouvements Sociaux (Touraine, 1984) ont diversifié les objets de l'action collective vers des revendications post-matérialistes (Inglehart), la mobilisation contre la réforme des retraites de 2023 — 13 journées de grèves et jusqu'à 1,28 million de manifestants le 7 mars — rappelle la persistance des conflits du travail classiques."</span> },
      ]} />
    </div>
  );
}

function StepMemo() {
  const sections = [
    { title: "Formes de l'engagement politique", color: COLORS.gold, items: [
      "Vote, militantisme, engagement associatif, consommation engagée",
      "Engagement individuel vs collectif",
      "Organisations : syndicats, partis, associations, collectifs éphémères",
      "Consommation engagée (Dubuisson-Quellier, 2018) : boycott/buycott",
      "41 % des 15-30 ans signent des pétitions en ligne (DJEPVA 2024)",
    ]},
    { title: "Paradoxe de l'action collective", color: COLORS.purple, items: [
      "Olson (1966) : passager clandestin, bien public non exclusif",
      "3 solutions : incitations sélectives, rétributions symboliques, SOP",
      "Incitations sélectives = matérielles (caisse de grève)",
      "Rétributions symboliques = non matérielles (prestige, amitié) — Gaxie (1977)",
      "Structure des opportunités politiques (McAdam, Kriesi) = facteurs contextuels",
    ]},
    { title: "Inégalités d'engagement", color: COLORS.teal, items: [
      "Compétence politique : diplôme + sentiment de légitimité",
      "56,9 % cadres vs 32,6 % ouvriers (INSEE 2016)",
      "Effet d'âge (radicalité jeune) ≠ effet de génération (marque historique durable)",
      "68 % abstention 18-30 ans aux législatives 2022",
      "Genre : rapprochement progressif des comportements ; jeunes femmes + pétitions en 2024",
    ]},
    { title: "Transformations de l'action collective", color: COLORS.coral, items: [
      "Conflits du travail classiques → NMS post-matérialistes (Touraine, Inglehart)",
      "Répertoire d'action : local-patronné → national-autonome → transnational-spectaculaire (Tilly)",
      "Tendances récentes : recul grève, maintien manifestation, essor numérique",
      "Mobilisations improbables : Gilets Jaunes (2018), retraites (2023)",
      "Luttes minoritaires : #MeToo, BLM, LGBTQI+, mouvements climatiques",
    ]},
    { title: "Auteurs à citer au bac", color: COLORS.blue, items: [
      "Olson (1966) : paradoxe, passager clandestin, incitations sélectives",
      "Gaxie (1977) : rétributions symboliques du militantisme",
      "Tilly (1984) : répertoire d'action collective",
      "Touraine (1984) : Nouveaux Mouvements Sociaux",
      "Inglehart (1993) : post-matérialisme",
    ]},
  ];

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (key: string) => setChecked(c => ({ ...c, [key]: !c[key] }));

  return (
    <div>
      <NoteBox type="info">Coche chaque notion au fur et à mesure de ta révision pour suivre ta progression.</NoteBox>
      {sections.map((sec, si) => (
        <div key={si} style={{ marginBottom: 18 }}>
          <STitle color={sec.color}>{sec.title}</STitle>
          {sec.items.map((item, ii) => {
            const key = `${si}-${ii}`;
            return (
              <div key={key} onClick={() => toggle(key)} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 10px", borderRadius: 6, cursor: "pointer", background: checked[key] ? `${sec.color}11` : "transparent", marginBottom: 4, transition: "background 0.15s" }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${checked[key] ? sec.color : "rgba(255,255,255,0.2)"}`, background: checked[key] ? sec.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: "all 0.15s" }}>
                  {checked[key] && <span style={{ fontSize: 11, color: "#0d1b2a", fontWeight: 800 }}>✓</span>}
                </div>
                <span style={{ fontSize: 13, color: checked[key] ? "#c8d8e8" : "#8899aa", lineHeight: 1.5, fontFamily: "Space Grotesk, sans-serif", textDecoration: checked[key] ? "none" : "none" }}>{item}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function StepRessources() {
  const cards = [
    { icon: "🎬", title: "Vidéo — Paradoxe d'Olson", sub: "Explication animée du paradoxe de l'action collective et de ses solutions" },
    { icon: "🎬", title: "Vidéo — NMS et conflits du travail", sub: "Comprendre la transition des conflits matérialistes aux NMS post-matérialistes" },
    { icon: "📊", title: "Data — Baromètre DJEPVA 2024", sub: "Les chiffres clés de l'engagement des jeunes en France" },
    { icon: "📄", title: "Article — Répertoire d'action collective", sub: "Retour sur le concept de Tilly et son application aux mouvements contemporains" },
  ];
  return (
    <div>
      <NoteBox type="info">Ces ressources seront disponibles prochainement. En attendant, revois les étapes précédentes !</NoteBox>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 10 }}>
        {cards.map((c, i) => (
          <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: 16, opacity: 0.6 }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#c8d8e8", marginBottom: 4, fontFamily: "Space Grotesk, sans-serif" }}>{c.title}</div>
            <div style={{ fontSize: 12, color: "#556677", lineHeight: 1.5, fontFamily: "Space Grotesk, sans-serif" }}>{c.sub}</div>
            <div style={{ marginTop: 12, fontSize: 11, color: "#556677", fontFamily: "Space Grotesk, sans-serif" }}>🔒 Bientôt disponible</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderStep(id: string) {
  switch (id) {
    case "savoir":     return <StepSavoir />;
    case "notions":    return <StepNotions />;
    case "cours":      return <StepCours />;
    case "mecanismes": return <StepMecanismes />;
    case "erreurs":    return <StepErreurs />;
    case "quiz":       return <StepQuizWrapper />;
    case "sujets":     return <StepSujets />;
    case "methode":    return <StepMethode />;
    case "memo":       return <StepMemo />;
    case "ressources": return <StepRessources />;
    default:           return null;
  }
}

export default function EngagementPolitiquePage() {
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));

  function goTo(i: number) {
    setActiveStep(i);
    setVisited(v => new Set(v).add(i));
    window.scrollTo(0, 0);
  }

  const step = STEPS[activeStep];

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", fontFamily: "Space Grotesk, sans-serif" }}>
      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, height: 56, background: "rgba(13,27,42,0.95)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", padding: "0 20px", gap: 8 }}>
        <a href="/" style={{ color: COLORS.gold, fontWeight: 800, fontSize: 16, fontFamily: "Syne, sans-serif", textDecoration: "none" }}>CapSES</a>
        <span style={{ color: "#334455" }}> › </span>
        <span style={{ color: "#556677", fontSize: 13 }}>Terminale</span>
        <span style={{ color: "#334455" }}> › </span>
        <span style={{ color: "#8899aa", fontSize: 13 }}>Engagement politique</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: step.color, animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 12, color: step.color, fontWeight: 700 }}>{activeStep + 1}/{STEPS.length}</span>
        </div>
      </nav>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} } @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');`}</style>

      {/* HEADER */}
      <div style={{ padding: "32px 20px 24px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", padding: "4px 12px", borderRadius: 20, background: "rgba(175,169,236,0.15)", color: COLORS.purple, border: `1px solid rgba(175,169,236,0.3)`, marginBottom: 12 }}>
          Sociologie · Terminale SES
        </div>
        <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, color: "#e0eaf4", fontFamily: "Syne, sans-serif", lineHeight: 1.3, marginBottom: 8 }}>
          Comment expliquer l'engagement politique dans les sociétés démocratiques ?
        </h1>
        <div style={{ fontSize: 13, color: "#556677" }}>Programme Éduscol 2020 · 10 étapes · Actualisé 2025</div>
      </div>

      {/* TABS */}
      <div style={{ padding: "0 20px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none" }}>
          {STEPS.map((s, i) => (
            <button key={s.id} onClick={() => goTo(i)} style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 20, border: `1px solid ${activeStep === i ? s.color : "rgba(255,255,255,0.08)"}`, background: activeStep === i ? `${s.color}22` : "rgba(255,255,255,0.03)", color: activeStep === i ? s.color : "#556677", fontSize: 12, fontWeight: activeStep === i ? 700 : 500, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "Space Grotesk, sans-serif", transition: "all 0.15s" }}>
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* LAYOUT */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "20px 20px 60px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "240px 1fr", gap: 24, alignItems: "start" }}>

        {/* SIDEBAR */}
        {!isMobile && (
          <div style={{ position: "sticky", top: 72, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 16 }}>
            {STEPS.map((s, i) => (
              <div key={s.id} onClick={() => goTo(i)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, cursor: "pointer", background: activeStep === i ? `${s.color}15` : "transparent", marginBottom: 2, transition: "background 0.15s" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", border: `2px solid ${visited.has(i) ? s.color : "rgba(255,255,255,0.15)"}`, background: visited.has(i) && activeStep !== i ? `${s.color}33` : activeStep === i ? s.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 10, fontWeight: 800, color: activeStep === i ? "#0d1b2a" : s.color }}>
                  {visited.has(i) && activeStep !== i ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: 12, color: activeStep === i ? s.color : "#556677", fontWeight: activeStep === i ? 700 : 400, lineHeight: 1.3 }}>{s.label}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
              <div style={{ height: "100%", background: step.color, borderRadius: 2, width: `${((activeStep + 1) / STEPS.length) * 100}%`, transition: "width 0.3s" }} />
            </div>
            <div style={{ textAlign: "center", fontSize: 11, color: "#556677", marginTop: 6 }}>{Math.round(((activeStep + 1) / STEPS.length) * 100)} % complété</div>
          </div>
        )}

        {/* MAIN */}
        <div>
          {/* SECTION HEADER */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${step.color}22`, border: `1px solid ${step.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{step.icon}</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: step.color, fontFamily: "Syne, sans-serif" }}>{step.label}</div>
            </div>
            <div style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: `${step.color}22`, color: step.color, border: `1px solid ${step.color}44` }}>{activeStep + 1}/10</div>
          </div>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${step.color}, transparent)`, borderRadius: 1, marginBottom: 20 }} />

          {/* STEP CONTENT */}
          {renderStep(step.id)}

          {/* NAV BUTTONS */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, gap: 12 }}>
            <button onClick={() => goTo(activeStep - 1)} disabled={activeStep === 0} style={{ flex: 1, padding: "12px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: activeStep === 0 ? "#334455" : "#8899aa", cursor: activeStep === 0 ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 600, fontFamily: "Space Grotesk, sans-serif" }}>
              ← Étape précédente
            </button>
            <button onClick={() => goTo(activeStep + 1)} disabled={activeStep === STEPS.length - 1} style={{ flex: 1, padding: "12px 16px", borderRadius: 8, border: `1px solid ${activeStep === STEPS.length - 1 ? "rgba(255,255,255,0.1)" : step.color}`, background: activeStep === STEPS.length - 1 ? "transparent" : `${step.color}22`, color: activeStep === STEPS.length - 1 ? "#334455" : step.color, cursor: activeStep === STEPS.length - 1 ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 600, fontFamily: "Space Grotesk, sans-serif" }}>
              Étape suivante →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
