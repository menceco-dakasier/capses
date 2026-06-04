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

type StepId = "savoir"|"notions"|"cours"|"mecanismes"|"erreurs"|"quiz"|"sujets"|"methode"|"memo"|"ressources";

const STEPS = [
  { id:"savoir"      as StepId, num:1,  label:"À savoir pour le bac",   icon:"🎯", color:"#D4A017" },
  { id:"notions"     as StepId, num:2,  label:"Notions indispensables",  icon:"📐", color:"#7EB8FF" },
  { id:"cours"       as StepId, num:3,  label:"Le cours en 10 min",      icon:"⚡", color:"#5DCAA5" },
  { id:"mecanismes"  as StepId, num:4,  label:"Mécanismes à maîtriser",  icon:"⚙️", color:"#AFA9EC" },
  { id:"erreurs"     as StepId, num:5,  label:"Erreurs fréquentes",      icon:"⚠️", color:"#F0997B" },
  { id:"quiz"        as StepId, num:6,  label:"Quiz",                    icon:"🧠", color:"#97C459" },
  { id:"sujets"      as StepId, num:7,  label:"Sujets probables",        icon:"📋", color:"#D4A017" },
  { id:"methode"     as StepId, num:8,  label:"Méthode appliquée",       icon:"✍️", color:"#7EB8FF" },
  { id:"memo"        as StepId, num:9,  label:"Fiche mémo PDF",          icon:"📄", color:"#5DCAA5" },
  { id:"ressources"  as StepId, num:10, label:"Ressources",              icon:"🎬", color:"#7EB8FF" },
];

// ─── Composants ───────────────────────────────────────────────────────────────

function DefBox({ label, children, color="blue" }: { label:string; children:React.ReactNode; color?:"teal"|"amber"|"purple"|"coral"|"blue"|"green" }) {
  const p = { teal:{bg:"#0a2a22",border:"#0F6E56",lbl:"#5DCAA5"}, amber:{bg:"#2a1d09",border:"#EF9F27",lbl:"#EF9F27"}, purple:{bg:"#1a1940",border:"#AFA9EC",lbl:"#AFA9EC"}, coral:{bg:"#2a1209",border:"#F0997B",lbl:"#F0997B"}, blue:{bg:"#091e2a",border:"#7EB8FF",lbl:"#7EB8FF"}, green:{bg:"#0d2209",border:"#97C459",lbl:"#97C459"} }[color];
  return <div style={{background:p.bg,border:`1px solid ${p.border}`,borderRadius:10,padding:"14px 16px",marginBottom:"1rem"}}><div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",color:p.lbl,marginBottom:6,textTransform:"uppercase" as const,fontFamily:"Space Grotesk, sans-serif"}}>{label}</div><div style={{fontSize:14,color:"#d0cfc8",lineHeight:1.7,fontFamily:"Space Grotesk, sans-serif"}}>{children}</div></div>;
}

function STitle({ children, color="#7EB8FF" }: { children:React.ReactNode; color?:string }) {
  return <div style={{fontSize:14,fontWeight:700,color,borderLeft:`3px solid ${color}`,paddingLeft:10,margin:"1.5rem 0 0.75rem",fontFamily:"Space Grotesk, sans-serif",letterSpacing:"0.04em",textTransform:"uppercase" as const}}>{children}</div>;
}

function StatGrid({ stats }: { stats:{num:string;label:string;color:string}[] }) {
  return <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:"1rem"}}>{stats.map((s,i)=><div key={i} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"14px 10px",textAlign:"center" as const}}><div style={{fontSize:18,fontWeight:700,color:s.color,lineHeight:1,marginBottom:6,fontFamily:"Syne, sans-serif"}}>{s.num}</div><div style={{fontSize:11,color:"#8a8880",lineHeight:1.4,fontFamily:"Space Grotesk, sans-serif"}}>{s.label}</div></div>)}</div>;
}

function CardGrid({ cards }: { cards:{badge:string;title:string;text:string;badgeColor:string}[] }) {
  return <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:10,marginBottom:"1rem"}}>{cards.map((c,i)=><div key={i} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:14}}><div style={{display:"inline-block",fontSize:10,fontWeight:700,letterSpacing:"0.06em",padding:"2px 8px",borderRadius:20,background:`${c.badgeColor}22`,color:c.badgeColor,border:`1px solid ${c.badgeColor}44`,marginBottom:8,fontFamily:"Space Grotesk, sans-serif"}}>{c.badge}</div><div style={{fontSize:13,fontWeight:600,color:"#e8e6df",marginBottom:4,fontFamily:"Space Grotesk, sans-serif"}}>{c.title}</div><div style={{fontSize:12,color:"#8a8880",lineHeight:1.5,fontFamily:"Space Grotesk, sans-serif"}}>{c.text}</div></div>)}</div>;
}

function NoteBox({ children, type="info" }: { children:React.ReactNode; type?:"info"|"warn"|"actu"|"success" }) {
  const s = {info:{bg:"#1a1940",border:"#AFA9EC",color:"#AFA9EC"},warn:{bg:"#2a1209",border:"#F0997B",color:"#F0997B"},actu:{bg:"#2a1d09",border:"#EF9F27",color:"#EF9F27"},success:{bg:"#0a2a22",border:"#5DCAA5",color:"#5DCAA5"}}[type];
  return <div style={{background:s.bg,border:`1px solid ${s.border}`,borderRadius:8,padding:"10px 14px",fontSize:13,color:s.color,marginBottom:"1rem",lineHeight:1.6,fontFamily:"Space Grotesk, sans-serif"}}>{children}</div>;
}

