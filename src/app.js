
const $=s=>document.querySelector(s);
const fmt=fmtS;
const num=n=>Math.round(n).toLocaleString("cs-CZ");
const tag=t=>t==="fact"?'<span class="tag fact">zjištěno</span>':t==="est"?'<span class="tag est">k ověření</span>':"";
const cards=a=>`<div class="grid">${a.map(([t,g,l])=>`<div class="card"><h3>${t}${tag(g)}</h3><ul>${l.map(x=>`<li>${x}</li>`).join("")}</ul></div>`).join("")}</div>`;
const cl=v=>v>=0?"pos":"neg";

const V={};
V.prehled=`<h2>Přehled</h2><div class="kpi">${KPI.map(([l,v])=>`<div><small>${l}</small><b>${v}</b></div>`).join("")}<div><small>Harmonogram</small><b id="rp"></b></div></div>
<div class="note"><b>Hlavní zjištění:</b> hotpot ve Zlíně nebyl nalezen, což je příležitost. Při ceně 500 Kč na hosta ale model vychází ztrátově. Cenu je potřeba zvednout na 600 Kč a víc, nebo snížit náklady a investici. Dřív než cokoliv jiného je třeba vyřešit odbornou způsobilost pro hostinskou činnost.</div>${cards(OVERVIEW)}`;
V.trh=`<h2>Trh a konkurence</h2>
<div class="kpi"><div><small>Obyvatelé kraje (30. 6. 2026)</small><b>576 120</b></div><div><small>Okres Zlín (SLDB 2021)</small><b>187 371</b></div><div><small>Studenti UTB</small><b>asi 9 000</b></div><div><small>Mzda v kraji (2Q 2026)</small><b>45 615 Kč</b></div><div><small>Průměr ČR</small><b>51 966 Kč</b></div><div><small>Cizinci v kraji</small><b>27 432</b></div></div>
<div class="card"><h3>Hotpot a konkurence <span class="tag fact">zjištěno</span></h3><div class="tw"><table><tr><th>Podnik</th><th>Formát</th><th>Cena</th><th>Poznámka</th></tr>${COMP.map(([a,b,c,d])=>`<tr><td><b>${a}</b></td><td>${b}</td><td>${c}</td><td>${d}</td></tr>`).join("")}</table></div></div>
<div class="grid"><div class="card"><h3>Co z toho plyne</h3><ul><li>Hotpot se v ČR koncentruje v Praze. Ve Zlíně, Brně ani Ostravě nebyl ve vyhledávání nalezen (nejde o jistotu).</li><li>All-you-can-eat vychází v Praze na 699–800 Kč, talíř na osobu v NALI na 599–699 Kč, menší set pro dva asi 475 Kč na osobu.</li><li>Zlínské mzdy jsou o 12 % pod průměrem ČR, takže pražské ceny nejde bez rizika přenést.</li><li>Většina pražských nabídek se prodává přes vouchery, tj. se slevou 12–24 %.</li></ul></div>
<div class="card"><h3>Návyky zákazníků <span class="tag fact">zjištěno</span></h3><ul><li>Podíl lidí obědvajících v restauraci klesl z 33 % (2024) na 26 % (2025).</li><li>Podíl lidí, kteří si nosí jídlo z domova, vzrostl ze 46 % na 57 %.</li><li>Restaurace patří mezi první výdaje, které lidé omezují.</li></ul></div></div>`;
V.fin=`<h2>Financování bez vlastního kapitálu</h2>${cards(FIN)}<div class="note"><b>Doporučení:</b> nejdřív zkušební provoz a hotová čísla, pak banka. Banka chce plán, rozpočet, předpověď příjmů a výdajů (cash flow) a ideálně doložit poptávku.</div><div class="card"><h3>Co banka obvykle chce <span class="tag est">odhad</span></h3><ul>${BANK.map(x=>`<li>${x}</li>`).join("")}</ul></div>`;
V.calc=`<h2>Finance (modelový scénář)</h2><div class="note">Všechna čísla jsou <b>odhady</b>, ne zjištěná fakta. Ceny hostů jsou s DPH 12 %, model počítá s plátcovstvím DPH. Přepočítají se, jakmile budou nabídky dodavatelů a nájmů.</div>
<div class="grid"><div class="card"><h3>Startovní investice</h3><table>${INV.map(([l,v])=>`<tr><td>${l}</td><td style="text-align:right">${fmt(v)}</td></tr>`).join("")}</table><p class="res">Celkem: ${fmt(invT)}</p></div>
<div class="card"><h3>Stálé měsíční náklady</h3><table>${FIXED.map(([l,v])=>`<tr><td>${l}</td><td style="text-align:right">${fmt(v)}</td></tr>`).join("")}</table><p class="res">Celkem: ${fmt(fixT)}</p></div>
<div class="card"><h3>Předpoklady a úvěr</h3><table><tr><td>Míst k sezení</td><td style="text-align:right">${M.seats}</td></tr><tr><td>Kolikrát se stůl za den vystřídá</td><td style="text-align:right">${M.turns}</td></tr><tr><td>Provozních dní / měsíc</td><td style="text-align:right">${M.days}</td></tr><tr><td>Průměrná útrata na hosta (s DPH)</td><td style="text-align:right">${fmt(M.price)}</td></tr><tr><td>Suroviny z tržeb (bez DPH)</td><td style="text-align:right">${Math.round(M.food*100)} %</td></tr><tr><td>Úvěr (100 % investice)</td><td style="text-align:right">${fmt(P)}</td></tr><tr><td>Sazba / splatnost</td><td style="text-align:right">${M.rate*100} % / ${M.years} let</td></tr></table><p class="res">Splátka: ${fmt(pay)} / měs</p></div></div>
<div class="card"><h3>Scénáře při ceně ${fmt(M.price)} na hosta (měsíčně)</h3><div class="tw"><table><tr><th></th>${scen.map(s=>`<th>${s.name} (${Math.round(s.occ*100)} %)</th>`).join("")}</tr>
<tr><td>Hostů</td>${scen.map(s=>`<td>${num(s.g)}</td>`).join("")}</tr>
<tr><td>Tržby s DPH</td>${scen.map(s=>`<td>${fmt(s.rev)}</td>`).join("")}</tr>
<tr><td>Tržby bez DPH</td>${scen.map(s=>`<td>${fmt(s.net)}</td>`).join("")}</tr>
<tr><td>Zbývá po odečtení surovin</td>${scen.map(s=>`<td>${fmt(s.gm)}</td>`).join("")}</tr>
<tr><td><b>Zisk po splátce</b> (před daní)</td>${scen.map(s=>`<td class="${cl(s.profit)}"><b>${fmt(s.profit)}</b></td>`).join("")}</tr></table></div></div>
<div class="card"><h3>Jak moc záleží na ceně</h3><div class="tw"><table><tr><th>Průměrná útrata</th><th>Hostů k vyrovnání / měs</th><th>Potřebná obsazenost</th><th>Zisk při 45 %</th></tr>${PRICES.map(p=>{const b=beGuests(p),c=calc(.45,p);return`<tr><td>${fmt(p)}</td><td>${num(b)}</td><td>${Math.round(100*b/capMonth)} %</td><td class="${cl(c.profit)}">${fmt(c.profit)}</td></tr>`}).join("")}</table></div>
<p class="small">Kapacita modelu je ${num(capMonth)} hostů měsíčně. Závěr: pražská úroveň cen (600–700 Kč) model výrazně zlepšuje, ale ve Zlíně je nižší kupní síla. Cenu a menu je proto třeba ověřit zkušebním provozem.</p></div>`;
V.mkt=`<h2>Marketingový plán</h2>${cards(MKT)}`;
V.prov=`<h2>Provoz a menu</h2>${cards(PROV)}`;
V.pravo=`<h2>Právo, daně, povolení</h2><div class="note">Informace nejsou právní ani účetní poradenství. Před rozhodnutím je nutné vše ověřit s účetní, daňovým poradcem a na úřadech.</div>${cards(LAW)}`;
const tot=ROAD.reduce((a,p)=>a+p[1].length,0), dn=ROAD.reduce((a,p)=>a+p[1].filter(x=>x[1]==="done").length,0), pct=Math.round(100*dn/tot);
const ST={done:"✅",doing:"🔥",todo:"⬜"};
V.road=`<h2>Harmonogram</h2><div class="bar"><i style="--w:${pct}%"></i></div><p class="small">Splněno ${dn} z ${tot} (${pct} %).</p>${ROAD.map(([t,it])=>`<div class="card" style="margin-bottom:14px"><h3>${t}</h3>${it.map(([x,s])=>`<label class="chk ${s==="done"?"done":""}"><span style="width:22px">${ST[s]}</span><span>${x}</span></label>`).join("")}</div>`).join("")}`;
V.zdroje=`<h2>Zdroje</h2><p class="small">Údaje v dashboardu vycházejí z těchto veřejných zdrojů (stav k ${UPDATED}).</p><div class="grid">${SRC.map(([t,l])=>`<div class="card"><h3>${t}</h3><ul>${l.map(([a,u])=>`<li><a href="${u}" target="_blank" rel="noopener">${a}</a></li>`).join("")}</ul></div>`).join("")}</div>`;
V.otazky=`<h2>Otevřené otázky</h2><div class="grid">${ASK.map(([t,l])=>`<div class="card"><h3>${t}</h3><ul>${l.map(x=>`<li>${x}</li>`).join("")}</ul></div>`).join("")}</div>`;


