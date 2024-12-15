import React from 'react';
import StateMapView from './StateMapView';
import StateDimensions from './StateDimensions';

interface StateMapWithDimensionsProps {
  stateName: string;
}

const StateMapWithDimensions: React.FC<StateMapWithDimensionsProps> = ({ stateName }) => {
  return (
    <div className="flex flex-col">
      <StateMapView stateName={stateName} />
      <StateDimensions stateName={stateName} />
    </div>
  );
};

export default StateMapWithDimensions;
