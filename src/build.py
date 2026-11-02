#!/usr/bin/env python3
"""Sestaví ../index.html ze src/ (CSS + data + plán + aplikace). Spuštění: python3 src/build.py"""
import os
here=os.path.dirname(os.path.abspath(__file__))
rd=lambda n:open(os.path.join(here,n),encoding="utf-8").read()
data="\n".join(rd(n) for n in ["data.js","data2.js","plan.js"])
out=rd("index.tpl.html").replace("/*CSS*/",rd("hell.css")).replace("/*DATA*/",data).replace("/*APP*/",rd("app.js"))
open(os.path.join(here,"..","index.html"),"w",encoding="utf-8").write(out)
print("index.html sestaven,",len(out),"znaků")
