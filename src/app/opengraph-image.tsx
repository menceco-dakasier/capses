import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #f7faff 0%, #e8f1ff 55%, #eefaf6 100%)",
          color: "#10255e",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#164b9c",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              fontWeight: 800,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 42, fontWeight: 800 }}>CAPSES</div>
        </div>

        <div>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.04,
              fontWeight: 800,
              letterSpacing: "-3px",
              maxWidth: 980,
            }}
          >
            Comprendre les SES.
            <br />
            Progresser au lycée.
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 29,
              color: "#526985",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            Cours, notions, méthodes, quiz et révisions pour le baccalauréat.
          </div>
        </div>

        <div style={{ fontSize: 22, color: "#6d7f96" }}>
          Sciences économiques et sociales · 2026-2027
        </div>
      </div>
    ),
    size
  );
}
