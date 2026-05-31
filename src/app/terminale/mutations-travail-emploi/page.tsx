"use client";
import React, { useState, useEffect } from "react";

// ─── Hook responsive ───────────────────────────────────────────────
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

// ─── Composants internes ───────────────────────────────────────────

function DefBox({
  label,
  children,
  color = "blue",
}: {
  label: string;
  children: React.ReactNode;
  color?: "blue" | "teal" | "amber" | "purple" | "coral" | "green";
}) {
  const palettes = {
    blue:   { bg: "#EFF6FF", border: "#BFDBFE", label: "#1D4ED8", text: "#1E3A8A" },
    teal:   { bg: "#F0FDF9", border: "#99F6E4", label: "#0D9488", text: "#134E4A" },
    amber:  { bg: "#FFFBEB", border: "#FCD34D", label: "#D97706", text: "#78350F" },
    purple: { bg: "#F5F3FF", border: "#C4B5FD", label: "#7C3AED", text: "#3B1F8C" },
    coral:  { bg: "#FFF1EE", border: "#FDBA9B", label: "#E05A3A", text: "#7C1D06" },
    green:  { bg: "#F0FDF4", border: "#86EFAC", label: "#16A34A", text: "#14532D" },
  };
  const p = palettes[color];
  return (
    <div style={{
      background: p.bg, border: `1px solid ${p.border}`, borderRadius: 12,
      padding: "14px 18px", marginBottom: 14,
    }}>
      <div style={{
        fontSize: 10, fontFamily: "Syne, sans-serif", fontWeight: 800,
        letterSpacing: "0.12em", color: p.label, textTransform: "uppercase", marginBottom: 6,
      }}>{label}</div>
      <div style={{ fontSize: 14, color: "#1a1a18", lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}

function STitle({
  children, color = "#D4A017",
}: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{
      fontSize: 15, fontFamily: "Syne, sans-serif", fontWeight: 700,
      color, borderLeft: `3px solid ${color}`, paddingLeft: 12,
      margin: "22px 0 12px", lineHeight: 1.4,
    }}>{children}</div>
  );
}

function StatGrid({ stats }: {
  stats: { num: string; label: string; color: string }[];
}) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16,
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          background: "#0d1b2a", border: "1px solid #1e3a5a",
          borderRadius: 12, padding: "16px 12px", textAlign: "center",
        }}>
          <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "Syne, sans-serif", color: s.color, lineHeight: 1, marginBottom: 6 }}>{s.num}</div>
          <div style={{ fontSize: 11, color: "#8ba4c0", lineHeight: 1.45, fontFamily: "Space Grotesk, sans-serif" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function CardGrid({ cards }: {
  cards: { badge: string; badgeColor: string; title: string; text: string }[];
}) {
  const palette: Record<string, { bg: string; border: string; text: string }> = {
    blue:   { bg: "#0d2a4a", border: "#1D4ED8", text: "#7EB8FF" },
    teal:   { bg: "#0a2a22", border: "#0D9488", text: "#5DCAA5" },
    amber:  { bg: "#2a1a04", border: "#D97706", text: "#EF9F27" },
    purple: { bg: "#1a1430", border: "#7C3AED", text: "#AFA9EC" },
    coral:  { bg: "#2a0f08", border: "#E05A3A", text: "#F0997B" },
    green:  { bg: "#0a1f0e", border: "#16A34A", text: "#97C459" },
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginBottom: 16 }}>
      {cards.map((c, i) => {
        const p = palette[c.badgeColor] ?? palette.blue;
        return (
          <div key={i} style={{ background: "#0d2a3a", border: "1px solid #1e3a5a", borderRadius: 12, padding: 16 }}>
            <span style={{
              fontSize: 10, fontFamily: "Syne, sans-serif", fontWeight: 800,
              letterSpacing: "0.1em", padding: "2px 9px", borderRadius: 20,
              display: "inline-block", marginBottom: 8,
              background: p.bg, color: p.text, border: `1px solid ${p.border}`,
            }}>{c.badge}</span>
            <div style={{ fontSize: 13, fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#e8f0f8", marginBottom: 4 }}>{c.title}</div>
            <div style={{ fontSize: 12, color: "#8ba4c0", lineHeight: 1.55, fontFamily: "Space Grotesk, sans-serif" }}>{c.text}</div>
          </div>
        );
      })}
    </div>
  );
}

function NoteBox({
  type = "info", children,
}: { type?: "info" | "warn" | "actu" | "success"; children: React.ReactNode }) {
  const cfg = {
    info:    { bg: "#0a1f3a", border: "#1D4ED8", icon: "💡", color: "#7EB8FF" },
    warn:    { bg: "#2a1a04", border: "#D97706", icon: "⚠️", color: "#EF9F27" },
    actu:    { bg: "#0a2a22", border: "#0D9488", icon: "📊", color: "#5DCAA5" },
    success: { bg: "#0a1f0e", border: "#16A34A", icon: "✅", color: "#97C459" },
  };
  const c = cfg[type];
  return (
    <div style={{
      background: c.bg, border: `1px solid ${c.border}`, borderRadius: 10,
      padding: "12px 16px", marginBottom: 14, display: "flex", gap: 12,
    }}>
      <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{c.icon}</span>
      <div style={{ fontSize: 13, color: c.color, lineHeight: 1.65, fontFamily: "Space Grotesk, sans-serif" }}>{children}</div>
    </div>
  );
}

function MecaBox({ steps }: { steps: { title: string; content: React.ReactNode }[] }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {steps.map((s, i) => (
        <div key={i} style={{
          display: "flex", gap: 14, marginBottom: 12,
          background: "#0d2a3a", border: "1px solid #1e3a5a", borderRadius: 12, padding: 16,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", background: "#D4A017",
            color: "#0d1b2a", fontWeight: 800, fontSize: 13, fontFamily: "Syne, sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>{i + 1}</div>
          <div>
            <div style={{ fontSize: 13, fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#e8f0f8", marginBottom: 4 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#8ba4c0", lineHeight: 1.65, fontFamily: "Space Grotesk, sans-serif" }}>{s.content}</div>
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
        <div key={i} style={{
          border: "1px solid #1e3a5a", borderRadius: 10, marginBottom: 8, overflow: "hidden",
        }}>
          <div
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              display: "flex", alignItems: "center", gap: 10, padding: "12px 16px",
              cursor: "pointer", background: open === i ? "#0d2a3a" : "#0d1b2a",
              fontFamily: "Syne, sans-serif", fontSize: 13, fontWeight: 700, color: "#e8f0f8",
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
            {item.title}
            <span style={{
              marginLeft: "auto", color: "#4a6a8a", fontSize: 11,
              transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s",
            }}>▼</span>
          </div>
          {open === i && (
            <div style={{
              padding: "4px 16px 16px 40px", fontSize: 13, color: "#8ba4c0",
              lineHeight: 1.7, fontFamily: "Space Grotesk, sans-serif", background: "#0a1624",
            }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Composant Quiz ────────────────────────────────────────────────
const quizQuestions = [
  {
    q: "Quelle est la différence fondamentale entre 'travail' et 'emploi' ?",
    opts: [
      "L'emploi désigne toute activité humaine ; le travail est rémunéré",
      "Le travail est toute production de biens ou services, rémunérée ou non ; l'emploi confère un statut juridique et des droits",
      "Le travail est déclaré à l'État ; l'emploi peut être informel",
      "Il n'y a pas de différence, les deux termes sont synonymes",
    ],
    ans: 1,
    exp: "Le travail désigne toute activité de production (y compris domestique, bénévole, clandestine), rémunérée ou non, sans conférer nécessairement de statut. L'emploi, lui, est une activité professionnelle qui confère un statut juridique, des droits (retraite, chômage, congés) et des obligations. Un parent au foyer travaille mais n'est pas en emploi. Cette distinction est fondamentale pour comprendre les mutations actuelles (plateformes, digital labor).",
  },
  {
    q: "Le fordisme se distingue du taylorisme par quel apport essentiel ?",
    opts: [
      "La division verticale du travail entre conception et exécution",
      "L'introduction du travail à la chaîne et de hauts salaires pour permettre la consommation de masse",
      "La suppression du contrôle hiérarchique au profit de l'autocontrôle",
      "L'organisation du travail en flux tendus et en méthode kanban",
    ],
    ans: 1,
    exp: "Taylor (1911) invente l'OST (division horizontale et verticale). Ford y ajoute la chaîne de montage mécanisée (1913) et le principe du 'compromis fordiste' théorisé par Boyer (1981) : des salaires élevés (5 $ par jour) permettent aux ouvriers d'accéder à la consommation de masse, créant ainsi les débouchés nécessaires à la production en série. C'est ce bouclage macro-économique qui distingue le fordisme.",
  },
  {
    q: "Qu'est-ce que le 'halo du chômage' selon l'INSEE ?",
    opts: [
      "Les chômeurs qui ne s'inscrivent pas à France Travail",
      "Les actifs en sous-emploi involontaire (temps partiel contraint)",
      "Les inactifs proches du marché du travail : souhaitent travailler mais ne remplissent pas tous les critères BIT",
      "Les chômeurs de longue durée (plus d'un an sans emploi)",
    ],
    ans: 2,
    exp: "Le halo du chômage désigne des personnes qui ne sont pas comptées comme chômeurs au sens du BIT (car elles ne remplissent pas simultanément les 3 critères : sans emploi, disponible sous 15 jours, en recherche active) mais qui restent proches du marché du travail. En 2024, environ 1,9 million de personnes appartiennent à ce halo. Additionné au chômage BIT (7,3 %), on obtient une vision élargie de la contrainte sur le marché du travail (~14 %).",
  },
  {
    q: "Selon R. Castel (1995), qu'est-ce que la 'propriété sociale' ?",
    opts: [
      "La possession de logements sociaux par les classes populaires",
      "L'ensemble des droits sociaux attachés à la condition salariale (retraite, chômage, santé)",
      "La propriété collective des moyens de production dans les coopératives",
      "Les transferts sociaux versés aux personnes sans emploi",
    ],
    ans: 1,
    exp: "Dans 'Les Métamorphoses de la question sociale' (1995), Castel montre que le salariat a construit une forme nouvelle de sécurité : la 'propriété sociale'. Contrairement à la propriété privée qui protège par la possession de biens, la propriété sociale protège via les droits attachés au statut d'employé (retraite, assurance chômage, mutuelle, congés payés). La montée des FPE (CDD, temps partiel) érode cette propriété sociale pour les travailleurs précaires.",
  },
  {
    q: "Qu'est-ce que l'ubérisation du travail selon S. Abdelnour ?",
    opts: [
      "La numérisation complète des processus de production dans les entreprises industrielles",
      "La sous-traitance du travail via des plateformes numériques qui requalifient les salariés en indépendants, transférant le risque économique sur les travailleurs",
      "L'automatisation des tâches routinières par les algorithmes d'intelligence artificielle",
      "La possibilité pour les salariés de télétravailler depuis n'importe quel lieu",
    ],
    ans: 1,
    exp: "L'ubérisation (Abdelnour, 2017) désigne la généralisation du modèle de plateforme : des travailleurs juridiquement indépendants (auto-entrepreneurs) réalisent des prestations via une application numérique. La plateforme échappe ainsi aux obligations de l'employeur (SMIC, congés payés, cotisations sociales) tout en exerçant un contrôle réel sur les conditions de travail. Ce modèle alimente la dualisation du marché du travail et contribue à la fragmentation de la société salariale.",
  },
  {
    q: "Selon Autor & Dorn (2016), quels emplois sont les plus menacés par l'automatisation numérique ?",
    opts: [
      "Les emplois non qualifiés dans les services à la personne (aides-soignants, gardes d'enfants)",
      "Les emplois très qualifiés nécessitant créativité et raisonnement complexe",
      "Les emplois intermédiaires routiniers dont les tâches sont codifiables (comptable, agent de banque, opérateur)",
      "Les emplois manuels de logistique et de manutention",
    ],
    ans: 2,
    exp: "La polarisation des emplois (Autor & Dorn) désigne le fait que l'automatisation touche surtout les emplois intermédiaires et routiniers (comptabilité, banque, assurance, administration) car leurs tâches sont codifiables et reproductibles par des algorithmes. À moyen terme, cela crée une bipolarisation : d'un côté les emplois très qualifiés qui résistent, de l'autre les emplois manuels de services peu automatisables. Les emplois intermédiaires disparaissent, créant des inégalités salariales croissantes.",
  },
  {
    q: "Qu'est-ce que l'intégration 'disqualifiante' selon S. Paugam (2000) ?",
    opts: [
      "Satisfaction dans le travail mais instabilité de l'emploi (ex : CDD dans une mission qui plaît)",
      "Emploi stable mais travail peu satisfaisant, aliénant et peu reconnu",
      "Ni satisfaction dans le travail, ni stabilité de l'emploi : zone de vulnérabilité maximale",
      "Emploi qualifié avec forte reconnaissance sociale mais conditions difficiles",
    ],
    ans: 2,
    exp: "Paugam (2000) distingue trois formes d'intégration précaire. L'intégration disqualifiante (insatisfaction + instabilité) est la plus grave : elle correspond à la 'zone de vulnérabilité maximale' où ni le travail ni l'emploi ne jouent leur rôle intégrateur. Elle entraîne un risque élevé de désaffiliation sociale. À distinguer de l'intégration incertaine (emploi instable mais travail satisfaisant) et de l'intégration laborieuse (emploi stable mais travail insatisfaisant).",
  },
  {
    q: "Qu'est-ce que le 'digital labor' selon A. Casilli (2019) ?",
    opts: [
      "Le travail des développeurs et ingénieurs qui programment les intelligences artificielles",
      "Le travail invisible et précaire (annotation, modération, reconnaissance d'images) qui alimente l'IA sans être reconnu comme tel",
      "Le télétravail dans les secteurs de la tech et du numérique",
      "Le travail des influenceurs et créateurs de contenu sur les réseaux sociaux",
    ],
    ans: 1,
    exp: "Dans 'En attendant les robots' (2019), Casilli montre que la production de l'IA repose sur un immense travail humain invisible : reconnaître des images pour entraîner des algorithmes, modérer des contenus, annoter des données. Ces 'travailleurs du clic' (250 000 en France en 2019) sont souvent peu rémunérés, sans statut clair, et contredisent le mythe d'une IA qui remplacerait tout le travail. Ce phénomène illustre la permanence du travail humain dans la 'révolution numérique'.",
  },
  {
    q: "D. Méda (1995) affirme que la centralité du travail dans nos sociétés est :",
    opts: [
      "Une donnée anthropologique universelle présente dans toutes les sociétés humaines",
      "Une construction historique récente liée à l'industrialisation, et non un invariant anthropologique",
      "Une spécificité française liée à la culture républicaine du mérite par le travail",
      "Un phénomène en expansion mondiale lié à la mondialisation des marchés",
    ],
    ans: 1,
    exp: "Méda rappelle que dans les sociétés antiques ou médiévales, le travail n'occupait pas cette place centrale. C'est l'industrialisation qui a fait du travail la principale source d'identité, de revenu et de socialisation. Cette construction historique questionne l'avenir : si l'emploi perd son pouvoir intégrateur (précarisation, chômage), d'autres formes de participation collective (bénévolat, associations, famille) pourraient être mieux valorisées.",
  },
  {
    q: "Les effets du post-taylorisme sur les conditions de travail sont-ils systématiquement positifs ?",
    opts: [
      "Oui, l'autonomie conférée supprime totalement les contraintes tayloristes",
      "Non, les effets sont ambivalents : l'autonomie formelle s'accompagne d'une intensification réelle et du développement des risques psychosociaux",
      "Oui, mais seulement pour les cadres et les emplois qualifiés",
      "Non, le post-taylorisme dégrade systématiquement les conditions dans tous les secteurs",
    ],
    ans: 1,
    exp: "Les effets du post-taylorisme sont ambivalents (Gollac, 2005 ; Dejours, 1998). L'autonomie formelle (flexibilité, travail par projets) s'accompagne d'une intensification réelle : les salariés deviennent seuls responsables de leurs résultats, la charge mentale augmente, la surveillance par les pairs remplace la hiérarchie directe, les RPS se développent. En 2024, 59 % des salariés déclarent être exposés à des RPS. De plus, le taylorisme persiste dans de nombreux secteurs (logistique, distribution, centres d'appels).",
  },
];

function StepQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const q = quizQuestions[current];

  function handleSelect(i: number) {
    if (answered) return;
    setAnswered(true);
    setSelected(i);
    if (i === q.ans) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 >= quizQuestions.length) {
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

  if (done) {
    const pct = Math.round((score / quizQuestions.length) * 100);
    let emoji = "💪", msg = "Courage ! Relis chaque étape et retiens les auteurs clés.";
    if (pct >= 90) { emoji = "🏆"; msg = "Excellent ! Tu maîtrises parfaitement ce chapitre."; }
    else if (pct >= 70) { emoji = "👍"; msg = "Très bien ! Quelques points à consolider, mais tu as l'essentiel."; }
    else if (pct >= 50) { emoji = "📚"; msg = "Pas mal, mais reprends les étapes Notions et Mécanismes !"; }
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>{emoji}</div>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 800, color: "#D4A017", marginBottom: 8 }}>
          {score} / {quizQuestions.length} — {pct} %
        </div>
        <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 14, color: "#8ba4c0", marginBottom: 28 }}>{msg}</div>
        <button onClick={restart} style={{
          padding: "12px 28px", background: "#D4A017", color: "#0d1b2a",
          border: "none", borderRadius: 10, fontFamily: "Syne, sans-serif",
          fontWeight: 800, fontSize: 14, cursor: "pointer",
        }}>🔄 Recommencer</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16,
      }}>
        <span style={{ fontSize: 12, color: "#4a6a8a", fontFamily: "Space Grotesk, sans-serif" }}>
          Question {current + 1} / {quizQuestions.length}
        </span>
        <span style={{ fontSize: 12, color: "#5DCAA5", fontFamily: "Space Grotesk, sans-serif" }}>
          Score : {score}
        </span>
      </div>
      <div style={{
        fontSize: 15, fontFamily: "Syne, sans-serif", fontWeight: 700,
        color: "#e8f0f8", marginBottom: 16, lineHeight: 1.55,
      }}>{q.q}</div>
      <div style={{ display: "grid", gap: 8, marginBottom: 14 }}>
        {q.opts.map((opt, i) => {
          let bg = "#0d2a3a", border = "#1e3a5a", color = "#c8d8e8";
          if (answered) {
            if (i === q.ans) { bg = "#0a2a16"; border = "#16A34A"; color = "#97C459"; }
            else if (i === selected && i !== q.ans) { bg = "#2a0f0a"; border = "#E05A3A"; color = "#F0997B"; }
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} disabled={answered} style={{
              textAlign: "left", padding: "12px 16px", border: `1.5px solid ${border}`,
              borderRadius: 10, background: bg, fontFamily: "Space Grotesk, sans-serif",
              fontSize: 13, color, cursor: answered ? "default" : "pointer",
              transition: "all 0.15s", lineHeight: 1.5,
            }}>{opt}</button>
          );
        })}
      </div>
      {answered && (
        <div style={{
          background: "#0a1624", border: "1px solid #1e3a5a", borderRadius: 10,
          padding: "12px 16px", fontSize: 13, color: "#8ba4c0",
          lineHeight: 1.65, marginBottom: 14, fontFamily: "Space Grotesk, sans-serif",
        }}>
          {selected === q.ans ? "✅ " : "❌ "}{q.exp}
        </div>
      )}
      {answered && (
        <div style={{ textAlign: "right" }}>
          <button onClick={handleNext} style={{
            padding: "10px 22px", background: "#D4A017", color: "#0d1b2a",
            border: "none", borderRadius: 10, fontFamily: "Syne, sans-serif",
            fontWeight: 800, fontSize: 13, cursor: "pointer",
          }}>
            {current + 1 < quizQuestions.length ? "Question suivante →" : "Voir mes résultats"}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Données des étapes ─────────────────────────────────────────────
const steps = [
  { id: "savoir",     label: "À savoir",     icon: "🎯", color: "#D4A017" },
  { id: "notions",    label: "Notions",       icon: "📐", color: "#7EB8FF" },
  { id: "cours",      label: "Le cours",      icon: "⚡", color: "#5DCAA5" },
  { id: "mecanismes", label: "Mécanismes",    icon: "⚙️", color: "#AFA9EC" },
  { id: "erreurs",    label: "Erreurs",       icon: "⚠️", color: "#F0997B" },
  { id: "quiz",       label: "Quiz",          icon: "🧠", color: "#97C459" },
  { id: "sujets",     label: "Sujets bac",    icon: "📋", color: "#D4A017" },
  { id: "methode",    label: "Méthode",       icon: "✍️", color: "#7EB8FF" },
  { id: "memo",       label: "Fiche mémo",    icon: "📄", color: "#5DCAA5" },
  { id: "ressources", label: "Ressources",    icon: "🎬", color: "#7EB8FF" },
];

// ─── Contenus des étapes ────────────────────────────────────────────
function StepSavoir() {
  return (
    <div>
      <NoteBox type="actu">
        <strong>Données clés 2024-2025 :</strong> Taux de chômage BIT France T4 2025 : 7,9 % (↑ vs 7,3 % fin 2024). Chômage des 15-24 ans : 21,5 % (T4 2025). Part du temps partiel subi : 40 % du temps partiel total. 87 % des embauches en CDD (hors intérim). Télétravail au moins mensuel : 22 % des salariés du privé (INSEE/DARES, S1 2024). Travailleurs des plateformes : +12 % entre 2022 et 2024.
      </NoteBox>
      <StatGrid stats={[
        { num: "87 %", label: "des nouvelles embauches en CDD (hors intérim, 2024)", color: "#F0997B" },
        { num: "7,9 %", label: "taux de chômage BIT au T4 2025 (INSEE)", color: "#7EB8FF" },
        { num: "22 %", label: "des salariés du privé en télétravail (S1 2024)", color: "#5DCAA5" },
      ]} />
      <CardGrid cards={[
        { badge: "OBJECTIF 1", badgeColor: "blue", title: "Distinguer travail et emploi", text: "Différencier les notions : travail (toute production), emploi (statut + droits), chômage BIT, halo, sous-emploi, FPE." },
        { badge: "OBJECTIF 2", badgeColor: "teal", title: "Mutations de l'organisation", text: "OST/fordisme → post-taylorisme → néo-taylorisme digital. Analyser les effets sur les conditions de travail (RPS, intensification)." },
        { badge: "OBJECTIF 3", badgeColor: "amber", title: "Numérique et emploi", text: "Ubérisation, polarisation des emplois, télétravail hybride, digital labor (Casilli). Effets sur la précarisation." },
        { badge: "OBJECTIF 4", badgeColor: "purple", title: "Intégration sociale par le travail", text: "Travail comme vecteur d'intégration (Durkheim, Paugam, Castel). Affaiblissement du pouvoir intégrateur : désaffiliation, disqualification sociale." },
      ]} />
      <STitle color="#D4A017">Auteurs incontournables</STitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
        {[
          { name: "R. Castel", dates: "1933–2013", concept: "Propriété sociale · Désaffiliation", text: "Montre que le salariat a construit une 'propriété sociale' (droits sociaux). La montée des FPE érode cette protection." },
          { name: "S. Paugam", dates: "né 1960", concept: "Salarié de la précarité", text: "Trois formes d'intégration précaire : incertaine, laborieuse, disqualifiante. La précarité fragilise les liens sociaux." },
          { name: "A. Casilli", dates: "né 1972", concept: "Digital labor", text: "L'IA repose sur un travail humain invisible et précaire. 250 000 travailleurs du clic en France (2019)." },
          { name: "D. Méda", dates: "née 1962", concept: "Centralité historique du travail", text: "La centralité du travail est une construction historique, pas un invariant. D'autres formes d'intégration existent." },
        ].map((a, i) => (
          <div key={i} style={{ border: "1px solid #1e3a5a", borderRadius: 12, padding: 16, background: "#0d2a3a" }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 14, color: "#e8f0f8", marginBottom: 2 }}>{a.name}</div>
            <div style={{ fontSize: 11, color: "#4a6a8a", marginBottom: 6, fontFamily: "Space Grotesk, sans-serif" }}>{a.dates}</div>
            <span style={{ fontSize: 10, background: "#0a1f3a", color: "#7EB8FF", border: "1px solid #1D4ED8", padding: "2px 8px", borderRadius: 20, display: "inline-block", marginBottom: 8, fontFamily: "Syne, sans-serif", fontWeight: 700 }}>{a.concept}</span>
            <div style={{ fontSize: 12, color: "#8ba4c0", lineHeight: 1.55, fontFamily: "Space Grotesk, sans-serif" }}>{a.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepNotions() {
  return (
    <div>
      <STitle color="#7EB8FF">Travail, emploi, activité : les distinguer</STitle>
      <DefBox label="Travail" color="blue">
        <strong>Toute activité humaine de production</strong> de biens ou de services, rémunérée ou non, déclarée ou non. Inclut le travail domestique, bénévole, clandestin. Ne confère pas nécessairement de statut juridique ni de droits sociaux.
      </DefBox>
      <DefBox label="Emploi" color="teal">
        Exercice d'une activité professionnelle qui confère un <strong>statut juridique, des droits et des obligations</strong>. Implique une subordination à un employeur (salarié) ou une indépendance formelle (non-salarié). L'emploi est la condition d'accès à la <em>propriété sociale</em> (R. Castel, 1995).
      </DefBox>
      <DefBox label="Population active (BIT)" color="amber">
        Ensemble des personnes <strong>en emploi + chômeurs BIT</strong>. Plus large que l'emploi : désigne toute personne désireuse de participer au marché du travail, qu'elle soit occupée ou non. Taux d'activité des 15-64 ans en France : 73,5 % en 2024 (INSEE).
      </DefBox>
      <DefBox label="Chômage BIT — triple condition" color="coral">
        <strong>Sans emploi</strong> (aucun travail rémunéré durant la semaine de référence) + <strong>disponible sous 15 jours</strong> + <strong>en recherche active</strong> dans le mois. En France : 7,9 % de la population active au T4 2025 (≈ 2,4 millions). Ce taux sous-estime la réalité en excluant le halo et le sous-emploi.
      </DefBox>
      <STitle color="#7EB8FF">Les marges et zones grises de l'emploi</STitle>
      <DefBox label="Halo du chômage (INSEE)" color="teal">
        Personnes inactives au sens du BIT mais <strong>proches du marché du travail</strong> : soit elles recherchent un emploi sans être disponibles immédiatement, soit elles souhaitent travailler sans effectuer de démarche active. En 2024 : ~1,9 million de personnes, soit 4,4 % des 15-64 ans.
      </DefBox>
      <DefBox label="Sous-emploi" color="purple">
        Personnes en emploi à <strong>temps partiel contraint</strong> (souhaitant travailler davantage) ou en chômage partiel. Concerne surtout les employés non qualifiés, les jeunes et les femmes. Indicateur introduit par le BIT (1998) pour mieux rendre compte des effets de la flexibilisation.
      </DefBox>
      <DefBox label="Formes Particulières d'Emploi (FPE)" color="amber">
        CDD, temps partiel, intérim, emplois saisonniers, auto-entrepreneuriat. Représentaient 4,5 % de l'emploi en 1982, contre 12 % aujourd'hui. <strong>87 % des nouvelles embauches</strong> en CDD en 2024. Touchent surtout les jeunes et les femmes, constituant un passage quasi-obligé avant l'accès au CDI.
      </DefBox>
      <NoteBox type="warn">
        <strong>Piège fréquent au bac :</strong> Le CDI reste majoritaire en <em>stock</em> (≈ 75 % des personnes en emploi), mais est de moins en moins la porte d'entrée du marché du travail. L'explosion des FPE est un phénomène de <em>flux</em> (nouvelles embauches), pas de stock.
      </NoteBox>
      <STitle color="#7EB8FF">Qualité de l'emploi : une notion multidimensionnelle</STitle>
      <CardGrid cards={[
        { badge: "CONDITIONS", badgeColor: "blue", title: "Santé & sécurité", text: "Pénibilité, RPS, risques psychosociaux. 59 % des salariés exposés aux RPS en 2024 (BDO/OpinionWay)." },
        { badge: "RÉMUNÉRATION", badgeColor: "amber", title: "Salaire et partage de la VA", text: "Niveau brut, primes, intéressement. La France se situe dans la tranche médiane européenne." },
        { badge: "SÉCURITÉ", badgeColor: "teal", title: "Sécurité économique", text: "Stabilité du contrat, protection chômage, retraite. 45 % des CDI accèdent à la formation vs 31 % des CDD." },
        { badge: "CARRIÈRE", badgeColor: "purple", title: "Formation & évolution", text: "Potentiel d'évolution, accès au CPF. Les FPE pénalisent fortement la formation continue." },
      ]} />
    </div>
  );
}

function StepCours() {
  return (
    <div>
      <STitle color="#5DCAA5">1. L'organisation tayloriste-fordiste</STitle>
      <DefBox label="OST — Taylor (1911)" color="blue">
        Rationalisation de la production reposant sur : (1) la <strong>division horizontale</strong> — parcellisation des tâches, « one best way » ; (2) la <strong>division verticale</strong> — séparation conception/exécution. Ford y ajoute la chaîne de montage et le compromis fordiste (hauts salaires + consommation de masse, Boyer 1981).
      </DefBox>
      <Accordion items={[
        {
          title: "La crise du tayloro-fordisme (années 1970)",
          color: "#F0997B",
          content: <>
            <strong>Crise sociale :</strong> rejet des conditions d'aliénation (absentéisme, grèves, turn-over). Mai 68, « boulot, métro, dodo ».<br /><br />
            <strong>Crise économique :</strong> essoufflement de la consommation standardisée, diversification des marchés.<br /><br />
            <strong>Crise technique :</strong> ralentissement des gains de productivité ; la bureaucratie limite l'innovation.
          </>,
        },
        {
          title: "Le toyotisme et le post-taylorisme",
          color: "#5DCAA5",
          content: <>
            Théorisé par T. Ohno (Toyota) : <strong>lean production</strong> (flux tendus, méthode kanban, zéro stock) + <strong>kaizen</strong> (amélioration continue, équipes responsabilisées).<br /><br />
            Le management participatif valorise l'autonomie (travail par projets, horaires modulables), mais crée une <strong>intensification réelle</strong> : l'autocontrôle remplace la hiérarchie (Gollac, 2005).
          </>,
        },
        {
          title: "Le néo-taylorisme numérique",
          color: "#AFA9EC",
          content: <>
            Le numérique permet de reconstituer un contrôle taylorien sous forme algorithmique. Chez Amazon, la commande vocale dicte l'ordre de saisie des colis (Gaborieau, 2015). Uber monitore en temps réel les trajets, les notes et les connexions.<br /><br />
            <strong>Linhart (1993) :</strong> la logique taylorienne persiste dans les centres d'appels, la restauration rapide, la grande distribution — on assiste davantage à une évolution du <em>discours managérial</em> qu'à une rupture réelle.
          </>,
        },
      ]} />
      <STitle color="#5DCAA5">2. Numérique et transformations du travail</STitle>
      <StatGrid stats={[
        { num: "26 %", label: "des salariés en télétravail au moins occasionnellement en 2023 (vs 9 % en 2019)", color: "#7EB8FF" },
        { num: "22 %", label: "des salariés du privé en télétravail mensuel (S1 2024, INSEE/DARES)", color: "#5DCAA5" },
        { num: "5 %", label: "télétravail intensif (3j+/semaine) en 2023 — contre 18 % au pic Covid 2021", color: "#EF9F27" },
      ]} />
      <DefBox label="Polarisation des emplois (Autor & Dorn, 2016)" color="purple">
        L'automatisation touche surtout les <strong>emplois intermédiaires routiniers</strong> (banque, assurance, administration) — tâches codifiables. Bipolarisation : emplois très qualifiés (résistent) vs emplois manuels de services (peu automatisables mais précaires). Les emplois intermédiaires disparaissent → creusement des inégalités salariales.
      </DefBox>
      <STitle color="#5DCAA5">3. Travail et intégration sociale</STitle>
      <DefBox label="Intégration par le travail (Durkheim, Paugam)" color="teal">
        Dans les sociétés modernes fondées sur la <strong>solidarité organique</strong> (Durkheim, 1893), le travail inscrit l'individu dans des relations d'interdépendance. Selon Paugam (2000), il remplit deux fonctions : <strong>protection</strong> (droits sociaux) et <strong>reconnaissance</strong> (identité, statut).
      </DefBox>
      <NoteBox type="actu">
        <strong>Affaiblissement du pouvoir intégrateur :</strong> Le taux de chômage atteint 7,9 % au T4 2025. Le chômage de longue durée concerne ~580 000 personnes. La montée des FPE fragilise la protection sociale et la socialisation au travail. Un tiers des salariés français est en situation de burn-out (Empreinte Humaine, 2024).
      </NoteBox>
    </div>
  );
}

function StepMecanismes() {
  return (
    <div>
      <STitle color="#AFA9EC">Mécanisme 1 — Du taylorisme au néo-taylorisme numérique</STitle>
      <MecaBox steps={[
        { title: "OST (Taylor, 1911)", content: "Division horizontale (parcellisation) + verticale (séparation conception/exécution). Standardisation, mesure des temps, contrôle des contremaîtres → gains de productivité massifs." },
        { title: "Fordisme + compromis fordiste (Ford/Boyer)", content: "Ajout de la chaîne de montage. Hauts salaires (5 $ day) → accès à la consommation de masse. Régulation macro-économique vertueuse (production + consommation)." },
        { title: "Crise du modèle (années 1970)", content: "Essoufflement de la productivité, diversification des marchés, rejet social (absentéisme, grèves). Fin du régime d'accumulation fordiste." },
        { title: "Post-taylorisme / Toyotisme", content: "Flux tendus (kanban), kaizen (amélioration continue), management participatif, travail par projets. Autonomie formelle mais intensification réelle (Gollac)." },
        { title: "Néo-taylorisme numérique", content: "Algorithmes reconstitutent un contrôle taylorien : commande vocale Amazon, notation Uber, surveillance par les données. Taylorisme digital (Gaborieau, 2015) dans la logistique et les services." },
      ]} />
      <STitle color="#AFA9EC">Mécanisme 2 — Comment la précarisation fragilise l'intégration sociale</STitle>
      <MecaBox steps={[
        { title: "Montée des FPE et du chômage", content: "87 % des embauches en CDD (2024). Chômage : 7,9 % (T4 2025). Les individus alternent emploi précaire, chômage, inactivité (halo)." },
        { title: "Perte de la propriété sociale", content: "La précarité réduit les droits sociaux attachés au statut salarial (retraite, chômage, mutuelle). R. Castel : la 'propriété sociale' s'érode pour les travailleurs précaires." },
        { title: "Affaiblissement des liens sociaux au travail", content: "Collectifs de travail fragmentés, turnover élevé, réduction des liens syndicaux et des solidarités horizontales. L'éclatement des lieux de production (télétravail, plateformes) accentue l'isolement." },
        { title: "Désaffiliation sociale en cascade (Castel)", content: "Revenus intermittents → difficultés de logement et de crédit → isolement → perte d'estime de soi → difficultés à se projeter. Cercle vicieux de la vulnérabilité." },
        { title: "Disqualification sociale (Paugam)", content: "Le regard des institutions et des autres sur les chômeurs et précaires détériore leur identité sociale. Intériorisation d'une image négative. Zone de vulnérabilité maximale = intégration disqualifiante." },
      ]} />
      <NoteBox type="warn">
        <strong>Tableau : Taylorisme / Post-taylorisme / Néo-taylorisme digital</strong><br />
        Organisation : parcellisation → polyvalence → parcellisation algorithmique. Contrôle : hiérarchie stricte → autocontrôle → algorithme + données. Exemple : Ford → Toyota → Amazon. Effets : aliénation → intensification/RPS → précarisation.
      </NoteBox>
    </div>
  );
}

function StepErreurs() {
  const items = [
    {
      wrong: "Le CDI a disparu, aujourd'hui tout le monde est en CDD.",
      right: "Le CDI reste majoritaire en stock (≈ 75 % des emplois), mais les FPE dominent les flux d'embauche (87 %). Il faut distinguer stock et flux.",
    },
    {
      wrong: "Le post-taylorisme a supprimé le taylorisme dans tous les secteurs.",
      right: "Linhart (1993) montre la persistance du taylorisme dans les centres d'appels, la logistique, la restauration rapide. Le numérique crée même un néo-taylorisme digital.",
    },
    {
      wrong: "Le télétravail est accessible à tous les salariés.",
      right: "Un salarié sur deux a un poste incompatible avec le télétravail. Il concerne 75 % des cadres contre seulement 4 % des ouvriers — forte inégalité d'accès (INSEE).",
    },
    {
      wrong: "L'IA va éliminer tout le travail humain.",
      right: "Casilli (2019) montre que l'IA repose sur un énorme travail humain invisible (digital labor). La polarisation crée de nouveaux emplois précaires de services, pas une fin du travail.",
    },
    {
      wrong: "Chômeur BIT = toute personne sans emploi.",
      right: "Un chômeur BIT doit remplir simultanément 3 critères : sans emploi + disponible sous 15 jours + en recherche active. Le halo du chômage désigne ceux qui n'en remplissent qu'un ou deux.",
    },
    {
      wrong: "La centralité du travail est une donnée naturelle et universelle.",
      right: "Méda (1995) montre que c'est une construction historique liée à l'industrialisation. Dans les sociétés pré-industrielles, le travail n'avait pas cette place centrale.",
    },
  ];
  return (
    <div>
      <NoteBox type="warn">Ces erreurs reviennent régulièrement dans les copies. Les corriger permet de gagner des points sur la rigueur conceptuelle.</NoteBox>
      {items.map((item, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <div style={{
            background: "#2a0f0a", border: "1px solid #E05A3A", borderRadius: "10px 10px 0 0",
            padding: "10px 16px", fontSize: 13, color: "#F0997B",
            fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.5,
          }}>❌ {item.wrong}</div>
          <div style={{
            background: "#0a2a16", border: "1px solid #16A34A", borderTop: "none",
            borderRadius: "0 0 10px 10px", padding: "10px 16px", fontSize: 13,
            color: "#97C459", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.5,
          }}>✅ {item.right}</div>
        </div>
      ))}
    </div>
  );
}

function StepSujets() {
  return (
    <div>
      <NoteBox type="actu">
        <strong>Tendances des sujets bac 2024-2026 :</strong> Le chapitre "Mutations du travail" est régulièrement combiné avec le chapitre "Chômage" (EC3 ou dissertation). Les thèmes de l'ubérisation, du télétravail et de l'intégration sociale sont privilégiés depuis 2022.
      </NoteBox>
      <STitle color="#D4A017">Sujets de dissertation probables</STitle>
      {[
        {
          sujet: "Dans quelle mesure les mutations du travail et de l'emploi fragilisent-elles l'intégration sociale ?",
          type: "DISSERTATION",
          plan: "I. Le travail comme vecteur d'intégration sociale (protection + reconnaissance, Paugam, Durkheim) // II. Les mutations fragilisent l'intégration (précarisation, désaffiliation, burn-out) // III. Des formes alternatives d'intégration existent-elles ? (Méda, bénévolat, RSA)",
        },
        {
          sujet: "Le numérique remet-il en cause les formes traditionnelles d'organisation du travail ?",
          type: "DISSERTATION",
          plan: "I. Le numérique prolonge et renouvelle l'organisation tayloriste (néo-taylorisme digital, Gaborieau) // II. Il introduit de nouvelles formes d'autonomie (télétravail, flexibilité) // III. Mais aussi de nouvelles formes de contrôle et de précarisation (ubérisation, digital labor)",
        },
      ].map((s, i) => (
        <div key={i} style={{ border: "1px solid #1e3a5a", borderRadius: 12, padding: 18, marginBottom: 14, background: "#0d2a3a" }}>
          <span style={{ fontSize: 10, background: "#0a1f3a", color: "#D4A017", border: "1px solid #D4A017", padding: "2px 10px", borderRadius: 20, fontFamily: "Syne, sans-serif", fontWeight: 800, display: "inline-block", marginBottom: 10 }}>{s.type}</span>
          <div style={{ fontSize: 14, fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#e8f0f8", marginBottom: 10, lineHeight: 1.5 }}>{s.sujet}</div>
          <div style={{ fontSize: 12, color: "#8ba4c0", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.6 }}><strong style={{ color: "#5DCAA5" }}>Piste de plan :</strong> {s.plan}</div>
        </div>
      ))}
      <STitle color="#D4A017">Sujets EC2 / EC3 probables</STitle>
      {[
        {
          type: "EC2",
          sujet: "À l'aide du document et de vos connaissances, montrez que le développement des formes particulières d'emploi fragilise l'intégration sociale par le travail.",
          conseil: "Mobiliser Castel (propriété sociale), Paugam (intégration précaire), données INSEE sur les FPE.",
        },
        {
          type: "EC3",
          sujet: "Vous montrerez que le numérique transforme les formes d'organisation du travail de manière ambivalente.",
          conseil: "Thèse : néo-taylorisme (Amazon, Gaborieau) + ubérisation. Antithèse : autonomie, télétravail, nouvelles qualifications. Synthèse : polarisation et inégalités.",
        },
      ].map((s, i) => (
        <div key={i} style={{ border: "1px solid #1e3a5a", borderRadius: 12, padding: 18, marginBottom: 14, background: "#0a1624" }}>
          <span style={{ fontSize: 10, background: "#0a2a22", color: "#5DCAA5", border: "1px solid #5DCAA5", padding: "2px 10px", borderRadius: 20, fontFamily: "Syne, sans-serif", fontWeight: 800, display: "inline-block", marginBottom: 10 }}>{s.type}</span>
          <div style={{ fontSize: 14, fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#e8f0f8", marginBottom: 8, lineHeight: 1.5 }}>{s.sujet}</div>
          <div style={{ fontSize: 12, color: "#8ba4c0", fontFamily: "Space Grotesk, sans-serif" }}><strong style={{ color: "#EF9F27" }}>Conseil :</strong> {s.conseil}</div>
        </div>
      ))}
    </div>
  );
}

function StepMethode() {
  return (
    <div>
      <STitle color="#7EB8FF">Méthode EC2 — Réponse à une question de synthèse documentaire</STitle>
      <MecaBox steps={[
        { title: "Lire et annoter le document (3 min)", content: "Identifier la source, la date, les idées principales. Repérer les données chiffrées exploitables. Formuler l'idée directrice du document en une phrase." },
        { title: "Rédiger l'introduction (4-5 lignes)", content: "Contextualiser le sujet, définir les notions clés de la question (ex : FPE, intégration sociale), annoncer votre réponse organisée en 2 parties." },
        { title: "Développer en 2 parties équilibrées", content: "Partie 1 : s'appuyer sur le document + connaissance de cours. Partie 2 : compléter par des connaissances hors document. Chaque argument = idée + exemple/donnée + auteur si possible." },
        { title: "Citer le document correctement", content: "Utiliser les données du document avec la formulation : « Selon le document, … ». Ne pas paraphraser sans apport : montrer que vous interprétez. Intégrer au moins 2 éléments du document." },
        { title: "Conclusion courte (2-3 lignes)", content: "Répondre clairement à la question posée. Nuancer si nécessaire. Pas d'ouverture obligatoire pour l'EC2." },
      ]} />
      <NoteBox type="info">
        <strong>Exemple appliqué :</strong> Sujet : « Montrez que les FPE fragilisent l'intégration sociale. »<br />
        P1 — Le travail comme vecteur d'intégration (Paugam : protection + reconnaissance) // Les FPE réduisent la protection sociale (moins de droits, revenus instables).<br />
        P2 — Les FPE fragmentent la reconnaissance sociale (Castel : propriété sociale érodée) // Données : 87 % des embauches en CDD, temps partiel subi, sous-emploi.
      </NoteBox>
      <STitle color="#7EB8FF">Les auteurs à mobiliser par thème</STitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
        {[
          { theme: "Organisation du travail", auteurs: "Taylor, Ford/Boyer, Friedmann, Linhart, Gollac, Dejours, Gaborieau" },
          { theme: "Numérique & emploi", auteurs: "Casilli (digital labor), Autor & Dorn (polarisation), Abdelnour (ubérisation)" },
          { theme: "Intégration sociale", auteurs: "Durkheim (solidarité organique), Paugam (précarité), Castel (désaffiliation)" },
          { theme: "Critique du travail", auteurs: "Méda (centralité historique), Lazarsfeld/Jahoda/Zeisel (chômage à Marienthal)" },
        ].map((t, i) => (
          <div key={i} style={{ background: "#0d2a3a", border: "1px solid #1e3a5a", borderRadius: 10, padding: 14 }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12, color: "#7EB8FF", marginBottom: 6 }}>{t.theme}</div>
            <div style={{ fontSize: 12, color: "#8ba4c0", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.55 }}>{t.auteurs}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepMemo() {
  const items = [
    { cat: "Notions fondamentales", list: ["Travail vs emploi vs activité", "Chômage BIT (triple critère)", "Halo du chômage, sous-emploi", "FPE (CDD, intérim, temps partiel)", "Qualité de l'emploi (multidimensionnel)"] },
    { cat: "Organisation du travail", list: ["OST / Taylorisme / Fordisme", "Compromis fordiste (Boyer)", "Toyotisme / Lean production / Kaizen", "Post-taylorisme et intensification (Gollac)", "Néo-taylorisme numérique (Gaborieau)"] },
    { cat: "Numérique & emploi", list: ["Polarisation des emplois (Autor & Dorn)", "Digital labor (Casilli, 2019)", "Ubérisation / économie des plateformes", "Télétravail : 22 % des salariés (2024)", "Droit à la déconnexion (loi El Khomri, 2016)"] },
    { cat: "Intégration sociale", list: ["Solidarité organique (Durkheim)", "Propriété sociale (Castel)", "3 formes de précarité (Paugam)", "Désaffiliation sociale (Castel, 2009)", "Disqualification sociale (Paugam, 2009)", "Centralité historique (Méda, 1995)"] },
    { cat: "Données clés 2024-2025", list: ["Chômage BIT : 7,9 % (T4 2025)", "Chômage jeunes 15-24 ans : 21,5 %", "87 % embauches en CDD (2024)", "22 % salariés en télétravail mensuel", "1/3 salariés en burn-out (2024)"] },
  ];
  return (
    <div>
      <NoteBox type="info">
        <strong>Fiche mémo — Mutations du travail et de l'emploi</strong><br />
        Résumé structuré des notions, auteurs et données à maîtriser pour le bac. Cochez chaque item une fois mémorisé.
      </NoteBox>
      {items.map((section, i) => (
        <div key={i} style={{ marginBottom: 14 }}>
          <STitle color="#5DCAA5">{section.cat}</STitle>
          <div style={{ display: "grid", gap: 6 }}>
            {section.list.map((item, j) => (
              <div key={j} style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "#0d2a3a", border: "1px solid #1e3a5a",
                borderRadius: 8, padding: "8px 14px",
              }}>
                <span style={{ width: 16, height: 16, border: "1.5px solid #2e4a6a", borderRadius: 4, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "#c8d8e8", fontFamily: "Space Grotesk, sans-serif" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function StepRessources() {
  const cards = [
    { icon: "🎬", title: "Vidéo — Organisation du travail", label: "YouTube / SES Vidéos", desc: "Synthèse animée taylorisme / post-taylorisme, 12 min" },
    { icon: "🧠", title: "Carte mentale — Intégration sociale", label: "Mindmap CapSES", desc: "Tous les auteurs et notions du chapitre en un coup d'œil" },
    { icon: "📊", title: "Infographie — Mutations de l'emploi", label: "DARES / INSEE", desc: "Évolution des formes d'emploi 1982-2024" },
    { icon: "📰", title: "Article — Ubérisation", label: "Le Monde diplomatique", desc: "Dossier complet sur les plateformes et le droit du travail" },
  ];
  return (
    <div>
      <NoteBox type="info">Ces ressources complémentaires seront disponibles prochainement. Elles enrichiront ta révision avec des supports visuels et audiovisuels.</NoteBox>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {cards.map((c, i) => (
          <div key={i} style={{
            background: "#0d2a3a", border: "1px dashed #2e4a6a", borderRadius: 12,
            padding: 18, opacity: 0.6, textAlign: "center",
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: "#e8f0f8", marginBottom: 4 }}>{c.title}</div>
            <div style={{ fontSize: 11, color: "#5DCAA5", fontFamily: "Space Grotesk, sans-serif", marginBottom: 6 }}>{c.label}</div>
            <div style={{ fontSize: 11, color: "#4a6a8a", fontFamily: "Space Grotesk, sans-serif" }}>{c.desc}</div>
            <div style={{ marginTop: 10, fontSize: 11, color: "#4a6a8a", fontFamily: "Syne, sans-serif", fontWeight: 700 }}>BIENTÔT DISPONIBLE</div>
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
    case "quiz":       return <StepQuiz />;
    case "sujets":     return <StepSujets />;
    case "methode":    return <StepMethode />;
    case "memo":       return <StepMemo />;
    case "ressources": return <StepRessources />;
    default:           return null;
  }
}

// ─── Page principale ────────────────────────────────────────────────
export default function MutationsTravailEmploiPage() {
  const isMobile = useIsMobile();
  const [activeStep, setActiveStep] = useState(0);

  const step = steps[activeStep];
  const stepColor = step.color;

  function goTo(i: number) {
    setActiveStep(i);
    window.scrollTo(0, 0);
  }

  return (
    <div style={{ background: "#0d1b2a", minHeight: "100vh", color: "#e8f0f8" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0d1b2a; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0d1b2a; }
        ::-webkit-scrollbar-thumb { background: #1e3a5a; border-radius: 3px; }
      `}</style>

      {/* ── Navigation ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(13,27,42,0.95)", backdropFilter: "blur(10px)",
        borderBottom: "1px solid #1e3a5a", height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px",
      }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 13, color: "#4a6a8a" }}>
          <a href="/" style={{ color: "#D4A017", fontWeight: 800, textDecoration: "none" }}>CapSES</a>
          <span style={{ margin: "0 6px" }}>›</span>
          <span>Terminale</span>
          <span style={{ margin: "0 6px" }}>›</span>
          <span style={{ color: "#e8f0f8" }}>Mutations du travail</span>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          fontFamily: "Syne, sans-serif", fontSize: 12, color: stepColor,
          background: "#0a1624", border: `1px solid ${stepColor}30`,
          padding: "4px 12px", borderRadius: 20,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%", background: stepColor,
            animation: "pulse 1.5s infinite",
          }} />
          <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>
          {activeStep + 1}/{steps.length}
        </div>
      </nav>

      {/* ── Header ── */}
      <div style={{
        background: "linear-gradient(135deg, #0a1624 0%, #0d2a4a 50%, #1a1430 100%)",
        borderBottom: "1px solid #1e3a5a", padding: isMobile ? "28px 20px 24px" : "36px 40px 32px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <span style={{
            fontSize: 11, fontFamily: "Syne, sans-serif", fontWeight: 800,
            letterSpacing: "0.12em", padding: "3px 12px", borderRadius: 20,
            background: "#0a1f3a", color: "#7EB8FF", border: "1px solid #1D4ED8",
            display: "inline-block", marginBottom: 14,
          }}>ÉCONOMIE · TERMINALE SES</span>
          <h1 style={{
            fontFamily: "Syne, sans-serif", fontSize: isMobile ? 22 : 30,
            fontWeight: 800, color: "#ffffff", marginBottom: 10, lineHeight: 1.25,
          }}>Comment le travail et l'emploi se transforment-ils ?</h1>
          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "#4a6a8a" }}>
            Programme Éduscol 2020 · 10 étapes · Actualisé 2025
          </div>
        </div>
      </div>

      {/* ── Barre d'onglets ── */}
      <div style={{
        borderBottom: "1px solid #1e3a5a", background: "#0a1624",
        overflowX: "auto", whiteSpace: "nowrap",
      }}>
        <div style={{ display: "inline-flex", gap: 6, padding: "10px 16px" }}>
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              style={{
                padding: "7px 14px", borderRadius: 20, border: "none", cursor: "pointer",
                fontFamily: "Syne, sans-serif", fontSize: 12, fontWeight: 700,
                display: "inline-flex", alignItems: "center", gap: 6,
                background: activeStep === i ? s.color : "#0d2a3a",
                color: activeStep === i ? "#0d1b2a" : "#8ba4c0",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
              }}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Layout ── */}
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 16px 40px" : "0 24px 60px",
        display: "flex", gap: 28, alignItems: "flex-start", paddingTop: 24,
      }}>
        {/* Sidebar desktop */}
        {!isMobile && (
          <aside style={{
            width: 220, flexShrink: 0, position: "sticky", top: 72,
            background: "#0a1624", border: "1px solid #1e3a5a", borderRadius: 14,
            padding: "16px 12px", overflow: "hidden",
          }}>
            {steps.map((s, i) => (
              <div
                key={s.id}
                onClick={() => goTo(i)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 10px", borderRadius: 9, cursor: "pointer", marginBottom: 2,
                  background: activeStep === i ? `${s.color}18` : "transparent",
                  border: activeStep === i ? `1px solid ${s.color}40` : "1px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                <div style={{
                  width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: i < activeStep ? "#16A34A" : activeStep === i ? s.color : "#1e3a5a",
                  fontSize: 11, fontWeight: 800, fontFamily: "Syne, sans-serif",
                  color: i < activeStep ? "#0d1b2a" : activeStep === i ? "#0d1b2a" : "#4a6a8a",
                }}>
                  {i < activeStep ? "✓" : i + 1}
                </div>
                <span style={{
                  fontSize: 12, fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: activeStep === i ? 700 : 400,
                  color: activeStep === i ? s.color : "#8ba4c0",
                }}>{s.label}</span>
              </div>
            ))}
            {/* Progress bar */}
            <div style={{ marginTop: 14, padding: "0 4px" }}>
              <div style={{ height: 4, background: "#1e3a5a", borderRadius: 2, overflow: "hidden" }}>
                <div style={{
                  height: "100%", background: stepColor, borderRadius: 2,
                  width: `${((activeStep + 1) / steps.length) * 100}%`,
                  transition: "width 0.3s ease",
                }} />
              </div>
              <div style={{ fontSize: 11, color: "#4a6a8a", marginTop: 6, fontFamily: "Space Grotesk, sans-serif", textAlign: "center" }}>
                {Math.round(((activeStep + 1) / steps.length) * 100)} % complété
              </div>
            </div>
          </aside>
        )}

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* En-tête de section */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: 24 }}>{step.icon}</span>
              <h2 style={{
                fontFamily: "Syne, sans-serif", fontSize: isMobile ? 18 : 22,
                fontWeight: 800, color: stepColor,
              }}>{step.label}</h2>
              <span style={{
                fontSize: 11, fontFamily: "Syne, sans-serif", fontWeight: 800,
                padding: "2px 10px", borderRadius: 20,
                background: `${stepColor}18`, color: stepColor, border: `1px solid ${stepColor}40`,
                marginLeft: "auto",
              }}>{activeStep + 1}/10</span>
            </div>
            <div style={{ height: 2, background: `linear-gradient(to right, ${stepColor}, transparent)`, borderRadius: 1 }} />
          </div>

          {/* Contenu */}
          {renderStep(step.id)}

          {/* Navigation bas */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginTop: 28, paddingTop: 20, borderTop: "1px solid #1e3a5a",
          }}>
            <button
              onClick={() => goTo(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              style={{
                padding: "10px 20px", borderRadius: 10,
                background: activeStep === 0 ? "#0a1624" : "#0d2a3a",
                border: "1px solid #1e3a5a",
                color: activeStep === 0 ? "#2e4a6a" : "#8ba4c0",
                fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13,
                cursor: activeStep === 0 ? "default" : "pointer",
              }}
            >← Étape précédente</button>
            <button
              onClick={() => goTo(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
              style={{
                padding: "10px 20px", borderRadius: 10,
                background: activeStep === steps.length - 1 ? "#0a1624" : stepColor,
                border: "none",
                color: activeStep === steps.length - 1 ? "#2e4a6a" : "#0d1b2a",
                fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 13,
                cursor: activeStep === steps.length - 1 ? "default" : "pointer",
              }}
            >Étape suivante →</button>
          </div>
        </main>
      </div>
    </div>
  );
}
