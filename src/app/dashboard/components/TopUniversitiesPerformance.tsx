import { useLanguage } from '@/app/dashboard/context/LanguageContext';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Globe2, Building2,  } from 'lucide-react';

const TopUniversitiesPerformance = () => {
  const { isArabic } = useLanguage();

  const universityData = [
    {
      university: "King Saud University",
      universityAr: "جامعة الملك سعود",
      academicReputation: 92,
      researchOutput: 88,
      employmentRate: 94,
      internationalStudents: 82,
      industryCollaboration: 85,
      teachingQuality: 90,
      researchImpact: 89,
      globalRanking: 15,
      rankingChange: 3,
      overallScore: 90
    },
    {
      university: "King Abdulaziz University",
      universityAr: "جامعة الملك عبدالعزيز",
      academicReputation: 90,
      researchOutput: 89,
      employmentRate: 92,
      internationalStudents: 80,
      industryCollaboration: 88,
      teachingQuality: 88,
      researchImpact: 91,
      globalRanking: 18,
      rankingChange: 5,
      overallScore: 89
    },
    {
      university: "King Fahd University",
      universityAr: "جامعة الملك فهد",
      academicReputation: 88,
      researchOutput: 87,
      employmentRate: 91,
      internationalStudents: 78,
      industryCollaboration: 90,
      teachingQuality: 86,
      researchImpact: 88,
      globalRanking: 22,
      rankingChange: 2,
      overallScore: 88
    },
    {
      university: "King Abdullah University",
      universityAr: "جامعة الملك عبدالله",
      academicReputation: 87,
      researchOutput: 86,
      employmentRate: 89,
      internationalStudents: 85,
      industryCollaboration: 87,
      teachingQuality: 85,
      researchImpact: 87,
      globalRanking: 25,
      rankingChange: 4,
      overallScore: 87
    }
  ];

  // Find top performers for each category
  const topAcademic = universityData.reduce((prev, current) => 
    prev.overallScore > current.overallScore ? prev : current
  );

  const highestImprovement = universityData.reduce((prev, current) => 
    prev.rankingChange > current.rankingChange ? prev : current
  );

  const bestCollaboration = universityData.reduce((prev, current) => 
    prev.industryCollaboration > current.industryCollaboration ? prev : current
  );

  const mostInternational = universityData.reduce((prev, current) => 
    prev.internationalStudents > current.internationalStudents ? prev : current
  );

  // Transform data for heatmap - restructured for better comparison
  const heatmapData = [
    {
      id: isArabic ? 'السمعة الأكاديمية' : 'Academic Reputation',
      data: universityData.map(uni => ({
        x: isArabic ? uni.universityAr : uni.university,
        y: uni.academicReputation
      }))
    },
    {
      id: isArabic ? 'جودة التدريس' : 'Teaching Quality',
      data: universityData.map(uni => ({
        x: isArabic ? uni.universityAr : uni.university,
        y: uni.teachingQuality
      }))
    },
    {
      id: isArabic ? 'تأثير البحث' : 'Research Impact',
      data: universityData.map(uni => ({
        x: isArabic ? uni.universityAr : uni.university,
        y: uni.researchImpact
      }))
    },
    {
      id: isArabic ? 'التعاون الصناعي' : 'Industry Collaboration',
      data: universityData.map(uni => ({
        x: isArabic ? uni.universityAr : uni.university,
        y: uni.industryCollaboration
      }))
    },
    {
      id: isArabic ? 'معدل التوظيف' : 'Employment Rate',
      data: universityData.map(uni => ({
        x: isArabic ? uni.universityAr : uni.university,
        y: uni.employmentRate
      }))
    }
  ];

  return (
    <div className="bg-[#1e3a8a4d] backdrop-blur-sm rounded-lg p-6 h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-semibold text-[#E3F2FD]">
            {isArabic ? 'أداء أفضل الجامعات' : 'University Performance Overview'}
          </h3>
          <p className="text-indigo-300 text-sm mt-1">
            {isArabic ? 'تحليل متعمق للجامعات الرائدة' : 'In-depth analysis of leading universities'}
          </p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="bg-white/5 backdrop-blur-sm rounded-lg p-4 h-[110px]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Award className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{isArabic ? 'أفضل أداء أكاديمي' : 'Top Academic Performer'}</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-white">{`${topAcademic.overallScore}%`}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-indigo-300 mt-1 pl-12">
            {isArabic ? topAcademic.universityAr : topAcademic.university}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/5 backdrop-blur-sm rounded-lg p-4 h-[110px]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{isArabic ? 'أعلى تحسن' : 'Highest Improvement'}</p>
              <p className="text-xl font-semibold text-white">{`+${highestImprovement.rankingChange}`}</p>
            </div>
          </div>
          <p className="text-xs text-indigo-300 mt-1 pl-12">
            {isArabic ? highestImprovement.universityAr : highestImprovement.university}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-lg p-4 h-[110px]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Building2 className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{isArabic ? 'أفضل تعاون صناعي' : 'Best Industry Collaboration'}</p>
              <p className="text-xl font-semibold text-white">{`${bestCollaboration.industryCollaboration}%`}</p>
            </div>
          </div>
          <p className="text-xs text-indigo-300 mt-1 pl-12">
            {isArabic ? bestCollaboration.universityAr : bestCollaboration.university}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/5 backdrop-blur-sm rounded-lg p-4 h-[110px]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Globe2 className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{isArabic ? 'الأكثر عالمية' : 'Most International Students'}</p>
              <p className="text-xl font-semibold text-white">{`${mostInternational.internationalStudents}%`}</p>
            </div>
          </div>
          <div className="text-xs text-indigo-300 mt-1 pl-12">
            <p>{isArabic ? mostInternational.universityAr : mostInternational.university}</p>
            {/* <p className="text-xs mt-1 text-indigo-300/80">{isArabic ? 'الطلاب الدوليين' : 'International Students'}</p> */}
          </div>
        </motion.div>
      </div>

      {/* Performance Heatmap */}
      <div className="rounded-lg mt-4">
        <div className="h-[400px] flex items-center justify-end pr-8">
          <ResponsiveHeatMap
            data={heatmapData}
            margin={{ top: 120, right: 140, bottom: 60, left: 140 }}
            valueFormat=">-.2s"
            theme={{
              axis: {
                ticks: {
                  text: {
                    fill: '#FFFFFF',
                    fontSize: 12
                  },
                  line: {
                    stroke: '#FFFFFF'
                  }
                },
                legend: {
                  text: {
                    fill: '#FFFFFF',
                    fontSize: 12
                  }
                }
              },
              background: 'transparent',
              labels: {
                text: {
                  fontSize: 11,
                  fontWeight: 600,
                  fill: '#FFFFFF'
                }
              },
              tooltip: {
                container: {
                  background: '#1f2937',
                  color: '#FFFFFF',
                  fontSize: 12
                }
              }
            }}
            axisTop={{
              tickSize: 5,
              tickPadding: 12,
              tickRotation: -45,
              format: (value) => {
                if (value.length > 10) {
                  const words = value.split(' ');
                  const lines = [];
                  let currentLine = words[0];
                  
                  for (let i = 1; i < words.length; i++) {
                    if ((currentLine + ' ' + words[i]).length <= 10) {
                      currentLine += ' ' + words[i];
                    } else {
                      lines.push(currentLine);
                      currentLine = words[i];
                    }
                  }
                  lines.push(currentLine);
                  return lines.join('\n');
                }
                return value;
              }
            }}
            axisRight={{
              tickSize: 5,
              tickPadding: 12,
              tickRotation: 0,
              format: (value) => {
                if (value.length > 12) {
                  const words = value.split(' ');
                  const lines = [];
                  let currentLine = words[0];
                  
                  for (let i = 1; i < words.length; i++) {
                    if ((currentLine + ' ' + words[i]).length <= 12) {
                      currentLine += ' ' + words[i];
                    } else {
                      lines.push(currentLine);
                      currentLine = words[i];
                    }
                  }
                  lines.push(currentLine);
                  return lines.join('\n');
                }
                return value;
              }
            }}
            axisBottom={{
              tickPadding: 5,
              tickRotation: 0,
              legend: isArabic ? 'الجامعات' : 'UNIVERSITIES',
              legendPosition: 'middle',
              legendOffset: 35,
              renderTick: () => <></>
            }}
            axisLeft={{
              tickSize: 0,
              tickPadding: 5,
              tickRotation: 0,
              // legend: isArabic ? 'المقاييس' : 'METRICES',
              legendPosition: 'middle',
              legendOffset: -35,
              // renderTick: () => null
            }}
            colors={{
              type: 'sequential',
              scheme: 'blues'
            }}
            emptyColor="#555555"
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.6]]
            }}
            labelTextColor="#FFFFFF"
            animate={true}
            motionConfig="gentle"
            hoverTarget="cell"
            tooltip={({ cell }) => (
              <div className="px-3 py-2 text-white bg-gray-800 rounded shadow-lg">
                <strong>{cell.data.x}</strong>
                <br />
                {cell.serieId}: {cell.formattedValue}%
                <br />
                <span className="text-xs text-gray-300">
                  {Number(cell.formattedValue) >= 90 ? 'Excellent' :
                    Number(cell.formattedValue) >= 85 ? 'Very Good' :
                    Number(cell.formattedValue) >= 80 ? 'Good' : 'Fair'}
                </span>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default TopUniversitiesPerformance;
