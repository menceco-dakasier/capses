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
    const shuffledQuestions = [...QUIZ_BANK].sort(() => Math.random() - 0.5);
    const preparedQuestions = shuffledQuestions.slice(0, QUIZ_SIZE).map((question) => {
      const shuffledOptions = question.options
        .map((option, index) => ({ option, isCorrect: index === question.correct }))
        .sort(() => Math.random() - 0.5);

      return {
        ...question,
        options: shuffledOptions.map(({ option }) => option),
        correct: shuffledOptions.findIndex(({ isCorrect }) => isCorrect),
      };
    });

    setQuizQuestions(preparedQuestions);
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
            <Link href="/premiere">Première</Link>
            <Link href="/seconde">Seconde</Link>
            <Link href="/methodes">Méthodes</Link>
          </nav>
          <Link className={styles.spaceLink} href="/espace-eleves">Mon espace</Link>
          <details className={styles.mobileMenu}>
            <summary aria-label="Ouvrir le menu">☰</summary>
            <nav className={styles.mobileMenuPanel} aria-label="Navigation mobile">
              <Link href="/">Accueil</Link>
              <Link href="/bts-cejm">BTS CEJM</Link>
              <Link href="/#chapitres">Terminale</Link>
              <Link href="/premiere">Première</Link>
              <Link href="/seconde">Seconde</Link>
              <Link href="/methodes">Méthodes</Link>
              <Link href="/espace-eleves">Mon espace</Link>
            </nav>
          </details>
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
                  Pour chaque objectif, CAPSES affiche d’abord la formulation officielle du programme,
                  puis une version « en clair » qui dit exactement ce que tu dois savoir faire au bac.
                </p>
                <div className={styles.grid2}>
                  {[
                    {
                      n:"OA 1",
                      official:"Comprendre le processus de croissance économique et les sources de la croissance : accumulation des facteurs et accroissement de la productivité globale des facteurs ; comprendre le lien entre le progrès technique et l’accroissement de la productivité globale des facteurs.",
                      clear:"Tu dois savoir expliquer que la production augmente soit parce qu’on utilise davantage de travail et de capital, soit parce qu’on les combine plus efficacement grâce notamment au progrès technique."
                    },
                    {
                      n:"OA 2",
                      official:"Comprendre que le progrès technique est endogène et qu’il résulte en particulier de l’innovation.",
                      clear:"Le progrès technique ne tombe pas du ciel : les entreprises, l’État et les individus investissent en R&D, formation, équipements et infrastructures, ce qui produit des innovations."
                    },
                    {
                      n:"OA 3",
                      official:"Comprendre comment les institutions (notamment les droits de propriété) influent sur la croissance en affectant l’incitation à investir et innover ; savoir que l’innovation s’accompagne d’un processus de destruction créatrice.",
                      clear:"Des règles stables, des droits de propriété et des brevets peuvent encourager l’investissement. Mais l’innovation crée aussi de nouvelles activités tout en rendant certaines anciennes activités obsolètes."
                    },
                    {
                      n:"OA 4",
                      official:"Comprendre comment le progrès technique peut engendrer des inégalités de revenus.",
                      clear:"Les nouvelles technologies ne profitent pas de la même manière à tous : certaines compétences sont davantage valorisées, certaines tâches sont automatisées et les gains peuvent être concentrés."
                    },
                    {
                      n:"OA 5",
                      official:"Comprendre qu’une croissance économique soutenable se heurte à des limites écologiques (notamment l’épuisement des ressources, la pollution et le réchauffement climatique) et que l’innovation peut aider à reculer ces limites.",
                      clear:"La croissance utilise des ressources et produit des dommages environnementaux. L’innovation peut réduire certaines pressions, mais elle ne supprime pas automatiquement les limites écologiques."
                    },
                  ].map((item) => (
                    <div className={styles.card + " " + styles.cardBlue} key={item.n}>
                      <span className={styles.badge}>{item.n} · version officielle</span>
                      <h3>{item.official}</h3>
                      <div className={styles.callout + " " + styles.good}>
                        <strong>En clair :</strong> {item.clear}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.callout + " " + styles.good}>
                  <strong>Réflexe bac :</strong> pour chacun des 5 objectifs, maîtrise une définition,
                  un mécanisme en plusieurs étapes, un exemple et au moins une confusion à éviter.
                </div>
              </>
            )}

            {active === "notions" && (
              <>
                <p className={styles.intro}>
                  Ici, une notion ne se limite pas à une phrase à apprendre. Chaque définition précise
                  aussi ce qu’elle signifie concrètement et ce qu’il ne faut pas confondre.
                </p>
                {[
                  ["Croissance économique","Augmentation soutenue, sur une période longue, de la production de biens et de services d’une économie, mesurée par le taux de variation du PIB en volume.","Une hausse du PIB de 2 % signifie que la production réelle a augmenté de 2 % ; cela ne signifie pas que le bien-être a augmenté de 2 %."],
                  ["PIB en volume","PIB corrigé de l’évolution des prix afin d’isoler la variation réelle des quantités produites.","À distinguer du PIB en valeur : si les prix augmentent fortement, le PIB nominal peut progresser sans hausse équivalente de la production."],
                  ["Facteurs de production","Ressources durables utilisées pour produire, principalement le travail et le capital.","Le travail renvoie à la main-d’œuvre mobilisée ; le capital productif aux machines, bâtiments, logiciels et équipements utilisés durablement."],
                  ["Production","Quantité ou valeur des biens et services créés pendant une période.","La production est un résultat ; elle ne doit pas être confondue avec la productivité, qui mesure l’efficacité des moyens utilisés."],
                  ["Productivité","Rapport entre une production obtenue et la quantité d’un ou plusieurs facteurs mobilisés.","La productivité du travail rapporte la production au travail utilisé ; elle n’est pas la même chose que la PGF."],
                  ["Productivité globale des facteurs (PGF)","Mesure de l’efficacité globale de la combinaison du travail et du capital ; elle correspond à la part de la croissance non expliquée par la seule hausse des quantités de facteurs.","Elle reflète notamment le progrès technique, l’organisation, les compétences, les infrastructures et la diffusion des connaissances."],
                  ["Croissance extensive","Croissance qui provient surtout de l’augmentation des quantités de travail et de capital.","Exemple : davantage de travailleurs, davantage d’heures travaillées ou davantage de machines."],
                  ["Croissance intensive","Croissance qui provient surtout d’une meilleure efficacité productive, donc de gains de productivité.","Elle joue un rôle central à long terme car les quantités de facteurs ne peuvent pas augmenter indéfiniment."],
                  ["Invention","Découverte, idée ou procédé nouveau qui n’est pas nécessairement utilisé économiquement.","Une invention peut rester au stade du laboratoire sans devenir une innovation."],
                  ["Innovation","Mise en application économique d’une invention ou d’une nouveauté : produit, procédé, organisation ou commercialisation.","L’innovation diffuse la nouveauté dans la production ou sur un marché et peut accroître la productivité."],
                  ["Progrès technique","Ensemble des innovations qui transforment les produits, procédés, organisations et marchés et améliorent généralement l’efficacité productive.","Il est plus large que la seule robotisation ou que l’achat de machines."],
                  ["Croissance endogène","Croissance auto-entretenue par des investissements internes au système économique : R&D, capital humain, capital physique et capital public, avec des externalités positives.","Romer insiste sur les connaissances et la R&D, Lucas sur le capital humain, Barro sur le capital public."],
                  ["Institution","Ensemble de règles formelles et informelles qui encadrent les comportements économiques et sociaux.","Les droits de propriété, les contrats, les tribunaux, la monnaie, les règles de concurrence ou le système éducatif peuvent influencer l’investissement et l’innovation."],
                  ["Droits de propriété","Droits reconnus à un agent d’utiliser un actif, d’en tirer un revenu et, sous certaines conditions, de le céder.","Ils sécurisent les investissements en permettant à l’agent d’espérer bénéficier des revenus liés à son actif."],
                  ["Brevet","Droit de propriété intellectuelle qui protège temporairement une innovation et permet à son détenteur d’en contrôler l’exploitation.","Il crée une incitation à innover, mais une protection trop forte peut aussi ralentir la diffusion des connaissances."],
                  ["Destruction créatrice","Processus schumpétérien par lequel l’innovation fait apparaître de nouvelles activités tout en rendant certaines activités, entreprises ou compétences anciennes obsolètes.","Ce n’est pas uniquement une destruction : il y a simultanément création et recomposition."],
                  ["Inégalités de revenus","Écarts de revenus entre individus ou groupes sociaux.","Le progrès technique peut accroître ces écarts s’il valorise davantage certaines qualifications ou si les gains sont concentrés chez certains salariés, entrepreneurs ou actionnaires."],
                  ["Externalité négative","Effet défavorable d’une activité sur un tiers sans compensation monétaire.","La pollution illustre un coût social qui n’est pas intégralement supporté par celui qui la provoque."],
                  ["Bien commun","Ressource difficilement excluable mais rivale ou menacée par la surexploitation.","Le climat ou certaines ressources naturelles posent un problème de coordination et de passager clandestin."],
                  ["Soutenabilité faible","Approche selon laquelle différentes formes de capital sont en partie substituables : du capital technique, humain ou technologique peut compenser une partie de la dégradation du capital naturel.","Elle accorde un rôle important à l’innovation et à la croissance verte."],
                  ["Soutenabilité forte","Approche selon laquelle une partie du capital naturel est critique, difficilement substituable et doit être préservée au-delà de certains seuils.","Elle insiste davantage sur les limites écologiques, les normes, la sobriété et la protection des écosystèmes."],
                  ["Effet rebond","Phénomène par lequel un gain d’efficacité réduit le coût d’usage et peut conduire à une hausse des usages qui annule une partie du gain environnemental attendu.","Une voiture moins consommatrice au kilomètre peut entraîner davantage de kilomètres parcourus."],
                ].map(([name,def,understand]) => (
                  <div className={styles.definition} key={name}>
                    <strong>{name}</strong>
                    <span>{def}<br/><b>À comprendre :</b> {understand}</span>
                  </div>
                ))}
                <div className={styles.formula}>
                  PIB = somme des valeurs ajoutées + impôts sur les produits − subventions sur les produits
                  <small>La croissance correspond ensuite au taux de variation du PIB en volume.</small>
                </div>
              </>
            )}

            {active === "cours" && (
              <>
                <p className={styles.intro}>
                  Le chapitre suit sept idées : mesurer la croissance, identifier ses sources, expliquer le progrès
                  technique, comprendre les institutions, analyser la destruction créatrice, étudier les inégalités
                  puis les limites écologiques.
                </p>

                <h3 className={styles.subTitle}>1. Comprendre et mesurer la croissance</h3>
                <div className={styles.grid2}>
                  <div className={styles.card + " " + styles.cardBlue}><h3>PIB en valeur / PIB en volume</h3><p>Le PIB en valeur utilise les prix courants. Le PIB en volume corrige l’effet de la variation des prix : c’est lui qui permet de mesurer la croissance réelle.</p></div>
                  <div className={styles.card + " " + styles.cardAmber}><h3>Le PIB a des limites</h3><p>Il mesure une production monétaire mais pas directement le bien-être, la répartition des revenus, le travail domestique ou la dégradation du capital naturel.</p></div>
                </div>

                <h3 className={styles.subTitle}>2. Accumulation des facteurs et PGF</h3>
                <div className={styles.grid3}>
                  <div className={styles.card}><span className={styles.badge}>Travail</span><h3>Facteur L</h3><p>La production peut augmenter avec davantage d’actifs occupés, davantage d’heures travaillées ou une mobilisation plus importante de la main-d’œuvre.</p></div>
                  <div className={styles.card}><span className={styles.badge}>Capital</span><h3>Facteur K</h3><p>L’investissement augmente le stock de machines, bâtiments, robots, logiciels et autres équipements productifs.</p></div>
                  <div className={styles.card}><span className={styles.badge}>Efficacité</span><h3>PGF</h3><p>Si la production augmente plus vite que les quantités de travail et de capital, leur combinaison devient plus efficace : la PGF progresse.</p></div>
                </div>
                <div className={styles.callout}><strong>Croissance extensive :</strong> davantage de facteurs. <br/><strong>Croissance intensive :</strong> davantage d’efficacité grâce aux gains de productivité.</div>

                <h3 className={styles.subTitle}>3. Innovation et progrès technique endogène</h3>
                <p className={styles.intro}>Une invention devient innovation lorsqu’elle est appliquée économiquement. Les investissements en R&D, formation, capital physique et infrastructures peuvent produire des connaissances et des externalités positives : le progrès technique devient alors endogène.</p>
                <div className={styles.grid2}>
                  <div className={styles.card + " " + styles.cardGreen}><h3>Solow : le point de départ</h3><p>Dans le modèle de Solow, le progrès technique explique une partie de la croissance de long terme mais reste extérieur au modèle : il est exogène.</p></div>
                  <div className={styles.card + " " + styles.cardPurple}><h3>Romer, Lucas, Barro</h3><p>Les théories de la croissance endogène expliquent au contraire comment R&D, capital humain et infrastructures publiques peuvent produire du progrès technique.</p></div>
                </div>

                <h3 className={styles.subTitle}>4. Les institutions influencent la croissance</h3>
                <p className={styles.intro}>Des droits de propriété sécurisés, des contrats fiables, une justice efficace, des brevets équilibrés, des règles de concurrence et des services publics de qualité réduisent l’incertitude et peuvent encourager l’investissement et l’innovation.</p>

                <h3 className={styles.subTitle}>5. La destruction créatrice : créer du nouveau en rendant l’ancien obsolète</h3>
                <p className={styles.intro}>Pour Schumpeter, l’innovation transforme en permanence l’économie. Un nouveau produit, une nouvelle technologie ou une nouvelle organisation ouvre des marchés, crée des entreprises et des emplois, mais peut simultanément faire disparaître des entreprises, des métiers ou des compétences devenus moins utiles.</p>
                <div className={styles.grid2}>
                  <div className={styles.card + " " + styles.cardGreen}><h3>Le versant créateur</h3><p>Nouveaux produits, nouveaux marchés, nouveaux investissements, nouvelles qualifications et nouvelles activités. Exemple : le numérique a créé des métiers de développement, cybersécurité ou analyse de données.</p></div>
                  <div className={styles.card + " " + styles.cardCoral}><h3>Le versant destructeur</h3><p>Des technologies et entreprises anciennes deviennent moins rentables ou disparaissent. Exemple : la photographie numérique a fortement réduit l’activité liée à la pellicule.</p></div>
                </div>
                <div className={styles.callout}><strong>À retenir :</strong> destruction créatrice ne signifie pas « destruction nette de l’emploi ». Elle décrit une recomposition permanente des activités sous l’effet de l’innovation.</div>

                <h3 className={styles.subTitle}>6. Le progrès technique peut engendrer des inégalités de revenus</h3>
                <p className={styles.intro}>Les gains du progrès technique ne sont pas répartis uniformément. Une technologie peut compléter le travail de certains salariés très qualifiés et accroître leur productivité, tout en automatisant des tâches routinières. Les entrepreneurs, actionnaires ou salariés des entreprises innovantes peuvent aussi capter une part importante des gains.</p>
                <div className={styles.grid3}>
                  <div className={styles.card}><h3>Biais de qualification</h3><p>Les compétences complémentaires aux nouvelles technologies peuvent devenir plus demandées et mieux rémunérées.</p></div>
                  <div className={styles.card}><h3>Automatisation</h3><p>Certaines tâches répétitives ou routinières peuvent être remplacées par du capital, ce qui fragilise certains emplois ou salaires.</p></div>
                  <div className={styles.card}><h3>Rentes d’innovation</h3><p>Les entreprises innovantes et leurs détenteurs de capital peuvent capter une part élevée des profits générés par l’innovation.</p></div>
                </div>

                <h3 className={styles.subTitle}>7. Les limites écologiques de la croissance</h3>
                <div className={styles.grid3}>
                  <div className={styles.card}><h3>Épuisement</h3><p>La production mobilise des ressources renouvelables et non renouvelables dont certaines sont limitées.</p></div>
                  <div className={styles.card}><h3>Pollutions</h3><p>Les activités productives génèrent des externalités négatives sur l’air, l’eau, les sols et les écosystèmes.</p></div>
                  <div className={styles.card}><h3>Climat</h3><p>Les émissions de gaz à effet de serre liées aux activités humaines contribuent au réchauffement climatique.</p></div>
                </div>
                <div className={styles.callout}>L’innovation peut améliorer l’efficacité énergétique, développer les renouvelables, l’économie circulaire ou des procédés moins polluants. Mais l’effet rebond et l’existence de seuils écologiques expliquent pourquoi elle ne garantit pas à elle seule la soutenabilité.</div>
              </>
            )}

            {active === "video" && (
              <>
                <p className={styles.intro}>
                  Cette étape est réservée au futur résumé vidéo du chapitre. Elle restera dans le parcours afin
                  que chaque chapitre CAPSES puisse proposer à terme une révision rapide en vidéo.
                </p>
                <div className={styles.card + " " + styles.cardBlue}>
                  <span className={styles.badge}>À venir</span>
                  <h3>Résumé vidéo — Croissance économique</h3>
                  <p>Format prévu : une vidéo courte et structurée reprenant les 5 objectifs d’apprentissage, les mécanismes essentiels, les schémas à retenir et les principales erreurs à éviter.</p>
                </div>
                <div className={styles.callout + " " + styles.good}>
                  Le contenu vidéo sera réalisé ensuite ; pour l’instant, cette étape sert de place réservée dans l’architecture définitive du chapitre.
                </div>
              </>
            )}

            {active === "mecanismes" && (
              <>
                <p className={styles.intro}>
                  Au bac, un mécanisme doit montrer les étapes intermédiaires. L’objectif n’est pas d’apprendre
                  une flèche par cœur, mais de savoir expliquer pourquoi chaque étape conduit à la suivante.
                </p>

                <h3 className={styles.subTitle}>1. Gains de productivité → croissance</h3>
                <Flow items={["Innovation / meilleure organisation","PGF ↑","Coût unitaire ↓","Prix ↓ ou salaires / profits ↑","Consommation + investissement + exportations ↑","Production ↑"]} />

                <h3 className={styles.subTitle}>2. Croissance endogène</h3>
                <Flow items={["Croissance","Revenus + profits + recettes publiques ↑","R&D + formation + capital + infrastructures ↑","Externalités positives","PGF et innovation ↑","Croissance future"]} />

                <h3 className={styles.subTitle}>3. Institutions → investissement et innovation</h3>
                <Flow items={["Droits de propriété / contrats sécurisés","Incertitude ↓","Rendement attendu de l’investissement ↑","Investissement et R&D ↑","Innovation ↑","Croissance ↑"]} />

                <h3 className={styles.subTitle}>4. Destruction créatrice</h3>
                <Flow items={["Innovation","Nouveaux produits / procédés","Nouveaux marchés et activités","Anciennes techniques deviennent obsolètes","Réallocation du capital et du travail","Transformation de l’économie"]} />

                <h3 className={styles.subTitle}>5. Progrès technique → inégalités possibles</h3>
                <Flow items={["Nouvelles technologies","Complémentarité avec certaines qualifications","Productivité de certains travailleurs ↑","Demande de ces compétences ↑","Rémunérations ↑","Écarts de revenus possibles"]} />

                <h3 className={styles.subTitle}>6. Soutenabilité faible : la logique de substitution</h3>
                <Flow items={["Dégradation d’une partie du capital naturel","Innovation et investissement","Capital technique / humain / technologique ↑","Substitution entre formes de capital","Stock global de capital maintenu","Croissance jugée soutenable"]} />
                <div className={styles.callout}>
                  <strong>Idée centrale :</strong> une partie du capital naturel peut être remplacée par d’autres formes
                  de capital. Cette approche accorde donc une place importante au progrès technique et à l’innovation.
                </div>

                <h3 className={styles.subTitle}>7. Soutenabilité forte : la logique des seuils écologiques</h3>
                <Flow items={["Capital naturel critique","Faible substituabilité","Risque de franchir des seuils irréversibles","Préservation du stock naturel","Normes + sobriété + réduction des émissions","Soutenabilité"]} />
                <div className={styles.callout + " " + styles.warning}>
                  <strong>Idée centrale :</strong> certaines fonctions de la nature — climat stable, biodiversité,
                  sols fertiles, cycles de l’eau — ne peuvent pas être remplacées simplement par davantage de capital technique.
                </div>

                <h3 className={styles.subTitle}>8. Innovation verte → effet rebond possible</h3>
                <Flow items={["Innovation","Efficacité énergétique ↑","Consommation par unité ↓","Coût d’usage ↓","Usages peuvent ↑","Gain environnemental partiellement annulé"]} />
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
                    <small>Insee, comptes de la Nation 2025 (mai 2026), données brutes sans correction des jours ouvrés (+0,9 % en données corrigées).</small>
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
                    <span>Réchauffement global observé sur 2011-2020 par rapport à 1850-1900, dû pour l’essentiel aux activités humaines.</span>
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
                <p className={styles.intro}>
                  Cette partie devient volontairement plus complète : beaucoup d’erreurs viennent de notions
                  proches que les élèves utilisent comme des synonymes alors qu’elles ne le sont pas.
                </p>
                <div className={styles.grid2}>
                  {[
                    ["Production ≠ productivité","La production est ce qui est produit. La productivité mesure l’efficacité avec laquelle on utilise les facteurs pour produire."],
                    ["Productivité du travail ≠ PGF","La productivité du travail rapporte la production au travail utilisé. La PGF mesure l’efficacité de la combinaison du travail et du capital."],
                    ["PGF ≠ production","Une économie peut produire beaucoup avec une PGF faible si elle mobilise énormément de travail et de capital. La PGF ne mesure pas le niveau de production."],
                    ["Exogène ≠ endogène","Exogène signifie expliqué de l’extérieur du modèle ; endogène signifie expliqué par des mécanismes internes au modèle."],
                    ["Solow ≠ croissance endogène","Dans le modèle de Solow, le progrès technique est exogène. Romer, Lucas et Barro sont associés aux théories de la croissance endogène."],
                    ["Invention ≠ innovation","Une invention est une découverte ou une idée nouvelle ; elle devient innovation lorsqu’elle est appliquée économiquement."],
                    ["Innovation ≠ progrès technique au sens strict d’une seule machine","Le progrès technique regroupe de multiples innovations de produit, procédé, organisation ou commercialisation."],
                    ["Capital ≠ argent","Dans ce chapitre, le facteur capital désigne surtout les biens de production durables : machines, bâtiments, logiciels, équipements."],
                    ["Croissance extensive ≠ croissance intensive","L’extensive repose surtout sur davantage de facteurs ; l’intensive sur une meilleure efficacité et des gains de productivité."],
                    ["Hausse du PIB ≠ hausse automatique du bien-être","Le PIB mesure la production. Il ne dit pas directement comment les revenus sont répartis ni quel est l’état de l’environnement ou de la qualité de vie."],
                    ["Taux de croissance ≠ niveau du PIB","Un pays peut avoir un PIB très élevé mais une faible croissance, ou un PIB plus faible mais une croissance rapide."],
                    ["Destruction créatrice ≠ destruction nette de l’emploi","Le mécanisme décrit une recomposition : certaines activités et certains emplois disparaissent tandis que d’autres apparaissent."],
                    ["Brevet ≠ monopole définitif","Le brevet protège temporairement une innovation. Son but est d’encourager la R&D tout en permettant à terme la diffusion des connaissances."],
                    ["Institutions ≠ seulement organisations publiques","Une institution est une règle formelle ou informelle : droits de propriété, contrats, normes, règles de concurrence, système éducatif, etc."],
                    ["Soutenabilité faible ≠ absence de protection de l’environnement","Elle reconnaît le problème écologique mais suppose davantage de possibilités de substitution entre capital naturel et autres formes de capital."],
                    ["Soutenabilité forte ≠ interdiction de toute croissance","Elle affirme surtout que certaines composantes du capital naturel sont critiques et doivent être préservées au-delà de seuils."],
                    ["Innovation verte ≠ solution automatique","Elle peut réduire certaines pressions écologiques, mais l’effet rebond, les externalités et les seuils écologiques demeurent."],
                    ["Progrès technique ≠ bénéfice identique pour tous","Il peut accroître la productivité globale tout en créant des gagnants et des perdants et en augmentant certaines inégalités de revenus."],
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
                  La banque contient 20 questions. À chaque chargement de la page, CAPSES en tire
                  <strong> 10 au hasard</strong> : le quiz n’est donc pas toujours identique. À partir de 70 %,
                  le chapitre est enregistré comme validé dans « Mon espace ».
                </p>
                <div className={styles.callout + " " + styles.good}>
                  <strong>Pourquoi ce système ?</strong> Il oblige à réellement maîtriser le chapitre plutôt qu’à mémoriser
                  l’ordre des réponses. Les questions couvrent définitions, mécanismes et confusions classiques.
                </div>
                {quizQuestions.length === 0 && (
                  <div className={styles.callout}>Préparation d’un nouveau quiz…</div>
                )}
                {quizQuestions.map((item, qIndex) => {
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
                        : "Le chapitre reste en cours. Revois les notions et mécanismes puis retente une nouvelle série."}
                    </span>
                    <button type="button" className={styles.reset} onClick={resetQuiz}>Tirer 10 nouvelles questions</button>
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
                  <strong>Bac 2027 — épreuve composée :</strong> partie 1 « mobilisation des connaissances » (3,5 pts) : définition + mécanisme précis + exemple ;
                  partie 2 « étude d’un document » (5,5 pts) : lecture rigoureuse des données puis explication ;
                  partie 3 « raisonnement s’appuyant sur un dossier documentaire » (9 pts) : introduction, plusieurs mécanismes articulés aux documents, conclusion.
                  <br/><strong>Dissertation :</strong> problématique, plan structuré, documents exploités sans paraphrase. 2 points sur 20 évaluent l’orthographe et la syntaxe.
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
                    <p>La fiche mémo est en cours de mise à jour pour être parfaitement alignée sur le programme officiel et les données 2026.</p>
                  </div>
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
                  <a className={styles.sourceItem} href="https://eduscol.education.gouv.fr/sites/default/files/document/spe253annexe1158821pdf-82755.pdf" target="_blank" rel="noreferrer">
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