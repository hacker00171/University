import React, { useEffect, useRef, useState } from 'react';
import { mapPaths } from '../data/state-paths';
import stateEducationData from '../data/state-education-data.json';
import { StateNames } from '@/app/region1/types/state';

interface StateMapProps {
  stateName: StateNames;
}

interface University {
  name: string;
  students: number;
  graduates: number;
  employmentRate: number;
}

interface StateEducationData {
  states: {
    [key: string]: {
      name: string;
      universities: University[];
      statistics: {
        totalStudents: number;
        totalGraduates: number;
        averageEmploymentRate: number;
      };
    };
  };
}

interface UniversityMarker {
  x: number;
  y: number;
  name: string;
  students: number;
}

interface StateData {
  name: string;
  universities: University[];
  statistics: {
    totalStudents: number;
    totalGraduates: number;
    averageEmploymentRate: number;
  };
}

const StateMap: React.FC<StateMapProps> = ({ stateName }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [markers, setMarkers] = useState<UniversityMarker[]>([]);

  const getStateData = (stateName: StateNames): StateData | null => {
    const data = stateEducationData as StateEducationData;
    return data.states[stateName] || null;
  };

  const calculateStateStats = (stateData: StateData) => {
    return {
      universities: stateData.universities.length,
      graduates: stateData.statistics.totalGraduates.toLocaleString(),
      employment: stateData.statistics.averageEmploymentRate.toFixed(0)
    };
  };

  // Function to check if a point is inside an SVG path
  const isPointInPath = (x: number, y: number, path: SVGPathElement) => {
    const point = svgRef.current?.createSVGPoint();
    if (!point) return false;
    point.x = x;
    point.y = y;
    return path.isPointInFill(point);
  };

  // Function to check if a string is a valid state name
  const isValidStateName = (name: string): name is StateNames => {
    return name in mapPaths;
  };

  useEffect(() => {
    if (pathRef.current && svgRef.current) {
      const bbox = pathRef.current.getBBox();
      const padding = 20;
      const viewBox = `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`;
      svgRef.current.setAttribute('viewBox', viewBox);

      // Generate positions for universities within the state boundaries
      const stateData = getStateData(stateName);
      if (stateData) {
        const newMarkers: UniversityMarker[] = [];
        stateData.universities.forEach((uni: University) => {
          let x, y;
          let attempts = 0;
          // Try to find a point inside the path
          do {
            x = bbox.x + Math.random() * bbox.width;
            y = bbox.y + Math.random() * bbox.height;
            attempts++;
          } while (!isPointInPath(x, y, pathRef.current!) && attempts < 100);

          if (attempts < 100) {
            newMarkers.push({
              x,
              y,
              name: uni.name,
              students: uni.students
            });
          }
        });
        setMarkers(newMarkers);
      }
    }
  }, [stateName]);

  const statePath = isValidStateName(stateName) ? mapPaths[stateName] : undefined;
  if (!statePath) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No map data available for {stateName}
      </div>
    );
  }

  const getMarkerSize = (students: number) => {
    const baseSize = 4;
    const scale = Math.log(students / 1000) / Math.log(10);
    return Math.max(baseSize, scale * baseSize);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        ref={svgRef}
        className="w-[90%] h-[90%]"
        style={{ backgroundColor: '#1C2B7F' }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Shadow/Background path - offset for 3D effect */}
        <path
          d={statePath}
          fill="#00E1E2"
          opacity="0.2"
          transform="translate(-8, 8)"
        />
        
        {/* Main state path with tooltip */}
        <path
          ref={pathRef}
          d={statePath}
          fill="#00E1E2"
          fillOpacity="0.3"
          stroke="#00E1E2"
          strokeWidth="2"
        >
          <title>
            {(() => {
              const stateData = getStateData(stateName);
              if (!stateData) return stateName;
              const stats = calculateStateStats(stateData);
              return `${stateName}\nuniversities: ${stats.universities}\ngraduates: ${stats.graduates}\nemployment: ${stats.employment}%`;
            })()}
          </title>
        </path>

        {/* University markers with labels */}
        {markers.map((marker, index) => (
          <g key={index}>
            {/* Marker glow effect */}
            <circle
              cx={marker.x}
              cy={marker.y}
              r={getMarkerSize(marker.students) + 2}
              fill="#00E1E2"
              opacity="0.3"
            />
            {/* Marker dot */}
            <circle
              cx={marker.x}
              cy={marker.y}
              r={getMarkerSize(marker.students)}
              fill="#00E1E2"
              opacity="0.8"
            />
            {/* University name label */}
            <text
              x={marker.x}
              y={marker.y + getMarkerSize(marker.students) + 12}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="10"
              className="font-medium"
              style={{ textShadow: '0 0 2px rgba(0,0,0,0.5)' }}
            >
              {marker.name.split(' ').slice(0, 2).join(' ')}
            </text>
            {/* University name tooltip */}
            <title>{marker.name} ({marker.students.toLocaleString()} students)</title>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default StateMap;
