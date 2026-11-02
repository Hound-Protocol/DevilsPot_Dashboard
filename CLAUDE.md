# DevilsPot dashboard: pravidla pro Clauda

Statická stránka (GitHub Pages) s přehledem projektu hotpot restaurace DevilsPot ve Zlíně. Zakladatelé: Erik (byznys a marketing) a Filip (gastro). Dashboard je čistě informační, bez políček k psaní. Obsah píše a aktualizuje Claude. Jazyk: čeština, neutrální formulace bez „já“ (výjimka: sekce „O co se postará Claude“).

## Povinný postup při KAŽDÉ diskuzi s novými informacemi
1. Zapsat nová data do `src/data.js` / `src/data2.js` (a odpovídající místa v `src/plan.js`).
2. **Promítnout je do podnikového plánu** (`src/plan.js`, pole `PLAN_DOC`, přílohy `PLAN_APPX`). Plán je zdrojem pro záložku Podnikový plán i pro stažení do Wordu (.docx), takže stačí upravit data a plán se přegeneruje.
3. Zapsat rozhodnutí do `DECISIONS` (`src/data2.js`), nové odkazy do `SRC` (`src/data.js`), kroky do `ROAD`.
4. Zvýšit `VERSION` a přepsat `WHATS_NEW` na konci `src/data.js` (zobrazí se okno „Nová pekelná verze je online!“ s tlačítkem „Zažehni mě, synku“).
5. Aktualizovat `UPDATED` (datum).
6. Sestavit: `python3 src/build.py` (vytvoří `index.html`).
7. Ověřit v prohlížeči (Playwright): bez chyb v konzoli, stažení .docx funguje a dokument jde otevřít.
8. Commit a push na `main` s přílohou Co-Authored-By.

## Struktura
- `src/data.js`: model financí (INV, FIXED, M), přehled, konkurence, marketing, provoz, právo, financování, harmonogram, zdroje, VERSION, WHATS_NEW.
- `src/data2.js`: dotazník (QUEST), terénní ověření (FIELD), rozhodnutí (DECISIONS), nábor brigádníků (BRIG), zásady zaměstnávání (ZAS), SWOT, slovníček (GLOSS), rozjezd prvního roku a jednotková ekonomika (ramp, unit).
- `src/quest.js`: otázky dotazníku, SITE_URL a QFORM_URL (adresa Cloudflare Workeru; prázdná = testovací režim).
- `src/form.js`, `src/dotaznik.tpl.html`: veřejná stránka dotazníku (`dotaznik.html`). `src/worker/worker.mjs`: Cloudflare Worker, který ukládá odpovědi do SOUKROMÉHO repozitáře Hound-Protocol/DevilsPot_Data (sestavený do `assets/worker.mjs`). Osobní data patří jen do soukromého repozitáře, nikdy sem. `src/make_qr.py`: QR kódy do `assets/qr/`.
- `src/plan.js`: podnikový plán jako dokument (PLAN_DOC, PLAN_APPX).
- `src/app.js`: vykreslení, navigace, export do Wordu, efekty.
- `src/hell.css`, `src/index.tpl.html`: vzhled a šablona.
- `vendor/docx.umd.js`: knihovna docx (export do Wordu), nepřepisovat.
- `index.html` a `dotaznik.html`: SESTAVENÉ výstupy, needitovat ručně.

## Pravidla obsahu
- Čísla, která jsou odhady, označovat „odhad“ nebo „k ověření“. Zjištěné údaje mít zdroj v záložce Zdroje.
- Zásady zaměstnávání (závazné): jasné, legálně podložené, vstřícné, klidné a férové podmínky pro všechny, šance růst, bezpečné, čisté a profesionální prostředí.
- Nejsem právník ani účetní: právní a daňové věci vždy označit k ověření s účetní, poradcem nebo úřadem.
- Repozitář i stránka jsou veřejné: neukládat osobní údaje ani citlivé informace.