/* ---------- společné renderery bloků ---------- */
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const rich=s=>esc(s).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");
const tabl=(head,rows)=>`<div class="tw"><table><tr>${head.map(h=>`<th>${rich(h)}</th>`).join("")}</tr>${rows.map(r=>`<tr>${r.map(c=>`<td>${rich(c)}</td>`).join("")}</tr>`).join("")}</table></div>`;
function blockHTML(b){
 switch(b.t){
  case"p":return `<p>${rich(b.x)}</p>`;
  case"h":return `<h5>${rich(b.x)}</h5>`;
  case"ul":return `<ul>${b.x.map(i=>`<li>${rich(i)}</li>`).join("")}</ul>`;
  case"ol":return `<ol>${b.x.map(i=>`<li>${rich(i)}</li>`).join("")}</ol>`;
  case"note":return `<div class="note">${rich(b.x)}</div>`;
  case"table":return tabl(b.head,b.rows);
  case"links":return `<ul>${b.x.map(([a,u])=>`<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(a)}</a></li>`).join("")}</ul>`;
  case"quest":{const [n,t,ty,o]=b.q;return `<div class="q"><b>${n}. ${rich(t)}</b> <span class="small">(${rich(ty)})</span>${o.length?`<ul>${o.map(x=>`<li>${rich(x)}</li>`).join("")}</ul>`:""}</div>`}
 }return "";
}
const chapHTML=(c,i,label)=>`<div class="card chap" id="ch-${c.id}"><h3>${label||(i+1)+". "+esc(c.title)}</h3>${c.b.map(blockHTML).join("")}</div>`;

