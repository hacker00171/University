'use client';
import React from 'react';
import {
  ResponsiveContainer, Tooltip, Legend,
  CartesianGrid, XAxis, YAxis, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ComposedChart, Bar, Line, Area
} from 'recharts';
import ChartContainer from "@/app/degree/components/chart-container";
// import { TrendingUp } from 'lucide-react';

// Advanced Waiting Time Analytics by Degree
interface SkillData {
  subject: string;
  value: number;
  fullMark: number;
  efficiency: number;
  trend: string;
  color: string;
  category: 'Undergraduate' | 'Diploma' | 'Postgraduate' | 'Advanced Research';
  relativeLoad: string;
  percentile: number;
  status: (value: number) => string;
}

interface WageData {
  degree: string;
  wage: number;
  color: string;
  gradient: string;
  borderColor: string;
  percentageAboveBase: number;
  icon: string;
  level: number;
  category: string;
  highlight?: boolean;
}

interface PolarAxisPayload {
  value: string | number;
  coordinate: number;
  index: number;
  offset: number;
}

const EducationDashboard = () => {
  // Graduates by Degree Data
  const graduatesByDegree = [
    { 
      degree: "Bachelor's",
      total: 174636,
      females: 105295,
      males: 66202
    },
    { 
      degree: "Intermediate",
      total: 7560,
      females: 7006,
      males: 4886
    },
    { 
      degree: "Associate",
      total: 5587,
      females: 2173,
      males: 974
    },
    { 
      degree: "Higher Diploma",
      total: 3111,
      females: 3800,
      males: 1787
    },
    { 
      degree: "Master's",
      total: 11892,
      females: 4192,
      males: 3368
    },
    { 
      degree: "Doctorate",
      total: 3405,
      females: 303,
      males: 231
    },
    { 
      degree: "Unclassified",
      total: 2096,
      females: 2096,
      males: 1309
    }
  ];

  // Field Distribution Data with Employment Elasticity
  const fieldDistribution = [
    {
      name: "Bachelor's",
      elasticity: 1.2,
      employmentGrowth: 8.5,
      outputGrowth: 7.1,
      duringStudy: 8,
      withinYear: 31,
      afterYear: 15,
      trend: 'increasing'
    },
    {
      name: "Intermediate",
      elasticity: 0.9,
      employmentGrowth: 6.3,
      outputGrowth: 7.0,
      duringStudy: 7,
      withinYear: 37,
      afterYear: 12,
      trend: 'stable'
    },
    {
      name: "Associate",
      elasticity: 0.8,
      employmentGrowth: 5.6,
      outputGrowth: 7.0,
      duringStudy: 5,
      withinYear: 29,
      afterYear: 13,
      trend: 'stable'
    },
    {
      name: "Higher Diploma",
      elasticity: 1.1,
      employmentGrowth: 7.7,
      outputGrowth: 7.0,
      duringStudy: 13,
      withinYear: 23,
      afterYear: 11,
      trend: 'increasing'
    },
    {
      name: "Master's",
      elasticity: 1.5,
      employmentGrowth: 10.5,
      outputGrowth: 7.0,
      duringStudy: 47,
      withinYear: 21,
      afterYear: 10,
      trend: 'increasing'
    },
    {
      name: "Doctorate",
      elasticity: 1.8,
      employmentGrowth: 12.6,
      outputGrowth: 7.0,
      duringStudy: 43,
      withinYear: 42,
      afterYear: 5,
      trend: 'increasing'
    },
    {
      name: "Unclassified",
      elasticity: 0.7,
      employmentGrowth: 4.9,
      outputGrowth: 7.0,
      duringStudy: 16,
      withinYear: 28,
      afterYear: 11,
      trend: 'decreasing'
    }
  ];

  // Wages by Educational Qualification Data
  const wagesByDegree: WageData[] = [
    { 
      degree: "PhD",
      wage: 13600,
      color: '#22c55e',
      gradient: 'from-green-500/20 to-green-500/5',
      borderColor: 'border-green-500/30',
      percentageAboveBase: 223.8,
      icon: '🎓',
      level: 6,
      category: 'Advanced Research'
    },
    { 
      degree: "Master's",
      wage: 9100,
      color: '#3b82f6',
      gradient: 'from-blue-500/20 to-blue-500/5',
      borderColor: 'border-blue-500/30',
      percentageAboveBase: 116.7,
      icon: '📚',
      level: 5,
      category: 'Postgraduate'
    },
    { 
      degree: "Bachelor's",
      wage: 5500,
      color: '#eab308',
      gradient: 'from-yellow-500/20 to-yellow-500/5',
      borderColor: 'border-yellow-500/30',
      percentageAboveBase: 31.0,
      icon: '🎯',
      level: 4,
      category: 'Undergraduate'
    },
    { 
      degree: "Higher Diploma",
      wage: 4700,
      color: '#f87171',
      gradient: 'from-red-500/20 to-red-500/5',
      borderColor: 'border-red-500/30',
      percentageAboveBase: 11.9,
      icon: '📝',
      level: 3,
      category: 'Diploma'
    },
    { 
      degree: "Intermediate Diploma",
      wage: 4700,
      color: '#f87171',
      gradient: 'from-red-500/20 to-red-500/5',
      borderColor: 'border-red-500/30',
      percentageAboveBase: 11.9,
      icon: '📋',
      level: 2,
      category: 'Diploma'
    },
    { 
      degree: "Associate Diploma",
      wage: 4200,
      color: '#f87171',
      gradient: 'from-red-500/20 to-red-500/5',
      borderColor: 'border-red-500/30',
      percentageAboveBase: 0,
      icon: '📄',
      level: 1,
      category: 'Diploma'
    }
  ];

  // Advanced Waiting Time Analytics by Degree
  const skillsData: SkillData[] = [
    { 
      subject: "Bachelor's",
      value: 276,
      fullMark: 300,
      efficiency: 92,
      trend: 'stable',
      color: '#3b82f6',
      category: 'Undergraduate',
      relativeLoad: 'high',
      percentile: 85,
      status: (value: number) => (value > 270 ? 'attention' : 'normal')
    },
    { 
      subject: 'Intermediate Diploma',
      value: 243,
      fullMark: 300,
      efficiency: 88,
      trend: 'decreasing',
      color: '#22c55e',
      category: 'Diploma',
      relativeLoad: 'medium',
      percentile: 65,
      status: (value: number) => (value > 270 ? 'attention' : 'normal')
    },
    { 
      subject: 'Associate Diploma',
      value: 271,
      fullMark: 300,
      efficiency: 85,
      trend: 'increasing',
      color: '#eab308',
      category: 'Diploma',
      relativeLoad: 'high',
      percentile: 82,
      status: (value: number) => (value > 270 ? 'attention' : 'normal')
    },
    { 
      subject: 'Higher Diploma',
      value: 280,
      fullMark: 300,
      efficiency: 82,
      trend: 'stable',
      color: '#f87171',
      category: 'Diploma',
      relativeLoad: 'critical',
      percentile: 90,
      status: (value: number) => (value > 270 ? 'attention' : 'normal')
    },
    { 
      subject: "Master's",
      value: 275,
      fullMark: 300,
      efficiency: 86,
      trend: 'stable',
      color: '#a855f7',
      category: 'Postgraduate',
      relativeLoad: 'high',
      percentile: 87,
      status: (value: number) => (value > 270 ? 'attention' : 'normal')
    },
    { 
      subject: 'PhD',
      value: 178,
      fullMark: 300,
      efficiency: 95,
      trend: 'improving',
      color: '#ec4899',
      category: 'Advanced Research',
      relativeLoad: 'optimal',
      percentile: 40,
      status: (value: number) => (value > 270 ? 'attention' : 'normal')
    }
  ];

  const COLORS = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5',
    '#9B5DE5', '#F15BB5', '#00BBF9', '#00F5D4', '#FEE440', '#9B5DE5'
  ];

  const totalGraduates = 174636;
  const graduateIncrease = 12;
  const employmentRate = 82;
  const employmentIncrease = 5;
  const averageSalary = 5500;
  const salaryIncrease = 8;
  const totalFields = 27;
  const newFields = 3;

  return (
    <div className="relative min-h-screen bg-transparent">
      <div className="relative z-10">
        <h1 className="text-2xl font-bold text-white mb-8 text-center">Degree Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 perspective-[1000px]">
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 transform-gpu hover:scale-110 hover:-translate-y-2 hover:translate-z-12 hover:rotate-y-12 transition-all duration-300 cursor-pointer relative overflow-hidden group preserve-3d shadow-lg hover:shadow-xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-[radial-gradient(circle_at_50%_-20%,#ffffff22,#0000000f)]"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-white/60">Total Graduates</p>
                  <h3 className="text-xl font-bold text-white">{totalGraduates.toLocaleString()}</h3>
                </div>
                <span className="text-xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">👨‍🎓</span>
              </div>
              <div className="text-xs text-green-400 transform group-hover:translate-x-1 transition-transform">↑ {graduateIncrease}% from last year</div>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 transform-gpu hover:scale-110 hover:-translate-y-2 hover:translate-z-12 hover:rotate-y-12 transition-all duration-300 cursor-pointer relative overflow-hidden group preserve-3d shadow-lg hover:shadow-xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-[radial-gradient(circle_at_50%_-20%,#ffffff22,#0000000f)]"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-white/60">Employment Rate</p>
                  <h3 className="text-xl font-bold text-white">{employmentRate}%</h3>
                </div>
                <span className="text-xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">💼</span>
              </div>
              <div className="text-xs text-green-400 transform group-hover:translate-x-1 transition-transform">↑ {employmentIncrease}% vs industry avg</div>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 transform-gpu hover:scale-110 hover:-translate-y-2 hover:translate-z-12 hover:rotate-y-12 transition-all duration-300 cursor-pointer relative overflow-hidden group preserve-3d shadow-lg hover:shadow-xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-[radial-gradient(circle_at_50%_-20%,#ffffff22,#0000000f)]"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-white/60">Avg. Starting Salary</p>
                  <h3 className="text-xl font-bold text-white">{averageSalary.toLocaleString()} SAR</h3>
                </div>
                <span className="text-xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">💰</span>
              </div>
              <div className="text-xs text-green-400 transform group-hover:translate-x-1 transition-transform">↑ {salaryIncrease}% from prev batch</div>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 transform-gpu hover:scale-110 hover:-translate-y-2 hover:translate-z-12 hover:rotate-y-12 transition-all duration-300 cursor-pointer relative overflow-hidden group preserve-3d shadow-lg hover:shadow-xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-rose-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-[radial-gradient(circle_at_50%_-20%,#ffffff22,#0000000f)]"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-white/60">Fields of Study</p>
                  <h3 className="text-xl font-bold text-white">{totalFields}+</h3>
                </div>
                <span className="text-xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">📚</span>
              </div>
              <div className="text-xs text-green-400 transform group-hover:translate-x-1 transition-transform">+{newFields} new fields added</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Graduates by Degree Level */}
          <ChartContainer>
            <div className="p-4">
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-lg font-semibold text-white">Graduates by Degree Level</h3>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart
                  data={graduatesByDegree}
                  margin={{ top: 0, right: 30, bottom: 10, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis 
                    dataKey="degree" 
                    tick={{ fill: '#fff', fontSize: 12 }}
                    axisLine={{ stroke: '#ffffff30' }}
                  />
                  <YAxis 
                    tick={{ fill: '#fff', fontSize: 12 }}
                    axisLine={{ stroke: '#ffffff30' }}
                    label={{ 
                      value: 'Total Graduates',
                      angle: -90,
                      position: 'insideLeft',
                      fill: '#fff',
                      fontSize: 12
                    }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#1e2875] p-3 rounded-lg shadow-lg border border-white/10">
                            <p className="text-sm font-semibold text-white mb-2">{data.degree}</p>
                            <p className="text-xs text-white">Total: {data.total.toLocaleString()}</p>
                            <p className="text-xs text-white">Female: {data.females.toLocaleString()}</p>
                            <p className="text-xs text-white">Male: {data.males.toLocaleString()}</p>
                            <div className="mt-2 pt-2 border-t border-white/10">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-white">Gender Ratio</span>
                                <div className="flex-1 bg-white/10 h-1.5 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-pink-500 rounded-l-full"
                                    style={{ width: `${(data.females/data.total)*100}%` }}
                                  />
                                  <div 
                                    className="h-full bg-blue-500 rounded-r-full"
                                    style={{ width: `${(data.males/data.total)*100}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={6}
                    wrapperStyle={{
                      paddingTop: '20px',
                      marginTop: '20px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    name="Total Graduates"
                    fill="url(#totalGradient)"
                    stroke={COLORS[0]}
                    fillOpacity={0.6}
                  />
                  <Line
                    type="monotone"
                    dataKey="females"
                    name="Female Students"
                    stroke="#ec4899"
                    strokeWidth={2}
                    dot={{ fill: '#ec4899' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="males"
                    name="Male Students"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6' }}
                  />
                  <defs>
                    <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          {/* Field Distribution - Employment Elasticity */}
          <ChartContainer>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Employment Rates by Degree</h3>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                  data={fieldDistribution}
                  margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis 
                    type="number"
                    tick={{ fill: '#fff', fontSize: 12 }}
                    axisLine={{ stroke: '#ffffff30' }}
                  />
                  <YAxis 
                    dataKey="name"
                    type="category"
                    tick={{ fill: '#fff', fontSize: 12 }}
                    axisLine={{ stroke: '#ffffff30' }}
                    width={120}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-[#1e2875] p-3 rounded-lg shadow-lg border border-white/10">
                            <p className="text-sm font-semibold mb-2 text-white">{data.name}</p>
                            <div className="mt-2">
                              <p className="text-xs font-medium mb-1 text-white">Employment Timeline:</p>
                              <p className="text-xs text-white">During Study: {data.duringStudy}%</p>
                              <p className="text-xs text-white">Within First Year: {data.withinYear}%</p>
                              <p className="text-xs text-white">After First Year: {data.afterYear}%</p>
                              <p className="text-xs mt-2 text-white">Total Employment: {data.duringStudy + data.withinYear + data.afterYear}%</p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    content={({ }) => (
                      <div className="flex justify-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500"></div>
                          <span className="text-sm text-white/60">During Study</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500"></div>
                          <span className="text-sm text-white/60">Within First Year</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-yellow-500"></div>
                          <span className="text-sm text-white/60">After First Year</span>
                        </div>
                      </div>
                    )}
                  />
                  <Bar
                    dataKey="duringStudy"
                    name="During Study"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                  >
                    {fieldDistribution.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill="#3b82f6"
                      />
                    ))}
                  </Bar>
                  <Bar
                    dataKey="withinYear"
                    name="Within First Year"
                    fill="#22c55e"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="afterYear"
                    name="After First Year"
                    fill="#eab308"
                    radius={[4, 4, 0, 0]}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          {/* Wages by Educational Qualification */}
          <ChartContainer>
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">Wages by Educational Qualification</h3>
                  <p className="text-sm text-white/60 mt-1">Progress bar shows salary relative to highest qualification (PhD)</p>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e' }}></div>
                      <span className="text-sm text-white/60">Advanced Research (13,600 SAR)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3b82f6' }}></div>
                      <span className="text-sm text-white/60">Postgraduate (9,100 SAR)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#eab308' }}></div>
                      <span className="text-sm text-white/60">Undergraduate (5,500 SAR)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f87171' }}></div>
                      <span className="text-sm text-white/60">Diploma (4,200-4,700 SAR)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 h-[535px] w-full border border-white/10">
                {/* Wage Cards Grid */}
                <div className="grid grid-cols-2 gap-4 h-[380px] overflow-y-auto pr-2">
                  {wagesByDegree.map((item, index) => (
                    <div 
                      key={index} 
                      className={`bg-black/20 backdrop-blur-sm rounded-lg p-4 relative overflow-hidden border border-white/10 ${
                        item.highlight ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-lg transform group-hover:scale-105 transition-all duration-300 border ${item.borderColor}`}></div>
                      <div className="relative h-full">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-white">{item.degree}</span>
                          <span className="text-sm font-semibold" style={{ color: item.color }}>
                            {item.wage.toLocaleString()} SAR
                          </span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${(item.wage / 13600) * 100}%`,
                              backgroundColor: item.color
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-white/40 mt-1">
                          <span>{item.category}</span>
                          <span>{item.percentageAboveBase > 0 ? `+${item.percentageAboveBase}% from base` : 'Base Salary'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                    <div className="text-sm text-white/60">Average Salary</div>
                    <div className="text-base font-bold text-blue-400">
                      {(wagesByDegree.reduce((acc, curr) => acc + curr.wage, 0) / wagesByDegree.length).toLocaleString()} SAR
                    </div>
                    <div className="text-sm text-white/40">Across all qualifications</div>
                  </div>
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                    <div className="text-sm text-white/60">Highest Salary</div>
                    <div className="text-base font-bold text-green-400">
                      {Math.max(...wagesByDegree.map(item => item.wage)).toLocaleString()} SAR
                    </div>
                  </div>
                  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                    <div className="text-sm text-white/60">Salary Range</div>
                    <div className="text-base font-bold text-purple-400">
                      {Math.min(...wagesByDegree.map(item => item.wage)).toLocaleString()}-{Math.max(...wagesByDegree.map(item => item.wage)).toLocaleString()} SAR
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ChartContainer>

          {/* Waiting Time Analytics */}
          <ChartContainer>
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Waiting Time Analytics</h3>
                  <p className="text-sm text-white/60 mb-3">Advanced metrics and insights across qualifications</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm text-white/60">0-3 months (Optimal)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span className="text-sm text-white/60">3-6 months (Attention)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-sm text-white/60">6+ months (Critical)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart cx="50%" cy="50%" outerRadius="65%" data={skillsData}>
                      <PolarGrid 
                        stroke="#ffffff"
                        strokeWidth={1}
                        strokeOpacity={0.2}
                      />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={({ x, y, payload }: { x: number; y: number; payload: PolarAxisPayload }) => {
                          const isRight = x > 150;
                          const dx = isRight ? -10 : 0;
                          const item = skillsData.find(item => item.subject === payload.value);
                          
                          return (
                            <g transform={`translate(${x},${y})`}>
                              <text
                                x={dx}
                                y={0}
                                dy={12}
                                textAnchor={isRight ? "start" : "end"}
                                fill="#fff"
                                fontSize="11"
                              >
                                {item?.subject}
                              </text>
                              <text
                                x={dx}
                                y={12}
                                dy={12}
                                textAnchor={isRight ? "start" : "end"}
                                fill={item?.color || '#fff'}
                                fontSize="10"
                              >
                                {item?.value} days
                              </text>
                            </g>
                          );
                        }}
                        axisLine={{ stroke: '#ffffff', strokeWidth: 1, strokeOpacity: 0.2 }}
                        tickLine={{ stroke: '#ffffff', strokeWidth: 1, strokeOpacity: 0.2 }}
                      />
                      <PolarRadiusAxis
                        angle={0}
                        domain={[0, 300]}
                        tickCount={4}
                        axisLine={{ stroke: '#ffffff', strokeWidth: 1, strokeOpacity: 0.2 }}
                        tick={({ x, y, payload }: { x: number; y: number; payload: PolarAxisPayload }) => {
                          return (
                            <text
                              x={x}
                              y={y}
                              textAnchor="middle"
                              fill="#fff"
                              fontSize="10"
                              opacity={0.6}
                            >
                              {payload.value}
                            </text>
                          );
                        }}
                      />
                      <Radar
                        name="Skills"
                        dataKey="value"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>

                  {/* Analytics Cards */}
                  <div className="space-y-4 mt-4">
                    <div className="mt-10 bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      <div className="text-sm text-white/60">Average Wait Time</div>
                      <div className="text-2xl font-bold text-blue-400">
                        {Math.round(skillsData.reduce((acc, curr) => acc + curr.value, 0) / skillsData.length)} days
                      </div>
                      <div className="text-sm text-white/40">Across all qualifications</div>
                    </div>
                  </div>
                </div>

                <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-6">Key Insights</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-green-400">
                          {Math.min(...skillsData.map(item => item.value))}
                        </div>
                        <div className="text-xs text-white/60">Shortest Wait (Days)</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-400">
                          {Math.max(...skillsData.map(item => item.value))}
                        </div>
                        <div className="text-xs text-white/60">Longest Wait (Days)</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {skillsData.map((item, index) => (
                      <div key={index} className="relative">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-white">{item.subject}</span>
                          <span className="text-sm font-semibold" style={{ color: item.color }}>
                            {item.value} days
                          </span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${(item.value / 300) * 100}%`,
                              backgroundColor: item.color
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-white/40 mt-1">
                          <span>&nbsp;</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default EducationDashboard;