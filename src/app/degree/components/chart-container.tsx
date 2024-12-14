import React from 'react';

interface ChartContainerProps {
  children: React.ReactNode;
}

const ChartContainer = ({ children }: ChartContainerProps) => {
  return (
    <div className="bg-[#1B2660] rounded-lg p-4 shadow-lg">
      {children}
    </div>
  );
};

export default ChartContainer;