/* ---------- Podnikový plán (dokument + stažení do Wordu) ---------- */
V.plan=`<h2>Podnikový plán</h2>
<div class="card dlbar"><div><b>Podnikatelský plán DevilsPot</b><br><span class="small">Aktuální dokument ke stažení. Vždy odpovídá obsahu dashboardu (stav ${UPDATED}).</span></div><button type="button" id="dl" class="dlbtn">⬇ Stáhnout do Wordu (.docx)</button></div><p class="small" id="dlmsg"></p>
<div class="toc">${PLAN_DOC.map((c,i)=>`<button type="button" data-go="ch-${c.id}">${i+1}. ${esc(c.title)}</button>`).join("")}${PLAN_APPX.map(c=>`<button type="button" data-go="ch-${c.id}">${esc(c.title)}</button>`).join("")}</div>
${PLAN_DOC.map((c,i)=>chapHTML(c,i)).join("")}${PLAN_APPX.map((c,i)=>chapHTML(c,i,esc(c.title))).join("")}`;

/* ---------- Dotazník ---------- */
V.dotaznik=`<h2>Zákaznický dotazník</h2>
<div class="note">Připraveno ke zkopírování do Google Forms nebo Microsoft Forms. Vyplnění zabere asi 3 minuty, dotazník je anonymní, e-mail je nepovinný. Je také přílohou A podnikového plánu.</div>
<div class="card chap"><h3>Úvodní text pro respondenty</h3><p>${esc(QINTRO)}</p></div>
${QUEST.map(([sec,qs])=>`<div class="card chap"><h3>${esc(sec)}</h3>${qs.map(q=>blockHTML({t:"quest",q})).join("")}</div>`).join("")}
<div class="card chap"><h3>Volitelný blok: cenové pásmo (Van Westendorp)</h3><p>Čtyři otevřené otázky s číselnou odpovědí. Z odpovědí se spočítá cenové pásmo, které zákazníci považují za přijatelné.</p><ol>${QVW.map(x=>`<li>${esc(x)}</li>`).join("")}</ol></div>
<div class="card chap"><h3>Závěrečný text</h3><p>${esc(QEND)}</p></div>
<div class="grid"><div class="card"><h3>Jak dotazník rozeslat</h3><ul>${QDIST.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div><div class="card"><h3>Jak výsledky vyhodnotit</h3><ul>${QEVAL.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div>
<div class="card chap"><h3>Terénní ověření: co přesně <span class="tag est">k provedení</span></h3>${tabl(["Oblast","Co zjistit"],FIELD.map(f=>[f[0],f[1]]))}</div>
<div class="card chap"><h3>Výsledky</h3><p>Zatím nejsou k dispozici. Doplní se po vyhodnocení.</p></div>`;

