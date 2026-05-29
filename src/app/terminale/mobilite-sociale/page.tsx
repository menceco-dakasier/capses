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
  { q:"Un fils d'ouvrier devient médecin généraliste. De quelle(s) forme(s) de mobilité s'agit-il ?", opts:["Mobilité horizontale uniquement","Mobilité intergénérationnelle ascendante","Reproduction sociale","Mobilité intragénérationnelle uniquement"], correct:1, fb:"C'est une mobilité intergénérationnelle (on compare la position du fils à celle du père) et ascendante (médecin est considéré supérieur à ouvrier dans la hiérarchie sociale). La mobilité intragénérationnelle compare la position d'un individu à différents moments de sa propre vie." },
  { q:"Selon l'INSEE 2024, quel pourcentage des fils de père employé ou ouvrier peu qualifié devient cadre ?", opts:["Environ 40 %","Environ 25 %","Environ 13 %","Environ 3 %"], correct:2, fb:"Seulement 13 % des fils de père employé ou ouvrier peu qualifié deviennent cadres (INSEE 2024). 37 % deviennent employés ou ouvriers qualifiés — la mobilité ascendante se fait surtout à courte distance sociale." },
  { q:"Dans une société d'égalité parfaite des chances, l'odds ratio est de :", opts:["0","1","10","100"], correct:1, fb:"L'odds ratio = 1 signifie que l'origine sociale n'a aucun impact sur les chances d'accéder à une position donnée. En France (enquête FQP 2014-2015), l'odds ratio cadre/ouvrier est d'environ 27,6 — très loin de l'égalité parfaite." },
  { q:"Pourquoi la mobilité ascendante des femmes par rapport à leur mère est-elle plus élevée que celle des hommes par rapport à leur père ?", opts:["Parce que les femmes sont plus diplômées aujourd'hui","Parce que l'école avantage structurellement les filles","Parce que les mères occupaient des emplois moins valorisés — effet de structure","Parce que les inégalités de genre ont totalement disparu"], correct:2, fb:"C'est un effet de structure : les mères de la génération précédente occupaient en moyenne des emplois moins valorisés. Comparer les femmes à leur père réduit la mobilité ascendante à seulement 25 % — bien moins que par rapport à la mère. La comparaison mère-fille surestime donc les progrès réels en matière d'égalité des chances." },
  { q:"Selon Bourdieu, pourquoi l'école ne garantit-elle pas l'égalité des chances ?", opts:["Parce que les professeurs favorisent les élèves riches consciemment","Parce qu'elle valorise des compétences inégalement transmises selon l'origine sociale","Parce que les frais de scolarité sont trop élevés","Parce que les diplômes ne sont pas reconnus sur le marché du travail"], correct:1, fb:"Bourdieu montre que l'école reconnaît comme compétences scolaires des aptitudes (sens de l'abstraction, langage soutenu, culture générale) transmises très inégalement selon l'origine sociale. Le capital culturel familial joue donc un rôle déterminant dans la réussite scolaire, indépendamment des capacités intrinsèques des élèves." },
  { q:"Quelle est la formule correcte pour décomposer la mobilité ?", opts:["Mobilité brute = mobilité nette − mobilité structurelle","Mobilité nette = mobilité brute + mobilité structurelle","Mobilité brute = mobilité nette + mobilité structurelle","Mobilité structurelle = mobilité brute × mobilité nette"], correct:2, fb:"Mobilité brute = mobilité nette + mobilité structurelle. La mobilité structurelle est due aux transformations de la structure des emplois (déclin agricole, essor des cadres). La mobilité nette mesure les inégalités des chances réelles, indépendamment de ces transformations structurelles." },
  { q:"En 2023-2024 (INSEE), quel est le taux de mobilité sociale des femmes par rapport à leur mère ?", opts:["45 %","55 %","66 %","80 %"], correct:2, fb:"En 2023-2024, selon l'INSEE, 66 % des femmes actives sont en mobilité sociale par rapport à leur mère, contre 63 % des hommes par rapport à leur père. La mobilité ascendante représente 48 % pour les femmes (vs mère) et 39 % pour les hommes (vs père)." },
  { q:"Qu'est-ce que la table de destinée ?", opts:["Elle indique d'où viennent les individus d'une catégorie sociale donnée","Elle indique ce que sont devenus les enfants d'une catégorie sociale donnée","Elle mesure la fluidité sociale par les odds ratios","Elle compare la mobilité entre pays"], correct:1, fb:"La table de destinée répond à la question : « Que sont devenus les enfants d'une catégorie ? » Elle se lit du passé vers le présent (ex : 30,9 % des fils d'agriculteurs sont devenus ouvriers). La table de recrutement fait l'inverse : elle indique d'où viennent les individus d'une catégorie." },
  { q:"Qu'est-ce que le déclassement scolaire selon Camille Peugny ?", opts:["Le fait qu'un diplôme de bac+5 ne garantit plus l'accès à un emploi de cadre","Le fait d'occuper une position inférieure à celle de ses parents malgré un diplôme plus élevé","La baisse générale du niveau scolaire","Le refus de s'orienter vers les filières professionnelles"], correct:1, fb:"Pour Peugny (Le déclassement, 2009), le déclassement désigne la situation d'individus qui, malgré un niveau de diplôme supérieur à celui de leurs parents, occupent une position sociale inférieure. Ce phénomène touche notamment les enfants des classes moyennes. Il remet en question la méritocratie scolaire." },
  { q:"Qu'est-ce que la reproduction sociale selon Bourdieu ?", opts:["Le fait que toutes les positions sociales se transmettent à l'identique","Le processus par lequel les positions sociales tendent à se perpétuer d'une génération à l'autre, notamment via les capitaux culturel, économique et social","La stabilité de la structure démographique d'une société","La transmission biologique des traits de caractère"], correct:1, fb:"La reproduction sociale (Bourdieu, La Reproduction, 1970) désigne le processus par lequel les positions sociales tendent à se perpétuer d'une génération à l'autre. L'école joue un rôle paradoxal : censée favoriser l'égalité des chances, elle contribue en réalité à légitimer et reproduire les inégalités sociales via la transmission différentielle des capitaux." },
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
    <NoteBox type="success">🧠 <strong>Quiz de révision — Mobilité sociale</strong> · {QUIZ.length} questions pour tester tes connaissances.</NoteBox>
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
    <NoteBox type="actu">🔴 <strong>Chiffres clés INSEE 2023-2024 :</strong> <strong>63 %</strong> des hommes sont en mobilité sociale par rapport à leur père, <strong>66 %</strong> des femmes par rapport à leur mère. Mobilité ascendante : <strong>39 %</strong> pour les hommes, <strong>48 %</strong> pour les femmes (vs mère). Seulement <strong>13 %</strong> des fils d'employés/ouvriers peu qualifiés deviennent cadres.</NoteBox>
    <STitle>Points clés du programme</STitle>
    <CardGrid cards={[
      {badge:"Objectif 1",title:"Formes de mobilité",text:"Distinguer mobilité inter/intragénérationnelle, ascendante/descendante, horizontale. Définir la reproduction sociale. Maîtriser table de recrutement vs table de destinée.",badgeColor:"#D4A017"},
      {badge:"Objectif 2",title:"Mesurer la mobilité",text:"Mobilité brute = mobilité structurelle + mobilité nette. Fluidité sociale et odds ratios. Limites des tables de mobilité (genre, statut des professions).",badgeColor:"#7EB8FF"},
      {badge:"Objectif 3",title:"Facteurs de mobilité",text:"Mobilité structurelle (transformations du marché du travail). 3 capitaux de Bourdieu (culturel, économique, social). Rôle du diplôme. Configurations familiales (Beaud).",badgeColor:"#5DCAA5"},
      {badge:"Objectif 4",title:"Déclassement & débats",text:"Déclassement scolaire (Peugny). Effet de structure pour les femmes. Fluidité stagnante depuis 2003. Limites de la méritocratie.",badgeColor:"#AFA9EC"},
    ]} />
    <STitle>Auteurs & notions à citer impérativement</STitle>
    <div style={{background:"rgba(212,160,23,0.08)",border:"1px solid rgba(212,160,23,0.3)",borderRadius:10,padding:"14px 16px",marginBottom:"1rem"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.5rem"}}>
        {["Bourdieu — La Reproduction (1970), 3 capitaux","Bourdieu — La Distinction (1979), espace social","Peugny — Le Déclassement (2009)","Stéphane Beaud — configurations familiales","INSEE — enquête Emploi 2024","INSEE Première n°2068 (2025) — salariés/indépendants","FQP 2014-2015 — odds ratio cadre/ouvrier = 27,6","Goux & Maurin — stabilité de la fluidité sociale"].map((item,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,fontFamily:"Space Grotesk, sans-serif",fontSize:13,color:"#d0cfc8"}}><span style={{color:"#D4A017",flexShrink:0}}>→</span>{item}</div>)}
      </div>
    </div>
    <STitle>Données chiffrées indispensables</STitle>
    <StatGrid stats={[
      {num:"63 %",label:"Hommes en mobilité vs père (INSEE 2023-24)",color:"#7EB8FF"},
      {num:"66 %",label:"Femmes en mobilité vs mère (INSEE 2023-24)",color:"#AFA9EC"},
      {num:"27,6",label:"Odds ratio cadre vs ouvrier (FQP 2014-2015)",color:"#F0997B"},
    ]} />
    <StatGrid stats={[
      {num:"13 %",label:"Fils d'ouvriers/employés peu qualifiés devenus cadres",color:"#D4A017"},
      {num:"3,1×",label:"Un fils de cadre est 3,1× plus souvent cadre qu'un fils d'ouvrier qualifié",color:"#5DCAA5"},
      {num:"25 %",label:"Mobilité ascendante des femmes comparées à leur père (vs 48 % vs mère)",color:"#F0997B"},
    ]} />
  </div>;
}

