/* PODNIKOVÝ PLÁN jako dokument. Zdroj pro záložku Podnikový plán i pro export do Wordu.
   Bloky: p (odstavec, **tučně**), h (podnadpis), ul, ol, table (head, rows), note */
const pp=x=>({t:"p",x}), hh=x=>({t:"h",x}), ul=x=>({t:"ul",x}), ol=x=>({t:"ol",x}), nt=x=>({t:"note",x}), tb=(head,rows)=>({t:"table",head,rows});
const K=n=>Math.round(n).toLocaleString("cs-CZ");
const pcs=x=>Math.round(x*100)+" %";
const base=calc(.45,M.price), hi=calc(.6,M.price), lo=calc(.35,M.price);

const PLAN_META={
 title:"DevilsPot",
 sub:"Podnikatelský plán hotpot restaurace ve Zlíně",
 lines:["Zakladatelé: Erik a Filip","Místo: Zlín, Česká republika","Stav: pracovní verze k "+UPDATED,"Dokument se průběžně aktualizuje podle nových zjištění"]
};

const PLAN_DOC=[
 {id:"shrnuti",title:"Shrnutí",b:[
  pp("**DevilsPot** je plánovaná hotpot restaurace ve Zlíně, kde si hosté sami vaří suroviny v hrnci s vývarem na indukční plotýnce přímo u stolu. Koncept stojí na sdíleném zážitku pro party přátel, páry, studenty a firemní oslavy. Nabídku tvoří sety pro 2, 4 a 6 osob a à la carte suroviny."),
  pp("Zakladatelé jsou dva. **Filip** (vyučení, praxe v gastronomii) odpovídá za celé gastro. **Erik** vede byznys a marketing. Oba jsou zatím zaměstnaní a nespěchají: důraz je na kvalitní přípravu. Vlastní kapitál nemají, start se bude financovat úvěrem."),
  hh("Klíčová zjištění"),
  ul([
   "Příležitost: hotpot podnik ve Zlíně nebyl ve vyhledávání nalezen (k ověření v terénu). V ČR se hotpot koncentruje v Praze, kde all-you-can-eat stojí asi 700–800 Kč na osobu.",
   "Trh: Zlínský kraj má 576 120 obyvatel, Univerzita Tomáše Bati asi 9 tisíc studentů a v kraji žije 27 432 cizinců. Mzdy v kraji jsou o 12 % pod průměrem ČR.",
   "Finance (model): investice "+fmtS(invT)+", splátka úvěru asi "+fmtS(pay)+" měsíčně. Při ceně "+fmtS(M.price)+" na hosta je potřeba "+pcs(beOcc)+" obsazenosti, při ceně 600 Kč "+pcs(beGuests(600)/capMonth)+", při ceně 700 Kč "+pcs(beGuests(700)/capMonth)+".",
   "Hlavní rizika: nízká obsazenost, nižší kupní síla ve Zlíně, ručení za úvěr a závislost na Filipovi jako klíčové osobě.",
   "Doporučený postup: terénní ověření ve Zlíně, zákaznický dotazník, zkušební provoz (pop-up večery) a teprve potom jednání s bankou o úvěru se zárukou."
  ]),
  tb(["Ukazatel","Hodnota (model, odhad)"],[
   ["Počet míst","40"],["Odhad investice",fmtS(invT)],["Stálé měsíční náklady",fmtS(fixT)],["Splátka úvěru (9 %, 5 let)",fmtS(pay)+" / měs"],
   ["Hostů při 45 % obsazenosti",K(base.g)+" / měs"],["Zisk po splátce při 45 % (před daní)",fmtS(base.profit)+" / měs"],["Break-even obsazenost při 500 Kč",pcs(beOcc)]
  ])
 ]},
 {id:"vize",title:"Vize, mise a hodnoty",b:[
  nt("Návrh k diskuzi mezi zakladateli."),
  pp("**Vize:** stát se zlínskou adresou pro společné večeře, kde se u stolu vaří, povídá a fotí."),
  pp("**Mise:** nabídnout čerstvý a zároveň přátelský hotpot za férové ceny, s úrovní ostrosti podle chuti každého hosta."),
  ul(["Čerstvé a kvalitní suroviny","Společný zážitek, ne jen jídlo","Férová cena odpovídající zlínským příjmům","Hygiena a bezpečnost na prvním místě","Férové podmínky a šance růst pro každého zaměstnance","Ostrost podle chuti: koncept „Devil level“ 1–5"]),
  pp("**Název DevilsPot** odkazuje na ohnivý charakter konceptu: pálivé vývary, ohnivá značka a hra s úrovněmi ostrosti.")
 ]},
 {id:"tym",title:"Zakladatelé a tým",b:[
  tb(["Osoba","Role","Odpovědnost","Kvalifikace"],[
   ["Filip","Gastro","Kuchyň, menu, receptury, dodavatelé, hygiena, provoz","Vyučení v oboru, praxe v gastronomii, vášeň pro obor"],
   ["Erik","Byznys a marketing","Podnikatelský plán, finance, jednání s bankou, značka, sociální sítě, nábor","V procesu učení; odpovídá za byznysovou stránku"]
  ]),
  hh("Odborná způsobilost"),
  pp("Hostinská činnost je ohlašovací živnost řemeslná a vyžaduje odbornou způsobilost. Filip má vyučení i praxi, což by podmínku mělo splnit. Doklady (výuční list, doklady o praxi) je třeba potvrdit na živnostenském úřadě. U s.r.o. by byl Filip odpovědným zástupcem."),
  hh("Další pracovníci"),
  ul(["Pomocná kuchyně a obsluha na DPP nebo DPČ (nabídky ve Zlíně od 220 Kč/h), studenti UTB jako brigádníci.","V modelu: pomocná kuchyně a 2 číšníci, celkem "+fmtS(FIXED[2][1])+" měsíčně včetně odvodů.","Do budoucna zaučení druhého kuchaře, aby podnik nezávisel jen na Filipovi."]),
  hh("Odměna zakladatelů"),
  pp("Model počítá se zakladateli bez mzdy, včetně Filipa v kuchyni. Před úvěrem je nutné dohodnout, z čeho budou zakladatelé v prvním roce žít a jakou odměnu si bude provoz moci dovolit.")
 ]},

 {id:"zamestnani",title:"Zásady zaměstnávání a nábor brigádníků",b:[
  pp("**"+ZAS_MOTTO+"**"),
  hh("Zásady"),
  tb(["Zásada","Jak ji naplníme"],ZAS.map(z=>[z[0],z[1]])),
  hh("Nábor studentů UTB"),
  pp("Do provozu chceme zapojit studenty Univerzity Tomáše Bati na brigády. Model počítá se "+BRIG_SLOTS+" pracovními místy na směně (2 číšníci a pomocná kuchyně) po "+BRIG_HOURS+" hodinách, tedy asi "+brigH+" hodinami brigádníků měsíčně."),
  hh("Kde studenty oslovit"),ul(BRIG[0][2]),
  hh("Mzdy na trhu"),ul(BRIG[1][2]),
  hh("Smluvní formy a limity (2026)"),
  tb(["Parametr","DPP","DPČ"],[["Rozsah práce","300 hodin ročně u zaměstnavatele","Nejvýše polovina týdenní pracovní doby (20 h týdně)"],["Odvody pojistného","Do 11 999 Kč měsíčně u jednoho zaměstnavatele nevznikají","Do 4 499 Kč měsíčně nevznikají"],["Forma","Písemná dohoda","Písemná dohoda"],["Minimální hodinová mzda","134,40 Kč","134,40 Kč"],["Od 1. 1. 2027","Limit 12 500 Kč","Limit 5 000 Kč"]]),
  hh("Student a pojištění, daně"),ul(BRIG[2][2]),
  hh("Povinnosti zaměstnavatele"),ul(BRIG[3][2]),
  hh("Hygiena a zdraví"),ul(BRIG[4][2]),
  hh("Kolik studentů je potřeba"),
  tb(["Položka","Hodnota"],BRIG_CALC),
  pp("Model počítá se mzdovými náklady "+fmtS(FIXED[2][1])+" měsíčně včetně odvodů. Při "+brigRate+" Kč/h vychází hrubá mzda "+fmtS(brigH*brigRate)+" a odvody u DPČ ji mohou zvýšit, proto je třeba mzdové náklady v modelu upřesnit s mzdovou účetní."),
  hh("Co nabídnout studentům"),ul(BRIG[6][2]),
  hh("Postup náboru"),ol(BRIG_STEPS),
  hh("Návrh inzerátu"),pp(BRIG_AD),
  hh("Co ještě zjistit"),ul(BRIG_TODO.concat(ZAS_TODO))
 ]},
 {id:"produkt",title:"Produkt a nabídka",b:[
  hh("Koncept zážitku"),
  pp("Každý stůl má indukční plotýnku s hrncem. Host si vybere vývar a suroviny, obsluha je přinese a hosté si je sami uvaří. Doplňují je omáčkový bar a dezerty. Koncept je skupinový a vhodný pro sdílení na sociálních sítích."),
  hh("Vývary (návrh)"),
  tb(["Vývar","Charakter","Pro koho"],[
   ["Jemný kuřecí","Neutrální, bohatý vývar","Začátečníci, rodiny"],["Pálivý sečuánský (mala)","Ostrý a koření s „brněním“","Milovníci pálivého, značka Devil"],["Houbový","Zemitý, aromatický","Širší publikum"],["Bezmasý/vegan","Zeleninový základ","Vegetariáni a vegani"],["Rajčatový, thajský tom yum","Rozšíření nabídky","Až podle zájmu v dotazníku"]
  ]),
  hh("Suroviny a sety"),
  ul(["Maso: hovězí plátky, vepřové, kuřecí, jehněčí (podle kalkulace)","Mořské plody: krevety, kalamáry, mušle","Tofu, houby, zelenina, knedlíčky, nudle","Omáčkový bar a dezerty, nápoje","Sety pro 2, 4 a 6 osob + doobjednání à la carte"]),
  pp("Ceny setů se určí kalkulací surovin a ověří dotazníkem. Srovnání: v pražském NALI vychází talíř asi 500 g na osobu na 599–699 Kč, menší set pro dva v Sushi DuHa na asi 475 Kč na osobu. Model počítá s průměrnou útratou "+fmtS(M.price)+" na hosta s DPH."),
  hh("Další pravidla"),
  ul(["Alergeny u každé položky jsou povinné","Úrovně ostrosti „Devil level“ 1–5 u každého vývaru","Sezónnost: hotpot je silnější na podzim a v zimě, v létě pomůže lehčí nabídka a firemní akce"])
 ]},
 {id:"trh",title:"Analýza trhu",b:[
  tb(["Ukazatel","Hodnota","Zdroj"],[
   ["Obyvatelé Zlínského kraje (30. 6. 2026)","576 120 (v 1. pololetí 2026 −1 395)","ČSÚ"],
   ["Okres Zlín (SLDB 2021)","187 371","ČSÚ"],
   ["Průměrná mzda v kraji (2. čtvrtletí 2026)","45 615 Kč (ČR 51 966 Kč)","ČSÚ"],
   ["Studenti UTB","asi 9 000 (THE: 8 964, 12 % zahraniční)","UTB, Times Higher Education"],
   ["Největší fakulty UTB (2025)","FHS 1 959, FaME 1 943, FMK 1 141","ČSÚ"],
   ["Cizinci v kraji (31. 12. 2025)","27 432 (4,8 %), z toho 10 903 v okrese Zlín","ČSÚ"]
  ]),
  hh("Spotřebitelské návyky"),
  ul(["Podíl lidí, kteří chodí na oběd do restaurace v okolí práce, klesl z 33 % (2024) na 26 % (2025).","Podíl lidí, kteří si nosí jídlo z domova, vzrostl ze 46 % na více než 57 %.","Restaurace patří mezi první výdaje, které lidé omezují (téměř 90 % respondentů)."]),
  pp("**Závěr:** hotpot je třeba stavět jako večerní a víkendový zážitek pro skupiny, ne jako polední menu. Nižší mzdy ve Zlínském kraji znamenají, že pražské ceny nelze přenést bez rizika."),
  hh("Akce ve Zlíně využitelné pro marketing"),
  ul(["Food Truck Festival na náměstí Míru (září)","Svatomartinské hody na náměstí Míru: 14. 11. 2026","Adventní Zlín (vánoční trhy na náměstí Míru)","Festival Zlín žije, Masters of Rock ve Vizovicích (červenec)"])
 ]},
 {id:"konkurence",title:"Konkurence",b:[
  tb(["Podnik","Formát","Cena","Poznámka"],COMP.map(r=>[r[0],r[1],r[2],r[3]])),
  hh("Co z toho plyne"),
  ul(["Přímý hotpot konkurent ve Zlíně nebyl nalezen. Ve Zlíně existují asijské restaurace (Shun Li, Makalu, MIOMI sushi) a české restaurace jako nepřímá konkurence.","V Praze je all-you-can-eat 699–800 Kč, talíř v NALI 599–699 Kč, set pro dva asi 475 Kč na osobu.","Většina pražských nabídek se prodává přes vouchery se slevou 12–24 %.","Zahraniční srovnání: Budapešť (HiBeef) asi 670 Kč all-you-can-eat; In Town v Budapešti kolem 40 € za jídlo s pitím.","Absenci hotpotu ve Zlíně a okolí je třeba ověřit v terénu."])
 ]},
 {id:"swot",title:"SWOT analýza",b:[nt("Návrh vycházející ze zjištění v tomto dokumentu."),...SWOT.flatMap(([t,l])=>[hh(t),ul(l)])]},
 {id:"zakaznici",title:"Zákazníci",b:[
  nt("Chování skupin jsou hypotézy. Ověří je zákaznický dotazník (viz příloha A) a zkušební provoz."),
  tb(["Skupina","Kdy a jak","Hypotéza"],[
   ["Studenti UTB","Večer, skupiny 4–8 osob","Cenově citliví, silný vliv sociálních sítí (Instagram, TikTok)"],
   ["Mladí dospělí a páry (22–35)","Pátek a sobota večer","Zážitek a fotky, ochota zaplatit víc za kvalitu"],
   ["Party přátel a oslavy","Víkend, rezervace","Sety pro 4–6 osob, delší pobyt"],
   ["Firemní akce","Všední večer, rezervace","Pevný rozpočet na osobu, potřeba rezervací"],
   ["Rodiny","Víkend odpoledne","Jemné vývary, bezmasé možnosti"],
   ["Cizinci a zájemci o autentickou kuchyni","Večer","Hledají autentický hotpot, doporučují dál"]
  ])
 ]},
 {id:"marketing",title:"Marketing a prodej",b:[
  hh("Strategie"),
  ul(["Zacílit na studenty UTB a mladé dospělé přes Instagram a TikTok (video vaření, ostrost challenge).","Značka „Devil“: ohnivý vizuál, úrovně ostrosti, věrnostní program „Devil level“.","Cena odpovídající zlínským příjmům, sety pro 2–4 osoby jako hlavní nabídka.","Rezervace online, nabídka firemních akcí a oslav."]),
  hh("Kanály"),
  tb(["Kanál","Použití"],[
   ["Instagram, TikTok","Video vaření, ostrost challenge, odpočet do otevření, spolupráce se zlínskými tvůrci"],
   ["Google Maps","Profil, fotky, sbírání recenzí od zkušebních večerů"],
   ["UTB a studentské spolky","Plakáty, QR kód s dotazníkem, studentské akce"],
   ["E-mailový seznam","Zájemci z dotazníku, pozvánky na zkušební večery"],
   ["Akce ve Zlíně","Food Truck Festival, svatomartinské hody, vánoční trhy"],
   ["Vouchery","Až po stabilizaci provozu, slevy jsou drahé"]
  ]),
  hh("Spuštění"),
  ol(["Před otevřením: dotazník, sociální sítě, e-mailový seznam zájemců.","Zkušební večery (pop-up) pro ověření poptávky, ceny a menu.","Zkušební otevření pro pozvané hosty a sbírání recenzí.","Velké otevření a marketingový start.","Po otevření: věrnostní program, firemní nabídka, spolupráce s UTB."]),
  pp("Marketingový rozpočet v modelu: "+fmtS(FIXED[3][1])+" měsíčně. Rozpočet úvodní kampaně je třeba doplnit.")
 ]},
 {id:"provoz",title:"Provoz",b:[
  hh("Lokalita a prostor"),
  ul(["Kapacita 30–50 míst, rozloha zhruba 80–120 m².","Pěší frekvence, blízkost univerzity, parkování a dostupnost MHD.","Prostor s gastro schválením, odtahem a dostatečným elektrickým příkonem (indukce).","Nájem: komerční prostory ve Zlíně se nabízejí zhruba za 2 000–3 700 Kč/m²/rok (např. 63 m² za 16 900 Kč, 90 m² za 22 500 Kč, 108 m² za 29 900 Kč měsíčně). Model počítá s "+fmtS(FIXED[0][1])+" včetně služeb."]),
  hh("Vybavení"),
  ul(["Stoly s vestavěnými indukčními plotýnkami (stolní indukční vařič 3,5 kW stojí asi 4 800–6 100 Kč, profesionální vestavěné vyšší).","Odtah, chlazení a mražení, příprava masa a zeleniny, mycí zázemí.","Investice do vybavení a úprav: viz finanční plán."]),
  hh("Energie"),
  ul(["Silová elektřina pro podnikatele: průměr asi 2,24 Kč/kWh bez DPH (duben 2026), nabídky od 2 421 Kč/MWh s fixací na 2 roky.","Od ledna 2026 odpadl poplatek na obnovitelné zdroje (celková cena elektřiny zhruba −10 %).","Model počítá s "+fmtS(FIXED[1][1])+" měsíčně."]),
  hh("Dodavatelé a personál"),
  ul(["Maso a zelenina: velkoobchod a místní farmáři, asijské suroviny od specializovaného velkoobchodu. Cíl: 2 dodavatelé na každou kategorii.","Minimální mzda 2026: 22 400 Kč (134,40 Kč/h). Zaměstnavatel navíc platí odvody zhruba třetinu hrubé mzdy.","Provozní doba (návrh): večery a víkendy, v modelu "+M.days+" provozních dní měsíčně.","Jídlo pro zaměstnance: oběd a večeře na účet podniku nebo se silnou slevou (např. za 50 Kč). Podle Filipa je zbytků málo, protože se hodně surovin využije do vývaru nebo hotpotu. Model počítá s "+fmtS(FIXED[4][1])+" měsíčně (odhad)."]),
  hh("Hygiena a bezpečnost"),
  ul(["Kontrola Krajské hygienické stanice, vyhláška 137/2004 Sb., systém HACCP (kontrola hygieny při práci s jídlem).","Alergeny u každé položky, školení personálu.","Požární ochrana a BOZP (bezpečnost práce), pojištění provozu."])
 ]},
 {id:"pravo",title:"Právní a daňové aspekty",b:[
  nt("Informace nejsou právní ani účetní poradenství. Je nutné je ověřit s účetní, daňovým poradcem a na úřadech."),
  hh("Živnost"),
  ul(["Hostinská činnost je ohlašovací živnost řemeslná, vyžaduje odbornou způsobilost (vzdělání v oboru nebo praxi).","Ohlášení stojí 1 000 Kč, oprávnění vzniká dnem ohlášení.","Odpovědným zástupcem by byl Filip (vyučení, praxe)."]),
  hh("Právní forma"),
  ul(["Doporučeno zvážit s.r.o. pro dva společníky: omezené ručení firmou, banka však u úvěru často chce osobní ručení.","Základní kapitál může být už 1 Kč, banky a investoři ale preferují víc. Do 20 tis. Kč jde složit hotově u správce vkladu.","Založení s.r.o. vyjde zhruba na 5–11 tis. Kč (starší údaje, ověřit).","Smlouva společníků (podíly, role, odchod, rozhodování) je nejdůležitější dokument."]),
  hh("DPH a evidence tržeb"),
  ul(["Plátcem DPH se podnikatel stane při obratu nad 2 mil. Kč za rok (od 1. 1. dalšího roku), nebo ihned nad 2 536 500 Kč. Model počítá s obratem kolem "+K(base.rev*12/1000000*10)/10+" mil. Kč ročně, tedy s plátcovstvím.","Jídla ve stravovacích službách mají 12 %, alkohol 21 %. Od 1. 1. 2027 se 12 % rozšíří i na nealkoholické nápoje v rámci stravovací služby.","Evidence tržeb (EET 2.0): Sněmovna schválila obnovení 15. 7. 2026, účinnost se plánuje od 1. 1. 2027 (po Senátu a podpisu prezidenta, stav ověřit). Bez povinnosti tisknout účtenky. Spropitné je osvobozeno od daně jen pro zaměstnance, nejvýše do 7 % tržeb."]),
  hh("Hygiena a provoz"),
  ul(["Provoz kontroluje Krajská hygienická stanice (vyhláška 137/2004 Sb., HACCP).","Změna užívání prostoru a stavební řízení: ověřit na stavebním úřadu ve Zlíně."])
 ]},
 {id:"finance",title:"Finanční plán",b:[
  nt("Všechna čísla jsou odhady, ne zjištěná fakta. Ceny hostů jsou s DPH 12 %, model počítá s plátcovstvím DPH. Přepočítají se podle nabídek dodavatelů a nájmů."),
  hh("Startovní investice"),
  tb(["Položka","Částka"],[...INV.map(r=>[r[0],fmtS(r[1])]),["Celkem",fmtS(invT)]]),
  hh("Stálé měsíční náklady"),
  tb(["Položka","Částka"],[...FIXED.map(r=>[r[0],fmtS(r[1])]),["Celkem",fmtS(fixT)]]),
  hh("Předpoklady"),
  ul(["Míst: "+M.seats+", kolikrát se stůl za den vystřídá: "+M.turns+", provozních dní: "+M.days+" měsíčně, kapacita "+K(capMonth)+" hostů měsíčně.","Průměrná útrata "+fmtS(M.price)+" na hosta s DPH, suroviny "+Math.round(M.food*100)+" % z tržeb bez DPH.","Úvěr "+fmtS(P)+" (100 % investice), sazba "+Math.round(M.rate*100)+" %, splatnost "+M.years+" let, splátka "+fmtS(pay)+" měsíčně.","Zakladatelé jsou v modelu bez mzdy, zisk je před daní z příjmů."]),
  hh("Scénáře (měsíčně, cena "+fmtS(M.price)+")"),
  tb(["","Pesimistický (35 %)","Základní (45 %)","Optimistický (60 %)"],[
   ["Hostů",K(lo.g),K(base.g),K(hi.g)],["Tržby s DPH",fmtS(lo.rev),fmtS(base.rev),fmtS(hi.rev)],["Tržby bez DPH",fmtS(lo.net),fmtS(base.net),fmtS(hi.net)],["Zbývá po odečtení surovin",fmtS(lo.gm),fmtS(base.gm),fmtS(hi.gm)],["Zisk po splátce (před daní)",fmtS(lo.profit),fmtS(base.profit),fmtS(hi.profit)]
  ]),
  hh("Citlivost na cenu"),
  tb(["Průměrná útrata","Hostů k vyrovnání / měs","Potřebná obsazenost","Zisk při 45 %"],PRICES.map(p=>[fmtS(p),K(beGuests(p)),pcs(beGuests(p)/capMonth),fmtS(calc(.45,p).profit)])),
  hh("Jednotková ekonomika hosta (cena "+fmtS(M.price)+")"),tb(["Položka","Hodnota"],unit(M.price)),
  hh("Rozjezd prvního roku (odhad)"),pp("Předpoklad: obsazenost roste z "+pcs(RAMP.start)+" na "+pcs(RAMP.target)+" během "+RAMP.months+" měsíců, cena "+fmtS(M.price)+". Hodnoty jsou po splátce úvěru, před daní."),tb(["Měsíc","Obsazenost","Hostů","Zisk za měsíc","Kumulativně"],ramp().rows.map(r=>[r.m+"",pcs(r.occ),K(r.g),fmtS(r.profit),fmtS(r.cum)])),pp("Nejhlubší kumulativní propad je "+fmtS(ramp().min)+", v investici je rezerva "+fmtS(INV[5][1])+". "+(ramp().min+INV[5][1]>=0?"Rezerva v modelu propad pokryje.":"Rezerva v modelu propad nepokryje, je třeba ji navýšit nebo snížit náklady.")),
  pp("**Závěr:** při ceně 500 Kč je model mírně ztrátový a k vyrovnání je potřeba "+pcs(beOcc)+" obsazenosti. Cena 600 Kč a více model výrazně zlepšuje, ale ve Zlíně je nižší kupní síla, proto je třeba cenu ověřit dotazníkem a zkušebním provozem. Rizikem je také to, že zakladatelé jsou v modelu bez odměny.")
 ]},
 {id:"financovani",title:"Financování",b:[
  pp("Zakladatelé nemají vlastní kapitál. Start se bude financovat úvěrem, proto je klíčové držet investici nízko a mít doloženou poptávku."),
  hh("Bankovní úvěr se zárukou"),
  ul(["Program **Garant InvestEU** (NRB) nahrazuje Národní záruku. Úvěry 0,5–20 mil. Kč, záruka až 70 % jistiny, doba ručení až 10 let.","Vše se vyřizuje jen přes komerční banku. Žádosti o záruku by mělo být možné podávat od října 2026, spuštění do konce roku. Podmínky zveřejní banky.","Bez historie a vkladu čekejte přísné posuzování a osobní ručení."]),
  hh("Leasing vybavení"),
  ul(["NRB rozšířila Národní záruku i na leasingové společnosti.","Chlazení, technika a indukce na leasing sníží potřebu hotovosti na startu."]),
  hh("Poradenství a další zdroje"),
  ul(["Regionální kancelář CzechInvest ve Zlíně (Vavrečkova 5262) pořádá konzultační dny pro startupy a malé podniky.","Technologické inovační centrum Zlín: akcelerátor Můj první milion, platforma ZLINNOVATION (ověřit, zda se hodí pro gastro).","Rodina a známí s půjčkovou smlouvou, investor za podíl, crowdfunding s předprodejem voucherů.","Příspěvek z úřadu práce je jen pro uchazeče o zaměstnání a není nárokový, zakladatelů se teď netýká.","Přímé dotace pro začínající gastro podnikatele ve Zlínském kraji nalezeny nebyly."]),
  hh("Co banka obvykle chce"),
  ul(BANK)
 ]},
 {id:"rizika",title:"Rizika a opatření",b:[
  tb(["Riziko","Dopad","Opatření"],[
   ["Nízká obsazenost","Vysoký","Dotazník, zkušební provoz, marketing před otevřením, firemní akce"],
   ["Nižší kupní síla ve Zlíně","Vysoký","Ověřit cenu dotazníkem, sety pro 2–4 osoby, studentské nabídky"],
   ["Ručení za úvěr","Vysoký","s.r.o., menší investice, leasing, záruka NRB do 70 %, rezerva v investici"],
   ["Závislost na Filipovi","Vysoký","Dokumentace receptur, zaučení druhého kuchaře"],
   ["Růst cen surovin a energií","Střední","Fixace energií na 2 roky, 2 dodavatelé na kategorii, úprava menu"],
   ["Sezónnost","Střední","Lehčí letní nabídka, firemní akce, akce ve městě"],
   ["Nedostatek personálu","Střední","Studenti UTB na brigády, férové ohodnocení"],
   ["Změny legislativy (EET 2.0, DPH)","Střední","Účetní, kasa kompatibilní s EET 2.0"],
   ["Hygiena a alergeny","Vysoký (málo pravděpodobné)","HACCP, školení, označení alergenů"],
   ["Úbytek obyvatel kraje","Nízký (dlouhodobě)","Zaměřit se na zážitek a studenty"]
  ])
 ]},
 {id:"harmonogram",title:"Harmonogram",b:[
  pp("Pět fází bez časového tlaku. Stav je aktualizován k "+UPDATED+" (hotovo "+ROAD.reduce((a,p)=>a+p[1].filter(x=>x[1]==="done").length,0)+" z "+ROAD.reduce((a,p)=>a+p[1].length,0)+" kroků)."),
  ...ROAD.flatMap(([t,it])=>[hh(t),tb(["Krok","Stav"],it.map(([x,s])=>[x,s==="done"?"Hotovo":s==="doing"?"Probíhá":"Čeká"]))])
 ]},
 {id:"vyzkum",title:"Výzkum zákazníků a terénní ověření",b:[
  pp("Poptávka a cena se ověří dvěma způsoby: zákaznickým dotazníkem (cíl alespoň 100, lépe 200 odpovědí, viz příloha A) a osobním terénním ověřením ve Zlíně."),
  pp("**Digitální dotazník** je na adrese "+SITE_URL+"dotaznik.html a lze jej vyplnit na mobilu i počítači. Anonymní odpovědi (volby a čísla) se ukládají do větve data v repozitáři DevilsPot_Dashboard, e-maily a volné texty jen do soukromého repozitáře DevilsPot_Data. Každý kanál (plakát, Instagram, Facebook, koleje, osobně) má vlastní odkaz, takže je vidět, odkud odpovědi přišly. Stav připojení: "+(QFORM_URL?"připojeno.":"čeká na připojení ukládání odpovědí.")),
  hh("Terénní ověření"),
  tb(["Oblast","Co zjistit"],FIELD.map(f=>[f[0],f[1]])),
  hh("Výsledky"),
  pp("Zatím nejsou k dispozici. Po vyhodnocení dotazníku a terénního ověření se zde doplní: zájem (podíl odpovědí 4–5), ochota platit (medián), preferované vývary a pálivost, nejlepší kanály a zjištění o konkurenci a prostorách.")
 ]},
 {id:"otazky",title:"Otevřené otázky",b:[
  ul(ASK[0][1]),
 ]},
 {id:"zdroje",title:"Zdroje",b:[
  ...SRC.flatMap(([t,l])=>[hh(t),{t:"links",x:l}])
 ]}
];

