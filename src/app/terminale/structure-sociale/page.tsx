"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

const SLUG = "structure-sociale";

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
  { id: "bac", label: "À savoir pour le bac", time: "5 min" },
  { id: "notions", label: "Notions essentielles", time: "10 min" },
  { id: "cours", label: "Le cours essentiel", time: "14 min" },
  { id: "video", label: "Résumé vidéo", time: "Bientôt" },
  { id: "mecanismes", label: "Mécanismes à maîtriser", time: "10 min" },
  { id: "donnees", label: "Données actualisées", time: "5 min" },
  { id: "erreurs", label: "Erreurs fréquentes", time: "6 min" },
  { id: "quiz", label: "Quiz renouvelé", time: "8 min" },
  { id: "sujets", label: "Sujets bac", time: "6 min" },
  { id: "memo", label: "Fiche mémo", time: "2 min" },
  { id: "sources", label: "Sources", time: "2 min" },
];

const QUIZ_BANK = [
  {
    q: "Qu’est-ce que l’espace social ?",
    options: [
      "Un classement uniquement fondé sur le revenu",
      "Un espace de positions sociales définies par plusieurs ressources et caractéristiques",
      "La répartition géographique de la population uniquement",
      "Une liste des métiers par ordre alphabétique",
    ],
    correct: 1,
    explain: "L’espace social représente des positions plus ou moins proches ou éloignées selon plusieurs critères : PCS, revenu, diplôme, sexe, âge, ménage, lieu de résidence, etc.",
  },
  {
    q: "La PCS est avant tout…",
    options: [
      "Une classe sociale au sens de Marx",
      "Un indicateur de patrimoine",
      "Une nomenclature statistique construite par l’Insee",
      "Un niveau de diplôme",
    ],
    correct: 2,
    explain: "Les PCS sont une classification statistique. Elles ne doivent pas être confondues avec les classes sociales, qui sont des concepts sociologiques.",
  },
  {
    q: "Pourquoi le revenu structure-t-il l’espace social ?",
    options: [
      "Parce qu’il conditionne en partie les possibilités de consommation, d’épargne et de logement",
      "Parce qu’il détermine automatiquement le diplôme",
      "Parce qu’il rend les PCS inutiles",
      "Parce qu’il est identique au patrimoine",
    ],
    correct: 0,
    explain: "Le revenu donne accès à des ressources et modes de vie différents, mais il ne résume pas à lui seul la position sociale.",
  },
  {
    q: "Pourquoi la composition du ménage compte-t-elle pour comparer les niveaux de vie ?",
    options: [
      "Parce que tous les ménages ont les mêmes dépenses",
      "Parce que le revenu disponible doit être rapporté au nombre et à la composition des personnes du ménage",
      "Parce qu’un ménage ne peut contenir qu’un actif",
      "Parce que le revenu du ménage est toujours individuel",
    ],
    correct: 1,
    explain: "Deux ménages ayant le même revenu n’ont pas nécessairement le même niveau de vie. On raisonne donc notamment en unités de consommation.",
  },
  {
    q: "La salarisation désigne…",
    options: [
      "La hausse du salaire moyen",
      "L’augmentation de la part des emplois salariés dans l’emploi",
      "La disparition de tous les indépendants",
      "La hausse de la part des cadres",
    ],
    correct: 1,
    explain: "La salarisation est la progression du salariat dans l’emploi. Elle ne signifie ni hausse automatique des salaires ni disparition complète des indépendants.",
  },
  {
    q: "La tertiarisation correspond…",
    options: [
      "À la hausse de la part des emplois dans les services",
      "À la hausse du nombre de salariés uniquement",
      "À la disparition de l’industrie",
      "À la féminisation de tous les métiers",
    ],
    correct: 0,
    explain: "La tertiarisation est l’augmentation de la part du secteur tertiaire dans l’emploi et l’activité.",
  },
  {
    q: "Que signifie l’élévation du niveau de qualification ?",
    options: [
      "Que tous les travailleurs deviennent cadres",
      "Que la part des emplois et travailleurs qualifiés augmente",
      "Que les diplômes deviennent inutiles",
      "Que les ouvriers disparaissent",
    ],
    correct: 1,
    explain: "La structure de l’emploi se déplace vers davantage d’emplois qualifiés et les actifs sont en moyenne plus diplômés.",
  },
  {
    q: "La féminisation de l’emploi signifie…",
    options: [
      "Que les femmes et les hommes occupent désormais exactement les mêmes emplois",
      "Que la part des femmes dans la population active et l’emploi a fortement progressé",
      "Que le temps partiel a disparu",
      "Que les inégalités professionnelles de sexe ont disparu",
    ],
    correct: 1,
    explain: "La féminisation désigne l’entrée croissante des femmes dans l’emploi, sans impliquer l’égalité complète des positions professionnelles.",
  },
  {
    q: "Chez Marx, une classe sociale se définit d’abord par…",
    options: [
      "La place dans les rapports de production",
      "Le prestige uniquement",
      "Le lieu de résidence",
      "Le diplôme uniquement",
    ],
    correct: 0,
    explain: "Pour Marx, la propriété ou non des moyens de production structure les intérêts de classe.",
  },
  {
    q: "Quelle différence entre classe en soi et classe pour soi ?",
    options: [
      "La classe pour soi ajoute une conscience d’intérêts communs et une mobilisation collective",
      "La classe en soi est toujours plus riche",
      "La classe pour soi correspond à une PCS",
      "Il n’existe aucune différence",
    ],
    correct: 0,
    explain: "Une classe en soi partage une position objective ; elle devient classe pour soi lorsqu’une conscience collective et une mobilisation se développent.",
  },
  {
    q: "Pourquoi l’analyse de Weber est-elle multidimensionnelle ?",
    options: [
      "Parce qu’il ne tient compte d’aucune dimension économique",
      "Parce qu’il distingue classes, groupes de statut et partis",
      "Parce qu’il utilise uniquement les PCS",
      "Parce qu’il réduit tout au patrimoine",
    ],
    correct: 1,
    explain: "Weber distingue l’ordre économique, le prestige social et le pouvoir politique. Ces hiérarchies ne se superposent pas parfaitement.",
  },
  {
    q: "Une forte distance inter-classes signifie…",
    options: [
      "Que les individus d’une même classe sont très différents",
      "Que les groupes sociaux sont fortement séparés les uns des autres",
      "Que toute classe sociale disparaît",
      "Que les individus changent de PCS",
    ],
    correct: 1,
    explain: "La distance inter-classes mesure l’écart entre groupes sociaux. Plus elle est forte, plus leurs conditions et pratiques sont différenciées.",
  },
  {
    q: "Une forte distance intra-classe signifie…",
    options: [
      "Que les membres supposés d’une même classe sont très hétérogènes",
      "Que les classes sont très éloignées entre elles",
      "Que le revenu est égal pour tous",
      "Que la société est parfaitement homogène",
    ],
    correct: 0,
    explain: "La distance intra-classe désigne les différences internes à un même groupe, qui peuvent réduire sa cohérence sociologique.",
  },
  {
    q: "Pourquoi les rapports sociaux de genre doivent-ils être articulés aux classes sociales ?",
    options: [
      "Parce que le sexe remplace toutes les autres dimensions",
      "Parce que les inégalités de classe et de genre peuvent se combiner",
      "Parce que seuls les hommes appartiennent à une classe sociale",
      "Parce que les PCS sont définies par le sexe",
    ],
    correct: 1,
    explain: "La position sociale ne dépend pas d’un seul axe : classe, sexe, âge, diplôme ou lieu de résidence peuvent se combiner.",
  },
  {
    q: "Que signifie l’individualisation dans le débat sur les classes sociales ?",
    options: [
      "La disparition automatique de toutes les inégalités",
      "Le fait que les trajectoires et identités sont davantage individualisées, ce qui peut affaiblir certaines appartenances collectives",
      "La suppression des PCS",
      "L’obligation de devenir indépendant",
    ],
    correct: 1,
    explain: "L’individualisation peut rendre les appartenances collectives moins évidentes, sans supprimer les inégalités objectives.",
  },
  {
    q: "Pourquoi PCS et classe sociale ne sont-elles pas synonymes ?",
    options: [
      "Parce que les PCS sont un outil statistique alors que les classes sociales sont des constructions théoriques",
      "Parce que les classes sociales concernent uniquement les retraités",
      "Parce que les PCS mesurent seulement les revenus",
      "Parce que les classes sociales n’ont aucun lien avec l’emploi",
    ],
    correct: 0,
    explain: "Les PCS servent à décrire statistiquement des groupes professionnels ; la notion de classe sociale dépend d’une théorie de la stratification.",
  },
  {
    q: "Un rapport D9/D1 de 3,48 signifie que…",
    options: [
      "Les 10 % les plus riches possèdent 3,48 % du patrimoine",
      "Le seuil d’entrée des 10 % les plus aisés est 3,48 fois le seuil supérieur des 10 % les plus modestes",
      "Le revenu moyen est 3,48 fois le revenu médian",
      "3,48 % des ménages sont pauvres",
    ],
    correct: 1,
    explain: "Le rapport interdécile compare le neuvième décile au premier décile. Il mesure un écart dans la distribution des niveaux de vie.",
  },
  {
    q: "En 2024, quelle évolution illustre le mieux la montée des qualifications ?",
    options: [
      "La part des cadres dépasse celle des ouvriers",
      "Les ouvriers représentent quatre fois plus d’emplois que les cadres",
      "Le tertiaire représente moins de 30 % de l’emploi",
      "La majorité des actifs n’a aucun diplôme",
    ],
    correct: 0,
    explain: "En 2024, les cadres représentent 23,0 % des personnes en emploi contre 18,0 % pour les ouvriers ; au début des années 1980, le rapport était inverse.",
  },
  {
    q: "Le lieu de résidence peut structurer l’espace social parce qu’il…",
    options: [
      "N’a aucun lien avec les ressources et opportunités",
      "Peut refléter et renforcer des différences d’accès à l’emploi, aux services, aux réseaux ou à certaines ressources",
      "Détermine toujours la classe sociale à lui seul",
      "Remplace le revenu et le diplôme",
    ],
    correct: 1,
    explain: "Le lieu de résidence est à la fois un reflet et parfois un facteur de hiérarchisation sociale.",
  },
  {
    q: "La baisse des distances inter-classes suffit-elle à prouver la disparition des classes sociales ?",
    options: [
      "Oui, toujours",
      "Non, car des inégalités peuvent persister et les distances intra-classes, le genre ou les identifications doivent aussi être étudiés",
      "Oui, si le tertiaire progresse",
      "Oui, si la part des cadres augmente",
    ],
    correct: 1,
    explain: "Le débat est multidimensionnel : rapprochement de certains modes de vie, persistance d’inégalités, fragmentation interne et identifications subjectives doivent être articulés.",
  },
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

function drawQuestions() {
  const items = [...QUIZ_BANK];
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items.slice(0, QUIZ_SIZE);
}

export default function StructureSocialePage() {
  const [active, setActive] = useState<StepId>("bac");
  const [visited, setVisited] = useState<StepId[]>(["bac"]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizQuestions, setQuizQuestions] = useState<typeof QUIZ_BANK>([]);

  const renewQuiz = () => {
    setQuizQuestions(drawQuestions());
    setAnswers({});
  };

  useEffect(() => {
    renewQuiz();
    try {
      const savedSteps = localStorage.getItem("capses_structure_steps");
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
        localStorage.setItem("capses_structure_steps", JSON.stringify(next));
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
          <span>Structure de la société française</span>
        </div>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Sociologie · Chapitre 2</span>
            <h1>Comment est structurée la société française actuelle ?</h1>
            <p className={styles.heroLead}>
              Comprendre comment les positions sociales se différencient et se hiérarchisent,
              comment la structure socioprofessionnelle a évolué et pourquoi l’analyse en termes
              de classes sociales reste un objet de débat.
            </p>
            <div className={styles.heroMeta}>
              <span className={styles.pill}>11 étapes</span>
              <span className={styles.pill}>≈ 65 min au total</span>
              <span className={styles.pill}>Programme Eduscol 2025</span>
              <span className={styles.pill}>Quiz renouvelé</span>
            </div>
          </div>
          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.chartCard}>
              <div className={styles.chartTitle}>Espace social · positions · hiérarchies</div>
              <div className={styles.chartBig}>Une société multidimensionnelle</div>
              <div className={styles.chartSub}>PCS, revenu, diplôme, âge, sexe, ménage et territoire se combinent</div>
              <div className={styles.chart}>
                <div className={styles.chartLine} />
                <span className={styles.dot + " " + styles.dot1} />
                <span className={styles.dot + " " + styles.dot2} />
                <span className={styles.dot + " " + styles.dot3} />
                <span className={styles.dot + " " + styles.dot4} />
                <div className={styles.chartNote}>Positions sociales ≠ un seul critère</div>
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
                  Le programme comporte trois grands objectifs. CAPSES affiche la formulation officielle,
                  puis une version « En clair » qui indique ce que tu dois réellement être capable d’expliquer.
                </p>

                <div className={styles.card + " " + styles.cardBlue}>
                  <span className={styles.badge}>Objectif officiel 1</span>
                  <h3>Identifier les facteurs qui structurent et hiérarchisent l’espace social</h3>
                  <p>
                    Savoir identifier les multiples facteurs de structuration et de hiérarchisation de l’espace
                    social : catégorie socioprofessionnelle, revenu, diplôme, composition du ménage,
                    position dans le cycle de vie, sexe et lieu de résidence.
                  </p>
                  <div className={styles.callout + " " + styles.good}>
                    <strong>En clair :</strong> tu dois montrer qu’on ne situe pas une personne dans la société
                    avec un seul critère. Son métier, ses revenus, son diplôme, son âge, son sexe, son ménage
                    et son territoire peuvent modifier ses ressources, ses pratiques et ses chances.
                  </div>
                </div>

                <div className={styles.card + " " + styles.cardGreen}>
                  <span className={styles.badge}>Objectif officiel 2</span>
                  <h3>Comprendre les grandes transformations de la structure socioprofessionnelle</h3>
                  <p>
                    Comprendre les principales évolutions de la structure socioprofessionnelle en France
                    depuis la seconde moitié du XXe siècle : salarisation, tertiarisation, élévation du
                    niveau de qualification et féminisation des emplois.
                  </p>
                  <div className={styles.callout + " " + styles.good}>
                    <strong>En clair :</strong> tu dois savoir raconter comment l’emploi français s’est transformé :
                    davantage de salariés, beaucoup plus d’emplois dans les services, une montée des diplômes
                    et des emplois qualifiés, et une présence beaucoup plus forte des femmes dans l’emploi.
                  </div>
                </div>

                <div className={styles.card + " " + styles.cardPurple}>
                  <span className={styles.badge}>Objectif officiel 3</span>
                  <h3>Connaître Marx et Weber et comprendre le débat sur les classes sociales</h3>
                  <p>
                    Connaître les théories des classes et de la stratification sociale dans la tradition
                    sociologique chez Marx et Weber ; comprendre que la pertinence d’une approche en termes
                    de classes sociales fait débat à partir des distances inter- et intra-classes, des rapports
                    sociaux de genre, des identifications subjectives et de l’individualisation.
                  </p>
                  <div className={styles.callout + " " + styles.good}>
                    <strong>En clair :</strong> tu dois comparer Marx et Weber puis être capable d’expliquer
                    pourquoi les classes sociales restent utiles pour comprendre certaines inégalités,
                    tout en étant moins simples à délimiter qu’autrefois.
                  </div>
                </div>
              </>
            )}

            {active === "notions" && (
              <>
                <p className={styles.intro}>
                  Ici, une notion n’est pas seulement définie : CAPSES précise ce qu’elle permet de comprendre
                  et la confusion à éviter.
                </p>

                {[
                  ["Espace social","Représentation de la société comme un ensemble de positions plus ou moins proches, éloignées et hiérarchisées. Il permet de penser plusieurs dimensions à la fois, et pas seulement le revenu."],
                  ["Structuration sociale","Organisation relativement durable de la société en groupes et positions différenciés. Elle renvoie à la façon dont certains critères rapprochent ou séparent les individus."],
                  ["Hiérarchisation sociale","Classement de positions sociales inégales en ressources, pouvoir, prestige ou chances d’accès à certains biens. Une différence devient une hiérarchie lorsqu’elle place certains groupes dans une position plus favorable que d’autres."],
                  ["PCS","Nomenclature de l’Insee qui regroupe les individus selon leur profession et plusieurs caractéristiques de l’emploi. Elle sert à décrire la structure sociale mais n’est pas une théorie des classes sociales."],
                  ["Revenu / niveau de vie","Le revenu désigne les ressources monétaires reçues. Le niveau de vie rapporte le revenu disponible du ménage à sa composition grâce aux unités de consommation : deux ménages ayant le même revenu peuvent donc avoir des niveaux de vie différents."],
                  ["Diplôme / qualification","Le diplôme certifie un niveau de formation ; la qualification peut désigner les compétences d’un individu ou le niveau requis par un emploi. Les deux sont liés mais ne sont pas identiques."],
                  ["Composition du ménage","Nombre d’adultes et d’enfants, vie en couple, monoparentalité, etc. Elle influe sur les ressources disponibles par personne et donc sur le niveau de vie."],
                  ["Cycle de vie","La position sociale peut varier avec l’âge : entrée sur le marché du travail, progression de carrière, constitution d’un patrimoine, retraite. L’âge est donc aussi une variable sociale."],
                  ["Sexe et genre","Le sexe est une caractéristique individuelle ; le genre analyse les rôles, attentes et rapports sociaux associés au féminin et au masculin. Ces rapports contribuent à structurer les positions professionnelles et familiales."],
                  ["Lieu de résidence","Le territoire peut refléter une position sociale mais aussi modifier l’accès à l’emploi, aux services, aux établissements scolaires, aux transports ou aux réseaux relationnels."],
                  ["Salarisation","Augmentation historique de la part des emplois salariés dans l’ensemble des emplois. Elle ne signifie ni hausse des salaires ni disparition complète du travail indépendant."],
                  ["Tertiarisation","Augmentation de la part des activités et emplois de services. Elle transforme la structure des PCS et la nature des métiers exercés."],
                  ["Féminisation de l’emploi","Progression de la participation des femmes à la population active et à l’emploi. Elle n’implique pas que les femmes et les hommes occupent les mêmes métiers ni les mêmes positions hiérarchiques."],
                  ["Classe sociale","Groupe d’individus occupant des positions proches dans une structure sociale. Sa définition dépend de l’approche sociologique : rapports de production chez Marx, situation économique et stratification multidimensionnelle chez Weber."],
                  ["Classe en soi / classe pour soi","Chez Marx, une classe en soi partage objectivement une position dans les rapports de production. Une classe pour soi développe en plus une conscience d’intérêts communs et une capacité de mobilisation."],
                  ["Groupe de statut","Chez Weber, groupe défini par un niveau de prestige ou de considération sociale et souvent par des styles de vie spécifiques. Le prestige ne se confond pas forcément avec la richesse."],
                  ["Distance inter-classes","Écart entre des groupes sociaux différents. Si les modes de vie, revenus ou pratiques se rapprochent, cette distance peut diminuer."],
                  ["Distance intra-classe","Écart entre les membres d’une même classe ou d’un même groupe. Si cette distance augmente, le groupe devient plus hétérogène et ses frontières moins nettes."],
                  ["Identification subjective","Sentiment d’appartenir à un groupe ou à une classe sociale. Une position objective ne produit pas automatiquement une identité collective."],
                  ["Individualisation","Processus par lequel les trajectoires, choix et identités sont davantage construits à l’échelle individuelle. Cela peut affaiblir certaines appartenances collectives sans faire disparaître les inégalités."],
                ].map(([name,def]) => (
                  <div className={styles.definition} key={name}>
                    <strong>{name}</strong><span>{def}</span>
                  </div>
                ))}
              </>
            )}

            {active === "cours" && (
              <>
                <p className={styles.intro}>
                  Le chapitre s’organise en trois grandes questions : comment situer les individus dans l’espace
                  social, comment la structure des emplois s’est transformée, puis jusqu’où les classes sociales
                  permettent encore de décrire la société française.
                </p>

                <h3 className={styles.subTitle}>1. L’espace social est multidimensionnel</h3>
                <p className={styles.intro}>
                  La position sociale dépend de plusieurs ressources et caractéristiques. La PCS renseigne sur
                  la profession et la position dans l’emploi ; le revenu agit sur les possibilités de consommation
                  et d’épargne ; le diplôme pèse sur l’accès aux emplois ; la composition familiale modifie le niveau
                  de vie ; l’âge, le sexe et le territoire influencent aussi les trajectoires et opportunités.
                </p>
                <div className={styles.grid3}>
                  <div className={styles.card}><span className={styles.badge}>Économique</span><h3>PCS + revenu</h3><p>Ils renseignent sur l’emploi occupé, les ressources monétaires et une partie des conditions matérielles de vie.</p></div>
                  <div className={styles.card}><span className={styles.badge}>Culturel</span><h3>Diplôme</h3><p>Il influe sur l’accès aux emplois, les pratiques culturelles et les ressources mobilisables dans différentes situations sociales.</p></div>
                  <div className={styles.card}><span className={styles.badge}>Social</span><h3>Âge, sexe, ménage, territoire</h3><p>Ces facteurs se combinent avec les précédents et produisent des positions sociales différenciées.</p></div>
                </div>
                <div className={styles.callout}>
                  <strong>Idée essentielle :</strong> aucun critère ne suffit seul. Deux personnes ayant la même PCS
                  peuvent avoir des revenus, diplômes, situations familiales ou lieux de résidence différents.
                </div>

                <h3 className={styles.subTitle}>2. La structure socioprofessionnelle a profondément changé</h3>
                <div className={styles.grid2}>
                  <div className={styles.card + " " + styles.cardBlue}><h3>Salarisation</h3><p>Le salariat est devenu la forme d’emploi largement majoritaire. La progression historique s’accompagne aujourd’hui d’un maintien d’un travail indépendant minoritaire mais dynamique.</p></div>
                  <div className={styles.card + " " + styles.cardGreen}><h3>Tertiarisation</h3><p>Les services occupent désormais plus des trois quarts des personnes en emploi. L’agriculture et l’industrie représentent une part plus faible de l’emploi qu’au milieu du XXe siècle.</p></div>
                  <div className={styles.card + " " + styles.cardAmber}><h3>Élévation des qualifications</h3><p>Les actifs sont plus diplômés et la part des cadres et professions intermédiaires a fortement progressé. La qualification de la structure des emplois s’est élevée.</p></div>
                  <div className={styles.card + " " + styles.cardPurple}><h3>Féminisation</h3><p>La présence des femmes dans l’emploi a fortement augmenté, mais la répartition des professions reste différenciée selon le sexe et des écarts de position persistent.</p></div>
                </div>

                <h3 className={styles.subTitle}>3. Marx : rapports de production, intérêts et conscience de classe</h3>
                <p className={styles.intro}>
                  Pour Marx, la structure de classe dépend d’abord de la place occupée dans les rapports de production.
                  Dans le capitalisme, l’opposition fondamentale sépare ceux qui possèdent les moyens de production
                  et ceux qui vendent leur force de travail. Une position objective forme une classe « en soi » ;
                  lorsque ses membres prennent conscience d’intérêts communs et se mobilisent, elle devient
                  une classe « pour soi ».
                </p>
                <div className={styles.grid2}>
                  <div className={styles.card + " " + styles.cardCoral}><h3>Dimension objective</h3><p>La propriété ou non des moyens de production crée des intérêts économiques opposés.</p></div>
                  <div className={styles.card + " " + styles.cardGreen}><h3>Dimension subjective</h3><p>La conscience de classe et la mobilisation collective donnent au groupe une existence sociale et politique plus forte.</p></div>
                </div>

                <h3 className={styles.subTitle}>4. Weber : une stratification multidimensionnelle</h3>
                <p className={styles.intro}>
                  Weber ne réduit pas la stratification à la propriété des moyens de production. Il distingue les
                  classes liées à la situation économique, les groupes de statut liés au prestige, et les partis liés
                  à l’accès au pouvoir. Une personne peut donc être bien placée dans une dimension et moins bien
                  placée dans une autre.
                </p>
                <div className={styles.grid3}>
                  <div className={styles.card}><h3>Classes</h3><p>Chances économiques et situation sur les marchés.</p></div>
                  <div className={styles.card}><h3>Statuts</h3><p>Prestige, honneur social, modes de vie et considération.</p></div>
                  <div className={styles.card}><h3>Partis</h3><p>Accès au pouvoir et capacité d’influencer les décisions collectives.</p></div>
                </div>

                <h3 className={styles.subTitle}>5. Les classes sociales sont-elles encore pertinentes ?</h3>
                <p className={styles.intro}>
                  La réponse n’est ni « oui » ni « non » automatiquement. Certains phénomènes ont pu rapprocher
                  les groupes : hausse du niveau de vie, massification scolaire, consommation de masse ou
                  développement des catégories intermédiaires. Mais des inégalités importantes persistent.
                  Parallèlement, certains groupes sont plus hétérogènes qu’autrefois : les distances intra-classes
                  peuvent augmenter.
                </p>

                <h3 className={styles.subTitle}>6. Il faut aussi articuler classe, genre et individualisation</h3>
                <div className={styles.grid2}>
                  <div className={styles.card + " " + styles.cardPurple}><h3>Rapports sociaux de genre</h3><p>Les femmes et les hommes n’occupent pas les mêmes positions dans l’emploi et ne subissent pas les mêmes contraintes. Ces effets se combinent avec la classe, le diplôme et l’âge.</p></div>
                  <div className={styles.card + " " + styles.cardBlue}><h3>Individualisation</h3><p>Des trajectoires plus diverses et des identités plus individualisées peuvent rendre les appartenances de classe moins visibles, sans faire disparaître les écarts objectifs de ressources.</p></div>
                </div>

                <div className={styles.callout + " " + styles.good}>
                  <strong>Conclusion du chapitre :</strong> la société française reste structurée et hiérarchisée,
                  mais aucun découpage unique ne suffit à la décrire. L’analyse des classes sociales demeure utile
                  à condition de l’articuler avec d’autres dimensions de l’espace social.
                </div>
              </>
            )}

            {active === "video" && (
              <>
                <p className={styles.intro}>
                  Cette partie est volontairement réservée. Nous y intégrerons ensuite le résumé vidéo CAPSES
                  du chapitre, construit à partir du même cours et des mêmes objectifs d’apprentissage.
                </p>
                <div className={styles.download}>
                  <div>
                    <h3>Résumé vidéo — bientôt disponible</h3>
                    <p>Format prévu : vidéo courte, schémas animés, définitions à l’écran et récapitulatif final.</p>
                  </div>
                  <span className={styles.pill}>À produire</span>
                </div>
              </>
            )}

            {active === "mecanismes" && (
              <>
                <p className={styles.intro}>
                  Ces mécanismes permettent de passer d’une définition à une véritable explication sociologique.
                </p>

                <h3 className={styles.subTitle}>1. Un facteur social produit une hiérarchie de positions</h3>
                <Flow items={["Facteur : diplôme / revenu / PCS…","Ressources et contraintes différentes","Pratiques et opportunités différentes","Positions sociales différenciées","Hiérarchie dans l’espace social"]} />

                <h3 className={styles.subTitle}>2. Salarisation</h3>
                <Flow items={["Déclin relatif agriculture / artisanat","Développement entreprises et administrations","Emplois salariés ↑","Indépendants deviennent minoritaires","Salariat devient dominant"]} />

                <h3 className={styles.subTitle}>3. Tertiarisation</h3>
                <Flow items={["Gains de productivité primaire / industrie","Emplois nécessaires ↓ dans ces secteurs","Demande de services ↑","Emplois tertiaires ↑","Part du tertiaire dans l’emploi ↑"]} />

                <h3 className={styles.subTitle}>4. Élévation des qualifications</h3>
                <Flow items={["Massification scolaire","Diplômes détenus ↑","Transformation technologique et organisationnelle","Demande de qualifications ↑","Cadres / professions intermédiaires ↑"]} />

                <h3 className={styles.subTitle}>5. Féminisation de l’emploi</h3>
                <Flow items={["Scolarisation des femmes ↑","Évolutions juridiques et familiales","Activité féminine ↑","Femmes dans l’emploi ↑","Structure socioprofessionnelle transformée"]} />

                <h3 className={styles.subTitle}>6. Marx : de la classe en soi à la classe pour soi</h3>
                <Flow items={["Même position dans les rapports de production","Intérêts objectifs communs","Interactions / conflits","Conscience de classe","Mobilisation collective","Classe pour soi"]} />

                <h3 className={styles.subTitle}>7. Réduction de la distance inter-classes</h3>
                <Flow items={["Hausse du niveau de vie","Massification scolaire","Consommation et pratiques se rapprochent","Distance inter-classes ↓","Frontières de classe moins visibles"]} />

                <h3 className={styles.subTitle}>8. Hausse de la distance intra-classe</h3>
                <Flow items={["Trajectoires plus diversifiées","Conditions d’emploi hétérogènes","Modes de vie et diplômes différenciés","Distance intra-classe ↑","Cohérence du groupe ↓"]} />

                <h3 className={styles.subTitle}>9. Articulation classe + genre</h3>
                <Flow items={["Position de classe","Rapports sociaux de genre","Effets se combinent","Contraintes / ressources spécifiques","Position sociale multidimensionnelle"]} />

                <h3 className={styles.subTitle}>10. Individualisation et identification subjective</h3>
                <Flow items={["Trajectoires individuelles plus diverses","Collectifs de travail / appartenances moins homogènes","Identités multiples","Sentiment d’appartenance de classe peut ↓","Inégalités objectives peuvent persister"]} />
              </>
            )}

            {active === "donnees" && (
              <>
                <p className={styles.intro}>
                  Les données servent à illustrer une transformation ou une hiérarchie. Elles ne remplacent jamais
                  le mécanisme sociologique.
                </p>
                <div className={styles.grid2}>
                  <div className={styles.stat}>
                    <strong>86,7 %</strong>
                    <span>des personnes en emploi sont salariées en France en 2024.</span>
                    <small>Insee, enquête Emploi 2024.</small>
                  </div>
                  <div className={styles.stat}>
                    <strong>76,6 %</strong>
                    <span>des personnes en emploi travaillent dans le secteur tertiaire en 2024.</span>
                    <small>Insee, Emploi, chômage, revenus du travail 2025.</small>
                  </div>
                  <div className={styles.stat}>
                    <strong>23,0 %</strong>
                    <span>des personnes en emploi sont cadres en 2024, contre 18,0 % ouvriers.</span>
                    <small>Insee, enquête Emploi 2024.</small>
                  </div>
                  <div className={styles.stat}>
                    <strong>47,2 %</strong>
                    <span>des personnes en emploi ont un diplôme du supérieur (bac+2 ou davantage) en 2024.</span>
                    <small>Insee, enquête Emploi 2024.</small>
                  </div>
                  <div className={styles.stat}>
                    <strong>38,8 %</strong>
                    <span>des femmes en emploi sont employées, contre 11,6 % des hommes.</span>
                    <small>Insee, enquête Emploi 2024.</small>
                  </div>
                  <div className={styles.stat}>
                    <strong>3,48</strong>
                    <span>rapport D9/D1 des niveaux de vie en France en 2024.</span>
                    <small>Insee, niveaux de vie et indicateurs d’inégalités, juillet 2026.</small>
                  </div>
                </div>

                <div className={styles.callout + " " + styles.warning}>
                  <strong>À savoir lire :</strong> 23,0 % de cadres ne signifie pas que 23,0 % de toute la population
                  française est cadre : le champ est celui des personnes en emploi.
                </div>
              </>
            )}

            {active === "erreurs" && (
              <>
                <p className={styles.intro}>
                  Les pièges de ce chapitre viennent surtout de notions proches qu’il ne faut pas traiter comme des synonymes.
                </p>
                <div className={styles.grid2}>
                  {[
                    ["PCS ≠ classe sociale","La PCS est une nomenclature statistique. Une classe sociale est un concept théorique qui dépend d’une analyse sociologique."],
                    ["Revenu ≠ niveau de vie","Le niveau de vie tient compte de la composition du ménage ; il ne se confond pas avec le revenu individuel."],
                    ["Revenu ≠ patrimoine","Le revenu est un flux reçu sur une période ; le patrimoine est un stock d’actifs possédés à une date donnée."],
                    ["Diplôme ≠ qualification","Le diplôme certifie une formation ; la qualification peut désigner les compétences d’un individu ou celles requises par un emploi."],
                    ["Sexe ≠ genre","Le sexe décrit une caractéristique individuelle ; le genre sert à analyser les rapports sociaux et attentes associés au féminin et au masculin."],
                    ["Tertiarisation ≠ salarisation","La tertiarisation concerne la part des services ; la salarisation concerne le statut salarié."],
                    ["Féminisation ≠ égalité femmes-hommes","Une hausse de la présence des femmes dans l’emploi n’efface ni la ségrégation professionnelle ni les écarts de carrière."],
                    ["Élévation des qualifications ≠ tout le monde devient cadre","La structure de l’emploi se qualifie, mais employés et ouvriers restent nombreux."],
                    ["Marx ≠ seulement deux catégories empiriques","L’opposition capitalistes/prolétaires est centrale dans sa théorie, mais Marx analyse aussi des fractions et groupes intermédiaires selon les contextes historiques."],
                    ["Classe en soi ≠ classe pour soi","Une position objective commune ne suffit pas : la classe pour soi suppose conscience et mobilisation."],
                    ["Marx ≠ Weber","Marx centre l’analyse sur les rapports de production et le conflit ; Weber construit une stratification multidimensionnelle."],
                    ["Groupe de statut ≠ PCS","Chez Weber, le groupe de statut repose sur le prestige et les styles de vie, pas sur la nomenclature professionnelle de l’Insee."],
                    ["Distance inter-classes ≠ distance intra-classe","Inter = entre les classes ; intra = à l’intérieur d’une même classe."],
                    ["Moyennisation ≠ disparition prouvée des classes","Un rapprochement de certains modes de vie peut réduire certaines distances sans supprimer les inégalités ou les groupes sociaux."],
                    ["Individualisation ≠ fin des inégalités","Des identités plus individualisées peuvent coexister avec des écarts objectifs de revenu, diplôme, patrimoine ou conditions de travail."],
                    ["Lieu de résidence ≠ simple adresse","Le territoire peut influer sur l’accès aux transports, emplois, établissements scolaires, services et réseaux."],
                    ["Même PCS ≠ même position sociale complète","Deux personnes de même PCS peuvent différer fortement par revenu, patrimoine, diplôme, âge, sexe ou composition du ménage."],
                    ["Différence ≠ inégalité automatiquement","Une différence devient une inégalité lorsqu’elle produit un avantage ou un désavantage hiérarchisé dans l’accès à une ressource valorisée."],
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
                  La banque comporte 20 questions. À chaque chargement de la page, CAPSES en tire
                  <strong> 10 au hasard</strong>. Le bouton final permet aussi de générer immédiatement une nouvelle série.
                </p>
                <div className={styles.callout + " " + styles.good}>
                  <strong>Objectif :</strong> réviser les définitions, les mécanismes, les auteurs et surtout les confusions
                  fréquentes. À partir de 70 %, le chapitre est enregistré comme validé dans « Mon espace ».
                </div>

                {quizQuestions.length === 0 && <div className={styles.callout}>Préparation d’un nouveau quiz…</div>}

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
                        : "Le chapitre reste en cours. Reprends les notions et mécanismes puis essaie une nouvelle série."}
                    </span>
                    <button type="button" className={styles.reset} onClick={renewQuiz}>Tirer 10 nouvelles questions</button>
                  </div>
                )}
              </>
            )}

            {active === "sujets" && (
              <>
                <p className={styles.intro}>
                  Les formulations ci-dessous servent à apprendre à organiser un raisonnement, pas à mémoriser un corrigé figé.
                </p>
                {[
                  ["Montrez que l’espace social est structuré et hiérarchisé par de multiples facteurs.","Présenter plusieurs facteurs — PCS, revenu, diplôme, ménage, âge, sexe, territoire — puis montrer qu’ils se combinent pour créer des positions et des chances inégales."],
                  ["Présentez les principales évolutions de la structure socioprofessionnelle française depuis la seconde moitié du XXe siècle.","Organiser la réponse autour de la salarisation, tertiarisation, élévation des qualifications et féminisation, avec un mécanisme et une donnée pour chacune."],
                  ["Comparez les analyses de la structure sociale de Marx et Weber.","Marx : rapports de production, classes, conflit et conscience. Weber : classes économiques + groupes de statut + partis, donc stratification multidimensionnelle."],
                  ["Les classes sociales permettent-elles encore de rendre compte de la société française actuelle ?","Montrer d’abord la persistance d’inégalités et de distances entre groupes, puis discuter la réduction de certaines distances, la fragmentation interne, le genre, l’individualisation et les identifications subjectives."],
                  ["Comment l’évolution de la structure des emplois transforme-t-elle la structure sociale ?","Relier tertiarisation, hausse des qualifications, féminisation et salarisation à la recomposition des PCS et des positions sociales."],
                ].map(([subject,plan]) => (
                  <div className={styles.subject} key={subject}>
                    <strong>{subject}</strong><p>{plan}</p>
                  </div>
                ))}

                <div className={styles.callout}>
                  <strong>EC1 :</strong> une définition précise + le mécanisme demandé + un exemple.
                  <br/><strong>EC3 / dissertation :</strong> articule les dimensions objectives et subjectives et évite les réponses binaires sur la « fin » ou le « retour » des classes.
                </div>
              </>
            )}

            {active === "memo" && (
              <>
                <p className={styles.intro}>
                  La fiche mémo de ce chapitre sera produite à partir de cette version validée, afin qu’elle soit
                  parfaitement cohérente avec le cours, les mécanismes et le quiz.
                </p>
                <div className={styles.download}>
                  <div>
                    <h3>Fiche mémo — Structure de la société française</h3>
                    <p>Objectifs officiels, notions, Marx/Weber, transformations de l’emploi, débat sur les classes et données actualisées.</p>
                  </div>
                  <span className={styles.pill}>À générer</span>
                </div>

                <h3 className={styles.subTitle}>Checklist avant le bac</h3>
                <div className={styles.grid2}>
                  {[
                    "Je sais citer et expliquer les 7 facteurs de structuration de l’espace social.",
                    "Je sais distinguer PCS et classe sociale.",
                    "Je sais expliquer salarisation et tertiarisation.",
                    "Je sais expliquer élévation des qualifications et féminisation.",
                    "Je sais présenter la théorie de Marx.",
                    "Je sais présenter les trois dimensions de Weber.",
                    "Je sais distinguer distance inter-classes et intra-classe.",
                    "Je sais expliquer pourquoi genre et classe doivent être articulés.",
                    "Je sais expliquer l’individualisation sans conclure à la disparition des inégalités.",
                    "Je sais construire une réponse nuancée sur la pertinence des classes sociales.",
                  ].map((item) => (
                    <div className={styles.card + " " + styles.cardGreen} key={item}><p>✓ {item}</p></div>
                  ))}
                </div>
              </>
            )}

            {active === "sources" && (
              <>
                <p className={styles.intro}>
                  Le contenu s’appuie sur la fiche Eduscol actualisée en octobre 2025 et sur les données
                  Insee les plus récentes disponibles pour la structure sociale et l’emploi.
                </p>
                <div className={styles.sourceList}>
                  <a className={styles.sourceItem} href="https://eduscol.education.gouv.fr/sites/default/files/document/ra25lyceegtsesstructuresocietefrancaiseactuellepdf-82818.pdf" target="_blank" rel="noreferrer">
                    <strong>Eduscol — Comment est structurée la société française actuelle ?</strong>
                    Objectifs d’apprentissage et savoirs scientifiques de référence, octobre 2025.
                  </a>
                  <a className={styles.sourceItem} href="https://eduscol.education.gouv.fr/6822/la-pcs-2020-une-nomenclature-renovee" target="_blank" rel="noreferrer">
                    <strong>Eduscol — PCS 2020</strong>
                    Présentation de la nomenclature rénovée et de son usage en SES.
                  </a>
                  <a className={styles.sourceItem} href="https://www.insee.fr/fr/statistiques/8391807" target="_blank" rel="noreferrer">
                    <strong>Insee — Une photographie du marché du travail en 2024</strong>
                    Statut d’emploi, PCS, diplôme, âge et sexe.
                  </a>
                  <a className={styles.sourceItem} href="https://www.insee.fr/fr/statistiques/8376826" target="_blank" rel="noreferrer">
                    <strong>Insee — Professions et secteurs d’activité</strong>
                    PCS et tertiarisation de l’emploi en 2024.
                  </a>
                  <a className={styles.sourceItem} href="https://www.insee.fr/fr/statistiques/2491918" target="_blank" rel="noreferrer">
                    <strong>Insee — Niveaux de vie et indicateurs d’inégalités</strong>
                    Déciles et rapport D9/D1, données 2024 publiées en juillet 2026.
                  </a>
                </div>
                <div className={styles.callout + " " + styles.good}>
                  <strong>Dernière révision du contenu :</strong> septembre 2026.
                  Les données anciennes du chapitre ont été remplacées, lorsque possible, par les résultats Insee 2024 publiés en 2025-2026.
                </div>
              </>
            )}
          </article>
        </div>

        <div className={styles.footer}>
          CAPSES · Terminale SES · Structure de la société française · version pédagogique 2026-2027
        </div>
      </div>
    </main>
  );
}
