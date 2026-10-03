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
    officiel:
      "Savoir que les producteurs sont variés : entreprises, administrations publiques et organisations de l’économie sociale et solidaire.",
    clair:
      "La richesse n’est pas produite seulement par les entreprises. Un lycée public, un hôpital, une mairie ou une association produisent aussi des biens ou des services.",
    exemple:
      "Un lycée public produit un service d’éducation ; une boulangerie produit du pain ; les Restos du Cœur rendent un service d’aide alimentaire.",
  },
  {
    officiel:
      "Savoir distinguer production marchande et production non marchande.",
    clair:
      "Une production marchande est vendue à un prix significatif. Une production non marchande est gratuite ou presque gratuite pour l’usager, mais elle est quand même financée.",
    exemple:
      "Un repas au restaurant est marchand. Un cours dans un lycée public est non marchand.",
  },
  {
    officiel:
      "Comprendre que produire suppose de combiner du travail, du capital, de la technologie et des ressources naturelles.",
    clair:
      "Pour produire, il faut plusieurs éléments. On ne produit pas seulement avec des humains ou seulement avec des machines.",
    exemple:
      "Pour produire du pain, il faut un boulanger, un four, une recette, de l’énergie, de la farine et de l’eau.",
  },
  {
    officiel:
      "Savoir distinguer chiffre d’affaires, valeur ajoutée et bénéfice.",
    clair:
      "Les ventes ne disent pas tout. Une organisation peut vendre beaucoup, mais avoir aussi beaucoup de coûts.",
    exemple:
      "Une boulangerie peut vendre pour 1 000 € de pain, mais elle doit payer la farine, l’électricité, le loyer et les salaires.",
  },
  {
    officiel:
      "Comprendre que le PIB correspond à la somme des valeurs ajoutées.",
    clair:
      "Le PIB mesure la production réalisée sur un territoire. On additionne les valeurs ajoutées pour éviter de compter plusieurs fois la même chose.",
    exemple:
      "On ne compte pas toute la farine puis tout le pain comme si c’était deux richesses séparées : on mesure la richesse réellement ajoutée.",
  },
  {
    officiel:
      "Comprendre que la croissance correspond à l’augmentation du PIB.",
    clair:
      "Quand le PIB augmente, cela signifie que la production mesurée augmente. C’est ce qu’on appelle la croissance économique.",
    exemple:
      "Si le PIB d’un pays augmente entre deux années, on dit qu’il y a croissance économique.",
  },
  {
    officiel:
      "Connaître les limites du PIB, notamment pour mesurer les inégalités et les effets écologiques.",
    clair:
      "Le PIB est utile, mais il ne dit pas tout. Il ne montre pas directement si les richesses sont bien réparties ou si la production abîme l’environnement.",
    exemple:
      "Un pays peut produire davantage, mais avec plus de pollution ou avec des richesses concentrées entre quelques personnes.",
  },
];

const notions = [
  ["Production", "Activité économique organisée qui crée des biens ou des services."],
  ["Bien", "Produit matériel que l’on peut toucher : pain, médicament, cahier, ordinateur."],
  ["Service", "Production immatérielle : cours, transport, soin, coiffure, sécurité."],
  ["Production marchande", "Production vendue sur un marché à un prix significatif."],
  ["Production non marchande", "Production gratuite ou quasi gratuite pour l’usager, souvent financée collectivement."],
  ["Entreprise", "Organisation productive qui produit des biens ou des services, le plus souvent marchands."],
  ["Administration publique", "Organisation qui produit surtout des services non marchands : éducation, sécurité, santé publique."],
  ["Économie sociale et solidaire", "Organisations qui produisent des biens ou services en recherchant une utilité sociale."],
  ["Facteurs de production", "Éléments nécessaires pour produire : travail, capital, technologie et ressources naturelles."],
  ["Chiffre d’affaires", "Montant total des ventes réalisées par une organisation productive."],
  ["Valeur ajoutée", "Richesse réellement créée par une organisation productive."],
  ["Bénéfice", "Résultat positif obtenu lorsque les recettes sont supérieures aux coûts."],
  ["PIB", "Somme des valeurs ajoutées produites sur un territoire pendant une période."],
  ["Croissance économique", "Augmentation du PIB sur une période."],
  ["Limites du PIB", "Le PIB ne montre pas directement les inégalités ni les dégradations écologiques."],
];

