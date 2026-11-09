import re

# ─────────────────────────────────────────────────────────────
# 1. UPDATE index.html
# ─────────────────────────────────────────────────────────────
path_html = r'c:\Users\nikhi\OneDrive\Desktop\maraiah\index.html'
with open(path_html, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove auto-message bubble from "Need a video?" section
old_bubble_1 = re.search(r'<!-- Pre-filled message bubble -->[\s\S]*?<div class="auto-text-bubble"[\s\S]*?</div>', html)
if old_bubble_1:
    html = html[:old_bubble_1.start()] + html[old_bubble_1.end():]
    print("index.html: Removed auto-message bubble from 'Need a video?' section")
else:
    print("WARNING: Could not find auto-message bubble 1 via regex, checking direct replace")
    html = re.sub(r'<div class="auto-text-bubble"[\s\S]*?id="autoMessageText"[\s\S]*?</div>', '', html)

# 2. Remove auto-message bubble from Hire Modal
old_bubble_2 = re.search(r'<!-- Pre-filled Hire Auto-Message Bubble -->[\s\S]*?<div class="auto-text-bubble"[\s\S]*?</div>', html)
if old_bubble_2:
    html = html[:old_bubble_2.start()] + html[old_bubble_2.end():]
    print("index.html: Removed auto-message bubble from Hire Modal")
else:
    print("WARNING: Could not find auto-message bubble 2 via regex, checking direct replace")
    html = re.sub(r'<div class="auto-text-bubble">[\s\S]*?Hey, I saw your profile, I wanted to hire you[\s\S]*?</div>', '', html)

# Bump cache version
html = re.sub(r'style\.css\?v=[^"]+', 'style.css?v=glassy_v16', html)
html = re.sub(r'script\.js\?v=[^"]+', 'script.js?v=glassy_v16', html)

with open(path_html, 'w', encoding='utf-8', newline='\r\n') as f:
    f.write(html)
print("index.html: Updated successfully!")


# ─────────────────────────────────────────────────────────────
# 2. UPDATE style.css (Ultra Glassmorphism for Hire Modal)
# ─────────────────────────────────────────────────────────────
path_css = r'c:\Users\nikhi\OneDrive\Desktop\maraiah\style.css'
with open(path_css, 'r', encoding='utf-8') as f:
    css = f.read()

# Replace the Hire Modal block with ultra-glassy styles
hire_glass_css = '''/* ==========================================================
   WANT TO HIRE ME - POPUP MODAL STYLES — Ultra-Premium Glassmorphism
   ========================================================== */
.hire-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(3, 6, 12, 0.75);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.35s ease, visibility 0.35s ease;
}

.hire-modal-backdrop.active {
  opacity: 1;
  visibility: visible;
}

.hire-modal-card {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.14) 0%,
    rgba(255, 255, 255, 0.04) 40%,
    rgba(14, 20, 32, 0.72) 100%
  );
  backdrop-filter: blur(32px) saturate(200%);
  -webkit-backdrop-filter: blur(32px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 28px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.85),
    0 0 50px rgba(35, 196, 131, 0.16),
    0 0 80px rgba(0, 229, 255, 0.12),
    inset 0 1px 2px rgba(255, 255, 255, 0.45),
    inset 0 -1px 2px rgba(0, 0, 0, 0.4);
  padding: 36px 30px;
  transform: translateY(24px) scale(0.96);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease;
}

.hire-modal-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 28px;
  padding: 1px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.5) 0%,
    transparent 35%,
    rgba(0, 229, 255, 0.3) 60%,
    transparent 80%,
    rgba(35, 196, 131, 0.4) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.hire-modal-backdrop.active .hire-modal-card {
  transform: translateY(0) scale(1);
}

.hire-modal-close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #fff;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.hire-modal-close:hover {
  background: rgba(255, 255, 255, 0.22);
  border-color: rgba(255, 255, 255, 0.4);
  transform: scale(1.08) rotate(90deg);
}

.hire-profile-header {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 24px;
}

.hire-profile-avatar {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: linear-gradient(135deg, #23c483, #00e5ff, #038bff);
  padding: 2.5px;
  flex-shrink: 0;
  box-shadow: 0 0 24px rgba(35, 196, 131, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.5);
}

.hire-avatar-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #162032 0%, #090e17 100%);
  color: #fff;
  font-weight: 800;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.hire-profile-info h3 {
  font-size: 22px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 4px 0;
  letter-spacing: -0.01em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.hire-profile-info p {
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-weight: 500;
}

.hire-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(35, 196, 131, 0.18);
  color: #2fed9e;
  border: 1px solid rgba(35, 196, 131, 0.45);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-top: 8px;
  box-shadow: 0 0 16px rgba(35, 196, 131, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.hire-details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-bottom: 22px;
}

.hire-stat-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.03) 100%
  );
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  padding: 16px 18px;
  box-shadow:
    0 6px 20px rgba(0, 0, 0, 0.35),
    inset 0 1px 1px rgba(255, 255, 255, 0.25);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.hire-stat-card:hover {
  transform: translateY(-2px);
  border-color: rgba(0, 229, 255, 0.45);
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(0, 229, 255, 0.25),
    inset 0 1px 1px rgba(255, 255, 255, 0.35);
}

.hire-stat-num {
  font-size: 17px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.01em;
}

.hire-stat-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.65);
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
}

.hire-bio-text {
  font-size: 14px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.88);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-left: 3px solid #23c483;
  border-radius: 16px;
  padding: 16px 20px;
  margin-bottom: 24px;
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.25),
    inset 0 1px 1px rgba(255, 255, 255, 0.2);
}

.btn-wa-premium {
  background: linear-gradient(135deg, rgba(35, 196, 131, 0.28) 0%, rgba(35, 196, 131, 0.12) 100%) !important;
  border: 1px solid rgba(35, 196, 131, 0.55) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #2fed9e !important;
  box-shadow: 0 6px 20px rgba(35, 196, 131, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3) !important;
  transition: all 0.25s ease !important;
}
.btn-wa-premium:hover {
  background: linear-gradient(135deg, rgba(35, 196, 131, 0.45) 0%, rgba(35, 196, 131, 0.22) 100%) !important;
  border-color: #2fed9e !important;
  box-shadow: 0 8px 30px rgba(35, 196, 131, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.45) !important;
  transform: translateY(-2px);
}

.btn-ig-premium {
  background: linear-gradient(135deg, rgba(225, 48, 108, 0.28) 0%, rgba(225, 48, 108, 0.12) 100%) !important;
  border: 1px solid rgba(225, 48, 108, 0.55) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #ff659c !important;
  box-shadow: 0 6px 20px rgba(225, 48, 108, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.3) !important;
  transition: all 0.25s ease !important;
}
.btn-ig-premium:hover {
  background: linear-gradient(135deg, rgba(225, 48, 108, 0.45) 0%, rgba(225, 48, 108, 0.22) 100%) !important;
  border-color: #ff659c !important;
  box-shadow: 0 8px 30px rgba(225, 48, 108, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.45) !important;
  transform: translateY(-2px);
}
'''

# Find the old block and replace
hire_match = re.search(r'/\* ==========================================================\s*WANT TO HIRE ME - POPUP MODAL STYLES[\s\S]*?\.hire-bio-text\s*\{[^}]*\}', css)
if hire_match:
    css = css[:hire_match.start()] + hire_glass_css + css[hire_match.end():]
    print("style.css: Replaced Hire Modal section with ultra-glassy styles!")
else:
    print("WARNING: Could not find exact hire-modal block, appending glass styles")
    css += "\n" + hire_glass_css

with open(path_css, 'w', encoding='utf-8', newline='\r\n') as f:
    f.write(css)
print("style.css: Updated successfully!")
