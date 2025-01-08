'use client';

import React, { useState, useEffect, Suspense } from 'react';

import { useSearchParams } from 'next/navigation';
import { X, Users, Briefcase, DollarSign, Clock } from 'lucide-react'; // For close icon

import mockDataRaw from './major_mock/mock_data_major.json';
const mockData = mockDataRaw as MockData;
import TopNarrowMajorsChart from './components/TopNarrowMajorsChart';
import TopMajorsByPopularOccupationsChart from './components/TopMajorsByPopularOccupationsChart';
import SalaryDistributionChart from './components/SalaryDistributionChart';
import EmploymentTimelineChart from './components/EmploymentTimelineChart';
import TopMajorsGenderGapChart from './components/TopMajorsGenderGapChart';
import TopOccupationsGenderGapChart from './components/TopOccupationsGenderGapChart';
import GenderDistributionChart from './components/GenderDistributionChart';

interface MajorFilterOptions {
  generalMajor: string | null;
  narrowMajor: string | null;
  specificMajor: string | null;
}

interface OverallBasicMetric {
  name: string;
  generalMajor: string;
  graduates: number;
  graduatesPercentage: number;
  employmentRate: number;
  averageSalary: number;
  timeToEmployment: number;
}

interface NarrowBasicMetric {
  name: string;
  narrowMajor: string;
  graduates: number;
  graduatesPercentage: number;
  employmentRate: number;
  averageSalary: number;
  timeToEmployment: number;
}

type BasicMetric = OverallBasicMetric | NarrowBasicMetric;

interface SalaryDistribution {
  generalMajor?: string;
  narrowMajor?: string;
  occupation?: string;
  salary: number;
  percentage: number;
  median?: number;
}


interface GeneralMajor {
  name: string;
  overall: {
    basicMetrics: BasicMetric[];
    topOccupationsByIndustry: TopOccupationsByIndustry;
    topOccupationsInsights: TopOccupationsInsights;
    topMajorsByOccupation?: TopMajorsByOccupation;
    genderDistribution: GenderDistribution;
    employmentTiming: EmploymentTiming;
    employmentTimeline: EmploymentTimeline[];
    salaryDistribution: SalaryDistribution[];
    topNarrowMajorsInsights?: {
      byGenderGap: {
        rankings: Array<{
          name: string;
          malePercentage: number;
          femalePercentage: number;
          genderGap: number;
        }>;
      };
    };
  };
  byNarrowMajor?: {
    narrowMajors: Array<{
      name: string;
      overall: {
        basicMetrics: BasicMetric[];
        topOccupationsByIndustry: TopOccupationsByIndustry;
        topOccupationsInsights: TopOccupationsInsights;
        topMajorsByOccupation?: TopMajorsByOccupation;
        genderDistribution: GenderDistribution;
        employmentTiming: EmploymentTiming;
        employmentTimeline: EmploymentTimeline[];
        salaryDistribution: SalaryDistribution[];
        topMajorsInsights?: {
          byGenderGap: {
            rankings: Array<{
              name: string;
              malePercentage: number;
              femalePercentage: number;
              genderGap: number;
            }>;
          };
        };
      };
    }>;
  };
}

interface OccupationMetrics {
  graduates: number;
  employmentRate: number;
  averageSalary: number;
  genderDistribution?: {
    male: { percentage: number };
    female: { percentage: number };
  };
}

interface MajorDistribution {
  name: string;
  metrics: OccupationMetrics;
}

interface Occupation {
  name: string;
  metrics: OccupationMetrics;
  majorDistribution: MajorDistribution[];
}

interface TopMajorsByOccupation {
  occupations: Occupation[];
}

interface TopOccupationsByIndustry {
  industries: Array<{
    name: string;
    occupations: Array<{
      name: string;
      metrics: OccupationMetrics;
    }>;
  }>;
}

interface TopOccupationsInsights {
  mostPopular: Array<{
    occupation: string;
    graduates: number;
    percentage: number;
  }>;
  mostEmployable: Array<{
    occupation: string;
    employmentRate: number;
    graduates: number;
  }>;
  highestPaying: Array<{
    occupation: string;
    averageSalary: number;
    graduates: number;
  }>;
}