const exemples = [
  {
    situation: "Un cours de SES dans un lycée public",
    classement: "Production non marchande de service",
    justification:
      "Le cours est un service d’éducation. Il est organisé, légal, déclaré et financé collectivement. Il est gratuit ou quasi gratuit pour l’usager.",
  },
  {
    situation: "Un cours de mathématiques donné à son petit frère",
    classement: "Pas une production économique au sens strict",
    justification:
      "Il s’agit d’une activité domestique ou familiale. Elle n’est pas vendue sur un marché et n’est pas comptabilisée comme production économique.",
  },
  {
    situation: "Une formation payante proposée par une entreprise",
    classement: "Production marchande de service",
    justification:
      "L’entreprise vend un service de formation à un prix significatif. C’est donc une production marchande.",
  },
  {
    situation: "Un service de police",
    classement: "Production non marchande de service",
    justification:
      "La police produit un service de sécurité. Ce service n’est pas vendu directement à l’usager : il est financé collectivement.",
  },
  {
    situation: "Des médicaments fabriqués par un laboratoire",
    classement: "Production marchande de bien",
    justification:
      "Les médicaments sont des biens matériels produits pour être vendus sur un marché.",
  },
  {
    situation: "Un concert payant",
    classement: "Production marchande de service",
    justification:
      "Le spectateur paie pour assister au concert. Il s’agit d’un service culturel vendu sur un marché.",
  },
  {
    situation: "Du pain vendu dans une boulangerie",
    classement: "Production marchande de bien",
    justification:
      "Le pain est un bien matériel vendu à un prix significatif.",
  },
  {
    situation: "Un gâteau réalisé à la maison",
    classement: "Pas une production économique au sens strict",
    justification:
      "La production domestique n’est pas comptabilisée comme production économique, même si elle peut être utile.",
  },
  {
    situation: "Une personne qui jardine dans son propre jardin",
    classement: "Pas une production économique au sens strict",
    justification:
      "Il s’agit d’une activité domestique. Elle n’est pas vendue sur un marché et n’est pas déclarée comme production économique.",
  },
  {
    situation: "Un dîner au restaurant",
    classement: "Production marchande de service",
    justification:
      "Le restaurant vend un service de restauration. Même s’il utilise des biens alimentaires, le client paie aussi le service.",
  },
  {
    situation: "Un repas dans une cantine scolaire publique",
    classement: "Production non marchande ou quasi marchande de service",
    justification:
      "Le repas est proposé dans un cadre organisé et souvent financé en partie par la collectivité. Le prix payé par l’usager peut être inférieur au coût réel.",
  },
  {
    situation: "Une action des Restos du Cœur",
    classement: "Production de service par l’économie sociale et solidaire",
    justification:
      "L’objectif principal est l’utilité sociale. L’organisation produit un service d’aide alimentaire sans rechercher le profit maximal.",
  },
  {
    situation: "Un transport en taxi",
    classement: "Production marchande de service",
    justification:
      "Le taxi vend un service de transport à un client.",
  },
  {
    situation: "Un transport en bus scolaire",
    classement: "Production non marchande ou quasi marchande de service",
    justification:
      "Le transport scolaire est un service organisé et souvent financé en partie par les collectivités.",
  },
];

const erreurs = [
  ["Seules les entreprises produisent des richesses.", "Faux. Les administrations publiques et les organisations de l’économie sociale et solidaire produisent aussi."],
  ["Un service gratuit n’est pas une production.", "Faux. Un service non marchand peut être une production économique s’il est organisé et financé collectivement."],
  ["Tout travail est une production économique.", "À nuancer. Une activité domestique, comme aider son petit frère, n’est pas comptabilisée comme production économique."],
  ["Le chiffre d’affaires est la même chose que le bénéfice.", "Faux. Le chiffre d’affaires correspond aux ventes. Le bénéfice tient compte des coûts."],
  ["Le PIB est la somme des chiffres d’affaires.", "Faux. Le PIB correspond à la somme des valeurs ajoutées."],
  ["Si le PIB augmente, tout le monde s’enrichit forcément.", "Faux. La croissance peut s’accompagner d’inégalités de revenus."],
  ["Le PIB mesure parfaitement le bien-être.", "Faux. Le PIB mesure la production, mais pas directement la qualité de vie, les inégalités ou l’environnement."],
  ["La croissance est toujours positive pour la société.", "À nuancer. Elle peut améliorer le niveau de vie moyen, mais aussi poser des limites écologiques."],
];

