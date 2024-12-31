import React from 'react';
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

interface TopMajorsByHighestPaidOccupationChartProps {
  generalMajor: string | null;
  data: Array<{
    major: string;
    averageSalary: number;
    occupation: string;
  }>;
}

export default function TopMajorsByHighestPaidOccupationChart({ 
  data 
}: TopMajorsByHighestPaidOccupationChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[400px] bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  const chartData = data
    .sort((a, b) => b.averageSalary - a.averageSalary)
    .map(item => ({
      name: item.major,
      'Average Salary': item.averageSalary || 0,
    }));

  return (
    <div className="h-[400px] bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg">
      <div className="space-y-4">
        <h3 className="text-white text-lg ">
          Top Occupation by Average Salary
        </h3>

        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                top: 25,
                right: 50,
                left: -40,
                bottom: 35,
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
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Average Salary']}
              />
              <Bar 
                dataKey="Average Salary" 
                fill="#f59e0b"
                radius={[0, 0, 0, 0]}
                maxBarSize={20}
              >
                <LabelList 
                  position="right"
                  fill="#f59e0b"
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  style={{ fontSize: 12 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
