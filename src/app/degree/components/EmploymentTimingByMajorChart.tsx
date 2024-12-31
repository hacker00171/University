'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EmploymentTiming {
  name: string;
  beforeGraduation: number;
  withinYear: number;
  afterYear: number;
}

interface WaitingPeriod {
  period: string;
  percentage: number;
}

interface EmploymentTimeline {
  name: string;
  averageTimeToEmployment: number;
  quickEmploymentRate: number;
  waitingPeriods: WaitingPeriod[];
}

interface Props {
  timingData: EmploymentTiming[];
  timelineData: EmploymentTimeline[];
}

export default function EmploymentTimingByMajorChart({ timingData, timelineData }: Props) {
  const waitingPeriodsData = timelineData.map(item => ({
    name: item.name,
    ...item.waitingPeriods.reduce((acc, period) => ({
      ...acc,
      [period.period]: period.percentage
    }), {})
  }));

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-200">Employment Timing Distribution</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="beforeGraduation" name="Before Graduation (%)" stackId="a" fill="#22c55e" />
              <Bar dataKey="withinYear" name="Within First Year (%)" stackId="a" fill="#3b82f6" />
              <Bar dataKey="afterYear" name="After First Year (%)" stackId="a" fill="#f43f5e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium text-gray-200">Waiting Periods Distribution</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waitingPeriodsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="0-3 months" name="0-3 months (%)" stackId="a" fill="#22c55e" />
              <Bar dataKey="3-6 months" name="3-6 months (%)" stackId="a" fill="#3b82f6" />
              <Bar dataKey="6-9 months" name="6-9 months (%)" stackId="a" fill="#f43f5e" />
              <Bar dataKey="9+ months" name="9+ months (%)" stackId="a" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 