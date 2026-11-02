const NEXT=ROAD.flatMap(([t,it])=>it.filter(x=>x[1]!=="done").map(x=>x[0])).slice(0,6);

const $=s=>document.querySelector(s);
const fmt=fmtS;
const num=n=>Math.round(n).toLocaleString("cs-CZ");
const tag=t=>t==="fact"?'<span class="tag fact">zjištěno</span>':t==="est"?'<span class="tag est">k ověření</span>':"";
const cards=a=>`<div class="grid">${a.map(([t,g,l])=>`<div class="card"><h3>${t}${tag(g)}</h3><ul>${l.map(x=>`<li>${x}</li>`).join("")}</ul></div>`).join("")}</div>`;
const cl=v=>v>=0?"pos":"neg";

const V={};
V.prehled=`<h2>Přehled</h2><div class="kpi">${KPI.map(([l,v])=>`<div><small>${l}</small><b>${v}</b></div>`).join("")}<div><small>Harmonogram</small><b id="rp"></b></div></div>
<div class="note"><b>Hlavní zjištění:</b> hotpot ve Zlíně nebyl nalezen, což je příležitost. Při ceně 500 Kč na hosta ale model vychází ztrátově. Cenu je potřeba zvednout na 600 Kč a víc, nebo snížit náklady a investici. Dřív než cokoliv jiného je třeba na živnostenském úřadě potvrdit, že Filipovo vyučení a praxe stačí pro hostinskou činnost.</div><div class="card chap"><h3>Nejbližší kroky</h3><ol>${NEXT.map(x=>`<li>${x}</li>`).join("")}</ol></div>${cards(OVERVIEW)}`;
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
<div class="card dlbar"><div><b>Dotazník ke stažení</b><br><span class="small">Word dokument připravený ke zkopírování do Google Forms nebo Microsoft Forms.</span></div><button type="button" id="dlq" class="dlbtn">⬇ Stáhnout dotazník (.docx)</button></div><p class="small" id="dlqmsg"></p>
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


