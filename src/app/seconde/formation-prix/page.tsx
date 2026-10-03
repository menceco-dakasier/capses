"use client";

import Link from "next/link";
import { useState } from "react";

const sections = [
  { id: "savoir", label: "À savoir", numero: "01" },
  { id: "notions", label: "Notions", numero: "02" },
  { id: "cours", label: "Cours", numero: "03" },
  { id: "video", label: "Vidéo courte", numero: "04" },
  { id: "mecanismes", label: "Mécanismes", numero: "05" },
  { id: "exercices", label: "Exercices", numero: "06" },
  { id: "erreurs", label: "Erreurs fréquentes", numero: "07" },
  { id: "quiz", label: "Quiz", numero: "08" },
  { id: "methode", label: "Méthode AEI", numero: "09" },
  { id: "memo", label: "Fiche mémo", numero: "10" },
];

const objectifs = [
  {
    officiel: "Savoir illustrer la notion de marché par des exemples.",
    clair:
      "Un marché n’est pas forcément un lieu physique. C’est une situation où des offreurs et des demandeurs se rencontrent pour échanger un bien ou un service.",
    exemple:
      "Le marché des fruits à Cayenne est un lieu physique. Le marché des billets d’avion Cayenne-Paris peut exister en ligne.",
  },
  {
    officiel:
      "Comprendre que la demande diminue quand le prix augmente, toutes choses égales par ailleurs.",
    clair:
      "Quand le prix d’un produit augmente, les consommateurs ont souvent tendance à en acheter moins.",
    exemple:
      "Si le prix d’une glace augmente fortement, certains consommateurs peuvent décider d’en acheter moins.",
  },
  {
    officiel:
      "Comprendre que l’offre augmente quand le prix augmente, toutes choses égales par ailleurs.",
    clair:
      "Quand le prix augmente, les producteurs peuvent être incités à produire ou vendre davantage.",
    exemple:
      "Si le prix d’un produit devient plus rentable, des producteurs peuvent être encouragés à en offrir plus.",
  },
  {
    officiel:
      "Savoir représenter graphiquement l’offre et la demande et identifier un prix et une quantité d’équilibre.",
    clair:
      "Le prix d’équilibre est le prix pour lequel la quantité offerte est égale à la quantité demandée.",
    exemple:
      "Si à 3 € les vendeurs veulent vendre 100 produits et les acheteurs veulent en acheter 100, alors 3 € peut être un prix d’équilibre.",
  },
  {
    officiel:
      "Comprendre comment un choc d’offre ou de demande peut modifier le prix et la quantité d’équilibre.",
    clair:
      "Si les conditions changent, l’équilibre du marché peut changer aussi.",
    exemple:
      "Si un produit devient très à la mode, la demande augmente. Le prix d’équilibre peut alors augmenter.",
  },
  {
    officiel:
      "Comprendre les effets d’une taxe ou d’une subvention sur un marché.",
    clair:
      "Une taxe peut rendre un produit plus cher et réduire la quantité échangée. Une subvention peut produire l’effet inverse.",
    exemple:
      "Une taxe sur un produit polluant peut augmenter son prix. Une subvention peut réduire le prix payé par les consommateurs ou soutenir les producteurs.",
  },
];

const notions = [
  ["Marché", "Lieu réel ou fictif où se rencontrent une offre et une demande, et où un prix peut se former."],
  ["Offre", "Quantité d’un bien ou d’un service que les producteurs souhaitent vendre à un certain prix."],
  ["Demande", "Quantité d’un bien ou d’un service que les consommateurs souhaitent acheter à un certain prix."],
  ["Prix", "Valeur monétaire à laquelle un bien ou un service peut être échangé."],
  ["Prix d’équilibre", "Prix pour lequel la quantité offerte est égale à la quantité demandée."],
  ["Quantité d’équilibre", "Quantité échangée lorsque l’offre et la demande sont égales."],
  ["Pénurie", "Situation où la demande est supérieure à l’offre."],
  ["Excédent", "Situation où l’offre est supérieure à la demande."],
  ["Choc de demande", "Événement qui modifie la demande pour un bien ou un service."],
  ["Choc d’offre", "Événement qui modifie l’offre pour un bien ou un service."],
  ["Taxe", "Prélèvement qui peut augmenter le coût d’un produit et modifier l’équilibre du marché."],
  ["Subvention", "Aide financière qui peut réduire le coût ou encourager la production."],
  ["Institution", "Règle ou organisation qui rend les échanges possibles : droit de propriété, monnaie, contrats, autorités."],
];

