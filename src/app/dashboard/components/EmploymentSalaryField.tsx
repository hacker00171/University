'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";
import { useLanguage } from '@/app/dashboard/context/LanguageContext';

const employmentData = [
  {
    field: "Engineering",
    employmentRate: 64,
    salary: 6800,
    growthRate: 12,
    demand: 85
  },
  {
    field: "Health",
    employmentRate: 62,
    salary: 6300,
    growthRate: 15,
    demand: 90
  },
  {
    field: "ICT",
    employmentRate: 61,
    salary: 6700,
    growthRate: 18,
    demand: 88
  },
  {
    field: "Business",
    employmentRate: 59,
    salary: 6200,
    growthRate: 10,
    demand: 75
  }
];

const EmploymentSalaryField = () => {
  const { isArabic } = useLanguage();

  return (
    <Card className="col-span-2 bg-[#1e3a8a4d] backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white text-2xl">
          {isArabic ? 'التوظيف والرواتب حسب المجال' : 'Employment & Salary by Field'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveBar
            data={employmentData}
            keys={['employmentRate']}
            indexBy="field"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'blues' }}
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
              legend: isArabic ? 'المجال' : 'Field',
              legendPosition: 'middle',
              legendOffset: 32,
              truncateTickAt: 0
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: isArabic ? 'معدل التوظيف %' : 'Employment Rate %',
              legendPosition: 'middle',
              legendOffset: -40,
              truncateTickAt: 0
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 1.6]]
            }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1
                    }
                  }
                ]
              }
            ]}
            role="application"
            ariaLabel="Employment rates by field"
            barAriaLabel={e => `${e.id}: ${e.formattedValue}% in ${e.indexValue}`}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: '#ffffff',
                    strokeWidth: 1
                  }
                },
                ticks: {
                  line: {
                    stroke: '#ffffff',
                    strokeWidth: 1
                  },
                  text: {
                    fill: '#ffffff',
                    fontSize: 11
                  }
                },
                legend: {
                  text: {
                    fill: '#ffffff',
                    fontSize: 12
                  }
                }
              },
              grid: {
                line: {
                  stroke: '#ffffff',
                  strokeWidth: 0.5,
                  strokeOpacity: 0.1
                }
              },
              legends: {
                text: {
                  fill: '#ffffff',
                  fontSize: 11
                }
              },
              tooltip: {
                container: {
                  background: '#1e3a8a',
                  color: '#ffffff',
                  fontSize: 12,
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  padding: '8px 12px'
                }
              }
            }}
            tooltip={({ indexValue, value }) => (
              <div style={{ padding: 12, background: '#1e3a8a', borderRadius: '4px' }}>
                <strong style={{ color: '#ffffff' }}>{indexValue}</strong>
                <br />
                <span style={{ color: '#ffffff' }}>
                  Employment Rate: {value}%
                  <br />
                  Average Salary: SAR {employmentData.find(d => d.field === indexValue)?.salary}
                  <br />
                  Growth Rate: {employmentData.find(d => d.field === indexValue)?.growthRate}%
                  <br />
                  Market Demand: {employmentData.find(d => d.field === indexValue)?.demand}%
                </span>
              </div>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmploymentSalaryField;
