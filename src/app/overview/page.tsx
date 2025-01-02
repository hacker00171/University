'use client'; 

import { Card } from "@/components/ui/card";
import mockData from "@/app/overview/data/mock_data_30-12-24 (7).json";
import { useRouter } from "next/navigation";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Line, 
  ComposedChart,
  RadialBarChart,
  RadialBar,
  Legend as RechartsLegend,
  LabelList,
  CartesianGrid
} from 'recharts';
import { BarProps } from 'recharts';
import { 
  FaGraduationCap, 
  FaBriefcase, 
  FaMoneyBillAlt, 
  FaClock,  
  FaBuilding, 
  FaChartBar, 
  FaUniversity, 
  FaMale, 
  FaFemale, 
  FaUserAlt, 
  FaUserGraduate,
  FaDollarSign,
  FaMoneyBillWave
} from 'react-icons/fa';
import { Grid } from '@mui/material';

interface ChartData {
  generalMajor?: string;
  major?: string;
  value?: number;
  name?: string;
  payload?: {
    range?: string;
    percentage?: number;
    occupation?: string;
  };
  activePayload?: Array<{
    payload: {
      occupation: string;
    };
  }>;
}

// interface TooltipProps {
//   active?: boolean;
//   payload?: Array<{
//     name?: string;
//     value: number;
//     payload?: {
//       range?: string;
//       percentage?: number;
//     };
//   }>;
//   label?: string;
// }

interface FormatterValue {
  value: number;
  name?: string;
  toLocaleString?: () => string;
}

