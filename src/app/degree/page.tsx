'use client';

import data from "./degree_mock/mock_data_degree.json";
import SummaryCard from "./components/SummaryCard";
import TopMajorsByGraduatesChart from "./components/TopMajorsByGraduatesChart";
import TopMajorsByEmploymentChart from "./components/TopMajorsByEmploymentChart";
import TopMajorsBySalaryChart from "./components/TopMajorsBySalaryChart";
import GenderDistributionByMajorChart from "./components/GenderDistributionByMajorChart";
import SalaryDistributionByMajorChart from "./components/SalaryDistributionByMajorChart";
import EmploymentTimingDistributionChart from "./components/EmploymentTimingDistributionChart";
import WaitingPeriodsDistributionChart from "./components/WaitingPeriodsDistributionChart";
// import { useState } from 'react';

// const educationLevels = ["Bachelor's Degree", "Master's Degree", "PH'd Degree"];

export default function DegreePage() {
  const { summaryCards } = data.OverViewInsights;
  const { byGraduates, byEmploymentRate, byAverageSalary } = data.OverViewInsights.topGeneralMajors;
  const { employmentTimelineByGeneralMajor } = data.educationInsights;

  const graduatesData = byGraduates.rankings.map(item => ({
    name: item.generalMajor,
    value: item.value,
    genderDistribution: {
      male: item.male,
      female: item.female
    }
  }));

  const employmentData = byEmploymentRate.rankings.map(item => ({
    name: item.generalMajor,
    value: item.value,
    totalStudents: item.totalStudents,
    employedStudents: item.employedStudents
  }));

  const salaryData = byAverageSalary.rankings.map(item => ({
    name: item.generalMajor,
    value: item.value
  }));

  const genderDistributionData = byGraduates.rankings.map(item => ({
    name: item.generalMajor,
    maleCount: item.male.count,
    femaleCount: item.female.count,
    malePercentage: item.male.percentage,
    femalePercentage: item.female.percentage,
    totalGraduates: item.value
  }));

  const salaryDistributionData = byAverageSalary.rankings.map(item => ({
    name: item.generalMajor,
    ranges: {
      "0-5000": { percentage: 25 },
      "5001-10000": { percentage: 35 },
      "10001-15000": { percentage: 25 },
      "15001+": { percentage: 15 }
    },
    medianSalary: item.value * 0.9,
    averageSalary: item.value
  }));

  const employmentTimingData = data.OverViewInsights.employmentTiming.byGeneralMajor.map(item => ({
    name: item.name,
    beforeGraduation: item.preGraduation.percentage,
    withinYear: item.withinYear.percentage,
    afterYear: item.afterYear.percentage
  }));

  return (
    <div className="space-y-8 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Degree Analytics</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Graduates"
          value={summaryCards.totalGraduates.toLocaleString()}
        />
        <SummaryCard
          title="Overall Employment Rate"
          value={`${summaryCards.overallEmploymentRate}%`}
        />
        <SummaryCard
          title="Average Salary"
          value={`$${summaryCards.averageSalary.toLocaleString()}`}
        />
        <SummaryCard
          title="Average Time to Employment"
          value={`${summaryCards.averageTimeToEmployment} days`}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-black/40 backdrop-blur-sm border border-white/50 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-white">Top Majors by Number of Graduates</h2>
          <TopMajorsByGraduatesChart data={graduatesData} />
        </div>
        <div className="bg-black/40 backdrop-blur-sm border border-white/50 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-white">Top Majors by Employment Rate</h2>
          <TopMajorsByEmploymentChart data={employmentData} />
        </div>
        <div className="bg-black/40 backdrop-blur-sm border border-white/50 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-white">Top Majors by Average Salary</h2>
          <TopMajorsBySalaryChart data={salaryData} />
        </div>
        <div className="bg-black/40 backdrop-blur-sm border border-white/50 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-white">Gender Distribution by Major</h2>
          <GenderDistributionByMajorChart data={genderDistributionData} />
        </div>
        <div className="bg-black/40 backdrop-blur-sm border border-white/50 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-white">Salary Distribution by Major</h2>
          <SalaryDistributionByMajorChart data={salaryDistributionData} />
        </div>
        <div className="bg-black/40 backdrop-blur-sm border border-white/50 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-white">Employment Timing Distribution</h2>
          <EmploymentTimingDistributionChart data={employmentTimingData} />
        </div>
        <div className="bg-black/40 backdrop-blur-sm border border-white/50 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-white">Waiting Periods Distribution</h2>
          <WaitingPeriodsDistributionChart data={employmentTimelineByGeneralMajor} />
        </div>
      </div>
    </div>
  );
}
