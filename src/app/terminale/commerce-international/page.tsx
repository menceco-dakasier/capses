"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

const SLUG = "commerce-international";

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
    q: "Qu’est-ce qu’un avantage comparatif ?",
    options: [
      "Une production dans laquelle un pays possède le coût relatif le plus faible",
      "Une production dans laquelle un pays possède toujours le coût absolu le plus faible",
      "Un produit protégé par un droit de douane",
      "Un produit réservé au marché intérieur",
    ],
    correct: 0,
    explain: "Chez Ricardo, le raisonnement porte sur les coûts relatifs. Un pays peut donc avoir intérêt à se spécialiser même s’il est moins productif dans toutes les productions.",
  },
  {
    q: "Pourquoi les dotations factorielles influencent-elles la spécialisation ?",
    options: [
      "Un pays tend à se spécialiser dans les productions utilisant intensivement les facteurs dont il est relativement bien doté",
      "Tous les pays disposent des mêmes facteurs",
      "Elles déterminent uniquement le taux de change",
      "Elles n’ont aucun lien avec le commerce",
    ],
    correct: 0,
    explain: "Le modèle HOS relie la spécialisation aux abondances relatives de travail, capital et autres facteurs.",
  },
  {
    q: "Qu’est-ce qu’une dotation technologique ?",
    options: [
      "Le niveau de technologie, de savoir-faire et de capital humain disponible",
      "Le stock d’or d’un pays",
      "Le nombre d’entreprises publiques",
      "Le montant des droits de douane",
    ],
    correct: 0,
    explain: "Les différences technologiques modifient la productivité et donc les avantages comparatifs.",
  },
  {
    q: "Le commerce intrabranche correspond…",
    options: [
      "À des échanges croisés de produits similaires appartenant à la même branche",
      "À des échanges de matières premières uniquement",
      "À des échanges uniquement entre pays très différents",
      "À des flux financiers sans marchandises",
    ],
    correct: 0,
    explain: "Des pays comparables peuvent échanger des voitures contre des voitures ou des médicaments contre des médicaments.",
  },
  {
    q: "Pourquoi des pays comparables échangent-ils des produits similaires ?",
    options: [
      "Grâce notamment à la différenciation des produits et aux économies d’échelle",
      "Parce qu’ils ont forcément des dotations factorielles opposées",
      "Parce que les consommateurs ne veulent aucune variété",
      "Parce que toute spécialisation disparaît",
    ],
    correct: 0,
    explain: "Les nouvelles théories du commerce expliquent les échanges intrabranche par la variété, la qualité et les économies d’échelle.",
  },
  {
    q: "Qu’est-ce qu’une économie d’échelle ?",
    options: [
      "Une baisse du coût moyen lorsque la quantité produite augmente",
      "Une hausse automatique du salaire minimum",
      "Une baisse des exportations quand le marché s’agrandit",
      "Une taxe sur la production",
    ],
    correct: 0,
    explain: "Un marché plus large peut permettre à une firme de produire davantage et de réduire son coût moyen.",
  },
  {
    q: "Pourquoi la productivité des firmes compte-t-elle pour la compétitivité d’un pays ?",
    options: [
      "Les firmes productives peuvent supporter plus facilement les coûts de l’exportation et proposer de meilleurs prix ou une meilleure qualité",
      "La productivité ne joue aucun rôle dans l’exportation",
      "Seules les firmes les moins productives exportent",
      "La compétitivité d’un pays dépend uniquement du taux de change",
    ],
    correct: 0,
    explain: "Les firmes les plus productives sont mieux placées pour exporter et gagner des parts de marché.",
  },
  {
    q: "Compétitivité-prix et compétitivité hors-prix…",
    options: [
      "Sont deux dimensions différentes de la capacité à vendre face à la concurrence",
      "Sont exactement synonymes",
      "Concernent seulement les importations",
      "Ne dépendent jamais de la productivité",
    ],
    correct: 0,
    explain: "La première repose davantage sur les coûts et les prix ; la seconde sur la qualité, l’innovation, l’image ou les services.",
  },
  {
    q: "Qu’est-ce qu’une chaîne de valeur ?",
    options: [
      "L’ensemble des étapes qui contribuent à créer la valeur d’un bien ou service",
      "La liste des prix pratiqués par une entreprise",
      "Un accord de libre-échange",
      "Une taxe à l’importation",
    ],
    correct: 0,
    explain: "Conception, composants, assemblage, logistique, marketing ou distribution peuvent être répartis entre plusieurs pays.",
  },
  {
    q: "L’internationalisation de la chaîne de valeur signifie…",
    options: [
      "Que les différentes étapes de production sont réparties entre plusieurs pays",
      "Que toutes les étapes reviennent dans un seul pays",
      "Que les entreprises cessent d’échanger",
      "Que seuls les produits finis traversent les frontières",
    ],
    correct: 0,
    explain: "La fragmentation internationale explique une grande partie du commerce de biens intermédiaires.",
  },
  {
    q: "Un IDE est…",
    options: [
      "Un investissement durable donnant une influence ou un contrôle dans une entreprise située à l’étranger",
      "Une importation ponctuelle",
      "Un simple achat d’un produit étranger",
      "Une taxe douanière",
    ],
    correct: 0,
    explain: "Créer ou acquérir une filiale étrangère constitue un IDE.",
  },
  {
    q: "Externalisation et délocalisation sont-elles synonymes ?",
    options: [
      "Non : externaliser signifie confier une activité à une autre entreprise ; délocaliser signifie transférer une activité vers un autre pays",
      "Oui, toujours",
      "Oui, mais seulement dans l’industrie",
      "Non, car la délocalisation concerne seulement les services",
    ],
    correct: 0,
    explain: "Les deux décisions peuvent se combiner, mais elles répondent à deux dimensions différentes : qui produit et où l’activité est réalisée.",
  },
  {
    q: "Quel est un gain moyen du commerce international pour les consommateurs ?",
    options: [
      "Des prix potentiellement plus faibles et une plus grande variété de produits",
      "Une hausse nécessaire des prix",
      "La disparition de toute concurrence",
      "La fin des innovations",
    ],
    correct: 0,
    explain: "Spécialisation, concurrence et économies d’échelle peuvent améliorer le pouvoir d’achat et la variété disponible.",
  },
  {
    q: "Le commerce international réduit-il nécessairement toutes les inégalités ?",
    options: [
      "Non : il peut réduire les écarts entre pays tout en accroissant certaines inégalités au sein des pays",
      "Oui, dans tous les pays et pour tous les ménages",
      "Non, car il augmente toujours toutes les inégalités",
      "Oui, si le taux de change est fixe",
    ],
    correct: 0,
    explain: "Les gains sont moyens et leur répartition dépend des secteurs, qualifications, territoires et politiques publiques.",
  },
  {
    q: "Pourquoi le commerce peut-il accroître certaines inégalités internes ?",
    options: [
      "La concurrence des importations et les changements de spécialisation peuvent déplacer emplois et revenus entre groupes",
      "Parce que les exportations sont interdites",
      "Parce que tous les travailleurs gagnent la même chose",
      "Parce qu’il supprime les différences de qualification",
    ],
    correct: 0,
    explain: "Les secteurs exposés peuvent perdre des emplois tandis que d’autres secteurs gagnent, ce qui crée des effets distributifs.",
  },
  {
    q: "Le libre-échange signifie…",
    options: [
      "La réduction des obstacles aux échanges, dans un cadre qui reste organisé par des règles",
      "L’absence totale de toute règle",
      "L’interdiction des importations",
      "La fermeture des frontières commerciales",
    ],
    correct: 0,
    explain: "Le libre-échange repose aussi sur des institutions et des accords qui encadrent les échanges.",
  },
  {
    q: "Quel est un argument en faveur du protectionnisme éducateur ?",
    options: [
      "Protéger temporairement une industrie naissante afin qu’elle acquière de l’expérience et devienne compétitive",
      "Protéger définitivement toutes les entreprises",
      "Supprimer toute concurrence intérieure",
      "Interdire l’innovation étrangère",
    ],
    correct: 0,
    explain: "L’argument de List est temporaire : la protection vise à laisser le temps à une activité nouvelle d’apprendre et d’atteindre une taille efficace.",
  },
  {
    q: "Quel peut être un coût d’un droit de douane ?",
    options: [
      "Une hausse du prix des importations pour les consommateurs et les entreprises utilisatrices",
      "Une baisse certaine de tous les prix",
      "Une disparition de tout risque de représailles",
      "Une amélioration automatique de la productivité",
    ],
    correct: 0,
    explain: "Le droit de douane protège certains producteurs mais renchérit les biens importés et peut provoquer des représailles.",
  },
  {
    q: "Pourquoi la mondialisation actuelle ne se résume-t-elle pas au commerce de produits finis ?",
    options: [
      "Parce qu’elle inclut aussi biens intermédiaires, services, IDE et chaînes de valeur fragmentées",
      "Parce qu’il n’existe plus de produits finis",
      "Parce que seuls les capitaux circulent",
      "Parce que les services ne s’échangent pas",
    ],
    correct: 0,
    explain: "Les économies sont intégrées par plusieurs types de flux et les étapes productives sont souvent réparties entre plusieurs pays.",
  },
  {
    q: "Quelle affirmation résume le mieux le débat libre-échange / protectionnisme ?",
    options: [
      "Il faut comparer les gains de l’ouverture, leurs effets distributifs et les coûts éventuels des protections",
      "Le libre-échange est toujours sans coût",
      "Le protectionnisme est toujours sans coût",
      "Le débat ne concerne jamais les consommateurs",
    ],
    correct: 0,
    explain: "Le chapitre demande de comprendre les arguments, mécanismes et arbitrages plutôt que d’apprendre une position unique.",
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

export default function CommerceInternationalPage() {
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
      const savedSteps = localStorage.getItem("capses_commerce_steps");
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
        localStorage.setItem("capses_commerce_steps", JSON.stringify(next));
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
          <span>Commerce international</span>
        </div>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Science économique · Chapitre 3</span>
            <h1>Quels sont les fondements du commerce international et de l’internationalisation de la production ?</h1>
            <p className={styles.heroLead}>
              Comprendre pourquoi les pays échangent, pourquoi des pays comparables commercent entre eux,
              comment les firmes organisent leurs chaînes de valeur à l’échelle mondiale et pourquoi les
              effets de l’ouverture commerciale sont à la fois bénéfiques et inégalement répartis.
            </p>
            <div className={styles.heroMeta}>
              <span className={styles.pill}>11 étapes</span>
              <span className={styles.pill}>≈ 70 min au total</span>
              <span className={styles.pill}>Données mises à jour 2026</span>
              <span className={styles.pill}>20 questions en banque</span>
            </div>
          </div>
          <div className={styles.heroVisual} aria-hidden="true">
            <div className={styles.chartCard}>
              <div className={styles.chartTitle}>Mondialisation · échanges · chaînes de valeur</div>
              <div className={styles.chartBig}>Produire ici, vendre partout</div>
              <div className={styles.chartSub}>et comprendre qui gagne, qui s’adapte et pourquoi les firmes fragmentent la production</div>
              <div className={styles.chart}>
                <div className={styles.chartLine} />
                <span className={styles.dot + " " + styles.dot1} />
                <span className={styles.dot + " " + styles.dot2} />
                <span className={styles.dot + " " + styles.dot3} />
                <span className={styles.dot + " " + styles.dot4} />
                <div className={styles.chartNote}>Avantages comparatifs → spécialisation → échanges</div>
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
              <span className={styles.sectionTime}>{STEPS.find((s) => s.id === active)?.time}</span>
            </div>

            {active === "bac" && (
              <>
                <p className={styles.intro}>
                  Le chapitre comporte six objectifs officiels. Pour chacun, tu retrouves la formulation du programme
                  puis une traduction « En clair ».
                </p>
                {[
                  {
                    n:"Objectif officiel 1",
                    title:"Avantages comparatifs et spécialisation",
                    official:"Comprendre le rôle des dotations factorielles et technologiques (avantages comparatifs) dans les échanges commerciaux et la spécialisation internationale.",
                    clear:"Tu dois expliquer pourquoi deux pays peuvent avoir intérêt à se spécialiser et échanger, en reliant coûts relatifs, facteurs disponibles, technologie et productivité."
                  },
                  {
                    n:"Objectif officiel 2",
                    title:"Commerce entre pays comparables",
                    official:"Comprendre le commerce international entre pays comparables (différenciation des produits, qualité des produits, et fragmentation de la chaîne de valeur).",
                    clear:"Tu dois montrer pourquoi la France et l’Allemagne peuvent s’échanger des produits similaires : variété, gamme, qualité et spécialisation des étapes de production."
                  },
                  {
                    n:"Objectif officiel 3",
                    title:"Productivité des firmes et compétitivité",
                    official:"Comprendre que la productivité des firmes sous-tend la compétitivité d’un pays, c’est-à-dire son aptitude à exporter.",
                    clear:"Tu dois partir de la firme : si elle est productive, elle peut réduire ses coûts, investir, améliorer la qualité et supporter les coûts supplémentaires liés à l’exportation."
                  },
                  {
                    n:"Objectif officiel 4",
                    title:"Internationalisation de la chaîne de valeur",
                    official:"Comprendre l’internationalisation de la chaîne de valeur et savoir l’illustrer.",
                    clear:"Tu dois être capable de suivre un produit de la conception à la vente et montrer que ses différentes étapes peuvent être réparties entre plusieurs pays."
                  },
                  {
                    n:"Objectif officiel 5",
                    title:"Les effets du commerce international",
                    official:"Comprendre les effets induits par le commerce international : gains moyens en termes de baisse de prix, réduction des inégalités entre pays, accroissement des inégalités de revenus au sein de chaque pays.",
                    clear:"Tu dois distinguer le gain moyen pour l’économie de sa répartition : des consommateurs et secteurs gagnent, tandis que certains travailleurs ou territoires peuvent perdre."
                  },
                  {
                    n:"Objectif officiel 6",
                    title:"Libre-échange et protectionnisme",
                    official:"Comprendre les termes du débat entre libre-échange et protectionnisme.",
                    clear:"Tu dois savoir expliquer les avantages de l’ouverture, les arguments qui peuvent justifier certaines protections et les coûts ou risques du protectionnisme."
                  },
                ].map((oa) => (
                  <div className={styles.card + " " + styles.cardBlue} key={oa.n}>
                    <span className={styles.badge}>{oa.n}</span>
                    <h3>{oa.title}</h3>
                    <p>{oa.official}</p>
                    <div className={styles.callout + " " + styles.good}>
                      <strong>En clair :</strong> {oa.clear}
                    </div>
                  </div>
                ))}
              </>
            )}

            {active === "notions" && (
              <>
                <p className={styles.intro}>
                  Les définitions sont développées pour éviter les confusions qui font perdre des points au bac.
                </p>
                {[
                  ["Commerce international","Ensemble des échanges de biens et de services entre économies nationales. Il comprend les produits finis mais aussi les services et de nombreux biens intermédiaires."],
                  ["Mondialisation","Processus d’intégration croissante des économies dans un espace mondial par les échanges commerciaux, les capitaux, les firmes multinationales, les technologies et les règles internationales."],
                  ["Spécialisation internationale","Répartition des activités productives entre pays. Un pays concentre davantage de ressources dans certaines productions et importe une partie des autres biens et services."],
                  ["Avantage comparatif","Production pour laquelle un pays possède un coût relatif plus faible. Il ne faut pas la confondre avec l’avantage absolu : le raisonnement porte sur la comparaison des coûts relatifs."],
                  ["Dotations factorielles","Quantités relatives de facteurs disponibles dans une économie : travail, capital, ressources naturelles et, selon les approches, travail qualifié."],
                  ["Dotations technologiques","Niveau de technologie, de savoir-faire, de capital humain et d’organisation productive qui influence la productivité d’un pays."],
                  ["Commerce interbranche","Échange de produits appartenant à des branches différentes. Exemple : exporter des avions et importer du textile."],
                  ["Commerce intrabranche","Échanges croisés de produits similaires appartenant à la même branche. Exemple : des voitures françaises échangées contre des voitures allemandes."],
                  ["Différenciation horizontale","Produits de qualité comparable mais aux caractéristiques différentes : marque, design, goût, style ou options."],
                  ["Différenciation verticale","Produits comparables mais de niveaux de qualité ou de gamme différents."],
                  ["Économies d’échelle","Baisse du coût moyen lorsque la quantité produite augmente. L’ouverture à un marché plus grand peut donc permettre de réduire le coût par unité."],
                  ["Productivité","Rapport entre une production et les facteurs utilisés pour la réaliser. Une firme plus productive peut produire davantage avec les mêmes ressources ou autant avec moins de ressources."],
                  ["Compétitivité-prix","Capacité à vendre face aux concurrents grâce à des prix attractifs. Elle dépend notamment de la productivité et des coûts unitaires."],
                  ["Compétitivité hors-prix","Capacité à vendre grâce à la qualité, l’innovation, la marque, le design, les délais ou les services associés."],
                  ["Chaîne de valeur","Ensemble des étapes qui contribuent à créer la valeur d’un produit : R&D, conception, composants, assemblage, logistique, marketing, distribution, services."],
                  ["Fragmentation de la chaîne de valeur","Répartition de ces différentes étapes entre plusieurs entreprises ou plusieurs pays selon leurs avantages et leurs coûts."],
                  ["Firme multinationale","Entreprise qui contrôle au moins une unité productive à l’étranger et organise une partie de son activité à l’échelle internationale."],
                  ["IDE","Investissement direct à l’étranger : investissement durable donnant une influence significative ou le contrôle d’une entreprise située dans un autre pays."],
                  ["Délocalisation","Transfert d’une activité productive vers un autre pays. Elle peut être réalisée dans une filiale du même groupe ou chez un sous-traitant."],
                  ["Externalisation","Décision de confier une activité auparavant réalisée en interne à une autre entreprise. Elle peut avoir lieu dans le même pays ou à l’étranger."],
                  ["Libre-échange","Orientation visant à réduire les obstacles tarifaires et non tarifaires aux échanges. Il ne signifie pas absence de règles : les échanges restent encadrés par des institutions."],
                  ["Protectionnisme","Ensemble de mesures destinées à limiter certaines importations ou à soutenir les producteurs nationaux : droits de douane, quotas, normes, subventions, etc."],
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
                  Le chapitre suit une logique simple : pourquoi échanger, pourquoi des pays similaires échangent aussi,
                  comment les firmes mondialisent la production, puis quels sont les gains et les limites de cette ouverture.
                </p>

                <h3 className={styles.subTitle}>1. Les avantages comparatifs expliquent la spécialisation</h3>
                <p className={styles.intro}>
                  Ricardo montre qu’un pays n’a pas besoin d’être le meilleur en valeur absolue pour gagner à l’échange.
                  Il doit comparer ses coûts relatifs et se spécialiser là où son avantage est le plus fort — ou son
                  désavantage le plus faible. La spécialisation augmente alors la production globale disponible.
                </p>
                <div className={styles.grid2}>
                  <div className={styles.card + " " + styles.cardBlue}><h3>Avantage absolu</h3><p>On compare les coûts ou productivités absolus entre pays.</p></div>
                  <div className={styles.card + " " + styles.cardGreen}><h3>Avantage comparatif</h3><p>On compare les coûts relatifs : c’est ce mécanisme qui permet de comprendre des gains à l’échange même lorsqu’un pays est moins productif partout.</p></div>
                </div>

                <h3 className={styles.subTitle}>2. Les dotations factorielles et technologiques orientent les échanges</h3>
                <p className={styles.intro}>
                  Le modèle HOS relie la spécialisation aux facteurs dont un pays dispose relativement en abondance.
                  Les dotations évoluent avec l’éducation, l’investissement, les infrastructures ou la R&D. Elles ne sont donc
                  pas figées. Les différences de technologie et de capital humain modifient également les productivités.
                </p>

                <h3 className={styles.subTitle}>3. Des pays comparables échangent aussi entre eux</h3>
                <div className={styles.grid2}>
                  <div className={styles.card + " " + styles.cardPurple}><h3>Différenciation</h3><p>Les consommateurs veulent de la variété et des gammes différentes. Les firmes peuvent donc vendre des produits proches mais non identiques.</p></div>
                  <div className={styles.card + " " + styles.cardAmber}><h3>Économies d’échelle</h3><p>Un marché international plus large permet d’augmenter les volumes et peut faire baisser le coût moyen de production.</p></div>
                </div>

                <h3 className={styles.subTitle}>4. La productivité des firmes détermine en partie leur capacité à exporter</h3>
                <p className={styles.intro}>
                  Exporter coûte cher : prospection, transport, adaptation du produit, normes, assurance et procédures douanières.
                  Les firmes les plus productives peuvent mieux absorber ces coûts. La compétitivité-prix dépend des coûts et
                  des prix ; la compétitivité hors-prix repose sur la qualité, l’innovation, la marque ou les services.
                </p>

                <h3 className={styles.subTitle}>5. La production est fragmentée à l’échelle mondiale</h3>
                <p className={styles.intro}>
                  Une même firme peut concevoir dans un pays, acheter ses composants dans plusieurs autres, assembler ailleurs,
                  puis commercialiser partout. Les étapes sont localisées selon les coûts, compétences, infrastructures, marchés,
                  ressources et risques. Cette organisation multiplie les échanges de biens intermédiaires.
                </p>
                <div className={styles.grid3}>
                  <div className={styles.card}><h3>IDE</h3><p>Créer ou acquérir une filiale étrangère pour contrôler durablement une activité.</p></div>
                  <div className={styles.card}><h3>Délocalisation</h3><p>Déplacer une activité vers un autre pays.</p></div>
                  <div className={styles.card}><h3>Externalisation</h3><p>Confier une activité à une autre entreprise, qui peut être nationale ou étrangère.</p></div>
                </div>

                <h3 className={styles.subTitle}>6. Le commerce crée des gains moyens, mais pas les mêmes pour tous</h3>
                <p className={styles.intro}>
                  La spécialisation, les économies d’échelle, la concurrence et la diffusion des technologies peuvent faire
                  baisser les prix, augmenter la variété et accroître la productivité. Mais les secteurs exposés à de nouvelles
                  importations peuvent perdre des emplois et certains territoires se restructurer. Les effets dépendent aussi
                  de la formation, de la mobilité, de la redistribution et du progrès technique.
                </p>

                <h3 className={styles.subTitle}>7. Libre-échange et protectionnisme : un arbitrage</h3>
                <div className={styles.grid2}>
                  <div className={styles.card + " " + styles.cardGreen}><h3>Arguments pour l’ouverture</h3><p>Spécialisation, prix plus faibles, variété, économies d’échelle, concurrence, diffusion des technologies et accès à de grands marchés.</p></div>
                  <div className={styles.card + " " + styles.cardCoral}><h3>Arguments pour certaines protections</h3><p>Industries naissantes, secteurs stratégiques, sécurité d’approvisionnement, objectifs sociaux ou environnementaux.</p></div>
                </div>
                <div className={styles.callout}>
                  <strong>Attention :</strong> une protection peut aussi augmenter les prix, renchérir les intrants importés,
                  provoquer des représailles et maintenir artificiellement des secteurs peu efficaces.
                </div>
              </>
            )}

            {active === "video" && (
              <>
                <p className={styles.intro}>
                  Cette section accueillera le résumé vidéo CAPSES consacré à la mondialisation et au commerce international.
                </p>
                <div className={styles.download}>
                  <div>
                    <h3>Résumé vidéo — bientôt disponible</h3>
                    <p>Format prévu : avantages comparatifs, chaînes de valeur, effets du commerce et débat libre-échange / protectionnisme.</p>
                  </div>
                  <span className={styles.pill}>À produire</span>
                </div>
              </>
            )}

            {active === "mecanismes" && (
              <>
                <p className={styles.intro}>
                  Ces chaînes causales sont celles qu’il faut savoir reconstruire dans une copie.
                </p>

                <h3 className={styles.subTitle}>1. Avantage comparatif → gains à l’échange</h3>
                <Flow items={["Différences de coûts relatifs","Spécialisation","Production mondiale ↑","Échange des excédents","Quantités disponibles ↑","Gains à l’échange"]} />

                <h3 className={styles.subTitle}>2. Dotations factorielles → spécialisation</h3>
                <Flow items={["Facteur relativement abondant","Coût relatif de ce facteur ↓","Production utilisant intensivement ce facteur favorisée","Spécialisation","Exportations de ces produits"]} />

                <h3 className={styles.subTitle}>3. Différenciation + économies d’échelle → commerce intrabranche</h3>
                <Flow items={["Marché international élargi","Production par variété ↑","Coût moyen ↓","Spécialisation des firmes","Variété offerte ↑","Échanges de produits similaires"]} />

                <h3 className={styles.subTitle}>4. Productivité des firmes → compétitivité</h3>
                <Flow items={["Productivité ↑","Coût unitaire ↓ / qualité ↑","Compétitivité-prix ou hors-prix ↑","Capacité à supporter les coûts d’exportation","Exportations ↑","Parts de marché ↑"]} />

                <h3 className={styles.subTitle}>5. Fragmentation de la chaîne de valeur</h3>
                <Flow items={["Étapes productives identifiées","Comparaison coûts / compétences / marchés","Localisation optimale de chaque étape","Production répartie entre pays","Biens intermédiaires circulent","Interdépendance ↑"]} />

                <h3 className={styles.subTitle}>6. Ouverture commerciale → gains pour les consommateurs</h3>
                <Flow items={["Ouverture","Concurrence + économies d’échelle","Prix possibles ↓","Variété ↑","Pouvoir d’achat réel ↑","Gain moyen du consommateur"]} />

                <h3 className={styles.subTitle}>7. Ouverture commerciale → inégalités internes possibles</h3>
                <Flow items={["Concurrence des importations","Secteurs exposés se contractent","Demande de certains emplois ↓","Revenus / emploi de certains groupes ↓","Gains concentrés ailleurs","Inégalités internes possibles ↑"]} />

                <h3 className={styles.subTitle}>8. Droit de douane → effets contradictoires</h3>
                <Flow items={["Droit de douane","Prix importé ↑","Producteurs nationaux protégés","Consommateurs / firmes utilisatrices paient plus","Risque de représailles","Gain global incertain"]} />

                <h3 className={styles.subTitle}>9. Protectionnisme éducateur</h3>
                <Flow items={["Industrie naissante","Productivité initiale faible","Protection temporaire","Apprentissage + investissement","Productivité ↑","Ouverture lorsque compétitive"]} />
              </>
            )}

            {active === "donnees" && (
              <>
                <p className={styles.intro}>
                  Les chiffres ci-dessous sont des exemples utilisables dans une copie si tu précises l’année et la source.
                </p>
                <div className={styles.grid2}>
                  <div className={styles.stat}>
                    <strong>+4,6 %</strong>
                    <span>croissance du volume du commerce mondial de marchandises en 2025.</span>
                    <small>OMC, Global Trade Outlook and Statistics, mars 2026.</small>
                  </div>
                  <div className={styles.stat}>
                    <strong>34,65 T$</strong>
                    <span>valeur du commerce mondial de biens et services en 2025.</span>
                    <small>OMC, 2026.</small>
                  </div>
                  <div className={styles.stat}>
                    <strong>+6 %</strong>
                    <span>hausse des IDE mondiaux en 2025, à 1 600 Md$.</span>
                    <small>CNUCED, World Investment Report 2026.</small>
                  </div>
                  <div className={styles.stat}>
                    <strong>-64,9 Md€</strong>
                    <span>solde français du commerce de biens en 2025.</span>
                    <small>Insee / Douanes, juillet 2026.</small>
                  </div>
                  <div className={styles.stat}>
                    <strong>+60,6 Md€</strong>
                    <span>solde français des services en 2025 dans les comptes nationaux.</span>
                    <small>Insee, mai 2026.</small>
                  </div>
                  <div className={styles.stat}>
                    <strong>1,9 %</strong>
                    <span>croissance du volume du commerce mondial de marchandises prévue par l’OMC pour 2026 dans son scénario de référence.</span>
                    <small>OMC, mars 2026 — prévision, donc à distinguer d’une donnée observée.</small>
                  </div>
                </div>
                <div className={styles.callout + " " + styles.warning}>
                  <strong>Réflexe bac :</strong> distingue toujours une donnée observée d’une prévision.
                  Le +1,9 % pour 2026 est une projection de l’OMC, pas un résultat définitif.
                </div>
              </>
            )}

            {active === "erreurs" && (
              <>
                <p className={styles.intro}>
                  Voici les confusions les plus fréquentes à éviter dans ce chapitre.
                </p>
                <div className={styles.grid2}>
                  {[
                    ["Avantage absolu ≠ avantage comparatif","L’avantage absolu compare les coûts ou productivités en niveau ; l’avantage comparatif compare les coûts relatifs."],
                    ["Spécialisation ≠ autarcie","Se spécialiser signifie concentrer davantage de ressources sur certaines productions puis échanger pour obtenir les autres."],
                    ["Dotation factorielle ≠ dotation technologique","La première concerne les facteurs disponibles ; la seconde le niveau de technologie, savoir-faire et capital humain."],
                    ["Commerce interbranche ≠ intrabranche","Interbranche = produits de branches différentes ; intrabranche = produits similaires d’une même branche."],
                    ["Différenciation horizontale ≠ verticale","Horizontale = caractéristiques différentes à qualité comparable ; verticale = gamme ou qualité différente."],
                    ["Productivité ≠ compétitivité","La productivité est un déterminant possible de la compétitivité, mais les deux notions ne sont pas synonymes."],
                    ["Compétitivité-prix ≠ hors-prix","La première repose davantage sur les coûts et prix ; la seconde sur la qualité, l’innovation, la marque ou les services."],
                    ["Compétitivité d’une firme ≠ compétitivité d’un pays","Une firme cherche des parts de marché ; pour un pays, l’enjeu final concerne aussi emploi, revenus, innovation et niveau de vie."],
                    ["IDE ≠ exportation","Un IDE implique un investissement durable à l’étranger ; une exportation est une vente à l’étranger."],
                    ["Délocalisation ≠ externalisation","Délocaliser change le pays de production ; externaliser change l’entreprise qui réalise l’activité."],
                    ["FMN ≠ entreprise qui exporte seulement","Une firme multinationale contrôle au moins une unité productive à l’étranger."],
                    ["Chaîne de valeur ≠ chaîne logistique","La chaîne de valeur inclut toutes les étapes créatrices de valeur, pas seulement le transport et la logistique."],
                    ["Libre-échange ≠ absence de règles","Les échanges internationaux sont encadrés par des accords, normes et institutions."],
                    ["Protectionnisme ≠ seulement droits de douane","Il comprend aussi quotas, normes, subventions et autres mesures qui modifient l’accès au marché."],
                    ["Protectionnisme éducateur ≠ protection permanente","L’argument des industries naissantes suppose une protection temporaire destinée à favoriser l’apprentissage."],
                    ["Gain moyen ≠ tout le monde gagne","Le commerce peut augmenter le revenu total tout en créant des gagnants et des perdants."],
                    ["Baisse des inégalités entre pays ≠ baisse dans chaque pays","La convergence entre pays peut coexister avec une hausse de certaines inégalités internes."],
                    ["Commerce international ≠ seule cause des inégalités","Progrès technique, fiscalité, institutions du travail, formation et redistribution jouent aussi un rôle."],
                    ["Commerce brut ≠ valeur ajoutée domestique","Dans les chaînes de valeur, des composants peuvent franchir plusieurs frontières : la valeur brute peut donc compter plusieurs fois certaines étapes."],
                    ["Mondialisation ≠ seulement commerce","Elle inclut aussi IDE, firmes multinationales, technologies, capitaux et chaînes de valeur internationales."],
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
                  La banque contient 20 questions et CAPSES en tire <strong>10 au hasard</strong> à chaque chargement.
                  Une nouvelle série peut aussi être générée immédiatement.
                </p>
                <div className={styles.callout + " " + styles.good}>
                  <strong>Validation :</strong> à partir de 70 %, le chapitre est enregistré comme validé dans « Mon espace ».
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
                        : "Le chapitre reste en cours. Reprends les mécanismes et les confusions puis tire une nouvelle série."}
                    </span>
                    <button type="button" className={styles.reset} onClick={renewQuiz}>Tirer 10 nouvelles questions</button>
                  </div>
                )}
              </>
            )}

            {active === "sujets" && (
              <>
                <p className={styles.intro}>
                  Les sujets servent à organiser les mécanismes attendus, pas à apprendre un plan figé.
                </p>
                {[
                  ["Montrez que les avantages comparatifs expliquent la spécialisation internationale.","Définir avantage comparatif, montrer le raisonnement en coûts relatifs puis relier spécialisation, hausse de la production totale et gains à l’échange."],
                  ["Vous montrerez que le commerce international ne se limite pas aux échanges entre pays différents.","Expliquer le commerce intrabranche par différenciation horizontale / verticale, économies d’échelle et fragmentation des chaînes de valeur."],
                  ["Expliquez pourquoi la productivité des firmes sous-tend la compétitivité d’un pays.","Relier productivité, coûts unitaires, qualité, coûts fixes d’exportation, compétitivité-prix / hors-prix et capacité à exporter."],
                  ["Vous montrerez que l’internationalisation de la chaîne de valeur transforme le commerce mondial.","Décrire la fragmentation, les IDE, les échanges de biens intermédiaires, la localisation des étapes et l’interdépendance croissante."],
                  ["Le commerce international ne fait-il que des gagnants ?","Présenter les gains moyens puis analyser la répartition inégale entre secteurs, travailleurs, territoires et consommateurs."],
                  ["Faut-il préférer le libre-échange au protectionnisme ?","Comparer les gains de l’ouverture aux arguments de protection ciblée, puis discuter coûts, représailles et nécessité d’accompagner les perdants."],
                ].map(([subject,plan]) => (
                  <div className={styles.subject} key={subject}>
                    <strong>{subject}</strong><p>{plan}</p>
                  </div>
                ))}
              </>
            )}

            {active === "memo" && (
              <>
                <p className={styles.intro}>
                  La fiche mémo sera générée à partir de cette version mise à jour afin qu’elle corresponde exactement
                  au cours et aux mécanismes proposés sur CAPSES.
                </p>
                <div className={styles.download}>
                  <div>
                    <h3>Fiche mémo — Mondialisation / Commerce international</h3>
                    <p>Avantages comparatifs, commerce intrabranche, chaînes de valeur, compétitivité, effets de l’ouverture et protectionnisme.</p>
                  </div>
                  <span className={styles.pill}>À générer</span>
                </div>

                <h3 className={styles.subTitle}>Checklist avant le bac</h3>
                <div className={styles.grid2}>
                  {[
                    "Je sais distinguer avantage absolu et avantage comparatif.",
                    "Je sais relier dotations factorielles et spécialisation.",
                    "Je sais expliquer le commerce entre pays comparables.",
                    "Je sais distinguer différenciation horizontale et verticale.",
                    "Je sais relier productivité des firmes et compétitivité.",
                    "Je sais distinguer compétitivité-prix et hors-prix.",
                    "Je sais expliquer l’internationalisation d’une chaîne de valeur.",
                    "Je sais distinguer IDE, délocalisation et externalisation.",
                    "Je sais expliquer les gains moyens et les effets distributifs du commerce.",
                    "Je sais présenter les arguments et limites du libre-échange et du protectionnisme.",
                  ].map((item) => (
                    <div className={styles.card + " " + styles.cardGreen} key={item}><p>✓ {item}</p></div>
                  ))}
                </div>
              </>
            )}

            {active === "sources" && (
              <>
                <p className={styles.intro}>
                  Le contenu reprend le cours de référence actualisé et les objectifs Eduscol. Les données récentes
                  ont été remplacées par les dernières publications disponibles en 2026.
                </p>
                <div className={styles.sourceList}>
                  <a className={styles.sourceItem} href="https://eduscol.education.gouv.fr/" target="_blank" rel="noreferrer">
                    <strong>Programme officiel / Eduscol</strong>
                    Objectifs d’apprentissage du chapitre de Terminale SES.
                  </a>
                  <a className={styles.sourceItem} href="https://www.wto.org/english/res_e/booksp_e/gtos0326_e.pdf" target="_blank" rel="noreferrer">
                    <strong>OMC — Global Trade Outlook and Statistics, mars 2026</strong>
                    Commerce mondial de marchandises et de services, résultats 2025 et perspectives 2026.
                  </a>
                  <a className={styles.sourceItem} href="https://unctad.org/publication/world-investment-report-2026" target="_blank" rel="noreferrer">
                    <strong>CNUCED — World Investment Report 2026</strong>
                    IDE mondiaux en 2025 et évolution de l’investissement international.
                  </a>
                  <a className={styles.sourceItem} href="https://www.insee.fr/fr/statistiques/2381430" target="_blank" rel="noreferrer">
                    <strong>Insee / Douanes — Balance commerciale en biens</strong>
                    Exportations, importations et solde français en 2025.
                  </a>
                  <a className={styles.sourceItem} href="https://www.insee.fr/fr/statistiques/2830252" target="_blank" rel="noreferrer">
                    <strong>Insee — Solde des échanges extérieurs</strong>
                    Biens, services et solde total en 2025.
                  </a>
                </div>
                <div className={styles.callout + " " + styles.good}>
                  <strong>Dernière révision du contenu :</strong> septembre 2026.
                </div>
              </>
            )}
          </article>
        </div>

        <div className={styles.footer}>
          CAPSES · Terminale SES · Commerce international et mondialisation · version pédagogique 2026-2027
        </div>
      </div>
    </main>
  );
}
