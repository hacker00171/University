'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

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
  data: EmploymentTimeline[];
}

interface WaitingPeriodData {
  name: string;
  "0-3 months": number;
  "3-6 months": number;
  "6-9 months": number;
  "9+ months": number;
  [key: string]: string | number; // Allow for dynamic period keys
}

export default function WaitingPeriodsDistributionChart({ data }: Props) {
  const transformedData: WaitingPeriodData[] = data.map((item) => {
    // Initialize with default values for all required properties
    const defaultData: WaitingPeriodData = {
      name: item.name,
      "0-3 months": 0,
      "3-6 months": 0,
      "6-9 months": 0,
      "9+ months": 0
    };

    // Add the actual waiting period values
    item.waitingPeriods.forEach(period => {
      defaultData[period.period] = period.percentage;
    });

    return defaultData;
  }).sort((a, b) => (b["0-3 months"] || 0) - (a["0-3 months"] || 0));

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={transformedData}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={30}
        >
          <XAxis 
            type="number" 
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            tick={{ fill: '#ffffff' }}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={150} 
            tick={{ fill: '#ffffff' }} 
          />
          <Tooltip 
            formatter={(value: number, name: string) => [`${value}%`, name]}
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
            dataKey="0-3 months" 
            stackId="a" 
            fill="#4CAF50" 
            name="0-3 months"
          >
            <LabelList dataKey="0-3 months" position="center" fill="#ffffff" fontSize={12} />
          </Bar>
          <Bar 
            dataKey="3-6 months" 
            stackId="a" 
            fill="#2196F3" 
            name="3-6 months"
          >
            <LabelList dataKey="3-6 months" position="center" fill="#ffffff" fontSize={12} />
          </Bar>
          <Bar 
            dataKey="6-9 months" 
            stackId="a" 
            fill="#FFC107" 
            name="6-9 months"
          >
            <LabelList dataKey="6-9 months" position="center" fill="#ffffff" fontSize={12} />
          </Bar>
          <Bar 
            dataKey="9+ months" 
            stackId="a" 
            fill="#FF5722" 
            name="9+ months"
          >
            <LabelList dataKey="9+ months" position="center" fill="#ffffff" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}