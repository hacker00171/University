'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GraduatesData {
  name: string;
  value: number;
  genderDistribution: {
    male: { count: number; percentage: number };
    female: { count: number; percentage: number };
  };
}

interface Props {
  data: GraduatesData[];
}

export default function TopMajorsByGraduatesChart({ data }: Props) {
  const chartData = data
    .sort((a, b) => b.value - a.value)
    .map(item => ({
      name: item.name,
      "Total Graduates": item.value,
      "Male %": item.genderDistribution.male.percentage,
      "Female %": item.genderDistribution.female.percentage
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
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" width={150} tick={{ fill: '#ffffff' }} />
          <Tooltip 
            formatter={(value: number) => value.toLocaleString()}
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
          <Bar dataKey="Total Graduates" barSize={30} fill="#0F75BC" label={{ position: 'insideRight', fill: '#ffffff', formatter: (value: number) => value.toLocaleString() }} />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}