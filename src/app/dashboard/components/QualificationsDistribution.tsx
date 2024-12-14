"use client";

import { useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useLanguage } from '@/app/dashboard/context/LanguageContext';
import { GraduationCap, Award, BookOpen, Users, TrendingUp, Briefcase, Target  } from 'lucide-react';
import { motion } from 'framer-motion';

// interface QualificationData {
//   id: string;
//   value: number;
//   icon: React.ReactNode;
//   color: string;
//   performance: {
//     trend: number;
//     duration: number;
//     satisfaction: number;
//     employmentRate: number;
//   };
// }

interface QualificationsDistributionProps {
  data: {
    bachelor: number;
    master: number;
    doctorate: number;
    diploma: number;
  };
}

const QualificationsDistribution = ({ data }: QualificationsDistributionProps) => {
  const { isArabic } = useLanguage();
  const [selectedQualification, setSelectedQualification] = useState<string | null>(null);

  const qualificationTypes = [
    { id: 'bachelor', label: { en: "Bachelor's", ar: 'بكالوريوس' }, icon: <GraduationCap className="w-4 h-4" />, color: '#60A5FA' },
    { id: 'master', label: { en: "Master's", ar: 'ماجستير' }, icon: <Award className="w-4 h-4" />, color: '#A78BFA' },
    { id: 'doctorate', label: { en: 'Doctorate', ar: 'دكتوراه' }, icon: <BookOpen className="w-4 h-4" />, color: '#F472B6' },
    { id: 'diploma', label: { en: 'Others', ar: 'أخرى' }, icon: <Users className="w-4 h-4" />, color: '#34D399' }
  ];

  type QualificationType = 'bachelor' | 'master' | 'doctorate' | 'diploma';

  const performanceData: Record<QualificationType, { 
    trend: number;
    duration: number;
    satisfaction: number;
    employmentRate: number;
    value: number;
  }> = {
    bachelor: {
      trend: 15,
      duration: 4,
      satisfaction: 85,
      employmentRate: 78,
      value: data.bachelor
    },
    master: {
      trend: 22,
      duration: 2,
      satisfaction: 88,
      employmentRate: 85,
      value: data.master
    },
    doctorate: {
      trend: 8,
      duration: 4,
      satisfaction: 92,
      employmentRate: 95,
      value: data.doctorate
    },
    diploma: {
      trend: 12,
      duration: 2,
      satisfaction: 82,
      employmentRate: 75,
      value: data.diploma
    }
  };

  const qualifications = qualificationTypes.map(type => ({
    id: type.id,
    value: performanceData[type.id as QualificationType].value,
    icon: type.icon,
    color: type.color,
    performance: performanceData[type.id as QualificationType]
  }));

  const getQualificationName = (id: string) => {
    const qual = qualificationTypes.find(q => q.id === id);
    return isArabic ? qual?.label.ar : qual?.label.en;
  };

  const formatValue = (value: number | undefined | null) => {
    if (value === undefined || value === null) return '0';
    return value.toLocaleString();
  };

  // const selectedData = selectedQualification ? performanceData[selectedQualification as QualificationType] : null;
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);

  return (
    <motion.div 
      key="main-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1e3a8a4d] backdrop-blur-sm rounded-lg p-6 h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-semibold text-[#E3F2FD]">
          {isArabic ? 'توزيع المؤهلات' : 'Qualifications Distribution'}
          <p className="text-indigo-300 text-sm mt-1">
            {isArabic ? 'تحليل متعمق للجامعات الرائدة' : 'Insights into Graduate Trends, Employment Rates, and Career Prospects'}
          </p>
        </h3>
      </div>

      <div className="flex flex-col gap-6">
        {/* Top Metrics Card */}
        <div className="bg-[#1e3a8a4d] backdrop-blur-sm rounded-lg p-6">
          <div className="grid grid-cols-5 gap-4">
            {/* Total Graduates */}
            <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="p-3 bg-blue-500/20 rounded-lg mb-2">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-xl font-bold text-white">{formatValue(total)}</div>
              <div className="text-sm text-gray-400 mt-1">Total Graduates</div>
              <div className="flex items-center mt-1">
                <span className="text-green-400 text-sm">+{Math.round(Object.values(performanceData).reduce((acc, curr) => acc + curr.trend, 0) / Object.keys(performanceData).length)}%</span>
              </div>
            </div>

            {/* Most Common */}
            <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="p-3 bg-blue-500/20 rounded-lg mb-2">
                <GraduationCap className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-xl font-bold text-white">{getQualificationName(Object.keys(performanceData).find(key => 
                performanceData[key as QualificationType].value === Math.max(...Object.values(performanceData).map(d => d.value))
              ) || '')}</div>
              <div className="text-sm text-gray-400 mt-1">Most Common</div>
              <div className="text-sm text-blue-400 mt-1">{Math.round((Math.max(...Object.values(performanceData).map(d => d.value)) / total) * 100)}%</div>
            </div>

            {/* Highest Employment */}
            <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="p-3 bg-blue-500/20 rounded-lg mb-2">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-xl font-bold text-white">{getQualificationName(Object.keys(performanceData).find(key => 
                performanceData[key as QualificationType].employmentRate === Math.max(...Object.values(performanceData).map(d => d.employmentRate))
              ) || '')}</div>
              <div className="text-sm text-gray-400 mt-1">Highest Employment</div>
              <div className="text-sm text-blue-400 mt-1">{Math.max(...Object.values(performanceData).map(d => d.employmentRate))}%</div>
            </div>

            {/* Fastest Growing */}
            <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="p-3 bg-blue-500/20 rounded-lg mb-2">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-xl font-bold text-white">{getQualificationName(Object.keys(performanceData).find(key => 
                performanceData[key as QualificationType].trend === Math.max(...Object.values(performanceData).map(d => d.trend))
              ) || '')}</div>
              <div className="text-sm text-gray-400 mt-1">Fastest Growing</div>
              <div className="flex items-center mt-1">
                <span className="text-green-400 text-sm">+{Math.max(...Object.values(performanceData).map(d => d.trend))}%</span>
              </div>
            </div>

            {/* Average Employment */}
            <div className="bg-white/5 rounded-lg p-4 flex flex-col items-center justify-center">
              <div className="p-3 bg-blue-500/20 rounded-lg mb-2">
                <Briefcase className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-xl font-bold text-white">{Math.round(Object.values(performanceData).reduce((acc, curr) => acc + curr.employmentRate, 0) / Object.keys(performanceData).length)}%</div>
              <div className="text-sm text-gray-400 mt-1">Avg. Employment</div>
              <div className="text-sm text-blue-400 mt-1">Rate</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left side - Pie Chart and Legend */}
          <div className="flex flex-col">
            <div className="h-[300px]  relative">
              <ResponsivePie
                data={qualifications.map(q => ({
                  id: getQualificationName(q.id),
                  value: q.value,
                  color: q.color,
                  formattedValue: formatValue(q.value),
                  percentage: ((q.value / total) * 100).toFixed(1)
                }))}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                innerRadius={0.6}
                padAngle={0.7}
                cornerRadius={4}
                activeOuterRadiusOffset={8}
                colors={{ datum: 'data.color' }}
                borderWidth={2}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                enableArcLinkLabels={false}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor="#ffffff"
                arcLabel={d => `${d.data.percentage}%`}
                onMouseEnter={(data) => {
                  const selected = qualificationTypes.find(q => 
                    (isArabic ? q.label.ar : q.label.en) === data.id
                  );
                  if (selected) {
                    setSelectedQualification(selected.id);
                  }
                }}
                onMouseLeave={() => {
                  setSelectedQualification(null);
                }}
                onClick={() => {}} // Disable click interaction
                theme={{
                  text: { fill: '#ffffff' }
                }}
              />
            </div>
            
            {/* Color Legend */}
            <div className="mt-4 grid grid-cols-2 gap-3 bg-white/5 rounded-lg">
              {qualificationTypes.map((type) => {
                const data = performanceData[type.id as QualificationType];
                const percentage = ((data.value / total) * 100).toFixed(1);
                return (
                  <div
                    key={type.id}
                    className="flex items-center gap-2 transition-all duration-200 p-2 rounded-md group"
                    onMouseEnter={() => setSelectedQualification(type.id)}
                    onMouseLeave={() => setSelectedQualification(null)}
                    onTouchStart={() => setSelectedQualification(type.id)}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      setTimeout(() => setSelectedQualification(null), 3000);
                    }}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <div 
                        className={`w-3 h-3 rounded-full transition-transform duration-200 group-hover:scale-125 ${
                          selectedQualification === type.id ? 'ring-2 ring-white/30 ring-offset-1 ring-offset-transparent' : ''
                        }`}
                        style={{ backgroundColor: type.color }}
                      />
                      <span className={`text-sm transition-colors duration-200 ${
                        selectedQualification === type.id ? 'text-white' : 'text-gray-300'
                      }`}>
                        {isArabic ? type.label.ar : type.label.en}
                      </span>
                    </div>
                    <span className={`text-sm transition-colors duration-200 ${
                      selectedQualification === type.id ? 'text-blue-400' : 'text-gray-400'
                    }`}>
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right side - Advanced Metrics */}
          <div className="flex flex-col gap-4">
            {selectedQualification ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/5 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {qualificationTypes.find(q => q.id === selectedQualification)?.icon}
                    <span className="font-semibold text-white text-lg">
                      {getQualificationName(selectedQualification)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {((performanceData[selectedQualification as QualificationType].value / total) * 100).toFixed(1)}% {isArabic ? 'من الإجمالي' : 'of Total'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded p-3">
                    <div className="text-[#B3E5FC] text-sm">
                      {isArabic ? 'إجمالي الخريجين' : 'Total Graduates'}
                    </div>
                    <div className="text-white font-medium text-lg">
                      {formatValue(performanceData[selectedQualification as QualificationType].value)}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {isArabic ? 'النمو السنوي' : 'YoY Growth'}: 
                      <span className="text-green-400 ml-1">
                        +{performanceData[selectedQualification as QualificationType].trend}%
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded p-3">
                    <div className="text-[#B3E5FC] text-sm">
                      {isArabic ? 'معدل التوظيف' : 'Employment Rate'}
                    </div>
                    <div className="text-white font-medium text-lg">
                      {performanceData[selectedQualification as QualificationType].employmentRate}%
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {isArabic ? 'متوسط وقت التوظيف' : 'Avg. Time to Employment'}: {performanceData[selectedQualification as QualificationType].duration}m
                    </div>
                  </div>

                  <div className="bg-white/5 rounded p-3">
                    <div className="text-[#B3E5FC] text-sm">
                      {isArabic ? 'معدل الرضا' : 'Satisfaction Rate'}
                    </div>
                    <div className="text-white font-medium text-lg">
                      {performanceData[selectedQualification as QualificationType].satisfaction}%
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {isArabic ? 'توصية الخريجين' : 'Alumni Recommendation'}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded p-3">
                    <div className="text-[#B3E5FC] text-sm">
                      {isArabic ? 'فرص العمل' : 'Job Opportunities'}
                    </div>
                    <div className="text-white font-medium text-lg">
                      {Math.round(performanceData[selectedQualification as QualificationType].employmentRate * performanceData[selectedQualification as QualificationType].trend / 10)}k+
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {isArabic ? 'متوقع خلال العام' : 'Expected This Year'}
                    </div>
                  </div>
                </div>

                {/* Trend Analysis */}
                <div className="mt-4 bg-white/5 rounded p-3">
                  <div className="text-[#B3E5FC] text-sm mb-2">
                    {isArabic ? 'تحليل الاتجاه' : 'Trend Analysis'}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      {isArabic ? 'معدل النمو المتوقع' : 'Projected Growth Rate'}: 
                      <span className="text-green-400 ml-1">
                        +{Math.round(performanceData[selectedQualification as QualificationType].trend * 1.2)}%
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      {isArabic ? 'مؤشر الطلب' : 'Demand Index'}: 
                      <span className="text-blue-400 ml-1">
                        {Math.round(
                          (performanceData[selectedQualification as QualificationType].employmentRate * 
                          performanceData[selectedQualification as QualificationType].trend) / 20
                        )}/10
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QualificationsDistribution;
