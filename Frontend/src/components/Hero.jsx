import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Play, Volume2, VolumeX } from "lucide-react";
import HeroCoffeeAnimation from "./HeroCoffeeAnimation";
import AdvancedParticles from "./AdvancedParticles";
import { MorphingText, ParallaxElement, GlitchText } from "./AdvancedEffects";
import {
  FloatingCoffeeBeansAnimation,
  CoffeeSteamAnimation,
} from "./CoffeeThemeAnimations";
import {
  CoffeeAromaParticles,
  CoffeeSparkles,
  CoffeeWaves,
} from "./ElegantCoffeeAnimations";


const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Premium Coffee Experience",
      subtitle: "Where every cup tells a story",
      image:
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&h=800&fit=crop&auto=format",
      cta: "Explore Menu",
    },
    {
      title: "Artisan Crafted",
      subtitle: "Made with passion, served with love",
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&h=800&fit=crop&auto=format",
      cta: "Our Story",
    },
    {
      title: "Fresh Roasted Daily",
      subtitle: "From bean to cup, perfection in every sip",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=800&fit=crop&auto=format",
      cta: "Order Now",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToMenu = () => {
    const menuSection = document.querySelector("#menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${slide.image})`,
            }}
          />
        ))}
      </div>

      {/* Elegant Coffee Theme Animations */}
      {/* Coffee Aroma Particles rising from bottom */}
      <CoffeeAromaParticles className="absolute inset-0 z-5" />

      {/* Subtle floating coffee sparkles */}
      <CoffeeSparkles className="absolute inset-0 z-5" />

      {/* Gentle coffee waves at the bottom */}
      <CoffeeWaves className="absolute inset-0 z-5" />

      {/* Light floating coffee beans */}
      <FloatingCoffeeBeansAnimation className="absolute inset-0 z-5" />

      {/* Floating Coffee Gallery Images - Positioned at Right Corner */}
      <div className="absolute top-16 right-8 z-10">
        {/* Image 1 - Top Right */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-32 h-32 rounded-lg overflow-hidden border-4 border-white shadow-2xl transform rotate-12"
        >
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&auto=format"
            alt="Fresh Coffee Cup"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Image 2 - Middle Right */}
        <motion.div
          animate={{
            y: [0, 20, -10, 0],
            rotate: [0, -3, 3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-24 right-16 w-28 h-28 rounded-lg overflow-hidden border-4 border-white shadow-2xl transform -rotate-6"
        >
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop&auto=format"
            alt="Coffee Beans"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Image 3 - Lower Right */}
        <motion.div
          animate={{
            y: [0, -25, 15, 0],
            rotate: [0, 4, -2, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-48 right-4 w-30 h-30 rounded-lg overflow-hidden border-4 border-white shadow-2xl transform rotate-8"
        >
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop&auto=format"
            alt="Latte Art"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Image 4 - Middle Left */}
        <motion.div
          animate={{
            y: [0, 18, -12, 0],
            rotate: [0, -5, 3, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-32 right-40 w-26 h-26 rounded-lg overflow-hidden border-4 border-white shadow-2xl transform -rotate-12"
        >
          <img
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop&auto=format"
            alt="Coffee Shop Interior"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Image 5 - Top Center */}
        <motion.div
          animate={{
            y: [0, -20, 10, 0],
            rotate: [0, 6, -4, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute top-8 right-28 w-24 h-24 rounded-lg overflow-hidden border-4 border-white shadow-2xl transform rotate-15"
        >
          <img
            src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop&auto=format"
            alt="Espresso Shot"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Content - Positioned at Left Side */}
      <div className="relative z-10 flex items-center justify-start h-full">
        <div className="max-w-3xl ml-8 lg:ml-16 text-left px-4 sm:px-6 lg:px-8">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: index === currentSlide ? 1 : 0,
                y: index === currentSlide ? 0 : 30,
              }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`${index === currentSlide ? "block" : "hidden"}`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                  <span className="block">{slide.title.split(" ")[0]}</span>
                  <span className="block gradient-text bg-gradient-to-r from-cream-300 to-cream-500 bg-clip-text text-transparent">
                    {slide.title.split(" ").slice(1).join(" ")}
                  </span>
                </h1>
              </motion.div>

              <motion.p
                className="text-xl md:text-2xl text-cream-100 mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                {slide.subtitle}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToMenu}
                  className="btn-primary text-lg px-10 py-4"
                >
                  {slide.cta}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-white hover:text-cream-200 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-coffee-900 transition-all duration-300">
                    <Play size={20} />
                  </div>
                  <span className="font-medium">Watch Our Story</span>
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-cream-400 w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 right-8 text-white z-20"
      >
        <div
          className="flex flex-col items-center space-y-2 cursor-pointer"
          onClick={scrollToMenu}
        >
          <span className="text-sm font-medium rotate-90 origin-center whitespace-nowrap">
            Scroll Down
          </span>
          <ArrowDown size={20} />
        </div>
      </motion.div>

      {/* Floating Coffee Beans */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-coffee-800 rounded-full opacity-20"
          animate={{
            y: [0, -100],
            x: [0, Math.sin(i) * 50],
            rotate: [0, 360],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
          style={{
            left: `${10 + i * 15}%`,
            bottom: "-20px",
          }}
        />
      ))}
    </section>
  );
};

export default Hero;
