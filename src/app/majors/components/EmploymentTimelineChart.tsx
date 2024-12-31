import React from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from 'recharts';

interface WaitingPeriod {
  period: string;
  percentage: number;
}

interface EmploymentTimeline {
  generalMajor?: string;
  waitingPeriods: WaitingPeriod[];
}

interface Props {
  generalMajor: string | null;
  data: EmploymentTimeline[];
}

interface WaitingPeriodData {
  name: string | undefined;
  "0-3 months": number;
  "3-6 months": number;
  "6-9 months": number;
  "9+ months": number;
  [key: string]: string | number | undefined;
}

const EmploymentTimelineChart: React.FC<Props> = ({ data }) => {
  const transformedData: WaitingPeriodData[] = data.map((item) => {
    const defaultData: WaitingPeriodData = {
      name: item.generalMajor,
      "0-3 months": 0,
      "3-6 months": 0,
      "6-9 months": 0,
      "9+ months": 0
    };

    item.waitingPeriods.forEach(period => {
      defaultData[period.period] = period.percentage;
    });

    return defaultData;
  });

  return (
    <div className="bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg">
      <h3 className="text-white text-lg mb-4">Employment Timeline Analysis</h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={transformedData}
            layout="vertical"
            margin={{ top: 20, right: 70, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2e365f" horizontal={false} />
            <XAxis 
              type="number"
              tick={{ fill: '#9ca3af' }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              width={180}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0a1230',
                border: '1px solid #2e365f',
                borderRadius: '6px',
              }}
              formatter={(value: number, name: string) => [`${value}%`, name]}
            />
            <Legend
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: '10px' }}
              formatter={(value) => <span style={{ color: '#9ca3af', fontSize: '12px' }}>{value}</span>}
            />
            
            <Bar
              dataKey="0-3 months"
              fill="#4f46e5"
              stackId="a"
              name="0-3 months"
              maxBarSize={30}
            >
              <LabelList dataKey="0-3 months" position="inside" fill="#fff" fontSize={12} />
            </Bar>
            <Bar
              dataKey="3-6 months"
              fill="#22c55e"
              stackId="a"
              name="3-6 months"
              maxBarSize={30}
            >
              <LabelList dataKey="3-6 months" position="inside" fill="#fff" fontSize={12} />
            </Bar>
            <Bar
              dataKey="6-9 months"
              fill="#eab308"
              stackId="a"
              name="6-9 months"
              maxBarSize={30}
            >
              <LabelList dataKey="6-9 months" position="inside" fill="#fff" fontSize={12} />
            </Bar>
            <Bar
              dataKey="9+ months"
              fill="#ef4444"
              stackId="a"
              name="9+ months"
              maxBarSize={30}
            >
              <LabelList dataKey="9+ months" position="inside" fill="#fff" fontSize={12} />
            </Bar>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmploymentTimelineChart;
