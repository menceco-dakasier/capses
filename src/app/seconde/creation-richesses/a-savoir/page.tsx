import Link from "next/link";

const navigation = [
  { label: "À savoir", href: "/seconde/creation-richesses/a-savoir", active: true },
  { label: "Notions", href: "/seconde/creation-richesses/notions", active: false },
  { label: "Cours", href: "/seconde/creation-richesses/cours", active: false },
  { label: "Vidéo courte", href: "/seconde/creation-richesses/video", active: false },
  { label: "Mécanismes", href: "/seconde/creation-richesses/mecanismes", active: false },
  { label: "Exercices", href: "/seconde/creation-richesses/exercices", active: false },
  { label: "Erreurs fréquentes", href: "/seconde/creation-richesses/erreurs", active: false },
  { label: "Quiz", href: "/seconde/creation-richesses/quiz", active: false },
  { label: "Méthode AEI", href: "/seconde/creation-richesses/methode", active: false },
  { label: "Fiche mémo", href: "/seconde/creation-richesses/fiche-memo", active: false },
];

const objectifs = [
  {
    objectif:
      "Savoir que les producteurs sont variés : entreprises, administrations publiques et organisations de l’économie sociale et solidaire.",
    clair:
      "Une entreprise produit, mais elle n’est pas seule. Un lycée public, une mairie, un hôpital ou une association produisent aussi des biens ou des services utiles.",
  },
  {
    objectif:
      "Savoir distinguer production marchande et production non marchande.",
    clair:
      "Quand tu payes directement un prix important, c’est souvent marchand. Quand c’est gratuit ou presque gratuit pour l’usager, mais financé collectivement, c’est souvent non marchand.",
  },
  {
    objectif:
      "Comprendre que produire suppose de combiner du travail, du capital, de la technologie et des ressources naturelles.",
    clair:
      "Pour produire du pain, il faut un boulanger, un four, des recettes, de l’énergie, de la farine et de l’eau. Produire, c’est donc combiner plusieurs éléments.",
  },
  {
    objectif:
      "Savoir distinguer chiffre d’affaires, valeur ajoutée et bénéfice.",
    clair:
      "Les ventes ne disent pas tout. Une entreprise peut vendre beaucoup, mais avoir aussi beaucoup de coûts. Il faut donc distinguer ce qu’elle vend, ce qu’elle crée vraiment et ce qu’elle gagne à la fin.",
  },
  {
    objectif:
      "Comprendre que le PIB correspond à la somme des valeurs ajoutées.",
    clair:
      "Le PIB sert à mesurer la production d’un territoire. Pour éviter de compter plusieurs fois la même chose, on additionne les valeurs ajoutées, pas les chiffres d’affaires.",
  },
  {
    objectif:
      "Comprendre que la croissance correspond à l’augmentation du PIB.",
    clair:
      "Quand le PIB augmente, on dit que l’économie produit davantage. C’est ce qu’on appelle la croissance économique.",
  },
  {
    objectif:
      "Connaître les limites du PIB, notamment pour mesurer les inégalités et les effets écologiques.",
    clair:
      "Le PIB peut augmenter même si les richesses sont mal réparties ou si la production abîme l’environnement. Il faut donc savoir utiliser cet indicateur avec prudence.",
  },
];

