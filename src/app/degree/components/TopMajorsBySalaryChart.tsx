'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalaryData {
  name: string;
  value: number;
}

interface Props {
  data: SalaryData[];
}

export default function TopMajorsBySalaryChart({ data }: Props) {
  const chartData = data
    .sort((a, b) => b.value - a.value)
    .map(item => ({
      name: item.name,
      "Average Salary": item.value
    }));

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={150} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Average Salary" fill="#0F75BC" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 