import React from 'react';
import { RegionalStats as RegionalStatsType } from '../types/regional';
import { FaGraduationCap, FaUniversity, FaUsers } from 'react-icons/fa';

interface Props {
  stats: RegionalStatsType | null;
  region: string | null;
  className?: string;
}

const RegionalStats: React.FC<Props> = ({ stats, region, className = '' }) => {
  if (!stats || !region) return null;

  return (
    <div className={`grid grid-cols-3 gap-4 ${className}`}>
      <div className="bg-[#2c327a] rounded-lg p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[#21265E] rounded-lg">
            <FaUsers className="text-blue-400 text-xl" />
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Total Students</h3>
        </div>
        <p className="text-2xl font-semibold text-white">{stats.totalStudents.toLocaleString()}</p>
      </div>

      <div className="bg-[#2c327a] rounded-lg p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[#21265E] rounded-lg">
            <FaUniversity className="text-emerald-400 text-xl" />
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Universities</h3>
        </div>
        <p className="text-2xl font-semibold text-white">{stats.totalUniversities.toLocaleString()}</p>
      </div>

      <div className="bg-[#2c327a] rounded-lg p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[#21265E] rounded-lg">
            <FaGraduationCap className="text-purple-400 text-xl" />
          </div>
          <h3 className="text-gray-400 text-sm font-medium">Total Graduates</h3>
        </div>
        <p className="text-2xl font-semibold text-white">{stats.totalGraduates.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default RegionalStats;
