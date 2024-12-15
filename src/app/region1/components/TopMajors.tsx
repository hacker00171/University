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

const TopMajors: React.FC<Props> = ({ data }) => {
  // Define the static top 5 majors data
  const staticMajors = [
    { name: "Engineering", students: 42000, rank: 1 },
    { name: "Business Administration", students: 35000, rank: 2 },
    { name: "Computer Science", students: 28000, rank: 3 },
    { name: "Medicine", students: 22000, rank: 4 },
    { name: "Law", students: 18000, rank: 5 }
  ];

  // Use provided data if available, otherwise fall back to static data
  const majorsData = data || { majors: staticMajors };
  const totalStudents = majorsData.majors.reduce((acc, curr) => acc + curr.students, 0);

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
        {majorsData.majors.map((major) => (
          <div key={major.name} className="relative bg-[#3d4393]/30 p-4 rounded-lg hover:bg-[#3d4393]/40 transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 bg-emerald-500/20 rounded-full">
                <span className="text-emerald-400 font-semibold">#{major.rank}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{major.name}</span>
                  <span className="text-emerald-400">{major.students.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-[#21265E] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${(major.students / Math.max(...majorsData.majors.map(m => m.students))) * 100}%` 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMajors;
