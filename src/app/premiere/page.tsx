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
        <h1 style={{margin:"14px 0 10px",fontSize:"clamp(34px,6vw,52px)",letterSpacing:"-.04em"}}>Première SES</h1>
        <p style={{margin:"0 0 30px",color:"#65758d",fontSize:16,lineHeight:1.65}}>Retrouve les objectifs officiels, le cours, les mécanismes et des entraînements progressifs pour comprendre et réviser les SES.</p>
        <section style={{padding:26,border:"1px solid #dfe7f3",borderRadius:18,background:"white",boxShadow:"0 14px 40px rgba(38,70,114,.05)"}}>
          <h2 style={{marginTop:0,fontSize:22}}>Comment un marché concurrentiel fonctionne-t-il ?</h2>
   <p style={{color:"#667991",lineHeight:1.7}}>Chapitre 1 · Science économique. Institutions, offre et demande, équilibre, coût marginal, taxe et gains à l’échange. Les autres chapitres seront ajoutés progressivement.</p>
   <Link href="/premiere/marche-concurrentiel" style={{display:"inline-flex",marginTop:10,padding:"11px 15px",borderRadius:10,background:"#164b9c",color:"white",textDecoration:"none",fontWeight:800}}>Réviser le chapitre</Link>
        </section>
      </div>
    </main>
  );
}
