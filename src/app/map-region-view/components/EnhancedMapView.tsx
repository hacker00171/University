'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import data from '@/app/map-region-view/data/education-dashboard-json.json';
import EnhancedStatePopup from './EnhancedStatePopup';
import stateDataJson from '@/app/map-region-view/data/state-education-data.json';

// Define the interface for state data
interface StateInfo {
  name: string;
  universities: { 
    name: string; 
    students: number; 
    graduates: number; 
    employmentRate: number; 
  }[];
  colleges: number;
  students: number;
  literacyRate: number;
  statistics: {
    totalStudents: number;
    totalGraduates: number;
    averageEmploymentRate: number;
  };
}

interface StateData {
  states: {
    [key: string]: StateInfo;
  };
}

const stateData: StateData = stateDataJson;

const EnhancedMapView = () => {
  const { overview, employment } = data;
  const [selectedState, setSelectedState] = useState<StateInfo | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Add event listener to the iframe for state clicks
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'stateClick') {
        const stateData = getStateData(event.data.stateName);
        setSelectedState(stateData);
        setIsPopupOpen(true);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const getStateData = (stateName: string): StateInfo => {
    // Convert state name to match our data
    const normalizedStateName = stateName.replace(/^Al-/, '').replace(/^Ḥa'il$/, 'Hail');
    
    // Get data from our state education data file
    const stateInfo = stateData.states[normalizedStateName];
    
    if (!stateInfo) {
      console.log(`No data found for state: ${stateName}`);
      return {
        name: stateName,
        universities: [],
        colleges: 0,
        students: 0,
        literacyRate: 0,
        statistics: {
          totalStudents: 0,
          totalGraduates: 0,
          averageEmploymentRate: 0
        }
      };
    }
    
    return stateInfo;
  };

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
                  value={overview.total_universities}
                  subtitle="Educational Institutions"
                />
                <MetricsCard 
                  title="Total Graduates" 
                  value={overview.graduates.total.toLocaleString()}
                  subtitle="Annual Graduates"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <MetricsCard 
                  title="Employment Rate" 
                  value={`${employment.total_employed_graduates.one_year_after_graduation}%`}
                  subtitle="One Year After Graduation"
                />
                <MetricsCard 
                  title="Graduation Rate" 
                  value={`${((overview.graduates.total / overview.total_universities) * 100).toFixed(1)}%`}
                  subtitle="Overall Success Rate"
                />
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="bg-[#162464]/30 rounded-lg p-3 backdrop-blur-sm">
                  <h3 className="text-[#00E1E2] text-sm font-medium mb-2">Qualification Breakdown</h3>
                  <div className="space-y-2">
                    {/* Default qualification data since it's not available in the overview */}
                    {[
                      { key: 'bachelors', percentage: 65 },
                      { key: 'masters', percentage: 25 },
                      { key: 'doctorate', percentage: 10 }
                    ].map(({ key, percentage }) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-white capitalize">{key}</span>
                        <span className="text-gray-400">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced State Popup */}
      <EnhancedStatePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        stateData={selectedState}
      />
    </div>
  );
};

const MetricsCard = ({ title, value, subtitle }: { title: string; value: string | number; subtitle: string }) => (
  <div className="bg-[#162464]/30 rounded-lg p-3 backdrop-blur-sm">
    <h3 className="text-[#00E1E2] text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
    <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
  </div>
);

export default EnhancedMapView;
