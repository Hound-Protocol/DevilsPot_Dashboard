/* Veřejná stránka dotazníku DevilsPot */
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const TYPE={1:"radio",2:"check",3:"scale",4:"radio",5:"check",6:"check",7:"radio",8:"radio",9:"check3",10:"check",11:"scale",12:"radio",13:"check",14:"radio",15:"radio",16:"radio",17:"text",18:"text",19:"email"};
const REQ=[1,3,4,8,14];
const QM={};QUEST.forEach(([sec,qs])=>qs.forEach(q=>QM[q[0]]={n:q[0],t:q[1],ty:q[2],o:q[3]}));
// kroky: oddíly A–C, volitelné cenové pásmo, oddíly D–G
const STEPS=[];QUEST.forEach(([sec,qs],i)=>{STEPS.push({title:sec,qs:qs.map(q=>q[0])});if(i===2)STEPS.push({title:"Cena: vaše představa (nepovinné)",vw:true,qs:[]})});
const ans={};let step=0;const t0=Date.now();
const src=(new URLSearchParams(location.search)).get("z")||"";
const SEEN="Ano, už jsem ho jedl/a";
const hint=q=>{const m=/\((.*?)\)/.exec(q.ty);return m?m[1]:q.ty};

function qHTML(n){
 const q=QM[n],ty=TYPE[n],req=REQ.includes(n);
 let body="";
 const name="q"+n;
 if(ty==="radio")body=`<div class="opts">${q.o.map((o,i)=>`<label class="opt"><input type="radio" name="${name}" value="${esc(o)}" ${ans[n]===o?"checked":""}><span>${esc(o)}</span></label>`).join("")}</div>`;
 else if(ty==="check"||ty==="check3")body=`<div class="opts">${q.o.map(o=>`<label class="opt"><input type="checkbox" name="${name}" value="${esc(o)}" ${(ans[n]||[]).includes(o)?"checked":""}><span>${esc(o)}</span></label>`).join("")}</div>${ty==="check3"?'<div class="hint">Vyberte nejvýše 3 možnosti.</div>':""}`;
 else if(ty==="scale"){const h=/1 = ([^,]+), 5 = ([^)]+)/.exec(q.ty)||[];body=`<div class="scale">${[1,2,3,4,5].map(i=>`<label class="sc"><input type="radio" name="${name}" value="${i}" ${String(ans[n])===String(i)?"checked":""}><span>${i}</span></label>`).join("")}</div><div class="ends"><span>${esc(h[1]||"")}</span><span>${esc(h[2]||"")}</span></div>`}
 else if(ty==="text")body=`<textarea name="${name}" rows="3" maxlength="800" placeholder="Napište, co vás napadne…">${esc(ans[n]||"")}</textarea>`;
 else if(ty==="email")body=`<input type="email" name="${name}" maxlength="120" placeholder="vas@email.cz" value="${esc(ans[n]||"")}" autocomplete="email"><label class="opt consent"><input type="checkbox" name="consent" ${ans.consent?"checked":""}><span>Souhlasím, že mi DevilsPot pošle e-mail o otevření a zkušebních večerech. Kdykoliv se mohu odhlásit.</span></label>`;
 const hidden=n===2&&ans[1]!==SEEN?' style="display:none"':"";
 return `<fieldset class="q" data-n="${n}"${hidden}><legend>${n}. ${esc(q.t)}${req?' <em class="rq">*</em>':""}</legend>${ty==="radio"||ty==="check"?`<div class="hint">${esc(hint(q))}</div>`:""}${body}<div class="err" id="e${n}"></div></fieldset>`;
}
function vwHTML(){return `<p class="lead">Čtyři krátké otázky o ceně. Napište částku v korunách na osobu (jen jídlo, bez alkoholu). Pokud si nejste jistí, přeskočte.</p>${QVW.map((t,i)=>`<fieldset class="q"><legend>${esc(t)}</legend><div class="kc"><input type="number" inputmode="numeric" min="0" max="5000" step="10" name="vw${i+1}" value="${esc(ans["vw"+(i+1)]||"")}" placeholder="např. 450"><span>Kč</span></div></fieldset>`).join("")}`}

