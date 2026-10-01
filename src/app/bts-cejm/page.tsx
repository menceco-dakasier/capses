import Link from "next/link";

export default function BTSCEJMPage() {
  return (
    <main style={{
      minHeight:"100vh",
      background:"linear-gradient(135deg,#f7faff,#eef5ff)",
      color:"#10214a",
      fontFamily:"var(--font-geist-sans), Arial, sans-serif"
    }}>
      <div style={{maxWidth:980,margin:"0 auto",padding:"28px 20px 70px"}}>
        <Link href="/" style={{
          display:"inline-flex",alignItems:"center",gap:8,
          color:"#2457ad",textDecoration:"none",fontWeight:750,fontSize:13,
          marginBottom:40
        }}>← Retour à l’accueil</Link>

        <section style={{
          background:"#fff",border:"1px solid #dfe8f4",borderRadius:24,
          padding:"42px",boxShadow:"0 22px 55px rgba(48,77,124,.08)"
        }}>
          <div style={{
            display:"inline-block",padding:"6px 11px",borderRadius:999,
            background:"#eef4ff",color:"#2457ad",fontSize:11,fontWeight:850,
            letterSpacing:".06em",textTransform:"uppercase",marginBottom:18
          }}>
            BTS · CEJM
          </div>

          <h1 style={{
            margin:"0 0 12px",fontSize:"clamp(34px,6vw,58px)",
            lineHeight:1,letterSpacing:"-.045em",color:"#0b2154"
          }}>
            BTS CEJM
          </h1>

          <p style={{
            margin:0,maxWidth:680,fontSize:17,lineHeight:1.65,color:"#65758d"
          }}>
            Un espace dédié à la Culture économique, juridique et managériale
            arrive sur CAPSES : cours synthétiques, notions essentielles,
            méthodes, entraînements et ressources pour les étudiants de BTS.
          </p>

          <div style={{
            marginTop:28,display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:12
          }}>
            {[
              ["Économie","Comprendre les mécanismes et les agents économiques"],
              ["Droit","Maîtriser les notions et le raisonnement juridique"],
              ["Management","Analyser les décisions et le fonctionnement des organisations"]
            ].map(([title,text])=>(
              <div key={title} style={{
                border:"1px solid #e3eaf4",borderRadius:15,padding:"18px",
                background:"#fbfdff"
              }}>
                <strong style={{display:"block",color:"#173e83",marginBottom:7}}>
                  {title}
                </strong>
                <span style={{fontSize:13,lineHeight:1.5,color:"#738198"}}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop:28,padding:"14px 16px",borderRadius:12,
            background:"#fff7e8",border:"1px solid #f3dfb4",
            color:"#8a5a06",fontSize:13,fontWeight:700
          }}>
            Contenus en préparation pour l’année 2026-2027.
          </div>
        </section>
      </div>
    </main>
  );
}
