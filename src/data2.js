/* Dotazník, terénní ověření, rozhodnutí */
const QDIST=["Každý kanál má vlastní odkaz a QR kód (parametr ?z=), aby bylo vidět, odkud odpovědi přišly. Odkazy a QR kódy jsou v záložce Dotazník.","QR kód na plakátu nebo letáku (kolej, menza, fakulty). Pro vyvěšení na UTB se zeptat studentských organizací.","Skupiny na Facebooku a Instagramu: zlínské komunity, studentské skupiny, spolky.","Osobně: deset minut ve Zlíně s tabletem nebo telefonem dává často víc kvalitních odpovědí než sdílení online.","Motivace: malá odměna (slosování o večeři pro dva na zkušebním večeru) zvýší počet odpovědí."];
const QEVAL=["Zájem: podíl odpovědí 4 a 5 v otázce 3. Pokud je to přes polovinu a zájemci chtějí chodit alespoň jednou měsíčně, je to dobrý signál.","Cena: medián odpovědí na otázku 8 (nebo průsečík křivek ve Van Westendorpu). Porovnat s modelem (průměrná útrata 500 Kč).","Menu: nejčastěji vybrané vývary a pálivost určí základní nabídku.","Kanály: pořadí v otázce 13 ukáže, kam dát marketingový rozpočet.","Segmenty: výsledky srovnat zvlášť pro studenty a pracující, mívají jinou ochotu platit."];

const FIELD=[
 ["Hotpot ve Zlíně","Projít centrum (okolí náměstí Míru) a okolí UTB (náměstí T. G. Masaryka). Zkontrolovat Mapy.cz, Google Maps, Firmy.cz, Wolt a Instagram. Zeptat se pár místních. Cíl: potvrdit nebo vyvrátit, že hotpot ve Zlíně není."],
 ["Stávající konkurence","Zapsat asijské a čínské restaurace (Shun Li, Makalu, MIOMI sushi a další), jejich ceny, nabídku a obsazenost v pátek a v sobotu večer."],
 ["Volné prostory","Zapsat adresu, rozlohu, nájem, kontakt na majitele, stav (gastro schválení, odtah, příkon elektřiny), nafotit. Hledat i zavřené restaurace, které lze převzít."],
 ["Frekvence a parkování","V okolí zajímavých míst počítat chodce 10 minut ve večerní špičce, ověřit parkování a dostupnost MHD."],
 ["Rozhovory","Zeptat se alespoň 10 lidí (studenti, pracující) na zájem o hotpot a cenu, ideálně doplnit dotazníkem."]
];

