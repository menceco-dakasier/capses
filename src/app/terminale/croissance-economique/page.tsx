"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

const SLUG = "croissance-economique";

type StepId =
  | "bac"
  | "notions"
  | "cours"
  | "video"
  | "mecanismes"
  | "donnees"
  | "erreurs"
  | "quiz"
  | "sujets"
  | "memo"
  | "sources";

const STEPS: { id: StepId; label: string; time: string }[] = [
  { id: "bac", label: "À savoir pour le bac", time: "4 min" },
  { id: "notions", label: "Notions essentielles", time: "8 min" },
  { id: "cours", label: "Le cours essentiel", time: "12 min" },
  { id: "video", label: "Résumé vidéo", time: "Bientôt" },
  { id: "mecanismes", label: "Mécanismes à maîtriser", time: "8 min" },
  { id: "donnees", label: "Données actualisées", time: "4 min" },
  { id: "erreurs", label: "Erreurs fréquentes", time: "5 min" },
  { id: "quiz", label: "Quiz renouvelé", time: "8 min" },
  { id: "sujets", label: "Sujets bac", time: "5 min" },
  { id: "memo", label: "Fiche mémo", time: "2 min" },
  { id: "sources", label: "Sources", time: "2 min" },
];

const QUIZ_BANK = [
  { q: "Comment mesure-t-on la croissance économique ?", options: ["Par le taux de variation du PIB en volume","Par le niveau du PIB en valeur uniquement","Par le taux de chômage","Par l’évolution des prix"], correct: 0, explain: "La croissance se mesure par le taux de variation du PIB réel, c’est-à-dire du PIB en volume." },
  { q: "Pourquoi utilise-t-on le PIB en volume ?", options: ["Pour neutraliser l’effet de la variation des prix","Pour mesurer uniquement les exportations","Pour supprimer les services non marchands","Pour calculer le chômage"], correct: 0, explain: "Le PIB en volume corrige l’effet des prix afin de mesurer l’évolution réelle des quantités produites." },
  { q: "Quelle affirmation distingue correctement production et productivité ?", options: ["La production est une quantité produite ; la productivité rapporte cette production aux facteurs utilisés","Ce sont deux mots strictement synonymes","La productivité est toujours égale au PIB","La production mesure seulement le facteur travail"], correct: 0, explain: "La production est le résultat obtenu ; la productivité mesure l’efficacité des moyens utilisés pour produire." },
  { q: "Que mesure la PGF ?", options: ["L’efficacité globale de la combinaison du travail et du capital","La seule productivité du travail","La quantité totale de machines","La production totale d’un pays"], correct: 0, explain: "La PGF mesure l’efficacité de la combinaison productive et capte notamment le progrès technique, l’organisation et la diffusion des connaissances." },
  { q: "Une hausse du nombre de travailleurs, à productivité inchangée, correspond surtout à…", options: ["Une croissance extensive","Une croissance intensive","Une destruction créatrice","Une soutenabilité forte"], correct: 0, explain: "La croissance extensive vient de l’augmentation des quantités de facteurs de production." },
  { q: "Une hausse de la production avec les mêmes quantités de travail et de capital traduit surtout…", options: ["Une hausse de la PGF","Une baisse automatique du PIB","Une croissance uniquement extensive","Une disparition du progrès technique"], correct: 0, explain: "Produire davantage avec les mêmes facteurs signifie que leur combinaison est devenue plus efficace : la PGF augmente." },
  { q: "Dans le modèle de Solow, le progrès technique est initialement considéré comme…", options: ["Exogène au modèle","Endogène grâce à la R&D","Créé uniquement par l’État","Identique à l’investissement"], correct: 0, explain: "Chez Solow, le progrès technique explique la croissance de long terme mais n’est pas expliqué par le modèle : il est exogène." },
  { q: "Quelle approche explique le progrès technique par la R&D, la formation et les infrastructures ?", options: ["La croissance endogène","Le modèle exogène de Solow seul","La soutenabilité forte","La comptabilité nationale"], correct: 0, explain: "Romer, Lucas et Barro montrent que des investissements internes au système économique peuvent produire du progrès technique." },
  { q: "Quelle différence entre invention et innovation ?", options: ["L’innovation est l’application économique d’une invention ou d’une nouveauté","L’invention est toujours commercialisée","Il n’existe aucune différence","L’innovation est seulement une nouvelle machine"], correct: 0, explain: "Une invention est une idée ou découverte nouvelle ; elle devient innovation lorsqu’elle est mise en œuvre économiquement." },
  { q: "Pourquoi un brevet peut-il favoriser l’innovation ?", options: ["Il donne temporairement à l’innovateur un droit d’exclusion qui peut permettre de rentabiliser la R&D","Il interdit toute concurrence pour toujours","Il supprime le coût de la recherche","Il oblige toutes les entreprises à innover"], correct: 0, explain: "La protection temporaire augmente le rendement attendu de l’innovation, même si une protection excessive peut freiner sa diffusion." },
  { q: "Qu’est-ce que la destruction créatrice ?", options: ["Le renouvellement des activités par lequel l’innovation crée du nouveau et rend certaines activités anciennes obsolètes","La destruction de toutes les entreprises","Une baisse volontaire du PIB","La disparition permanente de l’emploi"], correct: 0, explain: "Chez Schumpeter, l’innovation transforme l’économie en créant de nouveaux produits et marchés tout en déclassant certaines activités anciennes." },
  { q: "Comment le progrès technique peut-il accroître les inégalités de revenus ?", options: ["En augmentant la demande de certaines compétences tout en automatisant certaines tâches routinières","En augmentant tous les salaires de façon identique","En supprimant tous les profits","En empêchant l’accumulation du capital"], correct: 0, explain: "Le progrès technique peut être biaisé en faveur de certaines qualifications et répartir inégalement les gains de productivité." },
  { q: "Une externalité négative est…", options: ["Un coût imposé à un tiers sans compensation par un prix de marché","Un impôt payé par une entreprise","Une hausse volontaire des salaires","Un brevet arrivé à expiration"], correct: 0, explain: "La pollution est l’exemple classique : une partie du coût social n’est pas supportée par celui qui la provoque." },
  { q: "Que signifie soutenabilité faible ?", options: ["Les différentes formes de capital sont en partie substituables et le progrès technique peut compenser une partie de la dégradation du capital naturel","Le capital naturel est totalement irremplaçable","Il faut arrêter toute innovation","La croissance doit obligatoirement être négative"], correct: 0, explain: "La soutenabilité faible admet une certaine substitution entre capital naturel, physique, humain ou technologique." },
  { q: "Que signifie soutenabilité forte ?", options: ["Certaines fonctions du capital naturel sont critiques et difficilement substituables","Toute ressource naturelle peut être remplacée","Seul le capital physique doit être préservé","La croissance suffit toujours à réparer les dommages"], correct: 0, explain: "La soutenabilité forte insiste sur des seuils écologiques et des éléments du capital naturel qu’il faut préserver." },
  { q: "Qu’est-ce que l’effet rebond ?", options: ["Une amélioration d’efficacité qui réduit le coût d’usage et peut provoquer davantage d’usage, annulant une partie du gain écologique","Une baisse du PIB après une crise","Un retour automatique au plein emploi","Une hausse mécanique de la PGF après toute innovation"], correct: 0, explain: "Une technologie plus efficace ne réduit pas nécessairement autant qu’attendu la consommation totale si les usages augmentent." },
  { q: "Pourquoi le PIB ne mesure-t-il pas directement le bien-être ?", options: ["Parce qu’il mesure la production sans intégrer correctement les inégalités, le travail domestique ou les dégradations environnementales","Parce qu’il exclut toutes les productions publiques","Parce qu’il mesure uniquement les revenus des ménages","Parce qu’il ne peut jamais augmenter"], correct: 0, explain: "Le PIB est un indicateur de production, pas un indicateur complet de bien-être." },
  { q: "Quelle chaîne est la plus cohérente pour relier gains de productivité et croissance ?", options: ["Gains de productivité → coûts unitaires plus faibles → prix plus bas ou revenus plus élevés → demande et investissement → production","Gains de productivité → chômage automatique → production nulle","Gains de productivité → prix toujours plus élevés → demande toujours plus faible","Gains de productivité → disparition du capital"], correct: 0, explain: "Les gains de productivité peuvent être distribués sous forme de baisse des prix, hausse des salaires ou profits, ce qui soutient la demande et l’investissement." },
  { q: "Les institutions favorables à la croissance agissent notamment en…", options: ["Réduisant l’incertitude et en sécurisant les droits de propriété et les contrats","Supprimant toute règle","Interdisant les brevets","Remplaçant toutes les entreprises privées"], correct: 0, explain: "Des institutions stables peuvent sécuriser les transactions, l’investissement et l’innovation." },
  { q: "L’innovation suffit-elle nécessairement à rendre la croissance soutenable ?", options: ["Non, car subsistent notamment l’effet rebond, les externalités et des seuils écologiques","Oui, dans tous les cas","Oui, dès qu’une entreprise dépose un brevet","Non, parce qu’aucune innovation ne peut réduire une pollution"], correct: 0, explain: "L’innovation peut repousser certaines limites mais ne remplace pas automatiquement les politiques publiques, la sobriété ni la préservation de seuils écologiques." },
];

