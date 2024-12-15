import React from 'react';
import { RegionalStats as RegionalStatsType } from '../types/regional';

interface Props {
  selectedRegion: string | null;
  data?: { [key: string]: RegionalStatsType };
  className?: string;
}

const UniversityNavButtons: React.FC<Props> = ({ selectedRegion, data, className = '' }) => {
  if (!selectedRegion || !data || !data[selectedRegion]) return null;

  const selectedRegionData = data[selectedRegion];
  if (!selectedRegionData.universityTrends) return null;

  const universities = selectedRegionData.universityTrends.map(trend => trend.name);

  return (
    <div className={`bg-[#2c327a] rounded-lg p-4 ${className}`}>
      <h3 className="text-gray-300 text-sm font-medium mb-3">Universities in {selectedRegion}</h3>
      <div className="flex flex-wrap gap-2">
        {universities.map((university) => (
          <button
            key={university}
            className="px-4 py-2 text-sm font-medium text-gray-300 bg-[#343b8f] rounded-lg hover:bg-[#3f478f] transition-colors duration-200"
          >
            {university}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UniversityNavButtons;