const DECISIONS=[
 ["2. 11. 2026","Digitální dotazník: veřejná stránka dotaznik.html. Odpovědi se ukládají jen do soukromého GitHub repozitáře DevilsPot_Data (bez Google), zapisuje je malý bezplatný Cloudflare Worker s tokenem uloženým mimo web. Odkazy s parametrem ?z= měří kanály, výsledky se zobrazují v dashboardu."],
 ["2. 11. 2026","Jídlo pro zaměstnance (návrh Filipa, k potvrzení): oběd a večeře na účet podniku nebo se silnou slevou (např. 50 Kč). Zbytků bude málo, suroviny se využijí do vývaru nebo hotpotu. Model počítá s 4 000 Kč měsíčně (odhad)."],
 ["2. 11. 2026","Zásady zaměstnávání: jasné, legálně podložené, vstřícné, klidné a férové podmínky pro všechny, šance růst a bezpečné, čisté a profesionální prostředí."],
 ["2. 11. 2026","Chceme verbovat studenty UTB na brigády (DPP/DPČ). Kanály, právní rámec a postup náboru jsou v dashboardu v záložce Nábor brigádníků."],
 ["2. 11. 2026","Název podniku: DevilsPot. Hotpot restaurace ve Zlíně."],
 ["2. 11. 2026","Zakladatelé jsou dva: Erik a Filip."],
 ["2. 11. 2026","Role: Filip vede celé gastro (vyučení, praxe, vášeň pro obor). Erik vede byznys a marketing a učí se."],
 ["2. 11. 2026","Formát nabídky: sety pro skupiny a à la carte suroviny (ne all-you-can-eat)."],
 ["2. 11. 2026","Oba zakladatelé jsou zatím zaměstnaní, žádný termín otevření, důraz na kvalitní přípravu."],
 ["2. 11. 2026","Financování: bez vlastního kapitálu, z půjčky. Doporučeno nejdřív ověřit poptávku zkušebním provozem a až poté jednat s bankou."],
 ["2. 11. 2026","Dashboard je čistě informační, bez políček k psaní. Obsah doplňuje a aktualizuje Claude podle domluvy."],
 ["2. 11. 2026","Dashboard běží na GitHub Pages z repozitáře Hound-Protocol/DevilsPot_Dashboard. Repozitář je veřejný, obsah vidí každý, kdo zná adresu."],
 ["2. 11. 2026","Texty v dashboardu jsou neutrální, bez „já“. Úloha asistenta je popsána v sekci „O co se postará Claude“."],
 ["2. 11. 2026","„Roadmapa“ přejmenována na „Harmonogram“."],
 ["2. 11. 2026","Při každé nové verzi se zobrazí okno „Nová pekelná verze je online!“ s tlačítkem „Zažehni mě, synku“."],
 ["2. 11. 2026","Zákaznický dotazník (19 otázek, hlavně studenti UTB) je součástí dashboardu i přílohou plánu."],
 ["2. 11. 2026","Podnikový plán je plnohodnotný dokument v dashboardu se stažením do Wordu. S každou diskuzí se aktualizují data v dashboardu i v plánu."]
];

