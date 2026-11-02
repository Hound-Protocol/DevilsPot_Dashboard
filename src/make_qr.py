#!/usr/bin/env python3
"""Vygeneruje QR kódy dotazníku do assets/qr/ (spustit po změně SITE_URL nebo kanálů)."""
import os, re, qrcode
here = os.path.dirname(os.path.abspath(__file__))
site = re.search(r'SITE_URL="([^"]+)"', open(os.path.join(here, "quest.js"), encoding="utf-8").read()).group(1)
CH = {"hlavni": "", "plakat": "plakat", "instagram": "ig", "facebook": "fb", "kolej": "kolej", "osobne": "osobne"}
out = os.path.join(here, "..", "assets", "qr"); os.makedirs(out, exist_ok=True)
for name, z in CH.items():
    url = site + "dotaznik.html" + ("?z=" + z if z else "")
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=10, border=3)
    qr.add_data(url); qr.make(fit=True)
    qr.make_image(fill_color="black", back_color="white").save(os.path.join(out, "qr-" + name + ".png"))
    print(name, url)
