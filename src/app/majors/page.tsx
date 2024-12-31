'use client';

import React, { useState, useEffect, Suspense } from 'react';
// import { Major, NarrowMajorMetrics } from './types';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectGroup,
} from '@/components/ui/select';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from 'recharts';
import { useSearchParams } from 'next/navigation';

import mockData from './major_mock/mock_data_major.json';
import TopNarrowMajorsChart from './components/TopNarrowMajorsChart';
import TopEmployableNarrowMajorsChart from './components/TopEmployableNarrowMajorsChart';
import TopPaidNarrowMajorsChart from './components/TopPaidNarrowMajorsChart';
import TopMajorsByPopularOccupationsChart from './components/TopMajorsByPopularOccupationsChart';
import TopMajorsByMostEmployedOccupationChart from './components/TopMajorsByMostEmployedOccupationChart';
import TopMajorsByHighestPaidOccupationChart from './components/TopMajorsByHighestPaidOccupationChart';
import GenderDistributionChart from './components/GenderDistributionChart';
import SalaryDistributionChart from './components/SalaryDistributionChart';
import EmploymentTimingChart from './components/EmploymentTimingChart';
import EmploymentTimelineChart from './components/EmploymentTimelineChart';
// import GraduateDistributionTreeMap from './components/GraduateDistributionTreeMap';
import TopMajorsGenderGapChart from './components/TopMajorsGenderGapChart';
import TopOccupationsGenderGapChart from './components/TopOccupationsGenderGapChart';

interface MajorFilterOptions {
  generalMajor: string | null;
  narrowMajor: string | null;
  specificMajor: string | null;
}

interface OverallBasicMetric {
  generalMajor: string;
  graduates: number;
  graduatesPercentage: number;
  employmentRate: number;
  averageSalary: number;
  timeToEmployment: number;
}

interface NarrowBasicMetric {
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

// interface NarrowMajorData {
//   name: string;
//   salaryDistribution: SalaryDistribution[];
// }

interface GeneralMajor {
  name: string;
  overall: {
    basicMetrics: BasicMetric[];
    topOccupationsByIndustry: TopOccupationsByIndustry;
    topOccupationsInsights: TopOccupationsInsights;
    topMajorsByOccupation?: TopMajorsByOccupation;
    genderDistribution: GenderDistribution;
    employmentTiming: EmploymentTiming;
    employmentTimeline: EmploymentTimeline;
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
        employmentTimeline: EmploymentTimeline;
      };
    }>;
  };
}

interface OccupationMetrics {
  graduates: number;
  employmentRate: number;
  averageSalary: number;
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

// interface Overall {
//   basicMetrics: BasicMetric[];
//   topOccupationsByIndustry: TopOccupationsByIndustry;
//   topOccupationsInsights: TopOccupationsInsights;
//   topMajorsByOccupation?: TopMajorsByOccupation;
//   genderDistribution: GenderDistribution;
//   employmentTiming: EmploymentTiming;
//   employmentTimeline: EmploymentTimeline;
// }

interface MajorsInsights {
  overall: {
    basicMetrics: BasicMetric[];
    topOccupationsByIndustry: TopOccupationsByIndustry;
    topOccupationsInsights: TopOccupationsInsights;
    topMajorsByOccupation?: TopMajorsByOccupation;
    genderDistribution: GenderDistribution;
    employmentTiming: EmploymentTiming;
    employmentTimeline: EmploymentTimeline;
  };
  byGeneralMajor: {
    generalMajors: GeneralMajor[];
  };
}

interface MockData {
  majorsInsights: MajorsInsights;
}

// interface WaitingPeriod {
//   period: string;
//   percentage: number;
// }

// interface BasicMetrics {
//   generalMajor?: string;
//   narrowMajor?: string;
//   occupation?: string;
//   graduates: number;
//   graduatesPercentage: number;
//   employmentRate: number;
//   averageSalary: number;
//   timeToEmployment: number;
// }

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
  withinFirstYear: {
    count: number;
    percentage: number;
  };
  afterFirstYear: {
    count: number;
    percentage: number;
  };
}

interface EmploymentTimeline {
  generalMajor: string;
  averageTime: number;
  quickEmploymentRate: number;
  waitingPeriods: Array<{
    period: string;
    percentage: number;
  }>;
}

// interface MappedDataResult {
//   basicMetrics: BasicMetrics[];
//   genderDistribution?: GenderDistribution[] | Omit<GenderDistribution, 'generalMajor'>;
//   salaryDistribution?: SalaryDistribution[] | Omit<SalaryDistribution, 'generalMajor' | 'narrowMajor' | 'occupation'>;
//   employmentTiming?: EmploymentTiming[] | Omit<EmploymentTiming, 'generalMajor'>;
//   employmentTimeline?: EmploymentTimeline[] | Omit<EmploymentTimeline, 'generalMajor'>;
//   topMajorsByOccupation?: TopMajorsByOccupation;
// }

