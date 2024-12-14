import { useLanguage } from '@/app/dashboard/context/LanguageContext';
import { motion } from 'framer-motion';
import { GraduationCap,  Users, Building2 } from 'lucide-react';

const KeyInsightsMarquee = () => {
  const { isArabic } = useLanguage();

  const insights = [
    {
      icon: <GraduationCap className="w-5 h-5 text-blue-400" />,
      text: isArabic 
        ? "إجمالي الخريجين: 207.9 ألف (98٪ سعوديون)"
        : "Total Graduates: 207.9K (98% Saudis)",
    },
    {
      icon: <Users className="w-5 h-5 text-green-400" />,
      text: isArabic
        ? "التخصص الأعلى: الأعمال والقانون (65,792 خريج)"
        : "Top Major: Business & Law (65,792 graduates)",
    },
    {
      icon: <Building2 className="w-5 h-5 text-purple-400" />,
      text: isArabic
        ? "أعلى متوسط راتب: 6,800 ريال في الهندسة"
        : "Highest Median Wage: SAR 6,800 in Engineering",
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-3 overflow-hidden"
    >
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ 
          x: ["0%", "-50%"]
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...insights, ...insights].map((insight, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 mx-8"
          >
            <div className="p-1.5 rounded-full bg-white/10 mr-2">
              {insight.icon}
            </div>
            <span className="text-sm font-medium">
              {insight.text}
            </span>
            <span className="mx-8 text-gray-500">•</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default KeyInsightsMarquee;
