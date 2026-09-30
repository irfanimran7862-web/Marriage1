import { useEffect, useRef, useState } from 'react';
import { Flower2, Sparkles } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: 'rose' | 'jasmine' | 'gold';
  swing: number;
  swingSpeed: number;
}

export default function PetalShower() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(38, Math.floor(width / 35));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      const type: 'rose' | 'jasmine' | 'gold' =
        typeRand < 0.6 ? 'rose' : typeRand < 0.85 ? 'gold' : 'jasmine';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: type === 'rose' ? Math.random() * 12 + 10 : type === 'gold' ? Math.random() * 4 + 2 : Math.random() * 8 + 6,
        speedY: Math.random() * 1.2 + 0.8,
        speedX: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.4 + 0.5,
        type,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const drawPetal = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'rose') {
        // Red / Crimson Rose Petal
        const grad = ctx.createLinearGradient(-p.size / 2, -p.size, p.size / 2, p.size);
        grad.addColorStop(0, '#e63946');
        grad.addColorStop(0.5, '#c1121f');
        grad.addColorStop(1, '#780000');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.6, p.size * 0.8, p.size * 0.6, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.6, -p.size * 0.8, -p.size * 0.6, 0, -p.size);
        ctx.fill();

        // Subtle petal vein
        ctx.strokeStyle = 'rgba(255, 200, 200, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.8);
        ctx.lineTo(0, p.size * 0.7);
        ctx.stroke();
      } else if (p.type === 'jasmine') {
        // Pure White / Cream Jasmine flower petal
        ctx.fillStyle = '#fdfbf7';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.5, p.size, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f4e04d';
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.15, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Shimmering Golden Star / Dust
        ctx.fillStyle = '#f6e27a';
        ctx.shadowColor = '#d4af37';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.swing += p.swingSpeed;
        p.x += p.speedX + Math.sin(p.swing) * 0.7;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive]);

  return (
    <>
      {isActive && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-40 h-full w-full"
          aria-hidden="true"
        />
      )}
      <button
        onClick={() => setIsActive(!isActive)}
        title={isActive ? 'Disable Rose Petals Shower' : 'Enable Rose Petals Shower'}
        aria-label="Toggle falling rose petals"
        className="fixed bottom-20 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#230d36]/85 text-[#f6e27a] shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:border-[#f6e27a]"
      >
        {isActive ? <Flower2 className="h-4 w-4" /> : <Sparkles className="h-4 w-4 opacity-50" />}
      </button>
    </>
  );
}
