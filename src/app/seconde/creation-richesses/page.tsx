import Link from "next/link";
import type { CSSProperties } from "react";

const notions = [
  {
    titre: "Production",
    texte: "Activité économique organisée qui crée des biens ou des services.",
  },
  {
    titre: "Bien",
    texte: "Produit matériel que l’on peut toucher : pain, médicament, cahier, ordinateur.",
  },
  {
    titre: "Service",
    texte: "Production immatérielle : cours, transport, soin, coiffure, sécurité.",
  },
  {
    titre: "Production marchande",
    texte: "Production vendue sur un marché à un prix significatif.",
  },
  {
    titre: "Production non marchande",
    texte: "Production gratuite ou quasi gratuite pour l’usager, souvent financée collectivement.",
  },
  {
    titre: "Entreprise",
    texte: "Organisation productive qui produit des biens ou des services.",
  },
  {
    titre: "Administration publique",
    texte: "Organisation qui produit surtout des services non marchands.",
  },
  {
    titre: "Économie sociale et solidaire",
    texte: "Organisations qui recherchent une utilité sociale avant la recherche du profit maximal.",
  },
  {
    titre: "Valeur ajoutée",
    texte: "Richesse réellement créée par une organisation productive.",
  },
  {
    titre: "PIB",
    texte: "Somme des valeurs ajoutées produites sur un territoire pendant une période.",
  },
  {
    titre: "Croissance économique",
    texte: "Augmentation du PIB sur une période.",
  },
];

const erreurs = [
  {
    erreur: "Seules les entreprises produisent des richesses.",
    correction:
      "Faux. Les administrations publiques et les organisations de l’économie sociale et solidaire produisent aussi.",
  },
  {
    erreur: "Un service gratuit n’est pas une production.",
    correction:
      "Faux. Un service non marchand peut être une production économique s’il est organisé et financé collectivement.",
  },
  {
    erreur: "Le chiffre d’affaires est la même chose que le bénéfice.",
    correction:
      "Faux. Le chiffre d’affaires correspond aux ventes. Le bénéfice tient compte des coûts.",
  },
  {
    erreur: "Le PIB mesure parfaitement la richesse d’un pays.",
    correction:
      "À nuancer. Le PIB mesure la production, mais il ne mesure pas directement les inégalités ou les dégâts écologiques.",
  },
  {
    erreur: "Si le PIB augmente, tout le monde s’enrichit forcément.",
    correction:
      "Faux. La croissance peut s’accompagner d’inégalités de revenus.",
  },
  {
    erreur: "La croissance économique est toujours positive.",
    correction:
      "À nuancer. Elle peut améliorer le niveau de vie moyen, mais aussi poser des limites écologiques.",
  },
];

const quiz = [
  {
    question: "Un cours dans un lycée public est-il une production économique ?",
    reponse:
      "Oui. C’est un service non marchand produit par une administration publique.",
  },
  {
    question: "Une boulangerie produit-elle un bien ou un service ?",
    reponse:
      "Elle produit principalement un bien : du pain, des viennoiseries ou des pâtisseries.",
  },
  {
    question: "Le PIB est-il la somme des chiffres d’affaires ?",
    reponse:
      "Non. Le PIB correspond à la somme des valeurs ajoutées.",
  },
  {
    question: "La croissance économique correspond-elle à la hausse du PIB ?",
    reponse:
      "Oui. La croissance économique désigne l’augmentation du PIB sur une période.",
  },
  {
    question: "Le PIB permet-il de connaître directement les inégalités ?",
    reponse:
      "Non. C’est une limite du PIB : il ne montre pas comment les richesses sont réparties.",
  },
];

