'use client';

import { type FC, useEffect, useRef, useState } from 'react';

import RegionalNavButtons from './regional_nav_buttons';
import RegionalStats from './RegionalStats';
import NationalityChart from './NationalityChart';
import GenderChart from './GenderChart';
import UniversityTrends from './UniversityTrends';
import GraduationPieChart from './GraduationPieChart';
import EmploymentChart from './EmploymentChart';
import UniversityNavButtons from './UniversityNavButtons';
import SalaryChart from './SalaryChart';
import PlacementTrendsChart from './PlacementTrendsChart';
import TopMajors from './TopMajors';
import StatePopup from '@/app/map-region-view/components/StatePopup';
import stateEducationData from '@/app/map-region-view/data/state-education-data.json';
import { UniversityTrend, EmploymentTrend, SalaryTrend } from '../types/regional';
import { type StateInfo, type StateNames } from '../types/state';

interface RegionStats {
  totalStudents: number;
  totalUniversities: number;
  totalGraduates: number;
  employmentRate: number;
  genderDistribution: {
    male: number;
    female: number;
  };
  nationalityDistribution: {
    saudi: number;
    nonSaudi: number;
  };
  graduationStats: {
    bachelors: number;
    masters: number;
    doctorate: number;
    diploma: number;
  };
  universityTrends: UniversityTrend[];
  employmentTrends: EmploymentTrend[];
  salaryTrends: SalaryTrend[];
}

interface Props {
  regionStats: Record<string, RegionStats>;
  onRegionSelect: (region: string) => void;
  selectedRegion: string;
}

// Navigation to Map name mapping
const navToMapName: Record<string, string> = {
  'RIYADH': 'Riyadh',
  'MAKKAH': 'Makkah',
  'MADINAH': 'Medina',
  'QASSIM': 'Al-Qassim',
  'ASH-SHARQIYAH': 'Eastern',
  'ASIR': 'Asir',
  'TABUK': 'Tabuk',
  'HAIL': "Ḥa'il",
  'NORTHERN BORDERS': 'Northern Borders',
  'JAZAN': 'Jazan',
  'NAJRAN': 'Najran',
  'AL BAHAH': 'Al-Bahah',
  'AL JAWF': 'Al-Jawf'
};

const mapToNavName: Record<string, string> = {
  'Riyadh': 'RIYADH',
  'Makkah': 'MAKKAH',
  'Medina': 'MADINAH',
  'Al-Qassim': 'QASSIM',
  'Eastern': 'ASH-SHARQIYAH',
  'Asir': 'ASIR',
  'Tabuk': 'TABUK',
  "Ḥa'il": 'HAIL',
  'Northern Borders': 'NORTHERN BORDERS',
  'Jazan': 'JAZAN',
  'Najran': 'NAJRAN',
  'Al-Bahah': 'AL BAHAH',
  'Al-Jawf': 'AL JAWF'
};

const getMapRegionName = (navRegion: string | null): string | null => {
  if (!navRegion) return null;
  return navToMapName[navRegion] || navRegion;
};

const getNavRegionName = (mapRegion: string | null): string | null => {
  if (!mapRegion) return null;
  return mapToNavName[mapRegion] || mapRegion.toUpperCase();
};

const getStateData = (stateName: StateNames): StateInfo => {
  const stateData = stateEducationData.states[stateName];
  if (!stateData) {
    console.warn(`No data found for state: ${stateName}`);
    return {
      name: stateName,
      universities: [],
      colleges: 0,
      students: 0,
      literacyRate: 0,
      statistics: {
        totalStudents: 0,
        totalGraduates: 0,
        averageEmploymentRate: 0
      }
    };
  }

  return {
    name: stateName,
    universities: stateData.universities,
    colleges: stateData.universities.length,
    students: stateData.universities.reduce((total, uni) => total + uni.students, 0),
    literacyRate: 98, // This could be added to your JSON data if you have actual literacy rates
    statistics: {
      totalStudents: stateData.universities.reduce((total, uni) => total + uni.students, 0),
      totalGraduates: stateData.universities.reduce((total, uni) => total + uni.graduates, 0),
      averageEmploymentRate: stateData.universities.reduce((total, uni) => total + uni.employmentRate, 0) / stateData.universities.length
    }
  };
};

