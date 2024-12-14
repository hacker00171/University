"use client";

// import { useState } from 'react';
import { motion } from 'framer-motion';
// import { ResponsiveRadar } from '@nivo/radar';
// import { ResponsiveLine } from '@nivo/line';
// import { ResponsiveCirclePacking } from '@nivo/circle-packing';
// import { ResponsiveScatterPlot } from '@nivo/scatterplot';
// import { ResponsivePie } from '@nivo/pie';
import { mockData } from '@/app/dashboard/data/mockData';
import StatsCard from '@/app/dashboard/components/StatsCard';
// import SaudiMap from '@/components/SaudiMap';
// import CircularProgress from '@/components/CircularProgress';
import UniversityTypes from '@/app/dashboard/components/UniversityTypes';
import QualificationsDistribution from '@/app/dashboard/components/QualificationsDistribution';
import EmploymentStats from '@/app/dashboard/components/EmploymentStats';
import RegionalDistribution from '@/app/dashboard/components/RegionalDistribution';
import TopUniversitiesPerformance from '@/app/dashboard/components/TopUniversitiesPerformance';
import KeyInsightsMarquee from '@/app/dashboard/components/KeyInsightsMarquee';
// import NetworkBackground from '@/components/NetworkBackground';
import { Building2, GraduationCap, Briefcase, BadgeDollarSign } from 'lucide-react';
import { useLanguage } from '@/app/dashboard/context/LanguageContext';
import LanguageToggle from '@/app/dashboard/components/LanguageToggle';

