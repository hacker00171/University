'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EmploymentTiming {
  name: string;
  beforeGraduation: number;
  withinYear: number;
  afterYear: number;
}

interface Props {
  data: EmploymentTiming[];
}

export default function EmploymentTimingDistributionChart({ data }: Props) {
  const chartData = data
    .sort((a, b) => (b.beforeGraduation + b.withinYear) - (a.beforeGraduation + a.withinYear))
    .map(item => ({
      name: item.name,
      "Before Graduation": item.beforeGraduation,
      "Within First Year": item.withinYear,
      "After First Year": item.afterYear
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
          <Bar dataKey="Before Graduation" stackId="a" fill="#22c55e" />
          <Bar dataKey="Within First Year" stackId="a" fill="#3b82f6" />
          <Bar dataKey="After First Year" stackId="a" fill="#f43f5e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 