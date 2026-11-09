# Update style.css with nav-logo morph and intro-transitioning rules
with open(r'c:\Users\nikhi\OneDrive\Desktop\maraiah\style.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace .nav-logo rule around line 385
old_nav_logo_block = '''/* Logo — Left aligned, vertical center matching nav items */
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
}'''

new_nav_logo_block = '''/* ==========================================================
   NAV LOGO — LAPTOP ICON <-> MARAIAH MORPH INTERACTION
   ========================================================== */
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
  min-width: 48px;
  padding: 0 12px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 
    0 2px 10px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: 
    background 0.32s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.32s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.32s cubic-bezier(0.16, 1, 0.3, 1),
    min-width 0.38s cubic-bezier(0.16, 1, 0.3, 1),
    padding 0.38s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  flex-shrink: 0;
  overflow: hidden;
  user-select: none;
  position: relative;
}

.nav-logo-morph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
}

/* Default state: Laptop icon visible and glowing */
.nav-laptop-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  transition: 
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.25s ease,
    max-width 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    margin 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  max-width: 24px;
  filter: drop-shadow(0 0 6px rgba(0, 229, 255, 0.45));
}

.laptop-svg {
  display: block;
}

.lp-screen {
  stroke: #FFFFFF;
}

.lp-camera {
  animation: laptopCamPulse 3s infinite ease-in-out;
}

@keyframes laptopCamPulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; filter: drop-shadow(0 0 3px #00e5ff); }
}

.lp-base {
  fill: #FFFFFF;
}

/* Text MARAIAH in navbar logo */
.nav-logo-text {
  display: inline-block;
  white-space: nowrap;
  max-width: 0;
  opacity: 0;
  transform: translateX(-8px) scale(0.92);
  transition: 
    max-width 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.28s ease,
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  color: #FFFFFF;
  text-shadow: 
    0 0 12px rgba(255, 255, 255, 0.8),
    0 0 24px rgba(0, 229, 255, 0.5);
  font-weight: 800;
  letter-spacing: 0.18em;
}

/* Interactive Morph on Hover, Focus, or Active Toggle (Touch/Click) */
.nav-logo:hover,
.nav-logo:focus-visible,
.nav-logo.is-expanded {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 229, 255, 0.5);
  box-shadow:
    0 4px 22px rgba(0, 229, 255, 0.35),
    0 0 25px rgba(35, 196, 131, 0.2),
    inset 0 1px 1px rgba(255, 255, 255, 0.35);
  min-width: 126px;
  padding: 0 16px;
}

.nav-logo:hover .nav-laptop-icon,
.nav-logo:focus-visible .nav-laptop-icon,
.nav-logo.is-expanded .nav-laptop-icon {
  opacity: 0;
  max-width: 0;
  transform: scale(0.5) rotate(-12deg);
  margin-right: 0;
  pointer-events: none;
}

.nav-logo:hover .nav-logo-text,
.nav-logo:focus-visible .nav-logo-text,
.nav-logo.is-expanded .nav-logo-text {
  max-width: 100px;
  opacity: 1;
  transform: translateX(0) scale(1);
}'''

if old_nav_logo_block in content:
    content = content.replace(old_nav_logo_block, new_nav_logo_block)
    print("Replaced nav_logo LF")
elif old_nav_logo_block.replace('\n', '\r\n') in content:
    content = content.replace(old_nav_logo_block.replace('\n', '\r\n'), new_nav_logo_block.replace('\n', '\r\n'))
    print("Replaced nav_logo CRLF")
else:
    print("Could not find old_nav_logo_block")

# Update body:not(.intro-done) section around lines 3390-3430
old_intro_css = '''/* Lock scroll and completely hide all main website content during intro loading screen */
body:not(.intro-done) {
  overflow: hidden !important;
  height: 100vh !important;
}

body:not(.intro-done) .site-nav,
body:not(.intro-done) .nav-mobile,
body:not(.intro-done) .page-wrapper,
body:not(.intro-done) .mobile-dock,
body:not(.intro-done) .hire-fab,
body:not(.intro-done) .hire-modal-overlay {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

/* Smooth reveal transition when intro completes */
body .site-nav,
body .nav-mobile,
body .page-wrapper,
body .mobile-dock,
body .hire-fab {
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.85s;
}

body.intro-done {
  overflow-y: auto !important;
  height: auto !important;
}

body.intro-done .site-nav,
body.intro-done .page-wrapper,
body.intro-done .mobile-dock,
body.intro-done .hire-fab {
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
}'''

new_intro_css = '''/* Lock scroll and completely hide all main website content during intro loading screen */
body:not(.intro-done):not(.intro-transitioning) {
  overflow: hidden !important;
  height: 100vh !important;
}

body:not(.intro-done):not(.intro-transitioning) .site-nav,
body:not(.intro-done):not(.intro-transitioning) .nav-mobile,
body:not(.intro-done):not(.intro-transitioning) .page-wrapper,
body:not(.intro-done):not(.intro-transitioning) .mobile-dock,
body:not(.intro-done):not(.intro-transitioning) .hire-fab,
body:not(.intro-done):not(.intro-transitioning) .hire-modal-overlay {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

/* Active transition state: allows exact coordinates measurement while elements stay visually coordinated */
body.intro-transitioning {
  overflow: hidden !important;
  height: 100vh !important;
}

body.intro-transitioning .site-nav {
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: none !important;
}

body.intro-transitioning .page-wrapper {
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: none !important;
}

/* Keep destination logo and hero title hidden during morph until canvas handoff */
body.intro-transitioning .nav-logo,
body.intro-transitioning .hero-title {
  opacity: 0 !important;
}

/* Smooth reveal transition when intro completes */
body .site-nav,
body .nav-mobile,
body .page-wrapper,
body .mobile-dock,
body .hire-fab {
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.85s;
}

body.intro-done {
  overflow-y: auto !important;
  height: auto !important;
}

body.intro-done .site-nav,
body.intro-done .page-wrapper,
body.intro-done .mobile-dock,
body.intro-done .hire-fab {
  opacity: 1 !important;
  visibility: visible !important;
  pointer-events: auto !important;
}

body.intro-done .nav-logo,
body.intro-done .hero-title {
  opacity: 1 !important;
  transition: opacity 0.28s ease;
}'''

if old_intro_css in content:
    content = content.replace(old_intro_css, new_intro_css)
    print("Replaced intro_css LF")
elif old_intro_css.replace('\n', '\r\n') in content:
    content = content.replace(old_intro_css.replace('\n', '\r\n'), new_intro_css.replace('\n', '\r\n'))
    print("Replaced intro_css CRLF")
else:
    print("Could not find old_intro_css")

with open(r'c:\Users\nikhi\OneDrive\Desktop\maraiah\style.css', 'w', encoding='utf-8') as f:
    f.write(content)

print("style.css successfully updated")
