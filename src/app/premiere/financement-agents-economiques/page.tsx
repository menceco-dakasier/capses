"use client";

import Link from "next/link";
import { HomeMascot } from "../../home-mascot";
import { LevelNavigation } from "../../level-navigation";
import { useEffect, useRef, useState } from "react";
import data from "./content.json";
import { FundsMarket } from "./funds-market";
import styles from "../marche-concurrentiel/page.module.css";

const sections = ["Objectifs d’apprentissage", "Notions indispensables", "Le cours en 10 minutes", "Résumé vidéo", "Mécanismes à maîtriser", "Documents et données", "Erreurs fréquentes", "Quiz", "Méthode et entraînements", "Fiche mémo", "Sources"];
const SLUG = "premiere-financement-agents-economiques";
function draw() {
  const ids = data.quiz.map((_, i) => i);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids.slice(0, 10);
}

export default function FinancementPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [visited, setVisited] = useState<number[]>([0]);
  const [quiz, setQuiz] = useState<number[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [notice, setNotice] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const finished = quiz.length === 10 && Object.keys(answers).length === 10;
  const correct = quiz.filter(id => answers[id] === data.quiz[id][2]).length;
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(`${SLUG}-steps`) || "[0]");
      if (Array.isArray(saved)) setVisited([...new Set([0, ...saved.filter((n): n is number => Number.isInteger(n) && n >= 0 && n < sections.length)])]);
    } catch { /* Reading remains available without browser storage. */ }
  }, []);
  useEffect(() => {
    if (!finished) return;
    try {
      const scores = JSON.parse(localStorage.getItem("capses_scores") || "{}");
      const progress = JSON.parse(localStorage.getItem("capses_progress") || "{}");
      scores[SLUG] = correct;
      progress[SLUG] = correct >= 7 ? "valide" : "en-cours";
      localStorage.setItem("capses_scores", JSON.stringify(scores));
      localStorage.setItem("capses_progress", JSON.stringify(progress));
      setNotice("Résultat enregistré dans Mon espace sur ce navigateur.");
    } catch { setNotice("Le navigateur ne permet pas l’enregistrement de ce résultat."); }
  }, [finished, correct]);
  function go(index: number) {
    setActiveSection(index);
    const next = [...new Set([...visited, index])];
    setVisited(next);
    try { localStorage.setItem(`${SLUG}-steps`, JSON.stringify(next)); } catch {}
    requestAnimationFrame(() => { heading.current?.focus(); heading.current?.scrollIntoView({ block: "start", behavior: "instant" }); });
  }
  function startQuiz() { setQuiz(draw()); setAnswers({}); setNotice(""); }
  return <main className={styles.page}>
    <a className={styles.skip} href="#chapter-content">Aller au contenu</a>
    <LevelNavigation current="/premiere" />
    <div className={styles.shell}>
      <div className={styles.breadcrumb}><Link href="/">Accueil</Link> / <Link href="/premiere">Première</Link> / Financement des agents économiques</div>
      <section className={styles.chapterHero} style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:24}}><div style={{flex:"1 1 420px",minWidth:0}}><span className={styles.eyebrow}>Première SES · Science économique</span>
        <h1>Comment les agents économiques se financent-ils ?</h1>
        <p>Revenus, épargne, crédit et titres : comprendre comment les ménages, les entreprises et l’État réunissent les ressources nécessaires à leurs projets.</p>
        <p className={styles.meta}>5 objectifs · 28 questions dans la banque du quiz · Cours de P. Mence</p></div><HomeMascot compact />
      </section>
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Parcours de révision">
          <div className={styles.progressCard}><strong>Ton parcours de lecture</strong><p>{visited.length} / {sections.length} rubriques consultées</p><progress max={sections.length} value={visited.length} aria-label="Rubriques consultées"/><small>Consulter une rubrique ne signifie pas encore la maîtriser. Le quiz valide les acquis à partir de 7/10.</small></div>
          <nav className={styles.stepNav}>{sections.map((label, i) => <button type="button" key={label} className={`${styles.stepButton} ${activeSection === i ? styles.active : ""}`} aria-current={activeSection === i ? "step" : undefined} onClick={() => go(i)}><span className={styles.stepNum}>{String(i+1).padStart(2,"0")}</span>{label}<span className={styles.visit}>{visited.includes(i) ? "✓" : ""}</span></button>)}</nav>
        </aside>
        <article id="chapter-content" className={styles.contentCard}>
          <p className={styles.meta}>Étape {activeSection+1} sur {sections.length}</p>
          <h2 ref={heading} tabIndex={-1} className={styles.focusHeading}>{sections[activeSection]}</h2>
          {activeSection === 0 && <><p>Les cinq objectifs du programme guident l’ensemble du parcours. Pour chacun, commence par l’explication puis essaie de retrouver le mécanisme dans l’exemple.</p>{data.objectifs.map(([official, clear, example], i) => <section className={styles.lessonBlock} key={official}><h3>Objectif {i+1}</h3><p><strong>Objectif officiel</strong><br/>{official}</p><p><strong>En clair</strong><br/>{clear}</p><p className={styles.callout}><strong>Exemple concret</strong><br/>{example}</p></section>)}</>}
          {activeSection === 1 && <dl className={styles.definitions}>{data.notions.map(([term, definition, use]) => <div key={term}><dt>{term}</dt><dd>{definition}<p>{use}</p></dd></div>)}</dl>}
          {activeSection === 2 && <><p className={styles.callout}>Pour comprendre un financement, identifie les ressources, le projet, les fonds manquants et les engagements pris. Les passages d’auteurs sont réunis dans « Documents et données ».</p>{data.cours.map(({title, paragraphs}) => <section className={styles.lessonBlock} key={title}><h3>{title}</h3>{paragraphs.map(text => <p key={text}>{text}</p>)}</section>)}</>}
          {activeSection === 3 && <><p>Le résumé vidéo CAPSES de ce chapitre est <strong>à venir</strong>.</p><p>En attendant, explique à voix haute le besoin de financement, le rôle du taux d’intérêt, la différence entre action et obligation, puis les deux effets possibles d’une dépense publique.</p></>}
          {activeSection === 4 && <>
            {data.mechanismes.map(m=><section className={styles.lessonBlock} key={m.title}><h3>{m.title}</h3>{m.paragraphs.map(p=><p key={p}>{p}</p>)}</section>)}
            <FundsMarket />
          </>}
          {activeSection === 5 && <>
            <p>Les passages fournis sont conservés avec leurs références et leurs coupures initiales. Les commentaires CAPSES précisent les limites des raisonnements. Les statistiques et les exemples construits sont identifiés séparément.</p>
            {data.hours.flatMap(h=>h.docs).filter(d=>[1,3,11,13,15].includes(d.id)).map(doc=><section className={styles.lessonBlock} key={doc.id}><h3>Document {doc.id} · {doc.title}</h3><p className={styles.meta}>{doc.kind}</p><blockquote style={{margin:"20px 0",paddingLeft:20,borderLeft:"3px solid #176b64",lineHeight:1.85,textAlign:"justify"}}>{doc.text}</blockquote><p className={styles.meta}>{doc.source}</p><details><summary>Éclairer le passage</summary><p>{doc.analysis}</p></details></section>)}
            <h3>Comparer les statistiques observées</h3><p>France, comptes nationaux base 2020, Insee Première n° 2105, 29 mai 2026. Les observations 2024 et 2025 viennent de la même publication. Les numéros renvoient au dossier de cours.</p>
            {data.hours.flatMap(h=>h.docs).filter(d=>[2,6,8].includes(d.id)).map(doc=><section className={styles.lessonBlock} key={doc.id}><h3>Document {doc.id} · {doc.title}</h3><p>{doc.id===8 ? "Le tableau ci-dessous présente uniquement les taux observés, distincts du cas construit du livret." : doc.text}</p><div className={styles.tableWrap} role="region" aria-label={doc.title} tabIndex={0}><table><thead><tr>{doc.table?.[0].map(c=><th scope="col" key={c}>{c}</th>)}</tr></thead><tbody>{doc.table?.slice(1).map((row,i)=><tr key={i}>{row.map((v,j)=>j===0?<th scope="row" key={j}>{v}</th>:<td key={j}>{v}</td>)}</tr>)}</tbody></table></div><p className={styles.meta}>{doc.id===6?"Unité : % du revenu disponible brut des ménages.":doc.id===2?"Unité : milliards d’euros ; solde annuel, positif pour une capacité et négatif pour un besoin.":"Unité : % de la FBCF ; épargne brute / FBCF × 100."}</p><details><summary>Interpréter les données</summary><p>{doc.analysis}</p></details></section>)}
            <a href={data.sources[2][1]}>Consulter les tableaux et les notes de l’Insee</a>
            {data.hours.flatMap(h=>h.docs).flatMap(doc=>"extra" in doc ? doc.extra as {title: string; text: string; source: string}[] : []).map(e=><section className={styles.lessonBlock} key={e.title}><h3>{e.title}</h3><p>{e.text}</p><p className={styles.meta}>{e.source}</p></section>)}
          </>}
          {activeSection === 6 && data.erreurs.map(([error, correction]) => <section className={styles.lessonBlock} key={error}><h3>{error}</h3><p>{correction}</p></section>)}
          {activeSection === 7 && <><p>Une série tire 10 questions dans une banque de 28. Choisis une réponse par question ; la correction explique le mécanisme. Une nouvelle série peut contenir des questions déjà rencontrées.</p><button className={styles.primaryButton} type="button" onClick={startQuiz}>{quiz.length ? "Tirer une nouvelle série" : "Commencer le quiz"}</button>{quiz.map((id, i) => {
            const [question, options, answer, explanation] = data.quiz[id] as [string, string[], number, string];
            const chosen = answers[id];
            return <fieldset className={styles.quizQuestion} key={id}><legend>{i+1}. {question}</legend>{options.map((option, j) => <button type="button" key={option} disabled={chosen !== undefined} aria-pressed={chosen === j} className={`${styles.option} ${chosen !== undefined && j === answer ? styles.correct : chosen === j ? styles.wrong : ""}`} onClick={() => setAnswers(old => ({...old, [id]:j}))}>{option}{chosen !== undefined && j === answer ? " — Bonne réponse" : ""}</button>)}<div aria-live="polite">{chosen !== undefined && <p className={styles.feedback}><strong>{chosen === answer ? "Bonne réponse." : "À reprendre."}</strong> {explanation}</p>}</div></fieldset>;
          })}<div aria-live="polite">{finished && <div className={styles.callout}><h3>{correct}/10 — {correct >= 7 ? "Chapitre validé" : "Continue l’entraînement"}</h3><p>{notice}</p><Link href="/espace-eleves">Voir Mon espace</Link></div>}</div></>}
          {activeSection === 8 && <><h3>Expliquer avec la méthode AEI</h3><p>Affirme une idée qui répond à la question, explique les décisions et leurs conséquences, puis illustre avec un calcul ou un exemple. Pour une étude de document, distingue au brouillon ce qu’il apporte, ce que tu connais grâce au cours et la manière de les articuler.</p>{data.exercices.map(([type,task,guide,correction])=><section className={styles.lessonBlock} key={type}><h3>{type}</h3><p><strong>{task}</strong></p><p>{guide}</p><details><summary>Voir la correction expliquée</summary><p>{correction}</p></details></section>)}<p>Sujets construits pour les compétences de Première ; ce ne sont pas des annales nationales.</p></>}
          {activeSection === 9 && <><p>Ce cours résumé relie les notions, les calculs et les mécanismes. Il permet de retrouver les raisonnements avant de reprendre le quiz.</p><a className={styles.primaryButton} href="/memos/premiere-financement-agents-economiques.pdf" download>Télécharger le cours résumé en PDF</a>{data.cours.map(c=><section className={styles.lessonBlock} key={c.title}><h3>{c.title}</h3><p>{c.paragraphs[0]}</p>{c.paragraphs.length>2&&<p>{c.paragraphs[c.paragraphs.length-1]}</p>}</section>)}</>}
          {activeSection === 10 && <><p>Le parcours s’appuie sur les quatre PDF fournis : le dossier de P. Savoye, la synthèse « Chapitre 4 », le dossier de Mme Rabhi et celui d’A. Pilippossian. Les textes d’auteurs et institutionnels repris sont référencés sous chaque passage. Les coupures déjà présentes dans les dossiers sont conservées.</p><p>Les commentaires corrigent les confusions entre EBE et bénéfice net, émission d’actions et emprunt, marché primaire et secondaire, budget de l’État et ensemble des administrations publiques, intérêts et remboursement du principal. Les tendances sectorielles et les effets de relance ou d’éviction sont présentés avec leurs conditions.</p>{data.sources.map(([title,href,detail])=><a className={styles.sourceItem} key={href} href={href}><strong>{title}</strong><br/>{detail}</a>)}<p>Vérifié le 2 novembre 2026. Le texte des Cahiers français présente un exemple historique de 2008-2009. Les montants des prêts, des comptes simplifiés, du budget fictif et du modèle de fonds prêtables sont construits pour CAPSES ; ils ne sont pas des offres financières ni des observations de la France. La vidéo CAPSES est à venir.</p></>}
          <nav className={styles.pager} aria-label="Étapes du chapitre"><button type="button" disabled={activeSection === 0} onClick={() => go(activeSection-1)}>← Précédent</button><span>{activeSection+1} / {sections.length}</span><button type="button" disabled={activeSection === sections.length-1} onClick={() => go(activeSection+1)}>Suivant →</button></nav>
        </article>
      </div><footer className={styles.footer}>P. MENCE · SES Première · 2026–2027 · Lycée Félix Éboué</footer>
    </div>
  </main>;
}
