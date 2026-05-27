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

const STEPS = [
  { id: "savoir" as StepId,     num: 1,  label: "À savoir pour le bac",   icon: "🎯", color: "#D4A017" },
  { id: "notions" as StepId,    num: 2,  label: "Notions indispensables",  icon: "📐", color: "#7EB8FF" },
  { id: "cours" as StepId,      num: 3,  label: "Le cours en 10 min",      icon: "⚡", color: "#5DCAA5" },
  { id: "mecanismes" as StepId, num: 4,  label: "Mécanismes à maîtriser",  icon: "⚙️", color: "#AFA9EC" },
  { id: "erreurs" as StepId,    num: 5,  label: "Erreurs fréquentes",      icon: "⚠️", color: "#F0997B" },
  { id: "quiz" as StepId,       num: 6,  label: "Quiz",                    icon: "🧠", color: "#97C459" },
  { id: "sujets" as StepId,     num: 7,  label: "Sujets probables",        icon: "📋", color: "#D4A017" },
  { id: "methode" as StepId,    num: 8,  label: "Méthode appliquée",       icon: "✍️", color: "#7EB8FF" },
  { id: "memo" as StepId,       num: 9,  label: "Fiche mémo PDF",          icon: "📄", color: "#5DCAA5" },
  { id: "ressources" as StepId, num: 10, label: "Ressources",              icon: "🎬", color: "#7EB8FF" },
];

const QUIZ = [
  { q: "Quel traité a officiellement créé l'Union Européenne et le marché unique ?", opts: ["Le Traité de Rome (1957)", "L'Acte unique européen (1986)", "Le Traité de Maastricht (1992)", "L'Accord de Schengen (1985)"], correct: 2, fb: "Le Traité de Maastricht (1992) marque la naissance de l'UE et du marché unique basé sur les 4 libertés (biens, services, capitaux, personnes). L'Acte unique (1986) a préparé ce marché, mais c'est Maastricht qui l'a formalisé et officialisé." },
  { q: "Combien de pays composent la zone euro en 2024 ?", opts: ["17 pays", "19 pays", "20 pays", "27 pays"], correct: 2, fb: "La zone euro compte 20 membres depuis janvier 2023, date à laquelle la Croatie a adopté l'euro. Tous les pays de l'UE (27) n'ont pas l'euro : la Pologne, la Suède, la Hongrie, la Tchéquie conservent leur monnaie nationale." },
  { q: "Selon la ZMO (Mundell), quelle condition est indispensable pour qu'une zone monétaire fonctionne face aux chocs asymétriques ?", opts: ["Un taux d'inflation identique dans tous les pays", "Une banque centrale indépendante", "La mobilité des facteurs de production ou un budget fédéral de transfert", "Des droits de douane communs vis-à-vis des pays tiers"], correct: 2, fb: "Mundell (1961) : si des pays renoncent à leur taux de change, il faut des mécanismes alternatifs : mobilité parfaite des travailleurs, flexibilité des salaires, ou budget fédéral permettant des transferts. La zone euro remplit imparfaitement ces critères." },
  { q: "Qu'est-ce qu'un choc asymétrique dans la zone euro ?", opts: ["Une crise mondiale touchant tous les pays de la même façon", "Un événement affectant seulement certains pays ou avec une intensité différente", "Une divergence entre politique monétaire et budgétaire", "Une hausse brutale des taux directeurs de la BCE"], correct: 1, fb: "Un choc asymétrique est un événement qui ne touche qu'un ou quelques pays, ou avec des intensités très différentes. Ex : la crise grecque (2010) ou l'impact différencié de la dépendance au gaz russe lors de la guerre en Ukraine (2022)." },
  { q: "Quel est l'objectif principal de la BCE en matière d'inflation ?", opts: ["0 % d'inflation (stabilité absolue)", "Inflation inférieure mais proche de 2 % à moyen terme", "Inflation entre 1 % et 3 % selon la conjoncture", "Pas d'objectif chiffré"], correct: 1, fb: "La BCE vise une inflation 'inférieure mais proche de 2 %' à moyen terme depuis sa création. Cet objectif a été confirmé lors de la revue stratégique de 2021. Ni la déflation ni une inflation trop élevée ne sont souhaitables." },
  { q: "En quoi consiste le Quantitative Easing (QE) ?", opts: ["La BCE baisse directement les impôts des ménages", "La BCE rachète massivement des titres financiers pour injecter des liquidités et faire baisser les taux à long terme", "Les États coordonnent leurs budgets pour relancer l'économie", "La BCE fixe un plafond sur les crédits des banques commerciales"], correct: 1, fb: "Le QE est une politique monétaire non-conventionnelle : la BCE achète des obligations d'État sur les marchés secondaires → augmente la masse monétaire → fait baisser les taux à long terme. Programme APP : 2,6 trillions € rachetés entre 2015 et 2022. PEPP Covid : 1 850 Mds€." },
  { q: "Les critères de Maastricht imposent de ne pas dépasser :", opts: ["Un déficit de 5 % du PIB et une dette de 80 % du PIB", "Un déficit de 3 % du PIB et une dette de 60 % du PIB", "Un déficit de 2 % du PIB et une dette de 40 % du PIB", "Un déficit de 3 % du PIB, sans contrainte sur la dette"], correct: 1, fb: "Les critères de Maastricht (repris dans le PSC) fixent deux limites : déficit ≤ 3 % du PIB et dette ≤ 60 % du PIB. La France (déficit ~6 %, dette ~112 % en 2024) et de nombreux pays ne les respectent pas, d'où les procédures de déficit excessif." },
  { q: "Qu'est-ce que le 'comportement de passager clandestin' dans le contexte budgétaire européen ?", opts: ["Un pays qui refuse de payer sa contribution au budget de l'UE", "Un État qui profite des effets positifs de la relance de ses voisins sans en supporter lui-même le coût", "Une entreprise contournant les règles de concurrence", "Un pays qui sort discrètement de la zone euro"], correct: 1, fb: "En l'absence de coordination, chaque pays préfère que les autres relancent (en creusant leur déficit) pour en profiter via les exportations, sans supporter le coût. Si tous raisonnent ainsi → personne ne relance = dilemme du prisonnier → austérité généralisée." },
  { q: "Quelle est la principale critique adressée à la politique européenne de la concurrence ?", opts: ["Elle n'est pas assez sévère avec les aides d'État", "Elle empêche l'émergence de 'champions européens' capables d'affronter la concurrence mondiale", "Elle ne concerne que les entreprises privées", "Elle impose des amendes trop faibles"], correct: 1, fb: "La politique de concurrence est critiquée pour bloquer certaines fusions (ex : Alstom-Siemens, 2019) qui auraient créé des géants européens compétitifs face aux firmes américaines (protégées par l'IRA) et chinoises. Cela freine la politique industrielle européenne." },
  { q: "Le rapport Draghi (2024) conclut que l'UE a besoin d'un effort d'investissement annuel supplémentaire de :", opts: ["200 milliards d'euros", "400 milliards d'euros", "800 milliards d'euros", "1 200 milliards d'euros"], correct: 2, fb: "Le rapport Draghi (septembre 2024) est alarmant : l'UE risque de décrocher face aux USA et à la Chine. Il préconise 800 Mds€ d'investissements supplémentaires par an (+5 pts de PIB) pour financer la transition verte, le numérique et la défense. Un appel à une plus grande intégration économique." },
];