function render(){
 const s=STEPS[step],last=step===STEPS.length-1;
 const pct=Math.round(100*step/STEPS.length);
 $("#card").innerHTML=`<div class="prog"><i style="width:${pct}%"></i></div><div class="stp">Krok ${step+1} z ${STEPS.length}</div><h2>${esc(s.title)}</h2><form id="f" novalidate>${s.vw?vwHTML():s.qs.map(qHTML).join("")}<input type="text" name="hp" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true"></form><div class="nav">${step>0?'<button type="button" class="btn ghost" id="back">← Zpět</button>':"<span></span>"}<button type="button" class="btn" id="next">${last?"Odeslat 🔥":"Pokračovat →"}</button></div><div class="err" id="ge"></div>`;
 $("#back")&&($("#back").onclick=()=>{collect();step--;render();toTop()});
 $("#next").onclick=()=>{collect();if(!validate())return;if(last)submit();else{step++;render();toTop()}};
 // podmíněná otázka 2
 document.querySelectorAll('input[name="q1"]').forEach(r=>r.addEventListener("change",()=>{collect();const f=document.querySelector('fieldset[data-n="2"]');if(f){f.style.display=ans[1]===SEEN?"":"none";if(ans[1]!==SEEN)delete ans[2]}}));
 // max 3 u otázky 9
 document.querySelectorAll('input[name="q9"]').forEach(c=>c.addEventListener("change",()=>{const on=[...document.querySelectorAll('input[name="q9"]:checked')];if(on.length>3){c.checked=false;$("#e9").textContent="Nejvýše 3 možnosti."}else $("#e9").textContent=""}));
}
const toTop=()=>window.scrollTo({top:0,behavior:"smooth"});
function collect(){
 const f=$("#f");if(!f)return;
 const s=STEPS[step];
 if(s.vw){for(let i=1;i<=4;i++){const el=f.elements["vw"+i];ans["vw"+i]=el?el.value.trim():""}return}
 s.qs.forEach(n=>{const ty=TYPE[n],nm="q"+n;
  if(ty==="radio"||ty==="scale"){const c=f.querySelector(`input[name="${nm}"]:checked`);if(c)ans[n]=c.value;else delete ans[n]}
  else if(ty==="check"||ty==="check3"){const a=[...f.querySelectorAll(`input[name="${nm}"]:checked`)].map(x=>x.value);if(a.length)ans[n]=a;else delete ans[n]}
  else if(ty==="text"){const v=f.elements[nm].value.trim();if(v)ans[n]=v;else delete ans[n]}
  else if(ty==="email"){const v=f.elements[nm].value.trim();if(v)ans[n]=v;else delete ans[n];ans.consent=f.elements.consent.checked}
 });
 ans.hp=f.elements.hp.value;
}
function validate(){
 const s=STEPS[step];let ok=true;
 document.querySelectorAll(".err").forEach(e=>e.textContent="");
 s.qs.forEach(n=>{
  if(REQ.includes(n)&&ans[n]==null){const e=$("#e"+n);if(e)e.textContent="Tuto otázku prosím vyplňte.";ok=false}
  if(TYPE[n]==="email"&&ans[n]){if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(ans[n])){$("#e"+n).textContent="Zadejte platný e-mail.";ok=false}else if(!ans.consent){$("#e"+n).textContent="Pro odeslání e-mailu je potřeba souhlas.";ok=false}}
 });
 if(!ok){$("#ge").textContent="Zkontrolujte prosím označené otázky.";const f=document.querySelector(".err:not(:empty)");f&&f.scrollIntoView({behavior:"smooth",block:"center"})}
 return ok;
}
async function submit(){
 const b=$("#next");b.disabled=true;b.textContent="Odesílám…";
 const p={t:Math.round((Date.now()-t0)/1000),src,hp:ans.hp||"",consent:!!ans.consent&&!!ans[19]};
 for(let i=1;i<=19;i++)p["q"+i]=ans[i]==null?"":ans[i];
 for(let i=1;i<=4;i++)p["vw"+i]=ans["vw"+i]||"";
 try{
  if(QFORM_URL){await fetch(QFORM_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(p)})}
  else console.info("Testovací režim, odpovědi se neukládají:",p);
  thanks();
 }catch(e){b.disabled=false;b.textContent="Odeslat 🔥";$("#ge").textContent="Odeslání se nepovedlo. Zkontrolujte připojení a zkuste to znovu."}
}
function thanks(){$("#intro").style.display="none";
 $("#card").innerHTML=`<div class="thx"><div class="em">😈</div><h2>${esc(QEND.replace(/\s*🔥\s*$/,""))}</h2><p class="lead">Každá odpověď nám pomáhá. ${QFORM_URL?"":'<br><b>Testovací režim:</b> odpovědi se zatím neukládají.'}</p></div>`;
 toTop();
}
// start
$("#intro").textContent=QINTRO;
if(!QFORM_URL)$("#test").style.display="block";
render();
// uhlíky
(function(){const cv=$("#fx"),x=cv.getContext("2d");let W,H,D=Math.min(devicePixelRatio||1,2),ps=[];
 function rs(){W=innerWidth;H=innerHeight;cv.width=W*D;cv.height=H*D;cv.style.width=W+"px";cv.style.height=H+"px";x.setTransform(D,0,0,D,0,0)}
 addEventListener("resize",rs);rs();
 const N=Math.round(Math.min(90,W/10));
 function mk(i){return{x:Math.random()*W,y:i?Math.random()*H:H+10,s:Math.random()*2.2+.6,v:Math.random()*.8+.3,sw:Math.random()*6.28,sa:Math.random()*.8+.2,h:Math.random()*35+8}}
 for(let i=0;i<N;i++)ps.push(mk(true));
 function f(){if(document.hidden){requestAnimationFrame(f);return}x.clearRect(0,0,W,H);for(const p of ps){p.y-=p.v*(1+(H-p.y)/H*.6);p.sw+=.02;p.x+=Math.sin(p.sw)*p.sa;const a=Math.max(0,Math.min(1,p.y/H*1.25));const g=x.createRadialGradient(p.x,p.y,0,p.x,p.y,p.s*5);g.addColorStop(0,`hsla(${p.h+20},100%,70%,${a})`);g.addColorStop(.4,`hsla(${p.h},100%,55%,${a*.55})`);g.addColorStop(1,`hsla(${p.h-8},100%,40%,0)`);x.fillStyle=g;x.beginPath();x.arc(p.x,p.y,p.s*5,0,6.283);x.fill();if(p.y<-10)Object.assign(p,mk(false))}requestAnimationFrame(f)}
 if(!matchMedia("(prefers-reduced-motion: reduce)").matches)f()})();
