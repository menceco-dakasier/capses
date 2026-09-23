import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#f7faff",
        color: "#10255e",
        fontFamily: "var(--font-geist-sans), Arial, sans-serif",
      }}
    >
      <section
        style={{
          width: "min(620px, 100%)",
          padding: "42px 30px",
          border: "1px solid #dfe7f3",
          borderRadius: 22,
          background: "white",
          textAlign: "center",
          boxShadow: "0 18px 50px rgba(37, 76, 130, .08)",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 900, color: "#2563eb" }}>404</div>
        <h1 style={{ margin: "8px 0 10px", fontSize: 30 }}>
          Cette page n’existe pas
        </h1>
        <p style={{ margin: "0 auto 24px", color: "#667991", lineHeight: 1.6 }}>
          Le lien est peut-être ancien ou le contenu a été déplacé.
          Retourne à l’accueil pour retrouver les chapitres CAPSES.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            minHeight: 44,
            alignItems: "center",
            justifyContent: "center",
            padding: "0 18px",
            borderRadius: 10,
            background: "#164b9c",
            color: "white",
            textDecoration: "none",
            fontWeight: 800,
          }}
        >
          Retour à l’accueil
        </Link>
      </section>
    </main>
  );
}
