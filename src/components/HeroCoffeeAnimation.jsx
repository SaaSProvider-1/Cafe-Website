import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroCoffeeAnimation = ({ className = "" }) => {
  const [animationState, setAnimationState] = useState("pouring");

  useEffect(() => {
    const states = ["pouring", "steaming", "floating", "brewing"];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % states.length;
      setAnimationState(states[currentIndex]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Main Coffee Cup - Larger and more prominent */}
      <motion.div
        className="relative mx-auto"
        animate={{
          y: animationState === "floating" ? [-5, 5, -5] : 0,
          rotate: animationState === "brewing" ? [0, 2, -2, 0] : 0,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Coffee Cup */}
        <div className="w-40 h-56 bg-gradient-to-b from-white via-cream-100 to-cream-200 rounded-b-[3rem] border-4 border-coffee-400 relative shadow-2xl">
          {/* Coffee Liquid with Dynamic Fill */}
          <motion.div
            className="absolute bottom-4 left-4 right-4 rounded-b-[2.5rem] overflow-hidden"
            initial={{ height: 0 }}
            animate={{
              height: animationState === "pouring" ? "85%" : "75%",
            }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            {/* Coffee Gradient */}
            <div
              className="w-full h-full relative"
              style={{
                background: `linear-gradient(to top, 
                  #2d1f1a 0%, 
                  #43302b 20%, 
                  #846358 40%, 
                  ${animationState === "brewing" ? "#977669" : "#846358"} 60%,
                  ${animationState === "steaming" ? "#a18072" : "#977669"} 80%,
                  #bfa094 100%)`,
              }}
            >
              {/* Coffee Surface Ripples */}
              {animationState === "pouring" && (
                <motion.div
                  className="absolute top-0 left-0 right-0 h-2 bg-coffee-600 rounded-full opacity-60"
                  animate={{
                    scaleX: [1, 1.1, 1],
                    opacity: [0.6, 0.3, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              )}

              {/* Foam/Crema Layer */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-cream-300 via-cream-200 to-cream-300 rounded-full"
                animate={{
                  opacity: [0.8, 1, 0.8],
                  y: animationState === "floating" ? [0, -2, 0] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>

          {/* Coffee Cup Handle */}
          <div className="absolute right-0 top-12 w-8 h-20 border-4 border-coffee-400 rounded-r-2xl border-l-0 shadow-lg"></div>

          {/* Coffee Cup Logo/Design */}
          <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-16 h-8 bg-coffee-200 rounded-full opacity-30"></div>
        </div>

        {/* Saucer */}
        <div className="absolute -bottom-4 -left-6 w-52 h-8 bg-gradient-to-b from-coffee-200 to-coffee-300 rounded-full border-2 border-coffee-400 shadow-xl"></div>
      </motion.div>

      {/* Dynamic Steam Animation */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
        <AnimatePresence>
          {(animationState === "steaming" || animationState === "floating") && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-24 rounded-full"
                  initial={{ opacity: 0, y: 0, scale: 1 }}
                  animate={{
                    opacity: [0, 0.7, 0.4, 0],
                    y: [-10, -50, -80],
                    scale: [1, 1.5, 0.8],
                    x: [0, Math.sin(i) * 15, Math.sin(i) * 25],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeOut",
                  }}
                  style={{
                    left: `${-15 + i * 8}px`,
                    background: `linear-gradient(to top, 
                      rgba(255,255,255,0.6), 
                      rgba(255,255,255,0.3), 
                      transparent)`,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Coffee Beans Floating Around */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-5 rounded-full shadow-lg"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i * 0.8) * 40, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 200}px`,
              top: `${Math.random() * 200}px`,
              background: `radial-gradient(ellipse at 30% 30%, 
                #977669, 
                #43302b)`,
              boxShadow: "inset -2px -2px 4px rgba(0,0,0,0.3)",
            }}
          />
        ))}
      </div>

      {/* Pouring Animation */}
      <AnimatePresence>
        {animationState === "pouring" && (
          <motion.div
            className="absolute -top-16 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Coffee Pot/Kettle */}
            <motion.div
              className="w-12 h-8 bg-coffee-800 rounded-t-full relative"
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {/* Spout */}
              <div className="absolute bottom-0 right-0 w-3 h-6 bg-coffee-800 transform rotate-45 origin-bottom"></div>
            </motion.div>

            {/* Coffee Stream */}
            <motion.div
              className="absolute top-8 right-2 w-1 h-16 bg-coffee-900 rounded-full"
              initial={{ height: 0 }}
              animate={{ height: 64 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animation State Label */}
      <motion.div
        className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
        key={animationState}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-coffee-800 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
          {animationState === "pouring" && "☕ Pouring Perfection"}
          {animationState === "steaming" && "💨 Fresh & Hot"}
          {animationState === "floating" && "✨ Aromatic Bliss"}
          {animationState === "brewing" && "🔥 Brewing Magic"}
        </div>
      </motion.div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-cream-300/20 via-transparent to-transparent rounded-full"></div>
    </div>
  );
};

export default HeroCoffeeAnimation;
