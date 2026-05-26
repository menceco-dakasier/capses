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

type StepId = "savoir" | "notions" | "cours" | "mecanismes" | "erreurs" | "quiz" | "sujets" | "methode" | "memo" | "ressources";

interface Step { id: StepId; num: number; label: string; icon: string; color: string; }

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

const QUIZ = [
  { q: "Quelle est la définition du chômage selon le BIT ?", opts: ["Toute personne sans emploi inscrite à France Travail", "Toute personne sans emploi, disponible dans les 2 semaines et ayant effectué une démarche active de recherche dans le mois précédent", "Toute personne travaillant moins de 35h par semaine", "Toute personne ayant perdu son emploi suite à un licenciement économique"], correct: 1, fb: "Le BIT (Bureau International du Travail) définit le chômeur par trois critères cumulatifs : sans emploi la semaine de référence, disponible dans les 2 semaines, et ayant effectué au moins une démarche active de recherche dans le mois précédent. Cette définition est utilisée par l'INSEE (enquête Emploi) et permet des comparaisons internationales." },
  { q: "Quelle différence entre le halo du chômage et le sous-emploi ?", opts: ["Ce sont deux termes synonymes pour désigner les chômeurs non indemnisés", "Le sous-emploi concerne des personnes ayant un emploi mais souhaitant travailler davantage ; le halo regroupe des personnes sans emploi ne rentrant pas dans la définition BIT", "Le halo concerne les jeunes, le sous-emploi les seniors", "Le sous-emploi ne concerne que les fonctionnaires"], correct: 1, fb: "Le sous-emploi concerne des personnes qui ONT un emploi mais souhaitent travailler davantage (temps partiel subi). Le halo du chômage regroupe des personnes SANS emploi qui ne rentrent pas dans la définition BIT car elles ne sont pas disponibles immédiatement ou n'ont pas effectué de démarche active récente (~1,8 million en France, 2024)." },
  { q: "Le salaire d'efficience (Shapiro & Stiglitz, 1984) désigne :", opts: ["Le salaire minimum légal fixé par l'État", "Un salaire supérieur au salaire d'équilibre versé par les employeurs pour motiver leurs salariés et éviter l'aléa moral", "Le salaire moyen dans un secteur donné", "La part variable du salaire liée à la productivité individuelle"], correct: 1, fb: "Le modèle du salaire d'efficience explique qu'en présence d'asymétrie d'information (aléa moral : l'employeur ne peut pas observer l'effort du salarié), les employeurs ont intérêt à payer un salaire supérieur au salaire d'équilibre. Ce salaire supérieur rend le licenciement plus coûteux pour le salarié, l'incitant à fournir l'effort requis. L'agrégation de ces comportements crée du chômage structurel d'équilibre." },
  { q: "Card & Krueger (1994) ont observé au New Jersey qu'une hausse du salaire minimum de 19 % dans les fast-foods avait :", opts: ["Fortement réduit l'emploi dans le secteur", "N'avait eu aucun impact significatif sur l'emploi", "Fortement augmenté l'emploi", "Entraîné la fermeture de nombreux restaurants"], correct: 1, fb: "C'est l'une des expériences naturelles les plus célèbres en économie du travail. Card & Krueger ont comparé les restaurants fast-food du New Jersey (où le SMIC avait augmenté) et ceux de Pennsylvanie voisine (inchangé). Résultat : aucun impact négatif sur l'emploi. Cela suggère que le marché du travail n'est pas parfaitement concurrentiel et que les employeurs peuvent avoir un pouvoir de marché (monopsone). Card a reçu le Nobel en 2021." },
  { q: "Dans la flexisécurité danoise, qu'est-ce que le 'triangle d'or' ?", opts: ["Trois syndicats qui négocient le salaire minimum", "La combinaison : marché flexible + protection sociale généreuse + politiques actives d'emploi", "Une zone géographique où le chômage est nul", "Le nom des trois plus grandes entreprises danoises"], correct: 1, fb: "Le modèle danois repose sur trois piliers complémentaires : (1) une grande flexibilité du marché du travail (licenciement facile) ; (2) une générosité des allocations chômage (jusqu'à 90 % du salaire) ; (3) des politiques actives d'emploi avec obligation de formation et de recherche active. Ce triangle est coûteux (>4 % du PIB) mais produit un taux d'emploi autour de 75 %." },
  { q: "Un chômage conjoncturel appelle en priorité :", opts: ["Des politiques de formation professionnelle", "Des politiques de flexibilisation du marché du travail", "Des politiques macroéconomiques de soutien de la demande globale (budgétaires et/ou monétaires)", "Une réduction du SMIC pour stimuler l'emploi"], correct: 2, fb: "Le diagnostic importe : le chômage conjoncturel est lié à une insuffisance de la demande effective (Keynes). Le remède est donc macroéconomique : relance budgétaire (dépenses publiques, baisse d'impôts) et/ou monétaire (baisse des taux d'intérêt). En revanche, le chômage structurel appelle des réponses microéconomiques : formation, flexibilisation, réduction du coût du travail." },
  { q: "Lequel de ces dispositifs relève de la flexibilité quantitative interne ?", opts: ["Le recours à l'intérim", "L'annualisation du temps de travail", "Les licenciements économiques", "L'externalisation vers des sous-traitants"], correct: 1, fb: "La flexibilité quantitative interne joue sur le volume d'heures de travail SANS modifier les effectifs : annualisation, heures supplémentaires, chômage partiel. À l'inverse, la flexibilité quantitative externe fait varier les effectifs (CDD, intérim, licenciements). L'externalisation relève de la flexibilité organisationnelle." },
  { q: "Les politiques de formation profitent-elles toujours aux personnes qui en ont le plus besoin ?", opts: ["Oui, elles ciblent prioritairement les chômeurs non diplômés", "Non, les principaux bénéficiaires sont souvent les salariés déjà en emploi et diplômés", "Oui, le CPF est exclusivement réservé aux chômeurs", "Non, les formations ne peuvent être suivies qu'en entreprise"], correct: 1, fb: "C'est un paradoxe bien documenté : les politiques de formation continue profitent davantage aux personnes déjà en emploi et déjà diplômées, qui ont plus facilement accès à l'information sur les dispositifs (effet Matthieu). Les chômeurs non diplômés — ceux qui en auraient le plus besoin — y accèdent plus difficilement. Cela questionne l'efficacité des politiques de formation sur le chômage structurel des moins qualifiés." },
  { q: "En 2025, combien environ de salariés du secteur privé sont payés au SMIC ?", opts: ["Moins de 5 %", "Environ 17 %", "Environ 35 %", "Plus de 50 %"], correct: 1, fb: "En 2023, environ 17,3 % des salariés du secteur privé (soit ~3,1 millions de personnes) touchaient le SMIC. Ce chiffre a significativement augmenté lors des fortes revalorisations de 2021-2023 liées à l'inflation. Le SMIC brut horaire s'établit à 11,88 € en 2025, soit 1 802 € mensuel brut." },
  { q: "La Législation Protectrice de l'Emploi (LPE) a des effets :", opts: ["Toujours négatifs sur le chômage", "Toujours positifs sur le chômage", "Ambigus : rigidités qui alimentent le chômage structurel mais obstacle à la dépréciation du capital humain", "Sans effet démontré sur le chômage"], correct: 2, fb: "Les effets de la LPE sur le chômage structurel sont ambigus. Elle peut freiner la destruction créatrice et décourager les embauches (négatif). Mais elle incite aussi à l'investissement en formation et maintient la productivité (positif). Le cas britannique (Marinescu, 2009) montre même qu'une LPE accrue a réduit le chômage d'équilibre via la formation." },
];

