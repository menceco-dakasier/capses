import Link from "next/link";

export default function Page() {
  return (
    <main style={{minHeight:"100vh",background:"#f7faff",color:"#10255e",fontFamily:"var(--font-geist-sans), Arial, sans-serif"}}>
      <header style={{borderBottom:"1px solid #e3eaf4",background:"white"}}>
        <div style={{width:"min(1040px, calc(100% - 32px))",minHeight:68,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
          <Link href="/" style={{color:"#10255e",fontWeight:900,textDecoration:"none",fontSize:20}}>CAPSES</Link>
          <Link href="/" style={{color:"#245cbd",textDecoration:"none",fontWeight:700,fontSize:13}}>← Retour à l’accueil</Link>
        </div>
      </header>
      <div style={{width:"min(900px, calc(100% - 32px))",margin:"0 auto",padding:"54px 0 70px"}}>
        <div style={{display:"inline-flex",padding:"6px 10px",borderRadius:999,background:"#eef5ff",color:"#245cbd",fontSize:11,fontWeight:800}}>CAPSES · 2026-2027</div>
        <h1 style={{margin:"14px 0 10px",fontSize:"clamp(34px,6vw,52px)",letterSpacing:"-.04em"}}>Méthodes SES</h1>
        <p style={{margin:"0 0 30px",color:"#65758d",fontSize:16,lineHeight:1.65}}>Un espace transversal pour apprendre à répondre efficacement aux épreuves du baccalauréat.</p>
        <section style={{padding:26,border:"1px solid #dfe7f3",borderRadius:18,background:"white",boxShadow:"0 14px 40px rgba(38,70,114,.05)"}}>
          <div style={{display:"grid",gap:12}}>
    <div style={{padding:16,border:"1px solid #e2e9f3",borderRadius:13,background:"#f9fbff"}}><strong>EC1</strong><p style={{margin:"6px 0 0",color:"#667991",lineHeight:1.6}}>Définir précisément, expliquer le mécanisme demandé et mobiliser un exemple pertinent.</p></div>
    <div style={{padding:16,border:"1px solid #e2e9f3",borderRadius:13,background:"#f9fbff"}}><strong>EC2 / étude de document</strong><p style={{margin:"6px 0 0",color:"#667991",lineHeight:1.6}}>Lire les données, effectuer les calculs utiles et construire une réponse liée au document.</p></div>
    <div style={{padding:16,border:"1px solid #e2e9f3",borderRadius:13,background:"#f9fbff"}}><strong>EC3 / dissertation</strong><p style={{margin:"6px 0 0",color:"#667991",lineHeight:1.6}}>Construire un raisonnement organisé en mécanismes, preuves et exemples.</p></div>
   </div>
   <p style={{marginBottom:0,marginTop:18,color:"#667991",lineHeight:1.6}}>Les fiches détaillées et exercices guidés seront ajoutés ensuite.</p>
        </section>
      </div>
    </main>
  );
}
