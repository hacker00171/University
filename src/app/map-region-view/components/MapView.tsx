'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/map-region-view/components/card';
import data from '@/app/map-region-view/data/state-education-data.json';
import { StateInfo, StateData, StateNames } from '@/app/region1/types/state';
import StatePopup from './StatePopup';

interface Overview {
  totalStudents: number;
  totalInstitutions: number;
  averageGPA: number;
  graduationRate: number;
  graduates_by_qualification: {
    [key: string]: number;
  };
}

interface Employment {
  employmentRate: number;
}

const MetricsCard = ({ title, value, subtitle }: { title: string; value: string | number; subtitle?: string }) => (
  <div className="bg-[#162464]/30 rounded-lg p-3 backdrop-blur-sm">
    <h3 className="text-[#00E1E2] text-sm font-medium">{title}</h3>
    <p className="text-white text-2xl font-bold">{value}</p>
    {subtitle && <p className="text-gray-400 text-xs mt-1">{subtitle}</p>}
  </div>
);

const MapView = () => {
  const { overview, employment }: { overview: Overview; employment: Employment } = data;
  const [selectedState, setSelectedState] = useState<StateInfo | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const getStateData = (stateName: string): StateInfo | null => {
    try {
      // Convert state name to match our data
      const normalizedStateName = stateName.replace(/^Al-/, '').replace(/^Ḥa'il$/, 'Hail');
      
      // Type assertion to ensure we're working with the correct type
      const stateData = data as unknown as StateData;
      const stateInfo = stateData.states[normalizedStateName as StateNames];
      
      if (!stateInfo) {
        console.log(`No data found for state: ${stateName}`);
        return null;
      }
      
      return stateInfo;
    } catch (error) {
      console.error(`Error getting state data for ${stateName}:`, error);
      return null;
    }
  };

  const handleStateClick = useCallback((stateName: string) => {
    const stateInfo = getStateData(stateName);
    if (stateInfo) {
      setSelectedState(stateInfo);
      setIsPopupOpen(true);
    }
  }, []);

  useEffect(() => {
    // Add event listener to the iframe for state clicks
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'stateClick') {
        handleStateClick(event.data.stateName);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleStateClick]);

  return (
    <div className="h-[calc(80vh-4rem)] p-1">
      <Card className="h-full bg-[#162464]/50 backdrop-blur-sm border-[#2D4393]">
        <CardHeader className="py-2">
          <CardTitle className="text-[#00E1E2]">Saudi Arabia Education Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-1">
          <div className="grid grid-cols-5 gap-4 h-[calc(80vh-7rem)]">
            {/* Map Section - 3 columns */}
            <div className="col-span-3 rounded-lg overflow-hidden bg-[#1C2B7F]">
              <iframe
                src="/map/sa-04.html"
                className="w-full h-full border-0"
                title="Saudi Arabia Map"
              />
            </div>

            {/* Metrics Section - 2 columns */}
            <div className="col-span-2 space-y-4 overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-3">
                <MetricsCard 
                  title="Total Institutions" 
                  value={overview.totalInstitutions}
                />
                <MetricsCard 
                  title="Total Graduates" 
                  value={Object.values(overview.graduates_by_qualification).reduce((a, b) => a + b, 0).toLocaleString()}
                  subtitle="Annual Graduates"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <MetricsCard 
                  title="Employment Rate" 
                  value={`${employment.employmentRate}%`}
                  subtitle="One Year After Graduation"
                />
                <MetricsCard 
                  title="Graduation Rate" 
                  value={`${overview.graduationRate}%`}
                  subtitle="Overall Graduation Rate"
                />
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="bg-[#162464]/30 rounded-lg p-3 backdrop-blur-sm">
                  <h3 className="text-[#00E1E2] text-sm font-medium mb-2">Qualification Breakdown</h3>
                  <div className="space-y-2">
                    {Object.entries(overview.graduates_by_qualification).map(([key, value]: [string, number]) => {
                      const total = Object.values(overview.graduates_by_qualification).reduce((a, b) => a + b, 0);
                      const percentage = ((value / total) * 100).toFixed(1);
                      return (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-white capitalize">{key}</span>
                          <span className="text-gray-400">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* State Popup */}
      <StatePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        stateData={selectedState}
      />
    </div>
  );
};

export default MapView;
