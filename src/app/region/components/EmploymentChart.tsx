'use client';

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EmploymentTrend } from '../../state-view/types/regional';

interface Props {
  trends: EmploymentTrend[] | undefined;
}

type ViewMode = 'gender' | 'nationality';

const EmploymentChart: React.FC<Props> = ({ trends }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('gender');

  if (!trends) return null;

  // Transform data based on view mode
  const formattedTrends = trends.map(trend => {
    if (viewMode === 'gender') {
      return {
        year: trend.year,
        Male: Number(trend.localMale.toFixed(1)),
        Female: Number(trend.localFemale.toFixed(1))
      };
    } else {
      return {
        year: trend.year,
        Saudi: Number(trend.internationalMale.toFixed(1)),
        'Non-Saudi': Number(trend.internationalFemale.toFixed(1))
      };
    }
  });

  // Define line colors and properties based on view mode
  const lineConfigs = viewMode === 'gender' 
    ? [
        { key: 'Male', color: '#60A5FA' },
        { key: 'Female', color: '#F472B6' }
      ]
    : [
        { key: 'Saudi', color: '#34D399' },
        { key: 'Non-Saudi', color: '#FBBF24' }
      ];

  return (
    <div className="bg-gradient-to-br from-[#2c327a] to-[#1a1f4e] rounded-lg p-5 shadow-lg min-h-[400px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Employment Rates</h2>
        <div className="inline-flex p-0.5 rounded-lg bg-[#1a1d4a]/50 backdrop-blur-sm">
          <button
            onClick={() => setViewMode('gender')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'gender'
                ? 'bg-blue-500/90 text-white shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Gender
          </button>
          <button
            onClick={() => setViewMode('nationality')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'nationality'
                ? 'bg-blue-500/90 text-white shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Nationality
          </button>
        </div>
      </div>
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedTrends}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="year"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF' }}
              width={60}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.375rem',
                color: '#F3F4F6'
              }}
              formatter={(value: number) => [`${value}%`, '']}
              itemStyle={{ color: '#F3F4F6' }}
              cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
            />
            <Legend 
              wrapperStyle={{ color: '#9CA3AF' }}
            />
            {lineConfigs.map(config => (
              <Line 
                key={config.key}
                type="monotone"
                dataKey={config.key}
                name={config.key}
                stroke={config.color}
                strokeWidth={2}
                dot={{ fill: config.color, r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmploymentChart;