/* ---------- Nábor brigádníků ---------- */
V.brig=`<h2>Zásady zaměstnávání a nábor brigádníků</h2>
<div class="note"><b>${esc(ZAS_MOTTO)}</b></div>
<div class="card chap"><h3>Zásady a jak je naplníme</h3>${tabl(["Zásada","Jak ji naplníme"],ZAS.map(z=>[z[0],z[1]]))}</div>
<h2 style="margin-top:22px">Nábor studentů UTB</h2>
${cards(BRIG)}
<div class="card chap"><h3>Smluvní formy a limity (2026)</h3>${tabl(["Parametr","DPP","DPČ"],[["Rozsah práce","300 hodin ročně u zaměstnavatele","Nejvýše polovina týdenní pracovní doby (20 h týdně)"],["Odvody pojistného","Do 11 999 Kč měsíčně u jednoho zaměstnavatele nevznikají","Do 4 499 Kč měsíčně nevznikají"],["Forma","Písemná dohoda","Písemná dohoda"],["Minimální hodinová mzda","134,40 Kč","134,40 Kč"],["Od 1. 1. 2027","Limit 12 500 Kč","Limit 5 000 Kč"]])}</div>
<div class="card chap"><h3>Kolik studentů je potřeba <span class="tag est">modelový odhad</span></h3>${tabl(["Položka","Hodnota"],BRIG_CALC)}<p class="small">Model počítá se mzdovými náklady ${fmtS(FIXED[2][1])} měsíčně včetně odvodů. Při ${brigRate} Kč/h vychází hrubá mzda ${fmtS(brigH*brigRate)} a odvody u DPČ ji mohou zvýšit, proto je třeba mzdové náklady v modelu upřesnit s mzdovou účetní.</p></div>
<div class="grid"><div class="card"><h3>Postup náboru</h3><ol>${BRIG_STEPS.map(x=>`<li>${esc(x)}</li>`).join("")}</ol></div><div class="card"><h3>Návrh inzerátu</h3><p>${esc(BRIG_AD)}</p></div><div class="card"><h3>Co ještě zjistit</h3><ul>${BRIG_TODO.concat(ZAS_TODO).map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div></div>`;

/* ---------- Rozhodnutí ---------- */
V.rozh=`<h2>Přehled rozhodnutí</h2><p class="small">Záznam toho, co jsme se domluvili. Je také přílohou B podnikového plánu.</p><div class="card chap">${tabl(["Datum","Rozhodnutí"],DECISIONS.map(d=>[d[0],d[1]]))}</div>`;

