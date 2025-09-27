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
      <div className="absolute top-20 left-10 w-40 h-40 bg-coffee-200 rounded-full opacity-10"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-cream-300 rounded-full opacity-15"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-coffee-600 font-semibold text-lg tracking-wider uppercase mb-4 block">
            Testimonials
          </span>
          <StretchableH2 
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-coffee-900 mb-6"
            animationType="stretch"
            intensity="high"
          >
            What Our Customers
            <StretchableSpan className="block gradient-text" animationType="glow" intensity="high">Are Saying</StretchableSpan>
          </StretchableH2>
          <p className="text-xl text-coffee-700 max-w-3xl mx-auto leading-relaxed">
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
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative">
                {/* Quote Icon */}
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-r from-coffee-600 to-coffee-700 rounded-full flex items-center justify-center">
                  <Quote className="text-white" size={24} />
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Customer Image */}
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative inline-block"
                    >
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="w-32 h-32 rounded-full object-cover shadow-lg mx-auto mb-4"
                      />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute -inset-2 border-2 border-coffee-300 rounded-full opacity-50"
                      />
                    </motion.div>

                    <h3 className="font-display text-xl font-bold text-coffee-900 mb-1">
                      {testimonials[currentTestimonial].name}
                    </h3>
                    <p className="text-coffee-600 font-medium">
                      {testimonials[currentTestimonial].role}
                    </p>

                    {/* Star Rating */}
                    <div className="flex justify-center space-x-1 mt-3">
                      {[...Array(testimonials[currentTestimonial].rating)].map(
                        (_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          </motion.div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <div className="md:col-span-2">
                    <blockquote className="text-coffee-800 text-lg leading-relaxed mb-4">
                      "{testimonials[currentTestimonial].text}"
                    </blockquote>

                    <div className="bg-coffee-50 rounded-xl p-4 border-l-4 border-coffee-400">
                      <p className="text-coffee-700 font-semibold italic">
                        "{testimonials[currentTestimonial].highlight}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 bg-coffee-600 hover:bg-coffee-700 text-white rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg"
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-coffee-600 w-8"
                      : "bg-coffee-300 hover:bg-coffee-400"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 bg-coffee-600 hover:bg-coffee-700 text-white rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </motion.div>

        {/* Customer Stats */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
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
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="font-display text-3xl font-bold text-coffee-900 mb-2">
                {stat.number}
              </div>
              <div className="text-coffee-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <StretchableH3 
            className="font-display text-2xl md:text-3xl font-bold text-coffee-900 mb-4"
            animationType="bounce"
            intensity="medium"
          >
            Ready to Join Our Community?
          </StretchableH3>
          <p className="text-coffee-700 text-lg mb-8 max-w-2xl mx-auto">
            Experience the difference that quality, care, and community can
            make. Your perfect cup is waiting for you.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-12 py-4"
          >
            Visit Us Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