export default function CreationRichessesPage() {
  return (
    <main className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, system-ui, sans-serif;
          background: #f4f7fb;
          color: #10234d;
        }

        a {
          text-decoration: none;
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

        .breadcrumb a {
          color: #2563eb;
        }

        .hero {
          background: white;
          border: 1px solid #dbe7f5;
          border-radius: 32px;
          box-shadow: 0 24px 80px rgba(15, 35, 77, 0.10);
          padding: 52px;
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
          min-height: 340px;
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
          width: 0%;
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #0f766e, #22c55e);
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
          margin: 0 0 12px;
          color: #07194f;
          font-size: 20px;
          letter-spacing: -0.04em;
        }

        .sidebar a {
          display: block;
          color: #50617f;
          font-weight: 800;
          padding: 11px 0;
          border-bottom: 1px solid #edf2f7;
          transition: 0.2s ease;
        }

        .sidebar a:hover {
          color: #0f766e;
          padding-left: 4px;
        }

        .content {
          display: grid;
          gap: 18px;
        }

        .section-card {
          background: white;
          border: 1px solid #dbe7f5;
          border-radius: 24px;
          padding: 30px;
          box-shadow: 0 18px 45px rgba(15, 35, 77, 0.06);
        }

        .section-card h2 {
          margin: 0 0 16px;
          color: #07194f;
          font-size: 30px;
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

        .section-card ul,
        .section-card ol {
          margin-bottom: 0;
        }

        .intro-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-top: 22px;
        }

        .intro-item {
          background: #f8fbff;
          border: 1px solid #dbe7f5;
          border-radius: 18px;
          padding: 18px;
        }

        .intro-item strong {
          color: #07194f;
          display: block;
          margin-bottom: 8px;
        }

        .intro-item span {
          color: #64748b;
          line-height: 1.55;
          font-size: 14px;
        }

        .tag-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 18px;
        }

        .tag {
          background: #ecfdf5;
          color: #0f766e;
          border: 1px solid #c7f0e8;
          border-radius: 999px;
          padding: 8px 11px;
          font-size: 13px;
          font-weight: 900;
        }

        .notions-grid,
        .errors-grid,
        .quiz-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-top: 22px;
        }

        .notion-card,
        .error-card,
        .quiz-card {
          border: 1px solid #dbe7f5;
          border-radius: 18px;
          padding: 18px;
          background: #f8fbff;
        }

        .notion-card strong,
        .error-card strong,
        .quiz-card strong {
          display: block;
          color: #07194f;
          margin-bottom: 8px;
          font-size: 15px;
        }

        .notion-card span,
        .error-card span,
        .quiz-card span {
          color: #64748b;
          font-size: 14px;
          line-height: 1.6;
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

        .video-box strong {
          display: block;
          color: #07194f;
          font-size: 20px;
          margin-bottom: 8px;
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

        .exercise {
          background: #f8fbff;
          border: 1px solid #dbe7f5;
          border-radius: 18px;
          padding: 18px;
          margin-top: 16px;
        }

        .memo {
          background: #ecfdf5;
          border: 1px solid #c7f0e8;
          border-radius: 22px;
          padding: 24px;
          margin-top: 20px;
        }

        .formula {
          background: #f1f5f9;
          border: 1px solid #dbe7f5;
          border-radius: 18px;
          padding: 18px;
          margin-top: 14px;
          color: #173b73;
          font-weight: 900;
          line-height: 1.7;
        }

        @media (max-width: 1050px) {
          .links {
            display: none;
          }

          .hero,
          .layout {
            grid-template-columns: 1fr;
          }

          .sidebar {
            position: static;
          }

          .notions-grid,
          .errors-grid,
          .quiz-grid,
          .intro-grid {
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
              <a href="#savoir" className="btn-primary">
                Commencer le chapitre <span>→</span>
              </a>
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
                  <strong>0%</strong>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" />
                </div>
              </div>

              <p>
                Un parcours pour comprendre production, valeur ajoutée, PIB et croissance.
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
            <a href="#savoir">1. À savoir</a>
            <a href="#notions">2. Notions</a>
            <a href="#cours">3. Cours en 10 min</a>
            <a href="#video">4. Vidéo courte</a>
            <a href="#mecanismes">5. Mécanismes</a>
            <a href="#erreurs">6. Erreurs fréquentes</a>
            <a href="#quiz">7. Quiz</a>
            <a href="#exercices">8. Exercices</a>
            <a href="#methode">9. Méthode AEI</a>
            <a href="#memo">10. Fiche mémo</a>
          </aside>

          <div className="content">
            <section id="savoir" className="section-card">
              <h2>1. À savoir pour le chapitre</h2>

              <p>
                La question centrale est : <strong>comment crée-t-on des richesses et comment les mesure-t-on ?</strong>
                Le chapitre part d’une idée simple : produire ne veut pas seulement dire fabriquer un objet.
                On peut aussi produire un service, marchand ou non marchand.
              </p>

              <div className="intro-grid">
                <div className="intro-item">
                  <strong>Objectif 1</strong>
                  <span>Comprendre la diversité des producteurs : entreprises, administrations publiques et économie sociale et solidaire.</span>
                </div>

                <div className="intro-item">
                  <strong>Objectif 2</strong>
                  <span>Distinguer production marchande et production non marchande.</span>
                </div>

                <div className="intro-item">
                  <strong>Objectif 3</strong>
                  <span>Comprendre que produire suppose de combiner travail, capital, technologie et ressources naturelles.</span>
                </div>

                <div className="intro-item">
                  <strong>Objectif 4</strong>
                  <span>Mesurer les richesses avec la valeur ajoutée, le PIB et la croissance, tout en connaissant leurs limites.</span>
                </div>
              </div>

              <div className="tag-list">
                <span className="tag">Production</span>
                <span className="tag">Bien</span>
                <span className="tag">Service</span>
                <span className="tag">Valeur ajoutée</span>
                <span className="tag">PIB</span>
                <span className="tag">Croissance</span>
                <span className="tag">Limites écologiques</span>
              </div>
            </section>

            <section id="notions" className="section-card">
              <h2>2. Les notions indispensables</h2>

              <div className="notions-grid">
                {notions.map((notion) => (
                  <div key={notion.titre} className="notion-card">
                    <strong>{notion.titre}</strong>
                    <span>{notion.texte}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="cours" className="section-card">
              <h2>3. Le cours en 10 minutes</h2>

              <h3>A. Produire, ce n’est pas seulement fabriquer</h3>
              <p>
                Une production économique est une activité organisée qui crée des biens ou des services.
                Une boulangerie produit du pain, une pharmacie vend des médicaments, un taxi produit un service
                de transport, mais un lycée public produit aussi un service d’éducation.
              </p>

              <h3>B. Tous les producteurs ne sont pas des entreprises</h3>
              <p>
                Les entreprises produisent des biens ou des services marchands. Mais elles ne sont pas les seules
                organisations productives. Les administrations publiques produisent surtout des services non marchands.
                Les organisations de l’économie sociale et solidaire produisent aussi, souvent avec une finalité sociale.
              </p>

              <h3>C. Produire suppose de combiner plusieurs éléments</h3>
              <p>
                Pour produire, il faut du travail humain, du capital comme les machines ou les bâtiments,
                de la technologie et des ressources naturelles. Les producteurs choisissent une combinaison
                productive selon leurs objectifs et leurs contraintes.
              </p>

              <h3>D. Mesurer la richesse créée</h3>
              <p>
                Le chiffre d’affaires indique le montant des ventes. Mais il ne mesure pas directement la richesse
                réellement créée. Pour cela, on utilise la valeur ajoutée. Le bénéfice correspond au résultat final
                une fois les coûts pris en compte.
              </p>

              <div className="formula">
                Chiffre d’affaires = prix de vente × quantité vendue
                <br />
                Valeur ajoutée = chiffre d’affaires − consommations intermédiaires
                <br />
                Bénéfice = chiffre d’affaires − coûts de production
              </div>

              <h3>E. PIB, croissance et limites</h3>
              <p>
                Le PIB correspond à la somme des valeurs ajoutées produites sur un territoire.
                Quand le PIB augmente, on parle de croissance économique. Mais le PIB ne mesure pas tout :
                il ne montre pas directement les inégalités de revenus et ne rend pas entièrement compte
                des limites écologiques.
              </p>
            </section>

            <section id="video" className="section-card">
              <h2>4. Vidéo courte / Récapitulatif</h2>

              <div className="video-box">
                <strong>🎬 Vidéo courte à intégrer</strong>
                <p>
                  Objectif : revoir l’essentiel du chapitre en 2 à 3 minutes avant un quiz,
                  une évaluation ou une révision rapide.
                </p>
                <p>
                  Idée de fil conducteur : partir d’un objet simple, comme un sandwich acheté à la cafétéria,
                  puis remonter toute la chaîne : producteurs, travail, machines, matières premières,
                  chiffre d’affaires, valeur ajoutée, PIB et limites écologiques.
                </p>
              </div>
            </section>

            <section id="mecanismes" className="section-card">
              <h2>5. Les mécanismes à maîtriser</h2>

              <h3>De la production au PIB</h3>
              <div className="chain">
                Travail + capital + technologie + ressources naturelles
                <br />→ production de biens ou de services
                <br />→ création de valeur ajoutée
                <br />→ somme des valeurs ajoutées
                <br />→ PIB
              </div>

              <h3>De la croissance aux limites</h3>
              <div className="chain">
                Hausse du PIB
                <br />→ croissance économique
                <br />→ plus de richesses produites en moyenne
                <br />→ mais pas forcément moins d’inégalités
                <br />→ et pas forcément moins de dégradations écologiques
              </div>
            </section>

            <section id="erreurs" className="section-card">
              <h2>6. Les erreurs fréquentes</h2>

              <div className="errors-grid">
                {erreurs.map((item) => (
                  <div key={item.erreur} className="error-card">
                    <strong>Erreur : {item.erreur}</strong>
                    <span>Correction : {item.correction}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="quiz" className="section-card">
              <h2>7. Quiz</h2>

              <div className="quiz-grid">
                {quiz.map((item, index) => (
                  <div key={item.question} className="quiz-card">
                    <strong>{index + 1}. {item.question}</strong>
                    <span>{item.reponse}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="exercices" className="section-card">
              <h2>8. Exercices / entraînements</h2>

              <p>
                Exercice conseillé : classer des situations du quotidien.
                Pour chaque situation, il faut dire s’il s’agit d’une production marchande de bien,
                d’une production marchande de service, d’une production non marchande de service,
                ou si ce n’est pas une production économique.
              </p>

              <div className="exercise">
                <ul>
                  <li>Un cours de SES dans un lycée public.</li>
                  <li>Un cours de mathématiques donné à son petit frère.</li>
                  <li>Un spectacle dans une salle de concert.</li>
                  <li>Du pain produit dans une boulangerie.</li>
                  <li>Un gâteau réalisé à la maison.</li>
                  <li>Un dîner au restaurant.</li>
                  <li>Un transport en taxi.</li>
                  <li>Un transport en bus scolaire.</li>
                </ul>
              </div>
            </section>

            <section id="methode" className="section-card">
              <h2>9. Méthode appliquée : AEI</h2>

              <p>
                Pour répondre correctement en SES, on peut utiliser la méthode AEI :
                <strong> Affirmer, Expliquer, Illustrer.</strong>
              </p>

              <h3>Question</h3>
              <p>Pourquoi un service gratuit pour l’usager peut-il être une production économique ?</p>

              <h3>Réponse AEI</h3>
              <ul>
                <li><strong>Affirmer :</strong> un service gratuit pour l’usager peut être une production économique.</li>
                <li><strong>Expliquer :</strong> il peut être organisé, légal, déclaré et financé collectivement.</li>
                <li><strong>Illustrer :</strong> un cours dans un lycée public est un service non marchand financé par la collectivité.</li>
              </ul>
            </section>

            <section id="memo" className="section-card">
              <h2>10. Fiche mémo</h2>

              <div className="memo">
                <ol>
                  <li>Produire, c’est créer des biens ou des services dans un cadre économique organisé.</li>
                  <li>Il existe plusieurs producteurs : entreprises, administrations publiques, ESS.</li>
                  <li>Une production peut être marchande ou non marchande.</li>
                  <li>Produire nécessite de combiner travail, capital, technologie et ressources naturelles.</li>
                  <li>Le chiffre d’affaires mesure les ventes.</li>
                  <li>La valeur ajoutée mesure la richesse réellement créée.</li>
                  <li>Le PIB est la somme des valeurs ajoutées.</li>
                  <li>La croissance est l’augmentation du PIB.</li>
                  <li>Le PIB ne dit pas tout : il ne montre pas directement les inégalités.</li>
                  <li>La croissance peut aussi poser des limites écologiques.</li>
                </ol>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}