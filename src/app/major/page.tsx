"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  DoughnutController,
  ChartData,
} from "chart.js";
import { Bar, Doughnut, Chart, PolarArea } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import majorsData from "@/data/majors.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  DoughnutController,
  ChartDataLabels
);

// Define the valid category types
type CategoryType = 'health' | 'engineering' | 'business' | 'arts' | 'natural' | 'education' | 'technology' | 'other';

export default function MajorPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory] = useState<'all' | CategoryType>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const categoryColors: Record<CategoryType, string> = {
    health: 'rgba(220, 38, 38, 0.8)', // red for health
    engineering: 'rgba(37, 99, 235, 0.8)', // blue for engineering
    business: 'rgba(16, 185, 129, 0.8)', // green for business
    arts: 'rgba(236, 72, 153, 0.8)', // pink for arts
    natural: 'rgba(245, 158, 11, 0.8)', // amber for natural sciences
    education: 'rgba(168, 85, 247, 0.8)', // purple for education
    technology: 'rgba(99, 102, 241, 0.8)', // indigo for technology
    other: 'rgba(156, 163, 175, 0.8)', // gray for other
  };

  // const categories = [
  //   { value: 'all', label: 'All Categories', color: 'rgba(107, 114, 128, 0.8)' },
  //   { value: 'health', label: 'Health and Welfare', color: categoryColors.health },
  //   { value: 'engineering', label: 'Engineering', color: categoryColors.engineering },
  //   { value: 'business', label: 'Business', color: categoryColors.business },
  //   { value: 'arts', label: 'Arts and Humanities', color: categoryColors.arts },
  //   { value: 'natural', label: 'Natural Sciences', color: categoryColors.natural },
  //   { value: 'education', label: 'Education', color: categoryColors.education },
  //   { value: 'technology', label: 'Information and Communication Technology', color: categoryColors.technology }
  // ];

  const getCategoryFromMajor = (majorName: string): CategoryType => {
    const lowerName = majorName.toLowerCase();
    if (lowerName.includes('health') || lowerName.includes('medical') || lowerName.includes('welfare')) return 'health';
    if (lowerName.includes('engineering') || lowerName.includes('engineer')) return 'engineering';
    if (lowerName.includes('business') || lowerName.includes('management') || lowerName.includes('finance')) return 'business';
    if (lowerName.includes('art') || lowerName.includes('humanities') || lowerName.includes('language')) return 'arts';
    if (lowerName.includes('science') || lowerName.includes('physics') || lowerName.includes('chemistry') || lowerName.includes('biology')) return 'natural';
    if (lowerName.includes('education') || lowerName.includes('teaching')) return 'education';
    if (lowerName.includes('technology') || lowerName.includes('computer') || lowerName.includes('it') || lowerName.includes('information')) return 'technology';
    return 'other';
  };

  const filteredData = majorsData.majors.filter(major => 
    selectedCategory === 'all' || getCategoryFromMajor(major.name) === selectedCategory
  );

  // Sort the filtered data
  filteredData.sort((a, b) => b.graduates - a.graduates);

  const majorNames = filteredData.map((major) => major.name);
  const shortMajorNames = majorNames.map((name) => name.split(",")[0]);
  const graduates = filteredData.map((major) => major.graduates);
  const medianWages = filteredData.map((major) => major.median_wage);
  const employmentRates = filteredData.map(
    (major) => major.employment.total_employment_rate
  );
  const averageWaitingTimes = filteredData.map((major) => major.average_waiting_time);

  // Calculate totals and averages
  const totalGraduates = graduates.reduce((a, b) => a + b, 0);
  const averageWage = Math.round(medianWages.reduce((a, b) => a + b, 0) / medianWages.length);
  const averageEmploymentRate = Math.round(employmentRates.reduce((a, b) => a + b, 0) / employmentRates.length);
  const averageWaitingTime = Math.round(averageWaitingTimes.reduce((a, b) => a + b, 0) / averageWaitingTimes.length);

  // Calculate total graduates across all categories for percentage calculation
  const totalGraduatesAllCategories = majorsData.majors.reduce((total, major) => total + major.graduates, 0);

  // Graduates Distribution (Doughnut Chart)
  const graduateDistributionData: ChartData<'doughnut', number[], string> = {
    labels: shortMajorNames,
    datasets: [
      {
        data: graduates,
        backgroundColor: filteredData.map(major => 
          selectedCategory === 'all' 
            ? categoryColors[getCategoryFromMajor(major.name)] 
            : categoryColors[selectedCategory]
        ),
        borderColor: filteredData.map(major => 
          selectedCategory === 'all'
            ? categoryColors[getCategoryFromMajor(major.name)].replace('0.8', '1')
            : categoryColors[selectedCategory].replace('0.8', '1')
        ),
        borderWidth: 2,
      },
    ],
  };

  // Median Wage Data
  const medianWageData: ChartData<'bar' | 'line', number[], string> = {
    labels: shortMajorNames,
    datasets: [
        {
            type: 'bar' as const,
            label: "Median Wage",
            data: medianWages,
            backgroundColor: filteredData.map(major => 
                selectedCategory === 'all'
                    ? categoryColors[getCategoryFromMajor(major.name)]
                    : categoryColors[selectedCategory]
            ),
            borderColor: filteredData.map(major => 
                selectedCategory === 'all'
                    ? categoryColors[getCategoryFromMajor(major.name)].replace('0.8', '1')
                    : categoryColors[selectedCategory]?.replace('0.8', '1')
            ),
            borderWidth: 2,
            borderRadius: 6,
            barThickness: 20,
        },
        {
            type: 'line',
            label: "Trend",
            data: medianWages,
            borderColor: selectedCategory === 'all'
                ? "rgb(249, 115, 22)"
                : categoryColors[selectedCategory]?.replace('0.8', '1'),
            backgroundColor: selectedCategory === 'all'
                ? "rgba(249, 115, 22, 0.1)"
                : categoryColors[selectedCategory]?.replace('0.8', '0.1'),
            borderWidth: 3,
            tension: 0.4,
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: selectedCategory === 'all'
                ? "rgb(249, 115, 22)"
                : categoryColors[selectedCategory]?.replace('0.8', '1'),
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 2,
        }
    ]
};


  // Employment Rate Data
  const employmentRateData: ChartData<'polarArea', number[], string> = {
    labels: shortMajorNames,
    datasets: [
      {
        label: "Employment Rate (%)",
        data: employmentRates,
        backgroundColor: filteredData.map(major => 
          selectedCategory === 'all' 
            ? categoryColors[getCategoryFromMajor(major.name)] 
            : categoryColors[selectedCategory]
        ),
        borderColor: filteredData.map(major => 
          selectedCategory === 'all'
            ? categoryColors[getCategoryFromMajor(major.name)].replace('0.8', '1')
            : categoryColors[selectedCategory].replace('0.8', '1')
        ),
        borderWidth: 2,
        // tension: 0.3,
      },
    ],
  };

  // Average Waiting Time Data
  const waitingTimeData: ChartData<'bar', number[], string> = {
    labels: shortMajorNames,
    datasets: [
      {
        label: "Average Waiting Time (Days)",
        data: averageWaitingTimes,
        backgroundColor: filteredData.map(major => 
          selectedCategory === 'all' 
            ? categoryColors[getCategoryFromMajor(major.name)] 
            : categoryColors[selectedCategory]
        ),
        borderColor: filteredData.map(major => 
          selectedCategory === 'all'
            ? categoryColors[getCategoryFromMajor(major.name)].replace('0.8', '1')
            : categoryColors[selectedCategory].replace('0.8', '1')
        ),
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold text-white text-center bg-blue-90 p-6 rounded-lg   border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">Major Statistics</h1>
      
      <div className="mb-8">
        <div className="flex flex-col space-y-4">
      
          <div className="w-full p-4">
            {/* Filter Dropdown 
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-64 p-2 rounded-lg bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="health">Health and Welfare</option>
              <option value="engineering">Engineering</option>
              <option value="business">Business</option>
              <option value="arts">Arts and Humanities</option>
              <option value="natural">Natural Sciences</option>
              <option value="education">Education</option>
              <option value="technology">Information and Communication Technology</option>
            </select>
            */}
          </div>
        </div>

        {/* <div className="mt-4 text-sm text-gray-600 text-center">
          Showing {filteredData.length} out of {majorsData.majors.length} majors
        </div> */}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-[#1E2875]/20 rounded-md shadow p-3 border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold text-white">Total Graduates</h3>
            <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 rounded-full">+12%</span>
          </div>
          <p className="text-xl font-bold text-white mt-1">{new Intl.NumberFormat("en-US").format(totalGraduates)}</p>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-white/80">Monthly Average</span>
              <span className="text-white">{new Intl.NumberFormat("en-US").format(Math.round(totalGraduates/12))}</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-white/80">Per Major</span>
              <span className="text-white">{new Intl.NumberFormat("en-US").format(Math.round(totalGraduates/majorNames.length))}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1E2875]/20 rounded-md shadow p-3 border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold text-white">Median Wage</h3>
            <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 rounded-full">+5%</span>
          </div>
          <p className="text-xl font-bold text-white mt-1">{new Intl.NumberFormat("en-US").format(averageWage)} SAR</p>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-white/80">Highest</span>
              <span className="text-white">{new Intl.NumberFormat("en-US").format(Math.max(...medianWages))} SAR</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-white/80">Lowest</span>
              <span className="text-white">{new Intl.NumberFormat("en-US").format(Math.min(...medianWages))} SAR</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1E2875]/20 rounded-md shadow p-3 border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold text-white">Employment Rate</h3>
            <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 rounded-full">+8%</span>
          </div>
          <p className="text-xl font-bold text-white mt-1">{averageEmploymentRate}%</p>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-white/80">Highest Rate</span>
              <span className="text-white">{Math.max(...employmentRates)}%</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-white/80">Lowest Rate</span>
              <span className="text-white">{Math.min(...employmentRates)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-[#1E2875]/20 rounded-md shadow p-3 border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold text-white">Waiting Time</h3>
            <span className="text-[10px] text-rose-400 bg-rose-400/10 px-1.5 rounded-full">+3%</span>
          </div>
          <p className="text-xl font-bold text-white mt-1">{averageWaitingTime} Days</p>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-white/80">Longest Wait</span>
              <span className="text-white">{Math.max(...averageWaitingTimes)} Days</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-white/80">Shortest Wait</span>
              <span className="text-white">{Math.min(...averageWaitingTimes)} Days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 auto-rows-fr">
        {/* Graduates Distribution */}
        <div className="bg-[#1E2875]/20 rounded-md shadow p-3 border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col">
          <h2 className="text-xl font-semibold mb-6 text-white text-center">Graduate Distribution</h2>
          <div className="flex-1 flex items-center justify-center min-h-[350px]">
            <div className="w-full h-full max-w-[500px]">
              <Doughnut
                data={graduateDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  layout: {
                    padding: {
                      top: 30,
                      bottom: 10,
                      left: 10,
                      right: 10
                    }
                  },
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        color: "#fff",
                        font: {
                          size: 11
                        },
                        padding: 15
                      }
                    },
                    tooltip: {
                      backgroundColor: "white",
                      titleColor: "#1f2937",
                      bodyColor: "#4b5563",
                      borderColor: "#e5e7eb",
                      borderWidth: 1,
                      padding: 12,
                      callbacks: {
                        label: function(context) {
                          const label = context.label || '';
                          const value = context.raw;
                          const percentage = ((value as number / totalGraduatesAllCategories) * 100).toFixed(1);
                          return `${label}: ${value} (${percentage}% of total)`;
                        }
                      }
                    },
                    datalabels: {
                      color: '#fff',
                      font: {
                        weight: 500,
                        size: 11
                      },
                      formatter: function(value) {
                        const percentage = ((value / totalGraduatesAllCategories) * 100).toFixed(1);
                        return `${value}\n(${percentage}%)`;
                      },
                      textAlign: 'center'
                    }
                  }
                }}
                plugins={[ChartDataLabels]}
              />
            </div>
          </div>
        </div>

        {/* Median Wage Chart */}
        <div className="bg-[#1E2875]/20 rounded-md shadow p-3 border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col">
          <h2 className="text-xl font-semibold mb-6 text-white text-center">Median Wage Trends</h2>
          <div className="flex-1 flex items-center justify-center min-h-[350px]">
            <div className="w-full h-full">
              <Chart
                type='bar'
                data={medianWageData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  layout: {
                    padding: {
                      left: 15,
                      right: 25,
                      top: 25,
                      bottom: 15,
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: false
                    },
                    tooltip: {
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      titleColor: "#1f2937",
                      bodyColor: "#4b5563",
                      borderColor: "rgba(37, 99, 235, 0.2)",
                      borderWidth: 1,
                      padding: 12,
                      displayColors: true,
                      callbacks: {
                        label: function(context) {
                          const label = context.dataset.label || '';
                          const value = context.parsed.y;
                          return `${label}: ${new Intl.NumberFormat("en-US").format(value)} SAR`;
                        }
                      }
                    },
                    datalabels: {
                      anchor: 'end',
                      align: 'top',
                      formatter: function(value) {
                        return `${value} SAR`;
                      },
                      color: '#fff',
                      font: {
                        weight: 500,
                        size: 11,
                      },
                      padding: {
                        top: 4,
                      },
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        font: {
                          size: 11,
                          weight: 500
                        },
                        color: "#fff"
                      },
                      border: {
                        display: false
                      }
                    },
                    y: {
                      position: 'left',
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Median Wage (SAR)",
                        font: {
                          weight: 500,
                          size: 12,
                        },
                        color: "#fff",
                        padding: {
                          bottom: 10
                        }
                      },
                      ticks: {
                        font: {
                          size: 11,
                          weight: 500
                        },
                        color: "#fff",
                        padding: 10,
                        callback: function(value) {
                          return new Intl.NumberFormat("en-US").format(value as number) + " SAR";
                        }
                      },
                      grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                        // drawBorder: false,
                        // borderDash: [5, 5]
                      }
                    }
                  },
                  interaction: {
                    intersect: false,
                    mode: 'index'
                  },
                  animation: {
                    duration: 750,
                    easing: 'easeInOutQuart'
                  },
                }}
                plugins={[ChartDataLabels]}
              />
            </div>
          </div>
        </div>

        {/* Employment Rate Chart */}
        <div className="bg-[#1E2875]/20 rounded-md shadow p-3 border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col">
          <h2 className="text-xl font-semibold mb-6 text-white text-center">Employment Rates</h2>
          <div className="flex-1 flex items-center justify-center min-h-[350px]">
            <div className="w-full h-full">
              <PolarArea
                data={employmentRateData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  layout: {
                    padding: {
                      left: 15,
                      right: 15,
                      top: 15,
                      bottom: 15,
                    },
                  },
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        color: '#fff',
                        font: {
                          size: 11,
                          weight: 500
                        },
                        padding: 20,
                        usePointStyle: true,
                      }
                    },
                    tooltip: {
                      backgroundColor: "white",
                      titleColor: "#1f2937",
                      bodyColor: "#4b5563",
                      borderColor: "#e5e7eb",
                      borderWidth: 1,
                      padding: 12,
                      callbacks: {
                        label: function(context) {
                          return `Employment Rate: ${context.raw}%`;
                        }
                      }
                    },
                    datalabels: {
                      anchor: 'end',
                      align: 'top',
                      formatter: function(value) {
                        return `${value}%`;
                      },
                      color: '#fff',
                      font: {
                        weight: 500,
                        size: 11,
                      },
                      padding: {
                        top: 4,
                      },
                    }
                  },
                  scales: {
                    r: {
                      beginAtZero: true,
                      min: 0,
                      max: 100,
                      ticks: {
                        stepSize: 20,
                        color: '#fff',
                        font: {
                          size: 11,
                          weight: 500
                        },
                        backdropColor: 'transparent'
                      },
                      grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                      },
                      angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)',
                      },
                    },
                  },
                }}
                plugins={[ChartDataLabels]}
              />
            </div>
          </div>
        </div>

        {/* Average Waiting Time Chart */}
        <div className="bg-[#1E2875]/20 rounded-md shadow p-3 border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col">
          <h2 className="text-xl font-semibold mb-6 text-white text-center">Average Waiting Time</h2>
          <div className="flex-1 flex items-center justify-center min-h-[350px]">
            <div className="w-full h-full">
              <Bar
                data={waitingTimeData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  layout: {
                    padding: {
                      left: 10,
                      right: 20,
                      top: 30,
                      bottom: 10,
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      backgroundColor: "white",
                      titleColor: "#1f2937",
                      bodyColor: "#4b5563",
                      borderColor: "#e5e7eb",
                      borderWidth: 1,
                      padding: 12,
                      callbacks: {
                        label: function(context) {
                          return `Waiting Time: ${context.raw} days`;
                        }
                      }
                    },
                    datalabels: {
                      anchor: 'end',
                      align: 'top',
                      formatter: function(value) {
                        return `${value} days`;
                      },
                      color: '#fff',
                      font: {
                        weight: 500,
                        size: 11,
                      },
                      padding: {
                        top: 4,
                      },
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        font: {
                          size: 11,
                          weight: 500
                        },
                        color: "#fff"
                      }
                    },
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: "Days",
                        font: {
                          weight: 500,
                          size: 12,
                        },
                        color: "#fff"
                      },
                      ticks: {
                        font: {
                          size: 11,
                          weight: 500
                        },
                        color: "#fff",
                        callback: function(value) {
                          return `${value} days`;
                        }
                      },
                      grid: {
                        color: "rgba(255, 255, 255, 0.1)"
                      }
                    },
                  },
                }}
                plugins={[ChartDataLabels]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
