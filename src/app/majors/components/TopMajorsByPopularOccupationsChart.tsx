'use client';

import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from 'recharts';

interface TopMajorsByPopularOccupationsChartProps {
  generalMajor: string | null;
  narrowMajor: string | null;
  data: Array<{
    occupation: string;
    graduates: number;
  }>;
}

export default function TopMajorsByPopularOccupationsChart({ 
  generalMajor, 
  narrowMajor, 
  data 
}: TopMajorsByPopularOccupationsChartProps) {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    return data
      .sort((a, b) => b.graduates - a.graduates)
      .slice(0, 5)
      .map(item => ({
        name: item.occupation,
        Graduates: item.graduates || 0,
      }));
  }, [data]);

  if (!data || data.length === 0 || chartData.length === 0) {
    return (
      <div className="h-[400px] bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">No occupation data available</p>
      </div>
    );
  }

  return (
    <div className="h-[400px] bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg">
      <h3 className="text-white text-lg mb-4">
        {narrowMajor 
          ? `Top Popular Occupations in ${narrowMajor}`
          : generalMajor
            ? `Top Popular Occupations in ${generalMajor}`
            : 'Top Popular Occupations'
        }
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 25,
            right: 70,
            left: -40,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2e365f" horizontal={false} />
          <XAxis 
            type="number"
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ 
              fill: '#9ca3af',
              fontSize: 12
            }}
            width={180}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0a1230',
              border: '1px solid #2e365f',
              borderRadius: '6px',
            }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#9ca3af' }}
            formatter={(value: number) => {
              return [`${value.toLocaleString()}`, 'Graduates'];
            }}
          />
          <Bar 
            dataKey="Graduates" 
            fill="#60a5fa"
            radius={[0, 0, 0, 0]}
            maxBarSize={20}
          >
            <LabelList 
              position="right"
              fill="#60a5fa"
              formatter={(value: number) => value.toLocaleString()}
              style={{ fontSize: 12 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
