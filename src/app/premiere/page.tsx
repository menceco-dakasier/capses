"use client";

import Link from "next/link";
import { useState } from "react";
import { LevelFilters } from "../level-filters";
import browserStyles from "../level-browser.module.css";
import { LevelIllustration } from "../level-illustration";
import { LevelNavigation } from "../level-navigation";

const programme = [
  {
    domaine: "Science économique",
    chapitres: [
      { numero: 1, titre: "Comment un marché concurrentiel fonctionne-t-il ?", href: "/premiere/marche-concurrentiel", resume: "Institutions, offre et demande, équilibre, coût marginal, taxe et gains à l’échange." },
      { numero: 2, titre: "Comment les marchés imparfaitement concurrentiels fonctionnent-ils ?" },
      { numero: 3, titre: "Quelles sont les principales défaillances du marché ?" },
      { numero: 4, titre: "Comment les agents économiques se financent-ils ?" },
      { numero: 5, titre: "Qu’est-ce que la monnaie et comment est-elle créée ?" },
    ],
  },
  {
    domaine: "Sociologie et science politique",
    chapitres: [
      { numero: 6, titre: "Comment la socialisation contribue-t-elle à expliquer les différences de comportement des individus ?" },
      { numero: 7, titre: "Comment se construisent et évoluent les liens sociaux ?" },
      { numero: 8, titre: "Quels sont les processus sociaux qui contribuent à la déviance ?" },
      { numero: 9, titre: "Comment se forme et s’exprime l’opinion publique ?" },
      { numero: 10, titre: "Voter : une affaire individuelle ou collective ?" },
    ],
  },
  {
    domaine: "Regards croisés",
    chapitres: [
      { numero: 11, titre: "Comment l’assurance et la protection sociale contribuent-elles à la gestion des risques dans les sociétés développées ?" },
      { numero: 12, titre: "Comment les entreprises sont-elles organisées et gouvernées ?" },
    ],
  },
];

type Chapitre = { numero: number; titre: string; href?: string; resume?: string };
const sourceProgramme = "https://eduscol.education.gouv.fr/5838/programmes-et-ressources-en-sciences-economiques-et-sociales-voie-gt";

export default function Page() {
  const [selected, setSelected] = useState("ALL");
  const groups = programme.filter(group => selected === "ALL" || group.domaine === selected);
  return (
    <main style={{minHeight:"100vh",background:"#f7faff",color:"#10255e",fontFamily:"var(--font-geist-sans), Arial, sans-serif",colorScheme:"light"}}>
      <LevelNavigation current="/premiere" />
      <div style={{width:"min(1200px, calc(100% - 32px))",margin:"0 auto",padding:"44px 0 70px"}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:24,alignItems:"center",marginBottom:24}}>
        <div style={{flex:"1 1 400px",minWidth:0}}>
        <div style={{display:"inline-flex",padding:"6px 10px",borderRadius:999,background:"#eef5ff",color:"#245cbd",fontSize:13,fontWeight:800}}>CAPSES · 2026-2027</div>
        <h1 style={{margin:"14px 0 10px",fontSize:"clamp(34px,6vw,52px)",letterSpacing:"-.04em"}}>Première SES</h1>
        <p style={{margin:"0 0 16px",color:"#52617a",fontSize:17,lineHeight:1.7,maxWidth:760}}>Retrouve les objectifs officiels, le cours, les mécanismes et des entraînements progressifs pour comprendre et réviser les SES.</p>
        <p style={{margin:"0 0 32px",color:"#52617a",fontSize:14,lineHeight:1.7}}><strong>12 chapitres au programme · 1 disponible</strong><br/>Les autres chapitres seront ouverts progressivement. Les numéros ci-dessous suivent l’ordre du programme ; ton professeur peut choisir une autre progression.</p>
        </div>
        <LevelIllustration level="premiere" />
        </div>
        <div className={browserStyles.layout}>
          <aside className={browserStyles.sidebar}><LevelFilters level="Première" selected={selected} onSelect={setSelected} options={programme.map(group => ({id:group.domaine,label:group.domaine}))} /></aside>
          <div className={browserStyles.content}>
          <p className={browserStyles.result} aria-live="polite">{groups.reduce((total,group) => total + group.chapitres.length,0)} chapitres affichés</p>
        {groups.map(({domaine,chapitres}) => (
          <section key={domaine} aria-labelledby={`domaine-${chapitres[0].numero}`} style={{marginBottom:40}}>
            <h2 id={`domaine-${chapitres[0].numero}`} style={{margin:"0 0 18px",fontSize:"clamp(23px,4vw,28px)",lineHeight:1.3}}>{domaine}</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 300px), 1fr))",gap:16}}>
              {(chapitres as Chapitre[]).map(chapitre => (
                <article key={chapitre.numero} style={{minWidth:0,padding:24,border:"1px solid #dfe7f3",borderRadius:16,background:"white",display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,width:"100%",marginBottom:16,fontSize:13}}>
                    <span style={{color:"#52617a",fontWeight:700}}>Chapitre {chapitre.numero}</span>
                    <span style={{padding:"5px 9px",borderRadius:6,background:chapitre.href ? "#edf7f3" : "#f1f3f6",color:chapitre.href ? "#16634b" : "#52617a",fontWeight:700}}>{chapitre.href ? "Disponible" : "À venir"}</span>
                  </div>
                  <h3 style={{fontSize:20,lineHeight:1.45,margin:"0 0 14px",overflowWrap:"anywhere"}}>{chapitre.titre}</h3>
                  {chapitre.resume && <p style={{color:"#52617a",lineHeight:1.7,fontSize:16,margin:"0 0 18px"}}>{chapitre.resume}</p>}
                  {chapitre.href ? <Link href={chapitre.href} style={{display:"inline-flex",alignItems:"center",minHeight:44,marginTop:"auto",padding:"11px 15px",borderRadius:10,background:"#164b9c",color:"white",textDecoration:"none",fontWeight:750}}>Réviser le chapitre →</Link> : <p style={{margin:"auto 0 0",paddingTop:6,color:"#52617a",fontSize:14,lineHeight:1.6}}>Le cours sera ajouté prochainement.</p>}
                </article>
              ))}
            </div>
          </section>
        ))}
          </div>
        </div>
        <footer style={{borderTop:"1px solid #dfe7f3",paddingTop:20,color:"#52617a",fontSize:14,lineHeight:1.7}}>
          Intitulés du programme officiel de spécialité SES de Première générale (BO spécial du 22 janvier 2019), présenté parmi les programmes en vigueur sur <a href={sourceProgramme} style={{color:"#245cbd",textDecoration:"underline"}}>Éduscol</a>.
        </footer>
      </div>
    </main>
  );
}
