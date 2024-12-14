import React from 'react';
import { FaMale, FaFemale } from 'react-icons/fa';

interface Props {
  data?: {
    male: number;
    female: number;
  };
  className?: string;
}

const GenderChart: React.FC<Props> = ({ data, className = '' }) => {
  if (!data) return null;

  const total = data.male + data.female;
  const malePercentage = Math.round((data.male / total) * 100);
  const femalePercentage = 100 - malePercentage;

  return (
    <div className={`bg-[#2c327a] rounded-lg p-4 ${className}`}>
      <h3 className="text-gray-400 text-sm font-medium mb-4">Gender Distribution</h3>
      
      <div className="flex justify-center gap-10">
        {/* Male Bar */}
        <div className="flex flex-col items-center w-20">
          <div className="flex items-center gap-2 mb-2">
            <FaMale className="text-purple-400 text-base" />
            <span className="text-white text-sm">Male</span>
          </div>
          <div className="w-12 h-[140px] bg-[#21265E] rounded-lg relative overflow-hidden flex flex-col justify-end">
            <div 
              className="w-full bg-purple-400 rounded-t-lg transition-all duration-500 flex flex-col justify-end items-center pb-1.5"
              style={{ height: `${malePercentage}%` }}
            >
              <span className="text-xs font-medium text-white">{malePercentage}%</span>
            </div>
          </div>
          <span className="text-gray-400 text-xs mt-2 text-center">{data.male.toLocaleString()}</span>
        </div>

        {/* Female Bar */}
        <div className="flex flex-col items-center w-20 -ml-4">
          <div className="flex items-center gap-2 mb-2">
            <FaFemale className="text-pink-400 text-base" />
            <span className="text-white text-sm">Female</span>
          </div>
          <div className="w-12 h-[140px] bg-[#21265E] rounded-lg relative overflow-hidden flex flex-col justify-end">
            <div 
              className="w-full bg-pink-400 rounded-t-lg transition-all duration-500 flex flex-col justify-end items-center pb-1.5"
              style={{ height: `${femalePercentage}%` }}
            >
              <span className="text-xs font-medium text-white">{femalePercentage}%</span>
            </div>
          </div>
          <span className="text-gray-400 text-xs mt-2 text-center">{data.female.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default GenderChart;
