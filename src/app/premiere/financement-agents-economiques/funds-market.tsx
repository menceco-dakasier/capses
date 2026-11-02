"use client";
import { useState } from "react";
import styles from "../marche-concurrentiel/page.module.css";
export function FundsMarket() {
  const [publicDemand, setPublicDemand] = useState(false);
  return <section className={styles.lessonBlock}>
    <h3>Tester une hausse de la demande de fonds</h3>
    <p>Modèle construit : inflation nulle, mêmes risques et durées, offre inchangée. La demande publique ajoute 80 unités à chaque taux. Les unités sont conventionnelles.</p>
    <button type="button" className={styles.primaryButton} aria-pressed={publicDemand} onClick={()=>setPublicDemand(!publicDemand)}>{publicDemand ? "Revenir à la situation initiale" : "Ajouter la demande publique"}</button>
    <figure className={styles.figure}>
      <svg viewBox="0 0 640 370" role="img" aria-labelledby="funds-title funds-desc">
        <title id="funds-title">Marché des fonds prêtables</title>
        <desc id="funds-desc">Offre croissante, demande privée décroissante. {publicDemand ? "Après ajout de la demande publique, équilibre à 6 % et 140 unités. La demande privée est de 60 unités." : "Équilibre initial à 4 % et 100 unités."}</desc>
        <path d="M60 30V300H590" stroke="#142343" strokeWidth="2" fill="none"/>
        <text x="65" y="20">Taux réel (%)</text><text x="330" y="352">Quantité de fonds (unités)</text>
        {[2,4,6,8].map(r=><g key={r}><path d={`M56 ${300-r*30}H60`} stroke="#142343"/><text x="35" y={305-r*30}>{r}</text></g>)}
        {[0,60,100,140,180,220,260].map(v=><text key={v} x={60+v*1.8} y="322" textAnchor="middle">{v}</text>)}
        <path d="M96 300L384 60" stroke="#176b64" strokeWidth="3" fill="none"/><text x="390" y="62">Offre</text>
        <path d="M96 60L384 300" stroke="#245cbd" strokeWidth="3" fill="none"/><text x="105" y="51">Demande privée</text>
        <path d="M60 180H240V300" stroke="#245cbd" strokeDasharray="5 4" fill="none"/><circle cx="240" cy="180" r="5" fill="#245cbd"/><text x="248" y="200">E₁ (100 ; 4 %)</text>
        {publicDemand&&<><path d="M240 60L528 300" stroke="#995133" strokeWidth="3" fill="none"/><text x="255" y="45">Demande totale</text><path d="M60 120H312V300" stroke="#995133" strokeDasharray="5 4" fill="none"/><circle cx="312" cy="120" r="5" fill="#995133"/><text x="325" y="118">E₂ (140 ; 6 %)</text><circle cx="168" cy="120" r="5" fill="#245cbd"/></>}
      </svg>
      <figcaption>Les axes et les traits pointillés permettent de lire le taux et la quantité. L’équilibre est l’intersection de l’offre et de la demande totale.</figcaption>
    </figure>
    <p className={styles.callout} aria-live="polite">{publicDemand ? "Le taux passe de 4 % à 6 %. La quantité totale passe de 100 à 140 ; la demande privée passe de 100 à 60. Les 80 unités publiques ne s’ajoutent donc pas intégralement au financement privé initial : 40 unités privées sont évincées dans ce modèle." : "À 4 %, l’offre et la demande privée sont égales à 100 unités. À 2 %, la demande est de 140 pour une offre de 60 : le taux tend à augmenter."}</p>
    <p>Cette expérience maintient l’offre de fonds inchangée. Elle ne prouve pas qu’une dépense publique provoque toujours une hausse du taux ou une éviction.</p>
  </section>;
}
