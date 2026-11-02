#!/usr/bin/env python3
"""Sestaví ../index.html (dashboard) a ../dotaznik.html (veřejný dotazník) ze src/. Spuštění: python3 src/build.py"""
import os, json
here = os.path.dirname(os.path.abspath(__file__))
root = os.path.join(here, "..")
rd = lambda n: open(os.path.join(here, n), encoding="utf-8").read()
css = rd("hell.css")
gs = "const APPS_SCRIPT=" + json.dumps(rd("apps-script/Code.gs"), ensure_ascii=False) + ";"

dash_data = "\n".join(rd(n) for n in ["data.js", "quest.js", "data2.js", "plan.js"]) + "\n" + gs
out = rd("index.tpl.html").replace("/*CSS*/", css).replace("/*DATA*/", dash_data).replace("/*APP*/", rd("app.js"))
open(os.path.join(root, "index.html"), "w", encoding="utf-8").write(out)

form = rd("dotaznik.tpl.html").replace("/*CSS*/", css).replace("/*DATA*/", rd("quest.js")).replace("/*APP*/", rd("form.js"))
open(os.path.join(root, "dotaznik.html"), "w", encoding="utf-8").write(form)
print("sestaveno: index.html", len(out), "znaků, dotaznik.html", len(form), "znaků")
