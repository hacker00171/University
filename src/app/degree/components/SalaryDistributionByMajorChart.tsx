'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalaryRanges {
  "0-5000": { percentage: number };
  "5001-10000": { percentage: number };
  "10001-15000": { percentage: number };
  "15001+": { percentage: number };
}

interface SalaryDistribution {
  name: string;
  ranges: SalaryRanges;
  medianSalary: number;
  averageSalary: number;
}

interface Props {
  data: SalaryDistribution[];
}

export default function SalaryDistributionByMajorChart({ data }: Props) {
  const chartData = data.map(item => ({
    name: item.name,
    "0-5K": item.ranges["0-5000"].percentage,
    "5K-10K": item.ranges["5001-10000"].percentage,
    "10K-15K": item.ranges["10001-15000"].percentage,
    "15K+": item.ranges["15001+"].percentage,
    "Median": item.medianSalary,
    "Average": item.averageSalary
  }));

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={chartData}
          margin={{
            top: 30,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          <XAxis 
            dataKey="name" 
            angle={-10} 
            textAnchor="end" 
            height={100} 
            tick={{ fill: '#ffffff', fontSize: 10 }} 
          />
          <YAxis 
            yAxisId="left" 
            orientation="left" 
            label={{ value: 'Distribution (%)', angle: -90, position: 'insideLeft', fill: '#ffffff' }} 
            tick={{ fill: '#ffffff', fontSize: 10  }}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            label={{ value: 'Salary ($)', angle: 90, position: 'insideRight', fill: '#ffffff' }} 
            tick={{ fill: '#ffffff', fontSize: 10  }}
          />
          <Tooltip 
            formatter={(value: number, name: string) => {
              if (name === "Median" || name === "Average") {
                return [`$${value.toLocaleString()}`, name];
              }
              return [`${value}%`, name];
            }}
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              borderRadius: '6px',
              color: '#fff'
            }}
            labelStyle={{
              color: '#fff',
              fontWeight: 'bold',
              marginBottom: '4px'
            }}
          />
          <Legend />
          <Bar 
            yAxisId="left" 
            dataKey="0-5K" 
            stackId="a" 
            fill="#e11d48" 
            barSize={30}
            label={{ position: 'center', fill: '#ffffff', formatter: (value: number) => `${value}%`, fontSize: 10 }} 
          />
          <Bar 
            yAxisId="left" 
            dataKey="5K-10K" 
            stackId="a" 
            fill="#fb923c" 
            label={{ position: 'center', fill: '#ffffff', formatter: (value: number) => `${value}%`, fontSize: 10 }} 
          />
          <Bar 
            yAxisId="left" 
            dataKey="10K-15K" 
            stackId="a" 
            fill="#22c55e" 
            label={{ position: 'center', fill: '#ffffff', formatter: (value: number) => `${value}%`, fontSize: 10 }} 
          />
          <Bar 
            yAxisId="left" 
            dataKey="15K+" 
            stackId="a" 
            fill="#3b82f6" 
            label={{ position: 'center', fill: '#ffffff', formatter: (value: number) => `${value}%`, fontSize: 10 }} 
          />
          <Bar 
            yAxisId="right" 
            dataKey="Median" 
            fill="#8b5cf6" 
            barSize={30}
            label={{ position: 'top', fill: '#ffffff', formatter: (value: number) => `$${value.toLocaleString()}`, fontSize: 10 }} 
          />
          <Bar 
            yAxisId="right" 
            dataKey="Average" 
            fill="#6366f1" 
            barSize={30}
            label={{ position: 'top', fill: '#ffffff', formatter: (value: number) => `$${value.toLocaleString()}`, fontSize: 10 }} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 