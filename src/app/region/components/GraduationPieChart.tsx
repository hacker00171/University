'use client';

import React, { useState, useMemo } from 'react';
import { GraduationStats } from '../../state-view/types/regional';

interface Props {
  stats: GraduationStats | null;
}

const GraduationPieChart: React.FC<Props> = ({ stats }) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const { paths, total, center, innerRadius } = useMemo(() => {
    if (!stats) return { paths: [], total: 0, center: 0, innerRadius: 0 };

    const total = stats.bachelors + stats.masters + stats.doctorate + stats.diploma;
    const size = 320;
    const center = size / 2;
    const strokeWidth = size * 0.22; 
    const innerRadius = size * 0.42 - strokeWidth;

    const data = [
      { 
        name: "Bachelor's", 
        value: stats.bachelors, 
        color: '#60A5FA',
        gradient: {
          start: '#93C5FD',
          end: '#3B82F6'
        },
        stroke: '#2563EB'
      },
      { 
        name: "Master's", 
        value: stats.masters, 
        color: '#34D399',
        gradient: {
          start: '#6EE7B7',
          end: '#059669'
        },
        stroke: '#047857'
      },
      { 
        name: 'Doctorate', 
        value: stats.doctorate, 
        color: '#F472B6',
        gradient: {
          start: '#F9A8D4',
          end: '#DB2777'
        },
        stroke: '#BE185D'
      },
      { 
        name: 'Diploma', 
        value: stats.diploma, 
        color: '#A78BFA',
        gradient: {
          start: '#C4B5FD',
          end: '#7C3AED'
        },
        stroke: '#6D28D9'
      }
    ];

    let currentAngle = 0;
    const paths = data.map((item) => {
      const percentage = (item.value / total) || 0;
      const angle = percentage * 360;
      
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      const startRad = (startAngle - 90) * Math.PI / 180;
      const endRad = (endAngle - 90) * Math.PI / 180;
      
      const x1 = center + (center - innerRadius) * Math.cos(startRad);
      const y1 = center + (center - innerRadius) * Math.sin(startRad);
      const x2 = center + (center - innerRadius) * Math.cos(endRad);
      const y2 = center + (center - innerRadius) * Math.sin(endRad);
      
      const x3 = center + innerRadius * Math.cos(endRad);
      const y3 = center + innerRadius * Math.sin(endRad);
      const x4 = center + innerRadius * Math.cos(startRad);
      const y4 = center + innerRadius * Math.sin(startRad);
      
      const largeArc = angle > 180 ? 1 : 0;
      
      const path = `
        M ${x1} ${y1}
        A ${center - innerRadius} ${center - innerRadius} 0 ${largeArc} 1 ${x2} ${y2}
        L ${x3} ${y3}
        A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
        Z
      `;
      
      currentAngle += angle;
      
      return {
        ...item,
        path,
        percentage: (percentage * 100).toFixed(1)
      };
    });

    return { paths, total, center, innerRadius };
  }, [stats]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  if (!stats) return null;

  return (
    <div className="bg-gradient-to-br from-[#2c327a] to-[#1a1f4e] rounded-lg p-5 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Graduation Distribution</h2>
      </div>
      
      <div className="flex justify-between items-start">
        <div className="w-[320px] flex justify-center">
          <div className="relative w-[320px] h-[320px] -ml-6">
            <svg width="100%" height="100%" viewBox="0 0 320 320">
              <defs>
                {paths.map((item, index) => (
                  <React.Fragment key={`defs-${index}`}>
                    <filter id={`glow-${index}`}>
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <linearGradient id={`gradient-${index}`} gradientTransform="rotate(90)">
                      <stop offset="0%" stopColor={item.gradient.start} />
                      <stop offset="100%" stopColor={item.gradient.end} />
                    </linearGradient>
                  </React.Fragment>
                ))}
              </defs>

              {paths.map((item, index) => (
                <path
                  key={index}
                  d={item.path}
                  fill={`url(#gradient-${index})`}
                  stroke={item.stroke}
                  strokeWidth="3"
                  className="transition-all duration-300"
                  style={{
                    opacity: hoveredSection === null || hoveredSection === item.name ? 1 : 0.5,
                    filter: hoveredSection === item.name ? `url(#glow-${index})` : 'none',
                    transform: hoveredSection === item.name ? 'scale(1.02)' : 'scale(1)',
                    transformOrigin: 'center'
                  }}
                  onMouseEnter={() => setHoveredSection(item.name)}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <title>{`${item.name}: ${formatNumber(item.value)} (${item.percentage}%)`}</title>
                </path>
              ))}

              <circle
                cx={center}
                cy={center}
                r={innerRadius}
                fill="none"
                stroke="rgba(20, 30, 90, 0.2)"
                strokeWidth="1"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{total.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Total Graduates</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4 -ml-32 mt-10">
          {paths.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 transition-opacity duration-200"
              style={{ opacity: hoveredSection === null || hoveredSection === item.name ? 1 : 0.5 }}
              onMouseEnter={() => setHoveredSection(item.name)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ 
                  background: `linear-gradient(135deg, ${item.gradient.start}, ${item.gradient.end})`,
                  boxShadow: hoveredSection === item.name ? '0 0 8px rgba(255,255,255,0.3)' : 'none',
                  border: `1px solid ${item.stroke}`
                }}
              />
              <div className="flex flex-col">
                <span className="text-gray-300 text-sm font-medium">{item.name}</span>
                <div className="text-gray-400 text-xs">
                  {formatNumber(item.value)} ({item.percentage}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraduationPieChart;
