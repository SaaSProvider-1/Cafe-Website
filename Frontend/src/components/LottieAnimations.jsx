import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

const FloatingCoffeeBeans = ({ className = "" }) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Floating Coffee Beans */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-5 bg-gradient-radial from-coffee-700 to-coffee-900 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth || 1200,
            y: Math.random() * window.innerHeight || 800,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            x: [null, Math.random() * 50 - 25],
            rotate: [null, 360],
            opacity: [0.6, 0.3, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear",
          }}
          style={{
            background: `radial-gradient(ellipse at 30% 30%, #977669, #43302b)`,
            boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.3)",
          }}
        />
      ))}

      {/* Coffee Steam Effects */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`steam-${i}`}
          className="absolute w-3 h-20 opacity-20"
          initial={{
            x: Math.random() * (window.innerWidth || 1200),
            y: window.innerHeight || 800,
          }}
          animate={{
            y: [null, -100],
            opacity: [0.2, 0.4, 0],
            scale: [1, 1.5, 0.8],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut",
          }}
          style={{
            background:
              "linear-gradient(to top, transparent, rgba(255,255,255,0.6), transparent)",
          }}
        />
      ))}
    </div>
  );
};

const CoffeeLoadingAnimation = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Coffee Cup */}
        <motion.div
          className="w-16 h-20 bg-gradient-to-b from-white to-coffee-100 rounded-b-3xl border-2 border-coffee-400 relative"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Coffee Liquid */}
          <motion.div
            className="absolute bottom-1 left-1 right-1 bg-gradient-to-t from-coffee-900 to-coffee-700 rounded-b-2xl"
            initial={{ height: 0 }}
            animate={{ height: "75%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          {/* Handle */}
          <div className="absolute right-0 top-4 w-3 h-8 border-2 border-coffee-400 rounded-r-lg border-l-0"></div>
        </motion.div>

        {/* Steam */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-12 bg-gradient-to-t from-white/50 to-transparent rounded-full"
              animate={{
                y: [0, -20],
                opacity: [0.7, 0],
                scale: [1, 1.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut",
              }}
              style={{ left: `${-4 + i * 4}px` }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-coffee-700 text-sm font-semibold whitespace-nowrap"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Brewing...
        </motion.div>
      </div>
    </div>
  );
};

export { FloatingCoffeeBeans, CoffeeLoadingAnimation };
