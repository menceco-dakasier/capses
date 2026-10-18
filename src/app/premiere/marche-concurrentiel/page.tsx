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
          {activeSection === 4 && <>
            <p>Une courbe ne raconte pas seulement que « le prix monte » ou que « la quantité baisse ». Elle représente les choix des agents à différents prix. Pour expliquer un graphique, il faut retrouver ce qui change, la réaction des acheteurs et des vendeurs, puis le nouvel équilibre.</p>
            <p className={styles.callout}><strong>Le fil du raisonnement</strong><br/>Quel événement se produit ? → Modifie-t-il le prix du bien ou un autre déterminant ? → Sur quelle courbe agit-il ? → Que se passe-t-il à l’ancien prix ? → Comment le prix et les quantités s’ajustent-ils ?</p>
            <h3>1. Lire les courbes avant de chercher l’équilibre</h3>
            <p><strong>Les axes.</strong> Le prix est en ordonnée, sur l’axe vertical ; la quantité est en abscisse, sur l’axe horizontal. Pour lire une quantité demandée à un prix donné, pars de ce prix, rejoins horizontalement la demande, puis descends vers l’axe des quantités. Recommence avec l’offre pour comparer les deux quantités.</p>
            <p><strong>Pourquoi la demande est-elle décroissante ?</strong> Toutes choses égales par ailleurs, lorsque le prix augmente, certains acheteurs renoncent au produit, en achètent moins ou se tournent vers un substitut. La quantité demandée diminue. Dans notre exemple construit, Qd = 100 − 10P : à 3 €, les acheteurs demandent 70 unités ; à 4 €, ils en demandent 60. Une hausse de 1 € réduit ici la quantité demandée de 10 unités.</p>
            <p><strong>Pourquoi l’offre est-elle croissante ?</strong> À coûts de production inchangés, un prix plus élevé rend avantageuses des unités supplémentaires, dont le coût marginal était auparavant trop élevé. Les producteurs souhaitent donc en vendre davantage. Avec Qo = 20P − 20, ils proposent 40 unités à 3 € et 60 unités à 4 €. Une hausse de 1 € accroît ici la quantité offerte de 20 unités.</p>
            <p><strong>Que dit la pente ?</strong> À unités et échelles identiques, une courbe de demande plus plate signifie qu’une même variation de prix entraîne une variation plus importante des quantités. Une courbe plus verticale traduit une réaction plus faible : les acheteurs trouvent, par exemple, peu de substituts à court terme. Le raisonnement vaut aussi pour l’offre : une offre plus verticale traduit une capacité plus limitée à modifier rapidement la production. Attention : pente et élasticité ne se confondent pas ; l’élasticité compare des pourcentages.</p>
            <h3>2. Comment l’équilibre se forme-t-il ?</h3>
            <Graph mode="equilibre"/>
            <p><strong>À l’intersection E₀</strong>, la quantité que les acheteurs souhaitent acquérir correspond à celle que les vendeurs souhaitent vendre. On résout 100 − 10P = 20P − 20 : P = 4 € et Q = 60. Il s’agit d’un équilibre des projets d’achat et de vente ; cela ne signifie pas que tous les besoins sont satisfaits.</p>
            <ol>
              <li><strong>À un prix inférieur, par exemple 3 € :</strong> les acheteurs demandent 70 unités, mais les vendeurs n’en proposent que 40. L’excès de demande de 30 unités exerce une pression à la hausse sur le prix dans le modèle.</li>
              <li><strong>Quand le prix augmente vers 4 € :</strong> la quantité demandée diminue tandis que la quantité offerte augmente. On se déplace sur les deux courbes existantes. L’écart se réduit jusqu’à disparaître à 60 unités.</li>
              <li><strong>À un prix supérieur, par exemple 5 € :</strong> 80 unités sont offertes pour 50 demandées. Les invendus exercent une pression à la baisse. La baisse du prix réduit la quantité offerte et accroît la quantité demandée jusqu’à l’équilibre.</li>
            </ol>
            <p className={styles.callout}><strong>Le point décisif :</strong> dans ce raisonnement, aucune courbe ne s’est déplacée. Les déterminants autres que le prix sont inchangés. Le prix varie et les agents modifient leurs quantités <strong>sur</strong> les courbes. Dans la réalité, les ajustements peuvent prendre du temps ou être freinés par des contrats et des prix réglementés.</p>
            <h3>3. Hausse de la demande : pourquoi le prix et la quantité augmentent-ils ?</h3>
            <Graph mode="demande"/>
            <ol>
              <li><strong>Le changement de départ :</strong> le produit devient plus recherché. À chaque prix, les acheteurs souhaitent acquérir 20 unités de plus. La demande passe de D₀ : Qd = 100 − 10P à D₁ : Qd = 120 − 10P. Elle se déplace vers la droite ; les conditions d’offre restent inchangées.</li>
              <li><strong>À l’ancien prix de 4 € :</strong> les acheteurs demandent maintenant 80 unités, tandis que les vendeurs en offrent toujours 60. Un excès de demande de 20 unités apparaît : l’ancien équilibre ne convient plus.</li>
              <li><strong>L’ajustement :</strong> la pression à la hausse sur le prix incite les producteurs à offrir davantage et certains acheteurs à réduire leur quantité demandée. On se déplace sur l’offre inchangée et sur la nouvelle demande D₁.</li>
              <li><strong>Au nouvel équilibre E₁ :</strong> 120 − 10P = 20P − 20, donc P ≈ 4,67 € et Q ≈ 73,33 unités. Prix et quantité augmentent. La hausse de prix limite l’augmentation des achats : la quantité échangée ne monte donc pas jusqu’aux 80 unités initialement demandées à 4 €.</li>
            </ol>
            <p><strong>À ne pas écrire :</strong> « La hausse du prix déplace la demande vers la droite. » Ici, le changement de goûts déplace la demande ; la hausse du prix est une conséquence de ce déplacement.</p>
            <details><summary>Et si la demande diminue ?</summary><p>Un recul de l’intérêt pour le produit réduit la quantité demandée à chaque prix : la demande se déplace vers la gauche. À l’ancien prix, les vendeurs offrent plus que les acheteurs ne demandent. La pression à la baisse sur le prix incite les producteurs à réduire leur quantité offerte et les acheteurs à accroître leur quantité demandée sur la nouvelle courbe. À offre inchangée, le nouveau prix et la nouvelle quantité d’équilibre sont plus faibles.</p></details>
            <h3>4. Hausse de l’offre : pourquoi le prix baisse-t-il alors que la quantité augmente ?</h3>
            <Graph mode="offre"/>
            <ol>
              <li><strong>Le changement de départ :</strong> un progrès technique réduit les coûts de production. À chaque prix, les producteurs peuvent proposer 20 unités de plus. L’offre passe de O₀ : Qo = 20P − 20 à O₁ : Qo = 20P. Elle se déplace vers la droite ; la demande reste inchangée.</li>
              <li><strong>À l’ancien prix de 4 € :</strong> 80 unités sont désormais offertes pour 60 demandées. Cet excès d’offre de 20 unités exerce une pression à la baisse sur le prix.</li>
              <li><strong>L’ajustement :</strong> le prix diminue. Les acheteurs souhaitent acheter davantage : on se déplace sur la demande inchangée. Les vendeurs réduisent leur quantité offerte par rapport aux 80 unités proposées à l’ancien prix : on se déplace sur la nouvelle offre O₁.</li>
              <li><strong>Au nouvel équilibre E₁ :</strong> 100 − 10P = 20P, donc P ≈ 3,33 € et Q ≈ 66,67 unités. Le prix baisse, mais la quantité reste supérieure aux 60 unités initiales, car les nouvelles conditions de production permettent de produire à moindre coût.</li>
            </ol>
            <p><strong>Pourquoi parle-t-on aussi d’un déplacement vers le bas ?</strong> À quantité identique, les producteurs sont disposés à vendre à un prix plus faible. Avec les axes usuels, « vers la droite » et « vers le bas » décrivent ici le même déplacement de l’offre.</p>
            <details><summary>Et si l’offre diminue ?</summary><p>Une mauvaise récolte ou une hausse des coûts réduit la quantité offerte à chaque prix : l’offre se déplace vers la gauche, ou vers le haut. À l’ancien prix, la quantité demandée dépasse la quantité offerte. Le prix augmente ; les acheteurs réduisent leur quantité demandée sur leur courbe inchangée. À demande inchangée, le nouvel équilibre associe un prix plus élevé et une quantité échangée plus faible.</p></details>
            <p className={styles.callout}><strong>Si les deux courbes se déplacent :</strong> il faut examiner leurs effets séparément. Par exemple, une hausse simultanée de l’offre et de la demande augmente la quantité d’équilibre, mais son effet sur le prix dépend de l’ampleur relative des déplacements. On ne peut pas affirmer systématiquement que le prix monte.</p>
            <h3>5. Taxe de 3 € par unité : pourquoi deux prix apparaissent-ils ?</h3>
            <Graph mode="taxe"/>
            <ol>
              <li><strong>Le changement de départ :</strong> le vendeur doit reverser 3 € par unité échangée. S’il souhaite conserver le même prix net pour une quantité donnée, le prix payé par l’acheteur doit être supérieur de 3 €. L’offre exprimée en prix consommateur se déplace donc verticalement vers le haut de 3 €.</li>
              <li><strong>Bien distinguer les deux prix :</strong> Pc est le prix payé ; Pp est le prix net reçu après reversement. On a Pp = Pc − 3. L’offre devient Qo = 20(Pc − 3) − 20 = 20Pc − 80. La taxe ne modifie pas, à elle seule, les préférences ou le revenu retenus pour construire la demande : sa courbe reste en place.</li>
              <li><strong>Pourquoi les échanges diminuent-ils ?</strong> Au prix consommateur initial de 4 €, le vendeur ne conserverait que 1 €. Il n’offrirait plus les 60 unités initiales ; dans cet exemple, son offre serait nulle. Le prix payé doit donc augmenter pour qu’il propose à nouveau des unités. Mais cette hausse conduit les acheteurs à demander moins : on se déplace sur leur courbe.</li>
              <li><strong>Le nouvel équilibre :</strong> 100 − 10Pc = 20Pc − 80 donne Pc = 6 €, Q = 40 et Pp = 3 €. Les acheteurs paient 2 € de plus qu’avant ; les vendeurs reçoivent 1 € de moins net. L’écart entre les deux prix est bien de 3 €, mais la hausse du prix payé n’est que de 2 €.</li>
            </ol>
            <p><strong>Comment lire les 3 € sur le graphique ?</strong> À la quantité échangée de 40 unités, lis 6 € sur la demande et sur l’offre avec taxe, puis 3 € sur l’offre initiale. La distance verticale entre ces deux prix représente la taxe. Les recettes publiques sont de 3 × 40 = 120 €.</p>
            <p><strong>Qui supporte la taxe ?</strong> Le côté du marché qui réagit le moins au prix tend à en supporter la plus grande part. Des acheteurs ayant peu de substituts réduisent difficilement leurs achats ; des producteurs ayant peu de possibilités d’adaptation réduisent difficilement leur offre. La charge dépend donc des sensibilités relatives de l’offre et de la demande, et non du seul agent chargé de reverser la taxe.</p>
            <h3>6. Lire les surplus : pourquoi mesure-t-on des aires ?</h3>
            <Graph mode="surplus"/>
            <p><strong>La demande indique une disposition à payer.</strong> Pour chaque unité, elle donne le prix maximal qu’un acheteur est prêt à accepter. Si cette disposition dépasse le prix effectivement payé, l’acheteur obtient un surplus. À 4 €, les unités situées avant Q = 60 procurent un gain ; l’unité située à l’intersection ne procure plus de gain marginal. Additionner ces gains revient à mesurer l’aire sous la demande et au-dessus du prix.</p>
            <p><strong>L’offre indique un prix minimal accepté.</strong> Dans le modèle retenu, elle correspond au coût marginal des unités offertes. Lorsque le prix reçu dépasse ce coût, l’unité procure un surplus au producteur. L’addition de ces écarts forme l’aire au-dessus de l’offre et au-dessous du prix. Le surplus du producteur ne se confond pas toujours avec son profit : il peut aussi couvrir les coûts fixes.</p>
            <p><strong>Calculer dans cet exemple à courbes linéaires :</strong> le surplus des consommateurs est un triangle de hauteur 10 − 4 = 6 € et de base 60 unités : SC = 6 × 60 / 2 = 180 €. Celui des producteurs a pour hauteur 4 − 1 = 3 € : SP = 3 × 60 / 2 = 90 €. Les gains totaux valent 270 €. Les ordonnées à l’origine, 10 € et 1 €, se lisent dans les équations des courbes ; elles ne valent pas pour tous les marchés.</p>
            <p><strong>Pourquoi s’arrêter à l’équilibre ?</strong> Avant 60 unités, la demande est au-dessus de l’offre : la disposition à payer pour une unité supplémentaire dépasse son coût marginal, donc l’échange augmente le surplus total. Après 60 unités, c’est l’inverse : produire une unité supplémentaire coûte davantage que la valeur qu’un acheteur lui attribue. Les échanges avantageux sont ainsi réalisés jusqu’à l’équilibre. Cette efficacité repose sur les hypothèses du modèle et ne garantit pas une répartition égale des gains.</p>
            <details><summary>Après la taxe : où passent les surplus perdus ?</summary><p>À Q = 40, le surplus des consommateurs devient (10 − 6) × 40 / 2 = 80 € ; celui des producteurs devient (3 − 1) × 40 / 2 = 40 €. Une partie de la baisse des surplus privés devient une recette publique de 120 € : c’est un transfert, pas une perte sèche. En ajoutant cette recette, le total vaut 240 € au lieu de 270 €. Les 30 € restants correspondent aux échanges avantageux abandonnés entre 40 et 60 unités. La perte sèche forme ici un triangle de base 20 unités et de hauteur 3 €, soit 20 × 3 / 2 = 30 €. Cette conclusion concerne le modèle sans externalité ; une taxe correctrice peut avoir d’autres effets sur le bien-être.</p></details>
            <h3>7. Du coût marginal à la courbe d’offre : quel lien ?</h3>
            <p><strong>Raisonner unité par unité.</strong> Les coûts marginaux successifs de huit unités sont 6, 10, 12, 15, 18, 22, 28 et 36 €. Ce tableau construit est un autre exemple que celui des graphiques précédents. L’entreprise est preneuse de prix : chaque vente supplémentaire lui rapporte le prix du marché.</p>
            <ol>
              <li><strong>Au prix de 20 € :</strong> les cinq premières unités coûtent chacune moins de 20 € à produire. Elles accroissent le profit. La sixième coûte 22 € : elle le réduirait de 2 €. L’entreprise choisit donc cinq unités.</li>
              <li><strong>Au prix de 25 € :</strong> la sixième unité, coûtant 22 €, ajoute maintenant 3 € au profit. La septième, coûtant 28 €, en retrancherait 3 €. La quantité offerte devient six unités.</li>
              <li><strong>En répétant ce calcul pour chaque prix :</strong> on associe un prix à une quantité optimale. Plus le prix augmente, plus des unités supplémentaires deviennent avantageuses. Ces couples prix-quantité constituent l’offre de l’entreprise : c’est ainsi qu’on déduit sa pente croissante de la recherche du profit maximal.</li>
            </ol>
            <p>Dans le modèle continu à coût marginal croissant, la quantité optimale vérifie <strong>Cm = P</strong>. Avec des unités indivisibles, on s’arrête avant la première unité dont le coût marginal dépasse le prix ; une unité pour laquelle Cm = P ne modifie pas le profit. Dans le modèle usuel à court terme, la courbe d’offre correspond à la partie croissante du coût marginal au-dessus du seuil de fermeture. En additionnant les quantités offertes par toutes les entreprises pour chaque prix, on obtient l’offre du marché.</p>
            <p className={styles.callout}><strong>Pour vérifier que tu as compris :</strong> choisis un graphique et explique-le sans dire seulement « la courbe va à droite ». Nomme l’événement, les choix modifiés, le déséquilibre à l’ancien prix et l’ajustement vers le nouvel équilibre.</p>
          </>}
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
