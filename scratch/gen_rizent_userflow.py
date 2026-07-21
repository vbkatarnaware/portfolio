#!/usr/bin/env python3
"""Hand-authored premium user-flow SVG for Rizent (matches CareerOS style)."""

FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
ACCENT = "#8b5cf6"

CARD_W, CARD_H = 152, 132
STEP = 198  # x increment per card (152 card + 46 gap)
Y = 40
MARGIN = 40

# (label_lines, icon_path_group, accent?)
def icon_upload():
    return '<path d="M12 16V4"/><path d="M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>'

def icon_sparkle():
    return '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 3.5v3"/><path d="M17.5 5h3"/>'

def icon_target():
    return '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.8" fill="currentColor"/>'

def icon_pencil():
    return '<path d="M4 20l1-4.5L15.5 5l3.5 3.5L8.5 19z"/><path d="M13 7l3.5 3.5"/>'

def icon_check():
    return '<circle cx="12" cy="12" r="8.5"/><path d="M8 12.5l2.7 2.7L16.5 9"/>'

def icon_reply():
    return '<path d="M4 6.5h16v11H10l-4 3.5v-3.5H4z"/><path d="M9 10.5l-2.5 1.5L9 13.5"/><path d="M6.5 12h7a2.5 2.5 0 0 1 2.5 2.5v0"/>'

def icon_calendar():
    return '<rect x="4" y="5.5" width="16" height="15" rx="1.5"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/><circle cx="12.5" cy="14.5" r="1.5"/>'

def icon_refresh():
    return '<path d="M4 12a8 8 0 0 1 14-5.2M20 12a8 8 0 0 1-14 5.2"/><path d="M18 3.5v3.5h-3.5"/><path d="M6 20.5V17h3.5"/>'

def icon_bars():
    return '<line x1="4" y1="20.5" x2="20" y2="20.5"/><rect x="6" y="13" width="3.2" height="7.5"/><rect x="10.4" y="8.5" width="3.2" height="12"/><rect x="14.8" y="4.5" width="3.2" height="16"/>'

steps = [
    (["Pitch Deck", "Upload"], icon_upload(), False),
    (["AI Extraction", "(Digital Twin)"], icon_sparkle(), False),
    (["Investor", "Matching"], icon_target(), False),
    (["Draft", "Outreach"], icon_pencil(), False),
    (["Founder", "Approve"], icon_check(), True),
    (["Reply", "Detection"], icon_reply(), False),
    (["Meeting", "Booking"], icon_calendar(), False),
    (["Follow-ups"], icon_refresh(), False),
    (["Monthly", "Update"], icon_bars(), False),
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
    icon_stroke_w = "1.8"
    parts.append(f'<circle cx="{icon_cx}" cy="{icon_cy}" r="22" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)" stroke-width="1"/>')
    tx, ty = icon_cx - 10, icon_cy - 10
    parts.append(f'<g transform="translate({tx:.2f},{ty:.2f}) scale(0.833)" fill="none" stroke="{icon_color}" stroke-width="{icon_stroke_w}" stroke-linecap="round" stroke-linejoin="round">{icon_path}</g>')

    label_y_base = Y + CARD_H - (18 if len(lines) == 1 else 30)
    for j, line in enumerate(lines):
        text(cx, label_y_base + j * 16, line, 12.5, 600, "rgba(255,255,255,0.92)")

    if i < n - 1:
        line_x1 = x + CARD_W
        line_x2 = x + STEP
        line_y = Y + CARD_H / 2 + 3
        parts.append(f'<line x1="{line_x1}" y1="{line_y}" x2="{line_x2 - 8}" y2="{line_y}" stroke="rgba(255,255,255,0.16)" stroke-width="1.4"/>')
        parts.append(f'<path d="M {line_x2 - 8} {line_y - 4} L {line_x2} {line_y} L {line_x2 - 8} {line_y + 4}" stroke="rgba(255,255,255,0.16)" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')

flow_labels = " ".join(l[0] if len(l) == 1 else " ".join(l) for l, _, _ in steps)
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="Rizent user journey: Pitch Deck Upload, AI Extraction, Investor Matching, Draft Outreach, Founder Approve, Reply Detection, Meeting Booking, Follow-ups, Monthly Update.">

  <defs>
    <filter id="cardShadow" x="-30%" y="-30%" width="160%" height="180%">
      <feDropShadow dx="0" dy="2" stdDeviation="5" flood-color="#000000" flood-opacity="0.32"/>
    </filter>
  </defs>

{''.join(parts)}
</svg>
'''

out = "/Users/vipulkatarnaware/Documents/AI Agents/thewebsite/public/artifacts/rizent/docs/rizent-user-flow.svg"
with open(out, "w") as f:
    f.write(svg)
print("Wrote", out, "width", W)