// ─── Composants ───────────────────────────────────────────────────────────────
function DefBox({ label, children, color = "blue" }: { label: string; children: React.ReactNode; color?: "teal"|"amber"|"purple"|"coral"|"blue"|"green" }) {
  const p = { teal:{bg:"#0a2a22",border:"#0F6E56",lbl:"#5DCAA5"}, amber:{bg:"#2a1d09",border:"#EF9F27",lbl:"#EF9F27"}, purple:{bg:"#1a1940",border:"#AFA9EC",lbl:"#AFA9EC"}, coral:{bg:"#2a1209",border:"#F0997B",lbl:"#F0997B"}, blue:{bg:"#091e2a",border:"#7EB8FF",lbl:"#7EB8FF"}, green:{bg:"#0d2209",border:"#97C459",lbl:"#97C459"} }[color];
  return <div style={{background:p.bg,border:`1px solid ${p.border}`,borderRadius:10,padding:"14px 16px",marginBottom:"1rem"}}><div style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",color:p.lbl,marginBottom:6,textTransform:"uppercase" as const,fontFamily:"Space Grotesk, sans-serif"}}>{label}</div><div style={{fontSize:14,color:"#d0cfc8",lineHeight:1.7,fontFamily:"Space Grotesk, sans-serif"}}>{children}</div></div>;
}

