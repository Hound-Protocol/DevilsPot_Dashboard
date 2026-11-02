/**
 * DevilsPot: příjem odpovědí z dotazníku a uložení na GitHub. Cloudflare Worker (zdarma).
 * Nastavení (Settings > Variables and Secrets):
 *   GH_REPO          text    repozitář pro ANONYMNÍ odpovědi, např. Hound-Protocol/DevilsPot_Dashboard
 *   GH_BRANCH        text    větev pro data, např. data (aby se nespouštěl web z main)
 *   GH_REPO_PRIVATE  text    SOUKROMÝ repozitář pro e-maily a volné texty, např. Hound-Protocol/DevilsPot_Data (volitelné)
 *   GH_TOKEN         secret  fine-grained token pro oba repozitáře, oprávnění Contents: Read and write
 *   ALLOW_ORIGIN     text    https://hound-protocol.github.io
 * Veřejná část (GH_REPO): odpovedi/RRRR-MM/<id>.json (jen volby a čísla) a souhrn.json (počty).
 * Soukromá část (GH_REPO_PRIVATE): kontakty/RRRR-MM/<id>.json (e-mail a volné texty). Bez GH_REPO_PRIVATE se e-mail a texty NEUKLÁDAJÍ.
 */
const OPTIONS = {"1":["Ano, už jsem ho jedl/a","Znám ho, ale ještě jsem ho nejedl/a","Ne, nevím, co to je"],"2":["V Praze","V Brně","V jiném městě v ČR","V zahraničí","Doma"],"3":[],"4":["Jednou týdně nebo častěji","2–3× měsíčně","Jednou měsíčně","Několikrát za rok","Spíš bych nechodil/a"],"5":["S přáteli (parta 4+ lidí)","S partnerem/partnerkou","S rodinou","S kolegy (firemní akce)","Sám/sama"],"6":["Všední den večer","Pátek nebo sobota večer","Víkend odpoledne","Oběd ve všední den","Při oslavě nebo speciální příležitosti"],"7":["All-you-can-eat (pevná cena, neomezeně)","Sety pro 2–4 osoby","À la carte (platím za to, co si vyberu)","Nevím, záleží na ceně"],"8":["Do 300 Kč","300–400 Kč","400–500 Kč","500–600 Kč","600–700 Kč","700–800 Kč","Více než 800 Kč"],"9":["Cena","Kvalita masa a surovin","Výběr vývarů","Atmosféra a vzhled","Rychlost obsluhy","Poloha a parkování","Vegetariánské a bezmasé možnosti","Zážitek a fotky na sociální sítě"],"10":["Jemný kuřecí","Pálivý sečuánský","Houbový","Rajčatový","Thajský (tom yum)","Bezmasý/vegan"],"11":[],"12":["V centru","Blízko univerzity","V nákupním centru","Nezáleží, hlavně dobré jídlo"],"13":["Instagram","TikTok","Facebook","Google Maps","Od kamarádů","Plakát nebo leták (například na univerzitě)"],"14":["Student/ka UTB","Student/ka jiné školy","Pracující","Jiné"],"15":["do 18","19–24","25–34","35–44","45 a více"],"16":["Ve Zlíně","V okolí Zlína","Jinde"],"17":[],"18":[],"19":[]};
const CHOICE = [1, 2, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16];
const SCALE = [3, 11];
const REQUIRED = [1, 3, 4, 8, 14];

const b64 = s => { const by = new TextEncoder().encode(s); let t = ""; for (const b of by) t += String.fromCharCode(b); return btoa(t); };
const unb64 = s => { const bin = atob(s.replace(/\n/g, "")); return new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0))); };
const emptyAgg = () => ({ n: 0, c: {}, s: { 3: [0, 0, 0, 0, 0], 11: [0, 0, 0, 0, 0] }, vw: { vw1: [], vw2: [], vw3: [], vw4: [] }, src: {} });

