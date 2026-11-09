// Intro Canvas ASCII Matrix Particle Reveal for MARAIAH - Video Editor

(function () {
  const introScreen = document.getElementById('intro-screen');
  const canvas = document.getElementById('intro-canvas');
  const skipBtn = document.getElementById('intro-skip-btn');
  if (!introScreen || !canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId = null;
  let isDismissed = false;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Character set matching the video's digital matrix look
  const GLYPHS = ['8', '$', '%', '#', '@', '&', 'S', '0', '1', 'X', 'W', 'M', '*', '+', ':', '.', '{', '}', '[', ']'];

  // Background floating ambient matrix particles
  const bgParticles = [];
  const BG_COUNT = Math.min(60, Math.floor(window.innerWidth / 20));
  for (let i = 0; i < BG_COUNT; i++) {
    bgParticles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      speedY: -0.3 - Math.random() * 0.7,
      alpha: 0.05 + Math.random() * 0.18,
      size: 10 + Math.random() * 8,
      changeTimer: Math.floor(Math.random() * 30)
    });
  }

  // Generate target text pixel map
  function getTextPoints() {
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    offCanvas.width = W;
    offCanvas.height = H;

    const mainFontSize = Math.max(38, Math.min(W * 0.12, 100));
    const subFontSize = Math.max(12, Math.min(mainFontSize * 0.28, 24));
    const tracking = mainFontSize * 0.18;

    offCtx.fillStyle = '#000000';
    offCtx.fillRect(0, 0, W, H);

    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';

    // Draw MARAIAH
    offCtx.font = `900 ${mainFontSize}px "Plus Jakarta Sans", sans-serif`;
    offCtx.fillStyle = '#FFFFFF';
    const centerY = H * 0.46;
    offCtx.fillText('MARAIAH', W / 2, centerY);

    // Draw VIDEO EDITOR
    offCtx.font = `700 ${subFontSize}px "Plus Jakarta Sans", sans-serif`;
    offCtx.fillText('V I D E O   E D I T O R', W / 2, centerY + mainFontSize * 0.68);

    const imgData = offCtx.getImageData(0, 0, W, H);
    const data = imgData.data;
    const points = [];

    // Density grid based on screen width
    const step = W < 600 ? 5 : 6;

    let minY = H, maxY = 0;

    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        const idx = (y * W + x) * 4;
        const brightness = data[idx];
        if (brightness > 80) {
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          points.push({
            x: x,
            y: y,
            targetAlpha: brightness / 255,
            isSub: y > centerY + mainFontSize * 0.35,
            randomOffset: (Math.random() - 0.5) * 6,
            char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            charTimer: Math.floor(Math.random() * 10)
          });
        }
      }
    }

    return { points, minY, maxY, centerY, mainFontSize };
  }

  let textData = getTextPoints();
  window.addEventListener('resize', () => {
    textData = getTextPoints();
  });

  const startTime = performance.now();
  const DURATION_BUILD = 1900; // time for vertical sweep build
  const DURATION_HOLD = 2800;  // time to hold before fade out

  function render(now) {
    if (isDismissed) return;

    const elapsed = now - startTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw subtle ambient background code particles
    ctx.font = '10px monospace';
    for (let i = 0; i < bgParticles.length; i++) {
      const p = bgParticles[i];
      p.y += p.speedY;
      if (p.y < 0) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      p.changeTimer--;
      if (p.changeTimer <= 0) {
        p.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        p.changeTimer = 20 + Math.floor(Math.random() * 40);
      }
      ctx.fillStyle = `rgba(180, 225, 255, ${p.alpha * 0.4})`;
      ctx.fillText(p.char, p.x, p.y);
    }

    // 2. Scanline progression (from bottom to top, just like the video's ring scan)
    const scanProgress = Math.min(1, elapsed / DURATION_BUILD);
    // easeOutQuad
    const easedScan = 1 - Math.pow(1 - scanProgress, 2.5);

    const scanCurrentY = textData.maxY - (textData.maxY - textData.minY + 40) * easedScan;

    // 3. Render ASCII Text Points
    const ptStep = canvas.width < 600 ? 10 : 12;
    ctx.font = `${canvas.width < 600 ? 10 : 12}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const points = textData.points;
    for (let i = 0; i < points.length; i++) {
      const pt = points[i];

      // Distance from scanline
      const distFromScan = pt.y - scanCurrentY;

      if (distFromScan < -30 && scanProgress < 1) {
        // Below scan (not reached yet) -> subtle faint glitch
        if (Math.random() < 0.03 && elapsed > 200) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.fillText(pt.char, pt.x, pt.y);
        }
        continue;
      }

      // At scan frontier: intense glowing digital sparks & scanline rays
      if (distFromScan >= -30 && distFromScan <= 35 && scanProgress < 1) {
        // Active scan frontier
        pt.charTimer--;
        if (pt.charTimer <= 0) {
          pt.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          pt.charTimer = 2 + Math.floor(Math.random() * 4);
        }

        // Draw vertical glow spike / beam
        ctx.fillStyle = 'rgba(180, 240, 255, 0.85)';
        ctx.fillText(pt.char, pt.x, pt.y);

        // Occasional light spikes
        if (Math.random() < 0.15) {
          ctx.strokeStyle = 'rgba(224, 242, 254, 0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y - 12);
          ctx.lineTo(pt.x, pt.y + 12);
          ctx.stroke();
        }
      } else {
        // Formed area: stabilized with gentle shimmering matrix characters
        pt.charTimer--;
        if (pt.charTimer <= 0) {
          if (elapsed > DURATION_BUILD) {
            // Lock into solid chars or crisp representation
            pt.charTimer = 9999;
          } else {
            pt.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            pt.charTimer = 10 + Math.floor(Math.random() * 25);
          }
        }

        let alpha = pt.targetAlpha;
        if (elapsed > DURATION_BUILD) {
          // Final crisp solid white
          ctx.fillStyle = pt.isSub
            ? 'rgba(160, 215, 255, 0.95)'
            : 'rgba(255, 255, 255, 1)';
        } else {
          ctx.fillStyle = pt.isSub
            ? 'rgba(140, 195, 240, 0.8)'
            : 'rgba(240, 248, 255, 0.9)';
        }

        ctx.fillText(pt.char, pt.x, pt.y);
      }
    }

    // 4. Horizontal anamorphic flare sweep (at ~2.0s)
    if (elapsed > 1800 && elapsed < 2600) {
      const flareProgress = (elapsed - 1800) / 800;
      const flareX = canvas.width * 0.2 + (canvas.width * 0.6) * flareProgress;

      const grad = ctx.createLinearGradient(flareX - 120, 0, flareX + 120, 0);
      grad.addColorStop(0, 'rgba(0, 229, 255, 0)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.45)');
      grad.addColorStop(1, 'rgba(0, 229, 255, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(flareX - 120, textData.centerY - textData.mainFontSize, 240, textData.mainFontSize * 2);
    }

    // 5. Check if animation is complete -> dismiss intro
    if (elapsed > DURATION_HOLD && !isDismissed) {
      dismissIntro();
      return;
    }

    animationId = requestAnimationFrame(render);
  }

  function dismissIntro() {
    if (isDismissed) return;
    isDismissed = true;
    if (animationId) cancelAnimationFrame(animationId);

    introScreen.classList.add('intro-dismiss');
    setTimeout(() => {
      introScreen.style.display = 'none';
    }, 700);
  }

  // Allow clicking anywhere or pressing skip to dismiss instantly
  introScreen.addEventListener('click', dismissIntro);
  introScreen.addEventListener('touchstart', dismissIntro, { passive: true });
  if (skipBtn) skipBtn.addEventListener('click', dismissIntro);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.code === 'Space') dismissIntro();
  });

  // Safety timer so it never stays stuck under any condition
  setTimeout(dismissIntro, 3400);

  animationId = requestAnimationFrame(render);
})();
