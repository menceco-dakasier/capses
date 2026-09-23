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
        <h1 style={{margin:"14px 0 10px",fontSize:"clamp(34px,6vw,52px)",letterSpacing:"-.04em"}}>Conditions générales d’utilisation</h1>
        <p style={{margin:"0 0 30px",color:"#65758d",fontSize:16,lineHeight:1.65}}>Règles d’utilisation de la plateforme pédagogique CAPSES.</p>
        <section style={{padding:26,border:"1px solid #dfe7f3",borderRadius:18,background:"white",boxShadow:"0 14px 40px rgba(38,70,114,.05)"}}>
          <h2 style={{fontSize:20}}>Objet</h2>
   <p style={{color:"#667991",lineHeight:1.7}}>CAPSES est une plateforme pédagogique de révision en Sciences économiques et sociales. Elle propose des cours, définitions, mécanismes, quiz, méthodes, données et ressources de travail.</p>
   <h2 style={{fontSize:20,marginTop:26}}>Usage pédagogique</h2>
   <p style={{color:"#667991",lineHeight:1.7}}>Les contenus sont destinés à l’apprentissage et à la révision. Ils ne remplacent ni les consignes du professeur, ni les sujets et corrigés officiels, ni les textes réglementaires publiés par l’Éducation nationale.</p>
   <h2 style={{fontSize:20,marginTop:26}}>Contenus et mises à jour</h2>
   <p style={{color:"#667991",lineHeight:1.7}}>Les données chiffrées sont datées et sourcées lorsque cela est pertinent. Elles peuvent être actualisées au fil des nouvelles publications statistiques.</p>
   <h2 style={{fontSize:20,marginTop:26}}>Disponibilité</h2>
   <p style={{color:"#667991",lineHeight:1.7}}>CAPSES peut évoluer, être corrigé ou temporairement interrompu pour maintenance. Les fonctionnalités encore en préparation sont signalées comme telles.</p>
   <p style={{marginBottom:0,color:"#8794a6",fontSize:12}}>Version de travail : septembre 2026.</p>
        </section>
      </div>
    </main>
  );
}
