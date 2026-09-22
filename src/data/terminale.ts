export type TerminaleDomain = "eco" | "socio" | "rc";

export type TerminaleChapter = {
  order: number;
  slug: string;
  shortTitle: string;
  question: string;
  domain: TerminaleDomain;
  domainLabel: string;
  icon: string;
  notions: string[];
  quickTime: string;
};

export const TERMINALE_CHAPTERS: TerminaleChapter[] = [
  {
    order: 1,
    slug: "croissance-economique",
    shortTitle: "Croissance économique",
    question: "Quelles sont les sources et les défis de la croissance économique ?",
    domain: "eco",
    domainLabel: "Économie",
    icon: "↗",
    notions: ["PIB", "PGF", "Innovation"],
    quickTime: "20 min",
  },
  {
    order: 2,
    slug: "structure-sociale",
    shortTitle: "Structure sociale",
    question: "Comment est structurée la société française actuelle ?",
    domain: "socio",
    domainLabel: "Sociologie",
    icon: "◉",
    notions: ["PCS", "Classes sociales", "Inégalités"],
    quickTime: "20 min",
  },
  {
    order: 3,
    slug: "commerce-international",
    shortTitle: "Commerce international",
    question: "Quels sont les fondements du commerce international et de l’internationalisation de la production ?",
    domain: "eco",
    domainLabel: "Économie",
    icon: "◎",
    notions: ["Avantages comparatifs", "Libre-échange", "Firmes"],
    quickTime: "25 min",
  },
  {
    order: 4,
    slug: "politiques-europeennes",
    shortTitle: "Politiques européennes",
    question: "Quelles politiques économiques dans le cadre européen ?",
    domain: "rc",
    domainLabel: "Regards croisés",
    icon: "★",
    notions: ["BCE", "Politique budgétaire", "Euro"],
    quickTime: "25 min",
  },
  {
    order: 5,
    slug: "environnement",
    shortTitle: "Action publique et environnement",
    question: "Quelle action publique pour l’environnement ?",
    domain: "eco",
    domainLabel: "Économie",
    icon: "◆",
    notions: ["Externalités", "Biens communs", "Instruments"],
    quickTime: "25 min",
  },
  {
    order: 6,
    slug: "engagement-politique",
    shortTitle: "Engagement politique",
    question: "Comment expliquer l’engagement politique dans les sociétés démocratiques ?",
    domain: "socio",
    domainLabel: "Sociologie",
    icon: "✦",
    notions: ["Vote", "Action collective", "Participation"],
    quickTime: "20 min",
  },
  {
    order: 7,
    slug: "mobilite-sociale",
    shortTitle: "Mobilité sociale",
    question: "Quelles sont les caractéristiques contemporaines et les facteurs de la mobilité sociale ?",
    domain: "socio",
    domainLabel: "Sociologie",
    icon: "⇅",
    notions: ["Tables de mobilité", "Fluidité", "Déclassement"],
    quickTime: "20 min",
  },
  {
    order: 8,
    slug: "chomage",
    shortTitle: "Chômage",
    question: "Comment lutter contre le chômage ?",
    domain: "eco",
    domainLabel: "Économie",
    icon: "◇",
    notions: ["Chômage", "Salaire", "Politiques de l’emploi"],
    quickTime: "20 min",
  },
  {
    order: 9,
    slug: "mutations-travail-emploi",
    shortTitle: "Travail et emploi",
    question: "Quelles mutations du travail et de l’emploi ?",
    domain: "socio",
    domainLabel: "Sociologie",
    icon: "▣",
    notions: ["Emploi", "Organisation", "Numérique"],
    quickTime: "20 min",
  },
];

export const DOMAIN_LABELS: Record<"all" | TerminaleDomain, string> = {
  all: "Tous",
  eco: "Économie",
  socio: "Sociologie",
  rc: "Regards croisés",
};
