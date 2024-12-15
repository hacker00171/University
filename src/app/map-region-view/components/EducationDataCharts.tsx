import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  LabelList,
  ScatterChart,
  Scatter,
  CartesianGrid,
  ZAxis,
  TooltipProps
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/app/map-region-view/components/card';

const chartColors = {
  primary: '#00d2d3',    // Bright turquoise
  secondary: '#48dbfb',  // Light blue
  accent: '#0abde3',     // Medium blue
  background: '#152c70', // Deep blue
  text: '#ffffff',       // White
  colors: [
    '#00d2d3', // Primary turquoise
    '#48dbfb', // Light blue
    '#0abde3', // Medium blue
    '#2bcbba', // Teal
    '#45aaf2', // Sky blue
    '#4b7bec', // Royal blue
    '#00E1E2', // Bright cyan
    '#a55eea', // Purple
    '#00d2d3'  // Back to primary for King Saud
  ]
};

const EducationDataCharts = () => {
  // Universities by Region
  const universitiesByRegion = [
    { name: 'Riyadh', count: 11, fullName: 'Riyadh Region' },
    { name: 'Eastern', count: 7, fullName: 'Eastern Province' },
    { name: 'Western', count: 6, fullName: 'Western Province' },
    { name: 'Makkah', count: 3, fullName: 'Makkah Region' },
    { name: 'Southern', count: 5, fullName: 'Southern Region' },
    { name: 'Northern', count: 4, fullName: 'Northern Region' }
  ];

  // Top Universities by Graduates
  const topUniversities = [
    { name: 'Umm Al-Qura', graduates: 21505, fullName: 'Umm Al-Qura University' },
    { name: 'King Abdulaziz', graduates: 19279, fullName: 'King Abdulaziz University' },
    { name: 'King Faisal', graduates: 15944, fullName: 'King Faisal University' },
    { name: 'King Khalid', graduates: 14150, fullName: 'King Khalid University' },
    { name: 'KFUPM', graduates: 13650, fullName: 'King Fahd University of Petroleum and Minerals' }
  ];

  // University Types Distribution
  const universityTypes = [
    { name: 'Public', value: 27, color: chartColors.primary },
    { name: 'Private', value: 24, color: chartColors.secondary }
  ];

  // Employment Rate by Major
  const employmentByMajor = [
    { major: 'Engineering', rate: 64, fullName: 'Engineering, Manufacturing and Construction' },
    { major: 'Health', rate: 62, fullName: 'Health and Well-being' },
    { major: 'ICT', rate: 61, fullName: 'Information and Communication Technology' },
    { major: 'Business', rate: 59, fullName: 'Business, Management and Law' },
    { major: 'Sciences', rate: 45, fullName: 'Natural Sciences and Mathematics' }
  ];

  // Regional Graduates Bar Chart
  const regionalGraduatesData = [
    { name: 'Riyadh', fullName: 'Riyadh Region', graduates: 40000, employmentRate: 58 },
    { name: 'Eastern', fullName: 'Eastern Province', graduates: 30000, employmentRate: 59 },
    { name: 'Western', fullName: 'Western Region', graduates: 25000, employmentRate: 55 },
    { name: 'Makkah', fullName: 'Makkah Region', graduates: 21500, employmentRate: 54 },
    { name: 'South', fullName: 'Southern Region', graduates: 17000, employmentRate: 53 }
  ];

  // Graduates by Major Bar Chart
  const graduatesByMajorData = [
    { name: 'Bus & Law', fullName: 'Business & Law', graduates: 65792 },
    { name: 'Arts & Hum', fullName: 'Arts and Humanities', graduates: 38406 },
    { name: 'Sciences', fullName: 'Natural Sciences & Mathematics', graduates: 19731 },
    { name: 'Health', fullName: 'Health and Well-being', graduates: 18777 },
    { name: 'Education', fullName: 'Education', graduates: 14058 }
  ];

  // University Performance Data
  const universityPerformanceData = [
    { name: 'Umm Al-Qura University', employmentRate: 3.31, graduates: 21505, size: 2000 },
    { name: 'King Abdulaziz University', employmentRate: 3.25, graduates: 19279, size: 1800 },
    { name: 'King Faisal University', employmentRate: 3.22, graduates: 15944, size: 1500 },
    { name: 'King Khalid University', employmentRate: 3.19, graduates: 14150, size: 1300 },
    { name: 'King Fahd University', employmentRate: 3.18, graduates: 13650, size: 1250 },
    { name: 'Jazan University', employmentRate: 3.20, graduates: 12354, size: 1100 },
    { name: 'Imam Muhammad University', employmentRate: 3.17, graduates: 10657, size: 1000 },
    { name: 'Nourah University', employmentRate: 3.24, graduates: 7884, size: 800 },
    { name: 'King Saud University', employmentRate: 3.16, graduates: 6783, size: 700 }
  ];

  const CustomTooltip = ({ 
    active, 
    payload 
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as {
        name: string;
        employmentRate: number;
        graduates: number;
        size: number;
      };
      return (
        <div className="bg-[#162464] p-4 rounded-lg border border-[#2D4393] shadow-lg">
          <p className="text-white font-bold mb-2">{data.name}</p>
          <p className="text-gray-300">Employment Rate: {data.employmentRate?.toFixed(2)}</p>
          <p className="text-gray-300">Graduates: {data.graduates?.toLocaleString() || '0'}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Universities by Region */}
      <Card className="col-span-1 bg-[#162464]/50 backdrop-blur-sm border-[#2D4393]">
        <CardHeader>
          <CardTitle className="text-[#00E1E2]">Universities by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={universitiesByRegion} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill={chartColors.primary}>
                <LabelList dataKey="count" position="top" fill={chartColors.text} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Universities */}
      <Card className="col-span-1 bg-[#162464]/50 backdrop-blur-sm border-[#2D4393]">
        <CardHeader>
          <CardTitle className="text-[#00E1E2]">Top Universities by Graduates</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topUniversities} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 5 }}>
              <XAxis type="number" stroke={chartColors.text} />
              <YAxis dataKey="name" type="category" stroke={chartColors.text} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="graduates" fill={chartColors.secondary}>
                <LabelList dataKey="graduates" position="right" fill={chartColors.text} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* University Performance Scatter Plot */}
      <Card className="col-span-2 bg-[#162464]/50 backdrop-blur-sm border-[#2D4393]">
        <CardHeader>
          <CardTitle className="text-[#00E1E2]">University Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: '100%', height: 500 }}>
            <ResponsiveContainer>
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2D4393" />
                <XAxis 
                  type="number" 
                  dataKey="graduates" 
                  domain={[5000, 22000]} 
                  tick={{ fill: chartColors.text }}
                  label={{ value: 'Number of Graduates', position: 'bottom', fill: chartColors.text, offset: 0 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="employmentRate" 
                  name="Employment Rate" 
                  domain={[3.10, 3.35]} 
                  tick={{ fill: chartColors.text }}
                  label={{ value: 'Employment Rate', angle: -90, position: 'left', fill: chartColors.text }}
                />
                <ZAxis 
                  type="number" 
                  dataKey="size" 
                  range={[700, 2000]} 
                />
                <Tooltip 
                  content={CustomTooltip}
                  cursor={{ strokeDasharray: '3 3' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={24}
                  wrapperStyle={{
                    paddingTop: '0px',
                    bottom: 0,
                    fontSize: '12px',
                    color: chartColors.text
                  }}
                />
                {universityPerformanceData.map((entry, index) => (
                  <Scatter
                    key={entry.name}
                    name={entry.name}
                    data={[entry]}
                    fill={chartColors.colors[index % chartColors.colors.length]}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* University Types */}
      <Card className="col-span-1 bg-[#162464]/50 backdrop-blur-sm border-[#2D4393]">
        <CardHeader>
          <CardTitle className="text-[#00E1E2]">University Types Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={universityTypes}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {universityTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Employment Rate by Major */}
      <Card className="col-span-1 bg-[#162464]/50 backdrop-blur-sm border-[#2D4393]">
        <CardHeader>
          <CardTitle className="text-[#00E1E2]">Employment Rate by Major</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={employmentByMajor} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="major" stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rate" fill={chartColors.accent}>
                <LabelList dataKey="rate" position="top" fill={chartColors.text} formatter={(value: number) => `${value}%`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Regional Graduates and Employment */}
      <Card className="col-span-1 bg-[#162464]/50 backdrop-blur-sm border-[#2D4393]">
        <CardHeader>
          <CardTitle className="text-[#00E1E2]">Regional Graduates and Employment Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={regionalGraduatesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" stroke={chartColors.text} />
              <YAxis yAxisId="left" stroke={chartColors.text} />
              <YAxis yAxisId="right" orientation="right" stroke={chartColors.text} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="graduates" fill={chartColors.primary} name="Graduates">
                <LabelList dataKey="graduates" position="top" fill={chartColors.text} formatter={(value: number) => value.toLocaleString()} />
              </Bar>
              <Line yAxisId="right" type="monotone" dataKey="employmentRate" stroke={chartColors.secondary} name="Employment Rate" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Graduates by Major */}
      <Card className="col-span-1 bg-[#162464]/50 backdrop-blur-sm border-[#2D4393]">
        <CardHeader>
          <CardTitle className="text-[#00E1E2]">Graduates by Major</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graduatesByMajorData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="graduates" fill={chartColors.primary}>
                <LabelList dataKey="graduates" position="top" fill={chartColors.text} formatter={(value: number) => value.toLocaleString()} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationDataCharts;
