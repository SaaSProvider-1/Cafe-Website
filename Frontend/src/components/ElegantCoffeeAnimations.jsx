import React from "react";
import { motion } from "framer-motion";

// Elegant Coffee Aroma Particles
export const CoffeeAromaParticles = ({ className = "" }) => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: 80 + Math.random() * 20, // Start from bottom
    size: 2 + Math.random() * 3,
    delay: Math.random() * 4,
    duration: 6 + Math.random() * 4,
  }));

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-t from-amber-200/30 to-transparent"
          style={{
            left: `${particle.initialX}%`,
            bottom: `${particle.initialY}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-20, -200, -400],
            x: [0, Math.sin(particle.id) * 30, Math.cos(particle.id) * 20],
            opacity: [0, 0.8, 0.6, 0],
            scale: [0.5, 1, 1.5, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

// Gentle Coffee Bean Rain
export const CoffeeBeanRain = ({ className = "" }) => {
  const beans = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    initialX: 10 + Math.random() * 80,
    delay: Math.random() * 3,
    duration: 8 + Math.random() * 4,
    rotation: Math.random() * 360,
  }));

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {beans.map((bean) => (
        <motion.div
          key={bean.id}
          className="absolute opacity-20"
          style={{
            left: `${bean.initialX}%`,
            top: "-10%",
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            rotate: [bean.rotation, bean.rotation + 360],
            x: [0, Math.sin(bean.id) * 50],
          }}
          transition={{
            duration: bean.duration,
            repeat: Infinity,
            delay: bean.delay,
            ease: "linear",
          }}
        >
          <div className="w-3 h-4 bg-gradient-to-br from-amber-800 to-amber-900 rounded-full relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-3 bg-amber-700 rounded-full" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Floating Coffee Sparkles
export const CoffeeSparkles = ({ className = "" }) => {
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.initialX}%`,
            top: `${sparkle.initialY}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        >
          <div className="w-1 h-1 bg-amber-300 rounded-full relative">
            <div className="absolute -top-0.5 -left-0.5 w-2 h-2 border border-amber-200 rotate-45 opacity-60" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Subtle Wave Animation
export const CoffeeWaves = ({ className = "" }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-0 right-0 h-32 opacity-10"
          style={{
            background: `linear-gradient(to top, rgba(139, 69, 19, ${
              0.3 - i * 0.1
            }) 0%, transparent 100%)`,
          }}
          animate={{
            transform: [
              "translateX(0px) scaleY(1)",
              "translateX(-50px) scaleY(1.1)",
              "translateX(0px) scaleY(1)",
            ],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default {
  CoffeeAromaParticles,
  CoffeeBeanRain,
  CoffeeSparkles,
  CoffeeWaves,
};