export default function OverviewPage() {
  const router = useRouter();
  const { totalGraduates, overallEmploymentRate, averageSalary, averageTimeToEmployment } = mockData.OverViewInsights.summaryCards;
  const { byGraduates, byEmploymentRate, byAverageSalary, byGenderGap } = mockData.OverViewInsights.topGeneralMajors;
  const { 
    byGraduates: iscoByGraduates, 
    byAverageSalary: iscoByAverageSalary,
    byGenderGap: iscoByGenderGap,
  } = mockData.OverViewInsights.topISCOOccupations;
  const { male, female } = mockData.OverViewInsights.genderDistribution;
  const { ranges: salaryRanges, median: medianSalary } = mockData.OverViewInsights.salaryDistribution;
  const employmentTiming = mockData.OverViewInsights.employmentTiming;

  const genderData = [
    { name: 'Male', value: male.count, percentage: male.percentage },
    { name: 'Female', value: female.count, percentage: female.percentage }
  ];

  const salaryData = Object.entries(salaryRanges).map(([range, data]) => ({
    range,
    count: data.count,
    percentage: data.percentage
  }));

  const timingData = [
    { 
      name: 'Pre-Graduation', 
      value: employmentTiming.preGraduation.count,
      percentage: employmentTiming.preGraduation.percentage,
      color: '#0F75BC'
    },
    { 
      name: 'Within First Year', 
      value: employmentTiming.withinYear.count,
      percentage: employmentTiming.withinYear.percentage,
      color: '#45B7A9'
    },
    { 
      name: 'After First Year', 
      value: employmentTiming.afterYear.count,
      percentage: employmentTiming.afterYear.percentage,
      color: '#FFE5A3'
    }
  ];

  const GENDER_COLORS = ['#0F75BC', '#45B7A9', '#FFE5A3'];
  // const SALARY_COLORS = ['#0F75BC', '#45B7A9', '#FFE5A3']

  const summaryCards = [
    {
      title: "Total Graduates",
      value: totalGraduates.toLocaleString(),
      link: "/majors?metric=graduates",
      icon: <FaGraduationCap className="h-6 w-6 text-[#0F75BC]" />
    },
    {
      title: "Average Employment Rate",
      value: `${overallEmploymentRate}%`,
      link: "/majors?metric=employment",
      icon: <FaBriefcase className="h-6 w-6 text-[#45B7A9]" />
    },
    {
      title: "Average Salary",
      value: `${averageSalary.toLocaleString()}`,
      link: "/majors?metric=salary",
      icon: <FaMoneyBillAlt className="h-6 w-6 text-[#FFE5A3]" />
    },
    {
      title: "Average Time to Employment",
      value: `${averageTimeToEmployment} days`,
      link: "/majors?metric=time-to-employment",
      icon: <FaClock className="h-6 w-6 text-[#0F75BC]" />
    }
  ];

  const handleMajorClick = (major: string) => {
    router.push(`/majors?generalMajor=${encodeURIComponent(major)}`);
  };

  const handleOccupationClick = (occupation: string) => {
    router.push(`/occupations/${encodeURIComponent(occupation)}`);
  };

  const handleGenderClick = (gender: string) => {
    router.push(`/metrics/${encodeURIComponent(gender.toLowerCase())}`);
  };

  const handleSalaryClick = (range: string) => {
    router.push(`/metrics/salary/${encodeURIComponent(range)}`);
  };

  const handleTimingClick = (timing: string) => {
    router.push(`/metrics/timing/${encodeURIComponent(timing.toLowerCase().replace(/\s+/g, '-'))}`);
  };

  const handleChartClick = (data: ChartData, chartType: string) => {
    let generalMajor = '';
    
    switch (chartType) {
      case 'general_major':
        generalMajor = data.generalMajor || '';
        break;
      case 'employment':
        generalMajor = data.major || '';
        break;
      case 'salary':
        generalMajor = data.generalMajor || '';
        break;
    }

    if (generalMajor) {
      router.push(`/majors?generalMajor=${encodeURIComponent(generalMajor)}`);
    }
  };

  // const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  //   if (active && payload && payload.length) {
  //     return (
  //       <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
  //         <p className="text-white">{label}</p>
  //         <p className="text-[#0F75BC]">{`${payload[0].value.toLocaleString()}`}</p>
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  const employabilityData = byEmploymentRate.rankings.slice(0, 5).map(item => ({
    major: item.generalMajor,
    employmentRate: item.value,
    weightedContribution: item.employedStudents,
    totalStudents: item.totalStudents
  }));

  // Calculate median salary for top paying majors
  const medianSalaryValue = (() => {
    const salaries = byAverageSalary.rankings.map(item => item.value);
    const sortedSalaries = [...salaries].sort((a, b) => a - b);
    const mid = Math.floor(sortedSalaries.length / 2);
    return sortedSalaries.length % 2 === 0
      ? (sortedSalaries[mid - 1] + sortedSalaries[mid]) / 2
      : sortedSalaries[mid];
  })();

  // Add median salary to each data point for the chart
  const topPayingMajorsData = byAverageSalary.rankings.slice(0, 5).map(item => ({
    ...item,
    medianSalary: medianSalaryValue
  }));

  // Transform data for gender distribution chart
  const genderDistributionData = byGraduates.rankings.map(item => ({
    generalMajor: item.generalMajor,
    male: item.male.count,
    female: item.female.count,
    malePercentage: item.male.percentage,
    femalePercentage: item.female.percentage,
    total: item.value
  }));

  return (
    <div className="p-2 md:p-4 lg:p-6 max-w-[1920px] mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-white mb-2 flex gap-3">
        <FaChartBar className="text-[#4ADBFF]" />
        Overview
      </h1>
      
      {/* Summary Cards */}
      <Grid container spacing={2}>
        {summaryCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              className="bg-black/50 backdrop-blur-sm rounded-lg p-2 w-full border border-white/50 hover:bg-gray-100/10 transition-colors cursor-pointer transition-all duration-300 ease-in-out h-full"
              onClick={() => router.push(card.link)}
            >
              <div className="flex items-center gap-3">
                {card.icon}
                <div>
                  <h3 className="text-lg font-medium text-gray-200">{card.title}</h3>
                  <p className="text-3xl font-bold text-white">
                    {card.value}
                    {card.title.includes('Salary') && <span className="text-lg ml-3">SAR</span>}
                  </p>
                </div>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Gender Distribution */}
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <FaUserAlt className="text-[#4ADBFF]" />
        Gender Distribution
      </h2>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <Card className="bg-black/40 backdrop-blur-sm rounded-lg p-2 md:p-4 w-full h-[400px] border border-white/50">
            <h3 className="text-base md:text-lg font-medium text-gray-200 mb-2 md:mb-4 flex items-center gap-2">
              <FaMale className="text-[#4A90E2]" />
              <FaFemale className="text-[#FF69B4]" />
              GRADUATES BY GENDER
            </h3>
            <div className="h-[250px] md:h-[300px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    onClick={(data) => handleGenderClick(data.name)}
                    cursor="pointer"
                    label={({ name, value, percentage }) => `${name}: ${value.toLocaleString()} (${percentage}%)`}
                    labelLine={{ strokeWidth: 0 }}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={GENDER_COLORS[index]} />
                    ))}
                  </Pie>
                  {/* <Tooltip content={<GenderTooltip />} /> */}
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-white text-lg font-medium">Total</p>
                <p className="text-[#0F75BC] text-2xl font-bold">{totalGraduates.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card className="bg-black/40 backdrop-blur-sm rounded-lg p-2 md:p-4 w-full h-[400px] border border-white/50">
            <h3 className="text-base md:text-lg font-medium text-gray-200 mb-2 md:mb-4 flex items-center gap-2">
              <FaChartBar className="text-[#4ADBFF]" />
              TOP GENERAL MAJORS BY GENDER DISTRIBUTION
            </h3>
            <div className="h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={byGenderGap.rankings.slice(0, 5)}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
                  barGap={-2}
                >
                 <defs>
            <linearGradient id="maleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A90E2" stopOpacity={1}/>
              <stop offset="100%" stopColor="#4A90E2" stopOpacity={0.8}/>
            </linearGradient>
            <linearGradient id="femaleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2abbb1" stopOpacity={1}/>
              <stop offset="100%" stopColor="#2abbb1" stopOpacity={0.8}/>
            </linearGradient>
            {/* <linearGradient id="gapGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFD700" stopOpacity={1}/>
              <stop offset="100%" stopColor="#FFD700" stopOpacity={0.8}/>
            </linearGradient> */}
          </defs>
                  <XAxis 
                    type="number" 
                    label={{ value: 'PERCENTAGE (%)', position: 'bottom', fill: '#fff', offset: 0 }}
                    tick={{ fill: '#fff', fontSize: 12 }}
                    domain={[0, 100]}
                  />
                   <YAxis 
                    dataKey="generalMajor" 
                    type="category"
                    width={150}
                    tick={{ fill: '#fff', fontSize: 12 }}
                    label={{ value: 'GENERAL MAJOR', angle: -90, position: 'left', fill: '#fff', offset: -10 }}
                  />
                  <Tooltip content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                          <p className="text-white font-medium">{data.generalMajor}</p>
                          <p className="text-[#4A90E2]">Male: {data.malePercentage}%</p>
                          <p className="text-[#2abbb1]">Female: {data.femalePercentage}%</p>
                          {/* <p className="text-[#FFD700]">Gap: {data.genderGap}%</p> */}
                        </div>
                      );
                    }
                    return null;
                  }} />
                  <RechartsLegend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ 
                      position: 'absolute',
                      top: '-10px',
                      right: '0px',
                      paddingBottom: '12px',
                    }}
                    content={() => (
                      <div style={{ display: 'flex', gap: '8px', paddingLeft: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <div style={{ width: '16px', height: '16px', backgroundColor: '#4A90E2', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '12px' }}>Male</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <div style={{ width: '16px', height: '16px', backgroundColor: '#2abbb1', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '12px' }}>Female</span>
                        </div>
                        {/* <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '20px', height: '20px', backgroundColor: '#FFD700', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '14px' }}>Gap</span>
                        </div> */}
                      </div>
                    )}
                  />
                  <Bar 
                    dataKey="malePercentage" 
                    fill="url(#maleGradient)"
                    name="Male"
                    stackId="a"
                    label={{ 
                      position: 'right', 
                      fill: '#fff',
                      fontSize: 10,
                      formatter: (value: FormatterValue) => {
                        if (typeof value?.toLocaleString === 'function') {
                          return value.toLocaleString() + '%';
                        }
                        return value?.value?.toString() || '';
                      },
                    }}
                  />
                  <Bar 
                    dataKey="femalePercentage" 
                    fill="url(#femaleGradient)"
                    name="Female"
                    stackId="b"
                    label={{ 
                      position: 'right', 
                      fill: '#fff',
                      fontSize: 10,
                      formatter: (value: FormatterValue) => {
                        if (typeof value?.toLocaleString === 'function') {
                          return value.toLocaleString() + '%';
                        }
                        return value?.value?.toString() || '';
                      },
                    }}
                  />
                  {/* <Bar 
                    dataKey="genderGap" 
                    fill="url(#gapGradient)"
                    name="Gap"
                    stackId="c"
                    onClick={(data) => handleMajorClick(data.generalMajor)}
                    cursor="pointer"
                    label={{ 
                      position: 'inside', 
                      fill: '#fff',
                      formatter: (value) => `${value}%`
                    }}
                    barGap={0}
                  /> */ }
                  {/* <Bar 
                    dataKey="malePercentage" 
                    fill="#4ADBFF"
                    onClick={(data) => handleMajorClick(data.generalMajor)}
                    cursor="pointer"
                    label={{ position: 'insideStart', fill: '#fff' }}
                  />
                  <Bar 
                    dataKey="femalePercentage" 
                    fill="#FF69B4"
                    onClick={(data) => handleMajorClick(data.generalMajor)}
                    cursor="pointer"
                    label={{ position: 'insideStart', fill: '#fff' }}
                  /> */}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card className="bg-black/40 backdrop-blur-sm rounded-lg p-2 md:p-4 w-full h-[400px] border border-white/50">
            <h3 className="text-base md:text-lg font-medium text-gray-200 mb-2 md:mb-4 flex items-center gap-2">
              <FaUserAlt className="text-[#4ADBFF]" />
              TOP ISCO OCCUPATIONS BY GENDER DISTRIBUTION
            </h3>
            <div className="h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={iscoByGenderGap.rankings.slice(0, 5)}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
                  barGap={-2}
                >
                  <defs>
                    <linearGradient id="maleGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4A90E2" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#4A90E2" stopOpacity={0.8}/>
                    </linearGradient>
                    <linearGradient id="femaleGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2abbb1" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#2abbb1" stopOpacity={0.8}/>
                    </linearGradient>
                    {/* <linearGradient id="gapGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFD700" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#FFD700" stopOpacity={0.8}/>
                    </linearGradient> */}
                  </defs>
                  <XAxis 
                    type="number" 
                    label={{ value: 'PERCENTAGE (%)', position: 'bottom', fill: '#fff', offset: 0 }}
                    tick={{ fill: '#fff', fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <YAxis 
                    dataKey="occupation" 
                    type="category"
                    width={120}
                    tick={{ fill: '#fff', fontSize: 12 }}
                    label={{ value: 'OCCUPATION', angle: -90, position: 'left', fill: '#fff', offset: -10 }}
                  />
                  <Tooltip content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                          <p className="text-white font-medium">{data.occupation}</p>
                          <p className="text-[#4A90E2]">Male: {data.malePercentage}%</p>
                          <p className="text-[#2abbb1]">Female: {data.femalePercentage}%</p>
                          {/* <p className="text-[#FFD700]">Gap: {data.genderGap}%</p> */}
                        </div>
                      );
                    }
                    return null;
                  }} />
                  <RechartsLegend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ 
                      position: 'absolute',
                      top: '-20px',
                      right: '0px',
                      paddingBottom: '12px',
                    }}
                    content={() => (
                      <div style={{ display: 'flex', gap: '8px', paddingLeft: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <div style={{ width: '16px', height: '16px', backgroundColor: '#4A90E2', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '12px' }}>Male</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <div style={{ width: '16px', height: '16px', backgroundColor: '#2abbb1', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '12px' }}>Female</span>
                        </div>
                        {/* <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '20px', height: '20px', backgroundColor: '#FFD700', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '14px' }}>Gap</span>
                        </div> */}
                      </div>
                    )}
                  />
                  <Bar 
                    dataKey="malePercentage" 
                    fill="url(#maleGradient)"
                    name="Male"
                    stackId="a"
                    label={{ 
                      position: 'right', 
                      fill: '#fff',
                      fontSize: 10,
                      formatter: (value: FormatterValue) => {
                        if (typeof value?.toLocaleString === 'function') {
                          return value.toLocaleString() + '%';
                        }
                        return value?.value?.toString() || '';
                      },
                    }}
                  />
                  <Bar 
                    dataKey="femalePercentage" 
                    fill="url(#femaleGradient)"
                    name="Female"
                    stackId="b"
                    label={{ 
                      position: 'right', 
                      fill: '#fff',
                      fontSize: 10,
                      formatter: (value: FormatterValue) => {
                        if (typeof value?.toLocaleString === 'function') {
                          return value.toLocaleString() + '%';
                        }
                        return value?.value?.toString() || '';
                      },
                    }}
                  />
                  {/* <Bar 
                    dataKey="genderGap" 
                    fill="url(#gapGradient)"
                    name="Gap"
                    stackId="c"
                    onClick={(data) => handleOccupationClick(data.occupation)}
                    cursor="pointer"
                    label={{ 
                      position: 'inside', 
                      fill: '#fff',
                      formatter: (value) => `${value}%`
                    }}
                    barGap={0}
                  /> */}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Grid>
      </Grid>

      {/* Top General Major Insights */}
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3 mt-8">
        <FaUniversity className="text-[#4ADBFF]" />
        Top General Major Insights
      </h2>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Card className="bg-black/40 backdrop-blur-sm rounded-lg p-2 md:p-4 w-full h-[400px] border border-white/50">
            <h3 className="text-base md:text-lg font-medium text-gray-200 mb-2 md:mb-4 flex items-center gap-2">
              <FaMale className="text-[#4A90E2]" />
              <FaFemale className="text-[#FF69B4]" />
              TOP GENERAL MAJORS BY GRADUATES
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={genderDistributionData}
                  layout="vertical"
                  margin={{ top: 10, right: 40, left: 20, bottom: 20 }}
                  onClick={(data) => {
                    if (data && data.activePayload?.[0]) {
                      handleMajorClick(data.activePayload[0].payload.generalMajor);
                    }
                  }}
                >
                  <XAxis 
                    type="number"
                    label={{ value: 'NUMBER OF GRADUATES', position: 'bottom', fill: '#fff', offset: 0 }}
                    tick={{ fill: '#fff' ,fontSize: 12 }}
                  />
                  <YAxis 
                    dataKey="generalMajor"
                    type="category"
                    width={150}
                    tick={{ fill: '#fff' ,fontSize: 12 }}
                    label={{ value: 'GENERAL MAJORS', angle: -90, position: 'left', fill: '#fff', offset: -20 }}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                            <p className="text-white font-medium">{data.generalMajor}</p>
                            <p className="text-[#2abbb1]">Female: {data.female.toLocaleString()} ({data.femalePercentage}%)</p>
                            <p className="text-[#4A90E2]">Male: {data.male.toLocaleString()} ({data.malePercentage}%)</p>
                            <p className="text-white">Total: {data.total.toLocaleString()}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <RechartsLegend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ 
                      position: 'absolute',
                      top: '10px',
                      right: '0px',
                      paddingBottom: '12px',
                    }}
                    content={() => (
                      <div style={{ display: 'flex', gap: '16px', paddingLeft: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '20px', height: '20px', backgroundColor: '#2abbb1', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '14px' }}>Female</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '20px', height: '20px', backgroundColor: '#4A90E2', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '14px' }}>Male</span>
                        </div>
                        
                      </div>
                    )}
                  />
                  <Bar dataKey="female" fill="#2abbb1" name="Female" stackId="gender">
                    <LabelList dataKey="female" position="inside" fill="#fff" formatter={(value: number) => value?.toLocaleString()} />
                  </Bar>
                  <Bar dataKey="male" fill="#4A90E2" name="Male" stackId="gender">
                    <LabelList dataKey="male" position="inside" fill="#fff" formatter={(value: number) => value?.toLocaleString()} />
                    <LabelList dataKey="total" position="right" fill="#fff" formatter={(value: number) => value?.toLocaleString()} />
                  </Bar>
                  {/* <Bar dataKey="total" fill="#fff" name="Total" stackId="gender">
                    <LabelList dataKey="total" position="insideEnd" fill="#fff" formatter={(value) => `${value.toLocaleString()}`} />
                  </Bar> */}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card className="bg-black/40 backdrop-blur-sm rounded-lg p-2 md:p-4 w-full h-[400px] border border-white/50">
            <h3 className="text-base md:text-lg font-medium text-gray-200 mb-2 md:mb-4 flex items-center gap-2">
              <FaBriefcase className="text-[#4ADBFF]" />
              MOST EMPLOYABLE GENERAL MAJORS BY EMPLOYMENT RATE
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={employabilityData.sort((a, b) => b.employmentRate - a.employmentRate)}
                  margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
                  onClick={(data) => {
                    if (data && data.activePayload?.[0]) {
                      handleMajorClick(data.activePayload[0].payload.major);
                    }
                  }}
                >
                  <XAxis 
                    dataKey="major" 
                    type="category"
                    label={{ value: "GENERAL MAJORS", position: "bottom", fill: "#fff", offset: -20 }}
                    height={100}
                    tick={{ fill: '#fff', width: 100, fontSize: 13}}
                    tickFormatter={(value) => {
                      const words = value.split(' ');
                      return words.join('\n');
                    }}
                
                
                  />
                  <YAxis 
                    yAxisId="left" 
                    label={{ value: "NUMBER OF STUDENTS", angle: -90, position: "inside-left", fill: "#fff" ,offset: -60}}
                    tick={{ fill: '#fff' ,fontSize: 12}}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    label={{ value: "EMPLOYMENTRATE(%)", angle: -90, position: "inside-right", fill: "#fff" ,offset: 10}}
                    tick={{ fill: '#fff', fontSize: 12 }}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                            <p className="text-white font-medium">{payload[0].payload.major}</p>
                            <p className="text-[#cf8b8d]">Total Students: {payload[0].value}</p>
                            <p className="text-[#2CD9FF]">Employed Students: {payload[1].value}</p>
                            <p className="text-[#FF6D6D]">Employment Rate: {payload[2].value}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <RechartsLegend 
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ 
                      paddingBottom: '12px',
                    }}
                    formatter={(value) => (
                      <span style={{ color: '#fff', fontSize: '14px' }}>{value}</span>
                    )}
                  />
                  <Bar 
                    yAxisId="left" 
                    dataKey="totalStudents" 
                    fill="#cf8b8d" 
                    name="Total Students"
                    label={{position: 'inside', fill: '#fff'}}
                    cursor="pointer"
                    onClick={(data) => handleChartClick(data, 'employment')}
                  />
                  <Bar 
                    yAxisId="left" 
                    dataKey="weightedContribution" 
                    fill="#2CD9FF" 
                    name="Employed Students"
                    label={{position: 'inside', fill: '#fff'}}
                    cursor="pointer"
                    onClick={(data) => handleChartClick(data, 'employment')}
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="employmentRate" 
                    stroke="#FF6D6D" 
                    name="Employment Rate (%)"
                    dot={{ fill: "#FF6D6D", r: 6 }}
                    label={{position: 'top', fill: '#fff'}}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card className="bg-black/40 backdrop-blur-sm rounded-lg p-2 md:p-4 w-full h-[400px] border border-white/50">
            <h3 className="text-base md:text-lg font-medium text-gray-200 mb-2 md:mb-4 flex items-center gap-2">
              <FaDollarSign className="text-[#4ADBFF]" />
              TOP PAYING GENERAL MAJORS BY AVERAGE SALARY
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={topPayingMajorsData}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
                  onClick={(data) => {
                    if (data && data.activePayload?.[0]) {
                      handleMajorClick(data.activePayload[0].payload.generalMajor);
                    }
                  }}
                >
                  <XAxis 
                    type="number" 
                    label={{ value: 'AVERAGE SALARY (SAR)', position: 'bottom', fill: '#ffff', offset: -5 }}
                    tick={{ fill: '#fff', fontSize: 12 }}
                  />
                  <YAxis 
                    dataKey="generalMajor" 
                    type="category"
                    width={180}
                    tick={{ fill: '#fff', fontSize: 12 }}
                    label={{ value: 'GENERAL MAJORS', angle: -90, position: 'left', fill: '#fff', offset: -10 }}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                            <p className="text-white font-medium">{payload[0].payload.generalMajor}</p>
                            {/* <p className="text-[#0F75BC]">Average Salary: {payload[0].value.toLocaleString()} SAR</p> */}
                            <p className="text-[#FFD700]">Median Salary: {medianSalaryValue.toLocaleString()} SAR</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  {/* <RechartsLegend 
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ 
                      paddingBottom: '12px',
                    }}
                    formatter={(value) => {
                      if (value === 'Median Salary') {
                        return (
                          <span style={{ color: '#fff', fontSize: '14px' }}>{value}(${medianSalaryValue.toLocaleString()} SAR)</span>
                        );
                      }
                      return null;
                    }}
                  /> */}
                  <Bar 
                    dataKey="value" 
                    fill="#0F75BC"
                    name="Average Salary"
                    cursor="pointer"
                    label={{ position: 'inside', fill: '#fff' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="medianSalary"
                    stroke="#FFD700"
                    name="Median Salary"
                    strokeWidth={2}
                    dot={false}
                  />
                  <RechartsLegend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ 
                      position: 'absolute',
                      top: '-10px',
                      right: '-100px',
                      paddingBottom: '12px',
                    }}
                    content={() => (
                      <div style={{ display: 'flex', gap: '16px', paddingLeft: '180px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {/* <div style={{ width: '20px', height: '20px', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '14px' }}></span> */}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ 
                            width: '20px', 
                            height: '20px', 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <div style={{ 
                              width: '20px', 
                              height: '2px', 
                              backgroundColor: '#FFD700'
                            }}></div>
                          </div>
                          <span style={{ color: '#fff', fontSize: '14px' }}>Median Salary(10.5 K SAR)</span>
                        </div>
                      </div>
                    )}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card className="bg-black/40 backdrop-blur-sm rounded-lg p-2 md:p-4 w-full h-[400px] border border-white/50">
            <h3 className="text-base md:text-lg font-medium text-gray-200 mb-2 md:mb-4 flex items-center gap-2">
              <FaClock className="text-[#4ADBFF]" />
              TOP GENERAL MAJORS BY EMPLOYMENT TIMING
            </h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockData.OverViewInsights.employmentTiming.byGeneralMajor}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
                  barGap={0}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2e365f" horizontal={false} />
                  <XAxis 
                    type="number"
                    domain={[0, 100]}
                    tick={{ fill: '#fff', fontSize: 12 }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis 
                    dataKey="name"
                    type="category"
                    width={150}
                    tick={{ fill: '#fff', fontSize: 12 }}
                  />
                  <Tooltip content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                          <p className="text-white font-medium">{label}</p>
                          {payload.map((entry) => (
                            <p key={entry.name} style={{ color: entry.color }}>
                              {entry.name}: {entry.value}%
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }} />
                  <RechartsLegend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ 
                      position: 'absolute',
                      top: '-10px',
                      right: '0px',
                      paddingBottom: '12px',
                    }}
                    content={() => (
                      <div style={{ display: 'flex', gap: '16px', paddingLeft: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '20px', height: '20px', backgroundColor: '#0F75BC', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '14px' }}>Pre-Graduation</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '20px', height: '20px', backgroundColor: '#45B7A9', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '14px' }}>Within First Year</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '20px', height: '20px', backgroundColor: '#FFE5A3', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '14px' }}>After First Year</span>
                        </div>
                      </div>
                    )}
                  />
                  <Bar 
                    dataKey="preGraduation.percentage" 
                    name="Pre-Graduation"
                    fill="#0F75BC"
                    barSize={10}
                  >
                    <LabelList dataKey="preGraduation.percentage" position="right" fill="#fff" formatter={(value: number) => `${value}%`} fontSize={12} />
                  </Bar>
                  <Bar 
                    dataKey="withinYear.percentage" 
                    name="Within First Year"
                    fill="#45B7A9"
                    barSize={10}
                  >
                    <LabelList dataKey="withinYear.percentage" position="right" fill="#fff" formatter={(value: number) => `${value}%`} fontSize={12} />
                  </Bar>
                  <Bar 
                    dataKey="afterYear.percentage" 
                    name="After First Year"
                    fill="#FFE5A3"
                    barSize={10}
                  >
                    <LabelList dataKey="afterYear.percentage" position="right" fill="#fff" formatter={(value: number) => `${value}%`} fontSize={12} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Grid>
      </Grid>

      {/* Top ISCO Occupation Insights */}
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3 mt-8">
        <FaBuilding className="text-[#4ADBFF]" />
        Top ISCO Occupation Insights
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Top Occupations by Graduates */}
        <Card className="bg-black/40 backdrop-blur-sm rounded-lg p-2 md:p-4 w-full  h-[400px] border border-white/50">
          <h3 className="text-base md:text-lg font-medium text-gray-200 mb-2 md:mb-4 flex items-center gap-2">
            <FaUserGraduate className="text-[#4ADBFF]" />
            TOP 5 OCCUPATIONS BY GRADUATES
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={iscoByGraduates.rankings.slice(0, 5)}
                layout="vertical"
                margin={{ top: 10, right: 40, left: 20, bottom: 20 }}
                barGap={-2}
              >
                <defs>
                  <linearGradient id="occupationGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0F75BC" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#0F75BC" stopOpacity={0.3}/>
                  </linearGradient>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.3"/>
                  </filter>
                </defs>
                <XAxis 
                  type="number" 
                  label={{ value: 'NUMBER OF GRADUATES', position: 'bottom', fill: '#fff', offset: 5 }}
                  tick={{ fill: '#fff' ,fontSize: 12 }}
                  axisLine={{ stroke: '#ffffff30' }}
                />
                <YAxis 
                  dataKey="occupation" 
                  type="category"
                  width={180}
                  tick={{ fill: '#fff' ,fontSize: 12 }}
                  label={{ value: 'OCCUPATIONS', angle: -90, position: 'left', fill: '#fff', offset: -20 }}
                  axisLine={{ stroke: '#ffffff30' }}
                />
                {/* <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length && payload[0]) {
                      return (
                        <div className="bg-white/90 backdrop-blur-sm p-2 rounded shadow">
                        <p className="text-gray-900">{payload[0].payload.name}</p>
                        <p className="text-gray-600">Average Salary: {payload[0].value?.toLocaleString() ?? 0} SAR</p>
                      </div>
                      );
                    }
                    return null;
                  }}
                /> */}
                <Bar 
                  dataKey="value" 
                  fill="url(#occupationGradient)"
                  onClick={(data) => handleOccupationClick(data.activePayload[0].payload.occupation)}
                  cursor="pointer"
                  label={{ 
                    position: 'right', 
                    fill: '#fff',
                    formatter: (value: FormatterValue) => {
                      if (typeof value?.toLocaleString === 'function') {
                        return value.toLocaleString();
                      }
                      return value?.value?.toString() || '';
                    },
                    style: { filter: 'url(#shadow)' }
                  }}
                  shape={(props: BarProps) => {
                    const { x, y, width, height = 0 } = props;
                      return (
                      <g>
                        {/* Background with rounded corners */}
                        <rect
                          x={x}
                          y={Number(y) + height * 0.1}
                          width={width}
                          height={height * 0.8}
                          rx={height * 0.4}
                          ry={height * 0.4}
                          fill="url(#occupationGradient)"
                          filter="url(#shadow)"
                        />
                        {/* Shine effect */}
                        <rect
                          x={x}
                          y={Number(y) + height * 0.1}
                          width={width}
                          height={height * 0.2}
                          rx={height * 0.1}
                          ry={height * 0.1}
                          fill="#ffffff20"
                        />
                      </g>
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top Paying Occupations */}
        <Card className="bg-black/40 backdrop-blur-sm rounded-lg p-2 md:p-4 w-full  h-[400px] border border-white/50">
          <h3 className="text-base md:text-lg font-medium text-gray-200 mb-2 md:mb-4 flex items-center gap-2">
            <FaMoneyBillAlt className="text-[#4ADBFF]" />
            TOP PAYING OCCUPATIONS BY AVERAGE SALARY
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="90%" height="100%">
              <RadialBarChart
                innerRadius="100%"
                outerRadius="30%"
                data={iscoByAverageSalary.rankings.slice(0, 5).map((item, index) => ({
                  name: item.occupation,
                  value: item.value,
                  fill: ['#0F75BC', '#45B7A9', '#bb772a','#cf8b97','#acabb6'][4 - index],
                }))}
                startAngle={-90}
                endAngle={270}
                cx="30%"
                cy="50%"
              >
                <RadialBar
                  // minAngle={15}
                  background={{ fill: '#ffffff10' }}
                  label={{
                    position: 'insideStart',
                    fill: '#fff',
                    formatter: (value: FormatterValue) => {
                      if (typeof value?.toLocaleString === 'function') {
                        return value.toLocaleString();
                      }
                      return value?.value?.toString() || '';
                    },
                  }}
                  dataKey="value"
                  cornerRadius={30}
                  onClick={(data: { name: string }) => handleOccupationClick(data.name)}
                  cursor="pointer"
                />
                {/* <text x="50%" y="50%" textAnchor="middle" dominantBaseline="inner" className="text-sm font-bold" fill="#fff">
                  Salary Range
                </text> */}
                {iscoByAverageSalary.rankings.slice(0, 5).map((item, index) => (
                  <text
                    key={index}
                    x="100%"
                    y={`${30 + index * 10}%`}
                    textAnchor="end"
                    fill={['#0F75BC', '#45B7A9', '#bb772a','#cf8b97','#acabb6'][4 - index]}
                    className="text-sm"
                  >
                    {item.occupation}: {item.value.toLocaleString()} SAR
                  </text>
                ))}
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length && payload[0]) {
                      return (
                        <div className="bg-white/90 backdrop-blur-sm p-2 rounded shadow">
                        <p className="text-gray-900">{payload[0].payload.name}</p>
                        {/* <p className="text-gray-600">Average Salary: {payload[0].value.toLocaleString()} SAR</p> */}
                      </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Most Common Job Titles */}
        {/* <Card className="bg-black/40 backdrop-blur-sm rounded-lg p-2 w-full  h-[400px] border border-white/50 p-4">
          <h3 className="text-lg font-medium text-gray-200 mb-4 flex items-center gap-2">
            <FaBriefcase className="text-[#4ADBFF]" />
            MOST COMMON JOB TITLES
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mostCommonJobTitles.rankings}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <defs>
                  <linearGradient id="jobTitleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c2bfdb" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#0F75BC" stopOpacity={0.8}/>
                  </linearGradient>
                  <filter id="jobTitleShadow">
                    <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                  </filter>
                </defs>
                <XAxis
                  dataKey="jobTitle"
                  tick={(props) => {
                    const { x, y, payload } = props;
                    const IconComponent = mostCommonJobTitles.rankings.find(
                      item => item.jobTitle === payload.value
                    )?.icon || jobTitleIcons.default;
                    
                    return (
                      <g transform={`translate(${x},${y})`}>
                        <text
                          x={0}
                          y={0}
                          dy={16}
                          textAnchor="end"
                          fill="#fff"
                          transform="rotate(-45)"
                        >
                          {payload.value}
                        </text>
                        <IconComponent
                          x={-20}
                          y={-40}
                          fill="#ffff00"
                          style={{
                            fontSize: '20px',
                            transform: 'translate(-30px, -10px)'
                          }}
                        />
                      </g>
                    );
                  }}
                  interval={0}
                  height={60}
                  label={{ value: 'JOB TITLES', position: 'bottom', fill: '#fff', offset: 40 }}
                />
                <YAxis
                  tick={{ fill: '#fff' ,  fontSize: 12}}
                  label={{ value: 'NUMBER OF GRADUATES', angle: -90, position: 'left', fill: '#fff', offset: -10 }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      const IconComponent = data.icon;
                      return (
                        <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                          <div className="flex items-center gap-2 mb-2">
                            <IconComponent className="text-[#c2bfdb] text-4xl" />
                            <p className="text-white font-medium">{data.jobTitle}</p>
                          </div>
                          <p className="text-[#4ADBFF]">Graduates: {data.value.toLocaleString()}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="url(#jobTitleGradient)"
                  cursor="pointer"
                  onClick={(data) => handleJobTitleClick(data.jobTitle)}
                  label={{
                    position: 'top',
                    fill: '#fff',
                    formatter: (value: FormatterValue) => {
                      if (typeof value?.toLocaleString === 'function') {
                        return value.toLocaleString();
                      }
                      return value?.value?.toString() || '';
                    },
                  }}
                  shape={(props: ShapeProps) => {
                    const { x, y, width, height = 0 } = props;
                    return (
                      <g filter="url(#jobTitleShadow)">
                        <rect
                          x={x}
                          y={y}
                          width={width}
                          height={height}
                          fill="url(#jobTitleGradient)"
                          rx={4}
                          ry={4}
                        />
                      </g>
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card> */}

        {/* Top Employers by Salary */}
        
      </div>

      {/* Employment and Salary Distribution */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"> */}
        {/* Employment Timing Distribution */}
        {/* <div> */}
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3 mt-8">
        <FaClock className="text-[#4ADBFF]" />
        Employment Timing Distribution
        {/* <span className="text-lg font-normal text-gray-400">(رؤى المهن الرئيسية)</span> */}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="bg-black/40 backdrop-blur-sm rounded-lg p-2 md:p-4 w-full h-[400px] border border-white/50">
            <h3 className="text-base md:text-lg font-medium text-gray-200 mb-2 md:mb-4 flex items-center gap-2">
              <FaClock className="text-[#4ADBFF]" />
              TIME TO EMPLOYMENT
            </h3>
            <div className="flex flex-col h-[calc(100%-2rem)] justify-between">
              <div className="grid grid-cols-1 lg:grid-cols-2 h-[95%]">
                {/* Chart */}
                <div className="lg:col-span-2 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={timingData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={10}
                        dataKey="value"
                        onClick={(data) => handleTimingClick(data.name)}
                        cursor="pointer"
                        label={({ percentage }) => `${percentage}%`}
                        labelLine={false}
                        animationBegin={0}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      >
                        {timingData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            className="transition-all duration-300 hover:opacity-80 hover:scale-105"
                          />
                        ))}
                      </Pie>
                      {/* <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload &&
                          payload && payload.length) {
                            const data = payload[0].payload;
                                                        return (
                              <div className="bg-black/80 backdrop-blur-sm p-3 rounded-lg border border-white/20">
                                <p className="text-white font-medium mb-1">{data.name}</p>
                                <p className="text-[#0F75BC]">{data.value.toLocaleString()} graduates</p>
                                <p className="text-[#45B7A9]">{data.percentage}% of total</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                        wrapperStyle={{ outline: 'none' }}
                      /> */}
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-white text-lg font-medium">Average</p>
                    <p className="text-[#0F75BC] text-2xl font-bold animate-pulse">{averageTimeToEmployment} days</p>
                  </div>
                </div>
                {/* Legends */}
                <div className="lg:col-span-10 flex items-center justify-center mr-15">
                  <div className="flex flex-row gap-0 space-x-1 space-y-1 w-[100%] h-[100%]">
                    {timingData.map((item) => (
                      <div 
                        key={item.name} 
                        className="flex flex-col items-center gap-1 cursor-pointer bg-black/30 p-2 rounded-lg border border-white/10 transition-all duration-300 hover:bg-black/50 hover:border-white/30"
                        onClick={() => handleTimingClick(item.name)}
                      >
                        <div className="w-3 h-3 rounded-full transition-transform duration-300 hover:scale-125" style={{ backgroundColor: item.color }} />
                        <span className="text-white text-sm">{item.name}</span>
                        <div className="flex items-center justify-between">
                          <span className="text-[#0F75BC] font-medium">{item.value.toLocaleString()}</span>
                          <span className="text-[#45B7A9]">({item.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[20%]">
                <div className="bg-black/30 p-3 rounded-lg border border-white/10 transition-all duration-300 hover:bg-black/50 hover:border-white/30 cursor-pointer">
                  <p className="text-gray-400 text-sm mb-1">Pre-Graduation Employment</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-[#0F75BC]">
                      {employmentTiming.preGraduation.percentage}%
                    </p>
                    <div className="flex-1 ml-4">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-[#0F75BC] h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${employmentTiming.preGraduation.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-white/10 transition-all duration-300 hover:bg-black/50 hover:border-white/30 cursor-pointer">
                  <p className="text-gray-400 text-sm mb-1">Within First Year</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-[#45B7A9]">
                      {employmentTiming.withinYear.percentage}%
                    </p>
                    <div className="flex-1 ml-4">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-[#45B7A9] h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${employmentTiming.withinYear.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-white/10 transition-all duration-300 hover:bg-black/50 hover:border-white/30 cursor-pointer">
                  <p className="text-gray-400 text-sm mb-1">After First Year</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-[#FFE5A3]">
                      {employmentTiming.afterYear.percentage}%
                    </p>
                    <div className="flex-1 ml-4">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-[#FFE5A3] h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${employmentTiming.afterYear.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </Card>
          

          <Card className="bg-black/40 backdrop-blur-sm rounded-lg p-2 md:p-4 w-full h-[400px] border border-white/50">
          <h3 className="text-base md:text-lg font-medium text-gray-200 mb-2 md:mb-4 flex items-center gap-2">
            <FaClock className="text-[#4ADBFF]" />
            TOP GENERAL MAJORS BY EMPLOYMENT TIMING
          </h3>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockData.OverViewInsights.employmentTiming.byGeneralMajor}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
                barGap={0}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2e365f" horizontal={false} />
                <XAxis 
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: '#fff', fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis 
                  dataKey="name"
                  type="category"
                  width={150}
                  tick={{ fill: '#fff', fontSize: 12 }}
                />
                <Tooltip content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                        <p className="text-white font-medium">{label}</p>
                        {payload.map((entry) => (
                          <p key={entry.name} style={{ color: entry.color }}>
                            {entry.name}: {entry.value}%
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }} />
                <RechartsLegend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ 
                    position: 'absolute',
                    top: '-10px',
                    right: '0px',
                    paddingBottom: '12px',
                  }}
                  content={() => (
                    <div style={{ display: 'flex', gap: '16px', paddingLeft: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '20px', height: '20px', backgroundColor: '#0F75BC', borderRadius: '4px' }}></div>
                        <span style={{ color: '#fff', fontSize: '14px' }}>Pre-Graduation</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '20px', height: '20px', backgroundColor: '#45B7A9', borderRadius: '4px' }}></div>
                        <span style={{ color: '#fff', fontSize: '14px' }}>Within First Year</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '20px', height: '20px', backgroundColor: '#FFE5A3', borderRadius: '4px' }}></div>
                        <span style={{ color: '#fff', fontSize: '14px' }}>After First Year</span>
                      </div>
                    </div>
                  )}
                />
                <Bar 
                  dataKey="preGraduation.percentage" 
                  name="Pre-Graduation"
                  fill="#0F75BC"
                  barSize={10}
                >
                  <LabelList dataKey="preGraduation.percentage" position="right" fill="#fff" formatter={(value: number) => `${value}%`} fontSize={12} />
                </Bar>
                <Bar 
                  dataKey="withinYear.percentage" 
                  name="Within First Year"
                  fill="#45B7A9"
                  barSize={10}
                >
                  <LabelList dataKey="withinYear.percentage" position="right" fill="#fff" formatter={(value: number) => `${value}%`} fontSize={12} />
                </Bar>
                <Bar 
                  dataKey="afterYear.percentage" 
                  name="After First Year"
                  fill="#FFE5A3"
                  barSize={10}
                >
                  <LabelList dataKey="afterYear.percentage" position="right" fill="#fff" formatter={(value: number) => `${value}%`} fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

          {/* Top Education Level by Employment Timing */}
          <Card className="bg-black/40 backdrop-blur-sm rounded-lg p-2 md:p-4 w-full h-[400px] border border-white/50">
          <h3 className="text-base md:text-lg font-medium text-gray-200 mb-2 md:mb-4 flex items-center gap-2">
            <FaClock className="text-[#4ADBFF]" />
            TOP EDUCATION LEVEL BY EMPLOYMENT TIMING
          </h3>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockData.OverViewInsights.employmentTiming.byEducationLevel}
                layout="vertical"
                margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
                barGap={0}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2e365f" horizontal={false} />
                <XAxis 
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: '#fff', fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis 
                  dataKey="level"
                  type="category"
                  width={150}
                  tick={{ fill: '#fff', fontSize: 12 }}
                />
                <Tooltip content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                        <p className="text-white font-medium">{label}</p>
                        {payload.map((entry) => (
                          <p key={entry.name} style={{ color: entry.color }}>
                            {entry.name}: {entry.value}%
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }} />
                <RechartsLegend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ 
                    position: 'absolute',
                    top: '-10px',
                    right: '0px',
                    paddingBottom: '12px',
                  }}
                  content={() => (
                    <div style={{ display: 'flex', gap: '16px', paddingLeft: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '20px', height: '20px', backgroundColor: '#0F75BC', borderRadius: '4px' }}></div>
                        <span style={{ color: '#fff', fontSize: '14px' }}>Pre-Graduation</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '20px', height: '20px', backgroundColor: '#45B7A9', borderRadius: '4px' }}></div>
                        <span style={{ color: '#fff', fontSize: '14px' }}>Within First Year</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '20px', height: '20px', backgroundColor: '#FFE5A3', borderRadius: '4px' }}></div>
                        <span style={{ color: '#fff', fontSize: '14px' }}>After First Year</span>
                      </div>
                    </div>
                  )}
                />
                <Bar 
                  dataKey="preGraduation.percentage" 
                  name="Pre-Graduation"
                  fill="#0F75BC"
                  barSize={10}
                >
                  <LabelList dataKey="preGraduation.percentage" position="right" fill="#fff" formatter={(value: number) => `${value}%`} fontSize={12} />
                </Bar>
                <Bar 
                  dataKey="withinYear.percentage" 
                  name="Within First Year"
                  fill="#45B7A9"
                  barSize={10}
                >
                  <LabelList dataKey="withinYear.percentage" position="right" fill="#fff" formatter={(value: number) => `${value}%`} fontSize={12} />
                </Bar>
                <Bar 
                  dataKey="afterYear.percentage" 
                  name="After First Year"
                  fill="#FFE5A3"
                  barSize={10}
                >
                  <LabelList dataKey="afterYear.percentage" position="right" fill="#fff" formatter={(value: number) => `${value}%`} fontSize={12} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        </div>
      {/* </div> */}

      {/* Salary Distribution */}
      {/* <div> */}
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3 mt-8">
        <FaDollarSign className="text-[#4ADBFF]" />
        Salary Distribution
        {/* <span className="text-lg font-normal text-gray-400">(رؤى المهن الرئيسية)</span> */}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="bg-black/40 backdrop-blur-sm rounded-lg p-2 md:p-4 w-full h-[450px] border border-white/50">
            <h3 className="text-base md:text-lg font-medium text-gray-200 mb-2 md:mb-4 flex items-center gap-2">
              <FaMoneyBillAlt className="text-[#4ADBFF]" />
              SALARY RANGES
            </h3>
            <div className="flex flex-col h-[calc(100%-2rem)] justify-between">
              <div className="h-[75%] relative">
                {/* Chart */}
                <div className="h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={salaryData}
                      margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
                    >
                      <defs>
                        {salaryData.map((entry, index) => (
                          <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#0F75BC" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="#FF6B6B" stopOpacity={0.8}/>
                          </linearGradient>
                        ))}
                      </defs>
                      <XAxis
                        dataKey="range"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        tick={{ fill: '#fff' ,fontSize: 12, fontWeight: 'bold' }}
                        interval={0}
                      />
                      <YAxis 
                        yAxisId="left"
                        orientation="left"
                        stroke="#fff"
                        tick={{ fill: '#fff' , fontSize: 12, fontWeight: 'bold' }}
                        label={{ value: 'NO. OF GRADUATES', angle: -90, position: 'left', fill: '#fff',Offset: -30 }}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        stroke="#fff"
                        tick={{ fill: '#fff' }}
                        label={{ value: 'PERCENTAGE', angle: 90, position: 'right', fill: '#fff',Offset: 10 }}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length && payload[0]) {
                            return (
                              <div className="bg-white/90 backdrop-blur-sm p-2 rounded shadow">
                                <p className="text-gray-900">{payload[0].payload.range}</p>
                                <p className="text-gray-600">Graduates: {payload[0].payload.count}</p>
                                <p className="text-gray-600">Percentage: {payload[0].payload.percentage}%</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar
                        dataKey="count"
                        yAxisId="left"
                        radius={[20, 20, 0, 0]}
                        onClick={(data) => handleSalaryClick(data.range)}
                        cursor="pointer"
                        label={{ fill: '#fff', fontSize: 12, fontWeight: 'bold' }}
                      >
                        {salaryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
                        ))}
                      </Bar>
                      <Line
                        dataKey="percentage"
                        yAxisId="right"
                        stroke="#FFD700"
                        strokeWidth={3}
                        dot={{ fill: "#FFD700", r: 6 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="h-[25%] mt-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <div className="bg-black/30 p-2 rounded-lg border border-white/10 transition-all duration-300 hover:bg-black/50 hover:border-white/30 cursor-pointer">
                    <p className="text-gray-400 text-sm">Median Salary</p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-[#0F75BC]">SAR {medianSalary.toLocaleString()}</p>
                      <div className="flex-1 ml-4">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-[#0F75BC] h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ 
                              width: `${(medianSalary / Math.max(...salaryData.map(d => {
                                const rangeEnd = d.range.split('-')[1];
                                return rangeEnd ? parseInt(rangeEnd.replace(/[^\d]/g, '')) : 0;
                              }))) * 100}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg border border-white/10 transition-all duration-300 hover:bg-black/50 hover:border-white/30 cursor-pointer">
                    <p className="text-gray-400 text-sm">Most Common Range</p>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-[#FFE5A3]">
                        SAR {salaryData.reduce((prev, current) => 
                          prev.percentage > current.percentage ? prev : current
                        ).range}
                      </p>
                      <div className="flex-1 ml-4">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-[#FFE5A3] h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${Math.max(...salaryData.map(d => d.percentage))}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>




          

          {/* Top General Major by Salary Distribution */}
          <Card className="bg-black/40 backdrop-blur-sm rounded-lg p-2 md:p-4 w-full h-[450px] border border-white/50">
            <h3 className="text-base md:text-lg font-medium text-gray-200 mb-2 md:mb-4 flex items-center gap-2">
              <FaMoneyBillWave className="text-[#4ADBFF]" />
              TOP GENERAL MAJOR BY SALARY DISTRIBUTION
            </h3>
            <div className="h-[300px]" style={{marginTop: '50px'}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockData.educationInsights.salaryDistributionByGeneralMajor}
                  layout="vertical"
                  margin={{ top:10, right: 20, left: 20, bottom: 20 }}
                  barGap={0}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2e365f" horizontal={false} />
                  <XAxis 
                    type="number"
                    domain={[0, 100]}
                    tick={{ fill: '#fff', fontSize: 12 }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis 
                    dataKey="name"
                    type="category"
                    width={150}
                    tick={{ fill: '#fff', fontSize: 12 }}
                  />
                  <Tooltip content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                          <p className="text-white font-medium">{label}</p>
                          <div className="mt-1">
                            {payload.map((entry) => (
                              <p key={entry.name} style={{ color: entry.color }}>
                                {entry.name}: {entry.value}%
                              </p>
                            ))}
                          </div>
                          <div className="mt-2 pt-2 border-t border-gray-700">
                            <p className="text-[#45B7A9]">
                              Average: {payload[0].payload.averageSalary.toLocaleString()} SAR
                            </p>
                            <p className="text-[#FFE5A3]">
                              Median: {payload[0].payload.medianSalary.toLocaleString()} SAR
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }} />
                  <RechartsLegend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ 
                      position: 'absolute',
                      top: '-10px',
                      right: '0px',
                      paddingBottom: '12px',
                    }}
                    content={() => (
                      <div style={{ display: 'flex', gap: '5px', paddingLeft: '0px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '20px', height: '20px', backgroundColor: '#1F5B62', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '14px' }}>0-5,000</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '20px', height: '20px', backgroundColor: '#777586', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '14px' }}>5,001-10,000</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '20px', height: '20px', backgroundColor: '#0F75BC', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '14px' }}>10,001-15,000</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '20px', height: '20px', backgroundColor: '#ab4e52', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '14px' }}>15,001+</span>
                        </div>
                      </div>
                    )}
                  />
                  <Bar 
                    dataKey="ranges.0-5000.percentage" 
                    name="0-5,000"
                    // stackId="salary"
                    fill="#1F5B62"
                    barSize={10}
                  >
                    <LabelList dataKey="ranges.0-5000.percentage" position="right" fill="#fff" formatter={(value: number) => value > 5 ? `${value}%` : ''} fontSize={12} />
                  </Bar>
                  <Bar 
                    dataKey="ranges.5001-10000.percentage" 
                    name="5,001-10,000"
                    // stackId="salary"
                    fill="#777586"
                    barSize={10}
                  >
                    <LabelList dataKey="ranges.5001-10000.percentage" position="right" fill="#fff" formatter={(value: number) => value > 5 ? `${value}%` : ''} fontSize={12} />
                  </Bar>
                  <Bar 
                    dataKey="ranges.10001-15000.percentage" 
                    name="10,001-15,000"
                    // stackId="salary"
                    fill="#0F75BC"
                    barSize={10}
                  >
                    <LabelList dataKey="ranges.10001-15000.percentage" position="right" fill="#fff" formatter={(value: number) => value > 5 ? `${value}%` : ''} fontSize={12} />
                  </Bar>
                  <Bar 
                    dataKey="ranges.15001+.percentage" 
                    name="15,001+"
                    // stackId="salary"
                    fill="#ab4e52"
                    barSize={10}
                  >
                     <LabelList dataKey="ranges.15001+.percentage" position="right" fill="#fff" formatter={(value: number) => value > 5 ? `${value}%` : ''} fontSize={12} />
                    {/* <LabelList dataKey="ranges.15001+.percentage" position="center" fill="#fff" formatter={(value: LabelListProps) => value.value > 5 ? `${value.value}%` : ''} fontSize={12} /> */}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="bg-black/40 backdrop-blur-sm rounded-lg p-2 md:p-4 w-full h-[450px] border border-white/50">
            <h3 className="text-base md:text-lg font-medium text-gray-200 mb-2 md:mb-4 flex items-center gap-2">
              <FaMoneyBillWave className="text-[#4ADBFF]" />
              TOP EDUCATION LEVEL BY SALARY DISTRIBUTION
            </h3>
            <div className="h-[300px]" style={{marginTop: '40px'}}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockData.educationInsights.salaryDistributionByEducationLevel}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 20, bottom: 20 }}
                  barGap={4}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2e365f" horizontal={false} />
                  <XAxis 
                    type="number"
                    domain={[0, 100]}
                    tick={{ fill: '#fff', fontSize: 12 }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis 
                    dataKey="level"
                    type="category"
                    width={150}
                    tick={{ fill: '#fff', fontSize: 12 }}
                  />
                  <Tooltip content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                          <p className="text-white font-medium">{label}</p>
                          <div className="mt-1">
                            {payload.map((entry) => (
                              <p key={entry.name} style={{ color: entry.color }}>
                                {entry.name}: {entry.value}%
                              </p>
                            ))}
                          </div>
                          {/* <div className="mt-2 pt-2 border-t border-gray-700">
                            <p className="text-[#45B7A9]">
                              Average: {payload[0].payload.averageSalary.toLocaleString()} SAR
                            </p>
                            <p className="text-[#FFE5A3]">
                              Median: {payload[0].payload.medianSalary.toLocaleString()} SAR
                            </p>
                          </div> */}
                        </div>
                      );
                    }
                    return null;
                  }} />
                  <RechartsLegend
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{ 
                      position: 'absolute',
                      top: '-10px',
                      right: '0px',
                      paddingBottom: '12px',
                    }}
                    content={() => (
                      <div style={{ display: 'flex', gap: '5px', paddingLeft: '0px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '20px', height: '20px', backgroundColor: '#0F75BC', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '14px' }}>0-5,000</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '20px', height: '20px', backgroundColor: '#45B7A9', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '14px' }}>5,001-10,000</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '20px', height: '20px', backgroundColor: '#777586', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '14px' }}>10,001-15,000</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '20px', height: '20px', backgroundColor: '#FF9F9F', borderRadius: '4px' }}></div>
                          <span style={{ color: '#fff', fontSize: '14px' }}>15,001+</span>
                        </div>
                      </div>
                    )}
                  />
                  <Bar 
                    dataKey="ranges.0-5000.percentage" 
                    name="0-5,000"
                    stackId="salary"
                    fill="#0F75BC"
                    barSize={20}
                  >
                    <LabelList dataKey="ranges.0-5000.percentage" position="center" fill="#fff" formatter={(value: number) => value > 5 ? `${value}%` : ''} fontSize={12} />
                  </Bar>
                  <Bar 
                    dataKey="ranges.5001-10000.percentage" 
                    name="5,001-10,000"
                    stackId="salary"
                    fill="#45B7A9"
                    barSize={20}
                  >
                    <LabelList dataKey="ranges.5001-10000.percentage" position="center" fill="#fff" formatter={(value: number) => value > 5 ? `${value}%` : ''} fontSize={12} />
                  </Bar>
                  <Bar 
                    dataKey="ranges.10001-15000.percentage" 
                    name="10,001-15,000"
                    stackId="salary"
                    fill="#777586"
                    barSize={20}
                  >
                    <LabelList dataKey="ranges.10001-15000.percentage" position="center" fill="#fff" formatter={(value: number) => value > 5 ? `${value}%` : ''} fontSize={12} />
                  </Bar>
                  <Bar 
                    dataKey="ranges.15001+.percentage" 
                    name="15,001+"
                    stackId="salary"
                    fill="#FF9F9F"
                    barSize={20}
                  >
                    <LabelList dataKey="ranges.15001+.percentage" position="center" fill="#fff" formatter={(value: number) => value > 5 ? `${value}%` : ''} fontSize={12} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    // </div>
  );
};
