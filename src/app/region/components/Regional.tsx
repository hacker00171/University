'use client';

import { type FC, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { FeatureCollection, Geometry, Feature, GeoJsonProperties } from 'geojson';
import { Topology, GeometryCollection } from 'topojson-specification';
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

interface UniversityTrend {
  name: string;
  color: string;
  yearlyData: Array<{
    year: number;
    students: number;
  }>;
}

interface EmploymentTrend {
  year: number;
  localMale: number;
  localFemale: number;
  internationalMale: number;
  internationalFemale: number;
}

interface SalaryTrend {
  year: number;
  averageSalary: number;
}

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

interface RegionData {
  name: string;
  center: [number, number];
  id: string;
}

interface WorldTopology extends Topology<{
  countries: GeometryCollection;
}> {
  objects: {
    countries: GeometryCollection;
  };
}

const regions: RegionData[] = [
  { name: 'RIYADH', center: [46.5, 24.5], id: 'riyadh' },
  { name: 'MAKKAH', center: [40.3, 21.5], id: 'makkah' },
  { name: 'MADINAH', center: [39.6, 24.5], id: 'madinah' },
  { name: 'ASH-SHARQIYAH', center: [49.5, 25.5], id: 'eastern' },
  { name: 'QASSIM', center: [43.5, 26.5], id: 'qassim' },
  { name: 'HAIL', center: [41.5, 27.5], id: 'hail' },
  { name: 'TABUK', center: [36.5, 28.5], id: 'tabuk' },
  { name: 'NORTHERN BORDERS', center: [42.5, 30], id: 'northern' },
  { name: 'JAZAN', center: [42.5, 17], id: 'jazan' },
  { name: 'NAJRAN', center: [44.5, 17.5], id: 'najran' },
  { name: 'AL BAHAH', center: [41.5, 20], id: 'baha' },
  { name: 'AL JAWF', center: [38.5, 29.5], id: 'jawf' },
  { name: 'ASIR', center: [42.5, 18.5], id: 'asir' }
];

interface InfoCardProps {
  region: string;
  stats: RegionStats;
}

const InfoCard: FC<InfoCardProps> = ({ region, stats }) => {
  return (
    <div className="absolute top-4 right-4 bg-gradient-to-br from-[#3730a3] via-[#4f46e5] to-[#6366f1] rounded-lg shadow-xl p-4 w-44 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">{region}</h3>
        <div className="bg-white bg-opacity-20 p-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-indigo-200">Students</span>
          <span className="text-xs font-bold text-white">{stats.totalStudents.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-indigo-200">Universities</span>
          <span className="text-xs font-bold text-white">{stats.totalUniversities}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-indigo-200">Graduates</span>
          <span className="text-xs font-bold text-white">{stats.totalGraduates.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-indigo-200">Employment</span>
          <span className="text-xs font-bold text-white">{stats.employmentRate}%</span>
        </div>
      </div>
    </div>
  );
};

interface WorldMapProps {
  selectedRegion: string | null;
  onRegionSelect: (region: string) => void;
  regionStats?: Record<string, RegionStats>;
}

const WorldMap: FC<WorldMapProps> = ({ selectedRegion, onRegionSelect, regionStats }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mapData, setMapData] = useState<WorldTopology | null>(null);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(response => response.json())
      .then((data: WorldTopology) => {
        setMapData(data);
      })
      .catch(error => console.error('Error loading map data:', error));
  }, []);

  useEffect(() => {
    if (!svgRef.current || !mapData) return;

    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('cursor', 'grab');

    svg.selectAll("*").remove();

    const g = svg.append('g');

    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'saudiGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#2a3691')
      .attr('stop-opacity', 1);

    gradient.append('stop')
      .attr('offset', '40%')
      .attr('stop-color', '#254996')
      .attr('stop-opacity', 1);

    gradient.append('stop')
      .attr('offset', '70%')
      .attr('stop-color', '#1d6595')
      .attr('stop-opacity', 1);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#158b96')
      .attr('stop-opacity', 1);

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.8, 8])
      .translateExtent([[-width, -height], [width * 2, height * 2]])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        g.selectAll<SVGPathElement, Feature<Geometry, GeoJsonProperties>>('path').style('stroke-width', (d: Feature<Geometry, GeoJsonProperties>) => {
          const countryName = (d.properties as { name: string })?.name;
          return countryName === 'Saudi Arabia' ? `${2 / event.transform.k}px` : '0';
        });
        g.selectAll<SVGCircleElement, RegionData>('.region-circle')
          .attr('r', 7.5 / event.transform.k)
          .style('stroke-width', (d: RegionData) => {
            const data = d;
            return data.name === selectedRegion ? `${1.5 / event.transform.k}px` : `${1 / event.transform.k}px`;
          });
        g.selectAll('.region-label')
          .style('font-size', `${10.5 / event.transform.k}px`);
      });

    svg.call(zoom)
      .call(zoom.transform, d3.zoomIdentity.translate(0, 0).scale(0.95))
      .on('dblclick.zoom', () => {
        svg.transition()
          .duration(750)
          .call(zoom.transform, d3.zoomIdentity.translate(0, 0).scale(0.95));
      })
      .on('mousedown.cursor', () => svg.style('cursor', 'grabbing'))
      .on('mouseup.cursor', () => svg.style('cursor', 'grab'));

    const projection = d3.geoMercator()
      .center([44, 25])
      .scale(1900)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    try {
      const countries = (feature(mapData, mapData.objects.countries) as unknown) as FeatureCollection<Geometry>;
      g.selectAll<SVGPathElement, Feature<Geometry, GeoJsonProperties>>('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', (d: Feature<Geometry, GeoJsonProperties>) => {
          const countryName = (d.properties as { name: string })?.name;
          return countryName === 'Saudi Arabia' ? 'url(#saudiGradient)' : '#1a1d4a';
        })
        .attr('stroke', '#2a3691')
        .attr('stroke-width', (d: Feature<Geometry, GeoJsonProperties>) => {
          const countryName = (d.properties as { name: string })?.name;
          return countryName === 'Saudi Arabia' ? '3px' : '0';
        });

      g.selectAll<SVGCircleElement, RegionData>('.region-circle')
        .data(regions)
        .join('circle')
        .attr('class', 'region-circle')
        .attr('cx', (d: RegionData) => {
          const [x] = projection(d.center) || [0, 0];
          return x;
        })
        .attr('cy', (d: RegionData) => {
          const [, y] = projection(d.center) || [0, 0];
          return y;
        })
        .attr('r', 7.5)
        .attr('stroke', '#ffffff')
        .attr('stroke-width', (d: RegionData) => d.name === selectedRegion ? 1.75 : 1.25)
        .attr('fill', (d: RegionData) => d.name === selectedRegion ? '#4CAF50' : '#4a5bff')
        .attr('opacity', (d: RegionData) => d.name === selectedRegion ? 1 : 0.8)
        .style('filter', (d: RegionData) => d.name === selectedRegion ? 'drop-shadow(0px 0px 4px rgba(76, 175, 80, 0.4))' : 'none')
        .style('cursor', 'pointer')
        .on('click', (event: MouseEvent, d: RegionData) => {
          event.stopPropagation();
          onRegionSelect(d.name);
        })
        .on('mouseover', (event: MouseEvent, d: RegionData) => {
          if (d.name !== selectedRegion) {
            d3.select(event.target as Element)
              .attr('fill', '#6b7aff')
              .attr('opacity', 1)
              .style('filter', 'drop-shadow(0px 0px 4px rgba(76, 175, 80, 0.4))');
          }
        })
        .on('mouseout', (event: MouseEvent, d: RegionData) => {
          if (d.name !== selectedRegion) {
            d3.select(event.target as Element)
              .attr('fill', '#4a5bff')
              .attr('opacity', 0.8)
              .style('filter', 'none');
          }
        });

      g.selectAll<SVGTextElement, RegionData>('.region-label')
        .data(regions)
        .join('text')
        .attr('class', 'region-label')
        .attr('x', (d: RegionData) => {
          const [x] = projection(d.center) || [0, 0];
          return x;
        })
        .attr('y', (d: RegionData) => {
          const [, y] = projection(d.center) || [0, 0];
          return y - 16;
        })
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffffff')
        .attr('font-size', '10.5px')
        .attr('font-weight', (d: RegionData) => d.name === selectedRegion ? 'bold' : 'normal')
        .attr('opacity', (d: RegionData) => d.name === selectedRegion ? 1 : 0.9)
        .style('text-shadow', '0px 2px 4px rgba(0, 0, 0, 0.3)')
        .style('cursor', 'pointer')
        .text((d: RegionData) => d.name)
        .on('click', (event: MouseEvent, d: RegionData) => {
          event.stopPropagation();
          onRegionSelect(d.name);
        });
    } catch (error) {
      console.error('Error rendering map:', error);
    }
  }, [selectedRegion, onRegionSelect, mapData]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll<SVGCircleElement, RegionData>('.region-circle')
      .attr('stroke-width', (d: RegionData) => d.name === selectedRegion ? 1.75 : 1.25)
      .attr('fill', (d: RegionData) => d.name === selectedRegion ? '#4CAF50' : '#4a5bff')
      .attr('opacity', (d: RegionData) => d.name === selectedRegion ? 1 : 0.8)
      .style('filter', (d: RegionData) => d.name === selectedRegion ? 'drop-shadow(0px 0px 4px rgba(76, 175, 80, 0.4))' : 'none');
  }, [selectedRegion]);

  return (
    <div className=" h-[600px] relative" style={{ minHeight: '600px' }}>
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 800 600"
        style={{ background: '#1a1d4a' }}
        preserveAspectRatio="xMidYMid meet"
      />
      {selectedRegion && regionStats?.[selectedRegion] && (
        <InfoCard region={selectedRegion} stats={regionStats[selectedRegion]} />
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
    onRegionSelect(`map:${region.toUpperCase()}`);
  };

  const handleNavRegionSelect = (region: string) => {
    console.log('Nav region selected:', region);
    onRegionSelect(`nav:${region.toUpperCase()}`);
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
                selectedRegion={displayRegion} 
                onRegionSelect={handleMapRegionSelect} 
                regionStats={regionStats}
              />
            </div>
            {selectedRegion?.startsWith('nav:') && (
              <>
                <UniversityTrends
                  trends={displayRegion && regionStats ? regionStats[displayRegion].universityTrends : undefined}
                />
                <EmploymentChart 
                  trends={displayRegion && regionStats ? regionStats[displayRegion].employmentTrends : undefined}
                />
                <TopMajors 
                  data={displayRegion ? {
                    majors: [
                      { name: "Business management", students: 15420, rank: 1 },
                      { name: "Engineering management", students: 12340, rank: 2 },
                      { name: "Health services management", students: 10890, rank: 3 },
                      { name: "Financial and investment management", students: 9870, rank: 4 },
                      { name: "Quality management", students: 8900, rank: 5 }
                    ]
                  } : undefined}
                  totalStudents={57420}
                />
              </>
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

            {selectedRegion?.startsWith('nav:') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <GenderChart 
                  data={displayRegion && regionStats ? regionStats[displayRegion].genderDistribution : undefined}
                />
                <NationalityChart 
                  data={displayRegion && regionStats ? regionStats[displayRegion].nationalityDistribution : undefined}
                />
              </div>
            )}
            
            <GraduationPieChart 
              stats={displayRegion && regionStats ? regionStats[displayRegion].graduationStats : null}
            />
            <SalaryChart 
              trends={displayRegion && regionStats ? regionStats[displayRegion].salaryTrends : undefined}
            />
            <PlacementTrendsChart 
              data={displayRegion && regionStats ? regionStats[displayRegion].employmentTrends : []}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regional;
