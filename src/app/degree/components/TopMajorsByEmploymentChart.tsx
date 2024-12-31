'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface EmploymentData {
  name: string;
  value: number;
  totalStudents: number;
  employedStudents: number;
}

interface Props {
  data: EmploymentData[];
}

export default function TopMajorsByEmploymentChart({ data }: Props) {
  const chartData = data
    .sort((a, b) => b.value - a.value)
    .map(item => ({
      name: item.name,
      value: item.value,
      totalStudents: item.totalStudents,
      employedStudents: item.employedStudents
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
          <XAxis type="number" unit="%" domain={[0, 100]} />
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
          <Bar dataKey="value" fill="#2563eb" barSize={30} label={{ position: 'insideRight', fill: '#ffffff', formatter: (value: number) => `${value.toFixed(1)}%` }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}