function StepNotions() {
  return <div>
    <STitle>La mobilité sociale — définitions fondamentales</STitle>
    <DefBox label="Mobilité sociale" color="blue">
      Changement de <strong style={{color:"#7EB8FF"}}>position sociale ou de statut social</strong> des individus au sein d'une société. Son analyse permet d'apprécier le degré de <strong style={{color:"#7EB8FF"}}>démocratie et de méritocratie</strong> d'une société : dans un idéal méritocratique, les positions dépendent des mérites individuels et non de l'origine sociale.
    </DefBox>
    <DefBox label="Mobilité intergénérationnelle" color="teal">
      Changement de position par rapport aux <strong style={{color:"#5DCAA5"}}>parents</strong>. Objet principal des analyses sociologiques. Ex : un fils d'ouvrier qui devient cadre. Se mesure principalement à travers les tables de mobilité.
    </DefBox>
    <DefBox label="Mobilité intragénérationnelle" color="blue">
      Changement de position au cours de la <strong style={{color:"#7EB8FF"}}>propre vie</strong> d'un individu. Ex : un employé qui devient cadre après 15 ans d'expérience. Synonyme de mobilité professionnelle.
    </DefBox>
    <DefBox label="Reproduction sociale" color="coral">
      L'individu occupe la <strong style={{color:"#F0997B"}}>même position sociale que ses parents</strong>. Plus forte chez les cadres (auto-recrutement), les employés et les ouvriers. Apparaît sur la diagonale des tables de destinée. Théorisée par Bourdieu (<em>La Reproduction</em>, 1970).
    </DefBox>
    <DefBox label="Déclassement" color="amber">
      Fait d'occuper une position sociale <strong style={{color:"#EF9F27"}}>inférieure à celle de ses parents</strong>, malgré un niveau de diplôme souvent plus élevé (Camille Peugny, <em>Le Déclassement</em>, 2009). Touche notamment les enfants des classes moyennes. Remet en question la promesse méritocratique de l'école.
    </DefBox>
    <STitle>Mesure de la mobilité</STitle>
    <DefBox label="Table de recrutement (origine)" color="blue">
      Répond à la question : <strong style={{color:"#7EB8FF"}}>« D'où viennent les individus d'une catégorie ? »</strong> Se lit du présent vers le passé. Ex : 37 % des professions intermédiaires (40-59 ans) sont fils d'ouvriers.
    </DefBox>
    <DefBox label="Table de destinée" color="teal">
      Répond à la question : <strong style={{color:"#5DCAA5"}}>« Que sont devenus les enfants d'une catégorie ? »</strong> Se lit du passé vers le présent. Ex : 30,9 % des fils d'agriculteurs exploitants sont devenus ouvriers.
    </DefBox>
    <DefBox label="Mobilité brute / structurelle / nette" color="amber">
      <strong style={{color:"#EF9F27"}}>Mobilité brute</strong> (observée) = tout changement de position mesuré dans les tables.<br/>
      <strong style={{color:"#EF9F27"}}>Mobilité structurelle</strong> = part due aux transformations de la structure des emplois (déclin agricole, essor des cadres). Mécanique, ne reflète pas l'égalité des chances.<br/>
      <strong style={{color:"#EF9F27"}}>Mobilité nette</strong> (fluidité) = mobilité brute − mobilité structurelle. Mesure les inégalités des chances réelles.
    </DefBox>
    <DefBox label="Fluidité sociale & odds ratios" color="purple">
      La <strong style={{color:"#AFA9EC"}}>fluidité sociale</strong> mesure la mobilité <em>relative</em> : la probabilité d'atteindre un groupe social en fonction des origines, <em>indépendamment</em> des transformations structurelles. Elle se mesure par les <strong style={{color:"#AFA9EC"}}>odds ratios</strong> (rapports des chances relatives). Dans une société d'égalité parfaite des chances, l'odds ratio = <strong style={{color:"#AFA9EC"}}>1</strong>. En France (FQP 2014-2015) : odds ratio cadre/ouvrier ≈ <strong style={{color:"#AFA9EC"}}>27,6</strong>.
    </DefBox>
  </div>;
}