// interface OccupationData {
//   occupation: string;
//   graduates: number;
//   graduatesPercentage: number;
//   employmentRate: number;
//   averageSalary: number;
//   timeToEmployment: number;
// }

const mockDataTyped = mockData as unknown as MockData;

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

  // Get general majors from the mock data
  const generalMajors = mockData.majorsInsights.overall.basicMetrics.map(
    item => item.generalMajor
  );

  // Get narrow majors based on selected general major
  const getNarrowMajors = (generalMajor: string | null) => {
    if (!generalMajor) return [];
    const majorData = mockData.majorsInsights.byGeneralMajor.generalMajors.find(
      item => item.name === generalMajor
    );
    return majorData?.byNarrowMajor?.narrowMajors?.map(item => item.name) || [];
  };

  // Get specific majors based on selected narrow major
  const getSpecificMajors = (generalMajor: string | null, narrowMajor: string | null) => {
    if (!generalMajor || !narrowMajor) return [];
    const majorData = mockData.majorsInsights.byGeneralMajor.generalMajors.find(
      item => item.name === generalMajor
    );
    const narrowMajorData = majorData?.byNarrowMajor.narrowMajors.find(
      item => item.name === narrowMajor
    );
    return narrowMajorData?.overall.basicMetrics.map(item => item.occupation) || [];
  };

  // Filter change handlers
  const handleGeneralMajorChange = (value: string) => {
    setFilters({
      generalMajor: value === 'ALL_GENERAL_MAJORS' ? null : value,
      narrowMajor: null,
      specificMajor: null
    });
  };

  const handleNarrowMajorChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      narrowMajor: value === 'ALL_NARROW_MAJORS' ? null : value,
      specificMajor: null
    }));
  };

  const handleSpecificMajorChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      specificMajor: value === 'ALL_SPECIFIC_MAJORS' ? null : value
    }));
  };

  const narrowMajors = getNarrowMajors(filters.generalMajor);
  const specificMajors = getSpecificMajors(filters.generalMajor, filters.narrowMajor);

  // Add this function to get narrow majors data for the chart
  const getTopNarrowMajorsData = (generalMajor: string | null, narrowMajor: string | null) => {
    if (!generalMajor) {
      // Case 1: All General Majors - use majorsInsights/overall/basicMetrics
      return mockDataTyped.majorsInsights.overall.basicMetrics
        .sort((a, b) => b.graduates - a.graduates)
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
      return generalMajorData.overall.basicMetrics
        .sort((a, b) => b.graduates - a.graduates)
        .slice(0, 5)
        .map(item => ({
          narrowMajor: 'narrowMajor' in item ? item.narrowMajor : '',
          value: item.graduates
        }));
    }

    // Case 3: Narrow Major - use majorsInsights/byGeneralMajor/generalMajors/byNarrowMajor/narrowMajors/overall/basicMetrics
    const narrowMajorData = generalMajorData.byNarrowMajor?.narrowMajors.find(
      item => item.name === narrowMajor
    );
    if (!narrowMajorData?.overall?.basicMetrics) return [];

    return narrowMajorData.overall.basicMetrics
      .sort((a, b) => b.graduates - a.graduates)
      .slice(0, 5)
      .map(item => ({
        narrowMajor: typeof item === 'object' && item !== null && 'occupation' in item ? String(item.occupation) : '',
        value: item.graduates
    }));
  };

  // Add this function next to your other data fetching functions
  const getTopEmployableNarrowMajorsData = (generalMajor: string | null, narrowMajor: string | null) => {
    if (!generalMajor) {
      // Case 1: All General Majors - use majorsInsights/overall/basicMetrics
      return mockDataTyped.majorsInsights.overall.basicMetrics
        .sort((a, b) => b.employmentRate - a.employmentRate)
        .slice(0, 5)
        .map(item => ({
          narrowMajor: 'generalMajor' in item ? item.generalMajor : item.narrowMajor || '',
          value: item.employmentRate
      }));
    }
    
    const generalMajorData = mockDataTyped.majorsInsights.byGeneralMajor.generalMajors.find(
      item => item.name === generalMajor
    );
    if (!generalMajorData) return [];

    if (!narrowMajor) {
      // Case 2: Specific General Major - use majorsInsights/byGeneralMajor/generalMajors/overall/basicMetrics
      return generalMajorData.overall.basicMetrics
        .sort((a, b) => b.employmentRate - a.employmentRate)
        .slice(0, 5)
        .map(item => ({
          narrowMajor: 'narrowMajor' in item ? item.narrowMajor : '',
          value: item.employmentRate
        }));
    }

    // Case 3: Narrow Major - use majorsInsights/byGeneralMajor/generalMajors/byNarrowMajor/narrowMajors/overall/basicMetrics
    const narrowMajorData = generalMajorData.byNarrowMajor?.narrowMajors.find(
      item => item.name === narrowMajor
    );
    if (!narrowMajorData?.overall?.basicMetrics) return [];

    return narrowMajorData.overall.basicMetrics
      .sort((a, b) => b.employmentRate - a.employmentRate)
      .slice(0, 5)
      .map(item => ({
        narrowMajor: typeof item === 'object' && item !== null && 'occupation' in item ? String(item.occupation) : '',
        value: item.employmentRate
    }));
  };

  // Add this function with your other data fetching functions
  const getTopPaidNarrowMajorsData = (generalMajor: string | null, narrowMajor: string | null) => {
    if (!generalMajor) {
      // Case 1: All General Majors - use majorsInsights/overall/basicMetrics
      return mockDataTyped.majorsInsights.overall.basicMetrics
        .sort((a, b) => b.averageSalary - a.averageSalary)
        .slice(0, 5)
        .map(item => ({
          narrowMajor: 'generalMajor' in item ? item.generalMajor : item.narrowMajor || '',
          value: item.averageSalary
      }));
    }
    
    const generalMajorData = mockDataTyped.majorsInsights.byGeneralMajor.generalMajors.find(
      item => item.name === generalMajor
    );
    if (!generalMajorData) return [];

    if (!narrowMajor) {
      // Case 2: Specific General Major - use majorsInsights/byGeneralMajor/generalMajors/overall/basicMetrics
      return generalMajorData.overall.basicMetrics
        .sort((a, b) => b.averageSalary - a.averageSalary)
        .slice(0, 5)
        .map(item => ({
          narrowMajor: 'narrowMajor' in item ? item.narrowMajor : '',
          value: item.averageSalary
        }));
    }

    // Case 3: Narrow Major - use majorsInsights/byGeneralMajor/generalMajors/byNarrowMajor/narrowMajors/overall/basicMetrics
    const narrowMajorData = generalMajorData.byNarrowMajor?.narrowMajors.find(
      item => item.name === narrowMajor
    );
    if (!narrowMajorData?.overall?.basicMetrics) return [];

    return narrowMajorData.overall.basicMetrics
      .sort((a, b) => b.averageSalary - a.averageSalary)
      .slice(0, 5)
      .map(item => ({
        narrowMajor: typeof item === 'object' && item !== null && 'occupation' in item ? String(item.occupation) : '',
        value: item.averageSalary
    }));
  };

  // Update the getTopMajorsByPopularOccupationsData function with correct data mapping
  const getTopMajorsByPopularOccupationsData = (generalMajor: string | null, narrowMajor: string | null) => {
    if (!generalMajor) {
      // Case 1: All General Majors - use majorsInsights/overall/topMajorsByOccupation
      const occupations = mockDataTyped.majorsInsights.overall.topMajorsByOccupation?.occupations || [];
      const totalGraduates = occupations.reduce((sum: number, curr: Occupation) => sum + curr.metrics.graduates, 0);
      
      return occupations.map((occupation: Occupation) => ({
          occupation: occupation.name,
          graduates: occupation.metrics.graduates,
        averageSalary: occupation.metrics.averageSalary,
        employmentRate: occupation.metrics.employmentRate,
        percentage: (occupation.metrics.graduates / totalGraduates) * 100
        }));
    }

    const generalMajorData = mockDataTyped.majorsInsights.byGeneralMajor.generalMajors.find(
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

    // Case 3: Narrow Major - use majorsInsights/byGeneralMajor/generalMajors/byNarrowMajor/narrowMajors/overall/topOccupationsInsights
    const narrowMajorData = generalMajorData.byNarrowMajor?.narrowMajors.find(
      item => item.name === narrowMajor
    );
    if (!narrowMajorData?.overall?.topOccupationsInsights) return [];

    const { mostPopular, mostEmployable, highestPaying } = narrowMajorData.overall.topOccupationsInsights;
    const occupationMap = new Map();

    // Combine data from all three arrays
    mostPopular.forEach(item => {
      occupationMap.set(item.occupation, {
        occupation: item.occupation,
        graduates: item.graduates,
        percentage: item.percentage,
        employmentRate: 0,
        averageSalary: 0
      });
    });

    mostEmployable.forEach(item => {
      const existing = occupationMap.get(item.occupation);
      if (existing) {
        existing.employmentRate = item.employmentRate;
      }
    });

    highestPaying.forEach(item => {
      const existing = occupationMap.get(item.occupation);
      if (existing) {
        existing.averageSalary = item.averageSalary;
      }
    });

    return Array.from(occupationMap.values());
  };

  // Update the getTopMajorsByMostEmployedOccupation function with correct data mapping
  const getTopMajorsByMostEmployedOccupation = (generalMajor: string | null, narrowMajor: string | null) => {
    if (!generalMajor) {
      // Case 1: All General Majors - use majorsInsights/overall/topMajorsByOccupation
      const occupations = mockDataTyped.majorsInsights.overall.topMajorsByOccupation?.occupations || [];
      if (occupations.length === 0) return [];

      return occupations
        .sort((a, b) => b.metrics.employmentRate - a.metrics.employmentRate)
        .slice(0, 5)
        .map(occupation => ({
          major: occupation.name,
          employmentRate: occupation.metrics.employmentRate,
          occupation: occupation.name
        }));
    }

    const generalMajorData = mockDataTyped.majorsInsights.byGeneralMajor.generalMajors.find(
      item => item.name === generalMajor
    );
    if (!generalMajorData) return [];

    if (!narrowMajor) {
      // Case 2: Specific General Major - use majorsInsights/byGeneralMajor/generalMajors/overall/topMajorsByOccupation
      const occupations = generalMajorData.overall.topMajorsByOccupation?.occupations || [];
      if (occupations.length === 0) return [];

      return occupations
      .sort((a, b) => b.metrics.employmentRate - a.metrics.employmentRate)
        .slice(0, 5)
        .map(occupation => ({
          major: occupation.name,
          employmentRate: occupation.metrics.employmentRate,
          occupation: occupation.name
        }));
    }

    // Case 3: Narrow Major - use majorsInsights/byGeneralMajor/generalMajors/byNarrowMajor/narrowMajors/overall/topOccupationsInsights
    const narrowMajorData = generalMajorData.byNarrowMajor?.narrowMajors.find(
      item => item.name === narrowMajor
    );
    if (!narrowMajorData?.overall?.topOccupationsInsights?.mostEmployable) return [];

    return narrowMajorData.overall.topOccupationsInsights.mostEmployable
      .sort((a, b) => b.employmentRate - a.employmentRate)
      .slice(0, 5)
      .map(item => ({
        major: item.occupation,
        employmentRate: item.employmentRate,
        occupation: item.occupation
      }));
  };

  // Update the getTopMajorsByHighestPaidOccupation function with correct data mapping
  const getTopMajorsByHighestPaidOccupation = (generalMajor: string | null, narrowMajor: string | null) => {
    if (!generalMajor) {
      // Case 1: All General Majors - use majorsInsights/overall/topMajorsByOccupation
      const occupations = mockDataTyped.majorsInsights.overall.topMajorsByOccupation?.occupations || [];
      if (occupations.length === 0) return [];

      // Find the occupation with the highest average salary
      const highestPaidOccupation = occupations.reduce((max: Occupation, curr: Occupation) => 
        curr.metrics.averageSalary > max.metrics.averageSalary ? curr : max
      , occupations[0]);

      // Return the major distribution for this occupation
      return highestPaidOccupation.majorDistribution
        .sort((a, b) => b.metrics.averageSalary - a.metrics.averageSalary)
        .slice(0, 5)
        .map(item => ({
          major: item.name,
          graduates: item.metrics.graduates,
          employmentRate: item.metrics.employmentRate,
          averageSalary: item.metrics.averageSalary,
          occupation: highestPaidOccupation.name
        }));
    }

    const generalMajorData = mockDataTyped.majorsInsights.byGeneralMajor.generalMajors.find(
      item => item.name === generalMajor
    );
    if (!generalMajorData) return [];

    if (!narrowMajor) {
      // Case 2: Specific General Major - use majorsInsights/byGeneralMajor/generalMajors/overall/topMajorsByOccupation
      const occupations = generalMajorData.overall.topMajorsByOccupation?.occupations || [];
      if (occupations.length === 0) return [];

      // Find the occupation with the highest average salary
      const highestPaidOccupation = occupations.reduce((max: Occupation, curr: Occupation) => 
      curr.metrics.averageSalary > max.metrics.averageSalary ? curr : max
      , occupations[0]);

      // Return the major distribution for this occupation
    return highestPaidOccupation.majorDistribution
      .sort((a, b) => b.metrics.averageSalary - a.metrics.averageSalary)
      .slice(0, 5)
      .map(item => ({
        major: item.name,
          graduates: item.metrics.graduates,
          employmentRate: item.metrics.employmentRate,
          averageSalary: item.metrics.averageSalary,
        occupation: highestPaidOccupation.name
        }));
    }

    // Case 3: Narrow Major - use majorsInsights/byGeneralMajor/generalMajors/byNarrowMajor/narrowMajors/overall/topOccupationsInsights
    const narrowMajorData = generalMajorData.byNarrowMajor?.narrowMajors.find(
      item => item.name === narrowMajor
    );
    if (!narrowMajorData?.overall?.topOccupationsInsights?.highestPaying) return [];

    // Return the highest paying occupations for this narrow major
    return narrowMajorData.overall.topOccupationsInsights.highestPaying
      .sort((a, b) => b.averageSalary - a.averageSalary)
      .slice(0, 5)
      .map(item => ({
        major: item.occupation,
        graduates: item.graduates || 0,
        employmentRate: 0, // This data might not be available in this context
        averageSalary: item.averageSalary,
        occupation: narrowMajor
      }));
  };

  // Update the data fetching functions to handle all filter cases
  

  // Update the getGenderDistributionData function
  const getGenderDistributionData = (): GenderDistribution[] => {
    if (!filters.generalMajor) {
      // Case 1: All General Majors - use majorsInsights/overall/genderDistribution
      return mockData.majorsInsights.overall.genderDistribution.map(item => ({
        generalMajor: item.generalMajor,
        male: item.male,
        female: item.female
      }));
    }

    const generalMajorData = mockData.majorsInsights.byGeneralMajor.generalMajors.find(
      major => major.name === filters.generalMajor
    );
    if (!generalMajorData) return [];

    if (!filters.narrowMajor) {
      // Case 2: Specific General Major - use majorsInsights/byGeneralMajor/generalMajors/overall/genderDistribution
      const genderData = generalMajorData.overall.genderDistribution;
      return [{
        generalMajor: filters.generalMajor,
        male: genderData.male,
        female: genderData.female
      }];
    }

    const narrowMajorData = generalMajorData.byNarrowMajor?.narrowMajors.find(
      major => major.name === filters.narrowMajor
    );
    if (!narrowMajorData) return [];

    if (!filters.specificMajor) {
      // Case 3: Narrow Major - use majorsInsights/byGeneralMajor/generalMajors/byNarrowMajor/narrowMajors/genderDistribution
      const genderData = narrowMajorData.overall.genderDistribution;
      return [{
        generalMajor: filters.generalMajor,
        narrowMajor: filters.narrowMajor,
        male: genderData.male,
        female: genderData.female
      }];
    }

    // Case 4: Specific Major - use majorsInsights/generalMajors/byGeneralMajor/byNarrowMajor/narrowMajors/byMajor/majors/genderDistribution
    const specificMajorData = narrowMajorData.byMajor?.majors.find(
      major => major.name === filters.specificMajor
    );
    if (!specificMajorData?.overall?.genderDistribution) return [];

    const genderData = specificMajorData.overall.genderDistribution;
    return [{
      generalMajor: filters.generalMajor,
      narrowMajor: filters.narrowMajor,
      specificMajor: filters.specificMajor,
      male: genderData.male,
      female: genderData.female
    }];
  };

  // Update the getSalaryDistributionData function
  const getSalaryDistributionData = (): SalaryDistribution[] => {
    if (!filters.generalMajor) {
      // Case 1: All General Majors - use majorsInsights/overall/basicMetrics
      return mockData.majorsInsights.overall.basicMetrics.map(item => ({
        generalMajor: item.generalMajor,
        salary: item.averageSalary,
        percentage: item.graduatesPercentage,
        median: item.averageSalary // Using averageSalary as median since we don't have actual median data
      }));
    }

    const generalMajorData = mockData.majorsInsights.byGeneralMajor.generalMajors.find(
      major => major.name === filters.generalMajor
    );
    if (!generalMajorData) return [];

    if (!filters.narrowMajor) {
      // Case 2: Specific General Major - use majorsInsights/byGeneralMajor/generalMajors/byNarrowMajor/narrowMajors
      return generalMajorData.byNarrowMajor.narrowMajors.map(narrowMajor => {
        const metrics = narrowMajor.overall.basicMetrics[0];
        return {
          narrowMajor: narrowMajor.name,
          salary: metrics.averageSalary,
          percentage: metrics.graduatesPercentage,
          median: metrics.averageSalary
        };
      });
    }

    const narrowMajorData = generalMajorData.byNarrowMajor?.narrowMajors.find(
      major => major.name === filters.narrowMajor
    );
    if (!narrowMajorData) return [];

    // Case 3: Narrow Major - use majorsInsights/byGeneralMajor/generalMajors/byNarrowMajor/narrowMajors/overall/basicMetrics
    return narrowMajorData.overall.basicMetrics.map(metric => ({
      occupation: metric.occupation,
      salary: metric.averageSalary,
      percentage: metric.graduatesPercentage,
      median: metric.averageSalary
    }));
  };

  // Update the getEmploymentTimingData function
  const getEmploymentTimingData = (): EmploymentTiming[] => {
    if (!filters.generalMajor) {
      // Case 1: All General Majors - use majorsInsights/overall/employmentTiming
      return mockData.majorsInsights.overall.employmentTiming;
    }

    const generalMajorData = mockData.majorsInsights.byGeneralMajor.generalMajors.find(
      major => major.name === filters.generalMajor
    );
    if (!generalMajorData) return [];

    if (!filters.narrowMajor) {
      // Case 2: Specific General Major - use generalMajorData/overall/employmentTiming
      const data = generalMajorData.overall.employmentTiming;
      if (!data) return [];

      return [{
        generalMajor: filters.generalMajor,
        beforeGraduation: data.beforeGraduation,
        withinFirstYear: data.withinFirstYear,
        afterFirstYear: data.afterFirstYear
      }];
    }

    // Case 3: Narrow Major - use generalMajorData/byNarrowMajor/narrowMajors/overall/employmentTiming
    const narrowMajorData = generalMajorData.byNarrowMajor?.narrowMajors.find(
      major => major.name === filters.narrowMajor
    );
    if (!narrowMajorData) return [];

    const data = narrowMajorData.overall.employmentTiming;
    if (!data) return [];

    return [{
      generalMajor: filters.narrowMajor,
      beforeGraduation: data.beforeGraduation,
      withinFirstYear: data.withinFirstYear,
      afterFirstYear: data.afterFirstYear
    }];
  };

  // Update the getEmploymentTimelineData function
  const getEmploymentTimelineData = (): EmploymentTimeline[] => {
    if (!filters.generalMajor) {
      // Case 1: All General Majors - use majorsInsights/overall/employmentTimeline
      return mockData.majorsInsights.overall.employmentTimeline;
    }

    const generalMajorData = mockData.majorsInsights.byGeneralMajor.generalMajors.find(
      major => major.name === filters.generalMajor
    );
    if (!generalMajorData) return [];

    if (!filters.narrowMajor) {
      // Case 2: Specific General Major - use generalMajorData/overall/employmentTimeline
      const data = generalMajorData.overall.employmentTimeline;
      if (!data) return [];

      return [{
        generalMajor: filters.generalMajor,
        averageTime: data.averageTime,
        quickEmploymentRate: data.quickEmploymentRate,
        waitingPeriods: data.waitingPeriods
      }];
    }

    // Case 3: Narrow Major - use generalMajorData/byNarrowMajor/narrowMajors/overall/employmentTimeline
    const narrowMajorData = generalMajorData.byNarrowMajor?.narrowMajors.find(
      major => major.name === filters.narrowMajor
    );
    if (!narrowMajorData) return [];

    const data = narrowMajorData.overall.employmentTimeline;
    if (!data) return [];

    return [{
      generalMajor: filters.narrowMajor,
      averageTime: data.averageTime,
      quickEmploymentRate: data.quickEmploymentRate,
      waitingPeriods: data.waitingPeriods
    }];
  };

  // Add these functions with the other data fetching functions
  const getTopMajorsGenderGapData = () => {
    return mockData.OverViewInsights.topGeneralMajors.byGenderGap.rankings.map(item => ({
      generalMajor: item.generalMajor,
      malePercentage: item.malePercentage,
      femalePercentage: item.femalePercentage,
      genderGap: item.genderGap
    }));
  };

  const getTopOccupationsGenderGapData = () => {
    return mockData.OverViewInsights.topISCOOccupations.byGenderGap.rankings.map(item => ({
      name: item.occupation,
      metrics: {
        graduates: 0,
        employmentRate: 0,
        averageSalary: 0,
        genderDistribution: {
          male: { count: 0, percentage: item.malePercentage },
          female: { count: 0, percentage: item.femalePercentage }
        }
      }
    }));
  };

  // Add this function to get the overview metrics data
  const getOverviewMetrics = () => {
    if (filters.generalMajor) {
      const majorData = mockData.majorsInsights.byGeneralMajor.generalMajors.find(
        major => major.name === filters.generalMajor
      );
      if (!majorData) return mockData.majorsInsights.overall.basicMetrics[0];
      return majorData.overall.basicMetrics[0];
    }
    return mockData.majorsInsights.overall.basicMetrics[0];
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg">
        <div className="flex items-start gap-6">
          {/* General Major Select */}
          <div className="flex-1">
            <Select 
              value={filters.generalMajor || 'ALL_GENERAL_MAJORS'} 
              onValueChange={handleGeneralMajorChange}
            >
              <SelectTrigger className="w-full bg-[#0a1230] border-none text-white hover:bg-[#151d3b] transition-colors rounded-md h-11">
                <SelectValue placeholder="All General Majors" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1230] border-[#2e365f]">
                <SelectGroup>
                  <SelectItem value="ALL_GENERAL_MAJORS">All General Majors</SelectItem>
                  {generalMajors.map((major) => (
                    <SelectItem key={major} value={major}>
                      {major}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Narrow Major Select */}
          <div className="flex-1">
            <Select 
              value={filters.narrowMajor || 'ALL_NARROW_MAJORS'} 
              onValueChange={handleNarrowMajorChange}
              disabled={!filters.generalMajor}
            >
              <SelectTrigger className={`w-full rounded-md h-11 ${
                !filters.generalMajor 
                  ? 'bg-transparent border border-[#2e365f] text-gray-500' 
                  : 'bg-[#0a1230] border-none text-white hover:bg-[#151d3b]'
              } transition-colors`}>
                <SelectValue placeholder="All Narrow Majors" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1230] border-[#2e365f]">
                <SelectGroup>
                  <SelectItem value="ALL_NARROW_MAJORS">All Narrow Majors</SelectItem>
                  {narrowMajors.map((major) => (
                    <SelectItem key={major} value={major}>
                      {major}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Specific Major Select */}
          <div className="flex-1">
            <Select 
              value={filters.specificMajor || 'ALL_SPECIFIC_MAJORS'} 
              onValueChange={handleSpecificMajorChange}
              disabled={!filters.narrowMajor}
            >
              <SelectTrigger className={`w-full rounded-md h-11 ${
                !filters.narrowMajor 
                  ? 'bg-transparent border border-[#2e365f] text-gray-500' 
                  : 'bg-[#0a1230] border-none text-white hover:bg-[#151d3b]'
              } transition-colors`}>
                <SelectValue placeholder="All Specific Majors" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a1230] border-[#2e365f]">
                <SelectGroup>
                  <SelectItem value="ALL_SPECIFIC_MAJORS">All Specific Majors</SelectItem>
                  {specificMajors.map((major) => (
                    <SelectItem key={major} value={major}>
                      {major}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Reset Button */}
          {(filters.generalMajor || filters.narrowMajor || filters.specificMajor) && (
            <button 
              onClick={() => setFilters({ generalMajor: null, narrowMajor: null, specificMajor: null })}
              className="h-11 px-4 text-sm text-white/80 bg-[#0a1230] hover:bg-[#151d3b] border-none rounded-md flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {/* Graduates Card */}
        <div className="bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg">
          <div className="text-gray-400 text-sm mb-2">Total Graduates</div>
          <div className="text-white text-2xl font-semibold">
            {getOverviewMetrics().graduates.toLocaleString()}
          </div>
        </div>

        {/* Employment Rate Card */}
        <div className="bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg">
          <div className="text-gray-400 text-sm mb-2">Employment Rate</div>
          <div className="text-white text-2xl font-semibold">
            {getOverviewMetrics().employmentRate}%
          </div>
        </div>

        {/* Average Salary Card */}
        <div className="bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg">
          <div className="text-gray-400 text-sm mb-2">Average Salary</div>
          <div className="text-white text-2xl font-semibold">
            ${getOverviewMetrics().averageSalary.toLocaleString()}
          </div>
        </div>

        {/* Time to Employment Card */}
        <div className="bg-gradient-to-r from-[#1a2657] to-[#1a2657]/90 p-6 rounded-lg">
          <div className="text-gray-400 text-sm mb-2">Average Time to Employment</div>
          <div className="text-white text-2xl font-semibold">
            {getOverviewMetrics().timeToEmployment} days
          </div>
        </div>
      </div>

      {/* Basic Metrics Charts - Only show when no general major is selected */}
      <h2 className="text-white text-xl font-semibold mb-4">Gender Distribution</h2>
      {/* Gender Distribution and Gender Gap Section */}
      <div className="mt-8">
        <div className="grid grid-cols-3 gap-4 w-full">
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
            />
              </div>
          <div>
            <TopOccupationsGenderGapChart 
              generalMajor={filters.generalMajor}
              data={getTopOccupationsGenderGapData()}
            />
              </div>
            </div>
              </div>
      {!filters.generalMajor }

      {/* First group of charts - Top Majors */}
      <h2 className="text-white text-xl font-semibold mb-4">
        {filters.generalMajor 
          ? `Top Narrow Majors Insights`
          : 'Top General Majors Insights'
        }
      </h2>
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

          <TopEmployableNarrowMajorsChart 
            generalMajor={filters.generalMajor}
            narrowMajor={filters.narrowMajor}
            data={getTopEmployableNarrowMajorsData(filters.generalMajor, filters.narrowMajor)}
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
          <TopPaidNarrowMajorsChart 
            generalMajor={filters.generalMajor}
            narrowMajor={filters.narrowMajor}
            data={getTopPaidNarrowMajorsData(filters.generalMajor, filters.narrowMajor)}
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
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          {/* <TopPaidNarrowMajorsChart 
            generalMajor={filters.generalMajor}
            narrowMajor={filters.narrowMajor}
            data={getTopPaidNarrowMajorsData(filters.generalMajor, filters.narrowMajor)}
            onBarClick={(narrowMajor) => {
              setFilters(prev => ({
                ...prev,
                narrowMajor: narrowMajor
              }));
            }}
            onGeneralMajorSelect={(generalMajor) => {
              handleGeneralMajorChange(generalMajor);
            }}
          /> */}
          {/* <TopMajorsGenderGapChart 
            generalMajor={filters.generalMajor}
            data={getTopMajorsGenderGapData()}
          /> */}
        </div>
      </div>

      {/* Second group of charts - Top Major Occupations */}
      <div className="mt-8">
        <h2 className="text-white text-xl font-semibold mb-4">Top Occupations Insights</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 w-full">
            <TopMajorsByPopularOccupationsChart 
              generalMajor={filters.generalMajor}
              narrowMajor={filters.narrowMajor}
              data={getTopMajorsByPopularOccupationsData(filters.generalMajor, filters.narrowMajor)}
            />

            <TopMajorsByMostEmployedOccupationChart 
              generalMajor={filters.generalMajor}
              data={getTopMajorsByMostEmployedOccupation(filters.generalMajor, filters.narrowMajor)}
            />
            <TopMajorsByHighestPaidOccupationChart 
              generalMajor={filters.generalMajor}
              data={getTopMajorsByHighestPaidOccupation(filters.generalMajor, filters.narrowMajor)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            {/* <TopMajorsByHighestPaidOccupationChart 
              generalMajor={filters.generalMajor}
              data={getTopMajorsByHighestPaidOccupation(filters.generalMajor, filters.narrowMajor)}
            /> */}
            {/* <TopOccupationsGenderGapChart 
              generalMajor={filters.generalMajor}
              data={getTopOccupationsGenderGapData()}
            /> */}
          </div>
        </div>
      </div>

      {/* Employment Timing Distribution Section */}
      <div className="mt-8">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="cursor-pointer" onClick={(e) => {
            const data = getEmploymentTimingData();
            if (e.target && data.length > 0) {
              const item = data[0];
              if ('generalMajor' in item && typeof item.generalMajor === 'string') {
                handleGeneralMajorChange(item.generalMajor);
              }
            }
          }}>
            <h3 className="text-white text-lg font-semibold mb-4">Employment Timing Distribution</h3>
            <EmploymentTimingChart 
              generalMajor={filters.generalMajor}
              data={getEmploymentTimingData()}
            />
          </div>
          <div className="cursor-pointer" onClick={(e) => {
            const data = getEmploymentTimelineData();
            if (e.target && data.length > 0 && data[0].generalMajor) {
              handleGeneralMajorChange(data[0].generalMajor);
            }
          }}>
            <h3 className="text-white text-lg font-semibold mb-4">Employment Timeline Analysis</h3>
            <EmploymentTimelineChart 
            generalMajor={filters.generalMajor}
              data={getEmploymentTimelineData()}
          />
          </div>
        </div>
      </div>

      {/* Salary and Gender Distribution Section */}
      <div className="mt-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
        <h2 className="text-white text-xl font-semibold mb-4">Salary Distribution</h2>
          <SalaryDistributionChart 
            generalMajor={filters.generalMajor}
              data={getSalaryDistributionData()}
          />
        </div>
          {/* <div>
            <h2 className="text-white text-xl font-semibold mb-4">Gender Distribution</h2>
            <GenderDistributionChart 
              generalMajor={filters.generalMajor}
              data={getGenderDistributionData()}
            />
      </div> */}
        </div>
      </div>

    </div>
  );
}