interface WorldMapProps {
  selectedRegion: string;
  onRegionSelect: (region: string) => void;
  regionStats: Record<string, RegionStats>;
}

const WorldMap: FC<WorldMapProps> = ({ selectedRegion, onRegionSelect, regionStats }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedStateData, setSelectedStateData] = useState<StateInfo | null>(null);
  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipY, setTooltipY] = useState(0);

  useEffect(() => {
    const loadSVG = async () => {
      try {
        const response = await fetch('/map/sa-04.html');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const svg = doc.querySelector('svg');
        
        if (svg && svgRef.current) {
          Array.from(svg.attributes).forEach(attr => {
            svgRef.current?.setAttribute(attr.name, attr.value);
          });
          
          svgRef.current.innerHTML = svg.innerHTML;
          
          const paths = svgRef.current.querySelectorAll('path');
          paths.forEach(path => {
            const regionName = path.getAttribute('title');
            const selectedMapName = getMapRegionName(selectedRegion);
            
            if (regionName && selectedMapName && regionName.toUpperCase() === selectedMapName.toUpperCase()) {
              path.style.fill = '#1d4ed8'; 
            } else {
              path.style.fill = '#4883D4'; 
            }
            
            path.addEventListener('mousemove', (e: MouseEvent) => {
              if (regionName) {
                setHoveredRegion(regionName);
                setTooltipX(e.pageX);
                setTooltipY(e.pageY);
              }
              if (!(regionName && selectedMapName && regionName.toUpperCase() === selectedMapName.toUpperCase())) {
                path.style.fill = '#2563eb'; 
              }
            });
            
            path.addEventListener('mouseout', () => {
              setHoveredRegion(null);
              if (!(regionName && selectedMapName && regionName.toUpperCase() === selectedMapName.toUpperCase())) {
                path.style.fill = '#4883D4'; 
              }
            });
            
            path.addEventListener('click', () => {
              const navRegionName = getNavRegionName(regionName);
              if (navRegionName) {
                onRegionSelect(navRegionName);
              }
              if (regionName) {  
                const stateData = getStateData(regionName as StateNames);
                setSelectedStateData(stateData);
                setIsPopupOpen(true);
              }
              
              paths.forEach(p => {
                const pRegionName = p.getAttribute('title');
                const pSelectedMapName = getMapRegionName(selectedRegion);
                if (pRegionName && pSelectedMapName && pRegionName.toUpperCase() === pSelectedMapName.toUpperCase()) {
                  p.style.fill = '#1d4ed8'; 
                } else {
                  p.style.fill = '#4883D4'; 
                }
              });
            });
          });
        }
      } catch (error) {
        console.error('Error loading SVG:', error);
      }
    };

    loadSVG();
  }, [onRegionSelect, selectedRegion]);

  useEffect(() => {
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll('path');
      paths.forEach(path => {
        const regionName = path.getAttribute('title');
        const selectedMapName = getMapRegionName(selectedRegion);
        if (regionName && selectedMapName && regionName.toUpperCase() === selectedMapName.toUpperCase()) {
          path.style.fill = '#1d4ed8'; 
        } else {
          path.style.fill = '#4883D4'; 
        }
      });
    }
  }, [selectedRegion]);

  return (
    <div className="relative w-full h-full">
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ backgroundColor: '#1C2B7F' }}
      />
      {hoveredRegion && regionStats && (
        <div
          className="fixed bg-[rgba(21,44,112,0.95)] text-white p-4 rounded-xl shadow-lg z-50 pointer-events-none backdrop-blur-sm border border-[#2D4393] min-w-[180px] whitespace-nowrap"
          style={{
            left: `${tooltipX}px`,
            top: `${tooltipY}px`,
            transform: 'translate(-50%, -100%)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            fontFamily: 'Arial, sans-serif',
            fontSize: '15px',
            lineHeight: '1.6',
          }}
        >
          <h3 className="text-[17px] font-bold mb-2">{hoveredRegion}</h3>
          <div className="space-y-1">
            <p>Total Students: {regionStats[getNavRegionName(hoveredRegion) || '']?.totalStudents?.toLocaleString()}</p>
            <p>Universities: {regionStats[getNavRegionName(hoveredRegion) || '']?.totalUniversities}</p>
            <p>Employment Rate: {regionStats[getNavRegionName(hoveredRegion) || '']?.employmentRate}%</p>
          </div>
        </div>
      )}
      {isPopupOpen && selectedStateData && (
        <StatePopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          stateData={selectedStateData}
        />
      )}
    </div>
  );
};

