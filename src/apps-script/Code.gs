/**
 * DevilsPot – ukládání odpovědí z dotazníku do Google tabulky.
 * Postup: nová Google tabulka > Rozšíření > Apps Script > vložit tento kód > Nasadit > Nová nasazení >
 * typ "Webová aplikace", Spustit jako: Já, Přístup: Kdokoli > zkopírovat adresu webové aplikace.
 * E-maily a volné odpovědi zůstávají jen v tabulce, veřejný výstup (doGet) obsahuje pouze souhrnné počty.
 */
var SHEET = 'Odpovědi';
var HEAD = ['Čas'];
for (var i = 1; i <= 19; i++) HEAD.push('q' + i);
for (var j = 1; j <= 4; j++) HEAD.push('vw' + j);
HEAD.push('souhlas s e-mailem', 'zdroj', 'sekund vyplňování');

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET);
  if (!sh) { sh = ss.insertSheet(SHEET); sh.appendRow(HEAD); sh.setFrozenRows(1); }
  return sh;
}

function clean_(v) {
  if (Array.isArray(v)) v = v.join('; ');
  v = String(v == null ? '' : v).slice(0, 1000);
  return /^[=+\-@]/.test(v) ? "'" + v : v;   // ochrana před vložením vzorců
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents);
    if (d.hp) return out_({ ok: true });                 // past na roboty
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    var row = [new Date()];
    for (var i = 1; i <= 19; i++) row.push(clean_(d['q' + i]));
    for (var j = 1; j <= 4; j++) row.push(clean_(d['vw' + j]));
    row.push(d.consent ? 'ano' : 'ne', clean_(d.src), Number(d.t) || '');
    sheet_().appendRow(row);
    lock.releaseLock();
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false });
  }
}

function median_(a) {
  a = a.filter(function (x) { return !isNaN(x); }).sort(function (x, y) { return x - y; });
  if (!a.length) return null;
  var m = Math.floor(a.length / 2);
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
}

/* Veřejný souhrn: bez e-mailů a volných odpovědí */
function doGet() {
  var vals = sheet_().getDataRange().getValues();
  var n = Math.max(0, vals.length - 1);
  var res = { n: n, q: {}, vw: {}, src: {} };
  [1, 2, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16].forEach(function (c) {
    var cnt = {};
    for (var r = 1; r < vals.length; r++) {
      String(vals[r][c] || '').split('; ').forEach(function (o) { if (o) cnt[o] = (cnt[o] || 0) + 1; });
    }
    res.q[c] = cnt;
  });
  [3, 11].forEach(function (c) {
    var dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, s = 0, k = 0;
    for (var r = 1; r < vals.length; r++) {
      var v = Number(vals[r][c]);
      if (v >= 1 && v <= 5) { dist[v]++; s += v; k++; }
    }
    res.q[c] = { avg: k ? s / k : null, dist: dist, n: k };
  });
  for (var w = 1; w <= 4; w++) {
    var col = 19 + w, arr = [];
    for (var r2 = 1; r2 < vals.length; r2++) { var x = Number(vals[r2][col]); if (vals[r2][col] !== '' && x > 0) arr.push(x); }
    res.vw['vw' + w] = median_(arr);
  }
  var sc = 25;
  for (var r3 = 1; r3 < vals.length; r3++) { var s2 = String(vals[r3][sc] || 'neuvedeno'); res.src[s2] = (res.src[s2] || 0) + 1; }
  return out_(res);
}
