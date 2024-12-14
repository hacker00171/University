'use client';

import { useEffect, useState } from 'react';

interface ParticleStyle {
  width: string;
  height: string;
  left: string;
  top: string;
  backgroundColor: string;
  animation: string;
  boxShadow: string;
}

interface LineStyle {
  width: string;
  height: string;
  left: string;
  top: string;
  backgroundColor: string;
  transform: string;
  animation: string;
}

const NetworkBackground = () => {
  const [particles, setParticles] = useState<ParticleStyle[]>([]);
  const [lines, setLines] = useState<LineStyle[]>([]);

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 50 }).map(() => ({
      width: `${Math.random() * 4 + 2}px`,
      height: `${Math.random() * 4 + 2}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      backgroundColor: 'rgba(74, 144, 226, 0.6)',
      animation: `float ${Math.random() * 10 + 20}s linear infinite`,
      boxShadow: '0 0 10px rgba(74, 144, 226, 0.3)',
    }));
    setParticles(newParticles);

    // Generate lines
    const newLines = Array.from({ length: 20 }).map(() => ({
      width: '1px',
      height: `${Math.random() * 150 + 100}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      backgroundColor: 'rgba(74, 144, 226, 0.2)',
      transform: `rotate(${Math.random() * 360}deg)`,
      animation: `line ${Math.random() * 10 + 15}s linear infinite`,
    }));
    setLines(newLines);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#001830] via-[#002445] to-[#001830]" />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {particles.map((style, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={style}
          />
        ))}
      </div>

      {/* Animated lines */}
      <div className="absolute inset-0">
        {lines.map((style, i) => (
          <div
            key={i}
            className="absolute animate-line"
            style={style}
          />
        ))}
      </div>

      {/* Add these styles to your global CSS */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, 20px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes line {
          0% {
            opacity: 0;
            transform: translateY(0) rotate(45deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(100px) rotate(45deg);
          }
        }

        .animate-float {
          will-change: transform;
          transition: all 0.3s ease;
        }

        .animate-line {
          will-change: transform, opacity;
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default NetworkBackground;