const Regional: FC<Props> = ({ regionStats, onRegionSelect, selectedRegion }) => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .region:hover {
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleMapRegionSelect = (region: string) => {
    console.log('Map region selected:', region);
    onRegionSelect(region);
  };

  const handleNavRegionSelect = (region: string) => {
    console.log('Nav region selected:', region);
    onRegionSelect(region);
  };

  const displayRegion = selectedRegion?.replace(/^(map|nav):/, '');
  console.log('Display region:', displayRegion);

  return (
    <div className="h-full overflow-auto bg-transparent">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-white">Regional Dashboard</h1>
        
        <RegionalStats 
          stats={displayRegion && regionStats ? regionStats[displayRegion] : null}
          region={displayRegion}
        />
        
        <div className="flex gap-6">
          <div className="flex flex-col gap-4 w-[55%]">
            <div className="relative h-[calc(100vh-250px)] min-h-[550px] bg-[#1a1d4a] rounded-lg overflow-hidden">
              <WorldMap 
                selectedRegion={displayRegion?.replace(/^(map|nav):/, '')} 
                onRegionSelect={handleMapRegionSelect} 
                regionStats={regionStats}
              />
            </div>
            {displayRegion && regionStats && regionStats[displayRegion] ? (
              <>
                <UniversityTrends
                  trends={regionStats[displayRegion].universityTrends}
                />
                <EmploymentChart 
                  trends={regionStats[displayRegion].employmentTrends}
                />
                <TopMajors 
                  data={{
                    majors: [
                      { name: "Engineering", students: 42000, rank: 1 },
                      { name: "Business", students: 38000, rank: 2 },
                    ]
                  }}
                  totalStudents={regionStats[displayRegion].totalStudents}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Coming Soon</h2>
                <p className="text-gray-500">Statistical data for this region is currently being compiled.</p>
              </div>
            )}
          </div>
          
          <div className="w-[45%] space-y-4">
            <RegionalNavButtons 
              selectedRegion={displayRegion} 
              onRegionSelect={handleNavRegionSelect}
            />
            
            <UniversityNavButtons
              selectedRegion={displayRegion}
              data={regionStats}
            />

            {displayRegion && regionStats && regionStats[displayRegion] ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <GenderChart 
                    data={regionStats[displayRegion].genderDistribution}
                  />
                  <NationalityChart 
                    data={regionStats[displayRegion].nationalityDistribution}
                  />
                </div>
                <GraduationPieChart 
                  stats={regionStats[displayRegion].graduationStats}
                />
                <SalaryChart 
                  trends={regionStats[displayRegion].salaryTrends}
                />
                <PlacementTrendsChart 
                  data={regionStats[displayRegion].employmentTrends}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Coming Soon</h2>
                <p className="text-gray-500">Statistical data for this region is currently being compiled.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regional;