/* Terénní ověření do harmonogramu */
const _road=V.road;
V.road=_road+`<div class="card chap"><h3>Terénní ověření: co přesně</h3><p>Terénní ověření znamená zjistit věci osobně ve Zlíně, protože je online vyhledávání nepotvrdí.</p>${tabl(["Oblast","Co zjistit"],FIELD.map(f=>[f[0],f[1]]))}</div>`;

/* ---------- Word (.docx) ---------- */
function loadDocx(){return new Promise((res,rej)=>{if(window.docx)return res(window.docx);const s=document.createElement("script");s.src="vendor/docx.umd.js";s.onload=()=>window.docx?res(window.docx):rej(new Error("docx"));s.onerror=()=>rej(new Error("load"));document.head.appendChild(s)})}
async function buildDocx(){
 const D=await loadDocx();
 const {Document,Packer,Paragraph,TextRun,HeadingLevel,Table,TableRow,TableCell,WidthType,ShadingType,AlignmentType,Footer,Header,PageNumber,ExternalHyperlink,BorderStyle,PageBreak,LevelFormat}=D;
 const FONT="Calibri", W=9638;
 const runs=(text,o={})=>String(text).split(/(\*\*.+?\*\*)/g).filter(Boolean).map(part=>{const m=/^\*\*(.+)\*\*$/.exec(part);return new TextRun({text:m?m[1]:part,bold:!!m||o.bold,color:o.color,size:o.size,font:FONT,italics:o.italics})});
 const P=(text,o={})=>new Paragraph({children:runs(text,o),spacing:{after:o.after==null?120:o.after,before:o.before||0,line:276},alignment:o.align,keepNext:o.keepNext,shading:o.fill?{type:ShadingType.CLEAR,fill:o.fill,color:"auto"}:undefined,border:o.leftBorder?{left:{style:BorderStyle.SINGLE,size:24,color:"E03A2B",space:8}}:undefined,indent:o.leftBorder?{left:200}:undefined});
 const H1=t=>new Paragraph({heading:HeadingLevel.HEADING_1,children:[new TextRun({text:t,font:FONT})],keepNext:true,pageBreakBefore:false});
 const H2=t=>new Paragraph({heading:HeadingLevel.HEADING_2,children:[new TextRun({text:t,font:FONT})],keepNext:true});
 const border={style:BorderStyle.SINGLE,size:4,color:"D9C4BC"};
 const borders={top:border,bottom:border,left:border,right:border};
 const table=(head,rows)=>{const n=head.length;const w=Math.floor(W/n);const cell=(t,h)=>new TableCell({width:{size:w,type:WidthType.DXA},borders,shading:h?{type:ShadingType.CLEAR,fill:"F6D9CF",color:"auto"}:undefined,margins:{top:60,bottom:60,left:100,right:100},children:[P(t,{after:0,size:19,bold:h})]});
  return new Table({width:{size:W,type:WidthType.DXA},columnWidths:Array(n).fill(w),rows:[new TableRow({tableHeader:true,cantSplit:true,children:head.map(h=>cell(h,true))}),...rows.map(r=>new TableRow({cantSplit:true,children:r.map(c=>cell(c,false))}))]})};
 let olInst=0;
 const blocks=b=>{
  switch(b.t){
   case"p":return [P(b.x)];
   case"h":return [H2(b.x)];
   case"note":return [P(b.x,{fill:"FDECE6",leftBorder:true,italics:false,before:60,after:160})];
   case"ul":return b.x.map(i=>new Paragraph({children:runs(i),bullet:{level:0},spacing:{after:60,line:276}}));
   case"ol":{const inst=++olInst;return b.x.map(i=>new Paragraph({children:runs(i),numbering:{reference:"ol",level:0,instance:inst},spacing:{after:60,line:276}}))}
   case"table":return [table(b.head,b.rows),P("",{after:120})];
   case"links":return b.x.map(([a,u])=>new Paragraph({children:[new ExternalHyperlink({link:u,children:[new TextRun({text:a,style:"Hyperlink",font:FONT,color:"0563C1",underline:{}})]})],bullet:{level:0},spacing:{after:60}}));
   case"quest":{const [n,t,ty,o]=b.q;const out=[new Paragraph({children:[new TextRun({text:n+". "+t,bold:true,font:FONT}),new TextRun({text:"  ("+ty+")",italics:true,color:"6B6B6B",font:FONT,size:19})],spacing:{before:100,after:40},keepNext:true})];o.forEach(x=>out.push(new Paragraph({children:runs(x),bullet:{level:0},spacing:{after:20}})));return out}
  }return []};
 const kids=[];
 kids.push(new Paragraph({spacing:{before:2600},children:[new TextRun({text:PLAN_META.title,bold:true,size:112,color:"C0261A",font:FONT})]}));
 kids.push(new Paragraph({spacing:{after:300},children:[new TextRun({text:PLAN_META.sub,size:40,color:"3A2A24",font:FONT})]}));
 PLAN_META.lines.forEach(l=>kids.push(P(l,{size:24,color:"555555",after:60})));
 kids.push(new Paragraph({children:[new PageBreak()]}));
 kids.push(H1("Obsah"));
 PLAN_DOC.forEach((c,i)=>kids.push(P((i+1)+". "+c.title,{after:40})));
 PLAN_APPX.forEach(c=>kids.push(P(c.title,{after:40})));
 kids.push(new Paragraph({children:[new PageBreak()]}));
 PLAN_DOC.forEach((c,i)=>{kids.push(H1((i+1)+". "+c.title));c.b.forEach(b=>kids.push(...blocks(b)))});
 PLAN_APPX.forEach(c=>{kids.push(new Paragraph({children:[new PageBreak()]}));kids.push(H1(c.title));c.b.forEach(b=>kids.push(...blocks(b)))});
 const doc=new Document({
  creator:"DevilsPot",title:"DevilsPot – Podnikatelský plán",description:"Pracovní verze k "+UPDATED,
  styles:{default:{document:{run:{font:FONT,size:22}}},paragraphStyles:[
   {id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:34,bold:true,color:"B3261E",font:FONT},paragraph:{spacing:{before:360,after:160},outlineLevel:0}},
   {id:"Heading2",name:"Heading 2",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:26,bold:true,color:"C2410C",font:FONT},paragraph:{spacing:{before:240,after:100},outlineLevel:1}}]},
  numbering:{config:[{reference:"ol",levels:[{level:0,format:LevelFormat.DECIMAL,text:"%1.",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:720,hanging:360}}}}]}]},
  sections:[{properties:{page:{margin:{top:1134,bottom:1134,left:1134,right:1134}}},
   headers:{default:new Header({children:[new Paragraph({alignment:AlignmentType.RIGHT,children:[new TextRun({text:"DevilsPot – podnikatelský plán",size:18,color:"888888",font:FONT})]})]})},
   footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:"Strana ",size:18,color:"888888",font:FONT}),new TextRun({children:[PageNumber.CURRENT],size:18,color:"888888",font:FONT})]})]})},
   children:kids}]});
 return Packer.toBlob(doc);
}
async function downloadWord(){
 const btn=$("#dl"),msg=$("#dlmsg");if(!btn)return;btn.disabled=true;const old=btn.textContent;btn.textContent="Připravuji dokument…";msg.textContent="";
 try{
  const blob=await buildDocx();
  const d=new Date(),ds=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="DevilsPot_podnikatelsky_plan_"+ds+".docx";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500);
  msg.textContent="Dokument byl stažen: "+a.download;
 }catch(e){msg.textContent="Stažení se nepodařilo ("+(e&&e.message||e)+"). Zkuste stránku obnovit.";}
 btn.disabled=false;btn.textContent=old;
}

