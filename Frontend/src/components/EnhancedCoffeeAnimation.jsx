import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";

const EnhancedCoffeeAnimation = ({ className = "", animationData = null }) => {
  const [brewingStage, setBrewingStage] = useState(0);

  // Simulate brewing stages
  useEffect(() => {
    const interval = setInterval(() => {
      setBrewingStage((prev) => (prev + 1) % 4);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // If Lottie animation data is provided, use it
  if (animationData) {
    return (
      <div className={`relative ${className}`}>
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Coffee Maker */}
        <div className="relative">
          {/* Water Tank */}
          <motion.div
            className="w-24 h-32 bg-gradient-to-b from-blue-100 to-blue-200 rounded-t-2xl border-2 border-coffee-400 relative overflow-hidden mx-auto"
            animate={{ rotate: brewingStage === 0 ? [0, 1, -1, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Water level */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-300"
              initial={{ height: "80%" }}
              animate={{ height: brewingStage > 1 ? "20%" : "80%" }}
              transition={{ duration: 2 }}
            />

            {/* Bubbles */}
            <AnimatePresence>
              {brewingStage === 1 && (
                <>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-white/70 rounded-full"
                      initial={{ y: 80, x: Math.random() * 60 + 10 }}
                      animate={{ y: -10 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "linear",
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Filter Section */}
          <div className="w-20 h-4 bg-coffee-300 mx-auto border border-coffee-500 relative mt-1">
            <div className="absolute inset-0.5 bg-coffee-700 rounded-sm">
              {brewingStage >= 1 && (
                <motion.div
                  className="absolute inset-0 bg-coffee-900 rounded-sm"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                />
              )}
            </div>
          </div>

          {/* Coffee Pot */}
          <motion.div
            className="w-28 h-36 bg-gradient-to-b from-white to-coffee-50 rounded-b-3xl border-2 border-coffee-400 relative mx-auto mt-1"
            animate={{ y: brewingStage === 3 ? [0, -3, 0] : 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Coffee liquid */}
            <motion.div
              className="absolute bottom-2 left-2 right-2 rounded-b-2xl"
              initial={{ height: 0 }}
              animate={{
                height: brewingStage >= 2 ? "70%" : 0,
              }}
              style={{
                background:
                  brewingStage >= 3
                    ? "linear-gradient(to top, #2d1f1a, #43302b, #846358)"
                    : "linear-gradient(to top, #43302b, #846358, #977669)",
              }}
              transition={{ duration: 2 }}
            />

            {/* Handle */}
            <div className="absolute right-0 top-6 w-4 h-12 border-2 border-coffee-400 rounded-r-xl border-l-0"></div>

            {/* Spout */}
            <div className="absolute left-0 top-8 w-2 h-4 bg-coffee-50 border border-coffee-400 rounded-l-full"></div>
          </motion.div>
        </div>

        {/* Dripping Animation */}
        <AnimatePresence>
          {brewingStage >= 1 && brewingStage <= 2 && (
            <motion.div className="absolute top-24 left-1/2 transform -translate-x-1/2">
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-4 bg-coffee-800 rounded-full"
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: 25, opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeIn",
                  }}
                  style={{ left: `${-2 + i * 4}px` }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Steam Animation */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-12 bg-gradient-to-t from-white/50 via-white/30 to-transparent rounded-full"
              animate={{
                y: [-5, -25, -5],
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
              style={{ left: `${-6 + i * 6}px` }}
            />
          ))}
        </div>

        {/* Brewing Status */}
        <motion.div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="bg-coffee-800 text-white px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
            key={brewingStage}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {brewingStage === 0 && "Ready to Brew ☕"}
            {brewingStage === 1 && "Heating Water 🔥"}
            {brewingStage === 2 && "Brewing Magic ✨"}
            {brewingStage === 3 && "Perfect Coffee! 🎉"}
          </motion.div>

          {/* Progress dots */}
          <div className="flex justify-center space-x-1.5 mt-2">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  i <= brewingStage ? "bg-coffee-600" : "bg-coffee-300"
                }`}
                animate={{
                  scale: i === brewingStage ? [1, 1.3, 1] : 1,
                }}
                transition={{ duration: 0.4, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EnhancedCoffeeAnimation;
