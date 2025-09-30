import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { StretchableH2, StretchableH3, StretchableSpan } from "./StretchableText";

const Testimonials = () => {
  const [ref, isInView] = useScrollAnimation(0.1);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Food Blogger",
      image: "/api/placeholder/100/100",
      rating: 5,
      text: "Café Elite has completely changed my morning routine. Their Ethiopian pour-over is absolutely divine, and the atmosphere is perfect for both work and relaxation. The staff's knowledge about coffee is impressive!",
      highlight: "Ethiopian pour-over is absolutely divine",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Local Business Owner",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format",
      rating: 5,
      text: "I've been coming here for 3 years now, and the quality never disappoints. The baristas remember my order, and the community feel is what makes this place special. It's not just coffee, it's an experience.",
      highlight: "It's not just coffee, it's an experience",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Coffee Enthusiast",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format",
      rating: 5,
      text: "The latte art here is incredible, but what really impresses me is the consistency. Every cup is crafted with such care and attention to detail. Plus, their sustainability practices make me feel good about every purchase.",
      highlight: "Every cup is crafted with such care",
    },
    {
      id: 4,
      name: "David Park",
      role: "Remote Worker",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
      rating: 5,
      text: "As someone who works remotely, I need a reliable spot with great WiFi and even better coffee. Café Elite delivers on both fronts. The atmosphere is conducive to productivity, and the coffee keeps me energized all day.",
      highlight: "Great WiFi and even better coffee",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-cream-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 h-20 sm:w-40 sm:h-40 bg-coffee-200 rounded-full opacity-10"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-32 h-32 sm:w-60 sm:h-60 bg-cream-300 rounded-full opacity-15"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-coffee-600 font-semibold text-sm sm:text-lg tracking-wider uppercase mb-2 sm:mb-4 block">
            Testimonials
          </span>
          <StretchableH2 
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-900 mb-3 sm:mb-6"
            animationType="stretch"
            intensity="high"
          >
            What Our Customers
            <StretchableSpan className="block gradient-text" animationType="glow" intensity="high">Are Saying</StretchableSpan>
          </StretchableH2>
          <p className="text-base sm:text-lg md:text-xl text-coffee-700 max-w-2xl mx-auto leading-relaxed px-4">
            Don't just take our word for it. Here's what our community has to
            say about their Café Elite experience.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto px-4"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl relative mx-4 sm:mx-0">
                {/* Quote Icon */}
                <div className="absolute -top-4 sm:-top-6 left-4 sm:left-8 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-coffee-600 to-coffee-700 rounded-full flex items-center justify-center">
                  <Quote className="text-white" size={16} />
                </div>

                <div className="flex flex-col md:grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center">
                  {/* Customer Image */}
                  <div className="text-center md:order-1">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative inline-block"
                    >
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full object-cover shadow-lg mx-auto mb-2 sm:mb-4"
                      />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -inset-1 sm:-inset-2 border-2 border-coffee-300 rounded-full opacity-50"
                      />
                    </motion.div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-coffee-900 mb-1">
                      {testimonials[currentTestimonial].name}
                    </h3>
                    <p className="text-coffee-600 font-medium text-sm sm:text-base">
                      {testimonials[currentTestimonial].role}
                    </p>

                    {/* Star Rating */}
                    <div className="flex justify-center space-x-1 mt-2 sm:mt-3">
                      {[...Array(testimonials[currentTestimonial].rating)].map(
                        (_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <div className="md:col-span-2 md:order-2">
                    <blockquote className="text-coffee-800 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4 text-center md:text-left">
                      "{testimonials[currentTestimonial].text}"
                    </blockquote>

                    <div className="bg-coffee-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border-l-4 border-coffee-400">
                      <p className="text-coffee-700 font-semibold italic text-xs sm:text-sm md:text-base">
                        "{testimonials[currentTestimonial].highlight}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center space-x-3 sm:space-x-4 mt-6 sm:mt-8 px-4">
            <motion.button
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-coffee-600 hover:bg-coffee-700 text-white rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg"
            >
              <ChevronLeft size={18} className="sm:w-6 sm:h-6" />
            </motion.button>

            {/* Indicators */}
            <div className="flex space-x-1 sm:space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-coffee-600 w-6 sm:w-8"
                      : "bg-coffee-300 hover:bg-coffee-400 w-2 sm:w-3"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-coffee-600 hover:bg-coffee-700 text-white rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg"
            >
              <ChevronRight size={18} className="sm:w-6 sm:h-6" />
            </motion.button>
          </div>
        </motion.div>

        {/* Customer Stats */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-12 sm:mt-16 md:mt-20 px-4"
        >
          {[
            { number: "1000+", label: "Happy Customers", icon: "😊" },
            { number: "4.9/5", label: "Average Rating", icon: "⭐" },
            { number: "50K+", label: "Cups Served", icon: "☕" },
            { number: "98%", label: "Return Rate", icon: "🔄" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center p-3 sm:p-4 md:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 md:mb-3">{stat.icon}</div>
              <div className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-coffee-900 mb-1 sm:mb-2">
                {stat.number}
              </div>
              <div className="text-coffee-600 font-medium text-xs sm:text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 sm:mt-16 px-4"
        >
          <StretchableH3 
            className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-coffee-900 mb-3 sm:mb-4"
            animationType="bounce"
            intensity="medium"
          >
            Ready to Join Our Community?
          </StretchableH3>
          <p className="text-coffee-700 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
            Experience the difference that quality, care, and community can
            make. Your perfect cup is waiting for you.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-base sm:text-lg px-8 sm:px-12 py-3 sm:py-4"
          >
            Visit Us Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
