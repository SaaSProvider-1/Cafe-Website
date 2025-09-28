import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LottieWrapper from "./LottieWrapper";
import { Coffee } from "lucide-react";

const LoadingScreen = ({ isLoading, onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Brewing your experience...");

  const loadingTexts = useCallback(() => [
    "Brewing your experience...",
    "Grinding fresh beans...",
    "Heating the water...",
    "Preparing the perfect cup...",
    "Adding the final touches...",
    "Almost ready..."
  ], []);

  useEffect(() => {
    if (!isLoading) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onLoadingComplete?.();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    const textInterval = setInterval(() => {
      setLoadingText((prev) => {
        const texts = loadingTexts();
        const currentIndex = texts.indexOf(prev);
        const nextIndex = (currentIndex + 1) % texts.length;
        return texts[nextIndex];
      });
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [isLoading, onLoadingComplete, loadingTexts]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-coffee-900 via-coffee-800 to-coffee-900 flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(160, 82, 45, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(101, 67, 33, 0.1) 0%, transparent 50%)
            `
          }}
        >
          {/* Background Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cream-200 rounded-full opacity-20"
                animate={{
                  y: [0, -100],
                  x: [0, Math.sin(i) * 50],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "linear",
                }}
                style={{
                  left: `${10 + i * 4}%`,
                  bottom: "-10px",
                }}
              />
            ))}
          </div>

          {/* Coffee Steam Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-8 bg-gradient-to-t from-transparent to-cream-200 rounded-full opacity-40"
                animate={{
                  y: [0, -30, -60],
                  scaleY: [1, 1.2, 0.8],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut",
                }}
                style={{
                  left: `${48 + i * 1}%`,
                  top: "40%",
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center max-w-md mx-auto px-6">
            {/* Main Logo/Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut",
                type: "spring",
                stiffness: 100
              }}
              className="mb-8"
            >
              <div className="relative mx-auto w-32 h-32">
                {/* Fallback Coffee Icon with Animation */}
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-full h-full bg-gradient-to-br from-cream-200 to-cream-400 rounded-full flex items-center justify-center shadow-2xl"
                >
                  <Coffee size={48} className="text-coffee-800" />
                </motion.div>

                {/* Lottie Animation Overlay */}
                <div className="absolute inset-0">
                  <LottieWrapper
                    animationPath="/animations/coffee-brewing.json"
                    className="w-full h-full opacity-80"
                    width={128}
                    height={128}
                    fallback={
                      <motion.div
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <div className="w-16 h-16 border-4 border-cream-200 border-t-transparent rounded-full animate-spin" />
                      </motion.div>
                    }
                  />
                </div>

                {/* Rotating Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -inset-4 border-2 border-cream-300 border-t-transparent rounded-full"
                />
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-display text-[#4B2E2E] text-4xl md:text-5xl font-bold text-cream-100 mb-2"
            >
              Café Elite
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-[#B8885A] text-lg mb-8 font-medium"
            >
              Premium Coffee Experience
            </motion.p>

            {/* Loading Text */}
            <motion.div
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <p className="text-[#E6C67B] text-lg font-medium mb-4">
                {loadingText}
              </p>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-full max-w-xs mx-auto mb-6">
              <div className="bg-coffee-700/50 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cream-300 to-cream-500 rounded-full shadow-lg"
                  initial={{ width: "0%" }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              
              {/* Progress Text */}
              <motion.p
                className="text-center text-cream-300 text-sm mt-2 font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {Math.round(Math.min(progress, 100))}%
              </motion.p>
            </div>

            {/* Loading Spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
              className="mx-auto w-8 h-8 border-2 border-cream-300 border-t-transparent rounded-full"
            />

            {/* Coffee Beans Animation */}
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-coffee-600 rounded-full"
                  animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${-10 + i * 10}px`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-cream-300/20 rounded-full" />
          <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-cream-300/20 rounded-full" />
          <div className="absolute top-1/4 right-10 w-12 h-12 border-2 border-cream-300/20 rounded-full" />
          <div className="absolute bottom-1/4 left-10 w-14 h-14 border-2 border-cream-300/20 rounded-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;