"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./home-sections.module.css";

export function LearningIcon({ kind = "book" }: { kind?: "book" | "chart" | "globe" | "arrow" }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === "book" && <><path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Z" /><path d="M12 5v15" /></>}
      {kind === "chart" && <><path d="M4 4v16h16M8 15v-4m5 4V7m5 8V4" /></>}
      {kind === "globe" && <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>}
      {kind === "arrow" && <path d="M4 12h16m-6-6 6 6-6 6" />}
    </svg>
  );
}

export function SESVisual() {
  return (
    <div className={styles.sesVisual}>
      <p className={styles.visualKicker}>UN CAP POUR COMPRENDRE LE MONDE</p>
      <h2>Comprendre aujourd’hui,<br /><span>réussir demain.</span></h2>
      <div className={styles.visualChart}>
        <div className={styles.chartCaption}><LearningIcon kind="chart" /><span>Lire une courbe. Expliquer un mécanisme.</span></div>
        <svg viewBox="0 0 380 200" fill="none" role="img" aria-label="Illustration des outils des SES : courbe, histogramme et repères. Sans données statistiques.">
          <path d="M30 25v145h325" stroke="#adbed5" strokeWidth="1.5" />
          <path d="M30 65h325M30 105h325M30 145h325" stroke="#e2eaf5" strokeDasharray="4 5" />
          <path d="M52 170V135h30v35m34 0V110h30v60m34 0V90h30v80m34 0V70h30v100m34 0V42h30v128" fill="#d9e7fa" />
          <path d="M53 140C90 134 103 145 125 116S168 138 191 93 233 112 256 66 295 83 325 30" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
          <circle cx="191" cy="93" r="5" fill="#fff" stroke="#2563eb" strokeWidth="3" /><circle cx="325" cy="30" r="5" fill="#fff" stroke="#2563eb" strokeWidth="3" />
        </svg>
        <span className={styles.illustrative}>Graphique illustratif</span>
      </div>
      <div className={styles.visualBottom}>
        <div className={styles.moneyTile} aria-hidden="true"><svg viewBox="0 0 90 56" fill="none"><rect x="4" y="5" width="82" height="46" rx="7" fill="#eef7f1" stroke="#82b49b" strokeWidth="1.5" /><path d="M14 13h62v30H14z" stroke="#b3d3bf" /><circle cx="45" cy="28" r="14" fill="#fff" /><text x="45" y="35" textAnchor="middle" fill="#36765a" fontSize="23" fontWeight="700">€</text></svg><span>Production & échanges</span></div>
        <div className={styles.notionsTile}><strong>PIB · PCS · VA</strong><span>Des notions pour lire le quotidien</span></div>
      </div>
      <p className={styles.visualPromise}>Des SES plus claires, plus simples, plus concrètes.</p>
      <p className={styles.visualQuote}>« Tout commence par une bonne méthode. »</p>
    </div>
  );
}

const LEVELS = [
  { name: "Seconde", line: "Découvrir les SES", description: "Comprendre la production, les prix et la vie en société. Partir d’exemples concrets pour construire les premières notions.", status: "2 chapitres accessibles", href: "/seconde", accent: "#0f766e", kind: "globe" as const },
  { name: "Première", line: "Construire des bases solides", description: "Approfondir l’économie, la sociologie et la science politique. Apprendre à expliquer un mécanisme et à lire un document.", status: "Contenus en préparation", href: "/premiere", accent: "#875717", kind: "book" as const },
  { name: "Terminale", line: "Se préparer au bac", description: "Réviser les neuf chapitres proposés, maîtriser les mécanismes et s’entraîner avec des quiz, des sujets et des fiches mémo.", status: "9 entrées de chapitres", href: "/terminale", accent: "#1d4ed8", kind: "chart" as const },
  { name: "BTS CEJM", line: "Relier le cours à l’entreprise", description: "Mobiliser l’économie, le droit et le management pour comprendre les décisions des entreprises et analyser leurs situations.", status: "Espace en construction", href: "/bts-cejm", accent: "#62408b", kind: "book" as const },
];

