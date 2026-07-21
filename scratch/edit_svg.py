import re

filepath = 'public/artifacts/qrapid/docs/qrapid-user-flow.svg'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Rename stages
content = content.replace('>Onboard<', '>Restaurant Onboarding<')
content = content.replace('>Set Up<', '>Configuration<')
content = content.replace('>Go Live<', '>Customer Ordering<')
content = content.replace('>Bill &amp; Fulfill<', '>Order Fulfillment<')
content = content.replace('>Operate &amp; Grow<', '>Business Operations<')

# 2. Remove implementation details
content = re.sub(r'<rect x="1116" y="234".*?Coupon Applied</text>\n', '', content, flags=re.DOTALL)
content = re.sub(r'<rect x="1116" y="516".*?E-Bill Sent via SMS</text>\n', '', content, flags=re.DOTALL)
content = re.sub(r'<rect x="1460" y="234".*?Inventory &amp; Expenses Logged</text>\n', '', content, flags=re.DOTALL)

# Shift items up in col 4 (Payment Captured, E-Bill Generated)
def shift_up(match):
    lines = match.group(0).split('\n')
    new_lines = []
    for line in lines:
        if not line: continue
        line = re.sub(r'y="(\d+(?:\.\d+)?)"', lambda m: f'y="{float(m.group(1))-94:g}"', line)
        line = re.sub(r'cy="(\d+(?:\.\d+)?)"', lambda m: f'cy="{float(m.group(1))-94:g}"', line)
        new_lines.append(line)
    return '\n'.join(new_lines) + '\n'

content = re.sub(r'<rect x="1116" y="328".*?Payment Captured</text>\n', shift_up, content, flags=re.DOTALL)
content = re.sub(r'<rect x="1116" y="422".*?E-Bill Generated</text>\n', shift_up, content, flags=re.DOTALL)

# Shift items up in col 5 (Daily Revenue Report, Rewards Issued, Rewards Redeemed)
content = re.sub(r'<rect x="1460" y="328".*?Daily Revenue Report</text>\n', shift_up, content, flags=re.DOTALL)
content = re.sub(r'<rect x="1460" y="422".*?Rewards Issued</text>\n', shift_up, content, flags=re.DOTALL)
content = re.sub(r'<rect x="1460" y="516".*?Rewards Redeemed &amp; Approved</text>\n', shift_up, content, flags=re.DOTALL)

# 3. Increase spacing
def shift_x_coord(match):
    x = float(match.group(2))
    attr = match.group(1)
    if 400 < x <= 750: x += 25
    elif 750 < x <= 1100: x += 50
    elif 1100 < x <= 1440: x += 75
    elif x > 1440: x += 100
    return f'{attr}="{x:g}"'

# Adjust x attributes
content = re.sub(r'(x|cx|x1|x2)="(\d+(?:\.\d+)?)"', shift_x_coord, content)

# Adjust SVG width and viewBox
content = re.sub(r'width="1816"', 'width="1916"', content)
content = re.sub(r'viewBox="0 0 1816 790"', 'viewBox="0 0 1916 790"', content)

# Adjust path data 'd' attribute
def shift_d(match):
    d_str = match.group(1)
    # find all numbers that represent X coords
    # d="M370,174 C392,174 392,174 404,174"
    # we need to be careful with M, L, C
    def process_coord(m2):
        x = float(m2.group(1))
        if 400 < x <= 750: x += 25
        elif 750 < x <= 1100: x += 50
        elif 1100 < x <= 1440: x += 75
        elif x > 1440: x += 100
        return f'{x:g},'
        
    new_d = re.sub(r'(\d+(?:\.\d+)?),', process_coord, d_str)
    return f'd="{new_d}"'

content = re.sub(r'd="([^"]+)"', shift_d, content)


with open(filepath, 'w') as f:
    f.write(content)

print("SVG edited successfully")