function gh(env, method, path, body, priv) {
  const repo = priv ? env.GH_REPO_PRIVATE : env.GH_REPO;
  const branch = priv ? "main" : (env.GH_BRANCH || "main");
  if (body && !priv && env.GH_BRANCH) body = { ...body, branch };
  const url = `https://api.github.com/repos/${repo}/contents/${path}` + (method === "GET" ? `?ref=${branch}` : "");
  return fetch(url, {
    method,
    headers: { Authorization: `Bearer ${env.GH_TOKEN}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "devilspot-form", "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
}

function clean(d) {
  const r = { cas: new Date().toISOString() };
  for (const n of CHOICE) {
    const allowed = OPTIONS[n] || [];
    let v = d["q" + n];
    if (Array.isArray(v)) v = v.filter(x => allowed.includes(x)).slice(0, 10);
    else v = allowed.includes(v) ? v : "";
    r["q" + n] = v;
  }
  for (const n of SCALE) { const x = Math.round(Number(d["q" + n])); r["q" + n] = x >= 1 && x <= 5 ? x : ""; }
  const email = String(d.q19 || "").trim().slice(0, 120);
  const consent = !!d.consent && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  r.souhlas_email = consent;
  for (let i = 1; i <= 4; i++) { const x = Number(d["vw" + i]); r["vw" + i] = x > 0 && x <= 5000 ? Math.round(x) : ""; }
  r.zdroj = /^[a-z0-9_-]{1,20}$/i.test(String(d.src || "")) ? String(d.src) : "";
  const t = Number(d.t); r.sekund = t >= 0 && t <= 7200 ? Math.round(t) : null;
  r.__priv = { q17: String(d.q17 || "").slice(0, 800), q18: String(d.q18 || "").slice(0, 800), q19: consent ? email : "", souhlas_email: consent };
  return r;
}

function addToAgg(a, r) {
  a.n++;
  for (const n of CHOICE) {
    const vals = Array.isArray(r["q" + n]) ? r["q" + n] : (r["q" + n] ? [r["q" + n]] : []);
    a.c[n] = a.c[n] || {};
    for (const v of vals) a.c[n][v] = (a.c[n][v] || 0) + 1;
  }
  for (const n of SCALE) if (r["q" + n] !== "") a.s[n][r["q" + n] - 1]++;
  for (let i = 1; i <= 4; i++) if (r["vw" + i] !== "") a.vw["vw" + i].push(r["vw" + i]);
  const s = r.zdroj || "neuvedeno"; a.src[s] = (a.src[s] || 0) + 1;
}

function median(arr) { if (!arr.length) return null; const s = [...arr].sort((x, y) => x - y), m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; }

function publicView(a) {
  const q = {};
  for (const n of CHOICE) q[n] = a.c[n] || {};
  for (const n of SCALE) { const d = a.s[n], k = d.reduce((x, y) => x + y, 0), sum = d.reduce((x, y, i) => x + y * (i + 1), 0); q[n] = { avg: k ? sum / k : null, dist: { 1: d[0], 2: d[1], 3: d[2], 4: d[3], 5: d[4] }, n: k }; }
  const vw = {}; for (let i = 1; i <= 4; i++) vw["vw" + i] = median(a.vw["vw" + i]);
  return { n: a.n, q, vw, src: a.src };
}

async function readAgg(env) {
  const r = await gh(env, "GET", "souhrn.json");
  if (r.status === 404) return { agg: emptyAgg(), sha: null };
  if (!r.ok) throw new Error("GitHub " + r.status);
  const j = await r.json();
  return { agg: JSON.parse(unb64(j.content)), sha: j.sha };
}

async function updateAgg(env, rec) {
  for (let i = 0; i < 5; i++) {
    const { agg, sha } = await readAgg(env);
    addToAgg(agg, rec);
    const body = { message: "Souhrn: " + agg.n + " odpovědí", content: b64(JSON.stringify(agg)) };
    if (sha) body.sha = sha;
    const r = await gh(env, "PUT", "souhrn.json", body);
    if (r.ok) return true;
    if (r.status !== 409 && r.status !== 422) throw new Error("GitHub " + r.status);
    await new Promise(res => setTimeout(res, 150 * (i + 1)));
  }
  return false;
}

export default {
  async fetch(req, env) {
    const cors = { "Access-Control-Allow-Origin": env.ALLOW_ORIGIN || "*", "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Cache-Control": "no-store" };
    const out = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { ...cors, "Content-Type": "application/json" } });
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (!env.GH_REPO || !env.GH_TOKEN) return out({ ok: false, chyba: "neni_nastaveno" }, 500);
    try {
      if (req.method === "GET") return out(publicView((await readAgg(env)).agg));
      if (req.method !== "POST") return out({ ok: false }, 405);
      const text = await req.text();
      if (text.length > 20000) return out({ ok: false }, 413);
      const d = JSON.parse(text);
      if (d.hp) return out({ ok: true });                         // past na roboty
      const rec = clean(d);
      const priv = rec.__priv; delete rec.__priv;
      if (!REQUIRED.every(n => rec["q" + n] !== "" && rec["q" + n] != null)) return out({ ok: false, chyba: "chybi_povinne" }, 400);
      const now = new Date(), id = now.toISOString().replace(/[-:T]/g, "").slice(0, 14) + "-" + crypto.randomUUID().slice(0, 8);
      const path = `odpovedi/${now.toISOString().slice(0, 7)}/${id}.json`;
      const r = await gh(env, "PUT", path, { message: "Nová odpověď " + id, content: b64(JSON.stringify(rec, null, 2)) });
      if (!r.ok) return out({ ok: false, chyba: "github_" + r.status }, 502);
      let kontakt = false;
      if (env.GH_REPO_PRIVATE && (priv.q17 || priv.q18 || priv.q19)) {
        try {
          const pr = await gh(env, "PUT", `kontakty/${now.toISOString().slice(0, 7)}/${id}.json`, { message: "Kontakt " + id, content: b64(JSON.stringify({ id, cas: rec.cas, ...priv }, null, 2)) }, true);
          kontakt = pr.ok;
        } catch (e) { /* soukromá část se nepovedla, anonymní odpověď je uložena */ }
      }
      let souhrn = false;
      try { souhrn = await updateAgg(env, rec); } catch (e) { /* odpověď je uložena, souhrn lze přepočítat */ }
      return out({ ok: true, souhrn, kontakt });
    } catch (e) {
      return out({ ok: false }, 500);
    }
  }
};
