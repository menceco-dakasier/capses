"use client";

import Link from "next/link";
import { LevelNavigation } from "../../level-navigation";
import { useEffect, useRef, useState } from "react";
import data from "./content.json";
import resume from "./resume.json";
import styles from "../marche-concurrentiel/page.module.css";

const sections = ["Objectifs d’apprentissage", "Notions indispensables", "Le cours en 10 minutes", "Résumé vidéo", "Mécanismes et graphiques", "Les données en pratique", "Erreurs fréquentes", "Quiz", "Méthode et entraînements", "Fiche mémo", "Sources"];
const SLUG = "premiere-marches-imparfaits";
function draw() {
  const ids = data.quiz.map((_, i) => i);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids.slice(0, 10);
}

function MonopoleGraph({ surplus = false }: { surplus?: boolean }) {
  const x = (q: number) => 58 + 23*q;
  const y = (p: number) => 338 - 9*p;
  return <figure className={styles.figure}>
    <svg viewBox="0 0 480 405" role="img" aria-label={surplus ? "Surplus du monopole : consommateurs 36 euros, producteur 72 euros, perte sèche 36 euros" : "Demande, recette marginale et coût marginal : monopole 6 unités à 20 euros, concurrence 12 unités à 8 euros"}>
      <title>{surplus ? "Surplus et perte sèche du monopole" : "Comment lire le prix et la quantité du monopole"}</title>
      {surplus && <><polygon points={`${x(0)},${y(32)} ${x(6)},${y(20)} ${x(0)},${y(20)}`} fill="#d8ebe8"/><rect x={x(0)} y={y(20)} width={x(6)-x(0)} height={y(8)-y(20)} fill="#f4dfc8"/><polygon points={`${x(6)},${y(20)} ${x(12)},${y(8)} ${x(6)},${y(8)}`} fill="#eadce9"/></>}
      <path d="M58 25V338H435" fill="none" stroke="#142343" strokeWidth="2"/>
      <text x="7" y="18">Prix, coûts et recettes (€)</text><text x="292" y="373">Quantité de gâteaux</text>
      <path d={`M${x(0)} ${y(32)}L${x(16)} ${y(0)}`} stroke="#176b64" strokeWidth="3" fill="none"/>
      {!surplus && <path d={`M${x(0)} ${y(32)}L${x(8)} ${y(0)}`} stroke="#73518b" strokeWidth="3" strokeDasharray="8 5" fill="none"/>}
      <path d={`M${x(0)} ${y(8)}H${x(16)}`} stroke="#9a5524" strokeWidth="3"/>
      <path d={`M58 ${y(20)}H${x(6)}V338M${x(12)} ${y(8)}V338`} fill="none" stroke="#52617a" strokeDasharray="4 4"/>
      <circle cx={x(6)} cy={y(20)} r="5" fill="#142343"/><circle cx={x(12)} cy={y(8)} r="5" fill="#142343"/>
      {!surplus && <circle cx={x(6)} cy={y(8)} r="5" fill="#73518b"/>}
      <text x="27" y={y(32)+5}>32</text><text x="27" y={y(20)+5}>20</text><text x="35" y={y(8)+5}>8</text><text x={x(6)-5} y="358">6</text><text x={x(12)-10} y="358">12</text>
      <text x={x(6)+9} y={y(20)-9}>M</text><text x={x(12)+9} y={y(8)-9}>C</text><text x="430" y={y(8)+5}>Cm</text><text x="420" y="326">D</text>
      {!surplus && <text x={x(8)+10} y="326">Rm</text>}
      {surplus && <><text x="72" y="126">SC = 36</text><text x="73" y="218">SP = 72</text><text x="211" y="238">36</text></>}
    </svg>
    <figcaption>Exemple pédagogique construit, repris du cours de référence : D : P = 32 − 2Q ; Cm = 8 ; aucun coût fixe. M : monopole (6 ; 20). C : concurrence (12 ; 8). {surplus ? "Triangle vert : surplus des consommateurs ; rectangle ocre : surplus du producteur ; triangle violet entre 6 et 12 : perte sèche." : "D est en trait plein ; Rm = 32 − 4Q est en pointillés ; Cm est horizontal. Cherche Q à Rm = Cm, puis lis P sur D."} Les courbes représentent des quantités continues ; le tableau explique séparément les unités entières.</figcaption>
  </figure>;
}
function Dilemme() {
 return <div className={styles.tableWrap}><table><caption>Jeu construit : gains (A ; B), en millions d’euros</caption><thead><tr><th scope="col">A \ B</th><th scope="col">B : prix élevé</th><th scope="col">B : prix faible</th></tr></thead><tbody><tr><th scope="row">A : prix élevé</th><td>15 ; 15</td><td>0 ; 20</td></tr><tr><th scope="row">A : prix faible</th><td>20 ; 0</td><td>3 ; 3</td></tr></tbody></table></div>;
}

