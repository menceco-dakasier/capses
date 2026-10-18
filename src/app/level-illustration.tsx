/** Decorative study scenes, matching the illustration used on the Seconde page. */
export function LevelIllustration({ level }: { level: "premiere" | "terminale" | "bts" }) {
  const accent = level === "premiere" ? "#a66e3c" : level === "terminale" ? "#176b64" : "#65548a";
  const tint = level === "premiere" ? "#f4e8d9" : level === "terminale" ? "#deeee9" : "#ece6f3";
  return <div aria-hidden="true" style={{width:"min(100%, 340px)",flex:"0 1 340px",margin:"0 auto"}}>
    <svg viewBox="0 0 380 270" fill="none" style={{display:"block",width:"100%",height:"auto"}}>
      <path d="M38 165C8 104 61 32 133 40c47 5 67-17 116-2 74 23 127 86 92 151-25 48-70 53-129 43-73-12-145 15-174-67Z" fill={tint}/>
      <ellipse cx="194" cy="233" rx="144" ry="10" fill="#142343" opacity=".06"/>
      {level !== "bts" ? <>
        <g transform="rotate(-8 140 180)"><rect x="51" y="144" width="159" height="75" rx="9" fill={accent}/><path d="M64 207h133" stroke="#fff" strokeWidth="7" opacity=".8"/><path d="M64 158h95" stroke="#fff" strokeWidth="3" opacity=".45"/></g>
        <path d="M103 96c31-13 60-10 88 5 30-16 60-18 91-5v105c-31-12-61-10-91 4-28-15-57-17-88-4V96Z" fill="#fff" stroke="#c7d4dc" strokeWidth="2"/>
        <path d="M191 101v104" stroke="#c7d4dc" strokeWidth="2"/>
        <path d="M120 119c18-4 34-2 53 4m-53 14c19-4 35-1 53 4m-53 14c19-4 35-1 53 4m-53 14c18-3 34-1 47 2" stroke="#c8d5dc" strokeWidth="4" strokeLinecap="round"/>
        {level === "premiere" ? <>
          <path d="M209 174v-46m0 46h56" stroke="#8eacb7" strokeWidth="2"/>
          <path d="m217 166 11-10 13 1 16-20" stroke={accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M210 117h43" stroke="#c8d5dc" strokeWidth="4" strokeLinecap="round"/>
        </> : <>
          <path d="m211 124 5 5 10-12m-15 31 5 5 10-12m-15 31 5 5 10-12" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M236 124h28m-28 24h28m-28 24h24" stroke="#c8d5dc" strokeWidth="4" strokeLinecap="round"/>
          <path d="M173 97v35l9-6 9 6v-31" fill="#b7d7cc"/>
        </>}
      </> : <>
        <rect x="71" y="75" width="208" height="132" rx="11" fill="#193454"/>
        <rect x="81" y="85" width="188" height="111" rx="4" fill="#fff"/>
        <rect x="93" y="98" width="50" height="84" rx="4" fill={tint}/>
        <path d="M103 112h28m-28 13h22m-22 13h28m-28 13h19" stroke={accent} strokeWidth="4" opacity=".65" strokeLinecap="round"/>
        <path d="M158 169h91M162 166v-25m24 25v-39m24 39v-29m24 29v-53" stroke={accent} strokeWidth="10"/>
        <path d="M159 102h62" stroke="#ccd8e2" strokeWidth="4" strokeLinecap="round"/>
        <path d="m71 207-20 17c-3 3-1 7 3 7h244c4 0 6-4 3-7l-22-17H71Z" fill="#aebfcb"/>
        <path d="M153 207h45l8 9h-61l8-9Z" fill="#e2e8ed"/>
        <g transform="rotate(10 282 180)"><rect x="248" y="131" width="67" height="91" rx="5" fill="#fff" stroke="#c7d4dc" strokeWidth="2"/><path d="M261 150h39m-39 12h39m-39 12h28m-28 12h39" stroke="#c7d4dc" strokeWidth="3" strokeLinecap="round"/><path d="m261 203 7 6 13-14" stroke={accent} strokeWidth="3" strokeLinecap="round"/></g>
      </>}
      <g transform="rotate(24 306 142)"><path d="M302 75h9v118l-4.5 14-4.5-14V75Z" fill={accent}/><path d="M302 193h9l-4.5 14-4.5-14Z" fill="#d6b68b"/><path d="m305 202 1.5 5 1.5-5" fill="#142343"/><rect x="302" y="68" width="9" height="13" rx="3" fill="#d4b1a3"/></g>
      <path d="M47 101c12 0 17-7 17-18 0 11 5 18 17 18-12 0-17 7-17 18 0-11-5-18-17-18Z" fill={accent} opacity=".25"/>
    </svg>
  </div>;
}