const QUIZ_SIZE = 10;

const TITLES: Record<StepId, { kicker: string; title: string }> = {
  bac: { kicker: "Étape 1", title: "Objectifs d’apprentissage : officiel + en clair" },
  notions: { kicker: "Étape 2", title: "Les notions essentielles expliquées" },
  cours: { kicker: "Étape 3", title: "Le cours essentiel" },
  video: { kicker: "Étape 4", title: "Résumé vidéo du chapitre" },
  mecanismes: { kicker: "Étape 5", title: "Les mécanismes à savoir expliquer" },
  donnees: { kicker: "Étape 6", title: "Les données actualisées à retenir" },
  erreurs: { kicker: "Étape 7", title: "Les confusions et erreurs fréquentes" },
  quiz: { kicker: "Étape 8", title: "Quiz renouvelé : 10 questions" },
  sujets: { kicker: "Étape 9", title: "Sujets possibles et plans rapides" },
  memo: { kicker: "Étape 10", title: "Ta fiche mémo du chapitre" },
  sources: { kicker: "Étape 11", title: "Sources et mise à jour" },
};

function Flow({ items }: { items: string[] }) {
  return (
    <div className={styles.flow}>
      {items.map((item, index) => (
        <div key={item} style={{ display: "contents" }}>
          <div className={styles.flowItem}>{item}</div>
          {index < items.length - 1 && <span className={styles.arrow}>→</span>}
        </div>
      ))}
    </div>
  );
}

