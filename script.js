// nav.js — scroll navigation, section spy & seamless cinematic loading-to-homepage morph transitions

(function () {

  function initScrollSpy() {
    var secs = document.querySelectorAll('section[id]');
    var links = document.querySelectorAll('.nav-links a, .nav-mobile a');
    if (!secs.length || !links.length) return;
    var ticking = false;

    function run() {
      var sp = window.scrollY + 200;
      secs.forEach(function (s) {
        var id = s.getAttribute('id');
        if (sp >= s.offsetTop && sp < s.offsetTop + s.offsetHeight) {
          links.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + id);
          });
        }
      });
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(run);
        ticking = true;
      }
    }, { passive: true });

    run();
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var el = document.getElementById(this.getAttribute('href').substring(1));
        if (el) {
          e.preventDefault();
          window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 64, behavior: 'smooth' });
          var m = document.getElementById('nav-mobile'), b = document.getElementById('nav-hamburger');
          if (m && m.classList.contains('open')) { m.classList.remove('open'); if (b) b.classList.remove('open'); }
        }
      });
    });
  }

  function initHamburger() {
    var btn = document.getElementById('nav-hamburger'), menu = document.getElementById('nav-mobile');
    if (!btn || !menu) return;
    btn.addEventListener('click', function () {
      var o = menu.classList.toggle('open'); btn.classList.toggle('open', o); btn.setAttribute('aria-expanded', o);
    });
    document.addEventListener('click', function (e) {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open'); btn.classList.remove('open'); btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ══════════════════════════════════════════════════════════
  // LAPTOP LOGO HOVER / CLICK / TOUCH INTERACTION (NAVBAR)
  // ══════════════════════════════════════════════════════════
  function initNavLogoInteraction() {
    var navLogo = document.getElementById('navLogo');
    if (!navLogo) return;

    var isTouchExpanded = false;

    // Click / touch toggle
    navLogo.addEventListener('click', function (e) {
      // Toggle expansion state
      isTouchExpanded = !isTouchExpanded;
      navLogo.classList.toggle('is-expanded', isTouchExpanded);
    });

    // Collapse when tapping outside on mobile/tablet
    document.addEventListener('touchstart', function (e) {
      if (isTouchExpanded && !navLogo.contains(e.target)) {
        isTouchExpanded = false;
        navLogo.classList.remove('is-expanded');
      }
    }, { passive: true });

    document.addEventListener('click', function (e) {
      if (isTouchExpanded && !navLogo.contains(e.target)) {
        isTouchExpanded = false;
        navLogo.classList.remove('is-expanded');
      }
    });

    // Reset when mouse leaves on desktop
    navLogo.addEventListener('mouseleave', function () {
      if (isTouchExpanded) {
        isTouchExpanded = false;
        navLogo.classList.remove('is-expanded');
      }
    });
  }

  // ══════════════════════════════════════════════════════════
  // CINEMATIC LOADING SCREEN TO HOMEPAGE MORPH ENGINE
  // ══════════════════════════════════════════════════════════
  function initIntro() {
    var screen = document.getElementById('intro-screen');
    var canvas = document.getElementById('intro-canvas');
    var skipBtn = document.getElementById('intro-skip-btn');
    if (!screen || !canvas) {
      document.body.classList.add('intro-done');
      initNavLogoInteraction();
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('intro-done');
      screen.style.display = 'none';
      initNavLogoInteraction();
      return;
    }

    var ctx = canvas.getContext('2d');
    var animId = null;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W, H;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    // ── Sample Initial Loading Screen Text ("MARAIAH" & "VIDEO EDITOR") ──
    function sampleIntroText() {
      var off = document.createElement('canvas');
      var oc = off.getContext('2d');
      off.width = W;
      off.height = H;

      var mainSz = Math.max(44, Math.min(W * 0.115, 105));
      var subSz = Math.max(16, Math.min(mainSz * 0.28, 28));
      var cy = H * 0.44;

      oc.fillStyle = '#000000';
      oc.fillRect(0, 0, W, H);
      oc.textAlign = 'center';
      oc.textBaseline = 'middle';

      // "MARAIAH" — bold
      oc.font = '800 ' + mainSz + 'px "Plus Jakarta Sans", "Lato", sans-serif';
      oc.fillStyle = '#FFFFFF';
      oc.fillText('MARAIAH', W / 2, cy);

      // "V I D E O   E D I T O R" — bold, spaced, clearly legible
      oc.font = '700 ' + subSz + 'px "Plus Jakarta Sans", "Lato", sans-serif';
      oc.fillStyle = '#FFFFFF';
      oc.fillText('V I D E O   E D I T O R', W / 2, cy + mainSz * 0.72);

      var img = oc.getImageData(0, 0, W, H).data;
      var maraiahDots = [];
      var subDots = [];
      var step = 2;
      var minY = H, maxY = 0;
      var boundaryY = cy + mainSz * 0.35;

      for (var y = 0; y < H; y += step) {
        for (var x = 0; x < W; x += step) {
          var b = img[(y * W + x) * 4];
          if (b > 60) {
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
            var dot = {
              x: x,
              y: y,
              b: b / 255,
              ox: x,
              oy: y
            };
            if (y > boundaryY) {
              dot.isSub = true;
              subDots.push(dot);
            } else {
              dot.isSub = false;
              maraiahDots.push(dot);
            }
          }
        }
      }
      return {
        maraiahDots: maraiahDots,
        subDots: subDots,
        minY: minY,
        maxY: maxY,
        cy: cy,
        mainSz: mainSz,
        subSz: subSz
      };
    }

    var introData = sampleIntroText();

    // ── Generate Laptop Geometry Target Points (Normalized [-0.5, 0.5]) ──
    function generateLaptopTargetPoints(count) {
      var pts = [];
      // 1. Screen Bezel (outer rounded rect: width 24, height 14)
      var w = 24, h = 14;
      var x0 = -w / 2, y0 = -h + 2;
      var x1 = w / 2, y1 = 2;
      var bezelCount = Math.floor(count * 0.42);

      for (var i = 0; i < bezelCount; i++) {
        var t = i / bezelCount;
        var px, py;
        if (t < 0.32) {
          // Top edge
          px = x0 + (x1 - x0) * (t / 0.32);
          py = y0;
        } else if (t < 0.5) {
          // Right edge
          px = x1;
          py = y0 + (y1 - y0) * ((t - 0.32) / 0.18);
        } else if (t < 0.82) {
          // Bottom edge
          px = x1 - (x1 - x0) * ((t - 0.5) / 0.32);
          py = y1;
        } else {
          // Left edge
          px = x0;
          py = y1 - (y1 - y0) * ((t - 0.82) / 0.18);
        }
        pts.push({ x: px, y: py, type: 'bezel' });
      }

      // 2. Screen Display Interior Lines (cyan glow editor tracks)
      var screenInnerCount = Math.floor(count * 0.26);
      var innerRows = [-8, -5, -2];
      for (var j = 0; j < screenInnerCount; j++) {
        var row = innerRows[j % innerRows.length];
        var rx = (Math.random() * 0.76 - 0.38) * w;
        pts.push({ x: rx, y: row, type: 'display' });
      }

      // 3. Laptop Base / Keyboard Deck (trapezoid wedge: top w=28, bottom w=24, y=3 to 6)
      var baseCount = Math.floor(count * 0.28);
      for (var k = 0; k < baseCount; k++) {
        var tb = k / baseCount;
        var by = 3 + tb * 3.5;
        var currentW = 28 - tb * 4;
        var bx = (Math.random() - 0.5) * currentW;
        pts.push({ x: bx, y: by, type: 'base' });
      }

      // 4. Camera dot & Trackpad notch
      var extra = count - pts.length;
      for (var m = 0; m < extra; m++) {
        if (m % 2 === 0) {
          pts.push({ x: 0, y: y0 + 1, type: 'camera' });
        } else {
          pts.push({ x: (Math.random() - 0.5) * 6, y: 3.2, type: 'notch' });
        }
      }

      return pts;
    }

    // ── Sample Target Homepage Heading Points ("Video Editor &" & "Visual Storyteller") ──
    function sampleHeadingTargets(line1Rect, line2Rect) {
      var off = document.createElement('canvas');
      var oc = off.getContext('2d');
      off.width = W;
      off.height = H;

      var heroEl = document.querySelector('.hero-title');
      var compStyle = heroEl ? window.getComputedStyle(heroEl) : null;
      var fontSz = compStyle ? parseFloat(compStyle.fontSize) : Math.max(28, Math.min(W * 0.05, 52));
      var fontFam = '"Plus Jakarta Sans", "Lato", sans-serif';

      oc.fillStyle = '#000000';
      oc.fillRect(0, 0, W, H);
      oc.textAlign = 'left';
      oc.textBaseline = 'top';

      // Draw Line 1: "Video Editor &"
      oc.font = '800 ' + fontSz + 'px ' + fontFam;
      oc.fillStyle = '#FFFFFF';
      var l1X = line1Rect ? line1Rect.left : W * 0.1;
      var l1Y = line1Rect ? line1Rect.top : H * 0.28;
      oc.fillText('Video Editor  &', l1X, l1Y);

      // Draw Line 2: "Visual Storyteller"
      var l2X = line2Rect ? line2Rect.left : l1X;
      var l2Y = line2Rect ? line2Rect.top : l1Y + fontSz * 1.15;
      oc.fillText('Visual Storyteller', l2X, l2Y);

      var img = oc.getImageData(0, 0, W, H).data;
      var line1Pts = [];
      var line2Pts = [];
      var step = 3;
      var midY = l1Y + fontSz * 1.05;

      for (var y = 0; y < H; y += step) {
        for (var x = 0; x < W; x += step) {
          var b = img[(y * W + x) * 4];
          if (b > 65) {
            var pt = { x: x, y: y, b: b / 255 };
            if (y < midY) {
              line1Pts.push(pt);
            } else {
              line2Pts.push(pt);
            }
          }
        }
      }

      return { line1: line1Pts, line2: line2Pts, l1X: l1X, l1Y: l1Y, l2X: l2X, l2Y: l2Y };
    }

    // ── Animation Timings ──
    var T0 = performance.now();
    var BUILD_DURATION = 2100; // Scanline draw
    var HOLD_DURATION = 1200;  // Display fully formed & horizontal light sweep
    var TRANSITION_DURATION = 1600; // Simultaneous morph to navbar laptop & hero heading

    var phase = 'build'; // 'build' | 'hold' | 'morph' | 'done'
    var morphStartTime = 0;
    var headingTargets = null;
    var laptopTargets = null;
    var navTarget = { x: 48, y: 33 };

    // Easing functions
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    // Smooth Bezier interpolation
    function quadBezier(p0, p1, p2, t) {
      var inv = 1 - t;
      return inv * inv * p0 + 2 * inv * t * p1 + t * t * p2;
    }

    // ── Trigger Transition Phase ──
    function startMorphTransition() {
      if (phase === 'morph' || phase === 'done') return;
      phase = 'morph';
      morphStartTime = performance.now();

      // Make homepage measurable and coordinate DOM reveal
      document.body.classList.add('intro-transitioning');

      // Query subpixel coordinates of navbar logo and hero title
      var navLogo = document.getElementById('navLogo');
      if (navLogo) {
        var nr = navLogo.getBoundingClientRect();
        navTarget.x = nr.left + nr.width / 2;
        navTarget.y = nr.top + nr.height / 2;
      }

      var heroLine1 = document.querySelector('.hero-title .title-line:first-child');
      var heroLine2 = document.querySelector('.hero-title .title-line-accent');
      var l1Rect = heroLine1 ? heroLine1.getBoundingClientRect() : null;
      var l2Rect = heroLine2 ? heroLine2.getBoundingClientRect() : null;

      headingTargets = sampleHeadingTargets(l1Rect, l2Rect);
      laptopTargets = generateLaptopTargetPoints(introData.maraiahDots.length);

      // Hide skip button smoothly
      if (skipBtn) {
        skipBtn.style.opacity = '0';
        skipBtn.style.pointerEvents = 'none';
      }
    }

    // ── Main Render Loop ──
    function render(now) {
      if (phase === 'done') return;
      var t = now - T0;

      ctx.clearRect(0, 0, W, H);

      // ──────────────────────────────────────────────────────────
      // PHASE 1 & 2: BUILD & HOLD (Identical to existing visual)
      // ──────────────────────────────────────────────────────────
      if (phase === 'build' || phase === 'hold') {
        if (t >= BUILD_DURATION && phase === 'build') {
          phase = 'hold';
        }
        if (t >= BUILD_DURATION + HOLD_DURATION && phase === 'hold') {
          startMorphTransition();
        }

        var prog = Math.min(1, t / BUILD_DURATION);
        var ease = 1 - Math.pow(1 - prog, 2.2);
        var range = introData.maxY - introData.minY + 24;
        var scanY = introData.maxY + 12 - range * ease;

        var allDots = introData.maraiahDots.concat(introData.subDots);
        var dotSize = 1.35;

        for (var i = 0; i < allDots.length; i++) {
          var d = allDots[i];
          var dist = d.y - scanY;

          if (dist < -6 && prog < 1) continue;

          var a;
          if (dist >= -6 && dist <= 18 && prog < 1) {
            a = 0.98;
            ctx.fillStyle = 'rgba(230, 245, 255, ' + a + ')';
            if (Math.random() < 0.05) {
              ctx.strokeStyle = 'rgba(210, 240, 255, 0.45)';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(d.x, d.y - 8);
              ctx.lineTo(d.x, d.y + 8);
              ctx.stroke();
            }
          } else {
            if (d.isSub) {
              a = d.b * 0.95;
              ctx.fillStyle = 'rgba(235, 248, 255, ' + a + ')';
            } else {
              a = d.b * 1.0;
              ctx.fillStyle = 'rgba(255, 255, 255, ' + a + ')';
            }
          }
          ctx.fillRect(d.x, d.y, dotSize, dotSize);
        }

        // Horizontal light sweep during hold
        if (t > BUILD_DURATION + 150 && t < BUILD_DURATION + 850) {
          var sp = (t - BUILD_DURATION - 150) / 700;
          var sx = W * 0.1 + W * 0.8 * sp;
          var g = ctx.createLinearGradient(sx - 70, 0, sx + 70, 0);
          g.addColorStop(0, 'rgba(255, 255, 255, 0)');
          g.addColorStop(0.5, 'rgba(255, 255, 255, 0.22)');
          g.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = g;
          ctx.fillRect(sx - 70, introData.minY - 10, 140, range + 20);
        }

      // ──────────────────────────────────────────────────────────
      // PHASE 3: DUAL CINEMATIC MORPH TRANSITIONS
      // ──────────────────────────────────────────────────────────
      } else if (phase === 'morph') {
        var elapsed = now - morphStartTime;
        var tau = Math.min(1, elapsed / TRANSITION_DURATION);
        var smoothT = easeInOutCubic(tau);
        var moveT = easeOutQuart(tau);

        // ════════════════════════════════════════════════════════
        // 1. MARAIAH -> TOP-LEFT LAPTOP MORPH ANIMATION
        // ════════════════════════════════════════════════════════
        var mDots = introData.maraiahDots;
        var startCenterX = W / 2;
        var startCenterY = introData.cy;
        var endCenterX = navTarget.x;
        var endCenterY = navTarget.y;

        // Aerodynamic swooping Bezier trajectory
        var ctrlX = startCenterX * 0.35 + endCenterX * 0.65;
        var ctrlY = Math.min(startCenterY, endCenterY) - 35;
        var currentCenterX = quadBezier(startCenterX, ctrlX, endCenterX, smoothT);
        var currentCenterY = quadBezier(startCenterY, ctrlY, endCenterY, smoothT);

        // Scale shrinks smoothly to fit navbar logo badge (~22px laptop width)
        var startScale = 1.0;
        var endScale = 22 / (introData.mainSz * 2.8);
        var currentScale = startScale + (endScale - startScale) * smoothT;

        // Shape morph progress: letters fold into laptop geometry
        var shapeProgress = Math.min(1, Math.max(0, (tau - 0.05) / 0.85));
        var shapeEase = easeInOutCubic(shapeProgress);

        var laptopWidth = 26;
        var laptopHeight = 16;
        var mDotSize = 1.35 * (1 - smoothT * 0.35);

        for (var mi = 0; mi < mDots.length; mi++) {
          var md = mDots[mi];
          var origRelX = md.ox - startCenterX;
          var origRelY = md.oy - startCenterY;

          // Target laptop point relative to laptop center
          var lp = laptopTargets[mi % laptopTargets.length];
          var targetRelX = lp.x * (introData.mainSz * 0.045);
          var targetRelY = lp.y * (introData.mainSz * 0.045);

          // Interpolate relative offsets
          var curRelX = origRelX * (1 - shapeEase) + targetRelX * shapeEase;
          var curRelY = origRelY * (1 - shapeEase) + targetRelY * shapeEase;

          var px = currentCenterX + curRelX * currentScale;
          var py = currentCenterY + curRelY * currentScale;

          // Color shifts from pure white to luminous cyan-tinted laptop glow
          var dotAlpha = (1 - tau * 0.12);
          if (shapeEase > 0.4 && (lp.type === 'display' || lp.type === 'camera')) {
            ctx.fillStyle = 'rgba(0, 229, 255, ' + (0.95 * dotAlpha) + ')';
          } else {
            ctx.fillStyle = 'rgba(255, 255, 255, ' + (0.98 * dotAlpha) + ')';
          }
          ctx.fillRect(px, py, mDotSize, mDotSize);
        }

        // Ambient landing beacon as laptop docks into navbar logo
        if (tau > 0.6) {
          var dockAlpha = (tau - 0.6) / 0.4;
          var auraRadius = 14 + 10 * (1 - dockAlpha);
          var auraGrad = ctx.createRadialGradient(currentCenterX, currentCenterY, 0, currentCenterX, currentCenterY, auraRadius);
          auraGrad.addColorStop(0, 'rgba(0, 229, 255, ' + (0.35 * dockAlpha) + ')');
          auraGrad.addColorStop(1, 'rgba(0, 229, 255, 0)');
          ctx.fillStyle = auraGrad;
          ctx.beginPath();
          ctx.arc(currentCenterX, currentCenterY, auraRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // ════════════════════════════════════════════════════════
        // 2. VIDEO EDITOR -> HERO HEADING MORPH ANIMATION
        // ════════════════════════════════════════════════════════
        var sDots = introData.subDots;
        var subStartX = W / 2;
        var subStartY = introData.cy + introData.mainSz * 0.72;

        if (headingTargets) {
          var hLine1 = headingTargets.line1;
          var hLine2 = headingTargets.line2;

          // Target line 1 centroid
          var l1CenterX = headingTargets.l1X + (hLine1.length ? 150 : 0);
          var l1CenterY = headingTargets.l1Y + 20;

          // Progress of heading morph
          var headingProgress = easeInOutCubic(tau);

          // Interpolate VIDEO EDITOR dots toward "Video Editor &"
          for (var si = 0; si < sDots.length; si++) {
            var sd = sDots[si];
            var targetPt = hLine1[si % hLine1.length];

            var targetX = targetPt ? targetPt.x : (sd.ox - (subStartX - l1CenterX));
            var targetY = targetPt ? targetPt.y : (sd.oy - (subStartY - l1CenterY));

            var curX = sd.ox + (targetX - sd.ox) * headingProgress;
            var curY = sd.oy + (targetY - sd.oy) * headingProgress;

            // Green ampersand accent glow if near the right edge of Line 1
            if (headingProgress > 0.45 && targetPt && targetPt.x > headingTargets.l1X + 240) {
              ctx.fillStyle = 'rgba(35, 196, 131, ' + (0.95 * (1 - tau * 0.1)) + ')';
            } else {
              ctx.fillStyle = 'rgba(235, 248, 255, ' + (0.92 * (1 - tau * 0.1)) + ')';
            }
            ctx.fillRect(curX, curY, 1.4, 1.4);
          }

          // Line 2: "Visual Storyteller" Stardust Unroll Cascade
          if (tau > 0.28 && hLine2.length) {
            var line2Prog = Math.min(1, (tau - 0.28) / 0.65);
            var line2Ease = easeOutQuart(line2Prog);
            var revealCount = Math.floor(hLine2.length * line2Ease);

            for (var vi = 0; vi < revealCount; vi++) {
              var vpt = hLine2[vi];
              // Stream down from Line 1 bottom into Line 2
              var streamStartY = headingTargets.l1Y + 30;
              var curVy = streamStartY + (vpt.y - streamStartY) * line2Ease;
              var curVx = vpt.x + (1 - line2Ease) * (Math.sin(vi) * 12);

              // Cyan-to-white gradient text styling
              var gradientRatio = (vpt.x - headingTargets.l2X) / Math.max(1, W * 0.5);
              if (gradientRatio > 0.5) {
                ctx.fillStyle = 'rgba(35, 196, 131, ' + (0.9 * line2Prog) + ')';
              } else if (gradientRatio > 0.2) {
                ctx.fillStyle = 'rgba(138, 228, 255, ' + (0.95 * line2Prog) + ')';
              } else {
                ctx.fillStyle = 'rgba(255, 255, 255, ' + (0.98 * line2Prog) + ')';
              }
              ctx.fillRect(curVx, curVy, 1.4, 1.4);
            }
          }
        }

        // ════════════════════════════════════════════════════════
        // 3. SEAMLESS HANDOFF TO DOM
        // ════════════════════════════════════════════════════════
        if (tau >= 1.0) {
          completeIntro();
          return;
        }
      }

      animId = requestAnimationFrame(render);
    }

    // ── Complete & Clean Up ──
    function completeIntro() {
      if (phase === 'done') return;
      phase = 'done';
      if (animId) cancelAnimationFrame(animId);

      // Reveal homepage in full fidelity
      document.body.classList.remove('intro-transitioning');
      document.body.classList.add('intro-done');
      screen.classList.add('intro-dismiss');

      // Initialize the navbar laptop hover/click/touch morph interactions
      initNavLogoInteraction();

      setTimeout(function () {
        screen.style.display = 'none';
      }, 500);
    }

    // Interactive skip triggers start transition smoothly
    screen.addEventListener('click', function () {
      if (phase === 'build' || phase === 'hold') startMorphTransition();
      else if (phase === 'morph') completeIntro();
    });

    screen.addEventListener('touchstart', function () {
      if (phase === 'build' || phase === 'hold') startMorphTransition();
    }, { passive: true });

    if (skipBtn) {
      skipBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (phase === 'build' || phase === 'hold') startMorphTransition();
        else completeIntro();
      });
    }

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.code === 'Space') {
        if (phase === 'build' || phase === 'hold') startMorphTransition();
        else completeIntro();
      }
    });

    // Safety fallback
    setTimeout(function () {
      if (phase !== 'done') completeIntro();
    }, BUILD_DURATION + HOLD_DURATION + TRANSITION_DURATION + 1500);

    window.addEventListener('resize', function () {
      resize();
      introData = sampleIntroText();
    });

    // Start Intro Engine
    animId = requestAnimationFrame(render);
  }

  function initScrollReveal() {
    var secs = document.querySelectorAll('.portfolio-section');
    if (!('IntersectionObserver' in window) || !secs.length) {
      secs.forEach(function (s) { s.classList.add('section-visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add('section-visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    secs.forEach(function (s) { obs.observe(s); });
  }

  function initBubbleCopy() {
    var b = document.querySelector('.need-video-box .auto-text-bubble');
    if (!b) return;
    b.style.cursor = 'pointer';
    b.addEventListener('click', function () {
      var el = document.getElementById('autoMessageText');
      var msg = el ? el.textContent : "Hey, I saw your profile, I want a video";
      navigator.clipboard.writeText(msg).then(function () {
        if (typeof showToast === 'function') showToast("Message copied!");
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initIntro();
    initHamburger();
    initSmoothScroll();
    initScrollSpy();
    initScrollReveal();
    initBubbleCopy();
  });
})();
