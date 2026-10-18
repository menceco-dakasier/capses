"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import data from "./content.json";
import styles from "./page.module.css";

const sections = ["Objectifs d’apprentissage", "Notions indispensables", "Le cours en 10 minutes", "Résumé vidéo", "Mécanismes et graphiques", "Les données en pratique", "Erreurs fréquentes", "Quiz", "Méthode et entraînements", "Fiche mémo", "Sources"];
const SLUG = "premiere-marche-concurrentiel";
function draw() {
  const ids = data.quiz.map((_, i) => i);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids.slice(0, 10);
}

function Graph({ mode }: { mode: "equilibre" | "demande" | "offre" | "taxe" | "surplus" }) {
  const tax = mode === "taxe";
  const title = { equilibre: "Équilibre : prix 4 €, quantité 60", demande: "Hausse de la demande : prix et quantité augmentent", offre: "Hausse de l’offre : prix baisse, quantité augmente", taxe: "Taxe de 3 € : prix payé 6 €, prix net reçu 3 €, quantité 40", surplus: "Surplus : 180 € pour les consommateurs, 90 € pour les producteurs" }[mode];
  const x = (q: number) => 50 + q * 3;
  const y = (price: number) => 300 - price * 25;
  return <figure className={styles.figure}>
    <svg viewBox="0 0 420 345" role="img" aria-label={title}>
      <title>{title}</title>
      {mode === "surplus" && <><polygon points={`${x(0)},${y(10)} ${x(60)},${y(4)} ${x(0)},${y(4)}`} fill="#d8ebe8"/><polygon points={`${x(0)},${y(1)} ${x(60)},${y(4)} ${x(0)},${y(4)}`} fill="#f5dfc8"/></>}
      <path d="M50 25V300H390" fill="none" stroke="#142343" strokeWidth="2"/>
      <text x="8" y="20">Prix (€)</text><text x="292" y="335">Quantité</text>
      <path d={`M${x(0)} ${y(10)} L${x(100)} ${y(0)}`} stroke="#176b64" strokeWidth="3" fill="none"/>
      <path d={`M${x(0)} ${y(1)} L${x(100)} ${y(6)}`} stroke="#9a5524" strokeWidth="3" fill="none"/>
      <text x="355" y="295" fill="#176b64">D</text><text x="355" y="147" fill="#9a5524">O</text>
      <path d={`M50 ${y(4)} H${x(60)} V300`} stroke="#52617a" strokeDasharray="5 4" fill="none"/>
      <circle cx={x(60)} cy={y(4)} r="5" fill="#142343"/>
      <text x="28" y={y(4)+5}>4</text><text x={x(60)-8} y="319">60</text><text x={x(60)+6} y={y(4)-8}>E₀</text>
      {mode === "demande" && <><path d={`M${x(0)} ${y(12)} L${x(110)} ${y(1)}`} stroke="#176b64" strokeWidth="3" strokeDasharray="7 4" fill="none"/><circle cx={x(220/3)} cy={y(14/3)} r="5" fill="#176b64"/><text x={x(220/3)+8} y={y(14/3)-8}>E₁</text><text x="355" y="270">D₁</text></>}
      {mode === "offre" && <><path d={`M${x(0)} ${y(0)} L${x(110)} ${y(5.5)}`} stroke="#9a5524" strokeWidth="3" strokeDasharray="7 4" fill="none"/><circle cx={x(200/3)} cy={y(10/3)} r="5" fill="#9a5524"/><text x={x(200/3)+8} y={y(10/3)+19}>E₁</text><text x="355" y="181">O₁</text></>}
      {tax && <><path d={`M${x(0)} ${y(4)} L${x(100)} ${y(9)}`} stroke="#9a5524" strokeWidth="3" strokeDasharray="7 4" fill="none"/><path d={`M50 ${y(6)} H${x(40)} V${y(3)} H50`} fill="none" stroke="#52617a" strokeDasharray="4 4"/><path d={`M${x(40)} ${y(3)}V300`} stroke="#52617a" strokeDasharray="4 4"/><circle cx={x(40)} cy={y(6)} r="5" fill="#142343"/><text x="27" y={y(6)+5}>6</text><text x="27" y={y(3)+5}>3</text><text x={x(40)-8} y="319">40</text><text x="355" y="78">O + taxe</text></>}
    </svg>
    <figcaption>{title}. Exemple pédagogique construit : Qd = 100 − 10P ; Qo = 20P − 20. {mode === "demande" && "La nouvelle demande vaut 120 − 10P : E₁ ≈ (73,33 ; 4,67)."}{mode === "offre" && "La nouvelle offre vaut 20P : E₁ ≈ (66,67 ; 3,33)."}{mode === "surplus" && "Demande : trait vert ; offre : trait ocre. Les aires se situent de part et d’autre du prix de 4 €."}</figcaption>
  </figure>;
}