/* Nábor studentů UTB na brigády */
const BRIG_SLOTS=3, BRIG_HOURS=6;
const brigH=BRIG_SLOTS*BRIG_HOURS*M.days;           // hodin brigádníků měsíčně
const brigRate=220;                                 // Kč/h
const brigStudentsDPP=Math.ceil(brigH/25);          // DPP: 300 h/rok = 25 h/měs
const brigStudentsDPC=Math.ceil(brigH/80);          // DPČ: až 20 h/týden ~ 80 h/měs
const BRIG=[
 ["Kde studenty oslovit","fact",["Job centrum UTB: zprostředkovává nabídky studentům a absolventům. Zjistit kontakt a podmínky zveřejnění nabídky.","Studentská unie UTB: spolupořádá s Job centrem veletrh Business Day. Oslovit kvůli sdílení nabídky a spolupráci.","Veletrhy: Business Day UTB (dříve 70 firem a 1 700 návštěvníků) a iKariéra Zlín (31. ročník v roce 2025).","Zlin.Jobs: bezplatný regionální portál (TIC Zlín a Zlínský kraj), registrace i zveřejnění nabídek zdarma, zaměřený i na stáže.","Portály brigád: Jobs.cz, Prace.cz, JenPráce.cz, Pracomat, Dobraprace.cz a aplikace Grason (gastro a eventy).","Sociální sítě DevilsPotu a studentské skupiny na Facebooku a Instagramu.","Plakáty s QR kódem (koleje, menza, fakulty), vývěska ve výloze, doporučení od stávajících brigádníků."]],
 ["Co studenti dostávají jinde","fact",["Brigády ve Zlíně na portálech: McDonald's 150 Kč/h, sklady 170–198 Kč/h, pomocné práce 180–190 Kč/h.","Průměrná nabízená mzda brigády pomocník ve Zlínském kraji: asi 160 Kč/h.","Restaurace ve Zlíně hledá číšníka/servírku od 220 Kč/h na DPP/DPČ (duben 2026).","Minimální mzda 2026: 134,40 Kč/h.","Zlínský kraj měl dle Echo24 nejvyšší meziroční nárůst hodinových sazeb brigád (až 20 %).","Závěr: pro konkurenceschopnost nabídnout 200–220 Kč/h plus spropitné. Model počítá s "+brigRate+" Kč/h."]],
 ["Student a pojištění","fact",["Za studenta do 26 let (prezenční vysokoškolské studium) platí zdravotní pojištění stát. Zaměstnavatel potřebuje potvrzení o studiu.","Do 11 999 Kč měsíčně u DPP student neplatí zdravotní ani sociální pojištění. Od 12 000 Kč platí jako zaměstnanec.","Po ukončení studia nebo ve 26 letech student status ztrácí.","Bez podepsaného prohlášení poplatníka je daň z DPP do 12 000 Kč srážková (15 %). S prohlášením (podepsat jen u jednoho zaměstnavatele v měsíci) se uplatní sleva na poplatníka a při příjmu kolem 11 000 Kč vychází daň nula.","Sleva na studenta byla zrušena, její obnovení je v daňovém balíčku schváleném Sněmovnou (ověřit)."]],
 ["Povinnosti zaměstnavatele (2026)","fact",["Registrace zaměstnavatele u ČSSZ (přihláška do registru zaměstnavatelů).","Od 1. 7. 2026 je nutné přihlásit zaměstnance do evidence zaměstnanců ČSSZ před zahájením práce, i u DPP.","Od 1. 4. 2026 se podává jednotné měsíční hlášení zaměstnavatele (JMHZ), tiskopis ONZ se nepoužívá.","Dohoda musí být písemná, s popisem práce, dobou a u DPČ rozsahem hodin.","Každý měsíc hlídat limity u každého studenta (11 999 Kč a 300 hodin ročně u DPP).","Vyřídí mzdová účetní. Model počítá s 20 tis. Kč měsíčně na účetní a ostatní."]],
 ["Hygiena a zdraví","est",["Podle dostupných zdrojů se při práci s pokrmy vyžaduje zdravotní průkaz pracovníka v potravinářství a znalosti o ochraně veřejného zdraví, i u brigádníků.","Průkaz vystavuje praktický lékař po vyšetření, trvá několik dní a nelze jej vyřídit na počkání. Platí i pro více zaměstnavatelů.","Aktuální požadavky potvrdit u Krajské hygienické stanice. Součástí je i školení HACCP."]],
 ["Jaké pracovní smlouvy vybrat","est",["DPP: nárazová práce, max. 300 hodin ročně u zaměstnavatele (asi 25 hodin měsíčně v průměru). Vhodná pro rezervní studenty.","DPČ: pravidelná práce, max. polovina týdenní pracovní doby (20 hodin týdně). Vhodná pro hlavní brigádníky. Odvody vznikají od 4 500 Kč měsíčně.","Od 1. 1. 2027 se limity zvyšují: DPP 12 500 Kč a DPČ 5 000 Kč.","Zvolenou kombinaci potvrdit s mzdovou účetní."]],
 ["Co nabídnout studentům","est",["Flexibilní směny podle rozvrhu, rozpis předem.","Hodinová mzda 200–220 Kč, spropitné (od 2027 osvobozené od daně pro zaměstnance do 7 % tržeb, pokud zákon projde).","Zaučení, školení, růst na vedoucího směny.","Jídlo pro zaměstnance: oběd a večeře zdarma nebo se silnou slevou (např. za 50 Kč). Podle Filipa je to běžná praxe a zbytků je málo, protože se hodně věcí dá využít do vývaru nebo hotpotu.","Značka „Devil crew“, parta studentů, atmosféra."]],
 ["Kdy a jak často","est",["Poptávka po brigádách roste po zkouškovém období a v létě, počítat se zkouškovými obdobími a prázdninami.","Nábor začít 1–2 měsíce před zkušebním provozem a držet rezervu navíc kvůli absencím."]]
];
const BRIG_CALC=[
 ["Pracovní místa na směně (2 číšníci + pomocná kuchyně)",BRIG_SLOTS+""],
 ["Hodin na směnu",BRIG_HOURS+""],
 ["Provozních dní měsíčně",M.days+""],
 ["Hodin brigádníků měsíčně",brigH+" h"],
 ["Hrubá mzda při "+brigRate+" Kč/h",fmtS(brigH*brigRate)+" měsíčně (bez odvodů)"],
 ["Studentů jen na DPP (25 h měsíčně)","asi "+brigStudentsDPP],
 ["Studentů jen na DPČ (80 h měsíčně)","asi "+brigStudentsDPC],
 ["Doporučená kombinace","3 hlavní na DPČ (asi 240 h) + 9–10 na DPP (asi 225 h) = 12–13 studentů + rezerva"]
];
const BRIG_STEPS=["Připravit nabídku, inzerát a vzor dohody (DPP/DPČ).","Osobně kontaktovat Job centrum UTB a Studentskou unii UTB, zjistit podmínky zveřejnění a spolupráce.","Zveřejnit nabídku na Zlin.Jobs, portálech a sociálních sítích, vyvěsit plakáty s QR kódem.","Krátký pohovor a zkušební směna (nebo vstupní školení).","Vybrat dokumenty: občanský průkaz, potvrzení o studiu, kód zdravotní pojišťovny, zdravotní průkaz, prohlášení poplatníka.","Podepsat písemnou dohodu před nástupem.","Přihlásit zaměstnance do evidence ČSSZ před zahájením práce.","Zaučení a školení hygieny (HACCP).","Sestavit rozpis směn a sdílet ho předem.","Každý měsíc zkontrolovat limity (11 999 Kč, 300 hodin) a podat měsíční hlášení."];
const BRIG_AD="Hledáme studenty na brigádu do nové hotpot restaurace DevilsPot ve Zlíně! Hledáme číšníky/číšnice a pomocné síly do kuchyně na večery a víkendy. Nabízíme hodinovou mzdu od 200 Kč, flexibilní směny podle rozvrhu, spropitné, zaučení a partu mladých lidí. Nevadí, že nemáte praxi, zaučíme vás. Požadujeme: studium na UTB, spolehlivost a chuť pracovat s lidmi. Ozvěte se na (kontakt doplnit).";
const BRIG_TODO=["Kontakt na Job centrum UTB a Studentskou unii UTB, podmínky zveřejnění nabídky.","Potvrdit aktuální požadavek na zdravotní průkaz a školení u KHS.","Potvrdit s mzdovou účetní kombinaci DPP/DPČ, odvody u DPČ a výši mzdových nákladů.","Potvrdit pravidla jídla pro zaměstnance (zdarma nebo za 50 Kč) a jeho daňové a pojistné dopady s účetní, zejména u dohod.","Doplnit kontakt do inzerátu a vytvořit QR kód na plakát."];

