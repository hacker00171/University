import React from 'react';
import { useLanguage } from '@/app/dashboard/context/LanguageContext';
import { ResponsiveBar } from '@nivo/bar';
import { motion } from 'framer-motion';
import { TrendingUp, GraduationCap, Building2, Briefcase } from 'lucide-react';

interface RegionalDistributionProps {
  data?: {
    id: string;
    data: {
      x: number;
      y: number;
      university: string;
      graduates: number;
      employmentRate: number;
    };
  };
}

const RegionalDistribution = ({  }: RegionalDistributionProps) => {
  const { isArabic } = useLanguage();

  // Enhanced regional data with more metrics
  const regionalData = [
    {
      region: 'Riyadh',
      regionAr: 'الرياض',
      academicScore: 92,
      studentSuccess: 88,
      researchImpact: 85,
      universities: 15,
      graduates: 45000,
      employmentRate: 89,
      growthRate: 15,
      researchOutput: 2800,
      internationalCollaboration: 78,
      industryPartnership: 82
    },
    {
      region: 'Makkah',
      regionAr: 'مكة المكرمة',
      academicScore: 88,
      studentSuccess: 85,
      researchImpact: 82,
      universities: 12,
      graduates: 38000,
      employmentRate: 87,
      growthRate: 12,
      researchOutput: 2400,
      internationalCollaboration: 75,
      industryPartnership: 79
    },
    {
      region: 'Eastern Province',
      regionAr: 'المنطقة الشرقية',
      academicScore: 86,
      studentSuccess: 84,
      researchImpact: 80,
      universities: 10,
      graduates: 32000,
      employmentRate: 88,
      growthRate: 14,
      researchOutput: 2100,
      internationalCollaboration: 72,
      industryPartnership: 85
    },
    {
      region: 'Madinah',
      regionAr: 'المدينة المنورة',
      academicScore: 84,
      studentSuccess: 82,
      researchImpact: 78,
      universities: 8,
      graduates: 28000,
      employmentRate: 85,
      growthRate: 11,
      researchOutput: 1800,
      internationalCollaboration: 70,
      industryPartnership: 76
    },
    {
      region: 'Asir',
      regionAr: 'عسير',
      academicScore: 82,
      studentSuccess: 80,
      researchImpact: 75,
      universities: 6,
      graduates: 25000,
      employmentRate: 84,
      growthRate: 10,
      researchOutput: 1500,
      internationalCollaboration: 68,
      industryPartnership: 74
    }
  ].sort((a, b) => b.academicScore - a.academicScore);

  // Calculate regional insights
  const totalGraduates = regionalData.reduce((sum, region) => sum + region.graduates, 0);
  const avgEmploymentRate = regionalData.reduce((sum, region) => sum + region.employmentRate, 0) / regionalData.length;
  const totalResearchOutput = regionalData.reduce((sum, region) => sum + region.researchOutput, 0);
  const avgGrowthRate = regionalData.reduce((sum, region) => sum + region.growthRate, 0) / regionalData.length;

  const MetricCard = ({ 
    icon: Icon, 
    title, 
    value, 
    trend = null, 
    subtitle = '' 
  }: { 
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    value: string | number;
    trend?: number | null;
    subtitle?: string;
  }) => (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-white">{value}</span>
            {trend !== null && (
              <span className={`text-sm ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {trend > 0 ? '+' : ''}{trend}% YoY
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-blue-300 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1e3a8a4d] backdrop-blur-sm rounded-lg p-6 h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-semibold text-[#E3F2FD]">
            {isArabic ? 'التوزيع الإقليمي' : 'Regional Distribution'}
          </h3>
          <p className="text-blue-300 text-sm mt-1">
            {isArabic ? 'تحليل الأداء حسب المنطقة' : 'Performance Analysis by Region'}
          </p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <MetricCard
          icon={GraduationCap}
          title={isArabic ? 'إجمالي الخريجين' : 'Total Graduates'}
          value={`${(totalGraduates/1000).toFixed(1)}K`}
          trend={12}
          subtitle={`${regionalData[0].region}: ${(regionalData[0].graduates/1000).toFixed(1)}K`}
        />
        <MetricCard
          icon={Briefcase}
          title={isArabic ? 'متوسط معدل التوظيف' : 'Avg. Employment Rate'}
          value={`${avgEmploymentRate.toFixed(1)}%`}
          trend={5}
          subtitle={`Top: ${Math.max(...regionalData.map(r => r.employmentRate))}%`}
        />
        <MetricCard
          icon={TrendingUp}
          title={isArabic ? 'متوسط معدل النمو' : 'Avg. Growth Rate'}
          value={`${avgGrowthRate.toFixed(1)}%`}
          trend={avgGrowthRate - 8}
          subtitle={`Highest: ${Math.max(...regionalData.map(r => r.growthRate))}%`}
        />
        <MetricCard
          icon={Building2}
          title={isArabic ? 'مجموع البحوث' : 'Total Research Output'}
          value={totalResearchOutput.toLocaleString()}
          trend={15}
          subtitle={`${regionalData[0].region}: ${regionalData[0].researchOutput}`}
        />
      </div>

      {/* Main Chart */}
      <div className="h-[300px]">
        <ResponsiveBar
          data={regionalData}
          keys={['academicScore', 'studentSuccess', 'researchImpact']}
          indexBy={isArabic ? 'regionAr' : 'region'}
          margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={['#3b82f6', '#22c55e', '#8b5cf6']}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              size: 4,
              padding: 1,
              stagger: true
            }
          ]}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]]
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isArabic ? 'المنطقة' : 'REGION',
            legendPosition: 'middle',
            legendOffset: 40,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isArabic ? 'النقاط' : 'SCORE',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          theme={{
            axis: {
              legend: {
                text: {
                  fill: '#F5F5DC',
                  fontSize: 14,
                  fontWeight: 600
                }
              },
              ticks: {
                text: {
                  fill: '#ffffff'
                }
              }
            },
            legends: {
              text: {
                fill: '#F5F5DC',
                fontSize: 12
              }
            }
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 110,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              itemTextColor: '#F5F5DC',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1
                  }
                }
              ],
              data: [
                {
                  id: 'academicScore',
                  label: isArabic ? 'الأداء الأكاديمي' : 'Academic Score',
                  color: '#3b82f6'
                },
                {
                  id: 'studentSuccess',
                  label: isArabic ? 'نجاح الطلاب' : 'Student Success',
                  color: '#22c55e'
                },
                {
                  id: 'researchImpact',
                  label: isArabic ? 'تأثير البحث' : 'Research Impact',
                  color: '#8b5cf6'
                }
              ]
            }
          ]}
          role="application"
          ariaLabel="Regional distribution chart"
          barAriaLabel={e => `${e.id}: ${e.formattedValue} in ${e.indexValue}`}
          tooltip={({ indexValue, data }) => (
            <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg">
              <div className="font-semibold mb-2">{indexValue}</div>
              <div className="grid gap-1 text-sm">
                <div className="text-blue-300">
                  {isArabic ? 'الأداء الأكاديمي' : 'Academic Score'}: {data.academicScore}
                </div>
                <div className="text-green-300">
                  {isArabic ? 'نجاح الطلاب' : 'Student Success'}: {data.studentSuccess}
                </div>
                <div className="text-purple-300">
                  {isArabic ? 'تأثير البحث' : 'Research Impact'}: {data.researchImpact}
                </div>
                <div className="mt-2 pt-2 border-t border-gray-600">
                  <div className="text-yellow-300">
                    {isArabic ? 'معدل التوظيف' : 'Employment Rate'}: {data.employmentRate}%
                  </div>
                  <div className="text-orange-300">
                    {isArabic ? 'معدل النمو' : 'Growth Rate'}: +{data.growthRate}%
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </motion.div>
  );
};

export default RegionalDistribution;