export default function ASavoirPage() {
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

        .top-header {
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

        .top-nav {
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

        .layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 24px;
          align-items: start;
        }

        .sidebar {
          background: white;
          border: 1px solid #dbe7f5;
          border-radius: 24px;
          padding: 22px;
          box-shadow: 0 18px 45px rgba(15, 35, 77, 0.06);
          position: sticky;
          top: 110px;
        }

        .sidebar-title {
          margin: 0 0 14px;
          color: #07194f;
          font-size: 20px;
          letter-spacing: -0.04em;
          font-weight: 900;
        }

        .side-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #50617f;
          font-weight: 800;
          padding: 12px 12px;
          border-radius: 14px;
          transition: 0.2s ease;
          margin-bottom: 4px;
        }

        .side-link:hover {
          background: #f1f6ff;
          color: #0f766e;
        }

        .side-link.active {
          background: #ecfdf5;
          color: #0f766e;
          border: 1px solid #bdece2;
        }

        .side-small {
          margin-top: 18px;
          padding-top: 18px;
          border-top: 1px solid #e2e8f0;
        }

        .back-link {
          display: block;
          color: #2563eb;
          font-weight: 900;
          font-size: 14px;
          margin-top: 12px;
        }

        .content {
          display: grid;
          gap: 20px;
        }

        .hero {
          background: white;
          border: 1px solid #dbe7f5;
          border-radius: 32px;
          box-shadow: 0 24px 80px rgba(15, 35, 77, 0.10);
          padding: 46px;
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
          margin-bottom: 22px;
        }

        h1 {
          margin: 0;
          font-size: clamp(40px, 5vw, 64px);
          letter-spacing: -0.07em;
          line-height: 0.96;
          color: #07194f;
          font-weight: 900;
        }

        h1 span {
          display: block;
          color: #0f766e;
        }

        .hero-text {
          margin: 22px 0 0;
          color: #60708e;
          font-size: 18px;
          line-height: 1.75;
          max-width: 820px;
        }

        .clear-box {
          background: #ecfdf5;
          border: 1px solid #bdece2;
          border-radius: 24px;
          padding: 26px;
          box-shadow: 0 18px 45px rgba(15, 35, 77, 0.06);
        }

        .clear-label {
          display: inline-flex;
          background: white;
          color: #0f766e;
          border: 1px solid #bdece2;
          border-radius: 999px;
          padding: 7px 11px;
          font-size: 13px;
          font-weight: 900;
          margin-bottom: 12px;
        }

        .clear-box p {
          margin: 0;
          color: #24496f;
          font-weight: 700;
          line-height: 1.75;
          font-size: 16px;
        }

        .section-card {
          background: white;
          border: 1px solid #dbe7f5;
          border-radius: 24px;
          padding: 30px;
          box-shadow: 0 18px 45px rgba(15, 35, 77, 0.06);
        }

        .section-card h2 {
          margin: 0 0 18px;
          color: #07194f;
          font-size: 30px;
          letter-spacing: -0.06em;
        }

        .objectives-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .objective-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          border: 1px solid #dbe7f5;
          border-radius: 22px;
          background: #f8fbff;
          padding: 18px;
        }

        .objective,
        .plain {
          border-radius: 18px;
          padding: 18px;
          min-height: 150px;
        }

        .objective {
          background: white;
          border: 1px solid #dbe7f5;
        }

        .plain {
          background: #ecfdf5;
          border: 1px solid #bdece2;
        }

        .objective strong,
        .plain strong {
          display: inline-flex;
          border-radius: 999px;
          padding: 7px 11px;
          font-size: 12px;
          font-weight: 900;
          margin-bottom: 10px;
        }

        .objective strong {
          background: #eef4ff;
          color: #2563eb;
          border: 1px solid #c7dcff;
        }

        .plain strong {
          background: white;
          color: #0f766e;
          border: 1px solid #bdece2;
        }

        .objective p,
        .plain p {
          margin: 0;
          color: #50617f;
          line-height: 1.65;
          font-size: 15px;
          font-weight: 650;
        }

        .plain p {
          color: #24496f;
        }

        .next-card {
          background:
            linear-gradient(135deg, rgba(15,118,110,0.10), rgba(37,99,235,0.08)),
            white;
          border: 1px solid #dbe7f5;
          border-radius: 24px;
          padding: 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          box-shadow: 0 18px 45px rgba(15, 35, 77, 0.06);
        }

        .next-card strong {
          display: block;
          color: #07194f;
          font-size: 22px;
          letter-spacing: -0.04em;
          margin-bottom: 6px;
        }

        .next-card span {
          color: #64748b;
          line-height: 1.6;
        }

        .next-button {
          background: #0f766e;
          color: white;
          border-radius: 15px;
          padding: 15px 20px;
          font-weight: 900;
          white-space: nowrap;
          box-shadow: 0 18px 34px rgba(15, 118, 110, 0.22);
        }

        @media (max-width: 1050px) {
          .links {
            display: none;
          }

          .layout {
            grid-template-columns: 1fr;
          }

          .sidebar {
            position: static;
          }

          .objective-card {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 700px) {
          .container,
          .top-nav {
            width: calc(100% - 24px);
          }

          .hero,
          .section-card {
            padding: 26px;
          }

          .next-card {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <header className="top-header">
        <nav className="top-nav">
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
            <Link href="/methodes" className="nav-link">Méthodes</Link>
            <Link href="/espace-eleves" className="nav-link">Mon espace</Link>
          </div>
        </nav>
      </header>

      <div className="container">
        <div className="breadcrumb">
          <Link href="/seconde">Seconde</Link>
          <span>›</span>
          <Link href="/seconde/creation-richesses">Chapitre 2</Link>
          <span>›</span>
          <span>À savoir</span>
        </div>

        <section className="layout">
          <aside className="sidebar">
            <h2 className="sidebar-title">Chapitre 2</h2>

            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={item.active ? "side-link active" : "side-link"}
              >
                <span>{item.label}</span>
                {item.active ? <span>●</span> : <span>→</span>}
              </Link>
            ))}

            <div className="side-small">
              <Link href="/seconde/creation-richesses" className="back-link">
                ← Retour au parcours
              </Link>
              <Link href="/seconde" className="back-link">
                ← Retour à Seconde
              </Link>
            </div>
          </aside>

          <div className="content">
            <section className="hero">
              <div className="badge">SECONDE SES · CHAPITRE 2 · À SAVOIR</div>

              <h1>
                Objectifs
                <span>d’apprentissage</span>
              </h1>

              <p className="hero-text">
                Cette page présente les attendus du chapitre. Chaque objectif est accompagné
                d’une traduction simple pour comprendre concrètement ce qu’il faut savoir faire.
              </p>
            </section>

            <section className="clear-box">
              <span className="clear-label">En clair</span>
              <p>
                Dans ce chapitre, tu dois comprendre que la richesse n’est pas seulement produite
                par les entreprises. Un lycée, un hôpital, une association, une boulangerie ou un
                taxi peuvent tous participer à la production de richesses, mais pas de la même
                manière. Tu dois aussi comprendre comment on mesure cette richesse avec la valeur
                ajoutée, le PIB et la croissance, tout en sachant que ces indicateurs ont des limites.
              </p>
            </section>

            <section className="section-card">
              <h2>Les objectifs à maîtriser</h2>

              <div className="objectives-grid">
                {objectifs.map((item, index) => (
                  <article key={item.objectif} className="objective-card">
                    <div className="objective">
                      <strong>Objectif d’apprentissage {index + 1}</strong>
                      <p>{item.objectif}</p>
                    </div>

                    <div className="plain">
                      <strong>En clair</strong>
                      <p>{item.clair}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="next-card">
              <div>
                <strong>Étape suivante : les notions indispensables</strong>
                <span>
                  Après les objectifs, révise les mots-clés du chapitre : production, bien,
                  service, valeur ajoutée, PIB et croissance.
                </span>
              </div>

              <Link href="/seconde/creation-richesses/notions" className="next-button">
                Continuer →
              </Link>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}