const PLAN_APPX=[
 {id:"pA",title:"Příloha A: Zákaznický dotazník",b:[
  pp("Připraveno ke zkopírování do Google Forms nebo Microsoft Forms. Vyplnění zabere asi 3 minuty, dotazník je anonymní, e-mail je nepovinný."),
  hh("Úvodní text"),pp(QINTRO),
  ...QUEST.flatMap(([sec,qs])=>[hh(sec),...qs.map(q=>({t:"quest",q}))]),
  hh("Volitelný blok: cenové pásmo (Van Westendorp)"),
  pp("Čtyři otevřené otázky s číselnou odpovědí. Z odpovědí se spočítá cenové pásmo, které zákazníci považují za přijatelné."),
  ol(QVW),
  hh("Závěrečný text"),pp(QEND),
  hh("Jak dotazník rozeslat"),ul(QDIST),
  hh("Jak výsledky vyhodnotit"),ul(QEVAL),
  hh("Osobní údaje"),ul(["Dotazník je anonymní kromě nepovinného e-mailu.","E-maily používat jen na to, k čemu dal respondent souhlas, a umožnit odhlášení.","Neptat se na rodné číslo ani citlivé údaje."])
 ]},
 {id:"pB",title:"Příloha B: Přehled rozhodnutí",b:[
  tb(["Datum","Rozhodnutí"],DECISIONS.map(d=>[d[0],d[1]]))
 ]},
 {id:"pC",title:"Příloha C: Slovníček pojmů",b:[tb(["Pojem","Vysvětlení"],GLOSS)]}
];
