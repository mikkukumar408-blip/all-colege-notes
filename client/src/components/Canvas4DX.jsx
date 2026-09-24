import React, { useEffect, useRef } from 'react';

export default function Canvas4DX({ stormMode = false, lightningTrigger = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for interactive constellation aura
    const mouse = { x: width / 2, y: height / 2, radius: 140, active: false };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle System (Optimized for 60fps high responsiveness)
    const isMobile = width < 768;
    const maxParticles = isMobile ? 18 : 38;
    const particleCount = Math.min(maxParticles, Math.max(12, Math.floor((width * height) / 28000)));
    const colors = ['#00f0ff', '#ff2a6d', '#8b5cf6', '#38bdf8', '#ffffff'];
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (stormMode ? 3.0 : 1.0),
        vy: (Math.random() - 0.5) * (stormMode ? 3.0 : 1.0),
        size: Math.random() * 2.2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.04 + 0.01,
        angle: Math.random() * Math.PI * 2
      });
    }

    // Wind Streamers
    const windCount = stormMode ? (isMobile ? 8 : 16) : (isMobile ? 4 : 8);
    const windLines = [];
    for (let i = 0; i < windCount; i++) {
      windLines.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 140 + 60,
        speed: Math.random() * 12 + 8 * (stormMode ? 1.8 : 1),
        opacity: Math.random() * 0.3 + 0.08,
        width: Math.random() * 1.5 + 0.6
      });
    }

    // Lightning Flash State
    let lightningFlash = 0;
    let lightningPoints = [];

    const generateLightning = () => {
      lightningFlash = 1;
      lightningPoints = [];
      let startX = Math.random() * width;
      let curX = startX;
      let curY = 0;
      lightningPoints.push({ x: curX, y: curY });

      while (curY < height) {
        curY += Math.random() * 35 + 15;
        curX += (Math.random() - 0.5) * 60;
        lightningPoints.push({ x: curX, y: curY });
      }
    };

    // Auto lightning in storm mode
    let lightningInterval = setInterval(() => {
      if (stormMode || Math.random() < 0.35) {
        generateLightning();
      }
    }, stormMode ? 4000 : 9000);

    // Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw lightning if active
      if (lightningFlash > 0.02) {
        ctx.save();
        // Background sky flash
        ctx.fillStyle = 'rgba(0, 240, 255, ' + (lightningFlash * 0.18) + ')';
        ctx.fillRect(0, 0, width, height);

        // Draw bolt
        ctx.strokeStyle = 'rgba(255, 255, 255, ' + lightningFlash + ')';
        ctx.lineWidth = 3.5;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 25;
        ctx.beginPath();
        for (let i = 0; i < lightningPoints.length; i++) {
          if (i === 0) ctx.moveTo(lightningPoints[i].x, lightningPoints[i].y);
          else ctx.lineTo(lightningPoints[i].x, lightningPoints[i].y);
        }
        ctx.stroke();

        // Secondary cyan aura
        ctx.strokeStyle = 'rgba(0, 240, 255, ' + (lightningFlash * 0.6) + ')';
        ctx.lineWidth = 8;
        ctx.stroke();

        ctx.restore();
        lightningFlash *= 0.88;
      }

      // 2. Draw Wind Streamers
      ctx.save();
      for (let w of windLines) {
        const gradient = ctx.createLinearGradient(w.x - w.length, w.y, w.x, w.y);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.7, 'rgba(0, 240, 255, ' + w.opacity + ')');
        gradient.addColorStop(1, 'rgba(255, 255, 255, ' + (w.opacity * 1.5) + ')');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = w.width;
        ctx.beginPath();
        ctx.moveTo(w.x - w.length, w.y);
        ctx.lineTo(w.x, w.y);
        ctx.stroke();

        w.x += w.speed;
        if (w.x - w.length > width) {
          w.x = 0;
          w.y = Math.random() * height;
        }
      }
      ctx.restore();

      // 3. Update & Draw Particles with Connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.pulseSpeed;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction: push away gently
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x += (dx / dist) * force * 4;
            p.y += (dy / dist) * force * 4;
          }
        }

        // Draw particle (High performance direct render without expensive shadowBlur)
        const currentAlpha = p.baseAlpha + Math.sin(p.angle) * 0.25;
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, currentAlpha));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect nearby particles (Skipped on mobile to save battery and GPU cycles)
        if (!isMobile) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < 10000) { // 100px max distance
              const dist = Math.sqrt(distSq);
              const lineAlpha = (1 - dist / 100) * 0.22;
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = lineAlpha;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        // Connect to mouse if close
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140) {
            ctx.strokeStyle = '#00f0ff';
            ctx.globalAlpha = (1 - mdist / 140) * 0.45;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(lightningInterval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [stormMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
}