import Link from "next/link";

const parcours = [
  {
    numero: "01",
    titre: "À savoir",
    texte: "Objectifs d’apprentissage expliqués simplement avec les blocs “En clair”.",
    href: "/seconde/creation-richesses/a-savoir",
    emoji: "🎯",
  },
  {
    numero: "02",
    titre: "Notions indispensables",
    texte: "Production, bien, service, valeur ajoutée, PIB, croissance.",
    href: "/seconde/creation-richesses/notions",
    emoji: "📚",
  },
  {
    numero: "03",
    titre: "Cours",
    texte: "Le cours complet, organisé progressivement pour comprendre le chapitre.",
    href: "/seconde/creation-richesses/cours",
    emoji: "🧠",
  },
  {
    numero: "04",
    titre: "Vidéo courte",
    texte: "Un récapitulatif rapide pour revoir l’essentiel avant un quiz.",
    href: "/seconde/creation-richesses/video",
    emoji: "🎬",
  },
  {
    numero: "05",
    titre: "Mécanismes",
    texte: "Les chaînes logiques à maîtriser : production, valeur ajoutée, PIB, croissance.",
    href: "/seconde/creation-richesses/mecanismes",
    emoji: "🔗",
  },
  {
    numero: "06",
    titre: "Exercices",
    texte: "Des situations du quotidien à classer et à justifier.",
    href: "/seconde/creation-richesses/exercices",
    emoji: "✍️",
  },
  {
    numero: "07",
    titre: "Erreurs fréquentes",
    texte: "Les confusions classiques à éviter dans ce chapitre.",
    href: "/seconde/creation-richesses/erreurs",
    emoji: "⚠️",
  },
  {
    numero: "08",
    titre: "Quiz",
    texte: "Des questions pour vérifier que l’essentiel est compris.",
    href: "/seconde/creation-richesses/quiz",
    emoji: "✅",
  },
  {
    numero: "09",
    titre: "Méthode AEI",
    texte: "Apprendre à répondre en affirmant, expliquant et illustrant.",
    href: "/seconde/creation-richesses/methode",
    emoji: "🧩",
  },
  {
    numero: "10",
    titre: "Fiche mémo",
    texte: "L’essentiel à retenir avant une évaluation.",
    href: "/seconde/creation-richesses/fiche-memo",
    emoji: "📝",
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

        .chapter-panel {
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

        .chapter-panel p {
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

        .summary {
          margin-top: 28px;
          background: #ecfdf5;
          border: 1px solid #bdece2;
          border-radius: 24px;
          padding: 26px;
        }

        .summary strong {
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

        .summary p {
          margin: 0;
          color: #24496f;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.7;
        }

        .section-heading {
          margin: 38px 0 18px;
        }

        .section-heading h2 {
          margin: 0;
          color: #07194f;
          font-size: 34px;
          letter-spacing: -0.06em;
        }

        .section-heading p {
          margin: 8px 0 0;
          color: #64748b;
          line-height: 1.65;
          font-size: 16px;
        }

        .parcours-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .parcours-card {
          background: white;
          border: 1px solid #dbe7f5;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 18px 45px rgba(15, 35, 77, 0.06);
          transition: 0.2s ease;
          min-height: 210px;
          display: flex;
          flex-direction: column;
          color: inherit;
          position: relative;
          overflow: hidden;
        }

        .parcours-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: #0f766e;
        }

        .parcours-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 50px rgba(15, 35, 77, 0.10);
          border-color: #bdece2;
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 18px;
        }

        .parcours-number {
          display: inline-flex;
          width: 42px;
          height: 42px;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          background: #ecfdf5;
          color: #0f766e;
          font-weight: 900;
        }

        .emoji {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          background: #f1f6ff;
          display: grid;
          place-items: center;
          font-size: 25px;
        }

        .parcours-card h3 {
          margin: 0;
          color: #07194f;
          font-size: 23px;
          letter-spacing: -0.05em;
        }

        .parcours-card p {
          color: #64748b;
          line-height: 1.6;
          margin: 10px 0 22px;
          font-size: 15px;
        }

        .open-link {
          margin-top: auto;
          color: #0f766e;
          font-weight: 900;
          font-size: 14px;
        }

        @media (max-width: 1050px) {
          .links {
            display: none;
          }

          .hero {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 760px) {
          .container,
          .nav {
            width: calc(100% - 24px);
          }

          .hero {
            padding: 28px;
          }

          .parcours-grid {
            grid-template-columns: 1fr;
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
              Ce chapitre permet de comprendre qui produit dans l’économie,
              comment on mesure la richesse créée et pourquoi le PIB ne suffit pas
              à tout expliquer.
            </p>

            <div className="hero-actions">
              <a href="#parcours" className="btn-primary">
                Voir les activités <span>→</span>
              </a>
              <Link href="/seconde" className="btn-secondary">
                ← Retour à Seconde
              </Link>
            </div>
          </div>

          <div className="chapter-panel">
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
                Une entrée progressive : produire, mesurer, comprendre les limites.
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

        <section className="summary">
          <strong>En clair</strong>
          <p>
            Ici, tu ne lis pas tout le chapitre d’un seul coup. Tu choisis une activité :
            objectifs, notions, cours, exercices, quiz ou fiche mémo. Chaque carte ouvre une page dédiée.
          </p>
        </section>

        <section id="parcours">
          <div className="section-heading">
            <h2>Parcours du chapitre</h2>
            <p>
              Chaque bloc correspond à une partie du chapitre. Clique sur une carte pour ouvrir
              la page correspondante.
            </p>
          </div>

          <div className="parcours-grid">
            {parcours.map((item) => (
              <Link key={item.numero} href={item.href} className="parcours-card">
                <div className="card-top">
                  <span className="parcours-number">{item.numero}</span>
                  <span className="emoji">{item.emoji}</span>
                </div>

                <h3>{item.titre}</h3>
                <p>{item.texte}</p>

                <span className="open-link">Ouvrir →</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}