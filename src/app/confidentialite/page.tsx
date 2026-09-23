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
        <h1 style={{margin:"14px 0 10px",fontSize:"clamp(34px,6vw,52px)",letterSpacing:"-.04em"}}>Confidentialité et données</h1>
        <p style={{margin:"0 0 30px",color:"#65758d",fontSize:16,lineHeight:1.65}}>Cette page décrit le fonctionnement actuel de CAPSES avant son ouverture publique.</p>
        <section style={{padding:26,border:"1px solid #dfe7f3",borderRadius:18,background:"white",boxShadow:"0 14px 40px rgba(38,70,114,.05)"}}>
          <h2 style={{fontSize:20}}>Données utilisées par CAPSES</h2>
   <p style={{color:"#667991",lineHeight:1.7}}>CAPSES ne propose actuellement ni compte utilisateur ni formulaire d’inscription. La progression et les scores des quiz sont enregistrés localement dans le navigateur de l’élève à l’aide du stockage local (<code>localStorage</code>).</p>
   <p style={{color:"#667991",lineHeight:1.7}}>Ces données de progression restent sur l’appareil utilisé et ne sont pas envoyées à une base de données CAPSES par cette fonctionnalité.</p>
   <h2 style={{fontSize:20,marginTop:26}}>Cookies et mesure d’audience</h2>
   <p style={{color:"#667991",lineHeight:1.7}}>Le code CAPSES n’intègre actuellement ni cookie publicitaire ni outil de mesure d’audience. Une bannière de consentement n’est donc pas ajoutée à ce stade. Si un outil d’analytics ou un service nécessitant un consentement est ajouté, cette page et le mécanisme de consentement seront mis à jour avant activation.</p>
   <h2 style={{fontSize:20,marginTop:26}}>Liens externes</h2>
   <p style={{color:"#667991",lineHeight:1.7}}>Certaines ressources pédagogiques peuvent renvoyer vers des sites institutionnels ou externes. Leur politique de confidentialité s’applique lorsque vous les consultez.</p>
   <p style={{marginBottom:0,color:"#8794a6",fontSize:12}}>Dernière mise à jour : septembre 2026.</p>
        </section>
      </div>
    </main>
  );
}
