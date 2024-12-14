import React from 'react';
import { motion } from 'framer-motion';

interface University {
  name: string;
  location: [number, number];
  type: 'public' | 'private';
  graduates: number;
}

interface Region {
  name: string;
  count: number;
  universities: University[];
}

const SaudiMap = ({ data, onRegionClick }: { 
  data: Region[],
  onRegionClick: (region: Region) => void 
}) => {
  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-[#1a237e] via-[#1e88e5] to-[#0d47a1] rounded-xl p-6 overflow-hidden">
      {/* Background dots pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* Glowing orbs background effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-300 rounded-full filter blur-3xl opacity-20 animate-pulse" />

      <svg
        viewBox="0 0 1000 800"
        className="w-full h-full"
        style={{ 
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
        }}
      >
        {/* Define gradient for the map */}
        <defs>
          <linearGradient id="regionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#4fc3f7', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: '#2196f3', stopOpacity: 0.3 }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Saudi Arabia map with dotted borders */}
        <g className="transform translate-x-[100] translate-y-[100]">
          {/* Tabuk Region */}
          <motion.path
            d="M180 120 L250 100 L300 150 L270 200 L200 180 Z"
            className="cursor-pointer"
            style={{
              fill: 'url(#regionGradient)',
              stroke: '#fff',
              strokeWidth: 1.5,
              strokeDasharray: '4,4',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ 
              scale: 1.02,
              filter: 'brightness(1.2)',
              transition: { duration: 0.2 }
            }}
            onHoverStart={() => {
              const tooltip = document.getElementById('region-tooltip');
              if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translate(-50%, -120%) scale(1)';
              }
            }}
            onHoverEnd={() => {
              const tooltip = document.getElementById('region-tooltip');
              if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translate(-50%, -110%) scale(0.95)';
              }
            }}
            transition={{ duration: 0.3 }}
            onClick={() => onRegionClick(data[0])}
          />

          {/* Northern Region */}
          <motion.path
            d="M300 150 L380 130 L400 180 L350 220 L300 200 Z"
            className="cursor-pointer"
            style={{
              fill: 'url(#regionGradient)',
              stroke: '#fff',
              strokeWidth: 1.5,
              strokeDasharray: '4,4',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ 
              scale: 1.02,
              filter: 'brightness(1.2)',
              transition: { duration: 0.2 }
            }}
            onHoverStart={() => {
              const tooltip = document.getElementById('region-tooltip');
              if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translate(-50%, -120%) scale(1)';
              }
            }}
            onHoverEnd={() => {
              const tooltip = document.getElementById('region-tooltip');
              if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translate(-50%, -110%) scale(0.95)';
              }
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />

          {/* Eastern Region */}
          <motion.path
            d="M400 180 L500 150 L550 250 L500 350 L420 300 Z"
            className="cursor-pointer"
            style={{
              fill: 'url(#regionGradient)',
              stroke: '#fff',
              strokeWidth: 1.5,
              strokeDasharray: '4,4',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ 
              scale: 1.02,
              filter: 'brightness(1.2)',
              transition: { duration: 0.2 }
            }}
            onHoverStart={() => {
              const tooltip = document.getElementById('region-tooltip');
              if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translate(-50%, -120%) scale(1)';
              }
            }}
            onHoverEnd={() => {
              const tooltip = document.getElementById('region-tooltip');
              if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translate(-50%, -110%) scale(0.95)';
              }
            }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />

          {/* Riyadh Region */}
          <motion.path
            d="M300 200 L400 180 L420 300 L380 350 L300 320 Z"
            className="cursor-pointer"
            style={{
              fill: 'url(#regionGradient)',
              stroke: '#fff',
              strokeWidth: 1.5,
              strokeDasharray: '4,4',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ 
              scale: 1.02,
              filter: 'brightness(1.2)',
              transition: { duration: 0.2 }
            }}
            onHoverStart={() => {
              const tooltip = document.getElementById('region-tooltip');
              if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translate(-50%, -120%) scale(1)';
              }
            }}
            onHoverEnd={() => {
              const tooltip = document.getElementById('region-tooltip');
              if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translate(-50%, -110%) scale(0.95)';
              }
            }}
            transition={{ duration: 0.3, delay: 0.3 }}
          />

          {/* Makkah Region */}
          <motion.path
            d="M250 300 L300 280 L350 350 L300 400 L250 380 Z"
            className="cursor-pointer"
            style={{
              fill: 'url(#regionGradient)',
              stroke: '#fff',
              strokeWidth: 1.5,
              strokeDasharray: '4,4',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ 
              scale: 1.02,
              filter: 'brightness(1.2)',
              transition: { duration: 0.2 }
            }}
            onHoverStart={() => {
              const tooltip = document.getElementById('region-tooltip');
              if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translate(-50%, -120%) scale(1)';
              }
            }}
            onHoverEnd={() => {
              const tooltip = document.getElementById('region-tooltip');
              if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translate(-50%, -110%) scale(0.95)';
              }
            }}
            transition={{ duration: 0.3, delay: 0.4 }}
          />

          {/* Region Labels */}
          <g className="text-[16px] fill-white font-medium" style={{ filter: 'url(#glow)' }}>
            {data.map((region, index) => (
              <motion.text
                key={region.name}
                className="pointer-events-none text-shadow-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
              >
                <tspan x={300 + index * 20} y={200 + index * 30} className="font-bold text-[#E3F2FD]">{region.name}</tspan>
                <tspan x={300 + index * 20} y={220 + index * 30} className="text-[14px] fill-[#B3E5FC]">{region.count} Universities</tspan>
              </motion.text>
            ))}
          </g>
        </g>
      </svg>

      {/* Interactive Tooltip */}
      <div
        id="region-tooltip"
        className="fixed bg-white/90 backdrop-blur-md rounded-lg p-4 shadow-xl transform -translate-x-1/2 -translate-y-full
                 opacity-0 transition-all duration-200 ease-in-out z-50 min-w-[200px] text-blue-900"
        style={{
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          pointerEvents: 'none'
        }}
      >
        <div className="font-bold text-lg text-blue-600"></div>
        <div className="text-sm mt-1 space-y-1">
          <div className="flex justify-between">
            <span>Universities:</span>
            <span className="font-semibold text-blue-500"></span>
          </div>
          <div className="flex justify-between">
            <span>Students:</span>
            <span className="font-semibold text-blue-500"></span>
          </div>
          <div className="flex justify-between">
            <span>Employment Rate:</span>
            <span className="font-semibold text-blue-500"></span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="absolute top-4 right-4 space-y-4">
        {data.map((region, index) => (
          <motion.div
            key={region.name}
            className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-white"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <div className="text-lg font-bold">{region.name}</div>
            <div className="text-3xl font-bold text-cyan-400">{region.count}</div>
            <div className="text-sm opacity-80">Universities</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SaudiMap;
