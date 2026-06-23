#!/usr/bin/env python3
"""
Genera las imágenes Open Graph (1200x630) para compartir en redes:
- public/og/og-default.png        -> tarjeta por defecto del sitio
- public/og/recursos/<slug>.png   -> una por recurso (portada + título)

Reejecutar tras agregar un recurso:  python3 scripts/generate-og.py
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COVERS = os.path.join(ROOT, "public", "covers")
LOGO = os.path.join(ROOT, "_reference", "assets", "logo-sigue-negro.png")
OUT = os.path.join(ROOT, "public", "og")
OUT_RES = os.path.join(OUT, "recursos")
os.makedirs(OUT_RES, exist_ok=True)

PAPEL = (246, 241, 232)
INK = (33, 26, 20)
MUTED = (110, 99, 88)

G = "/System/Library/Fonts/Supplemental/Georgia.ttf"
GB = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
GI = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"
AB = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def font(p, s):
    return ImageFont.truetype(p, s)


def hexc(h):
    return tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))


def dark_logo():
    """Logo recortado y recoloreado al tono de tinta del sitio (con alpha suave)."""
    img = Image.open(LOGO).convert("RGBA")
    W, H = img.size
    src = list(img.getdata())
    alpha = [int(max(0.0, 255.0 - (p[0] + p[1] + p[2]) / 3.0) * (p[3] / 255.0)) for p in src]
    mask = Image.new("L", (W, H))
    mask.putdata(alpha)
    mask = mask.crop(mask.getbbox())
    out = Image.new("RGBA", mask.size, INK + (255,))
    out.putalpha(mask)
    return out


LOGO_DARK = dark_logo()


def wrap(draw, text, fnt, max_w):
    lines, cur = [], ""
    for word in text.split():
        t = (cur + " " + word).strip()
        if draw.textlength(t, font=fnt) <= max_w:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def paste_cover(base, cover, x, y, w, h):
    cov = cover.resize((w, h), Image.LANCZOS).convert("RGBA")
    shadow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    shadow.paste(Image.new("RGBA", (w, h), (20, 15, 10, 120)), (x, y + 16))
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    base.alpha_composite(shadow)
    base.alpha_composite(cov, (x, y))


def place_logo(base, height, xy):
    lw = int(LOGO_DARK.width * height / LOGO_DARK.height)
    base.alpha_composite(LOGO_DARK.resize((lw, height), Image.LANCZOS), xy)
    return lw


def make_resource_card(slug, title, subtitle, typelabel, coverfile, accent):
    W, H, m = 1200, 630, 80
    img = Image.new("RGBA", (W, H), PAPEL + (255,))
    d = ImageDraw.Draw(img)
    ac = hexc(accent)

    cover = Image.open(os.path.join(COVERS, coverfile)).convert("RGBA")
    chh = 466
    cww = int(chh * cover.width / cover.height)
    cx, cy = W - m - cww, (H - chh) // 2
    paste_cover(img, cover, cx, cy, cww, chh)

    text_w = cx - m - 56
    place_logo(img, 30, (m, 70))
    d.text((m, 150), typelabel.upper(), font=font(AB, 21), fill=ac + (255,))

    y = 192
    tf = font(GB, 58)
    for line in wrap(d, title, tf, text_w):
        d.text((m, y), line, font=tf, fill=INK + (255,))
        y += 68
    y += 8
    sf = font(GI, 27)
    for line in wrap(d, subtitle, sf, text_w):
        d.text((m, y), line, font=sf, fill=MUTED + (255,))
        y += 37

    d.text((m, H - m - 4), "Descarga gratis en PDF", font=font(AB, 23), fill=ac + (255,))
    img.convert("RGB").save(os.path.join(OUT_RES, slug + ".png"), quality=92)
    print("  og/recursos/" + slug + ".png")


def make_default_card():
    W, H = 1200, 630
    img = Image.new("RGBA", (W, H), PAPEL + (255,))
    d = ImageDraw.Draw(img)
    ac = hexc("#C2462F")

    lw = int(LOGO_DARK.width * 150 / LOGO_DARK.height)
    lx, ly = (W - lw) // 2, 168
    img.alpha_composite(LOGO_DARK.resize((lw, 150), Image.LANCZOS), (lx, ly))

    ry = ly + 150 + 50
    d.rectangle([(W // 2 - 38, ry), (W // 2 + 38, ry + 4)], fill=ac + (255,))

    tag = "Libros y estudios bíblicos gratuitos para grupos pequeños"
    tf = font(G, 37)
    ty = ry + 40
    for line in wrap(d, tag, tf, 880):
        w = d.textlength(line, font=tf)
        d.text(((W - w) // 2, ty), line, font=tf, fill=INK + (255,))
        ty += 50

    uf = font(AB, 25)
    url = "siguerecursos.com"
    w = d.textlength(url, font=uf)
    d.text(((W - w) // 2, ty + 20), url, font=uf, fill=ac + (255,))
    img.convert("RGB").save(os.path.join(OUT, "og-default.png"), quality=92)
    print("  og/og-default.png")


RESOURCES = [
    ("trabajo-evangelio", "Trabajo y Evangelio", "Del Edén hasta la nueva creación", "Libro corto", "cover-trabajo-evangelio.png", "#C2462F"),
    ("discipulos", "Discípulos de Cristo", "Cinco estudios bíblicos para grupos pequeños", "Estudio bíblico", "cover-discipulos.png", "#A6802F"),
    ("oracion", "Vida de Oración", "Cinco estudios bíblicos para grupos pequeños", "Estudio bíblico", "cover-oracion.png", "#B23A0E"),
    ("prioridades", "Prioridades", "Cinco estudios bíblicos para grupos pequeños", "Estudio bíblico", "cover-prioridades.png", "#1187A8"),
]

print("Generando imágenes Open Graph:")
make_default_card()
for r in RESOURCES:
    make_resource_card(*r)
print("Listo.")
