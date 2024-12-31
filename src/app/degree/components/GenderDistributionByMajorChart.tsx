'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GenderDistribution {
  name: string;
  maleCount: number;
  femaleCount: number;
  malePercentage: number;
  femalePercentage: number;
  totalGraduates: number;
}

interface Props {
  data: GenderDistribution[];
}

export default function GenderDistributionByMajorChart({ data }: Props) {
  const chartData = data.map(item => ({
    name: item.name,
    Male: item.malePercentage,
    Female: item.femalePercentage
  }));

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis type="number" domain={[0, 100]} unit="%" />
          <YAxis type="category" dataKey="name" width={150} tick={{ fill: '#ffffff' }} />
          <Tooltip 
            formatter={(value: number) => `${value.toFixed(1)}%`}
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
          <Bar dataKey="Male" fill="#2563eb" label={{ position: 'insideRight', fill: '#ffffff', formatter: (value: number) => `${value.toFixed(1)}%` }} />
          <Bar dataKey="Female" fill="#ec4899" label={{ position: 'insideRight', fill: '#ffffff', formatter: (value: number) => `${value.toFixed(1)}%` }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