/* Zásady zaměstnávání */
const ZAS_MOTTO="Pro všechny účastníky zaměstnání chceme jasné, legálně podložené, vstřícné, klidné a férové podmínky. Každý dostane férové podmínky, každý bude mít šanci růst a pracovat v bezpečném, čistém a profesionálním prostředí.";
const ZAS=[
 ["Jasné","Písemná dohoda před nástupem s popisem práce, mzdou a dobou. Rozpis směn předem. Jasná pravidla docházky, výplaty a spropitného."],
 ["Legálně podložené","Správná smluvní forma (DPP/DPČ nebo pracovní poměr) podle limitů, přihlášení u ČSSZ před nástupem, správné odvody a daně, minimální mzda, evidence hodin. Žádná práce načerno."],
 ["Vstřícné a klidné","Rozpis podle rozvrhu a zkouškových období, možnost výměny směn, přiměřené obsazení směn, aby nevznikal stres. Zpětná vazba v klidu a soukromě."],
 ["Férové","Stejné podmínky pro stejnou pozici, mzda vždy včas, transparentní rozdělení spropitného, hodnocení podle práce a ne podle sympatií."],
 ["Šance růst","Cesta od brigádníka přes zkušeného člena týmu a vedoucího směny až po vyšší odpovědnost. Zaškolení, školení a postupná zodpovědnost."],
 ["Bezpečné","Školení BOZP, práce s vroucími vývary a indukcí (prevence popálenin), lékárnička a postup první pomoci, bezpečné prostředí bez obtěžování."],
 ["Čisté a profesionální","Hygienické standardy a HACCP, úklidové plány, jednotné pracovní oblečení, jasné postupy a respekt mezi kolegy i vůči hostům."]
];
const ZAS_TODO=["Sepsat jednoduchý zaměstnanecký řád (práva, povinnosti, docházka, spropitné, výměna směn).","Připravit vzory písemných dohod (DPP, DPČ) a vstupní dokument s podmínkami.","Připravit školení BOZP, hygieny (HACCP) a práce s vroucími vývary.","Určit osobu pro zpětnou vazbu a řešení problémů (nulová tolerance k šikaně a obtěžování).","Nastavit pevný den výplaty a pravidla spropitného.","Popsat kariérní cestu (brigádník, zkušený člen týmu, vedoucí směny)."];

