import React, { useState } from 'react';
import { UniversityTrend } from '../types/regional';

interface Props {
  trends: UniversityTrend[] | undefined;
  className?: string;
}

const UniversityTrends: React.FC<Props> = ({ trends, className = '' }) => {
  const [hoveredPoint, setHoveredPoint] = useState<{
    university: string;
    year: number;
    students: number;
  } | null>(null);

  if (!trends) return null;

  // SVG dimensions and padding
  const width = 800;
  const height = 340;
  const padding = { top: 30, right: 30, bottom: 30, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Get all years and find min/max values
  const allYears = trends[0].yearlyData.map(d => d.year);
  const allValues = trends.flatMap(t => t.yearlyData.map(d => d.students));
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);

  // Scale functions
  const scaleX = (year: number) => {
    const minYear = allYears[0];
    const maxYear = allYears[allYears.length - 1];
    return padding.left + ((year - minYear) / (maxYear - minYear)) * chartWidth;
  };

  const scaleY = (value: number) => {
    return height - (padding.bottom + (value / maxValue) * chartHeight);
  };

  // Format numbers with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  // Generate path for each trend line and area
  const generatePaths = (data: { year: number; students: number }[]) => {
    const linePath = data.map((d, i) => 
      (i === 0 ? 'M' : 'L') + `${scaleX(d.year)},${scaleY(d.students)}`
    ).join(' ');

    const areaPath = linePath + 
      'L' + `${scaleX(data[data.length - 1].year)},${height - padding.bottom}` +
      'L' + `${scaleX(data[0].year)},${height - padding.bottom}Z`;

    return { linePath, areaPath };
  };

  return (
    <div className={`bg-gradient-to-br from-[#2c327a] to-[#1a1f4e] rounded-lg p-5 shadow-lg ${className}`}>
      <h3 className="text-gray-300 text-base font-medium mb-6">University Enrollment Trends</h3>
      
      {/* Legend */}
      <div className="flex justify-end mb-1">
        <div className="bg-[#1a1f4d] rounded-lg p-2 space-y-2">
          {trends.map((university, index) => (
            <div key={index} className="flex items-center gap-2 whitespace-nowrap">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: university.color }}
              />
              <span className="text-gray-400 text-xs">{university.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative h-[340px]">
        {/* Tooltip */}
        {hoveredPoint && (
          <div 
            className="absolute z-10 bg-[#1a1f4d] text-white p-3 rounded-lg shadow-lg text-sm"
            style={{
              left: scaleX(hoveredPoint.year),
              top: scaleY(hoveredPoint.students) - 80,
              transform: 'translateX(-50%)'
            }}
          >
            <div className="font-medium">{hoveredPoint.university}</div>
            <div className="text-gray-300 text-xs mt-1">
              Year: {hoveredPoint.year}
              <br />
              Students: {formatNumber(hoveredPoint.students)}
            </div>
          </div>
        )}

        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            {trends.map((university, index) => (
              <linearGradient
                key={`gradient-${index}`}
                id={`gradient-${index}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor={university.color}
                  stopOpacity="0.3"
                />
                <stop
                  offset="100%"
                  stopColor={university.color}
                  stopOpacity="0.05"
                />
              </linearGradient>
            ))}
          </defs>

          {/* Grid lines */}
          {Array.from({ length: 6 }).map((_, i) => {
            const y = padding.top + (i * (chartHeight / 5));
            const value = maxValue - ((maxValue - minValue) * (i / 5));
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#2c327a"
                  strokeWidth="1"
                />
                <text
                  x={padding.left - 10}
                  y={y}
                  textAnchor="end"
                  alignmentBaseline="middle"
                  fill="#9ca3af"
                  fontSize="12"
                >
                  {formatNumber(Math.round(value))}
                </text>
              </g>
            );
          })}

          {/* X-axis years */}
          {allYears.map(year => (
            <text
              key={year}
              x={scaleX(year)}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              fill="#9ca3af"
              fontSize="12"
            >
              {year}
            </text>
          ))}

          {/* Trend lines and areas */}
          {trends.map((university, index) => {
            const { linePath, areaPath } = generatePaths(university.yearlyData);
            return (
              <g key={index} className="transition-opacity duration-200">
                {/* Area under the line */}
                <path
                  d={areaPath}
                  fill={`url(#gradient-${index})`}
                  className="transition-opacity duration-200"
                />
                {/* Line */}
                <path
                  d={linePath}
                  fill="none"
                  stroke={university.color}
                  strokeWidth="2"
                  className="transition-all duration-200"
                />
                {/* Interactive points */}
                {university.yearlyData.map((d, i) => (
                  <g key={i}>
                    {/* Larger invisible circle for better hover */}
                    <circle
                      cx={scaleX(d.year)}
                      cy={scaleY(d.students)}
                      r="8"
                      fill="transparent"
                      onMouseEnter={() => setHoveredPoint({
                        university: university.name,
                        year: d.year,
                        students: d.students
                      })}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                    {/* Visible point */}
                    <circle
                      cx={scaleX(d.year)}
                      cy={scaleY(d.students)}
                      r="4"
                      fill={university.color}
                      className={`transition-all duration-200 ${
                        hoveredPoint?.university === university.name &&
                        hoveredPoint?.year === d.year
                          ? 'r-6 stroke-white stroke-2'
                          : ''
                      }`}
                    />
                  </g>
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default UniversityTrends;
