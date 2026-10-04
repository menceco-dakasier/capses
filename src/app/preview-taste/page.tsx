"use client";

import { useState } from "react";

const pages = [["Accueil", "/"], ["Seconde", "/seconde"], ["Formation des prix", "/seconde/formation-prix"], ["Croissance et quiz", "/terminale/croissance-economique"]];

export default function TastePreview() {
  const [phone, setPhone] = useState(false);
  const [page, setPage] = useState("/");
  return <main className="preview-shell">
    <style>{`
      .preview-shell{min-height:100dvh;background:#f7f7f5;color:#142343;font-family:var(--font-geist-sans),Arial,sans-serif;padding:0 20px 24px}
      .preview-controls{max-width:1400px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:18px 0}
      .preview-controls h1{font-size:20px;font-weight:700;margin:0}.preview-controls p{font-size:14px;margin:4px 0 0;color:#52617a}
      .preview-actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.preview-actions button,.preview-actions select{font:inherit;font-size:14px;padding:10px 14px;min-height:44px;border:1px solid #cbd5e1;border-radius:9px;background:#fff;color:#142343;cursor:pointer}
      .preview-actions button:hover,.preview-actions select:hover{border-color:#1d4ed8;background:#f1f5ff}.preview-actions button{touch-action:manipulation}.preview-actions button[aria-pressed=true]{background:#1d4ed8;border-color:#1d4ed8;color:#fff}.preview-actions :focus-visible{outline:3px solid #1d4ed8;outline-offset:3px}
      .preview-frame{width:100%;max-width:1400px;height:calc(100dvh - 120px);min-height:520px;margin:auto;display:block;background:#fff;border:1px solid #cbd5e1;border-radius:14px;box-shadow:0 8px 32px #173b7310}
      .preview-frame.phone{width:min(390px,100%);height:780px;max-height:calc(100dvh - 120px);min-height:500px;border:6px solid #26334a;border-radius:24px}
      @media(max-width:640px){.preview-shell{padding:0 10px 16px}.preview-controls{gap:12px}.preview-actions{width:100%}.preview-frame{height:calc(100dvh - 180px)}.preview-frame.phone{max-height:calc(100dvh - 180px)}}
    `}</style>
    <header className="preview-controls"><div><h1>CAPSES · Prévisualisation design</h1><p>Fond ivoire · Cartes blanches · Parcours de révision</p></div><div className="preview-actions"><label htmlFor="preview-page">Page</label><select id="preview-page" name="preview-page" value={page} onChange={e => setPage(e.target.value)}>{pages.map(([label, path]) => <option key={path} value={path}>{label}</option>)}</select><button aria-pressed={!phone} onClick={() => setPhone(false)}>Ordinateur</button><button aria-pressed={phone} onClick={() => setPhone(true)}>Téléphone</button></div></header>
    <iframe key={page} className={`preview-frame${phone ? " phone" : ""}`} src={page} title="CAPSES : aperçu interactif" />
  </main>;
}
