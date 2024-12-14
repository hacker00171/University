'use client';

import React from 'react';
import { ComposedChart, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SalaryTrend } from '../../state-view/types/regional';

interface Props {
  trends?: SalaryTrend[];
  className?: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      prevSalary?: number;
    };
  }>;
  label?: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const prevValue = payload[0].payload.prevSalary || value;
    const growthPercentNum = (value / prevValue - 1) * 100;
    const growthPercent = growthPercentNum.toFixed(1);
    
    return (
      <div className="bg-gradient-to-br from-[#1F2937] to-[#111827] p-4 rounded-xl border border-[#374151] shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
          <span className="text-gray-300 font-medium">{label}</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              ${value.toLocaleString()}
            </span>
            {growthPercentNum > 0 && (
              <span className="text-sm text-emerald-400">
                +{growthPercent}%
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400">
            Average Annual Salary
          </p>
        </div>
      </div>
    );
  }
  return null;
};

interface CustomBarProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
}

const CustomBar = (props: CustomBarProps) => {
  const { x = 0, y = 0, width = 0, height = 0 } = props;
  const radius = Math.min(width / 2, 8); // Cap the radius at 8px

  return (
    <g>
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feFlood floodColor="#000000" floodOpacity="0.15" />
          <feComposite in2="offsetblur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={`
          M ${x + radius} ${y}
          L ${x + width - radius} ${y}
          Q ${x + width} ${y} ${x + width} ${y + radius}
          L ${x + width} ${y + height - radius}
          Q ${x + width} ${y + height} ${x + width - radius} ${y + height}
          L ${x + radius} ${y + height}
          Q ${x} ${y + height} ${x} ${y + height - radius}
          L ${x} ${y + radius}
          Q ${x} ${y} ${x + radius} ${y}
        `}
        fill="url(#barGradient)"
        filter="url(#shadow)"
      />
    </g>
  );
};

const SalaryChart: React.FC<Props> = ({ trends, className = '' }) => {
  if (!trends || trends.length === 0) return null;

  // Calculate previous year's salary for growth percentage
  const trendsWithPrev = trends.map((trend, index) => ({
    ...trend,
    prevSalary: index > 0 ? trends[index - 1].averageSalary : trend.averageSalary,
  }));

  return (
    <div className={`bg-gradient-to-br from-[#2c327a] to-[#1a1f4e] rounded-lg p-5 shadow-lg ${className}`}>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(-100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          .chart-container {
            animation: slideIn 0.8s ease-out forwards;
          }
          
          .salary-area {
            filter: drop-shadow(0px 4px 6px rgba(59, 130, 246, 0.1));
          }

          .bar-hover {
            transition: filter 0.3s ease;
          }

          .bar-hover:hover {
            filter: brightness(1.2);
          }
        `}
      </style>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Average Salaries</h2>
          <p className="text-gray-400 text-sm mt-1">Annual salary progression</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-400 opacity-50"></div>
            <span className="text-gray-400 text-sm">Area Trend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-400 text-sm">Bar Value</span>
          </div>
        </div>
      </div>
      <div className="h-[300px] chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={trendsWithPrev}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity={1} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#374151" 
              vertical={false}
            />
            <XAxis 
              dataKey="year"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              axisLine={{ stroke: '#374151' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              width={80}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
              axisLine={{ stroke: '#374151' }}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
            />
            <Area
              type="monotone"
              dataKey="averageSalary"
              fill="url(#areaGradient)"
              stroke="#60A5FA"
              strokeWidth={2}
              className="salary-area"
            />
            <Bar 
              dataKey="averageSalary"
              shape={CustomBar}
              maxBarSize={35}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalaryChart;
