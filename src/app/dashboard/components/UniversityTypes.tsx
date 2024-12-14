"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/app/dashboard/context/LanguageContext';
import { Building2, Users, GraduationCap, TrendingUp, Briefcase } from 'lucide-react';

interface UniversityTypesProps {
  publicUniversities: number;
  privateUniversities: number;
  totalUniversities: number;
  regions: Array<{
    name: string;
    count: number;
    employment_rate: number;
  }>;
}

const UniversityTypes = ({
  publicUniversities,
  privateUniversities,
  totalUniversities,
}: UniversityTypesProps) => {
  const { isArabic } = useLanguage();
  const [selectedType, setSelectedType] = useState<'public' | 'private' | null>(null);

  const metrics = {
    public: {
      color: '#3B82F6',
      gradient: 'from-blue-500/20 to-blue-600/20',
      stats: [
        { icon: <Building2 className="w-4 h-4 text-blue-400" />, value: publicUniversities, label: isArabic ? 'جامعة' : 'Universities' },
        { icon: <Users className="w-4 h-4 text-blue-400" />, value: '120K', label: isArabic ? 'طالب' : 'Students' },
        { icon: <GraduationCap className="w-4 h-4 text-blue-400" />, value: '85%', label: isArabic ? 'معدل التخرج' : 'Graduation Rate' },
        { icon: <Briefcase className="w-4 h-4 text-blue-400" />, value: '72%', label: isArabic ? 'معدل التوظيف' : 'Employment Rate' }
      ]
    },
    private: {
      color: '#8B5CF6',
      gradient: 'from-purple-500/20 to-purple-600/20',
      stats: [
        { icon: <Building2 className="w-4 h-4 text-purple-400" />, value: privateUniversities, label: isArabic ? 'جامعة' : 'Universities' },
        { icon: <Users className="w-4 h-4 text-purple-400" />, value: '45K', label: isArabic ? 'طالب' : 'Students' },
        { icon: <GraduationCap className="w-4 h-4 text-purple-400" />, value: '92%', label: isArabic ? 'معدل التخرج' : 'Graduation Rate' },
        { icon: <Briefcase className="w-4 h-4 text-purple-400" />, value: '78%', label: isArabic ? 'معدل التوظيف' : 'Employment Rate' }
      ]
    }
  };

  return (
    <div className="bg-[#1e3a8a4d] backdrop-blur-sm rounded-lg p-6 h-full flex flex-col">
      <h3 className="text-2xl font-semibold text-[#E3F2FD] mb-6">
        {isArabic ? 'أنواع الجامعات' : 'University and Institutions'}
      </h3>

      <div className="grid grid-cols-2 gap-6 flex-1">
        {/* Public Universities Card */}
        <motion.div
          className={`relative p-4 rounded-lg transition-all duration-300 cursor-pointer
            ${selectedType === 'public' ? 'bg-gradient-to-br ' + metrics.public.gradient : 'bg-[#ffffff10] hover:bg-[#ffffff15]'}`}
          onClick={() => setSelectedType(selectedType === 'public' ? null : 'public')}
          whileHover={{ scale: 1.02 }}
          layout
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Building2 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-[#E3F2FD] font-semibold">
                {isArabic ? 'جامعات حكومية' : 'Public Universities'}
              </h4>
              <p className="text-[#B3E5FC] text-sm">
                {((publicUniversities / totalUniversities) * 100).toFixed(1)}% {isArabic ? 'من الإجمالي' : 'of total'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {metrics.public.stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                {stat.icon}
                <div>
                  <div className="text-[#E3F2FD] font-semibold">{stat.value}</div>
                  <div className="text-[#B3E5FC] text-xs">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {selectedType === 'public' && (
            <motion.div 
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </motion.div>
          )}
        </motion.div>

        {/* Private Universities Card */}
        <motion.div
          className={`relative p-4 rounded-lg transition-all duration-300 cursor-pointer
            ${selectedType === 'private' ? 'bg-gradient-to-br ' + metrics.private.gradient : 'bg-[#ffffff10] hover:bg-[#ffffff15]'}`}
          onClick={() => setSelectedType(selectedType === 'private' ? null : 'private')}
          whileHover={{ scale: 1.02 }}
          layout
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Building2 className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="text-[#E3F2FD] font-semibold">
                {isArabic ? 'جامعات خاصة' : 'Private Universities'}
              </h4>
              <p className="text-[#B3E5FC] text-sm">
                {((privateUniversities / totalUniversities) * 100).toFixed(1)}% {isArabic ? 'من الإجمالي' : 'of total'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {metrics.private.stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                {stat.icon}
                <div>
                  <div className="text-[#E3F2FD] font-semibold">{stat.value}</div>
                  <div className="text-[#B3E5FC] text-xs">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {selectedType === 'private' && (
            <motion.div 
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UniversityTypes;
