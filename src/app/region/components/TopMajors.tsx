import React from 'react';

interface Major {
  name: string;
  students: number;
  rank: number;
}

interface Props {
  data?: {
    majors: Major[];
  };
  totalStudents?: number;
}

const TopMajors: React.FC<Props> = ({ data, totalStudents }) => {
  if (!data?.majors || data.majors.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-[#2c327a] to-[#1a1f4e] rounded-lg p-5 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Top 5 Majors</h2>
        {totalStudents && (
          <div className="bg-[#3d4393] px-4 py-1.5 rounded-full">
            <span className="text-emerald-400 font-medium">
              {totalStudents.toLocaleString()} Students
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {data.majors.map((major) => (
          <div key={major.name} className="relative bg-[#3d4393]/30 py-3.5 px-4 rounded-lg hover:bg-[#3d4393]/40 transition-colors">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="flex items-center justify-center w-6 h-6 bg-emerald-500/20 rounded-full">
                <span className="text-emerald-400 font-semibold text-sm">#{major.rank}</span>
              </div>
              <span className="text-white font-medium">{major.name}</span>
              <span className="text-gray-400 ml-auto">{major.students.toLocaleString()}</span>
            </div>
            <div className="w-full h-1.5 bg-[#21265E] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ 
                  width: `${(major.students / Math.max(...data.majors.map(m => m.students))) * 100}%` 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMajors;
