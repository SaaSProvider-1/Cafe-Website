import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AdvancedParticles = ({
  count = 50,
  type = "coffee",
  className = "",
  color = "coffee",
  size = "mixed",
}) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: size === "mixed" ? Math.random() * 6 + 2 : size,
          opacity: Math.random() * 0.7 + 0.1,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 10,
          direction: Math.random() > 0.5 ? 1 : -1,
          shape:
            type === "mixed"
              ? ["circle", "bean", "star", "diamond"][
                  Math.floor(Math.random() * 4)
                ]
              : type,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [count, type, size]);

  const getParticleShape = (particle) => {
    switch (particle.shape) {
      case "bean":
        return (
          <div
            className={`bg-gradient-to-br from-coffee-600 to-coffee-800 rounded-full transform rotate-45`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size * 1.4}px`,
              borderRadius: "60% 40%",
            }}
          >
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-coffee-900 rounded-full"
              style={{
                width: `${particle.size * 0.3}px`,
                height: `${particle.size * 0.8}px`,
              }}
            />
          </div>
        );

      case "star":
        return (
          <div
            className="relative"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 clip-star" />
          </div>
        );

      case "diamond":
        return (
          <div
            className={`bg-gradient-to-br from-${color}-400 to-${color}-600 transform rotate-45`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        );

      default: // circle
        return (
          <div
            className={`bg-gradient-to-br from-${color}-300 to-${color}-500 rounded-full`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        );
    }
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, particle.direction * 50, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [
              particle.opacity,
              particle.opacity * 0.3,
              particle.opacity,
            ],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        >
          {getParticleShape(particle)}
        </motion.div>
      ))}
    </div>
  );
};

export default AdvancedParticles;