export default function MarchesImparfaitsPage() {
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
      <div className={styles.breadcrumb}><Link href="/">Accueil</Link> / <Link href="/premiere">Première</Link> / Marchés imparfaitement concurrentiels</div>
      <section className={styles.chapterHero}><span className={styles.eyebrow}>Première SES · Science économique</span>
        <h1>Comment les marchés imparfaitement concurrentiels fonctionnent-ils ?</h1>
        <p>Pouvoir de marché, monopoles et oligopoles : expliquer les stratégies des entreprises et le rôle de la politique de la concurrence.</p>
        <p className={styles.meta}>5 objectifs · 28 questions dans la banque du quiz · Cours de P. Mence</p>
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
          {activeSection === 2 && <><p className={styles.callout}>Lis une partie, ferme les yeux et reformule son mécanisme en deux phrases. Les graphiques et le jeu sont des exemples construits. Les données observées de l’Insee et les décisions de l’Autorité de la concurrence sont identifiées séparément.</p>{data.cours.map(({title, paragraphs}) => <section className={styles.lessonBlock} key={title}><h3>{title}</h3>{paragraphs.map(text => <p key={text}>{text}</p>)}</section>)}</>}
          {activeSection === 3 && <><p>Le résumé vidéo CAPSES de ce chapitre est <strong>à venir</strong>.</p><p>Pour réviser en attendant, explique à voix haute : d’où vient le pouvoir de marché, comment le monopole choisit son prix, puis pourquoi une entente peut être profitable aux entreprises et défavorable aux consommateurs.</p><p>Reprends ensuite les graphiques guidés et le tableau du dilemme du prisonnier.</p></>}
          {activeSection === 4 && <><p className={styles.callout}>Pour expliquer : nomme les axes et les hypothèses, décris la décision des agents, puis relie-la au prix, aux quantités et aux surplus. Les calculs sont des exemples construits, pas des statistiques.</p>{data.mechanismes.map((section,i) => <section className={styles.lessonBlock} key={section.title}><h3>{section.title}</h3>{i === 2 && <MonopoleGraph/>}{i === 4 && <MonopoleGraph surplus/>}{i === 5 && <Dilemme/>}{section.paragraphs.map(p => <p key={p}>{p}</p>)}{i === 2 && <div className={styles.tableWrap}><table><caption>Calcul discret : combien rapporte vraiment chaque gâteau supplémentaire ?</caption><thead><tr>{['Quantité','Prix (€)','Recette totale (€)','Coût total (€)','Profit (€)','Recette marginale (€)'].map(t=><th scope="col" key={t}>{t}</th>)}</tr></thead><tbody>{[0,1,2,3,4,5,6,7,8,9,10,11,12].map(q=><tr key={q}><th scope="row">{q}</th><td>{32-2*q}</td><td>{(32-2*q)*q}</td><td>{8*q}</td><td>{(24-2*q)*q}</td><td>{q===0 ? '—' : 34-4*q}</td></tr>)}</tbody></table></div>}{i === 3 && <div className={styles.tableWrap}><table><caption>Même demande et mêmes coûts : comparaison des résultats</caption><thead><tr><th scope="col">Indicateur</th><th scope="col">Concurrence</th><th scope="col">Monopole</th></tr></thead><tbody>{[['Prix','8 €','20 €'],['Quantité','12','6'],['Surplus des consommateurs','144 €','36 €'],['Surplus du producteur (ici profit)','0 €','72 €'],['Surplus total','144 €','108 €'],['Perte sèche','0 €','36 €']].map(row=><tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody></table></div>}</section>)}</>}
          {activeSection === 5 && <>
            <h3>Guyane : lire un écart de prix sans en inventer la cause</h3><p>Source : Insee Analyses Guyane n° 63, publié le 11 juillet 2023. Enquête de comparaison spatiale des prix 2022 ; écarts de Fisher entre Guyane et France métropolitaine. Unité : %.</p>
            <div className={styles.tableWrap}><table><caption>Écarts de niveaux de prix en 2022, Guyane / France métropolitaine</caption><thead><tr><th scope="col">Poste</th><th scope="col">Écart (%)</th></tr></thead><tbody><tr><th scope="row">Ensemble de la consommation</th><td>+14</td></tr><tr><th scope="row">Produits alimentaires et boissons non alcoolisées</th><td>+39</td></tr><tr><th scope="row">Services de communication</th><td>+35</td></tr></tbody></table></div>
            <p>Un écart alimentaire de +39 % signifie un niveau de prix plus élevé en Guyane selon l’indicateur de comparaison ; il ne signifie pas une hausse de 39 % pendant l’année. À titre d’illustration arithmétique, une base 100 devient 139. Ce calcul ne reproduit pas le prix de chaque panier réel : l’indice de Fisher combine deux comparaisons tenant compte des habitudes de consommation.</p>
            <details><summary>Comparer et interpréter : correction guidée</summary><p>L’écart alimentaire dépasse l’écart global de 39 − 14 = 25 points de pourcentage. On ne dit pas « 25 % de plus ». Ces chiffres décrivent des différences entre territoires. Ils ne mesurent ni la marge des distributeurs, ni leur pouvoir de marché, ni la part des écarts imputable à une entente. Il faut examiner aussi transport, fiscalité, coûts et taille du marché ; prouver une coordination exige d’autres éléments.</p></details>
            <a href="https://www.insee.fr/fr/statistiques/7649076">Consulter les tableaux et la méthode de l’Insee</a>
            <h3>Décisions publiques : trois instruments à distinguer</h3>
            <section className={styles.lessonBlock}><h4>Entente horizontale · Compotes</h4><p>Le 17 décembre 2019, l’Autorité de la concurrence a prononcé 58,283 millions d’euros de sanctions pour un accord sur les prix et une répartition des clients et volumes, entre octobre 2010 et janvier 2014. Coroos a bénéficié d’une exonération totale au titre de la clémence. L’intérêt de l’exemple est la coordination entre concurrents et sa fragilité, pas le seul montant de l’amende.</p><a href={data.sources[3][1]}>Décision 19-D-24</a></section>
            <section className={styles.lessonBlock}><h4>Abus de position dominante · Apple</h4><p>Dans sa décision du 31 mars 2025 (25-D-02), l’Autorité a sanctionné Apple à hauteur de 150 millions d’euros dans le secteur de la publicité sur applications mobiles sur les terminaux iOS. On cite ici une décision de l’Autorité, sans la présenter comme définitivement confirmée par les juridictions. Le montant ne mesure pas directement la perte de surplus des consommateurs.</p><a href={data.sources[5][1]}>Bilan de l’Autorité présentant la décision</a></section>
            <section className={styles.lessonBlock}><h4>Contrôle d’une concentration · Carrefour / Cora et Match</h4><p>Le 13 mars 2025, l’Autorité a autorisé l’opération sous conditions. Les engagements visent à préserver des solutions concurrentes sur les marchés locaux concernés. Ce contrôle des effets du regroupement se distingue d’une sanction pour entente ou abus.</p><a href={data.sources[4][1]}>Décision et engagements annoncés</a></section>
            <details><summary>Prolongement DROM : une entente verticale</summary><p>La décision 26-D-04 du 2 avril 2026 concerne des droits exclusifs d’importation de câbles Nexans accordés à des sociétés du groupe Sonepar dans les DROM, pour une période allant de mai 2015 à novembre 2023. Elle relie un fabricant et un distributeur : ce n’est pas le même type de coordination qu’un cartel horizontal de producteurs concurrents. On cite la décision de l’Autorité sans préjuger de l’issue des recours.</p><a href={data.sources[6][1]}>Lire la décision</a></details>
          </>}
          {activeSection === 6 && data.erreurs.map(([error, correction]) => <section className={styles.lessonBlock} key={error}><h3>{error}</h3><p>{correction}</p></section>)}
          {activeSection === 7 && <><p>Une série tire 10 questions dans une banque de 28. Choisis une réponse par question ; la correction explique le mécanisme. Une nouvelle série peut contenir des questions déjà rencontrées.</p><button className={styles.primaryButton} type="button" onClick={startQuiz}>{quiz.length ? "Tirer une nouvelle série" : "Commencer le quiz"}</button>{quiz.map((id, i) => {
            const [question, options, answer, explanation] = data.quiz[id] as [string, string[], number, string];
            const chosen = answers[id];
            return <fieldset className={styles.quizQuestion} key={id}><legend>{i+1}. {question}</legend>{options.map((option, j) => <button type="button" key={option} disabled={chosen !== undefined} aria-pressed={chosen === j} className={`${styles.option} ${chosen !== undefined && j === answer ? styles.correct : chosen === j ? styles.wrong : ""}`} onClick={() => setAnswers(old => ({...old, [id]:j}))}>{option}{chosen !== undefined && j === answer ? " — Bonne réponse" : ""}</button>)}<div aria-live="polite">{chosen !== undefined && <p className={styles.feedback}><strong>{chosen === answer ? "Bonne réponse." : "À reprendre."}</strong> {explanation}</p>}</div></fieldset>;
          })}<div aria-live="polite">{finished && <div className={styles.callout}><h3>{correct}/10 — {correct >= 7 ? "Chapitre validé" : "Continue l’entraînement"}</h3><p>{notice}</p><Link href="/espace-eleves">Voir Mon espace</Link></div>}</div></>}
          {activeSection === 8 && <><h3>Une réponse AEI qui déroule le mécanisme</h3><p><strong>Affirmer :</strong> réponds précisément à la question avec une notion. <strong>Expliquer :</strong> relie les décisions et leurs conséquences avec « car », « donc », « ce qui ». <strong>Illustrer :</strong> mobilise un exemple daté ou un calcul, puis montre ce qu’il prouve.</p><details><summary>Exemple rédigé : comment une entente réduit-elle le surplus des consommateurs ?</summary><p>Une entente sur les prix réduit la pression concurrentielle entre ses participants. Au lieu de chercher des clients en baissant leur prix, les entreprises coordonnent un prix plus élevé ou limitent les quantités. À demande inchangée, les consommateurs paient davantage et certains échanges disparaissent ; leur surplus diminue. Le cartel des compotes sanctionné en 2019 illustre cette coordination des prix et des marchés. L’amende de 58,283 M€ ne constitue toutefois pas une mesure directe du surplus perdu.</p></details><h3>Entraînements progressifs · Sujets construits pour CAPSES</h3>{data.exercices.map(([type,task,guide,correction]) => <section className={styles.lessonBlock} key={type}><h3>{type}</h3><p><strong>{task}</strong></p><p>Pour construire ta réponse : {guide}</p><details><summary>Voir la correction expliquée</summary><p>{correction}</p></details></section>)}<p>Ces exercices préparent progressivement aux compétences de Première. Ils ne sont pas des annales officielles ni une prédiction des sujets.</p></>}
          {activeSection === 9 && <><p className={styles.callout}>Un cours résumé pour retrouver le raisonnement du chapitre : les notions sont expliquées ensemble et illustrées par les exemples construits du cours.</p><a className={styles.primaryButton} href="/memos/premiere-marches-imparfaits.pdf" download>Télécharger le cours résumé en PDF</a>{resume.map(section => <section className={styles.lessonBlock} key={section.title}><h3>{section.title}</h3>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}<p>Pour réviser, essaie de reformuler chaque mécanisme, puis de retrouver les étapes du calcul sans regarder la correction.</p></>}
          {activeSection === 10 && <><p>Le parcours s’appuie sur les trois documents fournis par P. Mence : cours de référence V4.4, traces écrites professeur et ancien cours du chapitre 2. Le plan et les exemples construits sont adaptés à CAPSES, avec vérification du programme et des sources primaires. Les formulations trop générales de l’ancien cours sur la position dominante et les aides publiques ne sont pas reprises. Les statistiques privées provisoires non nécessaires au raisonnement ne sont pas utilisées comme données certifiées. Les explications sont adaptées pour CAPSES ; les ressources externes ne sont pas recopiées intégralement.</p>{data.sources.map(([title, href, detail]) => <a className={styles.sourceItem} key={href} href={href}><strong>{title}</strong>{detail}</a>)}<p>Vérification des ressources : 18 octobre 2026. Les chiffres observés portent les dates de leur publication ; les exemples numériques sont identifiés comme construits.</p></>}
          <nav className={styles.pager} aria-label="Étapes du chapitre"><button type="button" disabled={activeSection === 0} onClick={() => go(activeSection-1)}>← Précédent</button><span>{activeSection+1} / {sections.length}</span><button type="button" disabled={activeSection === sections.length-1} onClick={() => go(activeSection+1)}>Suivant →</button></nav>
        </article>
      </div><footer className={styles.footer}>P. MENCE · SES Première · 2026–2027 · Lycée Félix Éboué</footer>
    </div>
  </main>;
}