function STitle({ children, color="#7EB8FF" }: { children: React.ReactNode; color?: string }) {
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

function MecaBox({ steps, color="#7EB8FF" }: { steps:{label:string;text:string}[]; color?:string }) {
  return <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"1.2rem",marginBottom:"1rem"}}>{steps.map((s,i)=><div key={i} style={{display:"flex",gap:12,marginBottom:i<steps.length-1?10:0}}><div style={{width:24,height:24,borderRadius:"50%",background:color,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Syne, sans-serif",fontWeight:700,fontSize:12,color:"#0d1b2a",flexShrink:0}}>{i+1}</div><div><div style={{fontSize:13,fontWeight:600,color:"#e8e6df",fontFamily:"Space Grotesk, sans-serif",marginBottom:2}}>{s.label}</div><div style={{fontSize:12,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",lineHeight:1.5}}>{s.text}</div></div></div>)}</div>;
}

// ─── ÉTAPES ───────────────────────────────────────────────────────────────────

function StepSavoir() {
  return <div>
    <div style={{fontSize:14,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",marginBottom:"1rem"}}>Ce que le jury attend sur ce chapitre au baccalauréat.</div>
    <STitle>Points clés du programme</STitle>
    <CardGrid cards={[
      {badge:"Objectif 1",title:"Marché unique & concurrence",text:"4 libertés (Maastricht). 5 degrés d'intégration (Balassa). 4 volets politique de concurrence : ententes, abus position dominante, concentrations, aides d'État. DMA 2023.",badgeColor:"#D4A017"},
      {badge:"Objectif 2",title:"Politique monétaire BCE",text:"Indépendance + objectif inflation ≈ 2 %. Politique conventionnelle (taux directeurs). Non-conventionnelle (QE, Forward Guidance). Limites : trappe à liquidité.",badgeColor:"#7EB8FF"},
      {badge:"Objectif 3",title:"Politique budgétaire",text:"Relance vs austérité. Multiplicateur keynésien. Critères de Maastricht (3 % / 60 %). Équivalence ricardienne (Barro). Limites du PSC.",badgeColor:"#5DCAA5"},
      {badge:"Objectif 4",title:"Coordination & chocs asymétriques",text:"Passager clandestin / dilemme du prisonnier. ZMO (Mundell, 1961). Chocs asymétriques. Next Generation EU. Rapport Draghi (2024).",badgeColor:"#AFA9EC"},
    ]} />
    <STitle>Auteurs & notions à citer impérativement</STitle>
    <div style={{background:"rgba(212,160,23,0.08)",border:"1px solid rgba(212,160,23,0.3)",borderRadius:10,padding:"14px 16px",marginBottom:"1rem"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.5rem"}}>
        {["Balassa (1961) — 5 degrés d'intégration","Mundell (Nobel 1999) — Zone Monétaire Optimale","Keynes (1936) — Multiplicateur budgétaire","Barro — Équivalence ricardienne","Draghi (2012) — Whatever it takes","Draghi (2024) — Rapport compétitivité (800 Mds€)","Schuman/Monnet — Solidarité de fait","PSC — Pacte de Stabilité et de Croissance"].map((item,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,fontFamily:"Space Grotesk, sans-serif",fontSize:13,color:"#d0cfc8"}}><span style={{color:"#D4A017",flexShrink:0}}>→</span>{item}</div>)}
      </div>
    </div>
    <STitle>Données chiffrées indispensables</STitle>
    <StatGrid stats={[
      {num:"20 pays",label:"Zone euro en 2024 (Croatie entrée en janv. 2023)",color:"#7EB8FF"},
      {num:"3 % / 60 %",label:"Critères de Maastricht (déficit / dette du PIB)",color:"#EF9F27"},
      {num:"800 Mds€",label:"Investissements supplémentaires annuels préconisés par Draghi (2024)",color:"#5DCAA5"},
    ]} />
    <StatGrid stats={[
      {num:"~1 % PIB",label:"Budget communautaire UE (vs ~20 % pour le budget fédéral américain)",color:"#F0997B"},
      {num:"112 %",label:"Dette publique France 2024 (vs plafond de 60 % à Maastricht)",color:"#AFA9EC"},
      {num:"2,25 %",label:"Taux directeur BCE — avril 2025 (après pic à 4,5 % en 2023)",color:"#D4A017"},
    ]} />
    <NoteBox type="actu">🔴 <strong>Actualité 2025 :</strong> Le rapport Draghi (sept. 2024) alerte sur le décrochage de l'UE face aux USA et à la Chine. En 2025, les droits de douane de Trump (jusqu'à 25 % sur les produits européens) renforcent l'urgence d'une réponse européenne unifiée. La Commission européenne négocie des exemptions tout en préparant des contre-mesures.</NoteBox>
  </div>;
}

function StepNotions() {
  return <div>
    <STitle>Intégration économique</STitle>
    <DefBox label="5 degrés d'intégration — Béla Balassa (1961)" color="blue">
      <strong style={{color:"#7EB8FF"}}>1. Zone de libre-échange</strong> : suppression des droits de douane entre membres (ALENA/USMCA)<br/>
      <strong style={{color:"#7EB8FF"}}>2. Union douanière</strong> : tarif extérieur commun vis-à-vis des tiers<br/>
      <strong style={{color:"#7EB8FF"}}>3. Marché commun</strong> : libre circulation des facteurs (travail, capital)<br/>
      <strong style={{color:"#7EB8FF"}}>4. Union économique et monétaire</strong> : politique monétaire unique (zone euro)<br/>
      <strong style={{color:"#7EB8FF"}}>5. Union politique</strong> : gouvernement fédéral commun (non atteint par l'UE)
    </DefBox>
    <DefBox label="Marché unique européen" color="teal">
      Espace sans frontières intérieures reposant sur <strong style={{color:"#5DCAA5"}}>4 libertés fondamentales</strong> (Maastricht, 1992) : libre circulation des <strong style={{color:"#5DCAA5"}}>biens</strong>, des <strong style={{color:"#5DCAA5"}}>services</strong>, des <strong style={{color:"#5DCAA5"}}>capitaux</strong> et des <strong style={{color:"#5DCAA5"}}>personnes</strong>. Plus grand marché intérieur du monde (~450 millions de consommateurs).
    </DefBox>

    <STitle>Politique monétaire</STitle>
    <DefBox label="Politique monétaire (BCE)" color="amber">
      Politique menée par la BCE pour agir sur la <strong style={{color:"#EF9F27"}}>masse monétaire et les taux d'intérêt</strong> afin d'assurer la <strong style={{color:"#EF9F27"}}>stabilité des prix</strong> (inflation ≈ 2 %). Dans la zone euro, elle est <strong style={{color:"#EF9F27"}}>unique</strong> et <strong style={{color:"#EF9F27"}}>indépendante</strong> des gouvernements.
    </DefBox>
    <DefBox label="Quantitative Easing (QE) — assouplissement quantitatif" color="purple">
      Politique monétaire <strong style={{color:"#AFA9EC"}}>non-conventionnelle</strong> : la BCE rachète massivement des obligations d'État aux banques → injecte des liquidités → fait baisser les taux à long terme. Utilisé quand les taux directeurs sont proches de zéro (trappe à liquidité). Programme APP : <strong style={{color:"#AFA9EC"}}>2,6 trillions €</strong> (2015–2022). PEPP Covid : <strong style={{color:"#AFA9EC"}}>1 850 Mds€</strong>.
    </DefBox>

    <STitle>Politique budgétaire & contraintes européennes</STitle>
    <DefBox label="Politique budgétaire" color="green">
      Variation des <strong style={{color:"#97C459"}}>dépenses et recettes publiques</strong> pour agir sur l'activité. Dans l'UE, elle reste du ressort de <strong style={{color:"#97C459"}}>chaque État membre</strong> mais est contrainte par le <strong style={{color:"#97C459"}}>PSC (Pacte de Stabilité et de Croissance)</strong> : déficit ≤ 3 % du PIB, dette ≤ 60 % du PIB.
    </DefBox>
    <DefBox label="Multiplicateur keynésien" color="blue">
      Une hausse des dépenses publiques génère une hausse du PIB <strong style={{color:"#7EB8FF"}}>supérieure</strong> à l'injection initiale. Mécanisme : dépense publique → revenus → consommation → demande → production → revenus… « Effet boule de neige ». <strong style={{color:"#7EB8FF"}}>k = 1 / (1 - propension marginale à consommer)</strong>
    </DefBox>

    <STitle>Coordination & chocs asymétriques</STitle>
    <DefBox label="Choc asymétrique" color="coral">
      Événement économique qui affecte <strong style={{color:"#F0997B"}}>seulement un ou quelques pays</strong> de la zone euro, ou avec une intensité très différente. La politique monétaire unique ne peut pas y répondre de façon adaptée → nécessite des mécanismes alternatifs.
    </DefBox>
    <DefBox label="Zone Monétaire Optimale — ZMO (Mundell, 1961)" color="teal">
      Une zone peut renoncer à son taux de change si elle dispose d'<strong style={{color:"#5DCAA5"}}>ajustements alternatifs</strong> : mobilité parfaite des facteurs (travail/capital), flexibilité des salaires, et/ou budget fédéral permettant des transferts. La zone euro remplit <strong style={{color:"#5DCAA5"}}>imparfaitement</strong> ces critères → zone monétaire non optimale.
    </DefBox>
    <DefBox label="Comportement de passager clandestin" color="amber">
      En l'absence de coordination budgétaire, chaque État préfère <strong style={{color:"#EF9F27"}}>laisser les autres relancer</strong> pour en profiter via les exportations, sans supporter le coût du déficit. Si tous raisonnent ainsi → personne ne relance → <strong style={{color:"#EF9F27"}}>dilemme du prisonnier</strong> → austérité généralisée sous-optimale.
    </DefBox>
  </div>;
}

function StepCours() {
  return <div>
    <STitle>1. Le marché unique et la politique de la concurrence</STitle>
    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"1.2rem",marginBottom:"1rem"}}>
      <div style={{fontSize:12,fontWeight:700,color:"#5a5955",fontFamily:"Space Grotesk, sans-serif",textTransform:"uppercase" as const,marginBottom:12,textAlign:"center" as const}}>Les 4 volets de la politique européenne de la concurrence</div>
      {[
        {num:"1",color:"#F0997B",title:"Lutte contre les ententes (cartels)",text:"Accords entre concurrents pour fixer les prix ou se partager les marchés. Interdits, sauf si bénéfice pour les consommateurs. Amendes jusqu'à 10 % du CA mondial. Ex : cartel des camions → 2,93 Mds€ d'amende (2016)."},
        {num:"2",color:"#AFA9EC",title:"Abus de position dominante",text:"Avoir une position dominante est légal, en abuser non (prix prédateurs, refus de vente). Ex : Google condamné à 2,42 Mds€ (2017). Total des amendes Google : +8 Mds€. DMA (2023) pour les GAFAM."},
        {num:"3",color:"#EF9F27",title:"Contrôle des concentrations",text:"Évaluation ex ante des fusions-acquisitions. Seulement 16 refus sur +6 000 opérations depuis 2000. Polémique : fusion Alstom-Siemens refusée en 2019 → freine les 'champions européens'."},
        {num:"4",color:"#5DCAA5",title:"Contrôle des aides d'État",text:"Subventions, exonérations fiscales qui faussent la concurrence → interdites en principe. Exceptions : R&D, PME, régions défavorisées. Apple → 13 Mds€ remboursés à l'Irlande (2016/2024). Assouplissement pour le Green Deal."},
      ].map((v,i)=><div key={i} style={{display:"flex",gap:12,marginBottom:10}}><div style={{width:24,height:24,borderRadius:"50%",background:v.color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:12,color:"#0d1b2a",flexShrink:0}}>{v.num}</div><div><div style={{fontSize:13,fontWeight:600,color:v.color,fontFamily:"Space Grotesk, sans-serif",marginBottom:2}}>{v.title}</div><div style={{fontSize:12,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",lineHeight:1.5}}>{v.text}</div></div></div>)}
    </div>

    <STitle>2. La politique monétaire de la BCE</STitle>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:"1rem"}}>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(93,202,165,0.3)",borderRadius:10,padding:14}}>
        <div style={{fontSize:12,fontWeight:700,color:"#5DCAA5",fontFamily:"Space Grotesk, sans-serif",marginBottom:8}}>⬇️ Politique de relance (baisse des taux)</div>
        {["BCE baisse ses taux directeurs","Banques baissent leurs taux de crédit","↑ Crédits → ↑ masse monétaire","↑ Consommation + ↑ Investissement","↑ Demande globale → ↑ croissance"].map((s,i)=><div key={i} style={{fontSize:12,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",padding:"3px 0",borderBottom:i<4?"1px solid rgba(255,255,255,0.05)":"none"}}>{i+1}. {s}</div>)}
      </div>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(240,153,123,0.3)",borderRadius:10,padding:14}}>
        <div style={{fontSize:12,fontWeight:700,color:"#F0997B",fontFamily:"Space Grotesk, sans-serif",marginBottom:8}}>⬆️ Politique restrictive (hausse des taux)</div>
        {["BCE hausse ses taux directeurs","Crédit plus cher","↓ Consommation + ↓ Investissement","↓ Demande globale","↓ Inflation → stabilisation des prix"].map((s,i)=><div key={i} style={{fontSize:12,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",padding:"3px 0",borderBottom:i<4?"1px solid rgba(255,255,255,0.05)":"none"}}>{i+1}. {s}</div>)}
      </div>
    </div>
    <NoteBox type="actu">🔴 <strong>Actualité 2022–2025 :</strong> Face à une inflation record (+10,6 % en oct. 2022), la BCE a relevé ses taux de 0 % à 4,5 % entre juillet 2022 et sept. 2023 — hausse la plus rapide de son histoire. Depuis juin 2024, baisse progressive : taux de dépôt à 2,25 % en avril 2025. Exemple parfait de politique monétaire restrictive puis expansionniste.</NoteBox>

    <STitle>3. La politique budgétaire et ses contraintes</STitle>
    <DefBox label="Multiplicateur keynésien — mécanisme" color="amber">
      Une dépense publique de 100 → revenu de 100 → si propension à consommer = 0,8 → consommation de 80 → nouveau revenu de 80 → consommation de 64… Au total : effet multiplicateur = 1/(1-0,8) = <strong style={{color:"#EF9F27"}}>5×</strong>. En pratique, le multiplicateur est plus faible (fuites fiscales, importations).
    </DefBox>
    <NoteBox type="warn">⚠️ <strong>Équivalence ricardienne (Barro) :</strong> Les agents anticipent que le déficit d'aujourd'hui = hausse d'impôts demain. Ils épargnent en conséquence → la relance est neutralisée. Critique tempérée par les biais comportementaux en pratique.</NoteBox>

    <STitle>4. Le problème de coordination : chocs asymétriques et ZMO</STitle>
    <CardGrid cards={[
      {badge:"Exemple — Crise grecque (2010)",title:"Choc de solvabilité",text:"La Grèce subit un choc asymétrique : surendettement, déficit abyssal. Sans pouvoir dévaluer sa monnaie, elle doit subir une austérité sévère imposée par la Troïka (BCE + Commission + FMI).",badgeColor:"#F0997B"},
      {badge:"Exemple — Covid-19 (2020)",title:"Réponse inédite",text:"L'Italie et l'Espagne touchées plus sévèrement. Première dette commune européenne : Next Generation EU (750 Mds€). Suspension temporaire du PSC (2020–2023).",badgeColor:"#EF9F27"},
      {badge:"Exemple — Crise énergétique (2022)",title:"Dépendance au gaz russe",text:"L'Allemagne plus dépendante que l'Espagne. La BCE monte les taux pour tous malgré des besoins divergents. Illustration parfaite du problème de la politique unique face aux chocs asymétriques.",badgeColor:"#AFA9EC"},
    ]} />
  </div>;
}

function StepMecanismes() {
  return <div>
    <STitle>Mécanisme 1 — Le dilemme du prisonnier budgétaire</STitle>
    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"1.2rem",marginBottom:"1rem"}}>
      <div style={{fontSize:12,fontWeight:700,color:"#5a5955",fontFamily:"Space Grotesk, sans-serif",textTransform:"uppercase" as const,marginBottom:12,textAlign:"center" as const}}>Matrice — Gains de chaque pays selon leur politique</div>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,fontFamily:"Space Grotesk, sans-serif",minWidth:300}}>
          <thead><tr><th style={{background:"rgba(255,255,255,0.06)",padding:"8px 12px",textAlign:"left" as const,color:"#8a8880",borderBottom:"1px solid rgba(255,255,255,0.08)"}}></th><th style={{background:"rgba(255,255,255,0.06)",padding:"8px 12px",textAlign:"center" as const,color:"#5DCAA5",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>Pays B : Relance</th><th style={{background:"rgba(255,255,255,0.06)",padding:"8px 12px",textAlign:"center" as const,color:"#F0997B",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>Pays B : Rigueur</th></tr></thead>
          <tbody>
            <tr><td style={{padding:"10px 12px",color:"#5DCAA5",fontWeight:600}}>Pays A : Relance</td><td style={{padding:"10px 12px",textAlign:"center" as const,background:"rgba(93,202,165,0.1)",color:"#5DCAA5",borderRadius:4}}>1/1 ✅ Optimal collectif</td><td style={{padding:"10px 12px",textAlign:"center" as const,background:"rgba(240,153,123,0.1)",color:"#F0997B"}}>-1/2</td></tr>
            <tr><td style={{padding:"10px 12px",color:"#F0997B",fontWeight:600}}>Pays A : Rigueur</td><td style={{padding:"10px 12px",textAlign:"center" as const,background:"rgba(240,153,123,0.1)",color:"#F0997B"}}>2/-1</td><td style={{padding:"10px 12px",textAlign:"center" as const,background:"rgba(239,159,39,0.1)",color:"#EF9F27"}}>0/0 ⚠️ Équilibre réel</td></tr>
          </tbody>
        </table>
      </div>
      <div style={{fontSize:12,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",textAlign:"center" as const,marginTop:10}}>Chaque pays préfère la rigueur (espérant que l'autre relance) → résultat collectif sous-optimal (0/0)</div>
    </div>

    <STitle>Mécanisme 2 — Pourquoi la zone euro n'est pas une ZMO</STitle>
    <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(175,169,236,0.3)",borderRadius:12,padding:"1.2rem",marginBottom:"1rem"}}>
      {[
        {label:"Mobilité du travail limitée",text:"Barrières linguistiques, culturelles, différences de réglementations → un chômeur espagnol ne peut pas facilement s'installer en Allemagne. VS USA : mobilité inter-états forte.",color:"#F0997B"},
        {label:"Rigidité des salaires à la baisse",text:"Conventions collectives, salaires minimums nationaux → les salaires ne s'ajustent pas facilement face à un choc. VS USA : plus grande flexibilité salariale.",color:"#EF9F27"},
        {label:"Budget communautaire insuffisant",text:"~1 % du PIB européen seulement. VS budget fédéral américain : ~20 % du PIB. Pas de vrais transferts automatiques vers les pays en difficulté.",color:"#AFA9EC"},
        {label:"Divergences économiques persistantes",text:"Taux de chômage : Allemagne ~3 % vs Grèce ~10 %. Compétitivité, inflation, croissance très différentes → la même politique monétaire ne convient pas à tous.",color:"#7EB8FF"},
      ].map((v,i)=><div key={i} style={{display:"flex",gap:12,marginBottom:i<3?12:0}}><div style={{width:8,borderRadius:4,background:v.color,flexShrink:0}}/><div><div style={{fontSize:13,fontWeight:600,color:v.color,fontFamily:"Space Grotesk, sans-serif",marginBottom:2}}>{v.label}</div><div style={{fontSize:12,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",lineHeight:1.5}}>{v.text}</div></div></div>)}
    </div>

    <STitle>Mécanisme 3 — Les solutions proposées</STitle>
    <CardGrid cards={[
      {badge:"Solution 1",title:"Budget fédéral européen",text:"Véritable budget commun capable de financer des transferts vers les pays en difficulté. Embryon : Next Generation EU (750 Mds€, 2020). Préconisé par Draghi (2024).",badgeColor:"#7EB8FF"},
      {badge:"Solution 2",title:"Assurance chômage européenne",text:"Fonds commun européen finançant les allocations chômage en cas de forte récession → stabilisateur automatique pour les pays touchés par des chocs asymétriques.",badgeColor:"#AFA9EC"},
      {badge:"Solution 3",title:"Biens publics européens",text:"Financer collectivement la transition verte, la défense, le numérique. Rapport Draghi (2024) : 800 Mds€ annuels supplémentaires pour la compétitivité de l'UE.",badgeColor:"#5DCAA5"},
    ]} />
    <NoteBox type="actu">🔴 <strong>Rapport Draghi (sept. 2024) :</strong> "Révolution copernicienne" nécessaire. L'UE risque de décrocher face aux USA et à la Chine. 800 Mds€/an supplémentaires requis (+5 pts de PIB), marché des capitaux unifié, politique industrielle commune. En 2025, les droits de douane de Trump renforcent l'urgence d'une réponse européenne unifiée.</NoteBox>
  </div>;
}

function StepErreurs() {
  const errors = [
    {wrong:"« La BCE peut mener des politiques budgétaires »",right:"La BCE ne mène QUE la politique monétaire (taux d'intérêt, masse monétaire). La politique budgétaire (dépenses et recettes publiques) reste du ressort de chaque État membre.",color:"#7EB8FF"},
    {wrong:"« L'UE a un budget fédéral comme les États-Unis »",right:"Le budget de l'UE représente ~1 % du PIB européen seulement. Aux États-Unis, le budget fédéral représente ~20 % du PIB. C'est cette différence qui explique l'impossibilité de vrais transferts automatiques en zone euro.",color:"#EF9F27"},
    {wrong:"« Un choc asymétrique touche toute la zone euro de la même façon »",right:"C'est exactement l'inverse : un choc asymétrique touche seulement certains pays ou avec des intensités très différentes. C'est justement ce qui pose problème avec une politique monétaire unique.",color:"#F0997B"},
    {wrong:"« La politique de concurrence européenne interdit les positions dominantes »",right:"Non, avoir une position dominante est légal. Ce sont les ABUS de position dominante qui sont interdits (prix prédateurs, refus de vente, vente liée). Google n'est pas condamné d'être dominant mais d'en abuser.",color:"#AFA9EC"},
    {wrong:"« Le Quantitative Easing, c'est la BCE qui imprime des billets »",right:"Le QE consiste à racheter des titres financiers (obligations d'État) aux banques commerciales sur les marchés secondaires, en créant de la monnaie scripturale. Ce n'est pas de la planche à billets au sens littéral.",color:"#97C459"},
    {wrong:"« Les critères de Maastricht (3 %/60 %) sont toujours respectés »",right:"La France affiche un déficit de ~6 % et une dette de ~112 % du PIB en 2024. La majorité des pays de la zone euro ne respectent pas ces critères. Le PSC a été suspendu pendant le Covid (2020-2023) et réformé en 2024.",color:"#5DCAA5"},
  ];
  return <div>
    <div style={{fontSize:14,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",marginBottom:"1.5rem"}}>Les confusions les plus fréquentes dans les copies de bac.</div>
    {errors.map((e,i)=><div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"14px 16px",marginBottom:"0.75rem"}}>
      <div style={{display:"flex",gap:10,marginBottom:8}}><span style={{fontSize:16,flexShrink:0}}>✗</span><div style={{fontSize:13,color:"#F0997B",fontFamily:"Space Grotesk, sans-serif",fontStyle:"italic"}}>{e.wrong}</div></div>
      <div style={{display:"flex",gap:10}}><span style={{fontSize:16,flexShrink:0,color:e.color}}>✓</span><div style={{fontSize:13,color:"#d0cfc8",fontFamily:"Space Grotesk, sans-serif",lineHeight:1.6}}>{e.right}</div></div>
    </div>)}
  </div>;
}

function StepQuiz() {
  const [qi,setQi] = useState(0);
  const [score,setScore] = useState(0);
  const [answered,setAnswered] = useState(false);
  const [chosen,setChosen] = useState<number|null>(null);
  const [done,setDone] = useState(false);

  function answer(idx:number){if(answered)return;setAnswered(true);setChosen(idx);if(idx===QUIZ[qi].correct)setScore(s=>s+1);}
  function next(){if(qi+1>=QUIZ.length)setDone(true);else{setQi(q=>q+1);setAnswered(false);setChosen(null);}}
  function reset(){setQi(0);setScore(0);setAnswered(false);setChosen(null);setDone(false);}

  if(done){
    const pct=Math.round((score/QUIZ.length)*100);
    const col=pct>=75?"#97C459":pct>=50?"#EF9F27":"#F0997B";
    return <div style={{textAlign:"center" as const,padding:"3rem 1rem"}}>
      <div style={{fontSize:56,fontWeight:700,color:col,fontFamily:"Syne, sans-serif",marginBottom:12}}>{score}/{QUIZ.length}</div>
      <div style={{fontSize:15,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",marginBottom:"2rem"}}>{pct>=75?"🎉 Excellent ! Tu maîtrises bien les politiques européennes.":pct>=50?"👍 Bon début — revois les mécanismes de la ZMO et du QE.":"📚 Reprends les étapes Cours et Mécanismes."}</div>
      <button onClick={reset} style={{background:"#D4A017",color:"#0d1b2a",border:"none",borderRadius:8,padding:"10px 24px",fontFamily:"Space Grotesk, sans-serif",fontWeight:700,fontSize:14,cursor:"pointer"}}>Recommencer</button>
    </div>;
  }

  const q=QUIZ[qi];
  return <div>
    <div style={{fontSize:12,color:"#5a5955",fontFamily:"Space Grotesk, sans-serif",marginBottom:12}}>Question {qi+1} sur {QUIZ.length} · Score : {score}/{qi}</div>
    <div style={{fontSize:15,fontWeight:600,color:"#e8e6df",fontFamily:"Space Grotesk, sans-serif",marginBottom:16,lineHeight:1.5}}>{q.q}</div>
    <div style={{display:"grid",gap:8,marginBottom:"1rem"}}>
      {q.opts.map((opt,i)=>{
        let bg="rgba(255,255,255,0.04)",border="rgba(255,255,255,0.08)",color="#d0cfc8";
        if(answered){if(i===q.correct){bg="rgba(151,196,89,0.15)";border="#97C459";color="#97C459";}else if(i===chosen){bg="rgba(240,153,123,0.15)";border="#F0997B";color="#F0997B";}}
        return <button key={i} onClick={()=>answer(i)} disabled={answered} style={{textAlign:"left" as const,padding:"12px 14px",border:`1px solid ${border}`,borderRadius:8,background:bg,color,fontFamily:"Space Grotesk, sans-serif",fontSize:13,cursor:answered?"default":"pointer"}}>{opt}</button>;
      })}
    </div>
    {answered&&<div style={{background:"#2a1d09",border:"1px solid #EF9F27",borderRadius:8,padding:"12px 14px",fontSize:13,color:"#EF9F27",lineHeight:1.7,fontFamily:"Space Grotesk, sans-serif",marginBottom:"1rem"}}>{q.fb}</div>}
    {answered&&<div style={{textAlign:"right" as const}}><button onClick={next} style={{background:"#D4A017",color:"#0d1b2a",border:"none",borderRadius:8,padding:"9px 20px",fontFamily:"Space Grotesk, sans-serif",fontWeight:700,fontSize:13,cursor:"pointer"}}>{qi===QUIZ.length-1?"Voir mon résultat":"Question suivante →"}</button></div>}
  </div>;
}

function StepSujets() {
  const sujets = [
    {type:"Dissertation",title:"Dans quelle mesure la politique monétaire de la BCE permet-elle de répondre aux déséquilibres économiques de la zone euro ?",hint:"Thèse : efficacité de la politique conventionnelle + QE. Antithèse : politique unique face à des économies diverses, chocs asymétriques, trappe à liquidité. Synthèse : nécessité de compléter par des politiques budgétaires coordonnées.",color:"#7EB8FF"},
    {type:"Dissertation",title:"Les politiques économiques européennes sont-elles efficaces pour faire face aux crises ?",hint:"Thèse : réponses BCE (QE, PEPP) + Next Generation EU. Antithèse : défaut de coordination, passager clandestin, ZMO non optimale, PSC contraignant. Synthèse : vers plus d'intégration (Draghi).",color:"#5DCAA5"},
    {type:"EC3",title:"À l'aide du dossier, vous montrerez que la zone euro fait face à des difficultés de coordination des politiques économiques.",hint:"Axe 1 : politique monétaire unique inadaptée aux chocs asymétriques (ZMO). Axe 2 : passager clandestin dans la politique budgétaire. Attentes : exemples chiffrés + auteurs.",color:"#EF9F27"},
    {type:"EC3",title:"Vous analyserez les avantages et les limites de la politique européenne de la concurrence.",hint:"Avantages : baisse des prix, innovation, protection des consommateurs. Limites : frein aux champions européens, GAFAM difficiles à réguler, tension avec politique industrielle (Alstom-Siemens). DMA.",color:"#AFA9EC"},
    {type:"EC2 — Mobilisation",title:"Expliquez pourquoi la zone euro n'est pas une zone monétaire optimale au sens de Mundell.",hint:"Définition ZMO. 3 critères manquants : mobilité, flexibilité salariale, budget fédéral. Conséquences : chocs asymétriques non résorbés. 6-8 lignes.",color:"#97C459"},
    {type:"EC2 — Mobilisation",title:"Présentez le mécanisme du multiplicateur keynésien et ses limites dans le cadre européen.",hint:"Définition + mécanisme (boucle de consommation). Limites : équivalence ricardienne, fuites (importations), contrainte PSC. 6-8 lignes.",color:"#F0997B"},
  ];
  return <div>
    <div style={{fontSize:14,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",marginBottom:"1.5rem"}}>Sujets tombés ou très probables d'après l'analyse du programme et des annales.</div>
    {sujets.map((s,i)=><div key={i} style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${s.color}44`,borderLeft:`3px solid ${s.color}`,borderRadius:10,padding:"14px 16px",marginBottom:"0.75rem"}}>
      <div style={{display:"inline-block",fontSize:10,fontWeight:700,letterSpacing:"0.06em",color:s.color,marginBottom:6,fontFamily:"Space Grotesk, sans-serif",textTransform:"uppercase" as const}}>{s.type}</div>
      <div style={{fontSize:14,fontWeight:600,color:"#e8e6df",fontFamily:"Space Grotesk, sans-serif",marginBottom:8,lineHeight:1.4}}>{s.title}</div>
      <div style={{fontSize:12,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",lineHeight:1.5}}>💡 {s.hint}</div>
    </div>)}
  </div>;
}

function StepMethode() {
  return <div>
    <STitle>Méthode EC2 — Mobilisation des connaissances</STitle>
    <NoteBox>💡 L'exercice EC2 mobilisation demande d'expliquer un mécanisme en 6–8 lignes, sans document. Définition → mécanisme → exemple chiffré → nuance.</NoteBox>
    <div style={{marginBottom:"1.5rem"}}>
      <div style={{fontSize:14,fontWeight:700,color:"#D4A017",fontFamily:"Space Grotesk, sans-serif",marginBottom:10}}>Sujet-type : « Expliquez pourquoi la zone euro n'est pas une zone monétaire optimale »</div>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"16px",fontFamily:"Space Grotesk, sans-serif"}}>
        {[
          {step:"① Définir le concept",color:"#7EB8FF",text:"La notion de Zone Monétaire Optimale (ZMO) a été théorisée par l'économiste canadien Robert Mundell dans un article de 1961. Selon lui, un ensemble de pays peut renoncer à leur taux de change national et adopter une monnaie commune sans coût si trois conditions alternatives sont réunies : la mobilité parfaite des facteurs de production (travail et capital), la flexibilité des salaires à la baisse, et l'existence d'un budget fédéral permettant des transferts automatiques vers les pays en difficulté."},
          {step:"② Montrer que la zone euro remplit imparfaitement ces critères",color:"#5DCAA5",text:"Or la zone euro remplit imparfaitement ces trois conditions. La mobilité du travail y est freinée par les barrières linguistiques, culturelles et les différences de réglementation du travail entre États membres : un chômeur espagnol ne s'installe pas facilement en Allemagne. Les salaires sont rigides à la baisse, protégés par les conventions collectives et les SMIC nationaux. Enfin, le budget communautaire représente seulement environ 1 % du PIB européen, contre 20 % pour le budget fédéral américain, ce qui ne permet pas de transferts significatifs."},
          {step:"③ Illustrer par un exemple récent et chiffré",color:"#EF9F27",text:"La crise grecque (2010-2015) illustre parfaitement les conséquences de cette non-optimalité. La Grèce a subi un choc asymétrique (surendettement) sans pouvoir dévaluer sa monnaie ni bénéficier de transferts automatiques suffisants. Elle a dû s'engager dans une austérité sévère imposée par la Troïka, entraînant une chute de 25 % de son PIB et un chômage atteignant 27 % en 2013."},
          {step:"④ Nuancer",color:"#AFA9EC",text:"Des avancées ont été réalisées : le plan Next Generation EU (750 Mds€ en 2020) constitue un embryon de budget fédéral, et la BCE a développé des outils non-conventionnels (QE, OMT). Mais le rapport Draghi (2024) juge ces progrès insuffisants et appelle à une intégration économique beaucoup plus poussée."},
        ].map((item,i)=><div key={i} style={{marginBottom:14}}><div style={{fontSize:11,fontWeight:700,color:item.color,letterSpacing:"0.06em",marginBottom:4}}>{item.step}</div><div style={{fontSize:13,color:"#d0cfc8",lineHeight:1.7}}>{item.text}</div></div>)}
      </div>
    </div>
    <STitle>Méthode Dissertation — Plan type</STitle>
    <div style={{display:"grid",gap:8}}>
      {[
        {num:"I",title:"Des politiques économiques contraintes par le cadre européen",color:"#7EB8FF",sous:["A. Le marché unique et la politique de la concurrence : cadre structurel","B. La politique monétaire unique de la BCE : objectifs et instruments","C. Les contraintes budgétaires : PSC et critères de Maastricht"]},
        {num:"II",title:"Des politiques face aux déséquilibres : limites et tensions",color:"#F0997B",sous:["A. La zone euro, une ZMO imparfaite : chocs asymétriques non résorbés","B. Le défaut de coordination budgétaire : passager clandestin et dilemme du prisonnier","C. Tensions entre politique de concurrence et politique industrielle"]},
        {num:"III",title:"Vers plus d'intégration économique : solutions et perspectives",color:"#97C459",sous:["A. Les réponses à la crise : QE, Next Generation EU, suspension du PSC","B. Le rapport Draghi (2024) : appel à une révolution de la gouvernance européenne","C. Les obstacles politiques à une fédéralisation plus poussée"]},
      ].map((part,i)=><div key={i} style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${part.color}44`,borderRadius:10,padding:14}}>
        <div style={{fontSize:13,fontWeight:700,color:part.color,fontFamily:"Space Grotesk, sans-serif",marginBottom:8}}>{part.num}. {part.title}</div>
        {part.sous.map((s,j)=><div key={j} style={{fontSize:12,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",marginBottom:4,paddingLeft:12}}>{["A","B","C"][j]}. {s}</div>)}
      </div>)}
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
      {["5 degrés d'intégration de Balassa","4 volets de la politique de concurrence","Mécanismes BCE : conventionnel + QE","Critères de Maastricht (3 % / 60 %)","Multiplicateur keynésien + équivalence ricardienne","ZMO de Mundell + chocs asymétriques","Auteurs clés + données 2025"].map((item,i)=><div key={i} style={{display:"flex",gap:8,fontSize:13,color:"#d0cfc8",fontFamily:"Space Grotesk, sans-serif",marginBottom:6}}><span style={{color:"#5DCAA5"}}>✓</span>{item}</div>)}
    </div>
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px dashed rgba(255,255,255,0.15)",borderRadius:10,padding:"12px 28px",display:"inline-block",color:"#5a5955",fontFamily:"Space Grotesk, sans-serif",fontSize:14}}>📥 Fiche mémo PDF — bientôt disponible</div>
  </div>;
}

function StepRessources() {
  return <div>
    <div style={{fontSize:14,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",marginBottom:"1.5rem"}}>Ressources complémentaires pour approfondir et mémoriser le chapitre.</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12}}>
      {[
        {icon:"🎬",label:"Cours vidéo",desc:"La vidéo de révision sur les politiques européennes sera disponible prochainement.",color:"#7EB8FF"},
        {icon:"🗺️",label:"Carte mentale",desc:"Visualise toutes les connexions entre les institutions et politiques européennes.",color:"#D4A017"},
        {icon:"📊",label:"Infographie",desc:"Le triangle BCE / politique budgétaire / coordination en schéma.",color:"#5DCAA5"},
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
export default function PolitiquesEuropeennesPage() {
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

    <nav style={{position:"sticky",top:0,zIndex:50,background:"rgba(13,27,42,0.95)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255,255,255,0.08)",padding:"0 1.5rem",height:56,display:"flex",alignItems:"center",gap:16}}>
      <a href="/" style={{fontSize:18,fontWeight:800,fontFamily:"Syne, sans-serif",color:"#D4A017",textDecoration:"none"}}>CapSES</a>
      <span style={{color:"rgba(255,255,255,0.2)"}}>›</span>
      <span style={{fontSize:13,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif"}}>Terminale</span>
      <span style={{color:"rgba(255,255,255,0.2)"}}>›</span>
      <span style={{fontSize:13,color:"#d0cfc8",fontFamily:"Space Grotesk, sans-serif"}}>Politiques européennes</span>
      <div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
        <div style={{width:10,height:10,borderRadius:"50%",background:"#D4A017",animation:"pulse 2s infinite"}}/>
        <span style={{fontSize:11,color:"#D4A017",fontFamily:"Space Grotesk, sans-serif",fontWeight:600}}>{STEPS.findIndex(s=>s.id===active)+1}/{STEPS.length}</span>
      </div>
    </nav>

    <div style={{background:"linear-gradient(135deg,#0a1e36 0%,#0d1b2a 60%,#0a2a1a 100%)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"2rem 1.5rem 1.5rem",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-60,right:-60,width:200,height:200,background:"radial-gradient(circle,rgba(93,202,165,0.06) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"inline-block",fontSize:10,fontWeight:700,letterSpacing:"0.12em",padding:"3px 10px",borderRadius:20,background:"rgba(93,202,165,0.15)",color:"#5DCAA5",border:"1px solid rgba(93,202,165,0.3)",marginBottom:10,fontFamily:"Space Grotesk, sans-serif",textTransform:"uppercase" as const}}>Économie · Terminale SES</div>
        <h1 style={{fontSize:"clamp(22px,4vw,32px)",fontWeight:800,fontFamily:"Syne, sans-serif",color:"#f0ece0",margin:0,lineHeight:1.2,marginBottom:8}}>
          Quelles politiques économiques<br/>dans le cadre européen ?
        </h1>
        <div style={{fontSize:13,color:"#5a5955",fontFamily:"Space Grotesk, sans-serif"}}>Programme Éduscol 2020 · 10 étapes de révision · Actualisé 2025</div>
      </div>
    </div>

    <div className="hide-sb" style={{display:"flex",overflowX:"auto",gap:6,padding:"0.75rem 1rem",borderBottom:"1px solid rgba(255,255,255,0.06)",background:"rgba(0,0,0,0.2)"}}>
      {STEPS.map(s=><button key={s.id} onClick={()=>setActive(s.id)} style={{flexShrink:0,padding:"6px 12px",borderRadius:8,border:`1px solid ${active===s.id?s.color:"rgba(255,255,255,0.08)"}`,background:active===s.id?`${s.color}22`:"transparent",color:active===s.id?s.color:"#5a5955",fontSize:12,fontWeight:active===s.id?700:400,cursor:"pointer",fontFamily:"Space Grotesk, sans-serif",whiteSpace:"nowrap" as const}}>{s.icon} {s.label}</button>)}
    </div>

    <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:isMobile?"1fr":"240px 1fr",minHeight:"calc(100vh - 200px)"}}>
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
