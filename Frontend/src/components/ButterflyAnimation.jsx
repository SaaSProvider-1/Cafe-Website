import React from "react";
import { motion } from "framer-motion";

const ButterflyAnimation = ({
  isVisible,
  delay = 0,
  direction = "topRight",
}) => {
  if (!isVisible) return null;

  // Define different flight patterns based on direction
  const getFlightPath = (direction) => {
    const patterns = {
      topRight: {
        x: [0, 80, 160, 240, 320],
        y: [0, -40, -80, -120, -180],
        rotateZ: [0, 5, -3, 8, -5],
      },
      topLeft: {
        x: [0, -80, -160, -240, -320],
        y: [0, -40, -80, -120, -180],
        rotateZ: [0, -5, 3, -8, 5],
      },
      right: {
        x: [0, 100, 200, 300, 400],
        y: [0, -10, -5, -15, -10],
        rotateZ: [0, 3, -2, 5, -3],
      },
      left: {
        x: [0, -100, -200, -300, -400],
        y: [0, -10, -5, -15, -10],
        rotateZ: [0, -3, 2, -5, 3],
      },
      top: {
        x: [0, 20, -10, 15, -5],
        y: [0, -80, -160, -240, -320],
        rotateZ: [0, 2, -3, 4, -2],
      },
      bottomRight: {
        x: [0, 60, 120, 180, 240],
        y: [0, 20, 40, 60, 80],
        rotateZ: [0, 8, -5, 10, -7],
      },
      bottomLeft: {
        x: [0, -60, -120, -180, -240],
        y: [0, 20, 40, 60, 80],
        rotateZ: [0, -8, 5, -10, 7],
      },
      spiral: {
        x: [0, 50, 0, -50, 0],
        y: [0, -50, -100, -150, -200],
        rotateZ: [0, 90, 180, 270, 360],
      },
      zigzag: {
        x: [0, 60, -40, 80, -60],
        y: [0, -30, -60, -90, -120],
        rotateZ: [0, 15, -20, 25, -15],
      },
    };
    return patterns[direction] || patterns.topRight;
  };

  // Add variety to butterfly appearance
  const getButterflyVariety = (delay) => {
    const varieties = [
      { size: 80, color: "#FF8C00", accent: "#CC4400" }, // Original orange
      { size: 70, color: "#FF6B35", accent: "#E55100" }, // Darker orange
      { size: 90, color: "#FFA726", accent: "#F57C00" }, // Lighter orange
      { size: 75, color: "#FF7043", accent: "#D84315" }, // Red-orange
      { size: 85, color: "#FFAB40", accent: "#FF8F00" }, // Yellow-orange
    ];
    const index = Math.floor(delay * 2) % varieties.length;
    return varieties[index];
  };

  const variety = getButterflyVariety(delay);
  const flightPath = getFlightPath(direction);

  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        perspective: "1000px",
      }}
      initial={{
        opacity: 0,
        scale: 0.1,
        x: 0,
        y: 0,
        rotateZ: 0,
      }}
      animate={{
        opacity: [0, 1, 1, 0.8, 0],
        scale: [0.1, 0.6, 1, 0.8, 0.3],
        x: flightPath.x,
        y: flightPath.y,
        rotateZ: flightPath.rotateZ,
      }}
      transition={{
        duration: direction === "spiral" ? 6 : direction === "zigzag" ? 4 : 5,
        delay: delay,
        ease:
          direction === "spiral"
            ? "easeInOut"
            : direction === "zigzag"
            ? "easeInOut"
            : "easeOut",
      }}
    >
      {/* Realistic Monarch Butterfly SVG with variety */}
      <motion.svg
        width={variety.size}
        height={variety.size * 0.75}
        viewBox="0 0 80 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xl"
      >
        <defs>
          {/* Realistic Monarch Orange Gradient with variety */}
          <radialGradient
            id={`monarchOrange${delay}`}
            cx="40%"
            cy="30%"
            r="60%"
          >
            <stop offset="0%" stopColor={variety.color} stopOpacity="0.95" />
            <stop offset="30%" stopColor={variety.color} stopOpacity="0.9" />
            <stop offset="70%" stopColor={variety.accent} stopOpacity="0.85" />
            <stop offset="100%" stopColor={variety.accent} stopOpacity="0.8" />
          </radialGradient>

          {/* Wing Border Pattern */}
          <linearGradient
            id={`wingBorder${delay}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#000000" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#1a1a1a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.9" />
          </linearGradient>

          {/* Drop Shadow Filter */}
          <filter
            id={`dropshadow${delay}`}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="2" dy="3" result="offset" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left Upper Wing - Realistic Monarch Shape */}
        <motion.path
          d="M40 25 C32 12, 22 8, 12 15 C5 20, 3 28, 8 35 C15 42, 25 40, 35 35 C38 32, 40 28, 40 25 Z"
          fill={`url(#monarchOrange${delay})`}
          stroke={`url(#wingBorder${delay})`}
          strokeWidth="1.5"
          filter={`url(#dropshadow${delay})`}
          animate={{
            rotateY: [-25, 15, -20, 10, -25],
            rotateX: [5, -10, 8, -5, 5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Right Upper Wing */}
        <motion.path
          d="M40 25 C48 12, 58 8, 68 15 C75 20, 77 28, 72 35 C65 42, 55 40, 45 35 C42 32, 40 28, 40 25 Z"
          fill={`url(#monarchOrange${delay})`}
          stroke={`url(#wingBorder${delay})`}
          strokeWidth="1.5"
          filter={`url(#dropshadow${delay})`}
          animate={{
            rotateY: [25, -15, 20, -10, 25],
            rotateX: [5, -10, 8, -5, 5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Left Lower Wing */}
        <motion.path
          d="M40 30 C35 38, 28 45, 20 43 C12 40, 10 48, 18 52 C26 55, 35 50, 40 42 Z"
          fill={`url(#monarchOrange${delay})`}
          stroke={`url(#wingBorder${delay})`}
          strokeWidth="1.5"
          filter={`url(#dropshadow${delay})`}
          animate={{
            rotateY: [-30, 20, -25, 15, -30],
            rotateX: [8, -12, 10, -8, 8],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.1,
          }}
        />

        {/* Right Lower Wing */}
        <motion.path
          d="M40 30 C45 38, 52 45, 60 43 C68 40, 70 48, 62 52 C54 55, 45 50, 40 42 Z"
          fill={`url(#monarchOrange${delay})`}
          stroke={`url(#wingBorder${delay})`}
          strokeWidth="1.5"
          filter={`url(#dropshadow${delay})`}
          animate={{
            rotateY: [30, -20, 25, -15, 30],
            rotateX: [8, -12, 10, -8, 8],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.1,
          }}
        />

        {/* Realistic Black Wing Borders and Veins */}
        <path
          d="M40 25 C32 12, 22 8, 12 15"
          stroke="#000"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M40 25 C48 12, 58 8, 68 15"
          stroke="#000"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M40 30 C35 38, 28 45, 20 43"
          stroke="#000"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M40 30 C45 38, 52 45, 60 43"
          stroke="#000"
          strokeWidth="2"
          fill="none"
        />

        {/* Wing Veins - Realistic Pattern */}
        <path d="M40 25 L28 20" stroke="#000" strokeWidth="0.8" opacity="0.6" />
        <path d="M40 25 L52 20" stroke="#000" strokeWidth="0.8" opacity="0.6" />
        <path d="M40 30 L25 40" stroke="#000" strokeWidth="0.8" opacity="0.6" />
        <path d="M40 30 L55 40" stroke="#000" strokeWidth="0.8" opacity="0.6" />
        <path d="M30 25 L25 30" stroke="#000" strokeWidth="0.5" opacity="0.4" />
        <path d="M50 25 L55 30" stroke="#000" strokeWidth="0.5" opacity="0.4" />

        {/* White Spots - Characteristic Monarch Pattern */}
        <circle cx="25" cy="18" r="1.5" fill="#FFFFFF" opacity="0.9" />
        <circle cx="55" cy="18" r="1.5" fill="#FFFFFF" opacity="0.9" />
        <circle cx="22" cy="22" r="1" fill="#FFFFFF" opacity="0.8" />
        <circle cx="58" cy="22" r="1" fill="#FFFFFF" opacity="0.8" />
        <circle cx="28" cy="24" r="0.8" fill="#FFFFFF" opacity="0.7" />
        <circle cx="52" cy="24" r="0.8" fill="#FFFFFF" opacity="0.7" />

        {/* Black Spots Pattern */}
        <circle cx="20" cy="25" r="1.2" fill="#000000" opacity="0.8" />
        <circle cx="60" cy="25" r="1.2" fill="#000000" opacity="0.8" />
        <circle cx="24" cy="35" r="0.8" fill="#000000" opacity="0.6" />
        <circle cx="56" cy="35" r="0.8" fill="#000000" opacity="0.6" />

        {/* Realistic Body */}
        <ellipse
          cx="40"
          cy="30"
          rx="1.8"
          ry="15"
          fill="#000000"
          stroke="#1a1a1a"
          strokeWidth="0.5"
        />

        {/* Body Segments */}
        <circle cx="40" cy="22" r="1" fill="#333333" opacity="0.8" />
        <circle cx="40" cy="26" r="1" fill="#333333" opacity="0.8" />
        <circle cx="40" cy="30" r="1" fill="#333333" opacity="0.8" />
        <circle cx="40" cy="34" r="1" fill="#333333" opacity="0.8" />
        <circle cx="40" cy="38" r="1" fill="#333333" opacity="0.8" />

        {/* Realistic Head */}
        <circle cx="40" cy="18" r="2.2" fill="#000000" />
        <circle cx="40" cy="18" r="1.5" fill="#1a1a1a" />

        {/* Compound Eyes */}
        <circle cx="38" cy="17" r="1.2" fill="#000000" />
        <circle cx="42" cy="17" r="1.2" fill="#000000" />
        <circle cx="38" cy="17" r="0.6" fill="#2a2a2a" />
        <circle cx="42" cy="17" r="0.6" fill="#2a2a2a" />
        <circle cx="38" cy="16.5" r="0.3" fill="#ffffff" opacity="0.6" />
        <circle cx="42" cy="16.5" r="0.3" fill="#ffffff" opacity="0.6" />

        {/* Realistic Antennae */}
        <motion.path
          d="M38 16 C36 13, 34 11, 32 10"
          stroke="#000000"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          animate={{
            rotate: [0, 8, -3, 5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M42 16 C44 13, 46 11, 48 10"
          stroke="#000000"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          animate={{
            rotate: [0, -8, 3, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Antenna Tips */}
        <circle cx="32" cy="10" r="1.2" fill="#000000" />
        <circle cx="48" cy="10" r="1.2" fill="#000000" />
        <circle cx="32" cy="10" r="0.6" fill="#333333" />
        <circle cx="48" cy="10" r="0.6" fill="#333333" />
      </motion.svg>
    </motion.div>
  );
};

const MultipleButterflies = () => {
  const butterflies = [
    // Original butterflies going right and up
    { id: 1, delay: 0, direction: "topRight" },
    { id: 2, delay: 0.5, direction: "topLeft" },
    { id: 3, delay: 1, direction: "right" },

    // Additional butterflies with different directions
    { id: 4, delay: 1.2, direction: "topRight" },
    { id: 5, delay: 0.8, direction: "left" },
    { id: 6, delay: 1.8, direction: "topLeft" },
    { id: 7, delay: 2.2, direction: "bottomRight" },
    { id: 8, delay: 0.3, direction: "top" },
    { id: 9, delay: 1.5, direction: "bottomLeft" },
    { id: 10, delay: 2.5, direction: "topRight" },
    { id: 11, delay: 0.7, direction: "spiral" },
    { id: 12, delay: 1.9, direction: "zigzag" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {butterflies.map((butterfly) => (
        <ButterflyAnimation
          key={butterfly.id}
          isVisible={true}
          delay={butterfly.delay}
          direction={butterfly.direction}
        />
      ))}
    </div>
  );
};

export { ButterflyAnimation, MultipleButterflies };