const DashboardPage = () => {
  // const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  // const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const { isArabic } = useLanguage();

  const translations = {
    en: {
      title: "Saudi Universities Dashboard",
      topUniversities: "Top Universities Performance",
      regionalDistribution: "Regional Distribution",
      graduates: "Graduates",
      employmentRate: "Employment Rate",
      explore: "Explore",
      compare: "Compare",
      qualifications: {
        title: "Qualifications Distribution",
        bachelor: "Bachelor's",
        master: "Master's",
        doctorate: "Doctorate",
        diploma: "Diploma"
      }
    },
    ar: {
      title: "لوحة معلومات الجامعات السعودية",
      topUniversities: "أداء أفضل الجامعات",
      regionalDistribution: "التوزيع الإقليمي",
      graduates: "الخريجين",
      employmentRate: "معدل التوظيف",
      explore: "استكشف",
      compare: "قارن",
      qualifications: {
        title: "توزيع المؤهلات",
        bachelor: "بكالوريوس",
        master: "ماجستير",
        doctorate: "دكتوراه",
        diploma: "دبلوم"
      }
    }
  };

  // const t = isArabic ? translations.ar : translations.en;

  // Marquee items
  // const marqueeItems = [
  //   { id: '1', text: `Total Graduates: ${mockData.overview.graduates.total.toLocaleString()} (98% Saudis)` },
  //   { id: '2', text: `Top Major: Business & Law (${mockData.graduates_by_major[0].graduates.toLocaleString()} graduates)` },
  //   { id: '3', text: `Highest Median Wage: SAR ${mockData.employment.median_wages_by_major[0].wage} in Engineering` },
  //   { id: '4', text: `Employment Rate: ${mockData.employment.top_employment_majors[0].employment_rate}% in Engineering` },
  // ];

  // const universityData = [
  //   {
  //     id: "Universities",
  //     data: mockData.top_universities.map(uni => ({
  //       x: uni.research_score,
  //       y: uni.employment_rate,
  //       university: uni.name,
  //       graduates: uni.graduates,
  //       employmentRate: uni.employment_rate,
  //       researchScore: uni.research_score
  //     }))
  //   }
  // ];

  // const qualificationsData = Object.entries(mockData.overview.graduates_by_qualification).map(([key, value]) => ({
  //   id: key,
  //   label: t.qualifications[key as keyof typeof t.qualifications],
  //   value: value
  // }));

  const employmentData = [
    { field: "Engineering", value: 85 },
    { field: "Medicine", value: 92 },
    { field: "Business", value: 78 },
    { field: "IT", value: 88 },
    { field: "Education", value: 75 }
  ];

  return (
    <div className={`container mx-auto p-4 md:p-9 relative ${isArabic ? 'rtl' : 'ltr'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <LanguageToggle />
      </motion.div>

      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h1 className={`text-2xl font-bold text-white mb-2 ${isArabic ? 'font-arabic' : ''}`}>
            {translations[isArabic ? 'ar' : 'en'].title}
          </h1>
          <h2 className={`text-lg text-gray-400 mb-4 ${isArabic ? 'font-arabic' : ''}`}>
            {isArabic ? 'نظرة شاملة على الخريجين والتوظيف والنمو' : 'A Comprehensive Overview of Graduates, Employment, and Growth'}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <KeyInsightsMarquee />
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          <StatsCard
            title={isArabic ? 'الجامعات' : 'Universities'}
            value={mockData.overview.total_universities}
            icon={<Building2 className="w-6 h-6" />}
            trend={+12}
            details={[
              {
                label: isArabic ? 'حكومية' : 'Public',
                value: mockData.overview.university_types.public,
                percentage: Math.round((mockData.overview.university_types.public / mockData.overview.total_universities) * 100)
              },
              {
                label: isArabic ? 'خاصة' : 'Private',
                value: mockData.overview.university_types.private,
                percentage: Math.round((mockData.overview.university_types.private / mockData.overview.total_universities) * 100)
              }
            ]}
          />
          <StatsCard
            title={isArabic ? 'الخريجون' : 'Total Graduates'}
            value={mockData.overview.graduates.total}
            icon={<GraduationCap className="w-6 h-6" />}
            trend={+8.5}
            details={[
              {
                label: isArabic ? 'مواطنون' : 'Citizens',
                value: mockData.overview.graduates.breakdown.citizens,
                percentage: Math.round((mockData.overview.graduates.breakdown.citizens / mockData.overview.graduates.total) * 100)
              },
              {
                label: isArabic ? 'غير مواطنين' : 'Non-Citizens',
                value: mockData.overview.graduates.breakdown.non_citizens,
                percentage: Math.round((mockData.overview.graduates.breakdown.non_citizens / mockData.overview.graduates.total) * 100)
              },
              {
                label: isArabic ? 'ذكور' : 'Males',
                value: Math.round(mockData.overview.graduates.total * (mockData.overview.graduates.gender_distribution.males / 100)),
                percentage: mockData.overview.graduates.gender_distribution.males
              },
              {
                label: isArabic ? 'إناث' : 'Females',
                value: Math.round(mockData.overview.graduates.total * (mockData.overview.graduates.gender_distribution.females / 100)),
                percentage: mockData.overview.graduates.gender_distribution.females
              }
            ]}
          />
          <StatsCard
            title={isArabic ? 'معدل التوظيف' : 'Employment Rate'}
            value={mockData.overview.average_employment_rate}
            icon={<Briefcase className="w-6 h-6" />}
            trend={+5.2}
            isPercentage
            details={mockData.employment.top_employment_majors.map(major => ({
              label: major.major,
              value: major.employment_rate,
              percentage: Math.round((major.graduates / mockData.overview.total_graduates) * 100)
            }))}
          />
          <StatsCard
            title={isArabic ? 'متوسط الراتب' : 'Average Salary'}
            value={mockData.overview.average_salary}
            icon={<BadgeDollarSign className="w-6 h-6" />}
            trend={+15}
            isCurrency
            details={mockData.employment.median_wages_by_major.map(major => ({
              label: major.major,
              value: major.wage
            }))}
          />
        </motion.div>

        {/* Top Row - Full Width */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mb-8"
        >
          <UniversityTypes
            publicUniversities={mockData.overview.university_types.public}
            privateUniversities={mockData.overview.university_types.private}
            totalUniversities={mockData.overview.total_universities}
            regions={[...mockData.regions.universities]}
          />
        </motion.div>

        {/* 2x2 Grid for Main Components */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full"
        >
          <div className="col-span-1">
            <QualificationsDistribution data={mockData.overview.graduates_by_qualification} />
          </div>
          <div className="col-span-1">
            <EmploymentStats employmentData={employmentData} />
          </div>
        </motion.div>

        {/* Regional Distribution and Top Universities Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
        >
          <div className="col-span-1">
            <RegionalDistribution />
          </div>
          <div className="col-span-1">
            <TopUniversitiesPerformance />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