const exemples = [
  {
    situation: "Le marché central de Cayenne",
    classement: "Marché physique",
    justification:
      "Des vendeurs et des acheteurs se rencontrent dans un lieu concret pour échanger des produits.",
  },
  {
    situation: "Un billet d’avion acheté en ligne",
    classement: "Marché non physique",
    justification:
      "L’échange se fait sans lieu unique de rencontre : l’offre et la demande se rencontrent via une plateforme.",
  },
  {
    situation: "Une baguette dont le prix augmente",
    classement: "Effet sur la demande",
    justification:
      "Si le prix augmente, certains consommateurs peuvent réduire leur quantité demandée.",
  },
  {
    situation: "Des producteurs attirés par un prix plus élevé",
    classement: "Effet sur l’offre",
    justification:
      "Un prix plus élevé peut inciter les producteurs à offrir davantage, car la vente devient plus intéressante.",
  },
  {
    situation: "Un produit devient très populaire",
    classement: "Choc de demande",
    justification:
      "La demande augmente car davantage de consommateurs veulent acheter le produit.",
  },
  {
    situation: "Une mauvaise récolte réduit les quantités disponibles",
    classement: "Choc d’offre",
    justification:
      "L’offre diminue car les producteurs disposent de moins de produits à vendre.",
  },
  {
    situation: "Une taxe est ajoutée sur un produit",
    classement: "Intervention publique",
    justification:
      "La taxe peut augmenter le prix payé et réduire la quantité échangée.",
  },
  {
    situation: "Une subvention aide les producteurs",
    classement: "Intervention publique",
    justification:
      "La subvention peut soutenir l’offre ou réduire le prix payé par les consommateurs.",
  },
];

const erreurs = [
  ["Un marché est toujours un lieu physique.", "Faux. Un marché peut être réel ou fictif, physique ou numérique."],
  ["La demande augmente toujours quand le prix augmente.", "Faux. En général, la demande diminue quand le prix augmente, toutes choses égales par ailleurs."],
  ["L’offre diminue toujours quand le prix augmente.", "Faux. En général, l’offre augmente quand le prix augmente, toutes choses égales par ailleurs."],
  ["Le prix d’équilibre est choisi au hasard.", "Faux. Il correspond au prix pour lequel la quantité offerte égale la quantité demandée."],
  ["Une pénurie signifie qu’il y a trop de produits.", "Faux. Une pénurie signifie que la demande est supérieure à l’offre."],
  ["Un excédent signifie qu’il manque des produits.", "Faux. Un excédent signifie que l’offre est supérieure à la demande."],
  ["Une taxe n’a aucun effet sur un marché.", "Faux. Une taxe peut modifier le prix et la quantité échangée."],
  ["Une subvention est la même chose qu’une taxe.", "Faux. Une subvention est une aide ; une taxe est un prélèvement."],
];

const quiz = [
  ["Un marché est-il toujours un lieu physique ?", "Non. Il peut aussi être fictif ou numérique."],
  ["Qui rencontre-t-on sur un marché ?", "Des offreurs et des demandeurs."],
  ["Que fait généralement la demande quand le prix augmente ?", "Elle diminue, toutes choses égales par ailleurs."],
  ["Que fait généralement l’offre quand le prix augmente ?", "Elle augmente, toutes choses égales par ailleurs."],
  ["Qu’est-ce qu’un prix d’équilibre ?", "Le prix pour lequel la quantité offerte est égale à la quantité demandée."],
  ["Qu’est-ce qu’une pénurie ?", "Une situation où la demande est supérieure à l’offre."],
  ["Qu’est-ce qu’un excédent ?", "Une situation où l’offre est supérieure à la demande."],
  ["Quel peut être l’effet d’une taxe ?", "Elle peut augmenter le prix et réduire la quantité échangée."],
  ["Quel peut être l’effet d’une subvention ?", "Elle peut soutenir l’offre ou réduire le prix payé."],
];