interface MajorsInsights {
  overall: {
    basicMetrics: BasicMetric[];
    topOccupationsByIndustry: TopOccupationsByIndustry;
    topOccupationsInsights: TopOccupationsInsights;
    topMajorsByOccupation?: TopMajorsByOccupation;
    genderDistribution: GenderDistribution;
    employmentTiming: EmploymentTiming;
    employmentTimeline: EmploymentTimeline[];
    salaryDistribution: SalaryDistribution[];
    topGeneralMajorsInsights: {
      byGenderGap: {
        rankings: {
          rankings: Array<{
            generalMajor: string;
            malePercentage: number;
            femalePercentage: number;
            genderGap: number;
          }>;
        };
      };
    };
  };
  byGeneralMajor: {
    generalMajors: GeneralMajor[];
  };
}

interface MockData {
  majorsInsights: MajorsInsights;
}

interface GenderDistribution {
  generalMajor?: string;
  narrowMajor?: string;
  specificMajor?: string;
  male: { count: number; percentage: number };
  female: { count: number; percentage: number };
}

interface SalaryDistribution {
  generalMajor?: string;
  narrowMajor?: string;
  occupation?: string;
  salary: number;
  percentage: number;
  median?: number;
}

interface EmploymentTiming {
  generalMajor: string;
  beforeGraduation: {
    count: number;
    percentage: number;
  };
  withinYear: {
    count: number;
    percentage: number;
  };
  afterYear: {
    count: number;
    percentage: number;
  };
}

interface EmploymentTimeline {
  generalMajor: string;
  name: string;
  narrowMajor: string;
  averageTime: number;
  quickEmploymentRate: number;
  waitingPeriods: {
    beforeGraduation: { count: number; percentage: number; };
    withinYear: { count: number; percentage: number; };
    afterYear: { count: number; percentage: number; };
  };
}


const mockDataTyped = mockData as unknown as MockData;


// Add this interface for button position
interface Position {
  x: number;
  y: number;
}
// Add font classes at the top of the file
const fontClasses = {
  heading: 'font-neosans-bold',
  subheading: 'font-neosans-medium',
  body: 'font-roboto'
};

export default function MajorsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MajorsPageContent />
    </Suspense>
  );
}

