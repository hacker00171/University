import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Card } from './ui/card';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Legend,
} from 'recharts';
import StateMapWithDimensions from './StateMapWithDimensions';

interface StateData {
  name: string;
  universities: {
    name: string;
    students: number;
    graduates: number;
    employmentRate: number;
  }[];
  statistics: {
    totalStudents: number;
    totalGraduates: number;
    averageEmploymentRate: number;
  };
}

interface EnhancedStatePopupProps {
  isOpen: boolean;
  onClose: () => void;
  stateData: StateData | null;
}

const EnhancedStatePopup: React.FC<EnhancedStatePopupProps> = ({ isOpen, onClose, stateData }) => {
  if (!stateData) return null;

  // List of states that should show "Coming Soon"
  const comingSoonStates = ["Makkah", "Al-Bahah", "Qassim", "Hail"];
  const isComingSoon = comingSoonStates.includes(stateData.name);

  const chartData = stateData.universities.map(uni => ({
    name: uni.name.split(' ').slice(0, 3).join(' '), // Truncate long university names
    graduates: uni.graduates,
    employmentRate: uni.employmentRate,
  }));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl bg-[#162464]/95 border-[#2D4393] text-white">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-[#00E1E2] text-lg">{stateData.name} Education Overview</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-5 gap-4">
          {/* Left side - State Map and Dimensions */}
          <div className="col-span-2">
            <StateMapWithDimensions stateName={stateData.name} />
          </div>

          {/* Right side - Statistics and Charts */}
          <div className="col-span-3">
            {isComingSoon ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h2 className="text-[#00E1E2] text-2xl font-bold mb-2">Coming Soon</h2>
                  <p className="text-gray-300">Education statistics for {stateData.name} will be available shortly.</p>
                </div>
              </div>
            ) : (
              <>
                {/* Statistics Cards */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <Card className="bg-[#162464]/50 border-[#2D4393] p-2">
                    <h3 className="text-[#00E1E2] text-xs">Total Students</h3>
                    <p className="text-xl font-bold">{stateData.statistics.totalStudents.toLocaleString()}</p>
                  </Card>
                  <Card className="bg-[#162464]/50 border-[#2D4393] p-2">
                    <h3 className="text-[#00E1E2] text-xs">Total Graduates</h3>
                    <p className="text-xl font-bold">{stateData.statistics.totalGraduates.toLocaleString()}</p>
                  </Card>
                  <Card className="bg-[#162464]/50 border-[#2D4393] p-2">
                    <h3 className="text-[#00E1E2] text-xs">Avg. Employment Rate</h3>
                    <p className="text-xl font-bold">{stateData.statistics.averageEmploymentRate.toFixed(2)}%</p>
                  </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1">
                  <Card className="bg-[#162464]/50 border-[#2D4393] p-2">
                    <h3 className="text-[#00E1E2] mb-2 text-sm">University Performance</h3>
                    <div className="h-[180px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#2D4393" vertical={false} />
                          <XAxis 
                            dataKey="name" 
                            tick={false}
                            axisLine={{ stroke: '#2D4393' }}
                          />
                          <YAxis 
                            yAxisId="left"
                            tick={{ fill: '#ffffff' }}
                            axisLine={{ stroke: '#2D4393' }}
                            domain={[0, 'dataMax + 5000']}
                          />
                          <YAxis 
                            yAxisId="right"
                            orientation="right"
                            tick={{ fill: '#ffffff' }}
                            axisLine={{ stroke: '#2D4393' }}
                            domain={[0, 100]}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#162464', 
                              border: '1px solid #2D4393',
                              borderRadius: '8px'
                            }}
                            labelStyle={{ color: '#00E1E2' }}
                            itemStyle={{ color: '#ffffff' }}
                            formatter={(value: number, name: string) => [
                              name === 'Employment Rate' ? `${value}%` : value.toLocaleString(),
                              name
                            ]}
                          />
                          <Legend
                            verticalAlign="top"
                            height={36}
                            wrapperStyle={{ color: '#ffffff' }}
                          />
                          <Bar 
                            yAxisId="left"
                            dataKey="graduates" 
                            fill="#00E1E2"
                            radius={[4, 4, 0, 0]}
                            barSize={40}
                            name="Graduates"
                          >
                            <LabelList
                              dataKey="graduates"
                              position="top"
                              fill="#ffffff"
                              formatter={(value: number) => value.toLocaleString()}
                            />
                          </Bar>
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="employmentRate"
                            stroke="#FFD700"
                            strokeWidth={2}
                            dot={{ fill: '#ffffff', stroke: '#FFD700', strokeWidth: 2, r: 4 }}
                            name="Employment Rate"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>

                {/* Universities List */}
                <div className="mt-2">
                  <h3 className="text-[#00E1E2] mb-2">Universities in {stateData.name}</h3>
                  <div className="grid gap-2 max-h-[150px] overflow-y-auto">
                    {stateData.universities.map((uni, index) => (
                      <Card key={index} className="bg-[#162464]/50 border-[#2D4393] p-2">
                        <h4 className="text-white font-semibold">{uni.name}</h4>
                        <div className="grid grid-cols-3 gap-2 mt-1 text-sm text-gray-400">
                          <div>Students: {uni.students.toLocaleString()}</div>
                          <div>Graduates: {uni.graduates.toLocaleString()}</div>
                          <div>Employment: {uni.employmentRate}%</div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedStatePopup;
