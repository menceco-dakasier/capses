"use client";

import Link from "next/link";
import { LevelNavigation } from "../../level-navigation";
import { useEffect, useRef, useState } from "react";
import data from "./content.json";
import resume from "./resume.json";
import styles from "../marche-concurrentiel/page.module.css";

const sections = ["Objectifs d’apprentissage", "Notions indispensables", "Le cours en 10 minutes", "Résumé vidéo", "Mécanismes à maîtriser", "Documents et données", "Erreurs fréquentes", "Quiz", "Méthode et entraînements", "Fiche mémo", "Sources"];
const SLUG = "premiere-defaillances-marche";
function draw() {
  const ids = data.quiz.map((_, i) => i);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids.slice(0, 10);
}

export default function DefaillancesMarchePage() {
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
      <div className={styles.breadcrumb}><Link href="/">Accueil</Link> / <Link href="/premiere">Première</Link> / Défaillances du marché</div>
      <section className={styles.chapterHero}><span className={styles.eyebrow}>Première SES · Science économique</span>
        <h1>Quelles sont les principales défaillances du marché ?</h1>
        <p>Pollution, ressources partagées et information cachée : comprendre pourquoi les décisions individuelles peuvent conduire à un résultat collectivement inefficace.</p>
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
          {activeSection === 2 && <><p className={styles.callout}>Pour comprendre une défaillance, retrouve le décideur, ce qu’il prend en compte et ce qu’il laisse de côté. Le cours explique les mécanismes ; les passages d’auteurs sont réunis dans « Documents et données ».</p>{data.cours.map(({title, paragraphs}) => <section className={styles.lessonBlock} key={title}><h3>{title}</h3>{paragraphs.map(text => <p key={text}>{text}</p>)}</section>)}</>}
          {activeSection === 3 && <><p>Le résumé vidéo CAPSES de ce chapitre est <strong>à venir</strong>.</p><p>En attendant, entraîne-toi à expliquer à voix haute la pollution non compensée, le financement de l’éclairage, le prélèvement des poissons, puis la différence entre caractéristique cachée et action cachée.</p></>}
          {activeSection === 4 && <>
            {data.mechanismes.map(s=><section className={styles.lessonBlock} key={s.title}><h3>{s.title}</h3>{s.paragraphs.map(p=><p key={p}>{p}</p>)}</section>)}
            <h3>Classer les biens : deux critères indépendants</h3>
            <div className={styles.tableWrap} role="region" aria-label="Tableau des catégories de biens, défilement horizontal si nécessaire" tabIndex={0}><table><caption>Classification dans les conditions d’usage indiquées</caption><thead><tr><th scope="col">Caractéristiques</th><th scope="col">Excluable</th><th scope="col">Non excluable</th></tr></thead><tbody><tr><th scope="row">Rival</th><td>Bien privé : une pomme vendue</td><td>Bien commun : poissons en haute mer en libre accès</td></tr><tr><th scope="row">Non rival</th><td>Bien de club : accès à un contenu numérique réservé aux abonnés, hors congestion</td><td>Bien collectif pur : éclairage d’une rue</td></tr></tbody></table></div>
            <h3>Un calcul guidé : quand la sélection adverse empêche les échanges</h3><p>Exemple construit pour CAPSES, en euros par véhicule. Il y a initialement autant de bonnes que de mauvaises voitures. Les acheteurs sont neutres face au risque et ne distinguent pas les qualités.</p>
            <div className={styles.tableWrap} role="region" aria-label="Valeurs et prix de réserve des voitures" tabIndex={0}><table><caption>Hypothèses pédagogiques, sans lien avec une cote automobile réelle</caption><thead><tr><th scope="col">Qualité</th><th scope="col">Valeur pour l’acheteur informé</th><th scope="col">Prix minimal du vendeur</th></tr></thead><tbody><tr><th scope="row">Bonne</th><td>10 000 €</td><td>8 000 €</td></tr><tr><th scope="row">Mauvaise</th><td>4 000 €</td><td>5 000 €</td></tr></tbody></table></div>
            <ol><li>Avec la qualité connue, les bonnes voitures pourraient s’échanger à un prix compris entre 8 000 et 10 000 €. Les mauvaises n’auraient pas d’échange avantageux aux valeurs retenues.</li><li>Si les deux qualités étaient proposées à parts égales sans pouvoir être distinguées, la valeur moyenne attendue serait (10 000 + 4 000) / 2 = 7 000 €. Cette moyenne est une première offre envisageable, pas un équilibre durable.</li><li>À 7 000 €, les vendeurs de bonnes voitures refusent, puisqu’ils exigent au moins 8 000 €. Les mauvaises voitures sont seules disposées à rester.</li><li>Une fois ce retrait anticipé, la disposition à payer tombe à 4 000 €, sous les 5 000 € exigés par les vendeurs restants. Aucun prix ne permet l’échange. Au-dessus de 8 000 €, les deux qualités seraient proposées, mais les acheteurs ne paieraient pas davantage que leur valeur moyenne de 7 000 €.</li></ol>
            <p>La disparition des échanges dépend des hypothèses. Si les vendeurs de mauvaises voitures acceptaient 3 000 €, un marché de mauvaises voitures pourrait subsister entre 3 000 et 4 000 €. La sélection adverse peut donc mener à l’absence d’équilibre avec échanges, sans le faire systématiquement.</p>
          </>}
          {activeSection === 5 && <>
            <p>Les trois passages d’auteurs proviennent du dossier de cours fourni ; un complément sur le bonus-malus automobile présente une règle publique appliquée dans les contrats. Nous conservons les passages continus et signalons les coupures déjà présentes. Les explications et corrections ajoutées sont rédigées pour CAPSES.</p>
            {data.documents.map((doc,index)=><section className={styles.lessonBlock} key={doc.title}><h3>{doc.title}</h3><p className={styles.meta}><strong>{index < 3 ? "Texte d’auteur · Document fourni" : "Complément réglementaire · Présentation CAPSES"}</strong><br/>{doc.author}</p><blockquote style={{margin:"20px 0",paddingLeft:20,borderLeft:"3px solid #176b64",lineHeight:1.85,textAlign:"justify"}}><p>{doc.text}</p></blockquote><p className={styles.callout}><strong>Pour lire avec précision</strong><br/>{doc.note}</p>{doc.questions.map(([q,a])=><div key={q}><p><strong>{q}</strong></p><details><summary>Voir l’explication</summary><p>{a}</p></details></div>)}</section>)}
            <h3>Relire le jeu d’Emmanuel Combe</h3><div className={styles.tableWrap} role="region" aria-label="Jeu de financement de l’éclairage" tabIndex={0}><table><caption>Utilités (A ; B), transcription pédagogique du document 2</caption><thead><tr><th scope="col">A / B</th><th scope="col">B contribue</th><th scope="col">B ne contribue pas</th></tr></thead><tbody><tr><th scope="row">A contribue</th><td>10 ; 10</td><td>2 ; 15</td></tr><tr><th scope="row">A ne contribue pas</th><td>15 ; 2</td><td>5 ; 5</td></tr></tbody></table></div>
            <h3>Document 5 · Lire des émissions sans les confondre avec un dommage monétaire</h3><p><strong>Complément statistique · Citepa, Secten, édition 2026, publié le 16 juin 2026.</strong> Estimation provisoire pour 2025. France au périmètre du protocole de Kyoto : métropole et outre-mer inclus dans l’Union européenne, dont la Guyane. Unité : millions de tonnes équivalent CO₂ (Mt CO₂ éq). Hors utilisation des terres, changement d’affectation des terres et foresterie (UTCATF) ; transports internationaux exclus de ce total.</p>
            <div className={styles.tableWrap} role="region" aria-label="Émissions françaises de gaz à effet de serre" tabIndex={0}><table><caption>Émissions territoriales françaises de GES en 2025, estimation provisoire</caption><thead><tr><th scope="col">Périmètre</th><th scope="col">Mt CO₂ éq</th></tr></thead><tbody><tr><th scope="row">Ensemble hors UTCATF</th><td>359,4</td></tr><tr><th scope="row">Dont transports</th><td>122,9</td></tr></tbody></table></div>
            <p><a href={data.sources[2][1]}>Consulter le tableau et ses notes méthodologiques</a></p><p><strong>Calcule la part des transports et explique pourquoi ces émissions peuvent illustrer une externalité négative.</strong></p><details><summary>Correction guidée</summary><p>122,9 / 359,4 × 100 ≈ 34,2 %, soit environ un tiers. Le dommage climatique touche des tiers ; il n’est pas nécessairement entièrement intégré au coût privé des décisions. Les émissions sont une grandeur physique : elles ne mesurent ni une somme de dommages en euros, ni la taxe optimale, ni à elles seules l’importance exacte de chaque défaillance.</p></details>
          </>}
          {activeSection === 6 && data.erreurs.map(([error, correction]) => <section className={styles.lessonBlock} key={error}><h3>{error}</h3><p>{correction}</p></section>)}
          {activeSection === 7 && <><p>Une série tire 10 questions dans une banque de 28. Choisis une réponse par question ; la correction explique le mécanisme. Une nouvelle série peut contenir des questions déjà rencontrées.</p><button className={styles.primaryButton} type="button" onClick={startQuiz}>{quiz.length ? "Tirer une nouvelle série" : "Commencer le quiz"}</button>{quiz.map((id, i) => {
            const [question, options, answer, explanation] = data.quiz[id] as [string, string[], number, string];
            const chosen = answers[id];
            return <fieldset className={styles.quizQuestion} key={id}><legend>{i+1}. {question}</legend>{options.map((option, j) => <button type="button" key={option} disabled={chosen !== undefined} aria-pressed={chosen === j} className={`${styles.option} ${chosen !== undefined && j === answer ? styles.correct : chosen === j ? styles.wrong : ""}`} onClick={() => setAnswers(old => ({...old, [id]:j}))}>{option}{chosen !== undefined && j === answer ? " — Bonne réponse" : ""}</button>)}<div aria-live="polite">{chosen !== undefined && <p className={styles.feedback}><strong>{chosen === answer ? "Bonne réponse." : "À reprendre."}</strong> {explanation}</p>}</div></fieldset>;
          })}<div aria-live="polite">{finished && <div className={styles.callout}><h3>{correct}/10 — {correct >= 7 ? "Chapitre validé" : "Continue l’entraînement"}</h3><p>{notice}</p><Link href="/espace-eleves">Voir Mon espace</Link></div>}</div></>}
          {activeSection === 8 && <><h3>Une réponse AEI qui déroule le mécanisme</h3><p><strong>Affirmer :</strong> réponds précisément à la question avec une notion. <strong>Expliquer :</strong> relie les décisions et leurs conséquences avec « car », « donc », « ce qui ». <strong>Illustrer :</strong> mobilise un exemple daté ou un calcul, puis montre ce qu’il prouve.</p><details><summary>Exemple rédigé : pourquoi l’éclairage d’une rue peut-il être insuffisamment financé ?</summary><p>L’éclairage d’une rue est un bien collectif pur dans les conditions habituelles : il est non rival et non excluable. Un habitant peut en bénéficier sans contribuer à son financement. Chacun peut alors préférer laisser ses voisins payer ; si ce comportement se généralise, les contributions volontaires sont insuffisantes. Le jeu d’Emmanuel Combe montre ainsi un résultat où chacun obtient 5 au lieu de 10 en contribuant ensemble. Le financement par des prélèvements obligatoires peut permettre la fourniture du service.</p></details><h3>Entraînements progressifs · Sujets construits pour CAPSES</h3>{data.exercices.map(([type,task,guide,correction]) => <section className={styles.lessonBlock} key={type}><h3>{type}</h3><p><strong>{task}</strong></p><p>Pour construire ta réponse : {guide}</p><details><summary>Voir la correction expliquée</summary><p>{correction}</p></details></section>)}<p>Ces exercices préparent progressivement aux compétences de Première. Ils ne sont pas des annales officielles ni une prédiction des sujets.</p></>}
          {activeSection === 9 && <><p className={styles.callout}>Un cours résumé pour retrouver le raisonnement du chapitre : les notions sont expliquées ensemble et illustrées par les exemples du cours.</p><a className={styles.primaryButton} href="/memos/premiere-defaillances-marche.pdf" download>Télécharger le cours résumé en PDF</a>{resume.map(section => <section className={styles.lessonBlock} key={section.title}><h3>{section.title}</h3>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}<p>Pour réviser, distingue les trois familles de défaillances, puis explique un instrument adapté à chacune. Reprends ensuite la boucle de sélection adverse sans regarder le cours.</p></>}
          {activeSection === 10 && <><p>Le chapitre s’appuie sur les quatre fichiers fournis : le dossier documentaire « Ch3 Quelles sont les principales défaillances de marché ? » (4 pages), la synthèse « Chapitre 3 Quelles sont les principales défaillances du marché ? » (4 pages), la fiche de vocabulaire de P. Savoye (1 page) et la fiche Éduscol (juin 2019, 7 pages). Le premier document porte par erreur l’en-tête « Seconde » ; les objectifs correspondent bien à la Première.</p><p>Les passages de Giraud, Combe et Mankiw et Taylor sont reproduits du dossier fourni, avec les références qui y figurent. Les coupures présentes dans ce dossier sont signalées ; les textes ne sont pas présentés comme les œuvres intégrales. Les explications CAPSES, les exemples chiffrés construits et les statistiques observées sont identifiés séparément. Le complément sur le bonus-malus s’appuie sur le Code des assurances (article A121-1 et annexe).</p><h3>Références scientifiques pour situer le chapitre</h3><ul><li>James E. Meade, « External Economies and Diseconomies in a Competitive Situation », The Economic Journal, 1952 : exemple de l’apiculture et des vergers.</li><li>George A. Akerlof, « The Market for “Lemons”: Quality Uncertainty and the Market Mechanism », The Quarterly Journal of Economics, 1970 : qualité cachée et sélection adverse.</li><li>Elinor Ostrom, Governing the Commons, Cambridge University Press, 1990 : institutions de gestion des ressources communes.</li></ul><p>Ces références situent les mécanismes du chapitre. La fiche Éduscol fournit le cadrage scientifique et cite notamment Akerlof. Les présentations CAPSES ne sont pas des citations de ces auteurs. Les définitions et explications imprécises des documents fournis ont été rectifiées : acteurs concernés par les externalités, deux critères des biens collectifs, surexploitation des communs, sélection adverse et actions cachées, encadrement réglementaire du bonus-malus automobile.</p>{data.sources.map(([title, href, detail]) => <a className={styles.sourceItem} key={href} href={href}><strong>{title}</strong><br/>{detail}</a>)}<p>Vérification : 2 novembre 2026. Les statistiques restent datées de leur période d’observation et de leur publication. La vidéo CAPSES est à venir.</p></>}
          <nav className={styles.pager} aria-label="Étapes du chapitre"><button type="button" disabled={activeSection === 0} onClick={() => go(activeSection-1)}>← Précédent</button><span>{activeSection+1} / {sections.length}</span><button type="button" disabled={activeSection === sections.length-1} onClick={() => go(activeSection+1)}>Suivant →</button></nav>
        </article>
      </div><footer className={styles.footer}>P. MENCE · SES Première · 2026–2027 · Lycée Félix Éboué</footer>
    </div>
  </main>;
}