/* ---------- navigace ---------- */
const nav=$("#nav"),main=$("#main");$("#upd").textContent=UPDATED;
function show(id){main.innerHTML=`<section class="on">${V[id]}</section>`;nav.querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.id===id));
 const rp=$("#rp");if(rp)rp.textContent=dn+" / "+tot;
 const dl=$("#dl");if(dl)dl.onclick=downloadWord;
 main.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{const el=document.getElementById(b.dataset.go);el&&el.scrollIntoView({behavior:"smooth",block:"start"})});
 requestAnimationFrame(()=>document.querySelectorAll(".bar i").forEach(i=>i.style.width=getComputedStyle(i).getPropertyValue("--w")));
 try{location.hash=id}catch(e){}window.scrollTo({top:0,behavior:"smooth"})}
TABS.forEach(([id,t])=>{const b=document.createElement("button");b.textContent=t;b.dataset.id=id;b.onclick=()=>show(id);nav.appendChild(b)});
const h0=(location.hash||"").slice(1);show(TABS.some(t=>t[0]===h0)?h0:"prehled");
window.addEventListener("hashchange",()=>{const x=location.hash.slice(1);if(TABS.some(t=>t[0]===x))show(x)});

// spotlight na kartách
document.addEventListener("pointermove",e=>{const c=e.target.closest&&e.target.closest(".card");if(c){const b=c.getBoundingClientRect();c.style.setProperty("--mx",(e.clientX-b.left)+"px");c.style.setProperty("--my",(e.clientY-b.top)+"px")}});

