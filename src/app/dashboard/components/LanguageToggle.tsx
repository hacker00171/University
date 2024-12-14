"use client";

import { useLanguage } from '@/app/dashboard/context/LanguageContext';
import { motion } from 'framer-motion';

export default function LanguageToggle() {
  const { isArabic, toggleLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="absolute top-4 right-12 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full 
                 shadow-lg backdrop-blur-sm bg-opacity-80 font-semibold z-50"
    >
      {isArabic ? 'English' : 'العربية'}
    </motion.button>
  );
}