/* ---------- graf, rozjezd, SWOT, slovníček ---------- */
function chartSVG(){
 const W=640,H=300,pl=58,pr=16,pt=14,pb=36,x0=.25,x1=.7,ymin=-150000,ymax=150000;
 const sx=o=>pl+(o-x0)/(x1-x0)*(W-pl-pr), sy=v=>pt+(ymax-v)/(ymax-ymin)*(H-pt-pb);
 const cols={450:"#ff5a47",500:"#ffc233",600:"#5be28a",700:"#6cb6ff"};
 let g="";
 for(let v=ymin;v<=ymax;v+=50000){g+=`<line x1="${pl}" x2="${W-pr}" y1="${sy(v)}" y2="${sy(v)}" stroke="rgba(255,255,255,${v===0?.55:.1})" ${v===0?"":'stroke-dasharray="3 4"'}/><text x="${pl-8}" y="${sy(v)+4}" text-anchor="end">${v/1000} tis.</text>`}
 for(let o=x0;o<=x1+1e-9;o+=.05){g+=`<text x="${sx(o)}" y="${H-14}" text-anchor="middle">${Math.round(o*100)} %</text>`}
 PRICES.forEach(p=>{const pts=[];for(let o=x0;o<=x1+1e-9;o+=.05){const v=Math.max(ymin,Math.min(ymax,calc(o,p).profit));pts.push(sx(o).toFixed(1)+","+sy(v).toFixed(1))}g+=`<polyline fill="none" stroke="${cols[p]}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" points="${pts.join(" ")}"/>`});
 const mv=calc(.45,M.price).profit;g+=`<circle cx="${sx(.45)}" cy="${sy(mv)}" r="5.5" fill="#fff" stroke="#ff2d1a" stroke-width="2.5"/><text x="${sx(.45)+9}" y="${sy(mv)-8}" style="fill:#fff">model</text>`;
 g+=`<text x="${(pl+W-pr)/2}" y="${H-1}" text-anchor="middle">Obsazenost</text>`;
 return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Měsíční zisk po splátce podle obsazenosti pro ceny 450 až 700 Kč">${g}</svg><div class="legend">${PRICES.map(p=>`<span><i style="background:${cols[p]}"></i>${p} Kč na hosta</span>`).join("")}</div>`;
}
(function(){
 const rp=ramp();
 const tail=`<div class="card chap"><h3>Zisk po splátce podle obsazenosti a ceny <span class="tag est">odhad</span></h3><p class="small">Měsíční zisk před daní. Čára nula je hranice, nad kterou je provoz v plusu. Bod „model“ je základní scénář (45 %, ${fmtS(M.price)}).</p>${chartSVG()}</div>
 <div class="grid"><div class="card"><h3>Jednotková ekonomika hosta <span class="tag est">odhad</span></h3>${tabl(["Položka","Hodnota"],unit(M.price))}</div>
 <div class="card"><h3>Rozjezd prvního roku <span class="tag est">odhad</span></h3><p class="small">Obsazenost roste z ${Math.round(RAMP.start*100)} % na ${Math.round(RAMP.target*100)} % během ${RAMP.months} měsíců, cena ${fmtS(M.price)}. Po splátce, před daní.</p>${tabl(["Měsíc","Obsazenost","Zisk","Kumulativně"],rp.rows.map(r=>[r.m+"",Math.round(r.occ*100)+" %",fmtS(r.profit),fmtS(r.cum)]))}
 <p class="small">Nejhlubší propad: <b>${fmtS(rp.min)}</b>. Rezerva v investici: ${fmtS(INV[5][1])}. ${rp.min+INV[5][1]>=0?"Rezerva propad pokryje.":"Rezerva propad nepokryje, je třeba ji navýšit nebo snížit náklady."}</p></div></div>`;
 V.calc+=tail;
 V.trh+=`<h2 style="margin-top:22px">SWOT analýza <span class="tag est">návrh</span></h2><div class="swot">${SWOT.map(([t,l])=>`<div class="card"><h3>${t}</h3><ul>${l.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>`;
 V.slov=`<h2>Slovníček pojmů</h2><p class="small">Vysvětlení odborných výrazů použitých v dashboardu a plánu. Je také přílohou C podnikového plánu.</p><div class="card chap">${tabl(["Pojem","Vysvětlení"],GLOSS)}</div>`;
})();


/* ---------- Digitální dotazník ---------- */
const QCH=[["Hlavní odkaz",""],["Plakát a leták","plakat"],["Instagram","ig"],["Facebook","fb"],["Koleje a menza","kolej"],["Osobně (tablet)","osobne"]];
const QCHF={"":"hlavni",plakat:"plakat",ig:"instagram",fb:"facebook",kolej:"kolej",osobne:"osobne"};
const qUrl=z=>SITE_URL+"dotaznik.html"+(z?"?z="+z:"");
const QM2={};QUEST.forEach(([sec,qs])=>qs.forEach(q=>QM2[q[0]]={t:q[1],o:q[3]}));
const SETUP=["Vytvořte novou Google tabulku (sheets.new) na účtu, kde chcete odpovědi mít.","V tabulce otevřete Rozšíření a Apps Script, smažte vše v souboru Code.gs a vložte kód níže.","Klikněte na Nasadit a Nové nasazení, typ „Webová aplikace“. Nastavte Spustit jako: Já a Přístup: Kdokoli.","Povolte oprávnění (Google upozorní na neověřenou aplikaci, zvolte Rozšířené a Pokračovat).","Zkopírujte adresu webové aplikace (končí na /exec) a pošlete ji Claudovi. Ten ji vloží do dashboardu a dotazník se přepne z testovacího režimu do ostrého."];
V.dotaznik=V.dotaznik.replace('<div class="note">',`<div class="card chap" id="digi"><h3>Digitální dotazník <span class="tag ${QFORM_URL?"fact":"est"}">${QFORM_URL?"připojeno":"čeká na připojení"}</span></h3>
<p>Respondenti vyplňují samostatnou stránku (3 minuty, mobil i počítač) <a href="${qUrl("")}" target="_blank" rel="noopener">${qUrl("")}</a>. Odpovědi se ukládají do Google tabulky zakladatelů a souhrn se zobrazuje v sekci Výsledky níže. ${QFORM_URL?"":"Dokud není ukládání připojeno, stránka běží v testovacím režimu a odpovědi se neukládají."}</p>
<div class="tw"><table><tr><th>Kanál</th><th>Odkaz</th><th>QR kód</th></tr>${QCH.map(([n,z])=>`<tr><td><b>${n}</b></td><td><a href="${qUrl(z)}" target="_blank" rel="noopener">${qUrl(z).replace(SITE_URL,"…/")}</a></td><td><a href="assets/qr/qr-${QCHF[z]}.png" download="qr-${QCHF[z]}.png"><img class="qr" src="assets/qr/qr-${QCHF[z]}.png" alt="QR kód: ${n}" width="84" height="84"></a><div class="small">kliknutím stáhnout</div></td></tr>`).join("")}</table></div></div>
<div class="card chap"><h3>Jak zprovoznit ukládání odpovědí <span class="tag est">jednorázově, asi 5 minut</span></h3><ol>${SETUP.map(x=>`<li>${esc(x)}</li>`).join("")}</ol><button type="button" class="dlbtn" id="cpgs">Zkopírovat kód skriptu</button> <span class="small" id="cpmsg"></span><pre class="code" id="gscode">${esc(APPS_SCRIPT)}</pre><p class="small">Soukromí: e-maily a volné odpovědi zůstávají jen v tabulce. Veřejný souhrn obsahuje pouze počty. E-mail respondent zadává dobrovolně a se souhlasem.</p></div>
<div class="card chap" id="qres"><h3>Výsledky <button type="button" class="toc-b" id="qrefresh">↻ Obnovit</button></h3><p class="small" id="qresmsg"></p><div id="qresbody"></div></div>
<div class="note">`);
function bars(counts,total){const e=Object.entries(counts).sort((a,b)=>b[1]-a[1]);if(!e.length)return"<p class='small'>Zatím bez odpovědí.</p>";return e.map(([k,v])=>`<div class="rb"><span>${esc(k)}</span><div class="rbar"><i style="width:${total?Math.round(100*v/total):0}%"></i></div><b>${v} (${total?Math.round(100*v/total):0} %)</b></div>`).join("")}
function renderResults(r){
 const n=r.n||0;const q3=r.q&&r.q[3];const top=q3?(q3.dist[4]+q3.dist[5]):0;
 let h=`<div class="kpi"><div><small>Odpovědí</small><b>${n}</b></div><div><small>Zájem o hotpot (1–5)</small><b>${q3&&q3.avg!=null?q3.avg.toFixed(1).replace(".",","):"–"}</b></div><div><small>Podíl odpovědí 4–5</small><b>${q3&&q3.n?Math.round(100*top/q3.n)+" %":"–"}</b></div><div><small>Cíl odpovědí</small><b>100–200</b></div></div>`;
 const choice=[1,2,4,5,6,7,8,9,10,12,13,14,15,16];
 h+=`<div class="grid">`+choice.map(c=>`<div class="card"><h3>${c}. ${esc(QM2[c].t)}</h3>${bars(r.q[c]||{},n)}</div>`).join("")+`</div>`;
 h+=`<div class="grid">`+[3,11].map(c=>{const x=r.q[c]||{};const d=x.dist||{};const o={};for(let i=1;i<=5;i++)o[i]=d[i]||0;return `<div class="card"><h3>${c}. ${esc(QM2[c].t)}</h3>${bars(o,x.n||0)}<p class="small">Průměr: ${x.avg!=null?x.avg.toFixed(2).replace(".",","):"–"}</p></div>`}).join("")+`<div class="card"><h3>Cenové pásmo (medián, Kč)</h3><table>${["Příliš levné (pochybnosti o kvalitě)","Výhodná cena","Začíná být drahé","Příliš drahé"].map((t,i)=>`<tr><td>${t}</td><td style="text-align:right">${r.vw&&r.vw["vw"+(i+1)]!=null?r.vw["vw"+(i+1)]+" Kč":"–"}</td></tr>`).join("")}</table></div><div class="card"><h3>Odkud odpovědi přišly</h3>${bars(r.src||{},n)}</div></div>`;
 return h;
}
async function loadResults(){
 const msg=$("#qresmsg"),body=$("#qresbody");if(!msg)return;
 if(!QFORM_URL){msg.textContent="Výsledky se zobrazí po připojení ukládání odpovědí.";body.innerHTML="";return}
 msg.textContent="Načítám výsledky…";
 try{const r=await (await fetch(QFORM_URL,{cache:"no-store"})).json();msg.textContent="Stav k "+new Date().toLocaleString("cs-CZ")+".";body.innerHTML=renderResults(r)}
 catch(e){msg.textContent="Výsledky se nepodařilo načíst. Zkontrolujte, zda je webová aplikace nasazená s přístupem Kdokoli.";body.innerHTML=""}
}
function wireDotaznik(){
 const cp=$("#cpgs");if(cp)cp.onclick=async()=>{const m=$("#cpmsg");try{await navigator.clipboard.writeText(APPS_SCRIPT);m.textContent="Zkopírováno."}catch(e){const r=document.createRange();r.selectNodeContents($("#gscode"));const sl=getSelection();sl.removeAllRanges();sl.addRange(r);m.textContent="Kód je označený, zkopírujte jej (Ctrl+C)."}};
 const rf=$("#qrefresh");if(rf)rf.onclick=loadResults;
 loadResults();
}

/* ---------- Word (.docx) ---------- */
function loadDocx(){return new Promise((res,rej)=>{if(window.docx)return res(window.docx);const s=document.createElement("script");s.src="vendor/docx.umd.js";s.onload=()=>window.docx?res(window.docx):rej(new Error("docx"));s.onerror=()=>rej(new Error("load"));document.head.appendChild(s)})}
async function buildDocx(mode){const Q=mode==="quest";
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
 kids.push(new Paragraph({spacing:{after:300},children:[new TextRun({text:Q?"Zákaznický dotazník":PLAN_META.sub,size:40,color:"3A2A24",font:FONT})]}));
 (Q?["Pro studenty UTB a obyvatele Zlína","Stav k "+UPDATED]:PLAN_META.lines).forEach(l=>kids.push(P(l,{size:24,color:"555555",after:60})));
 kids.push(new Paragraph({children:[new PageBreak()]}));
 if(!Q){
  kids.push(H1("Obsah"));
  PLAN_DOC.forEach((c,i)=>kids.push(P((i+1)+". "+c.title,{after:40})));
  PLAN_APPX.forEach(c=>kids.push(P(c.title,{after:40})));
  kids.push(new Paragraph({children:[new PageBreak()]}));
  PLAN_DOC.forEach((c,i)=>{kids.push(H1((i+1)+". "+c.title));c.b.forEach(b=>kids.push(...blocks(b)))});
  PLAN_APPX.forEach(c=>{kids.push(new Paragraph({children:[new PageBreak()]}));kids.push(H1(c.title));c.b.forEach(b=>kids.push(...blocks(b)))});
 }else{
  const c=PLAN_APPX[0];kids.push(H1("Zákaznický dotazník"));c.b.forEach(b=>kids.push(...blocks(b)));
 }
 const doc=new Document({
  creator:"DevilsPot",title:Q?"DevilsPot – dotazník":"DevilsPot – Podnikatelský plán",description:"Pracovní verze k "+UPDATED,
  styles:{default:{document:{run:{font:FONT,size:22}}},paragraphStyles:[
   {id:"Heading1",name:"Heading 1",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:34,bold:true,color:"B3261E",font:FONT},paragraph:{spacing:{before:360,after:160},outlineLevel:0}},
   {id:"Heading2",name:"Heading 2",basedOn:"Normal",next:"Normal",quickFormat:true,run:{size:26,bold:true,color:"C2410C",font:FONT},paragraph:{spacing:{before:240,after:100},outlineLevel:1}}]},
  numbering:{config:[{reference:"ol",levels:[{level:0,format:LevelFormat.DECIMAL,text:"%1.",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:720,hanging:360}}}}]}]},
  sections:[{properties:{page:{margin:{top:1134,bottom:1134,left:1134,right:1134}}},
   headers:{default:new Header({children:[new Paragraph({alignment:AlignmentType.RIGHT,children:[new TextRun({text:Q?"DevilsPot – dotazník":"DevilsPot – podnikatelský plán",size:18,color:"888888",font:FONT})]})]})},
   footers:{default:new Footer({children:[new Paragraph({alignment:AlignmentType.CENTER,children:[new TextRun({text:"Strana ",size:18,color:"888888",font:FONT}),new TextRun({children:[PageNumber.CURRENT],size:18,color:"888888",font:FONT})]})]})},
   children:kids}]});
 return Packer.toBlob(doc);
}
async function downloadWord(mode,btnSel,msgSel){
 const btn=$(btnSel),msg=$(msgSel);if(!btn)return;btn.disabled=true;const old=btn.textContent;btn.textContent="Připravuji dokument…";msg.textContent="";
 try{
  const blob=await buildDocx(mode);
  const d=new Date(),ds=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
  const name=(mode==="quest"?"DevilsPot_dotaznik_":"DevilsPot_podnikatelsky_plan_")+ds+".docx";
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500);
  msg.textContent="Dokument byl stažen: "+name;
 }catch(e){msg.textContent="Stažení se nepodařilo ("+(e&&e.message||e)+"). Zkuste stránku obnovit.";}
 btn.disabled=false;btn.textContent=old;
}

/* ---------- navigace ---------- */
const nav=$("#nav"),main=$("#main");$("#upd").textContent=UPDATED;$("#foot").textContent="DevilsPot · verze "+VERSION+" · aktualizováno "+UPDATED;
function show(id){main.innerHTML=`<section class="on">${V[id]}</section>`;nav.querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.id===id));
 const rp=$("#rp");if(rp)rp.textContent=dn+" / "+tot;
 const dl=$("#dl");if(dl)dl.onclick=()=>downloadWord("plan","#dl","#dlmsg");if(id==="dotaznik")wireDotaznik();const dq=$("#dlq");if(dq)dq.onclick=()=>downloadWord("quest","#dlq","#dlqmsg");
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
 function f(){if(document.hidden){requestAnimationFrame(f);return}x.clearRect(0,0,W,H);for(const p of ps){p.y-=p.v*(1+(H-p.y)/H*.6);p.sw+=.02;p.x+=Math.sin(p.sw)*p.sa;
  if(mx>0){const dx=p.x-mx,dy=p.y-my,d=dx*dx+dy*dy;if(d<14000){p.x+=dx/Math.sqrt(d+1)*1.4;p.y+=dy/Math.sqrt(d+1)*.8}}
  const a=Math.max(0,Math.min(1,(p.y/H)*1.25));
  const g=x.createRadialGradient(p.x,p.y,0,p.x,p.y,p.s*5);g.addColorStop(0,`hsla(${p.h+20},100%,70%,${a})`);g.addColorStop(.4,`hsla(${p.h},100%,55%,${a*.55})`);g.addColorStop(1,`hsla(${p.h-8},100%,40%,0)`);
  x.fillStyle=g;x.beginPath();x.arc(p.x,p.y,p.s*5,0,6.283);x.fill();
  if(p.y<-10||p.x<-20||p.x>W+20)Object.assign(p,mk(false))}
  requestAnimationFrame(f)}
 if(!matchMedia("(prefers-reduced-motion: reduce)").matches)f()})();

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