function StepCours() {
  return <div>
    <STitle>1. Les formes de mobilité sociale</STitle>
    <CardGrid cards={[
      {badge:"GÉOGRAPHIQUE",title:"Mobilité géographique",text:"Changement de lieu de résidence. Se combine souvent avec la mobilité professionnelle. Les personnes ayant déménagé déclarent plus souvent un statut plus élevé.",badgeColor:"#5DCAA5"},
      {badge:"INTRAGÉNÉR.",title:"Mobilité professionnelle",text:"Changement de profession au cours d'une vie (carrière). Ex : promotion, changement d'entreprise, reconversion.",badgeColor:"#7EB8FF"},
      {badge:"INTERGÉNÉR.",title:"Mobilité intergénérationnelle",text:"Changement de position par rapport aux parents. Objet principal des analyses. Ex : un fils d'ouvrier qui devient cadre.",badgeColor:"#AFA9EC"},
      {badge:"ASCENDANTE ↑",title:"Promotion sociale",text:"Ascension dans la hiérarchie sociale. Ex : employé → cadre. La plus étudiée car indicateur de méritocratie.",badgeColor:"#97C459"},
      {badge:"DESCENDANTE ↓",title:"Déclassement",text:"Descente dans la hiérarchie sociale. Souvent subi malgré un niveau de diplôme plus élevé que les parents (Peugny).",badgeColor:"#F0997B"},
      {badge:"HORIZONTALE →",title:"Mobilité horizontale",text:"Trajectoire entre catégories du même niveau social, sans changement de statut clair. Difficile à interpréter.",badgeColor:"#D4A017"},
    ]} />
    <NoteBox type="info">⚠️ <strong>À ne pas confondre :</strong> une hausse de la <strong>mobilité observée</strong> (brute) n'implique pas nécessairement une hausse de l'<strong>égalité des chances</strong>. C'est pourquoi les sociologues distinguent la mobilité brute de la fluidité sociale (mobilité relative), mesurée par les odds ratios.</NoteBox>

    <STitle>2. Mesurer la mobilité : les tables et leurs limites</STitle>
    <div style={{overflowX:"auto" as const}}>
      <table style={{width:"100%",borderCollapse:"collapse" as const,fontSize:13,fontFamily:"Space Grotesk, sans-serif",marginBottom:"1rem"}}>
        <thead><tr>{["Type","Question posée","Sens de lecture","Exemple"].map(h=><th key={h} style={{background:"rgba(255,255,255,0.04)",padding:"9px 12px",textAlign:"left" as const,fontWeight:600,color:"#5a5955",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>{h}</th>)}</tr></thead>
        <tbody>
          <tr>
            <td style={{padding:"9px 12px",borderBottom:"1px solid rgba(255,255,255,0.05)",color:"#7EB8FF",fontWeight:600}}>Recrutement (origine)</td>
            <td style={{padding:"9px 12px",borderBottom:"1px solid rgba(255,255,255,0.05)",color:"#d0cfc8"}}>D'où viennent les individus d'une catégorie ?</td>
            <td style={{padding:"9px 12px",borderBottom:"1px solid rgba(255,255,255,0.05)",color:"#8a8880"}}>Présent → passé<br/><em>« Que faisait le père ? »</em></td>
            <td style={{padding:"9px 12px",borderBottom:"1px solid rgba(255,255,255,0.05)",color:"#8a8880"}}>37 % des professions intermédiaires (40-59 ans) sont fils d'ouvriers</td>
          </tr>
          <tr>
            <td style={{padding:"9px 12px",color:"#5DCAA5",fontWeight:600}}>Destinée</td>
            <td style={{padding:"9px 12px",color:"#d0cfc8"}}>Que sont devenus les enfants d'une catégorie ?</td>
            <td style={{padding:"9px 12px",color:"#8a8880"}}>Passé → présent<br/><em>« Que sont devenus les fils de… ? »</em></td>
            <td style={{padding:"9px 12px",color:"#8a8880"}}>30,9 % des fils d'agriculteurs exploitants sont devenus ouvriers</td>
          </tr>
        </tbody>
      </table>
    </div>

    <STitle color="#F0997B">Limites des tables de mobilité</STitle>
    {[
      {titre:"Évolution du statut des professions",txt:"Un instituteur du XIXe siècle avait un prestige bien supérieur à un professeur des écoles aujourd'hui. Une immobilité apparente peut masquer un déclassement réel."},
      {titre:"Nombre de catégories",txt:"Plus on multiplie les catégories, plus on mesure de mobilité. L'outil influence l'objet étudié."},
      {titre:"Centrage longtemps sur les hommes",txt:"Pendant longtemps, seuls les hommes étaient étudiés (fort taux d'inactivité des mères dans les générations précédentes), rendant la comparaison mère-fille difficile."},
    ].map((item,i)=><div key={i} style={{display:"flex",gap:12,marginBottom:10,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,padding:"10px 14px"}}><div style={{width:22,height:22,borderRadius:"50%",background:"#EF9F27",color:"#0d1b2a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0,fontFamily:"Space Grotesk, sans-serif"}}>!</div><div><div style={{fontSize:13,fontWeight:600,color:"#e8e6df",fontFamily:"Space Grotesk, sans-serif",marginBottom:2}}>{item.titre}</div><div style={{fontSize:12,color:"#8a8880",lineHeight:1.5,fontFamily:"Space Grotesk, sans-serif"}}>{item.txt}</div></div></div>)}

    <STitle>3. Les facteurs de la mobilité sociale</STitle>
    <DefBox label="Facteur 1 — La mobilité structurelle" color="teal">
      La transformation du marché du travail génère <strong style={{color:"#5DCAA5"}}>mécaniquement</strong> de la mobilité. Entre 1962 et 2014 : les <strong style={{color:"#5DCAA5"}}>agriculteurs</strong> sont passés de 15,4 % à 1,9 % de la population active (÷8). La part des <strong style={{color:"#5DCAA5"}}>cadres</strong> a été multipliée par plus de 2 (+24 points). Cette évolution a facilité la mobilité ascendante sans pour autant réduire les inégalités des chances.
    </DefBox>
    <Accordion items={[
      {title:"📚 Capital culturel (Bourdieu)",dotColor:"#7EB8FF",content:<div>Ensemble des <strong style={{color:"#e8e6df"}}>savoirs, savoir-faire et savoir-être</strong> socialement valorisés, transmis principalement lors de la socialisation familiale (sens de l'abstraction, culture littéraire, maîtrise d'un langage soutenu, aisance orale…).<br/><br/>Bourdieu montre que l'école reconnaît comme compétences scolaires des aptitudes <strong style={{color:"#e8e6df"}}>inégalement transmises selon l'origine sociale</strong>, reproduisant ainsi les inégalités plutôt qu'en les corrigeant.<br/><br/><div style={{background:"rgba(255,255,255,0.04)",borderRadius:6,padding:"8px 10px",marginTop:8,borderLeft:"3px solid rgba(255,255,255,0.1)",fontSize:12,color:"#8a8880"}}>Exemple : un enfant de cadre maîtrise le registre de langue attendu par l'institution scolaire — avantage invisible mais décisif dans les épreuves orales ou les écrits argumentés.</div></div>},
      {title:"💰 Capital économique (Bourdieu)",dotColor:"#EF9F27",content:<div>Ressources financières (<strong style={{color:"#e8e6df"}}>revenus, patrimoine, héritage</strong>) transmissibles entre générations. Déterminant pour l'accès aux professions libérales et indépendantes nécessitant un patrimoine professionnel.<br/><br/><div style={{background:"rgba(255,255,255,0.04)",borderRadius:6,padding:"8px 10px",marginTop:8,borderLeft:"3px solid rgba(255,255,255,0.1)",fontSize:12,color:"#8a8880"}}>Exemple : un jeune diplômé en droit reprend le cabinet de son père avocat — il hérite du local, du matériel et de la clientèle fidélisée — un triple avantage impossible à reconstituer à égalité de diplôme.</div></div>},
      {title:"🤝 Capital social (Bourdieu)",dotColor:"#5DCAA5",content:<div>Ensemble des <strong style={{color:"#e8e6df"}}>réseaux de relations socialement utiles</strong> : trouver une formation, un stage, un emploi, des informations sur le marché du travail, bénéficier d'un « piston ».<br/><br/>Les cadres disposent d'un capital social bien supérieur aux ouvriers/employés → avantage clé dans la transmission intergénérationnelle du statut.<br/><br/><div style={{background:"rgba(255,255,255,0.04)",borderRadius:6,padding:"8px 10px",marginTop:8,borderLeft:"3px solid rgba(255,255,255,0.1)",fontSize:12,color:"#8a8880"}}>Exemple INSEE 2024 : à diplôme identique, les enfants de cadres accèdent plus souvent aux postes de cadre que les enfants d'ouvriers — l'écart s'explique largement par la mobilisation d'un réseau relationnel plus étendu.</div></div>},
    ]} />
    <DefBox label="Facteur 3 — Le niveau de formation" color="green">
      Parmi les enfants d'ouvriers/employés avec un <strong style={{color:"#97C459"}}>diplôme du supérieur long</strong> : <strong style={{color:"#97C459"}}>81 %</strong> accèdent à des emplois de cadre ou de profession intermédiaire, contre seulement <strong style={{color:"#97C459"}}>10 %</strong> des non-bacheliers (×8). Mais à <strong style={{color:"#97C459"}}>même niveau de diplôme</strong>, l'origine sociale reste déterminante : le rendement du diplôme est plus faible pour les enfants d'ouvriers que pour les enfants de cadres — en raison notamment du capital social différentiel.
    </DefBox>
    <DefBox label="Facteur 4 — Les configurations familiales (Stéphane Beaud)" color="purple">
      La notion de <strong style={{color:"#AFA9EC"}}>configurations familiales</strong> permet d'aborder la diversité des familles selon la taille de la fratrie, la situation conjugale, l'origine migratoire, le niveau de revenu.<br/><br/>
      <strong style={{color:"#AFA9EC"}}>Exemple — Famille Belhoumi (Beaud) :</strong> les sœurs aînées connaissent une mobilité ascendante grâce à une socialisation différenciée et des rencontres décisives (enseignants, animateurs). Les frères, peu diplômés, connaissent une trajectoire différente — illustrant que, dans une même famille, les trajectoires divergent selon le genre et les interactions sociales vécues.
    </DefBox>
  </div>;
}

function StepMecanismes() {
  return <div>
    <STitle>La formule clé : décomposer la mobilité</STitle>
    <div style={{background:"#2a1d09",border:"1px solid #EF9F27",borderRadius:10,padding:16,textAlign:"center" as const,marginBottom:"1rem"}}>
      <div style={{fontSize:16,fontWeight:700,color:"#EF9F27",fontFamily:"Space Grotesk, sans-serif",marginBottom:8}}>Mobilité brute = Mobilité structurelle + Mobilité nette</div>
      <div style={{fontSize:12,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",lineHeight:1.6}}>La mobilité structurelle = part due aux transformations de la structure des emplois entre générations (ex : déclin agricole, essor des cadres).<br/>La mobilité nette = mesure les inégalités des chances réelles, indépendamment de ces transformations.</div>
    </div>

    <STitle>Calculer un odds ratio</STitle>
    <MecaBox color="#AFA9EC" steps={[
      {label:"Calculer l'odds d'un fils de cadre",text:"Probabilité d'être cadre ÷ probabilité d'être ouvrier. Exemple FQP 2014-2015 : 5,96 × (très favorable à devenir cadre)"},
      {label:"Calculer l'odds d'un fils d'ouvrier",text:"Même calcul : probabilité d'être cadre ÷ probabilité d'être ouvrier = 0,22 × (très défavorable à devenir cadre)"},
      {label:"Calculer le rapport (odds ratio)",text:"Odds ratio = 5,96 ÷ 0,22 ≈ 27,6. Lecture : « Un fils de cadre a 27,6 fois plus de chances qu'un fils d'ouvrier de devenir cadre plutôt qu'ouvrier. »"},
      {label:"Interpréter par rapport à l'égalité parfaite",text:"Odds ratio = 1 → égalité parfaite des chances (origine sociale sans impact). Odds ratio = 27,6 → inégalité très forte. La France est très loin de l'égalité méritocratique."},
    ]} />

    <STitle>L'effet de structure pour les femmes</STitle>
    <MecaBox color="#F0997B" steps={[
      {label:"Constat : les femmes semblent plus mobiles que les hommes",text:"66 % des femmes sont en mobilité vs leur mère, contre 63 % des hommes vs leur père. Mobilité ascendante : 48 % vs mère (femmes) contre 39 % vs père (hommes)."},
      {label:"L'explication : les mères occupaient des emplois moins valorisés",text:"Les mères de la génération précédente étaient majoritairement employées ou inactives — des positions moins valorisées en moyenne. Mécaniquement, tout changement de position semble une ascension."},
      {label:"La preuve : comparer les femmes à leur père",text:"Si l'on compare les femmes à leur père (au lieu de la mère), la mobilité ascendante tombe à seulement 25 % — et la mobilité descendante augmente fortement."},
      {label:"Conclusion : ne pas confondre mobilité et égalité réelle",text:"La comparaison mère-fille surestime les progrès de l'égalité des chances. C'est un effet de structure, pas un progrès réel de la fluidité sociale."},
    ]} />

    <STitle>L'évolution de la fluidité sociale en France</STitle>
    <div style={{overflowX:"auto" as const}}>
      <table style={{width:"100%",borderCollapse:"collapse" as const,fontSize:13,fontFamily:"Space Grotesk, sans-serif",marginBottom:"1rem"}}>
        <thead><tr>{["Période","Mobilité brute","Fluidité (odds ratio global)","Interprétation"].map(h=><th key={h} style={{background:"rgba(255,255,255,0.04)",padding:"9px 12px",textAlign:"left" as const,fontWeight:600,color:"#5a5955",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>{h}</th>)}</tr></thead>
        <tbody>
          {[
            ["1977–1985","Augmente","90 → 99,5 (augmente)","Paradoxe : plus de mobilité mais moins d'égalité des chances"],
            ["1985–2003","Stable","Diminue (progrès)","Progrès réel de la fluidité sociale"],
            ["2003–2024","Stable ≈ 63-65 %","Stagnation","Aucun progrès de la fluidité depuis 20 ans"],
          ].map(([per,mob,fl,int],i)=><tr key={i}><td style={{padding:"9px 12px",borderBottom:"1px solid rgba(255,255,255,0.05)",color:"#7EB8FF",fontWeight:600}}>{per}</td><td style={{padding:"9px 12px",borderBottom:"1px solid rgba(255,255,255,0.05)",color:"#d0cfc8"}}>{mob}</td><td style={{padding:"9px 12px",borderBottom:"1px solid rgba(255,255,255,0.05)",color:"#8a8880"}}>{fl}</td><td style={{padding:"9px 12px",borderBottom:"1px solid rgba(255,255,255,0.05)",color:"#8a8880"}}>{int}</td></tr>)}
        </tbody>
      </table>
    </div>
    <NoteBox type="actu">🟡 <strong>INSEE Première n°2068 (juillet 2025) — Salariés vs indépendants :</strong> 53 % des salariés sont en mobilité ascendante vs leur mère, contre seulement 42 % des indépendants. Les indépendants ont 40 % de chances en moins d'être en mobilité ascendante que les salariés — la reproduction sociale est plus forte dans le travail indépendant.</NoteBox>
  </div>;
}

function StepErreurs() {
  return <div>
    <div style={{fontSize:14,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",marginBottom:"1rem"}}>Les confusions les plus fréquentes repérées dans les copies de bac.</div>
    {[
      {err:"Confondre mobilité brute et fluidité sociale",ok:"La mobilité brute mesure tous les changements de position observés. La fluidité (mobilité nette) mesure l'égalité des chances, indépendamment des transformations structurelles. Une hausse de la mobilité brute peut coexister avec une baisse de la fluidité (France 1977-1985)."},
      {err:"Confondre table de recrutement et table de destinée",ok:"Table de recrutement : on part du présent → passé (« d'où viennent les cadres ? »). Table de destinée : on part du passé → présent (« que sont devenus les fils d'ouvriers ? »). Mémo : ReCrutement = passé Récent des individus."},
      {err:"Penser qu'un odds ratio élevé est positif",ok:"Un odds ratio > 1 signifie une INÉGALITÉ. L'odds ratio de 27,6 en France signifie que les chances d'un fils de cadre sont 27,6 fois supérieures à celles d'un fils d'ouvrier — c'est très inégalitaire. L'idéal méritocratique correspond à OR = 1."},
      {err:"Croire que les femmes ont réellement plus d'égalité des chances que les hommes",ok:"La mobilité ascendante des femmes vs mère est plus élevée (48 %) que celle des hommes vs père (39 %) en raison d'un effet de structure : les mères occupaient des emplois moins valorisés. Comparées à leur père, la mobilité ascendante des femmes tombe à 25 %. Ce n'est pas de l'égalité, c'est un artefact statistique."},
      {err:"Confondre déclassement et mobilité descendante",ok:"La mobilité descendante = occuper une position inférieure à celle de ses parents. Le déclassement (Peugny) = occuper une position inférieure à celle de ses parents MALGRÉ un niveau de diplôme plus élevé. Le déclassement est une forme spécifique et paradoxale de mobilité descendante."},
      {err:"Penser que la mobilité structurelle reflète l'égalité des chances",ok:"La mobilité structurelle est purement mécanique : elle résulte de la transformation de la structure des emplois (déclin agricole, essor des cadres). Elle peut augmenter sans que les inégalités des chances s'améliorent. Seule la mobilité nette (fluidité) mesure l'égalité réelle des chances."},
      {err:"Oublier de distinguer les lectures des tables de mobilité",ok:"Une table de destinée se lit ligne par ligne (ex : parmi les fils d'agriculteurs, X % sont devenus ouvriers). Une table de recrutement se lit colonne par colonne (ex : parmi les cadres, X % sont fils d'ouvriers). Mélanger les deux sens de lecture est une erreur grave en EC2."},
    ].map((item,i)=><div key={i} style={{marginBottom:12,border:"1px solid rgba(255,255,255,0.07)",borderRadius:10,overflow:"hidden"}}>
      <div style={{background:"rgba(240,153,123,0.1)",padding:"10px 14px",borderBottom:"1px solid rgba(240,153,123,0.2)"}}><span style={{fontSize:11,color:"#F0997B",fontWeight:700,marginRight:8}}>❌ ERREUR {i+1}</span><span style={{fontSize:13,color:"#e8e6df",fontFamily:"Space Grotesk, sans-serif"}}>{item.err}</span></div>
      <div style={{padding:"10px 14px",background:"rgba(93,202,165,0.04)"}}><span style={{fontSize:11,color:"#5DCAA5",fontWeight:700,marginRight:8}}>✅ CORRECT :</span><span style={{fontSize:12,color:"#8a8880",lineHeight:1.6,fontFamily:"Space Grotesk, sans-serif"}}>{item.ok}</span></div>
    </div>)}
  </div>;
}

function StepSujets() {
  return <div>
    <NoteBox type="actu">⚡ <strong>Chapitre souvent combiné</strong> avec la structure sociale (dissertation) ou avec les inégalités scolaires. Peut apparaître en EC2 (lecture d'une table de mobilité ou calcul d'odds ratio) ou en EC3.</NoteBox>
    {[
      {type:"Dissertation",color:"#D4A017",sujet:"Dans quelle mesure la société française est-elle méritocratique ?",plan:"I. La mobilité réelle : l'école et le diplôme comme vecteurs d'ascension (mobilité structurelle, rôle du diplôme) / II. Les limites de la méritocratie : reproduction des inégalités (Bourdieu, odds ratios, déclassement) / III. Des transformations récentes nuancées : fluidité stagnante depuis 2003, effets de structure"},
      {type:"Dissertation",color:"#D4A017",sujet:"Quels sont les facteurs de la mobilité sociale en France ?",plan:"I. La mobilité structurelle : transformations du marché du travail depuis 1950 / II. Les capitaux et l'origine sociale (Bourdieu) : culturel, économique, social / III. Le rôle ambigu de l'école : vecteur d'ascension mais reproducteur d'inégalités"},
      {type:"EC3",color:"#5DCAA5",sujet:"À l'aide du dossier et de vos connaissances, vous montrerez que la mobilité sociale ne reflète pas nécessairement une égalité des chances.",plan:"Définir mobilité brute et fluidité → formule de décomposition → odds ratios → effet de structure femmes → fluidité stagnante depuis 2003 → conclusion"},
      {type:"EC2 Lecture",color:"#7EB8FF",sujet:"Lisez la donnée suivante : « En 2023-2024, 39 % des hommes sont en situation de mobilité ascendante par rapport à leur père. »",plan:"Identifier l'indicateur (mobilité intergénérationnelle ascendante des hommes) → Lire : « En 2023-2024, 39 % des hommes actifs occupent une position sociale plus élevée que leur père » → Mettre en perspective : mobilité brute ≠ égalité des chances"},
      {type:"EC2 Calcul",color:"#AFA9EC",sujet:"À partir des données FQP, calculez et interprétez l'odds ratio entre fils de cadres et fils d'ouvriers.",plan:"Odds fils de cadre = P(cadre)/P(ouvrier) pour fils de cadre / Odds fils d'ouvrier = P(cadre)/P(ouvrier) pour fils d'ouvrier / OR = odds 1 ÷ odds 2 / Lecture + interprétation par rapport à OR = 1"},
    ].map((s,i)=><div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:14,marginBottom:12}}>
      <span style={{fontSize:10,fontWeight:700,color:s.color,background:`${s.color}22`,border:`1px solid ${s.color}44`,borderRadius:20,padding:"2px 10px",display:"inline-block",marginBottom:8,fontFamily:"Space Grotesk, sans-serif"}}>{s.type}</span>
      <div style={{fontSize:13,fontWeight:600,color:"#e8e6df",marginBottom:8,lineHeight:1.5,fontFamily:"Space Grotesk, sans-serif"}}>{s.sujet}</div>
      <div style={{fontSize:12,color:"#5a5955",lineHeight:1.6,fontFamily:"Space Grotesk, sans-serif"}}><strong style={{color:"#8a8880"}}>Piste de plan :</strong> {s.plan}</div>
    </div>)}
  </div>;
}

function StepMethode() {
  return <div>
    <STitle>Méthode — Lire une table de mobilité en EC2</STitle>
    <MecaBox color="#7EB8FF" steps={[
      {label:"Identifier le type de table",text:"Table de recrutement (d'où viennent les individus d'une catégorie ?) ou table de destinée (que sont devenus les enfants d'une catégorie ?). Le sens de lecture est opposé."},
      {label:"Lire une case",text:"Toujours : sujet grammatical complet + chiffre + unité + date. Ex : « En 2015, 30,9 % des fils d'agriculteurs exploitants sont devenus ouvriers. » Ne jamais écrire juste « 30,9 % »."},
      {label:"Identifier la diagonale",text:"La diagonale d'une table de destinée ou de recrutement représente la REPRODUCTION SOCIALE (même PCS que les parents). Plus les valeurs de la diagonale sont élevées, plus la société est fermée."},
      {label:"Calculer la mobilité brute",text:"Somme des cases HORS diagonale ÷ total = taux de mobilité brute. En France : ≈ 63-65 % des hommes sont en dehors de la diagonale (en mobilité)."},
      {label:"Distinguer ascendant / descendant",text:"Mobilité ascendante = cases au-dessus de la diagonale (fils dans PCS plus haute que père). Mobilité descendante = cases en dessous. Ne pas les confondre."},
    ]} />
    <STitle>Méthode — Calculer et interpréter un odds ratio</STitle>
    <NoteBox type="info">⚠️ <strong>Structure d'un calcul d'odds ratio parfait :</strong><br/><br/>
    1. <strong>Calculer l'odds du groupe A</strong> : P(devenir cadre) / P(devenir ouvrier) pour fils de cadre<br/>
    2. <strong>Calculer l'odds du groupe B</strong> : P(devenir cadre) / P(devenir ouvrier) pour fils d'ouvrier<br/>
    3. <strong>Diviser</strong> : odds A ÷ odds B = odds ratio<br/>
    4. <strong>Interpréter</strong> : « Un fils de cadre a X fois plus de chances qu'un fils d'ouvrier de devenir cadre plutôt qu'ouvrier »<br/>
    5. <strong>Situer par rapport à 1</strong> : OR = 1 → égalité parfaite · OR &gt; 1 → avantage du groupe A<br/><br/>
    ⚠️ Erreur fréquente : oublier de rapporter l'odds ratio à la valeur de référence (= 1) dans l'interprétation.</NoteBox>
    <STitle>Méthode — Dissertation mobilité sociale</STitle>
    <MecaBox color="#5DCAA5" steps={[
      {label:"Poser la tension centrale",text:"La société française est marquée par une mobilité réelle (63 % des hommes en dehors de la position de leur père) MAIS par une fluidité qui stagne depuis 2003 et des inégalités des chances persistantes (OR = 27,6)."},
      {label:"Mobiliser la distinction brute/nette dès l'introduction",text:"C'est LA distinction de méthode qui impressionne le jury. Montrer qu'on sait que mobilité ≠ égalité des chances."},
      {label:"Articuler les 4 facteurs",text:"1) Mobilité structurelle → mécanique / 2) Capitaux de Bourdieu → reproduction / 3) Rôle du diplôme → puissant mais inégal / 4) Configurations familiales (Beaud) → diversité des trajectoires"},
      {label:"Conclure sur le déclassement et les limites",text:"Peugny montre que le déclassement touche des enfants plus diplômés que leurs parents — la promesse méritocratique est en crise. La fluidité stagne depuis 2003 : l'école ne suffit pas."},
    ]} />
  </div>;
}

function StepMemo() {
  return <div style={{textAlign:"center" as const,padding:"2rem 0"}}>
    <div style={{fontSize:48,marginBottom:16}}>📄</div>
    <div style={{fontSize:20,fontWeight:700,color:"#e8e6df",fontFamily:"Syne, sans-serif",marginBottom:8}}>Fiche mémo PDF</div>
    <div style={{fontSize:14,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",maxWidth:380,margin:"0 auto 2rem"}}>La synthèse condensée du chapitre en une page A4, à imprimer avant le bac.</div>
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:"1.5rem",maxWidth:400,margin:"0 auto 1.5rem",textAlign:"left" as const}}>
      <div style={{fontSize:12,color:"#5a5955",fontFamily:"Space Grotesk, sans-serif",marginBottom:12,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase" as const}}>Contenu de la fiche</div>
      {["6 formes de mobilité sociale","Tables de recrutement vs destinée","Formule : mobilité brute = structurelle + nette","Calcul et interprétation des odds ratios","4 facteurs de mobilité (Bourdieu, diplôme, Beaud)","Effet de structure femmes/hommes","Chiffres INSEE 2023-2024 + FQP 2014-2015"].map((item,i)=><div key={i} style={{display:"flex",gap:8,fontSize:13,color:"#d0cfc8",fontFamily:"Space Grotesk, sans-serif",marginBottom:6}}><span style={{color:"#5DCAA5"}}>✓</span>{item}</div>)}
    </div>
    <div style={{background:"rgba(255,255,255,0.04)",border:"1px dashed rgba(255,255,255,0.15)",borderRadius:10,padding:"12px 28px",display:"inline-block",color:"#5a5955",fontFamily:"Space Grotesk, sans-serif",fontSize:14}}>📥 Fiche mémo PDF — bientôt disponible</div>
  </div>;
}

function StepRessources() {
  return <div>
    <div style={{fontSize:14,color:"#8a8880",fontFamily:"Space Grotesk, sans-serif",marginBottom:"1.5rem"}}>Ressources complémentaires pour approfondir et mémoriser le chapitre.</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12}}>
      {[
        {icon:"🎬",label:"Cours vidéo",desc:"La vidéo de révision sur la mobilité sociale sera disponible prochainement.",color:"#7EB8FF"},
        {icon:"🗺️",label:"Carte mentale",desc:"Visualise toutes les connexions entre formes de mobilité, facteurs et mesures.",color:"#D4A017"},
        {icon:"📊",label:"Infographie",desc:"La décomposition de la mobilité brute et le calcul des odds ratios en schéma.",color:"#5DCAA5"},
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
export default function MobiliteSocialePage() {
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
      <span style={{fontSize:13,color:"#d0cfc8",fontFamily:"Space Grotesk, sans-serif"}}>Mobilité sociale</span>
      <div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
        <div style={{width:10,height:10,borderRadius:"50%",background:"#D4A017",animation:"pulse 2s infinite"}}/>
        <span style={{fontSize:11,color:"#D4A017",fontFamily:"Space Grotesk, sans-serif",fontWeight:600}}>{STEPS.findIndex(s=>s.id===active)+1}/{STEPS.length}</span>
      </div>
    </nav>

    {/* ── Header chapitre ── */}
    <div style={{background:"linear-gradient(135deg,#0a1e36 0%,#0d1b2a 60%,#1a0a2a 100%)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"2rem 1.5rem 1.5rem",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-60,right:-60,width:200,height:200,background:"radial-gradient(circle,rgba(175,169,236,0.06) 0%,transparent 70%)",pointerEvents:"none"}}/>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"inline-block",fontSize:10,fontWeight:700,letterSpacing:"0.12em",padding:"3px 10px",borderRadius:20,background:"rgba(175,169,236,0.15)",color:"#AFA9EC",border:"1px solid rgba(175,169,236,0.3)",marginBottom:10,fontFamily:"Space Grotesk, sans-serif",textTransform:"uppercase" as const}}>Sociologie · Terminale SES</div>
        <h1 style={{fontSize:"clamp(22px,4vw,32px)",fontWeight:800,fontFamily:"Syne, sans-serif",color:"#f0ece0",margin:0,lineHeight:1.2,marginBottom:8}}>
          Quels sont les caractéristiques<br/>et les facteurs de la mobilité sociale ?
        </h1>
        <div style={{fontSize:13,color:"#5a5955",fontFamily:"Space Grotesk, sans-serif"}}>Programme Éduscol 2020 · 10 étapes de révision · Actualisé 2025</div>
      </div>
    </div>

    {/* ── Barre d'onglets ── */}
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
