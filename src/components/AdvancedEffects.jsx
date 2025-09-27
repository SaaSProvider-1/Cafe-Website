import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const AdvancedCounter = ({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
  startDelay = 0,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      let start = 0;
      const increment = end / (duration * 60); // 60 fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }, startDelay * 1000);

    return () => clearTimeout(timeout);
  }, [end, duration, isInView, startDelay]);

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
      transition={{ duration: 0.6, delay: startDelay }}
      className={className}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </motion.div>
  );
};

const MorphingText = ({ texts, interval = 3000, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <div className={`relative ${className}`}>
      {texts.map((text, index) => (
        <motion.span
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            y: index === currentIndex ? 0 : 20,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
      ))}
    </div>
  );
};

const ParallaxElement = ({ children, speed = 0.5, className = "" }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div className={className} style={{ transform: `translateY(${offset}px)` }}>
      {children}
    </div>
  );
};

const GlitchText = ({ text, className = "", intensity = "medium" }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, Math.random() * 5000 + 2000);

    return () => clearInterval(interval);
  }, []);

  const glitchVariants = {
    normal: {
      x: 0,
      opacity: 1,
      filter: "hue-rotate(0deg)",
    },
    glitch: {
      x: intensity === "high" ? [-2, 2, -1, 1, 0] : [-1, 1, 0],
      opacity: [1, 0.8, 1],
      filter: intensity === "high" ? "hue-rotate(90deg)" : "hue-rotate(45deg)",
      transition: {
        duration: 0.2,
        times: [0, 0.25, 0.5, 0.75, 1],
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={glitchVariants}
      animate={isGlitching ? "glitch" : "normal"}
    >
      {text}
    </motion.span>
  );
};

const FloatingElements = ({ elements, className = "" }) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: `${element.x || Math.random() * 100}%`,
            top: `${element.y || Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.sin(index) * 10, 0],
            rotate: [0, element.rotation || 360],
            scale: [1, element.scale || 1.1, 1],
          }}
          transition={{
            duration: element.duration || 6,
            repeat: Infinity,
            delay: element.delay || index * 0.5,
            ease: "easeInOut",
          }}
        >
          {element.component}
        </motion.div>
      ))}
    </div>
  );
};

export {
  AdvancedCounter,
  MorphingText,
  ParallaxElement,
  GlitchText,
  FloatingElements,
};
