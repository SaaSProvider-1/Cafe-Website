import React from "react";
import { motion } from "framer-motion";

const CoffeeBrewingAnimation = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Coffee Cup */}
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Cup */}
        <div className="w-32 h-40 bg-gradient-to-b from-white to-coffee-100 rounded-b-3xl border-4 border-coffee-300 relative">
          {/* Coffee liquid */}
          <motion.div
            className="absolute bottom-2 left-2 right-2 bg-gradient-to-t from-coffee-800 to-coffee-600 rounded-b-2xl"
            initial={{ height: 0 }}
            animate={{ height: "80%" }}
            transition={{ duration: 2, delay: 1 }}
          />

          {/* Handle */}
          <div className="absolute right-0 top-6 w-6 h-12 border-4 border-coffee-300 rounded-r-xl border-l-0"></div>
        </div>

        {/* Saucer */}
        <div className="absolute -bottom-2 -left-4 w-40 h-6 bg-gradient-to-b from-coffee-200 to-coffee-300 rounded-full border-2 border-coffee-400"></div>
      </motion.div>

      {/* Steam Animation */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-16 bg-gradient-to-t from-white/60 via-white/40 to-transparent rounded-full"
            animate={{
              y: [0, -20, -40],
              opacity: [0.6, 0.3, 0],
              scale: [1, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut",
            }}
            style={{ left: `${-8 + i * 8}px` }}
          />
        ))}
      </div>

      {/* Coffee Beans falling */}
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-4 bg-coffee-800 rounded-full"
            animate={{
              y: [0, 100],
              rotate: [0, 360],
              opacity: [1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeIn",
            }}
            style={{
              left: `${-12 + i * 8}px`,
              background: `radial-gradient(ellipse, #8B4513 30%, #5D2F0A 70%)`,
            }}
          />
        ))}
      </div>

      {/* Brewing process indicator */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-coffee-600 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CoffeeBrewingAnimation;
