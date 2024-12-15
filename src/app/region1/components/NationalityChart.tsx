import React from 'react';
import { FaFlag, FaGlobe } from 'react-icons/fa';

interface Props {
  data?: {
    saudi: number;
    nonSaudi: number;
  };
  className?: string;
}

const NationalityChart: React.FC<Props> = ({ data, className = '' }) => {
  if (!data) return null;

  const total = data.saudi + data.nonSaudi;
  const saudiPercentage = Math.round((data.saudi / total) * 100);
  const nonSaudiPercentage = 100 - saudiPercentage;

  return (
    <div className={`bg-[#2c327a] rounded-lg p-4 ${className}`}>
      <h3 className="text-gray-400 text-sm font-medium mb-4">Nationality Distribution</h3>
      
      <div className="flex justify-center gap-10">
        {/* Saudi Bar */}
        <div className="flex flex-col items-center w-20">
          <div className="flex items-center gap-2 mb-2">
            <FaFlag className="text-emerald-400 text-base" />
            <span className="text-white text-sm">Saudi</span>
          </div>
          <div className="w-12 h-[140px] bg-[#21265E] rounded-lg relative overflow-hidden flex flex-col justify-end">
            <div 
              className="w-full bg-emerald-400 rounded-t-lg transition-all duration-500 flex flex-col justify-end items-center pb-1.5"
              style={{ height: `${saudiPercentage}%` }}
            >
              <span className="text-xs font-medium text-white">{saudiPercentage}%</span>
            </div>
          </div>
          <span className="text-gray-400 text-xs mt-2 text-center">{data.saudi.toLocaleString()}</span>
        </div>

        {/* Non-Saudi Bar */}
        <div className="flex flex-col items-center w-24 -ml-4">
          <div className="flex items-center gap-2 mb-2">
            <FaGlobe className="text-blue-400 text-base" />
            <span className="text-white text-sm whitespace-nowrap">Non-Saudi</span>
          </div>
          <div className="w-12 h-[140px] bg-[#21265E] rounded-lg relative overflow-hidden flex flex-col justify-end">
            <div 
              className="w-full bg-blue-400 rounded-t-lg transition-all duration-500 flex flex-col justify-end items-center pb-1.5"
              style={{ height: `${nonSaudiPercentage}%` }}
            >
              <span className="text-xs font-medium text-white">{nonSaudiPercentage}%</span>
            </div>
          </div>
          <span className="text-gray-400 text-xs mt-2 text-center">{data.nonSaudi.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default NationalityChart;
