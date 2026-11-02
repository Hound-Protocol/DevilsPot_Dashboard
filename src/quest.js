/* Dotazník: otázky (sdílí dashboard i veřejná stránka dotaznik.html) */
const SITE_URL="https://hound-protocol.github.io/DevilsPot_Dashboard/";
/* Adresa Cloudflare Workeru, který ukládá odpovědi do soukromého repozitáře DevilsPot_Data. Prázdné = testovací režim, odpovědi se neukládají. */
const QFORM_URL="";
/* Zapnout (true) až když má Worker nastavený soukromý repozitář GH_REPO_PRIVATE. Bez něj se e-mail a volné otázky ve formuláři nezobrazují. */
const QPRIVATE=false;
const QINTRO="Ve Zlíně chystáme novou restauraci s hotpotem (společné vaření v hrnci s vývarem přímo u stolu). Pomozte nám pár minutami: dotazník je anonymní a zabere asi 3 minuty. Vaše odpovědi nám pomohou vybrat menu, ceny i místo. Děkujeme!";
const QEND="Děkujeme! Sledujte nás, brzy se ozveme se zkušebními večery.";
const QUEST=[
 ["A. Znalost a zájem",[
  [1,"Znáte hotpot?","jedna odpověď",["Ano, už jsem ho jedl/a","Znám ho, ale ještě jsem ho nejedl/a","Ne, nevím, co to je"]],
  [2,"Kde jste hotpot jedl/a?","více odpovědí, jen pokud jste v otázce 1 zvolil/a „už jsem ho jedl/a“",["V Praze","V Brně","V jiném městě v ČR","V zahraničí","Doma"]],
  [3,"Chtěl/a byste mít hotpot restauraci ve Zlíně?","škála 1–5 (1 = rozhodně ne, 5 = rozhodně ano)",[]],
  [4,"Jak často byste restauraci navštěvoval/a?","jedna odpověď",["Jednou týdně nebo častěji","2–3× měsíčně","Jednou měsíčně","Několikrát za rok","Spíš bych nechodil/a"]]
 ]],
 ["B. Návyky",[
  [5,"S kým byste nejčastěji šel/šla?","více odpovědí",["S přáteli (parta 4+ lidí)","S partnerem/partnerkou","S rodinou","S kolegy (firemní akce)","Sám/sama"]],
  [6,"Kdy byste přišel/přišla?","více odpovědí",["Všední den večer","Pátek nebo sobota večer","Víkend odpoledne","Oběd ve všední den","Při oslavě nebo speciální příležitosti"]],
  [7,"Jaký typ nabídky byste preferoval/a?","jedna odpověď",["All-you-can-eat (pevná cena, neomezeně)","Sety pro 2–4 osoby","À la carte (platím za to, co si vyberu)","Nevím, záleží na ceně"]]
 ]],
 ["C. Cena",[
  [8,"Kolik jste ochotni utratit na jednu osobu za jídlo (bez alkoholu)?","jedna odpověď",["Do 300 Kč","300–400 Kč","400–500 Kč","500–600 Kč","600–700 Kč","700–800 Kč","Více než 800 Kč"]]
 ]],
 ["D. Co je pro vás důležité",[
  [9,"Vyberte tři nejdůležitější věci při výběru restaurace.","nejvýše 3 odpovědi",["Cena","Kvalita masa a surovin","Výběr vývarů","Atmosféra a vzhled","Rychlost obsluhy","Poloha a parkování","Vegetariánské a bezmasé možnosti","Zážitek a fotky na sociální sítě"]],
  [10,"Jaké vývary byste chtěl/a?","více odpovědí",["Jemný kuřecí","Pálivý sečuánský","Houbový","Rajčatový","Thajský (tom yum)","Bezmasý/vegan"]],
  [11,"Jak pálivé jídlo máte rád/a?","škála 1–5 (1 = vůbec ne, 5 = co nejpálivější)",[]],
  [12,"Kde ve Zlíně byste restauraci chtěl/a?","jedna odpověď",["V centru","Blízko univerzity","V nákupním centru","Nezáleží, hlavně dobré jídlo"]]
 ]],
 ["E. Komunikace",[
  [13,"Kde se o nové restauraci nejspíš dozvíte?","více odpovědí",["Instagram","TikTok","Facebook","Google Maps","Od kamarádů","Plakát nebo leták (například na univerzitě)"]]
 ]],
 ["F. O vás",[
  [14,"Jste:","jedna odpověď",["Student/ka UTB","Student/ka jiné školy","Pracující","Jiné"]],
  [15,"Věk:","jedna odpověď",["do 18","19–24","25–34","35–44","45 a více"]],
  [16,"Bydlíte:","jedna odpověď",["Ve Zlíně","V okolí Zlína","Jinde"]]
 ]],
 ["G. Otevřené otázky (nepovinné)",[
  [17,"Co by vás přesvědčilo, abyste přišel/přišla?","volná odpověď",[]],
  [18,"Co by vás naopak odradilo?","volná odpověď",[]],
  [19,"Chcete se dozvědět o otevření a o zkušebních večerech? Zadejte e-mail.","nepovinné; zadáním souhlasíte, že vám napíšeme pouze o DevilsPotu a kdykoliv se můžete odhlásit",[]]
 ]]
];
const QVW=["Při jaké ceně na osobu byste hotpot považoval/a za tak levný, že pochybujete o kvalitě?","Při jaké ceně by to byla výhodná nabídka?","Při jaké ceně by to začalo být drahé, ale ještě byste šel/šla?","Při jaké ceně by to bylo příliš drahé a nešel/nešla byste?"];
