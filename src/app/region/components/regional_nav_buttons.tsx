import React from 'react';

interface Props {
  selectedRegion: string | null;
  onRegionSelect: (region: string) => void;
  className?: string;
}

const RegionalNavButtons: React.FC<Props> = ({ selectedRegion, onRegionSelect, className = '' }) => {
  const getButtonStyle = (isSelected: boolean) => {
    return `
      px-3 py-2 text-xs font-medium
      ${isSelected 
        ? 'bg-[#4CAF50] text-white border-[#4CAF50] shadow-lg shadow-[#4CAF50]/20' 
        : 'bg-[#2c327a] text-gray-300 border-[#363c87] hover:bg-[#363c87]'
      }
      border rounded-lg transition-all duration-200
      hover:scale-105 hover:shadow-md
      focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/50
      active:scale-95
      w-full max-w-[140px] truncate
    `;
  };

  // Organize regions into a 3-column grid
  const regionGrid = [
    ['RIYADH', 'MAKKAH', 'MADINAH'],
    ['QASSIM', 'ASH-SHARQIYAH', 'ASIR'],
    ['TABUK', 'HAIL', 'NORTHERN BORDERS'],
    ['JAZAN', 'NAJRAN', 'AL BAHAH'],
    ['AL JAWF', null, null]
  ];

  return (
    <div className={`p-4 ${className}`}>
      <div className="grid grid-cols-3 gap-2 place-items-center">
        {regionGrid.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((region, colIndex) => (
              region ? (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => onRegionSelect(region)}
                  className={getButtonStyle(selectedRegion === region)}
                  title={region}
                >
                  {region}
                </button>
              ) : (
                <div key={`${rowIndex}-${colIndex}`} className="w-[140px] h-8" />
              )
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RegionalNavButtons;