export function LevelEntries() {
  return (
    <section id="niveaux" className={styles.section} aria-labelledby="levels-title">
      <div className={styles.heading}>
        <div><p className={styles.eyebrow}>À CHAQUE NIVEAU, SON PARCOURS</p><h2 id="levels-title">Choisis ton espace de révision</h2></div>
        <p>Des repères clairs pour apprendre à ton rythme.</p>
      </div>
      <div className={styles.levels}>
        {LEVELS.map((level) => (
          <Link className={styles.level} href={level.href} key={level.name} style={{ "--level-accent": level.accent } as React.CSSProperties}>
            <div className={styles.levelIcon}><LearningIcon kind={level.kind} /></div>
            <h3>{level.name}</h3><strong className={styles.levelLine}>{level.line}</strong>
            <p>{level.description}</p><span className={styles.levelStatus}>{level.status}</span>
            <span className={styles.levelAction}>Ouvrir cet espace <LearningIcon kind="arrow" /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Une banque éditoriale datée : le chiffre sélectionné change chaque semaine.
// Les données ne sont pas présentées comme des mesures en temps réel.
export const ECONOMY_FACTS = [
  {
    id: "boissons", category: "DANS LA VIE QUOTIDIENNE", number: "≈ 25 463", unit: "boissons servies par seconde, en moyenne",
    title: "Une boisson, toute une économie",
    description: "Le groupe Coca-Cola indique servir 2,2 milliards de boissons par jour dans le monde, toutes ses marques confondues. Cela représente environ 25 463 boissons par seconde en moyenne.",
    calculation: "Calcul : 2 200 000 000 ÷ 86 400 secondes. Ce n’est ni un compteur en direct, ni le nombre de seules bouteilles de Coca-Cola.",
    question: "Pourquoi un groupe mondial s’appuie-t-il sur des embouteilleurs locaux ?",
    answer: "Produire et distribuer au plus près des consommateurs permet de mobiliser des partenaires, des infrastructures et des connaissances locales. Cela illustre l’organisation de la production et la chaîne de valeur.",
    notions: ["Production", "Chaîne de valeur", "Mondialisation"], period: "Chiffre publié sur la page du groupe, consultée le 1er octobre 2026", source: "The Coca-Cola Company", url: "https://investors.coca-colacompany.com/about", lesson: "/terminale/commerce-international", lessonLabel: "Comprendre la chaîne de valeur",
  },
  {
    id: "restauration", category: "DU RESTAURANT AU COURS", number: "≈ 810", unit: "clients servis par seconde, en moyenne",
    title: "Derrière le burger, une organisation mondiale",
    description: "McDonald’s annonce environ 70 millions de clients servis chaque jour. Rapporté à une journée, cela correspond à environ 810 clients par seconde, à l’échelle mondiale.",
    calculation: "Calcul : 70 000 000 ÷ 86 400. Il s’agit de clients servis, pas d’un nombre de hamburgers vendus. La source ne permet pas de confondre les deux.",
    question: "Pourquoi un même produit mobilise-t-il autant d’entreprises différentes ?",
    answer: "Agriculteurs, fournisseurs, transporteurs et restaurants réalisent des tâches différentes. Cette division du travail et cette coordination permettent de produire un service de restauration à grande échelle.",
    notions: ["Division du travail", "Production", "Organisation"], period: "Présentation investisseurs, juin 2025 · vérifiée le 1er octobre 2026", source: "McDonald’s Corporation", url: "https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/pdf/Investor%20Overview%20Deck%20v2025.6.2.pdf", lesson: "/seconde/creation-richesses", lessonLabel: "Comprendre la production de richesses",
  },
  {
    id: "internet", category: "NUMÉRIQUE ET SOCIÉTÉ", number: "74 %", unit: "de la population mondiale utilise Internet",
    title: "Connectés… mais pas tous de la même façon",
    description: "L’Union internationale des télécommunications estime que 6 milliards de personnes utilisent Internet en 2025. L’accès reste très inégal selon les pays et leur niveau de développement.",
    calculation: "Estimation mondiale pour 2025. Un taux d’accès ne renseigne pas, à lui seul, sur la qualité de la connexion, les équipements ou les compétences numériques.",
    question: "Avoir accès à Internet suffit-il à faire disparaître les inégalités numériques ?",
    answer: "Non. La qualité de la connexion, le coût, l’équipement et les usages comptent aussi. Les inégalités d’accès peuvent se cumuler avec des inégalités de revenus, de diplôme ou de territoire.",
    notions: ["Inégalités", "Numérique", "Développement"], period: "Données 2025 · vérifiées le 1er octobre 2026", source: "UIT — Facts and Figures 2025", url: "https://www.itu.int/itu-d/reports/statistics/2025/10/15/ff25-internet-use/", lesson: "/terminale/structure-sociale", lessonLabel: "Comprendre la structure sociale",
  },
  {
    id: "croissance", category: "UN REPÈRE POUR COMPRENDRE L’ACTUALITÉ", number: "0,0 %", unit: "de croissance du PIB français au 2e trimestre 2026",
    title: "Quand la croissance marque une pause",
    description: "Selon les résultats détaillés de l’Insee publiés le 28 août 2026, le PIB français en volume est stable au deuxième trimestre 2026 par rapport au trimestre précédent.",
    calculation: "Variation trimestrielle en volume : les effets de l’évolution des prix sont neutralisés. Une croissance nulle ne signifie pas une production nulle.",
    question: "Si le PIB ne progresse pas, cela veut-il dire que le pays ne produit plus ?",
    answer: "Non. Le niveau de production reste positif : c’est sa variation qui est nulle. Il faut distinguer le montant du PIB et son taux de croissance, ainsi que les évolutions en valeur et en volume.",
    notions: ["PIB", "Croissance", "Valeur et volume"], period: "2e trimestre 2026 · publication du 28 août 2026 · vérifiée le 1er octobre 2026", source: "Insee — Comptes nationaux trimestriels", url: "https://www.insee.fr/fr/statistiques/9039499", lesson: "/terminale/croissance-economique", lessonLabel: "Comprendre la croissance économique",
  },
];

function weekNumber(date: Date) {
  const localDay = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  // Le 5 janvier 1970 est un lundi : changement chaque lundi à minuit local.
  return Math.floor((localDay - Date.UTC(1970, 0, 5)) / (7 * 86_400_000));
}

export function EconomyDaily() {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [weekly, setWeekly] = useState(true);
  useEffect(() => {
    const refresh = () => { setIndex(weekNumber(new Date()) % ECONOMY_FACTS.length); setRevealed(false); setWeekly(true); };
    refresh();
    let lastWeek = weekNumber(new Date());
    const timer = setInterval(() => { const next = weekNumber(new Date()); if (next !== lastWeek) { lastWeek = next; refresh(); } }, 60_000);
    return () => clearInterval(timer);
  }, []);
  const fact = ECONOMY_FACTS[index];
  const nextFact = () => { setIndex((old) => (old + 1) % ECONOMY_FACTS.length); setRevealed(false); setWeekly(false); };
  return (
    <section id="economie-en-vrai" className={styles.section} aria-labelledby="economy-title">
      <div className={styles.heading}>
        <div><p className={styles.eyebrow}>OBSERVER, SE QUESTIONNER, COMPRENDRE</p><h2 id="economy-title">L’économie en vrai</h2></div>
        <p>Un chiffre différent chaque semaine, un lien avec le cours.</p>
      </div>
      <div className={styles.factGrid}>
        <article className={styles.factMain} aria-labelledby="fact-title">
          <div className={styles.factTop}><span>{fact.category}</span><span className={styles.dailyLabel}>{weekly ? "Le chiffre de la semaine" : `À découvrir · ${index + 1}/${ECONOMY_FACTS.length}`}</span></div>
          <div className={styles.bigNumber}>{fact.number}</div><p className={styles.factUnit}>{fact.unit}</p>
          <h3 id="fact-title">{fact.title}</h3><p className={styles.factDescription}>{fact.description}</p>
          <details className={styles.calculation}><summary>Comment lire ce chiffre ?</summary><p>{fact.calculation}</p></details>
          <div className={styles.factSource}><p>{fact.period}</p><a href={fact.url} target="_blank" rel="noreferrer">Source : {fact.source} ↗</a></div>
          <button className={styles.nextFact} onClick={nextFact}>Voir un autre chiffre <LearningIcon kind="arrow" /></button>
        </article>
        <aside className={styles.factLesson}>
          <span className={styles.lessonIcon}><LearningIcon kind="globe" /></span><p className={styles.eyebrow}>DU QUOTIDIEN AUX NOTIONS</p>
          <h3>Le chiffre qui fait réfléchir</h3><p className={styles.question}>{fact.question}</p>
          <div className={styles.tags}>{fact.notions.map((notion) => <span key={notion}>{notion}</span>)}</div>
          <button className={styles.explainButton} aria-expanded={revealed} aria-controls="fact-explanation" onClick={() => setRevealed(!revealed)}>{revealed ? "Masquer l’explication" : "Voir une piste d’explication"}</button>
          <div id="fact-explanation" hidden={!revealed}><p className={styles.answer}>{fact.answer}</p></div>
          <Link className={styles.lessonLink} href={fact.lesson}>{fact.lessonLabel} <LearningIcon kind="arrow" /></Link>
          <p className={styles.smallNote}>Ces exemples se lisent à tous les niveaux. Les liens conduisent aux cours déjà accessibles.</p>
        </aside>
      </div>
    </section>
  );
}

export function LearningPath() {
  return (
    <section className={styles.method} aria-labelledby="method-title">
      <div><p className={styles.eyebrow}>UNE MÉTHODE, À CHAQUE SÉANCE</p><h2 id="method-title">Comprendre. S’entraîner. Vérifier.</h2><p>Un cours ne se révise pas seulement en le relisant. Avance par étapes et repère ce qui demande encore du travail.</p><Link href="/methodes" className={styles.lessonLink}>Voir les méthodes <LearningIcon kind="arrow" /></Link></div>
      <ol className={styles.methodSteps}>
        <li><span>01</span><div><strong>Construire les repères</strong><p>Lire le cours, définir les notions et expliquer les mécanismes.</p></div></li>
        <li><span>02</span><div><strong>Mettre les savoirs à l’épreuve</strong><p>Répondre à un quiz, lire un document ou rédiger un paragraphe.</p></div></li>
        <li><span>03</span><div><strong>Revenir sur ses erreurs</strong><p>Comprendre la correction et suivre ses résultats dans Mon espace.</p></div></li>
      </ol>
    </section>
  );
}