export default function MarcheConcurrentielPage() {
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
    <header className={styles.header}><div className={styles.headerInner}>
      <Link className={styles.brand} href="/">CAPSES</Link>
      <nav className={styles.topLinks} aria-label="Navigation principale"><Link href="/premiere">Première</Link><Link href="/methodes">Méthodes</Link><Link href="/espace-eleves">Mon espace</Link></nav>
    </div></header>
    <div className={styles.shell}>
      <div className={styles.breadcrumb}><Link href="/">Accueil</Link> / <Link href="/premiere">Première</Link> / Marché concurrentiel</div>
      <section className={styles.chapterHero}><span className={styles.eyebrow}>Première SES · Science économique</span>
        <h1>Comment un marché concurrentiel fonctionne-t-il ?</h1>
        <p>Des règles de l’échange aux gains partagés : comprendre les prix, raisonner avec les courbes et s’entraîner pas à pas.</p>
        <p className={styles.meta}>6 objectifs · 24 questions dans la banque du quiz · Cours de P. Mence</p>
      </section>
      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Parcours de révision">
          <div className={styles.progressCard}><strong>Ton parcours de lecture</strong><p>{visited.length} / {sections.length} rubriques consultées</p><progress max={sections.length} value={visited.length} aria-label="Rubriques consultées"/><small>Consulter une rubrique ne signifie pas encore la maîtriser. Le quiz valide les acquis à partir de 7/10.</small></div>
          <nav className={styles.stepNav}>{sections.map((label, i) => <button type="button" key={label} className={`${styles.stepButton} ${activeSection === i ? styles.active : ""}`} aria-current={activeSection === i ? "step" : undefined} onClick={() => go(i)}><span className={styles.stepNum}>{String(i+1).padStart(2,"0")}</span>{label}<span className={styles.visit}>{visited.includes(i) ? "✓" : ""}</span></button>)}</nav>
        </aside>
        <article id="chapter-content" className={styles.contentCard}>
          <p className={styles.meta}>Étape {activeSection+1} sur {sections.length}</p>
          <h2 ref={heading} tabIndex={-1} className={styles.focusHeading}>{sections[activeSection]}</h2>
          {activeSection === 0 && <><p>Les six objectifs du programme guident l’ensemble du parcours. Pour chacun, commence par l’explication puis essaie de retrouver le mécanisme dans l’exemple.</p>{data.objectifs.map(([official, clear, example], i) => <section className={styles.lessonBlock} key={official}><h3>Objectif {i+1}</h3><p><strong>Objectif officiel</strong><br/>{official}</p><p><strong>En clair</strong><br/>{clear}</p><p className={styles.callout}><strong>Exemple concret</strong><br/>{example}</p></section>)}</>}
          {activeSection === 1 && <dl className={styles.definitions}>{data.notions.map(([term, definition, use]) => <div key={term}><dt>{term}</dt><dd>{definition}<p>{use}</p></dd></div>)}</dl>}
          {activeSection === 2 && <><p className={styles.callout}>Lis une partie, ferme les yeux et reformule son mécanisme en deux phrases. Les nombres utilisés dans les exercices ci-dessous sont construits pour apprendre ; les statistiques Insee figurent dans une rubrique distincte.</p>{data.cours.map(([title, paragraphs]) => <section className={styles.lessonBlock} key={title as string}><h3>{title}</h3>{(paragraphs as string[]).map(text => <p key={text}>{text}</p>)}</section>)}</>}
          {activeSection === 3 && <><p>Le résumé vidéo CAPSES de ce chapitre est <strong>à venir</strong>.</p><p>En attendant, le Campus de l’innovation du Collège de France propose des ressources pour reprendre ce chapitre.</p><a className={styles.sourceItem} href="https://campus-innovation-lycees.fr/comment-un-marche-concurrentiel-fonctionne-t-il/">Consulter les ressources du Campus</a></>}
          {activeSection === 4 && <><p>Les graphiques utilisent tous le même exemple construit. Prix en ordonnée, quantité en abscisse : commence toujours par lire ces deux axes.</p><Graph mode="equilibre"/><h3>1. Hausse de la demande</h3><p>Un changement de goûts augmente la quantité souhaitée à chaque prix. La demande se déplace ; à offre inchangée, prix et quantité d’équilibre augmentent. L’offre ne se déplace pas : on se déplace sur elle.</p><Graph mode="demande"/><h3>2. Hausse de l’offre</h3><p>Une baisse des coûts permet d’offrir davantage à chaque prix. À demande inchangée, le prix baisse et la quantité augmente.</p><Graph mode="offre"/><h3>3. Taxe de 3 € par unité</h3><p>Le prix net reçu vaut le prix payé moins 3 €. La nouvelle offre exprimée en prix payé vaut 20Pc − 80 ; le nouvel équilibre donne Pc = 6 €, Pp = 3 €, Q = 40.</p><Graph mode="taxe"/><h3>4. Lire les surplus</h3><Graph mode="surplus"/><p>À l’équilibre initial : SC = (10 − 4) × 60 / 2 = 180 € ; SP = (4 − 1) × 60 / 2 = 90 € ; total = 270 €. Après la taxe : SC = 80 €, SP = 40 €, recettes fiscales = 120 € ; total incluant l’État = 240 €. La perte sèche vaut 30 € : 3 × (60 − 40) / 2.</p><h3>5. Déduire l’offre du coût marginal</h3><p>Coûts marginaux successifs : 6, 10, 12, 15, 18, 22, 28, 36 €. Au prix de 20 €, cinq unités ; au prix de 25 €, six unités. Lorsque le prix augmente, davantage d’unités deviennent avantageuses : on retrouve l’offre croissante.</p></>}
          {activeSection === 5 && <><h3>Prix alimentaires : ralentissement ne signifie pas baisse</h3><p>Données observées de l’Insee : consommation finale des ménages en <strong>produits alimentaires et boissons non alcoolisées</strong>, France, comptes nationaux, base 2020. Évolutions annuelles en %, publication du 11 juin 2025 (millésime de cette publication).</p><div className={styles.tableWrap}><table><caption>Consommation alimentaire : prix et volume</caption><thead><tr><th scope="col">Indicateur</th><th scope="col">2023</th><th scope="col">2024</th></tr></thead><tbody><tr><th scope="row">Évolution des prix</th><td>+12,2 %</td><td>+1,3 %</td></tr><tr><th scope="row">Évolution de la dépense en volume</th><td>−3,1 %</td><td>+0,1 %</td></tr></tbody></table></div><p>En 2024, les prix augmentent encore : ils ne retrouvent pas leur niveau antérieur. L’évolution en volume corrige l’effet des prix ; elle ne représente pas un nombre unique de kilos ou d’articles.</p><details><summary>Pourquoi ne pas calculer directement une élasticité avec ces chiffres ?</summary><p>Deux années diffèrent aussi par les revenus, les préférences, les substitutions et les conditions d’offre. Diviser −3,1 par 12,2 ne suffit donc pas à identifier une élasticité causale de demande. Les données observées illustrent des évolutions ; le modèle isole un mécanisme toutes choses égales par ailleurs.</p></details><p><a href="https://www.insee.fr/fr/statistiques/8582021">Source et tableau original : Insee Première n° 2056, figure 1</a>. Ces données de comptes nationaux se distinguent de l’indice des prix à la consommation (IPC) : ne pas mélanger les deux séries.</p></>}
          {activeSection === 6 && data.erreurs.map(([error, correction]) => <section className={styles.lessonBlock} key={error}><h3>{error}</h3><p>{correction}</p></section>)}
          {activeSection === 7 && <><p>Une série tire 10 questions dans une banque de 24. Choisis une réponse par question ; la correction explique le mécanisme. Une nouvelle série peut contenir des questions déjà rencontrées.</p><button className={styles.primaryButton} type="button" onClick={startQuiz}>{quiz.length ? "Tirer une nouvelle série" : "Commencer le quiz"}</button>{quiz.map((id, i) => {
            const [question, options, answer, explanation] = data.quiz[id] as [string, string[], number, string];
            const chosen = answers[id];
            return <fieldset className={styles.quizQuestion} key={id}><legend>{i+1}. {question}</legend>{options.map((option, j) => <button type="button" key={option} disabled={chosen !== undefined} aria-pressed={chosen === j} className={`${styles.option} ${chosen !== undefined && j === answer ? styles.correct : chosen === j ? styles.wrong : ""}`} onClick={() => setAnswers(old => ({...old, [id]:j}))}>{option}{chosen !== undefined && j === answer ? " — Bonne réponse" : ""}</button>)}<div aria-live="polite">{chosen !== undefined && <p className={styles.feedback}><strong>{chosen === answer ? "Bonne réponse." : "À reprendre."}</strong> {explanation}</p>}</div></fieldset>;
          })}<div aria-live="polite">{finished && <div className={styles.callout}><h3>{correct}/10 — {correct >= 7 ? "Chapitre validé" : "Continue l’entraînement"}</h3><p>{notice}</p><Link href="/espace-eleves">Voir Mon espace</Link></div>}</div></>}
          {activeSection === 8 && <><h3>Une réponse AEI qui explique vraiment</h3><p><strong>Affirmer :</strong> énonce le mécanisme demandé. <strong>Expliquer :</strong> déroule les liens de cause à effet avec les notions du chapitre. <strong>Illustrer :</strong> utilise un exemple précis ou un calcul, puis rattache-le à la question.</p><details><summary>Exemple rédigé : pourquoi une hausse de l’offre réduit-elle le prix ?</summary><p>À demande inchangée, une hausse de l’offre réduit le prix d’équilibre. Une baisse des coûts permet aux producteurs de proposer plus à chaque prix : la courbe d’offre se déplace vers la droite. À l’ancien prix, un excès d’offre apparaît et exerce une pression à la baisse. Dans notre exemple, une offre passant de 20P − 20 à 20P fait passer le prix de 4 € à environ 3,33 € et la quantité de 60 à environ 66,67 unités.</p></details><h3>Entraînements progressifs — sujets construits</h3>{[
['Mobiliser ses connaissances','Montrez que le marché est une institution.','Définissez une institution ; expliquez le rôle des droits de propriété et des contrats ; illustrez avec la vente d’un téléphone.'],
['Lire les données','Comparez l’évolution des prix alimentaires en 2023 et 2024, puis expliquez pourquoi on ne peut pas conclure à une baisse des prix.','La hausse passe de 12,2 % à 1,3 %, soit un ralentissement de 10,9 points. Le taux reste positif : le niveau des prix augmente encore.'],
['Raisonner avec un calcul','Avec Qd = 100 − 10P et Qo = 20P − 20, calculez l’équilibre puis les effets d’une taxe de 3 € par unité.','Avant : P = 4 €, Q = 60. Après : Pc = 6 €, Pp = 3 €, Q = 40. Recettes publiques : 120 €. N’oubliez pas de distinguer prix payé et prix net reçu.'],
['Expliquer une décision','Au prix de 25 €, pourquoi l’entreprise du cours produit-elle six unités et pas sept ?','La 6e rapporte 25 € et coûte 22 € : elle accroît le profit de 3 €. La 7e coûte 28 € et le réduirait de 3 €.'],
['Préparer progressivement le bac','Expliquez pourquoi les gains à l’échange sont maximisés à l’équilibre concurrentiel.','Définissez les deux surplus. Montrez que les échanges dont la disposition à payer dépasse le coût marginal accroissent le total ; au-delà de l’équilibre, une unité supplémentaire le réduirait. Précisez les hypothèses du modèle.']
].map(([title, task, answer]) => <section className={styles.lessonBlock} key={title}><h3>{title}</h3><p><strong>{task}</strong></p><details><summary>Voir les éléments de correction</summary><p>{answer}</p></details></section>)}<p>Ces exercices sont rédigés pour ce chapitre : ils ne sont pas présentés comme des sujets d’annales officielles.</p></>}
          {activeSection === 9 && <><h3>L’essentiel à retrouver sans le cours</h3><ol><li>Le marché repose sur des institutions ; concurrence, oligopole et monopole se distinguent notamment par le nombre d’offreurs.</li><li>L’équilibre égalise les quantités offertes et demandées. Un preneur de prix choisit une quantité.</li><li>Prix du bien modifié : déplacement sur la courbe. Autre déterminant modifié : déplacement de la courbe.</li><li>À coût marginal croissant, la quantité optimale vérifie Cm = P dans le modèle continu.</li><li>Une taxe unitaire crée Pc − Pp = t ; sa charge se partage selon les réactions des agents.</li><li>SC = disposition à payer − prix payé ; SP = prix reçu − prix minimal accepté ; les gains totaux additionnent les deux surplus.</li><li>L’équilibre maximise les gains à l’échange sous les hypothèses concurrentielles ; cette propriété ne garantit pas l’égalité.</li></ol><a className={styles.primaryButton} href="/memos/premiere-marche-concurrentiel.pdf" download>Télécharger la fiche mémo PDF</a><p>Pour te tester : trace l’équilibre, un choc d’offre, un choc de demande, une taxe et les surplus, puis explique chaque graphique.</p></>}
          {activeSection === 10 && <><p>Le parcours est construit à partir du cours, de la synthèse élève et du corrigé V6 de P. Mence, croisés avec la fiche Éduscol fournie. Les explications sont adaptées pour CAPSES ; les ressources externes ne sont pas recopiées intégralement.</p>{data.sources.map(([title, href, detail]) => <a className={styles.sourceItem} key={href} href={href}><strong>{title}</strong>{detail}</a>)}<p>Vérification des ressources : 18 octobre 2026. Les chiffres observés portent les dates de leur publication ; les exemples numériques sont identifiés comme construits.</p></>}
          <nav className={styles.pager} aria-label="Étapes du chapitre"><button type="button" disabled={activeSection === 0} onClick={() => go(activeSection-1)}>← Précédent</button><span>{activeSection+1} / {sections.length}</span><button type="button" disabled={activeSection === sections.length-1} onClick={() => go(activeSection+1)}>Suivant →</button></nav>
        </article>
      </div><footer className={styles.footer}>P. MENCE · SES Première · 2026–2027 · Lycée Félix Éboué</footer>
    </div>
  </main>;
}
