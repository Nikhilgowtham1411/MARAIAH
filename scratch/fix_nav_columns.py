import re

# ─────────────────────────────────────────────────────────────
# 1. UPDATE index.html
# ─────────────────────────────────────────────────────────────
path_html = r'c:\Users\nikhi\OneDrive\Desktop\maraiah\index.html'
with open(path_html, 'r', encoding='utf-8') as f:
    html = f.read()

old_nav = '''  <!-- Navigation -->
  <nav class="site-nav" aria-label="Main navigation">
    <a href="#home" class="nav-logo">Maraiah</a>

    <ul class="nav-links" role="list">
      <li><a href="#home">Home</a></li>
      <li><a href="#works">Works</a></li>
      <li><a href="#quick-view">Quick View</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>

    <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-mobile">
      <span></span><span></span><span></span>
    </button>
  </nav>'''

new_nav = '''  <!-- Navigation -->
  <nav class="site-nav" aria-label="Main navigation">
    <div class="nav-col-left">
      <a href="#home" class="nav-logo">Maraiah</a>
    </div>

    <ul class="nav-links" role="list">
      <li><a href="#home">Home</a></li>
      <li><a href="#works">Works</a></li>
      <li><a href="#quick-view">Quick View</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>

    <div class="nav-col-right">
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-mobile">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>'''

html = html.replace(old_nav, new_nav)

# Update cache buster
html = re.sub(r'style\.css\?v=[^"]+', 'style.css?v=nav_flex_v19', html)

with open(path_html, 'w', encoding='utf-8', newline='\r\n') as f:
    f.write(html)
print("index.html: Updated 3-column navigation structure!")


# ─────────────────────────────────────────────────────────────
# 2. UPDATE style.css
# ─────────────────────────────────────────────────────────────
path_css = r'c:\Users\nikhi\OneDrive\Desktop\maraiah\style.css'
with open(path_css, 'r', encoding='utf-8') as f:
    css = f.read()

new_nav_css = '''.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 66px;
  background: rgba(8, 12, 20, 0.78);
  backdrop-filter: blur(24px) saturate(190%);
  -webkit-backdrop-filter: blur(24px) saturate(190%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
}

/* Shimmer gradient border-bottom */
.site-nav::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 229, 255, 0.0) 10%,
    rgba(0, 229, 255, 0.5) 30%,
    rgba(35, 196, 131, 0.4) 50%,
    rgba(0, 229, 255, 0.5) 70%,
    rgba(0, 229, 255, 0.0) 90%,
    transparent 100%
  );
  background-size: 200% 100%;
  pointer-events: none;
}

/* 3-Column Balanced Flex Nav Layout */
.nav-col-left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.nav-col-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/* Logo — Left aligned, vertical center matching nav items */
.nav-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 13.5px;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #FFFFFF;
  text-decoration: none;
  height: 38px;
  padding: 0 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  flex-shrink: 0;
}

.nav-logo:hover {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 229, 255, 0.45);
  box-shadow:
    0 4px 20px rgba(0, 229, 255, 0.3),
    0 0 25px rgba(35, 196, 131, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.35);
  text-shadow:
    0 0 12px rgba(255, 255, 255, 0.9),
    0 0 24px rgba(0, 229, 255, 0.65);
  transform: scale(1.03);
}

/* Nav links — Centered inside navbar, perfectly level with logo */
.nav-links {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  display: inline-flex;
  align-items: center;
}

.nav-links a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 0 14px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--text-muted);
  border-radius: 10px;
  border: 1px solid transparent;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  position: relative;
  text-decoration: none;
}

.nav-links a:hover {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
}

.nav-links a.active {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

/* Animated gradient underline for active nav link */
.nav-links a.active::after {
  content: "";
  position: absolute;
  bottom: 4px;
  left: 14px;
  right: 14px;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-green), var(--accent-blue));
  border-radius: 1px;
}'''

match = re.search(r'\.site-nav\s*\{[\s\S]*?\.nav-links a\.active::after\s*\{[^}]*\}', css)
if match:
    css = css[:match.start()] + new_nav_css + css[match.end():]
    print("style.css: Successfully replaced nav styling with 3-column flex layout!")
else:
    print("WARNING: Could not find nav block in style.css")

with open(path_css, 'w', encoding='utf-8', newline='\r\n') as f:
    f.write(css)
