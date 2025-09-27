import React from "react";
import { motion } from "framer-motion";

// Floating Coffee Steam Animation
export const CoffeeSteamAnimation = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-8 bg-gradient-to-t from-transparent via-white/20 to-transparent rounded-full"
          style={{
            left: `${20 + i * 10}%`,
            bottom: "60%",
          }}
          animate={{
            y: [-20, -60],
            opacity: [0, 1, 0.8, 0],
            scale: [0.8, 1.2, 1, 0.6],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Floating Coffee Beans Animation
export const FloatingCoffeeBeansAnimation = ({ className = "" }) => {
  const beans = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    size: 15 + Math.random() * 10,
    delay: Math.random() * 2,
  }));

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {beans.map((bean) => (
        <motion.div
          key={bean.id}
          className="absolute"
          style={{
            left: `${bean.initialX}%`,
            top: `${bean.initialY}%`,
          }}
          animate={{
            y: [-20, -40, -20],
            x: [-10, 10, -10],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + bean.delay,
            repeat: Infinity,
            delay: bean.delay,
            ease: "easeInOut",
          }}
        >
          <div
            className="bg-gradient-to-br from-amber-900 to-amber-700 rounded-full opacity-60"
            style={{
              width: `${bean.size}px`,
              height: `${bean.size}px`,
              boxShadow:
                "inset 2px 2px 4px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
            }}
          />
          {/* Coffee bean crack */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 bg-amber-800 rounded-full opacity-80"
            style={{
              height: `${bean.size * 0.7}px`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Coffee Cup with Steam Animation
export const CoffeeCupSteamAnimation = ({ className = "" }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Coffee Cup */}
      <motion.svg
        width="120"
        height="140"
        viewBox="0 0 120 140"
        className="drop-shadow-xl"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Cup */}
        <path
          d="M20 40 L20 100 Q20 110 30 110 L80 110 Q90 110 90 100 L90 40 Z"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="2"
        />

        {/* Coffee */}
        <path
          d="M22 42 L22 98 Q22 108 32 108 L78 108 Q88 108 88 98 L88 42 Z"
          fill="#3B2F2F"
        />

        {/* Coffee surface */}
        <ellipse cx="55" cy="42" rx="33" ry="4" fill="#654321" />

        {/* Handle */}
        <path
          d="M90 55 Q105 55 105 70 Q105 85 90 85"
          fill="none"
          stroke="#8B4513"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Saucer */}
        <ellipse cx="55" cy="115" rx="45" ry="8" fill="#A0522D" />
        <ellipse cx="55" cy="113" rx="45" ry="8" fill="#CD853F" />
      </motion.svg>

      {/* Steam */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-12 bg-gradient-to-t from-white/40 to-transparent rounded-full"
            style={{ left: `${-10 + i * 5}px` }}
            animate={{
              y: [-10, -50],
              opacity: [0, 1, 0],
              x: [0, (i - 2) * 3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Coffee Drip Animation
export const CoffeeDripAnimation = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Coffee Dripper */}
      <motion.svg
        width="100"
        height="120"
        viewBox="0 0 100 120"
        className="absolute top-0 left-1/2 transform -translate-x-1/2"
      >
        {/* Dripper */}
        <path
          d="M30 20 L70 20 L65 40 L35 40 Z"
          fill="#8B4513"
          stroke="#654321"
          strokeWidth="1"
        />

        {/* Filter */}
        <path
          d="M35 40 L65 40 L60 55 L40 55 Z"
          fill="#F5F5DC"
          stroke="#DDD"
          strokeWidth="1"
        />
      </motion.svg>

      {/* Coffee Drops */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-3 bg-amber-900 rounded-full"
          style={{
            left: "50%",
            top: "45px",
            transform: "translateX(-50%)",
          }}
          animate={{
            y: [0, 60],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeIn",
          }}
        />
      ))}

      {/* Cup below */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        <div className="w-16 h-20 bg-gradient-to-b from-amber-100 to-amber-900 rounded-b-lg border-2 border-amber-800" />
      </motion.div>
    </div>
  );
};

export default {
  CoffeeSteamAnimation,
  FloatingCoffeeBeansAnimation,
  CoffeeCupSteamAnimation,
  CoffeeDripAnimation,
};