/* SWOT (návrh) */
const SWOT=[
 ["Silné stránky",["Filip: vyučení, praxe a vášeň pro gastro","Zážitkový koncept vhodný pro sociální sítě","Hotpot ve Zlíně nenalezen (ověřit v terénu)","Velká studentská cílová skupina (UTB asi 9 tis.)","Flexibilní brigádnická pracovní síla a jasné zásady zaměstnávání"]],
 ["Slabé stránky",["Bez vlastního kapitálu, závislost na úvěru a osobní ručení","Erik se byznys teprve učí, zakladatelé jsou zatím zaměstnaní","Závislost na Filipovi jako klíčové osobě","Málo dat o poptávce a ceně ve Zlíně"]],
 ["Příležitosti",["Nezaplněná kategorie ve městě","27 tis. cizinců v kraji hledá autentickou kuchyni","Akce ve Zlíně (food trucky, hody, trhy) a spolupráce s UTB","Garant InvestEU a leasing snižují potřebu hotovosti","Zkušební provoz (pop-up) před velkou investicí","Rostoucí zájem o hotpot v Evropě (např. Budapešť)"]],
 ["Hrozby",["Nižší kupní síla ve Zlínském kraji než v Praze","Úbytek obyvatel kraje a citlivost lidí na ceny v restauracích","Růst cen surovin, energií a mezd","Sezónnost a nedostatek personálu","Změny legislativy (EET 2.0, DPH)","Pražské konkurenční nabídky na voucherech"]]
];