function MajorsPageContent() {
  const [filters, setFilters] = useState<MajorFilterOptions>({
    generalMajor: null,
    narrowMajor: null,
    specificMajor: null
  });

  // Add state for modal
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [buttonPosition, setButtonPosition] = useState<Position | null>(null);

  const searchParams = useSearchParams();

   // Read URL parameters and set initial filter state
   useEffect(() => {
    const generalMajor = searchParams.get('generalMajor');
    if (generalMajor) {
      setFilters(prev => ({
        ...prev,
        generalMajor: decodeURIComponent(generalMajor)
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const occupation = searchParams.get('occupation');
    if (occupation) {
      setFilters(prev => ({
        ...prev,
        occupation: decodeURIComponent(occupation)
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const gender = searchParams.get('gender');
    if (gender) {
      setFilters(prev => ({
        ...prev,
        gender: decodeURIComponent(gender)
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const timing = searchParams.get('timing');
    if (timing) {
      setFilters(prev => ({
        ...prev,
        timing: decodeURIComponent(timing)
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const salary = searchParams.get('salary');
    if (salary) {
      setFilters(prev => ({
        ...prev,
        salary: decodeURIComponent(salary)
      }));
    }
  }, [searchParams]);

   // Read URL parameters and set initial filter state
   useEffect(() => {
    const generalMajor = searchParams.get('generalMajor');
    if (generalMajor) {
      setFilters(prev => ({
        ...prev,
        generalMajor: decodeURIComponent(generalMajor)
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const occupation = searchParams.get('occupation');
    if (occupation) {
      setFilters(prev => ({
        ...prev,
        occupation: decodeURIComponent(occupation)
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const gender = searchParams.get('gender');
    if (gender) {
      setFilters(prev => ({
        ...prev,
        gender: decodeURIComponent(gender)
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const timing = searchParams.get('timing');
    if (timing) {
      setFilters(prev => ({
        ...prev,
        timing: decodeURIComponent(timing)
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const salary = searchParams.get('salary');
    if (salary) {
      setFilters(prev => ({
        ...prev,
        salary: decodeURIComponent(salary)
      }));
    }
  }, [searchParams]);

  // Read URL parameters and set initial filter state
  useEffect(() => {
    const generalMajor = searchParams.get('generalMajor');
    if (generalMajor) {
      setFilters(prev => ({
        ...prev,
        generalMajor: decodeURIComponent(generalMajor)
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const occupation = searchParams.get('occupation');
    if (occupation) {
      setFilters(prev => ({
        ...prev,
        occupation: decodeURIComponent(occupation)
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const gender = searchParams.get('gender');
    if (gender) {
      setFilters(prev => ({
        ...prev,
        gender: decodeURIComponent(gender)
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const timing = searchParams.get('timing');
    if (timing) {
      setFilters(prev => ({
        ...prev,
        timing: decodeURIComponent(timing)
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    const salary = searchParams.get('salary');
    if (salary) {
      setFilters(prev => ({
        ...prev,
        salary: decodeURIComponent(salary)
      }));
    }
  }, [searchParams]);

  // Get general majors from the mock data
  const generalMajors = mockData.majorsInsights.overall.basicMetrics
    .filter((item): item is OverallBasicMetric => 'generalMajor' in item)
    .map(item => item.generalMajor);
  // Filter change handlers
  const handleGeneralMajorChange = (value: string) => {
    setFilters(({
      generalMajor: value === 'ALL_GENERAL_MAJORS' ? null : value,
      narrowMajor: null,  // Reset narrow major when general major changes
      specificMajor: null
    }));
  };


  // Force a re-render when filters change
  useEffect(() => {
    // This will trigger a re-render of all components that depend on filters
  }, [filters.generalMajor, filters.narrowMajor]);

  // Add this function to get narrow majors data for the chart
  const getTopNarrowMajorsData = (generalMajor: string | null, narrowMajor: string | null) => {
    if (!generalMajor) {
      // Case 1: All General Majors - use majorsInsights/overall/basicMetrics
      return mockDataTyped.majorsInsights.overall.basicMetrics
        .toSorted((a, b) => b.graduates - a.graduates)
        .slice(0, 5)
        .map(item => ({
          narrowMajor: 'generalMajor' in item ? item.generalMajor : item.narrowMajor || '',
          value: item.graduates
      }));
    }
    
    const generalMajorData = mockDataTyped.majorsInsights.byGeneralMajor.generalMajors.find(
      item => item.name === generalMajor
    );
    if (!generalMajorData) return [];

    if (!narrowMajor) {
      // Case 2: Specific General Major - use majorsInsights/byGeneralMajor/generalMajors/overall/basicMetrics
      const sortedMetrics = generalMajorData.overall.basicMetrics
        .toSorted((a, b) => b.graduates - a.graduates);
      return sortedMetrics
        .slice(0, 5)
        .map(item => ({
          narrowMajor: 'narrowMajor' in item ? item.narrowMajor : item.generalMajor || '',
          value: item.graduates
        }));
    }

    // Case 3: Narrow Major - use majorsInsights/byGeneralMajor/generalMajors/byNarrowMajor/narrowMajors/overall/basicMetrics
    const narrowMajorData = generalMajorData.byNarrowMajor?.narrowMajors.find(
      item => item.name === narrowMajor
    );
    if (!narrowMajorData?.overall?.basicMetrics) return [];

    return narrowMajorData.overall.basicMetrics
      .toSorted((a, b) => b.graduates - a.graduates)
      .slice(0, 5)
      .map(item => ({
        narrowMajor: item.name || '',
        value: item.graduates
    }));
  };


  // Update the getTopMajorsByPopularOccupationsData function with correct data mapping
  const getTopMajorsByPopularOccupationsData = (generalMajor: string | null, narrowMajor: string | null) => {
    if (!generalMajor) {
      // Case 1: All General Majors - use majorsInsights/overall/topMajorsByOccupation
      const occupations = mockData.majorsInsights.overall.topMajorsByOccupation?.occupations || [];
      const totalGraduates = occupations.reduce((sum: number, curr: Occupation) => sum + curr.metrics.graduates, 0);
      
      return occupations.map((occupation: Occupation) => ({
        occupation: occupation.name,
        graduates: occupation.metrics.graduates,
        averageSalary: occupation.metrics.averageSalary,
        employmentRate: occupation.metrics.employmentRate,
        percentage: (occupation.metrics.graduates / totalGraduates) * 100
      }));
    }

    const generalMajorData = mockData.majorsInsights.byGeneralMajor.generalMajors.find(
      item => item.name === generalMajor
    );
    if (!generalMajorData) return [];

    if (!narrowMajor) {
      // Case 2: Specific General Major - use majorsInsights/byGeneralMajor/generalMajors/overall/topMajorsByOccupation
      const occupations = generalMajorData.overall.topMajorsByOccupation?.occupations || [];
      const totalGraduates = occupations.reduce((sum: number, curr: Occupation) => sum + curr.metrics.graduates, 0);
      
      return occupations.map((occupation: Occupation) => ({
        occupation: occupation.name,
        graduates: occupation.metrics.graduates,
        averageSalary: occupation.metrics.averageSalary,
        employmentRate: occupation.metrics.employmentRate,
        percentage: (occupation.metrics.graduates / totalGraduates) * 100
      }));
    }

    // Case 3: Narrow Major - use majorsInsights/byGeneralMajor/generalMajors/byNarrowMajor/narrowMajors/overall/topMajorsByOccupation
    const narrowMajorData = generalMajorData.byNarrowMajor?.narrowMajors.find(
      item => item.name === narrowMajor
    );
    if (!narrowMajorData?.overall?.topMajorsByOccupation?.occupations) return [];

    const occupations = narrowMajorData.overall.topMajorsByOccupation.occupations;
    const totalGraduates = occupations.reduce((sum: number, curr: Occupation) => sum + curr.metrics.graduates, 0);

    return occupations.map((occupation: Occupation) => ({
      occupation: occupation.name,
      graduates: occupation.metrics.graduates,
      averageSalary: occupation.metrics.averageSalary,
      employmentRate: occupation.metrics.employmentRate,
      percentage: (occupation.metrics.graduates / totalGraduates) * 100
    }));
  };


  // Update the data fetching functions to handle all filter cases
  

  // Update the getGenderDistributionData function
  const getGenderDistributionData = (): GenderDistribution[] => {
    const { generalMajor, narrowMajor } = filters;
    const genderData = mockDataTyped.majorsInsights.overall.genderDistribution;

    // Case 1: No general major selected
    if (!generalMajor) {
      return Array.isArray(genderData) ? genderData : [genderData];
    }

    // Case 2: General major selected
    if (!Array.isArray(genderData)) return [];
    
    const selectedGeneralMajorData = genderData.find(
      item => item.generalMajor === generalMajor
    );

    if (!selectedGeneralMajorData) return [];

    // If no narrow major is selected, return the general major data
    if (!narrowMajor) {
      return [selectedGeneralMajorData];
    }

    // Case 3: Both general and narrow major selected
    const generalMajorData = mockDataTyped.majorsInsights.byGeneralMajor.generalMajors
      .find(major => major.name === generalMajor);

    if (!generalMajorData) return [];

    const genderDistribution = generalMajorData.overall.genderDistribution;
    if (!Array.isArray(genderDistribution)) return [];

    const narrowMajorData = genderDistribution.find(
      major => major.narrowMajor === narrowMajor
    );

    if (!narrowMajorData) return [];

    return [{
      generalMajor,
      narrowMajor,
      male: narrowMajorData.male,
      female: narrowMajorData.female
    }];
  };

  // Update the getSalaryDistributionData function
  const getSalaryDistributionData = (): SalaryDistribution[] => {
    const { generalMajor, narrowMajor } = filters;

    // Case 1: No general major selected
    if (!generalMajor) {
      const sortedData = mockData.majorsInsights.overall.salaryDistribution
        .toSorted((a, b) => b.percentage - a.percentage);
      return sortedData.slice(0, 5);
    }

    // Find the general major data
    const generalMajorData = mockData.majorsInsights.byGeneralMajor.generalMajors
      .find(major => major.name === generalMajor);

    if (!generalMajorData) return [];

    // Case 2: General major selected, but no narrow major
    if (!narrowMajor) {
      const sortedData = generalMajorData.overall.salaryDistribution
        .toSorted((a, b) => b.percentage - a.percentage);
      return sortedData.slice(0, 5);
    }

    // Case 3: Both general and narrow major selected
    const narrowMajorData = generalMajorData.byNarrowMajor?.narrowMajors
      .find(major => major.name === narrowMajor);

    if (!narrowMajorData) return [];

    const sortedData = narrowMajorData.overall.salaryDistribution
      .toSorted((a, b) => b.percentage - a.percentage);
    return sortedData.slice(0, 5);
  };

  // Function to get employment timeline data based on selected filters
  const getEmploymentTimelineData = (filters: MajorFilterOptions): EmploymentTimeline[] => {
    const { generalMajor, narrowMajor } = filters;

    // Case 1: No general major selected
    if (!generalMajor) {
      // Limit to top 5 entries from overall timeline
      return mockData.majorsInsights.overall.employmentTimeline.slice(0, 5);
    }

    // Find the general major data
    const generalMajorData = mockData.majorsInsights.byGeneralMajor.generalMajors
      .find(major => major.name === generalMajor);

    if (!generalMajorData) return [];

    // Case 2: General major selected, but no narrow major
    if (!narrowMajor) {
      return generalMajorData.overall.employmentTimeline
        .map(item => ({
          ...item,
          generalMajor: item.narrowMajor
        }))
        .slice(0, 5);
    }

    // Case 3: Both general and narrow major selected
    const narrowMajorData = generalMajorData.byNarrowMajor?.narrowMajors
      .find(major => major.name === narrowMajor);

    if (!narrowMajorData?.overall?.employmentTimeline) return [];

    // Return top 5 employment timeline entries for the selected narrow major
    return narrowMajorData.overall.employmentTimeline
      .map(item => ({
        ...item,
        generalMajor: item.name || narrowMajor
      }))
      .slice(0, 5); // Limit to top 5 entries
  };

  // Add these functions with the other data fetching functions
  const getTopMajorsGenderGapData = () => {
    return mockData.majorsInsights.overall.topGeneralMajorsInsights.byGenderGap.rankings.rankings.map(item => ({
      generalMajor: item.generalMajor,
      malePercentage: item.malePercentage,
      femalePercentage: item.femalePercentage,
      genderGap: item.genderGap
    }));
  };

  const getTopOccupationsGenderGapData = (filters: MajorFilterOptions) => {
    const { generalMajor, narrowMajor } = filters;

    // Case 1: No general major selected - use majorsInsights/overall/topMajorsByOccupation/occupations
    if (!generalMajor) {
      return mockDataTyped.majorsInsights.overall.topMajorsByOccupation?.occupations.map(occupation => ({
        name: occupation.name,
        malePercentage: occupation.metrics.genderDistribution?.male?.percentage || 0,
        femalePercentage: occupation.metrics.genderDistribution?.female?.percentage || 0,
        genderGap: (occupation.metrics.genderDistribution?.male?.percentage || 0) - 
                  (occupation.metrics.genderDistribution?.female?.percentage || 0)
      })) || [];
    }

    // Case 2: General major selected (no narrow major)
    // Use majorsInsights/byGeneralMajor/generalMajors/overall/topMajorsByOccupation/occupations
    const selectedGeneralMajor = mockDataTyped.majorsInsights.byGeneralMajor.generalMajors.find(
      major => major.name === generalMajor
    );
    if (!selectedGeneralMajor) return [];

    if (!narrowMajor) {
      return selectedGeneralMajor.overall.topMajorsByOccupation?.occupations.map(occupation => ({
        name: occupation.name,
        malePercentage: occupation.metrics.genderDistribution?.male?.percentage || 0,
        femalePercentage: occupation.metrics.genderDistribution?.female?.percentage || 0,
        genderGap: (occupation.metrics.genderDistribution?.male?.percentage || 0) - 
                  (occupation.metrics.genderDistribution?.female?.percentage || 0)
      })) || [];
    }

    // Case 3: Both general and narrow major selected
    // Use majorsInsights/byGeneralMajor/generalMajors/byNarrowMajor/narrowMajors/topMajorsByOccupation/occupations
    const selectedNarrowMajor = selectedGeneralMajor.byNarrowMajor?.narrowMajors.find(
      major => major.name === narrowMajor
    );
    if (!selectedNarrowMajor) return [];

    return selectedNarrowMajor.overall.topMajorsByOccupation?.occupations.map(occupation => ({
      name: occupation.name,
      malePercentage: occupation.metrics.genderDistribution?.male?.percentage || 0,
      femalePercentage: occupation.metrics.genderDistribution?.female?.percentage || 0,
      genderGap: (occupation.metrics.genderDistribution?.male?.percentage || 0) - 
                (occupation.metrics.genderDistribution?.female?.percentage || 0)
    })) || [];
  };

  // Function to get top majors by gender gap based on selected filters
  const getTopMajorsGenderGap = (filters: MajorFilterOptions) => {
    const { generalMajor, narrowMajor } = filters;

    if (!generalMajor) {
      // If no general major is selected
      return mockDataTyped.majorsInsights.overall.topGeneralMajorsInsights.byGenderGap.rankings.rankings;
    } else if (generalMajor && !narrowMajor) {
      // If only general major is selected
      return mockDataTyped.majorsInsights.byGeneralMajor.generalMajors.find(
        major => major.name === generalMajor
      )?.overall.topNarrowMajorsInsights?.byGenderGap?.rankings || [];
    } else if (generalMajor && narrowMajor) {
      // If both general and narrow major are selected
      const selectedMajor = mockDataTyped.majorsInsights.byGeneralMajor.generalMajors.find(
        major => major.name === generalMajor
      );
      const selectedNarrowMajor = selectedMajor?.byNarrowMajor?.narrowMajors.find(
        major => major.name === narrowMajor
      );
      const rankings = selectedNarrowMajor?.overall.topMajorsInsights?.byGenderGap?.rankings || [];
      return rankings.map(item => ({
        ...item,
        narrowMajor: item.name // Map the name field to narrowMajor
      }));
    }
    return [];
  };

  // Function to get summary card data based on selected filters
  const getSummaryCardData = () => {
    const { generalMajor, narrowMajor } = filters;

    // Case 1: No general major selected
    if (!generalMajor) {
      return mockData.majorsInsights.overall.basicMetrics[0];  // Use first basic metric instead of totalMetrics
    }

    // Case 2: General major selected, but no narrow major
    if (!narrowMajor) {
      const selectedMajorMetrics = mockData.majorsInsights.overall.basicMetrics
        .find((major): major is OverallBasicMetric => 
          'generalMajor' in major && major.generalMajor === generalMajor
        );
      
      if (!selectedMajorMetrics) return null;
      return selectedMajorMetrics;
    }

    // Case 3: Both general and narrow major selected
    // Find the general major data
    const generalMajorData = mockData.majorsInsights.byGeneralMajor.generalMajors
      .find(major => major.name === generalMajor);

    if (!generalMajorData) return null;

    // Extract the selected narrow major from basicMetrics list
    const selectedNarrowMajorMetrics = generalMajorData.overall.basicMetrics
      .find((major): major is NarrowBasicMetric => 
        'narrowMajor' in major && major.narrowMajor === narrowMajor
      );

    return selectedNarrowMajorMetrics || null;
  };

  // Helper function to safely format numbers
  const formatNumber = (value: number | undefined) => {
    return value?.toLocaleString() || '0';
  };

  // Helper function to safely format percentages
  const formatPercentage = (value: number | undefined) => {
    return value ? `${value}%` : '0%';
  };

  // Helper function to safely format currency
  const formatCurrency = (value: number | undefined) => {
    return value ? `SAR ${value.toLocaleString()}` : 'SAR 0';
  };

  // Helper function to safely format days
  const formatDays = (value: number | undefined) => {
    return value ? `${value} days` : '0 days';
  };

  return (
    <div className="space-y-6 p-4">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className={`${fontClasses.heading} text-white text-sm`}>Select General Major</h2>
          {filters.generalMajor && (
            <button
              onClick={() => setFilters({ generalMajor: null, narrowMajor: null, specificMajor: null })}
              className="px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200
                bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-md 
                hover:from-red-700 hover:to-red-800 flex items-center gap-2"
            >
              <X size={16} />
              Clear Selection
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {generalMajors.map((major) => (
            <button
              key={major}
              onClick={() => handleGeneralMajorChange(major)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                filters.generalMajor === major
                  ? 'bg-[#a9267f] text-white'
                  : 'bg-[#1a2657] text-gray-300 hover:bg-[#2e365f]'
              }`}
            >
              {major}
            </button>
          ))}
        </div>
        
        {/* Rest of the filters section */}
        {filters.generalMajor && (
          <div className="mt-4 flex items-center gap-2">
            {/* ... narrow major select ... */}
          </div>
        )}
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
        {/* Graduates Card */}
        <div className="bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-400 text-sm">Total Graduates</div>
            <Users className="text-[#2AB1BB] w-6 h-6" />
          </div>
          <div className="text-white text-2xl font-semibold">
            {formatNumber(getSummaryCardData()?.graduates)}
          </div>
        </div>
        {/* Employment Rate Card */}
        <div className="bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-400 text-sm">Employment Rate</div>
            <Briefcase className="text-[#2E6BB2] w-6 h-6" />
          </div>
          <div className="text-white text-2xl font-semibold">
            {formatPercentage(getSummaryCardData()?.employmentRate)}
          </div>
        </div>
        {/* Average Salary Card */}
        <div className="bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-400 text-sm">Average Salary</div>
            <DollarSign className="text-[#AC4863] w-6 h-6" />
          </div>
          <div className="text-white text-2xl font-semibold">
            {formatCurrency(getSummaryCardData()?.averageSalary).replace('$', 'SAR ')}
          </div>
        </div>
        {/* Time to Employment Card */}
        <div className="bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-400 text-sm">Average Time to Employment</div>
            <Clock className="text-[#1F5B58] w-6 h-6" />
          </div>
          <div className="text-white text-2xl font-semibold">
            {formatDays(getSummaryCardData()?.timeToEmployment)}
          </div>
        </div>
      </div>

      
      {/* Gender Distribution and Gender Gap Section */}
      <div className="mt-8">

        {/* Three Chart Layout - Always show */}
       
        <div id="gender-insights" className="mt-8">
          <h2 className="text-white text-xl font-semibold mb-4">Gender Distribution</h2>
        <div className="grid grid-cols-3 gap-4 w-full">
            {!filters.generalMajor ? (
              <>
                <div>
                  <GenderDistributionChart 
                    generalMajor={filters.generalMajor}
                    data={getGenderDistributionData()}
                  />
                </div>
                <div>
                  <TopMajorsGenderGapChart 
                    generalMajor={filters.generalMajor}
                    data={getTopMajorsGenderGapData()}
                    onBarClick={(narrowMajor) => {
                      setFilters(prev => ({
                        ...prev,
                        narrowMajor: narrowMajor
                      }));
                    }}
                    onGeneralMajorSelect={(generalMajor) => {
                      setFilters(prev => ({
                        ...prev,
                        generalMajor: generalMajor,
                        narrowMajor: null,
                        specificMajor: null
                      }));
                    }}
                  />
                </div>
                <div>
                  <TopOccupationsGenderGapChart 
                    generalMajor={filters.generalMajor}
                    data={getTopOccupationsGenderGapData(filters)}
                    onBarClick={(narrowMajor) => {
                      setFilters(prev => ({
                        ...prev,
                        narrowMajor: narrowMajor
                      }));
                    }}
                    onGeneralMajorSelect={(generalMajor) => {
                      setFilters(prev => ({
                        ...prev,
                        generalMajor: generalMajor,
                        narrowMajor: null,
                        specificMajor: null
                      }));
                    }}
                  />
                </div>
              </>
            ) : (
              <>
          <div>
            <GenderDistributionChart 
              generalMajor={filters.generalMajor}
              data={getGenderDistributionData()}
            />
              </div>
          <div>
            <TopMajorsGenderGapChart 
              generalMajor={filters.generalMajor}
              data={getTopMajorsGenderGap(filters)}
              onBarClick={(narrowMajor) => {
                setFilters(prev => ({
                  ...prev,
                  narrowMajor: narrowMajor
                }));
              }}
              onGeneralMajorSelect={(generalMajor) => {
                setFilters(prev => ({
                  ...prev,
                  generalMajor: generalMajor,
                  narrowMajor: null,
                  specificMajor: null
                }));
              }}
            />
              </div>
          <div>
            <TopOccupationsGenderGapChart 
              generalMajor={filters.generalMajor}
              data={getTopOccupationsGenderGapData(filters)}
              onBarClick={(narrowMajor) => {
                setFilters(prev => ({
                  ...prev,
                  narrowMajor: narrowMajor
                }));
              }}
              onGeneralMajorSelect={(generalMajor) => {
                setFilters(prev => ({
                  ...prev,
                  generalMajor: generalMajor,
                  narrowMajor: null,
                  specificMajor: null
                }));
              }}
            />
              </div>
              </>
            )}
            </div>
              </div>
      </div>

      {/* Top General Majors Insights Section */}
      <div id="general-majors-insights" className="mt-8">        
        <h2 className={`${fontClasses.heading} text-white text-xl mb-4`}>Major Insights</h2>
        <div id="general-majors-insights" className="mt-8">        

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 w-full">
            <TopNarrowMajorsChart 
              generalMajor={filters.generalMajor}
              narrowMajor={filters.narrowMajor}
              data={getTopNarrowMajorsData(filters.generalMajor, filters.narrowMajor)}
              onBarClick={(narrowMajor) => {
                setFilters(prev => ({
                  ...prev,
                  narrowMajor: narrowMajor
                }));
              }}
              onGeneralMajorSelect={(generalMajor) => {
                handleGeneralMajorChange(generalMajor);
              }}
            />
            <TopMajorsByPopularOccupationsChart 
              generalMajor={filters.generalMajor}
              narrowMajor={filters.narrowMajor}
              data={getTopMajorsByPopularOccupationsData(filters.generalMajor, filters.narrowMajor)}
            />
            <SalaryDistributionChart 
            generalMajor={filters.generalMajor}
            data={getSalaryDistributionData()}
            onBarClick={(narrowMajor) => {
              setFilters(prev => ({
                ...prev,
                narrowMajor: narrowMajor
              }));
            }}
            onGeneralMajorSelect={(generalMajor) => {
              setFilters(prev => ({
                ...prev,
                generalMajor: generalMajor,
                narrowMajor: null,
                specificMajor: null
              }));
            }}
          />
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            
          </div>        
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-300px">
            {/* <h3 className={`${fontClasses.subheading} text-white text-lg mb-4`}>Employment Timeline Analysis</h3> */}
            <EmploymentTimelineChart 
              generalMajor={filters.generalMajor}
              data={getEmploymentTimelineData(filters)}
              onBarClick={(narrowMajor) => {
                setFilters(prev => ({
                  ...prev,
                  narrowMajor: narrowMajor
                }));
              }}
              onGeneralMajorSelect={(generalMajor) => {
                setFilters(prev => ({
                  ...prev,
                  generalMajor: generalMajor,
                  narrowMajor: null,
                  specificMajor: null
                }));
              }}
            />
          </div>
    </div>
    </div>
  );}