function Accordion({ items }: { items:{title:string;content:React.ReactNode;dotColor:string}[] }) {
  const [open,setOpen] = useState<number|null>(0);
  return <div style={{marginBottom:"1rem"}}>{items.map((item,i)=><div key={i} style={{border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,marginBottom:8,overflow:"hidden"}}><button onClick={()=>setOpen(open===i?null:i)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"12px 14px",background:open===i?"rgba(255,255,255,0.06)":"transparent",border:"none",color:"#e8e6df",fontSize:13,fontWeight:600,cursor:"pointer",textAlign:"left" as const,fontFamily:"Space Grotesk, sans-serif"}}><span style={{width:10,height:10,borderRadius:"50%",background:item.dotColor,flexShrink:0,display:"inline-block"}}/>{item.title}<span style={{marginLeft:"auto",color:"#5a5955",transform:open===i?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▼</span></button>{open===i&&<div style={{padding:"4px 14px 14px",fontSize:13,color:"#8a8880",lineHeight:1.7,fontFamily:"Space Grotesk, sans-serif"}}>{item.content}</div>}</div>)}</div>;
}

function MecaBox({ steps, color="#7EB8FF" }: { steps:{label:string;text:React.ReactNode}[]; color?:string }) {
  return <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"1.2rem",marginBottom:"1rem"}}>{steps.map((s,i)=><div key={i} style={{display:"flex",gap:12,marginBottom:i<steps.length-1?10:0}}><div style={{width:24,height:24,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Syne, sans-serif",fontWeight:700,fontSize:12,color:"#0d1b2a",flexShrink:0}}>{i+1}</div><div><div style={{fontSize:13,fontWeight:600,color:"#e8e6df",fontFamily:"Space Grotesk, sans-serif",marginBottom:2}}>{s.label}</div><div style={{fontSize:12,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",lineHeight:1.5}}>{s.text}</div></div></div>)}</div>;
}

// ─── QUIZ ─────────────────────────────────────────────────────────────────────

const QUIZ = [
  { q:"Que mesure le rapport interdécile D9/D1 ?", opts:["La part du revenu détenue par les 10 % les plus riches","Le rapport entre le niveau de vie plancher des 10 % les plus riches et le niveau de vie plafond des 10 % les plus pauvres","La différence entre le revenu médian et le revenu moyen","Le pourcentage de la population vivant sous le seuil de pauvreté"], correct:1, fb:"Le rapport interdécile D9/D1 compare le niveau de vie minimum des 10 % les plus aisés (D9) au niveau de vie maximum des 10 % les plus modestes (D1). En 2023, le rapport entre les revenus moyens des D10 et D1 atteint 7,3 — niveau record depuis 30 ans. Phrase type : « Le niveau de vie moyen des 10 % les plus aisés est 7,3 fois plus élevé que celui des 10 % les plus modestes. »" },
  { q:"Un indice de Gini de 0,297 (France, 2023) signifie que :", opts:["29,7 % de la population vit sous le seuil de pauvreté","Les 30 % les plus riches détiennent 70 % des revenus","Les inégalités de revenus sont proches du pic historique — plus proches de 0 (égalité parfaite) que de 1 (inégalité totale)","La France est le pays le plus inégalitaire d'Europe"], correct:2, fb:"L'indice de Gini varie entre 0 (égalité parfaite) et 1 (inégalité absolue). À 0,297, la France est dans une situation intermédiaire : plus égalitaire que les États-Unis (≈ 0,39), moins que les pays nordiques (≈ 0,25). Ce niveau signale une remontée préoccupante des inégalités depuis les années 1990." },
  { q:"Quelle est la définition des PCS (Professions et Catégories Socioprofessionnelles) ?", opts:["Un classement des individus selon leur seul niveau de revenu annuel","Une classification de l'INSEE regroupant des actifs présentant une homogénéité sociale selon le statut d'emploi, le secteur, le niveau hiérarchique et la qualification","Un indicateur statistique qui mesure les inégalités de patrimoine","Un système de classification fondé uniquement sur le niveau de diplôme obtenu"], correct:1, fb:"Les PCS, créées par l'INSEE en 1954 et révisées en 1982, regroupent les actifs en 8 grandes catégories selon 4 critères : statut d'emploi (salarié/indépendant), secteur d'activité, niveau hiérarchique et qualification de l'emploi." },
  { q:"Selon Karl Marx, qu'est-ce qui différencie une « classe en soi » d'une « classe pour soi » ?", opts:["La classe en soi est riche, la classe pour soi est pauvre","La classe pour soi est définie objectivement par la place dans la production, la classe en soi par le prestige","La classe en soi repose sur un critère objectif (place dans la production), la classe pour soi y ajoute la conscience de classe et la lutte collective","La classe en soi disparaît dans le capitalisme avancé, la classe pour soi persiste"], correct:2, fb:"Pour Marx : la CLASSE EN SOI = critère objectif (partager la même place dans les rapports de production). La CLASSE POUR SOI = classe en soi + conscience de classe + lutte collective (grèves, syndicats, partis). Sans conscience ni lutte, il n'y a pas de classe sociale au sens plein." },
  { q:"En quoi l'analyse de Max Weber est-elle dite « pluridimensionnelle » ?", opts:["Il identifie des centaines de petites classes sociales là où Marx n'en voit que deux","Il analyse la stratification selon trois ordres distincts : l'ordre économique (classes), l'ordre social (prestige) et l'ordre politique (partis/pouvoir)","Il considère que seul le niveau de diplôme détermine la position sociale","Il pense que les inégalités de toutes natures se superposent toujours parfaitement"], correct:1, fb:"Weber distingue trois ordres de hiérarchisation non superposables : 1) Classes sociales (richesse), 2) Groupes de statut (prestige/honneur social), 3) Partis (pouvoir politique). Un artiste peut avoir du prestige sans richesse. Vision nominaliste : la conscience de classe n'est pas nécessaire à l'existence d'une classe." },
  { q:"Qu'est-ce que la « polarisation des emplois » ?", opts:["La concentration géographique des emplois dans les grandes métropoles","La hausse simultanée des emplois très qualifiés ET des emplois peu qualifiés de service, au détriment des emplois de qualification intermédiaire, sous l'effet de l'automatisation","La division des actifs entre secteur public et secteur privé","La hausse du chômage dans les secteurs industriels en déclin"], correct:1, fb:"La polarisation des emplois désigne le fait que l'automatisation touche surtout les emplois moyennement qualifiés (tâches répétitives et codifiables). La structure des emplois « se creuse » au milieu : hausse des emplois très qualifiés (cadres, ingénieurs) ET des emplois peu qualifiés de service (aide à domicile, restauration, livraison)." },
  { q:"En 2024, selon l'INSEE, quel est l'écart salarial entre femmes et hommes dans le secteur privé, tous temps de travail confondus ?", opts:["Environ 4 % de moins pour les femmes","Environ 14 % de moins pour les femmes","Environ 21,8 % de moins pour les femmes","Environ 35 % de moins pour les femmes"], correct:2, fb:"En 2024, tous temps confondus, les femmes gagnent en moyenne 21,8 % de moins que les hommes. À temps identique (EQTP), l'écart tombe à 14 %. À même poste chez le même employeur, l'écart se réduit à 3,6 %. À ce rythme, l'égalité salariale ne serait atteinte que dans ~54 ans." },
  { q:"Qu'est-ce que la thèse de la « moyennisation » proposée par Henri Mendras (1988) ?", opts:["La thèse selon laquelle les classes moyennes disparaissent au profit des extrêmes","La thèse selon laquelle la société française se structure autour d'une vaste classe moyenne, réduisant les positions extrêmes et homogénéisant les modes de vie","La thèse selon laquelle le revenu médian remplace le revenu moyen comme indicateur de référence","La thèse selon laquelle la mobilité sociale ascendante est impossible pour les classes populaires"], correct:1, fb:"Henri Mendras (La Seconde Révolution française, 1988) propose que les Trente Glorieuses ont engendré une vaste classe moyenne. Il représente la société en TOUPIE (large au centre) plutôt qu'en SABLIER (large aux deux extrêmes). Cette thèse est aujourd'hui très contestée : depuis les années 1990, les inégalités ont recommencé à croître (Chauvel, Piketty)." },
  { q:"Qu'est-ce que l'« intersectionnalité » en sociologie ?", opts:["L'étude des intersections entre espaces urbains défavorisés","Le fait que les rapports de genre, de classe, d'âge, d'origine… sont imbriqués et se renforcent mutuellement pour produire des inégalités cumulatives","La méthode statistique croisant les données de revenus et de patrimoine","La théorie selon laquelle les classes sociales se divisent en sous-groupes de plus en plus nombreux"], correct:1, fb:"L'intersectionnalité (L. Bereni) désigne le fait que les rapports de genre sont toujours imbriqués dans d'autres rapports de pouvoir. Exemple : une femme ouvrière subit à la fois les inégalités de genre ET de classe (double peine). Il faut articuler les analyses de classe et de genre, pas les opposer." },
  { q:"Qu'est-ce que la « salarisation » de l'emploi ?", opts:["L'augmentation générale des salaires depuis 1950","L'accroissement de la part des emplois salariés parmi l'ensemble des emplois, au détriment des indépendants","La généralisation du temps partiel dans le secteur tertiaire","La mise en place de grilles de salaires dans la fonction publique"], correct:1, fb:"La salarisation désigne l'augmentation de la part des emplois salariés dans l'ensemble des emplois. La part des indépendants passe de 27 % (années 1960) à 11 % (2014). Causes : concentration économique, déclin de l'artisanat, meilleure protection du statut salarié. Rebond depuis 2015 avec les plateformes numériques (12 % en 2016)." },
];

function StepQuiz() {
  const [cur,setCur] = useState(0);
  const [score,setScore] = useState(0);
  const [sel,setSel] = useState<number|null>(null);
  const [done,setDone] = useState(false);
  const q = QUIZ[cur];
  function pick(i:number){if(sel!==null)return;setSel(i);if(i===q.correct)setScore(s=>s+1);}
  function next(){if(cur+1>=QUIZ.length){setDone(true);}else{setCur(c=>c+1);setSel(null);}}
  function restart(){setCur(0);setScore(0);setSel(null);setDone(false);}
  if(done){
    const pct=Math.round((score/QUIZ.length)*100);
    const emoji=pct>=90?"🏆":pct>=70?"👍":pct>=50?"📚":"💪";
    const msg=pct>=90?"Excellent ! Tu maîtrises parfaitement ce chapitre. Prêt(e) pour le bac !":pct>=70?"Très bien ! Quelques points à revoir, mais tu as l'essentiel.":pct>=50?"Pas mal, mais relis les sections Cours et Mécanismes !":"Courage ! Reprends les notions fondamentales depuis le début.";
    return <div style={{textAlign:"center" as const,padding:"2rem 0"}}><div style={{fontSize:56,marginBottom:16}}>{emoji}</div><div style={{fontSize:22,fontWeight:700,color:"#D4A017",fontFamily:"Syne, sans-serif",marginBottom:8}}>{score} / {QUIZ.length} — {pct} %</div><div style={{fontSize:14,color:"#8a8880",marginBottom:24,fontFamily:"Space Grotesk, sans-serif"}}>{msg}</div><button onClick={restart} style={{background:"#D4A017",color:"#0d1b2a",border:"none",borderRadius:8,padding:"10px 22px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Space Grotesk, sans-serif"}}>🔁 Recommencer le quiz</button></div>;
  }
  return <div>
    <NoteBox type="success">🧠 <strong>Quiz de révision — Structure sociale</strong> · {QUIZ.length} questions pour tester tes connaissances.</NoteBox>
    <div style={{fontSize:15,fontWeight:600,color:"#e8e6df",marginBottom:14,fontFamily:"Space Grotesk, sans-serif",lineHeight:1.5}}>{q.q}</div>
    <div style={{display:"grid",gap:8,marginBottom:16}}>
      {q.opts.map((opt,i)=>{
        let bg="rgba(255,255,255,0.04)",border="rgba(255,255,255,0.1)",col="#d0cfc8";
        if(sel!==null){if(i===q.correct){bg="rgba(93,202,165,0.12)";border="#5DCAA5";col="#5DCAA5";}else if(i===sel){bg="rgba(240,153,123,0.12)";border="#F0997B";col="#F0997B";}}
        return <button key={i} onClick={()=>pick(i)} disabled={sel!==null} style={{textAlign:"left" as const,padding:"12px 14px",border:`1px solid ${border}`,borderRadius:8,background:bg,color:col,fontSize:13,cursor:sel!==null?"default":"pointer",fontFamily:"Space Grotesk, sans-serif",lineHeight:1.5,transition:"all 0.15s"}}>{opt}</button>;
      })}
    </div>
    {sel!==null&&<div style={{background:"#2a1d09",border:"1px solid #EF9F27",borderRadius:8,padding:"12px 14px",fontSize:13,color:"#d0cfc8",lineHeight:1.7,marginBottom:16,fontFamily:"Space Grotesk, sans-serif"}}>{sel===q.correct?"✅ ":"❌ "}{q.fb}</div>}
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <span style={{fontSize:12,color:"#5a5955",fontFamily:"Space Grotesk, sans-serif"}}>Question {cur+1} / {QUIZ.length}</span>
      {sel!==null&&<button onClick={next} style={{background:"#7EB8FF",color:"#0d1b2a",border:"none",borderRadius:8,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Space Grotesk, sans-serif"}}>{cur+1<QUIZ.length?"Question suivante →":"Voir mes résultats"}</button>}
    </div>
  </div>;
}

// ─── ÉTAPES ───────────────────────────────────────────────────────────────────

function StepSavoir() {
  return <div>
    <div style={{fontSize:14,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",marginBottom:"1rem"}}>Ce que le jury attend sur ce chapitre au baccalauréat.</div>
    <NoteBox type="actu">🔴 <strong>Chiffres clés 2023-2024 (INSEE) :</strong> En 2023, le niveau de vie moyen des 10 % les plus riches est <strong>7,3 fois</strong> plus élevé que celui des 10 % les plus pauvres — niveau record depuis 30 ans. Le taux de pauvreté atteint <strong>15,4 %</strong>, son plus haut niveau depuis 1996. L'indice de Gini remonte à <strong>0,297</strong>, proche du pic de 2011 (0,298).</NoteBox>
    <STitle>Points clés du programme</STitle>
    <CardGrid cards={[
      {badge:"Objectif 1",title:"PCS & Inégalités",text:"Définir stratification sociale, espace social. Maîtriser les PCS (8 groupes, 4 critères). Lire D9/D1, Gini, courbe de Lorenz.",badgeColor:"#D4A017"},
      {badge:"Objectif 2",title:"Évolutions depuis 1950",text:"4 évolutions : salarisation, tertiarisation, féminisation, élévation des qualifications + polarisation. Savoir chiffrer chaque tendance.",badgeColor:"#7EB8FF"},
      {badge:"Objectif 3",title:"Théories des classes",text:"Comparer Marx (réaliste, classe en soi/pour soi) et Weber (nominaliste, 3 ordres). Bourdieu : espace social + 3 capitaux.",badgeColor:"#5DCAA5"},
      {badge:"Objectif 4",title:"Débat sur la pertinence",text:"Argumenter avec des données contemporaines : moyennisation (Mendras) vs retour des classes (Chauvel, Piketty). Intersectionnalité, Gilets Jaunes.",badgeColor:"#AFA9EC"},
    ]} />
    <STitle>Auteurs & notions à citer impérativement</STitle>
    <div style={{background:"rgba(212,160,23,0.08)",border:"1px solid rgba(212,160,23,0.3)",borderRadius:10,padding:"14px 16px",marginBottom:"1rem"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.5rem"}}>
        {["Marx (1867) — Classe en soi / pour soi, plus-value","Weber (1920) — 3 ordres : classes, statut, partis","Bourdieu (1979) — La Distinction, espace social, capitaux","Mendras (1988) — La Seconde Révolution française, toupie","Piketty (2019) — Capital et Idéologie, inégalités de patrimoine","Chauvel (2004) — Retour des distances inter-classes","Pinçon-Charlot — La bourgeoisie comme classe pour soi","Peugny — Les Gilets Jaunes et la conscience de classe"].map((item,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,fontFamily:"Space Grotesk, sans-serif",fontSize:13,color:"#d0cfc8"}}><span style={{color:"#D4A017",flexShrink:0}}>→</span>{item}</div>)}
      </div>
    </div>
    <STitle>Données chiffrées indispensables</STitle>
    <StatGrid stats={[
      {num:"7,3×",label:"Rapport revenus D10/D1 en France (2023) — record 30 ans",color:"#F0997B"},
      {num:"0,297",label:"Indice de Gini France (2023) — proche du pic historique",color:"#D4A017"},
      {num:"21,8 %",label:"Écart salarial femmes-hommes tous temps confondus (2024)",color:"#AFA9EC"},
    ]} />
    <StatGrid stats={[
      {num:"17,8 %",label:"Part des cadres (CPIS) en 2016 — contre 4,7 % en 1962",color:"#7EB8FF"},
      {num:"~50 %",label:"Part du patrimoine détenu par les 10 % les plus riches",color:"#5DCAA5"},
      {num:"54 ans",label:"Estimation pour atteindre l'égalité salariale au rythme actuel",color:"#F0997B"},
    ]} />
  </div>;
}

function StepNotions() {
  return <div>
    <STitle>Structure & stratification</STitle>
    <DefBox label="Stratification sociale / Structure sociale" color="blue">
      Découpage des sociétés humaines en <strong style={{color:"#7EB8FF"}}>catégories hiérarchisées</strong> présentant une certaine homogénéité, résultant des inégalités de richesse, de pouvoir, de prestige ou de connaissance (Serge Paugam). Ces deux notions sont synonymes.
    </DefBox>
    <DefBox label="Espace social (Bourdieu)" color="purple">
      Métaphore pour décrire la société comme un <strong style={{color:"#AFA9EC"}}>ensemble de positions distinctes et coexistantes</strong>, définies par des relations de proximité ou d'éloignement. Deux dimensions : <strong style={{color:"#AFA9EC"}}>capital économique</strong> (revenus + patrimoine) et <strong style={{color:"#AFA9EC"}}>capital culturel</strong> (diplôme, savoirs, savoir-faire).
    </DefBox>
    <DefBox label="PCS — Professions et Catégories Socioprofessionnelles" color="amber">
      Classification INSEE (1954, révisée 1982) regroupant les actifs selon 4 critères : <strong style={{color:"#EF9F27"}}>statut d'emploi</strong> (salarié/indépendant), <strong style={{color:"#EF9F27"}}>secteur</strong>, <strong style={{color:"#EF9F27"}}>niveau hiérarchique</strong> et <strong style={{color:"#EF9F27"}}>qualification</strong>. Les 8 groupes agrégés : Agriculteurs · Artisans/Commerçants/Chefs d'entreprise · Cadres & CPIS · Professions intermédiaires · Employés · Ouvriers · Retraités · Autres inactifs.
    </DefBox>
    <STitle>Évolutions structurelles</STitle>
    <DefBox label="Salarisation" color="teal">
      Augmentation de la <strong style={{color:"#5DCAA5"}}>part des emplois salariés</strong> au détriment du travail indépendant. Les indépendants passent de 27 % (années 1960) à 11 % (2014). Rebond depuis 2015 avec les plateformes numériques (12 % en 2016).
    </DefBox>
    <DefBox label="Tertiarisation" color="blue">
      Progression de la part des <strong style={{color:"#7EB8FF"}}>emplois dans le secteur des services</strong>. Tertiaire : 40 % (1962) → plus des ¾ (2016). Industrie : 12,4 % en 2017.
    </DefBox>
    <DefBox label="Polarisation des emplois" color="coral">
      Hausse simultanée des emplois très qualifiés ET des emplois peu qualifiés de service, <strong style={{color:"#F0997B"}}>au détriment des emplois de qualification intermédiaire</strong>, sous l'effet de l'automatisation. La structure des emplois « se creuse » au milieu.
    </DefBox>
    <STitle>Théories des classes</STitle>
    <DefBox label="Classe en soi / Classe pour soi (Marx)" color="coral">
      <strong style={{color:"#F0997B"}}>Classe en soi :</strong> critère objectif — similitude de situation dans les rapports de production. Vision réaliste : la classe existe indépendamment de la conscience de ses membres.<br/>
      <strong style={{color:"#F0997B"}}>Classe pour soi :</strong> classe en soi + conscience de classe + lutte collective. La lutte des classes est le moteur de l'histoire.
    </DefBox>
    <DefBox label="Réalisme (Marx) / Nominalisme (Weber)" color="purple">
      <strong style={{color:"#AFA9EC"}}>Réaliste :</strong> la classe existe objectivement dans la réalité, indépendamment de la conscience de ses membres.<br/>
      <strong style={{color:"#AFA9EC"}}>Nominaliste :</strong> les classes sont des catégories construites par l'analyste. Elles n'ont pas forcément de conscience d'elles-mêmes.
    </DefBox>
    <DefBox label="Moyennisation (Mendras, 1988)" color="amber">
      Les Trente Glorieuses ont engendré une vaste classe moyenne. Mendras représente la société en <strong style={{color:"#EF9F27"}}>toupie</strong> (large au centre) plutôt qu'en sablier (large aux extrêmes). Thèse fortement contestée depuis les années 1990 (remontée des inégalités).
    </DefBox>
    <DefBox label="Intersectionnalité (Bereni)" color="teal">
      Les rapports de genre, de classe, d'âge et d'origine sont <strong style={{color:"#5DCAA5"}}>imbriqués et se renforcent mutuellement</strong> pour produire des inégalités cumulatives. Être femme ET appartenir à une classe populaire constitue une « double peine ».
    </DefBox>
  </div>;
}

function StepCours() {
  return <div>
    <STitle>1. Les facteurs de la structure sociale</STitle>
    <CardGrid cards={[
      {badge:"Diplôme ↗ PCS",title:"Corrélation positive",text:"Plus le niveau de diplôme est élevé, plus la PCS atteinte est élevée. En 1980, 1 travailleur sur 2 était sans diplôme. En 2014, 8 sur 10 sont diplômés.",badgeColor:"#7EB8FF"},
      {badge:"Cadres vs Ouvriers",title:"Taux de chômage révélateur",text:"En 2019 : chômage à 3,9 % chez les cadres contre 12,4 % chez les ouvriers — 8,5 points d'écart. La PCS reste un puissant déterminant.",badgeColor:"#D4A017"},
      {badge:"Promotions internes",title:"Ascension limitée",text:"Les promotions internes (ouvrier → cadre) sont rares. Sans diplôme, très difficile d'accéder à une PCS élevée. Le diplôme = passeport quasi-obligatoire.",badgeColor:"#F0997B"},
    ]} />
    <Accordion items={[
      {title:"♀♂ Le sexe et le genre",dotColor:"#AFA9EC",content:<div>Les femmes occupent moins souvent des postes de cadres (16,8 % vs 21,6 % des hommes). Elles sont surreprésentées dans les métiers dits « féminins » (soin, éducation, commerce) moins rémunérés.<br/><br/><strong style={{color:"#e8e6df"}}>Écarts salariaux 2024 (INSEE) :</strong><ul style={{margin:"8px 0 0 20px",fontSize:12,color:"#8a8880"}}><li>Tous temps confondus : les femmes gagnent <strong style={{color:"#F0997B"}}>21,8 % de moins</strong></li><li>À temps identique (EQTP) : écart de <strong style={{color:"#D4A017"}}>14 %</strong></li><li>À même poste chez le même employeur : <strong style={{color:"#5DCAA5"}}>3,6 %</strong> (discrimination directe)</li><li>À ce rythme, égalité salariale dans <strong style={{color:"#F0997B"}}>~54 ans</strong></li></ul></div>},
      {title:"🎂 La position dans le cycle de vie (âge)",dotColor:"#D4A017",content:<div>L'âge est un <strong style={{color:"#e8e6df"}}>fait social</strong>. <strong style={{color:"#e8e6df"}}>Avant 25 ans :</strong> forte proportion de CDD, intérimaires, ouvriers non qualifiés. <strong style={{color:"#e8e6df"}}>25-49 ans :</strong> stabilisation professionnelle. <strong style={{color:"#e8e6df"}}>Après 50 ans :</strong> risque de chômage long pour les seniors. En 2019, les intérimaires sont majoritairement de jeunes hommes dans des postes d'ouvriers non qualifiés.</div>},
      {title:"🏠 La composition du ménage",dotColor:"#5DCAA5",content:<div>À revenu égal, un couple sans enfant a un niveau de vie plus élevé qu'un couple avec enfants (calcul par unité de consommation). Les <strong style={{color:"#e8e6df"}}>familles monoparentales</strong> (11,8 % des femmes de 25-64 ans vs 2,7 % des hommes en 2019) sont particulièrement exposées au risque de pauvreté.</div>},
      {title:"📍 Le lieu de résidence",dotColor:"#7EB8FF",content:<div>Le lieu de résidence est à la fois un <strong style={{color:"#e8e6df"}}>reflet</strong> et un <strong style={{color:"#e8e6df"}}>facteur</strong> de la position sociale. Les « beaux quartiers » offrent davantage de ressources publiques et privées. Dans les campagnes en déclin (B. Coquard, 2019), la bonne réputation locale devient une ressource rare, tandis qu'une mauvaise adresse peut stigmatiser.</div>},
    ]} />
    <STitle>2. Les théories des classes sociales</STitle>
    <DefBox label="Karl Marx — Vision réaliste (1867)" color="coral">
      Deux grandes classes s'opposent dans le capitalisme : les <strong style={{color:"#F0997B"}}>capitalistes</strong> (possèdent les moyens de production → profits) et les <strong style={{color:"#F0997B"}}>prolétaires</strong> (vendent leur force de travail → salaires). Rapport d'<strong style={{color:"#F0997B"}}>exploitation</strong> : les capitalistes s'approprient la <em>plus-value</em> créée par les prolétaires. Évolution inévitable : polarisation → conscience de classe → révolution.
    </DefBox>
    <DefBox label="Max Weber — Vision nominaliste pluridimensionnelle (1920)" color="purple">
      Weber identifie <strong style={{color:"#AFA9EC"}}>3 ordres</strong> distincts et non superposés :<br/>
      · <strong style={{color:"#AFA9EC"}}>Ordre économique :</strong> classes sociales (richesse = revenus + patrimoine)<br/>
      · <strong style={{color:"#AFA9EC"}}>Ordre social :</strong> groupes de statut (prestige, honneur)<br/>
      · <strong style={{color:"#AFA9EC"}}>Ordre politique :</strong> partis (pouvoir politique)<br/>
      Un artiste peut avoir du prestige sans richesse ; un politicien peut avoir du pouvoir sans fortune.
    </DefBox>
    <DefBox label="Pierre Bourdieu — Capitaux et espace social (1979)" color="teal">
      La société = espace à 2 dimensions : <strong style={{color:"#5DCAA5"}}>capital économique</strong> (revenus, patrimoine) et <strong style={{color:"#5DCAA5"}}>capital culturel</strong> (diplômes, savoirs incorporés). S'y ajoute le <strong style={{color:"#5DCAA5"}}>capital social</strong> (réseau de relations mobilisables). La bourgeoisie cumule ces trois formes sur plusieurs générations et cultive l'entre-soi (Pinçon-Charlot).
    </DefBox>
    <STitle>3. Le débat sur la pertinence des classes sociales</STitle>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:"1rem"}}>
      <div style={{background:"#0a2a22",border:"1px solid rgba(93,202,165,0.3)",borderRadius:10,padding:14}}>
        <div style={{fontSize:13,fontWeight:700,color:"#5DCAA5",marginBottom:10}}>✅ Arguments pour la persistance</div>
        <ul style={{fontSize:12,color:"#8a8880",lineHeight:1.7,paddingLeft:16}}>
          <li>Rapport D10/D1 = 7,3 en 2023 (record 30 ans)</li>
          <li>Les 10 % les plus riches détiennent ~50 % du patrimoine</li>
          <li>Pinçon-Charlot : la grande bourgeoisie forme une <em>classe pour soi</em></li>
          <li>Piketty : les inégalités retrouvent des niveaux de la Belle Époque</li>
          <li>Gilets Jaunes (2018) : retour de la conscience de classe (Peugny)</li>
        </ul>
      </div>
      <div style={{background:"#2a1209",border:"1px solid rgba(240,153,123,0.3)",borderRadius:10,padding:14}}>
        <div style={{fontSize:13,fontWeight:700,color:"#F0997B",marginBottom:10}}>⚠️ Arguments pour un affaiblissement</div>
        <ul style={{fontSize:12,color:"#8a8880",lineHeight:1.7,paddingLeft:16}}>
          <li>Thèse de la moyennisation (Mendras, 1988)</li>
          <li>Diffusion de la propriété et homogénéisation de la consommation</li>
          <li>Massification scolaire et « culture moyenne »</li>
          <li>Déclin du PCF et des syndicats depuis les années 1980</li>
          <li>Individualisation du travail → affaiblissement des collectifs</li>
        </ul>
      </div>
    </div>
    <NoteBox type="actu">🟡 <strong>Les Gilets Jaunes (2018-2020) :</strong> Ce mouvement illustre le retour des classes sur la scène politique. Fonctionnaires de catégorie C, aides-soignantes, techniciens, employés, caissières partagent un sentiment d'avenir bouché et de mépris de classe. Camille Peugny constate : « les classes sociales redeviennent visibles, ce qui veut dire qu'elles n'avaient jamais disparu. » On retrouve les 3 dimensions marxistes : similitude de situation (<em>classe en soi</em>), conscience de classe, mobilisation (<em>classe pour soi</em>).</NoteBox>
  </div>;
}

function StepMecanismes() {
  return <div>
    <STitle>Mesurer les inégalités économiques</STitle>
    <MecaBox color="#7EB8FF" steps={[
      {label:"Les quantiles",text:"Déciles (tranches de 10 %), quintiles (20 %), quartiles (25 %), centiles (1 %). D1 = seuil en dessous duquel se situent les 10 % les plus pauvres. D9 = seuil au-dessus duquel se situent les 10 % les plus riches."},
      {label:"Rapport interdécile D9/D1",text:"Mesure l'écart entre riches et pauvres. En 2023, le rapport entre revenus moyens des D10 et D1 atteint 7,3 (record). Lecture : « Le niveau de vie moyen des 10 % les plus aisés est 7,3 fois plus élevé que celui des 10 % les plus modestes. »"},
      {label:"Courbe de Lorenz",text:"Représentation graphique de la concentration des revenus. Plus la courbe s'écarte de la diagonale d'équi-répartition, plus les inégalités sont fortes. En France, les inégalités de patrimoine sont bien plus grandes que celles de revenus."},
      {label:"Indice de Gini",text:"Surface A / (A+B) dans la courbe de Lorenz. Varie entre 0 (égalité parfaite) et 1 (inégalité totale). En 2023 : Gini = 0,297 en France. Proche du pic historique. Hong Kong : 0,539. Pays nordiques : ≈ 0,25."},
    ]} />
    <STitle>De la « classe en soi » à la « classe pour soi » chez Marx</STitle>
    <MecaBox color="#F0997B" steps={[
      {label:"Classe en soi",text:"Critère objectif : similitude de situation dans les rapports de production (même source de revenu, même rapport aux moyens de production). La classe existe indépendamment de la conscience de ses membres (vision réaliste)."},
      {label:"Conscience de classe",text:"Prise de conscience de sa situation commune et de ses intérêts distincts de la classe dominante. Sans conscience, pas de mobilisation collective possible."},
      {label:"Classe pour soi",text:"Classe en soi + conscience de classe + lutte collective (grèves, syndicats, partis ouvriers). Pour Marx, la lutte des classes est le moteur de l'histoire. C'est à ce stade que la classe a une existence pleine."},
    ]} />
    <STitle>La polarisation des emplois</STitle>
    <MecaBox color="#AFA9EC" steps={[
      {label:"Automatisation des emplois intermédiaires",text:"Les robots et logiciels remplacent les tâches répétitives et codifiables (lignes d'assemblage, comptabilité de base…), précisément les emplois de qualification intermédiaire."},
      {label:"Montée des emplois très qualifiés",text:"Le progrès technique nécessite des travailleurs capables d'utiliser des outils complexes → hausse de la demande de cadres, ingénieurs, professions intellectuelles supérieures."},
      {label:"Montée des emplois peu qualifiés de service",text:"L'enrichissement d'une partie de la population crée de la demande pour des services aux personnes (aides à domicile, livreurs, caissiers). Non délocalisables et résistants à l'automatisation car basés sur la relation humaine."},
      {label:"Résultat : la structure « se creuse »",text:"Augmentation des cadres ET des emplois précaires peu qualifiés, stagnation des emplois intermédiaires. Cela renforce les inégalités inter-classes et alimente le débat sur la pertinence des classes."},
    ]} />
    <STitle>Évolution des PCS depuis 1950</STitle>
    <div style={{overflowX:"auto" as const}}>
      <table style={{width:"100%",borderCollapse:"collapse" as const,fontSize:13,fontFamily:"Space Grotesk, sans-serif",marginBottom:"1rem"}}>
        <thead><tr>{["PCS","Tendance","Cause(s) principale(s)"].map(h=><th key={h} style={{background:"rgba(255,255,255,0.04)",padding:"9px 12px",textAlign:"left" as const,fontWeight:600,color:"#5a5955",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>{h}</th>)}</tr></thead>
        <tbody>
          {[["Agriculteurs","↘ forte baisse","Salarisation + Tertiarisation + concentration des exploitations"],["Artisans, commerçants","↘ baisse","Salarisation (grande distribution) + concurrence"],["Cadres & CPIS","↗ forte hausse","Tertiarisation + élévation du niveau de qualification"],["Professions intermédiaires","↗ hausse","Tertiarisation + élévation du niveau de qualification"],["Employés","↗ hausse","Tertiarisation + féminisation de l'emploi"],["Ouvriers","↘ baisse","Tertiarisation + automatisation + délocalisation"]].map(([pcs,tend,cause],i)=><tr key={i}><td style={{padding:"9px 12px",borderBottom:"1px solid rgba(255,255,255,0.05)",color:"#7EB8FF",fontWeight:600}}>{pcs}</td><td style={{padding:"9px 12px",borderBottom:"1px solid rgba(255,255,255,0.05)",color:tend.includes("↗")?"#5DCAA5":"#F0997B"}}>{tend}</td><td style={{padding:"9px 12px",borderBottom:"1px solid rgba(255,255,255,0.05)",color:"#8a8880"}}>{cause}</td></tr>)}
        </tbody>
      </table>
    </div>
  </div>;
}

function StepErreurs() {
  return <div>
    <div style={{fontSize:14,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",marginBottom:"1rem"}}>Les confusions les plus fréquentes repérées dans les copies de bac.</div>
    {[
      {err:"Confondre « réaliste » et « nominaliste »",ok:"Réaliste (Marx) = la classe existe objectivement dans la réalité. Nominaliste (Weber) = les classes sont des catégories construites par l'analyste. Mémo : Marx est RÉAListe car il croit en une RÉALité des classes."},
      {err:"Dire que Weber réduit les inégalités à la seule richesse",ok:"Au contraire, c'est Marx qui réduit la stratification à l'axe économique. Weber enrichit l'analyse avec le prestige (groupes de statut) et le pouvoir (partis). C'est le cœur de son apport."},
      {err:"Confondre D9/D1 et le rapport entre revenus moyens",ok:"D9/D1 = rapport entre le niveau de vie minimum des 10 % les plus aisés et le niveau de vie maximum des 10 % les plus pauvres. En 2023 ce rapport ≈ 3,4. Le rapport entre REVENUS MOYENS des déciles extrêmes = 7,3 (chiffre souvent cité)."},
      {err:"Confondre l'écart salarial « tous temps confondus » et « à temps égal »",ok:"21,8 % tous temps confondus (inclut le temps partiel subi) / 14 % à temps identique (EQTP) / 3,6 % à même poste chez le même employeur. Les trois mesures sont complémentaires et ne doivent pas être mélangées."},
      {err:"Présenter la thèse de Mendras comme toujours valide",ok:"La thèse de la moyennisation (1988) est aujourd'hui très contestée. Depuis les années 1990, les inégalités économiques ont recommencé à croître. Citer Mendras sans le contrebalancer par Chauvel ou Piketty, c'est une erreur."},
      {err:"Penser que l'intersectionnalité contredit l'analyse de classe",ok:"L'intersectionnalité RENFORCE l'analyse de classe en montrant que les inégalités de genre, d'origine et d'âge se cumulent avec les inégalités de classe. Ce n'est pas parce qu'il existe de multiples facteurs que la classe perd sa pertinence."},
      {err:"Oublier la distinction intra-classes / inter-classes",ok:"Pour qu'une catégorie ait une consistance sociologique, il faut : (1) des distances inter-classes suffisantes ET (2) une homogénéité interne suffisante. Noiriel parle de « classe ouvrière en éclats » pour l'hétérogénéité interne croissante."},
    ].map((item,i)=><div key={i} style={{marginBottom:12,border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,overflow:"hidden"}}>
      <div style={{background:"rgba(240,153,123,0.1)",padding:"10px 14px",borderBottom:"1px solid rgba(240,153,123,0.2)"}}><span style={{fontSize:11,color:"#F0997B",fontWeight:700,marginRight:8}}>❌ ERREUR {i+1}</span><span style={{fontSize:13,color:"#e8e6df",fontFamily:"Space Grotesk, sans-serif"}}>{item.err}</span></div>
      <div style={{padding:"10px 14px",background:"rgba(93,202,165,0.04)"}}><span style={{fontSize:11,color:"#5DCAA5",fontWeight:700,marginRight:8}}>✅ CORRECT :</span><span style={{fontSize:12,color:"#8a8880",lineHeight:1.6,fontFamily:"Space Grotesk, sans-serif"}}>{item.ok}</span></div>
    </div>)}
    <NoteBox type="info">⚠️ <strong>Point méthode — Lire un décile correctement :</strong><br/>Modèle de phrase : « En France, en 2023, les 10 % les plus aisés ont un niveau de vie <em>au moins</em> 3,4 fois plus élevé que le niveau de vie <em>maximum</em> des 10 % les plus modestes (rapport interdécile D9/D1). »</NoteBox>
  </div>;
}

function StepSujets() {
  return <div>
    <NoteBox type="actu">⚡ <strong>Ce chapitre est très souvent mobilisé en dissertation</strong>, combiné avec mobilité sociale ou inégalités. Il peut également apparaître en EC2 (calcul d'indicateurs) ou EC3.</NoteBox>
    {[
      {type:"Dissertation",color:"#D4A017",sujet:"Les classes sociales sont-elles encore pertinentes pour analyser la société française actuelle ?",plan:"I. Les classes sociales conservent une réalité structurante (inégalités économiques persistantes, bourgeoisie comme classe pour soi, Gilets Jaunes) / II. Des transformations qui nuancent leur pertinence (moyennisation, affaiblissement des collectifs ouvriers, individualisation) / III. Des outils complémentaires nécessaires (intersectionnalité, genre, lieu de résidence)"},
      {type:"Dissertation",color:"#D4A017",sujet:"Dans quelle mesure la structure sociale française a-t-elle évolué depuis les années 1950 ?",plan:"I. Des mutations structurelles profondes (salarisation, tertiarisation, féminisation, polarisation) / II. Des inégalités qui persistent et se renouvellent (précariat, inégalités de genre, de lieu) / III. Le débat sur la moyennisation : de la toupie au sablier ?"},
      {type:"EC3",color:"#5DCAA5",sujet:"À l'aide de vos connaissances et du dossier documentaire, vous montrerez que les inégalités économiques restent structurantes en France.",plan:"Définir structure sociale et inégalités → données D9/D1, Gini, patrimoine → PCS comme révélateur d'inégalités (chômage, espérance de vie) → débat moyennisation vs retour des classes → conclusion nuancée"},
      {type:"EC2 Calcul",color:"#7EB8FF",sujet:"Calculez et interprétez le rapport interdécile D9/D1 à partir du tableau de données sur les niveaux de vie.",plan:"Calcul : D9 ÷ D1 = X / Lecture : « Le niveau de vie plancher des 10 % les plus aisés est X fois plus élevé que le niveau de vie plafond des 10 % les plus modestes » / Comparaison dans le temps ou l'espace"},
    ].map((s,i)=><div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:14,marginBottom:12}}>
      <span style={{fontSize:10,fontWeight:700,color:s.color,background:`${s.color}22`,border:`1px solid ${s.color}44`,borderRadius:20,padding:"2px 10px",display:"inline-block",marginBottom:8,fontFamily:"Space Grotesk, sans-serif"}}>{s.type}</span>
      <div style={{fontSize:13,fontWeight:600,color:"#e8e6df",marginBottom:8,lineHeight:1.5,fontFamily:"Space Grotesk, sans-serif"}}>{s.sujet}</div>
      <div style={{fontSize:12,color:"#5a5955",lineHeight:1.6,fontFamily:"Space Grotesk, sans-serif"}}><strong style={{color:"#8a8880"}}>Piste de plan :</strong> {s.plan}</div>
    </div>)}
  </div>;
}

function StepMethode() {
  return <div>
    <STitle>Méthode — Dissertation sur les classes sociales</STitle>
    <MecaBox color="#7EB8FF" steps={[
      {label:"Analyser le sujet",text:"Identifier les mots-clés (classes sociales ? structure sociale ? inégalités ?), le verbe directeur (montrer, discuter, dans quelle mesure) et les limites (France actuelle, depuis 1950…)."},
      {label:"Problématiser",text:"Formuler une tension entre deux réponses plausibles. Ex : « Les classes sociales semblent s'être atténuées (moyennisation), mais les données récentes montrent leur retour en force. »"},
      {label:"Construire le plan",text:"Le plan dialectique (thèse / antithèse / synthèse) est souvent attendu en SES. Éviter le plan catalogue sans tension. Chaque partie doit répondre partiellement à la problématique."},
      {label:"Mobiliser des auteurs",text:"Au moins 3 auteurs différents avec leurs théories (Marx, Weber, Bourdieu minimum). Citer l'ouvrage quand c'est possible (La Distinction, Capital et Idéologie…)."},
      {label:"Utiliser des données chiffrées",text:"D9/D1, indice de Gini, taux de chômage par PCS, écart salarial femmes-hommes, évolution des PCS depuis 1950. Les données sans lecture ni interprétation ne valent rien."},
      {label:"Conclure en répondant à la problématique",text:"Résumer les apports de chaque partie, proposer une synthèse nuancée. Éventuellement ouvrir sur un enjeu connexe (mobilité sociale, politiques de redistribution)."},
    ]} />
    <STitle>Méthode — EC2 : lecture d'un indicateur d'inégalités</STitle>
    <NoteBox type="info">⚠️ <strong>Structure d'une réponse EC2 parfaite :</strong><br/><br/>1. <strong>Identifier et définir l'indicateur</strong> (rapport interdécile, indice de Gini, courbe de Lorenz)<br/>2. <strong>Lire la valeur</strong> avec une phrase-type complète (sujet + verbe + chiffre + unité + date)<br/>3. <strong>Interpréter :</strong> que nous dit ce chiffre sur la réalité sociale ?<br/>4. <strong>Nuancer si possible :</strong> comparer avec d'autres pays ou d'autres années<br/><br/>⚠️ Erreur fréquente : lire un décile sans unité ni sujet grammatical, ou confondre D9/D1 et le rapport entre revenus moyens.</NoteBox>
    <STitle>Schéma de synthèse — L'espace social de Bourdieu</STitle>
    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"1.2rem",textAlign:"center" as const}}>
      <div style={{background:"#7EB8FF",color:"#0d1b2a",borderRadius:10,padding:"10px 16px",fontWeight:700,fontSize:13,maxWidth:340,margin:"0 auto 12px",fontFamily:"Space Grotesk, sans-serif"}}>CADRES & CPIS — Revenu élevé · Diplôme élevé</div>
      <div style={{fontSize:18,color:"#5a5955",margin:"4px 0"}}>↕ Distance maximale</div>
      <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:4,flexWrap:"wrap" as const}}>
        <div style={{background:"rgba(239,159,39,0.15)",border:"1px solid rgba(239,159,39,0.3)",borderRadius:8,padding:"8px 12px",fontSize:12,color:"#EF9F27",flex:1,minWidth:120,fontFamily:"Space Grotesk, sans-serif"}}>Artisans, agriculteurs<br/><small>Revenu moyen · Diplôme faible</small></div>
        <div style={{background:"rgba(175,169,236,0.15)",border:"1px solid rgba(175,169,236,0.3)",borderRadius:8,padding:"8px 12px",fontSize:12,color:"#AFA9EC",flex:1,minWidth:120,fontFamily:"Space Grotesk, sans-serif"}}>Prof. intermédiaires<br/><small>Revenu moyen · Diplôme élevé</small></div>
      </div>
      <div style={{fontSize:18,color:"#5a5955",margin:"4px 0"}}>↕</div>
      <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap" as const}}>
        <div style={{background:"rgba(240,153,123,0.15)",border:"1px solid rgba(240,153,123,0.3)",borderRadius:8,padding:"8px 12px",fontSize:12,color:"#F0997B",flex:1,minWidth:120,fontFamily:"Space Grotesk, sans-serif"}}>OUVRIERS<br/><small>Revenu faible · Diplôme faible</small></div>
        <div style={{background:"rgba(93,202,165,0.15)",border:"1px solid rgba(93,202,165,0.3)",borderRadius:8,padding:"8px 12px",fontSize:12,color:"#5DCAA5",flex:1,minWidth:120,fontFamily:"Space Grotesk, sans-serif"}}>EMPLOYÉS<br/><small>Revenu faible · Diplôme moyen</small></div>
      </div>
      <p style={{fontSize:11,color:"#5a5955",marginTop:10,fontFamily:"Space Grotesk, sans-serif"}}>Les PCS les plus proches : ouvriers & employés · Les plus éloignées : cadres ↔ ouvriers/employés</p>
    </div>
  </div>;
}

function StepMemo() {
  return <div style={{textAlign:"center" as const,padding:"2rem 0"}}>
    <div style={{fontSize:48,marginBottom:16}}>📄</div>
    <div style={{fontSize:20,fontWeight:700,color:"#e8e6df",fontFamily:"Syne, sans-serif",marginBottom:8}}>Fiche mémo PDF</div>
    <div style={{fontSize:14,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",maxWidth:380,margin:"0 auto 2rem"}}>La synthèse condensée du chapitre en une page A4, à imprimer avant le bac.</div>
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"1.5rem",maxWidth:400,margin:"0 auto 1.5rem",textAlign:"left" as const}}>
      <div style={{fontSize:12,color:"#5a5955",fontFamily:"Space Grotesk, sans-serif",marginBottom:12,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase" as const}}>Contenu de la fiche</div>
      {["4 grandes évolutions depuis 1950","8 PCS + 4 critères de classification","Marx vs Weber — tableau comparatif","Thèse de la moyennisation (Mendras)","Débat : classes persistantes ou affaiblies ?","Intersectionnalité + données 2025","Auteurs clés + données chiffrées"].map((item,i)=><div key={i} style={{display:"flex",gap:8,fontSize:13,color:"#d0cfc8",fontFamily:"Space Grotesk, sans-serif",marginBottom:6}}><span style={{color:"#5DCAA5"}}>✓</span>{item}</div>)}
    </div>
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px dashed rgba(255,255,255,0.15)",borderRadius:10,padding:"12px 28px",display:"inline-block",color:"#5a5955",fontFamily:"Space Grotesk, sans-serif",fontSize:14}}>📥 Fiche mémo PDF — bientôt disponible</div>
  </div>;
}

function StepRessources() {
  return <div>
    <div style={{fontSize:14,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",marginBottom:"1.5rem"}}>Ressources complémentaires pour approfondir et mémoriser le chapitre.</div>

    <div style={{marginBottom:"1.5rem"}}>
      <div style={{fontSize:13,fontWeight:700,color:"#7EB8FF",fontFamily:"Space Grotesk, sans-serif",marginBottom:10}}>🎬 Cours vidéo — La structure sociale</div>
      <div style={{position:"relative",paddingBottom:"56.25%",height:0,borderRadius:12,overflow:"hidden",border:"1px solid rgba(126,184,255,0.2)"}}>
        <iframe
          src="https://www.youtube.com/embed/iSAUKy_TaVo"
          title="Cours vidéo — La structure sociale"
          style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12}}>
      {[
        {icon:"🗺️",label:"Carte mentale",desc:"Visualise toutes les connexions entre PCS, théories et débats sur les classes.",color:"#D4A017"},
        {icon:"📊",label:"Infographie",desc:"L'espace social de Bourdieu et les 4 évolutions depuis 1950 en schéma.",color:"#5DCAA5"},
        {icon:"📝",label:"Synthèse NotebookLM",desc:"La synthèse magistrale générée par IA à partir du cours complet.",color:"#AFA9EC"},
      ].map((r,i)=><div key={i} style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${r.color}33`,borderRadius:12,padding:"1.25rem",textAlign:"center" as const,opacity:0.6}}>
        <div style={{fontSize:32,marginBottom:10}}>{r.icon}</div>
        <div style={{fontSize:14,fontWeight:700,color:r.color,fontFamily:"Space Grotesk, sans-serif",marginBottom:6}}>{r.label}</div>
        <div style={{fontSize:12,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",lineHeight:1.5,marginBottom:10}}>{r.desc}</div>
        <div style={{fontSize:10,fontWeight:700,color:"#5a5955",fontFamily:"Space Grotesk, sans-serif",letterSpacing:"0.08em",textTransform:"uppercase" as const,background:"rgba(255,255,255,0.04)",borderRadius:6,padding:"3px 10px",display:"inline-block"}}>Bientôt disponible</div>
      </div>)}
    </div>
  </div>;
}

function renderStep(id: StepId) {
  switch(id){
    case "savoir":     return <StepSavoir/>;
    case "notions":    return <StepNotions/>;
    case "cours":      return <StepCours/>;
    case "mecanismes": return <StepMecanismes/>;
    case "erreurs":    return <StepErreurs/>;
    case "quiz":       return <StepQuiz/>;
    case "sujets":     return <StepSujets/>;
    case "methode":    return <StepMethode/>;
    case "memo":       return <StepMemo/>;
    case "ressources": return <StepRessources/>;
  }
}

// ─── PAGE PRINCIPALE ──────────────────────────────────────────────────────────
export default function StructureSocialePage() {
  const [active,setActive] = useState<StepId>("savoir");
  const isMobile = useIsMobile();
  const currentStep = STEPS.find(s=>s.id===active)!;

  return <div style={{minHeight:"100vh",background:"#0d1b2a"}}>
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

    {/* ── Bandeau nav CapSES ── */}
    <nav style={{position:"sticky",top:0,zIndex:50,background:"rgba(13,27,42,0.95)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255,255,255,0.08)",padding:"0 1.5rem",height:56,display:"flex",alignItems:"center",gap:16}}>
      <a href="/" style={{fontSize:18,fontWeight:800,fontFamily:"Syne, sans-serif",color:"#D4A017",textDecoration:"none"}}>CapSES</a>
      <span style={{color:"rgba(255,255,255,0.2)"}}>›</span>
      <span style={{fontSize:13,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif"}}>Terminale</span>
      <span style={{color:"rgba(255,255,255,0.2)"}}>›</span>
      <span style={{fontSize:13,color:"#d0cfc8",fontFamily:"Space Grotesk, sans-serif"}}>Structure sociale</span>
      <div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
        <div style={{width:10,height:10,borderRadius:"50%",background:"#D4A017",animation:"pulse 2s infinite"}}/>
        <span style={{fontSize:11,color:"#D4A017",fontFamily:"Space Grotesk, sans-serif",fontWeight:600}}>{STEPS.findIndex(s=>s.id===active)+1}/{STEPS.length}</span>
      </div>
    </nav>

    {/* ── Header chapitre ── */}
    <div style={{background:"linear-gradient(135deg,#0a1e36 0%,#0d1b2a 60%,#0a2a1a 100%)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"2rem 1.5rem 1.5rem",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-60,right:-60,width:200,height:200,background:"radial-gradient(circle,rgba(93,202,165,0.06) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"inline-block",fontSize:10,fontWeight:700,letterSpacing:"0.12em",padding:"3px 10px",borderRadius:20,background:"rgba(212,160,23,0.15)",color:"#D4A017",border:"1px solid rgba(212,160,23,0.3)",marginBottom:10,fontFamily:"Space Grotesk, sans-serif",textTransform:"uppercase" as const}}>Sociologie · Terminale SES</div>
        <h1 style={{fontSize:"clamp(22px,4vw,32px)",fontWeight:800,fontFamily:"Syne, sans-serif",color:"#f0ece0",margin:0,lineHeight:1.2,marginBottom:8}}>
          Comment est structurée<br/>la société française actuelle ?
        </h1>
        <div style={{fontSize:13,color:"#5a5955",fontFamily:"Space Grotesk, sans-serif"}}>Programme Éduscol 2020 · 10 étapes de révision · Actualisé 2025</div>
      </div>
    </div>

    {/* ── Barre d'onglets mobile ── */}
    <div className="hide-sb" style={{display:"flex",overflowX:"auto",gap:6,padding:"0.75rem 1rem",borderBottom:"1px solid rgba(255,255,255,0.06)",background:"rgba(0,0,0,0.2)"}}>
      {STEPS.map(s=><button key={s.id} onClick={()=>setActive(s.id)} style={{flexShrink:0,padding:"6px 12px",borderRadius:8,border:`1px solid ${active===s.id?s.color:"rgba(255,255,255,0.08)"}`,background:active===s.id?`${s.color}22`:"transparent",color:active===s.id?s.color:"#5a5955",fontSize:12,fontWeight:active===s.id?700:400,cursor:"pointer",fontFamily:"Space Grotesk, sans-serif",whiteSpace:"nowrap" as const}}>{s.icon} {s.label}</button>)}
    </div>

    {/* ── Layout sidebar + contenu ── */}
    <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:isMobile?"1fr":"240px 1fr",minHeight:"calc(100vh - 200px)"}}>

      {/* Sidebar desktop */}
      <aside style={{display:isMobile?"none":"block",borderRight:"1px solid rgba(255,255,255,0.06)",padding:"1.5rem 1rem",position:"sticky",top:56,height:"calc(100vh - 56px)",overflowY:"auto"}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",color:"#5a5955",fontFamily:"Space Grotesk, sans-serif",textTransform:"uppercase" as const,marginBottom:12}}>Étapes du chapitre</div>
        {STEPS.map(s=>{
          const isActive=active===s.id;
          const done=STEPS.findIndex(x=>x.id===s.id)<STEPS.findIndex(x=>x.id===active);
          return <button key={s.id} onClick={()=>setActive(s.id)} style={{display:"flex",alignItems:"center",gap:10,width:"100%",padding:"10px 12px",borderRadius:8,border:`1px solid ${isActive?s.color+"44":"transparent"}`,background:isActive?`${s.color}15`:"transparent",color:isActive?s.color:done?"#5DCAA5":"#5a5955",fontSize:13,fontWeight:isActive?700:400,cursor:"pointer",textAlign:"left" as const,fontFamily:"Space Grotesk, sans-serif",marginBottom:2,transition:"all 0.15s"}}>
            <div style={{width:22,height:22,borderRadius:"50%",background:isActive?s.color:done?"rgba(93,202,165,0.2)":"rgba(255,255,255,0.05)",border:`1px solid ${isActive?s.color:done?"#5DCAA5":"rgba(255,255,255,0.1)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:isActive?"#0d1b2a":done?"#5DCAA5":"#5a5955",flexShrink:0}}>{done&&!isActive?"✓":s.num}</div>
            <span style={{lineHeight:1.3}}>{s.label}</span>
          </button>;
        })}
        <div style={{marginTop:"1.5rem",padding:"0 4px"}}>
          <div style={{fontSize:11,color:"#5a5955",fontFamily:"Space Grotesk, sans-serif",marginBottom:6}}>Progression</div>
          <div style={{height:4,background:"rgba(255,255,255,0.06)",borderRadius:2,overflow:"hidden"}}>
            <div style={{height:"100%",background:"linear-gradient(90deg,#5DCAA5,#D4A017)",borderRadius:2,width:`${((STEPS.findIndex(s=>s.id===active)+1)/STEPS.length)*100}%`,transition:"width 0.4s ease"}}/>
          </div>
        </div>
      </aside>

      {/* Contenu principal */}
      <main style={{padding:isMobile?"1rem 1rem 3rem":"2rem 2rem 4rem",minWidth:0}}>
        <div style={{marginBottom:"1.5rem"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
            <span style={{fontSize:24}}>{currentStep.icon}</span>
            <h2 style={{fontSize:"clamp(18px,3vw,24px)",fontWeight:700,fontFamily:"Syne, sans-serif",color:currentStep.color,margin:0}}>{currentStep.label}</h2>
            <div style={{marginLeft:"auto",fontSize:11,color:"#5a5955",fontFamily:"Space Grotesk, sans-serif",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:6,padding:"2px 8px"}}>{currentStep.num} / 10</div>
          </div>
          <div style={{height:2,background:`linear-gradient(90deg,${currentStep.color}44,transparent)`}}/>
        </div>

        {renderStep(active)}

        {/* Navigation bas de page */}
        <div style={{display:"flex",justifyContent:"space-between",marginTop:"2rem",paddingTop:"1.5rem",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
          {STEPS.findIndex(s=>s.id===active)>0
            ?<button onClick={()=>{const idx=STEPS.findIndex(s=>s.id===active);setActive(STEPS[idx-1].id);window.scrollTo(0,0);}} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"9px 18px",color:"#d0cfc8",fontFamily:"Space Grotesk, sans-serif",fontSize:13,fontWeight:600,cursor:"pointer"}}>← Étape précédente</button>
            :<div/>}
          {STEPS.findIndex(s=>s.id===active)<STEPS.length-1&&
            <button onClick={()=>{const idx=STEPS.findIndex(s=>s.id===active);setActive(STEPS[idx+1].id);window.scrollTo(0,0);}} style={{background:currentStep.color,border:"none",borderRadius:8,padding:"9px 18px",color:"#0d1b2a",fontFamily:"Space Grotesk, sans-serif",fontSize:13,fontWeight:700,cursor:"pointer"}}>Étape suivante →</button>}
        </div>
      </main>
    </div>
  </div>;
}
