#!/usr/bin/env python3
"""Hand-authored premium user-flow SVG for MoatDaily (matches CareerOS/Rizent style)."""

FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
ACCENT = "#8b5cf6"

CARD_W, CARD_H = 152, 132
STEP = 198
Y = 40
MARGIN = 40

def icon_rss():
    return '<circle cx="6" cy="18" r="2"/><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 5a15 15 0 0 1 15 15"/>'

def icon_rank():
    return '<line x1="4" y1="20.5" x2="20" y2="20.5"/><rect x="6" y="13" width="3.2" height="7.5"/><rect x="10.4" y="8.5" width="3.2" height="12"/><rect x="14.8" y="4.5" width="3.2" height="16"/>'

def icon_pencil():
    return '<path d="M4 20l1-4.5L15.5 5l3.5 3.5L8.5 19z"/><path d="M13 7l3.5 3.5"/>'

def icon_image():
    return '<rect x="3.5" y="4.5" width="17" height="14" rx="1.5"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M4 16l4.5-4.5 3 3 4-5 4.5 6.5"/>'

def icon_render():
    return '<rect x="3.5" y="4.5" width="17" height="12" rx="1.5"/><path d="M8.5 21h7"/><path d="M12 16.5v4.5"/><path d="M8 9l-2 2 2 2"/><path d="M14 9l2 2-2 2"/>'

def icon_shield_check():
    return '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'

def icon_gate():
    return '<circle cx="12" cy="12" r="8.5"/><path d="M8 12.5l2.7 2.7L16.5 9"/>'

def icon_instagram():
    return '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="16.2" cy="7.8" r="0.9" fill="currentColor"/>'

def icon_sheet():
    return '<rect x="4" y="4" width="16" height="16" rx="1.5"/><line x1="4" y1="9.5" x2="20" y2="9.5"/><line x1="4" y1="14.5" x2="20" y2="14.5"/><line x1="10.5" y1="4" x2="10.5" y2="20"/>'

steps = [
    (["RSS +", "Google News"], icon_rss(), False),
    (["Score & Rank", "pool of 4"], icon_rank(), False),
    (["Write Copy", "grounded"], icon_pencil(), False),
    (["Source Image", "waterfall + CV"], icon_image(), False),
    (["Render", "Jinja2 + Playwright"], icon_render(), False),
    (["Quality Review", "mechanical + Gemini"], icon_shield_check(), False),
    (["Publish Gate", "re-verifies live"], icon_gate(), True),
    (["Instagram", "Graph API"], icon_instagram(), False),
    (["Sheets Log", "audit trail"], icon_sheet(), False),
]

n = len(steps)
W = MARGIN * 2 + CARD_W + (n - 1) * STEP
H = 212

parts = []

def text(x, y, s, size, weight, fill):
    s = s.replace("&", "&amp;")
    parts.append(f'<text x="{x}" y="{y}" text-anchor="middle" font-size="{size}" font-weight="{weight}" fill="{fill}" font-family="{FONT}">{s}</text>')

for i, (lines, icon_path, accent) in enumerate(steps):
    x = MARGIN + i * STEP
    cx = x + CARD_W / 2
    num = f"{i+1:02d}"

    if accent:
        fill, stroke = f"{ACCENT}1F", f"{ACCENT}80"
    else:
        fill, stroke = "rgba(255,255,255,0.045)", "rgba(255,255,255,0.11)"

    parts.append(f'<rect x="{x}" y="{Y}" width="{CARD_W}" height="{CARD_H}" rx="16" fill="{fill}" stroke="{stroke}" stroke-width="1" filter="url(#cardShadow)"/>')
    text(x + 16, Y + 22, num, 10.5, 700, "rgba(255,255,255,0.30)")

    icon_cx = cx
    icon_cy = Y + 40
    icon_color = ACCENT if accent else "rgba(255,255,255,0.75)"
    parts.append(f'<circle cx="{icon_cx}" cy="{icon_cy}" r="22" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)" stroke-width="1"/>')
    tx, ty = icon_cx - 10, icon_cy - 10
    parts.append(f'<g transform="translate({tx:.2f},{ty:.2f}) scale(0.833)" fill="none" stroke="{icon_color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">{icon_path}</g>')

    label_y_base = Y + CARD_H - (18 if len(lines) == 1 else 30)
    for j, line in enumerate(lines):
        text(cx, label_y_base + j * 16, line, 12.5, 600, "rgba(255,255,255,0.92)")

    if i < n - 1:
        line_x1 = x + CARD_W
        line_x2 = x + STEP
        line_y = Y + CARD_H / 2 + 3
        parts.append(f'<line x1="{line_x1}" y1="{line_y}" x2="{line_x2 - 8}" y2="{line_y}" stroke="rgba(255,255,255,0.16)" stroke-width="1.4"/>')
        parts.append(f'<path d="M {line_x2 - 8} {line_y - 4} L {line_x2} {line_y} L {line_x2 - 8} {line_y + 4}" stroke="rgba(255,255,255,0.16)" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="MoatDaily editorial pipeline: RSS and Google News discovery, ranking, AI copy, image sourcing, rendering, quality review, publish gate, Instagram, and the Sheets audit log.">

  <defs>
    <filter id="cardShadow" x="-30%" y="-30%" width="160%" height="180%">
      <feDropShadow dx="0" dy="2" stdDeviation="5" flood-color="#000000" flood-opacity="0.32"/>
    </filter>
  </defs>

{''.join(parts)}
</svg>
'''

out = "/Users/vipulkatarnaware/Documents/AI Agents/thewebsite/public/artifacts/moatdaily/docs/moatdaily-user-flow.svg"
with open(out, "w") as f:
    f.write(svg)
print("Wrote", out, "width", W)
