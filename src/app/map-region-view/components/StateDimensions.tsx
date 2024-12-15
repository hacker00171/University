import React from 'react';
import { Card } from './ui/card';

interface StateDimensionsProps {
  stateName: string;
}

const StateDimensions: React.FC<StateDimensionsProps> = ({ stateName }) => {
  return (
    <Card className="bg-[#162464]/50 border-[#2D4393] p-2 mt-2">
      <h3 className="text-[#00E1E2] mb-2 text-sm">{stateName} Dimensions</h3>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <span className="text-xs text-gray-400">Area</span>
          <p className="text-sm font-semibold">2,150,000 km²</p>
        </div>
        <div>
          <span className="text-xs text-gray-400">Population</span>
          <p className="text-sm font-semibold">34.8M</p>
        </div>
        <div>
          <span className="text-xs text-gray-400">Density</span>
          <p className="text-sm font-semibold">16.2/km²</p>
        </div>
        <div>
          <span className="text-xs text-gray-400">Cities</span>
          <p className="text-sm font-semibold">285</p>
        </div>
      </div>
    </Card>
  );
};

export default StateDimensions;
