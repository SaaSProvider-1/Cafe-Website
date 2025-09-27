import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-coffee-900 z-50 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border-4 border-cream-400 rounded-full"></div>
          <div className="absolute inset-2 border-4 border-coffee-600 rounded-full"></div>
          <div className="absolute inset-4 border-4 border-cream-400 rounded-full"></div>
          <motion.div
            className="absolute inset-6 bg-coffee-600 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-white font-bold text-2xl">☕</span>
          </motion.div>
        </motion.div>

        <motion.h2
          className="font-display text-2xl font-bold text-cream-400 mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Brewing Your Experience
        </motion.h2>

        <div className="flex justify-center space-x-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-cream-400 rounded-full"
              animate={{ y: [-10, 0, -10] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
