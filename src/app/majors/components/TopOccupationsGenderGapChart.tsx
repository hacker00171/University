import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList
} from 'recharts';

interface TopOccupationsGenderGapChartProps {
  generalMajor: string | null;
  data: Array<{
    name: string;
    metrics: {
      graduates: number;
      employmentRate: number;
      averageSalary: number;
      genderDistribution: {
        male: { count: number; percentage: number };
        female: { count: number; percentage: number };
      };
    };
  }>;
}

export default function TopOccupationsGenderGapChart({
  data
}: TopOccupationsGenderGapChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[400px] bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">No gender gap data available</p>
      </div>
    );
  }

  const chartData = data
    .map(item => ({
      name: item.name,
      Male: item.metrics.genderDistribution.male.percentage,
      Female: item.metrics.genderDistribution.female.percentage,
      'Gender Gap': item.metrics.genderDistribution.male.percentage - item.metrics.genderDistribution.female.percentage
    }))
    .sort((a, b) => Math.abs(b['Gender Gap']) - Math.abs(a['Gender Gap']))
    .slice(0, 5);

  return (
    <div className="h-[400px] bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg">
      <h3 className="text-white text-lg mb-4">Top Occupations By Gender</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          layout="vertical"
          barGap={-13}
          margin={{
            top: 5,
            right: 90,
            left: 0,
            bottom: 20
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2e365f" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: '#9ca3af' }}
            tickFormatter={(value) => `${value}%`}
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
            formatter={(value: number, name: string) => [`${value}%`, name]}
            labelStyle={{ color: '#fff' }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => <span style={{ color: '#9ca3af' }}>{value}</span>}
          />
          <Bar
            dataKey="Male"
            fill="#4f46e5"
            radius={[4, 4, 4, 4]}
            maxBarSize={12}
          >
            <LabelList
              dataKey="Male"
              position="right"
              fill="#fff"
              fontSize={12}
              formatter={(value: number) => `${value}%`}
            />
          </Bar>
          <Bar
            dataKey="Female"
            fill="#ec4899"
            radius={[4, 4, 4, 4]}
            maxBarSize={12}
          >
            <LabelList
              dataKey="Female"
              position="right"
              fill="#fff"
              fontSize={12}
              formatter={(value: number) => `${value}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
