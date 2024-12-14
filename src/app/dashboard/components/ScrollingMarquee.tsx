import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeItem {
  id: string;
  text: string;
}

const ScrollingMarquee = ({ items }: { items: MarqueeItem[] }) => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-green-900/20 via-green-800/20 to-green-900/20 py-3">
      <div className="flex space-x-8">
        <motion.div
          className="flex space-x-8 whitespace-nowrap"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-2 text-white/90"
            >
              <span className="text-green-400">•</span>
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
        <motion.div
          className="flex space-x-8 whitespace-nowrap"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-2 text-white/90"
            >
              <span className="text-green-400">•</span>
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollingMarquee;
