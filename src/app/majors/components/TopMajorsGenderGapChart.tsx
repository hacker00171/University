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
  LabelList,
} from 'recharts';

interface TopMajorsGenderGapChartProps {
  generalMajor: string | null;
  data: Array<{
    generalMajor: string;
    malePercentage: number;
    femalePercentage: number;
    genderGap: number;
  }>;
}

export default function TopMajorsGenderGapChart({
  data,
}: TopMajorsGenderGapChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[400px] bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">No gender gap data available</p>
      </div>
    );
  }

  // Sort data by gender gap value for better visualization
  const sortedData = [...data]
    .sort((a, b) => Math.abs(b.genderGap) - Math.abs(a.genderGap))
    .slice(0, 5)
    .map((item) => ({
      name: item.generalMajor,
      Male: item.malePercentage,
      Female: item.femalePercentage,
      'Gender Gap': item.genderGap,
    }));

  return (
    <div className="h-[400px] bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-4 rounded-lg">
      <h3 className="text-white text-lg mb-4">Top Majors By Gender</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={sortedData}
          layout="vertical"
          barGap={-13} // No gap between bars
          margin={{
            top: 5,
            right: 90,
            left: 0,
            bottom: 20,
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
              fontSize: 12,
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