// žhavé uhlíky
(function(){const cv=$("#fx"),x=cv.getContext("2d");let W,H,D=Math.min(devicePixelRatio||1,2),ps=[],mx=-1,my=-1;
 function rs(){W=innerWidth;H=innerHeight;cv.width=W*D;cv.height=H*D;cv.style.width=W+"px";cv.style.height=H+"px";x.setTransform(D,0,0,D,0,0)}
 addEventListener("resize",rs);rs();addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY});
 const N=Math.round(Math.min(130,W/9));
 function mk(init){return{x:Math.random()*W,y:init?Math.random()*H:H+10,s:Math.random()*2.4+.6,v:Math.random()*.9+.35,sw:Math.random()*Math.PI*2,sa:Math.random()*.9+.2,l:Math.random(),h:Math.random()*35+8}}
 for(let i=0;i<N;i++)ps.push(mk(true));
 function f(){x.clearRect(0,0,W,H);for(const p of ps){p.y-=p.v*(1+(H-p.y)/H*.6);p.sw+=.02;p.x+=Math.sin(p.sw)*p.sa;
  if(mx>0){const dx=p.x-mx,dy=p.y-my,d=dx*dx+dy*dy;if(d<14000){p.x+=dx/Math.sqrt(d+1)*1.4;p.y+=dy/Math.sqrt(d+1)*.8}}
  const a=Math.max(0,Math.min(1,(p.y/H)*1.25));
  const g=x.createRadialGradient(p.x,p.y,0,p.x,p.y,p.s*5);g.addColorStop(0,`hsla(${p.h+20},100%,70%,${a})`);g.addColorStop(.4,`hsla(${p.h},100%,55%,${a*.55})`);g.addColorStop(1,`hsla(${p.h-8},100%,40%,0)`);
  x.fillStyle=g;x.beginPath();x.arc(p.x,p.y,p.s*5,0,6.283);x.fill();
  if(p.y<-10||p.x<-20||p.x>W+20)Object.assign(p,mk(false))}
  requestAnimationFrame(f)}
 f()})();

// oznámení o nové verzi
(function(){let seen=null;try{seen=localStorage.getItem("dp_ver")}catch(e){}
 if(seen===VERSION)return;
 const ov=document.createElement("div");ov.className="ov";ov.setAttribute("role","dialog");ov.setAttribute("aria-modal","true");
 ov.innerHTML=`<div class="mb"><div class="em">😈</div><h4>Nová pekelná verze je online!</h4><ul>${WHATS_NEW.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><button type="button" id="ign">Zažehni mě, synku</button><div class="mv">verze ${VERSION}</div></div>`;
 document.body.appendChild(ov);document.body.style.overflow="hidden";
 const go=()=>{try{localStorage.setItem("dp_ver",VERSION)}catch(e){}ov.classList.add("out");document.body.style.overflow="";setTimeout(()=>ov.remove(),700)};
 ov.querySelector("#ign").onclick=go;
 setTimeout(()=>{const b=ov.querySelector("#ign");b&&b.focus()},300);
})();