const quiz = [
  ["Une production économique peut-elle être un service ?", "Oui. Un cours, un transport ou une consultation médicale sont des services."],
  ["Une administration publique peut-elle produire ?", "Oui. Elle produit surtout des services non marchands."],
  ["Une production non marchande est-elle forcément inutile ?", "Non. Elle peut être essentielle, comme l’éducation ou la sécurité."],
  ["Le chiffre d’affaires mesure-t-il la richesse réellement créée ?", "Non. La richesse réellement créée est mesurée par la valeur ajoutée."],
  ["Quelle est la formule de la valeur ajoutée ?", "Valeur ajoutée = chiffre d’affaires − consommations intermédiaires."],
  ["Le PIB est-il la somme des valeurs ajoutées ?", "Oui. Le PIB additionne les valeurs ajoutées produites sur un territoire."],
  ["La croissance correspond-elle à l’augmentation du PIB ?", "Oui. La croissance économique désigne l’augmentation du PIB sur une période."],
  ["Le PIB permet-il de connaître directement les inégalités ?", "Non. Il ne montre pas comment les richesses sont réparties."],
];

export default function CreationRichessesPage() {
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

        button {
          font-family: inherit;
        }

        .page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(15, 118, 110, 0.13), transparent 34%),
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
          border: 1px solid #bdece2;
          background: #ecfdf5;
          color: #0f766e;
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
          color: #0f766e;
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
          background: #0f766e;
          color: white;
          border: none;
          cursor: pointer;
          box-shadow: 0 18px 34px rgba(15, 118, 110, 0.22);
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
            radial-gradient(circle at 30% 20%, rgba(15,118,110,0.18), transparent 30%),
            linear-gradient(135deg, #e9fbf7, #f8fbff);
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
          color: #0f766e;
          font-size: 22px;
          font-weight: 900;
        }

        .progress-bar {
          width: 100%;
          height: 12px;
          border-radius: 999px;
          background: #dbeafe;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #0f766e, #22c55e);
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
          background: #f1f6ff;
          color: #0f766e;
        }

        .side-button.active {
          background: #ecfdf5;
          color: #0f766e;
          border: 1px solid #bdece2;
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
          background: #ecfdf5;
          border: 1px solid #bdece2;
          border-radius: 22px;
          padding: 22px;
        }

        .clear-label {
          display: inline-flex;
          margin-bottom: 10px;
          background: white;
          color: #0f766e;
          border: 1px solid #bdece2;
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
          background: #ecfdf5;
          color: #0f766e;
          border: 1px solid #bdece2;
        }

        .example-label {
          background: #fff7ed;
          color: #9a3412;
          border: 1px solid #fed7aa;
        }

        .example-card em {
          display: inline-flex;
          color: #0f766e;
          background: #ecfdf5;
          border: 1px solid #c7f0e8;
          border-radius: 999px;
          padding: 6px 10px;
          font-style: normal;
          font-weight: 900;
          font-size: 12px;
          margin-bottom: 10px;
        }

        .formula {
          background: #f1f5f9;
          border: 1px solid #dbe7f5;
          border-radius: 18px;
          padding: 18px;
          margin-top: 14px;
          color: #173b73;
          font-weight: 900;
          line-height: 1.8;
        }

        .video-box {
          margin-top: 20px;
          background:
            linear-gradient(135deg, rgba(15,118,110,0.12), rgba(37,99,235,0.10)),
            #f8fbff;
          border: 1px solid #dbe7f5;
          border-radius: 22px;
          padding: 24px;
        }

        .chain {
          background: #0f172a;
          color: #e2e8f0;
          border-radius: 18px;
          padding: 22px;
          line-height: 1.8;
          font-weight: 800;
          margin-top: 16px;
        }

        .method-box {
          background: #fff7ed;
          border: 1px solid #fed7aa;
          border-radius: 20px;
          padding: 22px;
          margin-top: 16px;
        }

        .memo {
          background: #ecfdf5;
          border: 1px solid #c7f0e8;
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
          background: #0f766e;
          color: white;
          border-color: #0f766e;
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
          <span>Chapitre 2</span>
        </div>

        <section className="hero">
          <div>
            <div className="badge">SECONDE SES · CHAPITRE 2</div>

            <h1>
              Créer et mesurer
              <span>les richesses</span>
            </h1>

            <p className="hero-text">
              Ce chapitre explique ce que les économistes appellent une production,
              qui produit dans l’économie, comment on mesure la richesse créée et
              pourquoi le PIB ne dit pas tout.
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
              <div className="chapter-icon">🏭</div>

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
              <div className="mini-card">Production</div>
              <div className="mini-card">Producteurs</div>
              <div className="mini-card">Valeur ajoutée</div>
              <div className="mini-card">PIB</div>
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
                  La question centrale est : <strong>comment crée-t-on des richesses et comment les mesure-t-on ?</strong>
                  Le chapitre part d’une idée simple : produire ne veut pas seulement dire fabriquer un objet.
                  On peut aussi produire un service, marchand ou non marchand.
                </p>

                <div className="clear-box">
                  <span className="clear-label">En clair</span>
                  <p>
                    Dans ce chapitre, tu dois comprendre que la richesse n’est pas seulement produite
                    par les entreprises. Un lycée, un hôpital, une association, une boulangerie ou un taxi
                    peuvent tous participer à la production de richesses, mais pas de la même manière.
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
                  <h3>A. Produire, ce n’est pas seulement fabriquer</h3>
                  <p>
                    Dans le langage courant, on pense souvent que produire signifie fabriquer un objet.
                    En SES, la notion est plus large. Produire, c’est créer un bien ou un service dans un cadre organisé.
                    Une boulangerie produit du pain, une pharmacie vend des médicaments, un taxi produit un service
                    de transport, et un lycée public produit un service d’éducation.
                  </p>
                </div>

                <div className="course-box">
                  <h3>B. Bien ou service : deux formes de production</h3>
                  <p>
                    Un bien est matériel : on peut le stocker, le transporter et le toucher.
                    Un service est immatériel : il est souvent produit et consommé en même temps.
                    Une coupe de cheveux, un cours, une consultation médicale ou un trajet en bus sont des services.
                  </p>
                </div>

                <div className="course-box">
                  <h3>C. Production marchande et non marchande</h3>
                  <p>
                    Une production marchande est vendue sur un marché à un prix significatif.
                    Une production non marchande est fournie gratuitement ou presque gratuitement à l’usager.
                    Cela ne veut pas dire qu’elle ne coûte rien : elle peut être financée par les impôts,
                    les cotisations ou d’autres ressources collectives.
                  </p>
                </div>

                <div className="course-box">
                  <h3>D. Tous les producteurs ne sont pas des entreprises</h3>
                  <p>
                    Les entreprises produisent des biens et services, le plus souvent pour les vendre.
                    Les administrations publiques produisent surtout des services non marchands, comme l’éducation
                    ou la sécurité. Les organisations de l’économie sociale et solidaire produisent aussi,
                    avec une finalité sociale.
                  </p>
                </div>

                <div className="course-box">
                  <h3>E. Produire suppose de combiner plusieurs ressources</h3>
                  <p>
                    Pour produire, une organisation combine du travail, du capital, de la technologie
                    et des ressources naturelles. Le travail correspond à l’activité humaine.
                    Le capital correspond aux machines, bâtiments, outils ou logiciels.
                  </p>
                </div>

                <div className="course-box">
                  <h3>F. Mesurer la richesse créée</h3>
                  <p>
                    Le chiffre d’affaires indique le montant total des ventes. Mais il ne mesure pas directement
                    la richesse créée. Pour mesurer la richesse réellement créée, on utilise la valeur ajoutée.
                  </p>

                  <div className="formula">
                    Chiffre d’affaires = prix de vente × quantité vendue
                    <br />
                    Valeur ajoutée = chiffre d’affaires − consommations intermédiaires
                    <br />
                    Bénéfice = chiffre d’affaires − coûts de production
                  </div>
                </div>

                <div className="course-box">
                  <h3>G. Du PIB à la croissance</h3>
                  <p>
                    Le PIB correspond à la somme des valeurs ajoutées produites sur un territoire pendant une période donnée.
                    Lorsque le PIB augmente, on parle de croissance économique.
                  </p>
                </div>

                <div className="course-box">
                  <h3>H. Les limites du PIB</h3>
                  <p>
                    Le PIB est un indicateur très utilisé, mais il ne dit pas tout. Il ne montre pas directement
                    la répartition des revenus et ne mesure pas correctement les effets écologiques de la production.
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
                    Objectif : revoir l’essentiel du chapitre en 2 à 3 minutes avant un quiz,
                    une évaluation ou une révision rapide.
                  </p>
                  <p>
                    Fil conducteur possible : partir d’un sandwich acheté à la cafétéria.
                    Qui le produit ? Quels biens et services sont mobilisés ? Quelle différence entre chiffre d’affaires,
                    valeur ajoutée et bénéfice ? Comment cette production contribue-t-elle au PIB ?
                  </p>
                </div>
              </section>
            )}

            {activeSection === "mecanismes" && (
              <section className="section-card">
                <h2>5. Les mécanismes à maîtriser</h2>

                <h3>De la production au PIB</h3>
                <div className="chain">
                  Travail + capital + technologie + ressources naturelles
                  <br />→ production de biens ou de services
                  <br />→ création de valeur ajoutée
                  <br />→ somme des valeurs ajoutées
                  <br />→ PIB
                </div>

                <h3>Du PIB à la croissance</h3>
                <div className="chain">
                  PIB d’une période plus élevé que le PIB de la période précédente
                  <br />→ augmentation de la production mesurée
                  <br />→ croissance économique
                </div>

                <h3>Les limites de la croissance</h3>
                <div className="chain">
                  Hausse du PIB
                  <br />→ plus de richesses produites en moyenne
                  <br />→ mais pas forcément moins d’inégalités
                  <br />→ et pas forcément moins de dégradations écologiques
                </div>
              </section>
            )}

            {activeSection === "exercices" && (
              <section className="section-card">
                <h2>6. Exercices / entraînements</h2>

                <p>
                  Pour chaque situation, identifie s’il s’agit d’une production marchande de bien,
                  d’une production marchande de service, d’une production non marchande de service,
                  d’une production relevant de l’économie sociale et solidaire, ou si ce n’est pas
                  une production économique au sens strict.
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
                  <p>Pourquoi un service gratuit pour l’usager peut-il être une production économique ?</p>

                  <h3>Réponse AEI</h3>
                  <ul>
                    <li><strong>Affirmer :</strong> un service gratuit pour l’usager peut être une production économique.</li>
                    <li><strong>Expliquer :</strong> il peut être organisé, légal, déclaré et financé collectivement.</li>
                    <li><strong>Illustrer :</strong> un cours dans un lycée public est un service non marchand financé par la collectivité.</li>
                  </ul>
                </div>
              </section>
            )}

            {activeSection === "memo" && (
              <section className="section-card">
                <h2>10. Fiche mémo</h2>

                <div className="memo">
                  <ol>
                    <li>Produire, c’est créer des biens ou des services dans un cadre économique organisé.</li>
                    <li>Un bien est matériel ; un service est immatériel.</li>
                    <li>Une production marchande est vendue à un prix significatif.</li>
                    <li>Une production non marchande est gratuite ou quasi gratuite pour l’usager.</li>
                    <li>Les entreprises, les administrations publiques et l’économie sociale et solidaire produisent.</li>
                    <li>Produire nécessite de combiner travail, capital, technologie et ressources naturelles.</li>
                    <li>Le chiffre d’affaires mesure les ventes.</li>
                    <li>La valeur ajoutée mesure la richesse réellement créée.</li>
                    <li>Le PIB est la somme des valeurs ajoutées.</li>
                    <li>La croissance est l’augmentation du PIB.</li>
                    <li>Le PIB ne montre pas directement les inégalités.</li>
                    <li>La croissance peut poser des limites écologiques.</li>
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