export default function FormationPrixPage() {
  const [activeSection, setActiveSection] = useState("savoir");

  const activeIndex = sections.findIndex((section) => section.id === activeSection);
  const progress = Math.max(0, Math.round(((activeIndex + 1) / sections.length) * 100));

  return (
    <main className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; }

        body {
          margin: 0;
          font-family: Inter, system-ui, sans-serif;
          background: #f4f7fb;
          color: #10234d;
        }

        a { text-decoration: none; }
        button { font-family: inherit; }

        .page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(124, 58, 237, 0.13), transparent 34%),
            linear-gradient(180deg, #f8fbff 0%, #eef4fb 100%);
          padding-bottom: 70px;
        }

        .header {
          height: 86px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid #dbe7f5;
          display: flex;
          align-items: center;
          justify-content: center;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .nav {
          width: min(1400px, calc(100% - 48px));
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #10234d;
        }

        .logo {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: linear-gradient(135deg, #1d4ed8, #3767d6);
          color: white;
          display: grid;
          place-items: center;
          font-weight: 900;
          box-shadow: 0 14px 28px rgba(29, 78, 216, 0.25);
        }

        .brand-title {
          font-size: 24px;
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .brand-subtitle {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          letter-spacing: -0.02em;
          margin-top: 2px;
        }

        .links {
          display: flex;
          align-items: center;
          gap: 8px;
          height: 100%;
        }

        .nav-link {
          color: #50617f;
          font-size: 15px;
          font-weight: 800;
          padding: 33px 18px 29px;
          border-bottom: 3px solid transparent;
          transition: 0.2s ease;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #2563eb;
          background: #eef4ff;
          border-bottom-color: #2563eb;
        }

        .container {
          width: min(1200px, calc(100% - 48px));
          margin: 0 auto;
        }

        .breadcrumb {
          margin: 28px 0 16px;
          display: flex;
          gap: 8px;
          align-items: center;
          color: #64748b;
          font-size: 14px;
          font-weight: 800;
        }

        .breadcrumb a { color: #2563eb; }

        .hero {
          background: white;
          border: 1px solid #dbe7f5;
          border-radius: 32px;
          box-shadow: 0 24px 80px rgba(15, 35, 77, 0.10);
          padding: 48px;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 36px;
          align-items: center;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          border: 1px solid #ddd6fe;
          background: #f3efff;
          color: #7c3aed;
          font-weight: 900;
          font-size: 13px;
          letter-spacing: 0.03em;
          padding: 12px 16px;
          border-radius: 999px;
          margin-bottom: 24px;
        }

        h1 {
          margin: 0;
          font-size: clamp(42px, 6vw, 70px);
          letter-spacing: -0.07em;
          line-height: 0.95;
          color: #07194f;
          font-weight: 900;
        }

        h1 span {
          display: block;
          color: #7c3aed;
        }

        .hero-text {
          margin: 24px 0 0;
          color: #60708e;
          font-size: 18px;
          line-height: 1.75;
          max-width: 730px;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 32px;
        }

        .btn-primary,
        .btn-secondary {
          border-radius: 15px;
          padding: 16px 22px;
          font-weight: 900;
          font-size: 16px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: 0.2s ease;
        }

        .btn-primary {
          background: #7c3aed;
          color: white;
          border: none;
          cursor: pointer;
          box-shadow: 0 18px 34px rgba(124, 58, 237, 0.22);
        }

        .btn-secondary {
          background: white;
          color: #173b73;
          border: 1px solid #d6e2f0;
        }

        .btn-primary:hover,
        .btn-secondary:hover {
          transform: translateY(-2px);
        }

        .chapter-card {
          background:
            radial-gradient(circle at 30% 20%, rgba(124,58,237,0.18), transparent 30%),
            linear-gradient(135deg, #f3efff, #f8fbff);
          border: 1px solid #dbe7f5;
          border-radius: 28px;
          padding: 28px;
          min-height: 330px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .chapter-icon {
          width: 74px;
          height: 74px;
          border-radius: 24px;
          background: white;
          display: grid;
          place-items: center;
          font-size: 36px;
          box-shadow: 0 18px 40px rgba(15, 35, 77, 0.10);
        }

        .progress-block {
          margin-top: 34px;
          background: rgba(255,255,255,0.86);
          border: 1px solid #dbe7f5;
          border-radius: 20px;
          padding: 18px;
          box-shadow: 0 14px 30px rgba(15, 35, 77, 0.08);
        }

        .progress-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }

        .progress-top span {
          color: #42526d;
          font-size: 14px;
          font-weight: 900;
        }

        .progress-top strong {
          color: #7c3aed;
          font-size: 22px;
          font-weight: 900;
        }

        .progress-bar {
          width: 100%;
          height: 12px;
          border-radius: 999px;
          background: #ddd6fe;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #7c3aed, #a78bfa);
          transition: width 0.25s ease;
        }

        .chapter-card p {
          margin: 18px 0 0;
          color: #42526d;
          font-weight: 800;
          font-size: 17px;
          line-height: 1.45;
        }

        .mini-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 28px;
        }

        .mini-card {
          background: rgba(255,255,255,0.86);
          border: 1px solid #dbe7f5;
          border-radius: 18px;
          padding: 15px;
          color: #173b73;
          font-weight: 900;
          font-size: 14px;
        }

        .layout {
          margin-top: 34px;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 24px;
          align-items: start;
        }

        .sidebar {
          background: white;
          border: 1px solid #dbe7f5;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 18px 45px rgba(15, 35, 77, 0.06);
          position: sticky;
          top: 110px;
        }

        .sidebar h2 {
          margin: 0 0 14px;
          color: #07194f;
          font-size: 20px;
          letter-spacing: -0.04em;
        }

        .side-button {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          text-align: left;
          color: #50617f;
          background: transparent;
          border: none;
          cursor: pointer;
          font-weight: 850;
          padding: 12px;
          border-radius: 14px;
          transition: 0.2s ease;
          margin-bottom: 5px;
        }

        .side-button:hover {
          background: #f3efff;
          color: #7c3aed;
        }

        .side-button.active {
          background: #f3efff;
          color: #7c3aed;
          border: 1px solid #ddd6fe;
        }

        .side-num {
          font-size: 12px;
          font-weight: 900;
          opacity: 0.75;
        }

        .content {
          min-height: 620px;
        }

        .section-card {
          background: white;
          border: 1px solid #dbe7f5;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 18px 45px rgba(15, 35, 77, 0.06);
        }

        .section-card h2 {
          margin: 0 0 16px;
          color: #07194f;
          font-size: 34px;
          letter-spacing: -0.06em;
        }

        .section-card h3 {
          margin: 24px 0 8px;
          color: #173b73;
          font-size: 20px;
          letter-spacing: -0.04em;
        }

        .section-card p,
        .section-card li {
          color: #50617f;
          font-size: 16px;
          line-height: 1.75;
        }

        .clear-box {
          margin: 20px 0;
          background: #f3efff;
          border: 1px solid #ddd6fe;
          border-radius: 22px;
          padding: 22px;
        }

        .clear-label {
          display: inline-flex;
          margin-bottom: 10px;
          background: white;
          color: #7c3aed;
          border: 1px solid #ddd6fe;
          border-radius: 999px;
          padding: 7px 11px;
          font-size: 13px;
          font-weight: 900;
        }

        .clear-box p {
          margin: 0;
          color: #24496f;
          font-weight: 700;
          line-height: 1.7;
        }

        .objectives-grid,
        .notions-grid,
        .examples-grid,
        .errors-grid,
        .quiz-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-top: 22px;
        }

        .objective-card,
        .notion-card,
        .example-card,
        .error-card,
        .quiz-card,
        .course-box {
          border: 1px solid #dbe7f5;
          border-radius: 20px;
          padding: 20px;
          background: #f8fbff;
        }

        .objective-card {
          display: grid;
          gap: 12px;
        }

        .objective-card strong,
        .notion-card strong,
        .example-card strong,
        .error-card strong,
        .quiz-card strong {
          display: block;
          color: #07194f;
          margin-bottom: 8px;
          font-size: 15px;
        }

        .objective-card span,
        .notion-card span,
        .example-card span,
        .error-card span,
        .quiz-card span {
          color: #64748b;
          font-size: 14px;
          line-height: 1.6;
        }

        .objective-label,
        .plain-label,
        .example-label {
          width: fit-content;
          border-radius: 999px;
          padding: 7px 11px;
          font-size: 12px;
          font-weight: 900;
        }

        .objective-label {
          background: #eef4ff;
          color: #2563eb;
          border: 1px solid #c7dcff;
        }

        .plain-label {
          background: #f3efff;
          color: #7c3aed;
          border: 1px solid #ddd6fe;
        }

        .example-label {
          background: #fff7ed;
          color: #9a3412;
          border: 1px solid #fed7aa;
        }

        .example-card em {
          display: inline-flex;
          color: #7c3aed;
          background: #f3efff;
          border: 1px solid #ddd6fe;
          border-radius: 999px;
          padding: 6px 10px;
          font-style: normal;
          font-weight: 900;
          font-size: 12px;
          margin-bottom: 10px;
        }

        .graph-box {
          background: #0f172a;
          color: #e2e8f0;
          border-radius: 18px;
          padding: 22px;
          line-height: 1.8;
          font-weight: 800;
          margin-top: 16px;
        }

        .video-box {
          margin-top: 20px;
          background:
            linear-gradient(135deg, rgba(124,58,237,0.12), rgba(37,99,235,0.10)),
            #f8fbff;
          border: 1px solid #dbe7f5;
          border-radius: 22px;
          padding: 24px;
        }

        .method-box {
          background: #fff7ed;
          border: 1px solid #fed7aa;
          border-radius: 20px;
          padding: 22px;
          margin-top: 16px;
        }

        .memo {
          background: #f3efff;
          border: 1px solid #ddd6fe;
          border-radius: 22px;
          padding: 24px;
          margin-top: 20px;
        }

        .bottom-actions {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          margin-top: 22px;
        }

        .small-action {
          border: 1px solid #dbe7f5;
          background: white;
          color: #173b73;
          border-radius: 14px;
          padding: 13px 16px;
          font-weight: 900;
          cursor: pointer;
        }

        .small-action.primary {
          background: #7c3aed;
          color: white;
          border-color: #7c3aed;
        }

        @media (max-width: 1050px) {
          .links { display: none; }

          .hero,
          .layout {
            grid-template-columns: 1fr;
          }

          .sidebar {
            position: static;
          }

          .objectives-grid,
          .notions-grid,
          .examples-grid,
          .errors-grid,
          .quiz-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 700px) {
          .container,
          .nav {
            width: calc(100% - 24px);
          }

          .hero,
          .section-card {
            padding: 26px;
          }
        }
      `}</style>

      <header className="header">
        <nav className="nav">
          <Link href="/" className="brand">
            <span className="logo">C</span>
            <span>
              <span className="brand-title">CAPSES</span>
              <span className="brand-subtitle">Comprendre les SES</span>
            </span>
          </Link>

          <div className="links">
            <Link href="/" className="nav-link">Accueil</Link>
            <Link href="/bts-cejm" className="nav-link">BTS CEJM</Link>
            <Link href="/terminale" className="nav-link">Terminale</Link>
            <Link href="/premiere" className="nav-link">Première</Link>
            <Link href="/seconde" className="nav-link active">Seconde</Link>
            <Link href="/methodologie" className="nav-link">Méthodes</Link>
            <Link href="/espace-eleves" className="nav-link">Mon espace</Link>
          </div>
        </nav>
      </header>

      <div className="container">
        <div className="breadcrumb">
          <Link href="/seconde">Seconde</Link>
          <span>›</span>
          <span>Chapitre 3</span>
        </div>

        <section className="hero">
          <div>
            <div className="badge">SECONDE SES · CHAPITRE 3</div>

            <h1>
              Comment se forment
              <span>les prix ?</span>
            </h1>

            <p className="hero-text">
              Ce chapitre explique ce qu’est un marché, comment l’offre et la demande
              réagissent au prix, comment se forme un prix d’équilibre et comment une taxe
              ou une subvention peut modifier l’équilibre.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => setActiveSection("savoir")}
              >
                Commencer <span>→</span>
              </button>

              <Link href="/seconde" className="btn-secondary">
                ← Retour à Seconde
              </Link>
            </div>
          </div>

          <div className="chapter-card">
            <div>
              <div className="chapter-icon">📈</div>

              <div className="progress-block">
                <div className="progress-top">
                  <span>Progression du chapitre</span>
                  <strong>{progress}%</strong>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <p>
                Une page interactive : clique à gauche pour afficher une seule partie à la fois.
              </p>
            </div>

            <div className="mini-grid">
              <div className="mini-card">Marché</div>
              <div className="mini-card">Offre</div>
              <div className="mini-card">Demande</div>
              <div className="mini-card">Équilibre</div>
            </div>
          </div>
        </section>

        <section className="layout">
          <aside className="sidebar">
            <h2>Plan CapSES</h2>

            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                className={activeSection === section.id ? "side-button active" : "side-button"}
                onClick={() => setActiveSection(section.id)}
              >
                <span>{section.label}</span>
                <span className="side-num">{section.numero}</span>
              </button>
            ))}
          </aside>

          <div className="content">
            {activeSection === "savoir" && (
              <section className="section-card">
                <h2>1. À savoir pour le chapitre</h2>

                <p>
                  La question centrale est : <strong>comment se forment les prix sur un marché ?</strong>
                  Le chapitre montre que les prix ne tombent pas du ciel : ils dépendent de la rencontre
                  entre l’offre et la demande, dans un cadre organisé par des règles.
                </p>

                <div className="clear-box">
                  <span className="clear-label">En clair</span>
                  <p>
                    Tu dois comprendre qu’un marché peut être un lieu physique ou non, que les prix
                    se forment grâce à la rencontre entre vendeurs et acheteurs, et que les prix peuvent
                    changer lorsque l’offre, la demande, une taxe ou une subvention changent.
                  </p>
                </div>

                <div className="objectives-grid">
                  {objectifs.map((item, index) => (
                    <article key={item.officiel} className="objective-card">
                      <div>
                        <strong className="objective-label">Objectif officiel {index + 1}</strong>
                        <span>{item.officiel}</span>
                      </div>

                      <div>
                        <strong className="plain-label">En clair</strong>
                        <span>{item.clair}</span>
                      </div>

                      <div>
                        <strong className="example-label">Exemple concret</strong>
                        <span>{item.exemple}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {activeSection === "notions" && (
              <section className="section-card">
                <h2>2. Les notions indispensables</h2>

                <div className="notions-grid">
                  {notions.map(([titre, texte]) => (
                    <div key={titre} className="notion-card">
                      <strong>{titre}</strong>
                      <span>{texte}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeSection === "cours" && (
              <section className="section-card">
                <h2>3. Le cours</h2>

                <div className="course-box">
                  <h3>A. Qu’est-ce qu’un marché ?</h3>
                  <p>
                    Un marché est un lieu réel ou fictif où se rencontrent une offre et une demande.
                    Il peut s’agir d’un marché physique, comme un marché de fruits et légumes, ou d’un marché
                    en ligne, comme celui des billets d’avion ou des plateformes de vente.
                  </p>
                </div>

                <div className="course-box">
                  <h3>B. Le marché a besoin de règles</h3>
                  <p>
                    Pour qu’un marché fonctionne, il faut des institutions : des règles de propriété,
                    de la monnaie, des contrats, des autorités qui contrôlent les échanges, et des habitudes
                    sociales. Un marché n’est donc pas seulement une rencontre spontanée : il est organisé.
                  </p>
                </div>

                <div className="course-box">
                  <h3>C. La demande réagit au prix</h3>
                  <p>
                    En général, lorsque le prix d’un bien augmente, la quantité demandée diminue.
                    Cela signifie que les consommateurs souhaitent ou peuvent acheter moins du produit.
                    On raisonne ici toutes choses égales par ailleurs.
                  </p>
                </div>

                <div className="course-box">
                  <h3>D. L’offre réagit au prix</h3>
                  <p>
                    En général, lorsque le prix d’un bien augmente, la quantité offerte augmente.
                    Un prix plus élevé peut rendre la vente plus intéressante pour les producteurs.
                    Ils peuvent donc être incités à produire ou vendre davantage.
                  </p>
                </div>

                <div className="course-box">
                  <h3>E. Prix et quantité d’équilibre</h3>
                  <p>
                    Le prix d’équilibre est le prix pour lequel la quantité offerte est égale à la quantité demandée.
                    Si le prix est trop bas, la demande peut être supérieure à l’offre : il y a pénurie.
                    Si le prix est trop élevé, l’offre peut être supérieure à la demande : il y a excédent.
                  </p>
                </div>

                <div className="course-box">
                  <h3>F. Chocs, taxes et subventions</h3>
                  <p>
                    Un choc d’offre ou de demande peut modifier l’équilibre du marché.
                    Une taxe peut augmenter le coût d’un produit et réduire la quantité échangée.
                    Une subvention peut soutenir les producteurs ou réduire le prix payé, ce qui peut modifier
                    le prix et la quantité d’équilibre.
                  </p>
                </div>
              </section>
            )}

            {activeSection === "video" && (
              <section className="section-card">
                <h2>4. Vidéo courte / Récapitulatif</h2>

                <div className="video-box">
                  <strong>🎬 Vidéo courte à intégrer</strong>
                  <p>
                    Objectif : expliquer en 2 à 3 minutes comment un prix peut se former sur un marché.
                  </p>
                  <p>
                    Fil conducteur possible : partir d’un produit simple, comme une bouteille d’eau,
                    une place de concert ou un billet d’avion. Qui vend ? Qui achète ? Que se passe-t-il
                    si le prix augmente ? Que se passe-t-il si le produit devient rare ou très demandé ?
                  </p>
                </div>
              </section>
            )}

            {activeSection === "mecanismes" && (
              <section className="section-card">
                <h2>5. Les mécanismes à maîtriser</h2>

                <h3>Demande et prix</h3>
                <div className="graph-box">
                  Prix augmente
                  <br />→ le produit devient plus coûteux pour les consommateurs
                  <br />→ certains achètent moins
                  <br />→ la quantité demandée diminue
                </div>

                <h3>Offre et prix</h3>
                <div className="graph-box">
                  Prix augmente
                  <br />→ la vente devient plus intéressante pour les producteurs
                  <br />→ les producteurs peuvent proposer davantage
                  <br />→ la quantité offerte augmente
                </div>

                <h3>Équilibre du marché</h3>
                <div className="graph-box">
                  Offre + demande
                  <br />→ rencontre entre vendeurs et acheteurs
                  <br />→ prix d’équilibre
                  <br />→ quantité d’équilibre
                </div>

                <h3>Taxe et subvention</h3>
                <div className="graph-box">
                  Taxe
                  <br />→ coût plus élevé
                  <br />→ prix souvent plus élevé et quantité échangée plus faible
                  <br /><br />
                  Subvention
                  <br />→ soutien financier
                  <br />→ prix ou coût plus faible et quantité échangée potentiellement plus élevée
                </div>
              </section>
            )}

            {activeSection === "exercices" && (
              <section className="section-card">
                <h2>6. Exercices / entraînements</h2>

                <p>
                  Pour chaque situation, identifie le mécanisme principal : marché physique,
                  marché non physique, effet sur la demande, effet sur l’offre, choc, taxe ou subvention.
                </p>

                <div className="examples-grid">
                  {exemples.map((item) => (
                    <div key={item.situation} className="example-card">
                      <em>{item.classement}</em>
                      <strong>{item.situation}</strong>
                      <span>{item.justification}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeSection === "erreurs" && (
              <section className="section-card">
                <h2>7. Les erreurs fréquentes</h2>

                <div className="errors-grid">
                  {erreurs.map(([erreur, correction]) => (
                    <div key={erreur} className="error-card">
                      <strong>Erreur : {erreur}</strong>
                      <span>Correction : {correction}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeSection === "quiz" && (
              <section className="section-card">
                <h2>8. Quiz</h2>

                <div className="quiz-grid">
                  {quiz.map(([question, reponse], index) => (
                    <div key={question} className="quiz-card">
                      <strong>{index + 1}. {question}</strong>
                      <span>{reponse}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeSection === "methode" && (
              <section className="section-card">
                <h2>9. Méthode appliquée : AEI</h2>

                <p>
                  Pour répondre correctement en SES, on peut utiliser la méthode AEI :
                  <strong> Affirmer, Expliquer, Illustrer.</strong>
                </p>

                <div className="method-box">
                  <h3>Question</h3>
                  <p>Pourquoi un marché n’est-il pas forcément un lieu physique ?</p>

                  <h3>Réponse AEI</h3>
                  <ul>
                    <li>
                      <strong>Affirmer :</strong> un marché n’est pas forcément un lieu physique.
                    </li>
                    <li>
                      <strong>Expliquer :</strong> un marché désigne surtout la rencontre entre une offre et une demande.
                    </li>
                    <li>
                      <strong>Illustrer :</strong> le marché des billets d’avion peut fonctionner en ligne,
                      sans que les vendeurs et les acheteurs se rencontrent dans un même lieu.
                    </li>
                  </ul>
                </div>
              </section>
            )}

            {activeSection === "memo" && (
              <section className="section-card">
                <h2>10. Fiche mémo</h2>

                <div className="memo">
                  <ol>
                    <li>Un marché est un lieu réel ou fictif où se rencontrent une offre et une demande.</li>
                    <li>Un marché a besoin de règles et d’institutions pour fonctionner.</li>
                    <li>La demande diminue généralement quand le prix augmente.</li>
                    <li>L’offre augmente généralement quand le prix augmente.</li>
                    <li>Le prix d’équilibre égalise la quantité offerte et la quantité demandée.</li>
                    <li>Une pénurie apparaît quand la demande est supérieure à l’offre.</li>
                    <li>Un excédent apparaît quand l’offre est supérieure à la demande.</li>
                    <li>Un choc d’offre ou de demande peut modifier l’équilibre.</li>
                    <li>Une taxe peut augmenter le prix et réduire la quantité échangée.</li>
                    <li>Une subvention peut soutenir l’offre ou réduire le prix payé.</li>
                  </ol>
                </div>
              </section>
            )}

            <div className="bottom-actions">
              <button
                type="button"
                className="small-action"
                onClick={() => {
                  const previous = Math.max(0, activeIndex - 1);
                  setActiveSection(sections[previous].id);
                }}
              >
                ← Précédent
              </button>

              <button
                type="button"
                className="small-action primary"
                onClick={() => {
                  const next = Math.min(sections.length - 1, activeIndex + 1);
                  setActiveSection(sections[next].id);
                }}
              >
                Suivant →
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}