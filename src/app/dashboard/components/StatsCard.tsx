"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: number;
  isPercentage?: boolean;
  isCurrency?: boolean;
  details?: {
    label: string;
    value: number;
    percentage?: number;
  }[];
}

const StatsCard = ({
  title,
  value,
  icon,
  trend,
  isPercentage,
  isCurrency,
  details
}: StatsCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatValue = (val: number) => {
    if (isPercentage) return `${val}%`;
    if (isCurrency) return `SAR ${val.toLocaleString()}`;
    return val.toLocaleString();
  };

  return (
    <motion.div
      className={`relative bg-[#1e3a8a4d] backdrop-blur-sm rounded-lg p-6 cursor-pointer 
        ${details ? 'hover:bg-[#1e3a8a6d]' : ''}`}
      onClick={() => details && setIsExpanded(!isExpanded)}
      whileHover={{ scale: details ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[#B3E5FC] text-sm mb-1">{title}</p>
          <h3 className="text-[#E3F2FD] text-2xl font-bold">{formatValue(value)}</h3>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trend > 0 ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        <div className="text-[#E3F2FD] opacity-80">
          {icon}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && details && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-[#E3F2FD20]"
          >
            {details.map((detail, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <span className="text-[#B3E5FC] text-sm">{detail.label}</span>
                <div className="flex items-center">
                  <span className="text-[#E3F2FD] font-medium">
                    {formatValue(detail.value)}
                  </span>
                  {detail.percentage && (
                    <span className="text-[#B3E5FC] text-xs ml-2">
                      ({detail.percentage}%)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {details && (
        <div 
          className="absolute bottom-2 right-2 text-[#E3F2FD] opacity-60"
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      )}
    </motion.div>
  );
};

export default StatsCard;
