type PageProps = {
  params: {
    slug: string;
  };
};

const CHAPITRES: Record<
  string,
  {
    titre: string;
    matiere: string;
    intro: string;
  }
> = {
  croissance: {
    titre: "La croissance économique",
    matiere: "Économie",
    intro: "Comprendre les sources de la croissance économique et ses limites.",
  },
  "commerce-international": {
    titre: "Le commerce international",
    matiere: "Économie",
    intro:
      "Comprendre les échanges internationaux, le libre-échange et le protectionnisme.",
  },
  chomage: {
    titre: "Le chômage",
    matiere: "Économie",
    intro:
      "Comprendre les causes du chômage et les politiques de lutte contre le chômage.",
  },
  "politiques-europeennes": {
    titre: "Les politiques économiques européennes",
    matiere: "Économie",
    intro:
      "Comprendre les contraintes et les objectifs des politiques économiques dans l’Union européenne.",
  },
  "structure-sociale": {
    titre: "La structure sociale",
    matiere: "Sociologie",
    intro:
      "Comprendre comment la société française est structurée et hiérarchisée.",
  },
  "mobilite-sociale": {
    titre: "La mobilité sociale",
    matiere: "Sociologie",
    intro:
      "Comprendre les formes de mobilité sociale et le rôle de l’école et de la famille.",
  },
  "travail-emploi": {
    titre: "Travail, emploi, chômage",
    matiere: "Sociologie",
    intro:
      "Comprendre les mutations du travail, de l’emploi et de l’organisation productive.",
  },
  "engagement-politique": {
    titre: "L’engagement politique",
    matiere: "Sociologie",
    intro:
      "Comprendre les formes de l’engagement politique et leurs transformations.",
  },
  environnement: {
    titre: "L’environnement, un enjeu mondial",
    matiere: "Regards croisés",
    intro:
      "Comprendre les instruments des politiques environnementales et leurs limites.",
  },
};

export default function PageChapitre({ params }: PageProps) {
  const chapitre = CHAPITRES[params.slug];

  if (!chapitre) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#0d1b2a",
          color: "#e8edf5",
          padding: "4rem",
        }}
      >
        <h1>Chapitre introuvable</h1>
        <p>Ce chapitre n’existe pas encore dans CapSES.</p>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0d1b2a",
        color: "#e8edf5",
        padding: "4rem 2rem",
      }}
    >
      <section style={{ maxWidth: 900, margin: "0 auto" }}>
        <a
          href="/"
          style={{
            color: "#D4A017",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          ← Retour à l’accueil
        </a>

        <p
          style={{
            marginTop: "2rem",
            color: "#D4A017",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            fontSize: 12,
          }}
        >
          {chapitre.matiere}
        </p>

        <h1
          style={{
            fontSize: 46,
            lineHeight: 1.05,
            margin: "0.5rem 0 1rem",
            fontFamily: "Syne, sans-serif",
          }}
        >
          {chapitre.titre}
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "rgba(232,237,245,0.65)",
            lineHeight: 1.6,
          }}
        >
          {chapitre.intro}
        </p>

        <div style={{ display: "grid", gap: "1rem", marginTop: "3rem" }}>
          {[
            "1. À savoir pour le bac",
            "2. Les notions indispensables",
            "3. Le cours en 10 minutes",
            "4. Les mécanismes à maîtriser",
            "5. Les erreurs fréquentes",
            "6. Quiz",
            "7. Sujets probables",
            "8. Méthode appliquée",
            "9. Fiche mémo PDF",
          ].map((titre) => (
            <div
              key={titre}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "1.2rem 1.4rem",
              }}
            >
              <h2 style={{ margin: 0, fontSize: 18, color: "#e8edf5" }}>
                {titre}
              </h2>
              <p
                style={{
                  marginBottom: 0,
                  color: "rgba(232,237,245,0.45)",
                }}
              >
                Contenu à compléter prochainement.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}