'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export default function StarryNight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial resize
    resizeCanvas();

    // Create stars
    const createStars = () => {
      const stars: Star[] = [];
      for (let i = 0; i < 100; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 0.5 + Math.random() * 1.5,
          opacity: 0.1 + Math.random() * 0.3,
          speed: 0.005 + Math.random() * 0.015  // Further reduced speed
        });
      }
      starsRef.current = stars;
    };

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      starsRef.current.forEach(star => {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size
        );
        gradient.addColorStop(0, `rgba(100, 149, 237, ${star.opacity})`);
        gradient.addColorStop(1, 'rgba(100, 149, 237, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Update star position with wrapping
        star.y = (star.y + star.speed) % canvas.height;
        
        // Even slower twinkling effect
        star.opacity = 0.1 + Math.abs(Math.sin(Date.now() * 0.0003 + star.x) * 0.3);  // Reduced frequency
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    createStars();
    animate();

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 5,
        opacity: 0.3,
        mixBlendMode: 'normal'
      }}
    />
  );
}
