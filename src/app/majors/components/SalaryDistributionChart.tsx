import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

interface SalaryDistributionChartProps {
  generalMajor: string | null;
  data: Array<{
    generalMajor?: string;
    narrowMajor?: string;
    occupation?: string;
    salary: number;
    percentage: number;
    median?: number;
  }>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
  }>;
  label?: string;
}

export default function SalaryDistributionChart({
  generalMajor,
  data
}: SalaryDistributionChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-[400px] bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">No salary distribution data available</p>
      </div>
    );
  }

  // Sort data by salary for better visualization
  const sortedData = [...data]
    .sort((a, b) => b.salary - a.salary)
    .map(item => ({
      name: item.occupation || item.narrowMajor || item.generalMajor || 'Unknown',
      salary: item.salary || 0,
      median: item.median || 0
    }));

  // Calculate median salary for the reference line
  const medianSalary = sortedData[0]?.median || 0;

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="bg-[#0a1230] border border-[#2e365f] rounded-md p-3">
          <p className="text-white mb-1">{label}</p>
          <p className="text-gray-300">{`Salary: $${payload[0].value.toLocaleString()}`}</p>
          <p className="text-[#f59e0b]">{`Median: $${medianSalary.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[400px] bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg">
      <h3 className="text-white text-lg mb-4">
        {generalMajor 
          ? `Salary Distribution for ${data[0]?.narrowMajor || data[0]?.generalMajor || generalMajor}`
          : 'Overall Salary Distribution'
        }
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={sortedData}
          layout="vertical"
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
            tick={{ fill: '#9ca3af' }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            label={{ 
              value: 'Salary', 
              position: 'insideBottom', 
              fill: '#9ca3af', 
              offset: -10 
            }}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ 
              fill: '#9ca3af',
              fontSize: 12,
              width: 150,
              textAnchor: 'end'
            }}
            width={180}
          />
          <Tooltip content={<CustomTooltip />} />
          
          {/* Salary bars */}
          <Bar
            dataKey="salary"
            fill="#4f46e5"
            radius={[0, 4, 4, 0]}
            maxBarSize={25}
            label={{
              position: 'right',
              fill: '#9ca3af',
              formatter: (value: number) => `$${value.toLocaleString()}`
            }}
          />

          {/* Median salary reference line */}
          {medianSalary > 0 && (
            <ReferenceLine
              x={medianSalary}
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="5 5"
              label={{
                value: `Median: $${medianSalary.toLocaleString()}`,
                fill: '#f59e0b',
                position: 'top'
              }}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 