// ─── Composants réutilisables ─────────────────────────────────────────────────
function DefBox({ label, children, color = "teal" }: { label: string; children: React.ReactNode; color?: "teal" | "amber" | "purple" | "coral" | "blue" | "green" }) {
  const p = { teal: { bg: "#0a2a22", border: "#0F6E56", lbl: "#5DCAA5" }, amber: { bg: "#2a1d09", border: "#EF9F27", lbl: "#EF9F27" }, purple: { bg: "#1a1940", border: "#AFA9EC", lbl: "#AFA9EC" }, coral: { bg: "#2a1209", border: "#F0997B", lbl: "#F0997B" }, blue: { bg: "#091e2a", border: "#7EB8FF", lbl: "#7EB8FF" }, green: { bg: "#0d2209", border: "#97C459", lbl: "#97C459" } }[color];
  return <div style={{ background: p.bg, border: `1px solid ${p.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: "1rem" }}><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: p.lbl, marginBottom: 6, textTransform: "uppercase" as const, fontFamily: "Space Grotesk, sans-serif" }}>{label}</div><div style={{ fontSize: 14, color: "#d0cfc8", lineHeight: 1.7, fontFamily: "Space Grotesk, sans-serif" }}>{children}</div></div>;
}

function STitle({ children, color = "#7EB8FF" }: { children: React.ReactNode; color?: string }) {
  return <div style={{ fontSize: 14, fontWeight: 700, color, borderLeft: `3px solid ${color}`, paddingLeft: 10, margin: "1.5rem 0 0.75rem", fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{children}</div>;
}

function StatGrid({ stats }: { stats: { num: string; label: string; color: string }[] }) {
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: "1rem" }}>{stats.map((s, i) => <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px 10px", textAlign: "center" as const }}><div style={{ fontSize: 20, fontWeight: 700, color: s.color, lineHeight: 1, marginBottom: 6, fontFamily: "Syne, sans-serif" }}>{s.num}</div><div style={{ fontSize: 11, color: "#8a8880", lineHeight: 1.4, fontFamily: "Space Grotesk, sans-serif" }}>{s.label}</div></div>)}</div>;
}

function CardGrid({ cards }: { cards: { badge: string; title: string; text: string; badgeColor: string }[] }) {
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: "1rem" }}>{cards.map((c, i) => <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 14 }}><div style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", padding: "2px 8px", borderRadius: 20, background: `${c.badgeColor}22`, color: c.badgeColor, border: `1px solid ${c.badgeColor}44`, marginBottom: 8, fontFamily: "Space Grotesk, sans-serif" }}>{c.badge}</div><div style={{ fontSize: 13, fontWeight: 600, color: "#e8e6df", marginBottom: 4, fontFamily: "Space Grotesk, sans-serif" }}>{c.title}</div><div style={{ fontSize: 12, color: "#8a8880", lineHeight: 1.5, fontFamily: "Space Grotesk, sans-serif" }}>{c.text}</div></div>)}</div>;
}

function NoteBox({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warn" | "actu" | "success" }) {
  const s = { info: { bg: "#1a1940", border: "#AFA9EC", color: "#AFA9EC" }, warn: { bg: "#2a1209", border: "#F0997B", color: "#F0997B" }, actu: { bg: "#2a1d09", border: "#EF9F27", color: "#EF9F27" }, success: { bg: "#0a2a22", border: "#5DCAA5", color: "#5DCAA5" } }[type];
  return <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: s.color, marginBottom: "1rem", lineHeight: 1.6, fontFamily: "Space Grotesk, sans-serif" }}>{children}</div>;
}

function Accordion({ items }: { items: { title: string; content: React.ReactNode; dotColor: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return <div style={{ marginBottom: "1rem" }}>{items.map((item, i) => <div key={i} style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, marginBottom: 8, overflow: "hidden" }}><button onClick={() => setOpen(open === i ? null : i)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 14px", background: open === i ? "rgba(255,255,255,0.06)" : "transparent", border: "none", color: "#e8e6df", fontSize: 13, fontWeight: 600, cursor: "pointer", textAlign: "left" as const, fontFamily: "Space Grotesk, sans-serif" }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: item.dotColor, flexShrink: 0, display: "inline-block" }} />{item.title}<span style={{ marginLeft: "auto", color: "#5a5955", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span></button>{open === i && <div style={{ padding: "4px 14px 14px", fontSize: 13, color: "#8a8880", lineHeight: 1.7, fontFamily: "Space Grotesk, sans-serif" }}>{item.content}</div>}</div>)}</div>;
}

function VSBox({ left, right, leftTitle, rightTitle, leftColor, rightColor }: { left: string[]; right: string[]; leftTitle: string; rightTitle: string; leftColor: string; rightColor: string }) {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: "1rem" }}>
    <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${leftColor}44`, borderRadius: 10, padding: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: leftColor, fontFamily: "Space Grotesk, sans-serif", marginBottom: 10 }}>{leftTitle}</div>
      {left.map((item, i) => <div key={i} style={{ fontSize: 12, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: 6, paddingBottom: 6, borderBottom: i < left.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", lineHeight: 1.5 }}>→ {item}</div>)}
    </div>
    <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${rightColor}44`, borderRadius: 10, padding: 14 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: rightColor, fontFamily: "Space Grotesk, sans-serif", marginBottom: 10 }}>{rightTitle}</div>
      {right.map((item, i) => <div key={i} style={{ fontSize: 12, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: 6, paddingBottom: 6, borderBottom: i < right.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", lineHeight: 1.5 }}>→ {item}</div>)}
    </div>
  </div>;
}

function MecaBox({ steps, color = "#7EB8FF" }: { steps: { label: string; text: string }[]; color?: string }) {
  return <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "1.2rem", marginBottom: "1rem" }}>
    {steps.map((s, i) => <div key={i} style={{ display: "flex", gap: 12, marginBottom: i < steps.length - 1 ? 10 : 0 }}>
      <div style={{ width: 24, height: 24, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12, color: "#0d1b2a", flexShrink: 0 }}>{i + 1}</div>
      <div><div style={{ fontSize: 13, fontWeight: 600, color: "#e8e6df", fontFamily: "Space Grotesk, sans-serif", marginBottom: 2 }}>{s.label}</div><div style={{ fontSize: 12, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.5 }}>{s.text}</div></div>
    </div>)}
  </div>;
}

// ─── Contenu des étapes ───────────────────────────────────────────────────────

function StepSavoir() {
  return <div>
    <div style={{ fontSize: 14, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: "1rem" }}>Ce que le jury attend sur ce chapitre au baccalauréat.</div>

    <STitle>Points clés du programme</STitle>
    <CardGrid cards={[
      { badge: "Objectif 1", title: "Mesurer le chômage", text: "Définition BIT (3 critères). Taux de chômage vs taux d'emploi. Halo du chômage, sous-emploi. Limites des indicateurs.", badgeColor: "#D4A017" },
      { badge: "Objectif 2", title: "Causes du chômage", text: "Chômage structurel : frictions, salaire d'efficience (Shapiro-Stiglitz), asymétries d'info. Chômage conjoncturel : demande effective (Keynes), loi d'Okun.", badgeColor: "#7EB8FF" },
      { badge: "Objectif 3", title: "Rôle des institutions", text: "SMIC : lecture néoclassique vs keynésienne (Card & Krueger). LPE : effets ambigus. Flexisécurité danoise (triangle d'or).", badgeColor: "#5DCAA5" },
      { badge: "Objectif 4", title: "Politiques de l'emploi", text: "Politiques macroéconomiques (demande). Allègement coût du travail. Flexibilisation. Politiques de formation (CPF, apprentissage, limites).", badgeColor: "#AFA9EC" },
    ]} />

    <STitle>Auteurs & notions à citer impérativement</STitle>
    <div style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.3)", borderRadius: 10, padding: "14px 16px", marginBottom: "1rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        {["Keynes (1936) — demande effective & chômage involontaire", "Shapiro & Stiglitz (1984) — salaire d'efficience", "Akerlof (1982) — don contre don", "Card & Krueger (1994) — salaire minimum & monopsone", "Stigler (1962) — chômage frictionnel", "North (1991) — institutions du marché du travail", "Cahuc & Zylberberg — rigidités & chômage structurel", "Okun — relation chômage/croissance"].map((item, i) => <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "#d0cfc8" }}><span style={{ color: "#D4A017", flexShrink: 0 }}>→</span>{item}</div>)}
      </div>
    </div>

    <STitle>Données chiffrées indispensables</STitle>
    <StatGrid stats={[
      { num: "7,9 %", label: "Taux de chômage BIT — France T4 2025 (INSEE)", color: "#F0997B" },
      { num: "18,8 %", label: "Chômage des jeunes 15-24 ans — France 2024", color: "#EF9F27" },
      { num: "5,9 %", label: "Moyenne UE 2024 — France au-dessus", color: "#7EB8FF" },
    ]} />
    <StatGrid stats={[
      { num: "11,88 €", label: "SMIC brut horaire 2025", color: "#5DCAA5" },
      { num: "17,3 %", label: "Part des salariés privés au SMIC (2023 ≈ 3,1 M)", color: "#D4A017" },
      { num: "1,8 M", label: "Personnes dans le halo du chômage (2024)", color: "#AFA9EC" },
    ]} />

    <NoteBox type="actu">
      🔴 <strong>Actualité 2025 :</strong> Le taux de chômage remonte depuis son point bas de 7,1 % en 2022, atteignant 7,9 % fin 2025. La réforme de l'apprentissage (2018) avait conduit à un record de 980 000 contrats en 2022, mais les aides réduites en 2024 entraînent une baisse de 11 % des entrées. Le débat coût/bénéfice est vif.
    </NoteBox>
  </div>;
}

function StepNotions() {
  return <div>
    <STitle>Mesure du chômage</STitle>
    <DefBox label="Chômeur au sens du BIT" color="blue">
      Trois critères <strong style={{ color: "#7EB8FF" }}>cumulatifs</strong> :<br />
      1. <strong style={{ color: "#7EB8FF" }}>Sans emploi</strong> la semaine de référence<br />
      2. <strong style={{ color: "#7EB8FF" }}>Disponible</strong> pour travailler dans les 2 semaines<br />
      3. En <strong style={{ color: "#7EB8FF" }}>recherche active</strong> d'emploi dans le mois précédent<br /><br />
      ≠ Demandeur d'emploi catégorie A (France Travail) : définition administrative, toujours plus élevée (~3,3 M vs ~2,3 M).
    </DefBox>
    <DefBox label="Taux de chômage vs Taux d'emploi" color="teal">
      <strong style={{ color: "#5DCAA5" }}>Taux de chômage</strong> = chômeurs BIT / population active × 100<br />
      <strong style={{ color: "#5DCAA5" }}>Taux d'emploi</strong> = actifs occupés / population 15-64 ans × 100<br /><br />
      Le taux d'emploi est souvent préféré car il mesure positivement l'insertion sur le marché du travail. France 2024 : taux d'emploi 68,9 %.
    </DefBox>
    <DefBox label="Halo du chômage & Sous-emploi" color="purple">
      <strong style={{ color: "#AFA9EC" }}>Halo du chômage :</strong> personnes sans emploi souhaitant travailler mais non comptabilisées comme chômeurs BIT (non disponibles immédiatement ou sans démarche active). ~1,8 million en 2024.<br /><br />
      <strong style={{ color: "#AFA9EC" }}>Sous-emploi :</strong> actifs occupés à temps partiel <strong style={{ color: "#AFA9EC" }}>subi</strong> souhaitant travailler davantage. 6 % de l'emploi total. Fortement féminisé : 29,3 % des femmes vs 8,4 % des hommes.
    </DefBox>

    <STitle>Causes du chômage</STitle>
    <DefBox label="Chômage structurel" color="amber">
      Chômage résultant d'une <strong style={{ color: "#EF9F27" }}>inadaptation durable entre l'offre et la demande de travail</strong>, indépendamment de la conjoncture. Regroupe le chômage frictionnel (délais de recherche), d'inadéquation (skill mismatch) et classique (salaires au-dessus de l'équilibre).
    </DefBox>
    <DefBox label="Chômage conjoncturel" color="coral">
      Chômage lié au <strong style={{ color: "#F0997B" }}>ralentissement de l'activité économique</strong> et à l'insuffisance de la demande globale (Keynes). Cyclique et réversible — il se résorbe lors de la reprise. <strong style={{ color: "#F0997B" }}>Loi d'Okun :</strong> relation négative entre croissance et chômage.
    </DefBox>
    <DefBox label="Salaire d'efficience (Shapiro & Stiglitz, 1984)" color="blue">
      Pour pallier l'<strong style={{ color: "#7EB8FF" }}>aléa moral</strong> (le salarié peut « tirer au flanc » sans être détecté), les employeurs versent un salaire <strong style={{ color: "#7EB8FF" }}>supérieur au salaire d'équilibre</strong>. Ce salaire rend le licenciement plus coûteux pour le salarié → il travaille mieux. Mais l'agrégation de ces comportements crée du <strong style={{ color: "#7EB8FF" }}>chômage structurel d'équilibre</strong>.
    </DefBox>

    <STitle>Institutions & politiques</STitle>
    <DefBox label="SMIC — Salaire Minimum Interprofessionnel de Croissance" color="green">
      11,88 €/heure brut en 2025 (1 802 € mensuel). Touche 17,3 % des salariés privés (3,1 M).<br /><br />
      <strong style={{ color: "#97C459" }}>Lecture néoclassique :</strong> si SMIC &gt; salaire d'équilibre → chômage structurel (surtout peu qualifiés).<br />
      <strong style={{ color: "#97C459" }}>Lecture keynésienne :</strong> soutient la demande globale + en situation de monopsone, peut augmenter emploi ET salaires (Card & Krueger, 1994).
    </DefBox>
    <DefBox label="Flexisécurité (modèle danois)" color="teal">
      <strong style={{ color: "#5DCAA5" }}>Triangle d'or :</strong> flexibilité forte du marché du travail + sécurité forte (allocations jusqu'à 90 % du salaire) + politiques actives d'emploi obligatoires. Coût : &gt;4 % du PIB. Résultat : taux d'emploi ~75 %. Difficilement transposable sans culture du compromis social.
    </DefBox>
  </div>;
}

function StepCours() {
  return <div>
    <STitle>1. Mesurer le chômage : au-delà du taux officiel</STitle>
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "1.2rem", marginBottom: "1rem" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", textTransform: "uppercase" as const, marginBottom: 12, textAlign: "center" as const }}>Population totale France (~68 M)</div>
      {[
        { row: ["Population en âge de travailler (15-64 ans)", "Population inactive"], colors: ["#7EB8FF", "#8a8880"] },
        { row: ["Population active occupée", "Chômeurs BIT (3 critères)"], colors: ["#5DCAA5", "#EF9F27"] },
        { row: ["Taux d'emploi = actifs occupés / pop. 15-64 ans × 100", "Taux de chômage = chômeurs / pop. active × 100"], colors: ["#5DCAA5", "#F0997B"] },
      ].map((rowData, i) => <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 }}>
        {rowData.row.map((cell, j) => <div key={j} style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${rowData.colors[j]}44`, borderRadius: 8, padding: "8px 10px", fontSize: 12, fontWeight: 600, color: rowData.colors[j], textAlign: "center" as const, fontFamily: "Space Grotesk, sans-serif" }}>{cell}</div>)}
      </div>)}
    </div>
    <NoteBox type="warn">⚠️ <strong>Piège classique :</strong> Le chiffre France Travail (~3,3 M) est toujours plus élevé que le chiffre BIT (~2,3 M). Le halo du chômage (~1,8 M) et le sous-emploi (~6 % de l'emploi) élargissent encore la réalité du « mal-emploi ».</NoteBox>

    <STitle>2. Les causes du chômage structurel</STitle>
    <Accordion items={[
      { title: "Frictions et problèmes d'appariement (Stigler, 1962)", dotColor: "#EF9F27", content: <div>Même sur un marché « parfait », il faut du temps pour trouver l'emploi adapté. <strong style={{ color: "#e8e6df" }}>3 types de frictions :</strong><br /><br />• <strong style={{ color: "#e8e6df" }}>Temporelles :</strong> délais de recherche (chômage frictionnel)<br />• <strong style={{ color: "#e8e6df" }}>Spatiales :</strong> taux de chômage de 4 % à Paris à +20 % en outre-mer (faible mobilité géographique)<br />• <strong style={{ color: "#e8e6df" }}>Qualitatives :</strong> skill mismatch — 300 000 emplois non pourvus dans le numérique malgré un chômage élevé des peu qualifiés</div> },
      { title: "Salaire d'efficience et aléa moral (Shapiro & Stiglitz, 1984)", dotColor: "#AFA9EC", content: <MecaBox color="#AFA9EC" steps={[{ label: "Aléa moral", text: "Une fois embauché, le salarié peut réduire son effort sans être facilement détecté (info asymétrique post-contractuelle)" }, { label: "Réponse des employeurs", text: "Ils versent un salaire d'efficience > salaire d'équilibre pour rendre le licenciement très coûteux pour le salarié" }, { label: "Don contre don (Akerlof, 1982)", text: "Le salaire supérieur est aussi une reconnaissance symbolique qui incite le salarié à l'effort en retour" }, { label: "Chômage structurel", text: "L'agrégation de ces comportements fixe les salaires au-dessus de l'équilibre → excès d'offre de travail → chômage durable" }]} /> },
    ]} />

    <STitle>3. Le chômage conjoncturel (Keynes, 1936)</STitle>
    <DefBox label="Demande effective insuffisante" color="coral">
      Keynes : le chômage n'est pas volontaire mais résulte d'une <strong style={{ color: "#F0997B" }}>insuffisance de la demande globale</strong>. Contre Say (« l'offre crée sa propre demande »), il soutient que les anticipations pessimistes peuvent bloquer l'économie à un équilibre de sous-emploi.
    </DefBox>
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "1.2rem", marginBottom: "1rem" }}>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" as const, marginBottom: 8 }}>
        {["Baisse C + I", "↓ Demande globale", "↓ Production", "↓ Emploi"].map((item, i) => <div key={i} style={{ flex: 1, minWidth: 80, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(240,153,123,0.3)", borderRadius: 8, padding: "6px 10px", fontSize: 11, fontWeight: 600, color: "#F0997B", textAlign: "center" as const, fontFamily: "Space Grotesk, sans-serif" }}>{item}</div>)}
      </div>
      <div style={{ background: "#993C1D", color: "#fff", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, textAlign: "center" as const, fontFamily: "Space Grotesk, sans-serif" }}>↑ Chômage conjoncturel</div>
    </div>
    <NoteBox type="actu">📊 <strong>Loi d'Okun :</strong> relation négative entre croissance et chômage. Lors de la récession 2009 (-3 % de PIB), le taux de chômage a bondi de 7 % à 9 % en France en un an. En 2020 (Covid), le chômage partiel (66 Md€) a amorti le choc : le taux de chômage a moins augmenté qu'attendu.</NoteBox>
  </div>;
}

function StepMecanismes() {
  return <div>
    <STitle>Mécanisme 1 — SMIC : lecture néoclassique vs keynésienne</STitle>
    <VSBox
      leftTitle="🔴 Lecture néoclassique : le SMIC crée du chômage"
      rightTitle="🟢 Lecture keynésienne : le SMIC soutient l'emploi"
      leftColor="#F0997B"
      rightColor="#5DCAA5"
      left={["Si SMIC > salaire d'équilibre : demande ↓, offre ↑ → chômage structurel", "Aggrave le chômage des moins qualifiés (productivité marginale < SMIC)", "Freine l'accès au premier emploi des jeunes (Cahuc & Zylberberg, 2008)", "Renchérit les prix → baisse de demande → moins d'emplois"]}
      right={["Soutient la demande globale (les smicards ont une forte propension à consommer)", "En situation de monopsone, un SMIC élevé peut augmenter emploi ET salaires", "Card & Krueger (1994) : hausse du salaire minimum au New Jersey → aucun impact négatif", "Réduit les inégalités salariales"]}
    />

    <STitle>Mécanisme 2 — Politiques macroéconomiques de lutte contre le chômage conjoncturel</STitle>
    <CardGrid cards={[
      { badge: "Politique budgétaire", title: "Relance par la demande", text: "Hausse des dépenses publiques + transferts sociaux + baisse de fiscalité → effet multiplicateur → hausse de la demande → hausse de la production → ↑ emploi. Risque : déficit/dette.", badgeColor: "#7EB8FF" },
      { badge: "Politique monétaire (BCE)", title: "Crédit moins cher", text: "Baisse des taux directeurs → crédit moins cher → ↑ investissement + consommation → ↑ emploi. Contrainte : la France ne contrôle plus sa politique monétaire. Risque : inflation.", badgeColor: "#5DCAA5" },
    ]} />
    <NoteBox type="success">✅ <strong>Exemple 2020-2022 :</strong> Face au Covid, la France a déployé le chômage partiel (66 Md€) et le « quoi qu'il en coûte » budgétaire. La BCE a pratiqué des taux négatifs. Résultat : recul du chômage de 9,1 % à 7,1 % entre 2015 et 2022.</NoteBox>

    <STitle>Mécanisme 3 — Allègement du coût du travail</STitle>
    <MecaBox color="#EF9F27" steps={[
      { label: "Baisse des cotisations patronales sur les bas salaires", text: "Ex. : exonérations Fillon, CICE 2013-2018, puis crédit d'impôt permanent" },
      { label: "Baisse du coût du travail pour les travailleurs peu qualifiés", text: "Dont la productivité marginale est proche du SMIC" },
      { label: "Incitation à embaucher ces profils", text: "+ amélioration de la compétitivité-prix des entreprises" },
      { label: "(éventuellement) Baisse du chômage des peu qualifiés", text: "Controversé : risque d'effets d'aubaine et de développement d'emplois précaires" },
    ]} />

    <STitle>Mécanisme 4 — Flexibilité du marché du travail</STitle>
    <div style={{ overflowX: "auto", marginBottom: "1rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "Space Grotesk, sans-serif" }}>
        <thead><tr>{["Type de flexibilité", "Exemples", "Objectif"].map((h, i) => <th key={i} style={{ background: "rgba(255,255,255,0.06)", padding: "9px 12px", textAlign: "left" as const, fontWeight: 600, color: "#8a8880", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{h}</th>)}</tr></thead>
        <tbody>{[
          ["Quantitative externe", "CDD, intérim, ruptures conventionnelles (loi travail 2017)", "Adapter rapidement les effectifs aux variations de la demande"],
          ["Quantitative interne", "Annualisation du temps de travail, chômage partiel, heures sup.", "Ajuster le volume d'heures sans modifier les effectifs"],
          ["Qualitative (fonctionnelle)", "Polyvalence, mobilité interne, formations internes", "Adapter les compétences des salariés aux besoins"],
          ["Salariale", "Part variable du salaire, intéressement, participation", "Ajuster les coûts salariaux à la conjoncture"],
        ].map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} style={{ padding: "9px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)", color: j === 0 ? "#7EB8FF" : "#d0cfc8", fontWeight: j === 0 ? 600 : 400, verticalAlign: "top", lineHeight: 1.5 }}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
    <NoteBox type="warn">⚠️ <strong>Limite :</strong> La flexibilisation peut accroître la précarité et déprimer la demande (revenus instables). Le modèle américain (très flexible) a vu son taux de chômage doubler en 2007-2009.</NoteBox>
  </div>;
}

function StepErreurs() {
  const errors = [
    { wrong: "« Chômeur BIT = inscrit à France Travail »", right: "Un chômeur BIT peut ne pas être inscrit à France Travail (et inversement). Ce sont deux définitions différentes : l'une statistique (enquête Emploi INSEE), l'autre administrative. Le chiffre France Travail est toujours plus élevé.", color: "#7EB8FF" },
    { wrong: "« Le halo du chômage, c'est le chômage partiel »", right: "Le chômage partiel concerne des salariés en emploi dont les heures sont réduites temporairement (sous-emploi). Le halo regroupe des personnes SANS emploi qui ne remplissent pas les 3 critères BIT.", color: "#EF9F27" },
    { wrong: "« Le salaire d'efficience, c'est le salaire minimum »", right: "Le salaire d'efficience (Shapiro & Stiglitz) est versé VOLONTAIREMENT par les employeurs au-dessus de l'équilibre pour motiver les salariés. Le SMIC est une contrainte légale fixée par l'État.", color: "#AFA9EC" },
    { wrong: "« Le chômage structurel, c'est le chômage pendant une crise »", right: "Non, c'est l'inverse : le chômage structurel est indépendant de la conjoncture (il persiste même en période de croissance). Le chômage conjoncturel est lui lié aux crises et cycles économiques.", color: "#F0997B" },
    { wrong: "« La flexisécurité danoise = flexibilité sans protection »", right: "La flexisécurité combine les deux : grande flexibilité du marché du travail ET protection sociale très généreuse (90 % du salaire) + politiques actives obligatoires. C'est le triangle d'or.", color: "#97C459" },
    { wrong: "« Card & Krueger prouvent que le SMIC ne crée jamais de chômage »", right: "Leur étude montre qu'une hausse du SMIC au New Jersey n'a pas réduit l'emploi dans les fast-foods — dans un contexte de monopsone. Ce résultat ne vaut pas pour tous les marchés ni tous les niveaux de SMIC.", color: "#5DCAA5" },
  ];
  return <div>
    <div style={{ fontSize: 14, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: "1.5rem" }}>Les confusions les plus fréquentes relevées dans les copies de bac.</div>
    {errors.map((e, i) => <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px 16px", marginBottom: "0.75rem" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 8 }}><span style={{ fontSize: 16, flexShrink: 0 }}>✗</span><div style={{ fontSize: 13, color: "#F0997B", fontFamily: "Space Grotesk, sans-serif", fontStyle: "italic" }}>{e.wrong}</div></div>
      <div style={{ display: "flex", gap: 10 }}><span style={{ fontSize: 16, flexShrink: 0, color: e.color }}>✓</span><div style={{ fontSize: 13, color: "#d0cfc8", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.6 }}>{e.right}</div></div>
    </div>)}
  </div>;
}

function StepQuiz() {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [chosen, setChosen] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  function answer(idx: number) { if (answered) return; setAnswered(true); setChosen(idx); if (idx === QUIZ[qi].correct) setScore(s => s + 1); }
  function next() { if (qi + 1 >= QUIZ.length) setDone(true); else { setQi(q => q + 1); setAnswered(false); setChosen(null); } }
  function reset() { setQi(0); setScore(0); setAnswered(false); setChosen(null); setDone(false); }

  if (done) {
    const pct = Math.round((score / QUIZ.length) * 100);
    const col = pct >= 75 ? "#97C459" : pct >= 50 ? "#EF9F27" : "#F0997B";
    return <div style={{ textAlign: "center" as const, padding: "3rem 1rem" }}>
      <div style={{ fontSize: 56, fontWeight: 700, color: col, fontFamily: "Syne, sans-serif", marginBottom: 12 }}>{score}/{QUIZ.length}</div>
      <div style={{ fontSize: 15, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: "2rem" }}>{pct >= 75 ? "🎉 Excellent ! Tu maîtrises bien le chômage." : pct >= 50 ? "👍 Bon début — revois les mécanismes du salaire d'efficience." : "📚 Reprends les étapes Cours et Mécanismes."}</div>
      <button onClick={reset} style={{ background: "#D4A017", color: "#0d1b2a", border: "none", borderRadius: 8, padding: "10px 24px", fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Recommencer</button>
    </div>;
  }

  const q = QUIZ[qi];
  return <div>
    <div style={{ fontSize: 12, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", marginBottom: 12 }}>Question {qi + 1} sur {QUIZ.length} · Score : {score}/{qi}</div>
    <div style={{ fontSize: 15, fontWeight: 600, color: "#e8e6df", fontFamily: "Space Grotesk, sans-serif", marginBottom: 16, lineHeight: 1.5 }}>{q.q}</div>
    <div style={{ display: "grid", gap: 8, marginBottom: "1rem" }}>
      {q.opts.map((opt, i) => {
        let bg = "rgba(255,255,255,0.04)", border = "rgba(255,255,255,0.08)", color = "#d0cfc8";
        if (answered) { if (i === q.correct) { bg = "rgba(151,196,89,0.15)"; border = "#97C459"; color = "#97C459"; } else if (i === chosen) { bg = "rgba(240,153,123,0.15)"; border = "#F0997B"; color = "#F0997B"; } }
        return <button key={i} onClick={() => answer(i)} disabled={answered} style={{ textAlign: "left" as const, padding: "12px 14px", border: `1px solid ${border}`, borderRadius: 8, background: bg, color, fontFamily: "Space Grotesk, sans-serif", fontSize: 13, cursor: answered ? "default" : "pointer" }}>{opt}</button>;
      })}
    </div>
    {answered && <div style={{ background: "#2a1d09", border: "1px solid #EF9F27", borderRadius: 8, padding: "12px 14px", fontSize: 13, color: "#EF9F27", lineHeight: 1.7, fontFamily: "Space Grotesk, sans-serif", marginBottom: "1rem" }}>{q.fb}</div>}
    {answered && <div style={{ textAlign: "right" as const }}><button onClick={next} style={{ background: "#D4A017", color: "#0d1b2a", border: "none", borderRadius: 8, padding: "9px 20px", fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{qi === QUIZ.length - 1 ? "Voir mon résultat" : "Question suivante →"}</button></div>}
  </div>;
}

function StepSujets() {
  const sujets = [
    { type: "Dissertation", title: "Dans quelle mesure les politiques de l'emploi permettent-elles de lutter contre le chômage ?", hint: "Thèse : efficacité des politiques macroéconomiques (Keynes) et microéconomiques (formation, flexibilité). Antithèse : limites (effets d'aubaine, effets pervers, dette). Synthèse : dépend du diagnostic structurel/conjoncturel.", color: "#7EB8FF" },
    { type: "Dissertation", title: "Le SMIC est-il un frein à l'emploi ?", hint: "Thèse néoclassique : SMIC > équilibre → chômage peu qualifiés (Cahuc). Antithèse keynésienne : soutien demande, monopsone, Card & Krueger. Synthèse : effets ambigus selon contexte et niveau.", color: "#5DCAA5" },
    { type: "EC3", title: "À l'aide du dossier, vous montrerez que le chômage résulte de causes multiples nécessitant des politiques différenciées.", hint: "Axe 1 : causes structurelles (frictions, salaire efficience, institutions). Axe 2 : causes conjoncturelles (Keynes, Okun). Politiques adaptées au diagnostic.", color: "#EF9F27" },
    { type: "EC3", title: "Vous analyserez les avantages et limites du modèle de flexisécurité comme réponse au chômage.", hint: "Triangle d'or danois : flexibilité + sécurité + activation. Avantages : taux d'emploi élevé. Limites : coût, culture sociale, transposabilité en France.", color: "#AFA9EC" },
    { type: "EC2 — Mobilisation", title: "Expliquez comment l'asymétrie d'information peut générer du chômage structurel.", hint: "Définir aléa moral + sélection adverse. Mécanisme salaire d'efficience (Shapiro & Stiglitz). Don contre don (Akerlof). 6-8 lignes.", color: "#97C459" },
    { type: "EC2 — Mobilisation", title: "Distinguez chômage structurel et chômage conjoncturel et précisez les politiques adaptées à chacun.", hint: "Définitions claires. Structurel → politiques microéconomiques (formation, flexibilité, coût du travail). Conjoncturel → politiques macroéconomiques (relance budgétaire/monétaire).", color: "#F0997B" },
  ];
  return <div>
    <div style={{ fontSize: 14, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: "1.5rem" }}>Sujets tombés ou très probables d'après l'analyse du programme et des annales.</div>
    {sujets.map((s, i) => <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}44`, borderLeft: `3px solid ${s.color}`, borderRadius: 10, padding: "14px 16px", marginBottom: "0.75rem" }}>
      <div style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: s.color, marginBottom: 6, fontFamily: "Space Grotesk, sans-serif", textTransform: "uppercase" as const }}>{s.type}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#e8e6df", fontFamily: "Space Grotesk, sans-serif", marginBottom: 8, lineHeight: 1.4 }}>{s.title}</div>
      <div style={{ fontSize: 12, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.5 }}>💡 {s.hint}</div>
    </div>)}
  </div>;
}

function StepMethode() {
  return <div>
    <STitle>Méthode EC2 — Mobilisation des connaissances</STitle>
    <NoteBox>💡 L'exercice EC2 mobilisation demande d'expliquer un mécanisme en 6–8 lignes, sans document. Définition → mécanisme → exemple chiffré → nuance.</NoteBox>
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#D4A017", fontFamily: "Space Grotesk, sans-serif", marginBottom: 10 }}>Sujet-type : « Expliquez comment le salaire d'efficience génère du chômage »</div>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "16px", fontFamily: "Space Grotesk, sans-serif" }}>
        {[
          { step: "① Définir le concept", color: "#7EB8FF", text: "Le salaire d'efficience, théorisé par Shapiro et Stiglitz (1984), désigne un salaire supérieur au salaire d'équilibre concurrentiel, versé volontairement par les employeurs. Il vise à résoudre un problème d'asymétrie d'information : l'employeur ne peut pas observer directement l'effort fourni par son salarié — c'est l'aléa moral." },
          { step: "② Expliquer le mécanisme", color: "#5DCAA5", text: "En versant un salaire élevé, l'employeur rend le licenciement très coûteux pour le salarié. Celui-ci est alors fortement incité à fournir l'effort requis pour conserver son poste. George Akerlof (1982) ajoute une dimension symbolique : un salaire généreux est vécu comme une reconnaissance, suscitant en retour un effort supplémentaire (logique du don contre don)." },
          { step: "③ Expliquer la conséquence macroéconomique", color: "#EF9F27", text: "Lorsque tous les employeurs adoptent ce comportement individuellement rationnel, les salaires sont fixés au-dessus du salaire d'équilibre dans l'ensemble de l'économie. Il en résulte un excès d'offre de travail : plus de personnes souhaitent travailler à ce salaire élevé qu'il n'y a de postes disponibles. Ce chômage est structurel, d'équilibre — il persiste même en l'absence de récession." },
          { step: "④ Nuancer", color: "#AFA9EC", text: "Ce mécanisme suppose une information imparfaite et un marché du travail décentralisé. Dans des contextes où la surveillance est aisée (tâches routinières, télétravail avec outils de contrôle), l'incitation au salaire d'efficience est plus faible. De plus, il coexiste avec d'autres sources de chômage structurel (frictions, inadéquation des qualifications)." },
        ].map((item, i) => <div key={i} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: item.color, letterSpacing: "0.06em", marginBottom: 4 }}>{item.step}</div>
          <div style={{ fontSize: 13, color: "#d0cfc8", lineHeight: 1.7 }}>{item.text}</div>
        </div>)}
      </div>
    </div>

    <STitle>Méthode Dissertation — Plan type</STitle>
    <div style={{ display: "grid", gap: 8 }}>
      {[
        { num: "I", title: "Un marché du travail structurellement déséquilibré", color: "#7EB8FF", sous: ["A. Les frictions et problèmes d'appariement (Stigler)", "B. Les asymétries d'information : salaire d'efficience (Shapiro & Stiglitz)", "C. Le rôle des institutions : SMIC et LPE (Cahuc, North)"] },
        { num: "II", title: "Le chômage conjoncturel : une insuffisance de demande", color: "#F0997B", sous: ["A. La demande effective insuffisante (Keynes, 1936)", "B. La loi d'Okun : chômage et croissance", "C. Les politiques macroéconomiques de soutien de la demande"] },
        { num: "III", title: "Vers des politiques combinées et adaptées au diagnostic", color: "#97C459", sous: ["A. Allègement du coût du travail et flexibilisation (offre)", "B. Politiques de formation : efficacité et limites (effet Matthieu)", "C. Le modèle de flexisécurité : bilan et transposabilité"] },
      ].map((part, i) => <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${part.color}44`, borderRadius: 10, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: part.color, fontFamily: "Space Grotesk, sans-serif", marginBottom: 8 }}>{part.num}. {part.title}</div>
        {part.sous.map((s, j) => <div key={j} style={{ fontSize: 12, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: 4, paddingLeft: 12 }}>{["A", "B", "C"][j]}. {s}</div>)}
      </div>)}
    </div>
  </div>;
}

function StepMemo() {
  return <div style={{ textAlign: "center" as const, padding: "2rem 0" }}>
    <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
    <div style={{ fontSize: 20, fontWeight: 700, color: "#e8e6df", fontFamily: "Syne, sans-serif", marginBottom: 8 }}>Fiche mémo PDF</div>
    <div style={{ fontSize: 14, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", maxWidth: 380, margin: "0 auto 2rem" }}>La synthèse condensée du chapitre en une page A4, à imprimer avant le bac.</div>
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "1.5rem", maxWidth: 400, margin: "0 auto 1.5rem", textAlign: "left" as const }}>
      <div style={{ fontSize: 12, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", marginBottom: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>Contenu de la fiche</div>
      {["Définition BIT + schéma population active", "Halo du chômage et sous-emploi", "Chômage structurel vs conjoncturel", "Mécanisme du salaire d'efficience", "SMIC : deux lectures (néoclassique/keynésien)", "Triangle d'or danois (flexisécurité)", "Données chiffrées 2025 + auteurs clés"].map((item, i) => <div key={i} style={{ display: "flex", gap: 8, fontSize: 13, color: "#d0cfc8", fontFamily: "Space Grotesk, sans-serif", marginBottom: 6 }}><span style={{ color: "#5DCAA5" }}>✓</span>{item}</div>)}
    </div>
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 28px", display: "inline-block", color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", fontSize: 14 }}>📥 Fiche mémo PDF — bientôt disponible</div>
  </div>;
}

function StepRessources() {
  return <div>
    <div style={{ fontSize: 14, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", marginBottom: "1.5rem" }}>Ressources complémentaires pour approfondir et mémoriser le chapitre.</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
      {[
        { icon: "🎬", label: "Cours vidéo", desc: "La vidéo de révision sur le chômage sera disponible prochainement.", color: "#7EB8FF" },
        { icon: "🗺️", label: "Carte mentale", desc: "Visualise toutes les connexions entre les notions du chapitre.", color: "#D4A017" },
        { icon: "📊", label: "Infographie", desc: "Le triangle d'or danois et le mécanisme du salaire d'efficience en schémas.", color: "#5DCAA5" },
        { icon: "📝", label: "Synthèse NotebookLM", desc: "La synthèse magistrale générée par IA à partir du cours complet.", color: "#AFA9EC" },
      ].map((r, i) => <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${r.color}33`, borderRadius: 12, padding: "1.25rem", textAlign: "center" as const, opacity: 0.6 }}>
        <div style={{ fontSize: 32, marginBottom: 10 }}>{r.icon}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: r.color, fontFamily: "Space Grotesk, sans-serif", marginBottom: 6 }}>{r.label}</div>
        <div style={{ fontSize: 12, color: "#8a8880", fontFamily: "Space Grotesk, sans-serif", lineHeight: 1.5, marginBottom: 10 }}>{r.desc}</div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" as const, background: "rgba(255,255,255,0.04)", borderRadius: 6, padding: "3px 10px", display: "inline-block" }}>Bientôt disponible</div>
      </div>)}
    </div>
  </div>;
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

// ─── PAGE PRINCIPALE ──────────────────────────────────────────────────────────
export default function ChomageePage() {
  const [active, setActive] = useState<StepId>("savoir");
  const isMobile = useIsMobile();
  const currentStep = STEPS.find(s => s.id === active)!;

  return <div style={{ minHeight: "100vh", background: "#0d1b2a" }}>
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
      <span style={{ fontSize: 13, color: "#d0cfc8", fontFamily: "Space Grotesk, sans-serif" }}>Chômage</span>
      <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#D4A017", animation: "pulse 2s infinite" }} />
        <span style={{ fontSize: 11, color: "#D4A017", fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}>{STEPS.findIndex(s => s.id === active) + 1}/{STEPS.length}</span>
      </div>
    </nav>

    {/* HEADER */}
    <div style={{ background: "linear-gradient(135deg, #0a2236 0%, #0d1b2a 60%, #1a0a0a 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "2rem 1.5rem 1.5rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle, rgba(240,153,123,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", padding: "3px 10px", borderRadius: 20, background: "rgba(240,153,123,0.15)", color: "#F0997B", border: "1px solid rgba(240,153,123,0.3)", marginBottom: 10, fontFamily: "Space Grotesk, sans-serif", textTransform: "uppercase" as const }}>Économie · Terminale SES</div>
        <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, fontFamily: "Syne, sans-serif", color: "#f0ece0", margin: 0, lineHeight: 1.2, marginBottom: 8 }}>
          Comment lutter contre le chômage ?
        </h1>
        <div style={{ fontSize: 13, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif" }}>Programme Éduscol 2020 · 10 étapes de révision · Actualisé 2025</div>
      </div>
    </div>

    {/* MOBILE TABS */}
    <div className="hide-sb" style={{ display: "flex", overflowX: "auto", gap: 6, padding: "0.75rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
      {STEPS.map(s => <button key={s.id} onClick={() => setActive(s.id)} style={{ flexShrink: 0, padding: "6px 12px", borderRadius: 8, border: `1px solid ${active === s.id ? s.color : "rgba(255,255,255,0.08)"}`, background: active === s.id ? `${s.color}22` : "transparent", color: active === s.id ? s.color : "#5a5955", fontSize: 12, fontWeight: active === s.id ? 700 : 400, cursor: "pointer", fontFamily: "Space Grotesk, sans-serif", whiteSpace: "nowrap" as const }}>{s.icon} {s.label}</button>)}
    </div>

    {/* LAYOUT */}
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "240px 1fr", minHeight: "calc(100vh - 200px)" }}>

      {/* SIDEBAR */}
      <aside style={{ display: isMobile ? "none" : "block", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "1.5rem 1rem", position: "sticky", top: 56, height: "calc(100vh - 56px)", overflowY: "auto" }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", textTransform: "uppercase" as const, marginBottom: 12 }}>Étapes du chapitre</div>
        {STEPS.map(s => {
          const isActive = active === s.id;
          const done = STEPS.findIndex(x => x.id === s.id) < STEPS.findIndex(x => x.id === active);
          return <button key={s.id} onClick={() => setActive(s.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 8, border: `1px solid ${isActive ? s.color + "44" : "transparent"}`, background: isActive ? `${s.color}15` : "transparent", color: isActive ? s.color : done ? "#5DCAA5" : "#5a5955", fontSize: 13, fontWeight: isActive ? 700 : 400, cursor: "pointer", textAlign: "left" as const, fontFamily: "Space Grotesk, sans-serif", marginBottom: 2, transition: "all 0.15s" }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: isActive ? s.color : done ? "rgba(93,202,165,0.2)" : "rgba(255,255,255,0.05)", border: `1px solid ${isActive ? s.color : done ? "#5DCAA5" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: isActive ? "#0d1b2a" : done ? "#5DCAA5" : "#5a5955", flexShrink: 0 }}>{done && !isActive ? "✓" : s.num}</div>
            <span style={{ lineHeight: 1.3 }}>{s.label}</span>
          </button>;
        })}
        <div style={{ marginTop: "1.5rem", padding: "0 4px" }}>
          <div style={{ fontSize: 11, color: "#5a5955", fontFamily: "Space Grotesk, sans-serif", marginBottom: 6 }}>Progression</div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg, #5DCAA5, #D4A017)", borderRadius: 2, width: `${((STEPS.findIndex(s => s.id === active) + 1) / STEPS.length) * 100}%`, transition: "width 0.4s ease" }} />
          </div>
        </div>
      </aside>

      {/* CONTENU */}
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
          {STEPS.findIndex(s => s.id === active) > 0
            ? <button onClick={() => { const idx = STEPS.findIndex(s => s.id === active); setActive(STEPS[idx - 1].id); window.scrollTo(0, 0); }} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "9px 18px", color: "#d0cfc8", fontFamily: "Space Grotesk, sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>← Étape précédente</button>
            : <div />}
          {STEPS.findIndex(s => s.id === active) < STEPS.length - 1 &&
            <button onClick={() => { const idx = STEPS.findIndex(s => s.id === active); setActive(STEPS[idx + 1].id); window.scrollTo(0, 0); }} style={{ background: currentStep.color, border: "none", borderRadius: 8, padding: "9px 18px", color: "#0d1b2a", fontFamily: "Space Grotesk, sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Étape suivante →</button>}
        </div>
      </main>
    </div>
  </div>;
}
