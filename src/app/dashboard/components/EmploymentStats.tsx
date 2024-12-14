import { useLanguage } from '@/app/dashboard/context/LanguageContext';
import { ResponsiveBar } from '@nivo/bar';
import { TrendingUp,  DollarSign, Clock,  Target } from 'lucide-react';

interface EmploymentData {
  field: string;
  value: number;
  avgSalary?: number;
  growth?: number;
  timeToEmployment?: number;
}

interface Props {
  employmentData: EmploymentData[];
}

interface MetricCardProps {
  icon: React.ElementType;
  value: number | string;
  label: string;
  trend?: number;
  subtext?: string;
}

const EmploymentStats = ({  }: Props) => {
  const { isArabic } = useLanguage();

  // Enhanced data for median wages by specialty
  const wagesData = [
    {
      field: 'Medicine & Healthcare',
      fieldAr: 'الطب والرعاية الصحية',
      value: 25800,
      growth: 12.5,
      nationalAvgDiff: 45,
      timeToEmployment: 1,
      demandLevel: 'Very High',
      jobSatisfaction: 92
    },
    {
      field: 'Software Engineering',
      fieldAr: 'هندسة البرمجيات',
      value: 23500,
      growth: 15.3,
      nationalAvgDiff: 38,
      timeToEmployment: 1,
      demandLevel: 'Very High',
      jobSatisfaction: 89
    },
    {
      field: 'Data Science',
      fieldAr: 'علوم البيانات',
      value: 22000,
      growth: 18.2,
      nationalAvgDiff: 35,
      timeToEmployment: 2,
      demandLevel: 'High',
      jobSatisfaction: 88
    },
    {
      field: 'Engineering',
      fieldAr: 'الهندسة',
      value: 20500,
      growth: 8.5,
      nationalAvgDiff: 30,
      timeToEmployment: 2,
      demandLevel: 'High',
      jobSatisfaction: 85
    },
    {
      field: 'Finance',
      fieldAr: 'المالية',
      value: 19800,
      growth: 10.3,
      nationalAvgDiff: 28,
      timeToEmployment: 3,
      demandLevel: 'High',
      jobSatisfaction: 83
    },
    {
      field: 'Business Administration',
      fieldAr: 'إدارة الأعمال',
      value: 18200,
      growth: 7.8,
      nationalAvgDiff: 22,
      timeToEmployment: 3,
      demandLevel: 'Moderate',
      jobSatisfaction: 80
    },
    {
      field: 'Education',
      fieldAr: 'التعليم',
      value: 16500,
      growth: 5.5,
      nationalAvgDiff: 15,
      timeToEmployment: 4,
      demandLevel: 'Moderate',
      jobSatisfaction: 78
    }
  ].sort((a, b) => b.value - a.value);

  // Calculate averages and insights
  const avgSalary = Math.round(wagesData.reduce((acc, curr) => acc + curr.value, 0) / wagesData.length);
  const avgGrowth = Math.round(wagesData.reduce((acc, curr) => acc + curr.growth, 0) / wagesData.length * 10) / 10;
  const highestPaid = wagesData[0];
  const fastestGrowing = wagesData.reduce((prev, curr) => prev.growth > curr.growth ? prev : curr);

  const MetricCard = ({ icon: Icon, value, label, trend = 0, subtext = '' }: MetricCardProps) => (
    <div className="bg-white/5 rounded-lg p-4 flex items-center gap-4">
      <div className="p-3 bg-blue-500/20 rounded-lg">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-white">{value}</span>
          {trend !== 0 && (
            <span className={trend > 0 ? 'text-green-400' : 'text-red-400'}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          )}
        </div>
        <p className="text-sm text-gray-400">{label}</p>
        {subtext && <p className="text-xs text-blue-300 mt-1">{subtext}</p>}
      </div>
    </div>
  );

  return (
    <div className="bg-[#1e3a8a4d] backdrop-blur-sm rounded-lg p-6 h-full">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-semibold text-[#E3F2FD]">
          {isArabic ? 'الرواتب حسب التخصص' : 'Median Wages by Major'}
          <p className="text-indigo-300 text-sm mt-1">
            {isArabic ? 'تحليل متعمق للجامعات الرائدة' : 'Exploring Salary Trends and Career Outcomes'}
          </p>
        </h3>
      </div>

      {/* Key Insights Grid */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <MetricCard
          icon={DollarSign}
          value={`${(avgSalary/1000).toFixed(1)}K SAR`}
          label={isArabic ? 'متوسط الراتب' : 'Avg. Median Wage'}
          trend={avgGrowth}
        />
        <MetricCard
          icon={Target}
          value={highestPaid.field}
          label={isArabic ? 'أعلى راتب' : 'Highest Paying Field'}
          subtext={`${(highestPaid.value/1000).toFixed(1)}K SAR`}
        />
        <MetricCard
          icon={TrendingUp}
          value={fastestGrowing.field}
          label={isArabic ? 'أسرع نمو' : 'Fastest Growing Major'}
          trend={fastestGrowing.growth}
        />
        <MetricCard
          icon={Clock}
          value={`${Math.min(...wagesData.map(d => d.timeToEmployment))} months`}
          label={isArabic ? 'أقصر وقت للتوظيف' : 'Shortest Wait Time to Employment'}
        />
      </div>

      {/* Salary Chart */}
      <div className="h-96 mt-6">
        <ResponsiveBar
          data={wagesData}
          keys={['value']}
          indexBy={isArabic ? 'fieldAr' : 'field'}
          margin={{ top: 30, right: 130, bottom: 120, left: 80 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          colors={['#3b82f6']} // blue-500
          defs={[
            {
              id: 'gradient',
              type: 'linearGradient',
              colors: [
                { offset: 0, color: '#2563eb' },    // blue-600
                { offset: 50, color: '#3b82f6' },   // blue-500
                { offset: 100, color: '#60a5fa' }   // blue-400
              ],
            }
          ]}
          fill={[{ match: '*', id: 'gradient' }]}
          borderWidth={1}
          borderColor="rgba(59, 130, 246, 0.5)"
          borderRadius={4}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: isArabic ? 'التخصص' : 'MAJORS',
            legendPosition: 'middle',
            legendOffset: 110,
            truncateTickAt: 0
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isArabic ? 'الراتب الشهري (ريال)' : 'MONTHLY SALARY (SAR)',
            legendPosition: 'middle',
            legendOffset: -60,
            format: value => `${(value/1000).toFixed(0)}K`,
          }}
          theme={{
            axis: {
              ticks: {
                text: {
                  fill: '#ffffff',
                  fontSize: 12
                },
                line: {
                  stroke: '#ffffff'
                }
              },
              legend: {
                text: {
                  fill: '#ffffff',
                  fontSize: 13,
                  fontWeight: 600
                }
              }
            },
            grid: {
              line: {
                stroke: '#ffffff20'
              }
            },
            legends: {
              text: {
                fill: '#ffffff',
                fontSize: 12,
                fontWeight: 500
              }
            }
          }}
          enableLabel={true}
          label={d => `${((d.value??0)/1000).toFixed(1)}K`}
          labelTextColor="#ffffff"
          motionConfig="gentle"
          role="application"
          ariaLabel="Median wages by specialty"
          barAriaLabel={e => `${e.indexValue}: ${e.value} SAR`}
          tooltip={({ indexValue, value, data }) => (
            <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg">
              <div className="font-semibold">{indexValue}</div>
              <div className="text-sm">Median Salary: {(value/1000).toFixed(1)}K SAR</div>
              <div className="text-xs text-green-400">Growth: +{data.growth}%</div>
              <div className="text-xs text-blue-400">Demand: {data.demandLevel}</div>
              <div className="text-xs text-yellow-400">Job Satisfaction: {data.jobSatisfaction}%</div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default EmploymentStats;