export default function CroissanceEconomiquePage() {
  const [active, setActive] = useState<StepId>("bac");
  const [visited, setVisited] = useState<StepId[]>(["bac"]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizQuestions, setQuizQuestions] = useState<typeof QUIZ_BANK>([]);

  const drawQuiz = () => {
    const shuffled = [...QUIZ_BANK].sort(() => Math.random() - 0.5);
    setQuizQuestions(shuffled.slice(0, QUIZ_SIZE));
    setAnswers({});
  };

  useEffect(() => {
    drawQuiz();
    try {
      const savedSteps = localStorage.getItem("capses_croissance_steps");
      if (savedSteps) {
        const parsed = JSON.parse(savedSteps) as StepId[];
        if (Array.isArray(parsed) && parsed.length) setVisited(parsed);
      }
      const progress = JSON.parse(localStorage.getItem("capses_progress") || "{}");
      if (!progress[SLUG]) {
        progress[SLUG] = "en-cours";
        localStorage.setItem("capses_progress", JSON.stringify(progress));
      }
    } catch {}
  }, []);

  const goTo = (id: StepId) => {
    setActive(id);
    setVisited((old) => {
      const next = old.includes(id) ? old : [...old, id];
      try {
        localStorage.setItem("capses_croissance_steps", JSON.stringify(next));
      } catch {}
      return next;
    });
    window.scrollTo({ top: 390, behavior: "smooth" });
  };

  const answeredCount = Object.keys(answers).length;
  const correctCount = useMemo(
    () =>
      quizQuestions.reduce(
        (total, item, index) => total + (answers[index] === item.correct ? 1 : 0),
        0
      ),
    [answers, quizQuestions]
  );
  const score = quizQuestions.length
    ? Math.round((correctCount / quizQuestions.length) * 100)
    : 0;
  const quizFinished =
    quizQuestions.length === QUIZ_SIZE && answeredCount === quizQuestions.length;
  const progressPercent = Math.round((visited.length / STEPS.length) * 100);

  useEffect(() => {
    if (!quizFinished) return;
    try {
      const scores = JSON.parse(localStorage.getItem("capses_scores") || "{}");
      scores[SLUG] = score;
      localStorage.setItem("capses_scores", JSON.stringify(scores));

      const progress = JSON.parse(localStorage.getItem("capses_progress") || "{}");
      progress[SLUG] = score >= 70 ? "valide" : "en-cours";
      localStorage.setItem("capses_progress", JSON.stringify(progress));
    } catch {}
  }, [quizFinished, score]);

  const resetQuiz = () => drawQuiz();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand}>
            <span className={styles.logo}>C</span>
            <span>CAPSES</span>
          </Link>
          <nav className={styles.nav} aria-label="Navigation principale">
            <Link href="/">Accueil</Link>
            <Link href="/bts-cejm">BTS CEJM</Link>
            <Link href="/#chapitres" className={styles.active}>Terminale</Link>
            <Link href="/#premiere">Première</Link>
            <Link href="/seconde">Seconde</Link>
            <Link href="/#methodes">Méthodes</Link>
          </nav>
          <Link className={styles.spaceLink} href="/espace-eleves">Mon espace</Link>
        </div>
      </header>

      <div className={styles.shell}>
        <div className={styles.breadcrumb}>
          <Link href="/">Accueil</Link><span>›</span>
          <Link href="/#chapitres">Terminale</Link><span>›</span>
          <span>Croissance économique</span>
        </div>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Science économique · Chapitre 1</span>
            <h1>Quels sont les sources et les défis de la croissance économique ?</h1>
            <p className={styles.heroLead}>
              Comprendre d’où vient la croissance, pourquoi le progrès technique joue un rôle central,
              comment les institutions favorisent l’innovation et pourquoi la croissance se heurte à
              des défis sociaux et écologiques.
            </p>
            <div className={styles.heroMeta}>
              <span className={styles.pill}>11 étapes</span>
              <span className={styles.pill}>≈ 55 min au total</span>
              <span className={styles.pill}>Cours actualisé 2026</span>
              <span className={styles.pill}>Quiz + sujets bac</span>
            </div>
          </div>
          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.chartCard}>
              <div className={styles.chartTitle}>Croissance · productivité · innovation</div>
              <div className={styles.chartBig}>Produire mieux</div>
              <div className={styles.chartSub}>et comprendre les limites d’une hausse durable de la production</div>
              <div className={styles.chart}>
                <div className={styles.chartLine} />
                <span className={styles.dot + " " + styles.dot1} />
                <span className={styles.dot + " " + styles.dot2} />
                <span className={styles.dot + " " + styles.dot3} />
                <span className={styles.dot + " " + styles.dot4} />
                <div className={styles.chartNote}>Travail + capital + PGF → croissance</div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <div className={styles.progressCard}>
              <div className={styles.progressTop}>
                <span>Progression du chapitre</span>
                <strong>{progressPercent} %</strong>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: progressPercent + "%" }} />
              </div>
            </div>

            <div className={styles.stepNav}>
              {STEPS.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => goTo(step.id)}
                  className={styles.stepButton + (active === step.id ? " " + styles.active : "")}
                >
                  <span className={styles.stepNum}>{index + 1}</span>
                  <span className={styles.stepLabel}>{step.label}</span>
                  {visited.includes(step.id) && <span className={styles.done}>✓</span>}
                </button>
              ))}
            </div>
          </aside>

          <article className={styles.contentCard}>
            <div className={styles.sectionHeader}>
              <div>
                <div className={styles.sectionKicker}>{TITLES[active].kicker}</div>
                <h2>{TITLES[active].title}</h2>
              </div>
              <span className={styles.sectionTime}>
                {STEPS.find((s) => s.id === active)?.time}
              </span>
            </div>

            {active === "bac" && (
              <>
                <p className={styles.intro}>
                  Le programme ne demande pas de réciter une liste d’auteurs : il faut surtout maîtriser
                  des mécanismes. Voici les six attentes à pouvoir expliquer avec précision.
                </p>
                <div className={styles.grid2}>
                  {[
                    ["1. Sources de la croissance","Expliquer comment l’accumulation du travail et du capital augmente la production, et distinguer cette croissance extensive des gains de productivité."],
                    ["2. PGF et progrès technique","Comprendre que la PGF mesure l’efficacité de la combinaison productive et qu’elle est étroitement liée au progrès technique."],
                    ["3. Progrès technique endogène","Montrer que l’innovation dépend notamment de la R&D, du capital humain, du capital physique et des infrastructures publiques."],
                    ["4. Institutions","Expliquer comment les droits de propriété, les brevets et des institutions stables peuvent encourager l’investissement et l’innovation."],
                    ["5. Destruction créatrice et inégalités","Comprendre que l’innovation crée des activités nouvelles, en détruit d’anciennes et peut accroître certaines inégalités de revenus."],
                    ["6. Limites écologiques","Montrer que la croissance se heurte à l’épuisement des ressources, aux pollutions et au réchauffement climatique, et que l’innovation peut aider sans constituer une solution automatique."],
                  ].map(([title,text]) => (
                    <div className={styles.card + " " + styles.cardBlue} key={title}>
                      <span className={styles.badge}>Objectif d’apprentissage</span>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
                <div className={styles.callout + " " + styles.good}>
                  <strong>Réflexe bac :</strong> pour chaque objectif, sois capable de donner une définition,
                  un mécanisme en plusieurs étapes et un exemple concret.
                </div>
              </>
            )}

            {active === "notions" && (
              <>
                <p className={styles.intro}>
                  Ces définitions doivent être suffisamment précises pour être utilisées dans une EC1,
                  une EC3 ou une dissertation.
                </p>
                {[
                  ["Croissance économique","Augmentation soutenue, sur une période longue, de la production de biens et de services d’une économie. Elle se mesure par le taux de variation du PIB en volume."],
                  ["PIB en volume","PIB corrigé de l’évolution des prix. Il permet de mesurer l’évolution réelle des quantités produites."],
                  ["Productivité","Rapport entre une production et les moyens mobilisés pour la réaliser."],
                  ["Productivité globale des facteurs (PGF)","Mesure de l’efficacité de la combinaison du travail et du capital. Elle reflète notamment le progrès technique, l’organisation, les compétences et la diffusion des connaissances."],
                  ["Progrès technique","Ensemble des innovations qui transforment les produits, procédés, organisations ou marchés et améliorent généralement l’efficacité productive."],
                  ["Innovation","Application économique d’une invention ou d’une nouveauté."],
                  ["Croissance endogène","Croissance entretenue par des investissements réalisés au sein de l’économie — R&D, capital humain, capital physique, infrastructures — et par leurs externalités positives."],
                  ["Institution","Règle formelle ou informelle qui encadre les comportements économiques et sociaux : droits de propriété, contrats, système éducatif, normes, etc."],
                  ["Destruction créatrice","Processus par lequel l’innovation crée de nouvelles activités tout en rendant certaines activités anciennes obsolètes."],
                  ["Soutenabilité","Capacité à satisfaire les besoins présents sans compromettre la capacité des générations futures à satisfaire les leurs."],
                ].map(([name,def]) => (
                  <div className={styles.definition} key={name}>
                    <strong>{name}</strong><span>{def}</span>
                  </div>
                ))}
                <div className={styles.formula}>
                  PIB = somme des valeurs ajoutées + impôts sur les produits − subventions sur les produits
                  <small>La croissance se calcule ensuite avec le taux de variation du PIB en volume.</small>
                </div>
              </>
            )}

            {active === "cours" && (
              <>
                <p className={styles.intro}>
                  Le chapitre peut se comprendre comme une histoire en six temps : mesurer la croissance,
                  identifier ses sources, expliquer le progrès technique, comprendre le rôle des institutions,
                  analyser ses effets sociaux puis ses limites écologiques.
                </p>

                <h3 className={styles.subTitle}>1. Comprendre et mesurer la croissance</h3>
                <div className={styles.grid2}>
                  <div className={styles.card + " " + styles.cardBlue}>
                    <h3>PIB en valeur ou en volume ?</h3>
                    <p>Le PIB en valeur utilise les prix courants. Pour mesurer la croissance réelle, on retire l’effet de la hausse des prix : on raisonne en PIB en volume.</p>
                  </div>
                  <div className={styles.card + " " + styles.cardAmber}>
                    <h3>Le PIB n’est pas le bien-être</h3>
                    <p>Il comptabilise une production monétaire mais mesure mal le travail domestique, les inégalités, la qualité de vie et les dégradations du capital naturel.</p>
                  </div>
                </div>

                <h3 className={styles.subTitle}>2. Travail, capital et PGF</h3>
                <div className={styles.grid3}>
                  <div className={styles.card}><span className={styles.badge}>Travail</span><h3>Facteur L</h3><p>Nombre d’actifs occupés, durée du travail, participation à l’emploi et qualifications.</p></div>
                  <div className={styles.card}><span className={styles.badge}>Capital</span><h3>Facteur K</h3><p>Machines, bâtiments, logiciels, robots et autres biens de production durables financés par l’investissement.</p></div>
                  <div className={styles.card}><span className={styles.badge}>Efficacité</span><h3>PGF</h3><p>Part de la croissance qui ne s’explique pas par la seule hausse des quantités de travail et de capital.</p></div>
                </div>
                <div className={styles.callout}>
                  <strong>Croissance extensive :</strong> elle vient surtout de l’augmentation des quantités de facteurs.
                  <br/><strong>Croissance intensive :</strong> elle repose davantage sur les gains de productivité.
                </div>

                <h3 className={styles.subTitle}>3. L’innovation rend le progrès technique endogène</h3>
                <p className={styles.intro}>
                  Une invention devient une innovation lorsqu’elle trouve une application économique.
                  Les investissements en recherche, formation, équipements et infrastructures produisent
                  des connaissances et des externalités positives. La croissance peut alors devenir cumulative.
                </p>
                <div className={styles.grid2}>
                  <div className={styles.card + " " + styles.cardGreen}><h3>Romer / Lucas / Barro</h3><p>R&D, capital humain et capital public expliquent pourquoi le progrès technique peut être produit par l’économie elle-même.</p></div>
                  <div className={styles.card + " " + styles.cardPurple}><h3>Quatre formes d’innovation</h3><p>Produit, procédé, organisation et commercialisation. Toutes peuvent modifier la productivité et les marchés.</p></div>
                </div>

                <h3 className={styles.subTitle}>4. Les institutions créent des incitations</h3>
                <p className={styles.intro}>
                  Des droits de propriété sécurisés, des contrats fiables, un système de brevets équilibré,
                  une concurrence organisée et des services publics efficaces réduisent l’incertitude et
                  peuvent encourager l’investissement. Un brevet protège temporairement l’innovateur,
                  mais une protection excessive peut aussi ralentir la diffusion des connaissances.
                </p>

                <h3 className={styles.subTitle}>5. Destruction créatrice et inégalités</h3>
                <div className={styles.grid2}>
                  <div className={styles.card + " " + styles.cardGreen}><h3>Création</h3><p>Les innovations créent de nouveaux produits, marchés, entreprises, qualifications et emplois.</p></div>
                  <div className={styles.card + " " + styles.cardCoral}><h3>Destruction</h3><p>Elles rendent certaines technologies, entreprises ou tâches obsolètes. Les transitions peuvent être coûteuses pour les travailleurs concernés.</p></div>
                </div>
                <p className={styles.intro}>
                  Le progrès technique peut favoriser les travailleurs dont les compétences sont complémentaires
                  aux nouvelles technologies, remplacer certaines tâches routinières et concentrer une partie
                  des gains dans les entreprises innovantes. Il peut donc accroître les écarts de revenus.
                </p>

                <h3 className={styles.subTitle}>6. Une croissance confrontée aux limites écologiques</h3>
                <div className={styles.grid3}>
                  <div className={styles.card}><h3>Ressources</h3><p>Extraction d’énergies fossiles, minerais, terres rares, eau et autres ressources naturelles.</p></div>
                  <div className={styles.card}><h3>Pollutions</h3><p>Externalités négatives sur l’air, l’eau, les sols et les écosystèmes.</p></div>
                  <div className={styles.card}><h3>Climat</h3><p>Les émissions de gaz à effet de serre contribuent au réchauffement climatique.</p></div>
                </div>
                <div className={styles.callout}>
                  <strong>Soutenabilité faible :</strong> confiance plus forte dans la substitution entre capitaux et le progrès technique.
                  <br/><strong>Soutenabilité forte :</strong> certaines fonctions du capital naturel sont considérées comme difficilement remplaçables et doivent être préservées.
                </div>
              </>
            )}

            {active === "mecanismes" && (
              <>
                <p className={styles.intro}>
                  Au bac, un bon raisonnement montre les étapes intermédiaires. Apprends ces chaînes causales,
                  puis entraîne-toi à les reformuler avec tes propres mots.
                </p>
                <h3 className={styles.subTitle}>Gains de productivité → croissance</h3>
                <Flow items={["Innovation","PGF ↑","Coût unitaire ↓","Prix ↓ / salaires ou profits ↑","C + I + X ↑","Production ↑"]} />

                <h3 className={styles.subTitle}>Croissance endogène</h3>
                <Flow items={["Croissance","Revenus / profits / recettes publiques ↑","R&D + formation + infrastructures ↑","Externalités positives","PGF ↑","Croissance future"]} />

                <h3 className={styles.subTitle}>Institutions → innovation</h3>
                <Flow items={["Droits de propriété","Risque de copie ↓","Rendement attendu de l’innovation ↑","R&D / investissement ↑","Innovation ↑","Croissance ↑"]} />

                <h3 className={styles.subTitle}>Progrès technique → inégalités possibles</h3>
                <Flow items={["Nouvelles technologies","Complémentarité avec certaines compétences","Productivité des qualifiés ↑","Demande et rémunération ↑","Écarts de revenus possibles"]} />

                <h3 className={styles.subTitle}>Innovation verte : une réponse partielle</h3>
                <Flow items={["Innovation","Efficacité énergétique ↑","Consommation par unité ↓","Coût d’usage parfois ↓","Usages peuvent ↑","Effet rebond possible"]} />
              </>
            )}

            {active === "donnees" && (
              <>
                <p className={styles.intro}>
                  Ces chiffres servent à illustrer un mécanisme. Il faut toujours préciser l’année,
                  la source et ce que la donnée permet — ou ne permet pas — de conclure.
                </p>
                <div className={styles.grid2}>
                  <div className={styles.stat}>
                    <strong>+0,8 %</strong>
                    <span>Croissance du PIB français en volume en 2025.</span>
                    <small>Insee, comptes nationaux 2025, publication 2026.</small>
                  </div>
                  <div className={styles.stat}>
                    <strong>2 991,1 Md€</strong>
                    <span>PIB français en valeur en 2025.</span>
                    <small>Insee, comptes nationaux, base 2020.</small>
                  </div>
                  <div className={styles.stat}>
                    <strong>38,1 Gt</strong>
                    <span>Émissions mondiales de CO₂ fossile projetées pour 2025, un record.</span>
                    <small>Global Carbon Budget 2025.</small>
                  </div>
                  <div className={styles.stat}>
                    <strong>≈ 40 %</strong>
                    <span>Part de l’emploi mondial exposée à l’IA selon l’analyse du FMI.</span>
                    <small>FMI, 2024 ; « exposé » ne signifie pas « emploi supprimé ».</small>
                  </div>
                  <div className={styles.stat}>
                    <strong>0,4 à 1,3 pt</strong>
                    <span>Gain annuel de productivité du travail lié à l’IA estimé, dans les économies du G7 les plus exposées, sur un horizon de dix ans.</span>
                    <small>OCDE, 2025 — estimation prospective, pas un résultat observé.</small>
                  </div>
                  <div className={styles.stat}>
                    <strong>1,1 °C</strong>
                    <span>Réchauffement global attribué aux activités humaines sur 2011-2020 par rapport à 1850-1900.</span>
                    <small>GIEC, rapport de synthèse AR6.</small>
                  </div>
                </div>
                <div className={styles.callout + " " + styles.warning}>
                  <strong>Attention :</strong> ne transforme jamais une projection en fait observé. Par exemple,
                  les estimations de productivité liées à l’IA indiquent un potentiel conditionnel à l’adoption,
                  aux compétences et aux investissements complémentaires.
                </div>
              </>
            )}

            {active === "erreurs" && (
              <>
                <p className={styles.intro}>Six erreurs coûtent régulièrement des points parce qu’elles rendent le raisonnement imprécis.</p>
                <div className={styles.grid2}>
                  {[
                    ["« Le PIB mesure le bonheur »","Faux. Le PIB mesure une production. Il ne mesure pas directement le bien-être."],
                    ["« Croissance = développement »","Faux. La croissance peut favoriser le développement, mais le développement recouvre des transformations beaucoup plus larges."],
                    ["« Progrès technique = machines »","Trop réducteur. Il inclut aussi les produits, procédés, organisations, connaissances et modes de commercialisation."],
                    ["« L’innovation détruit l’emploi »","Trop catégorique. Elle détruit certains emplois et en crée d’autres : c’est la destruction créatrice."],
                    ["« L’innovation verte règle le problème écologique »","Faux. Elle peut reculer certaines limites mais l’effet rebond et des seuils écologiques persistent."],
                    ["« La technologie profite à tout le monde pareil »","Faux. Les gains peuvent être distribués de façon inégale selon les compétences, les emplois et la position des entreprises."],
                  ].map(([title,text]) => (
                    <div className={styles.card + " " + styles.cardCoral} key={title}>
                      <h3>{title}</h3><p>{text}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {active === "quiz" && (
              <>
                <p className={styles.intro}>
                  Réponds aux six questions. À partir de 70 %, le chapitre est enregistré comme validé dans « Mon espace ».
                </p>
                {QUIZ.map((item, qIndex) => {
                  const selected = answers[qIndex];
                  return (
                    <div className={styles.quizQuestion} key={item.q}>
                      <h3>{qIndex + 1}. {item.q}</h3>
                      <div className={styles.options}>
                        {item.options.map((option, optionIndex) => {
                          const hasAnswer = selected !== undefined;
                          const isSelected = selected === optionIndex;
                          const isCorrect = item.correct === optionIndex;
                          let className = styles.option;
                          if (hasAnswer && isCorrect) className += " " + styles.correct;
                          else if (hasAnswer && isSelected && !isCorrect) className += " " + styles.wrong;
                          else if (isSelected) className += " " + styles.selected;
                          return (
                            <button
                              key={option}
                              type="button"
                              className={className}
                              onClick={() => setAnswers((old) => ({ ...old, [qIndex]: optionIndex }))}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                      {selected !== undefined && <div className={styles.feedback}>{item.explain}</div>}
                    </div>
                  );
                })}
                {quizFinished && (
                  <div className={styles.score}>
                    <strong>{score} %</strong>
                    <span>
                      {score >= 70
                        ? "Chapitre validé. Ton score est enregistré dans Mon espace."
                        : "Le chapitre reste en cours. Revois les mécanismes puis retente le quiz."}
                    </span>
                    <button type="button" className={styles.reset} onClick={resetQuiz}>Recommencer le quiz</button>
                  </div>
                )}
              </>
            )}

            {active === "sujets" && (
              <>
                <p className={styles.intro}>
                  Voici des formulations typiques. Le plan proposé est un repère de raisonnement, pas une réponse à apprendre mot pour mot.
                </p>
                {[
                  ["Montrez que le progrès technique est source de croissance économique.","I. Il augmente la PGF et les gains de productivité. II. Il crée de nouveaux marchés et entretient un processus cumulatif via l’innovation et l’investissement."],
                  ["Comment les institutions peuvent-elles favoriser la croissance économique ?","I. Elles sécurisent les droits de propriété et réduisent l’incertitude. II. Elles organisent la concurrence, la formation, les infrastructures et les incitations à innover."],
                  ["Le progrès technique est-il toujours favorable à l’emploi et aux revenus ?","I. Il crée de nouvelles activités et peut accroître la productivité et les revenus. II. Il rend aussi certaines tâches obsolètes et peut renforcer les inégalités."],
                  ["L’innovation suffit-elle à rendre la croissance soutenable ?","I. Elle peut réduire l’intensité en ressources et en émissions. II. L’effet rebond et les seuils écologiques justifient aussi des politiques publiques et des changements d’usage."],
                ].map(([subject,plan]) => (
                  <div className={styles.subject} key={subject}>
                    <strong>{subject}</strong><p>{plan}</p>
                  </div>
                ))}
                <div className={styles.callout}>
                  <strong>EC1 :</strong> définition + mécanisme précis + exemple.
                  <br/><strong>EC3 / dissertation :</strong> construis plusieurs mécanismes et articule-les avec des données ou exemples adaptés.
                </div>
              </>
            )}

            {active === "memo" && (
              <>
                <p className={styles.intro}>
                  La fiche mémo sert à réviser rapidement après avoir compris le cours. Elle ne remplace pas l’apprentissage des mécanismes.
                </p>
                <div className={styles.download}>
                  <div>
                    <h3>Fiche mémo — Croissance économique</h3>
                    <p>Définitions, mécanismes, auteurs, limites écologiques et erreurs à éviter.</p>
                  </div>
                  <a href="/memos/memo_croissance_economique.pdf" target="_blank" rel="noreferrer">Ouvrir le PDF</a>
                </div>
                <h3 className={styles.subTitle}>Checklist avant le bac</h3>
                <div className={styles.grid2}>
                  {[
                    "Je sais distinguer PIB en valeur et PIB en volume.",
                    "Je sais expliquer travail, capital et PGF.",
                    "Je sais construire le mécanisme des gains de productivité.",
                    "Je sais expliquer pourquoi le progrès technique est endogène.",
                    "Je sais relier institutions, investissement et innovation.",
                    "Je sais expliquer la destruction créatrice.",
                    "Je sais montrer comment le progrès technique peut créer des inégalités.",
                    "Je sais présenter limites écologiques, innovation et effet rebond.",
                  ].map((item) => (
                    <div className={styles.card + " " + styles.cardGreen} key={item}><p>✓ {item}</p></div>
                  ))}
                </div>
              </>
            )}

            {active === "sources" && (
              <>
                <p className={styles.intro}>
                  Le contenu CAPSES part du cours de référence actualisé puis utilise des sources institutionnelles
                  pour les données récentes. Les chiffres sont toujours accompagnés de leur année.
                </p>
                <div className={styles.sourceList}>
                  <a className={styles.sourceItem} href="https://www.education.gouv.fr/" target="_blank" rel="noreferrer">
                    <strong>Programme officiel de Terminale SES / Eduscol</strong>
                    Objectifs d’apprentissage et ressource d’accompagnement du chapitre.
                  </a>
                  <a className={styles.sourceItem} href="https://www.insee.fr/fr/statistiques/8988793" target="_blank" rel="noreferrer">
                    <strong>Insee — Comptes nationaux 2025</strong>
                    PIB français, croissance en volume et grands agrégats. Publication 2026.
                  </a>
                  <a className={styles.sourceItem} href="https://www.oecd.org/en/publications/macroeconomic-productivity-gains-from-artificial-intelligence-in-g7-economies_a5319ab5-en.html" target="_blank" rel="noreferrer">
                    <strong>OCDE — IA et productivité, 2025</strong>
                    Estimations des gains potentiels de productivité liés à l’IA dans les économies du G7.
                  </a>
                  <a className={styles.sourceItem} href="https://www.imf.org/fr/blogs/articles/2024/01/14/ai-will-transform-the-global-economy-lets-make-sure-it-benefits-humanity" target="_blank" rel="noreferrer">
                    <strong>FMI — IA et marché du travail</strong>
                    Exposition de l’emploi mondial à l’intelligence artificielle.
                  </a>
                  <a className={styles.sourceItem} href="https://www.ipcc.ch/report/ar6/syr/" target="_blank" rel="noreferrer">
                    <strong>GIEC — AR6 Synthesis Report</strong>
                    Réchauffement climatique et effets des activités humaines.
                  </a>
                  <a className={styles.sourceItem} href="https://globalcarbonbudget.org/gcb-2025/the-global-carbon-budget-faqs-2025/" target="_blank" rel="noreferrer">
                    <strong>Global Carbon Budget 2025</strong>
                    Émissions mondiales de CO₂ fossile et budget carbone.
                  </a>
                </div>
                <div className={styles.callout + " " + styles.good}>
                  <strong>Dernière révision du contenu :</strong> septembre 2026. Les données Insee 2025 remplacent les anciennes données 2024 et le Global Carbon Budget 2025 remplace l’édition 2024.
                </div>
              </>
            )}
          </article>
        </div>

        <div className={styles.footer}>
          CAPSES · Terminale SES · Croissance économique · version pédagogique 2026-2027
        </div>
      </div>
    </main>
  );
}
