#!/usr/bin/env python3
"""Hand-authored premium architecture SVG for Rizent (matches CareerOS style)."""

FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
ACCENT = "#8b5cf6"

W = 1040
CARD_W = 168
CARD_H = 64
GAP = 32

parts = []

def rect(x, y, w, h, rx, fill, stroke, sw=1, shadow=True):
    f = ' filter="url(#cardShadow)"' if shadow else ''
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{f}/>')

def text(x, y, s, size, weight, fill, anchor="middle"):
    s = s.replace("&", "&amp;")
    parts.append(f'<text x="{x}" y="{y}" text-anchor="{anchor}" font-size="{size}" font-weight="{weight}" fill="{fill}" font-family="{FONT}">{s}</text>')

def vline_arrow(x, y1, y2):
    parts.append(f'<line x1="{x}" y1="{y1}" x2="{x}" y2="{y2}" stroke="{ACCENT}" stroke-opacity="0.55" stroke-width="1.6"/>')
    parts.append(f'<path d="M {x-5} {y2} L {x+5} {y2} L {x} {y2+9} Z" fill="{ACCENT}" fill-opacity="0.65"/>')

def section(y, label, cards):
    """cards: list of (title_lines,) centered as a peer row, no chevrons."""
    n = len(cards)
    content_w = n * CARD_W + (n - 1) * GAP
    start_x = (W - content_w) / 2
    section_h = 146
    rect(40, y, 960, section_h, 20, "rgba(255,255,255,0.02)", "rgba(255,255,255,0.08)", 1, shadow=False)
    text(64, y + 36, label, 11.5, 700, "rgba(255,255,255,0.44)", anchor="start")
    parts[-1] = parts[-1].replace('font-weight="700"', 'font-weight="700" letter-spacing="0.09em"')
    row_y = y + 58
    for i, lines in enumerate(cards):
        cx = start_x + i * (CARD_W + GAP)
        rect(cx, row_y, CARD_W, CARD_H, 12, "rgba(255,255,255,0.045)", "rgba(255,255,255,0.11)", 1)
        cxm = cx + CARD_W / 2
        if len(lines) == 1:
            text(cxm, row_y + CARD_H / 2 + 5.5, lines[0], 13, 600, "rgba(255,255,255,0.92)")
        else:
            ty = row_y + CARD_H / 2 - (len(lines) - 1) * 8.5 + 5
            for j, line in enumerate(lines):
                text(cxm, ty + j * 17, line, 12.5, 600, "rgba(255,255,255,0.92)")
    return y + section_h

# ---- Trigger ----
trig_w, trig_h = 230, 60
trig_x = (W - trig_w) / 2
trig_y = 30
rect(trig_x, trig_y, trig_w, trig_h, 16, f"{ACCENT}1F", f"{ACCENT}", 1.3)
parts[-1] = parts[-1].replace(f'stroke="{ACCENT}"', f'stroke="{ACCENT}" stroke-opacity="0.55"')
text(W/2, trig_y + 35, "Founder", 15, 700, "rgba(255,255,255,0.92)")
text(W/2, trig_y + 50, "Web Dashboard · Telegram", 10.5, 500, "rgba(255,255,255,0.45)")

cursor = trig_y + trig_h
vline_arrow(W/2, cursor, cursor + 31)
cursor += 31

cursor = section(cursor, "APPLICATION LAYER", [
    ["Express API"],
    ["BullMQ", "Worker Fleet"],
])
vline_arrow(W/2, cursor, cursor + 31)
cursor += 31

cursor = section(cursor, "COST-TIERED AI", [
    ["OpenRouter · GPT-4o", "Match & Strategy"],
    ["OpenRouter", "GPT-4o-mini", "Draft & Classify"],
    ["Gemini 2.0 Flash", "Extraction"],
])
vline_arrow(W/2, cursor, cursor + 31)
cursor += 31

cursor = section(cursor, "DATA", [
    ["Postgres"],
    ["Redis"],
    ["Gmail", "(mocked in dev)"],
])

H = cursor + 30

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="Rizent architecture: founder web and Telegram interfaces trigger the Express API and BullMQ worker fleet, which route through cost-tiered AI providers and persist to Postgres, Redis, and mocked Gmail.">

  <defs>
    <filter id="cardShadow" x="-30%" y="-30%" width="160%" height="180%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.30"/>
    </filter>
  </defs>

{''.join(parts)}
</svg>
'''

out = "/Users/vipulkatarnaware/Documents/AI Agents/thewebsite/public/artifacts/rizent/docs/rizent-architecture.svg"
with open(out, "w") as f:
    f.write(svg)
print("Wrote", out, "height", H)
