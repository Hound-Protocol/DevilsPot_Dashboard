#!/usr/bin/env python3
"""Sestaví ../index.html (dashboard) a ../dotaznik.html (veřejný dotazník) ze src/. Spuštění: python3 src/build.py"""
import os, json, subprocess
here = os.path.dirname(os.path.abspath(__file__))
root = os.path.join(here, "..")
rd = lambda n: open(os.path.join(here, n), encoding="utf-8").read()
css = rd("hell.css")
js = "eval(require('fs').readFileSync(process.argv[1],'utf8')+';console.log(JSON.stringify(Object.fromEntries(QUEST.flatMap(([s,qs])=>qs.map(q=>[q[0],q[3]])))))')"
opts = subprocess.run(["node", "-e", js, os.path.join(here, "quest.js")], capture_output=True, text=True, check=True).stdout.strip()
worker = rd("worker/worker.mjs").replace("/*OPTIONS*/{}", opts)
open(os.path.join(root, "assets", "worker.mjs"), "w", encoding="utf-8").write(worker)
gs = "const WORKER_CODE=" + json.dumps(worker, ensure_ascii=False) + ";"

dash_data = "\n".join(rd(n) for n in ["data.js", "quest.js", "data2.js", "plan.js"]) + "\n" + gs
out = rd("index.tpl.html").replace("/*CSS*/", css).replace("/*DATA*/", dash_data).replace("/*APP*/", rd("app.js"))
open(os.path.join(root, "index.html"), "w", encoding="utf-8").write(out)

form = rd("dotaznik.tpl.html").replace("/*CSS*/", css).replace("/*DATA*/", rd("quest.js")).replace("/*APP*/", rd("form.js"))
open(os.path.join(root, "dotaznik.html"), "w", encoding="utf-8").write(form)
print("sestaveno: index.html", len(out), "znaků, dotaznik.html", len(form), "znaků")
