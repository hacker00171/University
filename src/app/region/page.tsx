'use client';

import Regional from '@/app/region/components/Regional';
import StarryNight from '@/app/region/components/StarryNight';
import StateView from '@/app/state-view/components/StateView';
import { mockRegionalData } from '@/app/region/data/mockRegionalData';
import { RegionalData, RegionalStats } from '@/app/state-view/types/regional';
import { RegionName } from '@/app/state-view/components/StateView';
import { useState, useEffect } from 'react';
import UniversityTrends from './components/UniversityTrends';
import GraduationPieChart from './components/GraduationPieChart';

export default function DashboardPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [showStateView, setShowStateView] = useState(false);
  const [selectionSource, setSelectionSource] = useState<'map' | 'navigation' | null>(null);

  // Set default region to Riyadh on component mount
  useEffect(() => {
    if (!selectedRegion) {
      setSelectedRegion('nav:RIYADH');
    }
  }, [selectedRegion]);

  // Convert the array data into a record/object format
  const regionStats = mockRegionalData.reduce((acc, region: RegionalData) => {
    // Calculate the employment rate from the latest year's employment trends
    const latestTrend = region.employmentTrends[region.employmentTrends.length - 1];
    const totalEmployed = latestTrend ? 
      latestTrend.localMale + latestTrend.localFemale + 
      latestTrend.internationalMale + latestTrend.internationalFemale : 0;
    const employmentRate = Math.round((totalEmployed / region.totalGraduates) * 100);

    acc[region.region] = {
      totalStudents: region.totalStudents,
      totalUniversities: region.totalUniversities,
      totalGraduates: region.totalGraduates,
      genderDistribution: region.genderDistribution,
      nationalityDistribution: region.nationalityDistribution,
      graduationStats: region.graduationStats,
      universityTrends: region.universityTrends,
      employmentTrends: region.employmentTrends,
      salaryTrends: region.salaryTrends,
      employmentRate
    };
    return acc;
  }, {} as Record<string, RegionalStats>);

  const handleRegionChange = (region: string, source: 'map' | 'navigation' = 'navigation') => {
    console.log('Region selected:', region, 'Source:', source);
    setSelectedRegion(region);
    setSelectionSource(source);
    if (source === 'map') {
      setShowStateView(true);
    }
  };

  const handleCloseStateView = () => {
    setShowStateView(false);
    setSelectedRegion('nav:RIYADH');
    setSelectionSource(null);
  };

  // Map region names from the map to the data format
  const regionNameMap: Record<string, string> = {
    'RIYADH': 'Riyadh',
    'MAKKAH': 'Mecca',
    'MADINAH': 'Medina',
    'ASH-SHARQIYAH': 'Eastern Province',
    'QASSIM': 'Qassim',
    'HAIL': 'Hail',
    'TABUK': 'Tabuk',
    'NORTHERN BORDERS': 'Northern Borders',
    'JAZAN': 'Jazan',
    'NAJRAN': 'Najran',
    'AL BAHAH': 'Al Baha',
    'AL JAWF': 'Al Jawf',
    'ASIR': 'Asir'
  };

  // Clean the region name for the StateView (remove the source prefix and map to proper name)
  const cleanRegionName = selectedRegion?.replace(/^(map|nav):/, '');
  console.log('Clean region name:', cleanRegionName);
  const properRegionName = cleanRegionName ? regionNameMap[cleanRegionName] || cleanRegionName : '';
  console.log('Proper region name:', properRegionName);

  // Show StateView only when region is selected from map
  if (showStateView && selectedRegion?.startsWith('map:') && properRegionName) {
    console.log('Showing StateView for:', properRegionName);
    return (
      <div className="min-h-screen bg-[#1a1d4a]">
        <div className="fixed inset-0 bg-[#1a1d4a] z-50">
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">{properRegionName} Region Overview</h2>
              <button
                onClick={handleCloseStateView}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <span>Back to Dashboard</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <StateView selectedState={properRegionName as RegionName} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen ">
      <StarryNight />
      <div className="relative z-10">
        <Regional 
          regionStats={regionStats} 
          onRegionSelect={(region) => handleRegionChange(region, 'map')} 
          selectedRegion={selectedRegion || ''} 
        />
        {selectedRegion && selectionSource === 'navigation' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <UniversityTrends trends={regionStats[selectedRegion]?.universityTrends || []} />
            <GraduationPieChart stats={regionStats[selectedRegion]?.graduationStats || null} />
          </div>
        )}
      </div>
    </div>
  );
}