/* Slovníček pojmů */
const GLOSS=[
 ["All-you-can-eat (AYCE)","Neomezená konzumace za pevnou cenu na osobu."],
 ["Break-even","Bod, kdy tržby přesně pokryjí všechny náklady. V modelu je to obsazenost a počet hostů, od kterých provoz nevydělává ztrátu."],
 ["BOZP","Bezpečnost a ochrana zdraví při práci. Zaměstnavatel zajišťuje školení a bezpečné prostředí."],
 ["Cash flow","Tok peněz: kolik peněz do podniku přichází a kolik z něj odchází v čase. Podnik může být „v zisku“ a přesto mít málo hotovosti."],
 ["ČSSZ","Česká správa sociálního zabezpečení. Zaměstnavatel u ní registruje zaměstnance a hlásí příjmy."],
 ["DPČ","Dohoda o pracovní činnosti. Pravidelná práce nejvýše v polovině týdenní pracovní doby, odvody od 4 500 Kč měsíčně (2026)."],
 ["DPH","Daň z přidané hodnoty. Plátcem se podnikatel stává při obratu nad 2 mil. Kč ročně. Jídla ve stravovacích službách mají 12 %, alkohol 21 %."],
 ["DPP","Dohoda o provedení práce. Nárazová práce nejvýše 300 hodin ročně, odvody od 12 000 Kč měsíčně u jednoho zaměstnavatele (2026)."],
 ["EET 2.0","Elektronická evidence tržeb. Nová verze se má vrátit od 1. 1. 2027, bez povinnosti tisknout účtenky."],
 ["Garant InvestEU","Program Národní rozvojové banky: státní záruka až 70 % jistiny úvěru od komerční banky."],
 ["HACCP","Systém kontroly hygieny a bezpečnosti potravin při práci s jídlem. Povinný v gastronomii."],
 ["Hostinská činnost","Živnost pro provoz restaurace. Je řemeslná a vyžaduje odbornou způsobilost."],
 ["JMHZ","Jednotné měsíční hlášení zaměstnavatele (od 1. 4. 2026), kterým zaměstnavatel hlásí zaměstnance a příjmy."],
 ["KHS","Krajská hygienická stanice. Kontroluje hygienu provozů."],
 ["Leasing","Pronájem vybavení s právem odkupu. Snižuje potřebu hotovosti na startu."],
 ["Mala (málá)","Sečuánská příchuť: pálivá a koření s „brněním“ na jazyku."],
 ["Marže","Rozdíl mezi cenou a náklady na suroviny. V modelu „zbývá po odečtení surovin“."],
 ["Obsazenost","Podíl obsazených míst z celkové kapacity za měsíc."],
 ["Odborná způsobilost","Doložená kvalifikace pro řemeslnou živnost (vzdělání v oboru nebo praxe)."],
 ["Odpovědný zástupce","Osoba s odbornou způsobilostí, která za firmu odpovídá za výkon živnosti."],
 ["OSVČ","Osoba samostatně výdělečně činná (živnostník)."],
 ["Pop-up","Dočasná akce nebo zkušební večery mimo stálou restauraci, sloužící k ověření poptávky."],
 ["Prohlášení poplatníka","Takzvaný růžový papír. Zaměstnanec jím u zaměstnavatele uplatní slevu na dani, v jednom měsíci jen u jednoho zaměstnavatele."],
 ["Ručení","Odpovědnost za dluh celým majetkem. U úvěru banka často žádá osobní ručení společníků i u s.r.o."],
 ["s.r.o.","Společnost s ručením omezeným. Základní kapitál od 1 Kč, firma ručí svým majetkem."],
 ["SLDB","Sčítání lidu, domů a bytů (naposledy 2021)."],
 ["Staff meal","Jídlo pro zaměstnance na účet podniku nebo se slevou."],
 ["Van Westendorp","Metoda zjištění přijatelného cenového pásma čtyřmi otázkami na cenu."],
 ["Zkušební otevření","Otevření pro pozvané hosty před velkým otevřením, sloužící k vyladění provozu a sběru recenzí."]
];

/* Rozjezd prvního roku (odhad) a jednotková ekonomika */
const RAMP={start:.25,target:.45,months:9};
function ramp(){const rows=[];let cum=0,min=0;for(let m=1;m<=12;m++){const occ=Math.min(RAMP.target,RAMP.start+(RAMP.target-RAMP.start)*(m-1)/(RAMP.months-1));const c=calc(occ,M.price);cum+=c.profit;min=Math.min(min,cum);rows.push({m,occ,g:c.g,profit:c.profit,cum})}return{rows,min}}
function unit(price){const net=price/(1+M.vat),food=net*M.food,gm=net-food,occ=.45,g=capMonth*occ;return[["Cena s DPH",fmtS(price)],["DPH ("+Math.round(M.vat*100)+" %)","−"+fmtS(price-net)],["Čistá tržba na hosta",fmtS(net)],["Suroviny ("+Math.round(M.food*100)+" %)","−"+fmtS(food)],["Zbývá po odečtení surovin",fmtS(gm)],["Stálé náklady a splátka na hosta při 45 %",fmtS((fixT+pay)/g)],["Zisk na hosta při 45 % (před daní)",fmtS(gm-(fixT+pay)/g)]]}
