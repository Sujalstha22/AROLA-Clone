import { useEffect, useRef } from 'react';

const useWaterCursor = (containerRef) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'pointer-events-none absolute inset-0 z-30';

    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const ripples = [];

    const resize = () => {
      const rect = container.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();

      mouse.targetX = event.clientX - rect.left;
      mouse.targetY = event.clientY - rect.top;

      const dx = mouse.targetX - mouse.x;
      const dy = mouse.targetY - mouse.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 8) {
        ripples.push({
          x: mouse.targetX,
          y: mouse.targetY,
          radius: 2,
          opacity: 0.35,
          strength: Math.min(distance / 20, 1),
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor movement
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      // Draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];

        ripple.radius += 1.8;
        ripple.opacity *= 0.965;

        ctx.beginPath();

        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);

        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`;

        ctx.lineWidth = 1.5 + ripple.strength;

        ctx.stroke();

        if (ripple.opacity < 0.01) {
          ripples.splice(i, 1);
        }
      }

      // Cursor disturbance
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        30,
      );

      gradient.addColorStop(0, 'rgba(255,255,255,0.12)');

      gradient.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.fillStyle = gradient;

      ctx.beginPath();

      ctx.arc(mouse.x, mouse.y, 30, 0, Math.PI * 2);

      ctx.fill();

      requestAnimationFrame(animate);
    };

    resize();

    window.addEventListener('resize', resize);
    container.addEventListener('mousemove', handleMouseMove);

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handleMouseMove);

      canvas.remove();
    };
  }, [containerRef]);

  return canvasRef;
};

export default useWaterCursor;
