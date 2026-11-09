# Update nav-logo and add gsap script in index.html
with open(r'c:\Users\nikhi\OneDrive\Desktop\maraiah\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

old_logo = '''    <div class="nav-col-left">
      <a href="#home" class="nav-logo">Maraiah</a>
    </div>'''

new_logo = '''    <div class="nav-col-left">
      <a href="#home" class="nav-logo" id="navLogo" aria-label="Maraiah Portfolio - Toggle Laptop Logo">
        <span class="nav-logo-morph">
          <span class="nav-laptop-icon" aria-hidden="true">
            <svg class="laptop-svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
              <rect class="lp-screen" x="3" y="4" width="18" height="11.5" rx="1.8" stroke="currentColor" stroke-width="1.6" />
              <rect class="lp-display" x="4.8" y="5.8" width="14.4" height="8" rx="0.8" fill="rgba(0, 229, 255, 0.16)" />
              <circle class="lp-camera" cx="12" cy="4.9" r="0.55" fill="rgba(0, 229, 255, 0.9)" />
              <line class="lp-track1" x1="6.5" y1="8.2" x2="11.5" y2="8.2" stroke="rgba(255, 255, 255, 0.85)" stroke-width="1" stroke-linecap="round" />
              <line class="lp-track2" x1="6.5" y1="10.5" x2="15.5" y2="10.5" stroke="rgba(0, 229, 255, 0.75)" stroke-width="1" stroke-linecap="round" />
              <path class="lp-base" d="M1.5 18h21l-1.8 2.2H3.3L1.5 18z" fill="currentColor" opacity="0.95" />
              <line class="lp-notch" x1="10.2" y1="18.2" x2="13.8" y2="18.2" stroke="#080c14" stroke-width="1.2" stroke-linecap="round" />
            </svg>
          </span>
          <span class="nav-logo-text">MARAIAH</span>
        </span>
      </a>
    </div>'''

if old_logo in content:
    content = content.replace(old_logo, new_logo)
    print("Replaced LF logo")
elif old_logo.replace('\n', '\r\n') in content:
    content = content.replace(old_logo.replace('\n', '\r\n'), new_logo.replace('\n', '\r\n'))
    print("Replaced CRLF logo")
else:
    print("Could not find old_logo")

# Add gsap.min.js before script.js
old_script = '<script src="script.js?v=logo_down_v17"></script>'
new_script = '<script src="gsap.min.js"></script>\n  <script src="script.js?v=morph_v1"></script>'

if old_script in content:
    content = content.replace(old_script, new_script)
    print("Replaced script line")
elif old_script.replace('\n', '\r\n') in content:
    content = content.replace(old_script.replace('\n', '\r\n'), new_script.replace('\n', '\r\n'))
    print("Replaced CRLF script line")

# Update cache buster on style.css
content = content.replace('style.css?v=nav_flex_v20', 'style.css?v=morph_v1')

with open(r'c:\Users\nikhi\OneDrive\Desktop\maraiah\index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("index.html successfully updated")
