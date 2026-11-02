"use client";
import { useState } from "react";
import styles from "../marche-concurrentiel/page.module.css";
const states = [
  { label: "Avant le crédit", loan: 0, deposit: 0, supplier: 0, equipment: 0, explanation: "On suit uniquement les variations dues aux opérations étudiées. Il n’y a encore ni crédit ni dépôt associé." },
  { label: "Crédit de 60 000 €", loan: 60000, deposit: 60000, supplier: 0, equipment: 0, explanation: "La banque crée un dépôt de 60 000 € et détient une créance de même montant sur l’entreprise. Celle-ci dispose d’un moyen de paiement avec une dette équivalente." },
  { label: "Paiement de 45 000 €", loan: 60000, deposit: 15000, supplier: 45000, equipment: 45000, explanation: "L’entreprise achète un équipement au fournisseur, client de la même banque. Son dépôt baisse de 45 000 €, celui du fournisseur augmente d’autant. Les dépôts circulent ; leur total reste 60 000 €." },
  { label: "Remboursement de 10 000 €", loan: 50000, deposit: 5000, supplier: 45000, equipment: 45000, explanation: "L’entreprise rembourse 10 000 € de principal avec son dépôt restant. Le dépôt et la créance de crédit diminuent de 10 000 €. Le total des dépôts devient 50 000 € : la monnaie correspondante est détruite." },
];
const euro = (value: number) => `${value.toLocaleString("fr-FR")} €`;
export function MoneyBalance() {
  const [step, setStep] = useState(0);
  const s = states[step];
  return <section className={styles.lessonBlock} aria-labelledby="balance-title">
    <h3 id="balance-title">Suivre un crédit dans les bilans</h3>
    <p>Choisis une étape. Les tableaux montrent uniquement les variations liées à ce cas construit. L’entreprise et le fournisseur sont dans une même banque ; les intérêts et les autres opérations sont ignorés.</p>
    <div role="group" aria-label="Étapes du crédit" style={{display:"flex",flexWrap:"wrap",gap:10,margin:"20px 0"}}>{states.map((state,i)=><button type="button" className={step===i?styles.primaryButton:styles.option} aria-pressed={step===i} key={state.label} onClick={()=>setStep(i)} style={{minHeight:44,width:"auto"}}>{i+1}. {state.label}</button>)}</div>
    <div aria-live="polite" aria-atomic="true">
      <p className={styles.callout}><strong>{s.label}</strong><br/>{s.explanation}</p>
      <div className={styles.tableWrap} role="region" aria-label="Bilan de la banque en variations" tabIndex={0}><table><caption>Banque — variations cumulées</caption><thead><tr><th scope="col">Actif</th><th scope="col">Passif</th></tr></thead><tbody><tr><td>Créance sur l’entreprise : {euro(s.loan)}</td><td>Dépôt de l’entreprise : {euro(s.deposit)}<br/>Dépôt du fournisseur : {euro(s.supplier)}</td></tr><tr><th scope="row">Total : {euro(s.loan)}</th><td>Total : {euro(s.deposit+s.supplier)}</td></tr></tbody></table></div>
      <div className={styles.tableWrap} role="region" aria-label="Bilan de l’entreprise en variations" tabIndex={0}><table><caption>Entreprise — variations cumulées</caption><thead><tr><th scope="col">Actif</th><th scope="col">Passif</th></tr></thead><tbody><tr><td>Dépôt : {euro(s.deposit)}<br/>Équipement acquis : {euro(s.equipment)}</td><td>Dette bancaire : {euro(s.loan)}</td></tr><tr><th scope="row">Total : {euro(s.deposit+s.equipment)}</th><td>Total : {euro(s.loan)}</td></tr></tbody></table></div>
      <p><strong>Total des dépôts créés encore en circulation dans ce cas : {euro(s.deposit+s.supplier)}.</strong></p>
    </div>
  </section>;
}
