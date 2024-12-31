'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface GeneralMajor {
  name: string;
  value: number;
  genderDistribution?: {
    male: { count: number; percentage: number };
    female: { count: number; percentage: number };
  };
  totalStudents?: number;
  employedStudents?: number;
}

interface GeneralMajorsData {
  byGraduates: GeneralMajor[];
  byEmploymentRate: GeneralMajor[];
  byAverageSalary: GeneralMajor[];
}

interface Props {
  data: GeneralMajorsData;
}

export default function TopGeneralMajorsChart({ data }: Props) {
  const graduatesData = data.byGraduates.map(item => ({
    name: item.name,
    "Total Graduates": item.value,
    "Male %": item.genderDistribution?.male.percentage,
    "Female %": item.genderDistribution?.female.percentage
  }));

  const employmentData = data.byEmploymentRate.map(item => ({
    name: item.name,
    "Employment Rate": item.value,
    "Total Students": item.totalStudents,
    "Employed Students": item.employedStudents
  }));

  const salaryData = data.byAverageSalary.map(item => ({
    name: item.name,
    "Average Salary": item.value
  }));

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-200">Top Majors by Graduates</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={graduatesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Total Graduates" fill="#0F75BC" />
              <Bar dataKey="Male %" fill="#4A90E2" />
              <Bar dataKey="Female %" fill="#FF69B4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-200">Top Majors by Employment Rate</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={employmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="Total Students" fill="#0F75BC" />
              <Bar yAxisId="left" dataKey="Employed Students" fill="#45B7A9" />
              <Bar yAxisId="right" dataKey="Employment Rate" fill="#FFE5A3" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-200">Top Majors by Average Salary</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Average Salary" fill="#0F75BC" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 